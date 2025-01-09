<script lang="ts">
  import {queryJsonStringStore} from "../../../sveltestore";
  import {getQueryAttributes} from "../../../data-processing/queryBuild.ts";
  let file: File | null = null;

  // When file was first uploaded, parse and interpolate the queries
  $: if(!($queryJsonStringStore=="DEFAULT")){getQueryAttributes()}

  /**
   * Gets the uploaded file and puts its content into the svelte store
   * @param event event that the file was uploaded
   */
  const putFileIntoStorage = (event: Event): void => {
    const input = event.target as HTMLInputElement;
    file = input.files ? input.files[0] : null;

    // put content of read file as string into storage
    file?.text().then((file_content_string) => {
              queryJsonStringStore.set(file_content_string);
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
