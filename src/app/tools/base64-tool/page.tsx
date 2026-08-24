import { Metadata } from "next";
import Base64Client from "@/components/tools/Base64Client";

export const metadata: Metadata = {
  title: "Base64 Encoder & Decoder | Convert Text to Base64 Online",
  description: "Encode or decode strings to Base64 format instantly.",
  keywords: "base64, encode, decode, free online tool, pkctechs",
  applicationName: "Base64 Encoder & Decoder",
  openGraph: {
    siteName: "Base64 Encoder & Decoder",
  }
};

export default function Base64Page() {
  return (
    <div className="container mx-auto px-6 py-16 max-w-5xl relative z-10">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 gradient-text">
          Base64 Encoder & Decoder
        </h1>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto font-light leading-relaxed">
          Encode plain text into Base64 format or decode Base64 strings back to text.
        </p>
      </div>
      <Base64Client />
    </div>
  );
}
