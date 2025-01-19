<script lang="ts">
    import {currentDefaultPlanStore} from "../../../sveltestore.ts";
    import type {Itinerary} from "../../../data-processing/parsing-types/planParsingTypes.ts";
    import PlanEntry from "$lib/components/ui/subcomponents/PlanEntry.svelte";
    import {ScrollArea} from "@/components/ui/scroll-area";

    let itineraries: Itinerary[]
    // let queries be up-to-date with the store
    currentDefaultPlanStore.subscribe((data) => {
            if (data == undefined) {
                itineraries = []
            } else {
                itineraries = data.itineraries;
            }
        }
    )
</script>
<div>
    <ScrollArea orientation="vertical" class="h-96">
        <div class="p-4 border">
            {#each itineraries as itinerary}
                <PlanEntry startTime="{itinerary.startTime}" endTime="{itinerary.endTime}"
                           duration="{itinerary.duration.toString()}" transfers="{itinerary.transfers.toString()}"/>
            {/each}
        </div>
    </ScrollArea>
</div>

