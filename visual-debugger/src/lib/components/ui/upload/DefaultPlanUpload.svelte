<script lang="ts">
    import {currentDefaultPlanStore, defaultPlanDatasetStore} from "sveltestore";
    import type {Plan} from "@data/type-declarations/planTypes.ts";
    import {Input} from "$lib/components/ui/input/index.js";
    import {Label} from "@/components/ui/label";

    let file: File | null = null;

    /**
     * Gets the uploaded file and puts its content into the svelte store
     * @param event event that the file was uploaded
     */
    const putFileIntoStorage = (event: Event): void => {
        const input = event.target as HTMLInputElement;
        file = input.files ? input.files[0] : null;

        // put content of read file as string into storage
        file?.text().then((file_content_string) => {
                let plans: Plan[] = JSON.parse(file_content_string)

                $defaultPlanDatasetStore = plans
                $currentDefaultPlanStore = plans[0]
            }
        )
    };
</script>

<div class="flex items-center gap-2">
    <Label class="whitespace-nowrap" >Upload reference plan</Label>
    <Input id="q-upload" type="file" on:change={putFileIntoStorage}/>
</div>
