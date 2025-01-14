<script lang="ts">
    // components
    import FileUpload from '$lib/components/ui/FileUpload.svelte';
    import { Button } from "$lib/components/ui/button";
    import QueryBatchOverview from '$lib/components/ui/QueryBatchOverview.svelte';
    import PlanOverview from "$lib/components/ui/PlanOverview.svelte";
    // data-processing functions
    import {computePlan} from "../data-processing/planParsing.ts";

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
    <Button on:click={computePlan}>Compute Routes</Button>
</div>

<!-- Query Batch, journey details -->
<div class="flex items-center justify-center gap-4 my-4">
    <QueryBatchOverview />
    <PlanOverview />
</div>

