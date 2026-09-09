import { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import Link from "next/link";
import { ShieldCheck, Lock, Cookie, Eye } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | pkctechs Multitool",
  description:
    "Privacy Policy for pkctechs. Learn how we handle your data, our client-side processing architecture, and our advertising disclosure including Google AdSense cookies.",
  alternates: {
    canonical: "https://pkctechs.in/privacy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-6 py-16 max-w-4xl relative z-10 text-left">
      <Breadcrumbs items={[{ name: "Privacy Policy" }]} />

      <div className="mb-10 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 mb-4">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Last Updated: March 2026</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4">
          Privacy Policy
        </h1>
        <p className="text-slate-600 dark:text-zinc-400 text-base leading-relaxed">
          At pkctechs (accessible from https://pkctechs.in), the privacy of our visitors is of utmost importance to us. This document outlines the types of information that is collected and recorded by pkctechs and how we use it.
        </p>
      </div>

      <div className="space-y-10 text-slate-700 dark:text-zinc-300 text-sm sm:text-base leading-relaxed">
        {/* Section 1 */}
        <section className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800 shadow-xs">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
            <Lock className="w-5 h-5 text-emerald-500" />
            1. 100% Client-Side In-Browser Processing
          </h2>
          <p className="mb-3">
            pkctechs is designed from the ground up as a privacy-first utility suite. Most of our tools (including PDF compression, PDF merging, image conversion, image resizing, background removal, and data formatting) operate <strong>100% locally inside your web browser</strong> using client-side JavaScript, WebAssembly, and HTML5 Canvas APIs.
          </p>
          <p>
            Your confidential files, photos, PDFs, passwords, and data are <strong>never uploaded to our servers</strong>, stored in databases, or reviewed by humans. Once you close your browser tab, memory is instantly cleared.
          </p>
        </section>

        {/* Section 2: AdSense Mandatory Disclosure */}
        <section className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800 shadow-xs">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
            <Cookie className="w-5 h-5 text-blue-500" />
            2. Google AdSense & Advertising Cookies
          </h2>
          <p className="mb-3">
            We use Google AdSense and third-party advertising partners to serve advertisements when you visit our website. These companies may use cookies, web beacons, and similar tracking technologies to collect non-personal information (such as your browser type, device type, time of visit, and pages viewed) in order to provide advertisements about goods and services of interest to you.
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-slate-600 dark:text-zinc-400">
            <li>
              <strong>Third-Party Vendor Cookies:</strong> Google, as a third-party vendor, uses cookies to serve ads on pkctechs.
            </li>
            <li>
              <strong>DoubleClick DART Cookie:</strong> Google's use of advertising cookies enables it and its partners to serve ads to our users based on their visits to pkctechs and other sites on the Internet.
            </li>
            <li>
              <strong>Opt-Out:</strong> Users may opt out of personalized advertising by visiting{" "}
              <a
                href="https://www.google.com/settings/ads"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 underline font-semibold"
              >
                Google Ads Settings
              </a>{" "}
              or by visiting{" "}
              <a
                href="https://www.aboutads.info/choices/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 underline font-semibold"
              >
                www.aboutads.info
              </a>.
            </li>
          </ul>
        </section>

        {/* Section 3: Analytics */}
        <section className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800 shadow-xs">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
            <Eye className="w-5 h-5 text-purple-500" />
            3. Log Files & Analytics
          </h2>
          <p className="mb-3">
            Like many other websites, pkctechs uses standard log files and Google Analytics to understand website traffic trends and improve user experience. The information collected includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date/time stamps, referring/exit pages, and number of clicks.
          </p>
          <p>
            This data is not linked to any personally identifiable information and is used exclusively for site maintenance, speed optimization, and demographic analysis.
          </p>
        </section>

        {/* Section 4: GDPR & CCPA */}
        <section className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800 shadow-xs">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
            4. GDPR and CCPA Data Protection Rights
          </h2>
          <p className="mb-3">
            We respect your privacy rights under the General Data Protection Regulation (GDPR) and the California Consumer Privacy Act (CCPA):
          </p>
          <ul className="list-disc pl-6 space-y-1.5 text-slate-600 dark:text-zinc-400">
            <li>The right to access and receive information about your personal data.</li>
            <li>The right to rectification and erasure of personal records.</li>
            <li>The right to opt-out of the sale or sharing of personal data.</li>
          </ul>
        </section>

        {/* Section 5: Contact */}
        <section className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800 shadow-xs">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
            5. Contact Information
          </h2>
          <p>
            If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us at{" "}
            <a href="mailto:support@pkctechs.in" className="text-blue-600 dark:text-blue-400 underline font-semibold">
              support@pkctechs.in
            </a>{" "}
            or visit our{" "}
            <Link href="/contact" className="text-blue-600 dark:text-blue-400 underline font-semibold">
              Contact Page
            </Link>.
          </p>
        </section>
      </div>
    </div>
  );
}
