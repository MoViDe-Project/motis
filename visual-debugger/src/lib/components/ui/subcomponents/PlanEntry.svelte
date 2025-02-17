<script lang="ts">
    import {Button} from "@/components/ui/button";
    import {changeDefaultItineraryInterface, changeItineraryInterface} from "@data/componentInterface.ts";

    // set to parent to "default" to change the currently displayed default itinerary
    let {parent = 'current', itinerary} = $props();

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
            <Button on:click={() => {parent==="current"?changeItineraryInterface(itinerary.index):changeDefaultItineraryInterface(itinerary.index)}}
                    variant="outline"
                    class="{itinerary.cssClass}">
                Select
            </Button>
        </div>

    </div>
</div>
