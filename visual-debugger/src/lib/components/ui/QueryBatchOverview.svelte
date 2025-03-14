<script lang="ts">
    import {interpolatedQueryStore} from "sveltestore";
    import type {Query} from "@data/type-declarations/queryTypes.ts";
    import {ScrollArea} from "$lib/components/ui/scroll-area/index.js";
    import QueryEntry from "@/components/ui/subcomponents/QueryEntry.svelte";

    let queries: Query[]

    // let queries be up-to-date with the store
    interpolatedQueryStore.subscribe((data) =>
        queries = data
    )
</script>


<div class="h-full">
    <ScrollArea class="rounded-md border h-full p-2">
        {#each queries as query}
            <div class="p-1">
                <QueryEntry query={query}/>
            </div>
        {/each}
    </ScrollArea>
</div>
