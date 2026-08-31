import { Metadata } from "next";
import ImageCompressorClient from "@/components/tools/ImageCompressorClient";

export const metadata: Metadata = {
  title: "Image Compressor | Reduce Image File Size Online Free",
  description: "Compress JPG, PNG, and WEBP images online without visible quality loss. Reduce file sizes by up to 90% instantly in your browser.",
  keywords: ["image compressor","compress image","reduce image size","compress jpg","compress png online","iloveimg compressor alternative","pkctechs"],
  alternates: {
    canonical: "https://pkctechs.in/tools/image-compressor",
  },
  openGraph: {
    title: "Image Compressor | Reduce Image File Size Online Free",
    description: "Compress JPG, PNG, and WEBP images online without visible quality loss. Reduce file sizes by up to 90% instantly in your browser.",
    url: "https://pkctechs.in/tools/image-compressor",
    siteName: "Image Compressor",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Image Compressor | Reduce Image File Size Online Free",
    description: "Compress JPG, PNG, and WEBP images online without visible quality loss. Reduce file sizes by up to 90% instantly in your browser.",
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Image Compressor",
    "url": "https://pkctechs.in/tools/image-compressor",
    "operatingSystem": "All",
    "applicationCategory": "MultimediaApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "Compress JPG, PNG, and WEBP images online without visible quality loss. Reduce file sizes by up to 90% instantly in your browser."
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
        "name": "Image Compressor",
        "item": "https://pkctechs.in/tools/image-compressor"
      }
    ]
  }
];

export default function ImageCompressorPage() {
  return (
    <div className="container mx-auto px-6 py-16 max-w-5xl relative z-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 gradient-text">
          Image Compressor
        </h1>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto font-light leading-relaxed">
          Optimize your images for the web. Compress files quickly in your browser without losing quality.
        </p>
      </div>
      <ImageCompressorClient />
    </div>
  );
}
