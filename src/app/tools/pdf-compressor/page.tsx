import { Metadata } from "next";
import PdfCompressorClient from "@/components/tools/PdfCompressorClient";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ToolSeoSection } from "@/components/ToolSeoSection";
import { getFaqSchema, toolsSeoData } from "@/data/toolsSeoData";

export const metadata: Metadata = {
  title: "PDF Compressor | Reduce PDF File Size Online Free",
  description: "Compress PDF files to smaller sizes online while maintaining optimal document quality. Free iLovePDF alternative for fast PDF compression.",
  keywords: ["pdf compressor","compress pdf","reduce pdf size","shrink pdf file","ilovepdf compress pdf","free pdf compressor","pkctechs"],
  alternates: {
    canonical: "https://pkctechs.in/tools/pdf-compressor",
  },
  openGraph: {
    title: "PDF Compressor | Reduce PDF File Size Online Free",
    description: "Compress PDF files to smaller sizes online while maintaining optimal document quality. Free iLovePDF alternative for fast PDF compression.",
    url: "https://pkctechs.in/tools/pdf-compressor",
    siteName: "PDF Compressor",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PDF Compressor | Reduce PDF File Size Online Free",
    description: "Compress PDF files to smaller sizes online while maintaining optimal document quality. Free iLovePDF alternative for fast PDF compression.",
  },
};

const faqSchema = getFaqSchema("pdf-compressor");
const jsonLd: any[] = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "PDF Compressor",
    "url": "https://pkctechs.in/tools/pdf-compressor",
    "operatingSystem": "All",
    "applicationCategory": "UtilitiesApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "Compress PDF files to smaller sizes online while maintaining optimal document quality. Free iLovePDF alternative for fast PDF compression."
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
        "name": "PDF Compressor",
        "item": "https://pkctechs.in/tools/pdf-compressor"
      }
    ]
  }
];
if (faqSchema) {
  jsonLd.push(faqSchema);
}

export default function PdfCompressorPage() {
  return (
    <div className="container mx-auto px-6 py-16 max-w-5xl relative z-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Breadcrumbs items={[{ name: "Tools", href: "/#tools" }, { name: "PDF Compressor" }]} />
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 gradient-text">
          PDF Compressor
        </h1>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto font-light leading-relaxed">
          Optimize and compress your PDF documents directly in your browser.
        </p>
      </div>
      <PdfCompressorClient />
      <ToolSeoSection toolSlug="pdf-compressor" />
    </div>
  );
}
