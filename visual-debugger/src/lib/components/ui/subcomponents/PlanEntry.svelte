<script lang="ts">
    import {Button} from "@/components/ui/button";

    export let startTime: String;
    export let endTime: String;
    export let duration: String;
    export let transfers: String;

</script>

<div class="text-2xl">
    <Button variant="outline" class="w-full my-2 border-green-500 bg-green-200">
        <span class="text-left w-full">StartTime:{startTime}, EndTime:{endTime}</span>
    </Button>
</div>
