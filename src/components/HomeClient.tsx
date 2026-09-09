"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Image as ImageIcon, 
  FileImage, 
  Crop, 
  FileText, 
  FileDown,
  Search,
  ArrowRight,
  FileArchive,
  Minimize,
  Files,
  Scissors,
  Eraser,
  QrCode,
  Palette,
  KeyRound,
  Binary,
  Code,
  FileType,
  FileCode,
  Sparkles,
  Video,
  ImageDown
} from "lucide-react";

export const tools = [
  {
    title: "AI Image Generator",
    description: "Generate stunning photorealistic and artistic images from text prompts using Google AI Studio. Multiple aspect ratios & styles.",
    icon: Sparkles,
    href: "/tools/image-generator",
    gradient: "from-purple-500/30 via-pink-500/20 to-blue-500/30",
    iconColor: "text-purple-600 dark:text-purple-400",
    category: "Image",
    badge: "NEW AI",
  },
  {
    title: "AI PDF Chat",
    description: "Upload any PDF and instantly ask questions, extract summaries, and find precise answers using Gemini AI.",
    icon: Sparkles,
    href: "/tools/pdf-chat",
    gradient: "from-rose-500/30 via-red-500/20 to-orange-500/30",
    iconColor: "text-rose-600 dark:text-rose-400",
    category: "PDF",
    badge: "NEW AI",
  },
  {
    title: "AI Image Analyzer & OCR",
    description: "Extract text from images (OCR), generate SEO alt-text, or ask custom questions about visual content instantly.",
    icon: Sparkles,
    href: "/tools/image-analyzer",
    gradient: "from-cyan-500/30 via-blue-500/20 to-indigo-500/30",
    iconColor: "text-cyan-600 dark:text-cyan-400",
    category: "Image",
    badge: "NEW AI",
  },
  {
    title: "AI Text Summarizer",
    description: "Instantly summarize articles, rewrite text in professional or casual tones, and fix grammar issues using AI.",
    icon: Sparkles,
    href: "/tools/text-summarizer",
    gradient: "from-blue-500/30 via-indigo-500/20 to-purple-500/30",
    iconColor: "text-blue-600 dark:text-blue-400",
    category: "Document",
    badge: "NEW AI",
  },
  {
    title: "Image Resizer",
    description: "Resize images to exact dimensions online. Maintain aspect ratio and high quality for free.",
    icon: ImageIcon,
    href: "/tools/image-resizer",
    gradient: "from-blue-500/20 to-cyan-500/20",
    iconColor: "text-cyan-600 dark:text-cyan-400",
    category: "Image",
  },
  {
    title: "Image Converter",
    description: "Convert images between formats like PNG, JPEG, WEBP instantly. Fast and secure online converter.",
    icon: FileImage,
    href: "/tools/image-converter",
    gradient: "from-purple-500/20 to-pink-500/20",
    iconColor: "text-purple-600 dark:text-purple-400",
    category: "Image",
  },
  {
    title: "Image Compressor",
    description: "Compress JPEG, PNG, WEBP images. Reduce image file size by up to 90% without visible quality loss.",
    icon: Minimize,
    href: "/tools/image-compressor",
    gradient: "from-rose-500/20 to-orange-500/20",
    iconColor: "text-rose-600 dark:text-rose-400",
    category: "Image",
  },
  {
    title: "Background Remover",
    description: "Remove image backgrounds automatically in seconds. Create transparent PNG backgrounds for free.",
    icon: Eraser,
    href: "/tools/background-remover",
    gradient: "from-fuchsia-500/20 to-pink-500/20",
    iconColor: "text-fuchsia-600 dark:text-fuchsia-400",
    category: "Image",
  },
  {
    title: "Image Cropper",
    description: "Crop and adjust your images with an easy-to-use visual editor. Perfect for social media formatting.",
    icon: Crop,
    href: "/tools/image-cropper",
    gradient: "from-orange-500/20 to-amber-500/20",
    iconColor: "text-orange-600 dark:text-orange-400",
    category: "Image",
  },
  {
    title: "Image to PDF",
    description: "Combine multiple images into a single, well-formatted PDF document securely in your browser.",
    icon: FileText,
    href: "/tools/image-to-pdf",
    gradient: "from-green-500/20 to-emerald-500/20",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    category: "PDF",
  },
  {
    title: "PDF to Image",
    description: "Extract high-quality images from PDF pages securely. Convert PDF documents to JPG or PNG files.",
    icon: FileDown,
    href: "/tools/pdf-to-image",
    gradient: "from-amber-500/20 to-yellow-500/20",
    iconColor: "text-amber-600 dark:text-amber-400",
    category: "PDF",
  },
  {
    title: "PDF Compressor",
    description: "Compress PDF files online for free. Reduce PDF file size without losing quality for easier sharing.",
    icon: FileArchive,
    href: "/tools/pdf-compressor",
    gradient: "from-teal-500/20 to-emerald-500/20",
    iconColor: "text-teal-600 dark:text-teal-400",
    category: "PDF",
  },
  {
    title: "Merge PDF",
    description: "Combine multiple PDF files into one single document securely. Merge PDFs in the exact order you want.",
    icon: Files,
    href: "/tools/merge-pdf",
    gradient: "from-indigo-500/20 to-blue-500/20",
    iconColor: "text-indigo-600 dark:text-indigo-400",
    category: "PDF",
  },
  {
    title: "Split PDF",
    description: "Extract pages from your PDF or save each page as a separate PDF. Fast and secure online PDF splitter.",
    icon: Scissors,
    href: "/tools/split-pdf",
    gradient: "from-violet-500/20 to-purple-500/20",
    iconColor: "text-violet-600 dark:text-violet-400",
    category: "PDF",
  },
  {
    title: "PDF to DOCX",
    description: "Convert PDF documents directly into editable Microsoft Word (.docx) files.",
    icon: FileType,
    href: "/tools/pdf-to-docx",
    gradient: "from-blue-600/20 to-indigo-600/20",
    iconColor: "text-blue-600 dark:text-blue-400",
    category: "Document",
  },
  {
    title: "DOCX to PDF",
    description: "Convert Microsoft Word documents into portable PDF files for printing and sharing.",
    icon: FileText,
    href: "/tools/docx-to-pdf",
    gradient: "from-indigo-600/20 to-purple-600/20",
    iconColor: "text-indigo-600 dark:text-indigo-400",
    category: "Document",
  },
  {
    title: "Data Format Converter",
    description: "Convert structured data between JSON, CSV, and XML formats instantly.",
    icon: FileCode,
    href: "/tools/format-converter",
    gradient: "from-emerald-500/20 to-teal-500/20",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    category: "Developer",
  },
  {
    title: "QR Code Generator",
    description: "Generate customizable, high-resolution QR codes for web links, text, and info.",
    icon: QrCode,
    href: "/tools/qr-generator",
    gradient: "from-teal-500/20 to-cyan-500/20",
    iconColor: "text-teal-600 dark:text-teal-400",
    category: "Utility",
  },
  {
    title: "SVG to PNG Converter",
    description: "Convert vector SVG graphics or markup code into high-resolution PNG images.",
    icon: FileImage,
    href: "/tools/svg-to-png",
    gradient: "from-orange-500/20 to-red-500/20",
    iconColor: "text-orange-600 dark:text-orange-400",
    category: "Image",
  },
  {
    title: "Color Picker & Palette",
    description: "Select custom colors and convert formats between HEX, RGB, and HSL.",
    icon: Palette,
    href: "/tools/color-picker",
    gradient: "from-pink-500/20 to-rose-500/20",
    iconColor: "text-pink-600 dark:text-pink-400",
    category: "Developer",
  },
  {
    title: "Password & Token Generator",
    description: "Create strong, cryptographically secure passwords and random API tokens.",
    icon: KeyRound,
    href: "/tools/password-generator",
    gradient: "from-emerald-500/20 to-green-500/20",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    category: "Security",
  },
  {
    title: "Base64 Encoder / Decoder",
    description: "Encode plain text to Base64 format or decode Base64 strings back to text.",
    icon: Binary,
    href: "/tools/base64-tool",
    gradient: "from-sky-500/20 to-blue-500/20",
    iconColor: "text-sky-600 dark:text-sky-400",
    category: "Developer",
  },
  {
    title: "JSON Formatter & Validator",
    description: "Beautify, minify, and validate JSON data structures instantly.",
    icon: Code,
    href: "/tools/json-formatter",
    gradient: "from-purple-500/20 to-indigo-500/20",
    iconColor: "text-purple-600 dark:text-purple-400",
    category: "Developer",
  },
  {
    title: "YouTube Video Downloader",
    description: "Download YouTube videos in MP4 format. Choose from multiple quality options including 360p, 720p, and 1080p HD — fast and free.",
    icon: Video,
    href: "/tools/youtube-video-downloader",
    gradient: "from-red-500/20 to-rose-500/20",
    iconColor: "text-red-600 dark:text-red-400",
    category: "YouTube",
    badge: "NEW",
  },
  {
    title: "YouTube Thumbnail Downloader",
    description: "Extract and save high-quality thumbnails from any YouTube video in multiple resolutions. Instant and no signup required.",
    icon: ImageDown,
    href: "/tools/youtube-thumbnail-downloader",
    gradient: "from-pink-500/20 to-fuchsia-500/20",
    iconColor: "text-pink-600 dark:text-pink-400",
    category: "YouTube",
    badge: "NEW",
  },
];

