"use client";

import { Container } from "../Container";
import { Reveal } from "../Reveal";
import { whyUsVisuals } from "../whyus-visuals";
import { type Accent } from "@/lib/accents";
import { useI18n } from "@/lib/i18n";

const ACCENTS: Accent[] = ["develop", "preview", "ship"];

export function WhyUs() {
  const { t } = useI18n();
  const whyUs = t.whyUs;

  return (
    <section className="scroll-mt-10 border-t border-hairline py-[clamp(72px,9vw,128px)]">
      <Container>
        <div className="max-w-2xl">
          <span className="eyebrow">{whyUs.eyebrow}</span>
          <h2 className="mt-4 text-h2 text-ink">{whyUs.title}</h2>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {whyUs.items.map((item, i) => {
            const Visual = whyUsVisuals[i % whyUsVisuals.length];
            const accent = ACCENTS[i % ACCENTS.length];
            return (
              <Reveal as="div" key={item.title} delay={(i % 3) * 0.06}>
                <div className="group h-full rounded-[var(--radius-card-lg)] border border-hairline bg-elevated p-5 transition-colors hover:border-ink/15 sm:p-6">
                  <Visual accent={accent} />
                  <h3 className="mt-5 text-[18px] font-semibold tracking-tight text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 text-[14px] leading-relaxed text-body">
                    {item.body}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
