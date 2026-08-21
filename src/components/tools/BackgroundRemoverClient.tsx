"use client";

import React, { useState, useRef, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud, Download, Sparkles } from "lucide-react";

export default function BackgroundRemoverClient() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [processedSrc, setProcessedSrc] = useState<string | null>(null);
  const [targetColor, setTargetColor] = useState<string>("#ffffff");
  const [tolerance, setTolerance] = useState<number>(30);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const imgRef = useRef<HTMLImageElement>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageSrc(e.target?.result as string);
        setProcessedSrc(null);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
  });

  const hexToRgb = (hex: string) => {
    const cleanHex = hex.replace("#", "");
    const bigint = parseInt(cleanHex, 16);
    return {
      r: (bigint >> 16) & 255,
      g: (bigint >> 8) & 255,
      b: 255 & bigint,
    };
  };

  const handleRemoveBackground = () => {
    if (!imgRef.current) return;

    setIsProcessing(true);
    setTimeout(() => {
      const img = imgRef.current!;
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      const targetRgb = hexToRgb(targetColor);

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        const diff = Math.sqrt(
          Math.pow(r - targetRgb.r, 2) +
          Math.pow(g - targetRgb.g, 2) +
          Math.pow(b - targetRgb.b, 2)
        );

        if (diff <= tolerance) {
          data[i + 3] = 0; // Transparent
        }
      }

      ctx.putImageData(imageData, 0, 0);
      setProcessedSrc(canvas.toDataURL("image/png"));
      setIsProcessing(false);
    }, 100);
  };

  const handleDownload = () => {
    if (!processedSrc) return;
    const link = document.createElement("a");
    link.download = "bg-removed.png";
    link.href = processedSrc;
    link.click();
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-5xl mx-auto">
      {!imageSrc ? (
        <div
          {...getRootProps()}
          className={`relative overflow-hidden rounded-3xl p-16 text-center cursor-pointer transition-all duration-300 glass-card ${
            isDragActive ? "border-emerald-500 bg-emerald-500/10 glow-accent" : "hover:border-emerald-500/40"
          }`}
        >
          <input {...getInputProps()} />
          <div className="mx-auto h-20 w-20 rounded-2xl bg-gradient-to-br from-fuchsia-500/20 to-pink-600/20 border border-fuchsia-500/30 flex items-center justify-center mb-6 shadow-xl">
            <UploadCloud className="h-10 w-10 text-fuchsia-500 dark:text-fuchsia-400" />
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
            {isDragActive ? "Drop the image here" : "Drag & drop an image, or click to select"}
          </p>
          <p className="text-sm text-slate-600 dark:text-zinc-400 font-light max-w-md mx-auto">
            Best for images with solid or high-contrast backgrounds.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 glass-panel rounded-3xl p-6 flex flex-col items-center justify-center min-h-[400px]">
            <div className="relative max-h-[400px] overflow-hidden rounded-2xl border border-slate-200 dark:border-white/10 p-2 bg-[radial-gradient(#94a3b8_1px,transparent_1px)] dark:bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px]">
              <img
                ref={imgRef}
                src={processedSrc || imageSrc}
                alt="Background removal preview"
                className="max-h-[380px] object-contain rounded-lg"
              />
            </div>
          </div>

          <div className="glass-panel rounded-3xl p-8 flex flex-col justify-between h-full">
            <div>
              <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles className="h-6 w-6 text-fuchsia-500" /> Controls
              </h2>

              <div className="flex flex-col gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-zinc-300 mb-2">
                    Target Background Color
                  </label>
                  <div className="flex gap-3 items-center">
                    <input
                      type="color"
                      value={targetColor}
                      onChange={(e) => setTargetColor(e.target.value)}
                      className="h-10 w-12 bg-transparent rounded-xl cursor-pointer border border-slate-300 dark:border-zinc-700"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => setTargetColor("#ffffff")}
                        className="px-3 py-1 bg-white text-black text-xs font-bold rounded-lg border border-slate-300 shadow-sm"
                      >
                        White
                      </button>
                      <button
                        onClick={() => setTargetColor("#000000")}
                        className="px-3 py-1 bg-black text-white text-xs font-bold rounded-lg border border-slate-800"
                      >
                        Black
                      </button>
                      <button
                        onClick={() => setTargetColor("#00ff00")}
                        className="px-3 py-1 bg-green-500 text-black text-xs font-bold rounded-lg"
                      >
                        Green
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm font-semibold mb-2 text-slate-700 dark:text-zinc-300">
                    <span>Sensitivity / Tolerance</span>
                    <span className="text-fuchsia-500 font-bold">{tolerance}</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="150"
                    value={tolerance}
                    onChange={(e) => setTolerance(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-fuchsia-500"
                  />
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-200 dark:border-white/10 flex flex-col gap-3 mt-8">
              <button
                onClick={handleRemoveBackground}
                disabled={isProcessing}
                className="w-full flex items-center justify-center gap-2 bg-slate-900 dark:bg-zinc-800 hover:bg-slate-800 dark:hover:bg-zinc-700 text-white font-semibold py-3.5 px-6 rounded-xl transition-all"
              >
                {isProcessing ? "Removing..." : "Remove Color Background"}
              </button>

              {processedSrc && (
                <button
                  onClick={handleDownload}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-fuchsia-600 to-pink-600 hover:from-fuchsia-700 hover:to-pink-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg shadow-fuchsia-500/20 transition-all hover:scale-[1.02] active:scale-95"
                >
                  <Download className="h-5 w-5" /> Download Transparent PNG
                </button>
              )}

              <button
                onClick={() => { setImageSrc(null); setProcessedSrc(null); }}
                className="w-full py-2.5 text-slate-500 hover:text-slate-800 dark:text-zinc-400 dark:hover:text-white transition-colors text-sm font-medium"
              >
                Upload a different image
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
