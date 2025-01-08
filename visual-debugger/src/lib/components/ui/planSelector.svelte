<script lang="ts">
    import { Button, Dropdown, Radio } from 'flowbite-svelte';
    import {computedPlanStore, currentPlanStore} from "../../../sveltestore.js";
    import type {Plan} from "../../../data-processing/parsing-types/planParsingTypes.ts";

    let queryIndex = 0

    let plans: Plan[];

    const changeActivePlan = () => {
        computedPlanStore.subscribe((data) =>
            plans = data
        )

        let activePlan: Plan = plans[queryIndex];

        currentPlanStore.set(activePlan)
        console.log(activePlan)
    }
</script>

<Button>Dropdown button {queryIndex+1}</Button>
<Dropdown>
    <li>
        <Radio name="group1" bind:group={queryIndex} value={0} on:click={changeActivePlan}>Plan 1</Radio>
    </li>
    <li>
        <Radio name="group1" bind:group={queryIndex} value={1} on:click={changeActivePlan}>Plan 2</Radio>
    </li>
</Dropdown>