"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/**
 * Bottom navigation for phones — the dock, adapted to a touchscreen.
 *
 * The supplied Dock magnifies icons around the cursor. There is no cursor
 * here, so that half is dropped rather than faked; what carries over is the
 * floating rounded bar, the blurred ground, the labels and the spring. In its
 * place the dock does the job the desktop nav does: it says which chapter you
 * are in, tracked from the same scroll observer that drives the top nav.
 *
 * It hides while the page is at the very top — the hero already has the CTA —
 * and while the reader is scrolling up towards the header, so it is never
 * competing with the nav it duplicates.
 */

export type DockItem = {
  id: string;
  label: string;
  href: string;
  icon: React.ReactNode;
  /** Renders as the filled action at the end of the row. */
  accent?: boolean;
};

export function NxDock({
  items,
  activeId,
  hidden = false,
}: {
  items: DockItem[];
  activeId: string;
  /** Suppressed while the drawer or a modal owns the screen. */
  hidden?: boolean;
}) {
  const reduce = useReducedMotion();
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 420);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const visible = show && !hidden;

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          className="nx-dock"
          aria-label="Bottom navigation"
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.96 }}
          transition={
            reduce ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 34, mass: 0.8 }
          }
        >
          {items.map((item) => {
            const on = item.id === activeId;
            return (
              <a
                key={item.id}
                href={item.href}
                className={`nx-dock-item${on ? " on" : ""}${item.accent ? " accent" : ""}`}
                aria-current={on ? "true" : undefined}
              >
                {/* The lit ground slides between items rather than fading in
                    under each, so the row reads as one control. */}
                {on && !item.accent && (
                  <motion.span
                    className="nx-dock-pill"
                    layoutId="nx-dock-pill"
                    aria-hidden="true"
                    transition={
                      reduce
                        ? { duration: 0 }
                        : { type: "spring", stiffness: 480, damping: 38, mass: 0.7 }
                    }
                  />
                )}
                <span className="nx-dock-icon" aria-hidden="true">
                  {item.icon}
                </span>
                <span className="nx-dock-label">{item.label}</span>
              </a>
            );
          })}
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
