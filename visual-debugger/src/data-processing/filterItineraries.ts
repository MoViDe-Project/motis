import {Plan} from "@data/type-declarations/planTypes.ts";
import {activeQueryIndexStore, currentDefaultPlanStore, currentPlanStore} from "sveltestore";
import {itineraryStates} from "./styling/cssClasses.ts";
import {changePlan} from "@data/changeElements.ts";

/**
 * Prevents the matched itineraries from showing up in the plan overview
 */
export function filterOutMatched() {
    let plan = new Plan()
    let defaultPlan = new Plan()

    currentPlanStore.subscribe(data => {
        plan = data
    })

    currentDefaultPlanStore.subscribe(data => {
        defaultPlan = data
    })
    // clone the plans as to not change the data but only the visible plan
    let clonedPlan = structuredClone(plan)
    let clonedDefaultPlan = structuredClone(defaultPlan)

    // filter the matched queries from the plans
    clonedPlan.itineraries = plan.itineraries.filter(
        data => data.state !== itineraryStates.planEntryValid
    )

    clonedDefaultPlan.itineraries = defaultPlan.itineraries.filter(
        data => data.state !== itineraryStates.planEntryValid
    )

    // set the new plans as current
    currentPlanStore.set(clonedPlan)

    currentDefaultPlanStore.set(clonedDefaultPlan)
}

/**
 * Prevents the mismatched itineraries from showing up in the plan overview
 */
export function filterOutMismatched() {
    let plan = new Plan()
    let defaultPlan = new Plan()

    currentPlanStore.subscribe(data => {
        plan = data
    })

    currentDefaultPlanStore.subscribe(data => {
        defaultPlan = data
    })
    // clone the plans as to not change the data but only the visible plan
    let clonedPlan = structuredClone(plan)
    let clonedDefaultPlan = structuredClone(defaultPlan)

    // filter the mismatched queries from the plans
    clonedPlan.itineraries = plan.itineraries.filter(
        data => data.state === itineraryStates.planEntryValid
    )

    clonedDefaultPlan.itineraries = defaultPlan.itineraries.filter(
        data => data.state === itineraryStates.planEntryValid
    )

    // set the new plans as current
    currentPlanStore.set(clonedPlan)

    currentDefaultPlanStore.set(clonedDefaultPlan)
}

/**
 * Resets the filters for the itineraries but filters out the mismatched iti if desired
 * Basically only shows the matched itineraries if parameter true, otherwise shows all itineraries
 * @param showMismatched states whether the mismatched itineraries should be filtered out
 */
export function resetItinerariesWithFilterMismatched(showMismatched:boolean) {
    let planIndex = 0

    activeQueryIndexStore.subscribe(data => {
        planIndex = data
    })

    // replace the active plan with the plan from the dataset(which includes matched and mismatched itineraries)
    changePlan(planIndex)

    // filter mismatched itineraries back out
    if(!showMismatched){
        filterOutMismatched()
    }
}

/**
 * Resets the filters for the itineraries but filters out the matched itineraries if desired
 * Basically only shows the mismatched itineraries if parameter true, otherwise shows all itineraries
 * @param showMatched states whether the matched itineraries should be filtered out
 */
export function resetItinerariesWithFilterMatched(showMatched:boolean) {
    let planIndex = 0

    activeQueryIndexStore.subscribe(data => {
        planIndex = data
    })

    // replace the active plan with the plan from the dataset(which includes matched and mismatched itineraries)
    changePlan(planIndex)

    // filter matched itineraries back out
    if(!showMatched){
        filterOutMatched()
    }
}