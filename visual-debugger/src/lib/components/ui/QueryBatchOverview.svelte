<script lang="ts">
    import {computedPlanStore, currentPlanStore, interpolatedQueryStore} from "../../../sveltestore.ts";
    import QueryBatchEntry from "./subcomponents/QueryBatchEntry.svelte"
    import type {Query} from "../../../data-processing/parsing-types/queryInterpolationTypes.ts";
    import {Button} from "@/components/ui/button";
    import type {Plan} from "../../../data-processing/parsing-types/planParsingTypes.ts";

    let queries: Query[]

    // let queries be up-to-date with the store
    interpolatedQueryStore.subscribe((data) =>
        queries = data
    )

    // attributes for switching of current plan
    let queryIndex = 0
    let plans: Plan[];

    /**
     * Changes the currently displayed plan to the next one
     */
    const nextActivePlan = () => {
        // get all plan data
        computedPlanStore.subscribe((data) =>
            plans = data
        )

        // return if the store is still empty (this means the function was called to early)
        if(typeof plans == undefined) return

        let maxPlan = plans.length-1;

        // switch to next plan or return to first
        (queryIndex==maxPlan)?queryIndex=0:queryIndex++

        let activePlan: Plan = plans[queryIndex];

        // load new plan into svelte store
        currentPlanStore.set(activePlan)
    }
</script>

<h2>Query Batches</h2>
<div class="rounded-border">
    {#each queries as query}
        <Button on:click={nextActivePlan}>{query.index}: {query.from} -> {query.to}</Button>
    {/each}
</div>


<style>
    .rounded-border {
        border: 1px solid black;
        border-radius: 8px;
        padding: 10px;
    }
</style>