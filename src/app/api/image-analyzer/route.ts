import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(request: Request) {
  try {
    const { imageBase64, mimeType, action, customApiKey, customPrompt } = await request.json();

    if (!imageBase64 || !mimeType) {
      return NextResponse.json({ success: false, error: "Image data is required" }, { status: 400 });
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
      case "describe":
        prompt = "Describe this image in detail. What objects, people, colors, and setting do you see? What is the overall mood?";
        break;
      case "ocr":
        prompt = "Extract all the text visible in this image accurately. Preserve the original formatting, line breaks, and structure as much as possible. If there is no text, reply 'No text found.'";
        break;
      case "alt-text":
        prompt = "Write a highly descriptive, SEO-friendly alt-text for this image. Keep it under 125 characters if possible, but make it descriptive for visually impaired users.";
        break;
      case "custom":
        prompt = customPrompt || "Analyze this image.";
        break;
      default:
        prompt = "Analyze this image.";
    }

    // Process base64 string (remove data URL prefix if present)
    const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, "");

    const imageParts = [
      {
        inlineData: {
          data: base64Data,
          mimeType,
        },
      },
    ];

    const result = await model.generateContent([prompt, ...imageParts]);
    const response = await result.response;
    const outputText = response.text();

    return NextResponse.json({ success: true, result: outputText });
  } catch (error: any) {
    console.error("Image Analyzer API Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to process image" },
      { status: 500 }
    );
  }
}
