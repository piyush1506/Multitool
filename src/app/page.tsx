import { Metadata } from "next";
import Link from "next/link";
import { HomeClient } from "@/components/HomeClient";
import { 
  ShieldCheck, 
  Zap, 
  Sparkles, 
  Lock, 
  BookOpen, 
  FileText, 
  ArrowRight, 
  HelpCircle,
  CheckCircle2
} from "lucide-react";

export const metadata: Metadata = {
  title: "pkctechs - Free Online Image, PDF & Web Utility Tools",
  description: "Free online utility tools & iLovePDF alternative. Convert PDF to Word, compress images, remove backgrounds, merge PDFs, and generate QR codes 100% free and private in your browser.",
  alternates: {
    canonical: "https://pkctechs.in",
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
    description: "Instant PDF, Image, and Data utilities in your browser with 100% client-side privacy.",
  },
};

const homeFaq = [
  {
    q: "Are my files uploaded to your servers?",
    a: "No. All image resizing, compression, PDF processing, and conversions run directly inside your web browser using WebAssembly and client-side JavaScript. Your files never leave your device."
  },
  {
    q: "Is pkctechs completely free to use?",
    a: "Yes, 100% free. There are no subscriptions, no daily limits, and no accounts required to access any of our 19 utility tools."
  },
  {
    q: "How is pkctechs an alternative to iLovePDF and TinyPNG?",
    a: "Unlike typical online PDF and image converters that upload your confidential documents to cloud servers, pkctechs processes everything locally on your computer. It is faster, has no file size queues, and is completely private."
  },
  {
    q: "Can I use pkctechs on mobile devices?",
    a: "Yes. All tools are fully responsive and work seamlessly on iPhones, iPads, Android devices, Macs, and Windows PCs."
  }
];

const homeJsonLd = {
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
      "@type": "FAQPage",
      "mainEntity": homeFaq.map((item) => ({
        "@type": "Question",
        "name": item.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.a
        }
      }))
    }
  ]
};

