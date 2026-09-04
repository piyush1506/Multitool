import { Metadata } from "next";
import ColorPickerClient from "@/components/tools/ColorPickerClient";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ToolSeoSection } from "@/components/ToolSeoSection";
import { getFaqSchema, toolsSeoData } from "@/data/toolsSeoData";

export const metadata: Metadata = {
  title: "Color Picker & Palette Generator | HEX, RGB, HSL Converter",
  description: "Pick colors, convert formats (HEX, RGB, HSL), and generate stunning color palettes online for free. Perfect for web designers and developers.",
  keywords: ["color picker","hex to rgb","rgb to hex","color palette generator","color converter","hex color picker","pkctechs"],
  alternates: {
    canonical: "https://pkctechs.in/tools/color-picker",
  },
  openGraph: {
    title: "Color Picker & Palette Generator | HEX, RGB, HSL Converter",
    description: "Pick colors, convert formats (HEX, RGB, HSL), and generate stunning color palettes online for free. Perfect for web designers and developers.",
    url: "https://pkctechs.in/tools/color-picker",
    siteName: "Color Picker & Palette Generator",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Color Picker & Palette Generator | HEX, RGB, HSL Converter",
    description: "Pick colors, convert formats (HEX, RGB, HSL), and generate stunning color palettes online for free. Perfect for web designers and developers.",
  },
};

const faqSchema = getFaqSchema("color-picker");
const jsonLd: any[] = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Color Picker & Palette Generator",
    "url": "https://pkctechs.in/tools/color-picker",
    "operatingSystem": "All",
    "applicationCategory": "DesignApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "Pick colors, convert formats (HEX, RGB, HSL), and generate stunning color palettes online for free. Perfect for web designers and developers."
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
        "name": "Color Picker & Palette Generator",
        "item": "https://pkctechs.in/tools/color-picker"
      }
    ]
  }
];
if (faqSchema) {
  jsonLd.push(faqSchema);
}

export default function ColorPickerPage() {
  return (
    <div className="container mx-auto px-6 py-16 max-w-5xl relative z-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Breadcrumbs items={[{ name: "Tools", href: "/#tools" }, { name: "Color Picker & Palette Generator" }]} />
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 gradient-text">
          Color Picker & Palette
        </h1>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto font-light leading-relaxed">
          Select custom colors and convert formats instantly between HEX, RGB, and HSL.
        </p>
      </div>
      <ColorPickerClient />
      <ToolSeoSection toolSlug="color-picker" />
    </div>
  );
}
