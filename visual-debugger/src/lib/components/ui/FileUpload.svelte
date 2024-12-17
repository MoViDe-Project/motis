<script lang="ts">
  import {query_file_storage} from "../../../sveltestore";
    let file: File | null = null; // Use TypeScript's File type
  
    const handleFileChange = (event: Event): void => {
      const input = event.target as HTMLInputElement;
      file = input.files ? input.files[0] : null;
      console.log(file?.name); // Logs the file name

      file?.text().then((data) => {
          query_file_storage.set(data);
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
