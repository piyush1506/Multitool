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
  title: {
    default: "pkctechs - Free Online Image, PDF & Web Utility Tools",
    template: "%s | pkctechs Utilities",
  },
  description: "Comprehensive suite of 19 free online utility tools: PDF to DOCX, DOCX to PDF, Image Compressor, Background Remover, QR Code Generator, Data Format Converter & more. 100% private, client-side browser execution.",
  keywords: [
    "pdf to docx",
    "docx to pdf",
    "image compressor",
    "background remover",
    "qr generator",
    "image converter",
    "image resizer",
    "pdf merger",
    "json formatter",
    "format converter",
    "free online tools",
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
};

const jsonLd = {
  "@context": "https://schema.org",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col selection:bg-blue-500/30">
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
