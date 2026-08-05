"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Custom cursor: a dot that tracks the pointer exactly, and a label that
 * trails it and names whatever is under it.
 *
 * Rebuilt from the CursorProvider / Cursor / CursorFollow demo, with three
 * decisions the demo did not have to make on a real site:
 *
 *  · The native cursor is never hidden. Replacing it wholesale breaks text
 *    selection, form fields and every affordance the OS provides; this rides
 *    alongside instead, so nothing is lost if the script fails.
 *  · It only mounts where the device can actually hover, and it disappears
 *    when the pointer leaves the window.
 *  · The label comes from `data-cursor` on any element, so sections opt in by
 *    saying what they are rather than the cursor knowing about the page.
 */

export function NxCursor() {
  const [enabled, setEnabled] = React.useState(false);
  const [label, setLabel] = React.useState<string | null>(null);
  const [visible, setVisible] = React.useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  // The dot is exact; the label lags just enough to read as attached to it.
  const lx = useSpring(x, { stiffness: 520, damping: 42, mass: 0.5 });
  const ly = useSpring(y, { stiffness: 520, damping: 42, mass: 0.5 });

  React.useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setEnabled(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  React.useEffect(() => {
    if (!enabled) return;

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!visible) setVisible(true);
      const host = (e.target as Element | null)?.closest?.("[data-cursor]");
      setLabel(host ? host.getAttribute("data-cursor") : null);
    };
    const leave = () => setVisible(false);

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    window.addEventListener("blur", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
      window.removeEventListener("blur", leave);
    };
  }, [enabled, visible, x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        className="nx-cursor-dot"
        aria-hidden="true"
        style={{ x, y }}
        animate={{ opacity: visible ? 1 : 0, scale: label ? 0.4 : 1 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      />
      <motion.div
        className="nx-cursor-label"
        aria-hidden="true"
        style={{ x: lx, y: ly }}
        animate={{
          opacity: visible && label ? 1 : 0,
          scale: visible && label ? 1 : 0.85,
        }}
        transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
      >
        <span>{label}</span>
      </motion.div>
    </>
  );
}
