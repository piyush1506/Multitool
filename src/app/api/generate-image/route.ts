import { NextRequest, NextResponse } from "next/server";

const RENDER_CONFIG_URL = "https://ai-video-generate-lbl8.onrender.com/api/config";

// Aspect ratio mappings (width x height)
const ASPECT_RATIO_DIMS: Record<string, { width: number; height: number }> = {
  "1:1": { width: 1024, height: 1024 },
  "16:9": { width: 1280, height: 720 },
  "9:16": { width: 720, height: 1280 },
  "4:3": { width: 1024, height: 768 },
  "3:2": { width: 1080, height: 720 },
};

// Style enhancers
const STYLE_PROMPTS: Record<string, string> = {
  photorealistic: ", photorealistic, ultra-detailed 8k, cinematic lighting, shot on 35mm lens, sharp focus, professional photography",
  pixar: ", cute 3D character animation style, smooth render, vibrant lighting, octane render, Disney Pixar aesthetic",
  cinematic: ", dramatic cinematic composition, film still, moody atmospheric lighting, anamorphic lens flare, depth of field, 8k",
  cyberpunk: ", cyberpunk aesthetic, futuristic neon glow, high tech holographic reflections, dark rainy night, intricate details",
  fantasy: ", epic fantasy digital illustration, magical glowing aura, intricate concept art, hyper-detailed, ArtStation trending",
  watercolor: ", delicate watercolor painting, gentle paint bleed, rich pastel hues, handcrafted artistic strokes, textured paper canvas",
  anime: ", modern anime key visual, vibrant studio illustration, crisp line art, Makoto Shinkai style, aesthetic lighting",
  minimalist: ", clean minimalist art, elegant geometric composition, flat vector illustration, refined color palette",
  none: "",
};

async function getApiKey(customKey?: string): Promise<string> {
  if (customKey && customKey.trim()) {
    return customKey.trim();
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);
    const res = await fetch(RENDER_CONFIG_URL, {
      signal: controller.signal,
      headers: { "User-Agent": "Multitool-App/1.0" },
      cache: "no-store",
    });
    clearTimeout(timeout);

    if (res.ok) {
      const data = await res.json();
      const key = data.apiKey || data.geminiApiKey;
      if (key && typeof key === "string" && key.trim()) {
        return key.trim();
      }
    }
  } catch (err) {
    console.warn("Could not fetch key from Render backend:", err);
  }

  return process.env.GEMINI_API_KEY || "";
}

async function generateWithGoogleGemini(
  prompt: string,
  apiKey: string,
  modelName: string = "gemini-2.5-flash-image"
): Promise<{ success: boolean; dataUrl?: string; error?: string }> {
  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      }),
    });

    const resJson = await response.json();

    if (!response.ok) {
      const errMsg = resJson?.error?.message || `Google API returned status ${response.status}`;
      return { success: false, error: errMsg };
    }

    const candidate = resJson?.candidates?.[0];
    const parts = candidate?.content?.parts || [];

    for (const part of parts) {
      if (part.inlineData && part.inlineData.data) {
        const mime = part.inlineData.mimeType || "image/png";
        return {
          success: true,
          dataUrl: `data:${mime};base64,${part.inlineData.data}`,
        };
      }
    }

    return {
      success: false,
      error: "Google AI model responded without inline image data.",
    };
  } catch (err: any) {
    return { success: false, error: err.message || "Network error querying Google AI Studio" };
  }
}

