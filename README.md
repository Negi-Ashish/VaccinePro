# VacciPro 🧬💉

**VacciPro** is a smart **vaccine scheduler** that helps users understand what vaccines they might need based on their **age**, **medical history**, and **occupation**. Most people don’t have clarity on which vaccines are appropriate for them or the possible side effects — VacciPro fills that gap with personalized, reliable, and easy-to-understand information.

---

## 🚀 Demo

<!-- TODO: Add demo video or deployment link here -->

---

## ✨ Features

- Select **Gender** and **Date of Birth**
- Auto-calculates **Age** and displays it with a visual
- Input additional **background details** like medical history or profession
- Integrated with **Perplexity Sonar API** to fetch vaccine data from trusted health sources
- Displays vaccine recommendations in a clean table format
- Download the schedule as a **PDF**
- **Ad support** included

---

## 🛠 Tech Stack

- [Svelte](https://svelte.dev/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Node.js](https://nodejs.org/) (v18.20.8)
- [Perplexity Sonar API](https://www.perplexity.ai/)

---

## ⚙️ Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Negi-Ashish/vacci-pro.git
   cd vacci-pro
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the development server:

   ```bash
   npm run dev
   ```

> Make sure you have **Node.js v18.20.8** or higher installed.

---

## 📘 Usage Flow

1. Select **Gender** (Male/Female)
2. Select **Date of Birth** → Age is calculated and displayed.
3. Enter **Background Info** (Diseases, Occupation, Past Medications)
4. Use the **Reset** button anytime to start over
5. Click **Fetch Vaccine** → API call begins
6. While waiting, a **sponsored advertisement** is shown
7. **Perplexity Sonar API** fetches vaccine recommendations using the following trusted domains:

   - `cdc.gov`
   - `who.int`
   - `mayoclinic.org`
   - `unicef.org`
   - `nhm.gov.in`

8. Data is displayed in a table with:

   - Vaccine Name
   - Month
   - Why It’s Important
   - How It’s Given
   - Common Side Effects

9. You can **download the schedule as PDF** for future reference

---

## 🧠 API Config

We use the `https://api.perplexity.ai/chat/completions` endpoint with the following payload:

```ts
const payload = {
	model: 'sonar-pro',
	messages: [
		{
			role: 'system',
			content: `You are a licensed medical doctor and vaccine expert. Provide accurate, up-to-date, 
        and concise medical advice based on established health guidelines. Respond in a clear, reassuring, and professional tone.`
		},
		{ role: 'user', content: userPrompt.trim() }
	],
	response_format: {
		type: 'json_schema',
		json_schema: jsonSchema
	},
	max_tokens: 10000,
	temperature: 0.0,
	top_p: 1.0,
	top_k: 1,
	frequency_penalty: 0,
	presence_penalty: 0,
	search_domain_filter: ['cdc.gov', 'who.int', 'mayoclinic.org', 'unicef.org', 'nhm.gov.in']
};
```

This setup ensures **factual**, **deterministic**, and **reliable** vaccine data output.

---

## 🎨 Attributions

- **Advertisement GIF** made using [Canva](https://www.canva.com/)

---

## 📄 License

⚠️ License not specified yet. Please contact the author before using this project for commercial purposes.

---

## 👨‍💻 Author

**Ashish Negi**
📧 [ashishnegi0511@gmail.com](mailto:ashishnegi0511@gmail.com)
🌐 [GitHub](https://github.com/Negi-Ashish)
🔗 [LinkedIn](https://www.linkedin.com/in/web3architect/)

---
