<script lang="ts">
    import QueryFileUpload from '@/components/ui/upload/FileUpload.svelte';
    import QueryBatchOverview from '$lib/components/ui/QueryBatchOverview.svelte';
    import PlanOverview from "$lib/components/ui/PlanOverview.svelte";
    import DefaultPlanOverview from "@/components/ui/DefaultPlanOverview.svelte";
    import DefaultPlanUpload from "@/components/ui/upload/DefaultPlanUpload.svelte";
    import {Button} from "$lib/components/ui/button";
    import {computePlan, downloadPlans} from "../data-processing/planParsing.ts";
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
    <QueryFileUpload/>
    <Button on:click={computePlan}>Compute Routes</Button>
    <Button on:click={downloadPlans}>Download this data as default</Button>
    <DefaultPlanUpload></DefaultPlanUpload>
</div>

<!-- Query Batch, journey details -->
<div class="flex items-center justify-center gap-4 my-4">
    <QueryBatchOverview/>
    <PlanOverview/>
    <DefaultPlanOverview/>
</div>

