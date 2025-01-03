import axios from "axios";
import {queryJsonStringStore, interpolatedQueryStore} from "../sveltestore";

/**
 * Base URL of the MOTIS API
 */
const motisApiUrlBase = 'http://localhost:8080/api/v1/'

/**
 * Attribute used for storing the content of the query file
 */
let queryFileContent: string

/**
 * location type used for storing stop information
 */
export interface Location {
    type: string;
    tokens: number[][];
    name: string;
    id: string;
    lat: number;
    lon: number;
    level: number;
    zip: string;
    areas: Area[];
    score: number;
}

/**
 * area type used for storing information about the area of a stop
 */
export interface Area {
    name: string;
    adminLevel: number;
    matched: boolean;
    default: boolean;
}

/**
 * Query type used for storing information about a single query
 */
export interface Query {
    index: number;
    from:string;
    fromStopID:string;
    to: string;
    toStopID: string;
    class:string;
}

/**
 * Type used for storing all queries in a Batch
 */
interface Batch {
    queries: Query[];
}

/**
 * Reads the query batch and generates the nearest stops for the read query trips
 * @param query_batch path to the query batch JSON file
 * @return the query batch dataset with stop id's
 */
export async function buildQueryDataset(query_batch:string) {

    // parse query batch file into readable queries
    let batch: Batch = JSON.parse(query_batch)
    let queries = batch.queries

    // call MOTIS API to search for the nearest stations to the start and end point of the query
    for (const queryTrip of queries) {
        queryTrip.fromStopID = await getLocationId(queryTrip.from)
        queryTrip.toStopID = await getLocationId(queryTrip.to)
    }

    // update store with the new queries
    interpolatedQueryStore.set(queries);
}

/**
 * Calls the MOTIS API to find the most similar stop to the input and returns the id of it
 * @param locationName location the most similar stop id is needed of
 * @return the id of the most similar location to the input string
 */
async function getLocationId (locationName:string){
    const response = await axios
        .get(
            //configuration for api call parameters
            `${motisApiUrlBase}geocode/?text=${locationName}`
        )
    let possible_stops_and_locations: Location[] = response.data
    return possible_stops_and_locations[0].id
}

/**
 * Interaction method for printing queries to page
 */
export function getQueryAttributes(){

    //get read file content from storage
    queryJsonStringStore.subscribe(file_data => {
        queryFileContent = file_data;
    })

    // if store is empty abort data processing
    if(queryFileContent.length==0){return}

    //interpolate data
    buildQueryDataset(queryFileContent)
}
