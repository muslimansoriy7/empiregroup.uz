"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { Check, ArrowRight } from "./Icons";

/**
 * HeroTransform — the hero's right-hand attention magnet.
 *
 * An ambient, looping infographic that tells the core story in one glance:
 * a business's scattered / manual mess (MUAMMO) collapsing into one unified,
 * automated Empire system (YECHIM). Auto-cycles every few seconds; freezes on
 * the solution frame for reduced-motion users.
 */
export function HeroTransform() {
  const { t } = useI18n();
  const f = t.hero.flow;
  const reduce = useReducedMotion();
  // false = problem, true = solution
  const [solved, setSolved] = useState(reduce ? true : false);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setSolved((s) => !s), 3800);
    return () => clearInterval(id);
  }, [reduce]);

  return (
    <div className="relative mx-auto w-full max-w-[440px]">
      {/* soft accent glow behind the card, tinted by phase */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-6 -z-10 rounded-[32px] opacity-70 blur-2xl transition-colors duration-700"
        style={{
          background: solved
            ? "radial-gradient(60% 60% at 50% 40%, color-mix(in srgb, #22c55e 22%, transparent), transparent 70%)"
            : "radial-gradient(60% 60% at 50% 40%, color-mix(in srgb, var(--color-grad-ship-start) 18%, transparent), transparent 70%)",
        }}
      />

      <div className="overflow-hidden rounded-[18px] border border-hairline bg-elevated shadow-[var(--shadow-float)]">
        {/* header: phase toggle MUAMMO → YECHIM */}
        <div className="flex items-center justify-between gap-3 border-b border-hairline bg-canvas/60 px-4 py-3 backdrop-blur-sm">
          <div className="flex items-center gap-2 font-mono text-[10.5px] font-medium uppercase tracking-[0.1em]">
            <span
              className={`rounded-full px-2 py-1 transition-colors duration-500 ${
                solved ? "text-faint" : "bg-[#ff4d4d]/10 text-[#e5484d]"
              }`}
            >
              {f.problemLabel}
            </span>
            <ArrowRight className="size-3.5 text-faint" />
            <span
              className={`rounded-full px-2 py-1 transition-colors duration-500 ${
                solved ? "bg-[#22c55e]/12 text-[#16a34a]" : "text-faint"
              }`}
            >
              {f.solutionLabel}
            </span>
          </div>
          <div className="flex gap-1.5" aria-hidden>
            <span className="size-2.5 rounded-full bg-hairline" />
            <span className="size-2.5 rounded-full bg-hairline" />
            <span className="size-2.5 rounded-full bg-hairline" />
          </div>
        </div>

        {/* body — cross-fading scenes, fixed height to avoid layout jump */}
        <div className="relative h-[288px] p-5">
          <AnimatePresence mode="wait" initial={false}>
            {solved ? (
              <SolutionScene key="solution" f={f} reduce={!!reduce} />
            ) : (
              <ProblemScene key="problem" f={f} reduce={!!reduce} />
            )}
          </AnimatePresence>
        </div>

        {/* metric footer — always visible, animates in on solve */}
        <div className="flex items-center justify-between gap-3 border-t border-hairline px-5 py-4">
          <div className="flex items-baseline gap-2">
            <motion.span
              key={solved ? "on" : "off"}
              initial={reduce ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-[26px] font-semibold leading-none tracking-[-0.03em] text-ink"
            >
              {f.metricValue}
            </motion.span>
            <span className="text-[12.5px] text-mute">{f.metricLabel}</span>
          </div>
          <div className="h-1.5 w-24 overflow-hidden rounded-full bg-hairline">
            <motion.div
              className="h-full rounded-full"
              style={{ background: "linear-gradient(90deg,#22c55e,#16a34a)" }}
              initial={false}
              animate={{ width: solved ? "100%" : "28%" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

type Flow = ReturnType<typeof useI18n>["t"]["hero"]["flow"];

/* ---- Problem: scattered, tilted tiles with warning dots ---- */
function ProblemScene({ f, reduce }: { f: Flow; reduce: boolean }) {
  const tilts = ["-2.5deg", "2deg", "1.5deg", "-1.5deg"];
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.3 }}
      className="absolute inset-5"
    >
      <div className="mb-3 flex items-center gap-2">
        <span className="grid size-5 place-items-center rounded-full bg-[#ff4d4d]/12 text-[#e5484d]">
          <svg viewBox="0 0 24 24" className="size-3" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
            <path d="M12 8v5M12 16.5v.5" />
            <path d="M10.3 3.9 2.6 17.4A2 2 0 0 0 4.3 20.4h15.4a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" strokeWidth="1.7" />
          </svg>
        </span>
        <span className="text-[13px] font-medium text-ink">{f.problemTitle}</span>
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        {f.problemItems.map((item, i) => (
          <motion.div
            key={item}
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.06 * i, duration: 0.35 }}
            className="flex items-center gap-2 rounded-[10px] border border-dashed border-hairline bg-canvas px-3 py-3"
            style={{ transform: `rotate(${tilts[i % tilts.length]})` }}
          >
            <span className="relative flex size-2 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#ff4d4d] opacity-50" />
              <span className="relative inline-flex size-2 rounded-full bg-[#ff4d4d]" />
            </span>
            <span className="truncate text-[12px] text-body">{item}</span>
          </motion.div>
        ))}
      </div>

      {/* tangled connectors hint */}
      <div className="mt-4 flex items-center justify-center gap-1 opacity-60" aria-hidden>
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <span
            key={i}
            className="h-px w-6 bg-hairline"
            style={{ transform: `rotate(${(i % 2 ? 8 : -8)}deg)` }}
          />
        ))}
      </div>
    </motion.div>
  );
}

