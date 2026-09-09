"use client";

import { useState } from "react";
import {
  Download,
  Loader2,
  AlertCircle,
  Video,
  Play,
  Clock,
  Eye,
  User,
  Film,
} from "lucide-react";

interface VideoFormat {
  itag: number;
  qualityLabel: string;
  container: string;
  contentLength: string;
  fps: number;
}

interface VideoDetails {
  title: string;
  lengthSeconds: string;
  viewCount: string;
  author: string;
  thumbnail: string;
  videoId: string;
}

export default function YouTubeVideoDownloaderClient() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [videoDetails, setVideoDetails] = useState<VideoDetails | null>(null);
  const [formats, setFormats] = useState<VideoFormat[]>([]);

  const fetchFormats = async () => {
    if (!url.trim()) {
      setError("Please enter a YouTube URL.");
      return;
    }
    setError("");
    setLoading(true);
    setVideoDetails(null);
    setFormats([]);

    try {
      const res = await fetch(
        `/api/youtube/info?url=${encodeURIComponent(url.trim())}`
      );
      const data = await res.json();

      if (!data.success) {
        setError(data.error || "Failed to fetch video info.");
        return;
      }

      setVideoDetails(data.videoDetails);
      setFormats(data.formats);

      if (data.formats.length === 0) {
        setError(
          "No downloadable MP4 formats found for this video. The video may be restricted."
        );
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = (itag: number) => {
    setDownloading(itag);
    const downloadUrl = `/api/youtube/download?url=${encodeURIComponent(
      url.trim()
    )}&itag=${itag}`;
    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = "";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    // Reset the downloading state after a short delay
    setTimeout(() => setDownloading(null), 3000);
  };

  const formatDuration = (seconds: string) => {
    const s = parseInt(seconds);
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    if (h > 0)
      return `${h}:${m.toString().padStart(2, "0")}:${sec
        .toString()
        .padStart(2, "0")}`;
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const formatViews = (count: string) => {
    const n = parseInt(count);
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
    if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
    return n.toString();
  };

  const formatBytes = (bytes: string) => {
    const n = parseInt(bytes);
    if (isNaN(n)) return "—";
    if (n >= 1_073_741_824) return `${(n / 1_073_741_824).toFixed(1)} GB`;
    if (n >= 1_048_576) return `${(n / 1_048_576).toFixed(1)} MB`;
    if (n >= 1_024) return `${(n / 1_024).toFixed(1)} KB`;
    return `${n} B`;
  };

  return (
    <div className="space-y-8">
      {/* URL Input */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-zinc-900/80 border border-slate-200 dark:border-zinc-800 shadow-lg">
        <label
          htmlFor="yt-url-input"
          className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-zinc-300 mb-3"
        >
          <Video className="w-4 h-4 text-red-500" />
          YouTube Video URL
        </label>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            id="yt-url-input"
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && fetchFormats()}
            placeholder="https://www.youtube.com/watch?v=..."
            className="flex-1 px-5 py-3.5 bg-slate-50 dark:bg-zinc-800 border border-slate-300 dark:border-zinc-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-red-500/40 focus:border-red-500 transition-all text-base"
          />
          <button
            onClick={fetchFormats}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed text-base whitespace-nowrap"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Fetching...
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                Fetch Formats
              </>
            )}
          </button>
        </div>
        {error && (
          <div className="mt-4 flex items-start gap-2 text-red-500 dark:text-red-400 text-sm bg-red-500/5 border border-red-500/20 rounded-lg p-3">
            <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}
      </div>

      {/* Video Info Card */}
      {videoDetails && (
        <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-zinc-900/80 border border-slate-200 dark:border-zinc-800 shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Thumbnail */}
            <div className="relative w-full md:w-80 aspect-video rounded-xl overflow-hidden border border-slate-200 dark:border-zinc-700 shrink-0 group">
              <img
                src={videoDetails.thumbnail}
                alt={videoDetails.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/80 rounded text-xs text-white font-mono">
                {formatDuration(videoDetails.lengthSeconds)}
              </div>
            </div>

            {/* Details */}
            <div className="flex-1 min-w-0">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-3 leading-tight line-clamp-2">
                {videoDetails.title}
              </h2>
              <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-500 dark:text-zinc-400">
                <span className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" />
                  {videoDetails.author}
                </span>
                <span className="flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5" />
                  {formatViews(videoDetails.viewCount)} views
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  {formatDuration(videoDetails.lengthSeconds)}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Formats Table */}
      {formats.length > 0 && (
        <div className="rounded-2xl bg-white dark:bg-zinc-900/80 border border-slate-200 dark:border-zinc-800 shadow-lg overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="px-6 sm:px-8 py-5 border-b border-slate-200 dark:border-zinc-800">
            <h3 className="flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-white">
              <Film className="w-5 h-5 text-red-500" />
              Available Formats
            </h3>
            <p className="text-sm text-slate-500 dark:text-zinc-400 mt-1">
              Select a quality and click download
            </p>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-zinc-800">
            {formats.map((f) => (
              <div
                key={f.itag}
                className="flex items-center justify-between px-6 sm:px-8 py-4 hover:bg-slate-50 dark:hover:bg-zinc-800/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-16 h-8 rounded-lg bg-red-500/10 text-red-600 dark:text-red-400 text-sm font-bold">
                    {f.qualityLabel}
                  </div>
                  <div className="text-sm text-slate-500 dark:text-zinc-400 hidden sm:flex items-center gap-3">
                    <span className="uppercase font-medium text-slate-700 dark:text-zinc-300">
                      {f.container}
                    </span>
                    {f.fps && (
                      <span className="text-xs bg-slate-100 dark:bg-zinc-800 px-2 py-0.5 rounded-full border border-slate-200 dark:border-zinc-700">
                        {f.fps}fps
                      </span>
                    )}
                    <span>{formatBytes(f.contentLength)}</span>
                  </div>
                </div>
                <button
                  onClick={() => handleDownload(f.itag)}
                  disabled={downloading === f.itag}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white text-sm font-bold rounded-xl shadow-sm hover:shadow-md transition-all disabled:opacity-50"
                >
                  {downloading === f.itag ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      Downloading...
                    </>
                  ) : (
                    <>
                      <Download className="w-3.5 h-3.5" />
                      Download
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
