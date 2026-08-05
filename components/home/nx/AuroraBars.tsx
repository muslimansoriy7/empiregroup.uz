"use client";

import * as React from "react";
import { motion, useAnimationFrame, useReducedMotion } from "framer-motion";

/**
 * Aurora bars — an arch of undulating columns, used as the footer ground.
 *
 * Two changes from the supplied version, both about cost rather than looks:
 *
 *  · It drove React state from useAnimationFrame, re-rendering every bar sixty
 *    times a second. Here the frame loop writes heights straight to the DOM,
 *    so the animation costs no reconciliation at all.
 *  · It runs only while the footer is on screen, and not at all under
 *    prefers-reduced-motion — a permanently animating footer is a battery
 *    drain on a page nobody is looking at the bottom of.
 */

const BRAND = "#387CCD";

function heightAt(i: number, total: number, t: number, minH: number, maxH: number) {
  // Arch envelope: tallest in the centre, shorter at the edges.
  const norm = total > 1 ? i / (total - 1) : 0.5;
  const arch = Math.sin(norm * Math.PI);
  const p1 = (i / total) * Math.PI * 2;
  const p2 = (i / total) * Math.PI * 5.3;
  const wave = 0.5 + 0.25 * Math.sin(t * 1.1 + p1) + 0.25 * Math.sin(t * 0.7 + p2);
  return minH + (arch * 0.65 + wave * 0.35) * (maxH - minH);
}

export function NxAuroraBars({
  barCount = 26,
  colors = ["#BBD6F2", "#7FB0E6", "#4E93DA", BRAND, "#1F4E86", "#00000000"],
  maxHeightRatio = 0.92,
  minHeightRatio = 0.16,
  speed = 0.5,
  gap = 3,
  blur = 0,
}: {
  barCount?: number;
  colors?: string[];
  maxHeightRatio?: number;
  minHeightRatio?: number;
  speed?: number;
  gap?: number;
  blur?: number;
}) {
  const hostRef = React.useRef<HTMLDivElement>(null);
  const barsRef = React.useRef<HTMLElement[]>([]);
  const time = React.useRef(0);
  const [live, setLive] = React.useState(false);
  const reduce = useReducedMotion();

  React.useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const io = new IntersectionObserver(([e]) => setLive(e.isIntersecting), {
      rootMargin: "120px",
    });
    io.observe(host);
    return () => io.disconnect();
  }, []);

  useAnimationFrame((_, delta) => {
    if (!live || reduce) return;
    time.current += (delta / 1000) * speed;
    const t = time.current;
    for (let i = 0; i < barsRef.current.length; i++) {
      const el = barsRef.current[i];
      if (!el) continue;
      el.style.height = `${heightAt(i, barCount, t, minHeightRatio, maxHeightRatio) * 100}%`;
    }
  });

  const stops = colors
    .map((c, i) => `${c} ${Math.round((i / (colors.length - 1)) * 100)}%`)
    .join(", ");

  return (
    <div className="nx-aurora" ref={hostRef} aria-hidden="true">
      <div className="nx-aurora-row">
        {Array.from({ length: barCount }).map((_, i) => (
          <span className="nx-aurora-cell" key={i} style={{ padding: `0 ${gap / 2}px` }}>
            <motion.span
              ref={(el: HTMLElement | null) => {
                if (el) barsRef.current[i] = el;
              }}
              className="nx-aurora-bar"
              style={{
                height: `${heightAt(i, barCount, 0, minHeightRatio, maxHeightRatio) * 100}%`,
                background: `linear-gradient(to top, ${stops})`,
                filter: blur ? `blur(${blur}px)` : undefined,
              }}
            />
          </span>
        ))}
      </div>
      <div className="nx-aurora-veil" />
    </div>
  );
}
