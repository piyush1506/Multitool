import { Metadata } from "next";
import BackgroundRemoverClient from "@/components/tools/BackgroundRemoverClient";

export const metadata: Metadata = {
  title: "Background Remover Online | Free Transparent PNG Maker",
  description: "Remove background from images online instantly. Create transparent PNG backgrounds 100% free and private in your browser.",
  keywords: ["background remover", "remove background from image", "transparent png maker", "free background eraser", "pkctechs"],
  alternates: {
    canonical: "https://pkctechs.in/tools/background-remover",
  },
  openGraph: {
    title: "Free Background Remover Online",
    description: "Remove solid or color backgrounds from photos and graphics instantly.",
    url: "https://pkctechs.in/tools/background-remover",
    siteName: "pkctechs",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Background Remover | pkctechs",
    description: "Make image backgrounds transparent online for free.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Background Remover Online",
  "operatingSystem": "All",
  "applicationCategory": "GraphicsApplication",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "Remove background from images online instantly and export transparent PNGs."
};

export default function BackgroundRemoverPage() {
  return (
    <div className="container mx-auto px-6 py-16 max-w-5xl relative z-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 gradient-text">
          Background Remover
        </h1>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto font-light leading-relaxed">
          Remove solid or colored backgrounds from your images to make them transparent.
        </p>
      </div>
      <BackgroundRemoverClient />
    </div>
  );
}
