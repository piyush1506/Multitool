import { Metadata } from "next";
import QrGeneratorClient from "@/components/tools/QrGeneratorClient";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ToolSeoSection } from "@/components/ToolSeoSection";
import { getFaqSchema, toolsSeoData } from "@/data/toolsSeoData";

export const metadata: Metadata = {
  title: "QR Code Generator Online | Free Custom QR Code Maker",
  description: "Create customized QR codes for URLs, text, Wi-Fi, and emails. Download high-resolution PNG & SVG QR codes for free.",
  keywords: ["qr code generator","custom qr maker","free qr code creator","qr code png download","wifi qr generator","pkctechs"],
  alternates: {
    canonical: "https://pkctechs.in/tools/qr-generator",
  },
  openGraph: {
    title: "QR Code Generator Online | Free Custom QR Code Maker",
    description: "Create customized QR codes for URLs, text, Wi-Fi, and emails. Download high-resolution PNG & SVG QR codes for free.",
    url: "https://pkctechs.in/tools/qr-generator",
    siteName: "QR Code Generator",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "QR Code Generator Online | Free Custom QR Code Maker",
    description: "Create customized QR codes for URLs, text, Wi-Fi, and emails. Download high-resolution PNG & SVG QR codes for free.",
  },
};

const faqSchema = getFaqSchema("qr-generator");
const jsonLd: any[] = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "QR Code Generator",
    "url": "https://pkctechs.in/tools/qr-generator",
    "operatingSystem": "All",
    "applicationCategory": "UtilitiesApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "Create customized QR codes for URLs, text, Wi-Fi, and emails. Download high-resolution PNG & SVG QR codes for free."
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
        "name": "QR Code Generator",
        "item": "https://pkctechs.in/tools/qr-generator"
      }
    ]
  }
];
if (faqSchema) {
  jsonLd.push(faqSchema);
}

export default function QrGeneratorPage() {
  return (
    <div className="container mx-auto px-6 py-16 max-w-5xl relative z-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Breadcrumbs items={[{ name: "Tools", href: "/#tools" }, { name: "QR Code Generator Online" }]} />
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 gradient-text">
          QR Code Generator
        </h1>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto font-light leading-relaxed">
          Create high-resolution custom QR codes for web links, text, and contact information.
        </p>
      </div>
      <QrGeneratorClient />
      <ToolSeoSection toolSlug="qr-generator" />
    </div>
  );
}
