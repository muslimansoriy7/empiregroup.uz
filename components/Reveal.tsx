"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

/**
 * Reveal — progressive-enhancement scroll reveal.
 *
 * Content is VISIBLE by default (no-JS, crawlers, headless renderers all see it).
 * The hidden→shown entrance only applies when JS is active: a `.js` class on
 * <html> (set synchronously in layout) arms the CSS, and an IntersectionObserver
 * adds `is-visible` when the element scrolls into view. `prefers-reduced-motion`
 * is handled in globals.css. This never gates content behind an animation.
 */
export function Reveal({
  children,
  delay = 0,
  y = 16,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "li" | "span";
}) {
  const Tag = as as React.ElementType;
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (el.classList.contains("is-visible")) return;

    const io = new IntersectionObserver(
      (entries, obs) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.01 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      data-reveal=""
      className={cn(className)}
      style={
        {
          "--reveal-delay": `${delay}s`,
          "--reveal-y": `${y}px`,
        } as React.CSSProperties
      }
    >
      {children}
    </Tag>
  );
}