/* ---- Solution: one hub, clean connected list, green checks ---- */
function SolutionScene({ f, reduce }: { f: Flow; reduce: boolean }) {
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="absolute inset-5"
    >
      {/* hub */}
      <div className="flex items-center gap-2.5">
        <span
          className="grid size-8 place-items-center rounded-[9px] text-white shadow-[var(--shadow-whisper)]"
          style={{ background: "linear-gradient(135deg,#007cf0,#00dfd8)" }}
        >
          <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="7" rx="1.5" />
            <rect x="14" y="3" width="7" height="7" rx="1.5" />
            <rect x="3" y="14" width="7" height="7" rx="1.5" />
            <rect x="14" y="14" width="7" height="7" rx="1.5" />
          </svg>
        </span>
        <div>
          <div className="text-[13px] font-semibold tracking-tight text-ink">
            {f.solutionTitle}
          </div>
          <div className="flex items-center gap-1.5 font-mono text-[9.5px] uppercase tracking-wide text-[#16a34a]">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#22c55e] opacity-60" />
              <span className="relative inline-flex size-1.5 rounded-full bg-[#22c55e]" />
            </span>
            online
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-2">
        {f.solutionItems.map((item, i) => (
          <motion.div
            key={item}
            initial={reduce ? false : { opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.08 + 0.08 * i, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-2.5 rounded-[10px] border border-hairline bg-canvas px-3 py-2.5"
          >
            <span className="grid size-5 shrink-0 place-items-center rounded-full bg-[#22c55e]/14 text-[#16a34a]">
              <Check className="size-3" />
            </span>
            <span className="text-[12.5px] font-medium text-ink">{item}</span>
            <span className="ml-auto h-1 w-10 rounded-full bg-hairline">
              <motion.span
                className="block h-full rounded-full bg-[#22c55e]/60"
                initial={reduce ? false : { scaleX: 0 }}
                animate={{ scaleX: 1 }}
                style={{ transformOrigin: "left" }}
                transition={{ delay: 0.2 + 0.08 * i, duration: 0.5 }}
              />
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
