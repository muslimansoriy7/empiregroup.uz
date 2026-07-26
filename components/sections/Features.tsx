"use client";

import { cn } from "@/lib/cn";
import { Container } from "../Container";
import { Reveal } from "../Reveal";
import { BrowserFrame } from "../BrowserFrame";
import { PhoneFrame } from "../PhoneFrame";
import { CrmMock, AppMock, ErpMock } from "../mockups";
import { accentGradient } from "@/lib/accents";
import { useI18n } from "@/lib/i18n";

const VISUALS = [
  <BrowserFrame key="crm" showUrl={false} float>
    <CrmMock />
  </BrowserFrame>,
  <div
    key="app"
    className="flex justify-center rounded-[var(--radius-card-lg)] border border-hairline bg-canvas py-8"
  >
    <PhoneFrame float>
      <AppMock />
    </PhoneFrame>
  </div>,
  <BrowserFrame key="erp" showUrl={false} float>
    <ErpMock />
  </BrowserFrame>,
];

export function Features() {
  const { t } = useI18n();

  return (
    <section className="scroll-mt-10 border-t border-hairline py-[var(--section-py)]">
      <Container>
        <div className="flex flex-col gap-[clamp(64px,8vw,112px)]">
          {t.features.blocks.map((b, i) => {
            const imageRight = i % 2 === 0;
            return (
              <div
                key={b.title}
                className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
              >
                {/* text */}
                <Reveal
                  as="div"
                  className={cn(imageRight ? "lg:order-1" : "lg:order-2")}
                >
                  <span className="eyebrow">{b.kicker}</span>
                  <h2 className="mt-4 max-w-md text-h2 text-ink">{b.title}</h2>
                  <p className="mt-4 max-w-md text-lead text-body">{b.body}</p>
                  <div className="mt-6 inline-flex items-center gap-2.5 rounded-full border border-hairline bg-elevated py-1.5 pl-2 pr-4">
                    <span
                      className="grid size-5 place-items-center rounded-full text-white"
                      style={{ background: accentGradient(b.accent) }}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        className="size-3"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    </span>
                    <span className="text-[13px] font-medium text-ink">
                      {b.result}
                    </span>
                  </div>
                </Reveal>

                {/* visual */}
                <Reveal
                  as="div"
                  delay={0.1}
                  className={cn(imageRight ? "lg:order-2" : "lg:order-1")}
                >
                  {VISUALS[i] ?? VISUALS[0]}
                </Reveal>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
