<script lang="ts">
    import {currentPlanStore} from "../../../sveltestore.ts";
    import type {Itinerary, Plan} from "../../../data-processing/parsing-types/planParsingTypes.ts";
    import PlanEntry from "$lib/components/ui/subcomponents/PlanEntry.svelte";

    let itineraries: Itinerary[]

    // let queries be up-to-date with the store
    currentPlanStore.subscribe((data) => {
            if (data == undefined) {
                itineraries = []
            }else{
                itineraries = data.itineraries;
            }
        }
    )
</script>

<h2>Plan of Query(Routing results)</h2>
<div class="rounded-border">
    {#each itineraries as itinerary}
        <PlanEntry startTime="{itinerary.startTime}" endTime="{itinerary.endTime}"
                   duration="{itinerary.duration.toString()}" transfers="{itinerary.transfers.toString()}"/>
    {/each}
</div>


<style>
    .rounded-border {
        border: 1px solid black;
        border-radius: 8px;
        padding: 10px;
    }
</style>