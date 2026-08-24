import { Metadata } from "next";
import PdfToImageClient from "@/components/tools/PdfToImageClient";

export const metadata: Metadata = {
  title: "PDF to Image | Convert PDF Pages to Images",
  description: "Convert PDF pages to high-resolution images instantly.",
  keywords: "pdf, image, converter, free online tool, pkctechs",
  applicationName: "PDF to Image",
  openGraph: {
    siteName: "PDF to Image",
  }
};

export default function PdfToImagePage() {
  return (
    <div className="container mx-auto px-6 py-16 max-w-5xl relative z-10">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 gradient-text">
          PDF to Image
        </h1>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto font-light leading-relaxed">
          Extract and convert pages from your PDF documents into high-quality images.
        </p>
      </div>
      <PdfToImageClient />
    </div>
  );
}
