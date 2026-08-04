"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { homeCopy, CONTACT } from "@/content/home";
import { locales, localeShort } from "@/content";
import { localePath, stripLocale } from "@/lib/locale-path";
import { useI18n } from "@/lib/i18n";
import { HomeForm } from "./HomeForm";
import type { JournalPost } from "./HomePage";

/* ------------------------------------------------------------------ *
 *  Empire Group — homepage, second pass (.nx)
 *
 *  The first pass was sound per component and monotonous per page: sixteen
 *  sections, sixty cards, one shape repeated. This rebuild keeps the copy
 *  untouched and changes the composition:
 *
 *   · eleven chapters instead of sixteen sections
 *   · three surface tiers, so elevation means "you can click this"
 *   · full-bleed grounds that alternate, plus one dark chapter as the climax
 *   · an eight-step type scale (was fifteen sizes) and mono demoted back to
 *     eyebrows and data
 *   · motion on chapter openings only, not on all eighty-five elements
 * ------------------------------------------------------------------ */

/* ============================== ASSETS ============================== */

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

/* Desktop capture + the phone capture from the same project, so the hero
   shows the actual product rather than a drawing of one. */
const HERO_SHOT = {
  desktop: "/cases/case-autoservice-desktop.webp",
  phone: "/cases/case-kassa-mobile.webp",
  url: "motorlux.uz",
};

const PROJECT_SHOTS: { img: string; url: string }[] = [
  { img: "/cases/case-autoservice-desktop.webp", url: "motorlux.uz" },
  { img: "/cases/case-medflow-desktop.webp", url: "medflow.uz" },
  { img: "/cases/case-textile-desktop.webp", url: "grandosiyo.uz" },
  { img: "/cases/case-texnika-desktop.webp", url: "texnika-ijara.uz" },
  { img: "/cases/case-gadgetspace-desktop.webp", url: "gadgetspace.uz" },
  { img: "/cases/case-xwear-desktop.webp", url: "xwear.uz" },
  { img: "/cases/case-kassa-desktop.webp", url: "hilolmarket.uz" },
];

const TEAM_PEOPLE: { name: string; img: string }[] = [
  { name: "Muslim Ansoriy", img: "/team/muslim-ansoriy.webp" },
  { name: "Abbos Jo'rayev", img: "/team/abbos-jorayev.webp" },
  { name: "Sardor Rahmatullayev", img: "/team/sardor-rahmatullayev.webp" },
  { name: "Dilnoza Yusupova", img: "/team/dilnoza-yusupova.webp" },
  { name: "Jasurbek Toshmatov", img: "/team/jasurbek-toshmatov.webp" },
  { name: "Nilufar Karimova", img: "/team/nilufar-karimova.webp" },
  { name: "Bekzod Ergashev", img: "/team/bekzod-ergashev.webp" },
  { name: "Malika Sobirova", img: "/team/malika-sobirova.webp" },
];

const OFFICE_PHOTOS = [
  "/office/office-01.webp",
  "/office/office-04.webp",
  "/office/office-03.webp",
];

const CREDENTIAL_MARKS: { img: string; scale: number }[] = [
  { img: "/sertifikat/odoo-learning-partner.svg", scale: 0.9 },
  { img: "/sertifikat/davlat-royxat-guvohnomasi.png", scale: 1.5 },
  { img: "/sertifikat/it-park.svg", scale: 1 },
  { img: "/sertifikat/iso-27001.svg", scale: 1.4 },
];

/* Client marks beside each quote — a logo makes a testimonial checkable. */
const QUOTE_LOGOS = [
  "/clients/Group-2.webp",
  "/clients/Group-1.webp",
  "/clients/Group-3.webp",
  "/clients/Group.webp",
];

/* Tech names folded into the services chapter — the twelve-tile logo wall it
   replaces cost a full screen and told a factory director nothing. */
const STACK_LINE = [
  "React", "Next.js", "TypeScript", "Node.js", "Python", "Flutter",
  "PostgreSQL", "Docker", "Odoo", "Supabase",
];

/* ============================== BRAND ============================== */

