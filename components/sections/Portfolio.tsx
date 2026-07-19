"use client";

import Image from "next/image";
import { Container } from "../Container";
import { Reveal } from "../Reveal";
import { BrowserFrame } from "../BrowserFrame";
import { ArrowUpRight } from "../Icons";
import { accentGradient } from "@/lib/accents";
import { useI18n } from "@/lib/i18n";
import { useConsult } from "../ConsultModal";

// live project URLs, keyed by the (locale-stable) desktop screenshot path
const LIVE_URLS: Record<string, string> = {
  "/cases/case-autoservice-desktop.webp": "https://autoservis-crm.vercel.app/uz/dashboard",
  "/cases/case-medflow-desktop.webp": "https://medflow-crm-eta.vercel.app/",
  "/cases/case-dentalife-desktop.webp": "https://dentalife.framer.website/",
  "/cases/case-kassa-desktop.webp": "https://kassa-pwa.vercel.app/",
  "/cases/case-gadgetspace-desktop.webp": "https://gadgetspace.vercel.app/",
  "/cases/case-xwear-desktop.webp": "https://x-wear-ivory.vercel.app/",
  "/cases/case-textile-desktop.webp": "https://textileerp.vercel.app/",
  "/cases/case-texnika-desktop.webp": "https://texnika-ijara.vercel.app/",
};

export function Portfolio() {
  const { t } = useI18n();
  const { open: openConsult } = useConsult();
  const portfolio = t.portfolio;

  return (
    <section id="loyihalar" className="scroll-mt-10 py-[clamp(72px,9vw,128px)]">
      <Container>
        <div className="max-w-2xl">
          <span className="eyebrow">{portfolio.eyebrow}</span>
          <h2 className="mt-4 text-h2 text-ink">{portfolio.title}</h2>
          <p className="mt-4 max-w-lg text-lead text-body">
            {portfolio.subtitle}
          </p>
        </div>

        <div className="mt-14 grid gap-x-8 gap-y-16 lg:grid-cols-2">
          {portfolio.cases.map((c, i) => {
            const liveUrl = LIVE_URLS[c.desktopImg];
            return (
            <Reveal as="div" key={c.title} delay={(i % 2) * 0.08}>
              <article className="group">
                {/* device showcase: desktop 16:9 + mobile 9:16 overlap */}
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${c.title} — ${portfolio.liveLabel}`}
                  className="relative block"
                >
                  <BrowserFrame
                    showUrl={false}
                    float
                    className="transition-transform duration-500 group-hover:-translate-y-1"
                  >
                    <div className="relative aspect-video bg-canvas">
                      <Image
                        src={c.desktopImg}
                        alt={`${c.segment} — ${c.title} (${portfolio.desktopLabel})`}
                        fill
                        sizes="(max-width: 1024px) 100vw, 560px"
                        className="object-cover object-top"
                      />
                    </div>
                  </BrowserFrame>

                  {/* mobile 9:16 */}
                  <div className="absolute -bottom-6 right-5 w-[20%] min-w-[58px] max-w-[110px] rounded-[16px] border-[3px] border-ink bg-ink p-0.5 shadow-[var(--shadow-float)] transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1">
                    <div className="relative aspect-[9/19.5] overflow-hidden rounded-[12px] bg-canvas">
                      <Image
                        src={c.mobileImg}
                        alt={`${c.segment} — ${c.title} (${portfolio.mobileLabel})`}
                        fill
                        sizes="110px"
                        className="object-cover object-top"
                      />
                    </div>
                  </div>

                  {/* hover arrow — affordance that the mockup is clickable */}
                  <span className="absolute left-4 top-[calc(2.75rem+1rem)] grid size-8 place-items-center rounded-full border border-hairline bg-elevated/90 text-ink opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                    <ArrowUpRight className="size-4" />
                  </span>
                </a>

                {/* meta */}
                <div className="mt-9 flex items-start justify-between gap-4 pr-[18%]">
                  <div>
                    <span className="font-mono text-[11px] uppercase tracking-wider text-faint">
                      {c.segment}
                    </span>
                    <h3 className="mt-1.5 text-h3 text-ink">{c.title}</h3>
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-2.5">
                  <div className="inline-flex items-center gap-2 rounded-full border border-hairline bg-elevated py-1.5 pl-2.5 pr-4">
                    <span
                      className="size-2 shrink-0 rounded-full"
                      style={{ background: accentGradient(c.accent) }}
                    />
                    <span className="text-[13px] text-body">
                      <span className="font-mono text-[10px] uppercase tracking-wide text-faint">
                        {portfolio.resultLabel}:{" "}
                      </span>
                      {c.result}
                    </span>
                  </div>
                  {c.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-hairline bg-canvas px-3 py-1 font-mono text-[11px] uppercase tracking-wide text-mute"
                    >
                      {tag}
                    </span>
                  ))}
                  {liveUrl && (
                    <a
                      href={liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full bg-ink py-1.5 pl-4 pr-3.5 text-[13px] font-medium text-elevated transition-colors hover:bg-[#383838]"
                    >
                      {portfolio.liveLabel}
                      <ArrowUpRight className="size-3.5" />
                    </a>
                  )}
                </div>
              </article>
            </Reveal>
            );
          })}

          {/* "next is yours" CTA card */}
          <Reveal as="div" delay={0.08}>
            <button
              type="button"
              onClick={openConsult}
              className="group relative flex h-full min-h-[300px] w-full flex-col justify-center overflow-hidden rounded-[var(--radius-card-lg)] bg-ink p-8 text-left shadow-[var(--shadow-float)] sm:p-10"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -right-10 -top-10 size-56 rounded-full opacity-40 blur-3xl transition-opacity duration-500 group-hover:opacity-70"
                style={{ background: accentGradient("preview") }}
              />
              <div className="relative">
                <h3 className="text-h2 text-elevated">{portfolio.ctaTitle}</h3>
                <p className="mt-3 max-w-sm text-lead text-elevated/70">
                  {portfolio.ctaBody}
                </p>
                <span className="mt-7 inline-flex h-11 items-center gap-2 rounded-[var(--radius-pill)] bg-elevated px-5 text-[14px] font-medium text-ink transition-transform duration-300 group-hover:translate-x-1">
                  {portfolio.ctaButton}
                  <ArrowUpRight className="size-4" />
                </span>
              </div>
            </button>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
