import { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import Link from "next/link";
import { Hexagon, Shield, Zap, Sparkles, Heart } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | pkctechs Multitool",
  description:
    "Learn about pkctechs, our mission to build fast, private, and 100% free online utility tools for creators, students, and developers.",
  alternates: {
    canonical: "https://pkctechs.in/about",
  },
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-6 py-16 max-w-4xl relative z-10 text-left">
      <Breadcrumbs items={[{ name: "About Us" }]} />

      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Our Story & Mission</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4 gradient-text">
          About pkctechs
        </h1>
        <p className="text-slate-600 dark:text-zinc-400 text-lg max-w-2xl mx-auto font-light leading-relaxed">
          Building high-performance, privacy-first web utilities that eliminate paywalls, bloated software, and intrusive cloud data storage.
        </p>
      </div>

      <div className="space-y-8 text-slate-700 dark:text-zinc-300 text-sm sm:text-base leading-relaxed">
        <section className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800 shadow-xs">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-500" />
            Why We Built pkctechs
          </h2>
          <p className="mb-3">
            Every day, millions of students, creators, and professionals need to perform basic document tasks: compress a PDF for a job application, resize a banner for social media, extract high-resolution YouTube cover graphics, or convert file formats.
          </p>
          <p>
            Too often, existing online tools force users behind monthly paywalls, restrict daily conversions to 2 files, or upload sensitive documents to unverified cloud servers. pkctechs was built to change that by executing computing directly in your browser.
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800 shadow-xs">
            <Shield className="w-8 h-8 text-emerald-500 mb-3" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Privacy by Architecture</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">
              We leverage modern WebAssembly and client-side JavaScript so your files never leave your device. Zero cloud uploads, zero data logs.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800 shadow-xs">
            <Heart className="w-8 h-8 text-rose-500 mb-3" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">100% Free Forever</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">
              We believe essential utility tools should be free for everyone. We support server infrastructure through minimal, privacy-conscious Google AdSense ads.
            </p>
          </div>
        </section>

        <div className="text-center pt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-sm bg-blue-600 hover:bg-blue-700 text-white shadow-lg transition-all"
          >
            Explore All 25 Free Tools →
          </Link>
        </div>
      </div>
    </div>
  );
}
