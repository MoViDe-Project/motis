import {type Plan} from "./type-declarations/planTypes.ts";
import {
    currentDefaultPlanStore,
    currentPlanStore,
    defaultPlanDatasetStore,
    planDatasetStore
} from "sveltestore";
import {cssClasses} from "./styling/cssClasses.ts";
import {resetCssClassesForPlanEntries} from "./planParsing.ts";
import {compareItineraries} from "@data/compareObjects.ts";

/**
 * Compares the computed results of the queries with the uploaded default plan and sets colors of the matches/mismatches
 */
export function comparePlans() {
    let plans: Plan[] = [];
    let defaultPlans: Plan[] = [];

    // TEST: Input
    planDatasetStore.subscribe(data => {
        plans = data
    })

    // TEST: Input
    defaultPlanDatasetStore.subscribe(data => {
        defaultPlans = data
    })
    let minLegs=Math.min(plans.length, defaultPlans.length)

    //reset css classes
    for (let i = 0; i < minLegs; i++) {
        resetCssClassesForPlanEntries(plans[i]);
        resetCssClassesForPlanEntries(defaultPlans[i]);
    }

    // find if one plan has more entries than the other
    // TODO: outsource this into it's own method
    if (plans.length != defaultPlans.length) {
        if (plans.length >= defaultPlans.length) {
            alert("Error: There are more queries in the batch than in the default plans.")

        } else {
            alert("Error: There are more queries in the default plan than in the batch.")

        }
    }

    // TEST: Mutation of cssClasses
    // iterate over all plans
    for (let planIndex = 0; planIndex < minLegs; planIndex++) {

        let currentPlan: Plan = plans[planIndex];
        let currentDefaultPlan: Plan = defaultPlans[planIndex];

        // check if a plan has fewer itineraries and set the other ones to missing
        let numberOfItineraries = Math.min(currentPlan.itineraries.length,currentDefaultPlan.itineraries.length);

        if(numberOfItineraries < currentPlan.itineraries.length) {
            // current has more itineraries
            for (let i = numberOfItineraries; i < currentPlan.itineraries.length; i++) {
                currentPlan.itineraries[i].cssClass = cssClasses.planEntryMissing
            }
        }

        // iterate over all itineraries of a plan
        for (let itineraryIndex = 0; itineraryIndex < numberOfItineraries; itineraryIndex++) {

            let currentItinerary = currentPlan.itineraries[itineraryIndex];
            let currentDefaultItinerary = currentDefaultPlan.itineraries[itineraryIndex];

            // compare strings of itineraries and set colors(CSS-Classes) accordingly
            if (compareItineraries(currentItinerary, currentDefaultItinerary)[0].length ==0) {
                // itineraries are equal, mark them as such
                currentItinerary.cssClass = cssClasses.planEntryValid
                currentDefaultItinerary.cssClass = cssClasses.planEntryValid

            } else {
                // itineraries are not equal
                currentItinerary.cssClass = cssClasses.planEntryInvalid
                currentDefaultItinerary.cssClass = cssClasses.planEntryInvalid
            }

        }

        // TEST: Output
        // update the current stores to show the matches/mismatches
        currentPlanStore.set(plans[0])
        currentDefaultPlanStore.set(defaultPlans[0])
    }
}
