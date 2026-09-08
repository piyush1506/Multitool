"use client";

import React, { useState, useEffect } from "react";
import { FileText, Sparkles, Copy, Check, RefreshCw, Settings2, X, AlertCircle } from "lucide-react";

export default function TextSummarizerClient() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [customApiKey, setCustomApiKey] = useState("");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [activeAction, setActiveAction] = useState("summarize");

  useEffect(() => {
    try {
      const savedApiKey = localStorage.getItem("multitool_custom_gemini_key");
      if (savedApiKey) {
        setCustomApiKey(savedApiKey);
      }
    } catch (e) {}
  }, []);

  const handleSaveCustomApiKey = (key: string) => {
    setCustomApiKey(key);
    try {
      localStorage.setItem("multitool_custom_gemini_key", key.trim());
    } catch (e) {}
  };

  const handleProcess = async (action: string) => {
    if (!inputText.trim()) return;

    setActiveAction(action);
    setIsProcessing(true);
    setError(null);
    setOutputText("");

    try {
      const res = await fetch("/api/text-summarizer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: inputText.trim(),
          action,
          customApiKey: customApiKey.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to process text.");
      }

      setOutputText(data.result);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCopy = () => {
    if (!outputText) return;
    navigator.clipboard.writeText(outputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const actions = [
    { id: "summarize", label: "Summarize" },
    { id: "rewrite-professional", label: "Professional" },
    { id: "rewrite-casual", label: "Casual" },
    { id: "fix-grammar", label: "Fix Grammar" },
    { id: "extract-keywords", label: "Keywords" },
  ];

  return (
    <div className="flex flex-col gap-8 w-full max-w-6xl mx-auto pb-12">
      {/* Top Controls Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl glass-panel border border-[var(--panel-border)] shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 shadow-md">
            <FileText className="h-5 w-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-[var(--text-main)]">
                AI Text Assistant
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                <Sparkles className="h-3 w-3" /> Gemini 1.5 Flash
              </span>
            </div>
            <p className="text-xs text-[var(--text-muted)]">
              Summarize, rewrite, and fix grammar instantly.
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsSettingsOpen(!isSettingsOpen)}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium border border-[var(--panel-border)] bg-[var(--card-bg)] hover:bg-[var(--card-hover-bg)] text-[var(--text-main)] transition-colors shadow-sm"
        >
          <Settings2 className="h-4 w-4 text-blue-500" />
          <span>API Key</span>
          {customApiKey && <span className="h-2 w-2 rounded-full bg-blue-500" />}
        </button>
      </div>

      {isSettingsOpen && (
        <div className="p-6 rounded-2xl glass-panel border border-blue-500/30 bg-blue-500/[0.02] space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-[var(--text-main)] flex items-center gap-2">
              <Settings2 className="h-4 w-4 text-blue-500" /> API Settings
            </h3>
            <button onClick={() => setIsSettingsOpen(false)} className="p-1 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-main)]">
              <X className="h-4 w-4" />
            </button>
          </div>
          <div>
            <label className="block font-medium text-[var(--text-main)] mb-1 text-xs">
              Google AI Studio API Key (Gemini)
            </label>
            <input
              type="password"
              placeholder="AIzaSy..."
              value={customApiKey}
              onChange={(e) => handleSaveCustomApiKey(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-[var(--panel-border)] bg-[var(--card-bg)] text-[var(--text-main)] text-xs focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
      )}

      {/* Main Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="flex flex-col gap-4">
          <div className="p-4 rounded-3xl glass-panel border border-[var(--panel-border)] shadow-sm flex-1 flex flex-col">
            <div className="flex justify-between items-center mb-3 px-2">
              <label className="text-sm font-semibold text-[var(--text-main)]">Original Text</label>
              <span className="text-xs text-[var(--text-muted)]">{inputText.length} characters</span>
            </div>
            <textarea
              className="w-full flex-1 min-h-[300px] p-4 rounded-2xl border border-[var(--panel-border)] bg-[var(--card-bg)] text-[var(--text-main)] placeholder:text-[var(--text-muted)] text-sm focus:outline-none focus:border-blue-500 transition-all resize-none shadow-inner"
              placeholder="Paste your text here..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {actions.map((action) => (
              <button
                key={action.id}
                onClick={() => handleProcess(action.id)}
                disabled={isProcessing || !inputText.trim()}
                className={`flex-1 min-w-[120px] py-3 px-4 rounded-xl text-sm font-semibold text-white flex justify-center items-center gap-2 transition-all shadow-sm ${
                  isProcessing && activeAction === action.id
                    ? "bg-slate-600 cursor-not-allowed opacity-80"
                    : isProcessing || !inputText.trim()
                    ? "bg-slate-300 dark:bg-slate-700 cursor-not-allowed opacity-50 text-slate-500 dark:text-slate-400"
                    : "bg-blue-600 hover:bg-blue-500 active:scale-[0.98]"
                }`}
              >
                {isProcessing && activeAction === action.id ? (
                  <RefreshCw className="h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="h-4 w-4" />
                )}
                {action.label}
              </button>
            ))}
          </div>
        </div>

        {/* Output Section */}
        <div className="flex flex-col gap-4">
          <div className="p-4 rounded-3xl glass-panel border border-[var(--panel-border)] shadow-sm flex-1 flex flex-col relative overflow-hidden">
            <div className="flex justify-between items-center mb-3 px-2">
              <label className="text-sm font-semibold text-[var(--text-main)]">AI Result</label>
              {outputText && (
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-[var(--panel-border)] hover:bg-[var(--card-hover-bg)] text-[var(--text-main)] transition-colors"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                  {copied ? "Copied" : "Copy"}
                </button>
              )}
            </div>
            
            <div className="relative flex-1 rounded-2xl border border-[var(--panel-border)] bg-[var(--preview-bg)] overflow-y-auto">
              {isProcessing ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center gap-4 bg-white/50 dark:bg-black/50 backdrop-blur-sm z-10 rounded-2xl">
                   <div className="relative flex items-center justify-center">
                    <div className="h-12 w-12 rounded-full border-4 border-blue-500/20 border-t-blue-500 animate-spin" />
                  </div>
                  <div className="text-sm font-semibold text-[var(--text-main)] animate-pulse">
                    AI is thinking...
                  </div>
                </div>
              ) : null}

              {error ? (
                 <div className="m-4 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 flex items-start gap-2.5 text-sm">
                 <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
                 <p>{error}</p>
               </div>
              ) : outputText ? (
                <div className="p-5 text-sm text-[var(--text-main)] leading-relaxed whitespace-pre-wrap">
                  {outputText}
                </div>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center gap-3 text-[var(--text-muted)]">
                  <div className="h-14 w-14 rounded-2xl bg-[var(--card-bg)] border border-[var(--panel-border)] flex items-center justify-center shadow-sm">
                    <FileText className="h-6 w-6 opacity-40 text-blue-500" />
                  </div>
                  <div>
                    <span className="text-sm font-medium text-[var(--text-main)] block">
                      Waiting for input
                    </span>
                    <p className="text-xs max-w-[220px] mt-1 text-[var(--text-muted)]">
                      Paste text and select an action to generate results.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
