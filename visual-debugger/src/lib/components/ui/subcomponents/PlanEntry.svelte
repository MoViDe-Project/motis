<script lang="ts">
    import {Button} from "@/components/ui/button";
    import type {Itinerary} from "@data/type-declarations/planTypes.ts";
    import {cssClasses} from "@data/styling/cssClasses.ts";
    import {changeItinerary} from "@data/changeElements.ts";
    import {changeItineraryInterface} from "@data/componentInterface.ts";

    export let itinerary: Itinerary;

</script>

<div class="border-4 rounded-md p-2 my-2 {itinerary.cssClass}">
    <div class="grid grid-cols-2 grid-rows-2 gap-1 w-full">
        <div class="">
            StartTime: {itinerary.startTime}, EndTime: {itinerary.endTime}
        </div>
        <div class="">
            Duration: {itinerary.duration}
        </div>
        <div class="">
            Transfers: {itinerary.transfers}
        </div>
        <div>
            <Button on:click={() => changeItineraryInterface(itinerary.index)} variant="outline" class="{itinerary.cssClass}">
                Select
            </Button>
        </div>

    </div>
</div>
