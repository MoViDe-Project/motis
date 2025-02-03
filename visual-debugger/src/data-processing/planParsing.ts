import {interpolatedQueryStore, planDatasetStore, currentPlanStore} from "sveltestore";
import type {Query} from "./type-declarations/queryTypes.ts";
import type {Plan} from "./type-declarations/planTypes.ts"
import axios from "axios";
import {cssClasses} from "./styling/cssClasses.ts";

/**
 * Base URL of the MOTIS API
 */
const motisApiUrlBase = 'http://localhost:8080/api/v1/'

/**
 * data of the interpolated queries
 */
let queries: Query[]

/**
 * Interaction function that is accessed by the frontend to get the plan for all queries
 */
export async function computePlan() {
    //get read file content from storage
    interpolatedQueryStore.subscribe(file_data => {
        queries = file_data;
    })

    // if store is empty abort data processing
    if (queries == undefined) {
        return
    }

    let plans: Plan[] = [];
    let index = 0;

    // compute the plan for each query
    for (const query of queries) {
        plans[index] = await computePlanForQuery(query)
        index++;
    }

    // set default (white) css classes for itineraries
    for (let plan of plans) {
        resetCssClassesForPlanEntries(plan)
    }

    // put computed plans into storage and set first plan as active
    planDatasetStore.set(plans)
    currentPlanStore.set(plans[0])
}

/**
 * Calls the MOTIS API for a specific query and returns the plan for it
 * @param query the query to get the plan for
 */
export async function computePlanForQuery(query: Query) {
    const response = await axios
        .get(
            //configuration for api call parameters
            `${motisApiUrlBase}plan/?fromPlace=${query.fromStopID}&toPlace=${query.toStopID}&time=${query.time}`
        )
    let plan: Plan = response.data
    return plan
}

/**
 * Downloads the currently computed plans as a JSON file
 */
export function downloadPlans(): void {

    let plans: Plan[] | null = null;
    // put content of read file as string into storage
    planDatasetStore.subscribe(data => {
        plans = data
    })
    if (plans == null) {
        return
    }

    // build HTML Element for file download
    let fileElement = document.createElement("a");
    let file = new Blob([JSON.stringify(plans)], {type: "text/plain"});
    fileElement.href = URL.createObjectURL(file);

    // set name of file and download it
    fileElement.download = "default-plan.json";
    fileElement.click();
}

/**
 * Sets the cssClass for all itineraries of the plan to the default plan entry class
 * @param plan the plan to reset the CSS-Classes for
 */
export function resetCssClassesForPlanEntries(plan: Plan) {
    let itineraries = plan.itineraries

    for (let itinerary of itineraries) {
        itinerary.cssClass = cssClasses.planEntryDefault
    }
}


