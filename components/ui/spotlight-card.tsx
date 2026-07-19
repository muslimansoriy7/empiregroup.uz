"use client";

import React, { useEffect, useRef, ReactNode } from "react";

interface GlowCardProps {
  children?: ReactNode;
  className?: string;
  glowColor?: "blue" | "purple" | "green" | "red" | "orange";
  size?: "sm" | "md" | "lg";
  width?: string | number;
  height?: string | number;
  customSize?: boolean; // When true, ignores size prop and uses width/height or className
}

const glowColorMap = {
  blue: { base: 200, spread: 60 },
  purple: { base: 265, spread: 65 },
  green: { base: 135, spread: 55 },
  red: { base: 355, spread: 45 },
  orange: { base: 20, spread: 45 },
};

const sizeMap = {
  sm: "w-48 h-64",
  md: "w-64 h-80",
  lg: "w-80 h-96",
};

const GlowCard: React.FC<GlowCardProps> = ({
  children,
  className = "",
  glowColor = "blue",
  size = "md",
  width,
  height,
  customSize = false,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    // element-relative pointer tracking (robust to page scroll / Lenis transforms)
    const syncPointer = (e: PointerEvent) => {
      const r = card.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      card.style.setProperty("--x", x.toFixed(1));
      card.style.setProperty("--y", y.toFixed(1));
      card.style.setProperty("--xp", (x / r.width).toFixed(3));
      card.style.setProperty("--yp", (y / r.height).toFixed(3));
    };

    // hide the glow until the pointer is actually over the card
    const show = () => card.style.setProperty("--glow-active", "1");
    const hide = () => card.style.setProperty("--glow-active", "0");

    card.addEventListener("pointermove", syncPointer);
    card.addEventListener("pointerenter", show);
    card.addEventListener("pointerleave", hide);
    return () => {
      card.removeEventListener("pointermove", syncPointer);
      card.removeEventListener("pointerenter", show);
      card.removeEventListener("pointerleave", hide);
    };
  }, []);

  const { base, spread } = glowColorMap[glowColor];

  const getSizeClasses = () => {
    if (customSize) return "";
    return sizeMap[size];
  };

  const getInlineStyles = (): React.CSSProperties => {
    const baseStyles: React.CSSProperties = {
      "--base": base,
      "--spread": spread,
      "--radius": "16",
      "--border": "1.5",
      "--backdrop": "hsl(0 0% 50% / 0.10)",
      "--backup-border": "var(--backdrop)",
      "--size": "300",
      "--glow-active": "0",
      "--saturation": "100",
      "--lightness": "52",
      "--border-size": "calc(var(--border, 2) * 1px)",
      "--spotlight-size": "calc(var(--size, 150) * 1px)",
      "--hue": "calc(var(--base) + (var(--xp, 0.5) * var(--spread, 0)))",
      backgroundColor: "var(--backdrop, transparent)",
      border: "var(--border-size) solid var(--backup-border)",
      position: "relative",
    } as React.CSSProperties;

    if (width !== undefined) {
      baseStyles.width = typeof width === "number" ? `${width}px` : width;
    }
    if (height !== undefined) {
      baseStyles.height = typeof height === "number" ? `${height}px` : height;
    }

    return baseStyles;
  };

  // Border glow ring (::before) + colored aura (::after) that light up near the pointer.
  const glowStyles = `
    [data-glow]::before,
    [data-glow]::after {
      pointer-events: none;
      content: "";
      position: absolute;
      inset: calc(var(--border-size) * -1);
      border: var(--border-size) solid transparent;
      border-radius: calc(var(--radius) * 1px);
      background-size: 100% 100%;
      background-repeat: no-repeat;
      opacity: var(--glow-active, 0);
      transition: opacity 0.25s ease;
    }

    /* crisp colored border segment right under the pointer */
    [data-glow]::before {
      background-image: radial-gradient(
        calc(var(--spotlight-size) * 0.55) calc(var(--spotlight-size) * 0.55) at
        calc(var(--x, 0) * 1px)
        calc(var(--y, 0) * 1px),
        hsl(var(--hue, 210) calc(var(--saturation) * 1%) calc(var(--lightness) * 1%) / 0.55),
        transparent 100%
      );
      mask: linear-gradient(transparent, transparent), linear-gradient(white, white);
      mask-clip: padding-box, border-box;
      mask-composite: intersect;
      -webkit-mask: linear-gradient(transparent, transparent), linear-gradient(white, white);
      -webkit-mask-clip: padding-box, border-box;
      -webkit-mask-composite: source-in, xor;
    }

    /* soft colored aura bleeding outside the card edge */
    [data-glow]::after {
      inset: calc(var(--border-size) * -1);
      border: none;
      background-image: radial-gradient(
        calc(var(--spotlight-size) * 0.85) calc(var(--spotlight-size) * 0.85) at
        calc(var(--x, 0) * 1px)
        calc(var(--y, 0) * 1px),
        hsl(var(--hue, 210) calc(var(--saturation) * 1%) 55% / 0.20),
        transparent 70%
      );
      filter: blur(14px);
      z-index: -1;
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: glowStyles }} />
      <div
        ref={cardRef}
        data-glow
        style={getInlineStyles()}
        className={`
          ${getSizeClasses()}
          ${!customSize ? "aspect-[3/4]" : ""}
          rounded-2xl
          relative
          isolate
          ${className}
        `}
      >
        {children}

        {/* interior spotlight — rendered ON TOP of content so it stays visible */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-20 rounded-[calc(var(--radius)*1px)]"
          style={{
            opacity: "var(--glow-active, 0)" as unknown as number,
            transition: "opacity 0.25s ease",
            background: `radial-gradient(
              var(--spotlight-size) var(--spotlight-size) at
              calc(var(--x, -9999) * 1px) calc(var(--y, -9999) * 1px),
              hsl(var(--hue, 210) 100% 60% / 0.12),
              transparent 72%
            )`,
          }}
        />
      </div>
    </>
  );
};

export { GlowCard };
