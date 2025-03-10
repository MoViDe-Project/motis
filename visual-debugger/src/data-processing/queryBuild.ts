import axios from "axios";
import {interpolatedQueryStore} from "../sveltestore";
import {type Location, type Batch, Query} from "./type-declarations/queryTypes.ts"

/**
 * Base URL of the MOTIS API
 */
const motisApiUrlBase = 'http://localhost:8080/api/v1/'

/**
 * Reads the query batch and generates the nearest stops for the read query trips
 * @param query_batch path to the query batch JSON file
 * @return the query batch dataset with stop id's
 */
export async function buildQueryDataset(query_batch: string) {
    // parse query batch file into readable queries
    let queries: Query[] = new Array<Query>();

    try {
        queries = JSON.parse(query_batch)
    } catch (e) {
        alert("An error occurred while parsing query data.");
        throw new Error(`Failed to parse query data: ${e}`)
    }

    interpolatedQueryStore.set(queries);
}

/**
 * Calls the MOTIS API to find the most similar stop to the input and returns the id of it
 * @param locationName location the most similar stop id is needed of
 * @return the id of the most similar location to the input string
 */
async function computeLocationId(locationName: string) {
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
export function computeQueryAttributes(queryString:string) {
    try {
        // find next stops for all queries
        buildQueryDataset(queryString)
    } catch (err) {
        console.log(err)
    }
}
