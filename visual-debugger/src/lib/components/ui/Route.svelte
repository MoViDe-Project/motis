<script lang="ts">
    import {getModeStyle, routeColor, type LegLike} from '@/modeStyle.ts';
    import {cn} from '@/utils.ts';
    import type {LegShadow} from "@data/type-declarations/shadowTypes.ts";
    import MatchIndicator from "@/components/ui/subcomponents/MatchIndicator.svelte";

    const {
        l,
        class: className,
        onClickTrip,
        shadowLeg
    }: {
        l: LegLike;
        class?: string;
        onClickTrip: (tripId: string) => void;
        shadowLeg: LegShadow
    } = $props();

    const modeIcon = getModeStyle(l)[0];
</script>

<button
        class={cn(
		'flex items-center text-nowrap rounded-full pl-2 pr-1 h-8 font-bold',
		className,
		l.routeShortName ? 'pr-3' : undefined
	)}
        style={routeColor(l)}
        onclick={() => {
		if (l.tripId) {
			onClickTrip(l.tripId);
		} else {
			console.log('tripId missing', l);
		}
	}}
>
    <svg class="relative mr-2 min-w-6 min-h-6 max-w-6 max-h-6 rounded-full">
        <use xlink:href={`#${modeIcon}`}></use>
    </svg>
    <div>
        <MatchIndicator attribute={shadowLeg.routeShortName}></MatchIndicator>
    </div>
    <div class="text-center">
        {l.routeShortName}
    </div>
</button>
