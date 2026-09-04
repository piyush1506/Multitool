import { Metadata } from "next";
import Link from "next/link";
import { guidesData } from "@/data/guidesData";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BookOpen, ArrowRight, Clock, Calendar, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Practical Guides & Tutorials | pkctechs Online Utilities",
  description: "Step-by-step guides on PDF compression, image resizing, transparent background removal, and format conversion. 100% free practical tips.",
  alternates: {
    canonical: "https://pkctechs.in/guides",
  },
  openGraph: {
    title: "Practical Guides & Tutorials | pkctechs",
    description: "Step-by-step guides on PDF compression, image resizing, transparent background removal, and format conversion.",
    url: "https://pkctechs.in/guides",
    siteName: "pkctechs Guides",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Practical Guides & Tutorials | pkctechs",
    description: "Step-by-step guides on PDF compression, image resizing, and web utilities.",
  },
};

export default function GuidesPage() {
  const articles = Object.values(guidesData);

  return (
    <div className="container mx-auto px-6 py-16 max-w-5xl relative z-10">
      <Breadcrumbs items={[{ name: "Guides" }]} />

      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold mb-4">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Helpful Resources</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 gradient-text">
          How-To Guides & Tutorials
        </h1>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto font-light leading-relaxed">
          Master your digital workflow with step-by-step guides for PDF handling, image optimization, and web developer utilities.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {articles.map((article) => (
          <Link
            key={article.slug}
            href={`/guides/${article.slug}`}
            className="p-8 rounded-3xl bg-zinc-900/40 border border-zinc-800/80 hover:border-blue-500/50 hover:bg-zinc-800/30 transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between text-xs text-zinc-500 mb-4">
                <span className="px-2.5 py-0.5 rounded-full font-semibold bg-zinc-800 text-zinc-300">
                  {article.category}
                </span>
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {article.readingTime}
                  </span>
                </div>
              </div>

              <h2 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors leading-snug">
                {article.title}
              </h2>
              <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                {article.description}
              </p>
            </div>

            <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between">
              <span className="text-xs text-blue-400 font-semibold flex items-center gap-1 group-hover:underline">
                Read Tutorial
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
              <span className="text-[11px] text-zinc-500">
                Uses {article.toolName}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
