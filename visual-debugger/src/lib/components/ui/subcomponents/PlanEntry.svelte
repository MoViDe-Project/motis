<script lang="ts">
    import {Button} from "@/components/ui/button";

    export let startTime: String;
    export let endTime: String;
    export let duration: String;
    export let transfers: String;
    export let cssClass: String;

</script>

<div class="text-2xl">
    <Button variant="outline" class="{cssClass}">
        <span class="text-left w-full">StartTime:{startTime}, EndTime:{endTime}</span>
    </Button>
</div>
