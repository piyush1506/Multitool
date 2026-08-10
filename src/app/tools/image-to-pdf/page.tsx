import { Metadata } from "next";
import ImageToPdfClient from "@/components/tools/ImageToPdfClient";

export const metadata: Metadata = {
  title: "Image to PDF Converter | pkctechs",
  description: "Convert multiple JPG, PNG, or WEBP images into a single PDF document online. Fast, secure, and private.",
};

export default function ImageToPdfPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">
          Image to PDF
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Turn your images into a structured PDF document. Upload multiple images, arrange them, and download instantly.
        </p>
      </div>
      <ImageToPdfClient />
    </div>
  );
}
