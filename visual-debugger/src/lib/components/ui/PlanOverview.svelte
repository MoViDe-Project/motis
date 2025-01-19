<script lang="ts">
    import {currentPlanStore} from "../../../sveltestore.ts";
    import type {Itinerary} from "../../../data-processing/parsing-types/planParsingTypes.ts";
    import PlanEntry from "$lib/components/ui/subcomponents/PlanEntry.svelte";
    import {ScrollArea} from "$lib/components/ui/scroll-area/index.js";

    let itineraries: Itinerary[]

    // let queries be up-to-date with the store
    currentPlanStore.subscribe((data) => {
            if (data == undefined) {
                itineraries = []
            } else {
                itineraries = data.itineraries;
            }
        }
    )
</script>


<div>
    <!-- Scroll area for the plan entries. Has to be styled a bit more to look good. -->
    <ScrollArea orientation="vertical" class="h-96">
        <div class="p-4 border">
            {#each itineraries as itinerary}
                <PlanEntry startTime="{itinerary.startTime}" endTime="{itinerary.endTime}"
                           duration="{itinerary.duration.toString()}" transfers="{itinerary.transfers.toString()}"/>
            {/each}
        </div>
    </ScrollArea>

</div>
