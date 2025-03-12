<script lang="ts">
    import {Itinerary} from "@data/type-declarations/planTypes.ts";
    import {currentItineraryStore, shadowItineraryStore} from "sveltestore";
    import ConnectionDetail from "@/components/ui/ConnectionDetail.svelte";
    import {ItineraryShadow} from "@data/type-declarations/comparisonShadows.ts";

    let itinerary: Itinerary

    let shadowItinerary: ItineraryShadow

    // let queries be up-to-date with the store
    currentItineraryStore.subscribe((data) => {
            if (data == undefined) {
                itinerary = new Itinerary()
            } else {
                itinerary = data
            }
        }
    )

    // let queries be up-to-date with the store
    shadowItineraryStore.subscribe((data) => {
            if (data == undefined) {
                shadowItinerary = new ItineraryShadow(1)
            } else {
                shadowItinerary = data
            }
        }
    )

</script>

<div>
    {#if itinerary.duration === 0 && itinerary.legs.length === 0}
        <span> No itinerary currently selected</span>
    {:else}
        <div class="text-xl">
            <span class="">Itinerary-Index: {itinerary.index}</span>
        </div>
        {#if itinerary.duration !== 0}
            <div class="py-2">
                <ConnectionDetail itinerary={itinerary} shadowItinerary={shadowItinerary}/>
            </div>
            
        {/if}
    {/if}

</div>