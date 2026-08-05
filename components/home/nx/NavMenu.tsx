"use client";

import * as React from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

/**
 * Navigation with a sliding highlight and a single morphing dropdown.
 *
 * Two behaviours from the supplied MotionNavigationMenu are kept because they
 * are what make it feel considered: one shared panel that resizes and slides to
 * sit under whichever trigger is open (rather than a panel per item that pops),
 * and a pill that travels between items instead of appearing under each.
 *
 * The `Highlight` primitive it imported does not exist here, so the pill is a
 * `layoutId` shared element — same effect, no new dependency.
 */

export type NavPanelLink = { label: string; href: string; note?: string };
export type NavEntry = {
  id: string;
  label: string;
  href: string;
  /** When present the item becomes a trigger instead of a plain link. */
  panel?: NavPanelLink[];
};

const SPRING = { type: "spring" as const, stiffness: 350, damping: 32, bounce: 0 };

export function NxNavMenu({
  entries,
  activeId,
  localePath,
}: {
  entries: NavEntry[];
  /** Chapter the reader is currently in, from the scroll spy. */
  activeId: string;
  localePath: (href: string) => string;
}) {
  const [open, setOpen] = React.useState<string | null>(null);
  const [hovered, setHovered] = React.useState<string | null>(null);
  const rootRef = React.useRef<HTMLDivElement>(null);
  const [panelX, setPanelX] = React.useState(0);

  const entry = entries.find((e) => e.id === open);

  // Park the panel under its trigger, then pull it back inside the nav if it
  // would hang off either end.
  const place = React.useCallback((id: string) => {
    const root = rootRef.current;
    if (!root) return;
    const trigger = root.querySelector<HTMLElement>(`[data-nav="${id}"]`);
    if (!trigger) return;
    const r = root.getBoundingClientRect();
    const t = trigger.getBoundingClientRect();
    setPanelX(t.left - r.left + t.width / 2);
  }, []);

  React.useEffect(() => {
    if (open) place(open);
  }, [open, place]);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const marker = hovered ?? (open || activeId);

  return (
    <div
      className="nx-nav-menu"
      ref={rootRef}
      onPointerLeave={() => {
        setOpen(null);
        setHovered(null);
      }}
    >
      <ul className="nx-nav-list">
        {entries.map((e) => {
          const isMarked = marker === e.id;
          const content = (
            <>
              {isMarked && (
                <motion.span
                  layoutId="nx-nav-pill"
                  className="nx-nav-pill"
                  transition={SPRING}
                  aria-hidden="true"
                />
              )}
              <span className="nx-nav-text">{e.label}</span>
              {e.panel && (
                <motion.span
                  className="nx-nav-caret"
                  aria-hidden="true"
                  animate={{ rotate: open === e.id ? 180 : 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                >
                  <svg width="11" height="11" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M4 6l4 4 4-4"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.span>
              )}
            </>
          );

          return (
            <li key={e.id}>
              <a
                data-nav={e.id}
                href={e.href}
                className={`nx-navlink${activeId === e.id ? " active" : ""}`}
                aria-current={activeId === e.id ? "true" : undefined}
                aria-expanded={e.panel ? open === e.id : undefined}
                onPointerEnter={() => {
                  setHovered(e.id);
                  setOpen(e.panel ? e.id : null);
                }}
                onFocus={() => {
                  setHovered(e.id);
                  setOpen(e.panel ? e.id : null);
                }}
              >
                {content}
              </a>
            </li>
          );
        })}
      </ul>

      <motion.div
        className="nx-nav-drop-anchor"
        initial={false}
        animate={{ left: panelX }}
        transition={SPRING}
      >
        <AnimatePresence initial={false}>
          {entry?.panel && (
            <motion.div
              key={entry.id}
              className="nx-nav-drop"
              initial={{ opacity: 0, y: -6, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.97 }}
              transition={SPRING}
            >
              {entry.panel.map((l) =>
                l.href.startsWith("#") ? (
                  <a key={l.href + l.label} href={l.href} className="nx-nav-drop-link">
                    <span>{l.label}</span>
                    {l.note && <span className="nx-nav-drop-note">{l.note}</span>}
                  </a>
                ) : (
                  <Link
                    key={l.href + l.label}
                    href={localePath(l.href)}
                    className="nx-nav-drop-link"
                  >
                    <span>{l.label}</span>
                    {l.note && <span className="nx-nav-drop-note">{l.note}</span>}
                  </Link>
                )
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
