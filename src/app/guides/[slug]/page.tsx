import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { guidesData } from "@/data/guidesData";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { 
  Clock, 
  Calendar, 
  ArrowRight, 
  CheckCircle, 
  Wrench, 
  Lightbulb, 
  HelpCircle 
} from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(guidesData).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = guidesData[slug];
  if (!guide) return {};

  return {
    title: `${guide.metaTitle} | pkctechs`,
    description: guide.description,
    alternates: {
      canonical: `https://pkctechs.in/guides/${guide.slug}`,
    },
    openGraph: {
      title: guide.title,
      description: guide.description,
      url: `https://pkctechs.in/guides/${guide.slug}`,
      type: "article",
      publishedTime: guide.publishDate,
    },
    twitter: {
      card: "summary_large_image",
      title: guide.title,
      description: guide.description,
    },
  };
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = guidesData[slug];

  if (!guide) {
    notFound();
  }

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "TechArticle",
      "headline": guide.title,
      "description": guide.description,
      "datePublished": guide.publishDate,
      "author": {
        "@type": "Organization",
        "name": "pkctechs",
        "url": "https://pkctechs.in"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://pkctechs.in"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Guides",
          "item": "https://pkctechs.in/guides"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": guide.title,
          "item": `https://pkctechs.in/guides/${guide.slug}`
        }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": guide.faqs.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    }
  ];

  return (
    <article className="container mx-auto px-6 py-16 max-w-4xl relative z-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Breadcrumbs
        items={[
          { name: "Guides", href: "/guides" },
          { name: guide.title },
        ]}
      />

      {/* Header */}
      <header className="mb-12 border-b border-zinc-800/80 pb-10">
        <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-400 mb-4">
          <span className="px-2.5 py-0.5 rounded-full font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
            {guide.category} Guide
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {guide.readingTime}
          </span>
        </div>

        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-6 leading-tight">
          {guide.title}
        </h1>

        <p className="text-lg md:text-xl text-zinc-300 font-light leading-relaxed mb-8">
          {guide.description}
        </p>

        {/* Callout box to tool */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-500/10 via-cyan-500/10 to-transparent border border-blue-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-400">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-blue-400 font-bold">
                Online Utility
              </div>
              <div className="text-white font-semibold text-base">
                Try the free {guide.toolName}
              </div>
            </div>
          </div>
          <Link
            href={`/tools/${guide.toolSlug}`}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold flex items-center gap-2 transition-colors shadow-lg shadow-blue-500/20"
          >
            <span>Open Tool</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </header>

      {/* Main Content Sections */}
      <div className="space-y-12 text-zinc-300 leading-relaxed text-base md:text-lg">
        {guide.sections.map((section) => (
          <section key={section.heading} className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              {section.heading}
            </h2>
            {section.content.map((paragraph, pIdx) => (
              <p key={pIdx} className="text-zinc-300 text-sm md:text-base leading-relaxed">
                {paragraph}
              </p>
            ))}
          </section>
        ))}

        {/* Tips Box */}
        {guide.tips.length > 0 && (
          <div className="p-8 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 my-10">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-lg mb-4">
              <Lightbulb className="w-5 h-5" />
              <h3>Expert Tips & Best Practices</h3>
            </div>
            <ul className="space-y-3">
              {guide.tips.map((tip, tIdx) => (
                <li key={tIdx} className="flex items-start gap-3 text-sm md:text-base text-zinc-300">
                  <CheckCircle className="w-4 h-4 text-emerald-400 mt-1 flex-shrink-0" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* FAQs */}
        {guide.faqs.length > 0 && (
          <section className="mt-14 pt-10 border-t border-zinc-800/80">
            <div className="flex items-center gap-2 text-purple-400 font-bold text-xl mb-6">
              <HelpCircle className="w-6 h-6" />
              <h2>Frequently Asked Questions</h2>
            </div>
            <div className="space-y-4">
              {guide.faqs.map((faq) => (
                <div
                  key={faq.question}
                  className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/80"
                >
                  <h3 className="text-base md:text-lg font-semibold text-white mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Bottom CTA */}
        <div className="mt-16 text-center p-10 rounded-3xl bg-gradient-to-b from-zinc-900/60 to-zinc-950/90 border border-zinc-800/80">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Ready to process your files?
          </h2>
          <p className="text-zinc-400 text-sm max-w-xl mx-auto mb-6">
            Use the free {guide.toolName} right in your browser. 100% private, instant, and unlimited.
          </p>
          <Link
            href={`/tools/${guide.toolSlug}`}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold transition-all shadow-xl shadow-blue-500/20"
          >
            <span>Launch {guide.toolName}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
