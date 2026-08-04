"use client";

import { useRef } from "react";

const LOGOS = [
  { src: "/clients/Group-1.webp", alt: "MedFlow", scale: 1 },
  { src: "/clients/PrimeAcademy.png", alt: "Prime Academy", scale: 1 },
  { src: "/clients/DentaLife.webp", alt: "DentaLife", scale: 0.8 },
  { src: "/clients/Group-2.webp", alt: "Grand Osiyo Textile", scale: 1.2 },
  { src: "/clients/Group-3.webp", alt: "Texnika Ijara", scale: 1.2 },
  { src: "/clients/Group-4.webp", alt: "X Wear", scale: 0.8 },
  { src: "/clients/Tamir24.webp", alt: "Tamir24", scale: 0.9 },
  { src: "/clients/Group-5.webp", alt: "GadgetSpace", scale: 1 },
  { src: "/clients/Group-6.webp", alt: "Hilol Market", scale: 1 },
  { src: "/clients/Group.webp", alt: "Motor Lux", scale: 0.8 },
];

export function LogoMarquee() {
  const trackRef = useRef<HTMLDivElement>(null);

  // Smoothly slow the marquee (no jump) while hovering over the logos.
  const setRate = (rate: number) => {
    trackRef.current
      ?.getAnimations()
      .forEach((a) => (a.playbackRate = rate));
  };

  const track = [...LOGOS, ...LOGOS];

  return (
    <div
      className="marquee-mask group relative overflow-hidden"
      onMouseEnter={() => setRate(0.2)}
      onMouseLeave={() => setRate(1)}
    >
      <div
        ref={trackRef}
        className="marquee-track flex w-max items-center gap-x-9 motion-reduce:animate-none sm:gap-x-14"
      >
        {track.map((logo, i) => (
          // uniform, fixed-size slot with the logo capped WELL inside it, so no
          // matter how wide a given file is (or how much whitespace it carries),
          // there is always the same clear gap between two neighbouring marks.
          <div
            key={i}
            className="flex h-16 w-[132px] shrink-0 items-center justify-center sm:w-[150px]"
          >
            <img
              src={logo.src}
              alt={i < LOGOS.length ? logo.alt : ""}
              aria-hidden={i >= LOGOS.length}
              draggable={false}
              loading="lazy"
              decoding="async"
              style={{ "--s": logo.scale } as React.CSSProperties}
              className="logo-scale max-h-7 max-w-[118px] select-none object-contain opacity-50 grayscale transition hover:opacity-100 hover:grayscale-0 dark:opacity-45 dark:invert sm:max-w-[132px]"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
