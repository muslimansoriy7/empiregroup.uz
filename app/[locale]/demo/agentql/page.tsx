"use client";

import React, { useState } from "react";

/* ============================================================================
   Empire Group — AgentQL "Aurora glow over a midnight terminal" demo landing.
   Self-contained: all styles inlined and scoped under .aqd, all icons inline.
   Dark IDE aesthetic per the AgentQL design spec.
   ========================================================================== */

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');

.aqd {
  --void: #0b0c0e;
  --abyss: #0e111b;
  --deep-sea: #0d172b;
  --cobalt: #12244f;
  --frosted-lilac: #85a6e9;
  --signal-blue: #2862d7;
  --pulse-violet: #305fbd;
  --aurora-purple: #625fff;
  --plasma-pink: #ff7dda;
  --quartz: #ffffff;
  --ash: #abaebb;
  --mist: #c7c9d1;
  --slate: #3c3f44;
  --obsidian-edge: #172540;
  --inkline: #151e32;
  --sapphire: #24375a;

  --font-inter: 'Inter', ui-sans-serif, system-ui, -apple-system, sans-serif;
  --font-mono: 'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, monospace;
  --font-figtree: 'Figtree', ui-sans-serif, system-ui, -apple-system, sans-serif;

  --shadow-xl: rgba(0, 0, 0, 0.5) 0px 4px 30px 0px;
  --shadow-float: rgba(0, 0, 0, 0.34) 0px 20px 35px 0px, rgba(0, 0, 0, 0.25) 0px 4px 13px 0px;
  --shadow-md: rgba(0, 0, 0, 0.2) 0px 3px 16px 0px;

  --maxw: 1200px;

  position: relative;
  min-height: 100vh;
  background: var(--void);
  color: var(--quartz);
  font-family: var(--font-inter);
  font-size: 16px;
  font-weight: 400;
  line-height: 1.5;
  letter-spacing: -0.32px;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  overflow-x: clip;
}

/* Full reset override of any inherited global light styles */
.aqd *,
.aqd *::before,
.aqd *::after { box-sizing: border-box; }
.aqd h1, .aqd h2, .aqd h3, .aqd h4, .aqd p, .aqd ul, .aqd ol, .aqd figure {
  margin: 0; padding: 0;
}
.aqd ul, .aqd ol { list-style: none; }
.aqd a { color: inherit; text-decoration: none; }
/* generic anchor reset (class+element) outranks single-class button rules —
   re-assert button-anchor text colours at higher specificity so they show. */
