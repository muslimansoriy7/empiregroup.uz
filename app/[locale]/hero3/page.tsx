"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useLayoutEffect, useRef, useState } from "react";

/**
 * TEST hero #3 — "Questly" SaaS landing, per spec. Standalone route (/hero3) so
 * the live site is untouched. Nimbus Sans + background image + grass overlay +
 * a scaled browser-chrome dashboard mockup (CareNest). Entrances are the spec's
 * own CSS keyframes (reliable across SSR). External image/font load directly
 * (no CSP here); a light fallback keeps dark text legible if the bg image fails.
 */

const BG = "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260611_133301_d5f2a94a-b22e-4e4a-a6b6-eacdddf1f5b0.png&w=1280&q=85";
const GRASS = "https://res.cloudinary.com/dy5er7kv5/image/upload/q_auto/f_auto/v1781191264/grass_eam204.png";

const IC: Record<string, string> = {
  chevronDown: "M6 9l6 6 6-6", menu: "M4 6h16M4 12h16M4 18h16", x: "M18 6 6 18M6 6l12 12",
  arrowUp: "M12 19V5M5 12l7-7 7 7", chevronLeft: "M15 18l-6-6 6-6", chevronRight: "M9 18l6-6-6-6",
  monitor: "M3 4h18v12H3zM8 20h8M12 16v4", rotate: "M21 12a9 9 0 1 1-3-6.7M21 4v5h-5",
  share: "M4 12v8h16v-8M12 3v13M8 7l4-4 4 4", plus: "M12 5v14M5 12h14",
  copy: "M9 9h11v11H9zM5 15V4h11", panelLeft: "M3 4h18v16H3zM9 4v16",
  compass: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20M15 9l-2 5-5 2 2-5z", layers: "M12 2 2 7l10 5 10-5zM2 12l10 5 10-5",
  listTodo: "M9 6h12M9 12h12M9 18h12M4 6l1 1 2-2M4 12l1 1 2-2M4 18l1 1 2-2", grid: "M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z",
  sparkles: "M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6z",
};
function I({ n, cls }: { n: string; cls?: string }) {
  return <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><path d={IC[n]} /></svg>;
}
function Logo({ cls }: { cls?: string }) {
  return <svg className={cls} viewBox="0 0 256 256" fill="currentColor" aria-hidden><path d="M 144 256 L 27.598 256 L 144 139.598 Z M 256 207.5 L 200 256 L 200 56 L 0 56 L 48 0 L 256 0 Z M 0 204.402 L 0 112 L 92.402 112 Z" /></svg>;
}

