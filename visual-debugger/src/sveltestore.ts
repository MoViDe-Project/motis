import {writable} from "svelte/store";
import type {query} from "./data-processing/query-build";


/**
 * Storage for content of query batch json file
 */
export const query_json_string_store = writable<string>("DEFAULT")

/**
 * Storage for interpolated queries
 */
export const query_store = writable<query[]>()