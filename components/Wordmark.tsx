const BRAND = "Empire Group";

/**
 * Empire Group brand lockup — the official logotype (symbol + wordmark).
 *
 * Rendered as a CSS mask filled with `--color-ink`, so the monochrome SVG
 * inherits the theme: dark-on-light in light mode, light-on-dark in dark mode
 * (the ink token flips automatically via prefers-color-scheme). No raster,
 * no second asset to keep in sync.
 */
export function Wordmark({
  href = "#top",
  className = "",
  height = 26,
}: {
  href?: string;
  className?: string;
  /** rendered logo height in px; width follows the 2186×429 aspect ratio */
  height?: number;
}) {
  return (
    <a
      href={href}
      className={`inline-flex items-center ${className}`}
      aria-label={BRAND}
    >
      <span
        role="img"
        aria-label={BRAND}
        className="block shrink-0 transition-opacity hover:opacity-80"
        style={{
          height,
          width: (height * 2186) / 429,
          backgroundColor: "var(--color-ink)",
          WebkitMaskImage: "url(/logo/logotype-black.svg)",
          maskImage: "url(/logo/logotype-black.svg)",
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskPosition: "left center",
          maskPosition: "left center",
          WebkitMaskSize: "contain",
          maskSize: "contain",
        }}
      />
    </a>
  );
}
