import { GoogleGenAI } from "@google/genai";
const ai = new GoogleGenAI({});

export async function POST(req) {
  const { prompt } = await req.json();
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });
  return new Response(JSON.stringify({ text: response.text }), {
    headers: { "Content-Type": "application/json" },
  });
}
