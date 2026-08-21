"use client";

import React, { useState, useEffect } from "react";
import QRCode from "qrcode";
import { QrCode, Download, Copy, Check, Sparkles } from "lucide-react";

export default function QrGeneratorClient() {
  const [text, setText] = useState<string>("https://pkctechs.com");
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const [fgColor, setFgColor] = useState<string>("#000000");
  const [bgColor, setBgColor] = useState<string>("#ffffff");
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    generateQr();
  }, [text, fgColor, bgColor]);

  const generateQr = async () => {
    if (!text) {
      setQrDataUrl("");
      return;
    }
    try {
      const url = await QRCode.toDataURL(text, {
        width: 400,
        margin: 2,
        color: {
          dark: fgColor,
          light: bgColor,
        },
      });
      setQrDataUrl(url);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDownload = () => {
    if (!qrDataUrl) return;
    const link = document.createElement("a");
    link.href = qrDataUrl;
    link.download = "qrcode.png";
    link.click();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full max-w-5xl mx-auto">
      <div className="lg:col-span-2 glass-panel rounded-3xl p-8 flex flex-col items-center justify-center min-h-[400px]">
        {qrDataUrl ? (
          <div className="p-6 bg-white rounded-3xl shadow-2xl border border-slate-200">
            <img src={qrDataUrl} alt="Generated QR Code" className="h-64 w-64 object-contain" />
          </div>
        ) : (
          <div className="text-center text-slate-400">Enter text or URL to generate QR code</div>
        )}
      </div>

      <div className="glass-panel rounded-3xl p-8 flex flex-col justify-between h-full">
        <div>
          <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white flex items-center gap-2">
            <QrCode className="h-6 w-6 text-emerald-500" /> Controls
          </h2>

          <div className="flex flex-col gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-zinc-300 mb-2">
                Content (URL or Text)
              </label>
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="https://example.com"
                className="w-full bg-white dark:bg-zinc-900 border border-slate-300 dark:border-white/10 text-slate-800 dark:text-zinc-200 rounded-xl p-3 text-sm focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-zinc-400 mb-1">
                  Foreground
                </label>
                <input
                  type="color"
                  value={fgColor}
                  onChange={(e) => setFgColor(e.target.value)}
                  className="h-10 w-full rounded-xl border border-slate-300 dark:border-white/10 cursor-pointer bg-transparent"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-zinc-400 mb-1">
                  Background
                </label>
                <input
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="h-10 w-full rounded-xl border border-slate-300 dark:border-white/10 cursor-pointer bg-transparent"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-200 dark:border-white/10 flex flex-col gap-3 mt-8">
          <button
            onClick={handleDownload}
            disabled={!qrDataUrl}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50"
          >
            <Download className="h-5 w-5" /> Download QR Code PNG
          </button>
        </div>
      </div>
    </div>
  );
}
