import { Metadata } from "next";
import ImageToPdfClient from "@/components/tools/ImageToPdfClient";

export const metadata: Metadata = {
  title: "Image to PDF Converter | Convert JPG & PNG to PDF Online",
  description: "Convert JPG, PNG, and WEBP images into a single clean PDF document. Free online tool with customized page sizing and orientation.",
  keywords: ["image to pdf","jpg to pdf","png to pdf","convert photo to pdf","combine images to pdf","ilovepdf image to pdf","pkctechs"],
  alternates: {
    canonical: "https://pkctechs.in/tools/image-to-pdf",
  },
  openGraph: {
    title: "Image to PDF Converter | Convert JPG & PNG to PDF Online",
    description: "Convert JPG, PNG, and WEBP images into a single clean PDF document. Free online tool with customized page sizing and orientation.",
    url: "https://pkctechs.in/tools/image-to-pdf",
    siteName: "Image to PDF Converter",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Image to PDF Converter | Convert JPG & PNG to PDF Online",
    description: "Convert JPG, PNG, and WEBP images into a single clean PDF document. Free online tool with customized page sizing and orientation.",
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Image to PDF Converter",
    "url": "https://pkctechs.in/tools/image-to-pdf",
    "operatingSystem": "All",
    "applicationCategory": "UtilitiesApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "Convert JPG, PNG, and WEBP images into a single clean PDF document. Free online tool with customized page sizing and orientation."
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
        "name": "Image to PDF Converter",
        "item": "https://pkctechs.in/tools/image-to-pdf"
      }
    ]
  }
];

export default function ImageToPdfPage() {
  return (
    <div className="container mx-auto px-6 py-16 max-w-5xl relative z-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 gradient-text">
          Image to PDF
        </h1>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto font-light leading-relaxed">
          Convert JPG, PNG, and WebP images to a clean PDF document.
        </p>
      </div>
      <ImageToPdfClient />
    </div>
  );
}
