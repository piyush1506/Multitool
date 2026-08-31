import { Metadata } from "next";
import DocxToPdfClient from "@/components/tools/DocxToPdfClient";

export const metadata: Metadata = {
  title: "DOCX to PDF Converter | Convert Word to PDF Online Free",
  description: "Convert Microsoft Word (.docx, .doc) files to PDF format online for free. Fast, accurate layout retention, 100% secure iLovePDF alternative.",
  keywords: ["docx to pdf","word to pdf","convert word to pdf online","ilovepdf word to pdf","doc to pdf free","pkctechs"],
  alternates: {
    canonical: "https://pkctechs.in/tools/docx-to-pdf",
  },
  openGraph: {
    title: "DOCX to PDF Converter | Convert Word to PDF Online Free",
    description: "Convert Microsoft Word (.docx, .doc) files to PDF format online for free. Fast, accurate layout retention, 100% secure iLovePDF alternative.",
    url: "https://pkctechs.in/tools/docx-to-pdf",
    siteName: "DOCX to PDF Converter",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DOCX to PDF Converter | Convert Word to PDF Online Free",
    description: "Convert Microsoft Word (.docx, .doc) files to PDF format online for free. Fast, accurate layout retention, 100% secure iLovePDF alternative.",
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "DOCX to PDF Converter",
    "url": "https://pkctechs.in/tools/docx-to-pdf",
    "operatingSystem": "All",
    "applicationCategory": "UtilitiesApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "Convert Microsoft Word (.docx, .doc) files to PDF format online for free. Fast, accurate layout retention, 100% secure iLovePDF alternative."
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
        "name": "DOCX to PDF Converter",
        "item": "https://pkctechs.in/tools/docx-to-pdf"
      }
    ]
  }
];

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
