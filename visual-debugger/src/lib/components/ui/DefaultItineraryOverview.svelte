<script lang="ts">
    import {Itinerary, Leg} from "@data/type-declarations/planTypes.ts";
    import {currentDefaultItineraryStore} from "sveltestore";
    import {Separator} from "@/components/ui/separator";
    import LegEntry from "@/components/ui/subcomponents/LegEntry.svelte";
    import ConnectionDetail from "@/components/ui/ConnectionDetail.svelte";

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
    {#if itinerary.duration == 0 && itinerary.legs.length == 0}
        <span> No itinerary currently selected</span>
    {:else}
        <div class="text-xl">
            <span class="">Itinerary-Index: {itinerary.index}</span>
        </div>
        {#if legs.length > 0}
            
            {#each legs as leg}
                <Separator class="my-2"/>
                <LegEntry leg={leg} />
                
            {/each}
            <Separator class="my-2"/>
        {/if}
        {#if itinerary.duration != 0}
            <div class="py-2">
                <ConnectionDetail itinerary={itinerary}/>
            </div>
            
        {/if}
    {/if}

</div>