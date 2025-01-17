import {writable} from "svelte/store";
import type {Query} from "./data-processing/parsing-types/queryInterpolationTypes.ts";
import type {Plan} from "./data-processing/parsing-types/planParsingTypes.ts";


/**
 * Storage for content of query batch json file
 */
export const queryJsonStringStore = writable<string>("DEFAULT")

/**
 * Storage for interpolated queries
 */
export const interpolatedQueryStore = writable<Query[]>()

/**
 * Storage for computed plan data
 */
export const computedPlanStore = writable<Plan[]>()

/**
 * Storage for current displayed plan
 */
export const currentPlanStore = writable<Plan>()

/**
 * Storage for the current default plan
 */
export const currentDefaultPlanStore = writable<Plan>()

/**
 * Storage for all plans that are part of the default plan set
 */
export const defaultPlanStore = writable<Plan[]>()
