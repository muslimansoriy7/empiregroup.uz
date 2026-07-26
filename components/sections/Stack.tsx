"use client";

import { Container } from "../Container";
import { Reveal } from "../Reveal";
import { LogoWall } from "../LogoWall";
import { toolLogos } from "@/content/logos";
import { useI18n } from "@/lib/i18n";

// Compact, relevant tech strip — the tools we actually ship with, in order.
const TECH = [
  "Next.js",
  "React",
  "TypeScript",
  "Python",
  "Flutter",
  "PostgreSQL",
  "Supabase",
  "Node.js",
  "Docker",
  "Tailwind CSS",
];
const techLogos = TECH.map((t) => toolLogos.find((l) => l.title === t)).filter(
  (l): l is NonNullable<typeof l> => Boolean(l)
);

export function Stack() {
  const { t } = useI18n();
  const stack = t.stack;

  return (
    <section className="scroll-mt-10 bg-canvas py-[var(--section-py)]">
      <Container>
        <div className="max-w-2xl">
          <span className="eyebrow">{stack.eyebrow}</span>
          <h2 className="mt-4 text-h2 text-ink">{stack.title}</h2>
          <p className="mt-4 max-w-xl text-lead text-body">{stack.subtitle}</p>
        </div>

        <Reveal as="div" className="mt-12">
          <LogoWall logos={techLogos} />
        </Reveal>
      </Container>
    </section>
  );
}
