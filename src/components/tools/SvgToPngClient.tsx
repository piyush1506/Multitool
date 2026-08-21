"use client";

import React, { useState, useRef } from "react";
import { UploadCloud, Download, Image as ImageIcon } from "lucide-react";

export default function SvgToPngClient() {
  const [svgInput, setSvgInput] = useState<string>(
    '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 24 24" fill="none" stroke="#f97316" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>'
  );
  const [scale, setScale] = useState<number>(2);

  const handleDownloadPng = () => {
    if (!svgInput) return;
    const blob = new Blob([svgInput], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = (img.width || 300) * scale;
      canvas.height = (img.height || 300) * scale;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const pngUrl = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = pngUrl;
        link.download = "converted.png";
        link.click();
      }
      URL.revokeObjectURL(url);
    };
    img.src = url;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full max-w-5xl mx-auto">
      <div className="lg:col-span-2 glass-panel rounded-3xl p-6 flex flex-col gap-4">
        <label className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400">
          SVG Code / Markup
        </label>
        <textarea
          value={svgInput}
          onChange={(e) => setSvgInput(e.target.value)}
          rows={12}
          placeholder="Paste <svg>...</svg> code here..."
          className="w-full bg-slate-100 dark:bg-zinc-950/60 border border-slate-200 dark:border-white/5 rounded-2xl p-4 text-xs font-mono text-slate-800 dark:text-zinc-200 focus:outline-none focus:border-orange-500"
        />
      </div>

      <div className="glass-panel rounded-3xl p-8 flex flex-col justify-between h-full">
        <div>
          <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white flex items-center gap-2">
            <ImageIcon className="h-6 w-6 text-orange-500" /> Export PNG
          </h2>

          <div className="flex flex-col gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-zinc-300 mb-2">
                Export Scale: {scale}x Resolution
              </label>
              <select
                value={scale}
                onChange={(e) => setScale(Number(e.target.value))}
                className="w-full bg-white dark:bg-zinc-900 border border-slate-300 dark:border-white/10 text-slate-800 dark:text-zinc-200 rounded-xl p-3 text-sm focus:outline-none focus:border-orange-500"
              >
                <option value={1}>1x Standard</option>
                <option value={2}>2x High-DPI</option>
                <option value={4}>4x Ultra High-Res</option>
              </select>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-200 dark:border-white/10 flex flex-col gap-3 mt-8">
          <button
            onClick={handleDownloadPng}
            disabled={!svgInput}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg shadow-orange-500/20 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50"
          >
            <Download className="h-5 w-5" /> Download PNG Image
          </button>
        </div>
      </div>
    </div>
  );
}
