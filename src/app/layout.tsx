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
  title: "pkctechs - Free Online Image, PDF & Web Utility Tools",
  description: "Free online utility tools & iLovePDF alternative. Convert PDF to Word, compress images, remove backgrounds & generate QR codes. 100% private & browser-based.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48", type: "image/x-icon" },
      { url: "/icon.png", sizes: "48x48", type: "image/png" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  keywords: [
    "ilovepdf",
    "ilovepdff",
    "i love pdf",
    "ilovepdf alternative",
    "ilovepdf free",
    "ilovepdf online",
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
    "monetag": "be1b6c4567778a438225c816c8e5cca4",
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
      "description": "Free Online Image, PDF & Web Utility Tools",
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
      "description": "Free, browser-based online utility suite featuring 19 image, PDF, document, and developer tools.",
      "applicationCategory": "UtilityApplication",
      "operatingSystem": "All",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    },
    {
      "@type": "ItemList",
      "name": "Tools Navigation",
      "itemListElement": [
        { "@type": "SiteNavigationElement", "position": 1, "name": "Image Cropper", "url": "https://pkctechs.in/tools/image-cropper" },
        { "@type": "SiteNavigationElement", "position": 2, "name": "Image Resizer", "url": "https://pkctechs.in/tools/image-resizer" },
        { "@type": "SiteNavigationElement", "position": 3, "name": "Image Compressor", "url": "https://pkctechs.in/tools/image-compressor" },
        { "@type": "SiteNavigationElement", "position": 4, "name": "Image Converter", "url": "https://pkctechs.in/tools/image-converter" },
        { "@type": "SiteNavigationElement", "position": 5, "name": "Background Remover", "url": "https://pkctechs.in/tools/background-remover" },
        { "@type": "SiteNavigationElement", "position": 6, "name": "Image to PDF", "url": "https://pkctechs.in/tools/image-to-pdf" },
        { "@type": "SiteNavigationElement", "position": 7, "name": "PDF to Image", "url": "https://pkctechs.in/tools/pdf-to-image" },
        { "@type": "SiteNavigationElement", "position": 8, "name": "PDF Compressor", "url": "https://pkctechs.in/tools/pdf-compressor" },
        { "@type": "SiteNavigationElement", "position": 9, "name": "Merge PDF", "url": "https://pkctechs.in/tools/merge-pdf" },
        { "@type": "SiteNavigationElement", "position": 10, "name": "Split PDF", "url": "https://pkctechs.in/tools/split-pdf" },
        { "@type": "SiteNavigationElement", "position": 11, "name": "PDF to DOCX", "url": "https://pkctechs.in/tools/pdf-to-docx" },
        { "@type": "SiteNavigationElement", "position": 12, "name": "DOCX to PDF", "url": "https://pkctechs.in/tools/docx-to-pdf" },
        { "@type": "SiteNavigationElement", "position": 13, "name": "Format Converter", "url": "https://pkctechs.in/tools/format-converter" },
        { "@type": "SiteNavigationElement", "position": 14, "name": "QR Code Generator", "url": "https://pkctechs.in/tools/qr-generator" },
        { "@type": "SiteNavigationElement", "position": 15, "name": "SVG to PNG", "url": "https://pkctechs.in/tools/svg-to-png" },
        { "@type": "SiteNavigationElement", "position": 16, "name": "Color Picker", "url": "https://pkctechs.in/tools/color-picker" },
        { "@type": "SiteNavigationElement", "position": 17, "name": "Password Generator", "url": "https://pkctechs.in/tools/password-generator" },
        { "@type": "SiteNavigationElement", "position": 18, "name": "Base64 Encoder & Decoder", "url": "https://pkctechs.in/tools/base64-tool" },
        { "@type": "SiteNavigationElement", "position": 19, "name": "JSON Formatter", "url": "https://pkctechs.in/tools/json-formatter" }
      ]
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
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="48x48" type="image/x-icon" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" sizes="any" />
        <link rel="icon" href="/icon.png" type="image/png" sizes="48x48" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="monetag" content="be1b6c4567778a438225c816c8e5cca4" />
        <meta name="google-adsense-account" content="ca-pub-9516698796421486" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9516698796421486"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col selection:bg-blue-500/30">
        <Script
          src="https://quge5.com/88/tag.min.js"
          data-zone="275961"
          data-cfasync="false"
          strategy="afterInteractive"
        />
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
