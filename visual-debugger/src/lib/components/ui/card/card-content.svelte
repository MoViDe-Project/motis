<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import { cn } from "@/motis-helpers/utils.js";

	type $$Props = HTMLAttributes<HTMLDivElement>;

	let className: $$Props["class"] = undefined;
	export { className as class };
</script>

<div class={cn("p-6", className)} {...$$restProps}>
	<slot />
</div>
