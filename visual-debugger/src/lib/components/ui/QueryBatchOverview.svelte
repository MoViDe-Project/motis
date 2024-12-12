<script>
    import QueryBatchEntry from "./QueryBatchEntry.svelte";
</script>

<h2>Query Batches</h2>
<div class="rounded-border">
    <QueryBatchEntry from="Darmstadt" to="Bamberg" />
    <QueryBatchEntry from="Bamberg" to="Darmstadt" />
</div>


<style>
    .rounded-border {
        border: 1px solid black;
        border-radius: 8px;
        padding: 10px;
    }
</style>