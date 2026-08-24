import { Metadata } from "next";
import JsonFormatterClient from "@/components/tools/JsonFormatterClient";

export const metadata: Metadata = {
  title: "JSON Formatter & Validator | Beautify and Minify JSON",
  description: "Format, validate, beautify, and minify JSON data online free.",
  keywords: "json, formatter, validator, beautifier, minify, free online tool, pkctechs",
  applicationName: "JSON Formatter & Validator",
  openGraph: {
    siteName: "JSON Formatter & Validator",
  }
};

export default function JsonFormatterPage() {
  return (
    <div className="container mx-auto px-6 py-16 max-w-5xl relative z-10">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 gradient-text">
          JSON Formatter & Validator
        </h1>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto font-light leading-relaxed">
          Beautify, minify, and validate JSON data structures instantly in your browser.
        </p>
      </div>
      <JsonFormatterClient />
    </div>
  );
}
