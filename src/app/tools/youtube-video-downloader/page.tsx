import { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import YouTubeVideoDownloaderClient from "@/components/tools/YouTubeVideoDownloaderClient";
import { ToolSeoSection } from "@/components/ToolSeoSection";
import { getFaqSchema } from "@/data/toolsSeoData";

export const metadata: Metadata = {
  title: "Free YouTube Video Downloader | Download MP4 1080p 720p HD",
  description:
    "Download YouTube videos in MP4 format for free. Choose from multiple quality options including 1080p, 720p HD, and 480p. Fast direct streaming, zero ads, no signup.",
  keywords: [
    "youtube video downloader",
    "download youtube video",
    "youtube to mp4",
    "youtube mp4 download",
    "download video from youtube",
    "free youtube downloader",
    "hd video downloader",
    "youtube video saver",
    "online video downloader",
    "pkctechs",
  ],
  alternates: {
    canonical: "https://pkctechs.in/tools/youtube-video-downloader",
  },
  openGraph: {
    title: "Free YouTube Video Downloader | Download MP4 1080p 720p HD",
    description:
      "Download YouTube videos in high quality MP4 format. Multiple resolutions, fast streaming downloads, no signup required.",
    url: "https://pkctechs.in/tools/youtube-video-downloader",
    siteName: "YouTube Video Downloader",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free YouTube Video Downloader | Download MP4 HD",
    description:
      "Download YouTube videos in high quality MP4 format. Multiple resolutions, fast streaming downloads, no signup.",
  },
};

const faqSchema = getFaqSchema("youtube-video-downloader");
const jsonLd: any[] = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "YouTube Video Downloader",
    "url": "https://pkctechs.in/tools/youtube-video-downloader",
    "operatingSystem": "All",
    "applicationCategory": "MultimediaApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
    },
    "description":
      "Free online YouTube video downloader. Stream and save MP4 videos in 1080p, 720p, and 480p resolutions instantly.",
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
        "name": "YouTube Video Downloader",
        "item": "https://pkctechs.in/tools/youtube-video-downloader",
      },
    ],
  },
];

if (faqSchema) {
  jsonLd.push(faqSchema);
}

export default function YouTubeVideoDownloaderPage() {
  return (
    <div className="container mx-auto px-6 py-16 max-w-5xl relative z-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Breadcrumbs
        items={[
          { name: "Tools", href: "/#tools" },
          { name: "YouTube Video Downloader" },
        ]}
      />
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-red-500/10 via-rose-500/10 to-pink-500/10 border border-red-500/20 text-red-600 dark:text-red-400 mb-4 shadow-xs">
          <span>▶ High-Speed MP4 Streaming</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 gradient-text">
          YouTube Video Downloader
        </h1>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto font-light leading-relaxed">
          Paste any YouTube video link to choose quality and stream MP4 video
          directly to your device.
        </p>
      </div>

      <YouTubeVideoDownloaderClient />
      <ToolSeoSection toolSlug="youtube-video-downloader" />
    </div>
  );
}
