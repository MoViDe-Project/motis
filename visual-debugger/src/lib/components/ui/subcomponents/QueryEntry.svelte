<script lang="ts">
    import {Button} from "@/components/ui/button";
    import type {Query} from "@data/type-declarations/queryTypes.ts";
    import {changePlanInterface} from "@data/componentInterface.ts";
    import {activeQueryIndexStore} from "sveltestore";

    export let query: Query
</script>

<div>
    <Button on:click={() => changePlanInterface(query.index)}
            variant={$activeQueryIndexStore === query.index ? "active" : "ghost_active"}>
        <span class="text-left w-full"> Index: {query.index} - {query.from} - {query.to}</span>
    </Button>
</div>