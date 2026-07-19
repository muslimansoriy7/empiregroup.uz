"use client";

import { accentGradient, type Accent } from "@/lib/accents";
import { Check } from "./Icons";

/* All visuals animate continuously (ambient) — not gated on hover.
   prefers-reduced-motion freezes them at a sensible resting frame. */

/* ============================================================
   1) Tizimlar — live dashboard, bars breathe in a ripple
   ============================================================ */
export function SystemsVisual({ accent }: { accent: Accent }) {
  const bars = [38, 60, 46, 72, 54, 88, 66];
  return (
    <div className="relative grid h-full w-full place-items-center p-5">
      <div className="w-full max-w-[300px] rounded-[var(--radius-card)] border border-hairline bg-elevated p-4 shadow-[var(--shadow-whisper)]">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-wide text-faint">
              Savdo
            </div>
            <div className="text-[15px] font-semibold tracking-tight text-ink">
              ₿48.1M
            </div>
          </div>
          <span
            className="rounded-full px-2 py-0.5 text-[10px] font-medium text-white"
            style={{ background: accentGradient(accent) }}
          >
            +24%
          </span>
        </div>
        <div className="flex h-20 items-end gap-1.5">
          {bars.map((h, i) => (
            <div key={i} className="flex h-full flex-1 items-end">
              <div
                className="w-full origin-bottom rounded-t-[3px] motion-safe:animate-[bar-breathe_2.6s_ease-in-out_infinite]"
                style={{
                  height: `${h}%`,
                  animationDelay: `${i * 140}ms`,
                  background:
                    i === 5 ? accentGradient(accent) : "var(--color-hairline)",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   2) Mobil ilovalar — phone, notification cycles in and out
   ============================================================ */
export function MobileVisual({ accent }: { accent: Accent }) {
  return (
    <div className="relative grid h-full w-full place-items-center overflow-hidden p-5">
      <div className="relative w-[136px] rounded-[26px] border-[5px] border-ink bg-ink shadow-[var(--shadow-float)]">
        <div className="overflow-hidden rounded-[21px] bg-canvas">
          <div className="flex justify-center pt-2">
            <div className="h-1 w-8 rounded-full bg-hairline" />
          </div>
          <div className="px-3 pb-3 pt-2">
            <div className="font-mono text-[8px] uppercase tracking-wide text-faint">
              Empire
            </div>
            <div
              className="mt-1.5 rounded-[10px] p-2.5 text-white"
              style={{ background: accentGradient(accent) }}
            >
              <div className="text-[8px] opacity-80">Balans</div>
              <div className="text-[13px] font-semibold">₿1.24M</div>
            </div>
            <div className="mt-2 flex flex-col gap-1.5">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-md border border-hairline bg-elevated px-2 py-1.5"
                >
                  <span className="h-1.5 w-10 rounded-full bg-hairline" />
                  <span className="h-1.5 w-5 rounded-full bg-hairline" />
                </div>
              ))}
            </div>
            <div className="mt-2.5 flex justify-around">
              {[true, false, false].map((a, i) => (
                <span
                  key={i}
                  className={`size-2.5 rounded ${a ? "bg-ink" : "bg-hairline"}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* push notification — slides in and out forever */}
        <div className="absolute inset-x-2 top-2 flex items-center gap-2 rounded-[10px] border border-hairline bg-elevated/95 p-2 shadow-[var(--shadow-float)] backdrop-blur-sm motion-safe:animate-[notif-cycle_5s_ease-in-out_infinite]">
          <span
            className="grid size-5 shrink-0 place-items-center rounded-md text-white"
            style={{ background: accentGradient(accent) }}
          >
            <Check className="size-3" />
          </span>
          <div className="min-w-0">
            <div className="h-1.5 w-12 rounded-full bg-ink/70" />
            <div className="mt-1 h-1 w-16 rounded-full bg-hairline" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   3) Avtomatizatsiya — flow with a pulse traveling, gear spinning
   ============================================================ */
export function AutomationVisual({ accent }: { accent: Accent }) {
  const nodes = ["Trigger", "Bot", "Natija"];
  return (
    <div className="relative grid h-full w-full place-items-center p-5">
      <div className="relative w-full max-w-[300px]">
        <div className="absolute left-[14%] right-[14%] top-1/2 h-px -translate-y-1/2 bg-hairline" />
        {/* traveling pulse */}
        <div
          className="absolute top-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full shadow-[0_0_12px_2px_rgba(0,124,240,0.45)] motion-safe:animate-[flow-travel_2.6s_ease-in-out_infinite]"
          style={{ left: "14%", background: accentGradient(accent) }}
        />
        <div className="relative flex items-center justify-between">
          {nodes.map((n, i) => (
            <div key={n} className="flex flex-col items-center gap-2">
              <div className="relative grid size-12 place-items-center overflow-hidden rounded-[var(--radius-card)] border border-hairline bg-elevated text-ink">
                {i === 2 && (
                  <span
                    aria-hidden
                    className="absolute inset-0 motion-safe:animate-[fade-pulse_2.6s_ease-in-out_infinite]"
                    style={{ background: accentGradient(accent), opacity: 0.35 }}
                  />
                )}
                <span className={`relative ${i === 2 ? "text-white" : ""}`}>
                  {i === 0 && <Bolt />}
                  {i === 1 && <Gear />}
                  {i === 2 && <Check className="size-5" />}
                </span>
              </div>
              <span className="font-mono text-[9px] uppercase tracking-wide text-faint">
                {n}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Bolt() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden>
      <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" />
    </svg>
  );
}
function Gear() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-5 motion-safe:animate-[gear-spin_6s_linear_infinite]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2" />
    </svg>
  );
}

/* ============================================================
   4) IT konsalting — roadmap, nodes pulse in sequence
   ============================================================ */
export function ConsultingVisual({ accent }: { accent: Accent }) {
  const steps = ["Audit", "Strategiya", "Yo'l xaritasi"];
  return (
    <div className="relative grid h-full w-full place-items-center p-5">
      <div className="relative w-full max-w-[260px] pl-2">
        {/* filled progress line */}
        <div
          className="absolute left-[15px] top-3 w-px"
          style={{ bottom: "12px", background: accentGradient(accent) }}
        />
        <div className="flex flex-col gap-5">
          {steps.map((s, i) => (
            <div key={s} className="relative flex items-center gap-3">
              <div
                className="grid size-7 shrink-0 place-items-center rounded-full text-white motion-safe:animate-[node-pop_2.4s_ease-in-out_infinite]"
                style={{
                  background: accentGradient(accent),
                  animationDelay: `${i * 0.5}s`,
                }}
              >
                <Check className="size-3.5" />
              </div>
              <div className="flex-1 rounded-lg border border-hairline bg-elevated px-3 py-2">
                <span className="text-[12px] font-medium text-ink">{s}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export const serviceVisuals: Record<
  string,
  (props: { accent: Accent }) => React.ReactElement
> = {
  systems: SystemsVisual,
  apps: MobileVisual,
  automation: AutomationVisual,
  consulting: ConsultingVisual,
};
