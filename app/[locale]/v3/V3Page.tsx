"use client";

import { useCallback, useEffect, useState } from "react";
import type { CSSProperties } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { toolLogos } from "@/content/logos";
import { v3Copy } from "@/content/v3";
import { locales, localeShort } from "@/content";
import { localePath, stripLocale } from "@/lib/locale-path";
import { useI18n } from "@/lib/i18n";

export type JournalPost = {
  slug: string;
  href: string;
  title: string;
  excerpt: string;
  category: string | null;
  date: string | null;
  cover: string | null;
};

/* ------------------------------------------------------------------ *
 *  Empire Group — v3 flagship homepage
 *  "Typeset terminal on white paper" — Vercel design system.
 *  Real Geist comes from the site's global next/font vars.
 *  All CSS lives in the single <style> block, scoped under .vx.
 *  Copy lives in content/v3 (uz/ru/en); only assets are declared here, so
 *  a picture and its caption can never drift apart across languages.
 * ------------------------------------------------------------------ */

/* ============================== ASSETS ============================== */

/* Real Empire client logos — same set the main site trust bar uses */
const CLIENTS: { src: string; alt: string; scale: number }[] = [
  { src: "/clients/Group.webp", alt: "Motor Lux", scale: 0.8 },
  { src: "/clients/Group-1.webp", alt: "MedFlow", scale: 1 },
  { src: "/clients/Group-2.webp", alt: "Grand Osiyo Textile", scale: 1.2 },
  { src: "/clients/Group-3.webp", alt: "Texnika Ijara", scale: 1.2 },
  { src: "/clients/Group-5.webp", alt: "GadgetSpace", scale: 1 },
  { src: "/clients/Group-4.webp", alt: "X Wear", scale: 0.8 },
  { src: "/clients/Group-6.webp", alt: "Hilol Market", scale: 1 },
  { src: "/clients/PrimeAcademy.png", alt: "Prime Academy", scale: 1 },
  { src: "/clients/DentaLife.webp", alt: "DentaLife", scale: 0.8 },
  { src: "/clients/Tamir24.webp", alt: "Tamir24", scale: 0.9 },
];

/* Real portfolio — desktop screenshots from /public/cases, in the same order
   as portfolio.items in the copy deck. */
const PROJECT_SHOTS: { img: string; url: string }[] = [
  { img: "/cases/case-autoservice-desktop.webp", url: "motorlux.uz" },
  { img: "/cases/case-medflow-desktop.webp", url: "medflow.uz" },
  { img: "/cases/case-textile-desktop.webp", url: "grandosiyo.uz" },
  { img: "/cases/case-texnika-desktop.webp", url: "texnika-ijara.uz" },
  { img: "/cases/case-gadgetspace-desktop.webp", url: "gadgetspace.uz" },
  { img: "/cases/case-xwear-desktop.webp", url: "xwear.uz" },
  { img: "/cases/case-kassa-desktop.webp", url: "hilolmarket.uz" },
];

/* Which logos to surface, in order */
const STACK_TITLES = [
  "React", "Next.js", "TypeScript", "JavaScript", "Node.js", "Python",
  "Flutter", "Tailwind CSS", "PostgreSQL", "Docker", "Supabase", "Git",
];
/* Team portraits, in the order content/v3 lists roles and bios. */
const TEAM_PEOPLE: { mono: string; name: string; img: string }[] = [
  { mono: "MA", name: "Muslim Ansoriy", img: "/team/muslim-ansoriy.webp" },
  { mono: "AJ", name: "Abbos Jo'rayev", img: "/team/abbos-jorayev.webp" },
  { mono: "SR", name: "Sardor Rahmatullayev", img: "/team/sardor-rahmatullayev.webp" },
  { mono: "DY", name: "Dilnoza Yusupova", img: "/team/dilnoza-yusupova.webp" },
  { mono: "JT", name: "Jasurbek Toshmatov", img: "/team/jasurbek-toshmatov.webp" },
  { mono: "NK", name: "Nilufar Karimova", img: "/team/nilufar-karimova.webp" },
  { mono: "BE", name: "Bekzod Ergashev", img: "/team/bekzod-ergashev.webp" },
  { mono: "MS", name: "Malika Sobirova", img: "/team/malika-sobirova.webp" },
];

/* Only credentials actually held. `scale` optically equalises two marks drawn
   at very different weights — the Odoo wordmark fills its box, the scanned
   registration certificate does not. */
const CREDENTIAL_MARKS: { img: string; scale: number }[] = [
  { img: "/sertifikat/odoo-learning-partner.svg", scale: 0.86 },
  { img: "/sertifikat/davlat-royxat-guvohnomasi.png", scale: 1.5 },
];

/* ============================ BRAND ============================ */

/**
 * The Empire symbol — three rising bars. It is the company's own mark, so it
 * doubles as the page's structural marker instead of the generic triangle
 * that stood in for it before.
 */
const Mark = ({ size = 12 }: { size?: number }) => (
  <svg
    width={(size * 595) / 429}
    height={size}
    viewBox="0 0 595 429"
    aria-hidden="true"
    fill="currentColor"
  >
    <path d="M231.381 0H60.7727L0.00195312 285.843H170.308L231.381 0Z" />
    <path d="M413.317 0H240.635L179.901 285.843H352.56L413.317 0Z" />
    <path d="M594.345 0H425.063L333.576 428.184H503.271L594.345 0Z" />
  </svg>
);

/* ============================ ICONS ============================ */

