"use client";

import { Container } from "../Container";
import { Reveal } from "../Reveal";
import { LogoMarquee } from "../LogoMarquee";
import { useI18n } from "@/lib/i18n";

export function ProofBar() {
  const { t } = useI18n();
  const proof = t.proof;

  return (
    <section className="border-y border-hairline bg-canvas py-[var(--section-py)]">
      <Container>
        <Reveal as="div">
          <p className="mb-8 text-center font-sans text-[11px] uppercase tracking-[0.16em] text-faint">
            {proof.clientsLabel}
          </p>
          <LogoMarquee />
        </Reveal>
      </Container>
    </section>
  );
}
