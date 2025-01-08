<script>
    // import Button from '$lib/components/ui/Button.svelte';
    import FileUpload from '$lib/components/ui/FileUpload.svelte';
    import QueryBatchOverview from '$lib/components/ui/QueryBatchOverview.svelte';
    import { Button } from "$lib/components/ui/button";
    import {getQueryAttributes} from "../data-processing/query-build";



    // call bridge to import the queries to QueryBatchOverview
    const importQueries = () => {
        console.log("importing queries")
        getQueryAttributes()
    }

    import PlanOverview from "$lib/components/ui/PlanOverview.svelte";
</script>

<svelte:head>
    <title>MoViDe</title>
</svelte:head>

<!-- Logo -->
<img src="/logo.svg" alt="MoViDe logo" class="w-24 h-24 mx-auto my-4">

<!-- Heading -->
<div class="flex items-center justify-center gap-4 my-4">
    <h1 class="text-2xl font-bold">Welcome to MoViDe (MOTIS Visual Debugger)</h1>
</div>

<!-- File Upload -->
<div class="flex items-center justify-center gap-4 my-4">    
    <FileUpload />
    <Button on:click={importQueries}>Confirm Upload</Button>
</div>

<!-- Query Batch, journey details -->
<div class="flex items-center justify-center gap-4 my-4">
    <QueryBatchOverview />
    <PlanOverview />
    <!-- TODO journey details to the right of the query batch overview -->
</div>