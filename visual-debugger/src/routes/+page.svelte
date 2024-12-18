<script>
    import Button from '$lib/components/ui/Button.svelte';
    import FileUpload from '$lib/components/ui/FileUpload.svelte';
    import QueryBatchOverview from '$lib/components/ui/QueryBatchOverview.svelte';
</script>

<style>
    .center {
        display: block;
        margin-left: auto;
        margin-right: auto;
    }
    .horizontal-container {
        display: flex;
        align-items: center;
        gap: 1rem; /* space between elements */
    }
</style>

<img src="/logo.svg" alt="MoViDe logo" style="width: 100px; height: 100px;" class="center">

<div class="horizontal-container">
    <h1>Welcome to MoViDe (MOTIS Visual Debugger)</h1>
</div>

<div class="horizontal-container">    
    <FileUpload />
    <Button title="Confirm Upload"/>
</div>

<div class="horizontal-container">
    <QueryBatchOverview />
    <!-- TODO journey Details to the right of the query batch overview -->
</div>