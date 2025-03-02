<script lang="ts">
    import {Button} from "@/components/ui/button";
    import {changeDefaultItineraryInterface, changeItineraryInterface} from "@data/componentInterface.ts";
    import {buildShadowOfDefaultItinerary, buildShadowOfItinerary} from "@data/compareObjects.ts";
    import {formatDurationSec, formatDurationSecWithSeconds} from "@/formatDuration.js";
    import {formatStringTime} from "@/toDateTime.js";
    import {activeItineraryIndexStore, activeDefaultItineraryIndexStore} from "sveltestore";
    import {Separator} from "@/components/ui/separator";

    // set to parent to "default" to change the currently displayed default itinerary
    let {parent = true, itinerary} = $props();

    function changeSelectedPlan() {
        return $activeItineraryIndexStore === itinerary.index ? "active" : "ghost_border";
    }

    function changeSelectedDefaultPlan() {
        return $activeDefaultItineraryIndexStore === itinerary.index ? "active" : "ghost_border";
    }

</script>

<div class="border-4 rounded-md p-2 my-2 {itinerary.cssClass}">
    <div class="items-center m-1">
        <span class="font-bold">Itinerary Index: {itinerary.index}</span>
        <Separator class="bg-black m-2"></Separator>
        <div class="grid grid-cols-2 grid-rows-2 gap-1 w-full">
            <div class="">
                Start Time: {formatStringTime(itinerary.startTime)}, End Time: {formatStringTime(itinerary.endTime)}
            </div>
            <div class="">
                Duration: {formatDurationSecWithSeconds(itinerary.duration)}
            </div>
            <div class="">
                Transfers: {itinerary.transfers}
            </div>
            <div>
                <Button on:click={() => {
                        if(parent===true){
                            // change currently displayed plan
                            changeItineraryInterface(itinerary.index)
                            buildShadowOfItinerary()
                        }else{
                            //change currently displayed default
                             changeDefaultItineraryInterface(itinerary.index)
                             buildShadowOfDefaultItinerary()
                        }
                    }
               }
                        variant={parent === true ? changeSelectedPlan() : changeSelectedDefaultPlan()}
                >
                    Select
                </Button>
            </div>

        </div>
    </div>
</div>
