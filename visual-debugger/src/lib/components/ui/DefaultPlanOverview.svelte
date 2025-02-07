<script lang="ts">
    import {currentDefaultPlanStore} from "sveltestore";
    import type {Itinerary} from "@data/type-declarations/planTypes.ts";
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

<ScrollArea class="rounded-md border h-full">
    {#each itineraries as itinerary}
        <PlanEntry itinerary="{itinerary}"/>
    {/each}
</ScrollArea>


