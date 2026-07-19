"use client";

import { Container } from "../Container";
import { Button } from "../Button";
import { MeshGradient } from "../MeshGradient";
import { Reveal } from "../Reveal";
import { HeroTransform } from "../HeroTransform";
import { ArrowRight } from "../Icons";
import { useI18n } from "@/lib/i18n";
import { useConsult } from "../ConsultModal";

export function Hero() {
  const { t } = useI18n();
  const { open: openConsult } = useConsult();
  const hero = t.hero;

  return (
    <section id="top" className="relative overflow-hidden">
      <MeshGradient />
      <div className="grid-lines absolute inset-0 -z-10 opacity-60" aria-hidden />

      <Container className="relative">
        <div className="grid items-center gap-14 pb-20 pt-24 sm:pt-32 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:pb-28">
          {/* left — pitch */}
          <div className="max-w-2xl">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-hairline bg-elevated/80 px-3 py-1 font-mono text-[12px] text-mute backdrop-blur-sm">
                <span className="size-1.5 rounded-full bg-link" />
                {hero.eyebrow}
              </span>
            </Reveal>

            <Reveal delay={0.06}>
              {/* All-ink headline — no accent color in the text.
                  Font-size trimmed to 85% of the display token (per client),
                  keeping the display line-height / tracking / weight. */}
              <h1
                className="mt-6 text-balance text-display text-ink"
                style={{ fontSize: "clamp(2.34rem, 1.19rem + 4.42vw, 4.25rem)" }}
              >
                {hero.title}
              </h1>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-6 max-w-xl text-pretty text-lead-lg text-body">
                {hero.subtitle}
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Button
                  onClick={openConsult}
                  variant="primary"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  {hero.primaryCta.label}
                  <ArrowRight className="size-4" />
                </Button>
                <Button
                  href={hero.secondaryCta.href}
                  variant="secondary"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  {hero.secondaryCta.label}
                </Button>
              </div>
            </Reveal>
          </div>

          {/* right — animated problem → solution infographic */}
          <Reveal as="div" delay={0.14}>
            <HeroTransform />
          </Reveal>
        </div>

        {/* stat bar — set apart with generous breathing room */}
        <Reveal as="div" delay={0.1}>
          <div className="grid grid-cols-2 divide-hairline overflow-hidden rounded-[16px] border border-hairline bg-elevated/60 backdrop-blur-sm sm:grid-cols-4 sm:divide-x">
            {hero.stats.map((s) => (
              <div key={s.label} className="flex flex-col px-5 py-6 sm:px-6">
                <span className="text-[clamp(1.75rem,1.2rem+1.6vw,2.5rem)] font-semibold leading-none tracking-[-0.04em] text-ink">
                  {s.value}
                </span>
                <span className="mt-2 text-[13px] text-mute">{s.label}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
