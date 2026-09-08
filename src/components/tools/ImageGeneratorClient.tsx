"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Sparkles,
  Wand2,
  Download,
  Copy,
  Check,
  Settings2,
  RefreshCw,
  AlertCircle,
  Trash2,
  Camera,
  Film,
  Zap,
  Flame,
  Palette,
  Box,
  Share2,
  Maximize2,
  X,
  Clock,
  Layers,
  Info
} from "lucide-react";

interface GeneratedItem {
  id: string;
  dataUrl: string;
  prompt: string;
  style: string;
  aspectRatio: string;
  timestamp: number;
  model: string;
}

const INSPIRATIONS = [
  "A majestic cybernetic white tiger in a neon-drenched Tokyo street at midnight, cinematic lighting, 8k",
  "A cozy hobbit cottage interior filled with glowing magical crystals and ancient books, warm fireplace",
  "Cute 3D animated baby otter wearing a tiny astronaut helmet floating near Saturn, Pixar style",
  "A futuristic flying electric sports car gliding above a sun-drenched coastal highway, ultra photorealistic",
  "A serene Japanese zen garden with pink cherry blossoms falling into a crystal-clear koi pond",
  "An epic fantasy castle perched on a floating island among dramatic sunset clouds, ethereal aura",
  "A vibrant watercolor painting of a bustling Venice canal with gondolas and warm historic architecture",
  "An astronaut drinking coffee on Mars looking back at Earth in the starry sky, hyper-realistic"
];

const STYLES = [
  { id: "photorealistic", name: "Photorealistic", icon: Camera, desc: "Ultra-detailed photography" },
  { id: "pixar", name: "3D Animation", icon: Sparkles, desc: "Pixar & 3D render aesthetic" },
  { id: "cinematic", name: "Cinematic", icon: Film, desc: "Dramatic movie lighting" },
  { id: "cyberpunk", name: "Cyberpunk", icon: Zap, desc: "Futuristic neon nightscape" },
  { id: "anime", name: "Anime", icon: Flame, desc: "Japanese studio key visual" },
  { id: "fantasy", name: "Fantasy", icon: Wand2, desc: "Epic concept artwork" },
  { id: "watercolor", name: "Watercolor", icon: Palette, desc: "Delicate artistic paint strokes" },
  { id: "minimalist", name: "Minimalist", icon: Box, desc: "Clean modern vectors" },
  { id: "none", name: "Raw Prompt", icon: Layers, desc: "No extra style keywords" },
];

const ASPECT_RATIOS = [
  { id: "1:1", label: "Square", ratio: "1:1", shape: "w-7 h-7" },
  { id: "16:9", label: "Landscape", ratio: "16:9", shape: "w-9 h-5" },
  { id: "9:16", label: "Story / Reel", ratio: "9:16", shape: "w-5 h-9" },
  { id: "4:3", label: "Classic", ratio: "4:3", shape: "w-8 h-6" },
  { id: "3:2", label: "Photo", ratio: "3:2", shape: "w-8 h-5.5" },
];

