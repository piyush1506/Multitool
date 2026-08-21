"use client";

import React, { useState } from "react";
import { Code, Copy, Check, Minimize2, Sparkles, AlertCircle } from "lucide-react";

export default function JsonFormatterClient() {
  const [input, setInput] = useState<string>('{"name":"pkctechs","tools":19,"active":true}');
  const [output, setOutput] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const formatJson = (indent: number) => {
    setError(null);
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, indent));
    } catch (err: any) {
      setError(err.message);
      setOutput("");
    }
  };

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-5xl mx-auto">
      <div className="glass-panel rounded-3xl p-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex gap-3">
          <button
            onClick={() => formatJson(2)}
            className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold py-2.5 px-5 rounded-xl shadow-md hover:scale-[1.02] active:scale-95 transition-all text-xs"
          >
            <Sparkles className="h-4 w-4" /> Beautify (2 Spaces)
          </button>
          <button
            onClick={() => formatJson(0)}
            className="flex items-center gap-2 bg-slate-800 dark:bg-zinc-800 text-white font-semibold py-2.5 px-5 rounded-xl border border-slate-700 dark:border-white/10 hover:bg-slate-700 text-xs"
          >
            <Minimize2 className="h-4 w-4" /> Minify
          </button>
        </div>

        {output && (
          <button
            onClick={handleCopy}
            className="p-2.5 rounded-xl bg-slate-200 dark:bg-zinc-800 text-slate-800 dark:text-zinc-200 hover:text-slate-900 dark:hover:text-white text-xs font-semibold flex items-center gap-1.5"
          >
            {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
            {copied ? "Copied to Clipboard!" : "Copy Result"}
          </button>
        )}
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm flex items-center gap-2 font-mono">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <span>Invalid JSON: {error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-panel rounded-3xl p-6 flex flex-col gap-3">
          <label className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400">
            Raw JSON Input
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={14}
            placeholder="Paste unformatted JSON here..."
            className="w-full bg-slate-100 dark:bg-zinc-950/60 border border-slate-200 dark:border-white/5 rounded-2xl p-4 text-xs font-mono text-slate-800 dark:text-zinc-200 focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="glass-panel rounded-3xl p-6 flex flex-col gap-3">
          <label className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400">
            Formatted Output
          </label>
          <textarea
            value={output}
            readOnly
            rows={14}
            placeholder="Formatted JSON will appear here..."
            className="w-full bg-slate-100 dark:bg-zinc-950/60 border border-slate-200 dark:border-white/5 rounded-2xl p-4 text-xs font-mono text-slate-800 dark:text-zinc-200 focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}
