"use client";

import { useState } from "react";
import {
  Download,
  AlertCircle,
  Video,
  Search,
  ImageIcon,
  Check,
} from "lucide-react";

interface ThumbnailVariant {
  label: string;
  resolution: string;
  path: string;
}

const THUMBNAIL_VARIANTS: ThumbnailVariant[] = [
  {
    label: "Max Resolution",
    resolution: "1280×720",
    path: "maxresdefault.jpg",
  },
  {
    label: "SD Default",
    resolution: "640×480",
    path: "sddefault.jpg",
  },
  {
    label: "High Quality",
    resolution: "480×360",
    path: "hqdefault.jpg",
  },
  {
    label: "Medium Quality",
    resolution: "320×180",
    path: "mqdefault.jpg",
  },
  {
    label: "Default",
    resolution: "120×90",
    path: "default.jpg",
  },
];

function extractVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/)([a-zA-Z0-9_-]{11})/,
    /^([a-zA-Z0-9_-]{11})$/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

export default function YouTubeThumbnailDownloaderClient() {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [videoId, setVideoId] = useState<string | null>(null);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());

  const fetchThumbnails = () => {
    if (!url.trim()) {
      setError("Please enter a YouTube URL.");
      return;
    }

    const id = extractVideoId(url.trim());
    if (!id) {
      setError("Invalid YouTube URL. Please check the URL and try again.");
      return;
    }

    setError("");
    setVideoId(id);
    setLoadedImages(new Set());
    setFailedImages(new Set());
  };

  const handleDownload = async (variant: ThumbnailVariant) => {
    if (!videoId) return;
    const imageUrl = `https://img.youtube.com/vi/${videoId}/${variant.path}`;

    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = `${videoId}_${variant.path}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(blobUrl);
    } catch {
      // Fallback: open in new tab
      window.open(imageUrl, "_blank");
    }
  };

  const handleImageLoad = (path: string) => {
    setLoadedImages((prev) => new Set(prev).add(path));
  };

  const handleImageError = (path: string) => {
    setFailedImages((prev) => new Set(prev).add(path));
  };

  return (
    <div className="space-y-8">
      {/* URL Input */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-zinc-900/80 border border-slate-200 dark:border-zinc-800 shadow-lg">
        <label
          htmlFor="yt-thumb-url-input"
          className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-zinc-300 mb-3"
        >
          <Video className="w-4 h-4 text-red-500" />
          YouTube Video URL
        </label>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            id="yt-thumb-url-input"
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && fetchThumbnails()}
            placeholder="https://www.youtube.com/watch?v=..."
            className="flex-1 px-5 py-3.5 bg-slate-50 dark:bg-zinc-800 border border-slate-300 dark:border-zinc-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-pink-500/40 focus:border-pink-500 transition-all text-base"
          />
          <button
            onClick={fetchThumbnails}
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-gradient-to-r from-pink-600 to-fuchsia-600 hover:from-pink-700 hover:to-fuchsia-700 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all text-base whitespace-nowrap"
          >
            <Search className="w-4 h-4" />
            Get Thumbnails
          </button>
        </div>
        {error && (
          <div className="mt-4 flex items-start gap-2 text-red-500 dark:text-red-400 text-sm bg-red-500/5 border border-red-500/20 rounded-lg p-3">
            <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}
      </div>

      {/* Thumbnails Grid */}
      {videoId && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-white">
            <ImageIcon className="w-5 h-5 text-pink-500" />
            Available Thumbnails
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {THUMBNAIL_VARIANTS.map((variant) => {
              const isFailed = failedImages.has(variant.path);
              const isLoaded = loadedImages.has(variant.path);

              if (isFailed) return null;

              return (
                <div
                  key={variant.path}
                  className="group rounded-2xl bg-white dark:bg-zinc-900/80 border border-slate-200 dark:border-zinc-800 shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  {/* Image Preview */}
                  <div className="relative aspect-video bg-slate-100 dark:bg-zinc-800 overflow-hidden">
                    <img
                      src={`https://img.youtube.com/vi/${videoId}/${variant.path}`}
                      alt={`${variant.label} thumbnail`}
                      className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ${
                        isLoaded ? "opacity-100" : "opacity-0"
                      }`}
                      onLoad={() => handleImageLoad(variant.path)}
                      onError={() => handleImageError(variant.path)}
                    />
                    {!isLoaded && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-8 h-8 border-2 border-pink-500 border-t-transparent rounded-full animate-spin" />
                      </div>
                    )}
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Info & Download */}
                  <div className="flex items-center justify-between p-4">
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                        {variant.label}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
                        {variant.resolution}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDownload(variant)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-pink-600 to-fuchsia-600 hover:from-pink-700 hover:to-fuchsia-700 text-white text-xs font-bold rounded-lg shadow-sm hover:shadow-md transition-all"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Save
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Copy Section */}
          {videoId && (
            <div className="p-5 rounded-xl bg-slate-50 dark:bg-zinc-800/50 border border-slate-200 dark:border-zinc-700">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-slate-700 dark:text-zinc-300">
                  Video ID
                </span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(videoId);
                  }}
                  className="inline-flex items-center gap-1 text-xs text-pink-600 dark:text-pink-400 hover:underline font-medium"
                >
                  <Check className="w-3 h-3" />
                  Copy
                </button>
              </div>
              <code className="block text-sm text-slate-900 dark:text-white bg-white dark:bg-zinc-900 px-4 py-2.5 rounded-lg border border-slate-200 dark:border-zinc-700 font-mono select-all">
                {videoId}
              </code>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
