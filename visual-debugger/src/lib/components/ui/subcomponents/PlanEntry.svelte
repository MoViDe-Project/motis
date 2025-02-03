<script lang="ts">
    import {Button} from "@/components/ui/button";

    export let startTime: String;
    export let endTime: String;
    export let duration: String;
    export let transfers: String;
    export let cssClass: String;
    export let match: boolean = true;
</script>

<div class="border-4 border rounded-md p-2 my-2 {match ? 'border-green-500' : 'border-red-500'}">
    <div class="grid grid-cols-2 grid-rows-2 gap-1 w-full">
        <div class="">
            StartTime: {startTime}, EndTime: {endTime}
        </div>
        <div class="">
            Duration: {duration}
        </div>
        <div class="">
            Transfers: {transfers}
        </div>
        <div>
            <Button variant="outline" class="{cssClass}">
                Select
            </Button>
        </div>
        
    </div>
    
</div>
