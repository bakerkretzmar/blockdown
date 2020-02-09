<script>
    import { onMount, tick } from 'svelte';
    import Block from './Block.svelte';
    import debounce from 'lodash/debounce';
    import shortid from 'shortid';
    import blockTemplate from './blockTemplate.json';
    import defaultData from './defaultData.json';

    let data = defaultData;
    let saving = false;
    let editing;

    /**
     * On mount, load the app's state from localStorage.
     */
    onMount(() => data = !!localStorage.getItem('blockdown') ? { ...defaultData, ...JSON.parse(localStorage.getItem('blockdown')) } : data);

    /**
     * Whenever `data` changes, save.
     */
    $: data && save();

    /**
     * Add a new block to the given section.
     */
    function addBlock(section) {
        let _id = shortid.generate();
        let order = data[section].length;
        data[section] = [...data[section], { ...blockTemplate, _id, section, order }];
        editing = _id;
    }

    /**
     * Move the given block from one section to another.
     */
    function moveBlock(_id, fromSection, toSection) {
        data[toSection] = [...data[toSection], data[fromSection].filter(block => block._id === _id)[0]];
        data[fromSection] = data[fromSection].filter(block => block._id !== _id);
    }

    /**
     * Move the given block up or down in its section.
     */
    function reorderBlock(section, index, dir) {
        if ((index === 0 && dir === -1) || (index === data[section].length - 1 && dir === 1)) return;
        data[section].splice(index + dir, 0, data[section].splice(index, 1)[0]);
        data = data;
    }

    /**
     * Trash the block with the given id from the given section.
     */
    function trashBlock(section, _id) {
        data.trashed = [...data.trashed, data[section].filter(block => block._id === _id)[0]];
        data[section] = data[section].filter(block => block._id !== _id);
        cleanTrashedBlocks();
    }

    /**
     * Discard all but the last 20 trashed blocks.
     */
    function cleanTrashedBlocks() {
        data.trashed = data.trashed.slice(0, 20);
    }

    /**
     * Save the app's state to localStorage.
     */
    const save = debounce(async () => {
        saving = true;
        await tick();
        localStorage.setItem('blockdown', JSON.stringify(data));
        setTimeout(() => saving = false, 200);
    }, 1000);
</script>

<svelte:body on:click={() => editing = null}/>

<main class="flex flex-col min-h-screen text-gray-900">
    <!-- <div class="flex items-center justify-between px-8 py-3 bg-teal-200">
        <h1 class="text-xl font-bold">Blockdown</h1>
    </div> -->
    <div class="flex flex-grow">
        <div class="w-1/2 pl-8 pr-12 py-6 border-r border-gray-400">
            <div class="flex items-center justify-between mb-6">
                <div class="flex items-baseline">
                    <h2 class="font-medium text-2xl">Ideas</h2>
                    <span class="ml-4 text-gray-600 text-xl">For random thoughts</span>
                </div>
                <div class="flex items-center px-4 py-2 font-mono text-green-800 bg-green-300 rounded-md opacity-75">
                    {saving ? 'Saving...' : 'Saved'}
                </div>
            </div>
            {#each data.draft as block, i}
                <Block bind:content={block.content} on:edit={() => editing = block._id} on:trash={() => trashBlock('draft', block._id)} on:move={() => moveBlock(block._id, 'draft', 'proof')} on:reorder={(e) => reorderBlock('draft', i, e.detail)} editing={editing === block._id}/>
            {/each}
            <button type="button" on:click|stopPropagation={() => addBlock('draft')} class="px-4 py-2 bg-gray-200 text-gray-700 rounded-md shadow-sm hover:shadow transition duration-100 ease-in-out">
                Add block
            </button>
        </div>
        <div class="w-1/2 pr-8 pl-12 py-6 border-l border-gray-400">
            <div class="flex items-center justify-between mb-6">
                <div class="flex items-baseline">
                    <h2 class="font-medium text-2xl">Final content</h2>
                    <span class="ml-4 text-gray-600 text-xl">For the final output</span>
                </div>
                <div class="flex items-center px-4 py-2 font-mono text-purple-800 bg-purple-300 rounded-md opacity-75">
                    Preview
                </div>
            </div>
            {#each data.proof as block, i}
                <Block bind:content={block.content} on:edit={() => editing = block._id} on:trash={() => trashBlock('proof', block._id)} on:move={() => moveBlock(block._id, 'proof', 'draft')} on:reorder={(e) => reorderBlock('proof', i, e.detail)} editing={editing === block._id} buttons="left"/>
            {/each}
            <button type="button" on:click|stopPropagation={() => addBlock('proof')} class="px-4 py-2 bg-gray-200 text-gray-700 rounded-md shadow-sm hover:shadow transition duration-100 ease-in-out">
                Add block
            </button>
        </div>
    </div>
</main>
