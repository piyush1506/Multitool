import { Metadata } from "next";
import ImageGeneratorClient from "@/components/tools/ImageGeneratorClient";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ToolSeoSection } from "@/components/ToolSeoSection";
import { getFaqSchema } from "@/data/toolsSeoData";

export const metadata: Metadata = {
  title: "Free AI Image Generator | Text to Image Online with Google AI",
  description:
    "Generate stunning, photorealistic and artistic images from text prompts online for free. Powered by Google AI Studio API with multiple aspect ratios and style presets.",
  keywords: [
    "ai image generator",
    "text to image",
    "free ai image generator",
    "google ai studio image",
    "gemini image generator",
    "online ai art generator",
    "generate pictures with ai",
    "pkctechs",
  ],
  alternates: {
    canonical: "https://pkctechs.in/tools/image-generator",
  },
  openGraph: {
    title: "Free AI Image Generator | Text to Image Online with Google AI",
    description:
      "Generate stunning, photorealistic and artistic images from text prompts online for free. Powered by Google AI Studio API.",
    url: "https://pkctechs.in/tools/image-generator",
    siteName: "AI Image Generator",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free AI Image Generator | Text to Image Online with Google AI",
    description:
      "Generate stunning, photorealistic and artistic images from text prompts online for free. Powered by Google AI Studio API.",
  },
};

const faqSchema = getFaqSchema("image-generator");
const jsonLd: any[] = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "AI Image Generator",
    "url": "https://pkctechs.in/tools/image-generator",
    "operatingSystem": "All",
    "applicationCategory": "DesignApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
    },
    "description":
      "Generate high-resolution images from natural language descriptions using advanced Google AI Studio generative models.",
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://pkctechs.in",
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Tools",
        "item": "https://pkctechs.in/#tools",
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "AI Image Generator",
        "item": "https://pkctechs.in/tools/image-generator",
      },
    ],
  },
];

if (faqSchema) {
  jsonLd.push(faqSchema);
}

export default function ImageGeneratorPage() {
  return (
    <div className="container mx-auto px-6 py-16 max-w-6xl relative z-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Breadcrumbs
        items={[{ name: "Tools", href: "/#tools" }, { name: "AI Image Generator" }]}
      />
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400 mb-4 shadow-xs">
          <span>✨ Google AI Studio API Powered</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 gradient-text">
          AI Image Generator
        </h1>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto font-light leading-relaxed">
          Transform any idea into high-resolution visuals in seconds using state-of-the-art AI diffusion & multimodal intelligence.
        </p>
      </div>

      <ImageGeneratorClient />

      <ToolSeoSection toolSlug="image-generator" />
    </div>
  );
}
