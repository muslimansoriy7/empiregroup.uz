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
 * Biz kimmiz — the human-trust block. Larger portrait cards (grayscale at rest,
 * colour + a gentle zoom on hover via the shared `.founder-photo` treatment)
 * plus a strip of legitimacy chips. Real photos drop into /public; members
 * without one show a monogram plate that reveals the same way.
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

        <div className="mx-auto mt-14 grid max-w-4xl grid-cols-2 gap-5 sm:grid-cols-3">
          {team.members.map((m, i) => (
            <Reveal as="div" key={i} delay={(i % 3) * 0.06}>
              <div className="group overflow-hidden rounded-[var(--radius-card-lg)] border border-hairline bg-elevated">
                <div className="relative aspect-[4/5] overflow-hidden bg-canvas">
                  {m.photo ? (
                    <Image
                      src={m.photo}
                      alt={`${m.name} — ${m.role}`}
                      fill
                      sizes="(max-width: 640px) 45vw, 260px"
                      className="founder-photo object-cover"
                    />
                  ) : (
                    <div className="founder-photo grid h-full w-full place-items-center bg-[radial-gradient(120%_120%_at_30%_20%,var(--color-hairline-soft),var(--color-canvas))] text-[32px] font-semibold tracking-tight text-mute">
                      {initials(m.name)}
                    </div>
                  )}
                </div>
                <div className="px-5 py-4">
                  <b className="block text-[15px] font-semibold text-ink">
                    {m.name}
                  </b>
                  <span className="mt-0.5 block text-[13px] text-mute">
                    {m.role}
                  </span>
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
