import { Metadata } from "next";
import PdfChatClient from "@/components/tools/PdfChatClient";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Free AI PDF Chat & Document Assistant | powered by Gemini",
  description:
    "Upload any PDF document and instantly chat with it to ask questions, extract summaries, and find answers for free using Google Gemini AI.",
  keywords: [
    "ai pdf chat",
    "chat with pdf",
    "pdf document assistant",
    "gemini pdf tool",
    "summarize pdf free",
    "pkctechs",
  ],
  alternates: {
    canonical: "https://pkctechs.in/tools/pdf-chat",
  },
  openGraph: {
    title: "Free AI PDF Chat & Document Assistant",
    description: "Instantly chat with your PDFs, ask questions, and extract insights for free using AI.",
    url: "https://pkctechs.in/tools/pdf-chat",
    siteName: "AI PDF Chat",
    type: "website",
  },
};

export default function PdfChatPage() {
  return (
    <div className="container mx-auto px-6 py-16 max-w-6xl relative z-10">
      <Breadcrumbs
        items={[{ name: "Tools", href: "/#tools" }, { name: "AI PDF Chat" }]}
      />
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-rose-500/10 via-red-500/10 to-orange-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 mb-4 shadow-xs">
          <span>✨ Powered by Gemini 1.5 Pro AI</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 gradient-text">
          AI PDF Chat Assistant
        </h1>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto font-light leading-relaxed">
          Upload any PDF document and instantly ask questions about its content. Your files are read securely in your browser and analyzed by AI.
        </p>
      </div>

      <PdfChatClient />
    </div>
  );
}
