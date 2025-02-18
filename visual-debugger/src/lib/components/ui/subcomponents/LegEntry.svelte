<script lang="ts">

    import type {Leg} from "@data/type-declarations/planTypes.js";
    import type {LegShadow} from "@data/type-declarations/comparisonShadows.ts";

    export let leg: Leg;
    export let shadowLeg: LegShadow
</script>

<div class="grid grid-cols-2 gap-2">

    <div class="leading-9">
        <div>
            <span>
            {#if shadowLeg.mode}
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                     stroke="#26a269" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                     class="lucide lucide-check"><path d="M20 6 9 17l-5-5"/></svg>
                {:else}
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                     stroke="#a51d2d" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                     class="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            {/if}
                Mode: {leg.mode}</span>
        </div>
        <div>
            <span>
                {#if shadowLeg.duration}
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                     stroke="#26a269" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                     class="lucide lucide-check"><path d="M20 6 9 17l-5-5"/></svg>
                {:else}
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                     stroke="#a51d2d" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                     class="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            {/if}
                Duration: {leg.duration}</span>
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