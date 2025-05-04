<script>
	export let option;

	export let gap = '5pt';

	$: lang = option?.value?.toLowerCase()?.replaceAll('+', 'plus')?.replace('#', 'sharp');
	$: src = `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${lang}/${lang}-original.svg`;

	let hidden = false;
	$: src, (hidden = false);
</script>

<span style:gap>
	{option.label}
</span>

<style>
	span {
		display: flex;
		align-items: center;
		gap: 0.4rem;
	}
</style>
