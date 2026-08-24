import { Metadata } from "next";
import QrGeneratorClient from "@/components/tools/QrGeneratorClient";

export const metadata: Metadata = {
  title: "QR Code Generator Online | Free Custom QR Maker",
  description: "Generate custom QR codes for URLs, text, and WiFi instantly. Download high-res PNG QR codes 100% free.",
  keywords: ["qr code generator", "create qr code online", "free qr maker", "custom qr code generator", "pkctechs"],
  alternates: {
    canonical: "https://pkctechs.in/tools/qr-generator",
  },
  openGraph: {
    title: "Free Custom QR Code Generator",
    description: "Generate customizable QR codes for web links, text, and contact information.",
    url: "https://pkctechs.in/tools/qr-generator",
    siteName: "QR Code Generator Online",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "QR Code Generator | pkctechs",
    description: "Generate high-resolution custom QR codes for free.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "QR Code Generator Online",
  "operatingSystem": "All",
  "applicationCategory": "UtilitiesApplication",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "Generate custom QR codes for URLs, text, and WiFi info."
};

export default function QrGeneratorPage() {
  return (
    <div className="container mx-auto px-6 py-16 max-w-5xl relative z-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 gradient-text">
          QR Code Generator
        </h1>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto font-light leading-relaxed">
          Create high-resolution custom QR codes for web links, text, and contact information.
        </p>
      </div>
      <QrGeneratorClient />
    </div>
  );
}
