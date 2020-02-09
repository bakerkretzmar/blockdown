<script>
    import marked from 'marked';
    import { afterUpdate, createEventDispatcher } from 'svelte';

    export let editing = false;
    export let content;

    const dispatch = createEventDispatcher();
    let textarea;

    afterUpdate(() => editing && resize());

    function resize() {
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight + 18}px`;
    };
</script>

<div class="py-4 mb-6 bg-gray-800 rounded-lg" class:px-4={editing} class:px-6={!editing} on:click={() => dispatch('edit')}>
    {#if editing}
        <textarea bind:this={textarea} bind:value={content} on:input={resize} class="form-textarea font-mono text-base w-full"></textarea>
    {:else}
        <span>{@html marked(content)}</span>
    {/if}
</div>
