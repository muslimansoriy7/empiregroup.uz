"use client";

import { Container } from "../Container";
import { Reveal } from "../Reveal";
import { Button } from "../Button";
import { ArrowRight } from "../Icons";
import { useI18n } from "@/lib/i18n";

/**
 * Qanday ishlaymiz — minimal numbered list. Clean hairline-separated steps with
 * a mono index, no glow cards or oversized ghost numbers. The restraint is the
 * point: the process reads as calm and engineered.
 */
export function Process() {
  const { t } = useI18n();
  const process = t.process;
  const total = String(process.steps.length).padStart(2, "0");

  return (
    <section
      id="jarayon"
      className="scroll-mt-10 border-t border-hairline bg-canvas py-[var(--section-py)]"
    >
      <Container>
        <div className="max-w-2xl">
          <span className="eyebrow">{process.eyebrow}</span>
          <h2 className="mt-4 text-h2 text-ink">{process.title}</h2>
        </div>

        <div className="mt-14 border-t border-hairline">
          {process.steps.map((s, i) => (
            <Reveal as="div" key={s.no} delay={i * 0.05}>
              <div className="grid gap-3 border-b border-hairline py-8 sm:grid-cols-[90px_1fr] sm:gap-12">
                <div className="font-sans text-[13px] text-mute">
                  {s.no} <span className="text-faint">/ {total}</span>
                </div>
                <div className="max-w-2xl">
                  <h3 className="text-[20px] font-semibold tracking-tight text-ink sm:text-[23px]">
                    {s.title}
                  </h3>
                  <p className="mt-2.5 text-[15px] leading-relaxed text-body">
                    {s.body}
                  </p>
                  {s.tags.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {s.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-hairline px-2.5 py-1 font-sans text-[11px] text-mute"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal as="div" delay={0.1} className="mt-10">
          <Button href={process.ctaHref} variant="primary" size="lg">
            {process.ctaLabel}
            <ArrowRight className="size-4" />
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
