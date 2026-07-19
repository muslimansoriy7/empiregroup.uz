"use client";

import Image from "next/image";
import { Container } from "../Container";
import { Reveal } from "../Reveal";
import { Telegram, Mail, Phone, ArrowUpRight } from "../Icons";
import { useI18n } from "@/lib/i18n";

// pick the icon from the href scheme — robust across translated labels
function iconFor(href: string) {
  if (href.startsWith("tel:")) return Phone;
  if (href.startsWith("mailto:")) return Mail;
  return Telegram;
}

export function Founder() {
  const { t } = useI18n();
  const f = t.founder;

  return (
    <section
      id="asoschi"
      className="scroll-mt-10 border-t border-hairline bg-canvas py-[clamp(72px,9vw,128px)]"
    >
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[5fr_7fr] lg:gap-16">
          {/* photo — B&W by default, reveals color + zooms on hover */}
          <Reveal as="div">
            <div className="group relative mx-auto w-full max-w-sm">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-card-lg)] border border-hairline bg-elevated shadow-[var(--shadow-float)]">
                <Image
                  src={f.photo}
                  alt={`${f.name} — ${f.role}`}
                  fill
                  sizes="(max-width: 1024px) 90vw, 420px"
                  className="founder-photo object-cover"
                />
              </div>
              {/* floating name chip */}
              <div className="absolute -bottom-4 left-4 right-4 flex items-center justify-between rounded-[var(--radius-card)] border border-hairline bg-elevated/90 px-4 py-3 shadow-[var(--shadow-float)] backdrop-blur-sm">
                <div>
                  <div className="text-sm font-semibold tracking-tight text-ink">
                    {f.name}
                  </div>
                  <div className="text-[12px] text-mute">{f.role}</div>
                </div>
                <span className="grid size-8 place-items-center rounded-full bg-ink text-elevated">
                  <ArrowUpRight className="size-4" />
                </span>
              </div>
            </div>
          </Reveal>

          {/* content */}
          <Reveal as="div" delay={0.1}>
            <span className="eyebrow">{f.eyebrow}</span>
            <blockquote className="mt-5 text-balance text-h2 text-ink">
              “{f.quote}”
            </blockquote>
            <div className="mt-7 space-y-4">
              {f.bio.map((p, i) => (
                <p key={i} className="max-w-xl text-lead text-body">
                  {p}
                </p>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {f.socials.map((s) => {
                const Icon = iconFor(s.href);
                const external = s.href.startsWith("http");
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    className="inline-flex items-center gap-2.5 rounded-full border border-hairline bg-elevated py-2 pl-3 pr-4 text-sm text-body transition-colors hover:border-ink/30 hover:text-ink"
                  >
                    <span className="grid size-7 place-items-center rounded-full bg-canvas text-ink">
                      <Icon className="size-4" />
                    </span>
                    <span className="font-medium text-ink">{s.label}</span>
                    <span className="font-mono text-[12px] text-mute">
                      {s.value}
                    </span>
                  </a>
                );
              })}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
