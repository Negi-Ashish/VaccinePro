<script lang="ts">
	export let info: string = '';
	export let onInfoChange: (info: string) => void;

	function handleChange(e: Event) {
		const target = e.target as HTMLTextAreaElement;
		onInfoChange?.(target.value);
	}
</script>

<div class="additional-info bg-pink-200">
	<label for="info">Additional Info:</label>
	<textarea id="info" bind:value={info} on:input={handleChange}></textarea>
</div>
