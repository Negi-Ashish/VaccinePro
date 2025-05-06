import { json } from '@sveltejs/kit';

export function errorMessage(message: string) {
	return json({
		isSuccessful: false,
		message
	});
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function successMessage(payload: any) {
	return json({
		isSuccessful: true,
		payload: payload
	});
}
