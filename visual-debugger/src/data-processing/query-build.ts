import axios from "axios";
import * as fs from 'fs';
import {query_json_string_store, query_store} from "../sveltestore";

/**
 * Base URL of the MOTIS API
 */
const motis_api_url_base = 'http://localhost:8080/api/v1/'

/**
 * Attribute used for storing the content of the query file
 */
let query_file_content: string

/**
 * location type used for storing stop information
 */
export interface location {
    type: string;
    tokens: number[][];
    name: string;
    id: string;
    lat: number;
    lon: number;
    level: number;
    zip: string;
    areas: area[];
    score: number;
}

/**
 * area type used for storing information about the area of a stop
 */
export interface area {
    name: string;
    adminLevel: number;
    matched: boolean;
    default: boolean;
}

/**
 * Query type used for storing information about a single query
 */
export interface query {
    index: number;
    from:string;
    fromStopID:string;
    to: string;
    toStopID: string;
    class:string;
}

/**
 * Type used for storing all queries in a batch
 */
interface batch {
    queries: query[];
}

/**
 * Reads the query batch and generates the nearest stops for the read query trips
 * @param query_batch path to the query batch JSON file
 * @return the query batch dataset with stop id's
 */
export async function build_query_dataset(query_batch:string) {

    // parse query batch file into readable queries
    let batch: batch = JSON.parse(query_batch)
    let queries = batch.queries

    // call MOTIS API to search for the nearest stations to the start and end point of the query
    for (const query_trip of queries) {
        query_trip.fromStopID = await get_location_id(query_trip.from)
        query_trip.toStopID = await get_location_id(query_trip.to)
    }

    // update store with the new queries
    query_store.set(queries);
}

/**
 * Calls the MOTIS API to find the most similar stop to the input and returns the id of it
 * @param location_name location the most similar stop id is needed of
 * @return the id of the most similar location to the input string
 */
async function get_location_id (location_name:string){
    const response = await axios
        .get(
            //configuration for api call parameters
            `${motis_api_url_base}geocode/?text=${location_name}`
        )
    let possible_stops_and_locations: location[] = response.data
    return possible_stops_and_locations[0].id
}

/**
 * Interaction method for printing queries to page
 */
export function get_query_attributes(){

    //get read file content from storage
    query_json_string_store.subscribe(file_data => {
        query_file_content = file_data;
    })

    // if store is empty abort data processing
    if(query_file_content.length==0){return}

    //interpolate data
    build_query_dataset(query_file_content)
}
