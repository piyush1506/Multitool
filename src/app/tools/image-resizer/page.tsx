import { Metadata } from "next";
import ImageResizerClient from "@/components/tools/ImageResizerClient";

export const metadata: Metadata = {
  title: "Image Resizer | Resize Images Online For Free",
  description: "Resize image dimensions easily with exact pixel or percentage scaling.",
  keywords: "image, resizer, free online tool, pkctechs",
};

export default function ImageResizerPage() {
  return (
    <div className="container mx-auto px-6 py-16 max-w-5xl relative z-10">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 gradient-text">
          Image Resizer
        </h1>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto font-light leading-relaxed">
          Change the width and height of your images while maintaining quality.
        </p>
      </div>
      <ImageResizerClient />
    </div>
  );
}
