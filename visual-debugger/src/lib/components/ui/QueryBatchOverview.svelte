<script lang="ts">
    import QueryBatchEntry from "./QueryBatchEntry.svelte"
    import type {Query} from "../../../data-processing/query-build";
    import {interpolatedQueryStore} from "../../../sveltestore.ts";

    let queries: Query[]

    // let queries be up-to-date with the store
    interpolatedQueryStore.subscribe((data) =>
        queries = data
    )
</script>

<h2>Query Batches</h2>
<div class="rounded-border">
    {#each queries as query}
        <QueryBatchEntry from="{query.from}" to="{query.to}" fromId="{query.fromStopID}" toId="{query.toStopID}" />
    {/each}
</div>


<style>
    .rounded-border {
        border: 1px solid black;
        border-radius: 8px;
        padding: 10px;
    }
</style>