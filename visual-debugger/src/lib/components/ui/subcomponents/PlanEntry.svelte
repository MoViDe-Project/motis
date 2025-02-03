<script lang="ts">
    import {Button} from "@/components/ui/button";
    import type {Itinerary} from "@data/type-declarations/planTypes.ts";

    export let itinerary: Itinerary;

</script>

<div class="text-2xl">
    <Button variant="outline" class="{itinerary.cssClass}">
        <span class="text-left w-full">StartTime:{itinerary.startTime}, EndTime:{itinerary.endTime}</span>
    </Button>
</div>
