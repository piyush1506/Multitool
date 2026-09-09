"use client";

import { useEffect, useRef } from "react";

interface AdSenseAdProps {
  slot?: string;
  format?: "auto" | "fluid" | "rectangle" | "horizontal" | "vertical";
  responsive?: boolean;
  className?: string;
}

declare global {
  interface Window {
    adsbygoogle?: any[];
  }
}

export function AdSenseAd({
  slot = "1234567890",
  format = "auto",
  responsive = true,
  className = "",
}: AdSenseAdProps) {
  const adRef = useRef<HTMLModElement>(null);
  const isLoadedRef = useRef(false);

  useEffect(() => {
    try {
      if (typeof window !== "undefined" && !isLoadedRef.current) {
        if (adRef.current && adRef.current.innerHTML === "") {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
          isLoadedRef.current = true;
        }
      }
    } catch (err) {
      console.error("AdSense push error:", err);
    }
  }, []);

  return (
    <div className={`w-full overflow-hidden my-6 text-center ${className}`}>
      <ins
        ref={adRef}
        className="adsbygoogle block"
        style={{ display: "block" }}
        data-ad-client="ca-pub-9516698796421486"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? "true" : "false"}
      />
    </div>
  );
}