const categories = ["All", "YouTube", "Image", "PDF", "Document", "Developer", "Security", "Utility"];

export function HomeClient() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const q = params.get("q");
      if (q) {
        setSearchQuery(q);
      }
    }
  }, []);

  const filteredTools = tools.filter((tool) => {
    const matchesCategory = activeCategory === "All" || tool.category === activeCategory;
    const matchesSearch = 
      tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full max-w-6xl mx-auto px-6">
      {/* Search Bar */}
      <div className="relative w-full max-w-2xl mx-auto mb-6 group">
        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-slate-400 dark:text-zinc-400 group-focus-within:text-emerald-500 dark:group-focus-within:text-emerald-400 transition-colors duration-300" />
        </div>
        <input
          type="text"
          id="tools-search-input"
          className="block w-full pl-14 pr-24 py-4 bg-white dark:bg-zinc-900 border border-slate-300 dark:border-zinc-700 rounded-2xl text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 shadow-md text-lg font-normal transition-all"
          placeholder="Search 25 tools (e.g., pdf, json, youtube)..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          aria-label="Search tools"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
          <kbd className="hidden sm:inline-flex items-center justify-center h-7 px-3 rounded-lg bg-slate-100 dark:bg-zinc-800 text-xs text-slate-600 dark:text-zinc-300 font-mono border border-slate-300 dark:border-zinc-700 uppercase tracking-wider font-semibold">
            SEARCH
          </kbd>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center justify-center gap-2 flex-wrap mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
              activeCategory === cat
                ? "bg-emerald-600 text-white shadow-sm"
                : "bg-slate-100 dark:bg-zinc-800/80 text-slate-600 dark:text-zinc-300 hover:bg-slate-200 dark:hover:bg-zinc-700 border border-slate-200 dark:border-zinc-700"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Tools Grid */}
      {filteredTools.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 lg:gap-6" id="tools-grid">
          {filteredTools.map((tool, index) => (
            <Link 
              key={tool.href} 
              href={tool.href}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative flex flex-col justify-between p-4 sm:p-5 md:p-6 rounded-2xl sm:rounded-3xl glass-card border border-slate-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/90 shadow-sm hover:shadow-xl transition-all duration-300 md:aspect-square overflow-hidden"
            >
              {/* Premium Hover Glow */}
              <div 
                className={`absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-br ${tool.gradient} opacity-0 transition-opacity duration-500 pointer-events-none ${hoveredIndex === index ? 'opacity-100' : ''}`}
              />
              
              {/* Header: Icon + Category Badge */}
              <div className="relative z-10 flex items-start justify-between mb-2">
                <div className="p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 shadow-sm group-hover:scale-105 transition-transform duration-300">
                  <tool.icon className={`h-5 w-5 ${tool.iconColor}`} />
                </div>
                <div className="flex items-center gap-1 sm:gap-1.5 flex-wrap justify-end">
                  {"badge" in tool && tool.badge && (
                    <span className="text-[8px] sm:text-[9px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 bg-purple-500/10 px-1.5 sm:px-2 py-0.5 rounded-full border border-purple-500/20 animate-pulse whitespace-nowrap">
                      {tool.badge as string}
                    </span>
                  )}
                  <span className="hidden sm:inline-flex text-[10px] font-bold uppercase tracking-wider text-slate-700 dark:text-zinc-300 bg-slate-100 dark:bg-zinc-800 px-2.5 py-1 rounded-full border border-slate-200 dark:border-zinc-700">
                    {tool.category}
                  </span>
                </div>
              </div>
              
              {/* Title & Description */}
              <div className="relative z-10 my-auto">
                <h3 className="text-sm sm:text-base font-bold mb-1 sm:mb-1.5 text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors tracking-tight line-clamp-1 sm:line-clamp-2">
                  {tool.title}
                </h3>
                
                <p className="text-slate-600 dark:text-zinc-400 text-xs leading-relaxed font-normal line-clamp-2 sm:line-clamp-3">
                  {tool.description}
                </p>
              </div>
              
              {/* Bottom Action */}
              <div className="relative z-10 flex items-center text-xs font-bold text-emerald-600 dark:text-emerald-400 opacity-100 sm:opacity-90 group-hover:opacity-100 transition-all duration-300 mt-2 pt-2 border-t border-slate-100 dark:border-zinc-800/60">
                <span>Launch Tool</span>
                <ArrowRight className="ml-1.5 h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 px-4 rounded-3xl glass-panel max-w-2xl mx-auto border border-slate-200 dark:border-zinc-800">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 mb-6">
            <Search className="h-6 w-6 text-slate-500 dark:text-zinc-400" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No tools found</h3>
          <p className="text-slate-600 dark:text-zinc-300 font-normal text-center">
            We couldn't find any tool matching &ldquo;{searchQuery}&rdquo;.
          </p>
          <button 
            onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
            className="mt-6 px-6 py-2.5 rounded-full bg-slate-900 dark:bg-white text-white dark:text-zinc-900 hover:opacity-90 transition-opacity text-sm font-bold shadow-md"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
