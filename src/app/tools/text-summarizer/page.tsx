import { Metadata } from "next";
import TextSummarizerClient from "@/components/tools/TextSummarizerClient";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Free AI Text Summarizer & Rewriter | powered by Gemini",
  description:
    "Instantly summarize long articles, rewrite text in different tones, fix grammar, and extract keywords for free using Google Gemini AI.",
  keywords: [
    "ai text summarizer",
    "rewrite text ai",
    "fix grammar free",
    "gemini text tool",
    "online summarizer",
    "extract keywords",
    "pkctechs",
  ],
  alternates: {
    canonical: "https://pkctechs.in/tools/text-summarizer",
  },
  openGraph: {
    title: "Free AI Text Summarizer & Rewriter",
    description: "Instantly summarize long articles, rewrite text, and fix grammar for free using AI.",
    url: "https://pkctechs.in/tools/text-summarizer",
    siteName: "AI Text Summarizer",
    type: "website",
  },
};

export default function TextSummarizerPage() {
  return (
    <div className="container mx-auto px-6 py-16 max-w-6xl relative z-10">
      <Breadcrumbs
        items={[{ name: "Tools", href: "/#tools" }, { name: "AI Text Summarizer" }]}
      />
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400 mb-4 shadow-xs">
          <span>✨ Powered by Gemini 1.5 Flash</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 gradient-text">
          AI Text Summarizer
        </h1>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto font-light leading-relaxed">
          Instantly summarize long texts, rewrite content for different audiences, fix grammar, and extract key insights in seconds.
        </p>
      </div>

      <TextSummarizerClient />
    </div>
  );
}
