"use client";

import React, { useState } from "react";
import { Binary, Copy, Check, ArrowRightLeft } from "lucide-react";

export default function Base64Client() {
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [input, setInput] = useState<string>("Hello World!");
  const [output, setOutput] = useState<string>("SGVsbG8gV29ybGQh");
  const [copied, setCopied] = useState<boolean>(false);

  const handleProcess = () => {
    try {
      if (mode === "encode") {
        setOutput(btoa(input));
      } else {
        setOutput(atob(input));
      }
    } catch (err) {
      setOutput("Error: Invalid input string for Base64 decoding.");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-5xl mx-auto">
      <div className="glass-panel rounded-3xl p-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-slate-700 dark:text-zinc-300">Mode:</span>
          <div className="flex bg-slate-200 dark:bg-zinc-800 p-1 rounded-xl">
            <button
              onClick={() => { setMode("encode"); setOutput(""); }}
              className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${
                mode === "encode" ? "bg-emerald-500 text-white shadow-sm" : "text-slate-600 dark:text-zinc-400"
              }`}
            >
              Encode
            </button>
            <button
              onClick={() => { setMode("decode"); setOutput(""); }}
              className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${
                mode === "decode" ? "bg-emerald-500 text-white shadow-sm" : "text-slate-600 dark:text-zinc-400"
              }`}
            >
              Decode
            </button>
          </div>
        </div>

        <button
          onClick={handleProcess}
          className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold py-2.5 px-6 rounded-xl shadow-md hover:scale-[1.02] active:scale-95 transition-all"
        >
          <ArrowRightLeft className="h-4 w-4" /> Process
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-panel rounded-3xl p-6 flex flex-col gap-3">
          <label className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400">
            {mode === "encode" ? "Plain Text Input" : "Base64 Input"}
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={10}
            className="w-full bg-slate-100 dark:bg-zinc-950/60 border border-slate-200 dark:border-white/5 rounded-2xl p-4 text-xs font-mono text-slate-800 dark:text-zinc-200 focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="glass-panel rounded-3xl p-6 flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <label className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400">
              {mode === "encode" ? "Base64 Result" : "Decoded Text"}
            </label>
            {output && (
              <button
                onClick={handleCopy}
                className="p-2 rounded-lg bg-slate-200 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white text-xs font-medium flex items-center gap-1"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                {copied ? "Copied!" : "Copy"}
              </button>
            )}
          </div>
          <textarea
            value={output}
            readOnly
            rows={10}
            className="w-full bg-slate-100 dark:bg-zinc-950/60 border border-slate-200 dark:border-white/5 rounded-2xl p-4 text-xs font-mono text-slate-800 dark:text-zinc-200 focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}
