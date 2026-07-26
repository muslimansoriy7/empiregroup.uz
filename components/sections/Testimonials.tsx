"use client";

import Image from "next/image";
import { Container } from "../Container";
import { Reveal } from "../Reveal";
import { PhoneFrame } from "../PhoneFrame";
import { accentGradient, type Accent } from "@/lib/accents";
import { Check, Telegram } from "../Icons";
import { useI18n } from "@/lib/i18n";

function Stars() {
  return (
    <div className="flex gap-0.5" aria-label="5 / 5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 24 24" className="size-4 text-[#f5a623]" fill="currentColor" aria-hidden>
          <path d="M12 2.5l2.9 5.9 6.5.95-4.7 4.58 1.11 6.47L12 17.9l-5.81 3.06 1.11-6.47-4.7-4.58 6.5-.95L12 2.5z" />
        </svg>
      ))}
    </div>
  );
}

/**
 * Telegram chat-screenshot slot. Renders a real <Image> when `src` points to
 * an uploaded screenshot; until those are added it shows a believable Telegram
 * chat skeleton so the section reads as intentional proof, not an empty box.
 * Drop screenshots at /public/testimonials/tg-1.webp … and set `src` below.
 */
function TgProofPhone({
  name,
  accent,
  src,
}: {
  name: string;
  accent: Accent;
  src?: string;
}) {
  return (
    <PhoneFrame className="shrink-0 snap-center" float>
      {src ? (
        <Image
          src={src}
          alt={`Telegram — ${name}`}
          width={264}
          height={520}
          className="h-auto w-full"
        />
      ) : (
        <div className="flex h-[460px] flex-col bg-canvas">
          {/* telegram chat header */}
          <div className="flex items-center gap-2.5 border-b border-hairline bg-elevated px-3 pb-2.5 pt-8">
            <span
              className="grid size-8 place-items-center rounded-full text-[13px] font-semibold text-white"
              style={{ background: accentGradient(accent) }}
            >
              {name.charAt(0)}
            </span>
            <div className="min-w-0 flex-1">
              <div className="truncate text-[12.5px] font-semibold text-ink">
                {name}
              </div>
              <div className="text-[10px] text-[#16a34a]">online</div>
            </div>
            <Telegram className="size-4 text-[#229ED9]" />
          </div>

          {/* chat body — skeleton bubbles + a screenshot-slot tile */}
          <div className="flex flex-1 flex-col gap-2.5 overflow-hidden px-3 py-3">
            {/* incoming */}
            <div className="max-w-[78%] self-start rounded-2xl rounded-tl-md border border-hairline bg-elevated px-3 py-2">
              <span className="block h-1.5 w-24 rounded-full bg-hairline" />
              <span className="mt-1.5 block h-1.5 w-16 rounded-full bg-hairline" />
            </div>

            {/* outgoing (Empire) */}
            <div className="max-w-[80%] self-end rounded-2xl rounded-tr-md bg-[#229ED9] px-3 py-2">
              <span className="block h-1.5 w-28 rounded-full bg-white/70" />
              <span className="mt-1.5 block h-1.5 w-20 rounded-full bg-white/50" />
              <span className="mt-1 flex items-center justify-end gap-0.5 text-white/80">
                <svg viewBox="0 0 24 24" className="size-3" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                  <path d="m2 13 4 4 8-9M12 15l1 1 8-9" />
                </svg>
              </span>
            </div>

            {/* incoming — a delivered screenshot / proof tile */}
            <div className="max-w-[82%] self-start rounded-2xl rounded-tl-md border border-hairline bg-elevated p-1.5">
              <div className="grid h-24 place-items-center rounded-[10px] border border-dashed border-hairline bg-canvas text-faint">
                <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <circle cx="8.5" cy="10.5" r="1.5" />
                  <path d="m21 16-5-5L5 19" />
                </svg>
              </div>
            </div>

            {/* rating bubble */}
            <div className="self-end rounded-2xl rounded-tr-md bg-[#229ED9] px-3 py-2">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} viewBox="0 0 24 24" className="size-3 text-white" fill="currentColor" aria-hidden>
                    <path d="M12 2.5l2.9 5.9 6.5.95-4.7 4.58 1.11 6.47L12 17.9l-5.81 3.06 1.11-6.47-4.7-4.58 6.5-.95L12 2.5z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>

          {/* input bar */}
          <div className="flex items-center gap-2 border-t border-hairline bg-elevated px-3 py-2.5">
            <div className="h-7 flex-1 rounded-full bg-canvas" />
            <span
              className="grid size-7 place-items-center rounded-full text-white"
              style={{ background: accentGradient(accent) }}
            >
              <svg viewBox="0 0 24 24" className="size-3.5" fill="currentColor" aria-hidden>
                <path d="M3 20.5 21 12 3 3.5 3 10l12 2-12 2z" />
              </svg>
            </span>
          </div>
        </div>
      )}
    </PhoneFrame>
  );
}

const PROOF_ACCENTS: Accent[] = ["develop", "preview", "ship", "develop"];

export function Testimonials() {
  const { t } = useI18n();
  const testimonials = t.testimonials;

  return (
    <section
      id="sharhlar"
      className="scroll-mt-10 border-t border-hairline bg-canvas py-[var(--section-py)]"
    >
      <Container>
        <div className="max-w-2xl">
          <span className="eyebrow">{testimonials.eyebrow}</span>
          <h2 className="mt-4 text-h2 text-ink">{testimonials.title}</h2>
        </div>

        {/* written reviews */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {testimonials.items.map((item, i) => (
            <Reveal as="div" key={item.name} delay={(i % 2) * 0.08}>
              <figure className="flex h-full flex-col rounded-[var(--radius-card-lg)] border border-hairline bg-elevated p-6 sm:p-8">
                <Stars />
                <blockquote className="mt-5 flex-1 text-pretty text-[16px] leading-relaxed text-ink">
                  “{item.quote}”
                </blockquote>
                <figcaption className="mt-6 border-t border-hairline pt-5">
                  <div className="text-[15px] font-semibold text-ink">
                    {item.name}
                  </div>
                  <div className="mt-0.5 font-sans text-[12px] text-mute">
                    {item.role}
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        {/* Telegram screenshot proof strip — swap skeletons for real screenshots
            by dropping images in /public/testimonials and passing `src`. */}
        <div className="mt-16">
          <div className="flex items-center gap-2.5">
            <span className="grid size-9 place-items-center rounded-[var(--radius-card)] bg-[#229ED9] text-white shadow-[var(--shadow-whisper)]">
              <Telegram className="size-5" />
            </span>
            <div>
              <h3 className="text-[17px] font-semibold tracking-tight text-ink">
                {testimonials.proofTitle}
              </h3>
              <p className="flex items-center gap-1.5 text-[13px] text-mute">
                <Check className="size-3.5 text-[#16a34a]" />
                {testimonials.proofNote}
              </p>
            </div>
          </div>

          <Reveal as="div">
            <div className="-mx-5 mt-7 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 sm:mx-0 sm:justify-center sm:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {testimonials.items.slice(0, 4).map((item, i) => (
                <TgProofPhone
                  key={item.name}
                  name={item.name}
                  accent={PROOF_ACCENTS[i % PROOF_ACCENTS.length]}
                />
              ))}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