export default function ImageGeneratorClient() {
  const [prompt, setPrompt] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("photorealistic");
  const [aspectRatio, setAspectRatio] = useState("1:1");
  const [negativePrompt, setNegativePrompt] = useState("");
  const [customApiKey, setCustomApiKey] = useState("");
  const [engine, setEngine] = useState<"auto" | "google" | "fallback">("auto");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Status & Output
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationTime, setGenerationTime] = useState(0);
  const [currentImage, setCurrentImage] = useState<GeneratedItem | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [warning, setWarning] = useState<string | null>(null);
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [zoomModalImage, setZoomModalImage] = useState<string | null>(null);

  // Local Storage Gallery History
  const [history, setHistory] = useState<GeneratedItem[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Load history from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("multitool_ai_images");
      if (saved) {
        setHistory(JSON.parse(saved));
      }
      const savedApiKey = localStorage.getItem("multitool_custom_gemini_key");
      if (savedApiKey) {
        setCustomApiKey(savedApiKey);
      }
    } catch (e) {
      console.warn("Error reading localStorage:", e);
    }
  }, []);

  // Timer while generating
  useEffect(() => {
    if (isGenerating) {
      setGenerationTime(0);
      timerRef.current = setInterval(() => {
        setGenerationTime((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isGenerating]);

  const saveHistory = (items: GeneratedItem[]) => {
    setHistory(items);
    try {
      localStorage.setItem("multitool_ai_images", JSON.stringify(items.slice(0, 20)));
    } catch (e) {
      console.warn("Storage full or unavailable:", e);
    }
  };

  const handleSurpriseMe = () => {
    const randomPrompt = INSPIRATIONS[Math.floor(Math.random() * INSPIRATIONS.length)];
    setPrompt(randomPrompt);
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setError(null);
    setWarning(null);

    try {
      const res = await fetch("/api/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: prompt.trim(),
          style: selectedStyle,
          aspectRatio,
          negativePrompt: negativePrompt.trim(),
          customApiKey: customApiKey.trim(),
          engine,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        let errText = data.error || "Image generation failed.";
        if (data.tip) errText += ` (${data.tip})`;
        throw new Error(errText);
      }

      const newItem: GeneratedItem = {
        id: "img_" + Date.now(),
        dataUrl: data.imageUrl,
        prompt: prompt.trim(),
        style: selectedStyle,
        aspectRatio,
        timestamp: Date.now(),
        model: data.model || "Google AI Studio",
      };

      setCurrentImage(newItem);
      if (data.warning) {
        setWarning(data.warning);
      }

      const updatedHistory = [newItem, ...history];
      saveHistory(updatedHistory);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = (item: GeneratedItem, format: "png" | "jpeg" = "png") => {
    const link = document.createElement("a");
    const cleanPrompt = item.prompt.slice(0, 30).replace(/[^a-zA-Z0-9]/g, "_");
    link.download = `ai-image-${cleanPrompt}.${format}`;
    link.href = item.dataUrl;
    link.click();
  };

  const handleCopyPrompt = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  const clearHistory = () => {
    saveHistory([]);
  };

  const handleSaveCustomApiKey = (key: string) => {
    setCustomApiKey(key);
    try {
      localStorage.setItem("multitool_custom_gemini_key", key.trim());
    } catch (e) {}
  };

  return (
    <div className="flex flex-col gap-10 w-full max-w-6xl mx-auto pb-12">
      {/* Top Controls Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl glass-panel border border-[var(--panel-border)] shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 shadow-md">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-[var(--text-main)]">
                AI Generation Studio
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Render Backend Live
              </span>
            </div>
            <p className="text-xs text-[var(--text-muted)]">
              Powered by Google AI Studio API & Render Key Rotation
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsSettingsOpen(!isSettingsOpen)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium border border-[var(--panel-border)] bg-[var(--card-bg)] hover:bg-[var(--card-hover-bg)] text-[var(--text-main)] transition-colors shadow-sm"
          >
            <Settings2 className="h-4 w-4 text-blue-500" />
            <span>Settings & API Key</span>
            {customApiKey && (
              <span className="h-2 w-2 rounded-full bg-blue-500" title="Custom key set" />
            )}
          </button>
        </div>
      </div>

      {/* Settings Modal / Drawer */}
      {isSettingsOpen && (
        <div className="p-6 rounded-2xl glass-panel border border-blue-500/30 bg-blue-500/[0.02] space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-[var(--text-main)] flex items-center gap-2">
              <Settings2 className="h-4 w-4 text-blue-500" />
              Advanced Configuration & API Settings
            </h3>
            <button
              onClick={() => setIsSettingsOpen(false)}
              className="p-1 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-main)]"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-medium text-[var(--text-main)] mb-1">
                Custom Google AI Studio API Key (Optional)
              </label>
              <input
                type="password"
                placeholder="AIzaSy... (Leave empty to use Render backend key)"
                value={customApiKey}
                onChange={(e) => handleSaveCustomApiKey(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[var(--panel-border)] bg-[var(--card-bg)] text-[var(--text-main)] placeholder:text-[var(--text-muted)] text-xs focus:outline-none focus:border-blue-500"
              />
              <p className="text-[11px] text-[var(--text-muted)] mt-1">
                By default, keys are fetched dynamically from your deployed Render server (
                <code className="text-blue-500 font-mono">ai-video-generate-lbl8</code>).
              </p>
            </div>

            <div>
              <label className="block font-medium text-[var(--text-main)] mb-1">
                Generation Engine Mode
              </label>
              <select
                value={engine}
                onChange={(e) => setEngine(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl border border-[var(--panel-border)] bg-[var(--card-bg)] text-[var(--text-main)] text-xs focus:outline-none focus:border-blue-500"
              >
                <option value="auto">Auto (Google AI Studio + Seamless High-Speed Fallback)</option>
                <option value="google">Strictly Google AI Studio (Gemini 2.5 Flash)</option>
                <option value="fallback">High-Speed Creative Engine (Flux Instant)</option>
              </select>
              <p className="text-[11px] text-[var(--text-muted)] mt-1">
                Auto mode ensures you never hit 429 quota blockages if the Google free tier hits limits.
              </p>
            </div>

            <div className="md:col-span-2">
              <label className="block font-medium text-[var(--text-main)] mb-1">
                Negative Prompt (Optional)
              </label>
              <input
                type="text"
                placeholder="Elements you want to avoid: e.g. blurry, low quality, distorted, extra limbs"
                value={negativePrompt}
                onChange={(e) => setNegativePrompt(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[var(--panel-border)] bg-[var(--card-bg)] text-[var(--text-main)] placeholder:text-[var(--text-muted)] text-xs focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      )}

      {/* Main Creation Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Input Form (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Prompt Box */}
          <div className="p-6 rounded-3xl glass-panel border border-[var(--panel-border)] shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-[var(--text-main)] flex items-center gap-2">
                <Wand2 className="h-4 w-4 text-blue-500" />
                Prompt Description
              </label>
              <button
                type="button"
                onClick={handleSurpriseMe}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-600 dark:text-blue-400 hover:bg-blue-500/20 transition-colors border border-blue-500/20"
              >
                <Sparkles className="h-3.5 w-3.5" />
                Surprise Me
              </button>
            </div>

            <div className="relative">
              <textarea
                rows={4}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe your imagination in detail... (e.g., A magnificent cybernetic samurai standing beneath falling sakura petals, rain reflections, volumetric neon lights, 8k resolution)"
                className="w-full p-4 rounded-2xl border border-[var(--panel-border)] bg-[var(--card-bg)] text-[var(--text-main)] placeholder:text-[var(--text-muted)] text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none shadow-inner"
              />
              <div className="absolute bottom-3 right-4 text-[11px] text-[var(--text-muted)]">
                {prompt.length} chars
              </div>
            </div>

            {/* Quick Inspiration Pills */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-medium text-[var(--text-muted)] uppercase tracking-wider">
                Quick Inspirations:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  "Neon Cyberpunk City",
                  "Cute 3D Pixar Creature",
                  "Hyperrealistic Studio Portrait",
                  "Cosmic Nebula Astronaut",
                  "Watercolor Misty Forest",
                ].map((idea) => (
                  <button
                    key={idea}
                    type="button"
                    onClick={() => setPrompt(idea)}
                    className="text-[11px] px-2.5 py-1 rounded-lg border border-[var(--panel-border)] bg-[var(--card-bg)] hover:bg-[var(--card-hover-bg)] text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors"
                  >
                    + {idea}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Aspect Ratio Picker */}
          <div className="p-6 rounded-3xl glass-panel border border-[var(--panel-border)] shadow-sm space-y-3">
            <span className="text-sm font-semibold text-[var(--text-main)] block">
              Aspect Ratio
            </span>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2.5">
              {ASPECT_RATIOS.map((item) => {
                const isSelected = aspectRatio === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setAspectRatio(item.id)}
                    className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all ${
                      isSelected
                        ? "border-blue-500 bg-blue-500/10 text-blue-600 dark:text-blue-400 font-semibold shadow-sm"
                        : "border-[var(--panel-border)] bg-[var(--card-bg)] hover:bg-[var(--card-hover-bg)] text-[var(--text-muted)]"
                    }`}
                  >
                    <div
                      className={`mb-2 rounded border ${
                        isSelected
                          ? "border-blue-500 bg-blue-500/20"
                          : "border-[var(--panel-border)] bg-[var(--panel-bg)]"
                      } ${item.shape}`}
                    />
                    <span className="text-xs">{item.label}</span>
                    <span className="text-[10px] opacity-70">{item.ratio}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Style Presets */}
          <div className="p-6 rounded-3xl glass-panel border border-[var(--panel-border)] shadow-sm space-y-3">
            <span className="text-sm font-semibold text-[var(--text-main)] block">
              Artistic Style
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {STYLES.map((style) => {
                const isSelected = selectedStyle === style.id;
                const IconComponent = style.icon;
                return (
                  <button
                    key={style.id}
                    type="button"
                    onClick={() => setSelectedStyle(style.id)}
                    className={`flex items-start gap-3 p-3 text-left rounded-2xl border transition-all ${
                      isSelected
                        ? "border-purple-500 bg-purple-500/10 text-purple-600 dark:text-purple-300 shadow-sm"
                        : "border-[var(--panel-border)] bg-[var(--card-bg)] hover:bg-[var(--card-hover-bg)] text-[var(--text-muted)]"
                    }`}
                  >
                    <div
                      className={`p-2 rounded-xl mt-0.5 ${
                        isSelected
                          ? "bg-purple-500 text-white"
                          : "bg-[var(--panel-bg)] text-[var(--text-muted)]"
                      }`}
                    >
                      <IconComponent className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-semibold truncate text-[var(--text-main)]">
                        {style.name}
                      </div>
                      <div className="text-[10px] opacity-75 truncate">{style.desc}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Generate Button */}
          <button
            type="button"
            disabled={isGenerating || !prompt.trim()}
            onClick={handleGenerate}
            className={`w-full py-4 px-6 rounded-2xl font-semibold text-white flex items-center justify-center gap-2.5 transition-all shadow-lg ${
              isGenerating || !prompt.trim()
                ? "opacity-50 cursor-not-allowed bg-slate-600"
                : "bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 active:scale-[0.99] shadow-blue-500/25 hover:shadow-blue-500/40"
            }`}
          >
            {isGenerating ? (
              <>
                <RefreshCw className="h-5 w-5 animate-spin" />
                <span>Generating Image... ({generationTime}s)</span>
              </>
            ) : (
              <>
                <Sparkles className="h-5 w-5" />
                <span>Generate High-Resolution Image</span>
              </>
            )}
          </button>
        </div>

        {/* Right Column: Output & Canvas (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="p-6 rounded-3xl glass-panel border border-[var(--panel-border)] shadow-sm flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-[var(--text-main)] flex items-center gap-2">
                <Camera className="h-4 w-4 text-purple-500" />
                Generated Output
              </span>
              {currentImage && (
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                  {currentImage.model}
                </span>
              )}
            </div>

            {/* Canvas Viewport */}
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-[var(--preview-bg)] border border-[var(--panel-border)] flex items-center justify-center group shadow-inner">
              {isGenerating ? (
                <div className="flex flex-col items-center justify-center p-6 text-center gap-4">
                  <div className="relative flex items-center justify-center">
                    <div className="h-16 w-16 rounded-full border-4 border-blue-500/20 border-t-blue-500 animate-spin" />
                    <Sparkles className="h-6 w-6 text-blue-500 absolute animate-pulse" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-[var(--text-main)]">
                      Synthesizing Pixels...
                    </div>
                    <p className="text-xs text-[var(--text-muted)] mt-1 max-w-[240px]">
                      Rendering {selectedStyle} imagery with diffusion models ({generationTime}s)
                    </p>
                  </div>
                </div>
              ) : currentImage ? (
                <>
                  <img
                    src={currentImage.dataUrl}
                    alt={currentImage.prompt}
                    className="w-full h-full object-contain"
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-xs">
                    <button
                      type="button"
                      onClick={() => setZoomModalImage(currentImage.dataUrl)}
                      className="p-3 rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-md transition-transform hover:scale-110"
                      title="Zoom In"
                    >
                      <Maximize2 className="h-5 w-5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDownload(currentImage, "png")}
                      className="p-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white shadow-lg transition-transform hover:scale-110"
                      title="Download PNG"
                    >
                      <Download className="h-5 w-5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleCopyPrompt(currentImage.prompt)}
                      className="p-3 rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-md transition-transform hover:scale-110"
                      title="Copy Prompt"
                    >
                      {copiedPrompt ? <Check className="h-5 w-5 text-emerald-400" /> : <Copy className="h-5 w-5" />}
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center p-8 text-center gap-3 text-[var(--text-muted)]">
                  <div className="h-14 w-14 rounded-2xl bg-[var(--card-bg)] border border-[var(--panel-border)] flex items-center justify-center shadow-sm">
                    <Sparkles className="h-6 w-6 opacity-40 text-blue-500" />
                  </div>
                  <div>
                    <span className="text-sm font-medium text-[var(--text-main)] block">
                      Ready to Create
                    </span>
                    <p className="text-xs max-w-[220px] mt-1 text-[var(--text-muted)]">
                      Type your prompt on the left and click generate to craft unique AI visuals.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Error / Warning Notice */}
            {error && (
              <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 flex items-start gap-2.5 text-xs">
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="font-semibold block">Generation Alert</span>
                  <p className="leading-relaxed">{error}</p>
                </div>
              </div>
            )}

            {warning && (
              <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-400 flex items-start gap-2.5 text-xs">
                <Info className="h-4 w-4 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <p className="leading-relaxed">{warning}</p>
                </div>
              </div>
            )}

            {/* Action Buttons for Current Image */}
            {currentImage && (
              <div className="space-y-3 pt-2">
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => handleDownload(currentImage, "png")}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs flex items-center justify-center gap-2 transition-colors shadow-sm"
                  >
                    <Download className="h-4 w-4" />
                    Download PNG
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDownload(currentImage, "jpeg")}
                    className="py-2.5 px-4 rounded-xl border border-[var(--panel-border)] bg-[var(--card-bg)] hover:bg-[var(--card-hover-bg)] text-[var(--text-main)] font-medium text-xs transition-colors"
                  >
                    JPG
                  </button>
                  <button
                    type="button"
                    onClick={() => handleCopyPrompt(currentImage.prompt)}
                    className="py-2.5 px-3 rounded-xl border border-[var(--panel-border)] bg-[var(--card-bg)] hover:bg-[var(--card-hover-bg)] text-[var(--text-main)] transition-colors"
                    title="Copy Prompt"
                  >
                    {copiedPrompt ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
                  </button>
                </div>

                <div className="p-3 rounded-xl bg-[var(--card-bg)] border border-[var(--panel-border)] text-xs space-y-1">
                  <span className="font-semibold text-[var(--text-main)] block">Prompt:</span>
                  <p className="text-[var(--text-muted)] line-clamp-3 italic">
                    "{currentImage.prompt}"
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* History / Gallery Section */}
      {history.length > 0 && (
        <div className="p-6 rounded-3xl glass-panel border border-[var(--panel-border)] shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-blue-500" />
              <h3 className="text-sm font-semibold text-[var(--text-main)]">
                Recent Generations ({history.length})
              </h3>
            </div>
            <button
              type="button"
              onClick={clearHistory}
              className="text-xs text-rose-500 hover:text-rose-600 flex items-center gap-1 font-medium transition-colors"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Clear Gallery
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {history.map((item) => (
              <div
                key={item.id}
                onClick={() => setCurrentImage(item)}
                className="group relative aspect-square rounded-2xl overflow-hidden bg-[var(--preview-bg)] border border-[var(--panel-border)] cursor-pointer hover:border-blue-500/50 transition-all shadow-xs"
              >
                <img
                  src={item.dataUrl}
                  alt={item.prompt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-2 flex flex-col justify-end">
                  <p className="text-[10px] text-white line-clamp-2 leading-tight">
                    {item.prompt}
                  </p>
                  <span className="text-[9px] text-blue-300 mt-1 capitalize">
                    {item.style} • {item.aspectRatio}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Fullscreen Zoom Modal */}
      {zoomModalImage && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <button
            onClick={() => setZoomModalImage(null)}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
          <div className="max-w-4xl max-h-[85vh] rounded-2xl overflow-hidden shadow-2xl border border-white/10">
            <img
              src={zoomModalImage}
              alt="Fullscreen Zoom"
              className="w-full h-full object-contain max-h-[85vh]"
            />
          </div>
        </div>
      )}
    </div>
  );
}
