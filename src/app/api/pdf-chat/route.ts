import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(request: Request) {
  try {
    const { documentText, question, customApiKey } = await request.json();

    if (!documentText || !question) {
      return NextResponse.json({ success: false, error: "Document text and question are required" }, { status: 400 });
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

    const prompt = `You are an intelligent document assistant. I am going to provide you with the extracted text from a document, and a question about it.
Please answer the question accurately based ONLY on the provided document text. If the answer is not in the text, say "I cannot find the answer to that in the provided document."

--- DOCUMENT TEXT START ---
${documentText.slice(0, 500000)} // Limiting text to prevent extreme payload issues, though flash supports 1M tokens.
--- DOCUMENT TEXT END ---

User Question: ${question}
Answer:`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const outputText = response.text();

    return NextResponse.json({ success: true, result: outputText });
  } catch (error: any) {
    console.error("PDF Chat API Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to process chat request" },
      { status: 500 }
    );
  }
}
