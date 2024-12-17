<script lang="ts">
    import {query_file_storage} from "../../../sveltestore";
    let query_batch =""

    query_file_storage.subscribe(file_data => {
        query_batch= file_data;
    })
</script>

<div>
    <p>{query_batch}</p>
</div>