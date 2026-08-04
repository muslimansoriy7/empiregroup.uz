"use client";

import Image from "next/image";
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
 * Biz kimmiz — the human-trust block. Each card leads with a portrait slot
 * (a real photo drops into `photo`; until then a monogram placeholder holds the
 * space), followed by name, role and a short professional bio. Cards lift
 * gently on hover; the portrait reveals colour + a soft zoom via the shared
 * `.founder-photo` treatment.
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
              <div className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-card-lg)] border border-hairline bg-elevated transition-[transform,border-color,box-shadow] duration-[400ms] ease-in-out will-change-transform hover:-translate-y-1 hover:scale-[1.02] hover:border-ink/15 hover:shadow-[var(--shadow-float)]">
                {/* portrait slot — real photo when provided, monogram placeholder until then */}
                <div className="relative aspect-[4/5] overflow-hidden bg-canvas">
                  {m.photo ? (
                    <Image
                      src={m.photo}
                      alt={`${m.name} — ${m.role}`}
                      fill
                      sizes="(max-width: 640px) 45vw, 300px"
                      className="founder-photo object-cover"
                    />
                  ) : (
                    <div className="founder-photo grid h-full w-full place-items-center bg-[radial-gradient(120%_120%_at_30%_20%,var(--color-hairline-soft),var(--color-canvas))]">
                      <span
                        className="grid size-16 place-items-center rounded-full text-[22px] font-semibold text-white"
                        style={{ background: "linear-gradient(135deg,#007cf0,#7928ca)" }}
                      >
                        {initials(m.name)}
                      </span>
                    </div>
                  )}
                </div>

                {/* details */}
                <div className="flex flex-1 flex-col p-5">
                  <b className="block text-[15px] font-semibold text-ink">{m.name}</b>
                  <span className="mt-0.5 block text-[12px] leading-snug text-mute">
                    {m.role}
                  </span>
                  <p className="mt-3 text-[13.5px] leading-relaxed text-body">
                    {m.bio}
                  </p>
                </div>
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
