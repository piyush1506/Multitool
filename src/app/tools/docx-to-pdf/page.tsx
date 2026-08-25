import { Metadata } from "next";
import DocxToPdfClient from "@/components/tools/DocxToPdfClient";

export const metadata: Metadata = {
  title: "DOCX to PDF Converter | Convert Word to PDF Online Free",
  description: "Convert Word DOCX documents to PDF format online instantly. Free, fast, 100% secure & iLovePDF alternative.",
  keywords: ["docx to pdf", "convert word to pdf", "word to pdf", "ilovepdf word to pdf", "ilovepdf", "ilovepdff", "i love pdf", "free word to pdf", "pkctechs"],
  alternates: {
    canonical: "https://pkctechs.in/tools/docx-to-pdf",
  },
  openGraph: {
    title: "Free DOCX to PDF Converter Online",
    description: "Convert Word (.docx) documents into portable PDF files instantly in your browser.",
    url: "https://pkctechs.in/tools/docx-to-pdf",
    siteName: "DOCX to PDF Converter",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DOCX to PDF Converter | pkctechs",
    description: "Convert Word files into PDF documents for free.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "DOCX to PDF Converter",
  "operatingSystem": "All",
  "applicationCategory": "UtilitiesApplication",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "Convert Word (.docx) documents to PDF format online for free."
};

export default function DocxToPdfPage() {
  return (
    <div className="container mx-auto px-6 py-16 max-w-5xl relative z-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 gradient-text">
          DOCX to PDF Converter
        </h1>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto font-light leading-relaxed">
          Convert Microsoft Word documents into high-quality, easy-to-share PDF files.
        </p>
      </div>
      <DocxToPdfClient />
    </div>
  );
}
