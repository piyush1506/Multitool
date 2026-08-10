import { Metadata } from "next";
import ImageConverterClient from "@/components/tools/ImageConverterClient";

export const metadata: Metadata = {
  title: "Image Converter | pkctechs",
  description: "Convert images to PNG, JPEG, WEBP, and GIF instantly in your browser without any quality loss.",
};

export default function ImageConverterPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
          Image Format Converter
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Quickly convert your images to different formats. Supports JPEG, PNG, WEBP, and more. 
          Everything is processed safely on your device.
        </p>
      </div>
      <ImageConverterClient />
    </div>
  );
}
