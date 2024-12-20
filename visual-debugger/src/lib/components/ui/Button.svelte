<script lang="ts">
    import {getQueryAttributes} from "../../../data-processing/query-build";

    let { title } = $props();

    // call bridge to import the queries to QueryBatchOverview
    const importQueries = () => {
        getQueryAttributes()
    }

</script>

<button onclick={importQueries}>{title}</button>

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
