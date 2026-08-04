"use client";

import Link from "next/link";
import { cn } from "@/lib/cn";
import { Container } from "../Container";
import { Reveal } from "../Reveal";
import { serviceIcons, ArrowRight } from "../Icons";
import { accentGradient } from "@/lib/accents";
import { useI18n } from "@/lib/i18n";
import { useConsult } from "../ConsultModal";
import { useSectionHref } from "@/lib/section-href";

export function Services() {
  const { t } = useI18n();
  const { open: openConsult } = useConsult();
  const sectionHref = useSectionHref();
  const services = t.services;

  return (
    <section id="xizmatlar" className="scroll-mt-10 py-[var(--section-py)]">
      <Container>
        <div className="max-w-2xl">
          <span className="eyebrow">{services.eyebrow}</span>
          <h2 className="mt-4 text-h2 text-ink">{services.title}</h2>
          <p className="mt-4 max-w-xl text-lead text-body">{services.subtitle}</p>
        </div>

        <div className="mt-16 flex flex-col gap-[clamp(56px,7vw,96px)]">
          {services.items.map((item) => {
            const Icon =
              serviceIcons[item.icon as keyof typeof serviceIcons] ??
              serviceIcons.systems;

            return (
              <Reveal as="div" key={item.title}>
                <div className="border-t border-hairline pt-12">
                  {/* header — discipline label, name, positioning line (full width
                      so the eye reads top-to-bottom instead of jumping columns) */}
                  <div className="flex items-center gap-4">
                    <span className="font-sans text-[13px] text-faint">{item.no}</span>
                    <span
                      className="grid size-11 place-items-center rounded-[var(--radius-card)] text-white shadow-[var(--shadow-whisper)]"
                      style={{ background: accentGradient(item.accent) }}
                    >
                      <Icon className="size-5" />
                    </span>
                    <div className="eyebrow">{item.tag}</div>
                  </div>

                  <div className="mt-5 grid gap-8 lg:grid-cols-[1.05fr_1fr] lg:items-start lg:gap-14">
                    {/* left — name, positioning, description, stack, CTA */}
                    <div>
                      <h3 className="text-[26px] font-semibold tracking-tight text-ink sm:text-[32px]">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-[15px] text-body">{item.subtitle}</p>
                      <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-body">
                        {item.body}
                      </p>

                      {item.stack.length > 0 && (
                        <div className="mt-6 flex flex-wrap items-center gap-2">
                          {item.stack.map((s) => (
                            <span
                              key={s}
                              className="rounded-[var(--radius-btn)] border border-hairline bg-canvas px-3 py-1.5 font-sans text-[12px] text-body"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      )}

                      <button
                        type="button"
                        onClick={openConsult}
                        className="group mt-7 inline-flex h-11 items-center justify-center gap-2 rounded-[var(--radius-pill)] border border-ink bg-ink px-5 text-[14px] font-medium text-elevated transition-colors hover:border-ink-hover hover:bg-ink-hover"
                      >
                        {services.ctaLabel}
                        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                      </button>
                    </div>

                    {/* right — "what's included" as a defined card */}
                    <div className="rounded-[var(--radius-card-lg)] border border-hairline bg-canvas p-6 sm:p-7">
                      <div className="eyebrow">{services.inclLabel}</div>
                      <ul className="mt-4 grid gap-x-8 gap-y-3.5 sm:grid-cols-2">
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
                    </div>
                  </div>

                  {/* package tiers */}
                  <div className="mt-10 grid gap-4 lg:grid-cols-3">
                    {item.packages.map((pkg) => (
                      <div
                        key={pkg.name}
                        className={cn(
                          "relative flex flex-col rounded-[var(--radius-card-lg)] border bg-elevated p-6 transition-colors",
                          pkg.popular
                            ? "border-ink shadow-[var(--shadow-whisper)]"
                            : "border-hairline hover:border-mute"
                        )}
                      >
                        {pkg.popular && (
                          <span className="absolute -top-[11px] left-6 rounded-[var(--radius-btn)] bg-ink px-2.5 py-1 font-sans text-[10px] uppercase tracking-[0.12em] text-elevated">
                            {services.popularLabel}
                          </span>
                        )}
                        <div className="eyebrow">{pkg.name}</div>
                        <div className="mt-3 text-[26px] font-semibold tracking-[-0.03em] text-ink">
                          {pkg.price}
                        </div>
                        <div className="mt-1 font-sans text-[12px] text-mute">
                          {pkg.term}
                        </div>
                        <div className="my-4 border-t border-hairline" />
                        <p className="text-[14px] leading-relaxed text-body">
                          {pkg.desc}
                        </p>
                      </div>
                    ))}
                  </div>

                  {item.geoSlug && (
                    <div className="mt-8 flex justify-end border-t border-hairline pt-5">
                      <Link
                        href={sectionHref(`/xizmatlar/${item.geoSlug}`)}
                        className="font-sans text-[13px] text-mute transition-colors hover:text-ink"
                      >
                        {item.detailsLabel.replace("{name}", item.title)}
                      </Link>
                    </div>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
