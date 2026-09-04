import Link from "next/link";
import { toolsSeoData } from "@/data/toolsSeoData";
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
  Wrench
} from "lucide-react";

interface ToolSeoSectionProps {
  toolSlug: string;
}

const categoryIcons = {
  Image: ImageIcon,
  PDF: FileText,
  Developer: Cpu,
  Utility: Wrench,
};

export function ToolSeoSection({ toolSlug }: ToolSeoSectionProps) {
  const data = toolsSeoData[toolSlug];
  if (!data) return null;

  const relatedTools = data.relatedSlugs
    .map((slug) => toolsSeoData[slug])
    .filter(Boolean);

  return (
    <section className="mt-20 pt-12 border-t border-zinc-800/80 text-left space-y-16">
      {/* How to use */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
            Tutorial
          </span>
          <span className="text-zinc-500 text-xs">• 3 Quick Steps</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-3">
          How to Use {data.shortName}
        </h2>
        <p className="text-zinc-400 text-sm md:text-base max-w-3xl mb-8 leading-relaxed">
          Follow these simple steps to process your files in seconds without installing any software or uploading to third-party clouds.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.steps.map((step) => (
            <div
              key={step.step}
              className="relative p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800/80 hover:border-zinc-700/80 transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 flex items-center justify-center font-bold text-cyan-400 mb-4 group-hover:scale-110 transition-transform">
                {step.step}
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Features Grid */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            Advantages
          </span>
          <span className="text-zinc-500 text-xs">• 100% Free & Unlimited</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-3">
          Key Features & Privacy Highlights
        </h2>
        <p className="text-zinc-400 text-sm md:text-base max-w-3xl mb-8 leading-relaxed">
          Engineered for privacy, lightning speed, and maximum fidelity across all desktop and mobile browsers.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.features.map((feature, idx) => {
            const icons = [ShieldCheck, Zap, Sparkles, CheckCircle2];
            const IconComponent = icons[idx % icons.length];
            return (
              <div
                key={feature.title}
                className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/60 hover:border-zinc-700 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-9 h-9 rounded-lg bg-zinc-800/80 border border-zinc-700/50 flex items-center justify-center text-blue-400 mb-4">
                    <IconComponent className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-semibold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* FAQs Section */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/20">
            Questions
          </span>
          <span className="text-zinc-500 text-xs">• Instant Answers</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-3 flex items-center gap-2">
          <HelpCircle className="w-6 h-6 text-purple-400 inline" />
          Frequently Asked Questions
        </h2>
        <p className="text-zinc-400 text-sm md:text-base max-w-3xl mb-8 leading-relaxed">
          Common queries about processing speeds, device privacy, and file limits.
        </p>

        <div className="space-y-4">
          {data.faqs.map((faq) => (
            <div
              key={faq.question}
              className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/60 hover:border-zinc-700/80 transition-colors"
            >
              <h3 className="text-base md:text-lg font-semibold text-zinc-100 mb-2">
                {faq.question}
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Related Tools Internal Linking */}
      {relatedTools.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              Explore More
            </span>
            <span className="text-zinc-500 text-xs">• Cross-Utility Navigation</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-3">
            Related Online Utilities
          </h2>
          <p className="text-zinc-400 text-sm md:text-base max-w-3xl mb-8 leading-relaxed">
            Discover other high-speed, browser-based web tools to streamline your digital workflow.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {relatedTools.map((related) => {
              const CategoryIcon = categoryIcons[related.category] || Layers;
              return (
                <Link
                  key={related.slug}
                  href={`/tools/${related.slug}`}
                  className="p-5 rounded-2xl bg-zinc-900/40 border border-zinc-800/70 hover:border-blue-500/50 hover:bg-zinc-800/30 transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-8 h-8 rounded-lg bg-zinc-800 border border-zinc-700/60 flex items-center justify-center text-zinc-300 group-hover:text-blue-400 transition-colors">
                        <CategoryIcon className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-zinc-800/80 text-zinc-400">
                        {related.category}
                      </span>
                    </div>
                    <h3 className="font-semibold text-white text-sm mb-1.5 group-hover:text-blue-400 transition-colors flex items-center gap-1">
                      {related.shortName}
                    </h3>
                    <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                      {related.intro}
                    </p>
                  </div>
                  <div className="mt-4 flex items-center gap-1 text-xs font-medium text-blue-400/90 group-hover:text-blue-300 transition-colors">
                    <span>Try tool</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
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
