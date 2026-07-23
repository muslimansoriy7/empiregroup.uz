"use client";

import type { BrandLogo } from "@/content/logos";

/**
 * LogoWall — a prestige grid of brand / tool logos.
 *
 * Each tile is muted grayscale at rest and smoothly reveals the official brand
 * colour + a 10% scale-up on hover. Colour is driven by `currentColor`
 * (single-colour marks) so it transitions cleanly; near-black marks carry a
 * light `darkHex` fallback so they stay visible when revealed in dark mode.
 * Amazon (smile) and Microsoft (four-square) are hand-drawn.
 */
export function LogoWall({ logos }: { logos: BrandLogo[] }) {
  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4 lg:grid-cols-5">
      {logos.map((logo) => (
        <li key={logo.title}>
          <div
            title={logo.title}
            className="group/logo grid aspect-[3/2] place-items-center rounded-[var(--radius-card)] border border-hairline bg-elevated transition-colors duration-300 hover:border-ink/15 hover:bg-canvas"
            style={
              {
                "--brand": logo.hex ?? "var(--color-ink)",
                "--brand-dark": logo.darkHex ?? logo.hex ?? "var(--color-ink)",
              } as React.CSSProperties
            }
          >
            <span
              aria-label={logo.title}
              role="img"
              className="block h-7 w-7 text-mute transition-[color,transform] duration-300 group-hover/logo:[color:var(--brand)] motion-safe:group-hover/logo:scale-110 dark:group-hover/logo:[color:var(--brand-dark)] sm:h-8 sm:w-8"
            >
              <LogoMark logo={logo} />
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
}

function LogoMark({ logo }: { logo: BrandLogo }) {
  if (logo.custom === "microsoft") return <MicrosoftMark />;
  if (logo.custom === "amazon") return <AmazonMark />;
  return (
    <svg viewBox="0 0 24 24" className="h-full w-full" fill="currentColor" aria-hidden>
      <path d={logo.path} />
    </svg>
  );
}

/* Amazon — the smile arrow; single-colour so it follows `currentColor`. */
function AmazonMark() {
  return (
    <svg viewBox="0 0 24 24" className="h-full w-full" fill="none" aria-hidden>
      <path
        d="M4 15.2c2.6 1.9 6 2.9 9.1 2.9 2.2 0 4.6-.5 6.9-1.6.35-.16.66.23.32.5-2.1 1.9-5.2 2.9-7.9 2.9-3.8 0-7.2-1.4-9.8-3.75-.2-.18-.02-.43.24-.29z"
        fill="currentColor"
      />
      <path
        d="M20.4 14.2c-.33-.43-2.2-.2-3.03-.1-.25.03-.29-.19-.06-.35 1.49-1.05 3.94-.75 4.22-.4.28.36-.08 2.82-1.48 3.99-.21.18-.42.09-.32-.15.31-.79 1-2.56.67-2.99z"
        fill="currentColor"
      />
    </svg>
  );
}

/* Microsoft — the four-square mark; keeps its four brand colours on hover. */
function MicrosoftMark() {
  return (
    <svg viewBox="0 0 24 24" className="h-full w-full" aria-hidden>
      <rect x="1" y="1" width="10" height="10" className="fill-current transition-colors duration-300 group-hover/logo:fill-[#F25022]" />
      <rect x="13" y="1" width="10" height="10" className="fill-current transition-colors duration-300 group-hover/logo:fill-[#7FBA00]" />
      <rect x="1" y="13" width="10" height="10" className="fill-current transition-colors duration-300 group-hover/logo:fill-[#00A4EF]" />
      <rect x="13" y="13" width="10" height="10" className="fill-current transition-colors duration-300 group-hover/logo:fill-[#FFB900]" />
    </svg>
  );
}
