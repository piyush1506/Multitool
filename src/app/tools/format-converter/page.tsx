import { Metadata } from "next";
import FormatConverterClient from "@/components/tools/FormatConverterClient";

export const metadata: Metadata = {
  title: "Data Format Converter | JSON, CSV & XML Converter Online",
  description: "Convert between JSON, CSV, and XML formats instantly. Free online developer utility for data transformation and formatting.",
  keywords: ["json to csv","csv to json","xml to json","json to xml","data format converter","data transformation tool","pkctechs"],
  alternates: {
    canonical: "https://pkctechs.in/tools/format-converter",
  },
  openGraph: {
    title: "Data Format Converter | JSON, CSV & XML Converter Online",
    description: "Convert between JSON, CSV, and XML formats instantly. Free online developer utility for data transformation and formatting.",
    url: "https://pkctechs.in/tools/format-converter",
    siteName: "Data Format Converter",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Data Format Converter | JSON, CSV & XML Converter Online",
    description: "Convert between JSON, CSV, and XML formats instantly. Free online developer utility for data transformation and formatting.",
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Data Format Converter",
    "url": "https://pkctechs.in/tools/format-converter",
    "operatingSystem": "All",
    "applicationCategory": "UtilitiesApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "Convert between JSON, CSV, and XML formats instantly. Free online developer utility for data transformation and formatting."
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://pkctechs.in"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Tools",
        "item": "https://pkctechs.in/#tools"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Data Format Converter",
        "item": "https://pkctechs.in/tools/format-converter"
      }
    ]
  }
];

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
