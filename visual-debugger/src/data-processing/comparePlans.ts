import type {Plan} from "./parsing-types/planParsingTypes.ts";
import {defaultPlanDatasetStore, planDatasetStore, planEntryValidityStore} from "../sveltestore.ts";
import {cssClasses} from "./parsing-types/cssClasses.ts";

/**
 *
 */
export function buildPlanValidities() {
    let plans: Plan[] = [];
    let defaultPlans: Plan[] = [];
    let validities: string [][] = [];

    planDatasetStore.subscribe(data => {
        plans = data
    })

    defaultPlanDatasetStore.subscribe(data => {
        defaultPlans = data
    })

    planEntryValidityStore.subscribe(data => {
        validities = data
    })

    if (plans.length != defaultPlans.length) {
        if (plans.length >= defaultPlans.length) {
            alert("There are more queries in the batch than in the default plans.")
            return
        } else {
            alert("There are more queries in the default plan than in the batch.")
            return
        }
    }


    // iterate over all plans
    for (let planIndex = 0; planIndex < plans.length - 1; planIndex++) {

        let currentPlan: Plan = plans[planIndex];
        let currentDefaultPlan: Plan = defaultPlans[planIndex];

        // iterate over all itineraries of a plan
        for (let itineraryIndex = 0; itineraryIndex < currentPlan.itineraries.length; itineraryIndex++) {

            let currentItinerary = currentPlan.itineraries[itineraryIndex];
            let currentDefaultItinerary = currentDefaultPlan.itineraries[itineraryIndex];

            if (JSON.stringify(currentItinerary) == JSON.stringify(currentDefaultItinerary)) {
                // itineraries are equal, mark them as such
                validities[planIndex][itineraryIndex] = new cssClasses().planEntryValid

            } else {
                // itineraries are not equal find inequality
                console.log("not equal")
            }

        }
    }
}

export function buildValidityArray(planDataset: Plan[]) {
    //build standard validity array
    let planValidity: string [][] = new Array<Array<string>>;
    let planLength = 0
    for (let planIndex = 0; planIndex < planDataset.length; planIndex++) {

        //find itinerary length
        let currentLength: number = planDataset[planIndex].itineraries.length
        if (currentLength > planLength) planLength = currentLength;

        let itineraryValidity: string[] = []
        for (let j = 0; j < currentLength; j++) {
            itineraryValidity.push(new cssClasses().planeEntryInvalid)
        }
        planValidity.push(itineraryValidity)

    }
    return planValidity
}