export default function Home() {
  return (
    <div className="flex flex-col items-center min-h-screen pt-8 pb-24 relative overflow-hidden transition-colors">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }}
      />

      {/* Hero Header */}
      <header className="relative z-10 w-full max-w-6xl mx-auto px-6 mb-6 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-semibold mb-4">
          <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          100% Client-Side Privacy &middot; Zero File Uploads
        </div>
        
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 text-slate-900 dark:text-white">
          Free Online Image, PDF &amp; Web Utility Tools
        </h1>
        
        <p className="text-slate-600 dark:text-zinc-400 text-base md:text-lg max-w-2xl mx-auto font-normal">
          Fast, private browser-based utilities with zero file uploads, no subscriptions, and unlimited daily usage.
        </p>
      </header>

      {/* Interactive Tools Search & Directory */}
      <section className="relative z-10 w-full mb-16" aria-label="Tools Directory">
        <HomeClient />
      </section>

      {/* Features & Value Proposition */}
      <section className="relative z-10 w-full max-w-6xl mx-auto px-6 mb-20">
        <div className="p-8 md:p-12 rounded-3xl bg-slate-50 dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800 shadow-sm">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-3">
              Why Professionals &amp; Creators Choose pkctechs
            </h2>
            <p className="text-slate-600 dark:text-zinc-400 text-sm md:text-base">
              Engineered with modern browser technologies to guarantee speed, data safety, and convenience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white dark:bg-zinc-800/70 border border-slate-200 dark:border-zinc-700/80">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">100% Private &amp; Offline-Ready</h3>
              <p className="text-slate-600 dark:text-zinc-300 text-sm leading-relaxed">
                Your images and documents never touch a third-party server. All data operations happen in your browser memory.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-zinc-800/70 border border-slate-200 dark:border-zinc-700/80">
              <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Instant Execution</h3>
              <p className="text-slate-600 dark:text-zinc-300 text-sm leading-relaxed">
                No waiting in upload queues or download delays. Process multiple large files immediately at hardware speeds.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-zinc-800/70 border border-slate-200 dark:border-zinc-700/80">
              <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Completely Free Forever</h3>
              <p className="text-slate-600 dark:text-zinc-300 text-sm leading-relaxed">
                No credit cards, no hidden paywalls, and no account creation required. Enjoy unrestricted access to all 19 tools.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Internal Linking & Quick Directory */}
      <section className="relative z-10 w-full max-w-6xl mx-auto px-6 mb-20" aria-label="Tool Categories Directory">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 text-center md:text-left">
          Explore All Utility Categories
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800">
            <h3 className="font-bold text-base text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-500"></span>
              Image Tools
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/tools/image-resizer" className="text-slate-600 dark:text-zinc-400 hover:text-emerald-500 transition-colors">Image Resizer</Link></li>
              <li><Link href="/tools/image-compressor" className="text-slate-600 dark:text-zinc-400 hover:text-emerald-500 transition-colors">Image Compressor</Link></li>
              <li><Link href="/tools/image-converter" className="text-slate-600 dark:text-zinc-400 hover:text-emerald-500 transition-colors">Image Converter</Link></li>
              <li><Link href="/tools/background-remover" className="text-slate-600 dark:text-zinc-400 hover:text-emerald-500 transition-colors">Background Remover</Link></li>
              <li><Link href="/tools/image-cropper" className="text-slate-600 dark:text-zinc-400 hover:text-emerald-500 transition-colors">Image Cropper</Link></li>
              <li><Link href="/tools/image-to-pdf" className="text-slate-600 dark:text-zinc-400 hover:text-emerald-500 transition-colors">Image to PDF</Link></li>
              <li><Link href="/tools/svg-to-png" className="text-slate-600 dark:text-zinc-400 hover:text-emerald-500 transition-colors">SVG to PNG</Link></li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800">
            <h3 className="font-bold text-base text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
              PDF Tools
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/tools/merge-pdf" className="text-slate-600 dark:text-zinc-400 hover:text-emerald-500 transition-colors">Merge PDF</Link></li>
              <li><Link href="/tools/split-pdf" className="text-slate-600 dark:text-zinc-400 hover:text-emerald-500 transition-colors">Split PDF</Link></li>
              <li><Link href="/tools/pdf-compressor" className="text-slate-600 dark:text-zinc-400 hover:text-emerald-500 transition-colors">PDF Compressor</Link></li>
              <li><Link href="/tools/pdf-to-image" className="text-slate-600 dark:text-zinc-400 hover:text-emerald-500 transition-colors">PDF to Image</Link></li>
              <li><Link href="/tools/pdf-to-docx" className="text-slate-600 dark:text-zinc-400 hover:text-emerald-500 transition-colors">PDF to DOCX (Word)</Link></li>
              <li><Link href="/tools/docx-to-pdf" className="text-slate-600 dark:text-zinc-400 hover:text-emerald-500 transition-colors">DOCX to PDF</Link></li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800">
            <h3 className="font-bold text-base text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span>
              Developer Tools
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/tools/json-formatter" className="text-slate-600 dark:text-zinc-400 hover:text-emerald-500 transition-colors">JSON Formatter</Link></li>
              <li><Link href="/tools/base64-tool" className="text-slate-600 dark:text-zinc-400 hover:text-emerald-500 transition-colors">Base64 Tool</Link></li>
              <li><Link href="/tools/format-converter" className="text-slate-600 dark:text-zinc-400 hover:text-emerald-500 transition-colors">Data Format Converter</Link></li>
              <li><Link href="/tools/color-picker" className="text-slate-600 dark:text-zinc-400 hover:text-emerald-500 transition-colors">Color Picker &amp; Palette</Link></li>
              <li><Link href="/tools/password-generator" className="text-slate-600 dark:text-zinc-400 hover:text-emerald-500 transition-colors">Password Generator</Link></li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800">
            <h3 className="font-bold text-base text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              Guides &amp; Resources
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/tools/qr-generator" className="text-slate-600 dark:text-zinc-400 hover:text-emerald-500 transition-colors">QR Code Generator</Link></li>
              <li><Link href="/guides" className="text-slate-600 dark:text-zinc-400 hover:text-emerald-500 transition-colors font-medium">All User Guides &rarr;</Link></li>
              <li><Link href="/blog" className="text-slate-600 dark:text-zinc-400 hover:text-emerald-500 transition-colors font-medium">All Blog Articles &rarr;</Link></li>
              <li><Link href="/guides/how-to-compress-pdf-to-200kb" className="text-slate-600 dark:text-zinc-400 hover:text-emerald-500 transition-colors">Compress PDF to 200KB</Link></li>
              <li><Link href="/blog/best-free-ilovepdf-alternatives-2026" className="text-slate-600 dark:text-zinc-400 hover:text-emerald-500 transition-colors">iLovePDF Alternatives</Link></li>
            </ul>
          </div>
        </div>
      </section>

      {/* Featured Guides & Blog Posts */}
      <section className="relative z-10 w-full max-w-6xl mx-auto px-6 mb-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2">
              Helpful Guides &amp; Tech Articles
            </h2>
            <p className="text-slate-600 dark:text-zinc-400 text-sm">
              Step-by-step tutorials to help you convert, compress, and optimize media like a pro.
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-4">
            <Link href="/guides" className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1">
              Browse Guides <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/blog" className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1">
              Browse Blog <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link 
            href="/guides/how-to-compress-pdf-to-200kb" 
            className="group p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 hover:border-emerald-500 dark:hover:border-emerald-500 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-3 uppercase tracking-wider">
                <BookOpen className="w-3.5 h-3.5" /> Guide
              </div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors mb-2">
                How to Compress PDF to 200KB or Less Online
              </h3>
              <p className="text-slate-600 dark:text-zinc-400 text-xs leading-relaxed">
                Step-by-step instructions to reduce PDF size for job applications, government portals, and email attachments without blur.
              </p>
            </div>
            <div className="mt-6 text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              Read Guide <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>

          <Link 
            href="/guides/how-to-remove-background-from-image-free" 
            className="group p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 hover:border-emerald-500 dark:hover:border-emerald-500 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-3 uppercase tracking-wider">
                <BookOpen className="w-3.5 h-3.5" /> Guide
              </div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors mb-2">
                How to Remove Background from Image for Free
              </h3>
              <p className="text-slate-600 dark:text-zinc-400 text-xs leading-relaxed">
                Create transparent PNG cutouts in seconds using browser AI. No Photoshop or paid subscriptions needed.
              </p>
            </div>
            <div className="mt-6 text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              Read Guide <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>

          <Link 
            href="/blog/best-free-ilovepdf-alternatives-2026" 
            className="group p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 hover:border-emerald-500 dark:hover:border-emerald-500 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-600 dark:text-purple-400 mb-3 uppercase tracking-wider">
                <FileText className="w-3.5 h-3.5" /> Article
              </div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors mb-2">
                Top Free iLovePDF Alternatives in 2026
              </h3>
              <p className="text-slate-600 dark:text-zinc-400 text-xs leading-relaxed">
                Discover the best privacy-friendly online PDF tools that let you merge, split, and convert files with zero limits.
              </p>
            </div>
            <div className="mt-6 text-xs font-bold text-purple-600 dark:text-purple-400 flex items-center gap-1">
              Read Article <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="relative z-10 w-full max-w-4xl mx-auto px-6" aria-label="Frequently Asked Questions">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400 text-xs font-semibold mb-3">
            <HelpCircle className="w-3.5 h-3.5" /> FAQ
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 dark:text-zinc-400 text-sm">
            Everything you need to know about pkctechs online utility suite.
          </p>
        </div>

        <div className="space-y-4">
          {homeFaq.map((item, idx) => (
            <div 
              key={idx} 
              className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-sm"
            >
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2 flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span>{item.q}</span>
              </h3>
              <p className="text-slate-600 dark:text-zinc-400 text-sm leading-relaxed pl-7">
                {item.a}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
