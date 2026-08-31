import { Metadata } from "next";
import SplitPdfClient from "@/components/tools/SplitPdfClient";

export const metadata: Metadata = {
  title: "Split PDF | Extract Pages from PDF Online Free",
  description: "Split PDF files by page ranges or extract specific pages into separate PDF documents online for free. Fast and private iLovePDF alternative.",
  keywords: ["split pdf","extract pdf pages","separate pdf","cut pdf pages online","ilovepdf split pdf","free pdf splitter","pkctechs"],
  alternates: {
    canonical: "https://pkctechs.in/tools/split-pdf",
  },
  openGraph: {
    title: "Split PDF | Extract Pages from PDF Online Free",
    description: "Split PDF files by page ranges or extract specific pages into separate PDF documents online for free. Fast and private iLovePDF alternative.",
    url: "https://pkctechs.in/tools/split-pdf",
    siteName: "Split PDF",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Split PDF | Extract Pages from PDF Online Free",
    description: "Split PDF files by page ranges or extract specific pages into separate PDF documents online for free. Fast and private iLovePDF alternative.",
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Split PDF",
    "url": "https://pkctechs.in/tools/split-pdf",
    "operatingSystem": "All",
    "applicationCategory": "UtilitiesApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "Split PDF files by page ranges or extract specific pages into separate PDF documents online for free. Fast and private iLovePDF alternative."
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
        "name": "Split PDF",
        "item": "https://pkctechs.in/tools/split-pdf"
      }
    ]
  }
];

export default function SplitPdfPage() {
  return (
    <div className="container mx-auto px-6 py-16 max-w-5xl relative z-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 gradient-text">
          Split PDF
        </h1>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto font-light leading-relaxed">
          Extract specific pages or divide a PDF into separate documents.
        </p>
      </div>
      <SplitPdfClient />
    </div>
  );
}
