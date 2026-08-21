"use client";

import { useState } from "react";
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
  FileCode
} from "lucide-react";

const tools = [
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
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const filteredTools = tools.filter((tool) =>
    tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center min-h-screen pt-8 pb-24 relative overflow-hidden transition-colors">
      
      {/* Search Console - Top Bar */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 mb-12">
        <div className="relative w-full max-w-2xl mx-auto group">
          <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400 dark:text-zinc-400 group-focus-within:text-emerald-500 dark:group-focus-within:text-emerald-400 transition-colors duration-300" />
          </div>
          <input
            type="text"
            className="block w-full pl-14 pr-24 py-4 bg-white dark:bg-zinc-900 border border-slate-300 dark:border-zinc-700 rounded-2xl text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 shadow-md text-lg font-normal transition-all"
            placeholder="Search 19 tools (e.g., pdf, json, resize)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
             <kbd className="hidden sm:inline-flex items-center justify-center h-7 px-3 rounded-lg bg-slate-100 dark:bg-zinc-800 text-xs text-slate-600 dark:text-zinc-300 font-mono border border-slate-300 dark:border-zinc-700 uppercase tracking-wider font-semibold">
               SEARCH
             </kbd>
          </div>
        </div>
      </div>

      {/* Tools Grid */}
      <div className="relative z-10 w-full max-w-6xl px-6">
        {filteredTools.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map((tool, index) => (
              <Link 
                key={tool.href} 
                href={tool.href}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="group relative flex flex-col p-8 rounded-3xl glass-card border border-slate-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/90 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                {/* Premium Hover Glow */}
                <div 
                  className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${tool.gradient} opacity-0 transition-opacity duration-500 ${hoveredIndex === index ? 'opacity-100' : ''}`}
                />
                
                <div className="relative z-10 flex items-start justify-between mb-8">
                  <div className="p-3.5 rounded-2xl bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 shadow-sm group-hover:scale-105 transition-transform duration-300">
                    <tool.icon className={`h-6 w-6 ${tool.iconColor}`} />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700 dark:text-zinc-300 bg-slate-100 dark:bg-zinc-800 px-3 py-1.5 rounded-full border border-slate-200 dark:border-zinc-700">
                    {tool.category}
                  </span>
                </div>
                
                <h3 className="relative z-10 text-xl font-bold mb-3 text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors tracking-tight">
                  {tool.title}
                </h3>
                
                <p className="relative z-10 text-slate-600 dark:text-zinc-300 text-sm leading-relaxed flex-1 mb-8 font-normal">
                  {tool.description}
                </p>
                
                <div className="relative z-10 flex items-center text-sm font-bold text-emerald-600 dark:text-emerald-400 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0 duration-300">
                  Launch Tool <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 px-4 rounded-3xl glass-panel max-w-2xl mx-auto">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 mb-6">
              <Search className="h-6 w-6 text-slate-500 dark:text-zinc-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No results found</h3>
            <p className="text-slate-600 dark:text-zinc-300 font-normal text-center">We couldn't find anything matching "{searchQuery}".</p>
            <button 
              onClick={() => setSearchQuery('')}
              className="mt-8 px-6 py-2.5 rounded-full bg-slate-900 dark:bg-white text-white dark:text-zinc-900 hover:opacity-90 transition-opacity text-sm font-bold shadow-md"
            >
              Clear Search
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
