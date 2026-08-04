"use client";

import { Container } from "../Container";
import { Reveal } from "../Reveal";
import { useI18n } from "@/lib/i18n";

/**
 * Numerical trust bar — the four headline proof numbers, sat in a bordered band
 * directly under the hero so the credibility lands before the story starts.
 */
export function StatBand() {
  const { t } = useI18n();
  const stats = t.hero.stats;

  return (
    <section className="bg-canvas pb-[var(--section-py)]">
      <Container>
        <Reveal as="div">
          <dl className="grid grid-cols-2 overflow-hidden rounded-[var(--radius-card-lg)] border border-hairline bg-elevated shadow-[var(--shadow-whisper)] sm:grid-cols-4">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={`px-6 py-7 sm:px-8 sm:py-8 ${
                  i % 2 === 1 ? "border-l border-hairline" : ""
                } ${i >= 2 ? "border-t border-hairline sm:border-t-0" : ""} ${
                  i > 0 ? "sm:border-l" : ""
                }`}
              >
                <dt className="sr-only">{s.label}</dt>
                <dd className="text-[32px] font-semibold leading-none tracking-[-0.03em] text-ink sm:text-[40px]">
                  {s.value}
                </dd>
                <p className="mt-2 text-[13px] text-mute sm:text-[14px]">{s.label}</p>
              </div>
            ))}
          </dl>
        </Reveal>
      </Container>
    </section>
  );
}
