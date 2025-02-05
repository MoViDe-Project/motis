<script lang="ts">
    import {Itinerary, Leg} from "@data/type-declarations/planTypes.ts";
    import {currentDefaultItineraryStore} from "sveltestore";
    import {Label} from "@/components/ui/label";

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
        <div>
            <Label>Itinerary-Index: {itinerary.index}</Label>
        </div>
        <div>
            {#each legs as leg}
                <div>
                    <Label>Mode: {leg.mode}</Label>
                </div>
                <div>
                    <Label>Duration: {leg.duration}</Label>
                </div>
                <div>
                    <Label>Start time: {leg.startTime}</Label>
                </div>
                <div>
                    <Label>End time: {leg.endTime}</Label>
                </div>
                <div>
                    <Label>Scheduled start time: {leg.scheduledStartTime}</Label>
                </div>
                <div>
                    <Label>Scheduled end time: {leg.scheduledEndTime}</Label>
                </div>
                <div>
                    <Label>Realtime: {leg.realTime}</Label>
                </div>
                <div>
                    <Label>Headsign: {leg.headsign}</Label>
                </div>
                <div>
                    <Label>Route short name: {leg.routeShortName}</Label>
                </div>
            {/each}
        </div>
    {/if}

</div>