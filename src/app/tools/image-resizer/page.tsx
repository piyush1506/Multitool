import { Metadata } from "next";
import ImageResizerClient from "@/components/tools/ImageResizerClient";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ToolSeoSection } from "@/components/ToolSeoSection";
import { getFaqSchema, toolsSeoData } from "@/data/toolsSeoData";

export const metadata: Metadata = {
  title: "Image Resizer | Resize Image Dimensions Online For Free",
  description: "Resize image dimensions in pixels or percentages online for free. Batch resize JPG, PNG, and WEBP images quickly without losing quality.",
  keywords: ["image resizer","resize image","change image dimensions","resize photo online","free image resizer","resize px online","pkctechs"],
  alternates: {
    canonical: "https://pkctechs.in/tools/image-resizer",
  },
  openGraph: {
    title: "Image Resizer | Resize Image Dimensions Online For Free",
    description: "Resize image dimensions in pixels or percentages online for free. Batch resize JPG, PNG, and WEBP images quickly without losing quality.",
    url: "https://pkctechs.in/tools/image-resizer",
    siteName: "Image Resizer",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Image Resizer | Resize Image Dimensions Online For Free",
    description: "Resize image dimensions in pixels or percentages online for free. Batch resize JPG, PNG, and WEBP images quickly without losing quality.",
  },
};

const faqSchema = getFaqSchema("image-resizer");
const jsonLd: any[] = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Image Resizer",
    "url": "https://pkctechs.in/tools/image-resizer",
    "operatingSystem": "All",
    "applicationCategory": "MultimediaApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "Resize image dimensions in pixels or percentages online for free. Batch resize JPG, PNG, and WEBP images quickly without losing quality."
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
        "name": "Image Resizer",
        "item": "https://pkctechs.in/tools/image-resizer"
      }
    ]
  }
];
if (faqSchema) {
  jsonLd.push(faqSchema);
}

export default function ImageResizerPage() {
  return (
    <div className="container mx-auto px-6 py-16 max-w-5xl relative z-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Breadcrumbs items={[{ name: "Tools", href: "/#tools" }, { name: "Image Resizer" }]} />
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 gradient-text">
          Image Resizer
        </h1>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto font-light leading-relaxed">
          Change the width and height of your images while maintaining quality.
        </p>
      </div>
      <ImageResizerClient />
      <ToolSeoSection toolSlug="image-resizer" />
    </div>
  );
}
