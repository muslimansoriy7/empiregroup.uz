"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Reviews carousel — the quotes as a stack, one read at a time.
 *
 * Four quotes side by side asked the reader to choose one and skip three. As a
 * stack the front card is the one being read and the cards behind it say how
 * many are left, which is the only thing the others were communicating anyway.
 *
 * Built to the supplied spec: spring card transitions, arrow-key navigation,
 * optional auto-play, indicators, prev/next disabled at the bounds, semantic
 * figure / blockquote / figcaption, and instant transitions under
 * prefers-reduced-motion.
 *
 * Two things the spec left open, decided here:
 *  · auto-play is off by default. A testimonial is prose; moving it while
 *    someone is halfway through a sentence is a bug, not a feature.
 *  · the cards share one grid cell rather than being absolutely positioned, so
 *    the stack is as tall as the longest quote at whatever width it is read at
 *    — no measuring, and nothing clipped when the copy is translated.
 */

export type Review = {
  quote: string;
  name: string;
  role: string;
  company: string;
  logo?: string;
};

export function NxReviews({
  items,
  labels,
  autoPlay = false,
  interval = 7000,
}: {
  items: Review[];
  labels: { prev: string; next: string; goTo: (n: number) => string; position: (n: number, of: number) => string };
  autoPlay?: boolean;
  interval?: number;
}) {
  const reduce = useReducedMotion();
  const [index, setIndex] = React.useState(0);
  const [paused, setPaused] = React.useState(false);

  const count = items.length;
  const clamp = React.useCallback((n: number) => Math.max(0, Math.min(count - 1, n)), [count]);
  const go = React.useCallback((n: number) => setIndex(clamp(n)), [clamp]);
  /* Relative moves read the current index from the updater, not from the
     closure — two clicks inside one render otherwise both land on the same
     card and the second one is swallowed. */
  const step = React.useCallback((d: number) => setIndex((i) => clamp(i + d)), [clamp]);

  React.useEffect(() => {
    if (!autoPlay || paused || reduce || count < 2) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % count), interval);
    return () => window.clearInterval(id);
  }, [autoPlay, paused, reduce, count, interval]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      step(-1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      step(1);
    }
  };

  const spring = reduce
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 260, damping: 30, mass: 0.9 };

  return (
    <div
      className="nx-rc"
      role="group"
      aria-roledescription="carousel"
      tabIndex={0}
      onKeyDown={onKeyDown}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="nx-rc-stack">
        {items.map((r, i) => {
          const d = i - index;
          const behind = d > 0;
          const visible = d >= 0 && d < 3;

          return (
            <motion.figure
              key={r.name}
              className={`nx-panel nx-rc-card${d === 0 ? " front" : ""}`}
              // Only the front card is reachable; the rest are decoration for
              // now and would otherwise put three hidden quotes in the tab order.
              aria-hidden={d !== 0}
              inert={d !== 0}
              initial={false}
              animate={{
                scale: behind ? 1 - Math.min(d, 2) * 0.05 : 1,
                /* Scaling from the centre pulls the top edge back down, so the
                   offset has to out-run it or the stack shows no depth at all. */
                y: behind ? -Math.min(d, 2) * 26 : 0,
                filter: behind ? `blur(${Math.min(d, 2) * 2}px)` : "blur(0px)",
                opacity: visible ? (behind ? 0.55 - (Math.min(d, 2) - 1) * 0.2 : 1) : 0,
                zIndex: count - Math.abs(d),
              }}
              transition={spring}
              style={{ pointerEvents: d === 0 ? "auto" : "none" }}
            >
              {r.logo && (
                // eslint-disable-next-line @next/next/no-img-element
                <img className="nx-quote-logo" src={r.logo} alt="" loading="lazy" />
              )}
              <blockquote>{r.quote}</blockquote>
              <figcaption>
                <span className="nx-quote-name">{r.name}</span>
                <span className="nx-micro">
                  {r.role} · {r.company}
                </span>
              </figcaption>
            </motion.figure>
          );
        })}
      </div>

      <div className="nx-rc-bar">
        <div className="nx-rc-dots" role="tablist" aria-label={labels.position(index + 1, count)}>
          {items.map((r, i) => (
            <button
              key={r.name}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={labels.goTo(i + 1)}
              className={`nx-rc-dot${i === index ? " on" : ""}`}
              onClick={() => go(i)}
            />
          ))}
        </div>

        <div className="nx-rc-nav">
          <span className="nx-micro nx-rc-count">{labels.position(index + 1, count)}</span>
          <button
            type="button"
            className="nx-icon-btn"
            aria-label={labels.prev}
            disabled={index === 0}
            onClick={() => step(-1)}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            className="nx-icon-btn"
            aria-label={labels.next}
            disabled={index === count - 1}
            onClick={() => step(1)}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
