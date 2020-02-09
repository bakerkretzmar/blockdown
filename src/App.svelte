<script>
    import shortid from 'shortid';
    import Block from './Block.svelte';

    let draft = [
        { '_id': shortid.generate(), 'content': 'Yes, Yes, without the oops! Remind me to thank John for a lovely weekend. Just my luck, no ice. Is this my espresso machine? Wh-what is-h-how did you get my espresso machine?' },
        { '_id': shortid.generate(), 'content': 'Yes, Yes, without the oops! Remind me to thank John for a lovely weekend. Just my luck, no ice. Is this my espresso machine? Wh-what is-h-how did you get my espresso machine?' },
        { '_id': shortid.generate(), 'content': 'Yes, Yes, without the oops! Remind me to thank Jo. Just my luck, no ice. Is this my espresso machine? Wh-what is-h-how did you get my espresso machine?' },
        { '_id': shortid.generate(), 'content': 'Yes, Yes, without the oops! Remind me to thank John for a lovely weekend.Is this my espresso machine? Wh-what is-h-how did you get my espresso machine?' },
        { '_id': shortid.generate(), 'content': 'Yes, Yes, without the oops! Remind me to thank John for a lovely weekend. Just my luck, my espresso machine? Wh-what is-h-how did you get my espresso machine?' },
    ];
    let proof = [
        { '_id': shortid.generate(), 'content': 'Yes, Yes, without the oops! Remind me to thank John for a lovely weekend. Just my luck, ' },
        { '_id': shortid.generate(), 'content': 'Yes, Yes, withoo thank John for a lovely weekend. Just my luck, no ice. Just my luck, no ice. Just my luck, no ice. Just my luck, no ice. Just my luck, no ice. Just my luck, no ice. Just my luck, no ice. Is this my espresso machine? Wh-what is-h-how did you get my espresso machine?' },
    ];

    let editing = null;
</script>

<main class="flex h-full min-h-screen text-lg text-gray-300 bg-gray-900">
    <div class="w-1/2 px-8 py-6 border-r border-gray-700">
        <div class="flex items-center justify-between mb-6">
            <div class="flex items-baseline">
                <h2 class="font-medium text-2xl">Ideas</h2>
                <span class="ml-4 text-gray-400 text-xl">For random thoughts</span>
            </div>
            <div class="flex items-center px-4 py-2 font-mono text-green-800 bg-green-400 rounded-md opacity-75">
                Saved
            </div>
        </div>
        {#each draft as block (block._id)}
            <Block bind:content={block.content} on:edit={() => editing = block._id} editing={editing === block._id}/>
        {/each}
    </div>
    <div class="w-1/2 px-8 py-6 border-l border-gray-700">
        <div class="flex items-center justify-between mb-6">
            <div class="flex items-baseline">
                <h2 class="font-medium text-2xl">Final content</h2>
                <span class="ml-4 text-gray-400 text-xl">For the final ordered output</span>
            </div>
            <div class="flex items-center px-4 py-2 font-mono text-purple-800 bg-purple-400 rounded-md opacity-75">
                Preview
            </div>
        </div>
        {#each proof as block (block._id)}
            <Block bind:content={block.content} on:edit={() => editing = block._id} editing={editing === block._id}/>
        {/each}
    </div>
</main>