.aqd a.aqd-btn--primary { color: #050606; }
.aqd a.aqd-btn--ghost { color: var(--quartz); }
.aqd button { font-family: inherit; cursor: pointer; border: none; background: none; color: inherit; }
.aqd img, .aqd svg { display: block; max-width: 100%; }

.aqd :focus-visible {
  outline: 2px solid var(--aurora-purple);
  outline-offset: 2px;
  border-radius: 4px;
}

/* ------------------------------------------------------------------ Aurora */
.aqd-aurora {
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
}
.aqd-aurora__purple {
  position: absolute;
  top: -640px;
  left: 50%;
  transform: translateX(-46%);
  width: 1500px;
  height: 1300px;
  background: radial-gradient(50% 50% at 50% 50%, rgba(98, 95, 255, 0.38) 0px, rgba(98, 95, 255, 0) 70%);
  filter: blur(30px);
}
.aqd-aurora__pink {
  position: absolute;
  top: 260px;
  right: -220px;
  width: 900px;
  height: 760px;
  background: radial-gradient(50% 50% at 50% 50%, rgba(255, 125, 218, 0.30) 0px, rgba(255, 125, 218, 0) 68%);
  filter: blur(40px);
}
.aqd-aurora__floor {
  position: absolute;
  top: 900px;
  bottom: 0;
  left: 0;
  right: 0;
  background: var(--void);
}

/* ------------------------------------------------------------------- Shell */
.aqd-shell { position: relative; z-index: 1; }
.aqd-container {
  width: 100%;
  max-width: var(--maxw);
  margin: 0 auto;
  padding: 0 24px;
}

/* --------------------------------------------------------------------- Nav */
.aqd-nav {
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgba(11, 12, 14, 0.72);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border-bottom: 1px solid rgba(23, 37, 64, 0.6);
}
.aqd-nav__inner {
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}
.aqd-logo {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  font-family: var(--font-figtree);
  font-weight: 600;
  font-size: 18px;
  letter-spacing: -0.02em;
  color: var(--quartz);
}
.aqd-logo__mark {
  width: 26px; height: 26px;
  border-radius: 7px;
  background: linear-gradient(135deg, var(--pulse-violet), var(--aurora-purple));
  display: grid; place-items: center;
  box-shadow: var(--shadow-md);
}
.aqd-nav__links {
  display: none;
  align-items: center;
  gap: 4px;
}
.aqd-nav__link {
  font-size: 14px;
  font-weight: 400;
  color: var(--ash);
  padding: 8px 12px;
  border-radius: 8px;
  transition: color .18s ease, background .18s ease;
}
.aqd-nav__link:hover { color: var(--quartz); background: rgba(23, 37, 64, 0.4); }
.aqd-nav__right { display: flex; align-items: center; gap: 12px; }
.aqd-nav__cta { display: none; }

.aqd-burger {
  display: inline-flex;
  width: 40px; height: 40px;
  align-items: center; justify-content: center;
  border-radius: 8px;
  border: 1px solid var(--obsidian-edge);
  color: var(--quartz);
}
.aqd-mobile {
  display: block;
  border-bottom: 1px solid var(--obsidian-edge);
  background: rgba(11, 12, 14, 0.96);
  backdrop-filter: blur(14px);
}
.aqd-mobile__inner { padding: 12px 24px 20px; display: flex; flex-direction: column; gap: 4px; }
.aqd-mobile__link {
  font-size: 15px; color: var(--mist);
  padding: 12px 8px;
  border-radius: 8px;
  border-bottom: 1px solid rgba(23, 37, 64, 0.5);
}
.aqd-mobile__link:hover { color: var(--quartz); }
.aqd-mobile .aqd-btn { margin-top: 12px; justify-content: center; }

/* ----------------------------------------------------------------- Buttons */
.aqd-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-family: var(--font-inter);
  font-weight: 500;
  font-size: 15px;
  letter-spacing: -0.2px;
  border-radius: 9999px;
  padding: 10px 20px;
  white-space: nowrap;
  transition: transform .16s ease, opacity .16s ease, background .16s ease, border-color .16s ease;
}
.aqd-btn:active { transform: translateY(1px); }
.aqd-btn--primary { background: var(--quartz); color: #050606; border: 1px solid #161618; }
.aqd-btn--primary:hover { opacity: .9; }
.aqd-btn--ghost { background: transparent; border: 1px solid #777a88; color: var(--quartz); }
.aqd-btn--ghost:hover { border-color: var(--quartz); }
.aqd-btn--accent {
  background: linear-gradient(90deg, var(--pulse-violet), var(--aurora-purple));
  color: var(--quartz);
  font-size: 14px;
}
.aqd-btn--accent:hover { opacity: .92; }

/* ------------------------------------------------------------------ Shared */
.aqd-section { padding-top: 80px; }
.aqd-section--first { padding-top: 40px; }
.aqd-eyebrow {
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  color: var(--ash);
}
.aqd-h2 {
  font-family: var(--font-figtree);
  font-weight: 500;
  font-size: 36px;
  line-height: 1.13;
  letter-spacing: -0.72px;
  color: var(--quartz);
}
.aqd-lead {
  font-size: 18px;
  font-weight: 400;
  line-height: 1.5;
  color: var(--ash);
  max-width: 620px;
}
.aqd-head-center { text-align: center; display: flex; flex-direction: column; align-items: center; gap: 16px; }
.aqd-head-center .aqd-lead { margin: 0 auto; }

.aqd-tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 500;
  padding: 4px 12px;
  border-radius: 9999px;
  background: var(--deep-sea);
  color: var(--frosted-lilac);
  border: 1px solid var(--obsidian-edge);
}

/* -------------------------------------------------------------------- Hero */
.aqd-hero { padding-top: 56px; padding-bottom: 8px; }
.aqd-hero__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 48px;
  align-items: center;
}
.aqd-hero__eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 500;
  color: var(--frosted-lilac);
  padding: 6px 14px 6px 10px;
  border: 1px solid var(--obsidian-edge);
  border-radius: 9999px;
  background: rgba(13, 23, 43, 0.6);
  width: fit-content;
}
.aqd-hero__dot {
  width: 7px; height: 7px; border-radius: 50%;
  background: var(--plasma-pink);
  box-shadow: 0 0 10px var(--plasma-pink);
}
.aqd-hero h1 {
  font-family: var(--font-figtree);
  font-weight: 500;
  font-size: clamp(40px, 8vw, 64px);
  line-height: 1;
  letter-spacing: -1.28px;
  color: var(--quartz);
  margin-top: 22px;
}
.aqd-hero h1 .grad {
  background: linear-gradient(90deg, var(--frosted-lilac), var(--plasma-pink));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.aqd-hero__sub {
  font-size: 18px;
  font-weight: 400;
  line-height: 1.55;
  color: var(--mist);
  margin-top: 22px;
  max-width: 540px;
}
.aqd-hero__cta { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 30px; }
.aqd-hero__stats {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px 16px;
  margin-top: 44px;
  padding-top: 30px;
  border-top: 1px solid var(--obsidian-edge);
}
.aqd-stat__num {
  font-family: var(--font-figtree);
  font-weight: 500;
  font-size: 28px;
  letter-spacing: -0.56px;
  color: var(--quartz);
}
.aqd-stat__label { font-size: 13px; color: var(--ash); margin-top: 4px; }

/* Hero visual — stacked IDE / terminal panels */
.aqd-hero__visual { position: relative; }
.aqd-code {
  border-radius: 12px;
  border: 1px solid var(--inkline);
  background: var(--deep-sea);
  box-shadow: var(--shadow-float);
  overflow: hidden;
}
.aqd-code__bar {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 11px 14px;
  border-bottom: 1px solid var(--inkline);
  background: rgba(18, 36, 79, 0.28);
}
.aqd-code__dots { display: inline-flex; gap: 6px; }
.aqd-code__dots i { width: 11px; height: 11px; border-radius: 50%; display: block; }
.aqd-code__file {
  font-family: var(--font-inter);
  font-size: 13px;
  color: var(--ash);
  margin-left: 6px;
}
.aqd-code__copy { margin-left: auto; color: #8798c1; }
.aqd-code__body {
  font-family: var(--font-mono);
  font-size: 13px;
  line-height: 1.7;
  padding: 16px 18px;
  overflow-x: auto;
}
.aqd-code__row { display: grid; grid-template-columns: 22px 1fr; gap: 14px; white-space: pre; }
.aqd-code__ln { color: var(--slate); text-align: right; user-select: none; }
.tok-key { color: var(--plasma-pink); }
.tok-str { color: #28b6ff; }
.tok-com { color: #8798c1; }
.tok-fn  { color: var(--frosted-lilac); }
.tok-txt { color: var(--mist); }

.aqd-hero__mini {
  position: absolute;
  right: -14px;
  bottom: -34px;
  width: 230px;
  border-radius: 12px;
  border: 1px solid var(--sapphire);
  background: var(--cobalt);
  box-shadow: var(--shadow-float);
  padding: 16px;
  display: none;
}
.aqd-hero__mini h4 { font-size: 13px; font-weight: 500; color: var(--quartz); }
.aqd-hero__mini .row {
  display: flex; align-items: center; justify-content: space-between;
  font-size: 12px; color: var(--ash); margin-top: 10px;
}
.aqd-bar {
  height: 5px; border-radius: 9999px; background: rgba(133, 166, 233, 0.18); overflow: hidden; margin-top: 6px;
}
.aqd-bar > span { display: block; height: 100%; border-radius: 9999px; background: linear-gradient(90deg, var(--pulse-violet), var(--aurora-purple)); }

/* --------------------------------------------------------------- Proofstrip */
.aqd-proof { margin-top: 64px; }
.aqd-proof__label { text-align: center; font-size: 12px; text-transform: uppercase; letter-spacing: 0.02em; color: var(--ash); }
.aqd-proof__row {
  margin-top: 22px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 14px 28px;
}
.aqd-proof__logo {
  font-family: var(--font-inter);
  font-size: 15px;
  font-weight: 500;
  letter-spacing: -0.2px;
  color: var(--ash);
  opacity: .78;
  transition: color .18s ease, opacity .18s ease;
}
.aqd-proof__logo:hover { color: var(--quartz); opacity: 1; }

/* ---------------------------------------------------------------- Services */
.aqd-services { display: grid; grid-template-columns: 1fr; gap: 24px; margin-top: 44px; }
.aqd-card {
  background: var(--deep-sea);
  border: 1px solid var(--obsidian-edge);
  border-radius: 12px;
  padding: 24px;
}
.aqd-svc__icon {
  width: 42px; height: 42px; border-radius: 11px;
  display: grid; place-items: center;
  background: var(--cobalt);
  border: 1px solid var(--sapphire);
  color: var(--frosted-lilac);
  margin-bottom: 18px;
}
.aqd-svc h3 {
  font-family: var(--font-inter);
  font-size: 20px; font-weight: 500; line-height: 1.25;
  letter-spacing: -0.54px; color: var(--quartz);
}
.aqd-svc p { font-size: 15px; color: var(--mist); margin-top: 10px; line-height: 1.5; }
.aqd-chiprow { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 18px; }
.aqd-chip {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--frosted-lilac);
  background: rgba(18, 36, 79, 0.5);
  border: 1px solid var(--obsidian-edge);
  border-radius: 9999px;
  padding: 5px 11px;
}

.aqd-tiers { display: grid; grid-template-columns: 1fr; gap: 12px; margin-top: 22px; }
.aqd-tier {
  background: var(--abyss);
  border: 1px solid var(--inkline);
  border-radius: 12px;
  padding: 18px;
  position: relative;
}
.aqd-tier--pop { background: var(--cobalt); border: 1px solid #1e2b48; }
.aqd-tier__badge {
  position: absolute; top: 14px; right: 14px;
  font-size: 11px; font-weight: 500;
  padding: 3px 10px; border-radius: 9999px;
  color: var(--quartz);
  background: linear-gradient(90deg, var(--pulse-violet), var(--aurora-purple));
}
.aqd-tier__name { font-size: 12px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.04em; color: var(--ash); }
.aqd-tier__price {
  font-family: var(--font-figtree);
  font-weight: 500;
  font-size: 26px;
  letter-spacing: -0.56px;
  color: var(--quartz);
  margin-top: 8px;
}
.aqd-tier__meta { font-size: 13px; color: var(--mist); margin-top: 4px; }

.aqd-tagcloud { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 20px; }

/* ----------------------------------------------------------------- Process */
.aqd-steps { display: grid; grid-template-columns: 1fr; gap: 16px; margin-top: 44px; }
.aqd-step {
  background: var(--abyss);
  border: 1px solid var(--obsidian-edge);
  border-radius: 12px;
  padding: 24px;
}
.aqd-step__num {
  font-family: var(--font-mono);
  font-size: 13px;
  color: var(--signal-blue);
}
.aqd-step h3 {
  font-family: var(--font-inter);
  font-size: 18px; font-weight: 500;
  color: var(--quartz); margin-top: 14px; letter-spacing: -0.4px;
}
.aqd-step p { font-size: 14px; color: var(--mist); margin-top: 8px; line-height: 1.5; }
.aqd-step__tags { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 16px; }
.aqd-step__tag {
  font-family: var(--font-mono); font-size: 11px; color: var(--ash);
  border: 1px solid var(--inkline); border-radius: 9999px; padding: 3px 9px;
}

/* ------------------------------------------------------------------- Cases */
.aqd-cases { display: grid; grid-template-columns: 1fr; gap: 16px; margin-top: 44px; }
.aqd-case {
  background: var(--deep-sea);
  border: 1px solid var(--obsidian-edge);
  border-radius: 12px;
  padding: 22px;
  transition: border-color .18s ease, transform .18s ease;
}
.aqd-case:hover { border-color: var(--sapphire); transform: translateY(-2px); }
.aqd-case__top { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
.aqd-case__cat { font-size: 12px; font-weight: 500; color: var(--frosted-lilac); }
.aqd-case__metric {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--quartz);
  background: rgba(18, 36, 79, 0.5);
  border: 1px solid var(--sapphire);
  border-radius: 9999px;
  padding: 3px 10px;
}
.aqd-case h3 {
  font-family: var(--font-inter);
  font-size: 18px; font-weight: 500; color: var(--quartz);
  margin-top: 16px; letter-spacing: -0.4px;
}
.aqd-case__arrow { margin-top: 18px; color: var(--ash); display: inline-flex; align-items: center; gap: 6px; font-size: 13px; }

/* ------------------------------------------------------------ Testimonials */
.aqd-quotes { display: grid; grid-template-columns: 1fr; gap: 16px; margin-top: 44px; }
.aqd-quote {
  background: var(--abyss);
  border: 1px solid var(--obsidian-edge);
  border-radius: 12px;
  padding: 24px;
  display: flex; flex-direction: column; gap: 16px;
}
.aqd-quote--wide { grid-column: auto; }
.aqd-stars { display: inline-flex; gap: 3px; color: var(--plasma-pink); }
.aqd-quote p { font-size: 15px; color: var(--mist); line-height: 1.55; }
.aqd-quote__who { display: flex; align-items: center; gap: 12px; margin-top: auto; }
.aqd-avatar {
  width: 38px; height: 38px; border-radius: 50%;
  display: grid; place-items: center;
  font-family: var(--font-figtree); font-weight: 600; font-size: 14px;
  color: var(--quartz);
  background: linear-gradient(135deg, var(--pulse-violet), var(--aurora-purple));
}
.aqd-quote__name { font-size: 14px; font-weight: 500; color: var(--quartz); }
.aqd-quote__role { font-size: 12px; color: var(--ash); }

/* -------------------------------------------------------------- Stats band */
.aqd-band {
  margin-top: 80px;
  background: var(--cobalt);
  border: 1px solid #1e2b48;
  border-radius: 12px;
  padding: 36px 24px;
}
.aqd-band__grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 28px 16px;
  text-align: center;
}
.aqd-band__num {
  font-family: var(--font-figtree);
  font-weight: 500;
  font-size: 40px;
  letter-spacing: -0.8px;
  color: var(--quartz);
}
.aqd-band__label { font-size: 13px; color: var(--frosted-lilac); margin-top: 6px; }

/* --------------------------------------------------------------------- FAQ */
.aqd-faq { max-width: 780px; margin: 44px auto 0; display: flex; flex-direction: column; gap: 12px; }
.aqd-faq__item {
  background: var(--abyss);
  border: 1px solid var(--obsidian-edge);
  border-radius: 12px;
  overflow: hidden;
}
.aqd-faq__q {
  width: 100%;
  display: flex; align-items: center; justify-content: space-between; gap: 16px;
  text-align: left;
  padding: 20px 22px;
  font-size: 16px; font-weight: 500; color: var(--quartz);
}
.aqd-faq__icon {
  flex-shrink: 0;
  color: var(--frosted-lilac);
  transition: transform .22s ease;
}
.aqd-faq__item[data-open="true"] .aqd-faq__icon { transform: rotate(45deg); }
.aqd-faq__a {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows .26s ease;
}
.aqd-faq__item[data-open="true"] .aqd-faq__a { grid-template-rows: 1fr; }
.aqd-faq__a > div { overflow: hidden; }
.aqd-faq__a p {
  font-size: 15px; color: var(--mist); line-height: 1.55;
  padding: 0 22px 22px;
}

/* --------------------------------------------------------------- Final CTA */
.aqd-final {
  margin-top: 80px;
  position: relative;
  border-radius: 12px;
  border: 1px solid var(--sapphire);
  background:
    radial-gradient(120% 140% at 20% -20%, rgba(98,95,255,0.22), rgba(0,0,0,0) 60%),
    radial-gradient(120% 140% at 100% 120%, rgba(255,125,218,0.16), rgba(0,0,0,0) 55%),
    var(--deep-sea);
  padding: 48px 28px;
  text-align: center;
  overflow: hidden;
  box-shadow: var(--shadow-xl);
}
.aqd-final h2 {
  font-family: var(--font-figtree);
  font-weight: 500;
  font-size: clamp(30px, 6vw, 48px);
  line-height: 1.05;
  letter-spacing: -0.96px;
  color: var(--quartz);
  max-width: 620px;
  margin: 0 auto;
}
.aqd-final__cta { display: flex; flex-wrap: wrap; gap: 12px; justify-content: center; margin-top: 28px; }
.aqd-final__contacts {
  display: flex; flex-wrap: wrap; gap: 10px 22px; justify-content: center;
  margin-top: 30px; padding-top: 26px;
  border-top: 1px solid var(--obsidian-edge);
}
.aqd-contact {
  display: inline-flex; align-items: center; gap: 8px;
  font-family: var(--font-mono);
  font-size: 13px; color: var(--mist);
}
.aqd-contact svg { color: var(--frosted-lilac); }
.aqd-contact:hover { color: var(--quartz); }

/* ------------------------------------------------------------------ Footer */
.aqd-footer { margin-top: 80px; padding: 44px 0 56px; border-top: 1px solid var(--obsidian-edge); }
.aqd-footer__grid {
  display: grid; grid-template-columns: 1fr; gap: 32px;
}
.aqd-footer__brand { max-width: 300px; }
.aqd-footer__brand p { font-size: 14px; color: var(--ash); margin-top: 14px; line-height: 1.5; }
.aqd-footer__cols { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
.aqd-footer__h { font-size: 13px; font-weight: 500; color: var(--quartz); margin-bottom: 12px; }
.aqd-footer__l { display: flex; flex-direction: column; gap: 9px; }
.aqd-footer__l a { font-size: 13px; color: var(--ash); }
.aqd-footer__l a:hover { color: var(--quartz); }
.aqd-footer__bottom {
  margin-top: 36px; padding-top: 22px; border-top: 1px solid var(--inkline);
  display: flex; flex-wrap: wrap; gap: 12px; align-items: center; justify-content: space-between;
  font-size: 13px; color: var(--ash);
}

/* --------------------------------------------------------------- Animation */
@keyframes aqd-rise {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}
.aqd-reveal { opacity: 0; animation: aqd-rise .7s cubic-bezier(.2,.7,.3,1) forwards; }
.aqd-reveal.d1 { animation-delay: .06s; }
.aqd-reveal.d2 { animation-delay: .12s; }
.aqd-reveal.d3 { animation-delay: .18s; }
.aqd-reveal.d4 { animation-delay: .24s; }

@media (prefers-reduced-motion: reduce) {
  .aqd-reveal { animation: none; opacity: 1; transform: none; }
  .aqd *, .aqd *::before, .aqd *::after { transition: none !important; }
}

/* ----------------------------------------------------------- Breakpoints */
@media (min-width: 700px) {
  .aqd-services { grid-template-columns: 1fr 1fr; }
  .aqd-tiers { grid-template-columns: repeat(3, 1fr); }
  .aqd-steps { grid-template-columns: repeat(2, 1fr); }
  .aqd-cases { grid-template-columns: 1fr 1fr; }
  .aqd-quotes { grid-template-columns: 1fr 1fr; }
  .aqd-band__grid { grid-template-columns: repeat(4, 1fr); }
  .aqd-hero__stats { grid-template-columns: repeat(4, 1fr); }
  .aqd-footer__grid { grid-template-columns: 1.3fr 2fr; }
}
@media (min-width: 960px) {
  .aqd-container { padding: 0 32px; }
  .aqd-nav__links { display: flex; }
  .aqd-nav__cta { display: inline-flex; }
  .aqd-burger { display: none; }
  .aqd-hero__grid { grid-template-columns: 1.05fr 0.95fr; gap: 40px; }
  .aqd-hero { padding-top: 76px; }
  .aqd-hero__mini { display: block; }
  .aqd-steps { grid-template-columns: repeat(4, 1fr); }
  .aqd-h2 { font-size: 48px; letter-spacing: -0.96px; }
  .aqd-quote--wide { grid-column: span 2; }
}
`;

/* --------------------------------------------------------------- Inline icons */
const IconArrow = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);
const IconStar = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2l2.9 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l7.1-1.01L12 2z" />
  </svg>
);
const IconPlus = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
    <path d="M12 5v14M5 12h14" />
  </svg>
);
const IconCopy = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="9" y="9" width="11" height="11" rx="2" />
    <path d="M5 15V5a2 2 0 012-2h10" />
  </svg>
);
const IconCode = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M8 8l-4 4 4 4M16 8l4 4-4 4M13 5l-2 14" />
  </svg>
);
const IconChip = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="5" y="5" width="14" height="14" rx="2" />
    <path d="M9 9h6v6H9zM9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3" />
  </svg>
);
const IconPhone = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3 19.5 19.5 0 01-6-6 19.8 19.8 0 01-3-8.6A2 2 0 014.1 2h3a2 2 0 012 1.7c.1.9.3 1.8.6 2.6a2 2 0 01-.4 2.1L8 9.9a16 16 0 006 6l1.5-1.3a2 2 0 012.1-.4c.8.3 1.7.5 2.6.6a2 2 0 011.7 2z" />
  </svg>
);
const IconSend = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
  </svg>
);
const IconGlobe = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20M12 2a15 15 0 010 20 15 15 0 010-20z" />
  </svg>
);
const IconPin = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0116 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);
const IconBurger = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);
const IconClose = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);

/* ------------------------------------------------------------------ Data */
const NAV = [
  { label: "Xizmatlar", href: "#services" },
  { label: "Jarayon", href: "#process" },
  { label: "Loyihalar", href: "#cases" },
  { label: "Sharhlar", href: "#quotes" },
  { label: "Narxlar", href: "#services" },
];

const HERO_STATS = [
  { num: "50+", label: "yakunlangan loyiha" },
  { num: "30+", label: "mamnun mijoz" },
  { num: "15+", label: "texnologiya" },
  { num: "3+", label: "yil tajriba" },
];

const LOGOS = ["Google", "Meta", "Stripe", "Telegram", "GitHub", "Cloudflare", "Vercel", "Figma", "Notion"];

const TIERS = [
  { name: "Standard", price: "$5,000 dan", meta: "2–3 oy", pop: false },
  { name: "Advanced", price: "$15K–$40K", meta: "4–6 oy", pop: true },
  { name: "Mega", price: "$50,000+", meta: "6–12 oy", pop: false },
];

const PROCESS = [
  { num: "01", title: "Explore", desc: "G'oya va muammoni chuqur o'rganamiz.", tags: ["Tahlil", "Audit"] },
  { num: "02", title: "Plan", desc: "PRD, arxitektura, dizayn; muddat va byudjet aniq.", tags: ["PRD", "TZ", "Dizayn"] },
  { num: "03", title: "Build", desc: "Kod, test, integratsiya; sprintlar, demo.", tags: ["Dev", "Test", "Demo"] },
  { num: "04", title: "Commit", desc: "Ishga tushirish va qo'llab-quvvatlash.", tags: ["Deploy", "Support"] },
];

const CASES = [
  { name: "Motor Lux — CRM va savdo", cat: "Avtomobil", metric: "CRM" },
  { name: "GadgetSpace — onlayn elektronika do'koni", cat: "E-commerce", metric: "konversiya 2.1x" },
  { name: "Hilol Market — savdo avtomatlashtirish", cat: "POS", metric: "2x tez" },
  { name: "MedFlow — klinika boshqaruvi", cat: "Healthcare", metric: "AI" },
];

const QUOTES = [
  { name: "Aliya M.", role: "Motor Lux", init: "A", wide: true, text: "Empire Group eski qog'ozdagi ishimizni to'liq tizimga o'tkazdi — vaqt ancha tejaldi." },
  { name: "Jasur T.", role: "GadgetSpace", init: "J", wide: false, text: "Empire bilan ishlash oson bo'ldi, muddat va byudjet aniq edi." },
  { name: "Doniyor R.", role: "MedFlow", init: "D", wide: false, text: "Klinika ishini AI qo'shib avtomatlashtirdi. Qabul ancha tartibli." },
  { name: "Laziza K.", role: "X Wear", init: "L", wide: true, text: "Zamonaviy dizayn, savdo hajmi ko'tarildi." },
];

const BAND = [
  { num: "50+", label: "yakunlangan loyiha" },
  { num: "30+", label: "mamnun mijoz" },
  { num: "15+", label: "texnologiya" },
  { num: "3+", label: "yil tajriba" },
];

const FAQ = [
  { q: "Loyiha qancha vaqt oladi?", a: "MVP 3–4 hafta, o'rta 2–3 oy, yirik 4–6 oy. Aniq muddat Explore bosqichida belgilanadi." },
  { q: "Narxlar qanday?", a: "Fixed-scope: loyiha boshida aniq belgilanadi. Yashirin to'lovlar yo'q." },
  { q: "Mavjud tizimni davom ettira olasizmi?", a: "Ha, audit qilib mavjud yechim ustiga quramiz." },
  { q: "Konsultatsiya bepulmi?", a: "Ha, majburiyatsiz. Birinchi suhbat va dastlabki baholash bepul." },
];

export default function AgentQLDemoPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="aqd">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* Aurora glows */}
      <div className="aqd-aurora" aria-hidden="true">
        <div className="aqd-aurora__purple" />
        <div className="aqd-aurora__pink" />
        <div className="aqd-aurora__floor" />
      </div>

      <div className="aqd-shell">
        {/* ---------------------------------------------------------- Nav */}
        <header className="aqd-nav">
          <div className="aqd-container">
            <div className="aqd-nav__inner">
              <a className="aqd-logo" href="#top" aria-label="Empire Group">
                <span className="aqd-logo__mark">
                  <IconCode />
                </span>
                empire
              </a>

              <nav className="aqd-nav__links" aria-label="Asosiy menyu">
                {NAV.map((n) => (
                  <a key={n.label} className="aqd-nav__link" href={n.href}>
                    {n.label}
                  </a>
                ))}
              </nav>

              <div className="aqd-nav__right">
                <a className="aqd-btn aqd-btn--primary aqd-nav__cta" href="#contact">
                  Bepul konsultatsiya
                </a>
                <button
                  className="aqd-burger"
                  aria-label={menuOpen ? "Menyuni yopish" : "Menyuni ochish"}
                  aria-expanded={menuOpen}
                  onClick={() => setMenuOpen((v) => !v)}
                >
                  {menuOpen ? <IconClose /> : <IconBurger />}
                </button>
              </div>
            </div>
          </div>

          {menuOpen && (
            <div className="aqd-mobile">
              <div className="aqd-mobile__inner">
                {NAV.map((n) => (
                  <a key={n.label} className="aqd-mobile__link" href={n.href} onClick={() => setMenuOpen(false)}>
                    {n.label}
                  </a>
                ))}
                <a className="aqd-btn aqd-btn--primary" href="#contact" onClick={() => setMenuOpen(false)}>
                  Bepul konsultatsiya
                </a>
              </div>
            </div>
          )}
        </header>

        <main id="top">
          <div className="aqd-container">
            {/* ------------------------------------------------------ Hero */}
            <section className="aqd-hero" aria-labelledby="hero-title">
              <div className="aqd-hero__grid">
                <div>
                  <span className="aqd-hero__eyebrow aqd-reveal">
                    <span className="aqd-hero__dot" />
                    AI &amp; Custom App Development
                  </span>
                  <h1 id="hero-title" className="aqd-reveal d1">
                    Biznes uchun vaqt tejaydigan <span className="grad">IT-yechimlar</span> joriy qilamiz.
                  </h1>
                  <p className="aqd-hero__sub aqd-reveal d2">
                    Murakkab ichki jarayonlarni ERP, AI, Web va App yechimlari orqali raqamlashtiramiz. G'oyadan tayyor
                    mahsulotgacha — 2–3 oyda.
                  </p>
                  <div className="aqd-hero__cta aqd-reveal d3">
                    <a className="aqd-btn aqd-btn--primary" href="#contact">
                      Loyihani boshlash <IconArrow />
                    </a>
                    <a className="aqd-btn aqd-btn--ghost" href="#cases">
                      Ishlarni ko'rish
                    </a>
                  </div>

                  <div className="aqd-hero__stats aqd-reveal d4">
                    {HERO_STATS.map((s) => (
                      <div key={s.label}>
                        <div className="aqd-stat__num">{s.num}</div>
                        <div className="aqd-stat__label">{s.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Hero visual — stacked IDE panel */}
                <div className="aqd-hero__visual aqd-reveal d2">
                  <div className="aqd-code" role="img" aria-label="Empire Group deploy terminali namunasi">
                    <div className="aqd-code__bar">
                      <span className="aqd-code__dots">
                        <i style={{ background: "#ff5f57" }} />
                        <i style={{ background: "#febc2e" }} />
                        <i style={{ background: "#28c840" }} />
                      </span>
                      <span className="aqd-code__file">empire.deploy.ts</span>
                      <span className="aqd-code__copy" aria-hidden="true">
                        <IconCopy />
                      </span>
                    </div>
                    <div className="aqd-code__body">
                      {[
                        <><span className="tok-com">// Empire Group — ERP + AI pipeline</span></>,
                        <><span className="tok-key">import</span> <span className="tok-txt">{"{ deploy }"}</span> <span className="tok-key">from</span> <span className="tok-str">'@empire/core'</span></>,
                        <> </>,
                        <><span className="tok-key">const</span> <span className="tok-fn">project</span> <span className="tok-txt">=</span> <span className="tok-key">await</span> <span className="tok-fn">deploy</span><span className="tok-txt">({"{"}</span></>,
                        <><span className="tok-txt">  stack:</span> <span className="tok-str">['react', 'node', 'odoo']</span><span className="tok-txt">,</span></>,
                        <><span className="tok-txt">  ai:</span> <span className="tok-key">true</span><span className="tok-txt">,</span> <span className="tok-txt">region:</span> <span className="tok-str">'tashkent'</span></>,
                        <><span className="tok-txt">{"})"}</span></>,
                        <> </>,
                        <><span className="tok-com">// ✓ tayyor mahsulot — 2–3 oyda</span></>,
                      ].map((line, i) => (
                        <div className="aqd-code__row" key={i}>
                          <span className="aqd-code__ln">{i + 1}</span>
                          <span>{line}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Floating mini metric card */}
                  <div className="aqd-hero__mini" aria-hidden="true">
                    <h4>Deploy holati</h4>
                    <div className="row">
                      <span>Build</span>
                      <span style={{ color: "#28c840" }}>passed</span>
                    </div>
                    <div className="aqd-bar">
                      <span style={{ width: "92%" }} />
                    </div>
                    <div className="row">
                      <span>Test coverage</span>
                      <span style={{ color: "var(--frosted-lilac)" }}>92%</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* --------------------------------------------------- Proof strip */}
            <section className="aqd-proof" aria-label="Ishonchli texnologiyalar">
              <p className="aqd-proof__label">Ishonchli stack va integratsiyalar</p>
              <div className="aqd-proof__row">
                {LOGOS.map((l) => (
                  <span className="aqd-proof__logo" key={l}>
                    {l}
                  </span>
                ))}
              </div>
            </section>

            {/* ------------------------------------------------------ Services */}
            <section className="aqd-section" id="services" aria-labelledby="services-title">
              <div className="aqd-head-center">
                <span className="aqd-eyebrow">Xizmatlar</span>
                <h2 className="aqd-h2" id="services-title">
                  Ikki yo'nalish, bitta natija
                </h2>
                <p className="aqd-lead">
                  G'oyadan ishga tushirilgan mahsulotgacha — maxsus dasturiy ta'minot yoki Odoo ERP va AI joriy qilish.
                </p>
              </div>

              <div className="aqd-services">
                {/* Service 1 */}
                <article className="aqd-card aqd-svc">
                  <div className="aqd-svc__icon">
                    <IconCode />
                  </div>
                  <h3>Maxsus dasturiy ta'minot</h3>
                  <p>Web va mobil ilovalar, ichki tizimlar — noldan yoki mavjud yechim ustiga.</p>
                  <div className="aqd-chiprow">
                    {["React", "Node.js", "Flutter", "Swift", "Kotlin", "Docker"].map((t) => (
                      <span className="aqd-chip" key={t}>
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="aqd-tiers">
                    {TIERS.map((t) => (
                      <div className={`aqd-tier${t.pop ? " aqd-tier--pop" : ""}`} key={t.name}>
                        {t.pop && <span className="aqd-tier__badge">ommabop</span>}
                        <div className="aqd-tier__name">{t.name}</div>
                        <div className="aqd-tier__price">{t.price}</div>
                        <div className="aqd-tier__meta">{t.meta}</div>
                      </div>
                    ))}
                  </div>
                </article>

                {/* Service 2 */}
                <article className="aqd-card aqd-svc">
                  <div className="aqd-svc__icon">
                    <IconChip />
                  </div>
                  <h3>Odoo ERP &amp; AI joriy qilish</h3>
                  <p>Tarqoq jarayonlarni yagona tizimga birlashtiramiz va AI bilan avtomatlashtiramiz.</p>
                  <div className="aqd-tagcloud">
                    {["Odoo ERP", "AI Automation", "Predictive Analytics", "Cloud"].map((t) => (
                      <span className="aqd-tag" key={t}>
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* mini code snippet reinforcing devtool identity */}
                  <div className="aqd-code" style={{ marginTop: 20 }}>
                    <div className="aqd-code__bar">
                      <span className="aqd-code__file">automation.py</span>
                      <span className="aqd-code__copy" aria-hidden="true">
                        <IconCopy />
                      </span>
                    </div>
                    <div className="aqd-code__body">
                      {[
                        <><span className="tok-key">def</span> <span className="tok-fn">forecast</span><span className="tok-txt">(orders):</span></>,
                        <><span className="tok-txt">    return</span> <span className="tok-fn">model</span><span className="tok-txt">.</span><span className="tok-fn">predict</span><span className="tok-txt">(orders)</span></>,
                        <><span className="tok-com"># AI: ombor va sotuvni bashorat</span></>,
                      ].map((line, i) => (
                        <div className="aqd-code__row" key={i}>
                          <span className="aqd-code__ln">{i + 1}</span>
                          <span>{line}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </article>
              </div>
            </section>

            {/* ------------------------------------------------------- Process */}
            <section className="aqd-section" id="process" aria-labelledby="process-title">
              <div className="aqd-head-center">
                <span className="aqd-eyebrow">Jarayon</span>
                <h2 className="aqd-h2" id="process-title">
                  Explore → Plan → Build → Commit
                </h2>
                <p className="aqd-lead">Shaffof, sprintlarga bo'lingan jarayon. Har bosqichda demo va aniq natija.</p>
              </div>

              <div className="aqd-steps">
                {PROCESS.map((s) => (
                  <article className="aqd-step" key={s.num}>
                    <div className="aqd-step__num">{s.num}</div>
                    <h3>{s.title}</h3>
                    <p>{s.desc}</p>
                    <div className="aqd-step__tags">
                      {s.tags.map((t) => (
                        <span className="aqd-step__tag" key={t}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </section>

            {/* --------------------------------------------------------- Cases */}
            <section className="aqd-section" id="cases" aria-labelledby="cases-title">
              <div className="aqd-head-center">
                <span className="aqd-eyebrow">Loyihalar</span>
                <h2 className="aqd-h2" id="cases-title">
                  Ishga tushirilgan mahsulotlar
                </h2>
                <p className="aqd-lead">Turli sohalarda o'lchanadigan natija bergan yechimlar.</p>
              </div>

              <div className="aqd-cases">
                {CASES.map((c) => (
                  <article className="aqd-case" key={c.name}>
                    <div className="aqd-case__top">
                      <span className="aqd-case__cat">{c.cat}</span>
                      <span className="aqd-case__metric">{c.metric}</span>
                    </div>
                    <h3>{c.name}</h3>
                    <span className="aqd-case__arrow">
                      Loyihani ko'rish <IconArrow />
                    </span>
                  </article>
                ))}
              </div>
            </section>

            {/* --------------------------------------------------- Testimonials */}
            <section className="aqd-section" id="quotes" aria-labelledby="quotes-title">
              <div className="aqd-head-center">
                <span className="aqd-eyebrow">Sharhlar</span>
                <h2 className="aqd-h2" id="quotes-title">
                  Mijozlar nima deydi
                </h2>
              </div>

              <div className="aqd-quotes">
                {QUOTES.map((q) => (
                  <article className={`aqd-quote${q.wide ? " aqd-quote--wide" : ""}`} key={q.name}>
                    <span className="aqd-stars" aria-label="5 yulduz">
                      {[0, 1, 2, 3, 4].map((i) => (
                        <IconStar key={i} />
                      ))}
                    </span>
                    <p>{q.text}</p>
                    <div className="aqd-quote__who">
                      <span className="aqd-avatar">{q.init}</span>
                      <span>
                        <span className="aqd-quote__name" style={{ display: "block" }}>
                          {q.name}
                        </span>
                        <span className="aqd-quote__role">{q.role}</span>
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            {/* ----------------------------------------------------- Stats band */}
            <section aria-label="Kompaniya raqamlari">
              <div className="aqd-band">
                <div className="aqd-band__grid">
                  {BAND.map((b) => (
                    <div key={b.label}>
                      <div className="aqd-band__num">{b.num}</div>
                      <div className="aqd-band__label">{b.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* ----------------------------------------------------------- FAQ */}
            <section className="aqd-section" id="faq" aria-labelledby="faq-title">
              <div className="aqd-head-center">
                <span className="aqd-eyebrow">Savol-javob</span>
                <h2 className="aqd-h2" id="faq-title">
                  Ko'p so'raladigan savollar
                </h2>
              </div>

              <div className="aqd-faq">
                {FAQ.map((f, i) => {
                  const open = openFaq === i;
                  return (
                    <div className="aqd-faq__item" data-open={open} key={f.q}>
                      <button
                        className="aqd-faq__q"
                        aria-expanded={open}
                        aria-controls={`faq-a-${i}`}
                        onClick={() => setOpenFaq(open ? null : i)}
                      >
                        {f.q}
                        <span className="aqd-faq__icon">
                          <IconPlus />
                        </span>
                      </button>
                      <div className="aqd-faq__a" id={`faq-a-${i}`} role="region" aria-hidden={!open}>
                        <div>
                          <p>{f.a}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* ---------------------------------------------------- Final CTA */}
            <section id="contact" aria-labelledby="cta-title">
              <div className="aqd-final">
                <span className="aqd-eyebrow" style={{ color: "var(--frosted-lilac)" }}>
                  Boshlaymiz
                </span>
                <h2 id="cta-title" style={{ marginTop: 16 }}>
                  Loyihangizni bugun boshlaymiz.
                </h2>
                <div className="aqd-final__cta">
                  <a className="aqd-btn aqd-btn--primary" href="tel:+998991164658">
                    Bepul konsultatsiya <IconArrow />
                  </a>
                  <a className="aqd-btn aqd-btn--accent" href="https://t.me/muslimansoriy">
                    Telegram orqali yozish
                  </a>
                </div>

                <div className="aqd-final__contacts">
                  <a className="aqd-contact" href="tel:+998991164658">
                    <IconPhone /> +998 99 116 46 58
                  </a>
                  <a className="aqd-contact" href="https://t.me/muslimansoriy">
                    <IconSend /> t.me/muslimansoriy
                  </a>
                  <a className="aqd-contact" href="https://empiregroup.uz">
                    <IconGlobe /> empiregroup.uz
                  </a>
                  <span className="aqd-contact">
                    <IconPin /> Toshkent
                  </span>
                </div>
              </div>
            </section>
          </div>

          {/* -------------------------------------------------------- Footer */}
          <footer className="aqd-footer">
            <div className="aqd-container">
              <div className="aqd-footer__grid">
                <div className="aqd-footer__brand">
                  <a className="aqd-logo" href="#top">
                    <span className="aqd-logo__mark">
                      <IconCode />
                    </span>
                    empire
                  </a>
                  <p>Toshkentdagi IT-jamoa. ERP, AI, Web va App yechimlari bilan biznesingizni raqamlashtiramiz.</p>
                </div>

                <div className="aqd-footer__cols">
                  <div>
                    <div className="aqd-footer__h">Xizmatlar</div>
                    <div className="aqd-footer__l">
                      <a href="#services">Dasturiy ta'minot</a>
                      <a href="#services">Odoo ERP</a>
                      <a href="#services">AI Automation</a>
                    </div>
                  </div>
                  <div>
                    <div className="aqd-footer__h">Kompaniya</div>
                    <div className="aqd-footer__l">
                      <a href="#cases">Loyihalar</a>
                      <a href="#process">Jarayon</a>
                      <a href="#quotes">Sharhlar</a>
                    </div>
                  </div>
                  <div>
                    <div className="aqd-footer__h">Aloqa</div>
                    <div className="aqd-footer__l">
                      <a href="tel:+998991164658">+998 99 116 46 58</a>
                      <a href="https://t.me/muslimansoriy">Telegram</a>
                      <a href="https://empiregroup.uz">empiregroup.uz</a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="aqd-footer__bottom">
                <span>© 2026 Empire Group</span>
                <span>Toshkent · O'zbekiston</span>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
