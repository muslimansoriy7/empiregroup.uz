"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Container } from "../Container";
import { Reveal } from "../Reveal";
import { useI18n } from "@/lib/i18n";
import { Close } from "../Icons";

/**
 * Credentials — the proof-of-standing wall.
 *
 * Four document slots: the partnerships and residencies we can actually show,
 * followed by reserved slots so the row stays balanced while the next
 * certificates are still being issued. Cards carrying a scan (`image`) open
 * in a lightbox — a document is only reassuring if it can be read.
 */
export function Credentials() {
  const { t } = useI18n();
  const c = t.credentials;
  const emptySlots = Math.max(0, 4 - c.items.length);

  // only documents with a scan are viewable; the lightbox indexes into these
  const viewable = c.items.filter((i) => i.image);
  const [openAt, setOpenAt] = useState<number | null>(null);

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
          {c.items.map((item, i) => {
            const viewIndex = item.image
              ? viewable.findIndex((v) => v.name === item.name)
              : -1;

            const preview = (
              <>
                {/* brand marks and scans sit on a white plate so a dark
                    wordmark never sinks into the dark canvas */}
                <div
                  className={`relative flex aspect-[4/3] items-center justify-center overflow-hidden border-b border-hairline ${
                    item.image ? "bg-white" : "bg-canvas"
                  }`}
                >
                  {item.image ? (
                    <>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.image}
                        alt={item.name}
                        className="relative max-h-full max-w-full object-contain p-6 transition-transform duration-500 group-hover:scale-[1.04]"
                      />
                      {/* hover affordance */}
                      <span className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[#171717]/55 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                        <Magnifier className="size-7" />
                        <span className="text-[13px] font-medium">
                          {c.viewLabel}
                        </span>
                      </span>
                    </>
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

                <div className="flex flex-1 flex-col gap-1.5 p-5 text-left">
                  <div className="eyebrow">{item.issuer}</div>
                  <h3 className="text-[17px] font-semibold leading-snug text-ink">
                    {item.name}
                  </h3>
                  <p className="mt-1 text-[13px] leading-relaxed text-body">
                    {item.note}
                  </p>
                </div>
              </>
            );

            const shell =
              "group flex h-full w-full flex-col overflow-hidden rounded-[var(--radius-card-lg)] border border-hairline bg-elevated transition-colors hover:border-mute";

            return (
              <Reveal key={item.name} delay={i * 0.06} className="h-full">
                {item.image ? (
                  <button
                    type="button"
                    onClick={() => setOpenAt(viewIndex)}
                    aria-label={`${item.name} — ${c.viewLabel}`}
                    className={`${shell} cursor-zoom-in text-left`}
                  >
                    {preview}
                  </button>
                ) : (
                  <article className={shell}>{preview}</article>
                )}
              </Reveal>
            );
          })}

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

      <CertLightbox
        items={viewable}
        index={openAt}
        onIndex={setOpenAt}
        onClose={() => setOpenAt(null)}
        labels={{ close: c.closeLabel, prev: c.prevLabel, next: c.nextLabel }}
      />
    </section>
  );
}

type ViewableItem = { name: string; issuer: string; image?: string };

/** Full-size document viewer — native <dialog> gives focus trap and Esc free. */
function CertLightbox({
  items,
  index,
  onIndex,
  onClose,
  labels,
}: {
  items: ViewableItem[];
  index: number | null;
  onIndex: (i: number) => void;
  onClose: () => void;
  labels: { close: string; prev: string; next: string };
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const open = index !== null && index >= 0 && index < items.length;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (open && !el.open) el.showModal();
    if (!open && el.open) el.close();
  }, [open]);

  const step = useCallback(
    (delta: number) => {
      if (index === null || items.length === 0) return;
      onIndex((index + delta + items.length) % items.length);
    },
    [index, items.length, onIndex]
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, step]);

  const item = open ? items[index] : null;
  const many = items.length > 1;

  return (
    <dialog
      ref={ref}
      className="cert-dialog"
      onClose={onClose}
      onClick={(e) => {
        // backdrop click — the dialog element itself is the backdrop area
        if (e.target === ref.current) onClose();
      }}
    >
      {item && (
        <div className="relative flex flex-col items-center gap-4">
          <button
            type="button"
            onClick={onClose}
            aria-label={labels.close}
            className="absolute -top-1 right-0 z-10 grid size-10 place-items-center rounded-full bg-[#171717]/70 text-white transition-colors hover:bg-[#171717] sm:-right-2 sm:-top-2"
          >
            <Close className="size-5" />
          </button>

          <div className="flex w-full items-center gap-2 sm:gap-4">
            {many && (
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label={labels.prev}
                className="grid size-10 shrink-0 place-items-center rounded-full bg-[#171717]/70 text-white transition-colors hover:bg-[#171717]"
              >
                <Chevron className="size-5 rotate-180" />
              </button>
            )}

            <div className="min-w-0 flex-1 overflow-hidden rounded-[var(--radius-card)] bg-white">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.image}
                alt={item.name}
                className="mx-auto max-h-[72vh] w-auto max-w-full object-contain p-4"
              />
            </div>

            {many && (
              <button
                type="button"
                onClick={() => step(1)}
                aria-label={labels.next}
                className="grid size-10 shrink-0 place-items-center rounded-full bg-[#171717]/70 text-white transition-colors hover:bg-[#171717]"
              >
                <Chevron className="size-5" />
              </button>
            )}
          </div>

          <figcaption className="text-center text-[13px] text-white/80">
            {item.name}
            {many && (
              <span className="ml-2 font-mono text-[11px] text-white/50">
                {(index ?? 0) + 1} / {items.length}
              </span>
            )}
          </figcaption>
        </div>
      )}
    </dialog>
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

function Magnifier({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      aria-hidden
    >
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.5-3.5M11 8v6M8 11h6" />
    </svg>
  );
}

function Chevron({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="m9 5 7 7-7 7" />
    </svg>
  );
}
