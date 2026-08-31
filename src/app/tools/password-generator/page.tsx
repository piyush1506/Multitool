import { Metadata } from "next";
import PasswordGeneratorClient from "@/components/tools/PasswordGeneratorClient";

export const metadata: Metadata = {
  title: "Password & Token Generator | Secure Random Password Tool",
  description: "Generate strong, secure, randomized passwords and API tokens online. Custom length, special characters, numbers, and symbols.",
  keywords: ["password generator","random password maker","secure token generator","strong password creator","api key generator","pkctechs"],
  alternates: {
    canonical: "https://pkctechs.in/tools/password-generator",
  },
  openGraph: {
    title: "Password & Token Generator | Secure Random Password Tool",
    description: "Generate strong, secure, randomized passwords and API tokens online. Custom length, special characters, numbers, and symbols.",
    url: "https://pkctechs.in/tools/password-generator",
    siteName: "Password & Token Generator",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Password & Token Generator | Secure Random Password Tool",
    description: "Generate strong, secure, randomized passwords and API tokens online. Custom length, special characters, numbers, and symbols.",
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Password & Token Generator",
    "url": "https://pkctechs.in/tools/password-generator",
    "operatingSystem": "All",
    "applicationCategory": "SecurityApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "Generate strong, secure, randomized passwords and API tokens online. Custom length, special characters, numbers, and symbols."
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
        "name": "Password & Token Generator",
        "item": "https://pkctechs.in/tools/password-generator"
      }
    ]
  }
];

export default function PasswordGeneratorPage() {
  return (
    <div className="container mx-auto px-6 py-16 max-w-5xl relative z-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 gradient-text">
          Password & Token Generator
        </h1>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto font-light leading-relaxed">
          Create strong, cryptographically secure passwords and random tokens locally in your browser.
        </p>
      </div>
      <PasswordGeneratorClient />
    </div>
  );
}
