import { Metadata } from "next";
import MergePdfClient from "@/components/tools/MergePdfClient";

export const metadata: Metadata = {
  title: "Merge PDF | Combine PDF Files Online Free",
  description: "Merge multiple PDF documents into a single file easily. Free online PDF merger.",
  keywords: "pdf, merge, combine, free online tool, pkctechs",
};

export default function MergePdfPage() {
  return (
    <div className="container mx-auto px-6 py-16 max-w-5xl relative z-10">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 gradient-text">
          Merge PDF
        </h1>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto font-light leading-relaxed">
          Combine multiple PDF documents into a single organized file in seconds.
        </p>
      </div>
      <MergePdfClient />
    </div>
  );
}
