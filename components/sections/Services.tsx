"use client";

import Link from "next/link";
import { cn } from "@/lib/cn";
import { Container } from "../Container";
import { Reveal } from "../Reveal";
import { serviceIcons, ArrowRight } from "../Icons";
import { serviceVisuals } from "../service-visuals";
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
    <section id="xizmatlar" className="scroll-mt-10 py-[clamp(72px,9vw,128px)]">
      <Container>
        <div className="max-w-2xl">
          <span className="eyebrow">{services.eyebrow}</span>
          <h2 className="mt-4 text-h2 text-ink">{services.title}</h2>
          <p className="mt-4 max-w-xl text-lead text-body">{services.subtitle}</p>
        </div>

        <div className="mt-16 flex flex-col gap-[clamp(56px,7vw,96px)]">
          {services.items.map((item, i) => {
            const Icon =
              serviceIcons[item.icon as keyof typeof serviceIcons] ??
              serviceIcons.systems;
            const Visual = serviceVisuals[item.icon] ?? serviceVisuals.systems;
            const flip = i % 2 === 1;

            return (
              <Reveal as="div" key={item.title}>
                <div className="border-t border-hairline pt-12">
                  {/* headline row — discipline, name, positioning line */}
                  <div className="grid gap-8 lg:grid-cols-2 lg:gap-14">
                    <div className={cn(flip && "lg:order-2")}>
                      <div className="flex items-center gap-4">
                        <span className="font-mono text-[13px] text-faint">
                          {item.no}
                        </span>
                        <span
                          className="grid size-11 place-items-center rounded-[var(--radius-card)] text-white shadow-[var(--shadow-whisper)]"
                          style={{ background: accentGradient(item.accent) }}
                        >
                          <Icon className="size-5" />
                        </span>
                        <div className="eyebrow">{item.tag}</div>
                      </div>

                      <h3 className="mt-5 text-[26px] font-semibold tracking-tight text-ink sm:text-[32px]">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-[15px] text-body">{item.subtitle}</p>

                      {item.stack.length > 0 && (
                        <div className="mt-6 flex flex-wrap items-center gap-2">
                          {item.stack.map((s) => (
                            <span
                              key={s}
                              className="rounded-[var(--radius-btn)] border border-hairline bg-canvas px-3 py-1.5 font-mono text-[12px] text-body"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      )}

                      <button
                        type="button"
                        onClick={openConsult}
                        className="group mt-7 inline-flex h-11 items-center justify-center gap-2 rounded-[var(--radius-pill)] bg-ink px-5 text-[14px] font-medium text-elevated transition-colors hover:bg-[#383838]"
                      >
                        {services.ctaLabel}
                        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                      </button>
                    </div>

                    {/* description + what's included */}
                    <div className={cn(flip && "lg:order-1")}>
                      <p className="max-w-xl text-[15px] leading-relaxed text-body">
                        {item.body}
                      </p>

                      <div className="eyebrow mt-7">{services.inclLabel}</div>
                      <ul className="mt-3 grid gap-x-8 gap-y-3 sm:grid-cols-2">
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
                          <span className="absolute -top-[11px] left-6 rounded-[var(--radius-btn)] bg-ink px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-elevated">
                            {services.popularLabel}
                          </span>
                        )}
                        <div className="eyebrow">{pkg.name}</div>
                        <div className="mt-3 text-[26px] font-semibold tracking-[-0.03em] text-ink">
                          {pkg.price}
                        </div>
                        <div className="mt-1 font-mono text-[12px] text-mute">
                          {pkg.term}
                        </div>
                        <div className="my-4 border-t border-hairline" />
                        <p className="text-[14px] leading-relaxed text-body">
                          {pkg.desc}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* animated visual */}
                  <div className="mt-10 grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
                    <div className="relative overflow-hidden rounded-[var(--radius-card-lg)] border border-hairline bg-canvas">
                      <span
                        aria-hidden
                        className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full opacity-[0.14] blur-2xl"
                        style={{ background: accentGradient(item.accent) }}
                      />
                      <span
                        aria-hidden
                        className="grid-lines pointer-events-none absolute inset-0 opacity-40"
                      />
                      <div className="relative flex min-h-[240px] items-center justify-center py-6 sm:min-h-[280px]">
                        <Visual accent={item.accent} />
                      </div>
                    </div>

                    {item.geoSlug && (
                      <Link
                        href={sectionHref(`/xizmatlar/${item.geoSlug}`)}
                        className="font-mono text-[13px] text-mute transition-colors hover:text-ink lg:pb-2 lg:text-right"
                      >
                        {item.detailsLabel.replace("{name}", item.title)}
                      </Link>
                    )}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
