<script lang="ts">
  import {query_json_string_store} from "../../../sveltestore";
    let file: File | null = null; // Use TypeScript's File type
  
    const handleFileChange = (event: Event): void => {
      const input = event.target as HTMLInputElement;
      file = input.files ? input.files[0] : null;
      console.log(file?.name); // Logs the file name

      // put content of read file as string into storage
      file?.text().then((file_content_string) => {
          query_json_string_store.set(file_content_string);
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
