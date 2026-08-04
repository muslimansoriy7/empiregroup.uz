"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Container } from "../Container";
import { Reveal } from "../Reveal";
import { useI18n } from "@/lib/i18n";

export function Faq() {
  const { t } = useI18n();
  const faq = t.faq;
  const reduce = useReducedMotion();
  // single-open accordion — only one panel is expanded at a time
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="scroll-mt-10 py-[var(--section-py)]">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="max-w-md">
            <span className="eyebrow">{faq.eyebrow}</span>
            <h2 className="mt-4 text-h2 text-ink">{faq.title}</h2>
          </div>

          <Reveal as="div" className="divide-y divide-hairline border-y border-hairline">
            {faq.items.map((item, i) => {
              const isOpen = open === i;
              return (
                <div key={item.q}>
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      className="flex w-full cursor-pointer items-center justify-between gap-4 py-5 text-left text-[16px] font-medium text-ink transition-colors hover:text-body"
                    >
                      {item.q}
                      <span
                        className={`grid size-7 shrink-0 place-items-center rounded-full border text-mute transition-all duration-300 ${
                          isOpen
                            ? "rotate-45 border-ink/25 bg-canvas text-ink"
                            : "border-hairline"
                        }`}
                      >
                        <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                          <path d="M12 5v14M5 12h14" />
                        </svg>
                      </span>
                    </button>
                  </h3>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={reduce ? false : { height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                        transition={{
                          height: { duration: 0.34, ease: [0.22, 1, 0.36, 1] },
                          opacity: { duration: 0.26, ease: "easeOut" },
                        }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-xl pb-5 text-[15px] leading-relaxed text-body">
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
