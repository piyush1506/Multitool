import { Metadata } from "next";
import ImageConverterClient from "@/components/tools/ImageConverterClient";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ToolSeoSection } from "@/components/ToolSeoSection";
import { getFaqSchema, toolsSeoData } from "@/data/toolsSeoData";

export const metadata: Metadata = {
  title: "Image Converter | Convert PNG, JPG, WEBP & SVG Online",
  description: "Convert images between JPG, PNG, WEBP, and SVG formats instantly. 100% free, fast, and processed locally inside your browser.",
  keywords: ["image converter","convert png to jpg","jpg to png","convert webp to jpg","png to webp converter","free image converter","pkctechs"],
  alternates: {
    canonical: "https://pkctechs.in/tools/image-converter",
  },
  openGraph: {
    title: "Image Converter | Convert PNG, JPG, WEBP & SVG Online",
    description: "Convert images between JPG, PNG, WEBP, and SVG formats instantly. 100% free, fast, and processed locally inside your browser.",
    url: "https://pkctechs.in/tools/image-converter",
    siteName: "Image Converter",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Image Converter | Convert PNG, JPG, WEBP & SVG Online",
    description: "Convert images between JPG, PNG, WEBP, and SVG formats instantly. 100% free, fast, and processed locally inside your browser.",
  },
};

const faqSchema = getFaqSchema("image-converter");
const jsonLd: any[] = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Image Converter",
    "url": "https://pkctechs.in/tools/image-converter",
    "operatingSystem": "All",
    "applicationCategory": "MultimediaApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "Convert images between JPG, PNG, WEBP, and SVG formats instantly. 100% free, fast, and processed locally inside your browser."
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
        "name": "Image Converter",
        "item": "https://pkctechs.in/tools/image-converter"
      }
    ]
  }
];
if (faqSchema) {
  jsonLd.push(faqSchema);
}

export default function ImageConverterPage() {
  return (
    <div className="container mx-auto px-6 py-16 max-w-5xl relative z-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Breadcrumbs items={[{ name: "Tools", href: "/#tools" }, { name: "Image Converter" }]} />
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 gradient-text">
          Image Converter
        </h1>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto font-light leading-relaxed">
          Seamlessly convert between image formats directly in your browser with zero quality loss.
        </p>
      </div>
      <ImageConverterClient />
      <ToolSeoSection toolSlug="image-converter" />
    </div>
  );
}
