import { Metadata } from "next";
import ImageCropperClient from "@/components/tools/ImageCropperClient";

export const metadata: Metadata = {
  title: "Image Cropper | Crop Images Online For Free",
  description: "Crop and adjust your images with an easy-to-use visual editor. Perfect for social media formatting.",
  keywords: "image, cropper, free online tool, pkctechs",
};

export default function ImageCropperPage() {
  return (
    <div className="container mx-auto px-6 py-16 max-w-5xl relative z-10">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 gradient-text">
          Image Cropper
        </h1>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto font-light leading-relaxed">
          Visually crop and frame your images exactly how you want them.
        </p>
      </div>
      <ImageCropperClient />
    </div>
  );
}
