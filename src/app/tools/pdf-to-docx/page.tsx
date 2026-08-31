import { Metadata } from "next";
import PdfToDocxClient from "@/components/tools/PdfToDocxClient";

export const metadata: Metadata = {
  title: "PDF to DOCX Converter | Convert PDF to Word Online Free",
  description: "Convert PDF documents to editable Microsoft Word (.docx) files online for free. Fast, accurate, 100% secure & iLovePDF alternative.",
  keywords: ["pdf to docx","convert pdf to word","pdf to word","ilovepdf pdf to word","ilovepdf","free pdf to word","pkctechs"],
  alternates: {
    canonical: "https://pkctechs.in/tools/pdf-to-docx",
  },
  openGraph: {
    title: "PDF to DOCX Converter | Convert PDF to Word Online Free",
    description: "Convert PDF documents to editable Microsoft Word (.docx) files online for free. Fast, accurate, 100% secure & iLovePDF alternative.",
    url: "https://pkctechs.in/tools/pdf-to-docx",
    siteName: "PDF to DOCX Converter",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PDF to DOCX Converter | Convert PDF to Word Online Free",
    description: "Convert PDF documents to editable Microsoft Word (.docx) files online for free. Fast, accurate, 100% secure & iLovePDF alternative.",
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "PDF to DOCX Converter",
    "url": "https://pkctechs.in/tools/pdf-to-docx",
    "operatingSystem": "All",
    "applicationCategory": "UtilitiesApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "Convert PDF documents to editable Microsoft Word (.docx) files online for free. Fast, accurate, 100% secure & iLovePDF alternative."
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
        "name": "PDF to DOCX Converter",
        "item": "https://pkctechs.in/tools/pdf-to-docx"
      }
    ]
  }
];

export default function PdfToDocxPage() {
  return (
    <div className="container mx-auto px-6 py-16 max-w-5xl relative z-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 gradient-text">
          PDF to DOCX Converter
        </h1>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto font-light leading-relaxed">
          Extract text and content from your PDF files into editable Microsoft Word documents.
        </p>
      </div>
      <PdfToDocxClient />
    </div>
  );
}
