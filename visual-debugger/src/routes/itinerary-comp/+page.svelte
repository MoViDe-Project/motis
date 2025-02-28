<script>
    import {ScrollArea} from "$lib/components/ui/scroll-area/index.js";
    import DefaultItineraryOverview from "@/components/ui/DefaultItineraryOverview.svelte";
    import ItineraryOverview from "@/components/ui/ItineraryOverview.svelte";
    import {currentItineraryStore} from "sveltestore";
    const i = 0;
</script>

<div class="h-screen w-screen">
    <div class="h-1/6 text-center text-2xl content-center">
        Itinerary Comparison
    </div>
    <div class="grid grid-cols-2 h-5/6">
        <div class="p-2">
            <div class="p-4 border">
                <!-- {$currentItineraryStore.duration} -->
                <DefaultItineraryOverview/>
            </div>
            
        </div>
        <div class="p-2">
            
            <div class="p-4 border">
                <ItineraryOverview/>
            </div>
            
        </div>
    </div>
</div>
