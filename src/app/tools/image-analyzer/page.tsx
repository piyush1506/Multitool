import { Metadata } from "next";
import ImageAnalyzerClient from "@/components/tools/ImageAnalyzerClient";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Free AI Image Analyzer & OCR | powered by Gemini Vision",
  description:
    "Upload images to instantly extract text (OCR), generate SEO alt-text, or get detailed visual descriptions for free using Google Gemini Vision.",
  keywords: [
    "ai image analyzer",
    "image to text",
    "extract text from image",
    "ocr online free",
    "ai alt text generator",
    "gemini vision tool",
    "pkctechs",
  ],
  alternates: {
    canonical: "https://pkctechs.in/tools/image-analyzer",
  },
  openGraph: {
    title: "Free AI Image Analyzer & OCR",
    description: "Extract text from images, generate alt-text, and describe scenes using AI Vision.",
    url: "https://pkctechs.in/tools/image-analyzer",
    siteName: "AI Image Analyzer",
    type: "website",
  },
};

export default function ImageAnalyzerPage() {
  return (
    <div className="container mx-auto px-6 py-16 max-w-6xl relative z-10">
      <Breadcrumbs
        items={[{ name: "Tools", href: "/#tools" }, { name: "AI Image Analyzer & OCR" }]}
      />
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-indigo-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 mb-4 shadow-xs">
          <span>✨ Powered by Gemini Vision API</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 gradient-text">
          AI Image Analyzer & OCR
        </h1>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto font-light leading-relaxed">
          Upload any image to accurately extract text, generate descriptive alt-text for SEO, or ask custom questions about the image.
        </p>
      </div>

      <ImageAnalyzerClient />
    </div>
  );
}
