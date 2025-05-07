import type { RequestHandler } from './$types';
import { PERPLEXITYAPI_KEY } from '$env/static/private';
import { successMessage, errorMessage } from '$lib/utils/apiResponseFormat';

type VaccineEntry = {
	index: number;
	month: string;
	vaccineName: string;
	howItsGiven: string;
	commonSideEffects: string;
	whyItsImportant: string;
};

export const POST: RequestHandler = async ({ request }) => {
	try {
		const { age, gender, infoDiseases, infoMedications, infoOccupations } = await request.json();

		const response_function = await getVaccineSchedule(
			age,
			gender,
			infoOccupations,
			infoMedications,
			infoDiseases
		);

		const flatList = flattenVaccinePayloadWithMonths(response_function);

		return successMessage(flatList);
	} catch (err) {
		console.error('API error:', err);
		return errorMessage('API Failed.');
	}
};

async function getVaccineSchedule(
	age: number,
	gender: string,
	occupation: string[],
	pastMedications: string[],
	pastDiseases: string[]
): Promise<
	Record<
		string,
		{
			vaccines: string[];
			details: {
				whenToTake: string;
				dosage: string;
				howItsGiven: string;
				commonSideEffects: string;
				whyItsImportant: string;
				specialNotes: string;
			}[];
		}
	>
