<script lang="ts">
    import {Button} from "@/components/ui/button";
    import {changeDefaultItineraryInterface, changeItineraryInterface} from "@data/componentInterface.ts";
    import {buildShadowOfDefaultItinerary, buildShadowOfItinerary} from "@data/compareObjects.ts";
    import {formatDurationSecWithSeconds} from "@/motis-helpers/formatDuration.js";
    import {formatStringTime} from "@/motis-helpers/toDateTime.js";
    import {activeItineraryIndexStore, activeDefaultItineraryIndexStore} from "sveltestore";
    import {Separator} from "@/components/ui/separator";
    import MatchIndicator from "@/components/ui/subcomponents/MatchIndicator.svelte";
    import {ItineraryAttributesShadow} from "@data/type-declarations/shadowTypes.ts";
    import {evalItinerary} from "@data/comparePlans.ts";

    // set to parent to "default" to change the currently displayed default itinerary
    let {parent = true, itinerary} = $props();

    function changeSelectedPlan() {
        return $activeItineraryIndexStore === itinerary.index ? "active" : "ghost_border";
    }

    function changeSelectedDefaultPlan() {
        return $activeDefaultItineraryIndexStore === itinerary.index ? "active" : "ghost_border";
    }
</script>

<div class="border-4 rounded-md p-2 my-2 {itinerary.state}">
    <div class="m-1">
        <span class="font-bold">Itinerary Index: {itinerary.index}</span>
        <Separator class="bg-black m-2"></Separator>
        <div class="grid grid-cols-6 grid-rows-2 gap-1 w-full text-sm lg:text-base">
            <div class="col-span-2 grid grid-cols-7 content-center">
                <div class="col-span-1 content-center">
                    <MatchIndicator attribute={evalItinerary(itinerary.index).startTime}/>
                </div>
                <div class="col-span-6">
                    Start Time: {formatStringTime(itinerary.startTime)}
                </div>
            </div>

            <div class="col-span-2 grid grid-cols-7 content-center">
                <div class="col-span-1 content-center">
                    <MatchIndicator attribute={evalItinerary(itinerary.index).endTime}/>
                </div>
                <div class="col-span-6">
                    End Time: {formatStringTime(itinerary.endTime)}
                </div>
            </div>

            <div class="col-span-2 grid grid-cols-7 content-center">
                <div class="col-span-1">
                    <MatchIndicator attribute={evalItinerary(itinerary.index).transfers}/>
                </div>
                <div class="col-span-6">
                    Transfers: {itinerary.transfers}
                </div>
            </div>

            <div class="col-span-3 grid grid-cols-11 content-center">
                <div class="col-span-1">
                    <MatchIndicator attribute={evalItinerary(itinerary.index).duration}/>
                </div>
                <div class="col-span-10">
                    Duration: {formatDurationSecWithSeconds(itinerary.duration)}
                </div>
            </div>


            <div class="col-span-3 content-center">
                <Button class="w-full" on:click={() => {
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
