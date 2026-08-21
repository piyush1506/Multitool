import { Metadata } from "next";
import PdfCompressorClient from "@/components/tools/PdfCompressorClient";

export const metadata: Metadata = {
  title: "PDF Compressor | Reduce PDF File Size Online Free",
  description: "Compress PDF files online securely. Reduce PDF file size without losing document structure.",
  keywords: "pdf, compressor, reduce size, free online tool, pkctechs",
};

export default function PdfCompressorPage() {
  return (
    <div className="container mx-auto px-6 py-16 max-w-5xl relative z-10">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 gradient-text">
          PDF Compressor
        </h1>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto font-light leading-relaxed">
          Optimize and compress your PDF documents directly in your browser.
        </p>
      </div>
      <PdfCompressorClient />
    </div>
  );
}
