"use client";

import { cn } from "@/lib/cn";
import { Container } from "../Container";
import { Reveal } from "../Reveal";
import { serviceIcons, ArrowRight } from "../Icons";
import { serviceVisuals } from "../service-visuals";
import { accentGradient } from "@/lib/accents";
import { useI18n } from "@/lib/i18n";
import { useConsult } from "../ConsultModal";

export function Services() {
  const { t } = useI18n();
  const { open: openConsult } = useConsult();
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
            const Visual =
              serviceVisuals[item.icon] ?? serviceVisuals.systems;
            const flip = i % 2 === 1;

            return (
              <Reveal as="div" key={item.title}>
                <div className="border-t border-hairline pt-12">
                  <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
                    {/* copy */}
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
                        <h3 className="text-[22px] font-semibold tracking-tight text-ink sm:text-[26px]">
                          {item.title}
                        </h3>
                      </div>

                      <p className="mt-5 max-w-md text-[15px] leading-relaxed text-body">
                        {item.body}
                      </p>

                      <div className="mt-6 flex flex-wrap gap-2">
                        {item.points.map((p) => (
                          <span
                            key={p}
                            className="rounded-full border border-hairline bg-elevated px-3 py-1 text-[12px] font-medium text-body"
                          >
                            {p}
                          </span>
                        ))}
                      </div>

                      {item.stack.length > 0 && (
                        <div className="mt-3 flex flex-wrap items-center gap-2">
                          {item.stack.map((s) => (
                            <span
                              key={s}
                              className="rounded-[var(--radius-btn)] bg-canvas px-2.5 py-1 font-mono text-[11px] text-mute"
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

                    {/* animated visual */}
                    <div className={cn(flip && "lg:order-1")}>
                      <div className="relative overflow-hidden rounded-[var(--radius-card-lg)] border border-hairline bg-canvas">
                        {/* accent wash + grid texture */}
                        <span
                          aria-hidden
                          className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full opacity-[0.14] blur-2xl"
                          style={{ background: accentGradient(item.accent) }}
                        />
                        <span
                          aria-hidden
                          className="grid-lines pointer-events-none absolute inset-0 opacity-40"
                        />
                        <div className="relative flex min-h-[280px] items-center justify-center py-6 sm:min-h-[320px]">
                          <Visual accent={item.accent} />
                        </div>
                      </div>
                    </div>
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
