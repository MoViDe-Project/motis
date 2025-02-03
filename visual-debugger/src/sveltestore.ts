import {writable} from "svelte/store";
import {Query} from "./data-processing/type-declarations/queryTypes.ts";
import {Plan} from "./data-processing/type-declarations/planTypes.ts";

/**
 * Storage for interpolated queries
 */
export const interpolatedQueryStore = writable<Query[]>(new Array<Query>())

/**
 * Storage for current displayed plan
 */
export const currentPlanStore = writable<Plan>(new Plan())

/**
 * Storage for all currently computed plan data
 */
export const planDatasetStore = writable<Plan[]>(new Array<Plan>())

/**
 * Storage for the current default plan
 */
export const currentDefaultPlanStore = writable<Plan>(new Plan())

/**
 * Storage for all plans that are part of the default plan set
 */
export const defaultPlanDatasetStore = writable<Plan[]>(new Array<Plan>())
