import {currentDefaultPlanStore, currentPlanStore, defaultPlanDatasetStore, planDatasetStore} from "sveltestore";
import type {Plan} from "@data/type-declarations/planTypes.ts";

// attributes for switching of current plan
let plans: Plan[];
let defaultPlans: Plan[];

/**
 * Changes the currently displayed plan to the one given in the index
 */
export function changePlan(queryIndex: number) {
    // get current plan data
    planDatasetStore.subscribe((data) => {
            plans = data
        }
    )
    // load plan of the clicked query into svelte store
    currentPlanStore.set(plans[queryIndex - 1])

    // get current plan data
    defaultPlanDatasetStore.subscribe((data) => {
            defaultPlans = data
        }
    )
    // load plan of the clicked query into svelte store
    currentDefaultPlanStore.set(defaultPlans[queryIndex - 1])
}