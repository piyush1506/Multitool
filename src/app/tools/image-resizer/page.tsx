import { Metadata } from "next";
import ImageResizerClient from "@/components/tools/ImageResizerClient";

export const metadata: Metadata = {
  title: "Image Resizer | MultiTool Pro",
  description: "Resize images to exact dimensions while maintaining aspect ratio and quality. Free online image resizer.",
};

export default function ImageResizerPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
          Image Resizer
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Upload an image, set your desired dimensions, and download the perfectly sized result. 
          Everything happens securely in your browser.
        </p>
      </div>
      <ImageResizerClient />
    </div>
  );
}
