import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { blogPosts } from "@/data/blogData";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { 
  Clock, 
  Calendar, 
  ArrowRight, 
  CheckCircle2, 
  Wrench, 
  Sparkles, 
  HelpCircle,
  User,
  Share2
} from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(blogPosts).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts[slug];
  if (!post) return {};

  return {
    title: `${post.metaTitle} | pkctechs`,
    description: post.description,
    keywords: post.tags,
    alternates: {
      canonical: `https://pkctechs.in/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://pkctechs.in/blog/${post.slug}`,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts[slug];

  if (!post) {
    notFound();
  }

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.description,
      "datePublished": post.publishedAt,
      "author": {
        "@type": "Person",
        "name": post.author,
      },
      "publisher": {
        "@type": "Organization",
        "name": "pkctechs",
        "url": "https://pkctechs.in",
      },
      "mainEntityOfPage": `https://pkctechs.in/blog/${post.slug}`,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://pkctechs.in",
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Blog",
          "item": "https://pkctechs.in/blog",
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": post.title,
          "item": `https://pkctechs.in/blog/${post.slug}`,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": post.faqs.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer,
        },
      })),
    },
  ];

  return (
    <article className="container mx-auto px-6 py-16 max-w-4xl relative z-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Breadcrumbs
        items={[
          { name: "Blog", href: "/blog" },
          { name: post.title },
        ]}
      />

      {/* Article Header */}
      <header className="mb-12 border-b border-zinc-800/80 pb-10">
        <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-400 mb-4">
          <span className="px-3 py-1 rounded-full font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
            {post.category}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {post.readingTime}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            {post.publishedAt}
          </span>
        </div>

        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-6 leading-tight">
          {post.title}
        </h1>

        <p className="text-lg md:text-xl text-zinc-300 font-light leading-relaxed mb-6">
          {post.description}
        </p>

        <div className="flex items-center gap-3 text-sm text-zinc-400">
          <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-300 font-semibold text-xs">
            <User className="w-4 h-4 text-blue-400" />
          </div>
          <div>
            <div className="text-white font-medium text-xs">Written by {post.author}</div>
            <div className="text-zinc-500 text-[11px]">Published on pkctechs</div>
          </div>
        </div>
      </header>

      {/* Key Takeaways Box */}
      {post.keyTakeaways.length > 0 && (
        <div className="p-8 rounded-3xl bg-gradient-to-br from-blue-500/10 via-zinc-900/60 to-zinc-900/60 border border-blue-500/30 mb-12 shadow-xl shadow-blue-500/5">
          <div className="flex items-center gap-2 text-blue-400 font-bold text-base md:text-lg mb-4">
            <Sparkles className="w-5 h-5" />
            <h2>Key Takeaways</h2>
          </div>
          <ul className="space-y-3">
            {post.keyTakeaways.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3 text-sm md:text-base text-zinc-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-1 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Body Sections */}
      <div className="space-y-12 text-zinc-300 leading-relaxed text-base md:text-lg">
        {post.sections.map((section, sIdx) => (
          <section key={section.heading} className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              {section.heading}
            </h2>

            {section.paragraphs.map((para, pIdx) => (
              <p key={pIdx} className="text-zinc-300 text-sm md:text-base leading-relaxed">
                {para}
              </p>
            ))}

            {section.bulletPoints && section.bulletPoints.length > 0 && (
              <ul className="space-y-2.5 my-4 pl-4 border-l-2 border-blue-500/40">
                {section.bulletPoints.map((bullet, bIdx) => (
                  <li key={bIdx} className="text-sm md:text-base text-zinc-300">
                    {bullet}
                  </li>
                ))}
              </ul>
            )}

            {/* In-Article Tool Conversion Banner */}
            {section.calloutTool && (
              <div className="my-8 p-6 rounded-2xl bg-zinc-900/70 border border-zinc-800 hover:border-blue-500/50 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-400">
                    <Wrench className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-white font-bold text-base">
                      Try {section.calloutTool.name} Online
                    </div>
                    <div className="text-xs text-zinc-400 max-w-md">
                      {section.calloutTool.description}
                    </div>
                  </div>
                </div>
                <Link
                  href={`/tools/${section.calloutTool.slug}`}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-2 transition-colors whitespace-nowrap shadow-md shadow-blue-500/20"
                >
                  <span>Use Tool Free</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}
          </section>
        ))}

        {/* FAQs */}
        {post.faqs.length > 0 && (
          <section className="mt-14 pt-10 border-t border-zinc-800/80">
            <div className="flex items-center gap-2 text-purple-400 font-bold text-xl mb-6">
              <HelpCircle className="w-6 h-6" />
              <h2>Frequently Asked Questions</h2>
            </div>
            <div className="space-y-4">
              {post.faqs.map((faq) => (
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

        {/* Tags */}
        <div className="pt-8 border-t border-zinc-800/80 flex flex-wrap items-center gap-2">
          <span className="text-xs text-zinc-500 mr-2">Tags:</span>
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-3 py-1 rounded-full bg-zinc-800/80 text-zinc-300 border border-zinc-700/50"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Back to Blog CTA */}
        <div className="mt-12 text-center p-10 rounded-3xl bg-zinc-900/50 border border-zinc-800/80">
          <h2 className="text-2xl font-bold text-white mb-3">
            Explore All 19 Free Utilities
          </h2>
          <p className="text-zinc-400 text-sm max-w-lg mx-auto mb-6">
            Convert, compress, and process your PDFs, images, and developer datasets directly in your browser.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/"
              className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all shadow-lg shadow-blue-500/20"
            >
              Browse All Tools
            </Link>
            <Link
              href="/blog"
              className="px-6 py-3 rounded-2xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-semibold text-sm transition-all"
            >
              More Articles
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
