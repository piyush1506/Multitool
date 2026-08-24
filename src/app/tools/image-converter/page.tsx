import { Metadata } from "next";
import ImageConverterClient from "@/components/tools/ImageConverterClient";

export const metadata: Metadata = {
  title: "Image Converter | Convert PNG, JPG, WEBP Online",
  description: "Convert images between formats like PNG, JPEG, WEBP instantly. Fast and secure online image converter.",
  keywords: "image, converter, free online tool, pkctechs",
  applicationName: "Image Converter",
  openGraph: {
    siteName: "Image Converter",
  }
};

export default function ImageConverterPage() {
  return (
    <div className="container mx-auto px-6 py-16 max-w-5xl relative z-10">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 gradient-text">
          Image Converter
        </h1>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto font-light leading-relaxed">
          Seamlessly convert between image formats directly in your browser with zero quality loss.
        </p>
      </div>
      <ImageConverterClient />
    </div>
  );
}
