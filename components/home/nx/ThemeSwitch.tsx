"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

/**
 * Theme switch, iOS-style: draggable, spring-settled, and the thumb stretches
 * while the pointer is down before snapping back.
 *
 * Adapted from the supplied AppleSwitch — same motion, wired to the site's
 * `data-theme` contract and painted from the .nx tokens instead of utility
 * classes. Reads the attribute on mount so SSR and the first client render
 * agree; the boot script in the root layout has already set it.
 */

const TRACK_W = 50;
const TRACK_H = 28;
const THUMB = 22;
const PAD = 3;
const TRAVEL = TRACK_W - THUMB - PAD * 2;

const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);

export function NxThemeSwitch({ label }: { label: string }) {
  const [dark, setDark] = React.useState<boolean | null>(null);

  const target = useMotionValue(0);
  const thumbX = useSpring(target, { stiffness: 700, damping: 48, mass: 0.55 });
  const grab = useMotionValue(0);
  const grabP = useSpring(grab, { stiffness: 500, damping: 25 });

  // Squash-and-stretch while held, centred so it grows both ways.
  const thumbW = useTransform(grabP, [0, 1], [THUMB, THUMB + PAD * 4]);
  const offsetX = useTransform(() => thumbX.get() - (thumbW.get() - THUMB) / 2);
  const progress = useTransform(thumbX, [0, TRAVEL], [0, 1]);
  const fill = useTransform(progress, [0, 1], [0, 1]);
  const iconSun = useTransform(progress, [0, 0.55], [1, 0]);
  const iconMoon = useTransform(progress, [0.45, 1], [0, 1]);

  const startX = React.useRef(0);
  const startThumb = React.useRef(0);
  const dragging = React.useRef(false);
  const pointerId = React.useRef<number | null>(null);
  const swallowClick = React.useRef(false);

  React.useEffect(() => {
    const isDark = document.documentElement.getAttribute("data-theme") === "dark";
    setDark(isDark);
    target.set(isDark ? TRAVEL : 0);
  }, [target]);

  const apply = React.useCallback(
    (next: boolean) => {
      document.documentElement.setAttribute("data-theme", next ? "dark" : "light");
      try {
        localStorage.setItem("theme", next ? "dark" : "light");
      } catch {
        /* private mode — still works for this session */
      }
      setDark(next);
      target.set(next ? TRAVEL : 0);
    },
    [target]
  );

  const onDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    pointerId.current = e.pointerId;
    grab.set(1);
    startX.current = e.clientX;
    startThumb.current = thumbX.get();
    target.set(startThumb.current);
    dragging.current = false;
  };

  const onMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (pointerId.current !== e.pointerId) return;
    if (!e.currentTarget.hasPointerCapture(e.pointerId)) return;
    const dx = e.clientX - startX.current;
    if (Math.abs(dx) > 3) dragging.current = true;
    if (!dragging.current) return;
    e.preventDefault();
    target.set(clamp(startThumb.current + dx, 0, TRAVEL));
  };

  const onUp = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (pointerId.current !== e.pointerId) return;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    pointerId.current = null;
    grab.set(0);
    if (!dragging.current) return;
    dragging.current = false;
    swallowClick.current = true;
    apply(target.get() >= TRAVEL / 2);
  };

  const onClick = () => {
    if (swallowClick.current) {
      swallowClick.current = false;
      return;
    }
    apply(!dark);
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={dark ?? false}
      aria-label={label}
      title={label}
      className="nx-tswitch"
      onClick={onClick}
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerCancel={() => {
        pointerId.current = null;
        dragging.current = false;
        grab.set(0);
        target.set(dark ? TRAVEL : 0);
      }}
      style={{ width: TRACK_W, height: TRACK_H, touchAction: "pan-y" }}
    >
      <span className="nx-tswitch-track" aria-hidden="true">
        <motion.span className="nx-tswitch-fill" style={{ opacity: fill }} />
      </span>

      <motion.span
        className="nx-tswitch-thumb"
        aria-hidden="true"
        style={{ width: thumbW, height: THUMB, x: offsetX, marginLeft: PAD }}
      >
        {/* Both icons live in the thumb and cross-fade with the travel. */}
        <motion.svg width="12" height="12" viewBox="0 0 24 24" fill="none" style={{ opacity: iconSun }}>
          <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="2" />
          <path
            d="M12 1.5v3M12 19.5v3M1.5 12h3M19.5 12h3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M19.8 4.2l-2.1 2.1M6.3 17.7l-2.1 2.1"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </motion.svg>
        <motion.svg width="12" height="12" viewBox="0 0 24 24" fill="none" style={{ opacity: iconMoon }}>
          <path
            d="M20 14.2A8.2 8.2 0 1 1 9.8 4a6.6 6.6 0 0 0 10.2 10.2Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </motion.svg>
      </motion.span>
    </button>
  );
}
