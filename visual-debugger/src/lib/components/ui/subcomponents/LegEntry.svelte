<script lang="ts">

    import type {Leg} from "@data/type-declarations/planTypes.js";
    import type {LegShadow} from "@data/type-declarations/shadowTypes.ts";
    import MatchIndicator from "@/components/ui/subcomponents/MatchIndicator.svelte";
    import {formatStringTime, formatTime} from "@/toDateTime.js";
    import {json} from "@sveltejs/kit";
    import {formatDurationSec} from "@/formatDuration.js";

    export let leg: Leg;
    export let shadowLeg: LegShadow
</script>


<div class="leading-9">
    <div class="flex items-center">
        <MatchIndicator attribute="{shadowLeg.mode}"/>
        <span>
                Mode: {leg.mode}
            </span>
    </div>
    <div class="flex items-center">
        <MatchIndicator attribute="{shadowLeg.duration}"/>
        <span>
                Duration: {formatDurationSec(leg.duration)}
            </span>
    </div>
    <div class="flex items-center">
        <MatchIndicator attribute="{shadowLeg.startTime}"/>
        <span>
                Start time: {formatStringTime(leg.startTime)}</span>
    </div>
    <div class="flex items-center">
        <MatchIndicator attribute="{shadowLeg.endTime}"/>
        <span>
                End time: {formatStringTime(leg.endTime)}</span>
    </div>
    <div class="flex items-center">
        <MatchIndicator attribute="{shadowLeg.scheduledStartTime}"/>
        <span>
                Scheduled start time: {formatStringTime(leg.scheduledStartTime)}</span>
    </div>
</div>
<div class="leading-9">
    <div class="flex items-center">
        <MatchIndicator attribute="{shadowLeg.scheduledEndTime}"/>
        <span>
                Scheduled end time: {formatStringTime(leg.scheduledEndTime)}</span>
    </div>
    <div class="flex items-center">
        <MatchIndicator attribute="{shadowLeg.realTime}"/>
        <span>
                Realtime: {leg.realTime}</span>
    </div>
    <div class="flex items-center">
        <MatchIndicator attribute="{shadowLeg.headsign}"/>
        <span>
                Headsign: {leg.headsign}</span>
    </div>
    <div class="flex items-center">
        <MatchIndicator attribute="{shadowLeg.routeShortName}"/>
        <span>
                Route short name: {leg.routeShortName}</span>
    </div>
</div>
