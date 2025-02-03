<script lang="ts">
    import {computeQueryAttributes} from "../../../../data-processing/queryBuild.ts";
    import {Input} from "$lib/components/ui/input/index.js";

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
                computeQueryAttributes(file_content_string);
            }
        )
    };
</script>

<div>
    <Input id="q-upload" type="file" on:change={putFileIntoStorage}/>
</div>
