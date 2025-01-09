<script lang="ts">
    // components
    import FileUpload from '$lib/components/ui/FileUpload.svelte';
    import { Button } from "$lib/components/ui/button";
    import QueryBatchOverview from '$lib/components/ui/QueryBatchOverview.svelte';
    import PlanOverview from "$lib/components/ui/PlanOverview.svelte";
    // stores
    import {computedPlanStore, currentPlanStore} from "../sveltestore.js";
    // data-processing functions
    import {getPlan} from "../data-processing/planParsing.ts";
    // types
    import type {Plan} from "../data-processing/parsing-types/planParsingTypes.js";

    // attributes for switching of current plan
    let queryIndex = 0
    let plans: Plan[];

    /**
     * Changes the currently displayed plan to the next one
     */
    const nextActivePlan = () => {
        // get all plan data
        computedPlanStore.subscribe((data) =>
            plans = data
        )

        // return if the store is still empty (this means the function was called to early)
        if(typeof plans == undefined) return

        let maxPlan = plans.length-1;

        // switch to next plan or return to first
        (queryIndex==maxPlan)?queryIndex=0:queryIndex++

        let activePlan: Plan = plans[queryIndex];

        // load new plan into svelte store
        currentPlanStore.set(activePlan)
    }

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
    <Button on:click={getPlan}>Compute Routes</Button>
    <Button on:click={nextActivePlan}>Next Plan</Button>
</div>

<!-- Query Batch, journey details -->
<div class="flex items-center justify-center gap-4 my-4">
    <QueryBatchOverview />
    <PlanOverview />
</div>