export default function Hero3() {
  const [open, setOpen] = useState(false);
  return (
    <section className="qst relative flex min-h-[100svh] flex-col overflow-hidden bg-cover bg-center" style={{ backgroundColor: "#eef1f6", backgroundImage: `url("${BG}")` }}>
      <style
        dangerouslySetInnerHTML={{
          __html: `@import url('https://db.onlinewebfonts.com/c/bb5de19d87c09a95216dc6ccd96e37c6?family=Nimbus+Sans+TW01');
          .qst{font-family:'Nimbus Sans TW01','Helvetica Neue',Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}
          @keyframes qfu{from{opacity:0;transform:translateY(24px);filter:blur(6px)}to{opacity:1;transform:none;filter:blur(0)}}
          @keyframes qfd{from{opacity:0;transform:translateY(-16px)}to{opacity:1;transform:none}}
          @keyframes qhr{from{opacity:0;transform:translateY(64px) scale(.97)}to{opacity:1;transform:none}}
          .qst .animate-fade-up{animation:qfu .9s cubic-bezier(.22,1,.36,1) both}
          .qst .animate-fade-down{animation:qfd .7s cubic-bezier(.22,1,.36,1) both}
          .qst .animate-hero-rise{animation:qhr 1.1s cubic-bezier(.22,1,.36,1) both}
          @media(prefers-reduced-motion:reduce){.qst .animate-fade-up,.qst .animate-fade-down,.qst .animate-hero-rise{animation:none;opacity:1;filter:none;transform:none}}`,
        }}
      />

      {/* NAVBAR */}
      <nav className="animate-fade-down relative z-20 flex items-center justify-between px-5 py-4 sm:px-8 sm:py-5 lg:px-10">
        <div className="flex items-center gap-2 text-gray-900"><Logo cls="h-5 w-5 sm:h-6 sm:w-6" /></div>
        <div className="hidden items-center gap-8 md:flex">
          <a href="#" className="flex items-center gap-1 text-[13px] text-gray-700 hover:text-gray-900">Toolkit <I n="chevronDown" cls="h-3.5 w-3.5" /></a>
          <a href="#" className="text-[13px] text-gray-700 hover:text-gray-900">Plans</a>
          <a href="#" className="text-[13px] text-gray-700 hover:text-gray-900">News</a>
        </div>
        <div className="flex items-center gap-2">
          <a href="#" className="rounded-full bg-gray-900 px-4 py-2 text-[13px] font-medium text-white hover:bg-gray-800 sm:px-5">Try It Free</a>
          <button aria-label="Menu" onClick={() => setOpen((v) => !v)} className="grid h-9 w-9 place-items-center rounded-full text-gray-900 hover:bg-gray-900/10 md:hidden">
            <I n={open ? "x" : "menu"} cls="h-5 w-5" />
          </button>
        </div>
        {open && (
          <div className="animate-fade-up absolute left-4 right-4 top-full rounded-2xl bg-white/80 px-5 py-3 ring-1 ring-gray-200 backdrop-blur-xl md:hidden">
            {["Toolkit", "Plans", "News"].map((l) => (<a key={l} href="#" onClick={() => setOpen(false)} className="block border-b border-gray-200 py-3 text-[15px] text-gray-700 last:border-b-0 hover:text-gray-900">{l}</a>))}
          </div>
        )}
      </nav>

      <div className="min-h-8 flex-1 shrink-0 sm:min-h-12 lg:min-h-16" />

      {/* HERO CONTENT */}
      <div className="relative z-20 flex flex-col items-center px-5 text-center">
        <h1 className="font-normal leading-[1.05] tracking-tight text-gray-900 text-[40px] min-[400px]:text-[44px] sm:text-6xl lg:text-7xl xl:text-[80px]">
          <span className="animate-fade-up block">Get cited.</span>
          <span className="animate-fade-up block [animation-delay:100ms]">Effortlessly.</span>
        </h1>

        <form className="animate-fade-up mt-5 w-full max-w-xl [animation-delay:220ms] sm:mt-6" onSubmit={(e) => e.preventDefault()}>
          <div className="flex items-center gap-3 rounded-full bg-white/60 py-1.5 pl-5 pr-1.5 ring-1 ring-gray-200 backdrop-blur-md">
            <input className="flex-1 bg-transparent py-2 text-sm text-gray-900 placeholder-gray-500 outline-none sm:text-base" placeholder="What makes content rank in AI search?" />
            <button aria-label="Search" className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gray-900 text-white transition-transform hover:scale-105 active:scale-95 sm:h-10 sm:w-10"><I n="arrowUp" cls="h-4 w-4 sm:h-[18px] sm:w-[18px]" /></button>
          </div>
        </form>

        <p className="animate-fade-up mt-4 max-w-md text-sm leading-relaxed text-gray-600 [animation-delay:340ms] sm:mt-5 sm:text-base lg:text-lg">
          Ship articles that answer actual customer questions<br />-- and be seen on <I n="sparkles" cls="-mt-1 inline h-4 w-4" /> ChatGPT
        </p>

        <div className="animate-fade-up mt-4 flex flex-wrap items-center justify-center gap-3 [animation-delay:460ms] sm:mt-5">
          <a href="#" className="rounded-full bg-gray-900 px-6 py-2.5 text-sm font-medium text-white transition-all hover:bg-gray-800 hover:shadow-lg">Try It Free</a>
          <a href="#" className="rounded-full px-6 py-2.5 text-sm font-medium text-gray-700 ring-1 ring-gray-300 transition-colors hover:bg-gray-100">Talk to sales</a>
        </div>
      </div>

      <div className="min-h-10 flex-1 shrink-0 sm:min-h-12 lg:min-h-16" />

      {/* DASHBOARD */}
      <div className="animate-hero-rise relative z-0 mx-auto -mb-10 w-[92%] max-w-4xl shrink-0 [animation-delay:620ms] sm:-mb-20 sm:w-[84%] lg:-mb-32 lg:w-[72%]">
        <ScaledDashboard><DashboardMockup /></ScaledDashboard>
      </div>

      {/* GRASS */}
      <img src={GRASS} alt="" className="pointer-events-none absolute bottom-0 left-0 z-10 w-full select-none" />
    </section>
  );
}

