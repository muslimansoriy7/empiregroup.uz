"use client";

import { cn } from "@/lib/cn";
import { Container } from "../Container";
import { Reveal } from "../Reveal";
import { useI18n } from "@/lib/i18n";

/**
 * Homepage pricing teaser — "Narxni yashirmaymiz". Renders the custom-software
 * package tiers straight from the services dictionary so the homepage and the
 * full /narxlar page never disagree about a number. Full breakdown lives on the
 * pricing page (linked from the nav).
 */
export function Pricing() {
  const { t } = useI18n();
  const pricing = t.pricing;
  const services = t.services;
  // The first service (custom software) carries the headline tiers the hero
  // pricing block shows: Standard / Advanced / Mega.
  const packages = services.items[0]?.packages ?? [];

  return (
    <section
      id="narxlar"
      className="scroll-mt-10 border-t border-hairline bg-canvas py-[var(--section-py)]"
    >
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <span className="eyebrow">{pricing.eyebrow}</span>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-4 text-h2 text-ink">{pricing.title}</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-4 max-w-xl text-[15px] text-body">
              {pricing.intro}
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {packages.map((pkg, i) => (
            <Reveal as="div" key={pkg.name} delay={0.06 * i}>
              <div
                className={cn(
                  "relative flex h-full flex-col rounded-[var(--radius-card-lg)] p-8",
                  pkg.popular
                    ? "bg-ink text-elevated"
                    : "border border-hairline bg-elevated"
                )}
              >
                {pkg.popular && (
                  <span className="absolute right-5 top-5 rounded-full bg-elevated/15 px-2.5 py-1 font-sans text-[10px] uppercase tracking-[0.1em]">
                    {services.popularLabel}
                  </span>
                )}
                <div
                  className={cn(
                    "eyebrow",
                    pkg.popular && "text-elevated/60"
                  )}
                >
                  {pkg.name}
                </div>
                <div
                  className={cn(
                    "mt-3 text-[32px] font-semibold tracking-[-0.03em]",
                    pkg.popular ? "text-elevated" : "text-ink"
                  )}
                >
                  {pkg.price}
                </div>
                <div
                  className={cn(
                    "mt-1 text-[13px]",
                    pkg.popular ? "text-elevated/60" : "text-mute"
                  )}
                >
                  {pkg.term}
                </div>
                <p
                  className={cn(
                    "mt-5 text-[14px] leading-relaxed",
                    pkg.popular ? "text-elevated/80" : "text-body"
                  )}
                >
                  {pkg.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
