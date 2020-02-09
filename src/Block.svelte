<script>
    import { createEventDispatcher, tick } from 'svelte';
    // import marked from 'marked';
    import hljs from 'highlight.js/lib/highlight';
    import markdown from 'highlight.js/lib/languages/markdown';
    hljs.registerLanguage('markdown', markdown);
    import 'highlight.js/styles/default.css';
    import 'highlight.js/styles/atom-one-light.css';

    export let editing = false;
    export let content = '';
    export let buttons = 'right';

    const dispatch = createEventDispatcher();
    let textarea;

    /**
     * When the block is set to `editing`, set up.
     */
    $: editing && setUp();

    /**
     * Resize and focus the textarea.
     */
    async function setUp() {
        await tick();
        resize();
        textarea.focus();
    }

    /**
     * Resize the textarea to fit its contents.
     */
    function resize() {
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight + 4}px`;
    }
</script>

<div class="relative w-full mb-6 group {buttons === 'left' ? 'pl-2' : 'pr-2' }">
    <div class="flex-grow" on:click|stopPropagation={() => dispatch('edit')}>
        {#if editing}
            <textarea bind:this={textarea} bind:value={content} on:input={resize} class="form-textarea w-full"></textarea>
        {:else}
            <div class="px-6 py-4 border-2 border-transparent bg-gray-300 rounded-lg cursor-pointer whitespace-pre-line">{@html hljs.highlight('markdown', content).value}</div>
        {/if}
    </div>
    <div class="absolute top-0 opacity-0 group-hover:opacity-100 transition-opacity duration-75 ease-in-out {buttons === 'left' ? 'left-0 transform -translate-x-full' : 'right-0 transform translate-x-full' }">
        <button type="button" class="flex items-center justify-center w-6 h-6 text-yellow-700 bg-gray-300 rounded-full hover:shadow-sm transition duration-75 ease-in-out" on:click|stopPropagation={() => dispatch('reorder', -1)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>
        </button>
        <button type="button" class="flex items-center justify-center w-6 h-6 mt-1 text-yellow-700 bg-gray-300 rounded-full hover:shadow-sm transition duration-75 ease-in-out" on:click|stopPropagation={() => dispatch('reorder', 1)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
        </button>
        <button type="button" class="flex items-center justify-center w-6 h-6 mt-1 text-yellow-700 bg-gray-300 rounded-full hover:shadow-sm transition duration-75 ease-in-out" on:click|stopPropagation={() => dispatch('move')}>
            {#if buttons === 'left'}
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            {:else}
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            {/if}
        </button>
        <button type="button" class="flex items-center justify-center w-6 h-6 mt-1 text-red-600 bg-gray-300 rounded-full hover:shadow-sm transition duration-75 ease-in-out" on:click|stopPropagation={() => dispatch('trash')}>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
        </button>
    </div>
</div>
