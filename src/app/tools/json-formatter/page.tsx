import { Metadata } from "next";
import JsonFormatterClient from "@/components/tools/JsonFormatterClient";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ToolSeoSection } from "@/components/ToolSeoSection";
import { getFaqSchema, toolsSeoData } from "@/data/toolsSeoData";

export const metadata: Metadata = {
  title: "JSON Formatter & Validator | Beautify and Minify JSON",
  description: "Format, validate, beautify, and minify JSON data online. Easily inspect JSON trees, catch syntax errors, and clean up code instantly.",
  keywords: ["json formatter","json validator","beautify json","minify json","json viewer online","json prettier","pkctechs"],
  alternates: {
    canonical: "https://pkctechs.in/tools/json-formatter",
  },
  openGraph: {
    title: "JSON Formatter & Validator | Beautify and Minify JSON",
    description: "Format, validate, beautify, and minify JSON data online. Easily inspect JSON trees, catch syntax errors, and clean up code instantly.",
    url: "https://pkctechs.in/tools/json-formatter",
    siteName: "JSON Formatter & Validator",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "JSON Formatter & Validator | Beautify and Minify JSON",
    description: "Format, validate, beautify, and minify JSON data online. Easily inspect JSON trees, catch syntax errors, and clean up code instantly.",
  },
};

const faqSchema = getFaqSchema("json-formatter");
const jsonLd: any[] = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "JSON Formatter & Validator",
    "url": "https://pkctechs.in/tools/json-formatter",
    "operatingSystem": "All",
    "applicationCategory": "UtilitiesApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "Format, validate, beautify, and minify JSON data online. Easily inspect JSON trees, catch syntax errors, and clean up code instantly."
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
        "name": "JSON Formatter & Validator",
        "item": "https://pkctechs.in/tools/json-formatter"
      }
    ]
  }
];
if (faqSchema) {
  jsonLd.push(faqSchema);
}

export default function JsonFormatterPage() {
  return (
    <div className="container mx-auto px-6 py-16 max-w-5xl relative z-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Breadcrumbs items={[{ name: "Tools", href: "/#tools" }, { name: "JSON Formatter & Validator" }]} />
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 gradient-text">
          JSON Formatter & Validator
        </h1>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto font-light leading-relaxed">
          Beautify, minify, and validate JSON data structures instantly in your browser.
        </p>
      </div>
      <JsonFormatterClient />
      <ToolSeoSection toolSlug="json-formatter" />
    </div>
  );
}
