"use client";

import { useEffect, useState } from "react";

/**
 * Cycles a single word inside the hero headline (vaqt → asab → pul).
 *
 * A hidden sizer holds the width of the longest word so the rest of the line
 * never reflows mid-swap, and the whole effect is skipped for visitors who ask
 * for reduced motion — they simply keep the first word.
 */
export function RotatingWord({ words }: { words: string[] }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (words.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setI((p) => (p + 1) % words.length), 2200);
    return () => clearInterval(id);
  }, [words.length]);

  const widest = words.reduce((a, b) => (b.length > a.length ? b : a), words[0] ?? "");

  return (
    <span className="rot-word">
      <span className="rot-word-sizer" aria-hidden>
        {widest}
      </span>
      <span key={i} className="rot-word-in">
        {words[i]}
      </span>
    </span>
  );
}