/* Scale an 896px-wide design down to fit its container (ResizeObserver). */
function ScaledDashboard({ children }: { children: React.ReactNode }) {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [h, setH] = useState<number | undefined>();

  useLayoutEffect(() => {
    const el = outer.current, ie = inner.current;
    if (!el || !ie) return;
    const apply = () => { const s = el.clientWidth / 896; setScale(s); setH(ie.offsetHeight * s); };
    apply();
    const ro = new ResizeObserver(apply);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  // re-measure after fonts/layout settle
  useEffect(() => { const t = setTimeout(() => { const el = outer.current, ie = inner.current; if (el && ie) { const s = el.clientWidth / 896; setScale(s); setH(ie.offsetHeight * s); } }, 300); return () => clearTimeout(t); }, []);

  return (
    <div ref={outer} className="w-full overflow-hidden" style={{ height: h }}>
      <div ref={inner} style={{ width: 896, transform: `scale(${scale})`, transformOrigin: "top left" }}>{children}</div>
    </div>
  );
}

function DashboardMockup() {
  return (
    <div className="overflow-hidden rounded-t-2xl bg-[#1a1a1c] text-left shadow-[0_-20px_80px_rgba(0,0,0,0.35)] ring-1 ring-white/10">
      {/* title bar */}
      <div className="flex items-center gap-3 border-b border-white/5 bg-[#242427] px-4 py-2.5">
        <div className="flex gap-1.5">{["#ff5f57", "#febc2e", "#28c840"].map((c) => (<span key={c} className="h-2.5 w-2.5 rounded-full" style={{ background: c }} />))}</div>
        <I n="panelLeft" cls="h-3.5 w-3.5 text-white/40" /><I n="chevronLeft" cls="h-3.5 w-3.5 text-white/40" /><I n="chevronRight" cls="h-3.5 w-3.5 text-white/25" />
        <div className="mx-auto flex items-center gap-1.5 rounded-md bg-[#1a1a1c] px-6 py-1 text-[10px] text-white/60"><I n="monitor" cls="h-3 w-3" /> questly.ai</div>
        <I n="rotate" cls="h-3.5 w-3.5 text-white/40" /><I n="share" cls="h-3.5 w-3.5 text-white/40" /><I n="plus" cls="h-3.5 w-3.5 text-white/40" /><I n="copy" cls="h-3.5 w-3.5 text-white/40" />
      </div>
      <div className="flex">
        {/* sidebar */}
        <aside className="w-[22%] border-r border-white/5 bg-[#1e1e21] px-3 py-3.5">
          <div className="mb-3 flex items-center justify-between"><Logo cls="h-4 w-4 text-white/70" /><I n="grid" cls="h-3.5 w-3.5 text-white/30" /></div>
          <div className="mb-4 flex items-center gap-2"><span className="grid h-4 w-4 place-items-center rounded bg-[#e8553f] text-[8px] font-bold text-white">C</span><span className="text-[10px] text-white/80">CareNest</span></div>
          {[["compass", "Uncover"], ["layers", "Subjects"], ["listTodo", "Inbox"]].map(([ic, l]) => (<div key={l} className="mb-1.5 flex items-center gap-2 text-[10px] text-white/60"><I n={ic} cls="h-3.5 w-3.5" />{l}</div>))}
          <div className="mt-4 mb-2 text-[8px] uppercase tracking-wider text-white/30">Recent</div>
          {["Managing dementia care", "Fall prevention at home", "Choosing a mobility aid"].map((a) => (<div key={a} className="mb-1.5 flex items-center gap-1.5 text-[9px] text-white/50"><span className="h-1.5 w-1.5 rounded-full bg-[#28c840]/70" /> {a}</div>))}
        </aside>
        {/* main */}
        <main className="flex-1 p-4">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-[#e8553f] text-sm font-bold text-white">C</span>
              <div><div className="text-sm font-medium text-white">CareNest</div><div className="text-[10px] text-white/45">Elder & home care content workspace</div></div>
            </div>
            <span className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-[11px] text-white"><I n="sparkles" cls="h-3.5 w-3.5" /> Generate</span>
          </div>
          {/* stats */}
          <div className="grid grid-cols-4 divide-x divide-white/5 rounded-xl bg-white/[0.03] ring-1 ring-white/5">
            {[["RELEASED", "62", "Posts indexed"], ["BREADTH", "12", "Subject groups"], ["REMAINING", "412", "Ready to draft"], ["MAX REACH", "3,156,200", "Searches a month"]].map(([k, v, s]) => (
              <div key={k} className="px-4 py-3"><div className="text-[8px] tracking-wider text-white/35">{k}</div><div className="mt-1 text-xl font-medium text-white">{v}</div><div className="text-[9px] text-white/40">{s}</div></div>
            ))}
          </div>
          {/* subject cards */}
          <div className="mt-3 grid grid-cols-3 gap-3">
            {[["Elder Care", "48 topics"], ["Mobility", "31 topics"], ["Home Safety", "27 topics"]].map(([t, s]) => (
              <div key={t} className="rounded-lg bg-white/[0.03] p-3 ring-1 ring-white/5"><div className="text-[12px] font-medium text-white">{t}</div><div className="mt-1 text-[10px] text-white/45">{s}</div></div>
            ))}
          </div>
          {/* drafting inbox */}
          <div className="mt-3 rounded-lg bg-white/[0.03] p-3 ring-1 ring-white/5">
            <div className="mb-2 text-[11px] font-medium text-white/80">Drafting inbox</div>
            <table className="w-full text-[10px] text-white/60">
              <thead className="text-white/30"><tr className="text-left"><th className="pb-1 font-normal">Question</th><th className="pb-1 font-normal">Volume</th><th className="pb-1 font-normal">Difficulty</th><th className="pb-1 text-right font-normal">Status</th></tr></thead>
              <tbody>
                {[["How to care for aging parents at home", "18,100", "Medium", "Drafting"], ["Best mobility aids for seniors", "9,900", "Low", "Ready"], ["Signs of early dementia", "27,000", "High", "Drafting"], ["Home modifications for fall safety", "6,600", "Low", "Ready"], ["Choosing an in-home caregiver", "12,400", "Medium", "Ready"]].map((r, i) => (
                  <tr key={i} className="border-t border-white/5">
                    <td className="py-1.5 text-white/80">{r[0]}</td><td className="py-1.5">{r[1]}</td><td className="py-1.5">{r[2]}</td>
                    <td className="py-1.5 text-right" style={r[3] === "Drafting" ? { color: "rgba(254,188,46,.8)" } : { color: "rgba(40,200,64,.75)" }}>{r[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}
