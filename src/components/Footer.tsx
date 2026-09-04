import Link from "next/link";
import { Hexagon, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-[var(--nav-border)] bg-[var(--nav-bg)] backdrop-blur-xl pt-14 pb-10 relative z-10 transition-colors text-left">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 shadow-md">
                <Hexagon className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-zinc-100">
                pkc<span className="text-blue-600 dark:text-blue-400 font-light">techs</span>
              </span>
            </Link>
            <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed font-light">
              Free, browser-based online utility suite featuring 19 privacy-focused image, PDF, document, and developer tools.
            </p>
          </div>

          {/* Popular Image Tools */}
          <div>
            <h3 className="text-xs uppercase tracking-wider font-semibold text-slate-900 dark:text-zinc-200 mb-4">
              Image Tools
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-600 dark:text-zinc-400">
              <li>
                <Link href="/tools/image-resizer" className="hover:text-blue-500 transition-colors">
                  Image Resizer
                </Link>
              </li>
              <li>
                <Link href="/tools/image-compressor" className="hover:text-blue-500 transition-colors">
                  Image Compressor
                </Link>
              </li>
              <li>
                <Link href="/tools/background-remover" className="hover:text-blue-500 transition-colors">
                  Background Remover
                </Link>
              </li>
              <li>
                <Link href="/tools/image-converter" className="hover:text-blue-500 transition-colors">
                  Image Converter
                </Link>
              </li>
              <li>
                <Link href="/tools/image-cropper" className="hover:text-blue-500 transition-colors">
                  Image Cropper
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular PDF Tools */}
          <div>
            <h3 className="text-xs uppercase tracking-wider font-semibold text-slate-900 dark:text-zinc-200 mb-4">
              PDF Utilities
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-600 dark:text-zinc-400">
              <li>
                <Link href="/tools/pdf-compressor" className="hover:text-blue-500 transition-colors">
                  PDF Compressor
                </Link>
              </li>
              <li>
                <Link href="/tools/merge-pdf" className="hover:text-blue-500 transition-colors">
                  Merge PDF
                </Link>
              </li>
              <li>
                <Link href="/tools/split-pdf" className="hover:text-blue-500 transition-colors">
                  Split PDF
                </Link>
              </li>
              <li>
                <Link href="/tools/pdf-to-docx" className="hover:text-blue-500 transition-colors">
                  PDF to Word DOCX
                </Link>
              </li>
              <li>
                <Link href="/tools/pdf-to-image" className="hover:text-blue-500 transition-colors">
                  PDF to Image
                </Link>
              </li>
            </ul>
          </div>

          {/* Practical Guides & Blog */}
          <div>
            <h3 className="text-xs uppercase tracking-wider font-semibold text-slate-900 dark:text-zinc-200 mb-4">
              Resources & Blog
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-600 dark:text-zinc-400">
              <li>
                <Link href="/blog/best-free-ilovepdf-alternatives-2026" className="hover:text-blue-500 transition-colors">
                  iLovePDF Alternatives (2026)
                </Link>
              </li>
              <li>
                <Link href="/blog/webp-vs-png-vs-jpeg-comparison" className="hover:text-blue-500 transition-colors">
                  WebP vs PNG vs JPEG
                </Link>
              </li>
              <li>
                <Link href="/blog/optimize-images-for-google-core-web-vitals" className="hover:text-blue-500 transition-colors">
                  Optimize for Core Web Vitals
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-blue-400 font-semibold hover:underline">
                  Visit Blog →
                </Link>
              </li>
              <li>
                <Link href="/guides" className="text-zinc-400 hover:text-white transition-colors">
                  All How-To Guides
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-200/60 dark:border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-zinc-400">
          <p>© {new Date().getFullYear()} pkctechs. All processing executed 100% in your browser.</p>
          <div className="flex items-center gap-1">
            <span>Free online utilities for creators & developers</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
