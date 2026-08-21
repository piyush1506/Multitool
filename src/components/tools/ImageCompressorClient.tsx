"use client";

import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import imageCompression from "browser-image-compression";
import { UploadCloud, Download, Minimize2, Sparkles, RefreshCw } from "lucide-react";

export default function ImageCompressorClient() {
  const [file, setFile] = useState<File | null>(null);
  const [compressedFile, setCompressedFile] = useState<File | null>(null);
  const [quality, setQuality] = useState<number>(0.8);
  const [maxWidthOrHeight, setMaxWidthOrHeight] = useState<number>(1920);
  const [isCompressing, setIsCompressing] = useState<boolean>(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const uploadedFile = acceptedFiles[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      setCompressedFile(null);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
  });

  const handleCompress = async () => {
    if (!file) return;

    setIsCompressing(true);
    try {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: maxWidthOrHeight,
        useWebWorker: true,
        initialQuality: quality,
      };

      const output = await imageCompression(file, options);
      setCompressedFile(output);
    } catch (error) {
      console.error("Compression failed:", error);
    } finally {
      setIsCompressing(false);
    }
  };

  const handleDownload = () => {
    if (!compressedFile) return;

    const url = URL.createObjectURL(compressedFile);
    const link = document.createElement("a");
    link.href = url;
    link.download = `compressed-${file?.name || "image"}`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const savingsPercentage = file && compressedFile
    ? Math.max(0, Math.round(((file.size - compressedFile.size) / file.size) * 100))
    : 0;

  return (
    <div className="flex flex-col gap-8 w-full max-w-5xl mx-auto">
      {!file ? (
        <div
          {...getRootProps()}
          className={`relative overflow-hidden rounded-3xl p-16 text-center cursor-pointer transition-all duration-300 glass-card ${
            isDragActive ? "border-orange-500 bg-orange-500/10 glow-accent" : "hover:border-orange-500/40"
          }`}
        >
          <input {...getInputProps()} />
          <div className="mx-auto h-20 w-20 rounded-2xl bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/30 flex items-center justify-center mb-6 shadow-xl">
            <UploadCloud className="h-10 w-10 text-orange-500 dark:text-orange-400" />
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
            {isDragActive ? "Drop your image right here!" : "Drag & drop your image, or browse"}
          </p>
          <p className="text-sm text-slate-600 dark:text-zinc-400 font-light max-w-md mx-auto">
            Supports PNG, JPG, WebP. Everything is compressed locally in your browser for 100% privacy.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 glass-panel rounded-3xl p-8 flex flex-col items-center justify-center min-h-[420px] relative overflow-hidden">
            <div className="relative max-h-[350px] w-full flex items-center justify-center overflow-hidden rounded-2xl bg-slate-100 dark:bg-zinc-950/60 border border-slate-200 dark:border-white/5 p-4">
              <img
                src={URL.createObjectURL(file)}
                alt="Uploaded preview"
                className="max-h-[320px] object-contain rounded-lg shadow-xl"
              />
            </div>
            
            <div className="flex items-center justify-around w-full mt-6 pt-6 border-t border-slate-200 dark:border-white/10 text-sm">
              <div className="text-center">
                <span className="text-xs text-slate-500 dark:text-zinc-400 uppercase tracking-wider block mb-1">Original Size</span>
                <span className="text-lg font-bold text-slate-800 dark:text-zinc-200">{formatSize(file.size)}</span>
              </div>
              {compressedFile && (
                <>
                  <div className="h-8 w-px bg-slate-200 dark:bg-white/10" />
                  <div className="text-center">
                    <span className="text-xs text-slate-500 dark:text-zinc-400 uppercase tracking-wider block mb-1">New Size</span>
                    <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">{formatSize(compressedFile.size)}</span>
                  </div>
                  <div className="h-8 w-px bg-slate-200 dark:bg-white/10" />
                  <div className="text-center">
                    <span className="text-xs text-slate-500 dark:text-zinc-400 uppercase tracking-wider block mb-1">Saved</span>
                    <span className="text-lg font-bold text-orange-500 dark:text-orange-400">{savingsPercentage}%</span>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="glass-panel rounded-3xl p-8 flex flex-col h-full justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white flex items-center gap-2">
                <Minimize2 className="h-6 w-6 text-orange-500 dark:text-orange-400" /> Options
              </h2>

              <div className="flex flex-col gap-6">
                <div>
                  <div className="flex justify-between text-sm font-medium mb-2">
                    <span className="text-slate-700 dark:text-zinc-300">Quality</span>
                    <span className="text-orange-500 dark:text-orange-400 font-bold">{Math.round(quality * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0.1"
                    max="1"
                    step="0.05"
                    value={quality}
                    onChange={(e) => setQuality(parseFloat(e.target.value))}
                    className="w-full h-2 bg-slate-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-zinc-300 mb-2">
                    Max Resolution
                  </label>
                  <select
                    value={maxWidthOrHeight}
                    onChange={(e) => setMaxWidthOrHeight(Number(e.target.value))}
                    className="w-full bg-white dark:bg-zinc-900 border border-slate-300 dark:border-white/10 text-slate-800 dark:text-zinc-200 rounded-xl p-3.5 text-sm focus:outline-none focus:border-orange-500 transition-colors shadow-sm"
                  >
                    <option value={3840}>4K (3840px)</option>
                    <option value={1920}>Full HD (1920px)</option>
                    <option value={1280}>HD (1280px)</option>
                    <option value={800}>Small (800px)</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-200 dark:border-white/10 flex flex-col gap-3 mt-8">
              <button
                onClick={handleCompress}
                disabled={isCompressing}
                className="w-full flex items-center justify-center gap-2 bg-slate-900 dark:bg-zinc-800 hover:bg-slate-800 dark:hover:bg-zinc-700 text-white font-semibold py-3.5 px-6 rounded-xl transition-all border border-transparent shadow-sm active:scale-[0.98]"
              >
                {isCompressing ? (
                  <>
                    <RefreshCw className="h-5 w-5 animate-spin text-orange-400" />
                    Compressing...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-5 w-5 text-orange-400" />
                    Compress Image
                  </>
                )}
              </button>

              {compressedFile && (
                <button
                  onClick={handleDownload}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-4 px-6 rounded-xl shadow-lg shadow-orange-500/20 transition-all hover:scale-[1.02] active:scale-95"
                >
                  <Download className="h-5 w-5" /> Download Result
                </button>
              )}

              <button
                onClick={() => { setFile(null); setCompressedFile(null); }}
                className="w-full py-2.5 text-slate-500 hover:text-slate-800 dark:text-zinc-400 dark:hover:text-white transition-colors text-sm font-medium"
              >
                Choose another file
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
