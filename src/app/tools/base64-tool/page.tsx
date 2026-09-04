import { Metadata } from "next";
import Base64Client from "@/components/tools/Base64Client";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ToolSeoSection } from "@/components/ToolSeoSection";
import { getFaqSchema, toolsSeoData } from "@/data/toolsSeoData";

export const metadata: Metadata = {
  title: "Base64 Encoder & Decoder | Convert Text & Images to Base64 Online",
  description: "Encode text and files into Base64 format or decode Base64 strings instantly online. Free, secure, and browser-based developer utility.",
  keywords: ["base64 encoder","base64 decoder","base64 convert","encode to base64","decode base64 online","base64 generator","pkctechs"],
  alternates: {
    canonical: "https://pkctechs.in/tools/base64-tool",
  },
  openGraph: {
    title: "Base64 Encoder & Decoder | Convert Text & Images to Base64 Online",
    description: "Encode text and files into Base64 format or decode Base64 strings instantly online. Free, secure, and browser-based developer utility.",
    url: "https://pkctechs.in/tools/base64-tool",
    siteName: "Base64 Encoder & Decoder",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Base64 Encoder & Decoder | Convert Text & Images to Base64 Online",
    description: "Encode text and files into Base64 format or decode Base64 strings instantly online. Free, secure, and browser-based developer utility.",
  },
};

const faqSchema = getFaqSchema("base64-tool");
const jsonLd: any[] = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Base64 Encoder & Decoder",
    "url": "https://pkctechs.in/tools/base64-tool",
    "operatingSystem": "All",
    "applicationCategory": "UtilitiesApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "Encode text and files into Base64 format or decode Base64 strings instantly online. Free, secure, and browser-based developer utility."
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
        "name": "Base64 Encoder & Decoder",
        "item": "https://pkctechs.in/tools/base64-tool"
      }
    ]
  }
];
if (faqSchema) {
  jsonLd.push(faqSchema);
}

export default function Base64Page() {
  return (
    <div className="container mx-auto px-6 py-16 max-w-5xl relative z-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Breadcrumbs items={[{ name: "Tools", href: "/#tools" }, { name: "Base64 Encoder & Decoder" }]} />
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 gradient-text">
          Base64 Encoder & Decoder
        </h1>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto font-light leading-relaxed">
          Encode plain text into Base64 format or decode Base64 strings back to text.
        </p>
      </div>
      <Base64Client />
      <ToolSeoSection toolSlug="base64-tool" />
    </div>
  );
}
