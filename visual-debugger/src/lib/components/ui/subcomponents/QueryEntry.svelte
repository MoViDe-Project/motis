<script lang="ts">
    import {Button} from "@/components/ui/button";
    import type {Query} from "@data/type-declarations/queryTypes.ts";
    import {changePlanInterface} from "@data/componentInterface.ts";
    import {activeQueryStore} from "sveltestore";

    export let query: Query
</script>

<div>
    <Button on:click={() => changePlanInterface(query.index)}
            variant={$activeQueryStore === query.index ? "ghost_active" : "ghost"}>
        <span class="text-left w-full">{query.from} - {query.to}</span>
    </Button>
</div>