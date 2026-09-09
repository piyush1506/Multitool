import { type NextRequest } from "next/server";
import ytdl from "@distube/ytdl-core";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const url = request.nextUrl.searchParams.get("url");
    const itag = request.nextUrl.searchParams.get("itag");

    if (!url || !ytdl.validateURL(url)) {
      return Response.json(
        { success: false, error: "A valid YouTube URL is required." },
        { status: 400 }
      );
    }

    // Fetch video info to get the title for the filename
    const info = await ytdl.getInfo(url);
    const title = info.videoDetails.title.replace(/[^\w\s-]/g, "").trim();

    const options: ytdl.downloadOptions = {};
    if (itag) {
      options.quality = parseInt(itag);
    } else {
      options.quality = "highest";
      options.filter = "audioandvideo";
    }

    const stream = ytdl(url, options);

    // Convert the Node.js Readable stream to a Web ReadableStream
    const webStream = new ReadableStream({
      start(controller) {
        stream.on("data", (chunk: Buffer) => {
          controller.enqueue(new Uint8Array(chunk));
        });
        stream.on("end", () => {
          controller.close();
        });
        stream.on("error", (err: Error) => {
          controller.error(err);
        });
      },
      cancel() {
        stream.destroy();
      },
    });

    return new Response(webStream, {
      headers: {
        "Content-Type": "video/mp4",
        "Content-Disposition": `attachment; filename="${title}.mp4"`,
      },
    });
  } catch (error: unknown) {
    console.error("YouTube Download API Error:", error);
    const message =
      error instanceof Error ? error.message : "Failed to download video.";
    return Response.json({ success: false, error: message }, { status: 500 });
  }
}
