<script lang="ts">
    import {computedPlanStore, currentPlanStore, interpolatedQueryStore} from "../../../sveltestore.ts";
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

    /**
     * Changes the currently displayed plan to the next one
     */
    function nextPlan(queryIndex: number) {
        // get current plan data
        computedPlanStore.subscribe((data) => {
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
        currentPlanStore.set(plans[queryIndex-1])
    }

</script>

<h2>Query Batches</h2>
<div class="rounded-border">
    {#each queries as query}
        <Button on:click={() => nextPlan(query.index)}> {query.index}: {query.from} -> {query.to}</Button>
    {/each}
</div>


<style>
    .rounded-border {
        border: 1px solid black;
        border-radius: 8px;
        padding: 10px;
    }
</style>