const Chevron = ({ size = 12 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" aria-hidden="true" fill="none">
    <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Arrow = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" aria-hidden="true" fill="none">
    <path d="M3 8h9M8.5 4l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const BrandGlyph = ({ path, title }: { path?: string; title: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" role="img" aria-label={title}>
    <path d={path} fill="currentColor" />
  </svg>
);

/* ======================== LANGUAGE SWITCHER ========================
   Three short codes rather than a dropdown: at three languages a menu costs
   an extra click to show what already fits, and each one is a real URL so
   the choice stays shareable. */

function LangSwitch({ label, className = "" }: { label: string; className?: string }) {
  const { locale } = useI18n();
  const pathname = usePathname();
  const bare = stripLocale(pathname || "/");

  return (
    <div className={`vx-lang ${className}`.trim()} role="group" aria-label={label}>
      {locales.map((l) => (
        <Link
          key={l}
          href={localePath(l, bare)}
          hrefLang={l}
          aria-current={l === locale ? "true" : undefined}
          className={`vx-lang-opt${l === locale ? " active" : ""}`}
        >
          {localeShort[l]}
        </Link>
      ))}
    </div>
  );
}

/* ============================ PAGE ============================ */

/** Projects shown before the reader asks for the rest. */
const PROJECTS_PREVIEW = 4;

export function V3Page({
  journal,
  blogHref,
}: {
  journal: JournalPost[];
  blogHref: string;
}) {
  const { locale } = useI18n();
  const t = v3Copy[locale];
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  const projects = t.portfolio.items.map((p, i) => ({ ...p, ...PROJECT_SHOTS[i] }));
  const team = TEAM_PEOPLE.map((p, i) => ({ ...p, ...t.team.members[i] }));
  const credentials = CREDENTIAL_MARKS.map((c, i) => ({ ...c, ...t.credentials.items[i] }));

  const stack = STACK_TITLES
    .map((title) => toolLogos.find((x) => x.title === title))
    .filter((x): x is (typeof toolLogos)[number] => Boolean(x && x.path));

  useEffect(() => {
    // Smooth in-page scrolling that accounts for the sticky nav.
    const html = document.documentElement;
    const prevBehavior = html.style.scrollBehavior;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduce) html.style.scrollBehavior = "smooth";

    const root = document.querySelector(".vx");
    if (!root) return;
    const els = Array.from(root.querySelectorAll<HTMLElement>(".vx-rise"));
    if (reduce) {
      els.forEach((e) => e.classList.add("in"));
      return () => {
        html.style.scrollBehavior = prevBehavior;
      };
    }
    // The fade only exists once JS is driving it. Server-rendered markup stays
    // fully opaque, so a failed hydration can never leave the page blank.
    root.classList.add("vx-ready");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("in");
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0, rootMargin: "0px 0px -6% 0px" }
    );
    els.forEach((e) => io.observe(e));
    // Reveal anything already in-view on mount so above-the-fold never sticks.
    const raf = requestAnimationFrame(() => {
      const vh = window.innerHeight;
      els.forEach((e) => {
        if (e.getBoundingClientRect().top < vh * 0.9) e.classList.add("in");
      });
    });
    // Last-resort net: whatever the observer missed becomes visible anyway.
    const failsafe = window.setTimeout(() => {
      els.forEach((e) => e.classList.add("in"));
    }, 4000);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      window.clearTimeout(failsafe);
      html.style.scrollBehavior = prevBehavior;
    };
  }, []);

  // Mobile drawer: lock the page behind it, close on Escape, and close when the
  // viewport grows past the breakpoint that hid the desktop links in the first place.
  useEffect(() => {
    if (!menuOpen) return;
    const { body } = document;
    const prevOverflow = body.style.overflow;
    body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    const mq = window.matchMedia("(min-width: 881px)");
    const onWide = () => mq.matches && setMenuOpen(false);
    document.addEventListener("keydown", onKey);
    mq.addEventListener("change", onWide);
    return () => {
      body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onWide);
    };
  }, [menuOpen]);

  // Newly revealed project cards need the observer treatment too.
  useEffect(() => {
    if (!showAllProjects) return;
    const raf = requestAnimationFrame(() => {
      document
        .querySelectorAll<HTMLElement>("#loyihalar .vx-rise")
        .forEach((e) => e.classList.add("in"));
    });
    return () => cancelAnimationFrame(raf);
  }, [showAllProjects]);

  const d = (i: number): CSSProperties =>
    ({ transitionDelay: `${i * 70}ms` } as CSSProperties);

  return (
    <div className="vx">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* ===================== NAV ===================== */}
      <header className="vx-nav">
        <div className="vx-nav-inner">
          <a className="vx-brand" href="#top" aria-label="Empire Group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="vx-wordmark"
              src="/logo/logotype-black.svg"
              alt="Empire Group"
              width={116}
              height={22}
            />
          </a>

          <nav className="vx-nav-links" aria-label={t.nav.menuLabel}>
            {t.nav.links.map(([label, href]) => (
              <a key={href} href={href} className="vx-navlink">
                {label}
              </a>
            ))}
          </nav>

          <div className="vx-nav-actions">
            <LangSwitch label={t.langLabel} className="vx-hide-menu" />
            <a className="vx-btn vx-btn-ghost vx-hide-sm" href="tel:+998991164658">
              +998 99 116 46 58
            </a>
            <a className="vx-btn vx-btn-filled vx-hide-menu" href="#cta">
              {t.nav.cta}
            </a>
            <button
              type="button"
              className="vx-burger"
              aria-label={menuOpen ? t.nav.closeMenu : t.nav.openMenu}
              aria-expanded={menuOpen}
              aria-controls="vx-mobile-menu"
              onClick={() => setMenuOpen((v) => !v)}
            >
              <span className={`vx-burger-box${menuOpen ? " open" : ""}`} aria-hidden="true">
                <span />
                <span />
              </span>
            </button>
          </div>
        </div>

        {/* mobile drawer — the nav links have nowhere else to go under 880px */}
        <div
          className={`vx-menu${menuOpen ? " open" : ""}`}
          id="vx-mobile-menu"
          inert={!menuOpen}
        >
          <nav className="vx-menu-links" aria-label={t.nav.menuLabel}>
            {t.nav.links.map(([label, href]) => (
              <a key={href} href={href} className="vx-menu-link" onClick={closeMenu}>
                {label}
                <Arrow size={14} />
              </a>
            ))}
          </nav>
          <div className="vx-menu-foot">
            <a className="vx-btn vx-btn-filled vx-btn-block" href="#cta" onClick={closeMenu}>
              {t.nav.cta}
            </a>
            <a className="vx-btn vx-btn-ghost vx-btn-block" href="tel:+998991164658">
              +998 99 116 46 58
            </a>
            <LangSwitch label={t.langLabel} />
          </div>
        </div>
      </header>
      <div
        className={`vx-scrim${menuOpen ? " open" : ""}`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      <main id="top">
        {/* ===================== HERO ===================== */}
        <section className="vx-hero" aria-labelledby="vx-hero-h">
          <div className="vx-grid-bg" aria-hidden="true" />
          <div className="vx-container vx-hero-grid">
            <div className="vx-hero-copy">
              <p className="vx-eyebrow vx-rise" style={d(0)}>
                <span className="vx-tri-eyebrow">
                  <Mark size={9} />
                </span>
                {t.hero.eyebrow}
              </p>

              <h1 id="vx-hero-h" className="vx-display vx-rise" style={d(1)}>
                {t.hero.titleBefore}
                <span className="vx-grad-word">
                  {t.hero.titleAccent}
                  <span className="vx-grad-underline" aria-hidden="true" />
                </span>
                {t.hero.titleAfter}
              </h1>

              <p className="vx-lede vx-rise" style={d(2)}>
                {t.hero.lede}
              </p>

              <div className="vx-hero-btns vx-rise" style={d(3)}>
                <a className="vx-btn vx-btn-filled" href="#cta">
                  {t.hero.primary}
                </a>
                <a className="vx-btn vx-btn-ghost" href="#loyihalar">
                  {t.hero.secondary} <Arrow size={14} />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* =============== STAT BAND + PROOF (real clients) =============== */}
        <section className="vx-section-tight">
          <div className="vx-container">
            <div className="vx-statband vx-rise">
              {t.stats.map(([num, label], i) => (
                <div className="vx-stat" key={label} style={d(i)}>
                  <div className="vx-stat-num">{num}</div>
                  <div className="vx-mono-label">{label}</div>
                </div>
              ))}
            </div>

            <div className="vx-proofwrap">
              <p className="vx-eyebrow vx-center vx-rise" id="vx-proof-h">
                {t.proofEyebrow}
              </p>
              <div
                className="vx-marquee vx-rise"
                role="group"
                aria-labelledby="vx-proof-h"
              >
                <div className="vx-marquee-track">
                  {[...CLIENTS, ...CLIENTS].map((c, i) => (
                    <div className="vx-marquee-slot" key={i}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={c.src}
                        alt={i < CLIENTS.length ? `${c.alt} logotipi` : ""}
                        aria-hidden={i >= CLIENTS.length}
                        loading="lazy"
                        draggable={false}
                        style={{ ["--s" as string]: c.scale } as CSSProperties}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================== SERVICES ===================== */}
        <section className="vx-section" id="xizmatlar">
          <div className="vx-container">
            <div className="vx-sec-head">
              <p className="vx-eyebrow vx-rise">{t.services.eyebrow}</p>
              <h2 className="vx-heading vx-rise" style={d(1)}>
                {t.services.title}
              </h2>
              <p className="vx-sub vx-rise" style={d(2)}>
                {t.services.sub}
              </p>
            </div>
            <div className="vx-services-grid">
              {t.services.items.map((s, i) => (
                <article className="vx-card vx-service vx-rise" key={s.title} style={d(i)}>
                  <div className="vx-service-top">
                    <span className="vx-mono-tag">{s.tag}</span>
                    <span className="vx-service-tri">
                      <Mark size={12} />
                    </span>
                  </div>
                  <h3 className="vx-card-title">{s.title}</h3>
                  <p className="vx-card-desc">{s.desc}</p>
                  <div className="vx-chips">
                    {s.chips.map((c) => (
                      <span className="vx-chip" key={c}>
                        {c}
                      </span>
                    ))}
                  </div>
                  <a className="vx-mono-link" href="#cta">
                    {t.services.more} <Arrow size={13} />
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ===================== PORTFOLIO ===================== */}
        <section className="vx-section" id="loyihalar">
          <div className="vx-container">
            <div className="vx-sec-head">
              <p className="vx-eyebrow vx-rise">{t.portfolio.eyebrow}</p>
              <h2 className="vx-heading vx-rise" style={d(1)}>
                {t.portfolio.title}
              </h2>
              <p className="vx-sub vx-rise" style={d(2)}>
                {t.portfolio.sub}
              </p>
            </div>
            <div className="vx-port-grid">
              {(showAllProjects ? projects : projects.slice(0, PROJECTS_PREVIEW)).map((p, i) => (
                <article className="vx-card vx-portcard vx-rise" key={p.title} style={d(i % 2)}>
                  <div className="vx-port-frame">
                    <div className="vx-port-chrome" aria-hidden="true">
                      <span className="vx-dot" />
                      <span className="vx-dot" />
                      <span className="vx-dot" />
                      <span className="vx-port-addr">{p.url}</span>
                    </div>
                    <div className="vx-port-shot">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={p.img} alt={`${p.title} — ekran ko'rinishi`} loading="lazy" />
                    </div>
                  </div>
                  <div className="vx-port-body">
                    <span className="vx-mono-tag vx-port-seg">{p.seg}</span>
                    <h3 className="vx-port-title">{p.title}</h3>
                    <p className="vx-port-result">
                      <span className="vx-li-check">✓</span> {t.portfolio.resultLabel}: {p.result}
                    </p>
                    {p.source && (
                      <p className="vx-port-source">— {p.source}</p>
                    )}
                    <div className="vx-chips">
                      {p.tags.map((t) => (
                        <span className="vx-chip" key={t}>
                          {t}
                        </span>
                      ))}
                    </div>
                    <a
                      className="vx-mono-link"
                      href={`https://${p.url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      ↗ {p.url}
                    </a>
                  </div>
                </article>
              ))}

              {/* The invitation closes the list, so it only belongs on the full grid. */}
              {showAllProjects && (
                <a className="vx-port-cta vx-rise in" href="#cta">
                  <span className="vx-port-cta-tri" aria-hidden="true">
                    <Mark size={16} />
                  </span>
                  <span className="vx-port-cta-title">{t.portfolio.ctaTitle}</span>
                  <span className="vx-card-desc">{t.portfolio.ctaDesc}</span>
                  <span className="vx-mono-link">
                    {t.portfolio.ctaLink} <Arrow size={13} />
                  </span>
                </a>
              )}
            </div>

            {!showAllProjects && (
              <div className="vx-more">
                <button
                  type="button"
                  className="vx-btn vx-btn-ghost"
                  onClick={() => setShowAllProjects(true)}
                >
                  {t.portfolio.showMore(projects.length - PROJECTS_PREVIEW)}
                  <Arrow size={14} />
                </button>
              </div>
            )}
          </div>
        </section>

        {/* ===================== STACK ===================== */}
        <section className="vx-section" id="stack">
          <div className="vx-container">
            <div className="vx-sec-head">
              <p className="vx-eyebrow vx-rise">{t.stack.eyebrow}</p>
              <h2 className="vx-heading vx-rise" style={d(1)}>
                {t.stack.title}
              </h2>
            </div>
            <div className="vx-tilegrid">
              {stack.map((tool, i) => (
                <div className="vx-card vx-tile vx-rise" key={tool.title} style={{ ...d(i % 6), ["--brand" as string]: tool.hex } as CSSProperties}>
                  <span className="vx-tile-ic">
                    <BrandGlyph path={tool.path} title={tool.title} />
                  </span>
                  <span className="vx-tile-name">{tool.title}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===================== PROCESS ===================== */}
        <section className="vx-section" id="jarayon">
          <div className="vx-container">
            <div className="vx-sec-head">
              <p className="vx-eyebrow vx-rise">{t.process.eyebrow}</p>
              <h2 className="vx-heading vx-rise" style={d(1)}>
                {t.process.title}
              </h2>
            </div>
            <div className="vx-process-grid">
              {t.process.steps.map((p, i) => (
                <article className="vx-card vx-proc vx-rise" key={p.title} style={d(i)}>
                  <div className="vx-proc-top">
                    <span className="vx-proc-tri">
                      <Mark size={11} />
                    </span>
                    {/* These four really are a sequence, so the number carries
                        information the reader needs. */}
                    <span className="vx-mono-tag">{`0${i + 1}`}</span>
                  </div>
                  <h3 className="vx-proc-title">{p.title}</h3>
                  <p className="vx-card-desc">{p.desc}</p>
                  <div className="vx-chips">
                    {p.tags.map((t) => (
                      <span className="vx-chip" key={t}>
                        {t}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ===================== TEAM ===================== */}
        <section className="vx-section" id="team">
          <div className="vx-container">
            <div className="vx-sec-head">
              <p className="vx-eyebrow vx-rise">{t.team.eyebrow}</p>
              <h2 className="vx-heading vx-rise" style={d(1)}>
                {t.team.title}
              </h2>
            </div>
            <div className="vx-team-grid">
              {team.map((m, i) => (
                <article className="vx-card vx-member vx-rise" key={m.name} style={d(i % 4)}>
                  {/* A face at card width, not a 46px chip — the section claims
                      there is a real team, so the photograph has to carry it. */}
                  <span className="vx-member-photo">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={m.img}
                      alt={m.name}
                      loading={i < 4 ? "eager" : "lazy"}
                      width={640}
                      height={640}
                    />
                  </span>
                  <span className="vx-member-body">
                    <h3 className="vx-member-name">{m.name}</h3>
                    <p className="vx-member-role">{m.role}</p>
                    <p className="vx-member-bio">{m.bio}</p>
                  </span>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ===================== TESTIMONIALS ===================== */}
        <section className="vx-section" id="sharhlar">
          <div className="vx-container">
            <div className="vx-sec-head">
              <p className="vx-eyebrow vx-rise">{t.testimonials.eyebrow}</p>
              <h2 className="vx-heading vx-rise" style={d(1)}>
                {t.testimonials.title}
              </h2>
            </div>
            <div className="vx-quote-grid">
              {t.testimonials.items.map((q, i) => (
                <figure className="vx-card vx-quote vx-rise" key={q.name} style={d(i % 2)}>
                  <span className="vx-quote-mark" aria-hidden="true">
                    <Mark size={12} />
                  </span>
                  <blockquote className="vx-quote-text">{q.quote}</blockquote>
                  {/* Full name, role and company — an attributable quote is the
                      only kind a B2B reader gives any weight to. */}
                  <figcaption className="vx-quote-cap">
                    <span className="vx-quote-name">{q.name}</span>
                    <span className="vx-mono-label">
                      {q.role} · {q.company}
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* ===================== CREDENTIALS ===================== */}
        <section className="vx-section" id="credentials">
          <div className="vx-container">
            <div className="vx-sec-head">
              <p className="vx-eyebrow vx-rise">{t.credentials.eyebrow}</p>
              <h2 className="vx-heading vx-rise" style={d(1)}>
                {t.credentials.title}
              </h2>
            </div>
            <div className="vx-cred-grid">
              {credentials.map((c, i) => (
                <article className="vx-card vx-cred vx-rise" key={c.title} style={d(i)}>
                  <div className="vx-cred-img">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={c.img}
                      alt={c.title}
                      loading="lazy"
                      style={{ ["--cs" as string]: c.scale } as CSSProperties}
                    />
                  </div>
                  <div className="vx-cred-body">
                    <h3 className="vx-cred-title">{c.title}</h3>
                    <p className="vx-mono-label vx-cred-org">{c.org}</p>
                    <p className="vx-card-desc vx-cred-note">{c.note}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ===================== JOURNAL =====================
            Sixteen articles are the strongest expertise signal on the
            property; the homepage was not linking to a single one. */}
        {journal.length > 0 && (
          <section className="vx-section" id="jurnal">
            <div className="vx-container">
              <div className="vx-sec-head vx-journal-head">
                <div>
                  <p className="vx-eyebrow vx-rise">{t.journal.eyebrow}</p>
                  <h2 className="vx-heading vx-rise" style={d(1)}>
                    {t.journal.title}
                  </h2>
                  <p className="vx-sub vx-rise" style={d(2)}>
                    {t.journal.sub}
                  </p>
                </div>
                <Link className="vx-btn vx-btn-ghost vx-rise vx-journal-all" href={blogHref} style={d(2)}>
                  {t.journal.allLabel} <Arrow size={14} />
                </Link>
              </div>

              <div className="vx-journal-grid">
                {journal.map((post, i) => (
                  <Link
                    className="vx-card vx-post vx-rise"
                    key={post.slug}
                    href={post.href}
                    style={d(i)}
                  >
                    {/* No cover means no cover block. Three identical grey
                        placeholders read worse than a clean text card. */}
                    {post.cover && (
                      <span className="vx-post-cover">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={post.cover} alt="" loading="lazy" />
                      </span>
                    )}
                    <span className="vx-post-body">
                      <span className="vx-mono-tag vx-post-meta">
                        {[post.category, post.date].filter(Boolean).join(" · ")}
                      </span>
                      <h3 className="vx-post-title">{post.title}</h3>
                      {post.excerpt && (
                        <span className="vx-post-excerpt">{post.excerpt}</span>
                      )}
                      <span className="vx-mono-link">
                        {t.journal.readLabel} <Arrow size={13} />
                      </span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ===================== FAQ ===================== */}
        <section className="vx-section" id="faq">
          <div className="vx-container vx-faq-wrap">
            <div className="vx-sec-head">
              <p className="vx-eyebrow vx-rise">{t.faq.eyebrow}</p>
              <h2 className="vx-heading vx-rise" style={d(1)}>
                {t.faq.title}
              </h2>
            </div>
            <div className="vx-faq">
              {t.faq.items.map((f, i) => {
                const isOpen = openFaq === i;
                return (
                  <div
                    className={`vx-card vx-faq-row vx-rise${isOpen ? " open" : ""}`}
                    key={f.q}
                    style={d(i % 4)}
                  >
                    <button
                      className="vx-faq-q"
                      id={`vx-faq-q-${i}`}
                      aria-expanded={isOpen}
                      aria-controls={`vx-faq-a-${i}`}
                      onClick={() => setOpenFaq(isOpen ? null : i)}
                    >
                      <span>{f.q}</span>
                      <span className="vx-faq-tri" aria-hidden="true">
                        <Chevron size={14} />
                      </span>
                    </button>
                    {/* `inert` keeps the collapsed copy out of the reading and tab
                        order without the display:none that would kill the transition. */}
                    <div
                      className="vx-faq-a"
                      id={`vx-faq-a-${i}`}
                      role="region"
                      aria-labelledby={`vx-faq-q-${i}`}
                      inert={!isOpen}
                    >
                      <p>{f.a}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ===================== FINAL CTA ===================== */}
        <section className="vx-section" id="cta">
          <div className="vx-container">
            <div className="vx-ctaband vx-rise">
              <p className="vx-eyebrow vx-center">{t.cta.eyebrow}</p>
              <h2 className="vx-heading vx-cta-h">{t.cta.title}</h2>
              <div className="vx-cta-btns">
                <a className="vx-btn vx-btn-filled vx-btn-lg" href="tel:+998991164658">
                  {t.cta.call}
                </a>
                <a
                  className="vx-btn vx-btn-ghost vx-btn-lg"
                  href="https://t.me/muslimansoriy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t.cta.telegram} <Arrow size={14} />
                </a>
              </div>
              <p className="vx-mono-label vx-cta-meta">{t.cta.meta}</p>
            </div>
          </div>
        </section>
      </main>

      {/* ===================== FOOTER ===================== */}
      <footer className="vx-footer" id="footer">
        <div className="vx-container vx-footer-grid">
          <div className="vx-footer-brand">
            <a className="vx-brand" href="#top" aria-label="Empire Group">
              <span className="vx-brand-mark">
                <Mark size={14} />
              </span>
              <span className="vx-brand-name">Empire</span>
            </a>
            <p className="vx-footer-desc">{t.footer.desc}</p>
          </div>

          <div className="vx-footer-col">
            <p className="vx-mono-label vx-footer-h">{t.footer.servicesHead}</p>
            {t.footer.services.map(([label, href]) => (
              <a key={label} href={href}>
                {label}
              </a>
            ))}
          </div>

          <div className="vx-footer-col">
            <p className="vx-mono-label vx-footer-h">{t.footer.companyHead}</p>
            {t.footer.company.map(([label, href]) =>
              // In-page anchors stay anchors; a real route has to carry the
              // locale prefix or a Russian reader lands on the Uzbek blog.
              href.startsWith("#") ? (
                <a key={href} href={href}>
                  {label}
                </a>
              ) : (
                <Link key={href} href={localePath(locale, href)}>
                  {label}
                </Link>
              )
            )}
          </div>

          <div className="vx-footer-col">
            <p className="vx-mono-label vx-footer-h">{t.footer.contactHead}</p>
            {t.footer.contact.map(([label, href]) => (
              <a
                key={href}
                href={href}
                {...(href.startsWith("http")
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
        <div className="vx-container vx-footer-bottom">
          <span className="vx-mono-label">{t.footer.rights}</span>
          <span className="vx-mono-label">{t.footer.place}</span>
        </div>
      </footer>
    </div>
  );
}

/* ============================== CSS ============================== */

const CSS = `
.vx{
  /* Neutrals run cool-free on purpose: this is a white-paper page, and every
     tier below --graphite is text, so each one clears WCAG AA (4.5:1) on
     --white. --smoke and --ash are decoration only (rules, dots, dashes). */
  --paper:#fafafa; --white:#ffffff; --hair:#ebebeb; --ash:#c9c9c9;
  --smoke:#a8a8a8; --graphite:#8a8a8a; --slate:#707070; --stone:#666666;
  --charcoal:#4d4d4d; --obsidian:#171717; --carbon:#000000;
  --green:#297a3a;
  --spectrum:linear-gradient(90deg,rgb(0,255,149) 0%,rgb(255,208,0) 25%,rgb(255,23,68) 50%,rgb(149,0,255) 75%,rgb(0,229,255) 100%);
  --sans:var(--font-geist-sans),ui-sans-serif,system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;
  --mono:var(--font-geist-mono),ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;
  --ring:0 0 0 1px rgba(0,0,0,.08),0 0 0 2px var(--paper);
  --ring-hover:0 0 0 1px var(--obsidian),0 0 0 2px var(--paper);
  --lift:translateY(-3px);
  --ease:cubic-bezier(0.16,1,0.3,1);
  min-height:100vh;
  background:var(--paper);
  color:var(--obsidian);
  font-family:var(--sans);
  -webkit-font-smoothing:antialiased;
  font-feature-settings:"rlig" 1,"ss11" 1,"calt" 0;
  letter-spacing:-0.01em;
}
.vx *{box-sizing:border-box;}
.vx a{color:inherit;text-decoration:none;}
.vx img{display:block;max-width:100%;}
.vx section[id]{scroll-margin-top:84px;}

/* ---------- reveal ----------
   Server-rendered markup is always opaque. The fade is switched on by the
   .vx-ready class the effect adds, so a hydration failure degrades to a
   visible page rather than a blank one. No will-change: dozens of promoted
   layers cost more than the transform they save. */
.vx .vx-rise{
  transform:translateY(18px);
  transition:opacity .6s var(--ease),transform .6s var(--ease);
}
.vx.vx-ready .vx-rise{opacity:0;}
.vx .vx-rise.in{transform:none;opacity:1;}

/* ---------- container / section ---------- */
.vx-container{max-width:1280px;margin:0 auto;padding:0 24px;width:100%;}
.vx-section{padding:96px 0;}
.vx-section-tight{padding:44px 0;}

/* ---------- eyebrow / mono labels ---------- */
.vx-eyebrow{
  font-family:var(--mono);
  font-size:11px;line-height:1.5;font-weight:400;
  letter-spacing:.071em;text-transform:uppercase;color:var(--obsidian);
  margin:0 0 20px;display:inline-flex;align-items:center;gap:8px;
}
.vx-tri-eyebrow{color:var(--carbon);display:inline-flex;}
.vx-center{display:flex;justify-content:center;text-align:center;width:100%;}
.vx-mono-label{
  font-family:var(--mono);font-size:11px;letter-spacing:.071em;
  text-transform:uppercase;color:var(--stone);line-height:1.5;
}
.vx-mono-xs{
  font-family:var(--mono);font-size:10px;letter-spacing:.07em;
  text-transform:uppercase;color:var(--smoke);
}
.vx-mono-tag{
  font-family:var(--mono);font-size:11px;letter-spacing:.08em;
  text-transform:uppercase;color:var(--stone);
}
.vx-mono-link{
  font-family:var(--mono);font-size:11px;letter-spacing:.08em;text-transform:uppercase;
  color:var(--obsidian);display:inline-flex;align-items:center;gap:6px;margin-top:auto;
  padding-top:6px;width:max-content;position:relative;
}
.vx-mono-link svg{transition:transform .25s ease;}
.vx-mono-link::after{
  content:"";position:absolute;left:0;bottom:0;height:1px;width:0;
  background:var(--obsidian);transition:width .3s var(--ease);
}
.vx-mono-link:hover::after{width:100%;}
.vx-mono-link:hover svg{transform:translateX(3px);}

/* ---------- headings ----------
   Tracking is set in em, not px: at the 31px mobile size a fixed -1.8px
   reads as a much tighter fit than it does at 36px. */
.vx-heading{
  font-family:var(--sans);font-size:36px;line-height:1.08;letter-spacing:-.05em;
  font-weight:450;color:var(--obsidian);margin:0;text-wrap:balance;
}
.vx-sub{
  font-family:var(--sans);font-size:16px;line-height:1.5;color:var(--stone);
  margin:18px 0 0;max-width:62ch;font-weight:400;text-wrap:pretty;
}
.vx-sec-head{margin-bottom:52px;max-width:660px;}
.vx-center-head{margin-left:auto;margin-right:auto;text-align:center;}
.vx-center-head .vx-eyebrow{justify-content:center;}
.vx-center-head .vx-sub{margin-left:auto;margin-right:auto;}

/* ---------- nav ---------- */
.vx-nav{
  position:sticky;top:0;z-index:50;height:64px;
  background:rgba(250,250,250,.72);
  backdrop-filter:saturate(180%) blur(20px);
  -webkit-backdrop-filter:saturate(180%) blur(20px);
}
.vx-nav-inner{
  max-width:1280px;margin:0 auto;padding:0 24px;height:64px;
  display:flex;align-items:center;justify-content:space-between;gap:16px;
}
.vx-brand{display:inline-flex;align-items:center;}
/* The wordmark is the real asset file, so a designer's update to the SVG
   reaches the site without touching this component. */
.vx-wordmark{height:22px;width:auto;display:block;}
.vx-footer .vx-wordmark{height:24px;}
.vx-nav-links{display:flex;align-items:center;gap:26px;}
.vx-navlink{
  font-family:var(--sans);font-size:14px;font-weight:400;color:var(--charcoal);
  position:relative;padding:4px 0;transition:color .2s ease;
}
.vx-navlink::after{
  content:"";position:absolute;left:0;bottom:0;height:1px;width:0;
  background:var(--obsidian);transition:width .28s var(--ease);
}
.vx-navlink:hover{color:var(--obsidian);}
.vx-navlink:hover::after{width:100%;}
.vx-nav-actions{display:flex;align-items:center;gap:10px;}

/* ---------- language ----------
   Three codes side by side rather than a dropdown: at this count the menu
   would hide what already fits, and every option is a real, shareable URL. */
.vx-lang{
  display:inline-flex;align-items:center;gap:2px;padding:2px;
  border-radius:8px;box-shadow:0 0 0 1px var(--hair);background:var(--white);
}
.vx-lang-opt{
  font-family:var(--mono);font-size:11px;letter-spacing:.06em;
  padding:5px 8px;border-radius:6px;color:var(--stone);line-height:1;
  transition:color .18s ease,background .18s ease;
}
.vx-lang-opt:hover{color:var(--obsidian);background:var(--paper);}
.vx-lang-opt.active{background:var(--obsidian);color:#fff;}
.vx-menu .vx-lang{width:100%;justify-content:center;}
.vx-menu .vx-lang-opt{flex:1;text-align:center;padding:9px 8px;}

/* ---------- mobile drawer ----------
   Two rules, not three: the burger appears exactly where .vx-nav-links
   disappears, so the links are never unreachable at any width. */
.vx-burger{
  display:none;width:38px;height:34px;padding:0;border:0;cursor:pointer;
  background:transparent;border-radius:6px;box-shadow:0 0 0 1px var(--hair);
  align-items:center;justify-content:center;transition:box-shadow .2s ease;
}
.vx-burger:hover{box-shadow:0 0 0 1px var(--obsidian);}
.vx-burger-box{position:relative;width:16px;height:11px;display:block;}
.vx-burger-box span{
  position:absolute;left:0;width:100%;height:1.5px;background:var(--obsidian);
  border-radius:2px;transition:transform .3s var(--ease),opacity .2s ease;
}
.vx-burger-box span:first-child{top:0;}
.vx-burger-box span:last-child{bottom:0;}
.vx-burger-box.open span:first-child{transform:translateY(4.75px) rotate(45deg);}
.vx-burger-box.open span:last-child{transform:translateY(-4.75px) rotate(-45deg);}

.vx-menu{
  display:none;
  position:absolute;left:0;right:0;top:64px;z-index:49;
  background:var(--white);border-top:1px solid var(--hair);
  box-shadow:0 24px 48px -24px rgba(0,0,0,.18);
  padding:14px 24px 22px;
  max-height:calc(100dvh - 64px);overflow-y:auto;
  opacity:0;transform:translateY(-8px);visibility:hidden;
  transition:opacity .22s ease,transform .26s var(--ease),visibility 0s linear .26s;
}
.vx-menu.open{opacity:1;transform:none;visibility:visible;transition-delay:0s;}
.vx-menu-links{display:flex;flex-direction:column;}
.vx-menu-link{
  display:flex;align-items:center;justify-content:space-between;
  font-family:var(--sans);font-size:17px;font-weight:450;letter-spacing:-.02em;
  color:var(--obsidian);padding:15px 2px;border-bottom:1px solid var(--hair);
}
.vx-menu-link svg{color:var(--ash);transition:transform .25s ease,color .2s ease;}
.vx-menu-link:hover svg{transform:translateX(3px);color:var(--obsidian);}
.vx-menu-foot{display:flex;flex-direction:column;gap:10px;margin-top:20px;}
.vx-scrim{
  display:none;
  position:fixed;inset:64px 0 0;z-index:40;background:rgba(23,23,23,.32);
  opacity:0;pointer-events:none;transition:opacity .24s ease;
}
.vx-scrim.open{opacity:1;pointer-events:auto;}

/* ---------- buttons ---------- */
.vx-btn{
  font-family:var(--sans);font-size:14px;font-weight:400;line-height:1;
  display:inline-flex;align-items:center;justify-content:center;gap:8px;
  border-radius:6px;padding:10px 16px;cursor:pointer;border:0;
  transition:transform .2s var(--ease),background .2s ease,box-shadow .2s ease,color .2s ease;
  white-space:nowrap;text-decoration:none;
}
.vx .vx-btn-filled{background:var(--obsidian);color:#fff;box-shadow:0 0 0 1px var(--obsidian);}
.vx .vx-btn-filled:hover{background:#000;transform:translateY(-2px);}
.vx .vx-btn-ghost{background:transparent;color:var(--charcoal);box-shadow:0 0 0 1px var(--hair);}
.vx .vx-btn-ghost:hover{color:var(--obsidian);box-shadow:0 0 0 1px var(--obsidian);transform:translateY(-2px);}
.vx-btn-block{width:100%;}
.vx-btn-lg{padding:13px 26px;font-size:15px;}
.vx-more{display:flex;justify-content:center;margin-top:28px;}

/* ---------- cards ----------
   Only cards that lead somewhere lift on hover; a static tile that rises
   under the cursor promises a click it can't honour. Everything else gets
   the border sharpening alone. */
.vx-card{
  background:var(--white);border-radius:6px;box-shadow:var(--ring);
  padding:20px;transition:transform .28s var(--ease),box-shadow .28s ease;
}
.vx-card:hover{box-shadow:var(--ring-hover);}
.vx-service:hover,.vx-portcard:hover{transform:var(--lift);}

/* ---------- hero ---------- */
.vx-hero{position:relative;padding:88px 0 72px;overflow:hidden;}
.vx-grid-bg{
  position:absolute;inset:0;pointer-events:none;z-index:0;
  background-image:linear-gradient(var(--hair) 1px,transparent 1px),linear-gradient(90deg,var(--hair) 1px,transparent 1px);
  background-size:64px 64px;
  -webkit-mask-image:radial-gradient(110% 95% at 50% 0%,#000 0%,transparent 72%);
  mask-image:radial-gradient(110% 95% at 50% 0%,#000 0%,transparent 72%);
  opacity:.6;
}
/* With the mock gone the hero is a single centred column — a left-aligned
   half-width block would leave the right side visibly empty. */
.vx-hero-grid{position:relative;z-index:1;}
.vx-hero-copy{
  max-width:860px;margin:0 auto;text-align:center;
  display:flex;flex-direction:column;align-items:center;
}
.vx-hero-copy .vx-lede{max-width:620px;}
.vx-hero-copy .vx-hero-btns{justify-content:center;}
.vx-display{
  font-family:var(--sans);font-size:72px;line-height:1.02;letter-spacing:-.055em;
  font-weight:450;color:var(--obsidian);margin:0 0 24px;text-wrap:balance;
}
.vx-grad-word{position:relative;display:inline-block;white-space:nowrap;}
.vx-grad-underline{
  position:absolute;left:0;right:0;bottom:-2px;height:5px;border-radius:3px;
  background:var(--spectrum);background-size:200% 100%;
  animation:vx-sweep 5s linear infinite;
}
@keyframes vx-sweep{0%{background-position:0% 0%;}100%{background-position:200% 0%;}}
.vx-lede{
  font-family:var(--sans);font-size:16px;line-height:1.5;color:var(--charcoal);
  margin:0 0 28px;max-width:520px;font-weight:400;text-wrap:pretty;
}
.vx-hero-btns{display:flex;gap:12px;flex-wrap:wrap;}

/* ---------- browser chrome dots (portfolio frames) ---------- */
.vx-dot{width:9px;height:9px;border-radius:50%;background:var(--hair);box-shadow:0 0 0 1px rgba(0,0,0,.05);flex-shrink:0;}

/* ---------- stat band ---------- */
.vx-statband{display:grid;grid-template-columns:repeat(4,1fr);background:var(--white);border-radius:6px;box-shadow:var(--ring);overflow:hidden;}
.vx-stat{padding:28px 24px;border-right:1px solid var(--hair);}
.vx-stat:last-child{border-right:0;}
.vx-stat-num{font-family:var(--sans);font-size:34px;font-weight:450;letter-spacing:-.05em;color:var(--obsidian);margin-bottom:6px;line-height:1;font-variant-numeric:tabular-nums;}

/* ---------- proof marquee (real client logos, like main site) ---------- */
.vx-proofwrap{margin-top:44px;}
.vx-marquee{
  margin-top:22px;overflow:hidden;
  -webkit-mask-image:linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent);
  mask-image:linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent);
}
.vx-marquee-track{
  display:flex;width:max-content;align-items:center;
  animation:vx-scroll 54s linear infinite;
}
.vx-marquee:hover .vx-marquee-track{animation-play-state:paused;}
/* The slot is the gutter. --s used to scale a logo *past* max-width, so a
   1.2 mark rendered 158px inside a 150px slot and collided with its
   neighbours; the cap now applies after the optical scale. */
.vx-marquee-slot{
  flex:0 0 auto;width:184px;height:64px;
  display:flex;align-items:center;justify-content:center;
}
.vx-marquee-slot img{
  max-height:calc(28px * var(--s,1));max-width:calc(120px * var(--s,1));
  width:auto;object-fit:contain;
  filter:grayscale(1);opacity:.55;
  transition:filter .3s ease,opacity .3s ease;
}
.vx-marquee-slot img:hover{filter:grayscale(0);opacity:1;}
@keyframes vx-scroll{from{transform:translateX(0);}to{transform:translateX(-50%);}}

/* ---------- services ---------- */
.vx-services-grid{display:grid;grid-template-columns:1fr 1fr;gap:20px;}
.vx-service{display:flex;flex-direction:column;padding:28px;min-height:100%;}
.vx-service-top{display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;}
.vx-service-tri{color:var(--carbon);opacity:.9;display:inline-flex;}
.vx-card-title{font-family:var(--sans);font-size:20px;font-weight:450;letter-spacing:-.03em;color:var(--obsidian);margin:0 0 10px;text-wrap:balance;}
.vx-card-desc{font-family:var(--sans);font-size:15px;line-height:1.5;color:var(--charcoal);margin:0 0 18px;text-wrap:pretty;}
.vx-chips{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:18px;}
.vx-chip{
  font-family:var(--mono);font-size:11px;letter-spacing:.04em;color:var(--stone);
  padding:5px 10px;border-radius:6px;box-shadow:0 0 0 1px var(--hair);background:var(--paper);
}

/* ---------- portfolio ---------- */
.vx-port-grid{display:grid;grid-template-columns:1fr 1fr;gap:20px;}
.vx-portcard{display:flex;flex-direction:column;padding:0;overflow:hidden;}
.vx-port-frame{border-bottom:1px solid var(--hair);background:var(--paper);overflow:hidden;}
.vx-port-chrome{display:flex;align-items:center;gap:6px;padding:9px 12px;border-bottom:1px solid var(--hair);background:var(--white);}
.vx-port-addr{
  font-family:var(--mono);font-size:10px;letter-spacing:.05em;color:var(--stone);
  margin-left:8px;background:var(--paper);padding:3px 10px;border-radius:9999px;
  box-shadow:0 0 0 1px var(--hair);
}
/* The captures are 1920x1080. A 16/10 frame cropped ~5% off both sides and
   sliced the app chrome, so the frame matches the asset instead. */
.vx-port-shot{aspect-ratio:16/9;overflow:hidden;}
.vx-port-shot img{width:100%;height:100%;object-fit:cover;object-position:top center;transition:transform .45s var(--ease);}
.vx-portcard:hover .vx-port-shot img{transform:scale(1.03);}
.vx-port-body{padding:20px 22px 22px;display:flex;flex-direction:column;flex:1;}
.vx-port-seg{margin-bottom:10px;color:var(--slate);}
.vx-port-title{font-family:var(--sans);font-size:20px;font-weight:450;letter-spacing:-.03em;color:var(--obsidian);margin:0 0 10px;line-height:1.25;text-wrap:balance;}
.vx-port-result{font-family:var(--mono);font-size:12px;letter-spacing:.02em;color:var(--charcoal);margin:0 0 16px;display:flex;align-items:baseline;gap:7px;line-height:1.45;}
.vx-port-body .vx-chips{margin-bottom:16px;}
.vx-li-check{color:var(--green);font-weight:600;flex-shrink:0;}
/* Who said it. Set quietly — the claim is the message, the name is the warrant. */
.vx-port-source{
  font-family:var(--sans);font-size:13px;line-height:1.4;color:var(--stone);
  margin:-8px 0 16px;
}
.vx-port-cta{
  display:flex;flex-direction:column;justify-content:center;gap:12px;
  padding:28px;border-radius:6px;background:transparent;
  border:1.5px dashed var(--ash);
  transition:border-color .28s ease,transform .28s var(--ease),background .28s ease;
}
.vx-port-cta:hover{border-color:var(--obsidian);transform:var(--lift);background:var(--white);}
.vx-port-cta-tri{color:var(--carbon);display:inline-flex;}
.vx-port-cta-title{font-family:var(--sans);font-size:20px;font-weight:450;letter-spacing:-.03em;color:var(--obsidian);}
.vx-port-cta .vx-card-desc{margin:0;}
.vx-port-cta .vx-mono-link{margin-top:0;}

/* ---------- tiles (stack / partners) ---------- */
.vx-tilegrid{display:grid;grid-template-columns:repeat(6,1fr);gap:14px;}
.vx-tile{display:flex;flex-direction:column;align-items:center;gap:12px;padding:22px 14px;text-align:center;}
.vx-tile-ic{
  width:44px;height:44px;border-radius:6px;box-shadow:0 0 0 1px var(--hair);
  display:flex;align-items:center;justify-content:center;background:var(--paper);
  color:var(--graphite);
  transition:color .22s ease,background .22s ease,box-shadow .22s ease;
}
.vx-tile-ic svg{width:24px;height:24px;}
.vx-tile:hover .vx-tile-ic{color:var(--brand,var(--obsidian));box-shadow:0 0 0 1px var(--brand,var(--ash));}
.vx-tile-name{font-family:var(--mono);font-size:11px;letter-spacing:.05em;color:var(--stone);text-transform:uppercase;}

/* ---------- process ---------- */
.vx-process-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;}
.vx-proc{display:flex;flex-direction:column;padding:24px;}
.vx-proc-top{display:flex;align-items:center;gap:10px;margin-bottom:18px;}
.vx-proc-tri{color:var(--carbon);display:inline-flex;}
.vx-proc-title{font-family:var(--sans);font-size:20px;font-weight:450;letter-spacing:-.02em;color:var(--obsidian);margin:0 0 8px;}

/* ---------- team ----------
   Portraits sit in the page's monochrome by default and come to colour on
   hover — the same grayscale-to-brand move the client logo row uses. */
.vx-team-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;}
.vx-member{display:flex;flex-direction:column;padding:0;overflow:hidden;}
.vx-member-photo{
  display:block;aspect-ratio:1/1;overflow:hidden;background:var(--paper);
  border-bottom:1px solid var(--hair);
}
.vx-member-photo img{
  width:100%;height:100%;object-fit:cover;object-position:center top;
  filter:grayscale(1) contrast(1.03);
  transition:filter .35s ease,transform .5s var(--ease);
}
.vx-member:hover .vx-member-photo img{filter:none;transform:scale(1.02);}
.vx-member-body{display:flex;flex-direction:column;flex:1;padding:18px 20px 20px;}
.vx-member-name{font-family:var(--sans);font-size:16px;font-weight:500;letter-spacing:-.02em;color:var(--obsidian);margin:0 0 6px;}
.vx-member-role{font-family:var(--mono);font-size:10px;letter-spacing:.06em;text-transform:uppercase;color:var(--slate);margin:0 0 12px;line-height:1.5;}
.vx-member-bio{font-family:var(--sans);font-size:13px;line-height:1.5;color:var(--charcoal);margin:0;text-wrap:pretty;}

/* ---------- testimonials ---------- */
.vx-quote-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px;}
.vx-quote{display:flex;flex-direction:column;padding:26px;}
.vx-quote-mark{color:var(--carbon);margin-bottom:16px;display:inline-flex;}
.vx-quote-text{font-family:var(--sans);font-size:18px;line-height:1.45;letter-spacing:-.02em;color:var(--obsidian);margin:0 0 20px;font-weight:400;}
.vx-quote-cap{display:flex;flex-direction:column;gap:4px;margin-top:auto;}
.vx-quote-name{font-family:var(--sans);font-size:14px;font-weight:500;color:var(--obsidian);}

/* ---------- credentials ----------
   Two documents we actually hold, each with room to say what it lets a buyer
   rely on. A wall of badges answers nothing; two explained ones do.
   --cs optically equalises marks drawn at very different weights. */
.vx-cred-grid{display:grid;grid-template-columns:1fr 1fr;gap:20px;}
.vx-cred{display:grid;grid-template-columns:132px minmax(0,1fr);gap:20px;padding:24px;align-items:start;}
.vx-cred-img{
  height:112px;display:flex;align-items:center;justify-content:center;
  background:var(--white);box-shadow:0 0 0 1px var(--hair);border-radius:6px;
  padding:12px;overflow:hidden;
}
.vx-cred-img img{
  max-height:min(100%,calc(58px * var(--cs,1)));
  max-width:min(100%,calc(80% * var(--cs,1)));
  object-fit:contain;
}
.vx-cred-body{display:flex;flex-direction:column;min-width:0;}
.vx-cred-title{font-family:var(--sans);font-size:17px;font-weight:500;letter-spacing:-.02em;color:var(--obsidian);margin:0 0 6px;line-height:1.3;text-wrap:balance;}
.vx-cred-org{margin-bottom:10px;}
.vx-cred-note{font-size:14px;margin:0;color:var(--stone);}

/* ---------- journal ---------- */
.vx-journal-head{
  display:flex;align-items:flex-end;justify-content:space-between;gap:24px;
  max-width:none;
}
.vx-journal-head > div{max-width:660px;}
.vx-journal-all{flex-shrink:0;}
.vx-journal-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;}
.vx-post{display:flex;flex-direction:column;padding:0;overflow:hidden;}
.vx-post:hover{transform:var(--lift);}
.vx-post-cover{
  display:block;aspect-ratio:16/9;overflow:hidden;background:var(--paper);
  border-bottom:1px solid var(--hair);
}
.vx-post-cover img{width:100%;height:100%;object-fit:cover;transition:transform .45s var(--ease);}
.vx-post:hover .vx-post-cover img{transform:scale(1.03);}
.vx-post-body{display:flex;flex-direction:column;flex:1;padding:24px 24px 26px;}
/* A card with no cover leans on type instead — bigger headline, more air. */
.vx-post:not(:has(.vx-post-cover)) .vx-post-title{font-size:20px;}
.vx-post:not(:has(.vx-post-cover)) .vx-post-body{padding:28px 26px;}
.vx-post-meta{display:block;margin-bottom:10px;color:var(--slate);}
.vx-post-title{
  font-family:var(--sans);font-size:18px;font-weight:450;letter-spacing:-.025em;
  color:var(--obsidian);margin:0 0 10px;line-height:1.3;text-wrap:balance;
}
.vx-post-excerpt{
  font-family:var(--sans);font-size:14px;line-height:1.5;color:var(--charcoal);
  margin-bottom:18px;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;
  overflow:hidden;text-wrap:pretty;
}

/* ---------- faq ---------- */
.vx-faq-wrap{max-width:820px;}
.vx-faq{display:flex;flex-direction:column;gap:10px;}
.vx-faq-row{padding:0;overflow:hidden;}
.vx-faq-row:hover{transform:none;box-shadow:var(--ring);}
.vx-faq-q{
  width:100%;background:transparent;border:0;cursor:pointer;
  display:flex;align-items:center;justify-content:space-between;gap:16px;
  padding:20px 22px;text-align:left;
  font-family:var(--sans);font-size:16px;font-weight:450;letter-spacing:-.01em;color:var(--obsidian);
}
.vx-faq-tri{color:var(--carbon);display:inline-flex;transition:transform .3s var(--ease);flex-shrink:0;}
.vx-faq-row.open .vx-faq-tri{transform:rotate(180deg);}
.vx-faq-a{max-height:0;opacity:0;transition:max-height .34s var(--ease),opacity .3s ease;}
/* Generous enough that the longest answer can never be clipped on a 360px
   screen; max-height only has to exceed the content, not match it. */
.vx-faq-row.open .vx-faq-a{max-height:520px;opacity:1;}
.vx-faq-a p{margin:0;padding:0 22px 22px;font-family:var(--sans);font-size:15px;line-height:1.55;color:var(--charcoal);max-width:680px;}

/* ---------- final cta ---------- */
.vx-ctaband{
  background:var(--white);border-radius:6px;box-shadow:var(--ring);
  padding:72px 40px;text-align:center;display:flex;flex-direction:column;align-items:center;
  position:relative;overflow:hidden;
}
.vx-ctaband:hover{transform:none;box-shadow:var(--ring);}
.vx-ctaband::before{
  content:"";position:absolute;left:0;right:0;top:0;height:3px;
  background:var(--spectrum);background-size:200% 100%;animation:vx-sweep 5s linear infinite;
}
.vx-cta-h{font-size:40px;letter-spacing:-.045em;margin:14px 0 28px;line-height:1.02;max-width:640px;}
.vx-cta-btns{display:flex;gap:12px;flex-wrap:wrap;justify-content:center;margin-bottom:24px;}
.vx-cta-meta{color:var(--stone);}

/* ---------- footer ---------- */
.vx-footer{padding:64px 0 40px;}
.vx-footer-grid{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:32px;padding-bottom:40px;}
.vx-footer-desc{font-family:var(--sans);font-size:14px;line-height:1.55;color:var(--stone);margin:16px 0 0;max-width:320px;}
.vx-footer-col{display:flex;flex-direction:column;gap:12px;}
.vx-footer-h{margin-bottom:4px;color:var(--obsidian);}
.vx-footer-col a{font-family:var(--sans);font-size:14px;color:var(--charcoal);width:max-content;position:relative;transition:color .2s ease;}
.vx-footer-col a::after{content:"";position:absolute;left:0;bottom:-2px;height:1px;width:0;background:var(--obsidian);transition:width .28s var(--ease);}
.vx-footer-col a:hover{color:var(--obsidian);}
.vx-footer-col a:hover::after{width:100%;}
.vx-footer-bottom{display:flex;align-items:center;justify-content:space-between;gap:16px;padding-top:28px;border-top:1px solid var(--hair);flex-wrap:wrap;}

/* ---------- focus ---------- */
.vx a:focus-visible,.vx button:focus-visible{
  outline:2px solid var(--obsidian);outline-offset:3px;border-radius:4px;
}

/* ---------- responsive ---------- */
@media (max-width:1000px){
  .vx-tilegrid{grid-template-columns:repeat(4,1fr);}
  .vx-process-grid{grid-template-columns:repeat(2,1fr);}
  .vx-team-grid{grid-template-columns:repeat(2,1fr);}
  .vx-cred-grid{grid-template-columns:1fr;}
  .vx-journal-grid{grid-template-columns:repeat(2,1fr);}
  .vx-journal-grid .vx-post:last-child{display:none;}
  .vx-display{font-size:56px;}
}
@media (max-width:880px){
  /* The desktop links go away and the drawer takes over in the same rule,
     so there is no width at which the navigation is unreachable. */
  .vx-nav-links{display:none;}
  .vx-hide-menu{display:none;}
  .vx-burger{display:inline-flex;}
  .vx-menu{display:block;}
  .vx-scrim{display:block;}
  .vx-display{font-size:44px;}
  .vx-hero{padding:64px 0 72px;}
  .vx-journal-head{flex-direction:column;align-items:flex-start;gap:20px;}
  .vx-services-grid{grid-template-columns:1fr;}
  .vx-port-grid{grid-template-columns:1fr;}
  .vx-quote-grid{grid-template-columns:1fr;}
  .vx-footer-grid{grid-template-columns:1fr 1fr;}
  .vx-section{padding:64px 0;}
}
@media (max-width:640px){
  .vx-hide-sm{display:none;}
  .vx-cta-btns{flex-direction:column;align-self:stretch;}
  .vx-cta-btns .vx-btn{width:100%;}
  .vx-statband{grid-template-columns:1fr 1fr;}
  .vx-stat:nth-child(2){border-right:0;}
  .vx-stat:nth-child(1),.vx-stat:nth-child(2){border-bottom:1px solid var(--hair);}
  .vx-tilegrid{grid-template-columns:repeat(3,1fr);}
  .vx-process-grid,.vx-cred-grid{grid-template-columns:1fr;}
  .vx-team-grid{grid-template-columns:1fr 1fr;}
  .vx-journal-grid{grid-template-columns:1fr;}
  .vx-journal-grid .vx-post:last-child{display:flex;}
  .vx-cred{grid-template-columns:96px minmax(0,1fr);gap:16px;}
  .vx-cred-img{height:88px;}
  .vx-display{font-size:38px;}
  .vx-heading{font-size:31px;}
  .vx-cta-h{font-size:30px;}
  .vx-footer-grid{grid-template-columns:1fr;}
  .vx-ctaband{padding:48px 22px;}
  .vx-container{padding:0 18px;}
}

/* ---------- reduced motion ---------- */
@media (prefers-reduced-motion:reduce){
  .vx .vx-rise,.vx.vx-ready .vx-rise{transform:none;transition:none;opacity:1;}
  .vx *{animation:none!important;}
  .vx-grad-underline{background:var(--spectrum);}
  .vx-btn:hover,.vx-card:hover,.vx-service:hover,.vx-portcard:hover,
  .vx-portcard:hover .vx-port-shot img,.vx-port-cta:hover{transform:none;}
  .vx-menu{transition:none;}
}
`;
