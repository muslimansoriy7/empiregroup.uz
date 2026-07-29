"use client";

import { Container } from "../Container";
import { Reveal } from "../Reveal";
import { Button } from "../Button";
import { ArrowRight } from "../Icons";
import { useI18n } from "@/lib/i18n";

/**
 * Qanday ishlaymiz — a connected four-step rail (Explore → Plan → Build →
 * Commit). Each step is a numbered ink node linked by a hairline on desktop, so
 * the sequence reads as one flow rather than four detached blocks. Clean,
 * monochrome, Questly.
 */
export function Process() {
  const { t } = useI18n();
  const process = t.process;
  const steps = process.steps;

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

        {/* the flow chips — Explore → Plan → Build → Commit */}
        <Reveal as="div" className="mt-8">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-2 text-[13px] font-medium">
            {steps.map((s, i) => (
              <span key={s.no} className="inline-flex items-center gap-2">
                <span className="rounded-full border border-hairline bg-elevated px-3.5 py-1.5 text-ink shadow-[var(--shadow-whisper)]">
                  {s.title}
                </span>
                {i < steps.length - 1 && (
                  <ArrowRight className="size-3.5 text-faint" />
                )}
              </span>
            ))}
          </div>
        </Reveal>

        {/* each step is its own card, lifting on hover */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal as="div" key={s.no} delay={i * 0.08}>
              <div className="group/step flex h-full flex-col rounded-[var(--radius-card-lg)] border border-hairline bg-elevated p-6 transition-[transform,border-color,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:border-ink/15 hover:shadow-[var(--shadow-float)]">
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-ink text-[15px] font-semibold text-elevated transition-transform duration-300 group-hover/step:scale-105">
                  {s.no}
                </span>
                <h3 className="mt-5 text-[19px] font-semibold tracking-tight text-ink">
                  {s.title}
                </h3>
                <p className="mt-2 flex-1 text-[14.5px] leading-relaxed text-body">
                  {s.body}
                </p>
                {s.tags.length > 0 && (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {s.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-hairline bg-canvas px-2.5 py-1 text-[11px] text-mute"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal as="div" delay={0.1} className="mt-12">
          <Button href={process.ctaHref} variant="primary" size="lg">
            {process.ctaLabel}
            <ArrowRight className="size-4" />
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
