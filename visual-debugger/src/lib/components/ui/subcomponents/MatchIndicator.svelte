<script lang="ts">
    let {attribute} = $props()
</script>

{#if attribute}
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none"
         stroke="#26a269" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
         class="lucide lucide-check"><path d="M20 6 9 17l-5-5"/></svg>
{:else}
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none"
         stroke="#a51d2d" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
         class="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
{/if}