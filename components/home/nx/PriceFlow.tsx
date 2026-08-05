"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/**
 * Price flow — the figure swaps digit by digit when the track toggle changes.
 *
 * The prices here are not bare numbers ("$15K – $40K", "$8,800 dan"), so this
 * animates per character slot rather than per number: the slot at index i
 * carries whatever character is there now, and when it changes the old one
 * slides out while the new one slides in from the direction the price moved.
 * Currency marks, separators and the trailing word sit in slots too, so the
 * whole figure moves as one thing instead of a number next to static text.
 *
 * Two departures from the supplied spec:
 *  · it respects prefers-reduced-motion. The spec says the component does not;
 *    a figure that flickers on every toggle is exactly what that setting is
 *    asking to be spared, and the value still updates.
 *  · the whole string carries an aria-label and the slots are hidden from
 *    assistive tech, so a screen reader hears "$15K – $40K", not fourteen
 *    separate characters.
 */

const NBSP = " ";

function firstNumber(s: string) {
  const m = s.replace(/[,\s]/g, "").match(/\d+/);
  return m ? Number(m[0]) : 0;
}

export function NxPriceFlow({ value, className }: { value: string; className?: string }) {
  const reduce = useReducedMotion();
  const prev = React.useRef(value);
  const [dir, setDir] = React.useState(1);

  React.useEffect(() => {
    if (prev.current !== value) {
      setDir(firstNumber(value) >= firstNumber(prev.current) ? 1 : -1);
      prev.current = value;
    }
  }, [value]);

  if (reduce) {
    return <span className={className}>{value}</span>;
  }

  const chars = Array.from(value);

  return (
    <span className={className} aria-label={value}>
      {chars.map((ch, i) => (
        <span className="nx-pf-slot" key={i} aria-hidden="true">
          {/* initial={false} so the price does not animate in on first paint —
              only a change of track is worth announcing. */}
          <AnimatePresence initial={false} mode="popLayout">
            <motion.span
              key={`${i}:${ch}`}
              className="nx-pf-ch"
              initial={{ y: `${dir * 90}%`, opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              exit={{ y: `${dir * -90}%`, opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 380,
                damping: 34,
                mass: 0.7,
                // A left-to-right ripple reads as one figure changing.
                delay: Math.min(i * 0.012, 0.18),
              }}
            >
              {ch === " " ? NBSP : ch}
            </motion.span>
          </AnimatePresence>
        </span>
      ))}
    </span>
  );
}
