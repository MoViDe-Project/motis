<script>
    import DefaultItineraryOverview from "@/components/ui/itinerary-overviews/DefaultItineraryOverview.svelte";
    import ItineraryOverview from "@/components/ui/itinerary-overviews/ItineraryOverview.svelte";
    import PlanOverview from "@/components/ui/plan-overviews/PlanOverview.svelte";

    const i = 0;
</script>

<div class="h-screen w-screen">
    <div class="h-1/6 text-center text-2xl content-center font-bold">
        Itinerary Comparison
    </div>
    <div class="grid grid-cols-2 h-5/6">
        <div class="p-2 relative">
            <div class="p-2 row-span-1 text-center">
                <h1 class="text-xl">Default Itinerary Overview</h1>
            </div>

            <div class="p-4 border">
                <DefaultItineraryOverview/>
            </div>

        </div>

        <div class="p-2">
            <div class="p-2 row-span-1 text-center">
                <h1 class="text-xl ">Itinerary Overview</h1>
            </div>

            <div class="p-4 border">
                <ItineraryOverview/>
            </div>

        </div>
    </div>
</div>
