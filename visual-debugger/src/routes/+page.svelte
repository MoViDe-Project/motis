<script>
    import Button from '$lib/components/ui/Button.svelte';
    import FileUpload from '$lib/components/ui/FileUpload.svelte';
    import QueryBatchOverview from '$lib/components/ui/QueryBatchOverview.svelte';
</script>

<img src="/logo.svg" alt="MoViDe logo" style="width: 100px; height: 100px;">
<h1>Welcome to MoViDe (MOTIS Visual Debugger)</h1>

<FileUpload />
<Button title="Upload bestätigen"/>
<QueryBatchOverview />
