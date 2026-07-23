"use client";

import { Container } from "../Container";
import { Reveal } from "../Reveal";
import { LogoWall } from "../LogoWall";
import { brandLogos } from "@/content/logos";
import { useI18n } from "@/lib/i18n";

export function Brands() {
  const { t } = useI18n();
  const brands = t.brands;

  return (
    <section className="scroll-mt-10 border-t border-hairline py-[clamp(72px,9vw,128px)]">
      <Container>
        <div className="max-w-2xl">
          <span className="eyebrow">{brands.eyebrow}</span>
          <h2 className="mt-4 text-h2 text-ink">{brands.title}</h2>
          <p className="mt-4 max-w-xl text-lead text-body">{brands.subtitle}</p>
        </div>

        <Reveal as="div" className="mt-12">
          <LogoWall logos={brandLogos} />
        </Reveal>
      </Container>
    </section>
  );
}
