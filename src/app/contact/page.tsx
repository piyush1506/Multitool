import { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Mail, MessageSquare, Globe, Clock, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us | pkctechs Multitool",
  description:
    "Get in touch with the pkctechs team. Reach out for tool suggestions, technical support, feature requests, or business inquiries.",
  alternates: {
    canonical: "https://pkctechs.in/contact",
  },
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-6 py-16 max-w-4xl relative z-10 text-left">
      <Breadcrumbs items={[{ name: "Contact Us" }]} />

      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 mb-4">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>We'd Love to Hear From You</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4 gradient-text">
          Contact Us
        </h1>
        <p className="text-slate-600 dark:text-zinc-400 text-lg max-w-2xl mx-auto font-light leading-relaxed">
          Have a question, feedback, or a new tool idea? Reach out directly to our team.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-slate-700 dark:text-zinc-300 text-sm sm:text-base leading-relaxed">
        {/* Contact Info Card */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800 shadow-xs flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <Mail className="w-5 h-5 text-blue-500" />
              Direct Email
            </h2>
            <p className="text-sm text-slate-600 dark:text-zinc-400 mb-6">
              For bug reports, tool requests, advertising questions, or partnership inquiries:
            </p>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-800/60 border border-slate-200 dark:border-zinc-700/60">
              <span className="text-xs text-slate-500 dark:text-zinc-400 block mb-1">Official Support:</span>
              <a
                href="mailto:support@pkctechs.in"
                className="text-base font-bold text-blue-600 dark:text-blue-400 hover:underline"
              >
                support@pkctechs.in
              </a>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100 dark:border-zinc-800/60 space-y-2 text-xs text-slate-500 dark:text-zinc-400">
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-emerald-500" />
              <span>Response Time: Typically within 24-48 hours</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-3.5 h-3.5 text-blue-500" />
              <span>Website: https://pkctechs.in</span>
            </div>
          </div>
        </div>

        {/* Quick Guidelines */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800 shadow-xs">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            Support Guidelines
          </h2>
          <ul className="space-y-4 text-xs sm:text-sm text-slate-600 dark:text-zinc-400">
            <li className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold shrink-0 mt-0.5 text-xs">1</span>
              <div>
                <strong className="text-slate-900 dark:text-white block">Bug Reports:</strong>
                Include your browser name (Chrome, Safari, Firefox), device type, and the tool URL.
              </div>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold shrink-0 mt-0.5 text-xs">2</span>
              <div>
                <strong className="text-slate-900 dark:text-white block">Tool Requests:</strong>
                Suggest any file converters, editors, or calculators you want us to add next!
              </div>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold shrink-0 mt-0.5 text-xs">3</span>
              <div>
                <strong className="text-slate-900 dark:text-white block">Advertising:</strong>
                All ad placements comply strictly with Google AdSense terms and policies.
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
