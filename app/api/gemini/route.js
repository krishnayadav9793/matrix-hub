import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req) {
  try {
    const { prompt } = await req.json();

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash", 
    });

    const result = await model.generateContent(prompt);

    return Response.json({
      output: result.response.text(),
    });

  } catch (err) {
    console.error("API ERROR →", err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}
