import {
    activeQueryStore, currentDefaultItineraryStore,
    currentDefaultPlanStore, currentItineraryStore,
    currentPlanStore,
    defaultPlanDatasetStore,
    planDatasetStore
} from "sveltestore";
import {Itinerary, type Plan} from "@data/type-declarations/planTypes.ts";

// attributes for switching of current plan
let plans: Plan[];
let defaultPlans: Plan[];

/**
 * Changes the currently displayed plan to the one given in the index
 */
export function changePlan(queryIndex: number) {
    // TEST: Input
    // get current plan data
    planDatasetStore.subscribe((data) => {
            plans = data
        }
    )

    // TEST: Output
    // load plan of the clicked query into svelte store
    currentPlanStore.set(plans[queryIndex - 1])

    // TEST: Input
    // get current plan data
    defaultPlanDatasetStore.subscribe((data) => {
            defaultPlans = data
        }
    )

    // TEST: Output
    // load plan of the clicked query into svelte store
    currentDefaultPlanStore.set(defaultPlans[queryIndex - 1])

    // TEST: Output
    // set the number of the new active query
     activeQueryStore.set(queryIndex)
}

let itinerary: Itinerary;
let defaultItinerary: Itinerary;

/**
 * Changes the currently displayed plan to the one given in the index
 */
export function changeItinerary(itineraryIndex: number) {
    // TEST: Input
    // get current plan data
    currentPlanStore.subscribe((data) => {
            itinerary = data.itineraries[itineraryIndex]
        }
    )
    // TEST: Output
    // load plan of the clicked query into svelte store
    currentItineraryStore.set(itinerary)

    // TEST: Input
    // get current plan data
    currentDefaultPlanStore.subscribe((data) => {
            defaultItinerary = data.itineraries[itineraryIndex]
        }
    )
    // TEST: Output
    // load plan of the clicked query into svelte store
    currentDefaultItineraryStore.set(defaultItinerary)

}
