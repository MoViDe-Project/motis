<!--

	Component to display formatted time based on provided timestamps and variant.

	Props:
	- class (optional): Additional CSS classes to apply to the component.
	- timestamp (string): The timestamp to be displayed.
	- scheduledTimestamp (string): The scheduled timestamp for comparison.
	- isRealtime (boolean): Flag indicating if the time is in real-time.
	- variant ('schedule' | 'realtime' | 'realtime-show-always'): Determines which time to display and under what conditions.

	Derived values:
	- t: Date object derived from the provided timestamp.
	- scheduled: Date object derived from the scheduled timestamp.
	- delayMinutes: The difference in minutes between the timestamp and the scheduled timestamp.
	- highDelay: Boolean indicating if the delay is more than 3 minutes and is in real-time.
	- lowDelay: Boolean indicating if the delay is 3 minutes or less and is in real-time.

	Conditional rendering:
	- If variant is 'schedule', the scheduled time is displayed.
	- If variant is 'realtime-show-always' or (variant is 'realtime' and isRealtime is true), the real-time is displayed with conditional styling based on delay.
-->
<script lang="ts">
	import { formatTime } from './toDateTime';
	import { cn } from './utils';

	let {
		class: className,
		timestamp,
		scheduledTimestamp,
		isRealtime,
		variant
	}: {
		class?: string;
		timestamp: string;
		scheduledTimestamp: string;
		isRealtime: boolean;
		variant: 'schedule' | 'realtime' | 'realtime-show-always';
	} = $props();

	const t = $derived(new Date(timestamp));
	const scheduled = $derived(new Date(scheduledTimestamp));
	const delayMinutes = $derived((t.getTime() - scheduled.getTime()) / 60000);
	const highDelay = $derived(isRealtime && delayMinutes > 3);
	const lowDelay = $derived(isRealtime && delayMinutes <= 3);
</script>

<div class={cn('text-nowrap', className)}>
	{#if variant == 'schedule'}
		{formatTime(scheduled)}
	{:else if variant === 'realtime-show-always' || (variant === 'realtime' && isRealtime)}
		<div class:text-destructive={highDelay} class:text-green-600={lowDelay}>
			{formatTime(t)}
		</div>
	{/if}
</div>
