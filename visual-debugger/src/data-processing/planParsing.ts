import {interpolatedQueryStore, computedPlanStore, currentPlanStore} from "../sveltestore.ts";
import type {Query} from "./parsing-types/queryInterpolationTypes.ts";
import type {Plan} from "./parsing-types/planParsingTypes.ts"
import axios from "axios";

/**
 * Base URL of the MOTIS API
 */
const motisApiUrlBase = 'http://localhost:8080/api/v1/'

/**
 * computed plans for the uploaded queries
 */


/**
 * data of the interpolated queries
 */
let queries: Query[]

/**
 * "interface" function that is accessed by the frontend to get the plan for all queries
 */
export async function getPlan(){
    //get read file content from storage
    interpolatedQueryStore.subscribe(file_data => {
        queries = file_data;
    })

    // if store is empty abort data processing
    if(queries == undefined){return}

    // compute the plan for each query
    let index =0;

    let plans: Plan[] = [];

    for(const query of queries){
        plans[index] = await getPlanForQuery(query)
        index++;
        console.log(index)
    }

    computedPlanStore.set(plans)
    currentPlanStore.set(plans[0])
}

/**
 * Calls the MOTIS API for a specific query and returns the plan for it
 * @param query the query to get the plan for
 */
export async function getPlanForQuery(query:Query){

    const response = await axios
        .get(
            //configuration for api call parameters
            `${motisApiUrlBase}plan/?fromPlace=${query.fromStopID}&toPlace=${query.toStopID}`
        )
    let plan: Plan = response.data
    console.log("plan", plan)
    return plan
}


