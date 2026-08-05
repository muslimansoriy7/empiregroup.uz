"use client";

import * as React from "react";

/**
 * A button wearing a rotating conic glow.
 *
 * The glow is one blurred conic-gradient layer behind the button, spun by a
 * CSS keyframe on a registered custom property — no JS per frame, and it stops
 * dead under prefers-reduced-motion. Renders as <a> or <button> depending on
 * whether it is given an href, so a link stays a link.
 *
 * Only the page's primary calls to action wear it; used everywhere it would
 * stop meaning "this is the thing to press".
 */

type Common = {
  children: React.ReactNode;
  colors?: string[];
  /** seconds per rotation — @default 5 */
  duration?: number;
  blur?: "soft" | "strong";
  /** how far the glow spills past the button — @default 1 */
  glowScale?: number;
  className?: string;
};

const DEFAULT_COLORS = ["#387CCD", "#7A5CE0", "#E0457B", "#F2B705", "#387CCD"];

function glowStyle({
  colors = DEFAULT_COLORS,
  duration = 5,
  blur = "strong",
  glowScale = 1,
}: Common): React.CSSProperties {
  return {
    ["--nx-glow" as string]: colors.join(","),
    ["--nx-glow-dur" as string]: `${duration}s`,
    ["--nx-glow-blur" as string]: blur === "strong" ? "14px" : "7px",
    ["--nx-glow-scale" as string]: String(glowScale),
  };
}

export function NxGlowButton(
  props: Common & { href?: string; target?: string; rel?: string; onClick?: () => void; type?: "button" | "submit" }
) {
  const { children, className = "", href, target, rel, onClick, type } = props;
  const cls = `nx-glow ${className}`.trim();
  const style = glowStyle(props);

  const inner = (
    <>
      <span className="nx-glow-ring" aria-hidden="true" />
      <span className="nx-glow-face">{children}</span>
    </>
  );

  if (href) {
    return (
      <a className={cls} style={style} href={href} target={target} rel={rel}>
        {inner}
      </a>
    );
  }
  return (
    <button className={cls} style={style} type={type ?? "button"} onClick={onClick}>
      {inner}
    </button>
  );
}
