import Link from "next/link";
import { Wrench } from "lucide-react";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/50 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-purple-500/20">
            <Wrench className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">MultiTool<span className="text-purple-400">Pro</span></span>
        </Link>
        <div className="flex items-center gap-6">
          <Link href="/tools/image-resizer" className="text-sm font-medium text-gray-300 transition-colors hover:text-white">Resizer</Link>
          <Link href="/tools/image-converter" className="text-sm font-medium text-gray-300 transition-colors hover:text-white">Converter</Link>
          <Link href="/tools/image-cropper" className="text-sm font-medium text-gray-300 transition-colors hover:text-white">Cropper</Link>
          <Link href="/tools/image-to-pdf" className="text-sm font-medium text-gray-300 transition-colors hover:text-white">Image to PDF</Link>
        </div>
      </div>
    </nav>
  );
}
