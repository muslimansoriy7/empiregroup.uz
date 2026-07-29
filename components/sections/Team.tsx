"use client";

import { Container } from "../Container";
import { Reveal } from "../Reveal";
import { useI18n } from "@/lib/i18n";

function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

/**
 * Biz kimmiz — the human-trust block. Each member is a card: a monogram plate
 * (no stock photos), name, role and a short professional bio. Cards lift on
 * hover. A strip of legitimacy chips closes the section.
 */
export function Team() {
  const { t } = useI18n();
  const team = t.team;

  return (
    <section
      id="jamoa"
      className="scroll-mt-10 border-t border-hairline bg-canvas py-[var(--section-py)]"
    >
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <span className="eyebrow">{team.eyebrow}</span>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-4 text-h2 text-ink">{team.title}</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 text-[15px] text-body">{team.subtitle}</p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {team.members.map((m, i) => (
            <Reveal as="div" key={i} delay={(i % 4) * 0.05}>
              <div className="group flex h-full flex-col rounded-[var(--radius-card-lg)] border border-hairline bg-elevated p-5 transition-[transform,border-color,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:border-ink/15 hover:shadow-[var(--shadow-float)]">
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden
                    className="grid size-11 shrink-0 place-items-center rounded-full text-[14px] font-semibold text-white transition-transform duration-300 group-hover:scale-105"
                    style={{ background: "linear-gradient(135deg,#007cf0,#7928ca)" }}
                  >
                    {initials(m.name)}
                  </span>
                  <div className="min-w-0">
                    <b className="block truncate text-[15px] font-semibold text-ink">
                      {m.name}
                    </b>
                    <span className="mt-0.5 block text-[12px] leading-snug text-mute">
                      {m.role}
                    </span>
                  </div>
                </div>
                <p className="mt-4 text-[13.5px] leading-relaxed text-body">
                  {m.bio}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal as="div" delay={0.16}>
          <div className="mt-10 flex flex-wrap justify-center gap-2.5">
            {team.chips.map((c) => (
              <span
                key={c}
                className="rounded-full border border-hairline bg-elevated px-3.5 py-2 text-[13px] text-body"
              >
                {c}
              </span>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
