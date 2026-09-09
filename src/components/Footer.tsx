import Link from "next/link";
import { Hexagon } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-[var(--nav-border)] bg-[var(--nav-bg)] backdrop-blur-xl pt-14 pb-10 relative z-10 transition-colors text-left">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand Info */}
          <div className="col-span-2 md:col-span-1 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 shadow-md">
                <Hexagon className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-zinc-100">
                pkc<span className="text-blue-600 dark:text-blue-400 font-light">techs</span>
              </span>
            </Link>
            <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed font-light">
              Free, browser-based online utility suite featuring 25 privacy-focused image, PDF, YouTube, and developer tools.
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
               100% Free & Fast
              </span>
            </div>
          </div>

          {/* Image & AI Tools */}
          <div>
            <h3 className="text-xs uppercase tracking-wider font-semibold text-slate-900 dark:text-zinc-200 mb-4">
              Image & AI Tools
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-600 dark:text-zinc-400">
              <li>
                <Link href="/tools/image-generator" className="hover:text-purple-500 text-purple-600 dark:text-purple-400 font-medium transition-colors flex items-center gap-1">
                  <span>AI Image Generator</span>
                  <span className="text-[9px] px-1 py-0.2 rounded bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 font-bold">AI</span>
                </Link>
              </li>
              <li>
                <Link href="/tools/image-analyzer" className="hover:text-cyan-500 text-cyan-600 dark:text-cyan-400 font-medium transition-colors flex items-center gap-1">
                  <span>AI Image OCR</span>
                  <span className="text-[9px] px-1 py-0.2 rounded bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 font-bold">AI</span>
                </Link>
              </li>
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

          {/* PDF Utilities */}
          <div>
            <h3 className="text-xs uppercase tracking-wider font-semibold text-slate-900 dark:text-zinc-200 mb-4">
              PDF Utilities
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-600 dark:text-zinc-400">
              <li>
                <Link href="/tools/pdf-chat" className="hover:text-rose-500 text-rose-600 dark:text-rose-400 font-medium transition-colors flex items-center gap-1">
                  <span>AI PDF Chat</span>
                  <span className="text-[9px] px-1 py-0.2 rounded bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 font-bold">AI</span>
                </Link>
              </li>
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
              <li>
                <Link href="/tools/docx-to-pdf" className="hover:text-blue-500 transition-colors">
                  DOCX to PDF
                </Link>
              </li>
            </ul>
          </div>

          {/* YouTube & Developer Tools */}
          <div>
            <h3 className="text-xs uppercase tracking-wider font-semibold text-slate-900 dark:text-zinc-200 mb-4">
              YouTube & Utilities
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-600 dark:text-zinc-400">
              <li>
                <Link href="/tools/youtube-video-downloader" className="hover:text-red-500 text-red-600 dark:text-red-400 font-medium transition-colors flex items-center gap-1">
                  <span>Video Downloader</span>
                  <span className="text-[9px] px-1 py-0.2 rounded bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20 font-bold">HD</span>
                </Link>
              </li>
              <li>
                <Link href="/tools/youtube-thumbnail-downloader" className="hover:text-pink-500 text-pink-600 dark:text-pink-400 font-medium transition-colors flex items-center gap-1">
                  <span>Thumbnail Saver</span>
                  <span className="text-[9px] px-1 py-0.2 rounded bg-pink-500/10 text-pink-600 dark:text-pink-400 border border-pink-500/20 font-bold">4K</span>
                </Link>
              </li>
              <li>
                <Link href="/tools/qr-generator" className="hover:text-blue-500 transition-colors">
                  QR Code Generator
                </Link>
              </li>
              <li>
                <Link href="/tools/json-formatter" className="hover:text-blue-500 transition-colors">
                  JSON Formatter
                </Link>
              </li>
              <li>
                <Link href="/tools/format-converter" className="hover:text-blue-500 transition-colors">
                  Format Converter
                </Link>
              </li>
              <li>
                <Link href="/tools/color-picker" className="hover:text-blue-500 transition-colors">
                  Color Picker
                </Link>
              </li>
              <li>
                <Link href="/tools/password-generator" className="hover:text-blue-500 transition-colors">
                  Password Generator
                </Link>
              </li>
            </ul>
          </div>

          {/* Guides & Resources */}
          <div>
            <h3 className="text-xs uppercase tracking-wider font-semibold text-slate-900 dark:text-zinc-200 mb-4">
              Guides & Blog
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-600 dark:text-zinc-400">
              <li>
                <Link href="/guides/how-to-download-youtube-videos-in-mp4-hd" className="hover:text-blue-500 transition-colors line-clamp-1">
                  Download YouTube MP4 HD
                </Link>
              </li>
              <li>
                <Link href="/guides/how-to-download-youtube-thumbnails-in-hd" className="hover:text-blue-500 transition-colors line-clamp-1">
                  Save YouTube Thumbnails
                </Link>
              </li>
              <li>
                <Link href="/guides/how-to-compress-pdf-to-200kb" className="hover:text-blue-500 transition-colors line-clamp-1">
                  Compress PDF to 200KB
                </Link>
              </li>
              <li>
                <Link href="/blog/best-free-ilovepdf-alternatives-2026" className="hover:text-blue-500 transition-colors line-clamp-1">
                  iLovePDF Alternatives
                </Link>
              </li>
              <li>
                <Link href="/blog/webp-vs-png-vs-jpeg-comparison" className="hover:text-blue-500 transition-colors line-clamp-1">
                  WebP vs PNG vs JPEG
                </Link>
              </li>
              <li className="pt-1.5 flex flex-col gap-1">
                <Link href="/guides" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
                  All How-To Guides →
                </Link>
                <Link href="/blog" className="text-purple-600 dark:text-purple-400 font-semibold hover:underline">
                  Explore Blog Posts →
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-200/60 dark:border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-zinc-400">
          <p>© {new Date().getFullYear()} pkctechs. All processing executed securely in your browser.</p>
          <div className="flex items-center flex-wrap gap-4 text-slate-500 dark:text-zinc-400">
            <Link href="/" className="hover:text-slate-900 dark:hover:text-white transition-colors">Home</Link>
            <Link href="/about" className="hover:text-slate-900 dark:hover:text-white transition-colors">About</Link>
            <Link href="/privacy" className="hover:text-slate-900 dark:hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-slate-900 dark:hover:text-white transition-colors">Terms</Link>
            <Link href="/contact" className="hover:text-slate-900 dark:hover:text-white transition-colors">Contact</Link>
            <Link href="/guides" className="hover:text-slate-900 dark:hover:text-white transition-colors">Guides</Link>
            <Link href="/blog" className="hover:text-slate-900 dark:hover:text-white transition-colors">Blog</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
