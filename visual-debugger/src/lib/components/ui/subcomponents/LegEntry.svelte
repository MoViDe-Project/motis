<script lang="ts">

import {Label} from "@/components/ui/label/index.js";
import type {Leg} from "@data/type-declarations/planTypes.js";
export let leg:Leg;
</script>

<div class="grid grid-cols-2 gap-2">

    <div class="leading-9">
        <div>
            <span>Mode: {leg.mode}</span>
        </div>
        <div>
            <span>Duration: {leg.duration}</span>
        </div>
        <div>
            <span>Start time: {leg.startTime}</span>
        </div>
        <div>
            <span>End time: {leg.endTime}</span>
        </div>
        <div>
            <span>Scheduled start time: {leg.scheduledStartTime}</span>
        </div>
    </div>
    <div class="leading-9">
        <div>
            <span>Scheduled end time: {leg.scheduledEndTime}</span>
        </div>
        <div>
            <span>Realtime: {leg.realTime}</span>
        </div>
        <div>
            <span>Headsign: {leg.headsign}</span>
        </div>
        <div>
            <span>Route short name: {leg.routeShortName}</span>
        </div>
    </div>
</div>