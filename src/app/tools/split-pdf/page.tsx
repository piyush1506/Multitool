import { Metadata } from "next";
import SplitPdfClient from "@/components/tools/SplitPdfClient";

export const metadata: Metadata = {
  title: "Split PDF | Extract Pages from PDF Online Free",
  description: "Extract specific pages or split a PDF into separate files easily.",
  keywords: "pdf, split, extract, free online tool, pkctechs",
  applicationName: "Split PDF",
  openGraph: {
    siteName: "Split PDF",
  }
};

export default function SplitPdfPage() {
  return (
    <div className="container mx-auto px-6 py-16 max-w-5xl relative z-10">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 gradient-text">
          Split PDF
        </h1>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto font-light leading-relaxed">
          Extract specific pages or divide a PDF into separate documents.
        </p>
      </div>
      <SplitPdfClient />
    </div>
  );
}
