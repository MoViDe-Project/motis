<script lang="ts">
    import {Itinerary, Leg} from "@data/type-declarations/planTypes.ts";
    import {currentDefaultItineraryStore, defaultShadowItineraryStore, shadowItineraryStore} from "sveltestore";
    import {Separator} from "@/components/ui/separator";
    import LegEntry from "@/components/ui/subcomponents/LegEntry.svelte";
    import ConnectionDetail from "@/components/ui/ConnectionDetail.svelte";
    import {ItineraryShadow} from "@data/type-declarations/comparisonShadows.ts";

    let itinerary: Itinerary

    let shadowItinerary: ItineraryShadow

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

    // let queries be up-to-date with the store
    defaultShadowItineraryStore.subscribe((data) => {
            if (data == undefined) {
                shadowItinerary = new ItineraryShadow(1)
            } else {
                shadowItinerary = data
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
            
            {#each legs as leg,index}
                <Separator class="my-2"/>
                <LegEntry leg={leg} shadowLeg={shadowItinerary.legs[index]} />
                
            {/each}
            <Separator class="my-2"/>
        {/if}
        {#if itinerary.duration != 0}
            <div class="py-2">
                <ConnectionDetail itinerary={itinerary} shadowItinerary={shadowItinerary}/>
            </div>
            
        {/if}
    {/if}

</div>