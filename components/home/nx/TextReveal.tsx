"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Blur-to-sharp text reveal, triggered when the line enters the viewport.
 *
 * The primitive the demo imported is not in this repo, so this is a rebuild of
 * the same behaviour: split into words (or characters), stagger each one in
 * from blurred and slightly low, and fire once.
 *
 * Two things the demo left implicit and this cannot:
 *  · the split must not destroy the sentence for a screen reader, so the whole
 *    string stays readable via aria-label and the pieces are hidden from AT.
 *  · a word wrapping mid-line must still break normally, hence inline-block
 *    pieces separated by real spaces rather than flex children.
 */

type As = "h1" | "h2" | "h3" | "p" | "span";

export function TextReveal({
  text,
  as = "p",
  className,
  splitBy = "words",
  staggerDelay = 0.045,
  duration = 0.5,
  once = true,
  delay = 0,
}: {
  text: string;
  as?: As;
  className?: string;
  splitBy?: "words" | "characters";
  staggerDelay?: number;
  duration?: number;
  once?: boolean;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  const Tag = motion[as] as typeof motion.p;
  const [bail, setBail] = React.useState(false);

  const pieces = React.useMemo(
    () => (splitBy === "characters" ? Array.from(text) : text.split(" ")),
    [text, splitBy]
  );

  /* Failsafe. Blurred, half-opaque text is worse than no animation, and the
     stagger can stall — a background tab throttles rAF, and whileInView can
     fire while the page is hidden. After four seconds the copy is simply
     shown, whatever the animation was doing. */
  React.useEffect(() => {
    const id = window.setTimeout(() => setBail(true), 4000);
    return () => window.clearTimeout(id);
  }, []);

  // Reduced motion still gets the text, just not the choreography.
  if (reduce || bail) {
    return React.createElement(as, { className }, text);
  }

  return (
    <Tag
      className={className}
      aria-label={text}
      initial="hidden"
      whileInView="shown"
      viewport={{ once, amount: 0.25, margin: "0px 0px -8% 0px" }}
      transition={{ staggerChildren: staggerDelay, delayChildren: delay }}
    >
      {pieces.map((piece, i) => (
        <motion.span
          key={`${piece}-${i}`}
          aria-hidden="true"
          style={{ display: "inline-block", willChange: "filter, opacity, transform" }}
          variants={{
            hidden: { opacity: 0, filter: "blur(8px)", y: "0.32em" },
            shown: { opacity: 1, filter: "blur(0px)", y: 0 },
          }}
          transition={{ duration, ease: [0.23, 1, 0.32, 1] }}
        >
          {piece}
          {splitBy === "words" && i < pieces.length - 1 ? " " : ""}
        </motion.span>
      ))}
    </Tag>
  );
}
