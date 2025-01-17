<script lang="ts">
    import {currentDefaultPlanStore,defaultPlanStore} from "../../../../sveltestore.ts";
    import type {Plan} from "../../../../data-processing/parsing-types/planParsingTypes.ts";

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
            defaultPlanStore.set(plans);
            currentDefaultPlanStore.set(plans[0]);
            }
        )

    };
</script>

<div>
    <input type="file" on:change={putFileIntoStorage} />
    {#if file}
        <p>Selected file: {file.name}</p>
    {/if}
</div>
