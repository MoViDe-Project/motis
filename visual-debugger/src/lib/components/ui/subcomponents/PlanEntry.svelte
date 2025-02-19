<script lang="ts">
    import {Button} from "@/components/ui/button";
    import {changeDefaultItineraryInterface, changeItineraryInterface} from "@data/componentInterface.ts";
    import {buildDefaultShadowObjects, buildShadowObjects} from "@data/compareObjects.ts";
    import {formatDurationSec} from "@/formatDuration.js";
    import {formatStringTime} from "@/toDateTime.js";

    // set to parent to "default" to change the currently displayed default itinerary
    let {parent = true, itinerary} = $props();

</script>

<div class="border-4 rounded-md p-2 my-2 {itinerary.cssClass}">
    <div class="grid grid-cols-2 grid-rows-2 gap-1 w-full">
        <div class="">
            Start Time: {formatStringTime(itinerary.startTime)}, End Time: {formatStringTime(itinerary.endTime)}
        </div>
        <div class="">
            Duration: {formatDurationSec(itinerary.duration)}
        </div>
        <div class="">
            Transfers: {itinerary.transfers}
        </div>
        <div>
            <Button on:click={() => {
                        if(parent==true){
                            // change currently displayed plan
                            changeItineraryInterface(itinerary.index)
                            buildShadowObjects()
                        }else{
                            //change currently displayed default
                             changeDefaultItineraryInterface(itinerary.index)
                             buildDefaultShadowObjects()
                        }
                    }
               }


                    variant="outline"
                    class="{itinerary.cssClass}">
                Select
            </Button>
        </div>

    </div>
</div>
