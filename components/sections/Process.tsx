"use client";

import { Container } from "../Container";
import { Reveal } from "../Reveal";
import { Button } from "../Button";
import { ArrowRight } from "../Icons";
import { GlowCard } from "../ui/spotlight-card";
import { accentGradient, type Accent } from "@/lib/accents";
import { useI18n } from "@/lib/i18n";

const ACCENTS: Accent[] = ["develop", "preview", "ship", "develop"];

const GLOW: Record<Accent, "blue" | "purple" | "orange"> = {
  develop: "blue",
  preview: "purple",
  ship: "orange",
};

export function Process() {
  const { t } = useI18n();
  const process = t.process;
  const total = process.steps.length;

  return (
    <section
      id="jarayon"
      className="scroll-mt-10 border-t border-hairline bg-canvas py-[clamp(72px,9vw,128px)]"
    >
      <Container>
        <div className="max-w-2xl">
          <span className="eyebrow">{process.eyebrow}</span>
          <h2 className="mt-4 text-h2 text-ink">{process.title}</h2>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {process.steps.map((s, i) => {
            const accent = ACCENTS[i % ACCENTS.length];
            return (
              <Reveal as="div" key={s.no} delay={(i % 2) * 0.08}>
                <GlowCard
                  customSize
                  glowColor={GLOW[accent]}
                  className="group !block h-full !gap-0 !rounded-[16px] !p-0 !shadow-none cursor-pointer transition-transform duration-300 ease-out hover:-translate-y-1"
                >
                  <div className="relative h-full overflow-hidden rounded-[15px] bg-elevated p-7 transition-shadow duration-300 group-hover:shadow-[0_22px_48px_-30px_rgba(0,0,0,0.35)] sm:p-9">
                    {/* step colour bar */}
                    <span
                      aria-hidden
                      className="absolute inset-x-0 top-0 h-[3px]"
                      style={{ background: accentGradient(accent) }}
                    />
                    {/* oversized ghost number */}
                    <span
                      aria-hidden
                      className="pointer-events-none absolute -right-1 -top-7 select-none text-[120px] font-semibold leading-none tracking-tighter text-ink/[0.045] transition-transform duration-500 group-hover:-translate-y-1"
                    >
                      {s.no}
                    </span>

                    <div className="relative">
                      <span className="inline-flex h-7 items-center gap-2 rounded-full border border-hairline bg-canvas px-3 font-mono text-[11px] font-medium text-mute">
                        <span
                          className="size-1.5 rounded-full"
                          style={{ background: accentGradient(accent) }}
                        />
                        {s.no} / {String(total).padStart(2, "0")}
                      </span>
                      <h3 className="mt-6 text-[22px] font-semibold tracking-tight text-ink sm:text-[26px]">
                        {s.title}
                      </h3>
                      <p className="mt-3 max-w-md text-lead text-body">{s.body}</p>
                      <div className="mt-5 flex flex-wrap gap-2">
                        {s.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-hairline bg-canvas px-3 py-1 text-[12px] font-medium text-mute"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </GlowCard>
              </Reveal>
            );
          })}
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
