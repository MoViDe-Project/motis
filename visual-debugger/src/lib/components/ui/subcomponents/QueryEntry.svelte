<script lang="ts">
    import {Button} from "@/components/ui/button";
    import type {Query} from "@data/type-declarations/queryTypes.ts";
    import {cssClasses} from "@data/styling/cssClasses.ts";
    import {changePlanInterface} from "@data/componentInterface.ts";

    export let query: Query

</script>

<div>
    <Button on:click={() => changePlanInterface(query.index)} variant="link" class="{cssClasses.planEntryDefault}">
        <span class="text-left w-full">{query.from} - {query.to}</span>
    </Button>
</div>