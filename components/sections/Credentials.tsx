"use client";

import { Container } from "../Container";
import { Reveal } from "../Reveal";
import { useI18n } from "@/lib/i18n";

/**
 * Credentials — the proof-of-standing wall.
 *
 * Four document slots: the partnerships and residencies we can actually show,
 * followed by reserved slots so the row stays balanced while the next
 * certificates are still being issued. Each filled slot can carry a scan of
 * the real document (`image`); until one is supplied it falls back to a
 * seal glyph so the card still reads as a document.
 */
export function Credentials() {
  const { t } = useI18n();
  const c = t.credentials;
  const emptySlots = Math.max(0, 4 - c.items.length);

  return (
    <section
      id="sertifikatlar"
      className="scroll-mt-10 border-t border-hairline py-[clamp(72px,9vw,128px)]"
    >
      <Container>
        <div className="max-w-2xl">
          <span className="eyebrow">{c.eyebrow}</span>
          <h2 className="mt-4 text-h2 text-ink">{c.title}</h2>
          <p className="mt-4 max-w-xl text-lead text-body">{c.subtitle}</p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {c.items.map((item, i) => (
            <Reveal key={item.name} delay={i * 0.06} className="h-full">
              <article className="flex h-full flex-col overflow-hidden rounded-[var(--radius-card-lg)] border border-hairline bg-elevated transition-colors hover:border-mute">
                {/* document preview — brand marks sit on a white plate so a
                    dark wordmark never disappears into a dark canvas */}
                <div
                  className={`relative flex aspect-[4/3] items-center justify-center border-b border-hairline ${
                    item.image ? "bg-white" : "bg-canvas"
                  }`}
                >
                  {item.image ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={item.image}
                      alt={item.name}
                      className="relative max-h-full max-w-full object-contain p-6"
                    />
                  ) : (
                    <>
                      <span
                        aria-hidden
                        className="grid-lines pointer-events-none absolute inset-0 opacity-40"
                      />
                      <Seal className="relative size-14 text-mute" />
                    </>
                  )}
                  <span
                    className={`absolute right-3 top-3 rounded-[var(--radius-btn)] px-2 py-1 font-mono text-[10px] uppercase tracking-[0.1em] ${
                      item.status === "pending"
                        ? "border border-hairline bg-elevated text-mute"
                        : item.image
                          ? // the plate behind it is always white, so pin the
                            // badge to dark-on-light in both themes
                            "bg-[#171717] text-white"
                          : "bg-ink text-elevated"
                    }`}
                  >
                    {item.status === "pending" ? c.pendingLabel : c.activeLabel}
                  </span>
                </div>

                <div className="flex flex-1 flex-col gap-1.5 p-5">
                  <div className="eyebrow">{item.issuer}</div>
                  <h3 className="text-[17px] font-semibold leading-snug text-ink">
                    {item.name}
                  </h3>
                  <p className="mt-1 text-[13px] leading-relaxed text-body">
                    {item.note}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}

          {/* reserved slots for certificates still in progress */}
          {Array.from({ length: emptySlots }).map((_, i) => (
            <Reveal
              key={`slot-${i}`}
              delay={(c.items.length + i) * 0.06}
              className="h-full"
            >
              <div className="flex h-full flex-col overflow-hidden rounded-[var(--radius-card-lg)] border border-dashed border-hairline bg-canvas/40">
                <div className="flex aspect-[4/3] items-center justify-center border-b border-dashed border-hairline">
                  <Seal className="size-14 text-hairline" />
                </div>
                <div className="flex flex-1 flex-col gap-1.5 p-5">
                  <div className="eyebrow">{c.placeholderTitle}</div>
                  <p className="text-[13px] leading-relaxed text-faint">
                    {c.placeholderNote}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* A certificate seal — stands in until a scan of the real document exists. */
function Seal({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="9" y="5" width="30" height="30" rx="3" />
      <path d="M15 13h18M15 20h18M15 27h11" />
      <circle cx="34" cy="34" r="7" />
      <path d="M31 41.5V46l3-2 3 2v-4.5" />
    </svg>
  );
}
