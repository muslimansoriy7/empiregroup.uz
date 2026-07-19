"use client";

import { accentGradient, type Accent } from "@/lib/accents";
import { Check } from "./Icons";

/**
 * WhyUs mini-infographics — one ambient animation per selling point.
 * All loop continuously via CSS keyframes (defined in globals.css) and freeze
 * at a sensible frame under prefers-reduced-motion (motion-safe: gate).
 * Each fills a compact panel that sits above the card copy.
 */

function Panel({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative grid h-28 place-items-center overflow-hidden rounded-[var(--radius-card)] border border-hairline bg-canvas">
      <div
        aria-hidden
        className="grid-lines pointer-events-none absolute inset-0 opacity-40"
      />
      <div className="relative">{children}</div>
    </div>
  );
}

/* 1 — Fixed-scope price: a locked total, steady, no surprises */
function FixedPrice({ accent }: { accent: Accent }) {
  return (
    <Panel>
      <div className="flex items-center gap-3">
        <div className="rounded-[10px] border border-hairline bg-elevated px-3 py-2 shadow-[var(--shadow-whisper)]">
          <div className="font-mono text-[9px] uppercase tracking-wide text-faint">
            Fixed
          </div>
          <div className="mt-0.5 text-[16px] font-semibold tracking-tight text-ink">
            $12,400
          </div>
        </div>
        <span
          className="grid size-8 place-items-center rounded-full text-white shadow-[var(--shadow-whisper)] motion-safe:animate-[fade-pulse_2.8s_ease-in-out_infinite]"
          style={{ background: accentGradient(accent) }}
        >
          <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="5" y="11" width="14" height="9" rx="2" />
            <path d="M8 11V8a4 4 0 0 1 8 0v3" />
          </svg>
        </span>
      </div>
    </Panel>
  );
}

/* 2 — Senior engineers: overlapping avatars, live status */
function SeniorTeam({ accent }: { accent: Accent }) {
  const grads: Accent[] = ["develop", "preview", "ship"];
  return (
    <Panel>
      <div className="flex flex-col items-center gap-2.5">
        <div className="flex -space-x-2.5">
          {grads.map((g, i) => (
            <span
              key={g}
              className="grid size-9 place-items-center rounded-full border-2 border-canvas text-[11px] font-semibold text-white motion-safe:animate-[node-pop_2.6s_ease-in-out_infinite]"
              style={{ background: accentGradient(g), animationDelay: `${i * 0.35}s` }}
            >
              {["A", "M", "R"][i]}
            </span>
          ))}
          <span className="grid size-9 place-items-center rounded-full border-2 border-canvas bg-elevated text-[10px] font-semibold text-ink shadow-[var(--shadow-whisper)]">
            +9
          </span>
        </div>
        <span
          className="rounded-full px-2.5 py-0.5 text-[10px] font-medium text-white"
          style={{ background: accentGradient(accent) }}
        >
          Senior · 12+ yil
        </span>
      </div>
    </Panel>
  );
}

/* 3 — Transparent timeline: sprint bars filling in sequence */
function Timeline({ accent }: { accent: Accent }) {
  return (
    <Panel>
      <div className="flex w-[190px] flex-col gap-2">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="font-mono text-[8px] uppercase text-faint">
              S{i + 1}
            </span>
            <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-hairline">
              <span
                className="block h-full origin-left rounded-full motion-safe:animate-[progress-fill_2.4s_ease-in-out_infinite_alternate]"
                style={{
                  background: accentGradient(accent),
                  animationDelay: `${i * 0.5}s`,
                }}
              />
            </span>
          </div>
        ))}
      </div>
    </Panel>
  );
}

/* 4 — Full ownership: a key sliding home into the lock, forever */
function Ownership({ accent }: { accent: Accent }) {
  return (
    <Panel>
      <div className="relative flex h-10 w-[160px] items-center justify-center">
        <span
          className="grid size-10 place-items-center rounded-[12px] text-white shadow-[var(--shadow-whisper)]"
          style={{ background: accentGradient(accent) }}
        >
          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="4" y="10" width="16" height="10" rx="2" />
            <path d="M8 10V7a4 4 0 0 1 8 0v3" />
            <circle cx="12" cy="15" r="1.4" />
          </svg>
        </span>
        <span
          aria-hidden
          className="absolute left-3 text-ink motion-safe:animate-[key-home_3s_ease-in-out_infinite]"
        >
          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="7" cy="12" r="3" />
            <path d="M10 12h9M17 12v3M14 12v2" />
          </svg>
        </span>
      </div>
    </Panel>
  );
}

/* 5 — Post-launch support: a chat bubble with sonar pulses */
function Support({ accent }: { accent: Accent }) {
  return (
    <Panel>
      <div className="relative grid size-14 place-items-center">
        <span
          aria-hidden
          className="absolute inset-0 rounded-full motion-safe:animate-[tg-ring_2.6s_cubic-bezier(0,0,0.2,1)_infinite]"
          style={{ background: accentGradient(accent), opacity: 0.25 }}
        />
        <span
          className="relative grid size-11 place-items-center rounded-full text-white shadow-[var(--shadow-whisper)]"
          style={{ background: accentGradient(accent) }}
        >
          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 11.5a8.5 8.5 0 0 1-12.4 7.6L3 21l1.9-5.6A8.5 8.5 0 1 1 21 11.5Z" />
          </svg>
        </span>
      </div>
    </Panel>
  );
}

/* 6 — Modern stack: tech dots orbiting a core */
function Stack({ accent }: { accent: Accent }) {
  const labels = ["TS", "Go", "AI", "SQL"];
  return (
    <Panel>
      <div className="relative size-24">
        <span
          className="absolute left-1/2 top-1/2 grid size-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-[10px] text-white shadow-[var(--shadow-whisper)]"
          style={{ background: accentGradient(accent) }}
        >
          <Check className="size-4" />
        </span>
        <div className="absolute inset-0 motion-safe:animate-[gear-spin_14s_linear_infinite]">
          {labels.map((l, i) => {
            const angle = (i / labels.length) * 2 * Math.PI;
            const r = 42;
            const x = 50 + (r / 96) * 100 * Math.cos(angle);
            const y = 50 + (r / 96) * 100 * Math.sin(angle);
            return (
              <span
                key={l}
                className="absolute grid size-7 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-hairline bg-elevated font-mono text-[9px] font-semibold text-ink shadow-[var(--shadow-whisper)] motion-safe:animate-[gear-spin_14s_linear_infinite_reverse]"
                style={{ left: `${x}%`, top: `${y}%` }}
              >
                {l}
              </span>
            );
          })}
        </div>
      </div>
    </Panel>
  );
}

export const whyUsVisuals: ((props: { accent: Accent }) => React.ReactElement)[] = [
  FixedPrice,
  SeniorTeam,
  Timeline,
  Ownership,
  Support,
  Stack,
];
