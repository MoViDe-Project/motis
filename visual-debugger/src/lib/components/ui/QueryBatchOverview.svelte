<script lang="ts">
    import {
        planDatasetStore,
        currentPlanStore,
        interpolatedQueryStore,
        defaultPlanDatasetStore, currentDefaultPlanStore
    } from "../../../sveltestore.ts";
    import type {Query} from "../../../data-processing/parsing-types/queryInterpolationTypes.ts";
    import {Button} from "@/components/ui/button";
    import type {Plan} from "../../../data-processing/parsing-types/planParsingTypes.ts";
    import {Label} from "$lib/components/ui/label";

    let queries: Query[]

    // let queries be up-to-date with the store
    interpolatedQueryStore.subscribe((data) =>
        queries = data
    )

    // attributes for switching of current plan
    let plans: Plan[];
    let defaultPlans: Plan[];

    /**
     * Changes the currently displayed plan to the one given in the index
     */
    function changePlan(queryIndex: number) {
        // get current plan data
        planDatasetStore.subscribe((data) => {
                plans = data

                //if no plan was previously computed, alert the user of this
                if (data == undefined) {
                    alert("No plans found, please compute the queries before trying to switch between their data.")
                    return
                }
            }
        )

        // return if the store is still empty (this means the function was called to early)
        if (plans == undefined) return;

        // load plan of the clicked query into svelte store
        currentPlanStore.set(plans[queryIndex - 1])

        // Switch default plan

        // get current plan data
        defaultPlanDatasetStore.subscribe((data) => {
                defaultPlans = data

                //if no plan was previously computed, alert the user of this
                if (data == undefined) {
                    alert("No plans found, please compute the queries before trying to switch between their data.")
                    return
                }
            }
        )

        // return if the store is still empty (this means the function was called to early)
        if (defaultPlans == undefined) return;

        // load plan of the clicked query into svelte store
        currentDefaultPlanStore.set(defaultPlans[queryIndex - 1])
    }

</script>


<div class ="bg-gray-200 p-4 rounded">
    <Label class="text-md">Query Batch Overview</Label>
    <div class="rounded flex flex-col space-y-1 border border-black p-2 ">
        {#each queries as query}
            <Button on:click={() => changePlan(query.index)} class="bg-transparent hover:bg-black text-black font-semibold hover:text-white py-2 px-4 border border-black hover:border-transparent rounded"> {query.index}: {query.from} -> {query.to}</Button>
        {/each}
    </div>
</div>