const Mark = ({ size = 11 }: { size?: number }) => (
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

const Arrow = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" aria-hidden="true" fill="none">
    <path d="M3 8h9M8.5 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Chevron = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" aria-hidden="true" fill="none">
    <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ========================= CHROME ========================= */

function ThemeSwitch({ label }: { label: string }) {
  const [theme, setTheme] = useState<"light" | "dark" | null>(null);

  useEffect(() => {
    setTheme(document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light");
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* private mode — still works for this session */
    }
    setTheme(next);
  };

  return (
    <button type="button" className="nx-icon-btn" onClick={toggle} aria-label={label} title={label}>
      {theme === null ? null : theme === "dark" ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.6" />
          <path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M19.1 4.9l-1.8 1.8M6.7 17.3l-1.8 1.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M20 14.2A8.2 8.2 0 1 1 9.8 4a6.6 6.6 0 0 0 10.2 10.2Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        </svg>
      )}
    </button>
  );
}

function LangSwitch({ label, className = "" }: { label: string; className?: string }) {
  const { locale } = useI18n();
  const pathname = usePathname();
  const bare = stripLocale(pathname || "/");

  return (
    <div className={`nx-lang ${className}`.trim()} role="group" aria-label={label}>
      {locales.map((l) => (
        <Link
          key={l}
          href={localePath(l, bare)}
          hrefLang={l}
          aria-current={l === locale ? "true" : undefined}
          className={`nx-lang-opt${l === locale ? " active" : ""}`}
        >
          {localeShort[l]}
        </Link>
      ))}
    </div>
  );
}

/* ============================== PAGE ============================== */

const PROJECTS_PREVIEW = 4;

/** Chapters the nav tracks. Order matters — it drives the active marker. */
const NAV_IDS = ["xizmatlar", "ishlar", "keys", "jamoa", "narxlar", "jurnal"] as const;

export function HomeNext({
  journal,
  blogHref,
}: {
  journal: JournalPost[];
  blogHref: string;
}) {
  const { locale } = useI18n();
  const t = homeCopy[locale];

  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [track, setTrack] = useState<"software" | "odoo">("software");
  const [active, setActive] = useState<string>("");
  const progressRef = useRef<HTMLDivElement>(null);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  const projects = t.portfolio.items.map((p, i) => ({ ...p, ...PROJECT_SHOTS[i] }));
  const team = TEAM_PEOPLE.map((p, i) => ({ ...p, ...t.team.members[i] }));
  const credentials = CREDENTIAL_MARKS.map((c, i) => ({ ...c, ...t.credentials.items[i] }));

  /* Chapter openings reveal; nothing else does. Motion applied to every
     element stops reading as motion by the third screen. */
  useEffect(() => {
    const root = document.querySelector(".nx");
    if (!root) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const els = Array.from(root.querySelectorAll<HTMLElement>(".nx-in"));
    if (reduce) {
      els.forEach((e) => e.classList.add("shown"));
      return;
    }
    root.classList.add("nx-ready");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("shown");
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0, rootMargin: "0px 0px -8% 0px" }
    );
    els.forEach((e) => io.observe(e));
    const raf = requestAnimationFrame(() => {
      const vh = window.innerHeight;
      els.forEach((e) => {
        if (e.getBoundingClientRect().top < vh * 0.92) e.classList.add("shown");
      });
    });
    // Failsafe: whatever the observer misses becomes visible anyway.
    const net = window.setTimeout(() => els.forEach((e) => e.classList.add("shown")), 4000);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      window.clearTimeout(net);
    };
  }, []);

  /* Scroll progress + which chapter the reader is in. On a page this tall,
     "where am I" is a real question and the nav should answer it. */
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const pct = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${pct})`;

      let current = "";
      for (const id of NAV_IDS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 140) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const { body } = document;
    const prev = body.style.overflow;
    body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    const mq = window.matchMedia("(min-width: 921px)");
    const onWide = () => mq.matches && setMenuOpen(false);
    document.addEventListener("keydown", onKey);
    mq.addEventListener("change", onWide);
    return () => {
      body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onWide);
    };
  }, [menuOpen]);

  /* Eyebrows are set in caps for the page; a nav of six shouting words is a
     wall. Sentence-case them — works the same in uz, ru and en. */
  const cap = (s: string) => s.charAt(0) + s.slice(1).toLocaleLowerCase(locale);
  const NAV_LINKS: [string, string][] = [
    [cap(t.services.eyebrow), "#xizmatlar"],
    [cap(t.portfolio.eyebrow), "#ishlar"],
    [t.caseStudy.client, "#keys"],
    [cap(t.team.eyebrow), "#jamoa"],
    [cap(t.pricing.eyebrow), "#narxlar"],
    [cap(t.journal.eyebrow), "#jurnal"],
  ];

  return (
    <div className="nx">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* ===================== NAV ===================== */}
      <header className="nx-nav">
        <div className="nx-nav-inner">
          <a className="nx-brand" href="#top" aria-label="Empire Group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="nx-wordmark nx-light-only" src="/logo/logotype-black.svg" alt="" width={112} height={21} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="nx-wordmark nx-dark-only" src="/logo/logotype-whote.svg" alt="" width={112} height={21} />
          </a>

          <nav className="nx-nav-links" aria-label={t.nav.menuLabel}>
            {NAV_LINKS.map(([label, href]) => {
              const id = href.slice(1);
              return (
                <a
                  key={href}
                  href={href}
                  className={`nx-navlink${active === id ? " active" : ""}`}
                  aria-current={active === id ? "true" : undefined}
                >
                  {label}
                </a>
              );
            })}
          </nav>

          <div className="nx-nav-actions">
            <ThemeSwitch label={t.themeLabel} />
            <LangSwitch label={t.langLabel} className="nx-wide-only" />
            <a className="nx-btn nx-btn-solid nx-wide-only" href="#aloqa">
              {t.nav.cta}
            </a>
            <button
              type="button"
              className="nx-burger"
              aria-label={menuOpen ? t.nav.closeMenu : t.nav.openMenu}
              aria-expanded={menuOpen}
              aria-controls="nx-menu"
              onClick={() => setMenuOpen((v) => !v)}
            >
              <span className={`nx-burger-box${menuOpen ? " open" : ""}`} aria-hidden="true">
                <span />
                <span />
              </span>
            </button>
          </div>
        </div>

        {/* Reading position. Cheap, and the only honest answer to a 10k page. */}
        <div className="nx-progress" aria-hidden="true">
          <div className="nx-progress-bar" ref={progressRef} />
        </div>

        <div className={`nx-menu${menuOpen ? " open" : ""}`} id="nx-menu" inert={!menuOpen}>
          <nav className="nx-menu-links" aria-label={t.nav.menuLabel}>
            {NAV_LINKS.map(([label, href]) => (
              <a key={href} href={href} className="nx-menu-link" onClick={closeMenu}>
                {label}
                <Arrow size={14} />
              </a>
            ))}
          </nav>
          <div className="nx-menu-foot">
            <a className="nx-btn nx-btn-solid nx-btn-block" href="#aloqa" onClick={closeMenu}>
              {t.nav.cta}
            </a>
            <a className="nx-btn nx-btn-line nx-btn-block" href={CONTACT.phonePrimary.href}>
              {CONTACT.phonePrimary.label}
            </a>
            <LangSwitch label={t.langLabel} />
          </div>
        </div>
      </header>
      <div className={`nx-scrim${menuOpen ? " open" : ""}`} onClick={closeMenu} aria-hidden="true" />

      <main id="top">
        {/* ============ 1. HERO — type, then the actual product ============ */}
        <section className="nx-hero">
          <div className="nx-hero-glow" aria-hidden="true" />
          <div className="nx-wrap">
            <div className="nx-hero-copy nx-in">
              <p className="nx-eyebrow">
                <Mark size={9} />
                {t.hero.eyebrow}
              </p>
              <h1 className="nx-display">
                {t.hero.titleBefore}
                <span className="nx-grad">
                  {t.hero.titleAccent}
                  <span className="nx-grad-line" aria-hidden="true" />
                </span>
                {t.hero.titleAfter}
              </h1>
              <p className="nx-lede">{t.hero.lede}</p>
              <div className="nx-hero-btns">
                <a className="nx-btn nx-btn-solid nx-btn-lg" href="#aloqa">
                  {t.hero.primary}
                </a>
                <a className="nx-btn nx-btn-line nx-btn-lg" href="#ishlar">
                  {t.hero.secondary} <Arrow size={14} />
                </a>
              </div>
            </div>

            {/* Real captures, in frames, cropped at the fold — the product is
                the strongest thing we can put here. */}
            <div className="nx-hero-shot nx-in">
              <figure className="nx-frame nx-frame-desktop">
                <span className="nx-frame-bar" aria-hidden="true">
                  <span className="nx-dot" />
                  <span className="nx-dot" />
                  <span className="nx-dot" />
                  <span className="nx-frame-url">{HERO_SHOT.url}</span>
                </span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={HERO_SHOT.desktop} alt={projects[0]?.title ?? ""} width={1920} height={1080} />
              </figure>
              <figure className="nx-frame nx-frame-phone" aria-hidden="true">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={HERO_SHOT.phone} alt="" loading="lazy" />
              </figure>
            </div>
          </div>
        </section>

        {/* ============ 2. PROOF — one band, stats + clients ============ */}
        <section className="nx-band nx-band-line">
          <div className="nx-wrap">
            <div className="nx-stats nx-in">
              {t.stats.map(([num, label]) => (
                <div className="nx-stat" key={label}>
                  <span className="nx-stat-num">{num}</span>
                  <span className="nx-micro">{label}</span>
                </div>
              ))}
            </div>
            <div className="nx-proof nx-in">
              <p className="nx-micro nx-proof-h" id="nx-proof-h">
                {t.proofEyebrow}
              </p>
              <div className="nx-marquee" role="group" aria-labelledby="nx-proof-h">
                <div className="nx-marquee-track">
                  {[...CLIENTS, ...CLIENTS].map((c, i) => (
                    <div className="nx-slot" key={i}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={c.src}
                        alt={i < CLIENTS.length ? c.alt : ""}
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

        {/* ============ 3. SERVICES — absorbs the stack wall ============ */}
        <section className="nx-chapter" id="xizmatlar">
          <div className="nx-wrap">
            <header className="nx-head nx-in">
              <p className="nx-eyebrow">{t.services.eyebrow}</p>
              <h2 className="nx-h2">{t.services.title}</h2>
              <p className="nx-sub">{t.services.sub}</p>
            </header>
            <div className="nx-duo nx-in">
              {t.services.items.map((s) => (
                <article className="nx-raised nx-service" key={s.title}>
                  <p className="nx-micro">{s.tag}</p>
                  <h3 className="nx-h3">{s.title}</h3>
                  <p className="nx-body">{s.desc}</p>
                  <ul className="nx-tags">
                    {s.chips.map((c) => (
                      <li key={c}>{c}</li>
                    ))}
                  </ul>
                  <a className="nx-link" href="#aloqa">
                    {t.services.more} <Arrow size={13} />
                  </a>
                </article>
              ))}
            </div>
            {/* The old twelve-tile logo wall, reduced to one honest line. */}
            <p className="nx-stackline nx-in">
              <span className="nx-micro">{t.stack.eyebrow}</span>
              {STACK_LINE.map((n) => (
                <span key={n}>{n}</span>
              ))}
            </p>
          </div>
        </section>

        {/* ============ 4. WORK ============ */}
        <section className="nx-chapter nx-band-alt" id="ishlar">
          <div className="nx-wrap">
            <header className="nx-head nx-in">
              <p className="nx-eyebrow">{t.portfolio.eyebrow}</p>
              <h2 className="nx-h2">{t.portfolio.title}</h2>
              <p className="nx-sub">{t.portfolio.sub}</p>
            </header>
            <div className="nx-duo nx-in">
              {(showAll ? projects : projects.slice(0, PROJECTS_PREVIEW)).map((p) => (
                <a
                  className="nx-raised nx-work"
                  key={p.title}
                  href={`https://${p.url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <figure className="nx-work-shot">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.img} alt="" loading="lazy" width={1920} height={1080} />
                  </figure>
                  <div className="nx-work-body">
                    <p className="nx-micro">{p.seg}</p>
                    <h3 className="nx-h3">{p.title}</h3>
                    {/* The payoff line is prose now — it used to be 12px mono,
                        the least readable style on the page. */}
                    <p className="nx-work-result">{p.result}</p>
                    {p.source && <p className="nx-work-source">— {p.source}</p>}
                    <span className="nx-link">
                      {p.url} <Arrow size={13} />
                    </span>
                  </div>
                </a>
              ))}
            </div>
            {!showAll && (
              <div className="nx-center nx-in">
                <button type="button" className="nx-btn nx-btn-line" onClick={() => setShowAll(true)}>
                  {t.portfolio.showMore(projects.length - PROJECTS_PREVIEW)}
                  <Arrow size={14} />
                </button>
              </div>
            )}
          </div>
        </section>

        {/* ============ 5. THE CASE — dark, full-bleed, the one climax ============ */}
        <section className="nx-dark" id="keys">
          <span className="nx-dark-rule" aria-hidden="true" />
          <div className="nx-wrap">
            <header className="nx-head nx-head-wide nx-in">
              <p className="nx-eyebrow">{t.caseStudy.eyebrow}</p>
              <h2 className="nx-chapter-title">{t.caseStudy.title}</h2>
              <p className="nx-case-client">
                <strong>{t.caseStudy.client}</strong>
                <span className="nx-micro">{t.caseStudy.place}</span>
              </p>
              <p className="nx-lede nx-lede-dark">{t.caseStudy.lede}</p>
            </header>

            <div className="nx-case-figures nx-in">
              {t.caseStudy.metrics.map((m) => (
                <div className={`nx-figure${m.pending ? " pending" : ""}`} key={m.label}>
                  <span className="nx-figure-num">
                    {m.pending ? <span className="nx-figure-wait">soon</span> : m.value}
                  </span>
                  <span className="nx-micro">{m.label}</span>
                </div>
              ))}
            </div>

            <div className="nx-case-media nx-in">
              <span className="nx-ph">
                <Mark size={20} />
                <span className="nx-micro">FOTO / VIDEO</span>
              </span>
            </div>

            <div className="nx-case-cols nx-in">
              <div>
                <p className="nx-micro nx-case-col-h">{t.caseStudy.challengeLabel}</p>
                <ul className="nx-case-list">
                  {t.caseStudy.challenge.map((r) => (
                    <li key={r}>{r}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="nx-micro nx-case-col-h">{t.caseStudy.solutionLabel}</p>
                <ul className="nx-case-list nx-case-list-done">
                  {t.caseStudy.solution.map((r) => (
                    <li key={r}>{r}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="nx-case-foot nx-in">
              <ul className="nx-tags nx-tags-dark">
                {t.caseStudy.stack.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
              <p className="nx-micro nx-case-note">{t.caseStudy.pendingNote}</p>
              <a className="nx-btn nx-btn-invert nx-btn-lg" href="#aloqa">
                {t.caseStudy.cta} <Arrow size={14} />
              </a>
            </div>
          </div>
        </section>

        {/* ============ 6. PROCESS — one row, not four cards ============ */}
        <section className="nx-chapter" id="jarayon">
          <div className="nx-wrap">
            <header className="nx-head nx-in">
              <p className="nx-eyebrow">{t.process.eyebrow}</p>
              <h2 className="nx-h2">{t.process.title}</h2>
            </header>
            <ol className="nx-steps nx-in">
              {t.process.steps.map((s, i) => (
                <li className="nx-step" key={s.title}>
                  <span className="nx-step-n">{`0${i + 1}`}</span>
                  <h3 className="nx-h3">{s.title}</h3>
                  <p className="nx-body">{s.desc}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ============ 7. TEAM + OFFICE, woven ============ */}
        <section className="nx-chapter nx-band-alt" id="jamoa">
          <div className="nx-wrap">
            <header className="nx-head nx-in">
              <p className="nx-eyebrow">{t.team.eyebrow}</p>
              <h2 className="nx-h2">{t.team.title}</h2>
              <p className="nx-sub">{t.office.sub}</p>
            </header>

            <div className="nx-office nx-in">
              {OFFICE_PHOTOS.map((src, i) => (
                <figure className={`nx-office-shot nx-office-${i + 1}`} key={src}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt="" loading="lazy" width={1400} height={933} />
                </figure>
              ))}
            </div>

            <div className="nx-team nx-in">
              {team.map((m, i) => (
                <article className="nx-member" key={m.name}>
                  <figure className="nx-member-photo">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={m.img} alt={m.name} loading={i < 4 ? "eager" : "lazy"} width={640} height={640} />
                  </figure>
                  <h3 className="nx-member-name">{m.name}</h3>
                  <p className="nx-micro nx-member-role">{m.role}</p>
                  <p className="nx-small">{m.bio}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ============ 8. VOICES — quotes carry a client mark ============ */}
        <section className="nx-chapter" id="sharhlar">
          <div className="nx-wrap">
            <header className="nx-head nx-in">
              <p className="nx-eyebrow">{t.testimonials.eyebrow}</p>
              <h2 className="nx-h2">{t.testimonials.title}</h2>
            </header>
            <div className="nx-duo nx-in">
              {t.testimonials.items.map((q, i) => (
                <figure className="nx-panel nx-quote" key={q.name}>
                  {QUOTE_LOGOS[i] && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img className="nx-quote-logo" src={QUOTE_LOGOS[i]} alt="" loading="lazy" />
                  )}
                  <blockquote>{q.quote}</blockquote>
                  <figcaption>
                    <span className="nx-quote-name">{q.name}</span>
                    <span className="nx-micro">
                      {q.role} · {q.company}
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* ============ 9. PRICING + the guarantees under it ============ */}
        <section className="nx-chapter nx-band-alt" id="narxlar">
          <div className="nx-wrap">
            <header className="nx-head nx-in">
              <p className="nx-eyebrow">{t.pricing.eyebrow}</p>
              <h2 className="nx-h2">{t.pricing.title}</h2>
              <p className="nx-sub">{t.pricing.sub}</p>
            </header>

            <div className="nx-tabs nx-in" role="tablist" aria-label={t.pricing.eyebrow}>
              {t.pricing.tracks.map((label, i) => {
                const key = i === 0 ? "software" : "odoo";
                return (
                  <button
                    key={key}
                    type="button"
                    role="tab"
                    aria-selected={track === key}
                    className={`nx-tab${track === key ? " active" : ""}`}
                    onClick={() => setTrack(key as "software" | "odoo")}
                  >
                    {label}
                  </button>
                );
              })}
            </div>

            <div className="nx-trio nx-in">
              {t.pricing[track].map((p) => (
                <article className={`nx-raised nx-price${p.featured ? " feat" : ""}`} key={p.tier}>
                  {p.featured && <span className="nx-price-badge">{t.pricing.popular}</span>}
                  <p className="nx-micro">{p.tier}</p>
                  <p className="nx-price-amt">{p.price}</p>
                  <p className="nx-micro nx-price-period">{p.period}</p>
                  <p className="nx-small nx-price-desc">{p.desc}</p>
                  <ul className="nx-price-list">
                    {p.items.map((it) => (
                      <li key={it}>{it}</li>
                    ))}
                  </ul>
                  <a className={`nx-btn ${p.featured ? "nx-btn-solid" : "nx-btn-line"} nx-btn-block`} href="#aloqa">
                    {t.pricing.cta}
                  </a>
                </article>
              ))}
            </div>

            {/* Guarantees were a six-card chapter of their own. As a strip
                under the price they answer the question where it is asked. */}
            <div className="nx-guard nx-in">
              <p className="nx-micro nx-guard-h">{t.guarantee.eyebrow}</p>
              <ul className="nx-guard-list">
                {t.guarantee.items.map((g) => (
                  <li key={g.title}>
                    <strong>{g.title}</strong>
                    <span className="nx-small">{g.body}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ============ 10. JOURNAL ============ */}
        {journal.length > 0 && (
          <section className="nx-chapter" id="jurnal">
            <div className="nx-wrap">
              <header className="nx-head nx-head-row nx-in">
                <div>
                  <p className="nx-eyebrow">{t.journal.eyebrow}</p>
                  <h2 className="nx-h2">{t.journal.title}</h2>
                </div>
                <Link className="nx-btn nx-btn-line" href={blogHref}>
                  {t.journal.allLabel} <Arrow size={14} />
                </Link>
              </header>
              <div className="nx-trio nx-in">
                {journal.map((post) => (
                  <Link className="nx-raised nx-post" key={post.slug} href={post.href}>
                    <p className="nx-micro">{[post.category, post.date].filter(Boolean).join(" · ")}</p>
                    <h3 className="nx-h3">{post.title}</h3>
                    {post.excerpt && <p className="nx-small">{post.excerpt}</p>}
                    <span className="nx-link">
                      {t.journal.readLabel} <Arrow size={13} />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ============ 11. FAQ ============ */}
        <section className="nx-chapter nx-band-alt" id="faq">
          <div className="nx-wrap nx-wrap-narrow">
            <header className="nx-head nx-in">
              <p className="nx-eyebrow">{t.faq.eyebrow}</p>
              <h2 className="nx-h2">{t.faq.title}</h2>
            </header>
            <div className="nx-faq nx-in">
              {t.faq.items.map((f, i) => {
                const open = openFaq === i;
                return (
                  <div className={`nx-faq-row${open ? " open" : ""}`} key={f.q}>
                    <button
                      className="nx-faq-q"
                      id={`nx-faq-q-${i}`}
                      aria-expanded={open}
                      aria-controls={`nx-faq-a-${i}`}
                      onClick={() => setOpenFaq(open ? null : i)}
                    >
                      <span>{f.q}</span>
                      <span className="nx-faq-ico" aria-hidden="true">
                        <Chevron size={14} />
                      </span>
                    </button>
                    <div
                      className="nx-faq-a"
                      id={`nx-faq-a-${i}`}
                      role="region"
                      aria-labelledby={`nx-faq-q-${i}`}
                      inert={!open}
                    >
                      <p>{f.a}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ============ CONTACT — form, channels, credentials ============ */}
        <section className="nx-contact" id="aloqa">
          <div className="nx-wrap">
            <div className="nx-contact-grid">
              <div className="nx-in">
                <p className="nx-eyebrow">{t.cta.eyebrow}</p>
                <h2 className="nx-chapter-title nx-contact-h">{t.cta.title}</h2>

                <div className="nx-channels">
                  <div className="nx-channel">
                    <span className="nx-micro">{t.cta.call}</span>
                    <a href={CONTACT.phonePrimary.href}>{CONTACT.phonePrimary.label}</a>
                    <a href={CONTACT.phoneSecondary.href}>{CONTACT.phoneSecondary.label}</a>
                  </div>
                  <div className="nx-channel">
                    <span className="nx-micro">Telegram · Email</span>
                    <a href={CONTACT.telegram.href} target="_blank" rel="noopener noreferrer">
                      {CONTACT.telegram.label}
                    </a>
                    <a href={CONTACT.email.href}>{CONTACT.email.label}</a>
                  </div>
                </div>
                <p className="nx-micro nx-contact-meta">{t.cta.meta}</p>
              </div>

              <div className="nx-panel nx-form-card nx-in">
                <HomeForm ns="nx" />
              </div>
            </div>

            {/* Credentials as a trust strip where the decision happens, rather
                than four full cards earlier in the page. */}
            <div className="nx-creds nx-in">
              {credentials.map((c) => (
                <div className="nx-cred" key={c.title}>
                  <span className="nx-cred-plate">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={c.img}
                      alt={c.title}
                      loading="lazy"
                      style={{ ["--cs" as string]: c.scale } as CSSProperties}
                    />
                  </span>
                  <span className="nx-cred-text">
                    <strong>{c.title}</strong>
                    <span className="nx-micro">{c.org}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* ===================== FOOTER ===================== */}
      <footer className="nx-footer">
        <div className="nx-wrap">
          <div className="nx-footer-grid">
            <div>
              <a className="nx-brand" href="#top" aria-label="Empire Group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="nx-wordmark nx-light-only" src="/logo/logotype-black.svg" alt="" width={120} height={23} />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="nx-wordmark nx-dark-only" src="/logo/logotype-whote.svg" alt="" width={120} height={23} />
              </a>
              <p className="nx-small nx-footer-desc">{t.footer.desc}</p>
            </div>

            {(
              [
                [t.footer.servicesHead, t.footer.services],
                [t.footer.companyHead, t.footer.company],
                [t.footer.contactHead, t.footer.contact],
              ] as [string, [string, string][]][]
            ).map(([head, rows]) => (
              <div className="nx-footer-col" key={head}>
                <p className="nx-micro nx-footer-h">{head}</p>
                {rows.map(([label, href]) =>
                  href.startsWith("#") ? (
                    <a key={href} href={href}>
                      {label}
                    </a>
                  ) : href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:") ? (
                    <a
                      key={href}
                      href={href}
                      {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    >
                      {label}
                    </a>
                  ) : (
                    <Link key={href} href={localePath(locale, href)}>
                      {label}
                    </Link>
                  )
                )}
              </div>
            ))}
          </div>

          <div className="nx-footer-legal">
            <p className="nx-micro nx-footer-h">{t.footer.legalHead}</p>
            <div className="nx-footer-legal-rows">
              {t.footer.legal.map(([line]) => (
                <span className="nx-micro" key={line}>
                  {line}
                </span>
              ))}
            </div>
          </div>

          <div className="nx-footer-bottom">
            <span className="nx-micro">{t.footer.rights}</span>
            <span className="nx-micro">{t.footer.place}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ============================== CSS ============================== */

const CSS = `
.nx{
  /* ---- Neutrals. Every text tier clears WCAG AA on --surface. ---- */
  --canvas:#f6f6f7;
  --canvas-alt:#ffffff;
  --surface:#ffffff;
  --line:#e5e5e9;
  --line-strong:#d2d2d8;
  --ink:#0f1013;
  --body:#4a4c53;
  --muted:#6b6d75;
  /* Decoration only — chevrons, arrows, dots. Every tier that carries text
     stops at --muted, which clears AA on both grounds. */
  --faint:#74767e;
  --on-ink:#ffffff;

  /* ---- The dark chapter carries its own ground, in both themes. ---- */
  --dark:#0c0d10;
  --dark-surface:#15161a;
  --dark-line:#282a30;
  --dark-ink:#f4f4f6;
  --dark-body:#b4b6bd;
  --dark-muted:#8b8d95;

  --green:#2c7a45;
  --spectrum:linear-gradient(90deg,rgb(0,255,149) 0%,rgb(255,208,0) 25%,rgb(255,23,68) 50%,rgb(149,0,255) 75%,rgb(0,229,255) 100%);

  /* ---- Type: eight steps, each with one job. ---- */
  --t-display:72px;
  --t-figure:44px;
  --t-h2:36px;
  --t-h3:20px;
  --t-lede:17px;
  --t-body:15px;
  --t-small:13px;
  --t-micro:11px;

  --sans:var(--font-geist-sans),ui-sans-serif,system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;
  --mono:var(--font-geist-mono),ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;
  --ease:cubic-bezier(0.16,1,0.3,1);
  --r:10px;
  --shadow:0 1px 2px rgba(15,16,19,.04),0 8px 24px -12px rgba(15,16,19,.10);
  --shadow-lift:0 2px 4px rgba(15,16,19,.05),0 18px 40px -16px rgba(15,16,19,.16);

  background:var(--canvas);
  color:var(--ink);
  font-family:var(--sans);
  -webkit-font-smoothing:antialiased;
  font-feature-settings:"rlig" 1,"ss11" 1,"calt" 0;
  letter-spacing:-.01em;
}
.nx *{box-sizing:border-box;}
.nx a{color:inherit;text-decoration:none;}
.nx img{display:block;max-width:100%;}
.nx ul,.nx ol{list-style:none;margin:0;padding:0;}
.nx section[id]{scroll-margin-top:88px;}

/* ---------- reveal: chapter openings only ---------- */
.nx .nx-in{transform:translateY(14px);transition:opacity .55s var(--ease),transform .55s var(--ease);}
.nx.nx-ready .nx-in{opacity:0;}
.nx .nx-in.shown{opacity:1;transform:none;}

/* ---------- layout ---------- */
.nx-wrap{max-width:1200px;margin:0 auto;padding:0 28px;width:100%;}
.nx-wrap-narrow{max-width:840px;}
.nx-chapter{padding:104px 0;}
.nx-band{padding:36px 0;}
/* Full-bleed alternating grounds give the reader a sense of place. */
.nx-band-alt{background:var(--canvas-alt);}
.nx-band-line{background:var(--canvas-alt);border-top:1px solid var(--line);border-bottom:1px solid var(--line);}
.nx-center{display:flex;justify-content:center;margin-top:32px;}

/* ---------- type ---------- */
.nx-display{
  font-family:var(--sans);font-size:var(--t-display);line-height:1.02;letter-spacing:-.055em;
  font-weight:450;color:var(--ink);margin:0 0 22px;text-wrap:balance;
}
.nx-chapter-title{
  font-family:var(--sans);font-size:var(--t-figure);line-height:1.06;letter-spacing:-.05em;
  font-weight:450;margin:0 0 14px;text-wrap:balance;
}
.nx-h2{
  font-family:var(--sans);font-size:var(--t-h2);line-height:1.1;letter-spacing:-.045em;
  font-weight:450;color:var(--ink);margin:0;text-wrap:balance;
}
.nx-h3{
  font-family:var(--sans);font-size:var(--t-h3);line-height:1.28;letter-spacing:-.03em;
  font-weight:450;color:var(--ink);margin:0 0 10px;text-wrap:balance;
}
.nx-lede{
  font-family:var(--sans);font-size:var(--t-lede);line-height:1.55;color:var(--body);
  margin:0 0 30px;max-width:62ch;text-wrap:pretty;
}
.nx-sub{
  font-family:var(--sans);font-size:var(--t-lede);line-height:1.55;color:var(--muted);
  margin:16px 0 0;max-width:60ch;text-wrap:pretty;
}
.nx-body{font-family:var(--sans);font-size:var(--t-body);line-height:1.55;color:var(--body);margin:0 0 18px;text-wrap:pretty;}
.nx-small{font-family:var(--sans);font-size:var(--t-small);line-height:1.55;color:var(--body);margin:0;text-wrap:pretty;}
/* Mono is back to being an accent: eyebrows, labels, data. Nothing else. */
.nx-micro{
  font-family:var(--mono);font-size:var(--t-micro);line-height:1.5;letter-spacing:.07em;
  text-transform:uppercase;color:var(--muted);
}
.nx-eyebrow{
  font-family:var(--mono);font-size:var(--t-micro);line-height:1.5;letter-spacing:.07em;
  text-transform:uppercase;color:var(--ink);margin:0 0 18px;
  display:inline-flex;align-items:center;gap:8px;
}
.nx-head{margin-bottom:48px;max-width:680px;}
.nx-head-wide{max-width:820px;}
.nx-head-row{display:flex;align-items:flex-end;justify-content:space-between;gap:28px;max-width:none;}
.nx-link{
  font-family:var(--sans);font-size:var(--t-small);font-weight:500;color:var(--ink);
  display:inline-flex;align-items:center;gap:6px;margin-top:auto;position:relative;
}
.nx-link svg{transition:transform .25s var(--ease);}
.nx-raised:hover .nx-link svg,.nx-link:hover svg{transform:translateX(3px);}

/* ---------- surfaces: three tiers, each meaning something ---------- */
/* flat  = grouped content, no chrome (lists, strips)
   panel = hairline, static content that needs separation
   raised = hairline + shadow + lift, only where it leads somewhere */
.nx-panel{background:var(--surface);border:1px solid var(--line);border-radius:var(--r);}
.nx-raised{
  background:var(--surface);border:1px solid var(--line);border-radius:var(--r);
  box-shadow:var(--shadow);
  transition:transform .3s var(--ease),box-shadow .3s var(--ease),border-color .3s ease;
}
.nx-raised:hover{transform:translateY(-3px);box-shadow:var(--shadow-lift);border-color:var(--line-strong);}

/* ---------- buttons ---------- */
.nx-btn{
  font-family:var(--sans);font-size:var(--t-body);font-weight:500;line-height:1;
  display:inline-flex;align-items:center;justify-content:center;gap:8px;
  border-radius:8px;padding:11px 18px;cursor:pointer;border:1px solid transparent;
  transition:transform .2s var(--ease),background .2s ease,border-color .2s ease,color .2s ease;
  white-space:nowrap;
}
.nx-btn-lg{padding:14px 24px;}
.nx-btn-block{width:100%;}
.nx .nx-btn-solid{background:var(--ink);color:var(--on-ink);border-color:var(--ink);}
.nx .nx-btn-solid:hover{transform:translateY(-2px);}
.nx .nx-btn-line{background:transparent;color:var(--ink);border-color:var(--line-strong);}
.nx .nx-btn-line:hover{border-color:var(--ink);transform:translateY(-2px);}
.nx .nx-btn-invert{background:var(--dark-ink);color:var(--dark);border-color:var(--dark-ink);}
.nx .nx-btn-invert:hover{transform:translateY(-2px);}
.nx-icon-btn{
  display:inline-flex;align-items:center;justify-content:center;width:34px;height:34px;
  border-radius:8px;border:1px solid var(--line);background:var(--surface);
  color:var(--body);cursor:pointer;transition:color .2s ease,border-color .2s ease;flex-shrink:0;
}
.nx-icon-btn:hover{color:var(--ink);border-color:var(--line-strong);}

/* ---------- tags ---------- */
.nx-tags{display:flex;flex-wrap:wrap;gap:7px;margin:0 0 20px;}
.nx-tags li{
  font-family:var(--mono);font-size:var(--t-micro);letter-spacing:.03em;color:var(--muted);
  padding:5px 10px;border-radius:6px;border:1px solid var(--line);background:var(--canvas);
}
.nx-tags-dark li{color:var(--dark-muted);border-color:var(--dark-line);background:var(--dark-surface);}

/* ---------- nav ---------- */
.nx-nav{
  position:sticky;top:0;z-index:60;
  background:color-mix(in srgb,var(--canvas) 78%,transparent);
  backdrop-filter:saturate(180%) blur(20px);
  -webkit-backdrop-filter:saturate(180%) blur(20px);
  border-bottom:1px solid var(--line);
}
.nx-nav-inner{
  max-width:1200px;margin:0 auto;padding:0 28px;height:66px;
  display:flex;align-items:center;justify-content:space-between;gap:18px;
}
.nx-brand{display:inline-flex;align-items:center;flex-shrink:0;}
.nx-wordmark{height:21px;width:auto;}
.nx-footer .nx-wordmark{height:23px;}
.nx .nx-dark-only{display:none;}
.nx-nav-links{display:flex;align-items:center;gap:4px;}
.nx-navlink{
  font-family:var(--sans);font-size:var(--t-small);font-weight:500;color:var(--muted);
  padding:7px 11px;border-radius:7px;transition:color .2s ease,background .2s ease;
}
.nx-navlink:hover{color:var(--ink);background:var(--canvas-alt);}
/* The reader always knows which chapter they are in. */
.nx-navlink.active{color:var(--ink);background:var(--canvas-alt);box-shadow:inset 0 0 0 1px var(--line);}
.nx-nav-actions{display:flex;align-items:center;gap:9px;}
.nx-progress{position:absolute;left:0;right:0;bottom:-1px;height:2px;overflow:hidden;}
.nx-progress-bar{
  height:100%;width:100%;transform:scaleX(0);transform-origin:0 50%;
  background:var(--spectrum);
}

/* ---------- language ---------- */
.nx-lang{display:inline-flex;align-items:center;gap:2px;padding:2px;border-radius:8px;border:1px solid var(--line);background:var(--surface);}
.nx-lang-opt{
  font-family:var(--mono);font-size:var(--t-micro);letter-spacing:.05em;
  padding:6px 8px;border-radius:6px;color:var(--muted);line-height:1;
  transition:color .18s ease,background .18s ease;
}
.nx-lang-opt:hover{color:var(--ink);background:var(--canvas);}
.nx-lang-opt.active{background:var(--ink);color:var(--on-ink);}
.nx-menu .nx-lang{width:100%;justify-content:center;}
.nx-menu .nx-lang-opt{flex:1;text-align:center;padding:10px 8px;}

/* ---------- mobile drawer ---------- */
.nx-burger{
  display:none;width:38px;height:34px;padding:0;border:1px solid var(--line);cursor:pointer;
  background:var(--surface);border-radius:8px;align-items:center;justify-content:center;
}
.nx-burger:hover{border-color:var(--line-strong);}
.nx-burger-box{position:relative;width:16px;height:11px;display:block;}
.nx-burger-box span{
  position:absolute;left:0;width:100%;height:1.5px;background:var(--ink);border-radius:2px;
  transition:transform .3s var(--ease);
}
.nx-burger-box span:first-child{top:0;}
.nx-burger-box span:last-child{bottom:0;}
.nx-burger-box.open span:first-child{transform:translateY(4.75px) rotate(45deg);}
.nx-burger-box.open span:last-child{transform:translateY(-4.75px) rotate(-45deg);}
.nx-menu{
  display:none;position:absolute;left:0;right:0;top:66px;z-index:59;
  background:var(--surface);border-bottom:1px solid var(--line);
  box-shadow:0 24px 48px -24px rgba(15,16,19,.2);
  padding:16px 28px 24px;max-height:calc(100dvh - 66px);overflow-y:auto;
  opacity:0;transform:translateY(-8px);visibility:hidden;
  transition:opacity .22s ease,transform .26s var(--ease),visibility 0s linear .26s;
}
.nx-menu.open{opacity:1;transform:none;visibility:visible;transition-delay:0s;}
.nx-menu-links{display:flex;flex-direction:column;}
.nx-menu-link{
  display:flex;align-items:center;justify-content:space-between;
  font-family:var(--sans);font-size:17px;font-weight:450;color:var(--ink);
  padding:15px 2px;border-bottom:1px solid var(--line);
}
.nx-menu-link svg{color:var(--faint);}
.nx-menu-foot{display:flex;flex-direction:column;gap:10px;margin-top:20px;}
.nx-scrim{
  display:none;position:fixed;inset:66px 0 0;z-index:50;background:rgba(12,13,16,.34);
  opacity:0;pointer-events:none;transition:opacity .24s ease;
}
.nx-scrim.open{opacity:1;pointer-events:auto;}

/* ---------- 1. hero ---------- */
.nx-hero{position:relative;padding:92px 0 0;overflow:hidden;}
/* A halo under the product, not a wash over the headline. Kept low and
   pushed down the page so the type stays on clean ground — a full-width
   pastel gradient behind a hero is the most tired look on the web. */
.nx-hero-glow{
  position:absolute;left:50%;top:340px;width:900px;height:360px;transform:translateX(-50%);
  pointer-events:none;opacity:.10;filter:blur(110px);
  background:var(--spectrum);
}
.nx-hero-copy{position:relative;z-index:1;max-width:880px;margin:0 auto;text-align:center;display:flex;flex-direction:column;align-items:center;}
.nx-hero-copy .nx-lede{max-width:620px;}
.nx-hero-btns{display:flex;gap:12px;flex-wrap:wrap;justify-content:center;}
.nx-grad{position:relative;display:inline-block;white-space:nowrap;}
.nx-grad-line{
  position:absolute;left:0;right:0;bottom:.02em;height:5px;border-radius:3px;
  background:var(--spectrum);background-size:200% 100%;animation:nx-sweep 6s linear infinite;
}
@keyframes nx-sweep{0%{background-position:0% 0%;}100%{background-position:200% 0%;}}

/* Product shelf: real captures, cropped at the fold so the page invites scroll. */
.nx-hero-shot{position:relative;z-index:1;margin:56px auto 0;max-width:1040px;}
.nx-frame{margin:0;background:var(--surface);border:1px solid var(--line);border-radius:12px;overflow:hidden;box-shadow:0 40px 80px -40px rgba(15,16,19,.3);}
.nx-frame-desktop img{width:100%;height:auto;display:block;}
.nx-frame-bar{display:flex;align-items:center;gap:6px;padding:10px 14px;border-bottom:1px solid var(--line);background:var(--canvas-alt);}
.nx-dot{width:9px;height:9px;border-radius:50%;background:var(--line-strong);flex-shrink:0;}
.nx-frame-url{
  font-family:var(--mono);font-size:var(--t-micro);letter-spacing:.05em;color:var(--muted);
  margin-left:8px;background:var(--canvas);padding:3px 10px;border-radius:9999px;border:1px solid var(--line);
}
.nx-frame-phone{
  position:absolute;left:-8px;bottom:-40px;width:168px;border-radius:20px;
  box-shadow:0 30px 60px -24px rgba(15,16,19,.34);
}
.nx-frame-phone img{width:100%;height:auto;}

/* ---------- 2. proof ---------- */
.nx-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:0;}
.nx-stat{display:flex;flex-direction:column;gap:6px;padding:4px 24px 4px 0;border-right:1px solid var(--line);}
.nx-stat:last-child{border-right:0;}
.nx-stat-num{
  font-family:var(--sans);font-size:var(--t-figure);font-weight:450;letter-spacing:-.05em;
  color:var(--ink);line-height:1;font-variant-numeric:tabular-nums;
}
.nx-proof{margin-top:32px;padding-top:28px;border-top:1px solid var(--line);}
.nx-proof-h{display:block;text-align:center;margin-bottom:18px;}
.nx-marquee{
  overflow:hidden;
  -webkit-mask-image:linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent);
  mask-image:linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent);
}
.nx-marquee-track{display:flex;width:max-content;align-items:center;animation:nx-scroll 54s linear infinite;}
.nx-marquee:hover .nx-marquee-track{animation-play-state:paused;}
.nx-slot{flex:0 0 auto;width:184px;height:56px;display:flex;align-items:center;justify-content:center;}
.nx-slot img{
  max-height:calc(26px * var(--s,1));max-width:calc(118px * var(--s,1));
  width:auto;object-fit:contain;filter:grayscale(1);opacity:.5;
  transition:filter .3s ease,opacity .3s ease;
}
.nx-slot img:hover{filter:grayscale(0);opacity:1;}
@keyframes nx-scroll{from{transform:translateX(0);}to{transform:translateX(-50%);}}

/* ---------- grids ---------- */
.nx-duo{display:grid;grid-template-columns:1fr 1fr;gap:20px;}
.nx-trio{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;}

/* ---------- 3. services ---------- */
.nx-service{display:flex;flex-direction:column;padding:30px;}
.nx-service .nx-micro{margin-bottom:14px;}
/* Ten names on one line, where twelve tiles used to take a screen. */
.nx-stackline{
  display:flex;flex-wrap:wrap;align-items:center;gap:8px 18px;margin:36px 0 0;
  padding-top:24px;border-top:1px solid var(--line);
}
.nx-stackline span:not(.nx-micro){
  font-family:var(--sans);font-size:var(--t-small);color:var(--muted);
}

/* ---------- 4. work ---------- */
.nx-work{display:flex;flex-direction:column;overflow:hidden;padding:0;}
.nx-work-shot{margin:0;aspect-ratio:16/9;overflow:hidden;background:var(--canvas);border-bottom:1px solid var(--line);}
.nx-work-shot img{width:100%;height:100%;object-fit:cover;object-position:top center;transition:transform .5s var(--ease);}
.nx-work:hover .nx-work-shot img{transform:scale(1.03);}
.nx-work-body{display:flex;flex-direction:column;flex:1;padding:24px 26px 26px;}
.nx-work-body .nx-micro{margin-bottom:10px;}
.nx-work-result{
  font-family:var(--sans);font-size:var(--t-body);line-height:1.5;color:var(--ink);
  margin:0 0 6px;font-weight:450;
}
.nx-work-source{font-family:var(--sans);font-size:var(--t-small);color:var(--muted);margin:0 0 18px;}

/* ---------- 5. the dark chapter ---------- */
.nx-dark{
  background:var(--dark);color:var(--dark-ink);
  padding:112px 0;position:relative;overflow:hidden;
}
.nx-dark-rule{position:absolute;left:0;right:0;top:0;height:3px;background:var(--spectrum);background-size:200% 100%;animation:nx-sweep 6s linear infinite;}
.nx-dark .nx-eyebrow{color:var(--dark-ink);}
.nx-dark .nx-micro{color:var(--dark-muted);}
.nx-chapter-title{color:inherit;}
.nx-lede-dark{color:var(--dark-body);}
.nx-case-client{display:flex;flex-wrap:wrap;align-items:baseline;gap:10px;margin:0 0 18px;}
.nx-case-client strong{font-family:var(--sans);font-size:var(--t-lede);font-weight:500;}
.nx-case-figures{
  display:grid;grid-template-columns:repeat(4,1fr);gap:0;
  margin:12px 0 44px;border-top:1px solid var(--dark-line);border-bottom:1px solid var(--dark-line);
}
.nx-figure{display:flex;flex-direction:column;gap:8px;padding:26px 24px 26px 0;border-right:1px solid var(--dark-line);}
.nx-figure:last-child{border-right:0;}
/* Fixed line box so a pending cell keeps the same baseline as a real number. */
.nx-figure-num{
  font-family:var(--sans);font-size:var(--t-figure);font-weight:450;letter-spacing:-.05em;
  line-height:1;font-variant-numeric:tabular-nums;color:var(--dark-ink);
  display:flex;align-items:center;height:var(--t-figure);
}
/* A word instead of an em dash — the dash read as a rendering fault. */
.nx-figure-wait{
  font-family:var(--mono);font-size:var(--t-micro);letter-spacing:.08em;text-transform:uppercase;
  color:var(--dark-muted);border:1px dashed var(--dark-line);border-radius:6px;padding:6px 10px;
}
.nx-case-media{
  width:100%;height:340px;border-radius:var(--r);overflow:hidden;
  background:var(--dark-surface);border:1px solid var(--dark-line);margin-bottom:44px;
}
.nx-ph{
  width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;
  gap:12px;color:var(--dark-line);
}
.nx-ph .nx-micro{color:var(--dark-muted);}
.nx-case-cols{display:grid;grid-template-columns:1fr 1fr;gap:44px;}
.nx-case-col-h{display:block;margin-bottom:16px;padding-bottom:12px;border-bottom:1px solid var(--dark-line);}
.nx-case-list{display:flex;flex-direction:column;gap:14px;}
.nx-case-list li{
  font-family:var(--sans);font-size:var(--t-body);line-height:1.55;color:var(--dark-body);
  padding-left:20px;position:relative;text-wrap:pretty;
}
.nx-case-list li::before{content:"—";position:absolute;left:0;color:var(--dark-muted);}
.nx-case-list-done li::before{content:"✓";color:#4ea867;}
.nx-case-foot{display:flex;flex-direction:column;gap:18px;align-items:flex-start;margin-top:44px;padding-top:36px;border-top:1px solid var(--dark-line);}
.nx-case-note{color:var(--dark-muted);}

/* ---------- 6. process: a row, not cards ---------- */
.nx-steps{display:grid;grid-template-columns:repeat(4,1fr);gap:0;}
.nx-step{padding:0 28px 0 0;position:relative;}
.nx-step + .nx-step{padding-left:28px;border-left:1px solid var(--line);}
.nx-step-n{
  font-family:var(--mono);font-size:var(--t-micro);letter-spacing:.08em;color:var(--muted);
  display:block;margin-bottom:14px;
}
.nx-step .nx-body{margin:0;}

/* ---------- 7. team + office ---------- */
.nx-office{display:grid;grid-template-columns:2fr 1fr 1fr;gap:14px;margin-bottom:56px;}
.nx-office-shot{margin:0;border-radius:var(--r);overflow:hidden;background:var(--canvas);}
.nx-office-shot img{width:100%;height:100%;object-fit:cover;filter:grayscale(1) contrast(1.03);transition:filter .4s ease;}
.nx-office-shot:hover img{filter:none;}
.nx-office-1{aspect-ratio:16/10;}
.nx-office-2,.nx-office-3{aspect-ratio:4/5;}
.nx-team{display:grid;grid-template-columns:repeat(4,1fr);gap:24px 20px;}
/* Portraits sit flat on the ground — a card frame around a face adds nothing. */
.nx-member-photo{margin:0 0 14px;aspect-ratio:1/1;overflow:hidden;border-radius:var(--r);background:var(--canvas);}
.nx-member-photo img{width:100%;height:100%;object-fit:cover;object-position:center top;filter:grayscale(1) contrast(1.03);transition:filter .35s ease;}
.nx-member:hover .nx-member-photo img{filter:none;}
.nx-member-name{font-family:var(--sans);font-size:var(--t-body);font-weight:500;letter-spacing:-.02em;color:var(--ink);margin:0 0 4px;}
.nx-member-role{display:block;margin-bottom:10px;}

/* ---------- 8. voices ---------- */
.nx-quote{display:flex;flex-direction:column;padding:30px;}
.nx-quote-logo{height:24px;width:auto;max-width:130px;object-fit:contain;filter:grayscale(1);opacity:.62;margin-bottom:22px;}
.nx-quote blockquote{
  font-family:var(--sans);font-size:var(--t-lede);line-height:1.55;letter-spacing:-.015em;
  color:var(--ink);margin:0 0 22px;text-wrap:pretty;
}
.nx-quote figcaption{display:flex;flex-direction:column;gap:4px;margin-top:auto;}
.nx-quote-name{font-family:var(--sans);font-size:var(--t-body);font-weight:500;color:var(--ink);}

/* ---------- 9. pricing + guarantees ---------- */
.nx-tabs{
  display:flex;gap:4px;padding:4px;margin:0 auto 32px;width:max-content;max-width:100%;
  background:var(--surface);border:1px solid var(--line);border-radius:9999px;flex-wrap:wrap;justify-content:center;
}
.nx-tab{
  font-family:var(--sans);font-size:var(--t-small);font-weight:500;
  padding:9px 18px;border-radius:9999px;border:0;background:transparent;color:var(--muted);
  cursor:pointer;transition:background .2s ease,color .2s ease;white-space:nowrap;
}
.nx-tab:hover{color:var(--ink);}
.nx-tab.active{background:var(--ink);color:var(--on-ink);}
.nx-price{display:flex;flex-direction:column;padding:30px;position:relative;}
.nx-price.feat{border-color:var(--ink);box-shadow:var(--shadow-lift);}
.nx-price-amt{
  font-family:var(--sans);font-size:var(--t-h2);font-weight:450;letter-spacing:-.045em;color:var(--ink);
  margin:14px 0 4px;line-height:1;font-variant-numeric:tabular-nums;
}
.nx-price-period{display:block;margin-bottom:16px;}
.nx-price-desc{color:var(--muted);margin-bottom:20px;padding-bottom:18px;border-bottom:1px solid var(--line);}
.nx-price-list{display:flex;flex-direction:column;gap:11px;margin-bottom:26px;}
.nx-price-list li{
  font-family:var(--sans);font-size:var(--t-body);color:var(--body);line-height:1.45;
  padding-left:20px;position:relative;
}
.nx-price-list li::before{content:"✓";position:absolute;left:0;color:var(--green);font-weight:600;}
.nx-price .nx-btn{margin-top:auto;}
.nx-price-badge{
  position:absolute;top:-11px;left:30px;
  font-family:var(--mono);font-size:var(--t-micro);letter-spacing:.08em;text-transform:uppercase;
  background:var(--ink);color:var(--on-ink);padding:4px 10px;border-radius:6px;
}
.nx-guard{margin-top:44px;padding-top:32px;border-top:1px solid var(--line);}
.nx-guard-h{display:block;margin-bottom:20px;}
.nx-guard-list{display:grid;grid-template-columns:repeat(3,1fr);gap:20px 32px;}
.nx-guard-list li{display:flex;flex-direction:column;gap:5px;}
.nx-guard-list strong{font-family:var(--sans);font-size:var(--t-body);font-weight:500;color:var(--ink);}
.nx-guard-list .nx-small{color:var(--muted);}

/* ---------- 10. journal ---------- */
.nx-post{display:flex;flex-direction:column;padding:28px;}
.nx-post .nx-micro{margin-bottom:12px;}
.nx-post .nx-small{color:var(--muted);margin-bottom:22px;}

/* ---------- 11. faq ---------- */
.nx-faq{display:flex;flex-direction:column;}
.nx-faq-row{border-top:1px solid var(--line);}
.nx-faq-row:last-child{border-bottom:1px solid var(--line);}
.nx-faq-q{
  width:100%;background:transparent;border:0;cursor:pointer;
  display:flex;align-items:center;justify-content:space-between;gap:16px;
  padding:22px 4px;text-align:left;
  font-family:var(--sans);font-size:var(--t-lede);font-weight:450;letter-spacing:-.015em;color:var(--ink);
}
.nx-faq-ico{color:var(--faint);display:inline-flex;transition:transform .3s var(--ease);flex-shrink:0;}
.nx-faq-row.open .nx-faq-ico{transform:rotate(180deg);color:var(--ink);}
.nx-faq-a{max-height:0;opacity:0;overflow:hidden;transition:max-height .34s var(--ease),opacity .3s ease;}
.nx-faq-row.open .nx-faq-a{max-height:520px;opacity:1;}
.nx-faq-a p{margin:0;padding:0 4px 24px;font-family:var(--sans);font-size:var(--t-body);line-height:1.6;color:var(--body);max-width:68ch;}

/* ---------- contact ---------- */
.nx-contact{background:var(--canvas-alt);border-top:1px solid var(--line);padding:96px 0;}
.nx-contact-grid{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,460px);gap:56px;align-items:start;}
.nx-contact-h{max-width:460px;}
.nx-channels{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin:26px 0 18px;}
.nx-channel{display:flex;flex-direction:column;gap:4px;}
.nx-channel .nx-micro{margin-bottom:6px;}
.nx-channel a{
  font-family:var(--sans);font-size:var(--t-body);color:var(--ink);width:max-content;
  border-bottom:1px solid var(--line);transition:border-color .2s ease;word-break:break-word;
}
.nx-channel a:hover{border-color:var(--ink);}
.nx-contact-meta{display:block;}
.nx-form-card{padding:28px;}
/* Credentials where the decision is made, as a strip. */
.nx-creds{
  display:grid;grid-template-columns:repeat(4,1fr);gap:24px;
  margin-top:64px;padding-top:36px;border-top:1px solid var(--line);
}
.nx-cred{display:flex;align-items:center;gap:14px;}
.nx-cred-plate{
  width:64px;height:64px;flex-shrink:0;border-radius:8px;background:#fff;
  border:1px solid var(--line);display:flex;align-items:center;justify-content:center;padding:8px;
}
.nx-cred-plate img{max-height:min(100%,calc(34px * var(--cs,1)));max-width:min(100%,calc(86% * var(--cs,1)));object-fit:contain;}
.nx-cred-text{display:flex;flex-direction:column;gap:3px;min-width:0;}
.nx-cred-text strong{font-family:var(--sans);font-size:var(--t-small);font-weight:500;color:var(--ink);text-wrap:balance;}

/* ---------- footer ---------- */
.nx-footer{background:var(--canvas);border-top:1px solid var(--line);padding:64px 0 36px;}
.nx-footer-grid{display:grid;grid-template-columns:2fr 1fr 1fr 1.2fr;gap:36px;padding-bottom:40px;}
.nx-footer-desc{color:var(--muted);margin-top:16px;max-width:320px;}
.nx-footer-col{display:flex;flex-direction:column;gap:11px;}
.nx-footer-h{display:block;margin-bottom:4px;color:var(--ink);}
.nx-footer-col a{font-family:var(--sans);font-size:var(--t-small);color:var(--body);width:max-content;transition:color .2s ease;}
.nx-footer-col a:hover{color:var(--ink);}
.nx-footer-legal{padding:24px 0;border-top:1px solid var(--line);}
.nx-footer-legal-rows{display:flex;flex-wrap:wrap;gap:8px 28px;margin-top:10px;}
.nx-footer-bottom{display:flex;align-items:center;justify-content:space-between;gap:16px;padding-top:24px;border-top:1px solid var(--line);flex-wrap:wrap;}

/* ---------- touch targets ----------
   Inline links and footer rows sat at 20–24px tall. Fine for a cursor,
   too small for a thumb, so they grow on coarse pointers only. */
@media (pointer:coarse){
  .nx-link,.nx-footer-col a,.nx-channel a,.nx-menu-link{min-height:44px;display:flex;align-items:center;}
  .nx-footer-col{gap:2px;}
  .nx-lang-opt{padding:11px 12px;}
}

/* ---------- focus ---------- */
.nx a:focus-visible,.nx button:focus-visible,
.nx input:focus-visible,.nx select:focus-visible,.nx textarea:focus-visible{
  outline:2px solid var(--ink);outline-offset:3px;border-radius:6px;
}
.nx-dark a:focus-visible,.nx-dark button:focus-visible{outline-color:var(--dark-ink);}

/* ---------- form (shared component, .nx skin) ----------
   HomeForm is namespaced, so these mirror the names it emits. */
.nx-mono-label{
  font-family:var(--mono);font-size:var(--t-micro);letter-spacing:.07em;
  text-transform:uppercase;color:var(--muted);
}
.nx-card-title{font-family:var(--sans);font-size:var(--t-h3);font-weight:450;letter-spacing:-.03em;color:var(--ink);margin:0 0 8px;}
.nx-card-desc{font-family:var(--sans);font-size:var(--t-body);line-height:1.55;color:var(--body);margin:0;}
.nx-form{display:flex;flex-direction:column;gap:14px;}
.nx-form-row{display:grid;grid-template-columns:1fr 1fr;gap:14px;}
.nx-field{display:flex;flex-direction:column;gap:6px;min-width:0;}
.nx-field input,.nx-field select,.nx-field textarea{
  font-family:var(--sans);font-size:var(--t-body);color:var(--ink);
  background:var(--canvas);border:1px solid var(--line);border-radius:8px;
  padding:11px 13px;width:100%;transition:border-color .2s ease,box-shadow .2s ease;
}
.nx-field textarea{resize:vertical;line-height:1.5;}
.nx-field input::placeholder,.nx-field textarea::placeholder{color:var(--muted);}
.nx-field input:focus,.nx-field select:focus,.nx-field textarea:focus{
  outline:none;border-color:var(--ink);box-shadow:0 0 0 3px color-mix(in srgb,var(--ink) 10%,transparent);
}
.nx-field-err{font-family:var(--sans);font-size:var(--t-small);color:#c2352b;}
.nx-form-note{color:var(--muted);text-transform:none;letter-spacing:0;}
.nx-hp{position:absolute;left:-9999px;width:1px;height:1px;opacity:0;}
.nx-form-done{display:flex;flex-direction:column;align-items:flex-start;gap:8px;}
.nx-form-check{
  width:38px;height:38px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;
  background:var(--green);color:#fff;font-size:18px;margin-bottom:6px;
}

/* ---------- dark theme ---------- */
[data-theme="dark"] .nx{
  --canvas:#0a0b0d;
  --canvas-alt:#101115;
  --surface:#14151a;
  --line:#24262c;
  --line-strong:#34363d;
  --ink:#f3f3f5;
  --body:#c2c4cb;
  --muted:#9c9ea6;
  --faint:#7c7e86;
  --on-ink:#0a0b0d;
  --dark:#000000;
  --dark-surface:#0d0e11;
  --dark-line:#22242a;
  --shadow:0 1px 2px rgba(0,0,0,.5),0 8px 24px -12px rgba(0,0,0,.7);
  --shadow-lift:0 2px 4px rgba(0,0,0,.55),0 18px 40px -16px rgba(0,0,0,.8);
}
[data-theme="dark"] .nx .nx-light-only{display:none;}
[data-theme="dark"] .nx .nx-dark-only{display:block;}
/* A certificate is paper — it keeps its white plate in both themes. */
[data-theme="dark"] .nx-cred-plate{background:#fff;border-color:var(--line);}
/* Client marks are dark-on-transparent; flat white always reads. */
[data-theme="dark"] .nx-slot img{filter:brightness(0) invert(1);opacity:.5;}
[data-theme="dark"] .nx-slot img:hover{filter:brightness(0) invert(1);opacity:1;}
[data-theme="dark"] .nx-quote-logo{filter:brightness(0) invert(1);opacity:.5;}
[data-theme="dark"] .nx-frame{box-shadow:0 40px 80px -40px rgba(0,0,0,.9);}
[data-theme="dark"] .nx-hero-glow{opacity:.2;}
[data-theme="dark"] .nx .nx-btn-invert{background:var(--ink);color:var(--on-ink);border-color:var(--ink);}
[data-theme="dark"] .nx-field-err{color:#ff8a80;}
[data-theme="dark"] .nx-menu{box-shadow:0 24px 48px -24px rgba(0,0,0,.8);}
[data-theme="dark"] .nx-scrim{background:rgba(0,0,0,.55);}

/* ---------- responsive ---------- */
@media (max-width:1100px){
  .nx{--t-display:56px;--t-h2:32px;--t-figure:38px;}
  .nx-team{grid-template-columns:repeat(3,1fr);}
  .nx-guard-list{grid-template-columns:1fr 1fr;}
  /* A trio does NOT reflow to two-plus-one-double-wide: it made the MEGA
     tier twice the size of the others and the third article a banner. */
}
@media (max-width:920px){
  .nx-nav-links{display:none;}
  .nx-wide-only{display:none;}
  .nx-burger{display:inline-flex;}
  .nx-menu{display:block;}
  .nx-scrim{display:block;}
  .nx{--t-display:44px;--t-h2:28px;--t-figure:32px;--t-lede:16px;}
  .nx-chapter{padding:72px 0;}
  .nx-dark{padding:80px 0;}
  .nx-contact{padding:72px 0;}
  .nx-duo{grid-template-columns:1fr;}
  .nx-case-cols{grid-template-columns:1fr;gap:32px;}
  .nx-steps{grid-template-columns:1fr 1fr;gap:28px 0;}
  .nx-step:nth-child(3){padding-left:0;border-left:0;}
  .nx-trio{grid-template-columns:1fr;}
  /* Both cells share one ratio here — a 16/10 next to a 4/5 left 214px of
     empty grey under the shorter one. */
  .nx-office{grid-template-columns:1fr 1fr;}
  .nx-office-1,.nx-office-2{aspect-ratio:4/3;}
  .nx-office-3{display:none;}
  .nx-contact-grid{grid-template-columns:1fr;gap:40px;}
  .nx-creds{grid-template-columns:1fr 1fr;}
  .nx-footer-grid{grid-template-columns:1fr 1fr;}
  .nx-frame-phone{width:132px;bottom:-28px;}
}
@media (max-width:640px){
  .nx{--t-display:36px;--t-h2:25px;--t-figure:28px;--t-h3:18px;}
  .nx-wrap{padding:0 20px;}
  .nx-nav-inner{padding:0 20px;}
  .nx-hero{padding-top:64px;}
  .nx-hero-shot{margin-top:40px;}
  /* A 1920px dashboard squeezed to 340px is colour noise, not proof. On a
     phone the phone build is the honest thing to show. */
  .nx-frame-desktop{display:none;}
  .nx-frame-phone{position:static;width:200px;margin:0 auto;bottom:auto;left:auto;}
  .nx-stats{grid-template-columns:1fr 1fr;gap:20px 0;}
  .nx-stat{border-right:0;}
  .nx-stat:nth-child(-n+2){padding-bottom:20px;border-bottom:1px solid var(--line);}
  .nx-case-figures{grid-template-columns:1fr 1fr;}
  .nx-figure{border-right:0;padding:20px 16px 20px 0;}
  .nx-figure:nth-child(-n+2){border-bottom:1px solid var(--dark-line);}
  .nx-case-media{height:200px;}
  .nx-steps{grid-template-columns:1fr;}
  .nx-step,.nx-step + .nx-step{padding:0 0 24px;border-left:0;}
  .nx-step + .nx-step{padding-top:24px;border-top:1px solid var(--line);}
  .nx-team{grid-template-columns:1fr 1fr;}
  .nx-office{grid-template-columns:1fr;}
  .nx-office-2{display:none;}
  .nx-guard-list{grid-template-columns:1fr;}
  .nx-channels{grid-template-columns:1fr;}
  .nx-creds{grid-template-columns:1fr;gap:18px;}
  .nx-form-row{grid-template-columns:1fr;}
  .nx-footer-grid{grid-template-columns:1fr;}
  .nx-service,.nx-quote,.nx-price,.nx-post,.nx-form-card{padding:24px;}
}

/* ---------- reduced motion ---------- */
@media (prefers-reduced-motion:reduce){
  .nx .nx-in,.nx.nx-ready .nx-in{transform:none;transition:none;opacity:1;}
  .nx *{animation:none!important;}
  .nx-grad-line,.nx-dark-rule{background:var(--spectrum);}
  .nx-btn:hover,.nx-raised:hover{transform:none;}
  .nx-work:hover .nx-work-shot img,.nx-member:hover .nx-member-photo img{transform:none;}
  .nx-menu{transition:none;}
}
`;
