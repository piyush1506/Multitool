import { Metadata } from "next";
import BackgroundRemoverClient from "@/components/tools/BackgroundRemoverClient";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ToolSeoSection } from "@/components/ToolSeoSection";
import { getFaqSchema, toolsSeoData } from "@/data/toolsSeoData";

export const metadata: Metadata = {
  title: "Background Remover Online | Free Transparent PNG Maker",
  description: "Remove background from images online for free. AI background remover for photos, product images, and logos with 100% privacy.",
  keywords: ["background remover","remove background","remove bg","transparent png maker","remove image background free","ilovepdf background remover","pkctechs"],
  alternates: {
    canonical: "https://pkctechs.in/tools/background-remover",
  },
  openGraph: {
    title: "Background Remover Online | Free Transparent PNG Maker",
    description: "Remove background from images online for free. AI background remover for photos, product images, and logos with 100% privacy.",
    url: "https://pkctechs.in/tools/background-remover",
    siteName: "Background Remover",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Background Remover Online | Free Transparent PNG Maker",
    description: "Remove background from images online for free. AI background remover for photos, product images, and logos with 100% privacy.",
  },
};

const faqSchema = getFaqSchema("background-remover");
const jsonLd: any[] = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Background Remover",
    "url": "https://pkctechs.in/tools/background-remover",
    "operatingSystem": "All",
    "applicationCategory": "MultimediaApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "Remove background from images online for free. AI background remover for photos, product images, and logos with 100% privacy."
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
        "name": "Background Remover",
        "item": "https://pkctechs.in/tools/background-remover"
      }
    ]
  }
];
if (faqSchema) {
  jsonLd.push(faqSchema);
}

export default function BackgroundRemoverPage() {
  return (
    <div className="container mx-auto px-6 py-16 max-w-5xl relative z-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Breadcrumbs items={[{ name: "Tools", href: "/#tools" }, { name: "Background Remover Online" }]} />
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 gradient-text">
          Background Remover
        </h1>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto font-light leading-relaxed">
          Remove solid or colored backgrounds from your images to make them transparent.
        </p>
      </div>
      <BackgroundRemoverClient />
      <ToolSeoSection toolSlug="background-remover" />
    </div>
  );
}
