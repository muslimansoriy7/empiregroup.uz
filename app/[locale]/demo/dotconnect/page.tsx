"use client";

import React, { useState } from "react";

/* ============================================================================
   (dot)connect — Swiss engineering blueprint with a single ember
   Self-contained demo landing for "Empire Group".
   All styling is scoped under .dcn. No project imports, no external JS.
   ========================================================================== */

/* ---- Inline SVG icons (monoline, 1.5–2px strokes to match the border language) ---- */

function ArrowUpRight({ size = 16, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7 17L17 7M17 7H8M17 7V16" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowRight({ size = 16, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Plus({ size = 20, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 5V19M5 12H19" stroke={color} strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

function Star({ size = 16, color = "#fd5321" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden="true">
      <path d="M12 2l2.9 6.26L21.5 9.2l-4.75 4.64L17.9 21 12 17.6 6.1 21l1.15-7.16L2.5 9.2l6.6-.94L12 2z" />
    </svg>
  );
}

/* ---- Data ---- */

const NAV = [
  { label: "Xizmatlar", href: "#services" },
  { label: "Jarayon", href: "#process" },
  { label: "Loyihalar", href: "#cases" },
  { label: "Sharhlar", href: "#testimonials" },
  { label: "Narxlar", href: "#pricing" },
];

const STATS = [
  { n: "50+", l: "yakunlangan loyiha" },
  { n: "30+", l: "mamnun mijoz" },
  { n: "15+", l: "texnologiya" },
  { n: "3+", l: "yil tajriba" },
];

const LOGOS = ["Google", "Meta", "Stripe", "Telegram", "GitHub", "Cloudflare", "Vercel", "Figma", "Notion"];

const TIERS = [
  { tag: "STANDARD", price: "$5,000 dan", time: "2–3 oy", popular: false },
  { tag: "ADVANCED", price: "$15K–$40K", time: "4–6 oy", popular: true },
  { tag: "MEGA", price: "$50,000+", time: "6–12 oy", popular: false },
];

const PROCESS = [
  { n: "01", t: "Explore", d: "G'oya va muammoni chuqur o'rganamiz.", tags: ["Tahlil", "Audit"] },
  { n: "02", t: "Plan", d: "PRD, arxitektura, dizayn; muddat/byudjet aniq.", tags: ["PRD", "TZ", "Dizayn"] },
  { n: "03", t: "Build", d: "Kod, test, integratsiya; sprintlar, demo.", tags: ["Dev", "Test", "Demo"] },
  { n: "04", t: "Commit", d: "Ishga tushirish va qo'llab-quvvatlash.", tags: ["Deploy", "Support"] },
];

const CASES = [
  { t: "Motor Lux", d: "CRM va savdo", cat: "Avtomobil", metric: "CRM" },
  { t: "GadgetSpace", d: "Onlayn elektronika do'koni", cat: "E-commerce", metric: "2.1× konversiya" },
  { t: "Hilol Market", d: "Savdo avtomatlashtirish", cat: "POS", metric: "2× tez" },
  { t: "MedFlow", d: "Klinika boshqaruvi", cat: "Healthcare", metric: "AI" },
];

const TESTIMONIALS = [
  { name: "Aliya M.", co: "Motor Lux", q: "Empire Group eski qog'ozdagi ishimizni to'liq tizimga o'tkazdi — vaqt ancha tejaldi." },
  { name: "Jasur T.", co: "GadgetSpace", q: "Empire bilan ishlash oson bo'ldi, muddat va byudjet aniq edi." },
  { name: "Doniyor R.", co: "MedFlow", q: "Klinika ishini AI qo'shib avtomatlashtirdi. Qabul ancha tartibli." },
  { name: "Laziza K.", co: "X Wear", q: "Zamonaviy dizayn, savdo hajmi ko'tarildi." },
];

const FAQ = [
  { q: "Loyiha qancha vaqt oladi?", a: "MVP 3–4 hafta, o'rta 2–3 oy, yirik 4–6 oy. Aniq muddat Explore bosqichida." },
  { q: "Narxlar qanday?", a: "Fixed-scope: loyiha boshida aniq belgilanadi." },
  { q: "Mavjud tizimni davom ettira olasizmi?", a: "Ha, audit qilib ustiga quramiz." },
  { q: "Konsultatsiya bepulmi?", a: "Ha, majburiyatsiz." },
];

/* ---- Small building blocks ---- */

function SectionHeader({ num, label, title }: { num: string; label: string; title?: string }) {
  return (
    <div className="dcn-sh">
      <div className="dcn-sh-row">
        <div className="dcn-sh-left">
          <span className="dcn-sh-icon" aria-hidden="true">
            <ArrowRight size={13} color="#fcfbf8" />
          </span>
          <span className="dcn-sh-name">{label}</span>
        </div>
        <span className="dcn-sh-num">({num})</span>
      </div>
      <div className="dcn-hairline" />
      {title ? <h2 className="dcn-sh-title">{title}</h2> : null}
    </div>
  );
}

/* ---- Page ---- */

export default function DotConnectDemoPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="dcn">
      <style
        dangerouslySetInnerHTML={{
          __html: `
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&family=Space+Mono:wght@400;700&display=swap');

/* ====== Scope + reset ====== */
.dcn *, .dcn *::before, .dcn *::after { box-sizing: border-box; }
.dcn {
  --bone: #fcfbf8;
  --ink: #001011;
  --smoke: #0f1e1f;
  --ash: #ededea;
  --mist: #c1c4c2;
  --ember: #fd5321;
  --blue: #007aff;

  --grotesk: 'Space Grotesk', ui-sans-serif, system-ui, sans-serif;
  --sans: 'Inter', ui-sans-serif, system-ui, -apple-system, sans-serif;
  --mono: 'Space Mono', ui-monospace, monospace;

  --maxw: 1200px;

  min-height: 100vh;
  background: var(--bone);
  color: var(--ink);
  font-family: var(--sans);
  font-size: 18px;
  line-height: 1.4;
  letter-spacing: 0.18px;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  position: relative;
  overflow-x: hidden;
}
.dcn h1, .dcn h2, .dcn h3, .dcn h4, .dcn p, .dcn ul, .dcn li, .dcn figure, .dcn blockquote {
  margin: 0; padding: 0;
}
.dcn ul { list-style: none; }
.dcn a { color: inherit; text-decoration: none; }
.dcn button { font-family: inherit; cursor: pointer; border: none; background: none; color: inherit; }
.dcn img, .dcn svg { display: block; }

.dcn :focus-visible {
  outline: 2px solid var(--blue);
  outline-offset: 3px;
  border-radius: 4px;
}

/* Display headline family: grotesk with aggressive negative tracking */
.dcn .display {
  font-family: var(--grotesk);
  font-weight: 500;
  letter-spacing: -0.025em;
  line-height: 0.9;
  color: var(--ink);
  font-feature-settings: "ss01" on, "ss02" on;
}
.dcn .heading {
  font-family: var(--grotesk);
  font-weight: 500;
  letter-spacing: -0.012em;
  line-height: 1.05;
  color: var(--ink);
}
.dcn .mono {
  font-family: var(--mono);
  letter-spacing: 0.02em;
}

.dcn .wrap {
  width: 100%;
  max-width: var(--maxw);
  margin: 0 auto;
  padding-left: 24px;
  padding-right: 24px;
}

.dcn section { scroll-margin-top: 90px; }

/* ====== Buttons ====== */
/* Ember filled CTA — the single accent; used once per viewport */
.dcn .btn-ember {
  display: inline-flex; align-items: center; gap: 10px;
  background: var(--ember); color: var(--bone);
  font-family: var(--sans); font-weight: 500; font-size: 16px; letter-spacing: 0.16px;
  padding: 12px 24px; border-radius: 24px;
  transition: transform .18s ease, filter .18s ease;
}
.dcn .btn-ember:hover { filter: brightness(1.05); transform: translateY(-1px); }

/* Arrow pill — dark fill, circular icon */
.dcn .btn-pill {
  display: inline-flex; align-items: center; gap: 12px;
  background: var(--ink); color: var(--bone);
  font-family: var(--sans); font-weight: 500; font-size: 16px; letter-spacing: 0.16px;
  padding: 6px 20px 6px 6px; border-radius: 44px;
  transition: transform .18s ease, background .18s ease;
}
.dcn .btn-pill:hover { transform: translateY(-1px); }
.dcn .btn-pill .ic {
  width: 32px; height: 32px; border-radius: 50%;
  background: var(--bone); display: inline-flex; align-items: center; justify-content: center;
  transition: transform .18s ease;
}
.dcn .btn-pill:hover .ic { transform: rotate(45deg); }

/* Ghost outlined — signal blue stroke only */
.dcn .btn-ghost {
  display: inline-flex; align-items: center; gap: 10px;
  background: transparent; color: var(--blue);
  border: 1px solid var(--blue);
  font-family: var(--sans); font-weight: 500; font-size: 16px; letter-spacing: 0.16px;
  padding: 12px 24px; border-radius: 24px;
  transition: background .18s ease;
}
.dcn .btn-ghost:hover { background: rgba(0,122,255,0.06); }

/* badge / tag */
.dcn .badge {
  display: inline-flex; align-items: center; gap: 6px;
  background: var(--bone); border: 1px solid var(--mist);
  border-radius: 8px; padding: 4px 10px;
  font-size: 14px; font-weight: 400; color: var(--smoke); letter-spacing: 0.2px;
}

/* ====== Nav ====== */
.dcn .nav {
  position: sticky; top: 0; z-index: 50;
  background: rgba(252,251,248,0.86);
  backdrop-filter: saturate(140%) blur(8px);
  border-bottom: 1px solid transparent;
}
.dcn .nav.scrolled { border-bottom: 1px solid var(--mist); }
.dcn .nav-inner {
  display: flex; align-items: center; justify-content: space-between;
  height: 72px;
}
.dcn .logo {
  font-family: var(--grotesk); font-weight: 600; font-size: 19px; letter-spacing: -0.01em;
  color: var(--ink); display: inline-flex; align-items: baseline; gap: 2px;
}
.dcn .logo .dot { color: var(--ember); }
.dcn .nav-links {
  display: flex; align-items: center; gap: 28px;
}
.dcn .nav-links a {
  font-size: 16px; font-weight: 500; color: var(--smoke); letter-spacing: 0.1px;
  transition: color .15s ease; position: relative;
}
.dcn .nav-links a:hover { color: var(--ink); }
.dcn .nav-right { display: flex; align-items: center; gap: 16px; }
.dcn .nav-toggle { display: none; width: 44px; height: 44px; align-items: center; justify-content: center; border-radius: 12px; }
.dcn .nav-toggle span { display: block; width: 20px; height: 1.75px; background: var(--ink); position: relative; }
.dcn .nav-toggle span::before, .dcn .nav-toggle span::after {
  content: ""; position: absolute; left: 0; width: 20px; height: 1.75px; background: var(--ink);
}
.dcn .nav-toggle span::before { top: -6px; } .dcn .nav-toggle span::after { top: 6px; }

.dcn .mobile-menu {
  display: none;
  border-top: 1px solid var(--mist);
  background: var(--bone);
  padding: 16px 24px 24px;
}
.dcn .mobile-menu.open { display: block; }
.dcn .mobile-menu a {
  display: block; padding: 12px 0; font-size: 21px; font-weight: 500; color: var(--ink);
  font-family: var(--grotesk); letter-spacing: -0.01em;
  border-bottom: 1px solid var(--mist);
}
.dcn .mobile-menu .btn-ember { margin-top: 20px; width: 100%; justify-content: center; }

/* ====== Hero ====== */
.dcn .hero { padding: 80px 0 40px; }
.dcn .eyebrow {
  display: inline-flex; align-items: center; gap: 10px;
  font-family: var(--mono); font-size: 13px; letter-spacing: 0.14em; text-transform: uppercase;
  color: var(--smoke);
  border: 1px solid var(--mist); border-radius: 48px; padding: 7px 16px;
}
.dcn .eyebrow .pip { width: 7px; height: 7px; border-radius: 50%; background: var(--ember); display: inline-block; }
.dcn .hero-grid {
  display: grid; grid-template-columns: 1.15fr 0.85fr; gap: 56px; align-items: end;
  margin-top: 40px;
}
.dcn .hero h1 {
  font-size: clamp(52px, 8.2vw, 101px);
  letter-spacing: -0.025em;
  line-height: 0.86;
  margin-top: 24px;
}
.dcn .hero h1 .ember-word { color: var(--ember); }
.dcn .hero-sub {
  font-size: 18px; color: var(--smoke); line-height: 1.45; max-width: 54ch;
  margin-top: 28px;
}
.dcn .hero-cta { display: flex; flex-wrap: wrap; gap: 14px; margin-top: 32px; }

/* Hero visual: blueprint numeral panel */
.dcn .hero-visual {
  border: 1px solid var(--mist); border-radius: 20px;
  background:
    linear-gradient(180deg, rgba(237,237,234,0.5), rgba(252,251,248,0)) ,
    var(--bone);
  padding: 28px;
  position: relative; overflow: hidden;
  min-height: 340px;
  display: flex; flex-direction: column; justify-content: space-between;
}
.dcn .hero-visual .grid-lines {
  position: absolute; inset: 0;
  background-image:
    linear-gradient(to right, rgba(193,196,194,0.35) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(193,196,194,0.35) 1px, transparent 1px);
  background-size: 32px 32px;
  mask-image: radial-gradient(circle at 70% 40%, #000 30%, transparent 78%);
}
.dcn .hero-visual .hv-top { display: flex; justify-content: space-between; position: relative; z-index: 1; }
.dcn .hero-visual .hv-tag { font-family: var(--mono); font-size: 12px; color: var(--smoke); letter-spacing: 0.1em; }
.dcn .hero-visual .numeral {
  position: relative; z-index: 1;
  font-family: var(--grotesk); font-weight: 700; letter-spacing: -0.04em;
  font-size: clamp(120px, 20vw, 200px); line-height: 0.8; color: var(--ink);
}
.dcn .hero-visual .numeral b { color: var(--ember); font-weight: 700; }
.dcn .hero-visual .hv-foot {
  position: relative; z-index: 1; display: flex; justify-content: space-between; align-items: flex-end;
  font-family: var(--mono); font-size: 12px; color: var(--smoke);
}
.dcn .hero-visual .node {
  width: 10px; height: 10px; border-radius: 50%; background: var(--bone);
  border: 1.5px solid var(--ink);
}
.dcn .hero-visual .node.on { background: var(--ember); border-color: var(--ember); }

/* ====== Proof strip ====== */
.dcn .proof { padding: 40px 0; }
.dcn .proof-inner {
  border-top: 1px solid var(--mist); border-bottom: 1px solid var(--mist);
  padding: 26px 0;
  display: flex; align-items: center; gap: 12px; flex-wrap: wrap;
}
.dcn .proof-label {
  font-family: var(--mono); font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase;
  color: var(--smoke); margin-right: 12px;
}
.dcn .proof-logos { display: flex; align-items: center; gap: 30px; flex-wrap: wrap; }
.dcn .proof-logos span {
  font-family: var(--grotesk); font-weight: 500; font-size: 18px; color: var(--smoke);
  letter-spacing: -0.01em; opacity: 0.72; transition: opacity .2s ease, color .2s ease;
}
.dcn .proof-logos span:hover { opacity: 1; color: var(--ink); }

/* ====== Generic section ====== */
.dcn .block { padding: 48px 0; }
.dcn .block-lg { padding: 72px 0; }

/* section header */
.dcn .dcn-sh { margin-bottom: 40px; }
.dcn .dcn-sh-row { display: flex; align-items: center; justify-content: space-between; }
.dcn .dcn-sh-left { display: flex; align-items: center; gap: 12px; }
.dcn .dcn-sh-icon {
  width: 26px; height: 26px; border-radius: 50%; background: var(--ink);
  display: inline-flex; align-items: center; justify-content: center;
}
.dcn .dcn-sh-name { font-family: var(--grotesk); font-weight: 500; font-size: 18px; color: var(--ink); letter-spacing: -0.01em; }
.dcn .dcn-sh-num { font-family: var(--mono); font-size: 16px; color: var(--smoke); }
.dcn .dcn-hairline { height: 1px; background: var(--mist); margin-top: 16px; }
.dcn .dcn-sh-title {
  font-family: var(--grotesk); font-weight: 500; font-size: clamp(30px, 4.4vw, 44px);
  letter-spacing: -0.02em; line-height: 1.02; margin-top: 28px; max-width: 18ch;
}

/* ====== Services ====== */
.dcn .services-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
.dcn .offer {
  background: var(--bone); border: 1px solid var(--mist); border-radius: 20px; padding: 32px;
  display: flex; flex-direction: column;
}
.dcn .offer-head { display: flex; align-items: flex-start; gap: 14px; }
.dcn .offer-arrow {
  width: 34px; height: 34px; border-radius: 50%; background: var(--ink); flex: none;
  display: inline-flex; align-items: center; justify-content: center; margin-top: 2px;
}
.dcn .offer-title { font-family: var(--grotesk); font-weight: 500; font-size: 26px; letter-spacing: -0.015em; color: var(--ink); line-height: 1.05; }
.dcn .offer-body { font-size: 18px; color: var(--smoke); line-height: 1.4; margin-top: 14px; }
.dcn .offer-stack { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 22px; }
.dcn .offer-divider { height: 1px; background: var(--mist); margin: 26px 0; }

/* pricing tiers inside first offer */
.dcn .tiers { display: flex; flex-direction: column; gap: 10px; }
.dcn .tier {
  display: flex; align-items: center; justify-content: space-between;
  border: 1px solid var(--mist); border-radius: 14px; padding: 14px 16px;
  background: var(--bone); transition: border-color .2s ease, background .2s ease;
}
.dcn .tier:hover { background: var(--ash); }
.dcn .tier.popular { border-color: var(--ink); }
.dcn .tier-l { display: flex; align-items: center; gap: 12px; }
.dcn .tier-tag { font-family: var(--mono); font-size: 12px; letter-spacing: 0.1em; color: var(--ink); }
.dcn .tier-pop {
  font-family: var(--mono); font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase;
  color: var(--ember); border: 1px solid var(--ember); border-radius: 6px; padding: 2px 6px;
}
.dcn .tier-r { text-align: right; }
.dcn .tier-price { font-family: var(--grotesk); font-weight: 500; font-size: 18px; letter-spacing: -0.01em; color: var(--ink); }
.dcn .tier-time { font-size: 13px; color: var(--smoke); }

/* second offer: tags */
.dcn .offer-tags { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 4px; }
.dcn .offer-spacer { flex: 1; }

/* ====== Process ====== */
.dcn .process-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0; border: 1px solid var(--mist); border-radius: 20px; overflow: hidden; }
.dcn .step { padding: 28px 24px; border-right: 1px solid var(--mist); display: flex; flex-direction: column; min-height: 260px; }
.dcn .step:last-child { border-right: none; }
.dcn .step-num { font-family: var(--mono); font-size: 14px; color: var(--smoke); letter-spacing: 0.08em; }
.dcn .step-t { font-family: var(--grotesk); font-weight: 500; font-size: 28px; letter-spacing: -0.02em; margin-top: 40px; }
.dcn .step-t.ember { color: var(--ember); }
.dcn .step-d { font-size: 16px; color: var(--smoke); line-height: 1.4; margin-top: 12px; flex: 1; }
.dcn .step-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 18px; }

/* ====== Cases ====== */
.dcn .cases-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }
.dcn .case { display: flex; flex-direction: column; }
.dcn .case-img {
  aspect-ratio: 4/3; border-radius: 20px; overflow: hidden; position: relative;
  background: var(--ash); border: 1px solid var(--mist);
  display: flex; align-items: center; justify-content: center;
}
.dcn .case-img .clines {
  position: absolute; inset: 0;
  background-image:
    linear-gradient(to right, rgba(0,16,17,0.06) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(0,16,17,0.06) 1px, transparent 1px);
  background-size: 22px 22px;
}
.dcn .case-metric {
  position: relative; z-index: 1;
  font-family: var(--grotesk); font-weight: 600; font-size: 22px; letter-spacing: -0.02em; color: var(--ink);
  text-align: center; padding: 0 12px;
}
.dcn .case-idx {
  position: absolute; top: 12px; left: 14px; z-index: 1;
  font-family: var(--mono); font-size: 12px; color: var(--smoke);
}
.dcn .case-dot { position: absolute; top: 14px; right: 14px; z-index: 1; width: 9px; height: 9px; border-radius: 50%; background: var(--ember); }
.dcn .case-body { padding: 16px 4px 0; }
.dcn .case-cat { font-family: var(--mono); font-size: 12px; letter-spacing: 0.06em; color: var(--smoke); text-transform: uppercase; }
.dcn .case-t { font-family: var(--grotesk); font-weight: 500; font-size: 19px; letter-spacing: -0.01em; color: var(--ink); margin-top: 8px; }
.dcn .case-d { font-size: 15px; color: var(--smoke); margin-top: 4px; line-height: 1.35; }

/* ====== Testimonials ====== */
.dcn .tst-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; }
.dcn .tst {
  border: 1px solid var(--mist); border-radius: 20px; padding: 32px; background: var(--bone);
  display: flex; flex-direction: column;
}
.dcn .tst-stars { display: flex; gap: 3px; }
.dcn .tst-q { font-family: var(--grotesk); font-weight: 400; font-size: 24px; letter-spacing: -0.015em; line-height: 1.25; color: var(--ink); margin-top: 20px; }
.dcn .tst-foot { display: flex; align-items: center; gap: 12px; margin-top: 28px; }
.dcn .tst-av { width: 38px; height: 38px; border-radius: 50%; background: var(--ink); color: var(--bone); display: inline-flex; align-items: center; justify-content: center; font-family: var(--grotesk); font-weight: 600; font-size: 15px; }
.dcn .tst-name { font-weight: 500; font-size: 16px; color: var(--ink); }
.dcn .tst-co { font-size: 14px; color: var(--smoke); }

/* ====== Stats band ====== */
.dcn .stats-band { background: var(--ink); border-radius: 24px; padding: 56px 40px; }
.dcn .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }
.dcn .stat { text-align: left; border-left: 1px solid rgba(252,251,248,0.16); padding-left: 20px; }
.dcn .stat:first-child { border-left: none; padding-left: 0; }
.dcn .stat-n { font-family: var(--grotesk); font-weight: 600; font-size: clamp(44px, 6vw, 64px); letter-spacing: -0.03em; line-height: 0.9; color: var(--bone); }
.dcn .stat:nth-child(1) .stat-n { color: var(--ember); }
.dcn .stat-l { font-size: 15px; color: rgba(252,251,248,0.66); margin-top: 12px; }

/* ====== FAQ ====== */
.dcn .faq-list { border-top: 1px solid var(--mist); }
.dcn .faq-item { border-bottom: 1px solid var(--mist); }
.dcn .faq-q {
  width: 100%; text-align: left; display: flex; align-items: center; justify-content: space-between; gap: 20px;
  padding: 26px 4px; font-family: var(--grotesk); font-weight: 500; font-size: clamp(20px, 2.6vw, 26px);
  letter-spacing: -0.015em; color: var(--ink);
}
.dcn .faq-ic { flex: none; width: 30px; height: 30px; border-radius: 50%; border: 1px solid var(--mist); display: inline-flex; align-items: center; justify-content: center; transition: transform .25s ease, background .2s ease, border-color .2s ease; }
.dcn .faq-item.open .faq-ic { transform: rotate(45deg); background: var(--ink); border-color: var(--ink); }
.dcn .faq-item.open .faq-ic svg path { stroke: var(--bone); }
.dcn .faq-a { max-height: 0; overflow: hidden; transition: max-height .3s ease; }
.dcn .faq-item.open .faq-a { max-height: 240px; }
.dcn .faq-a p { padding: 0 4px 26px; font-size: 18px; color: var(--smoke); max-width: 62ch; line-height: 1.45; }

/* ====== Final CTA ====== */
.dcn .cta {
  border: 1px solid var(--mist); border-radius: 24px; padding: 64px 48px;
  background:
    radial-gradient(120% 140% at 100% 0%, rgba(253,83,33,0.06), transparent 55%),
    var(--bone);
  position: relative; overflow: hidden;
}
.dcn .cta h2 { font-family: var(--grotesk); font-weight: 500; font-size: clamp(38px, 6vw, 72px); letter-spacing: -0.025em; line-height: 0.92; max-width: 16ch; }
.dcn .cta-row { display: flex; flex-wrap: wrap; gap: 40px; align-items: flex-end; justify-content: space-between; margin-top: 40px; }
.dcn .cta-contacts { display: flex; flex-wrap: wrap; gap: 28px; }
.dcn .cc { display: flex; flex-direction: column; gap: 4px; }
.dcn .cc-k { font-family: var(--mono); font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--smoke); }
.dcn .cc-v { font-family: var(--grotesk); font-weight: 500; font-size: 18px; letter-spacing: -0.01em; color: var(--ink); }
.dcn .cc-v:hover { color: var(--ember); }

/* ====== Footer ====== */
.dcn .footer { border-top: 1px solid var(--mist); margin-top: 72px; padding: 48px 0 64px; }
.dcn .footer-grid { display: grid; grid-template-columns: 1.4fr 1fr 1fr 1fr; gap: 32px; }
.dcn .footer h4 { font-family: var(--mono); font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--smoke); margin-bottom: 16px; }
.dcn .footer li { margin-bottom: 10px; }
.dcn .footer a { font-size: 16px; color: var(--smoke); }
.dcn .footer a:hover { color: var(--ink); }
.dcn .footer-logo { font-family: var(--grotesk); font-weight: 600; font-size: 24px; letter-spacing: -0.02em; }
.dcn .footer-logo .dot { color: var(--ember); }
.dcn .footer-tag { font-size: 15px; color: var(--smoke); margin-top: 12px; max-width: 30ch; line-height: 1.4; }
.dcn .footer-bottom { display: flex; justify-content: space-between; flex-wrap: wrap; gap: 12px; margin-top: 48px; padding-top: 24px; border-top: 1px solid var(--mist); font-size: 14px; color: var(--smoke); }

/* ====== Entrance animation ====== */
@keyframes dcnRise { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
.dcn .rise { animation: dcnRise .7s cubic-bezier(.2,.7,.2,1) both; }

/* ====== Responsive ====== */
@media (max-width: 900px) {
  .dcn .nav-links, .dcn .nav-right .btn-ember { display: none; }
  .dcn .nav-toggle { display: inline-flex; }
  .dcn .hero-grid { grid-template-columns: 1fr; gap: 32px; align-items: stretch; }
  .dcn .hero-visual { min-height: 280px; }
  .dcn .services-grid { grid-template-columns: 1fr; }
  .dcn .process-grid { grid-template-columns: 1fr 1fr; }
  .dcn .step { border-bottom: 1px solid var(--mist); }
  .dcn .step:nth-child(2) { border-right: none; }
  .dcn .cases-grid { grid-template-columns: 1fr 1fr; }
  .dcn .tst-grid { grid-template-columns: 1fr; }
  .dcn .stats-grid { grid-template-columns: 1fr 1fr; gap: 32px 24px; }
  .dcn .stat:nth-child(3) { border-left: none; padding-left: 0; }
  .dcn .footer-grid { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 560px) {
  .dcn { font-size: 17px; }
  .dcn .process-grid { grid-template-columns: 1fr; }
  .dcn .step { border-right: none; }
  .dcn .cases-grid { grid-template-columns: 1fr; }
  .dcn .stats-grid { grid-template-columns: 1fr 1fr; }
  .dcn .stats-band { padding: 40px 24px; }
  .dcn .cta { padding: 40px 24px; }
  .dcn .footer-grid { grid-template-columns: 1fr; }
}

@media (prefers-reduced-motion: reduce) {
  .dcn .rise { animation: none; }
  .dcn *, .dcn *::before, .dcn *::after { transition: none !important; }
}
`,
        }}
      />

      {/* ===== Nav ===== */}
      <header className="nav" id="nav">
        <div className="wrap nav-inner">
          <a href="#top" className="logo" aria-label="Empire Group bosh sahifa">
            Empire<span className="dot">.</span>Group
          </a>
          <nav className="nav-links" aria-label="Asosiy navigatsiya">
            {NAV.map((n) => (
              <a key={n.href} href={n.href}>
                {n.label}
              </a>
            ))}
          </nav>
          <div className="nav-right">
            <a className="btn-ember" href="#cta">
              Bepul konsultatsiya
            </a>
            <button
              className="nav-toggle"
              aria-label="Menyuni ochish"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
            >
              <span />
            </button>
          </div>
        </div>
        <div className={"mobile-menu" + (menuOpen ? " open" : "")}>
          {NAV.map((n) => (
            <a key={n.href} href={n.href} onClick={() => setMenuOpen(false)}>
              {n.label}
            </a>
          ))}
          <a className="btn-ember" href="#cta" onClick={() => setMenuOpen(false)}>
            Bepul konsultatsiya
          </a>
        </div>
      </header>

      <main id="top">
        {/* ===== Hero ===== */}
        <section className="hero">
          <div className="wrap">
            <span className="eyebrow rise">
              <span className="pip" />
              AI &amp; Custom App Development
            </span>
            <div className="hero-grid">
              <div>
                <h1 className="display rise">
                  G'oyadan ishlaydigan <span className="ember-word">mahsulotgacha</span>.
                </h1>
                <p className="hero-sub rise">
                  Murakkab ichki jarayonlarni ERP, AI, Web va App yechimlari orqali raqamlashtiramiz.
                  G'oyadan tayyor mahsulotgacha — 2–3 oyda.
                </p>
                <div className="hero-cta rise">
                  <a className="btn-ember" href="#cta">
                    Loyihani boshlash
                    <ArrowUpRight size={16} color="#fcfbf8" />
                  </a>
                  <a className="btn-pill" href="#cases">
                    <span className="ic">
                      <ArrowUpRight size={16} color="#001011" />
                    </span>
                    Ishlarni ko'rish
                  </a>
                </div>
              </div>

              {/* Blueprint numeral visual — monochrome with one ember accent */}
              <div className="hero-visual rise" aria-hidden="true">
                <div className="grid-lines" />
                <div className="hv-top">
                  <span className="hv-tag">EMPIRE / BLUEPRINT</span>
                  <span className="hv-tag">v.2026</span>
                </div>
                <div className="numeral">
                  2<b>–</b>3
                </div>
                <div className="hv-foot">
                  <span>OYDA MAHSULOT</span>
                  <span style={{ display: "flex", gap: 6, alignItems: "center" }}>
                    <span className="node" />
                    <span className="node" />
                    <span className="node on" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== Proof strip ===== */}
        <section className="proof">
          <div className="wrap">
            <div className="proof-inner">
              <span className="proof-label">Ishonch bilan</span>
              <div className="proof-logos">
                {LOGOS.map((l) => (
                  <span key={l}>{l}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ===== Services ===== */}
        <section className="block-lg" id="services">
          <div className="wrap">
            <SectionHeader num="01" label="Xizmatlar" title="Ikki yo'nalish, bitta muhandislik intizomi." />
            <div className="services-grid">
              {/* Offer 1 */}
              <article className="offer">
                <div className="offer-head">
                  <span className="offer-arrow">
                    <ArrowUpRight size={17} color="#fcfbf8" />
                  </span>
                  <div>
                    <h3 className="offer-title">Maxsus dasturiy ta'minot</h3>
                  </div>
                </div>
                <p className="offer-body">Web/mobil ilovalar, ichki tizimlar — g'oyadan ishlaydigan mahsulotgacha.</p>
                <div className="offer-stack">
                  {["React", "Node.js", "Flutter", "Swift", "Kotlin", "Docker"].map((s) => (
                    <span key={s} className="badge">
                      {s}
                    </span>
                  ))}
                </div>
                <div className="offer-divider" />
                <div className="tiers">
                  {TIERS.map((t) => (
                    <div key={t.tag} className={"tier" + (t.popular ? " popular" : "")}>
                      <div className="tier-l">
                        <span className="tier-tag">{t.tag}</span>
                        {t.popular ? <span className="tier-pop">Ommabop</span> : null}
                      </div>
                      <div className="tier-r">
                        <div className="tier-price">{t.price}</div>
                        <div className="tier-time">{t.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </article>

              {/* Offer 2 */}
              <article className="offer">
                <div className="offer-head">
                  <span className="offer-arrow">
                    <ArrowUpRight size={17} color="#fcfbf8" />
                  </span>
                  <div>
                    <h3 className="offer-title">Odoo ERP &amp; AI Joriy qilish</h3>
                  </div>
                </div>
                <p className="offer-body">
                  Yagona tizim, AI avtomatlashtirish — barcha bo'limlar bitta manbada, qarorlar ma'lumotga asoslanadi.
                </p>
                <div className="offer-spacer" />
                <div className="offer-divider" />
                <div className="offer-tags">
                  {["Odoo ERP", "AI Automation", "Predictive Analytics", "Cloud"].map((t) => (
                    <span key={t} className="badge">
                      {t}
                    </span>
                  ))}
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* ===== Process ===== */}
        <section className="block-lg" id="process">
          <div className="wrap">
            <SectionHeader num="02" label="Jarayon" title="G'oyadan ishga tushirishgacha — to'rt bosqich." />
            <div className="process-grid">
              {PROCESS.map((p, i) => (
                <div className="step" key={p.n}>
                  <span className="step-num">{p.n}</span>
                  <h3 className={"step-t" + (i === 3 ? " ember" : "")}>{p.t}</h3>
                  <p className="step-d">{p.d}</p>
                  <div className="step-tags">
                    {p.tags.map((t) => (
                      <span key={t} className="badge">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== Cases ===== */}
        <section className="block-lg" id="cases">
          <div className="wrap">
            <SectionHeader num="03" label="Loyihalar" title="Ishlab, ishga tushirgan mahsulotlar." />
            <div className="cases-grid">
              {CASES.map((c, i) => (
                <article className="case" key={c.t}>
                  <div className="case-img">
                    <div className="clines" />
                    <span className="case-idx">0{i + 1}</span>
                    {i === 1 ? <span className="case-dot" /> : null}
                    <span className="case-metric">{c.metric}</span>
                  </div>
                  <div className="case-body">
                    <span className="case-cat">{c.cat}</span>
                    <h3 className="case-t">{c.t}</h3>
                    <p className="case-d">{c.d}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ===== Testimonials ===== */}
        <section className="block-lg" id="testimonials">
          <div className="wrap">
            <SectionHeader num="04" label="Sharhlar" title="Mijozlar nima deydi." />
            <div className="tst-grid">
              {TESTIMONIALS.map((t) => (
                <figure className="tst" key={t.name}>
                  <div className="tst-stars" aria-label="5 yulduz">
                    {[0, 1, 2, 3, 4].map((s) => (
                      <Star key={s} size={16} />
                    ))}
                  </div>
                  <blockquote className="tst-q">"{t.q}"</blockquote>
                  <figcaption className="tst-foot">
                    <span className="tst-av" aria-hidden="true">
                      {t.name.charAt(0)}
                    </span>
                    <span>
                      <span className="tst-name" style={{ display: "block" }}>
                        {t.name}
                      </span>
                      <span className="tst-co">{t.co}</span>
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* ===== Stats band ===== */}
        <section className="block">
          <div className="wrap">
            <div className="stats-band">
              <div className="stats-grid">
                {STATS.map((s) => (
                  <div className="stat" key={s.l}>
                    <div className="stat-n">{s.n}</div>
                    <div className="stat-l">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ===== FAQ ===== */}
        <section className="block-lg" id="faq">
          <div className="wrap">
            <SectionHeader num="05" label="Savollar" title="Tez-tez so'raladigan savollar." />
            <div className="faq-list">
              {FAQ.map((f, i) => {
                const open = openFaq === i;
                return (
                  <div className={"faq-item" + (open ? " open" : "")} key={f.q}>
                    <button
                      className="faq-q"
                      aria-expanded={open}
                      onClick={() => setOpenFaq(open ? null : i)}
                    >
                      {f.q}
                      <span className="faq-ic" aria-hidden="true">
                        <Plus size={16} color="#001011" />
                      </span>
                    </button>
                    <div className="faq-a">
                      <p>{f.a}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ===== Final CTA / contact ===== */}
        <section className="block" id="cta">
          <div className="wrap">
            <div className="cta">
              <h2>Loyihangizni bugun boshlaymiz.</h2>
              <div className="cta-row">
                <div className="cta-contacts">
                  <a className="cc" href="tel:+998991164658">
                    <span className="cc-k">Telefon</span>
                    <span className="cc-v">+998 99 116 46 58</span>
                  </a>
                  <a className="cc" href="https://t.me/muslimansoriy" target="_blank" rel="noreferrer">
                    <span className="cc-k">Telegram</span>
                    <span className="cc-v">t.me/muslimansoriy</span>
                  </a>
                  <a className="cc" href="https://empiregroup.uz" target="_blank" rel="noreferrer">
                    <span className="cc-k">Sayt</span>
                    <span className="cc-v">empiregroup.uz</span>
                  </a>
                  <div className="cc">
                    <span className="cc-k">Manzil</span>
                    <span className="cc-v">Toshkent</span>
                  </div>
                </div>
                <a className="btn-ember" href="https://t.me/muslimansoriy" target="_blank" rel="noreferrer">
                  Bepul konsultatsiya
                  <ArrowUpRight size={16} color="#fcfbf8" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ===== Footer ===== */}
      <footer className="footer">
        <div className="wrap">
          <div className="footer-grid">
            <div>
              <div className="footer-logo">
                Empire<span className="dot">.</span>Group
              </div>
              <p className="footer-tag">Toshkentda joylashgan IT muhandislik studiyasi — ERP, AI, Web va App.</p>
            </div>
            <div>
              <h4>Xizmatlar</h4>
              <ul>
                <li><a href="#services">Maxsus dasturiy ta'minot</a></li>
                <li><a href="#services">Odoo ERP &amp; AI</a></li>
                <li><a href="#process">Jarayon</a></li>
              </ul>
            </div>
            <div>
              <h4>Kompaniya</h4>
              <ul>
                <li><a href="#cases">Loyihalar</a></li>
                <li><a href="#testimonials">Sharhlar</a></li>
                <li><a href="#faq">Savollar</a></li>
              </ul>
            </div>
            <div>
              <h4>Aloqa</h4>
              <ul>
                <li><a href="tel:+998991164658">+998 99 116 46 58</a></li>
                <li><a href="https://t.me/muslimansoriy" target="_blank" rel="noreferrer">t.me/muslimansoriy</a></li>
                <li><a href="https://empiregroup.uz" target="_blank" rel="noreferrer">empiregroup.uz</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© 2026 Empire Group</span>
            <span>Toshkent, O'zbekiston</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
