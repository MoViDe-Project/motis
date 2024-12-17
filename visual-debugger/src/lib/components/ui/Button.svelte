<script lang="ts">
    import {query_file_storage} from "../../../sveltestore";

    let { title } = $props();

    let query_file_content = ""

    function handleClick() {
        console.log('Waiting for Instructions');
    }

    const query_batch_printing = () => {
        query_file_storage.subscribe(file_data => {
            query_file_content = file_data;
        })

        console.log(query_file_content)
    }

</script>

<button on:click={query_batch_printing}>{title}</button>

<style>
    button {
        background-color: #007bff;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 5px;
        cursor: pointer;
        font-size: 16px;
    }

    button:hover {
        background-color: #0056b3;
    }

    button:active {
        background-color: #004085;
    }

    button:focus {
        outline: none;
        box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.5);
    }
</style>
