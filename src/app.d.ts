// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

import 'jspdf';

declare module 'jspdf' {
	interface jsPDF {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		autoTable: (options: any) => jsPDF;
	}
}

export {};
