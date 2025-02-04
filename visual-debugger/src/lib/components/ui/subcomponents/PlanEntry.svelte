<script lang="ts">
    import {Button} from "@/components/ui/button";
    import type {Itinerary} from "@data/type-declarations/planTypes.ts";

    export let itinerary: Itinerary;

</script>

<div class="border-4 rounded-md p-2 my-2 {itinerary.match ? 'border-green-600 bg-green-400' : 'border-red-600 bg-red-400'}">
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
            <Button variant="outline" class="{itinerary.cssClass}">
                Select
            </Button>
        </div>

    </div>
</div>
