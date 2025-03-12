import {interpolatedQueryStore} from "sveltestore";
import {Query} from "./type-declarations/queryTypes.ts"

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
