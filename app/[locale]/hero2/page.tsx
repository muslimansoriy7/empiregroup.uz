"use client";

/* eslint-disable @next/next/no-img-element */
import { useState } from "react";

/**
 * TEST hero #2 — editorial agency full-screen hero, per spec. Standalone route
 * (/hero2) so the live site is untouched. Inter, uppercase, purple accent over
 * a full-screen video with a light fallback (so black text always reads if the
 * clip is unavailable). Entrances are CSS (reliable across SSR) mirroring the
 * requested fadeDown / fadeUp / clip-reveal.
 */

const VIDEO = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260517_222138_3e3205be-3364-417b-a64a-bfe087acbec4.mp4";
const LINKS = ["Story", "Expertise", "Studios", "Feedback"];
const STATS: [string, string][] = [["300", "CRAFTED\nBRANDS"], ["200", "DIGITAL\nPRODUCTS"], ["100", "VENTURES\nFUNDED"]];

function ArrowUpRight({ size = 20 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M7 17 17 7M7 7h10v10" /></svg>;
}
function X({ size = 20 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12" /></svg>;
}

export default function Hero2() {
  const [open, setOpen] = useState(false);
  const A = "#5E0ED7";

  return (
    <div className="hero2 relative min-h-screen overflow-hidden" style={{ background: "#000" }}>
      <style
        dangerouslySetInnerHTML={{
          __html: `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');
          .hero2{font-family:'Inter',sans-serif;color:#000}
          .hero2 .fd{opacity:0;transform:translateY(-20px);animation:h2fd .5s cubic-bezier(.22,1,.36,1) forwards}
          .hero2 .fu{opacity:0;transform:translateY(32px);animation:h2fu .6s cubic-bezier(.22,1,.36,1) forwards}
          .hero2 .clip{display:inline-block;transform:translateY(110%);animation:h2clip .7s cubic-bezier(.22,1,.36,1) forwards}
          @keyframes h2fd{to{opacity:1;transform:none}}
          @keyframes h2fu{to{opacity:1;transform:none}}
          @keyframes h2clip{to{transform:none}}
          .hero2 .bg{position:absolute;inset:0;z-index:0;overflow:hidden;background:radial-gradient(120% 90% at 80% 10%,#efe9fb 0%,#f5f3fb 45%,#fbfafd 100%)}
          .hero2 .bg span{position:absolute;border-radius:50%;filter:blur(90px)}
          .hero2 .g1{top:-14%;right:-8%;width:52%;height:66%;background:radial-gradient(circle,rgba(150,90,230,.28),transparent 70%);animation:h2f 22s ease-in-out infinite}
          .hero2 .g2{bottom:-16%;left:-6%;width:46%;height:60%;background:radial-gradient(circle,rgba(94,14,215,.18),transparent 70%);animation:h2f 28s ease-in-out infinite reverse}
          .hero2 .hvid{position:absolute;inset:0;z-index:0;width:100%;height:100%;object-fit:cover}
          @keyframes h2f{50%{transform:translateY(36px) scale(1.08)}}
          @media(prefers-reduced-motion:reduce){.hero2 .fd,.hero2 .fu,.hero2 .clip{opacity:1;transform:none;animation:none}.hero2 .bg span{animation:none}}`,
        }}
      />

      {/* background */}
      <div className="bg" aria-hidden><span className="g1" /><span className="g2" /></div>
      <video className="hvid" autoPlay muted loop playsInline src={VIDEO} onError={(e) => { e.currentTarget.style.display = "none"; }} />

      <div className="relative z-10 flex min-h-screen flex-col">
        {/* NAV */}
        <nav className="flex items-center justify-between px-5 pt-5 sm:px-8 md:px-12 md:pt-6">
          <div className="fd grid h-8 w-8 place-items-center rounded-full" style={{ border: `2px solid ${A}`, animationDelay: "0s" }}>
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: A }} />
          </div>
          <div className="hidden items-center gap-8 md:flex">
            {LINKS.map((l, i) => (
              <a key={l} href="#" className="fd text-sm font-semibold uppercase tracking-widest" style={{ animationDelay: `${(i + 1) * 0.1}s` }}>{l}</a>
            ))}
          </div>
          <button aria-label="Menu" onClick={() => setOpen(true)} className="fd flex h-9 w-9 flex-col items-center justify-center gap-1 rounded-full" style={{ background: "#000", animationDelay: "0.5s" }}>
            <span className="h-0.5 w-4 bg-white" /><span className="h-0.5 w-4 bg-white" /><span className="h-0.5 w-4 bg-white" />
          </button>
        </nav>

        {/* STATS */}
        <div className="flex flex-1 items-center justify-end px-5 py-8 sm:px-8 md:px-12 md:py-0">
          <div className="flex items-start gap-5 sm:gap-8 md:gap-10">
            {STATS.map(([num, label], i) => (
              <div key={label} className="fu text-right" style={{ animationDelay: `${(i + 2) * 0.12}s` }}>
                <div className="font-semibold leading-none" style={{ fontSize: "clamp(1.5rem,5vw,3.5rem)" }}>
                  <span style={{ color: A, fontSize: "0.5em", verticalAlign: "top" }}>+</span>{num}
                </div>
                <div className="mt-1 whitespace-pre-line text-[10px] font-semibold uppercase leading-tight tracking-widest sm:text-xs md:text-sm">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* BOTTOM */}
        <div className="flex flex-col gap-6 px-5 pb-8 sm:px-8 md:gap-12 md:px-12 md:pb-12">
          {/* Row A */}
          <div className="flex items-center justify-between gap-4">
            <p className="fu max-w-[130px] text-[10px] font-semibold uppercase leading-tight tracking-widest sm:max-w-[160px] sm:text-xs md:max-w-xs md:text-sm" style={{ animationDelay: `${5 * 0.12}s` }}>
              Shaping Bold<br />Visions Into Power<br />For Your Tribe
            </p>
            <a href="#" className="fu inline-flex items-center gap-1.5 whitespace-nowrap text-base font-semibold uppercase tracking-wide sm:text-xl md:text-2xl" style={{ color: A, animationDelay: `${6 * 0.12}s` }}>
              Work With Us <ArrowUpRight size={22} />
            </a>
          </div>
          {/* Row B */}
          <div className="flex items-end justify-between gap-3 sm:gap-4">
            <p className="fu w-[120px] shrink-0 text-left text-[9px] font-semibold uppercase leading-tight tracking-widest sm:w-[180px] sm:text-xs md:w-[280px] md:text-right md:text-sm" style={{ animationDelay: `${7 * 0.12}s` }}>
              Creative Studios Built Around Elevating Your Vision Into Striking Reality
            </p>
            <h1 className="text-right font-semibold uppercase" style={{ fontSize: "clamp(2rem,9vw,9rem)", lineHeight: 0.88 }}>
              {["Fearless", "Vision", "Delivered"].map((w, i) => (
                <span key={w} className="block overflow-hidden">
                  <span className="clip" style={{ animationDelay: `${0.4 + i * 0.14}s` }}>{w}</span>
                </span>
              ))}
            </h1>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="fixed inset-0 z-50 flex flex-col bg-white px-5 py-5 sm:px-8">
          <div className="flex items-center justify-between">
            <div className="grid h-8 w-8 place-items-center rounded-full" style={{ border: `2px solid ${A}` }}>
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: A }} />
            </div>
            <button aria-label="Close" onClick={() => setOpen(false)} className="grid h-9 w-9 place-items-center rounded-full text-white" style={{ background: "#000" }}><X size={18} /></button>
          </div>
          <nav className="mt-16 flex flex-col gap-8">
            {LINKS.map((l) => (
              <a key={l} href="#" onClick={() => setOpen(false)} className="text-3xl font-semibold uppercase tracking-widest">{l}</a>
            ))}
          </nav>
          <a href="#" className="mt-auto inline-flex items-center gap-2 text-xl font-semibold uppercase tracking-wide" style={{ color: A }}>
            Work With Us <ArrowUpRight size={22} />
          </a>
        </div>
      )}
    </div>
  );
}
