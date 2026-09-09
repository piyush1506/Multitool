import Link from "next/link";
import { toolsSeoData } from "@/data/toolsSeoData";
import { guidesData } from "@/data/guidesData";
import { 
  CheckCircle2, 
  ShieldCheck, 
  Zap, 
  Sparkles, 
  HelpCircle, 
  ArrowRight, 
  Layers,
  FileText,
  Image as ImageIcon,
  Cpu,
  Lock,
  Wrench,
  Video,
  BookOpen,
  Clock
} from "lucide-react";

interface ToolSeoSectionProps {
  toolSlug: string;
}

const categoryIcons: Record<string, any> = {
  Image: ImageIcon,
  PDF: FileText,
  Developer: Cpu,
  Utility: Wrench,
  YouTube: Video,
};

export function ToolSeoSection({ toolSlug }: ToolSeoSectionProps) {
  const data = toolsSeoData[toolSlug];
  if (!data) return null;

  const relatedTools = data.relatedSlugs
    .map((slug) => toolsSeoData[slug])
    .filter(Boolean);

  // Find guides relevant to this tool or category
  const relevantGuides = Object.values(guidesData).filter(
    (g) => g.toolSlug === toolSlug || g.category === data.category
  ).slice(0, 3);

  // Fallback to latest guides if none match category directly
  const displayGuides = relevantGuides.length > 0 
    ? relevantGuides 
    : Object.values(guidesData).slice(0, 3);

  return (
    <section className="mt-20 pt-12 border-t border-slate-200 dark:border-zinc-800/80 text-left space-y-16">
      {/* How to use - Square Cards on Desktop */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
            Tutorial
          </span>
          <span className="text-slate-500 dark:text-zinc-500 text-xs">• 3 Quick Steps</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-3">
          How to Use {data.shortName}
        </h2>
        <p className="text-slate-600 dark:text-zinc-400 text-sm md:text-base max-w-3xl mb-8 leading-relaxed">
          Follow these simple steps to process your files in seconds without installing any software or uploading to third-party clouds.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.steps.map((step) => (
            <div
              key={step.step}
              className="relative p-6 sm:p-7 rounded-2xl md:rounded-3xl bg-white dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800 hover:border-blue-500/40 dark:hover:border-blue-500/40 shadow-sm hover:shadow-xl transition-all duration-300 md:aspect-square flex flex-col justify-between group"
            >
              <div>
                <div className="w-11 h-11 rounded-2xl bg-blue-50 dark:bg-gradient-to-br dark:from-blue-500/20 dark:to-cyan-500/20 border border-blue-200 dark:border-blue-500/30 flex items-center justify-center font-bold text-base text-blue-600 dark:text-cyan-400 mb-5 group-hover:scale-110 transition-transform">
                  {step.step}
                </div>
                <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white mb-2.5 tracking-tight">
                  {step.title}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 leading-relaxed font-normal">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Features Grid - Square Boxes on Desktop */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            Advantages
          </span>
          <span className="text-slate-500 dark:text-zinc-500 text-xs">• 100% Free & Unlimited</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-3">
          Key Features & Privacy Highlights
        </h2>
        <p className="text-slate-600 dark:text-zinc-400 text-sm md:text-base max-w-3xl mb-8 leading-relaxed">
          Engineered for privacy, lightning speed, and maximum fidelity across all desktop and mobile browsers.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.features.map((feature, idx) => {
            const icons = [ShieldCheck, Zap, Sparkles, CheckCircle2];
            const IconComponent = icons[idx % icons.length];
            return (
              <div
                key={feature.title}
                className="p-6 rounded-2xl md:rounded-3xl bg-white dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800 hover:border-emerald-500/40 dark:hover:border-emerald-500/40 shadow-sm hover:shadow-xl transition-all duration-300 sm:aspect-square flex flex-col justify-between group"
              >
                <div>
                  <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-zinc-800 border border-emerald-100 dark:border-zinc-700/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-4 group-hover:scale-110 transition-transform">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2 tracking-tight">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed font-normal">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recommended Guides & Articles (Internal SEO Backlinks) */}
      {displayGuides.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
              Knowledge Base
            </span>
            <span className="text-slate-500 dark:text-zinc-500 text-xs">• Step-by-Step Guides</span>
          </div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Related How-To Guides
            </h2>
            <Link 
              href="/guides" 
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
            >
              <span>View all guides</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {displayGuides.map((guide) => (
              <Link
                key={guide.slug}
                href={`/guides/${guide.slug}`}
                className="p-6 rounded-2xl md:rounded-3xl bg-white dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800 hover:border-blue-500/50 hover:bg-slate-50 dark:hover:bg-zinc-800/30 shadow-sm hover:shadow-xl transition-all duration-300 md:aspect-square flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center gap-2 mb-3 text-xs text-slate-500 dark:text-zinc-400">
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-300 font-medium text-[10px]">
                      {guide.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {guide.readingTime}
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base md:text-lg mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                    {guide.title}
                  </h3>
                </div>
                <div>
                  <p className="text-xs text-slate-600 dark:text-zinc-400 line-clamp-2 leading-relaxed mb-4">
                    {guide.description}
                  </p>
                  <div className="pt-3 border-t border-slate-100 dark:border-zinc-800 flex items-center justify-between text-xs font-semibold text-blue-600 dark:text-blue-400">
                    <span className="flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5" />
                      Read Guide
                    </span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* FAQs Section */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
            Questions
          </span>
          <span className="text-slate-500 dark:text-zinc-500 text-xs">• Instant Answers</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-3 flex items-center gap-2">
          <HelpCircle className="w-6 h-6 text-purple-600 dark:text-purple-400 inline" />
          Frequently Asked Questions
        </h2>
        <p className="text-slate-600 dark:text-zinc-400 text-sm md:text-base max-w-3xl mb-8 leading-relaxed">
          Common queries about processing speeds, device privacy, and file limits.
        </p>

        <div className="space-y-4">
          {data.faqs.map((faq) => (
            <div
              key={faq.question}
              className="p-6 rounded-2xl bg-white dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800 hover:border-slate-300 dark:hover:border-zinc-700 shadow-xs transition-colors"
            >
              <h3 className="text-base md:text-lg font-bold text-slate-900 dark:text-zinc-100 mb-2">
                {faq.question}
              </h3>
              <p className="text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Related Tools - Square Cards on Desktop */}
      {relatedTools.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
              Explore More
            </span>
            <span className="text-slate-500 dark:text-zinc-500 text-xs">• Cross-Utility Navigation</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-3">
            Related Online Utilities
          </h2>
          <p className="text-slate-600 dark:text-zinc-400 text-sm md:text-base max-w-3xl mb-8 leading-relaxed">
            Discover other high-speed, browser-based web tools to streamline your digital workflow.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {relatedTools.map((related) => {
              const CategoryIcon = categoryIcons[related.category] || Layers;
              return (
                <Link
                  key={related.slug}
                  href={`/tools/${related.slug}`}
                  className="p-6 rounded-2xl md:rounded-3xl bg-white dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800 hover:border-blue-500/50 hover:bg-slate-50 dark:hover:bg-zinc-800/30 shadow-sm hover:shadow-xl transition-all duration-300 sm:aspect-square flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-9 h-9 rounded-2xl bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700/60 flex items-center justify-center text-slate-700 dark:text-zinc-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        <CategoryIcon className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-zinc-800/80 text-slate-600 dark:text-zinc-400 border border-slate-200 dark:border-transparent">
                        {related.category}
                      </span>
                    </div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex items-center gap-1">
                      {related.shortName}
                    </h3>
                  </div>
                  <div>
                    <p className="text-xs text-slate-600 dark:text-zinc-400 line-clamp-2 leading-relaxed mb-3">
                      {related.intro}
                    </p>
                    <div className="flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
                      <span>Launch Tool</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}
