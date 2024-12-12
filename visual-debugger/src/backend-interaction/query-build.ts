import axios from "axios";
import * as fs from 'fs';

/**
 * Base URL of the MOTIS API
 */
const motis_api_url_base = 'http://localhost:8080/api/v1/'

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
interface query {
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
    console.log(query_batch)
    let batch: batch = JSON.parse(fs.readFileSync(query_batch, 'utf-8'))
    let queries = batch.queries

    // call MOTIS API to search for the nearest stations to the start and end point of the query
    for (const query_trip of queries) {
        query_trip.fromStopID = await get_location_id(query_trip.from)
        query_trip.toStopID = await get_location_id(query_trip.to)
    }

    write_query_set_to_file(queries,"./input-set.json")
    return queries
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
 * Takes the interpolated query batch and writes it into the specified json file for further processing
 * @param query_batch The query batch with stop id's
 * @param input_set_path The path to the input set JSON file
 */
function write_query_set_to_file(query_batch:query[],input_set_path: string){
    let batch_string: string = JSON.stringify(query_batch)
    console.log(batch_string)
    //fs.writeFile(input_set_path, batch_string, function (err) {
      //  if (err) throw err;
    //});
}

//build_query_dataset("./Query-Batch.json")
