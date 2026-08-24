import { Metadata } from "next";
import FormatConverterClient from "@/components/tools/FormatConverterClient";

export const metadata: Metadata = {
  title: "Data Format Converter | JSON, CSV & XML Converter Online",
  description: "Convert data formats seamlessly between JSON, CSV, and XML online. Fast, browser-based data converter for developers.",
  keywords: ["json to csv", "csv to json", "json to xml", "data format converter", "pkctechs"],
  alternates: {
    canonical: "https://pkctechs.in/tools/format-converter",
  },
  openGraph: {
    title: "Free Data Format Converter (JSON, CSV, XML)",
    description: "Convert structured data between JSON, CSV, and XML formats instantly in your browser.",
    url: "https://pkctechs.in/tools/format-converter",
    siteName: "Data Format Converter",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Data Format Converter | pkctechs",
    description: "Convert data structures between JSON, CSV, and XML for free.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Data Format Converter",
  "operatingSystem": "All",
  "applicationCategory": "DeveloperApplication",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "Convert structured data between JSON, CSV, and XML formats online."
};

export default function FormatConverterPage() {
  return (
    <div className="container mx-auto px-6 py-16 max-w-5xl relative z-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 gradient-text">
          Data Format Converter
        </h1>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto font-light leading-relaxed">
          Convert structured data instantly between JSON, CSV, and XML formats.
        </p>
      </div>
      <FormatConverterClient />
    </div>
  );
}
