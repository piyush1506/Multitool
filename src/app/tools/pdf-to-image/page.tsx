import { Metadata } from "next";
import PdfToImageClient from "@/components/tools/PdfToImageClient";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ToolSeoSection } from "@/components/ToolSeoSection";
import { getFaqSchema, toolsSeoData } from "@/data/toolsSeoData";

export const metadata: Metadata = {
  title: "PDF to Image Converter | Convert PDF Pages to JPG & PNG",
  description: "Extract pages from PDF documents and save them as high-quality JPG or PNG images online for free. No file limit, 100% secure.",
  keywords: ["pdf to image","pdf to jpg","pdf to png","extract images from pdf","convert pdf pages to images","ilovepdf pdf to jpg","pkctechs"],
  alternates: {
    canonical: "https://pkctechs.in/tools/pdf-to-image",
  },
  openGraph: {
    title: "PDF to Image Converter | Convert PDF Pages to JPG & PNG",
    description: "Extract pages from PDF documents and save them as high-quality JPG or PNG images online for free. No file limit, 100% secure.",
    url: "https://pkctechs.in/tools/pdf-to-image",
    siteName: "PDF to Image Converter",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PDF to Image Converter | Convert PDF Pages to JPG & PNG",
    description: "Extract pages from PDF documents and save them as high-quality JPG or PNG images online for free. No file limit, 100% secure.",
  },
};

const faqSchema = getFaqSchema("pdf-to-image");
const jsonLd: any[] = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "PDF to Image Converter",
    "url": "https://pkctechs.in/tools/pdf-to-image",
    "operatingSystem": "All",
    "applicationCategory": "UtilitiesApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "Extract pages from PDF documents and save them as high-quality JPG or PNG images online for free. No file limit, 100% secure."
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
        "name": "PDF to Image Converter",
        "item": "https://pkctechs.in/tools/pdf-to-image"
      }
    ]
  }
];
if (faqSchema) {
  jsonLd.push(faqSchema);
}

export default function PdfToImagePage() {
  return (
    <div className="container mx-auto px-6 py-16 max-w-5xl relative z-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Breadcrumbs items={[{ name: "Tools", href: "/#tools" }, { name: "PDF to Image Converter" }]} />
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 gradient-text">
          PDF to Image
        </h1>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto font-light leading-relaxed">
          Extract and convert pages from your PDF documents into high-quality images.
        </p>
      </div>
      <PdfToImageClient />
      <ToolSeoSection toolSlug="pdf-to-image" />
    </div>
  );
}
