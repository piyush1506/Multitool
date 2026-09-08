"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search, Sparkles, UploadCloud, Copy, Check, RefreshCw, Settings2, X, AlertCircle, ImageIcon, Type } from "lucide-react";
import { useDropzone } from "react-dropzone";

export default function ImageAnalyzerClient() {
  const [image, setImage] = useState<{ url: string; base64: string; mimeType: string } | null>(null);
  const [outputText, setOutputText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [customApiKey, setCustomApiKey] = useState("");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [activeAction, setActiveAction] = useState("describe");
  const [customPrompt, setCustomPrompt] = useState("");

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

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      const reader = new FileReader();
      
      reader.onload = (e) => {
        if (e.target && e.target.result) {
          const result = e.target.result as string;
          setImage({
            url: URL.createObjectURL(file),
            base64: result,
            mimeType: file.type,
          });
          setOutputText("");
          setError(null);
        }
      };
      
      reader.readAsDataURL(file);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [".jpeg", ".jpg"],
      "image/png": [".png"],
      "image/webp": [".webp"],
    },
    maxFiles: 1,
  });

  const handleProcess = async (action: string) => {
    if (!image) return;

    setActiveAction(action);
    setIsProcessing(true);
    setError(null);
    setOutputText("");

    try {
      const res = await fetch("/api/image-analyzer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageBase64: image.base64,
          mimeType: image.mimeType,
          action,
          customPrompt: action === "custom" ? customPrompt : "",
          customApiKey: customApiKey.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to process image.");
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

  return (
    <div className="flex flex-col gap-8 w-full max-w-6xl mx-auto pb-12">
      {/* Top Controls Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl glass-panel border border-[var(--panel-border)] shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-cyan-600 via-blue-600 to-indigo-600 shadow-md">
            <Search className="h-5 w-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-[var(--text-main)]">
                AI Vision Analyzer
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-cyan-500/10 text-cyan-600 border border-cyan-500/20">
                <Sparkles className="h-3 w-3" /> Gemini Vision
              </span>
            </div>
            <p className="text-xs text-[var(--text-muted)]">
              Extract text, describe scenes, and generate alt-text from images.
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsSettingsOpen(!isSettingsOpen)}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium border border-[var(--panel-border)] bg-[var(--card-bg)] hover:bg-[var(--card-hover-bg)] text-[var(--text-main)] transition-colors shadow-sm"
        >
          <Settings2 className="h-4 w-4 text-cyan-500" />
          <span>API Key</span>
          {customApiKey && <span className="h-2 w-2 rounded-full bg-cyan-500" />}
        </button>
      </div>

      {isSettingsOpen && (
        <div className="p-6 rounded-2xl glass-panel border border-cyan-500/30 bg-cyan-500/[0.02] space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-[var(--text-main)] flex items-center gap-2">
              <Settings2 className="h-4 w-4 text-cyan-500" /> API Settings
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
              className="w-full px-3 py-2 rounded-xl border border-[var(--panel-border)] bg-[var(--card-bg)] text-[var(--text-main)] text-xs focus:outline-none focus:border-cyan-500"
            />
          </div>
        </div>
      )}

      {/* Main Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Image Upload & Actions */}
        <div className="flex flex-col gap-4">
          {image ? (
            <div className="p-4 rounded-3xl glass-panel border border-[var(--panel-border)] shadow-sm flex flex-col items-center">
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-[var(--preview-bg)] border border-[var(--panel-border)] shadow-inner mb-4 flex items-center justify-center">
                <img src={image.url} alt="Uploaded for analysis" className="max-w-full max-h-full object-contain" />
                <button
                  onClick={() => { setImage(null); setOutputText(""); setError(null); }}
                  className="absolute top-3 right-3 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white backdrop-blur-md transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  onClick={() => handleProcess("describe")}
                  disabled={isProcessing}
                  className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold flex justify-center items-center gap-2 transition-all shadow-sm ${
                    isProcessing && activeAction === "describe" ? "bg-slate-600 text-white cursor-not-allowed opacity-80" : isProcessing ? "bg-slate-300 dark:bg-slate-700 text-slate-500 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-500 active:scale-[0.98]"
                  }`}
                >
                  {isProcessing && activeAction === "describe" ? <RefreshCw className="h-4 w-4 animate-spin" /> : <ImageIcon className="h-4 w-4" />}
                  Describe Image
                </button>
                <button
                  onClick={() => handleProcess("ocr")}
                  disabled={isProcessing}
                  className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold flex justify-center items-center gap-2 transition-all shadow-sm ${
                    isProcessing && activeAction === "ocr" ? "bg-slate-600 text-white cursor-not-allowed opacity-80" : isProcessing ? "bg-slate-300 dark:bg-slate-700 text-slate-500 cursor-not-allowed" : "bg-emerald-600 text-white hover:bg-emerald-500 active:scale-[0.98]"
                  }`}
                >
                  {isProcessing && activeAction === "ocr" ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Type className="h-4 w-4" />}
                  Extract Text (OCR)
                </button>
                <button
                  onClick={() => handleProcess("alt-text")}
                  disabled={isProcessing}
                  className={`flex-1 sm:col-span-2 py-3 px-4 rounded-xl text-sm font-semibold text-white flex justify-center items-center gap-2 transition-all shadow-sm ${
                    isProcessing && activeAction === "alt-text" ? "bg-slate-600 cursor-not-allowed opacity-80" : isProcessing ? "bg-slate-300 dark:bg-slate-700 text-slate-500 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-500 active:scale-[0.98]"
                  }`}
                >
                  {isProcessing && activeAction === "alt-text" ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
                  Generate SEO Alt Text
                </button>
                
                <div className="sm:col-span-2 mt-2">
                   <div className="flex gap-2">
                     <input 
                       type="text" 
                       value={customPrompt}
                       onChange={e => setCustomPrompt(e.target.value)}
                       placeholder="Ask a custom question about this image..."
                       className="flex-1 px-3 py-2 rounded-xl border border-[var(--panel-border)] bg-[var(--card-bg)] text-[var(--text-main)] text-sm focus:outline-none focus:border-cyan-500"
                       onKeyDown={(e) => { if(e.key === 'Enter') handleProcess('custom') }}
                     />
                     <button
                        onClick={() => handleProcess("custom")}
                        disabled={isProcessing || !customPrompt.trim()}
                        className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-600 text-white rounded-xl text-sm font-semibold transition-colors"
                     >
                       Ask
                     </button>
                   </div>
                </div>
              </div>
            </div>
          ) : (
            <div
              {...getRootProps()}
              className={`p-10 rounded-3xl glass-panel border-2 border-dashed flex flex-col items-center justify-center text-center gap-4 transition-colors cursor-pointer min-h-[400px] ${
                isDragActive
                  ? "border-cyan-500 bg-cyan-500/5"
                  : "border-[var(--panel-border)] hover:border-cyan-400 hover:bg-[var(--card-hover-bg)]"
              }`}
            >
              <input {...getInputProps()} />
              <div className="h-16 w-16 rounded-2xl bg-[var(--card-bg)] border border-[var(--panel-border)] flex items-center justify-center shadow-sm">
                <UploadCloud className="h-8 w-8 text-cyan-500 opacity-80" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[var(--text-main)]">Upload an Image</h3>
                <p className="text-sm text-[var(--text-muted)] mt-2 max-w-xs mx-auto leading-relaxed">
                  Drag and drop a PNG, JPG, or WEBP image here, or click to browse files.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Output */}
        <div className="flex flex-col gap-4">
          <div className="p-4 rounded-3xl glass-panel border border-[var(--panel-border)] shadow-sm flex-1 flex flex-col relative overflow-hidden min-h-[400px]">
            <div className="flex justify-between items-center mb-3 px-2">
              <label className="text-sm font-semibold text-[var(--text-main)]">AI Analysis</label>
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
                    <div className="h-12 w-12 rounded-full border-4 border-cyan-500/20 border-t-cyan-500 animate-spin" />
                  </div>
                  <div className="text-sm font-semibold text-[var(--text-main)] animate-pulse">
                    Analyzing pixels...
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
                    <Search className="h-6 w-6 opacity-40 text-cyan-500" />
                  </div>
                  <div>
                    <span className="text-sm font-medium text-[var(--text-main)] block">
                      Waiting for image
                    </span>
                    <p className="text-xs max-w-[220px] mt-1 text-[var(--text-muted)]">
                      Upload an image and select an action to see the AI's analysis.
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
