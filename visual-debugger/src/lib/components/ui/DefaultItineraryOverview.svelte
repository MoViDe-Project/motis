<script lang="ts">
    import {Itinerary, Leg} from "@data/type-declarations/planTypes.ts";
    import {currentDefaultItineraryStore} from "sveltestore";
    import {Separator} from "@/components/ui/separator";
    import LegEntry from "@/components/ui/subcomponents/LegEntry.svelte";

    let itinerary: Itinerary

    let legs: Leg[]

    // let queries be up-to-date with the store
    currentDefaultItineraryStore.subscribe((data) => {
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
    {/if}

</div>