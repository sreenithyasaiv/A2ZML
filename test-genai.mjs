import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY;
if (!apiKey) {
  console.error('No API_KEY provided in environment');
  process.exit(1);
}

const ai = new GoogleGenAI({ apiKey });

async function runTest() {
  try {
    const res = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: 'Provide a one-line JSON: {"ok": true, "message": "test"}'
    });
    console.log('Response received. Candidate text preview:');
    const text = res?.candidates?.[0]?.content?.parts?.[0]?.text;
    console.log(text || JSON.stringify(res, null, 2));
  } catch (err) {
    console.error('Test request failed:');
    console.error(err);
    process.exit(2);
  }
}

runTest();
