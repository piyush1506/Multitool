import { Metadata } from "next";
import MergePdfClient from "@/components/tools/MergePdfClient";

export const metadata: Metadata = {
  title: "Merge PDF | Combine Multiple PDF Files Online Free",
  description: "Merge multiple PDF documents into one unified file online for free. Reorder pages, instant merging, 100% private iLovePDF alternative.",
  keywords: ["merge pdf","combine pdf","join pdf files","merge pdf online free","ilovepdf merge","pdf joiner","pkctechs"],
  alternates: {
    canonical: "https://pkctechs.in/tools/merge-pdf",
  },
  openGraph: {
    title: "Merge PDF | Combine Multiple PDF Files Online Free",
    description: "Merge multiple PDF documents into one unified file online for free. Reorder pages, instant merging, 100% private iLovePDF alternative.",
    url: "https://pkctechs.in/tools/merge-pdf",
    siteName: "Merge PDF",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Merge PDF | Combine Multiple PDF Files Online Free",
    description: "Merge multiple PDF documents into one unified file online for free. Reorder pages, instant merging, 100% private iLovePDF alternative.",
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Merge PDF",
    "url": "https://pkctechs.in/tools/merge-pdf",
    "operatingSystem": "All",
    "applicationCategory": "UtilitiesApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "Merge multiple PDF documents into one unified file online for free. Reorder pages, instant merging, 100% private iLovePDF alternative."
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
        "name": "Merge PDF",
        "item": "https://pkctechs.in/tools/merge-pdf"
      }
    ]
  }
];

export default function MergePdfPage() {
  return (
    <div className="container mx-auto px-6 py-16 max-w-5xl relative z-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 gradient-text">
          Merge PDF
        </h1>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto font-light leading-relaxed">
          Combine multiple PDF documents into a single organized file in seconds.
        </p>
      </div>
      <MergePdfClient />
    </div>
  );
}
