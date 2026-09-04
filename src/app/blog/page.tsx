import { Metadata } from "next";
import Link from "next/link";
import { blogPosts } from "@/data/blogData";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { 
  Sparkles, 
  Clock, 
  ArrowRight, 
  Tag, 
  TrendingUp, 
  BookOpen,
  CheckCircle2
} from "lucide-react";

export const metadata: Metadata = {
  title: "Blog & Insights | pkctechs Web Utilities & Productivity",
  description: "Explore in-depth articles on PDF manipulation, image optimization for SEO, web performance, and browser-based developer tools.",
  alternates: {
    canonical: "https://pkctechs.in/blog",
  },
  openGraph: {
    title: "Blog & Insights | pkctechs",
    description: "Explore in-depth articles on PDF manipulation, image optimization for SEO, and web developer tools.",
    url: "https://pkctechs.in/blog",
    siteName: "pkctechs Blog",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog & Insights | pkctechs",
    description: "Insights on PDF tools, image optimization, and web performance.",
  },
};

export default function BlogIndexPage() {
  const posts = Object.values(blogPosts);
  const featuredPost = posts[0];
  const remainingPosts = posts.slice(1);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "pkctechs Blog & Insights",
      "url": "https://pkctechs.in/blog",
      "description": "Guides, benchmarks, and tutorials on PDF editing, image optimization, and web performance.",
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
      ],
    },
  ];

  return (
    <div className="container mx-auto px-6 py-16 max-w-6xl relative z-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Breadcrumbs items={[{ name: "Blog" }]} />

      {/* Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold mb-4">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Knowledge Hub</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 gradient-text">
          Articles & Insights
        </h1>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto font-light leading-relaxed">
          Actionable tutorials, comparisons, and performance benchmarks to help you get the most out of online web utilities.
        </p>
      </div>

      {/* Featured Post */}
      {featuredPost && (
        <div className="mb-14">
          <Link
            href={`/blog/${featuredPost.slug}`}
            className="block p-8 md:p-12 rounded-3xl bg-gradient-to-br from-zinc-900/80 via-zinc-900/50 to-zinc-950/80 border border-blue-500/30 hover:border-blue-500/60 transition-all group relative overflow-hidden shadow-2xl shadow-blue-500/5"
          >
            <div className="flex flex-wrap items-center gap-3 text-xs mb-4">
              <span className="px-3 py-1 rounded-full font-bold bg-blue-600 text-white shadow-sm">
                Featured
              </span>
              <span className="px-3 py-1 rounded-full font-medium bg-zinc-800 text-zinc-300">
                {featuredPost.category}
              </span>
              <span className="flex items-center gap-1 text-zinc-400">
                <Clock className="w-3.5 h-3.5" /> {featuredPost.readingTime}
              </span>
            </div>

            <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-4 group-hover:text-blue-400 transition-colors leading-tight">
              {featuredPost.title}
            </h2>

            <p className="text-zinc-400 text-base md:text-lg mb-8 max-w-3xl leading-relaxed">
              {featuredPost.description}
            </p>

            <div className="flex items-center gap-2 text-sm font-semibold text-blue-400 group-hover:text-blue-300 transition-colors">
              <span>Read Full Article</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </div>
          </Link>
        </div>
      )}

      {/* Remaining Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {remainingPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="p-8 rounded-3xl bg-zinc-900/40 border border-zinc-800/80 hover:border-zinc-700/80 hover:bg-zinc-800/20 transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between text-xs text-zinc-500 mb-4">
                <span className="px-2.5 py-0.5 rounded-full font-semibold bg-zinc-800 text-zinc-300">
                  {post.category}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> {post.readingTime}
                </span>
              </div>

              <h2 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors leading-snug">
                {post.title}
              </h2>

              <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                {post.description}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-6">
                {post.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] px-2 py-0.5 rounded-md bg-zinc-800/60 text-zinc-400"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between text-xs">
              <span className="text-blue-400 font-semibold flex items-center gap-1 group-hover:underline">
                Read Article
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </span>
              <span className="text-zinc-500">
                {post.publishedAt}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
