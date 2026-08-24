import { Metadata } from "next";
import ColorPickerClient from "@/components/tools/ColorPickerClient";

export const metadata: Metadata = {
  title: "Color Picker & Palette Generator | HEX, RGB, HSL Converter",
  description: "Pick colors, convert formats between HEX, RGB, HSL instantly online.",
  keywords: "color, picker, hex, rgb, hsl, free online tool, pkctechs",
  applicationName: "Color Picker & Palette Generator",
  openGraph: {
    siteName: "Color Picker & Palette Generator",
  }
};

export default function ColorPickerPage() {
  return (
    <div className="container mx-auto px-6 py-16 max-w-5xl relative z-10">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 gradient-text">
          Color Picker & Palette
        </h1>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto font-light leading-relaxed">
          Select custom colors and convert formats instantly between HEX, RGB, and HSL.
        </p>
      </div>
      <ColorPickerClient />
    </div>
  );
}
