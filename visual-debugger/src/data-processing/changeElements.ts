import {
    activeDefaultItineraryIndexStore,
    activeItineraryIndexStore,
    activeQueryIndexStore, currentDefaultItineraryStore,
    currentDefaultPlanStore, currentItineraryStore,
    currentPlanStore,
    defaultPlanDatasetStore,
    planDatasetStore, showMatchedStore, showMismatchedStore
} from "sveltestore";
import {Itinerary, type Plan} from "@data/type-declarations/planTypes.ts";
import {countFailedItineraries} from "@data/comparePlans.ts";

// attributes for switching of current plan
let plans: Plan[];
let defaultPlans: Plan[];

/**
 * Changes the currently displayed plan to the one given in the index
 */
export function changePlan(queryIndex: number) {
    if (queryIndex < 0) {
        throw new Error("Index out of bounds")
    }

    // TEST: Input
    // get current plan data
    planDatasetStore.subscribe((data) => {
            plans = data
        }
    )

    if (plans.length == 0) {
        throw new Error("Plan store is empty")
    }

    // TEST: Output
    // load plan of the clicked query into svelte store
    currentPlanStore.set(plans[queryIndex])

    // TEST: Input
    // get current plan data
    defaultPlanDatasetStore.subscribe((data) => {
            defaultPlans = data
        }
    )

    if (defaultPlans.length == 0) {
        throw new Error("Default plan store is empty")
    }

    // TEST: Output
    // load plan of the clicked query into svelte store
    currentDefaultPlanStore.set(defaultPlans[queryIndex])

    // TEST: Output
    // set the number of the new active query
    activeQueryIndexStore.set(queryIndex)
    countFailedItineraries()
}

let itinerary: Itinerary;
let defaultItinerary: Itinerary;

/**
 * Changes the currently displayed itinerary to the one given in the current default plan at the given index
 * @param itineraryIndex the index of the itinerary to change to
 */
export function changeItinerary(itineraryIndex: number) {
    if (itineraryIndex < 0) {
        throw new Error("Index out of bounds")
    }

    // TEST: Input
    // get current plan data
    currentPlanStore.subscribe((data) => {
            itinerary = data.itineraries[itineraryIndex]
        }
    )
    // TEST: Output
    // load plan of the clicked query into svelte store
    currentItineraryStore.set(itinerary)
    activeItineraryIndexStore.set(itineraryIndex)
}

/**
 * Changes the currently displayed default itinerary to the one given in the current default plan at the given index
 * @param itineraryIndex the index of the default itinerary to change to
 */
export function changeDefaultItinerary(itineraryIndex: number) {
    if (itineraryIndex < 0) {
        throw new Error("Index out of bounds")
    }

    // TEST: Input
    // get current plan data
    currentDefaultPlanStore.subscribe((data) => {
            defaultItinerary = data.itineraries[itineraryIndex]
        }
    )
    // TEST: Output
    // load plan of the clicked query into svelte store
    currentDefaultItineraryStore.set(defaultItinerary)
    activeDefaultItineraryIndexStore.set(itineraryIndex)
}

/**
 * Resets the state of the filter checkboxes to true
 */
export function resetFilters() {
    showMatchedStore.set(true)
    showMismatchedStore.set(true)
}
