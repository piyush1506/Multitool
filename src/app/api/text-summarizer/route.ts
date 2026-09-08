import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(request: Request) {
  try {
    const { text, action, customApiKey } = await request.json();

    if (!text) {
      return NextResponse.json({ success: false, error: "Text is required" }, { status: 400 });
    }

    const apiKey = customApiKey || process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { success: false, error: "API Key is missing. Please provide a Gemini API Key in settings." },
        { status: 400 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    let prompt = "";
    switch (action) {
      case "summarize":
        prompt = `Summarize the following text clearly and concisely. Use bullet points if appropriate:\n\n${text}`;
        break;
      case "rewrite-professional":
        prompt = `Rewrite the following text to sound highly professional, polite, and polished:\n\n${text}`;
        break;
      case "rewrite-casual":
        prompt = `Rewrite the following text to sound casual, friendly, and conversational:\n\n${text}`;
        break;
      case "fix-grammar":
        prompt = `Fix any grammar, spelling, or punctuation errors in the following text. Do not change the original meaning or tone significantly. Just output the corrected text:\n\n${text}`;
        break;
      case "extract-keywords":
        prompt = `Extract the most important keywords and entities from the following text as a comma-separated list:\n\n${text}`;
        break;
      default:
        prompt = `Process this text:\n\n${text}`;
    }

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const outputText = response.text();

    return NextResponse.json({ success: true, result: outputText });
  } catch (error: any) {
    console.error("Text Summarizer API Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to process text" },
      { status: 500 }
    );
  }
}
