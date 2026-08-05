"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Per-word crossfade — words fade up one after another as the line arrives.
 *
 * This replaces the blur-to-sharp reveal that was here. A blur filter forces
 * the browser to re-rasterise the text on every frame of every word; opacity
 * and translate are composited, so the same idea costs a fraction as much and
 * arrives sharp from the first frame.
 *
 * To the supplied spec: 8px upward drift, cubic-bezier(0.16, 1, 0.3, 1),
 * configurable delay and stagger, optional scroll trigger, and under
 * prefers-reduced-motion the text renders immediately at full opacity with no
 * movement. The whole string is on aria-label and the word spans are hidden,
 * so a screen reader hears a sentence rather than a list of words.
 *
 * The visibility failsafe is armed on entering the viewport, not on mount. The
 * version this replaces started its timer at mount, so every heading below the
 * first screen had already given up by the time the reader scrolled to it and
 * simply appeared — the animation only ever ran above the fold.
 */

type As = "h1" | "h2" | "h3" | "p" | "span";

const EASE = [0.16, 1, 0.3, 1] as const;

export function PerWordCrossfade({
  text,
  as = "p",
  className,
  delay = 0,
  stagger = 0.055,
  duration = 0.62,
  triggerOnView = true,
}: {
  text: string;
  as?: As;
  className?: string;
  /** Seconds before the first word starts. */
  delay?: number;
  /** Seconds between one word and the next. */
  stagger?: number;
  duration?: number;
  /** Off means it plays on mount instead of on scroll. */
  triggerOnView?: boolean;
}) {
  const reduce = useReducedMotion();
  const Tag = motion[as] as typeof motion.p;
  const hostRef = React.useRef<HTMLParagraphElement>(null);
  const [inView, setInView] = React.useState(!triggerOnView);
  const [bail, setBail] = React.useState(false);

  const words = React.useMemo(() => text.split(" "), [text]);

  React.useEffect(() => {
    if (!triggerOnView || reduce) return;
    const el = hostRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setInView(true);
        io.disconnect();
      },
      { threshold: 0.2, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [triggerOnView, reduce]);

  /* IntersectionObserver runs in a background tab; the animation that follows
     runs on rAF, which does not. Two and a half seconds after the line is on
     screen, show it whatever the animation was doing. */
  React.useEffect(() => {
    if (!inView) return;
    const id = window.setTimeout(() => setBail(true), 2500);
    return () => window.clearTimeout(id);
  }, [inView]);

  if (reduce || bail) {
    return React.createElement(as, { className }, text);
  }

  return (
    <Tag
      ref={hostRef}
      className={className}
      aria-label={text}
      initial="hidden"
      animate={inView ? "shown" : "hidden"}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
    >
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          aria-hidden="true"
          style={{ display: "inline-block" }}
          variants={{
            hidden: { opacity: 0, y: 8 },
            shown: { opacity: 1, y: 0 },
          }}
          transition={{ duration, ease: EASE }}
        >
          {word}
          {i < words.length - 1 ? " " : ""}
        </motion.span>
      ))}
    </Tag>
  );
}
