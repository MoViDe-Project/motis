<script lang="ts">
    import Itinerary from "$lib/components/ui/subcomponents/Itinerary.svelte";
    import {planStore} from "../../../sveltestore.ts";
    import type {Plan} from "../../../data-processing/parsing-types/planParsingTypes.ts";

    let plans: Plan[]

    // let queries be up-to-date with the store
    planStore.subscribe((data) =>
        plans = data
    )
</script>

<h2>Plan of Query(Routing results)</h2>
<div class="rounded-border">
    {#each plans as plan}
        <Itinerary startTime="{plan.itineraries[0].startTime}"></Itinerary>
    {/each}
</div>


<style>
    .rounded-border {
        border: 1px solid black;
        border-radius: 8px;
        padding: 10px;
    }
</style>