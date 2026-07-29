"use client";

import React, { useState } from "react";

/* ============================================================================
   Empire Group — v0 by Vercel "A Machinist's Blueprint" demo landing page.
   Single self-contained file. All styles scoped under .v0d.
   Palette: #ffffff / #fafafa / #eaeaea / #666666 / #7d7d7d / #171717 / #000000
   Fonts: Inter (GeistSans sub), IBM Plex Mono (GeistMono sub).
   ========================================================================== */

/* ------------------------------ Inline icons ------------------------------ */
function IconArrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IconPlus({ open }: { open: boolean }) {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true" className={open ? "v0d-rot" : ""}>
      <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
function IconStar() {
  return (
    <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M8 1.5l1.8 3.9 4.2.5-3.1 2.9.8 4.2L8 11.4 4.3 13.4l.8-4.2L2 6.3l4.2-.5L8 1.5z" />
    </svg>
  );
}
function IconCheck() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8.5l3 3 7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IconMenu() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M2 5h14M2 9h14M2 13h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
function IconClose() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/* ------------------------------ Data ------------------------------ */
const NAV = [
  { label: "Xizmatlar", href: "#services" },
  { label: "Jarayon", href: "#process" },
  { label: "Loyihalar", href: "#projects" },
  { label: "Sharhlar", href: "#reviews" },
  { label: "Narxlar", href: "#pricing" },
];

const LOGOS = ["Google", "Meta", "Stripe", "Telegram", "GitHub", "Cloudflare", "Vercel", "Figma", "Notion"];

const STATS = [
  { n: "50+", l: "yakunlangan loyiha" },
  { n: "30+", l: "mamnun mijoz" },
  { n: "15+", l: "texnologiya" },
  { n: "3+", l: "yil tajriba" },
];

const TIERS = [
  { tag: "STANDARD", price: "$5,000 dan", term: "2–3 oy", popular: false, features: ["Landing yoki MVP", "1 platforma", "Asosiy integratsiyalar", "1 oy qo'llab-quvvatlash"] },
  { tag: "ADVANCED", price: "$15K–$40K", term: "4–6 oy", popular: true, features: ["To'liq web + mobil", "Ichki tizim / CRM", "AI avtomatlashtirish", "3 oy qo'llab-quvvatlash"] },
  { tag: "MEGA", price: "$50,000+", term: "6–12 oy", popular: false, features: ["Platforma miqyosi", "Murakkab arxitektura", "Dedicated jamoa", "Uzoq muddatli SLA"] },
];

const PROCESS = [
  { n: "01", t: "Explore", d: "G'oya va muammoni chuqur o'rganamiz, yo'nalishni belgilaymiz.", tags: ["Tahlil", "Audit"] },
  { n: "02", t: "Plan", d: "Rejalashtirish, PRD, arxitektura, dizayn; muddat va byudjet aniq.", tags: ["PRD", "TZ", "Dizayn"] },
  { n: "03", t: "Build", d: "Kod, test, integratsiya; sprintlar, har bosqichda demo.", tags: ["Dev", "Test", "Demo"] },
  { n: "04", t: "Commit", d: "Ishga tushirish va uzoq muddatli qo'llab-quvvatlash.", tags: ["Deploy", "Support"] },
];

const PROJECTS = [
  { name: "Motor Lux", desc: "CRM va savdo boshqaruvi", cat: "Avtomobil", metric: "Bitta tizim" },
  { name: "GadgetSpace", desc: "Onlayn elektronika do'koni", cat: "E-commerce", metric: "Konversiya 2.1×" },
  { name: "Hilol Market", desc: "Savdo avtomatlashtirish", cat: "Retail / POS", metric: "Hisob-kitob 2× tez" },
  { name: "MedFlow", desc: "Klinika boshqaruvi", cat: "Healthcare", metric: "AI qabul" },
];

const REVIEWS = [
  { name: "Aliya M.", co: "Motor Lux", text: "Empire Group eski qog'ozdagi ishimizni to'liq tizimga o'tkazdi. Endi barcha buyurtmalarni bitta joydan boshqaramiz — vaqt ancha tejaldi." },
  { name: "Jasur T.", co: "GadgetSpace", text: "Empire bilan ishlash oson bo'ldi. Muddat va byudjet aniq edi." },
  { name: "Doniyor R.", co: "MedFlow", text: "Klinika ishini AI qo'shib avtomatlashtirdi. Qabul ancha tartibli." },
  { name: "Laziza K.", co: "X Wear", text: "Zamonaviy dizayn va tez ishlaydigan sayt. Savdo hajmi ko'tarildi." },
];

const FAQ = [
  { q: "Loyiha qancha vaqt oladi?", a: "Kichik MVP 3–4 hafta, o'rta loyiha 2–3 oy, yirik tizim 4–6 oy. Aniq muddat Explore bosqichida belgilanadi." },
  { q: "Narxlar qanday belgilanadi?", a: "Fixed-scope: loyiha boshida aniq belgilanadi." },
  { q: "Mavjud tizimni davom ettira olasizmi?", a: "Ha. Mavjud kodni audit qilib, ustiga quramiz yoki qayta yozamiz." },
  { q: "Konsultatsiya bepulmi?", a: "Ha. Explore bosqichida barcha savollarga javob beramiz — majburiyatsiz." },
];

/* ------------------------------ Component ------------------------------ */
export default function V0DemoPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="v0d">
      <style
        dangerouslySetInnerHTML={{
          __html: `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap');

.v0d {
  --paper:#ffffff; --canvas:#fafafa; --line:#eaeaea; --subtext:#666666;
  --icon:#7d7d7d; --ink:#171717; --onyx:#000000;
  --sans:'Inter',ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;
  --mono:'IBM Plex Mono',ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;
  --sh-card:rgba(0,0,0,0.08) 0px 0px 0px 1px, rgba(0,0,0,0.04) 0px 2px 1px 0px;
  --sh-pop:rgba(0,0,0,0.25) 0px 25px 50px -12px;
  min-height:100vh;
  background:var(--canvas);
  color:var(--ink);
  font-family:var(--sans);
  font-size:16px;
  line-height:1.5;
  font-weight:400;
  -webkit-font-smoothing:antialiased;
  font-feature-settings:"zero","ss09","ss05";
}
.v0d *,.v0d *::before,.v0d *::after{box-sizing:border-box;}
.v0d a{color:inherit;text-decoration:none;}
/* the generic anchor reset above (class+element) outranks the single-class
   button rules, so button-anchors inherited the scope ink and went invisible.
   Re-assert button text colours at higher specificity. */
.v0d a.v0d-btn--primary{color:var(--paper);}
.v0d a.v0d-btn--ghost{color:var(--ink);}
.v0d .v0d-cta a.v0d-btn--primary{color:var(--ink);}
.v0d .v0d-cta a.v0d-btn--ghost{color:var(--paper);}
.v0d button{font-family:inherit;cursor:pointer;}
.v0d ::selection{background:var(--ink);color:var(--paper);}
.v0d :focus-visible{outline:2px solid var(--ink);outline-offset:2px;border-radius:4px;}

/* ---------- Layout ---------- */
.v0d-shell{max-width:1200px;margin:0 auto;padding:0 24px;width:100%;}
.v0d-section{padding-top:96px;}
.v0d-mono{font-family:var(--mono);font-size:10px;line-height:1.5;letter-spacing:0.08em;text-transform:uppercase;color:var(--subtext);font-weight:400;}

/* ---------- Buttons ---------- */
.v0d-btn{display:inline-flex;align-items:center;gap:8px;font-size:14px;font-weight:500;
  line-height:1;border-radius:8px;padding:10px 14px;border:1px solid transparent;transition:background .15s,color .15s,border-color .15s;white-space:nowrap;}
.v0d-btn--primary{background:var(--ink);color:var(--paper);}
.v0d-btn--primary:hover{background:#000;}
.v0d-btn--ghost{background:transparent;color:var(--ink);border-color:var(--line);}
.v0d-btn--ghost:hover{border-color:var(--ink);}
.v0d-btn--sm{padding:8px 12px;}

/* Chips & pills */
.v0d-chip{display:inline-flex;align-items:center;gap:6px;font-size:13px;line-height:1;color:var(--subtext);
  border:1px solid var(--line);border-radius:6px;padding:5px 8px;background:transparent;}
.v0d-pill{display:inline-flex;align-items:center;gap:6px;font-size:13px;line-height:1;color:var(--ink);
  background:var(--paper);border:1px solid rgba(0,0,0,0.08);border-radius:9999px;padding:6px 12px;}

/* Cards */
.v0d-card{background:var(--paper);border-radius:12px;box-shadow:var(--sh-card);padding:16px;}

/* ---------- Header ---------- */
.v0d-hdr{position:sticky;top:0;z-index:50;background:rgba(250,250,250,0.85);
  backdrop-filter:saturate(180%) blur(12px);-webkit-backdrop-filter:saturate(180%) blur(12px);
  border-bottom:1px solid var(--line);}
.v0d-hdr-in{display:flex;align-items:center;justify-content:space-between;height:56px;}
.v0d-brand{display:flex;align-items:center;gap:8px;font-size:16px;font-weight:600;letter-spacing:-0.02em;color:var(--onyx);}
.v0d-brand-mark{width:22px;height:22px;border-radius:6px;background:var(--ink);color:var(--paper);
  display:inline-flex;align-items:center;justify-content:center;font-size:13px;font-weight:600;}
.v0d-nav{display:none;align-items:center;gap:4px;}
.v0d-nav a{font-size:14px;font-weight:400;color:var(--subtext);padding:8px 10px;border-radius:6px;transition:color .15s,background .15s;}
.v0d-nav a:hover{color:var(--ink);background:var(--paper);}
.v0d-hdr-actions{display:none;align-items:center;gap:8px;}
.v0d-burger{display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;
  border:1px solid var(--line);border-radius:8px;background:var(--paper);color:var(--ink);}
@media(min-width:900px){
  .v0d-nav{display:flex;}
  .v0d-hdr-actions{display:flex;}
  .v0d-burger{display:none;}
}
.v0d-mobile{border-bottom:1px solid var(--line);background:var(--canvas);}
.v0d-mobile-in{display:flex;flex-direction:column;gap:4px;padding:12px 0 16px;}
.v0d-mobile a{padding:10px 8px;font-size:15px;color:var(--ink);border-radius:8px;}
.v0d-mobile a:hover{background:var(--paper);}
.v0d-mobile .v0d-btn{margin-top:8px;justify-content:center;}
@media(min-width:900px){.v0d-mobile{display:none;}}

/* ---------- Hero ---------- */
.v0d-hero{padding-top:64px;}
.v0d-hero-grid{display:grid;grid-template-columns:1fr;gap:40px;align-items:center;}
@media(min-width:960px){.v0d-hero-grid{grid-template-columns:1.05fr 0.95fr;gap:48px;}}
.v0d-eyebrow{display:inline-flex;align-items:center;gap:8px;margin-bottom:20px;}
.v0d-eyebrow .dot{width:6px;height:6px;border-radius:9999px;background:var(--ink);}
.v0d-h1{font-size:40px;line-height:1.05;letter-spacing:-2.2px;font-weight:600;color:var(--ink);margin:0;max-width:16ch;}
@media(min-width:960px){.v0d-h1{font-size:48px;letter-spacing:-2.88px;line-height:1;}}
.v0d-sub{margin:20px 0 0;font-size:16px;line-height:1.5;color:var(--subtext);max-width:46ch;}
.v0d-hero-cta{display:flex;flex-wrap:wrap;gap:8px;margin-top:32px;}
.v0d-hero-meta{display:flex;flex-wrap:wrap;gap:8px;margin-top:24px;}

/* Hero visual — blueprint spec card */
.v0d-spec{background:var(--paper);border-radius:12px;box-shadow:var(--sh-card);overflow:hidden;}
.v0d-spec-bar{display:flex;align-items:center;gap:8px;padding:10px 14px;border-bottom:1px solid var(--line);}
.v0d-spec-dots{display:flex;gap:5px;}
.v0d-spec-dots i{width:9px;height:9px;border-radius:9999px;background:var(--line);display:inline-block;}
.v0d-spec-title{margin-left:6px;font-family:var(--mono);font-size:10px;letter-spacing:0.06em;color:var(--icon);text-transform:uppercase;}
.v0d-spec-body{padding:16px;display:grid;gap:12px;}
.v0d-spec-row{display:flex;align-items:center;justify-content:space-between;font-size:13px;}
.v0d-spec-row .k{font-family:var(--mono);font-size:10px;text-transform:uppercase;letter-spacing:0.06em;color:var(--subtext);}
.v0d-spec-row .v{font-size:13px;font-weight:500;color:var(--ink);}
.v0d-spec-bars{display:grid;gap:8px;padding:14px 16px;border-top:1px solid var(--line);}
.v0d-spec-bars .track{height:8px;border-radius:9999px;background:var(--canvas);border:1px solid var(--line);overflow:hidden;}
.v0d-spec-bars .fill{height:100%;background:var(--ink);border-radius:9999px;}
.v0d-spec-foot{display:flex;align-items:center;justify-content:space-between;padding:12px 16px;border-top:1px solid var(--line);}
.v0d-tick{display:inline-flex;align-items:center;gap:6px;font-family:var(--mono);font-size:10px;text-transform:uppercase;letter-spacing:0.06em;color:var(--subtext);}
.v0d-tick .box{width:14px;height:14px;border-radius:4px;background:var(--ink);color:var(--paper);display:inline-flex;align-items:center;justify-content:center;}

/* ---------- Logos strip ---------- */
.v0d-logos{margin-top:64px;border-top:1px solid var(--line);border-bottom:1px solid var(--line);padding:24px 0;}
.v0d-logos-lead{font-family:var(--mono);font-size:10px;text-transform:uppercase;letter-spacing:0.08em;color:var(--icon);text-align:center;margin-bottom:16px;}
.v0d-logos-row{display:flex;flex-wrap:wrap;justify-content:center;gap:8px 24px;}
.v0d-logo{font-size:14px;font-weight:500;color:var(--subtext);letter-spacing:-0.01em;}

/* ---------- Section head ---------- */
.v0d-head{max-width:640px;margin-bottom:32px;}
.v0d-head h2{font-size:28px;line-height:1.1;letter-spacing:-1.1px;font-weight:600;color:var(--ink);margin:12px 0 0;}
@media(min-width:720px){.v0d-head h2{font-size:32px;letter-spacing:-1.28px;line-height:1.17;}}
.v0d-head p{margin:12px 0 0;font-size:16px;color:var(--subtext);line-height:1.5;}

/* ---------- Services ---------- */
.v0d-svc{display:grid;grid-template-columns:1fr;gap:16px;}
@media(min-width:820px){.v0d-svc{grid-template-columns:1fr 1fr;}}
.v0d-svc-card{background:var(--paper);border-radius:12px;box-shadow:var(--sh-card);padding:20px;display:flex;flex-direction:column;}
.v0d-svc-num{font-family:var(--mono);font-size:10px;letter-spacing:0.08em;color:var(--icon);text-transform:uppercase;}
.v0d-svc-card h3{font-size:20px;line-height:1.25;letter-spacing:-0.02em;font-weight:600;margin:8px 0 0;color:var(--ink);}
.v0d-svc-card p{font-size:14px;line-height:1.43;color:var(--subtext);margin:10px 0 0;}
.v0d-tagrow{display:flex;flex-wrap:wrap;gap:6px;margin-top:16px;}

/* Pricing */
.v0d-price{display:grid;grid-template-columns:1fr;gap:12px;margin-top:20px;}
@media(min-width:640px){.v0d-price{grid-template-columns:repeat(3,1fr);}}
.v0d-tier{border:1px solid var(--line);border-radius:12px;background:var(--canvas);padding:16px;display:flex;flex-direction:column;gap:12px;position:relative;}
.v0d-tier--pop{background:var(--paper);box-shadow:var(--sh-card);border-color:transparent;}
.v0d-tier-tag{display:flex;align-items:center;justify-content:space-between;}
.v0d-tier-tag .name{font-family:var(--mono);font-size:10px;letter-spacing:0.08em;text-transform:uppercase;color:var(--ink);}
.v0d-tier-tag .pop{font-family:var(--mono);font-size:10px;letter-spacing:0.06em;text-transform:uppercase;
  background:var(--ink);color:var(--paper);border-radius:9999px;padding:3px 8px;}
.v0d-tier-price{font-size:24px;font-weight:600;letter-spacing:-0.48px;line-height:1.1;color:var(--ink);}
.v0d-tier-term{font-family:var(--mono);font-size:10px;text-transform:uppercase;letter-spacing:0.06em;color:var(--subtext);}
.v0d-tier ul{list-style:none;margin:4px 0 0;padding:0;display:grid;gap:8px;}
.v0d-tier li{display:flex;align-items:center;gap:8px;font-size:13px;color:var(--subtext);}
.v0d-tier li svg{color:var(--ink);flex-shrink:0;}

/* ---------- Process ---------- */
.v0d-proc{display:grid;grid-template-columns:1fr;gap:12px;}
@media(min-width:640px){.v0d-proc{grid-template-columns:1fr 1fr;}}
@media(min-width:980px){.v0d-proc{grid-template-columns:repeat(4,1fr);}}
.v0d-step{background:var(--paper);border-radius:12px;box-shadow:var(--sh-card);padding:16px;display:flex;flex-direction:column;min-height:180px;}
.v0d-step-n{font-size:32px;font-weight:600;letter-spacing:-1.28px;line-height:1;color:var(--ink);}
.v0d-step h3{font-size:16px;font-weight:600;letter-spacing:-0.01em;margin:16px 0 0;color:var(--ink);}
.v0d-step p{font-size:13px;line-height:1.43;color:var(--subtext);margin:8px 0 0;flex:1;}
.v0d-step .v0d-tagrow{margin-top:12px;}

/* ---------- Projects ---------- */
.v0d-proj{display:grid;grid-template-columns:1fr;gap:12px;}
@media(min-width:640px){.v0d-proj{grid-template-columns:1fr 1fr;}}
.v0d-projcard{background:var(--paper);border-radius:12px;box-shadow:var(--sh-card);overflow:hidden;}
.v0d-projthumb{border-bottom:1px solid var(--line);padding:20px;display:flex;align-items:center;justify-content:space-between;background:var(--canvas);}
.v0d-projthumb .mark{width:36px;height:36px;border-radius:8px;background:var(--ink);color:var(--paper);
  display:flex;align-items:center;justify-content:center;font-size:16px;font-weight:600;letter-spacing:-0.02em;}
.v0d-projinfo{padding:16px;display:flex;align-items:flex-start;justify-content:space-between;gap:12px;}
.v0d-projinfo h3{font-size:16px;font-weight:600;letter-spacing:-0.01em;color:var(--ink);margin:0;}
.v0d-projinfo p{font-size:13px;color:var(--subtext);margin:4px 0 0;line-height:1.43;}

/* ---------- Reviews ---------- */
.v0d-rev{display:grid;grid-template-columns:1fr;gap:12px;}
@media(min-width:720px){.v0d-rev{grid-template-columns:1fr 1fr;}}
.v0d-revcard{background:var(--paper);border-radius:12px;box-shadow:var(--sh-card);padding:20px;display:flex;flex-direction:column;}
.v0d-stars{display:flex;gap:2px;color:var(--ink);}
.v0d-revcard blockquote{margin:14px 0 0;font-size:15px;line-height:1.5;color:var(--ink);}
.v0d-revby{display:flex;align-items:center;gap:10px;margin-top:18px;padding-top:16px;border-top:1px solid var(--line);}
.v0d-avatar{width:32px;height:32px;border-radius:9999px;background:var(--canvas);border:1px solid var(--line);
  display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:600;color:var(--ink);}
.v0d-revby .who{font-size:14px;font-weight:500;color:var(--ink);}
.v0d-revby .co{font-family:var(--mono);font-size:10px;text-transform:uppercase;letter-spacing:0.06em;color:var(--subtext);}

/* ---------- Stats band ---------- */
.v0d-stats{border-top:1px solid var(--line);border-bottom:1px solid var(--line);
  display:grid;grid-template-columns:1fr 1fr;}
@media(min-width:720px){.v0d-stats{grid-template-columns:repeat(4,1fr);}}
.v0d-stat{padding:32px 20px;border-right:1px solid var(--line);border-bottom:1px solid var(--line);}
@media(min-width:720px){.v0d-stat{border-bottom:none;}}
.v0d-stat:last-child{border-right:none;}
.v0d-stat .n{font-size:32px;font-weight:600;letter-spacing:-1.28px;line-height:1;color:var(--ink);}
.v0d-stat .l{font-family:var(--mono);font-size:10px;text-transform:uppercase;letter-spacing:0.06em;color:var(--subtext);margin-top:8px;}

/* ---------- FAQ ---------- */
.v0d-faq{max-width:760px;}
.v0d-faqitem{border-bottom:1px solid var(--line);}
.v0d-faqitem:first-child{border-top:1px solid var(--line);}
.v0d-faqq{width:100%;display:flex;align-items:center;justify-content:space-between;gap:16px;
  background:transparent;border:none;padding:18px 4px;text-align:left;color:var(--ink);font-size:16px;font-weight:500;}
.v0d-faqq .v0d-rot{transform:rotate(45deg);transition:transform .18s;}
.v0d-faqicon{color:var(--icon);transition:transform .18s;}
.v0d-faqa{overflow:hidden;max-height:0;transition:max-height .22s ease;}
.v0d-faqa.open{max-height:220px;}
.v0d-faqa p{margin:0;padding:0 4px 18px;font-size:14px;line-height:1.5;color:var(--subtext);max-width:60ch;}

/* ---------- Final CTA ---------- */
.v0d-cta{background:var(--ink);border-radius:12px;padding:40px 24px;color:var(--paper);
  display:flex;flex-direction:column;align-items:center;text-align:center;}
.v0d-cta h2{font-size:28px;line-height:1.1;letter-spacing:-1.1px;font-weight:600;margin:0;color:var(--paper);max-width:18ch;}
@media(min-width:720px){.v0d-cta{padding:56px 40px;}.v0d-cta h2{font-size:32px;letter-spacing:-1.28px;}}
.v0d-cta-actions{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-top:24px;}
.v0d-cta .v0d-btn--primary{background:var(--paper);color:var(--ink);}
.v0d-cta .v0d-btn--primary:hover{background:#f0f0f0;}
.v0d-cta .v0d-btn--ghost{color:var(--paper);border-color:rgba(255,255,255,0.24);}
.v0d-cta .v0d-btn--ghost:hover{border-color:var(--paper);}
.v0d-cta-meta{display:flex;flex-wrap:wrap;justify-content:center;gap:6px 20px;margin-top:28px;}
.v0d-cta-meta span{font-family:var(--mono);font-size:10px;text-transform:uppercase;letter-spacing:0.06em;color:rgba(255,255,255,0.6);}

/* ---------- Footer ---------- */
.v0d-foot{margin-top:96px;border-top:1px solid var(--line);padding:40px 0 32px;}
.v0d-foot-grid{display:grid;grid-template-columns:1fr;gap:32px;}
@media(min-width:720px){.v0d-foot-grid{grid-template-columns:2fr 1fr 1fr 1fr;}}
.v0d-foot-brand p{font-size:13px;color:var(--subtext);margin:12px 0 0;max-width:32ch;line-height:1.5;}
.v0d-foot col,.v0d-foot-col{display:flex;flex-direction:column;gap:10px;}
.v0d-foot-col h4{font-family:var(--mono);font-size:10px;text-transform:uppercase;letter-spacing:0.08em;color:var(--icon);margin:0 0 2px;}
.v0d-foot-col a{font-size:14px;color:var(--subtext);}
.v0d-foot-col a:hover{color:var(--ink);}
.v0d-foot-bar{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:12px;
  margin-top:40px;padding-top:20px;border-top:1px solid var(--line);}
.v0d-foot-bar span{font-family:var(--mono);font-size:10px;text-transform:uppercase;letter-spacing:0.06em;color:var(--subtext);}

/* ---------- Animations ---------- */
@keyframes v0dRise{from{opacity:0;transform:translateY(10px);}to{opacity:1;transform:none;}}
.v0d-rise{animation:v0dRise .5s ease both;}
.v0d-rise-2{animation:v0dRise .5s ease .08s both;}
.v0d-rise-3{animation:v0dRise .5s ease .16s both;}
@media(prefers-reduced-motion:reduce){
  .v0d-rise,.v0d-rise-2,.v0d-rise-3{animation:none;}
  .v0d-faqa,.v0d-faqq .v0d-rot{transition:none;}
}
`,
        }}
      />

      {/* ============================== HEADER ============================== */}
      <header className="v0d-hdr">
        <div className="v0d-shell v0d-hdr-in">
          <a className="v0d-brand" href="#top" aria-label="Empire Group">
            <span className="v0d-brand-mark">e</span>
            empire
          </a>

          <nav className="v0d-nav" aria-label="Asosiy navigatsiya">
            {NAV.map((n) => (
              <a key={n.href} href={n.href}>
                {n.label}
              </a>
            ))}
          </nav>

          <div className="v0d-hdr-actions">
            <a className="v0d-btn v0d-btn--primary v0d-btn--sm" href="#contact">
              Bepul konsultatsiya
              <IconArrow />
            </a>
          </div>

          <button
            className="v0d-burger"
            aria-label={menuOpen ? "Menyuni yopish" : "Menyuni ochish"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <IconClose /> : <IconMenu />}
          </button>
        </div>

        {menuOpen && (
          <div className="v0d-mobile">
            <div className="v0d-shell v0d-mobile-in">
              {NAV.map((n) => (
                <a key={n.href} href={n.href} onClick={() => setMenuOpen(false)}>
                  {n.label}
                </a>
              ))}
              <a className="v0d-btn v0d-btn--primary" href="#contact" onClick={() => setMenuOpen(false)}>
                Bepul konsultatsiya
                <IconArrow />
              </a>
            </div>
          </div>
        )}
      </header>

      <main id="top">
        {/* ============================== HERO ============================== */}
        <section className="v0d-hero">
          <div className="v0d-shell">
            <div className="v0d-hero-grid">
              <div className="v0d-rise">
                <span className="v0d-chip v0d-eyebrow">
                  <span className="dot" />
                  <span className="v0d-mono" style={{ letterSpacing: "0.06em" }}>
                    AI &amp; Custom App Development
                  </span>
                </span>
                <h1 className="v0d-h1">Biznes uchun vaqt tejaydigan IT-yechimlar.</h1>
                <p className="v0d-sub">
                  Murakkab ichki jarayonlarni ERP, AI, Web va App yechimlari orqali raqamlashtiramiz. G'oyadan tayyor
                  mahsulotgacha — 2–3 oyda.
                </p>
                <div className="v0d-hero-cta">
                  <a className="v0d-btn v0d-btn--primary" href="#contact">
                    Loyihani boshlash
                    <IconArrow />
                  </a>
                  <a className="v0d-btn v0d-btn--ghost" href="#projects">
                    Ishlarni ko'rish
                  </a>
                </div>
                <div className="v0d-hero-meta">
                  <span className="v0d-pill">50+ loyiha</span>
                  <span className="v0d-pill">2–3 oy MVP</span>
                  <span className="v0d-pill">Fixed-scope</span>
                </div>
              </div>

              {/* Hero visual — blueprint spec card */}
              <div className="v0d-spec v0d-rise-2" aria-hidden="true">
                <div className="v0d-spec-bar">
                  <span className="v0d-spec-dots">
                    <i />
                    <i />
                    <i />
                  </span>
                  <span className="v0d-spec-title">empire.build / spec.json</span>
                </div>
                <div className="v0d-spec-body">
                  <div className="v0d-spec-row">
                    <span className="k">stack</span>
                    <span className="v">React · Node · Flutter</span>
                  </div>
                  <div className="v0d-spec-row">
                    <span className="k">timeline</span>
                    <span className="v">2–3 oy</span>
                  </div>
                  <div className="v0d-spec-row">
                    <span className="k">scope</span>
                    <span className="v">fixed</span>
                  </div>
                </div>
                <div className="v0d-spec-bars">
                  <div className="track">
                    <div className="fill" style={{ width: "82%" }} />
                  </div>
                  <div className="track">
                    <div className="fill" style={{ width: "64%" }} />
                  </div>
                  <div className="track">
                    <div className="fill" style={{ width: "93%" }} />
                  </div>
                </div>
                <div className="v0d-spec-foot">
                  <span className="v0d-tick">
                    <span className="box">
                      <IconCheck />
                    </span>
                    build passing
                  </span>
                  <span className="v0d-tick">v1.0.0</span>
                </div>
              </div>
            </div>

            {/* ------------- Logos strip ------------- */}
            <div className="v0d-logos">
              <p className="v0d-logos-lead">Ishonch bilan quramiz — zamonaviy stek</p>
              <div className="v0d-logos-row">
                {LOGOS.map((l) => (
                  <span key={l} className="v0d-logo">
                    {l}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============================== SERVICES ============================== */}
        <section id="services" className="v0d-section">
          <div className="v0d-shell">
            <div className="v0d-head">
              <span className="v0d-mono">Xizmatlar</span>
              <h2>Ikki yo'nalish, bitta natija.</h2>
              <p>Web, mobil va ichki tizimlardan ERP hamda AI joriy qilishgacha — biznesingizga mos yechim.</p>
            </div>

            <div className="v0d-svc">
              {/* Service 1 */}
              <div className="v0d-svc-card">
                <span className="v0d-svc-num">01 / Disiplina</span>
                <h3>Maxsus dasturiy ta'minot</h3>
                <p>Web va mobil ilovalar, ichki tizimlar, biznes jarayonlariga moslashtirilgan yechimlar.</p>
                <div className="v0d-tagrow">
                  {["React", "Node.js", "Flutter", "Swift", "Kotlin", "Docker"].map((t) => (
                    <span key={t} className="v0d-chip">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Service 2 */}
              <div className="v0d-svc-card">
                <span className="v0d-svc-num">02 / Disiplina</span>
                <h3>Odoo ERP &amp; AI Joriy qilish</h3>
                <p>Tarqoq jarayonlarni yagona tizimga birlashtirish va AI bilan avtomatlashtirish.</p>
                <div className="v0d-tagrow">
                  {["Odoo ERP", "AI Automation", "Predictive Analytics", "Cloud"].map((t) => (
                    <span key={t} className="v0d-chip">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Pricing tiers */}
            <div id="pricing" className="v0d-price">
              {TIERS.map((tier) => (
                <div key={tier.tag} className={"v0d-tier" + (tier.popular ? " v0d-tier--pop" : "")}>
                  <div className="v0d-tier-tag">
                    <span className="name">{tier.tag}</span>
                    {tier.popular && <span className="pop">Ommabop</span>}
                  </div>
                  <div>
                    <div className="v0d-tier-price">{tier.price}</div>
                    <div className="v0d-tier-term">{tier.term}</div>
                  </div>
                  <ul>
                    {tier.features.map((f) => (
                      <li key={f}>
                        <IconCheck />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================== PROCESS ============================== */}
        <section id="process" className="v0d-section">
          <div className="v0d-shell">
            <div className="v0d-head">
              <span className="v0d-mono">Jarayon</span>
              <h2>Explore → Plan → Build → Commit.</h2>
              <p>Har bosqichda aniqlik: demo, muddat va byudjet doim ko'z oldingizda.</p>
            </div>
            <div className="v0d-proc">
              {PROCESS.map((s) => (
                <div key={s.n} className="v0d-step">
                  <span className="v0d-step-n">{s.n}</span>
                  <h3>{s.t}</h3>
                  <p>{s.d}</p>
                  <div className="v0d-tagrow">
                    {s.tags.map((t) => (
                      <span key={t} className="v0d-chip">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================== PROJECTS ============================== */}
        <section id="projects" className="v0d-section">
          <div className="v0d-shell">
            <div className="v0d-head">
              <span className="v0d-mono">Loyihalar</span>
              <h2>Ishga tushgan tizimlar.</h2>
              <p>Turli sohalar uchun qurilgan real mahsulotlar.</p>
            </div>
            <div className="v0d-proj">
              {PROJECTS.map((p) => (
                <div key={p.name} className="v0d-projcard">
                  <div className="v0d-projthumb">
                    <span className="mark">{p.name.charAt(0)}</span>
                    <span className="v0d-pill">{p.cat}</span>
                  </div>
                  <div className="v0d-projinfo">
                    <div>
                      <h3>{p.name}</h3>
                      <p>{p.desc}</p>
                    </div>
                    <span className="v0d-chip">{p.metric}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================== REVIEWS ============================== */}
        <section id="reviews" className="v0d-section">
          <div className="v0d-shell">
            <div className="v0d-head">
              <span className="v0d-mono">Sharhlar</span>
              <h2>Mijozlar nima deydi.</h2>
              <p>Har bir loyiha — davom etayotgan hamkorlik.</p>
            </div>
            <div className="v0d-rev">
              {REVIEWS.map((r) => (
                <figure key={r.name} className="v0d-revcard" style={{ margin: 0 }}>
                  <div className="v0d-stars" aria-label="5 yulduz">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <IconStar key={i} />
                    ))}
                  </div>
                  <blockquote>{r.text}</blockquote>
                  <figcaption className="v0d-revby">
                    <span className="v0d-avatar">{r.name.charAt(0)}</span>
                    <span>
                      <span className="who">{r.name}</span>
                      <br />
                      <span className="co">{r.co}</span>
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* ============================== STATS BAND ============================== */}
        <section className="v0d-section">
          <div className="v0d-shell">
            <div className="v0d-stats">
              {STATS.map((s) => (
                <div key={s.l} className="v0d-stat">
                  <div className="n">{s.n}</div>
                  <div className="l">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================== FAQ ============================== */}
        <section className="v0d-section">
          <div className="v0d-shell">
            <div className="v0d-head">
              <span className="v0d-mono">FAQ</span>
              <h2>Tez-tez so'raladigan savollar.</h2>
            </div>
            <div className="v0d-faq">
              {FAQ.map((item, i) => {
                const open = openFaq === i;
                return (
                  <div key={item.q} className="v0d-faqitem">
                    <button
                      className="v0d-faqq"
                      aria-expanded={open}
                      onClick={() => setOpenFaq(open ? null : i)}
                    >
                      {item.q}
                      <span className="v0d-faqicon">
                        <IconPlus open={open} />
                      </span>
                    </button>
                    <div className={"v0d-faqa" + (open ? " open" : "")}>
                      <p>{item.a}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ============================== FINAL CTA ============================== */}
        <section id="contact" className="v0d-section">
          <div className="v0d-shell">
            <div className="v0d-cta">
              <span className="v0d-mono" style={{ color: "rgba(255,255,255,0.6)", marginBottom: 16 }}>
                Bepul konsultatsiya
              </span>
              <h2>Loyihangizni bugun boshlaymiz.</h2>
              <div className="v0d-cta-actions">
                <a className="v0d-btn v0d-btn--primary" href="tel:+998991164658">
                  Loyihani boshlash
                  <IconArrow />
                </a>
                <a className="v0d-btn v0d-btn--ghost" href="https://t.me/muslimansoriy">
                  Telegram orqali yozish
                </a>
              </div>
              <div className="v0d-cta-meta">
                <span>+998 99 116 46 58</span>
                <span>t.me/muslimansoriy</span>
                <span>empiregroup.uz</span>
                <span>Toshkent, O'zbekiston</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ============================== FOOTER ============================== */}
      <footer className="v0d-foot">
        <div className="v0d-shell">
          <div className="v0d-foot-grid">
            <div className="v0d-foot-brand">
              <a className="v0d-brand" href="#top">
                <span className="v0d-brand-mark">e</span>
                Empire Group
              </a>
              <p>Toshkentda joylashgan IT kompaniya — ERP, AI, Web va App yechimlari.</p>
            </div>
            <div className="v0d-foot-col">
              <h4>Xizmatlar</h4>
              <a href="#services">Maxsus dasturiy ta'minot</a>
              <a href="#services">Odoo ERP</a>
              <a href="#services">AI Joriy qilish</a>
              <a href="#pricing">Narxlar</a>
            </div>
            <div className="v0d-foot-col">
              <h4>Kompaniya</h4>
              <a href="#process">Jarayon</a>
              <a href="#projects">Loyihalar</a>
              <a href="#reviews">Sharhlar</a>
            </div>
            <div className="v0d-foot-col">
              <h4>Aloqa</h4>
              <a href="tel:+998991164658">+998 99 116 46 58</a>
              <a href="https://t.me/muslimansoriy">t.me/muslimansoriy</a>
              <a href="#top">empiregroup.uz</a>
            </div>
          </div>
          <div className="v0d-foot-bar">
            <span>© 2026 Empire Group</span>
            <span>Toshkent, O'zbekiston</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
