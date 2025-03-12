import {changeDefaultItinerary, changeItinerary, changePlan, resetFilters} from "@data/changeElements.ts";
import {computePlan, downloadPlans} from "@data/planParsing.ts";
import {buildQueryDataset} from "@data/queryBuild.ts";

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
export function computePlansInterface(motisURL:string) {
    computePlan(motisURL)
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