<script lang="ts">
    import {Itinerary, Leg} from "@data/type-declarations/planTypes.ts";
    import {currentItineraryStore} from "sveltestore";
    import {Separator} from "@/components/ui/separator";
    import LegEntry from "@/components/ui/subcomponents/LegEntry.svelte";
    import ConnectionDetail from "@/ConnectionDetail.svelte";

    let itinerary: Itinerary

    let legs: Leg[]

    // let queries be up-to-date with the store
    currentItineraryStore.subscribe((data) => {
            if (data == undefined) {
                itinerary = new Itinerary()
            } else {
                itinerary = data
                legs = data.legs
            }
        }
    )

</script>

<div>
    {#if itinerary == undefined}
        <label> No itinerary currently selected</label>
    {:else}
        <div class="text-xl">
            <span class="">Itinerary-Index: {itinerary.index}</span>
        </div>
        <Separator class="my-2"/>
        {#each legs as leg}
            <LegEntry leg={leg} />
            <Separator class="my-2"/>
        {/each}
        {#if itinerary.duration != 0}
            <ConnectionDetail itinerary={itinerary}/>
        {/if}
    {/if}

</div>