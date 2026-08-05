"use client";

import * as React from "react";
import { motion } from "framer-motion";

/**
 * Portfolio as an index that opens under the cursor.
 *
 * Collapsed it is a list of ruled rows — every project readable at a glance,
 * in the order they were built. Hovering springs one row open to reveal the
 * capture and dims the rest, so the page stops being seven screenshot cards
 * competing for the same attention.
 *
 * Touch has no hover, so where the device cannot hover the first tap opens a
 * row and the second follows the link; that state is held here, not in CSS.
 */

export type HoverExpandItem = {
  label: string;
  sublabel?: string;
  description?: string;
  image: string;
  href: string;
};

export function NxHoverExpand({
  items,
  collapsedHeight = 76,
  expandedHeight = 330,
}: {
  items: HoverExpandItem[];
  collapsedHeight?: number;
  expandedHeight?: number;
}) {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);
  const [noHover, setNoHover] = React.useState(false);

  // `hover: none` is the capability question. `pointer: coarse` answers a
  // different one and would strip hover from a touchscreen laptop that has a
  // perfectly good trackpad.
  React.useEffect(() => {
    const mq = window.matchMedia("(hover: none)");
    const sync = () => setNoHover(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return (
    <div className="nx-hx">
      {items.map((item, i) => {
        const open = openIndex === i;
        const dimmed = openIndex !== null && !open;

        return (
          <motion.a
            key={item.href}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`nx-hx-row${open ? " open" : ""}`}
            /* Start at the collapsed height rather than springing up from zero
               on mount — that opening animation had no meaning and left the
               row half-height if the tab was throttled while it ran. */
            initial={false}
            style={{ height: collapsedHeight }}
            animate={{
              height: open ? expandedHeight : collapsedHeight,
              opacity: dimmed ? 0.4 : 1,
            }}
            transition={{
              height: { type: "spring", stiffness: 280, damping: 32, mass: 0.9 },
              opacity: { duration: 0.22, ease: "easeOut" },
            }}
            onHoverStart={() => !noHover && setOpenIndex(i)}
            onHoverEnd={() => !noHover && setOpenIndex(null)}
            onFocus={() => setOpenIndex(i)}
            onBlur={() => setOpenIndex(null)}
            onClick={(e) => {
              // First tap reveals, second opens the site.
              if (noHover && !open) {
                e.preventDefault();
                setOpenIndex(i);
              }
            }}
          >
            <motion.span
              className="nx-hx-media"
              aria-hidden="true"
              initial={false}
              animate={{ opacity: open ? 1 : 0, scale: open ? 1 : 1.06 }}
              transition={{
                opacity: { duration: 0.45, ease: [0.23, 1, 0.32, 1] },
                scale: { duration: 0.55, ease: [0.23, 1, 0.32, 1] },
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.image} alt="" loading="lazy" decoding="async" />
              <span className="nx-hx-veil" />
            </motion.span>

            <span className="nx-hx-bar">
              <span className="nx-hx-left">
                <span className="nx-hx-n">{String(i + 1).padStart(2, "0")}</span>
                <span className="nx-hx-label">{item.label}</span>
                {item.description && (
                  <motion.span
                    className="nx-hx-desc"
                    initial={false}
                    animate={{ opacity: open ? 1 : 0, x: open ? 0 : -8 }}
                    transition={{
                      duration: 0.3,
                      delay: open ? 0.12 : 0,
                      ease: [0.23, 1, 0.32, 1],
                    }}
                  >
                    {item.description}
                  </motion.span>
                )}
              </span>
              {item.sublabel && <span className="nx-hx-sub">{item.sublabel}</span>}
            </span>
          </motion.a>
        );
      })}
    </div>
  );
}
