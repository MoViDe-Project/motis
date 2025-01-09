<script lang="ts">
  import {queryJsonStringStore} from "../../../sveltestore";
  import {getQueryAttributes} from "../../../data-processing/queryBuild.ts";
    let file: File | null = null;

  $: if(!($queryJsonStringStore=="DEFAULT")){getQueryAttributes()}
  
    const handleFileChange = (event: Event): void => {
      const input = event.target as HTMLInputElement;
      file = input.files ? input.files[0] : null;
      console.log(file?.name); // Logs the file name

      // put content of read file as string into storage
      file?.text().then((file_content_string) => {
          queryJsonStringStore.set(file_content_string);
        }
      )

    };
  </script>
  
  <div>
    <input type="file" on:change={handleFileChange} />
    {#if file}
      <p>Selected file: {file.name}</p>
    {/if}
  </div>
