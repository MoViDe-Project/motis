<script lang="ts">
    import {Button} from "$lib/components/ui/button/index.js";
    import {ScrollArea} from "$lib/components/ui/scroll-area/index.js";
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

    // call the plan compare logic upon both upload of default plan and plan computation
    $: if (!($defaultPlanDatasetStore.length == 0) && !($planDatasetStore.length == 0)) {
        comparePlans()
    }

    const routes = [
        {from: "Bamberg", to: "Berlin"},
        {from: "Bamberg", to: "München"},
        {from: "Bamberg", to: "Hamburg"},
        {from: "Bamberg", to: "Frankfurt"},
        {from: "Bamberg", to: "Köln"},
        {from: "Bamberg", to: "Stuttgart"},
        {from: "Bamberg", to: "Düsseldorf"},
        {from: "Bamberg", to: "Dresden"},
        {from: "Bamberg", to: "Leipzig"},
        {from: "Bamberg", to: "Hannover"},
        {from: "Bamberg", to: "Nürnberg"},
        {from: "Bamberg", to: "Dortmund"},
        {from: "Bamberg", to: "Essen"},
        {from: "Bamberg", to: "Bremen"},
        {from: "Bamberg", to: "Duisburg"},
        {from: "Bamberg", to: "Bochum"},
        {from: "Bamberg", to: "Wuppertal"},
        {from: "Bamberg", to: "Bielefeld"},
        {from: "Bamberg", to: "Bonn"},
        {from: "Bamberg", to: "Münster"},
        {from: "Bamberg", to: "Berlin"},
        {from: "Bamberg", to: "München"},
        {from: "Bamberg", to: "Hamburg"},
        {from: "Bamberg", to: "Frankfurt"},
        {from: "Bamberg", to: "Köln"},
        {from: "Bamberg", to: "Stuttgart"},
        {from: "Bamberg", to: "Düsseldorf"},
        {from: "Bamberg", to: "Dresden"},
        {from: "Bamberg", to: "Leipzig"},
        {from: "Bamberg", to: "Hannover"},
        {from: "Bamberg", to: "Nürnberg"},
        {from: "Bamberg", to: "Dortmund"},
        {from: "Bamberg", to: "Essen"},
        {from: "Bamberg", to: "Bremen"},
        {from: "Bamberg", to: "Duisburg"},
        {from: "Bamberg", to: "Bochum"},
        {from: "Bamberg", to: "Wuppertal"},
        {from: "Bamberg", to: "Bielefeld"},
        {from: "Bamberg", to: "Bonn"},
        {from: "Bamberg", to: "Münster"},
    ]


</script>
<!-- Container and flex logic from https://tailwindcss.com/docs/container -->
<div class="h-screen w-screen my-4 flex flex-col flex-none">

    <!-- Header -->
    <div class="h-1/6 w-full flex flex-row gap-2 px-4">

        <!-- Logo & Dark Mode -->
        <div class="basis-1/4 flex flex-row flex-none h-full">

            <div class="basis-1/2 flex-none h-full">
                <img src="/logo_clipped.svg" alt="MoViDe logo" class="w-full h-full scale-75 hover:animate-rotate-fast">
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

        <!-- File handling -->
        <div class="basis-3/4 flex flex-row flex-row-reverse gap-2 items-center">
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
    <div class="h-5/6 w-full my-4 flex flex-row flex">

        <!-- Query Batches: Grid layout scheint die einzige Option zu sein shadcn scroll box zu kontrollieren -->
        <div class="basis-1/3 grid grid-rows-12">

            <div class="p-2 row-span-1 content-end">
                <h1 class="text-xl">Query Batch Overview</h1>
            </div>

            <div class="px-2 row-span-11 h-full">
                <QueryBatchOverview/>
            </div>

        </div>

        <!-- Comparisons -->
        <div class="basis-2/3 grid grid-rows-2 grid-cols-2 gap-2">

            <!-- Itinerary Comparison -->
            <div class="grid grid-rows-6 rounded-md">
                <div class="p-2 row-span-1 text-center">
                    <h1 class="text-xl">Default Plan overview</h1>
                </div>

                <div class="p-2 row-span-5">
                    <DefaultPlanOverview/>
                </div>


            </div>

            <div class="grid grid-rows-6 rounded-md">
                <div class="p-2 row-span-1 text-center">
                    <h1 class="text-xl">Plan overview</h1>
                </div>

                <div class="p-2 row-span-5 h-full">

                    <PlanOverview/>

                </div>

            </div>


            <!-- Stops Comparison -->
            <div class="grid grid-rows-6 rounded-md">
                <div class="p-2 row-span-1 text-center">
                    <h1 class="text-xl">Itinerary overview</h1>
                </div>

                <div class="p-2 row-span-5">
                    <ScrollArea class="rounded-md border h-full">
                        <div class="p-4 border">
                            {#each routes as route}
                                <div class="text-2xl">
                                    <Button variant="outline" class="w-full my-2 border-red-500 bg-red-200">
                                        <span class="text-left w-full">{route.from} - {route.to}</span>
                                    </Button>
                                </div>

                            {/each}
                        </div>
                    </ScrollArea>
                </div>

            </div>

            <div class="grid grid-rows-6 rounded-md">
                <div class="p-2 row-span-1 text-center">
                    <h1 class="text-xl">Default Itinerary overview</h1>
                </div>

                <div class="p-2 row-span-5">
                    <ScrollArea class="rounded-md border h-full">
                        <div class="p-4 border">
                            {#each routes as route}
                                <div class="text-2xl">
                                    <Button variant="outline" class="w-full my-2 border-green-500 bg-green-200">
                                        <span class="text-left w-full">{route.from} - {route.to}</span>
                                    </Button>
                                </div>

                            {/each}
                        </div>
                    </ScrollArea>
                </div>

            </div>


        </div>

    </div>
    <!-- <div class="h-10 text-center content-center flex-none">
      <h1 class="text-3xl">Footer</h1>
    </div> -->

</div>
