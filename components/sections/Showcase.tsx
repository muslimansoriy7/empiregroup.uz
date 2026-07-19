"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";
import { Container } from "../Container";
import { BrowserFrame } from "../BrowserFrame";
import { useI18n } from "@/lib/i18n";

// real case screenshots per tab
const SLIDES: Record<
  string,
  { url: string; img: string; type: "browser" | "phone" }
> = {
  crm: { url: "autoservice.crm.uz", img: "/cases/case-autoservice-desktop.webp", type: "browser" },
  mobile: { url: "kassa.app", img: "/cases/case-kassa-mobile.webp", type: "phone" },
  erp: { url: "erp.textile.uz", img: "/cases/case-textile-desktop.webp", type: "browser" },
  ecommerce: { url: "gadgetspace.uz", img: "/cases/case-gadgetspace-desktop.webp", type: "browser" },
};

export function Showcase() {
  const { t } = useI18n();
  const showcase = t.showcase;
  const reduce = useReducedMotion();
  const [active, setActive] = useState<string>(showcase.tabs[0].id);
  const [touched, setTouched] = useState(false);

  const tab = showcase.tabs.find((tb) => tb.id === active) ?? showcase.tabs[0];
  const slide = SLIDES[active] ?? SLIDES.crm;
  const alt = `${tab.title} — ${tab.subtitle}`;

  const select = (id: string) => {
    setTouched(true);
    setActive(id);
  };

  return (
    <section
      className="relative z-10 pb-[clamp(24px,4vw,48px)] pt-[clamp(48px,7vw,96px)]"
      aria-label="Mahsulot namunalari"
    >
      <Container>
        {/* tabs */}
        <div
          role="group"
          aria-label="Loyiha turlari"
          className="mb-6 flex flex-wrap items-center justify-center gap-2"
        >
          {showcase.tabs.map((tb) => (
            <button
              key={tb.id}
              type="button"
              aria-pressed={active === tb.id}
              onClick={() => select(tb.id)}
              className={cn(
                "h-9 rounded-[var(--radius-pill-cat)] px-4 text-sm font-medium transition-colors",
                active === tb.id
                  ? "bg-ink text-elevated"
                  : "border border-hairline bg-elevated text-body hover:border-ink/30 hover:text-ink"
              )}
            >
              {tb.label}
            </button>
          ))}
        </div>

        {/* fixed-height stage — height is constant per breakpoint, so switching
            tabs never changes the section height (no page-wide layout shift) */}
        <div className="mx-auto flex h-[300px] w-full max-w-[1080px] items-center justify-center sm:h-[440px] lg:h-[600px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={touched && !reduce ? { opacity: 0, y: 10 } : false}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -10 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="flex h-full w-full items-center justify-center"
            >
              {slide.type === "phone" ? (
                // height-driven phone — fits the stage height exactly
                <div className="relative flex h-full max-h-full aspect-[9/19.5] rounded-[clamp(24px,4vw,40px)] bg-ink p-1.5 shadow-[var(--shadow-float)] sm:p-2">
                  <div className="relative w-full overflow-hidden rounded-[clamp(18px,3.2vw,32px)] border border-hairline bg-canvas">
                    <div className="absolute left-1/2 top-2 z-10 h-3.5 w-16 -translate-x-1/2 rounded-full bg-ink sm:h-4 sm:w-20" />
                    <Image
                      src={slide.img}
                      alt={alt}
                      fill
                      sizes="320px"
                      className="object-cover object-top"
                    />
                  </div>
                </div>
              ) : (
                <BrowserFrame showUrl={false} float className="h-full w-full">
                  <div className="relative h-full w-full">
                    <Image
                      src={slide.img}
                      alt={alt}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 1080px"
                      className="object-cover object-top"
                    />
                  </div>
                </BrowserFrame>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* caption */}
        <p className="mt-6 text-center text-sm text-mute">
          <span className="font-medium text-ink">{tab.title}</span>
          {" — "}
          {tab.subtitle}. {showcase.caption}
        </p>
      </Container>
    </section>
  );
}
