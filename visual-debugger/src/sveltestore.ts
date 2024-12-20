import {writable} from "svelte/store";
import type {Query} from "./data-processing/query-build";


/**
 * Storage for content of query batch json file
 */
export const queryJsonStringStore = writable<string>("DEFAULT")

/**
 * Storage for interpolated queries
 */
export const interpolatedQueryStore = writable<Query[]>()