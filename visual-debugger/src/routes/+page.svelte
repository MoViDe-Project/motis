<script lang="ts">
    import {Button} from "$lib/components/ui/button/index.js";
    import QueryBatchOverview from "@/components/ui/QueryBatchOverview.svelte";
    import QueryUpload from "@/components/ui/upload/QueryUpload.svelte";
    import DefaultPlanUpload from "@/components/ui/upload/DefaultPlanUpload.svelte";
    import PlanOverview from "@/components/ui/plan-overviews/PlanOverview.svelte";
    import DefaultPlanOverview from "@/components/ui/plan-overviews/DefaultPlanOverview.svelte";
    import {
        defaultPlanDatasetStore,
        planDatasetStore,
        showMatchedStore,
        showMismatchedStore,
        numberOfFailedItinerariesStore,
        currentDefaultPlanStore
    } from "sveltestore";

    // Dark Mode imports
    import Sun from "lucide-svelte/icons/sun";
    import Moon from "lucide-svelte/icons/moon";
    import {toggleMode} from "mode-watcher";
    import {
        comparePlansInterface,
        computePlansInterface,
        downloadPlanInterface,
        filterOutMatchedInterface, filterOutMismatchedInterface,
        resetItinerariesWithFilterMatchedInterface,
        resetItinerariesWithFilterMismatchedInterface
    } from "@data/componentInterface.ts";
    import {Checkbox} from "$lib/components/ui/checkbox";
    import {Label} from "$lib/components/ui/label";

    // call the plan compare logic upon both upload of default plan and plan computation
    $: if (!($defaultPlanDatasetStore.length == 0) && !($planDatasetStore.length == 0)) {
        comparePlansInterface()
    }


</script>
<!-- Container and flex logic from https://tailwindcss.com/docs/container -->
<div class="h-screen w-screen my-4 flex flex-col">

    <!-- Header -->
    <div class="md:h-1/6 w-full flex flex-col md:flex-row gap-2 px-4">

        <!-- Logo & Dark Mode -->
        <div class="basis-full md:basis-1/2 flex flex-row md:place-content-start justify-center">

            <div class="h-32 md:h-full p-4 content-start">
                <img src="/logo_clipped.svg" alt="MoViDe logo" class="h-full">
            </div>

            <div class="content-center">

                <Button on:click={toggleMode} variant="outline" size="icon">
                    <Sun
                            class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
                    />
                    <Moon
                            class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
                    />
                    <span class="sr-only">Toggle theme</span>
                </Button>
            </div>
        </div>


        <!-- File handling -->
        <div class="basis-full md:basis-1/2 flex flex-row-reverse gap-2 items-center md:place-content-end justify-center">
            <div class="flex flex-col gap-2">
                <Button on:click={computePlansInterface}>Compute routing</Button>
                <Button variant="default" on:click={downloadPlanInterface}>Download data as default plan</Button>
            </div>
            <div class="flex flex-col gap-2">
                <QueryUpload/>
                <DefaultPlanUpload/>
            </div>
        </div>

    </div>

    <!-- Main content -->
    <div class="h-3/4 w-full my-2 md:flex md:flex-row">

        <div class="basis-full md:basis-1/3 grid grid-rows-12">

            <div class="p-2 row-span-1 content-end">
                <h1 class="text-xl">Query Batch Overview</h1>
            </div>

            <div class="px-2 row-span-11 h-full">
                <QueryBatchOverview/>
            </div>

        </div>

        <!-- Comparisons -->
        <div class="basis-full h-5/6 md:h-full md:basis-2/3 grid grid-rows-12 grid-cols-2">

            <!-- Filtering options -->
            <div class="col-span-2 flex justify-center">
                <div class="flex flex-row items-center gap-4">
                    Plan Filter options:
                    <div class="flex items-center">
                        <Checkbox id="filter2" bind:checked={$showMismatchedStore}
                                  on:click={() => $showMismatchedStore ? filterOutMatchedInterface() : resetItinerariesWithFilterMismatchedInterface($showMatchedStore)}/>
                        <Label
                                for="filter2"
                                class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ml-2"
                        >
                            Show Matched
                        </Label>
                    </div>
                    <div class="flex items-center">
                        <Checkbox id="filter" bind:checked={$showMatchedStore}
                                  on:click={() => $showMatchedStore ? filterOutMismatchedInterface() : resetItinerariesWithFilterMatchedInterface($showMismatchedStore)}/>
                        <Label
                                for="filter"
                                class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ml-2"
                        >
                            Show Mismatched
                        </Label>
                    </div>
                </div>
            </div>
            <div class="col-span-2 flex justify-center">
                <span>Results for selected plan: {$numberOfFailedItinerariesStore}
                    failed out of {$currentDefaultPlanStore.itineraries.length} default itineraries</span>
            </div>

            <!-- Itinerary Comparison -->
            <div class="grid grid-rows-10 row-span-10 rounded-md">
                <div class="p-2 text-center">
                    <h1 class="text-xl">Default Plan overview</h1>
                </div>
                <div class="p-2 row-span-11">

                    <DefaultPlanOverview/>
                </div>
            </div>

            <div class="grid grid-rows-10 row-span-10 rounded-md">
                <div class="p-2 row-span-1 text-center">
                    <h1 class="text-xl">Plan overview</h1>
                </div>

                <div class="p-2 row-span-11 h-full">
                    <PlanOverview/>
                </div>
            </div>

            <!-- Referral to the itinerary comparison -->
            <div class="row-span-1 col-span-2 text-center content-center border">
                <a href="/itinerary-comp" class="hover:underline text-xl" target="_blank" rel="noopener noreferrer">Open
                    new Itinerary comparison tab →</a>
            </div>

        </div>

    </div>

</div>
