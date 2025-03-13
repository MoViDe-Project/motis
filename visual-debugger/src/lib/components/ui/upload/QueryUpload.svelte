<script lang="ts">
    import {Input} from "$lib/components/ui/input/index.js";
    import {resetStores} from "sveltestore";
    import {parseQueryInterface} from "@data/componentInterface.ts";
    import {Label} from "@/components/ui/label";

    let file: File | null = null;

    /**
     * Gets the uploaded file and puts its content into the svelte store
     * @param event event that the file was uploaded
     */
    const putFileIntoStorage = (event: Event): void => {
        resetStores();
        //window.location.reload();
        const input = event.target as HTMLInputElement;
        file = input.files ? input.files[0] : null;

        // put content of read file as string into storage
        file?.text().then((file_content_string) => {
                parseQueryInterface(file_content_string);
            }
        )
    };
</script>

<div class="flex items-center gap-2">
    <Label class="whitespace-nowrap" >Upload query batches</Label>
    <Input id="q-upload" type="file" on:change={putFileIntoStorage}/>
</div>
