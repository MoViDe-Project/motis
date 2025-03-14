<script lang="ts">
    import {currentPlanStore} from "sveltestore";
    import type {Itinerary} from "@data/type-declarations/planTypes.ts";
    import PlanEntry from "@/components/ui/subcomponents/PlanEntry.svelte";
    import {ScrollArea} from "@/components/ui/scroll-area";

    let itineraries: Itinerary[]

    // let queries be up-to-date with the store
    currentPlanStore.subscribe((data) => {
            if (data == undefined) {
                itineraries = []
                alert("No plans found. Please compute them first.")
            } else {
                itineraries = data.itineraries;
            }
        }
    )


</script>


<!-- Scroll area for the plan entries. Has to be styled a bit more to look good. -->
<ScrollArea class="rounded-md border h-full">
    {#each itineraries as itinerary}
        <PlanEntry parent={true} itinerary="{itinerary}"/>
    {/each}
</ScrollArea>


