<script lang="ts">
    import {currentPlanStore} from "../../../sveltestore.ts";
    import type {Itinerary} from "../../../data-processing/parsing-types/planParsingTypes.ts";
    import PlanEntry from "$lib/components/ui/subcomponents/PlanEntry.svelte";
    import {ScrollArea} from "$lib/components/ui/scroll-area/index.js";

    let itineraries: Itinerary[]

    // let queries be up-to-date with the store
    currentPlanStore.subscribe((data) => {
            itineraries = data.itineraries;
        }
    )


</script>


<!-- Scroll area for the plan entries. Has to be styled a bit more to look good. -->
<ScrollArea class="rounded-md border h-full">
    {#each itineraries as itinerary}
        <PlanEntry cssClass="" startTime="{itinerary.startTime}" endTime="{itinerary.endTime}"
                   duration="{itinerary.duration.toString()}" transfers="{itinerary.transfers.toString()}"/>
    {/each}
</ScrollArea>


