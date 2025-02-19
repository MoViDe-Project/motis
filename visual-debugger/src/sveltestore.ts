import {writable} from "svelte/store";
import {Query} from "@data/type-declarations/queryTypes.ts";
import {Itinerary, Plan} from "@data/type-declarations/planTypes.ts";
import {ItineraryShadow} from "@data/type-declarations/comparisonShadows.ts";

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

/**
 * Storage for the current default plan
 */
export const currentItineraryStore = writable<Itinerary>(new Itinerary())

/**
 * Storage for all plans that are part of the default plan set
 */
export const currentDefaultItineraryStore = writable<Itinerary>(new Itinerary())

/**
 * Storage for the number of the active query
 */
export const activeQueryStore = writable<number>(0)

/**
 * Storage for the number of the active plan
 */
export const activeItineraryIndexStore = writable<number>(0)

/**
 * Storage for the number of the active default plan
 */
export const activeDefaultItineraryIndexStore = writable<number>(0)

/**
 * Storage for the shadow objects of the current itinerary
 */
export const shadowItineraryStore = writable<ItineraryShadow>(new ItineraryShadow(1))

/**
 * Storage for the shadow objects of the current itinerary
 */
export const defaultShadowItineraryStore = writable<ItineraryShadow>(new ItineraryShadow(1))