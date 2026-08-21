import { Metadata } from "next";
import SvgToPngClient from "@/components/tools/SvgToPngClient";

export const metadata: Metadata = {
  title: "SVG to PNG Converter | Convert SVG to High-Res PNG",
  description: "Convert SVG code or graphics into high-resolution PNG images online free.",
  keywords: "svg, png, converter, free online tool, pkctechs",
};

export default function SvgToPngPage() {
  return (
    <div className="container mx-auto px-6 py-16 max-w-5xl relative z-10">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 gradient-text">
          SVG to PNG Converter
        </h1>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto font-light leading-relaxed">
          Convert vector SVG markup or graphics directly into crisp, high-resolution PNG images.
        </p>
      </div>
      <SvgToPngClient />
    </div>
  );
}
