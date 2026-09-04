import { Metadata } from "next";
import ImageCropperClient from "@/components/tools/ImageCropperClient";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ToolSeoSection } from "@/components/ToolSeoSection";
import { getFaqSchema, toolsSeoData } from "@/data/toolsSeoData";

export const metadata: Metadata = {
  title: "Image Cropper | Crop Images Online For Free",
  description: "Crop and frame your images online for free with an easy visual editor. Adjust aspect ratios for Instagram, Facebook, Twitter, and social media.",
  keywords: ["image cropper","crop image online","crop photo","image crop tool","free photo cropper","iloveimg crop","pkctechs"],
  alternates: {
    canonical: "https://pkctechs.in/tools/image-cropper",
  },
  openGraph: {
    title: "Image Cropper | Crop Images Online For Free",
    description: "Crop and frame your images online for free with an easy visual editor. Adjust aspect ratios for Instagram, Facebook, Twitter, and social media.",
    url: "https://pkctechs.in/tools/image-cropper",
    siteName: "Image Cropper",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Image Cropper | Crop Images Online For Free",
    description: "Crop and frame your images online for free with an easy visual editor. Adjust aspect ratios for Instagram, Facebook, Twitter, and social media.",
  },
};

const faqSchema = getFaqSchema("image-cropper");
const jsonLd: any[] = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Image Cropper",
    "url": "https://pkctechs.in/tools/image-cropper",
    "operatingSystem": "All",
    "applicationCategory": "MultimediaApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "Crop and frame your images online for free with an easy visual editor. Adjust aspect ratios for Instagram, Facebook, Twitter, and social media."
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
        "name": "Image Cropper",
        "item": "https://pkctechs.in/tools/image-cropper"
      }
    ]
  }
];
if (faqSchema) {
  jsonLd.push(faqSchema);
}

export default function ImageCropperPage() {
  return (
    <div className="container mx-auto px-6 py-16 max-w-5xl relative z-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Breadcrumbs items={[{ name: "Tools", href: "/#tools" }, { name: "Image Cropper" }]} />
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 gradient-text">
          Image Cropper
        </h1>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto font-light leading-relaxed">
          Visually crop and frame your images exactly how you want them.
        </p>
      </div>
      <ImageCropperClient />
      <ToolSeoSection toolSlug="image-cropper" />
    </div>
  );
}