> {
	const apiKey = PERPLEXITYAPI_KEY; // Securely store your API key
	const url = 'https://api.perplexity.ai/chat/completions';

	// Construct the user prompt including patient details and output instructions
	const userPrompt = `
	Based on a patient who is a ${age}-year-old ${gender} working as ${occupation},
	with past medications ${JSON.stringify(pastMedications)} and past diseases ${JSON.stringify(pastDiseases)},
	generate a vaccination schedule.
	
	Output **only** a JSON object where each key is a month ("1st_Month", "2nd_Month", …, "12th_Month") 
	that includes vaccine recommendations. Each month's value must be an object with the following structure for each vaccine:
	
	- "vaccines": an array of vaccine names (strings),
	- "details": an array of objects where each object corresponds to the same index in the vaccines array, with the following keys:
	  - "howItsGiven": string (e.g., "Intramuscular injection"),
	  - "commonSideEffects": string (e.g., "Soreness at injection site, mild fever, fatigue"),
	  - "whyItsImportant": string (e.g., "Protects against seasonal flu strains and complications like pneumonia").
	
	Return only valid JSON. Do not include any explanation or text outside the JSON structure. The schema must match exactly.`;

	// Prepare the API request payload
	const payload = {
		model: 'sonar-pro', // use the Sonar Pro model:contentReference[oaicite:0]{index=0}
		messages: [
			{ role: 'system', content: 'Be precise and concise.' },
			{ role: 'user', content: userPrompt.trim() }
		],
		response_format: {
			// enforce structured JSON output:contentReference[oaicite:1]{index=1}
			type: 'json_schema',
			json_schema: jsonSchema
		},
		max_tokens: 4000, // allow enough length for the full schedule:contentReference[oaicite:2]{index=2}
		temperature: 0.0, // low randomness for deterministic, factual output:contentReference[oaicite:3]{index=3}
		top_p: 1.0, // use full probability mass to reduce randomness:contentReference[oaicite:4]{index=4}
		top_k: 1, // consider only the most likely token at each step to be deterministic:contentReference[oaicite:5]{index=5}
		frequency_penalty: 1, // discourage repetition (default is 1):contentReference[oaicite:6]{index=6}
		presence_penalty: 0 // default value; no extra emphasis on new topics
	};

	// Make the HTTP POST request
	const response = await fetch(url, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${apiKey}` // use Bearer token from environment:contentReference[oaicite:7]{index=7}:contentReference[oaicite:8]{index=8}
		},
		body: JSON.stringify(payload)
	});

	const result = await response.json();
	const content = result.choices[0].message.content;

	try {
		// Safely parse the JSON content:contentReference[oaicite:9]{index=9}
		console.log('content', content);
		return JSON.parse(content);
	} catch (err) {
		throw new Error('Failed to parse JSON from Perplexity API: ' + err);
	}
}

const jsonSchema = {
	schema: {
		type: 'object',
		properties: {
			'1st_Month': {
				type: 'object',
				properties: {
					vaccines: {
						type: 'array',
						items: { type: 'string' }
					},
					details: {
						type: 'array',
						items: {
							type: 'object',
							properties: {
								howItsGiven: { type: 'string' },
								commonSideEffects: { type: 'string' },
								whyItsImportant: { type: 'string' }
							},
							required: [
								'whenToTake',
								'dosage',
								'howItsGiven',
								'commonSideEffects',
								'whyItsImportant',
								'specialNotes'
							]
						}
					}
				},
				required: ['vaccines', 'details']
			},
			'2nd_Month': {
				type: 'object',
				properties: {
					vaccines: {
						type: 'array',
						items: { type: 'string' }
					},
					details: {
						type: 'array',
						items: {
							type: 'object',
							properties: {
								howItsGiven: { type: 'string' },
								commonSideEffects: { type: 'string' },
								whyItsImportant: { type: 'string' }
							},
							required: [
								'whenToTake',
								'dosage',
								'howItsGiven',
								'commonSideEffects',
								'whyItsImportant',
								'specialNotes'
							]
						}
					}
				},
				required: ['vaccines', 'details']
			},
			'3rd_Month': {
				type: 'object',
				properties: {
					vaccines: {
						type: 'array',
						items: { type: 'string' }
					},
					details: {
						type: 'array',
						items: {
							type: 'object',
							properties: {
								howItsGiven: { type: 'string' },
								commonSideEffects: { type: 'string' },
								whyItsImportant: { type: 'string' }
							},
							required: [
								'whenToTake',
								'dosage',
								'howItsGiven',
								'commonSideEffects',
								'whyItsImportant',
								'specialNotes'
							]
						}
					}
				},
				required: ['vaccines', 'details']
			},
			'4th_Month': {
				type: 'object',
				properties: {
					vaccines: {
						type: 'array',
						items: { type: 'string' }
					},
					details: {
						type: 'array',
						items: {
							type: 'object',
							properties: {
								howItsGiven: { type: 'string' },
								commonSideEffects: { type: 'string' },
								whyItsImportant: { type: 'string' }
							},
							required: [
								'whenToTake',
								'dosage',
								'howItsGiven',
								'commonSideEffects',
								'whyItsImportant',
								'specialNotes'
							]
						}
					}
				},
				required: ['vaccines', 'details']
			},
			'5th_Month': {
				type: 'object',
				properties: {
					vaccines: {
						type: 'array',
						items: { type: 'string' }
					},
					details: {
						type: 'array',
						items: {
							type: 'object',
							properties: {
								howItsGiven: { type: 'string' },
								commonSideEffects: { type: 'string' },
								whyItsImportant: { type: 'string' }
							},
							required: [
								'whenToTake',
								'dosage',
								'howItsGiven',
								'commonSideEffects',
								'whyItsImportant',
								'specialNotes'
							]
						}
					}
				},
				required: ['vaccines', 'details']
			},
			'6th_Month': {
				type: 'object',
				properties: {
					vaccines: {
						type: 'array',
						items: { type: 'string' }
					},
					details: {
						type: 'array',
						items: {
							type: 'object',
							properties: {
								howItsGiven: { type: 'string' },
								commonSideEffects: { type: 'string' },
								whyItsImportant: { type: 'string' }
							},
							required: [
								'whenToTake',
								'dosage',
								'howItsGiven',
								'commonSideEffects',
								'whyItsImportant',
								'specialNotes'
							]
						}
					}
				},
				required: ['vaccines', 'details']
			},
			'7th_Month': {
				type: 'object',
				properties: {
					vaccines: {
						type: 'array',
						items: { type: 'string' }
					},
					details: {
						type: 'array',
						items: {
							type: 'object',
							properties: {
								howItsGiven: { type: 'string' },
								commonSideEffects: { type: 'string' },
								whyItsImportant: { type: 'string' }
							},
							required: [
								'whenToTake',
								'dosage',
								'howItsGiven',
								'commonSideEffects',
								'whyItsImportant',
								'specialNotes'
							]
						}
					}
				},
				required: ['vaccines', 'details']
			},
			'8th_Month': {
				type: 'object',
				properties: {
					vaccines: {
						type: 'array',
						items: { type: 'string' }
					},
					details: {
						type: 'array',
						items: {
							type: 'object',
							properties: {
								howItsGiven: { type: 'string' },
								commonSideEffects: { type: 'string' },
								whyItsImportant: { type: 'string' }
							},
							required: [
								'whenToTake',
								'dosage',
								'howItsGiven',
								'commonSideEffects',
								'whyItsImportant',
								'specialNotes'
							]
						}
					}
				},
				required: ['vaccines', 'details']
			},
			'9th_Month': {
				type: 'object',
				properties: {
					vaccines: {
						type: 'array',
						items: { type: 'string' }
					},
					details: {
						type: 'array',
						items: {
							type: 'object',
							properties: {
								howItsGiven: { type: 'string' },
								commonSideEffects: { type: 'string' },
								whyItsImportant: { type: 'string' }
							},
							required: [
								'whenToTake',
								'dosage',
								'howItsGiven',
								'commonSideEffects',
								'whyItsImportant',
								'specialNotes'
							]
						}
					}
				},
				required: ['vaccines', 'details']
			},
			'10th_Month': {
				type: 'object',
				properties: {
					vaccines: {
						type: 'array',
						items: { type: 'string' }
					},
					details: {
						type: 'array',
						items: {
							type: 'object',
							properties: {
								howItsGiven: { type: 'string' },
								commonSideEffects: { type: 'string' },
								whyItsImportant: { type: 'string' }
							},
							required: [
								'whenToTake',
								'dosage',
								'howItsGiven',
								'commonSideEffects',
								'whyItsImportant',
								'specialNotes'
							]
						}
					}
				},
				required: ['vaccines', 'details']
			},
			'11th_Month': {
				type: 'object',
				properties: {
					vaccines: {
						type: 'array',
						items: { type: 'string' }
					},
					details: {
						type: 'array',
						items: {
							type: 'object',
							properties: {
								howItsGiven: { type: 'string' },
								commonSideEffects: { type: 'string' },
								whyItsImportant: { type: 'string' }
							},
							required: [
								'whenToTake',
								'dosage',
								'howItsGiven',
								'commonSideEffects',
								'whyItsImportant',
								'specialNotes'
							]
						}
					}
				},
				required: ['vaccines', 'details']
			},
			'12th_Month': {
				type: 'object',
				properties: {
					vaccines: {
						type: 'array',
						items: { type: 'string' }
					},
					details: {
						type: 'array',
						items: {
							type: 'object',
							properties: {
								howItsGiven: { type: 'string' },
								commonSideEffects: { type: 'string' },
								whyItsImportant: { type: 'string' }
							},
							required: [
								'whenToTake',
								'dosage',
								'howItsGiven',
								'commonSideEffects',
								'whyItsImportant',
								'specialNotes'
							]
						}
					}
				},
				required: ['vaccines', 'details']
			}
		},
		additionalProperties: false
	}
};

function flattenVaccinePayloadWithMonths(
	rawPayload: Record<
		string,
		{
			vaccines: string[];
			details: {
				whenToTake: string;
				dosage: string;
				howItsGiven: string;
				commonSideEffects: string;
				whyItsImportant: string;
				specialNotes: string;
			}[];
		}
	>
): VaccineEntry[] {
	const monthNames = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	];

	const currentMonthIndex = new Date().getMonth(); // 0 = January

	const monthKeys = Array.from({ length: 12 }, (_, i) => {
		const num = i + 1;
		if (num === 1) return '1st_Month';
		if (num === 2) return '2nd_Month';
		if (num === 3) return '3rd_Month';
		return `${num}th_Month`;
	});

	const result: VaccineEntry[] = [];
	let index = 1;

	monthKeys.forEach((key, i) => {
		const entry = rawPayload[key];
		if (!entry) return;

		const readableMonth = monthNames[(currentMonthIndex + i) % 12];
		const { vaccines, details } = entry;

		for (let j = 0; j < vaccines.length; j++) {
			const detail = details[j] || {
				whenToTake: '',
				dosage: '',
				howItsGiven: '',
				commonSideEffects: '',
				whyItsImportant: '',
				specialNotes: ''
			};

			result.push({
				index: index++,
				month: readableMonth,
				vaccineName: vaccines[j],
				howItsGiven: detail.howItsGiven,
				commonSideEffects: detail.commonSideEffects,
				whyItsImportant: detail.whyItsImportant
			});
		}
	});

	return result;
}
