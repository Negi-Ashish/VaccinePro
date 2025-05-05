// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
	content: [
		'./src/**/*.{html,svelte,ts}' // Adjust this path to where your components are located
	],
	theme: {
		extend: {
			// Add customizations to your theme here
			colors: {
				primary: '#3490dc', // Example custom color
				secondary: '#ffed4a' // Example custom color
			},
			spacing: {
				128: '32rem' // Example custom spacing
			}
			// You can extend other things like fonts, font sizes, etc.
		}
	},
	plugins: []
};

export default config;
