"use client";

import { Container } from "../Container";
import { Reveal } from "../Reveal";
import { ConsultForm } from "../ConsultForm";
import { Telegram, Phone, Mail } from "../Icons";
import { useI18n } from "@/lib/i18n";

function iconFor(href: string) {
  if (href.startsWith("tel:")) return Phone;
  if (href.startsWith("mailto:")) return Mail;
  return Telegram;
}

export function CtaBand() {
  const { t } = useI18n();
  const cta = t.cta;
  const contacts = t.founder.socials;

  return (
    <section
      id="aloqa"
      className="relative scroll-mt-10 overflow-hidden border-t border-hairline py-[var(--section-py)]"
    >
      {/* faint gradient echo of the hero — restrained */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-64 opacity-[0.5]"
        style={{
          background:
            "radial-gradient(ellipse 50% 100% at 50% 0%, color-mix(in srgb, #7928ca 14%, transparent), transparent 70%)",
        }}
      />
      <Container>
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_460px] lg:gap-16">
          {/* pitch */}
          <div>
            <Reveal>
              <span className="eyebrow">{cta.eyebrow}</span>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mt-4 text-h2 text-ink">{cta.title}</h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-5 max-w-md text-lead-lg text-body">
                {cta.subtitle}
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <div className="mt-8 flex flex-wrap gap-3">
                {contacts.map((s) => {
                  const Icon = iconFor(s.href);
                  const external = s.href.startsWith("http");
                  return (
                    <a
                      key={s.label}
                      href={s.href}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noopener noreferrer" : undefined}
                      className="inline-flex items-center gap-2.5 rounded-full border border-hairline bg-elevated py-2 pl-3 pr-4 text-sm transition-colors hover:border-ink/30"
                    >
                      <span className="grid size-7 place-items-center rounded-full bg-canvas text-ink">
                        <Icon className="size-4" />
                      </span>
                      <span className="font-medium text-ink">{s.label}</span>
                      <span className="font-sans text-[12px] text-mute">
                        {s.value}
                      </span>
                    </a>
                  );
                })}
              </div>
            </Reveal>
          </div>

          {/* inline form card */}
          <Reveal as="div" delay={0.1}>
            <div className="rounded-[var(--radius-card-lg)] border border-hairline bg-elevated p-6 shadow-[var(--shadow-float)] sm:p-8">
              <ConsultForm
                header={
                  <div>
                    <h3 className="text-h3 text-ink">{cta.formTitle}</h3>
                    <p className="mt-1.5 text-sm text-body">{cta.formSubtitle}</p>
                  </div>
                }
              />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
