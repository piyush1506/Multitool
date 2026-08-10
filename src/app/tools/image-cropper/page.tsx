import { Metadata } from "next";
import ImageCropperClient from "@/components/tools/ImageCropperClient";

export const metadata: Metadata = {
  title: "Image Cropper | MultiTool Pro",
  description: "Crop images online easily with a visual editor. Frame and cut your pictures perfectly.",
};

export default function ImageCropperPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">
          Image Cropper
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Visually frame, adjust, and crop your images. Secure, fast, and completely in your browser.
        </p>
      </div>
      <ImageCropperClient />
    </div>
  );
}
