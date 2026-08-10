import { Metadata } from "next";
import PdfToImageClient from "@/components/tools/PdfToImageClient";

export const metadata: Metadata = {
  title: "PDF to Image Converter | pkctechs",
  description: "Extract high-quality images from PDF pages securely in your browser. Convert PDF to JPG or PNG instantly.",
};

export default function PdfToImagePage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
          PDF to Image
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Convert your PDF documents into high-quality images. Extract pages as PNG or JPEG without sending files to any server.
        </p>
      </div>
      <PdfToImageClient />
    </div>
  );
}
