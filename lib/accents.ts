/**
 * Accent gradients — the three Vercel stops, sourced from CSS tokens.
 * Single source so Portfolio, Features, and mockups stay in sync.
 */
export type Accent = "develop" | "preview" | "ship";

const STOPS: Record<Accent, [string, string]> = {
  develop: [
    "var(--color-grad-develop-start)",
    "var(--color-grad-develop-end)",
  ],
  preview: [
    "var(--color-grad-preview-start)",
    "var(--color-grad-preview-end)",
  ],
  ship: ["var(--color-grad-ship-start)", "var(--color-grad-ship-end)"],
};

export function accentGradient(accent: Accent): string {
  const [a, b] = STOPS[accent];
  return `linear-gradient(135deg, ${a}, ${b})`;
}

/** Sweeping conic arc — for spinning halo rings. */
export function accentConic(accent: Accent): string {
  const [a, b] = STOPS[accent];
  return `conic-gradient(from 0deg, transparent 6%, ${a} 36%, ${b} 64%, transparent 94%)`;
}
