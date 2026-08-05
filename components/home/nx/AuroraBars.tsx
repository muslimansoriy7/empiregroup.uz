"use client";

import * as React from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Aurora bars — an arch of undulating columns, used as the footer ground.
 *
 * Three changes from the supplied version:
 *
 *  · It drove React state from useAnimationFrame, re-rendering every bar sixty
 *    times a second. Here the frame loop writes heights straight to the DOM,
 *    so the animation costs no reconciliation at all.
 *  · The bars are plain spans, not motion spans. That is not a style
 *    preference: a motion element keeps its style prop as a motion value and
 *    re-flushes it on the render step of every frame, so a height written in
 *    the update step was being overwritten before it ever painted — the whole
 *    thing rendered frozen at t=0.
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
  barCount = 28,
  colors = ["#BBD6F2", "#7FB0E6", "#4E93DA", BRAND, "#1F4E86", "#0B1E38"],
  maxHeightRatio = 0.92,
  minHeightRatio = 0.16,
  speed = 0.5,
  blur = 0,
}: {
  barCount?: number;
  colors?: string[];
  maxHeightRatio?: number;
  minHeightRatio?: number;
  speed?: number;
  blur?: number;
}) {
  const hostRef = React.useRef<HTMLDivElement>(null);
  const barsRef = React.useRef<(HTMLSpanElement | null)[]>([]);
  const reduce = useReducedMotion();

  React.useEffect(() => {
    const host = hostRef.current;
    if (!host || reduce) return;

    let live = false;
    let raf = 0;
    let last = 0;
    let t = 0;

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      const delta = last ? Math.min(now - last, 64) : 16;
      last = now;
      if (!live) return;
      t += (delta / 1000) * speed;
      for (let i = 0; i < barsRef.current.length; i++) {
        const el = barsRef.current[i];
        if (!el) continue;
        el.style.height = `${heightAt(i, barCount, t, minHeightRatio, maxHeightRatio) * 100}%`;
      }
    };

    const io = new IntersectionObserver(
      ([e]) => {
        live = e.isIntersecting;
        // Restart the clock rather than jumping the wave forward by however
        // long the footer was off screen.
        if (live) last = 0;
      },
      { rootMargin: "160px" }
    );
    io.observe(host);
    raf = requestAnimationFrame(tick);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [barCount, minHeightRatio, maxHeightRatio, speed, reduce]);

  const stops = colors
    .map((c, i) => `${c} ${Math.round((i / (colors.length - 1)) * 100)}%`)
    .join(", ");

  return (
    <div className="nx-aurora" ref={hostRef} aria-hidden="true">
      <div className="nx-aurora-row">
        {Array.from({ length: barCount }).map((_, i) => (
          <span
            key={i}
            ref={(el) => {
              barsRef.current[i] = el;
            }}
            className="nx-aurora-bar"
            style={{
              height: `${heightAt(i, barCount, 0, minHeightRatio, maxHeightRatio) * 100}%`,
              /* Light at the tip, near-black at the base. The other way round
                 put the palest blue along the bottom edge — exactly where the
                 legal and copyright lines sit, which dropped that grey type to
                 roughly 2:1 against its ground. */
              background: `linear-gradient(to bottom, ${stops})`,
              filter: blur ? `blur(${blur}px)` : undefined,
            }}
          />
        ))}
      </div>
      <div className="nx-aurora-veil" />
    </div>
  );
}
