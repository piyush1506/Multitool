import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://pkctechs.in"),
  alternates: {
    canonical: "https://pkctechs.in",
  },
  title: "pkctechs - Free Online Image, PDF, YouTube & Web Utility Tools",
  description: "Free online utility tools & iLovePDF alternative. Convert PDF to Word, download YouTube videos & thumbnails, compress images, remove backgrounds. 100% private & browser-based.",

  keywords: [
    "ilovepdf",
    "ilovepdff",
    "i love pdf",
    "ilovepdf alternative",
    "ilovepdf free",
    "ilovepdf online",
    "youtube video downloader",
    "youtube thumbnail downloader",
    "pdf to docx",
    "docx to pdf",
    "convert pdf to word",
    "convert word to pdf",
    "background remover online",
    "remove background from image",
    "transparent png maker",
    "image compressor",
    "reduce image size online",
    "image resizer",
    "resize image dimensions",
    "image converter",
    "convert png to jpg",
    "webp converter",
    "svg to png converter",
    "image to pdf",
    "pdf to image",
    "merge pdf online",
    "combine pdf files",
    "split pdf online",
    "pdf compressor",
    "reduce pdf file size",
    "qr code generator",
    "custom qr maker",
    "json to csv",
    "csv to json",
    "data format converter",
    "json formatter online",
    "beautify json",
    "password generator",
    "secure token generator",
    "base64 encoder decoder",
    "color picker hex rgb",
    "free online web tools",
    "pkctechs"
  ],
  authors: [{ name: "pkctechs" }],
  creator: "pkctechs",
  publisher: "pkctechs",
  verification: {
    google: "mF3bRg2ewXSGnBiqMMBZjf97H-fcksdcT2H-4Htuj5Y",
    other: {
      "msvalidate.01": "1E1F0441BAD371C012549837626A7618",
    },
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "pkctechs - Free Online Image, PDF & Web Utility Tools",
    description: "Convert, compress, and process PDFs, Images, and Web data 100% free inside your browser. No registration required.",
    url: "https://pkctechs.in",
    siteName: "pkctechs",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "pkctechs - Free Online Utility Tools",
    description: "Instant PDF, Image, and Data utilities in your browser.",
    creator: "@pkctechs",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  other: {
    "google-adsense-account": "ca-pub-9516698796421486",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://pkctechs.in/#website",
      "url": "https://pkctechs.in",
      "name": "pkctechs",
      "description": "Free Online Image, PDF, YouTube & Web Utility Tools",
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://pkctechs.in/?q={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@type": "WebApplication",
      "name": "pkctechs Multitool",
      "url": "https://pkctechs.in",
      "description": "Free, browser-based online utility suite featuring 25 image, PDF, YouTube, document, and developer tools.",
      "applicationCategory": "UtilityApplication",
      "operatingSystem": "All",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col selection:bg-blue-500/30" suppressHydrationWarning>
        <script
          id="root-schema-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Google AdSense via Next.js Script */}
        <Script
          id="google-adsense"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9516698796421486"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />

        {/* Google Analytics */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-0RSKYLDLLY" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-0RSKYLDLLY');
          `}
        </Script>

        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
