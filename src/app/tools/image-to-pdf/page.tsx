import { Metadata } from "next";
import ImageToPdfClient from "@/components/tools/ImageToPdfClient";

export const metadata: Metadata = {
  title: "Image to PDF | Convert JPG, PNG to PDF Online",
  description: "Convert images to PDF documents instantly. Fast and secure online image to PDF converter.",
  keywords: "image, pdf, converter, free online tool, pkctechs",
};

export default function ImageToPdfPage() {
  return (
    <div className="container mx-auto px-6 py-16 max-w-5xl relative z-10">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 gradient-text">
          Image to PDF
        </h1>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto font-light leading-relaxed">
          Convert JPG, PNG, and WebP images to a clean PDF document.
        </p>
      </div>
      <ImageToPdfClient />
    </div>
  );
}
