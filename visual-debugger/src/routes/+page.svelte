<script lang="ts">
    import {Button} from "$lib/components/ui/button/index.js";
    import QueryBatchOverview from "@/components/ui/QueryBatchOverview.svelte";
    import QueryUpload from "@/components/ui/upload/QueryUpload.svelte";
    import DefaultPlanUpload from "@/components/ui/upload/DefaultPlanUpload.svelte";
    import PlanOverview from "@/components/ui/PlanOverview.svelte";
    import DefaultPlanOverview from "@/components/ui/DefaultPlanOverview.svelte";
    import {defaultPlanDatasetStore, planDatasetStore} from "sveltestore";
    import {comparePlans} from "@data/comparePlans.ts";

    // Dark Mode imports
    import Sun from "lucide-svelte/icons/sun";
    import Moon from "lucide-svelte/icons/moon";
    import {toggleMode} from "mode-watcher";
    import {computePlansInterface, downloadPlanInterface} from "@data/componentInterface.ts";
    import {Checkbox} from "$lib/components/ui/checkbox";
    import {Label} from "$lib/components/ui/label";

    import {writable} from 'svelte/store';
    import {
        filterOutMatched,
        filterOutMismatched, resetItinerariesWithFilterMatched,
        resetItinerariesWithFilterMismatched,
    } from "@data/filterItineraries.ts";
    // call the plan compare logic upon both upload of default plan and plan computation
    $: if (!($defaultPlanDatasetStore.length == 0) && !($planDatasetStore.length == 0)) {
        comparePlans()
    }
    const showMatched = writable(true);
    const showMismatched = writable(true);

</script>
<!-- Container and flex logic from https://tailwindcss.com/docs/container -->
<div class="h-screen w-screen my-4 flex flex-col flex-none">

    <!-- Header -->
    <div class="h-1/6 w-full flex flex-row gap-2 px-4">

        <!-- Logo & Dark Mode -->
        <div class="basis-1/4 flex flex-row flex-none h-full">

            <div class="basis-1/2 flex-none h-full p-7">
                <img src="/logo_clipped.svg" alt="MoViDe logo" class="w-full h-full hover:animate-rotate-fast">
            </div>

            <div class="basis-1/2 content-center">
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

        <!-- Filters -->
        <div class="h-32 text-center content-center flex-none ">
            <div class="flex items-center space-x-2">
                <Checkbox id="filter2" bind:checked={$showMismatched}
                          on:click={() => $showMismatched?filterOutMatched():resetItinerariesWithFilterMismatched($showMatched)}/>
                <Label
                        for="filter2"
                        class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    Show Matched
                </Label>
            </div>
            <div class="flex items-center space-x-2">
                <Checkbox id="filter" bind:checked={$showMatched}
                          on:click={() => $showMatched?filterOutMismatched():resetItinerariesWithFilterMatched($showMismatched)}/>

                <Label
                        for="filter"
                        class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    Show Mismatched
                </Label>
            </div>
        </div>

        <!-- File handling -->
        <div class="basis-3/4 flex flex-row-reverse gap-2 items-center">
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
    <div class="h-5/6 w-full my-4 flex">

        <div class="basis-1/3 grid grid-rows-12">

            <div class="p-2 row-span-1 content-end">
                <h1 class="text-xl">Query Batch Overview</h1>
            </div>

            <div class="px-2 row-span-11 h-full">
                <QueryBatchOverview/>
            </div>

        </div>

        <!-- Comparisons -->
        <div class="basis-2/3 grid grid-rows-12 grid-cols-2 gap-2">

            <!-- Itinerary Comparison -->
            <div class="grid grid-rows-11 row-span-10 rounded-md">
                <div class="p-2 row-span-1 text-center">
                    <h1 class="text-xl">Default Plan overview</h1>
                </div>
                <div class="p-2 row-span-10">
                    <DefaultPlanOverview/>
                </div>
            </div>

            <div class="grid grid-rows-11 row-span-10 rounded-md">
                <div class="p-2 row-span-1 text-center">
                    <h1 class="text-xl">Plan overview</h1>
                </div>

                <div class="p-2 row-span-10 h-full">
                    <PlanOverview/>
                </div>
            </div>

            <!-- Referral to the itinerary comparison -->
            <div class="row-span-2 col-span-2 text-center content-center border">
                <a href="/itinerary-comp" class="hover:underline text-xl" target="_blank" rel="noopener noreferrer">Open
                    new Itinerary comparison tab →</a>
            </div>

        </div>

    </div>

</div>
