<script lang="ts">

    import type {Leg} from "@data/type-declarations/planTypes.js";
    import type {LegShadow} from "@data/type-declarations/comparisonShadows.ts";
    import MatchIndicator from "@/components/ui/subcomponents/MatchIndicator.svelte";

    export let leg: Leg;
    export let shadowLeg: LegShadow
</script>

<div class="grid grid-cols-2 gap-2">

    <div class="leading-9">
        <div>
            <span>
            <MatchIndicator attribute="{shadowLeg.mode}"/>
                Mode: {leg.mode}</span>
        </div>
        <div>
            <span>
                <MatchIndicator attribute="{shadowLeg.duration}"/>
                Duration: {leg.duration}
            </span>
        </div>
        <div>
            <span>
                <MatchIndicator attribute="{shadowLeg.startTime}"/>
                Start time: {leg.startTime}</span>
        </div>
        <div>
            <span>
                <MatchIndicator attribute="{shadowLeg.endTime}"/>
                End time: {leg.endTime}</span>
        </div>
        <div>
            <span>
               <MatchIndicator attribute="{shadowLeg.scheduledStartTime}"/>
                Scheduled start time: {leg.scheduledStartTime}</span>
        </div>
    </div>
    <div class="leading-9">
        <div>
            <span>
                <MatchIndicator attribute="{shadowLeg.scheduledEndTime}"/>
                Scheduled end time: {leg.scheduledEndTime}</span>
        </div>
        <div>
            <span>
                <MatchIndicator attribute="{shadowLeg.realTime}"/>
                Realtime: {leg.realTime}</span>
        </div>
        <div>
            <span>
                <MatchIndicator attribute="{shadowLeg.headsign}"/>
                Headsign: {leg.headsign}</span>
        </div>
        <div>
            <span>
                <MatchIndicator attribute="{shadowLeg.routeShortName}"/>
                Route short name: {leg.routeShortName}</span>
        </div>
    </div>
</div>