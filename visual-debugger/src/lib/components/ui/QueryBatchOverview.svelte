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

<h2>Query Batches</h2>
<div class="rounded-border">
    {#each queries as query}
        <Button on:click={() => changePlan(query.index)}> {query.index}: {query.from} -> {query.to}</Button>
    {/each}
</div>


<style>
    .rounded-border {
        border: 1px solid black;
        border-radius: 8px;
        padding: 10px;
    }
</style>