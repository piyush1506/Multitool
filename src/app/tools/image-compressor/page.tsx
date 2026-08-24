import { Metadata } from "next";
import ImageCompressorClient from "@/components/tools/ImageCompressorClient";

export const metadata: Metadata = {
  title: "Image Compressor | Reduce Image File Size Online Free",
  description: "Compress JPEG, PNG, and WEBP images online. Reduce image file size by up to 90% without visible quality loss. Free, fast, and secure.",
  keywords: "image, compressor, free online tool, pkctechs",
  applicationName: "Image Compressor",
  openGraph: {
    siteName: "Image Compressor",
  }
};

export default function ImageCompressorPage() {
  return (
    <div className="container mx-auto px-6 py-16 max-w-5xl relative z-10">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 gradient-text">
          Image Compressor
        </h1>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto font-light leading-relaxed">
          Optimize your images for the web. Compress files quickly in your browser without losing quality.
        </p>
      </div>
      <ImageCompressorClient />
    </div>
  );
}
