<script lang="ts">
    import {currentPlanStore} from "../../../sveltestore.ts";
    import type {Itinerary, Plan} from "../../../data-processing/parsing-types/planParsingTypes.ts";
    import PlanEntry from "$lib/components/ui/subcomponents/PlanEntry.svelte";
    import {Label} from "$lib/components/ui/label";
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
    <Label class="text-md">Plan of Query (Routing results)</Label>
    
    <!-- Scroll area for the plan entries. Has to be styled a bit more to look good. -->
    <ScrollArea orientation="vertical" class="h-96">
        <div class="grid grid-cols-1 gap-4">
            {#each itineraries as itinerary}
                <PlanEntry startTime="{itinerary.startTime}" endTime="{itinerary.endTime}"
                        duration="{itinerary.duration.toString()}" transfers="{itinerary.transfers.toString()}"/>
            {/each}
        </div>
    </ScrollArea>

</div>
