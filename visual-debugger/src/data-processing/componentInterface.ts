import {changePlan} from "@data/changeElements.ts";
import {computePlan, downloadPlans} from "@data/planParsing.ts";

/**
 * This division between the svelte components and the functions they're calling is sole to simplify unit testing said functions
 */

/**
 * Interface method for changing the active plans
 * @param planIndex the index of the plan to change to
 */
export function changePlanInterface(planIndex: number) {
    changePlan(planIndex)
}

/**
 * Interface method for getting the routing results for the queries from motis
 */
export function computePlansInterface() {
    computePlan()
}

/**
 * Interface method for downloading the computed plans for later use
 */
export function downloadPlanInterface() {
    downloadPlans()

}