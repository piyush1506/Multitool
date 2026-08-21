"use client";

import React, { useState } from "react";
import { Palette, Copy, Check, Pipette } from "lucide-react";

export default function ColorPickerClient() {
  const [color, setColor] = useState<string>("#10b981");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const hexToRgb = (hex: string) => {
    const cleanHex = hex.replace("#", "");
    const bigint = parseInt(cleanHex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = 255 & bigint;
    return { r, g, b, str: `rgb(${r}, ${g}, ${b})` };
  };

  const rgb = hexToRgb(color);
  const hslStr = `hsl(${Math.round((rgb.r / 255) * 360)}, 70%, 50%)`;

  const copyToClipboard = (val: string, key: string) => {
    navigator.clipboard.writeText(val);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full max-w-5xl mx-auto">
      <div className="lg:col-span-2 glass-panel rounded-3xl p-8 flex flex-col items-center justify-center min-h-[380px]">
        <div
          className="h-48 w-full rounded-2xl shadow-2xl transition-all duration-300 flex items-center justify-center border border-white/10"
          style={{ backgroundColor: color }}
        >
          <span className="px-4 py-2 rounded-xl bg-black/40 backdrop-blur-md text-white font-mono font-bold text-xl tracking-wider">
            {color.toUpperCase()}
          </span>
        </div>
      </div>

      <div className="glass-panel rounded-3xl p-8 flex flex-col justify-between h-full">
        <div>
          <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white flex items-center gap-2">
            <Palette className="h-6 w-6 text-emerald-500" /> Color Picker
          </h2>

          <div className="flex flex-col gap-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-zinc-300 mb-2">
                Choose Color
              </label>
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="h-12 w-full rounded-xl border border-slate-300 dark:border-white/10 cursor-pointer bg-transparent"
              />
            </div>

            <div className="flex flex-col gap-3 pt-4 border-t border-slate-200 dark:border-white/10">
              <div className="flex justify-between items-center bg-slate-100 dark:bg-zinc-900 p-3 rounded-xl">
                <span className="text-xs font-semibold text-slate-500 dark:text-zinc-400">HEX</span>
                <button
                  onClick={() => copyToClipboard(color.toUpperCase(), "HEX")}
                  className="font-mono text-sm text-slate-800 dark:text-zinc-200 font-bold flex items-center gap-1.5"
                >
                  {copiedKey === "HEX" ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                  {color.toUpperCase()}
                </button>
              </div>

              <div className="flex justify-between items-center bg-slate-100 dark:bg-zinc-900 p-3 rounded-xl">
                <span className="text-xs font-semibold text-slate-500 dark:text-zinc-400">RGB</span>
                <button
                  onClick={() => copyToClipboard(rgb.str, "RGB")}
                  className="font-mono text-sm text-slate-800 dark:text-zinc-200 font-bold flex items-center gap-1.5"
                >
                  {copiedKey === "RGB" ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                  {rgb.str}
                </button>
              </div>

              <div className="flex justify-between items-center bg-slate-100 dark:bg-zinc-900 p-3 rounded-xl">
                <span className="text-xs font-semibold text-slate-500 dark:text-zinc-400">HSL</span>
                <button
                  onClick={() => copyToClipboard(hslStr, "HSL")}
                  className="font-mono text-sm text-slate-800 dark:text-zinc-200 font-bold flex items-center gap-1.5"
                >
                  {copiedKey === "HSL" ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                  {hslStr}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
