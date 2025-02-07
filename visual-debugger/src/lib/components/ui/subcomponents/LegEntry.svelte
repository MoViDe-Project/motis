<script lang="ts">

import {Label} from "@/components/ui/label/index.js";
import type {Leg} from "@data/type-declarations/planTypes.js";
export let leg:Leg;
</script>

<div class="grid grid-cols-2 gap-2">

    <div class="leading-9">
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
    </div>
    <div class="leading-9">
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
    </div>
</div>