async function generateWithFallbackEngine(
  prompt: string,
  aspectRatio: string,
  negativePrompt?: string
): Promise<{ success: boolean; dataUrl?: string; error?: string }> {
  try {
    const dims = ASPECT_RATIO_DIMS[aspectRatio] || ASPECT_RATIO_DIMS["1:1"];
    const seed = Math.floor(Math.random() * 10000000);
    let fullPrompt = prompt;
    if (negativePrompt && negativePrompt.trim()) {
      fullPrompt += ` (avoid: ${negativePrompt.trim()})`;
    }

    const encodedPrompt = encodeURIComponent(fullPrompt.slice(0, 1000));
    const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=${dims.width}&height=${dims.height}&seed=${seed}&nologo=true&model=flux`;

    const imgRes = await fetch(imageUrl, {
      headers: { "User-Agent": "Multitool-App/1.0" },
    });

    if (!imgRes.ok) {
      return { success: false, error: `Image server error (${imgRes.status})` };
    }

    const arrayBuffer = await imgRes.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString("base64");
    const mimeType = imgRes.headers.get("content-type") || "image/jpeg";

    return {
      success: true,
      dataUrl: `data:${mimeType};base64,${base64}`,
    };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to generate fallback image" };
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      prompt,
      aspectRatio = "1:1",
      style = "photorealistic",
      negativePrompt = "",
      customApiKey = "",
      engine = "auto", // 'auto' | 'google' | 'fallback'
    } = body;

    if (!prompt || typeof prompt !== "string" || !prompt.trim()) {
      return NextResponse.json(
        { success: false, error: "Prompt is required." },
        { status: 400 }
      );
    }

    // Build enhanced prompt
    const styleModifier = STYLE_PROMPTS[style] || "";
    const fullPrompt = `${prompt.trim()}${styleModifier}`;

    // 1. If explicit fallback requested
    if (engine === "fallback") {
      const fallbackResult = await generateWithFallbackEngine(fullPrompt, aspectRatio, negativePrompt);
      if (fallbackResult.success) {
        return NextResponse.json({
          success: true,
          imageUrl: fallbackResult.dataUrl,
          model: "Flux Creative Engine",
          prompt: fullPrompt,
        });
      }
      return NextResponse.json({ success: false, error: fallbackResult.error }, { status: 500 });
    }

    // 2. Query Google AI Studio API key (from Render backend or custom)
    const apiKey = await getApiKey(customApiKey);

    if (!apiKey) {
      // If no key available and engine is 'auto', use fallback
      if (engine === "auto") {
        const fallbackResult = await generateWithFallbackEngine(fullPrompt, aspectRatio, negativePrompt);
        if (fallbackResult.success) {
          return NextResponse.json({
            success: true,
            imageUrl: fallbackResult.dataUrl,
            model: "Flux Engine (No Google API key detected)",
            prompt: fullPrompt,
          });
        }
      }
      return NextResponse.json(
        {
          success: false,
          error: "No Google AI Studio API key found from Render backend or custom input.",
        },
        { status: 400 }
      );
    }

    // 3. Attempt Google AI Studio generation
    const googleResult = await generateWithGoogleGemini(fullPrompt, apiKey, "gemini-2.5-flash-image");

    if (googleResult.success) {
      return NextResponse.json({
        success: true,
        imageUrl: googleResult.dataUrl,
        model: "Google AI Studio (Gemini 2.5 Flash Image)",
        prompt: fullPrompt,
      });
    }

    // If Google returned an error and engine is 'auto', seamlessly use fallback engine
    if (engine === "auto") {
      const fallbackResult = await generateWithFallbackEngine(fullPrompt, aspectRatio, negativePrompt);
      if (fallbackResult.success) {
        return NextResponse.json({
          success: true,
          imageUrl: fallbackResult.dataUrl,
          model: "Flux Engine (High Speed Fallback)",
          prompt: fullPrompt,
          warning: `Google AI Studio: ${googleResult.error}. Used high-speed creative engine instead.`,
        });
      }
    }

    // If engine was strictly 'google' or fallback failed
    return NextResponse.json(
      {
        success: false,
        error: googleResult.error || "Google AI Studio image generation failed.",
        tip: "Google AI Studio free tier may have quota limit of 0 for image generation without a billing project. You can switch engine mode to 'High-Speed Engine' or provide a key with quota enabled.",
      },
      { status: 429 }
    );
  } catch (error: any) {
    console.error("Image generation API error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
