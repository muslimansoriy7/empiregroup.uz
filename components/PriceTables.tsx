"use client";

import { cn } from "@/lib/cn";
import { useI18n } from "@/lib/i18n";

/**
 * The package tiers, read straight from the services dictionary.
 *
 * The pricing page and the homepage services section must never disagree
 * about a number, so neither of them owns a second copy — both render
 * `t.services.items[].packages`.
 */
export function PriceTables() {
  const { t } = useI18n();
  const services = t.services;

  return (
    <div className="flex flex-col gap-14">
      {services.items.map((item) => (
        <section key={item.title}>
          <div className="eyebrow">{item.tag}</div>
          <h2 className="mt-2 text-[26px] font-semibold tracking-tight text-ink sm:text-[30px]">
            {item.title}
          </h2>
          <p className="mt-2 max-w-2xl text-[15px] text-body">{item.subtitle}</p>

          <div className="mt-7 grid gap-4 lg:grid-cols-3">
            {item.packages.map((pkg) => (
              <div
                key={pkg.name}
                className={cn(
                  "relative flex flex-col rounded-[var(--radius-card-lg)] border bg-elevated p-6",
                  pkg.popular
                    ? "border-ink shadow-[var(--shadow-whisper)]"
                    : "border-hairline"
                )}
              >
                {pkg.popular && (
                  <span className="absolute -top-[11px] left-6 rounded-[var(--radius-btn)] bg-ink px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-elevated">
                    {services.popularLabel}
                  </span>
                )}
                <div className="eyebrow">{pkg.name}</div>
                <div className="mt-3 text-[26px] font-semibold tracking-[-0.03em] text-ink">
                  {pkg.price}
                </div>
                <div className="mt-1 font-mono text-[12px] text-mute">{pkg.term}</div>
                <div className="my-4 border-t border-hairline" />
                <p className="text-[14px] leading-relaxed text-body">{pkg.desc}</p>
              </div>
            ))}
          </div>

          <div className="eyebrow mt-8">{services.inclLabel}</div>
          <ul className="mt-3 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
            {item.points.map((p) => (
              <li key={p} className="flex items-start gap-2.5 text-[14px] text-body">
                <span
                  aria-hidden
                  className="mt-[3px] size-3 shrink-0 rotate-45 rounded-[2px] border"
                  style={{ borderColor: "var(--color-mute)" }}
                />
                {p}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
