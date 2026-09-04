"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Hexagon, Menu, X, SunMedium, MoonStar } from "lucide-react";
import { usePathname } from "next/navigation";

const navLinks = [
  { name: "All Tools", href: "/" },
  { name: "Compress", href: "/tools/image-compressor" },
  { name: "Resize", href: "/tools/image-resizer" },
  { name: "Convert", href: "/tools/image-converter" },
  { name: "PDF Merge", href: "/tools/merge-pdf" },
  { name: "Guides", href: "/guides" },
  { name: "Blog", href: "/blog" },
];

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <header className="sticky top-4 z-50 w-full px-4 sm:px-6 mb-8">
      <div className="mx-auto max-w-5xl rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white/75 dark:bg-zinc-900/75 shadow-xl shadow-slate-900/5 dark:shadow-black/40 backdrop-blur-xl transition-all duration-300">
        <div className="flex h-16 items-center justify-between px-6">
          
          {/* Brand Logo - Blue Theme */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-md shadow-blue-500/25 group-hover:scale-105 transition-transform duration-300">
              <Hexagon className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-zinc-100">
              pkc<span className="text-blue-600 dark:text-blue-400 font-light">techs</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1 bg-slate-100/80 dark:bg-zinc-800/60 p-1.5 rounded-full border border-slate-200/50 dark:border-white/5">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link 
                  key={link.href} 
                  href={link.href} 
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                    isActive 
                      ? 'bg-white dark:bg-zinc-950 text-slate-900 dark:text-white shadow-sm' 
                      : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Right Action Bar */}
          <div className="hidden md:flex items-center gap-3">
            {mounted && (
              <button
                onClick={toggleTheme}
                className="group relative flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-300/80 dark:border-zinc-800 bg-slate-100/80 dark:bg-zinc-950/80 hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-all duration-300 shadow-inner"
                title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
              >
                <div className="flex items-center gap-1.5">
                  <div className={`p-1 rounded-full transition-all duration-300 ${theme === 'light' ? 'bg-amber-400 text-white shadow-sm' : 'text-slate-400'}`}>
                    <SunMedium className="h-3.5 w-3.5" />
                  </div>
                  <div className={`p-1 rounded-full transition-all duration-300 ${theme === 'dark' ? 'bg-indigo-500 text-white shadow-sm' : 'text-slate-400'}`}>
                    <MoonStar className="h-3.5 w-3.5" />
                  </div>
                </div>
                <span className="text-[11px] font-semibold tracking-wider uppercase text-slate-600 dark:text-zinc-400 pr-1">
                  {theme === 'dark' ? 'Dark' : 'Light'}
                </span>
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            {mounted && (
              <button
                onClick={toggleTheme}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-300 dark:border-zinc-800 bg-slate-100 dark:bg-zinc-950 text-slate-700 dark:text-zinc-300"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <MoonStar className="h-4 w-4 text-indigo-400" />
                ) : (
                  <SunMedium className="h-4 w-4 text-amber-500" />
                )}
                <span className="text-xs font-semibold uppercase">{theme}</span>
              </button>
            )}

            <button 
              className="p-2 text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-100 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden p-4 border-t border-slate-200 dark:border-white/10">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link 
                    key={link.href} 
                    href={link.href} 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors ${
                      isActive 
                        ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400' 
                        : 'text-slate-600 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-800'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
