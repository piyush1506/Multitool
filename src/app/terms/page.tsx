import { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import Link from "next/link";
import { FileText, CheckCircle2, AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service | pkctechs Multitool",
  description:
    "Terms of Service for pkctechs. Read our terms regarding the fair usage of our free online utilities and intellectual property policies.",
  alternates: {
    canonical: "https://pkctechs.in/terms",
  },
};

export default function TermsOfServicePage() {
  return (
    <div className="container mx-auto px-6 py-16 max-w-4xl relative z-10 text-left">
      <Breadcrumbs items={[{ name: "Terms of Service" }]} />

      <div className="mb-10 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 mb-4">
          <FileText className="w-3.5 h-3.5" />
          <span>Effective: March 2026</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4">
          Terms of Service
        </h1>
        <p className="text-slate-600 dark:text-zinc-400 text-base leading-relaxed">
          Welcome to pkctechs. By accessing or using our website and tools at https://pkctechs.in, you agree to be bound by the following terms and conditions.
        </p>
      </div>

      <div className="space-y-8 text-slate-700 dark:text-zinc-300 text-sm sm:text-base leading-relaxed">
        <section className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800 shadow-xs">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            1. Use of Free Online Utilities
          </h2>
          <p className="mb-3">
            pkctechs grants you a non-exclusive, revocable, non-transferable license to use our online image, PDF, document, YouTube download, and developer tools for personal, academic, and commercial purposes.
          </p>
          <p>
            You agree not to use our tools for any unlawful activities, malicious automation, denial-of-service attempts, or distribution of copyrighted material without authorization.
          </p>
        </section>

        <section className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800 shadow-xs">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            2. Disclaimer of Warranties
          </h2>
          <p className="mb-3">
            Our tools and services are provided on an &ldquo;as-is&rdquo; and &ldquo;as-available&rdquo; basis without warranties of any kind, whether express or implied. While we strive for 100% accuracy and maximum fidelity in file processing, pkctechs shall not be liable for any data loss, file corruption, or business interruption.
          </p>
        </section>

        <section className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800 shadow-xs">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
            3. Intellectual Property & Advertisements
          </h2>
          <p className="mb-3">
            All brand elements, logos, designs, and software interfaces of pkctechs are protected by intellectual property laws. We display advertisements via Google AdSense to keep our services 100% free for everyone.
          </p>
          <p>
            For questions regarding these terms, please contact us via our{" "}
            <Link href="/contact" className="text-blue-600 dark:text-blue-400 underline font-semibold">
              Contact Page
            </Link>.
          </p>
        </section>
      </div>
    </div>
  );
}
