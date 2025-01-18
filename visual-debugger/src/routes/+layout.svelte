<script lang="ts">
    import '../app.css';

    let {children} = $props();
</script>

 

<svelte:head>
    <title>MoViDe</title>
</svelte:head>

{@render children()}
