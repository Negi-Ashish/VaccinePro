<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import Ashish from '$lib/components/ashish.svelte';

	// Svelte Hook similar to react useEffect but difference being it only works once,
	// equivalent to useEffect with an empty dependency array, running only onLoad of a page.
	onMount(() => {
		console.log('I am onMount');
	});

	// Svelte Hook triggered when the component is about to be destroyed and removed from the DOM.
	onDestroy(() => {
		console.log('I am onDestroy');
	});

	// Svelte Hook triggered before the component updates, but after data has changed.
	$effect.pre(() => {
		console.log('I am beforeUpdate');
	});

	// Svelte Hook triggered after the component updates and the DOM has been updated.
	$effect(() => {
		console.log('I am afterUpdate');
	});

	let ashish = {
		name: 'ashish',
		hands: 2,
		legs: 2
	};
	let ashish2 = {
		name: 'dkm',
		hands: 4,
		legs: 2
	};

	let ashish3 = {
		name: 'lol',
		hands: 4,
		legs: 4
	};

	let all = [ashish, ashish2, ashish3];
</script>

<svelte:head>
	<title>Test</title>
</svelte:head>

<div class="text-column">
	<h1>Test</h1>
	{#each all as humans_to_pass (humans_to_pass)}
		<Ashish human={humans_to_pass} />
	{/each}
</div>
