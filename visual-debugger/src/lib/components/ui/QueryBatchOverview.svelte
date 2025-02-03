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
    import {Separator} from "@/components/ui/separator";
    import { ScrollArea } from "$lib/components/ui/scroll-area/index.js";

    let queries: Query[]

    // let queries be up-to-date with the store
    interpolatedQueryStore.subscribe((data) =>
        queries = data
    )

    // attributes for switching of current plan
    let plans: Plan[];
    let defaultPlans: Plan[];

    // state for selected link
    let activeIndex: number | null = null;

    /**
     * Changes the currently displayed plan to the one given in the index
     */
    function changePlan(queryIndex: number) {
        // change highlighed link
        activeIndex = queryIndex;
        
        // get current plan data
        planDatasetStore.subscribe((data) => {
                plans = data

                //if no plan was previously computed, alert the user of this
                if (data === new Array<Plan>) {
                    alert("No plans found, please compute the queries before trying to switch between their data.")
                    return
                }
            }
        )

        // return if the store is still empty (this means the function was called to early)
        if (plans === new Array<Plan>) return;

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

 <!-- variant={activeIndex === query.index ? "ghost_active" : "ghost"} -->
<div class="h-full">
    <ScrollArea class="rounded-md border h-full">
        {#each queries as query}
            <div class="my-1">
                <Button on:click={() => changePlan(query.index)} variant={activeIndex === query.index ? "ghost_active" : "ghost"}>
                    {query.from} - {query.to}</Button>
            </div>
            <!-- <Separator class="my-1"/> -->
        {/each}
    </ScrollArea>
</div>
