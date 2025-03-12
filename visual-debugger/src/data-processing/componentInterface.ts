import {changeDefaultItinerary, changeItinerary, changePlan, resetFilters} from "@data/changeElements.ts";
import {computePlan, downloadPlans} from "@data/planParsing.ts";
import {buildQueryDataset} from "@data/queryParsing.ts";
import {comparePlans} from "@data/comparePlans.ts";
import {
    filterOutMatched,
    filterOutMismatched,
    resetItinerariesWithFilterMatched,
    resetItinerariesWithFilterMismatched
} from "@data/filterItineraries.ts";

/**
 * This division between the svelte components and the functions they're calling is sole to simplify unit testing said functions
 */

/**
 * Interface method for changing the active plans
 * @param planIndex the index of the plan to change to
 */
export function changePlanInterface(planIndex: number) {
    changePlan(planIndex)
    resetFilters()
}

/**
 * Interface method for getting the routing results for the queries from MOTIS
 */
export function computePlansInterface() {
    computePlan()
}

/**
 * Interface method for comparing the plans and displaying their differences
 */
export function comparePlansInterface() {
    comparePlans()
}

/**
 * Interface method for downloading the computed plans for later use
 */
export function downloadPlanInterface() {
    downloadPlans()
}

/**
 * Interface method for changing the currently displayed itinerary
 */
export function changeItineraryInterface(itineraryIndex: number) {
    changeItinerary(itineraryIndex)
}

/**
 * Interface method for getting the routing results for the queries from MOTIS
 */
export function changeDefaultItineraryInterface(itineraryIndex: number) {
    changeDefaultItinerary(itineraryIndex)
}

/**
 * Interface method for parsing the Queries and placing them in the {@link interpolatedQueryStore}
 * @param queryContents the content of the uploaded query file
 */
export function parseQueryInterface(queryContents: string) {
    buildQueryDataset(queryContents)
}

/**
 * Interface function for removing the matched itineraries from plan overview
 */
export function filterOutMatchedInterface(){
    filterOutMatched()
}

/**
 * Interface function for removing the mismatched itineraries from plan overview
 */
export function filterOutMismatchedInterface(){
    filterOutMismatched()
}

/**
 * Interface function for resetting the filters with ability to remove matched itineraries afterward
 * @param showMatched whether to remove matched itineraries
 */
export function resetItinerariesWithFilterMatchedInterface(showMatched:boolean){
    resetItinerariesWithFilterMatched(showMatched)
}

/**
 * Interface function for resetting the filters with ability to remove mismatched itineraries afterward
 * @param showMismatched whether to remove mismatched itineraries
 */
export function resetItinerariesWithFilterMismatchedInterface(showMismatched:boolean){
    resetItinerariesWithFilterMismatched(showMismatched)
}