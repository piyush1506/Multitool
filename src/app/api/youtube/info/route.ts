import { type NextRequest } from "next/server";
import ytdl from "@distube/ytdl-core";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const url = request.nextUrl.searchParams.get("url");

    if (!url || !ytdl.validateURL(url)) {
      return Response.json(
        { success: false, error: "A valid YouTube URL is required." },
        { status: 400 }
      );
    }

    const info = await ytdl.getInfo(url);

    const videoDetails = {
      title: info.videoDetails.title,
      lengthSeconds: info.videoDetails.lengthSeconds,
      viewCount: info.videoDetails.viewCount,
      author: info.videoDetails.author.name,
      thumbnail:
        info.videoDetails.thumbnails?.[
          info.videoDetails.thumbnails.length - 1
        ]?.url || "",
      videoId: info.videoDetails.videoId,
    };

    // Build a list of downloadable formats with both audio and video
    const formats = info.formats
      .filter((f) => f.hasVideo && f.hasAudio && f.container === "mp4")
      .map((f) => ({
        itag: f.itag,
        qualityLabel: f.qualityLabel || "Unknown",
        container: f.container,
        contentLength: f.contentLength || "Unknown",
        fps: f.fps,
      }))
      // Remove duplicates by qualityLabel, keep the first (usually best)
      .filter(
        (f, i, arr) =>
          arr.findIndex((x) => x.qualityLabel === f.qualityLabel) === i
      )
      .sort((a, b) => {
        const aNum = parseInt(a.qualityLabel) || 0;
        const bNum = parseInt(b.qualityLabel) || 0;
        return bNum - aNum;
      });

    return Response.json({ success: true, videoDetails, formats });
  } catch (error: unknown) {
    console.error("YouTube Info API Error:", error);
    const message =
      error instanceof Error ? error.message : "Failed to fetch video info.";
    return Response.json({ success: false, error: message }, { status: 500 });
  }
}
