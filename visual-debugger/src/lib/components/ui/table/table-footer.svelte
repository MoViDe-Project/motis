<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import { cn } from "@/motis-helpers/utils.js";

	type $$Props = HTMLAttributes<HTMLTableSectionElement>;

	let className: $$Props["class"] = undefined;
	export { className as class };
</script>

<tfoot class={cn("bg-muted/50 text-primary-foreground font-medium", className)} {...$$restProps}>
	<slot />
</tfoot>
