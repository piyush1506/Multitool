import { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import YouTubeThumbnailDownloaderClient from "@/components/tools/YouTubeThumbnailDownloaderClient";
import { ToolSeoSection } from "@/components/ToolSeoSection";
import { getFaqSchema } from "@/data/toolsSeoData";

export const metadata: Metadata = {
  title:
    "Free YouTube Thumbnail Downloader | Save HD 1080p & 4K Cover Images",
  description:
    "Download YouTube video thumbnails in all available resolutions: Max Resolution (1280x720), High Quality, Medium, and Default. Instant client-side extractor with no ads or signup.",
  keywords: [
    "youtube thumbnail downloader",
    "download youtube thumbnail",
    "youtube thumbnail grabber",
    "save youtube thumbnail",
    "youtube cover image download",
    "youtube thumbnail hd",
    "get youtube thumbnail",
    "youtube image downloader",
    "video thumbnail extractor",
    "pkctechs",
  ],
  alternates: {
    canonical: "https://pkctechs.in/tools/youtube-thumbnail-downloader",
  },
  openGraph: {
    title: "Free YouTube Thumbnail Downloader | Save HD 1080p Cover Images",
    description:
      "Download YouTube video thumbnails in all available resolutions instantly. Fast, free, and no signup required.",
    url: "https://pkctechs.in/tools/youtube-thumbnail-downloader",
    siteName: "YouTube Thumbnail Downloader",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free YouTube Thumbnail Downloader | HD Quality",
    description:
      "Download YouTube video thumbnails in all available resolutions instantly. Fast, free, and no signup.",
  },
};

const faqSchema = getFaqSchema("youtube-thumbnail-downloader");
const jsonLd: any[] = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "YouTube Thumbnail Downloader",
    "url": "https://pkctechs.in/tools/youtube-thumbnail-downloader",
    "operatingSystem": "All",
    "applicationCategory": "MultimediaApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
    },
    "description":
      "Free online YouTube thumbnail downloader. Grab high-definition video cover images in Max Resolution (1280x720), High Quality, and Medium sizes instantly.",
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
        "name": "YouTube Thumbnail Downloader",
        "item": "https://pkctechs.in/tools/youtube-thumbnail-downloader",
      },
    ],
  },
];

if (faqSchema) {
  jsonLd.push(faqSchema);
}

export default function YouTubeThumbnailDownloaderPage() {
  return (
    <div className="container mx-auto px-6 py-16 max-w-5xl relative z-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Breadcrumbs
        items={[
          { name: "Tools", href: "/#tools" },
          { name: "YouTube Thumbnail Downloader" },
        ]}
      />
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-pink-500/10 via-fuchsia-500/10 to-purple-500/10 border border-pink-500/20 text-pink-600 dark:text-pink-400 mb-4 shadow-xs">
          <span>🖼️ Instant Cover Art Extractor</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 gradient-text">
          YouTube Thumbnail Downloader
        </h1>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto font-light leading-relaxed">
          Extract and download high-quality thumbnails from any YouTube video in
          multiple resolutions with a single click.
        </p>
      </div>

      <YouTubeThumbnailDownloaderClient />
      <ToolSeoSection toolSlug="youtube-thumbnail-downloader" />
    </div>
  );
}
