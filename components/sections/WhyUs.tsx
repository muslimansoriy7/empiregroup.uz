"use client";

import { useEffect, useRef } from "react";
import Hls from "hls.js";
import { useI18n } from "@/lib/i18n";

/**
 * Nega Empire Group — the "chaos vs. confidence" contrast, built on the
 * FreedomSection layout: negatives (left) and positives (right) flanking a
 * central video orb. Geist throughout, footer-blue accents, theme-aware. The
 * orb streams an HLS clip via hls.js over a blue-gradient fallback, so the
 * circle is always filled even if the stream is unavailable.
 */
const HLS_SRC =
  "https://stream.mux.com/bnYL6x5cAX6WiJv2pOKpITehZd3NVdXpj3ylJFpX5Lk.m3u8";

function HlsVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (Hls.isSupported()) {
      const hls = new Hls({
        startLevel: -1,
        capLevelToPlayerSize: false,
        maxMaxBufferLength: 60,
        enableWorker: true,
      });
      hls.loadSource(HLS_SRC);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        hls.currentLevel = hls.levels.length - 1;
        video.play().catch(() => {});
      });
      return () => hls.destroy();
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = HLS_SRC;
      video.play().catch(() => {});
    }
  }, []);

  return (
    <video
      ref={videoRef}
      autoPlay
      loop
      muted
      playsInline
      style={{
        width: "160%",
        height: "160%",
        objectFit: "cover",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 1,
      }}
    />
  );
}

function Cross() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden style={{ flexShrink: 0 }}>
      <circle cx="10" cy="10" r="9" fill="rgba(131,121,158,0.14)" />
      <path d="M7 7l6 6M13 7l-6 6" stroke="#8b93a7" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function Check() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden style={{ flexShrink: 0 }}>
      <circle cx="10" cy="10" r="9" fill="rgba(30,93,215,0.13)" />
      <path d="M6 10.4l2.6 2.6L14 7.2" stroke="#1e5dd7" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const CARD: React.CSSProperties = {
  display: "flex",
  alignItems: "flex-start",
  gap: 12,
  padding: "clamp(12px,0.97vw,16px) clamp(14px,1.25vw,20px)",
  borderRadius: 18,
  background: "var(--color-elevated)",
  border: "1px solid var(--color-hairline)",
  boxShadow: "0 3px 9.1px #3f4a7e0d, 0 1px 29px #3f4a7e14",
};

export function WhyUs() {
  const { t } = useI18n();
  const w = t.whyUs;

  return (
    <section
      className="flex w-full scroll-mt-10 flex-col items-center border-t border-hairline bg-canvas"
      style={{ padding: "clamp(48px,6vw,80px) clamp(16px,3vw,40px)", gap: 36 }}
    >
      {/* header */}
      <div className="flex flex-col items-center gap-9 text-center">
        <span
          className="inline-flex items-center gap-2 rounded-full text-[15px] font-medium"
          style={{
            background: "var(--color-elevated)",
            border: "1px solid var(--color-hairline)",
            padding: "8px 16px",
            color: "var(--color-ink)",
          }}
        >
          <svg width="19" height="18" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8.50037 3.66955C7.53221 2.82462 6.41758 2.275 5.333 2.07887C4.11096 1.85888 2.84987 2.0826 1.96658 2.95885C1.10056 3.81944 0.866218 5.04172 1.06751 6.23193C1.24778 7.29835 1.7803 8.39907 2.60501 9.35959C2.41536 10.1071 2.46371 10.8946 2.7434 11.6137C3.02308 12.3327 3.52035 12.9481 4.16678 13.375C4.81321 13.802 5.57702 14.0195 6.35308 13.9976C7.12915 13.9758 7.87933 13.7157 8.50037 13.2531C9.12146 13.7161 9.87183 13.9765 10.6482 13.9985C11.4245 14.0205 12.1886 13.8029 12.8352 13.3758C13.4819 12.9487 13.9792 12.3331 14.2588 11.6137C14.5384 10.8943 14.5865 10.1065 14.3965 9.35884C15.2204 8.39832 15.753 7.29835 15.9325 6.23119C16.1338 5.04098 15.8994 3.81944 15.0334 2.9596C14.1501 2.0826 12.889 1.85888 11.667 2.07962C10.5824 2.275 9.46854 2.82537 8.50037 3.66955Z"
              fill="#2ba7ff"
            />
          </svg>
          {w.badge}
        </span>

        <h2
          className="font-medium"
          style={{ fontSize: "clamp(32px,4vw,56px)", color: "var(--color-ink)", lineHeight: 1.15, margin: 0 }}
        >
          {w.titleLead}
          <br />
          <span
            style={{
              backgroundImage: "linear-gradient(90deg,#5b9ffb,#1e5dd7 50%,#1448be)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
              color: "transparent",
              paddingBottom: "0.3vw",
              display: "inline-block",
            }}
          >
            {w.titleAccent}
          </span>
        </h2>
      </div>

      {/* three-column grid */}
      <div
        className="grid w-full grid-cols-1 lg:[grid-template-columns:26vw_1fr_26vw]"
        style={{ columnGap: 36, rowGap: 24, alignItems: "start", padding: "0 clamp(0px,2.92vw,40px)", maxWidth: 1280 }}
      >
        {/* left — negatives */}
        <div
          className="flex flex-col"
          style={{ gap: 12, fontSize: "clamp(13px,1.15vw,17px)", color: "var(--color-mute)" }}
        >
          {w.negatives.map((text) => (
            <div key={text} style={CARD}>
              <Cross />
              <div>{text}</div>
            </div>
          ))}
        </div>

        {/* center — video orb */}
        <div className="order-first flex items-center justify-center self-center lg:order-none">
          <div
            style={{
              position: "relative",
              borderRadius: "50%",
              overflow: "hidden",
              width: "clamp(200px,22vw,400px)",
              height: "clamp(200px,22vw,400px)",
              flexShrink: 0,
              background: "radial-gradient(circle at 32% 28%, #5b9ffb 0%, #1e4fc0 42%, #0a1020 100%)",
              boxShadow: "0 24px 60px -18px rgba(20,72,200,.5)",
            }}
          >
            <HlsVideo />
          </div>
        </div>

        {/* right — positives */}
        <div className="flex flex-col" style={{ gap: 12, fontSize: "clamp(13px,1.15vw,17px)" }}>
          {w.positives.map((text) => (
            <div key={text} style={CARD}>
              <Check />
              <div style={{ color: "var(--color-ink)" }}>{text}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
