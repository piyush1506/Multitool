import Link from "next/link";
import { 
  Image as ImageIcon, 
  FileImage, 
  Crop, 
  FileText, 
  FileDown 
} from "lucide-react";

const tools = [
  {
    title: "Image Resizer",
    description: "Resize images to exact dimensions while maintaining aspect ratio and quality.",
    icon: ImageIcon,
    href: "/tools/image-resizer",
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Image Converter",
    description: "Convert images between formats like PNG, JPEG, WEBP instantly.",
    icon: FileImage,
    href: "/tools/image-converter",
    color: "from-purple-500 to-pink-500",
  },
  {
    title: "Image Cropper",
    description: "Crop and adjust your images with an easy-to-use visual editor.",
    icon: Crop,
    href: "/tools/image-cropper",
    color: "from-orange-500 to-red-500",
  },
  {
    title: "Image to PDF",
    description: "Combine multiple images into a single, well-formatted PDF document.",
    icon: FileText,
    href: "/tools/image-to-pdf",
    color: "from-green-500 to-emerald-500",
  },
  {
    title: "PDF to Image",
    description: "Extract high-quality images from PDF pages securely in your browser.",
    icon: FileDown,
    href: "/tools/pdf-to-image",
    color: "from-yellow-500 to-orange-500",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col items-center py-20 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto mb-20">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
          pkctechs - The Ultimate Toolkit for Images and PDFs
        </h1>
        <p className="text-xl text-slate-400 leading-relaxed mb-8">
          Free, fast, and secure tools to manipulate your media files directly in the browser. 
          No servers, no waiting, no privacy risks.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="#tools" className="px-8 py-3 rounded-full bg-white text-black font-semibold hover:bg-gray-200 transition-colors">
            Explore Tools
          </Link>
          <a href="https://github.com" target="_blank" rel="noreferrer" className="px-8 py-3 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 transition-colors font-semibold">
            Star on GitHub
          </a>
        </div>
      </div>

      {/* Tools Grid */}
      <div id="tools" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {tools.map((tool) => (
          <Link 
            key={tool.href} 
            href={tool.href}
            className="group relative flex flex-col p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all duration-300"
          >
            <div className={`mb-4 inline-flex p-3 rounded-xl bg-gradient-to-br ${tool.color} shadow-lg`}>
              <tool.icon className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-purple-400 transition-colors">
              {tool.title}
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed flex-1">
              {tool.description}
            </p>
            <div className="mt-4 flex items-center text-sm font-medium text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 transform duration-300">
              Try it out &rarr;
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
