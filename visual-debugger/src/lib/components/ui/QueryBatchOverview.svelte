<script lang="ts">
    // import subcomponents
    import QueryBatchEntry from "./QueryBatchEntry.svelte"

    // import query type to access attributes
    import type {query} from "../../../data-processing/query-build";

    // import store component
    import {query_store} from "../../../sveltestore.ts";

    let queries: query[]

    // let queries be up-to-date with the store
    query_store.subscribe((data) =>
        queries = data
    )
</script>

<h2>Query Batches</h2>
<div class="rounded-border">
    {#each queries as query}
        <QueryBatchEntry from="{query.from}" to="{query.to}" />
    {/each}
</div>


<style>
    .rounded-border {
        border: 1px solid black;
        border-radius: 8px;
        padding: 10px;
    }
</style>