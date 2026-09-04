import { Metadata } from "next";
import SvgToPngClient from "@/components/tools/SvgToPngClient";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ToolSeoSection } from "@/components/ToolSeoSection";
import { getFaqSchema, toolsSeoData } from "@/data/toolsSeoData";

export const metadata: Metadata = {
  title: "SVG to PNG Converter | Convert SVG to High-Res PNG",
  description: "Convert SVG vector graphics to raster PNG images with custom resolution scaling. Free, browser-based, instant rendering.",
  keywords: ["svg to png","convert svg to png","vector to png","high res svg to png","free svg converter","pkctechs"],
  alternates: {
    canonical: "https://pkctechs.in/tools/svg-to-png",
  },
  openGraph: {
    title: "SVG to PNG Converter | Convert SVG to High-Res PNG",
    description: "Convert SVG vector graphics to raster PNG images with custom resolution scaling. Free, browser-based, instant rendering.",
    url: "https://pkctechs.in/tools/svg-to-png",
    siteName: "SVG to PNG Converter",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SVG to PNG Converter | Convert SVG to High-Res PNG",
    description: "Convert SVG vector graphics to raster PNG images with custom resolution scaling. Free, browser-based, instant rendering.",
  },
};

const faqSchema = getFaqSchema("svg-to-png");
const jsonLd: any[] = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "SVG to PNG Converter",
    "url": "https://pkctechs.in/tools/svg-to-png",
    "operatingSystem": "All",
    "applicationCategory": "MultimediaApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "Convert SVG vector graphics to raster PNG images with custom resolution scaling. Free, browser-based, instant rendering."
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
        "name": "SVG to PNG Converter",
        "item": "https://pkctechs.in/tools/svg-to-png"
      }
    ]
  }
];
if (faqSchema) {
  jsonLd.push(faqSchema);
}

export default function SvgToPngPage() {
  return (
    <div className="container mx-auto px-6 py-16 max-w-5xl relative z-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Breadcrumbs items={[{ name: "Tools", href: "/#tools" }, { name: "SVG to PNG Converter" }]} />
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 gradient-text">
          SVG to PNG Converter
        </h1>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto font-light leading-relaxed">
          Convert vector SVG markup or graphics directly into crisp, high-resolution PNG images.
        </p>
      </div>
      <SvgToPngClient />
      <ToolSeoSection toolSlug="svg-to-png" />
    </div>
  );
}
