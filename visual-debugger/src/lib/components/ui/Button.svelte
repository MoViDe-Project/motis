<script lang="ts">
    // import function to call the bridge integration of queries to QueryBatchOverview
    import {get_query_attributes} from "../../../data-processing/query-build";

    let { title } = $props();

    //call bridge to import the queries to QueryBatchOverview
    const import_queries = () => {
        get_query_attributes()
    }

</script>

<button onclick={import_queries}>{title}</button>

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
