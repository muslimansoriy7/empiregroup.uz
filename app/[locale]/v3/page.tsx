"use client";

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";

/* ------------------------------------------------------------------ *
 *  Empire Group — v3 flagship homepage
 *  "Typeset terminal on white paper" — Vercel design system.
 *  Self-contained: no project imports. Light-only. Inline SVG.
 *  All CSS lives in the single <style> block, scoped under .vx.
 *  Real Geist comes from the site's global next/font vars.
 * ------------------------------------------------------------------ */

/* ============================== DATA ============================== */

const NAV_LINKS = [
  ["Xizmatlar", "#services"],
  ["Jarayon", "#process"],
  ["Loyihalar", "#partners"],
  ["Sharhlar", "#testimonials"],
  ["Narxlar", "#pricing"],
  ["Blog", "#footer"],
];

const STATS: [string, string][] = [
  ["50+", "Yakunlangan loyiha"],
  ["30+", "Mamnun mijoz"],
  ["15+", "Texnologiya"],
  ["3+ yil", "Tajriba"],
];

const LOGOS = [
  "Google", "Meta", "Stripe", "Telegram", "GitHub",
  "Cloudflare", "Vercel", "Figma", "Notion",
];

const SERVICES = [
  {
    n: "01",
    title: "Maxsus dasturiy ta'minot",
    desc: "Web va mobil ilovalar, ichki tizimlar va boshqaruv panellari — biznesingizga aniq mos, noldan quriladi.",
    chips: ["React", "Node.js", "Flutter", "Docker"],
  },
  {
    n: "02",
    title: "Odoo ERP & AI joriy qilish",
    desc: "Barcha jarayonlar yagona tizimda: sotuv, ombor, moliya, HR — AI avtomatlashtirish va bashoratli tahlil bilan.",
    chips: ["Odoo ERP", "AI Automation", "Predictive Analytics"],
  },
];

const STACK: [string, string][] = [
  ["Nx", "Next.js"],
  ["Re", "React"],
  ["Ts", "TypeScript"],
  ["Py", "Python"],
  ["Fl", "Flutter"],
  ["Pg", "PostgreSQL"],
  ["Sb", "Supabase"],
  ["Nd", "Node.js"],
  ["Dk", "Docker"],
  ["Tw", "Tailwind"],
];

const PARTNERS: [string, string][] = [
  ["G", "Google"],
  ["M", "Meta"],
  ["S", "Stripe"],
  ["T", "Telegram"],
  ["Gh", "GitHub"],
  ["Cf", "Cloudflare"],
  ["▲", "Vercel"],
  ["Fg", "Figma"],
  ["N", "Notion"],
];

const PROCESS = [
  {
    n: "01",
    title: "Explore",
    desc: "G'oya va muammoni chuqur o'rganamiz.",
    tags: ["Tahlil", "Audit"],
  },
  {
    n: "02",
    title: "Plan",
    desc: "PRD, arxitektura, dizayn; muddat va byudjet aniq.",
    tags: ["PRD", "TZ", "Dizayn"],
  },
  {
    n: "03",
    title: "Build",
    desc: "Kod, test, integratsiya; sprintlar, demo.",
    tags: ["Dev", "Test", "Demo"],
  },
  {
    n: "04",
    title: "Commit",
    desc: "Ishga tushirish va uzoq muddatli qo'llab-quvvatlash.",
    tags: ["Deploy", "Support"],
  },
];

const TEAM = [
  {
    mono: "MA",
    name: "Muslim Ansoriy",
    role: "Ta'sischi va CEO · Technical Product Manager",
    bio: "7+ yil IT va biznes-avtomatlashtirish; Odoo ERP Partner Manager (Markaziy Osiyo/Kavkaz); 20+ ERP loyiha.",
  },
  {
    mono: "AJ",
    name: "Abbos Jo'rayev",
    role: "Hammuassis va COO",
    bio: "6+ yil IT loyiha boshqaruvi; mijozlar, byudjet, jamoa koordinatsiyasi.",
  },
  {
    mono: "SR",
    name: "Sardor Rahmatullayev",
    role: "Senior Odoo Developer",
    bio: "5 yil Python/Odoo; 30+ custom modul; REST/XML-RPC integratsiya.",
  },
  {
    mono: "DY",
    name: "Dilnoza Yusupova",
    role: "Biznes-analitik · ERP Consultant",
    bio: "4 yil biznes-tahlil; AS-IS/TO-BE; foydalanuvchi o'qitish.",
  },
  {
    mono: "JT",
    name: "Jasurbek Toshmatov",
    role: "Full-stack Developer",
    bio: "5 yil web/mobil; React, Next.js, Node.js, PostgreSQL.",
  },
  {
    mono: "NK",
    name: "Nilufar Karimova",
    role: "Digital Marketing Lead",
    bio: "6 yil marketing; SEO, kontekst, lead generation.",
  },
  {
    mono: "BE",
    name: "Bekzod Ergashev",
    role: "DevOps · System Administrator",
    bio: "4 yil server infratuzilma; Linux, Docker, CI/CD.",
  },
  {
    mono: "MS",
    name: "Malika Sobirova",
    role: "UI/UX Designer",
    bio: "4 yil interfeys dizayni; Figma, dizayn tizimlari.",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "Empire Group eski qog'ozdagi ishimizni to'liq tizimga o'tkazdi — vaqt ancha tejaldi.",
    name: "Aliya M.",
    role: "Motor Lux · CRM",
  },
  {
    quote: "Empire bilan ishlash oson bo'ldi, muddat va byudjet aniq edi.",
    name: "Jasur T.",
    role: "GadgetSpace · E-commerce",
  },
  {
    quote: "Klinika ishini AI qo'shib avtomatlashtirdi. Qabul ancha tartibli.",
    name: "Doniyor R.",
    role: "MedFlow · Klinika",
  },
  {
    quote: "Zamonaviy dizayn, savdo hajmi ko'tarildi.",
    name: "Laziza K.",
    role: "X Wear · E-commerce",
  },
];

const PRICING = [
  {
    tier: "STANDARD",
    price: "$5,000 dan",
    period: "2–3 oy",
    featured: false,
    items: ["MVP mahsulot", "Landing + forma", "Kichik ilova", "Asosiy integratsiya"],
    cta: "Boshlash",
    ctaFilled: false,
  },
  {
    tier: "ADVANCED",
    price: "$15K–$40K",
    period: "4–6 oy",
    featured: true,
    items: ["To'liq ilova", "CRM integratsiya", "Admin panel", "API va avtomatlashtirish"],
    cta: "Loyihani boshlash",
    ctaFilled: true,
  },
  {
    tier: "MEGA",
    price: "$50,000+",
    period: "6–12 oy",
    featured: false,
    items: ["Yirik ekotizim", "Mikroxizmatlar", "Yuqori yuklama", "Uzoq muddatli SLA"],
    cta: "Boshlash",
    ctaFilled: false,
  },
];

const CREDENTIALS = [
  {
    title: "Odoo Learning Partner",
    org: "Odoo S.A.",
    status: "TASDIQLANGAN",
    ok: true,
  },
  {
    title: "Davlat ro'yxatidan o'tganlik guvohnomasi",
    org: '"EMPIRE GROUP CORP" MCHJ',
    status: "TASDIQLANGAN",
    ok: true,
  },
  {
    title: "IT Park rezidenti",
    org: "IT Park Uzbekistan",
    status: "KUTILMOQDA",
    ok: false,
  },
  {
    title: "ISO/IEC 27001",
    org: "Information Security",
    status: "KUTILMOQDA",
    ok: false,
  },
];

const FAQ = [
  {
    q: "Loyiha qancha vaqt oladi?",
    a: "MVP 3–4 hafta, o'rta 2–3 oy, yirik 4–6 oy. Aniq muddat Explore bosqichida belgilanadi.",
  },
  {
    q: "Narxlar qanday belgilanadi?",
    a: "Fixed-scope: loyiha boshida hajm va narx aniq belgilanadi — kutilmagan xarajatlar bo'lmaydi.",
  },
  {
    q: "Mavjud tizimni davom ettira olasizmi?",
    a: "Ha, audit qilib ustiga quramiz yoki kerak bo'lsa qayta yozamiz.",
  },
  {
    q: "Konsultatsiya bepulmi?",
    a: "Ha. Explore bosqichida barcha savollarga javob beramiz — majburiyatsiz.",
  },
];

/* ============================ ICONS ============================ */

const Triangle = ({ size = 13 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 12 12" aria-hidden="true" fill="none">
    <path d="M6 1 11 10.5H1L6 1Z" fill="currentColor" />
  </svg>
);

const Arrow = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" aria-hidden="true" fill="none">
    <path
      d="M3 8h9M8.5 4l4 4-4 4"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/* ============================ PAGE ============================ */

export default function V3Page() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    const root = document.querySelector(".vx");
    if (!root) return;
    const els = Array.from(root.querySelectorAll<HTMLElement>(".vx-rise"));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      els.forEach((e) => e.classList.add("in"));
      return;
    }
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
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  const d = (i: number): CSSProperties =>
    ({ transitionDelay: `${i * 70}ms` } as CSSProperties);

  return (
    <div className="vx">
      <style
        dangerouslySetInnerHTML={{
          __html: CSS,
        }}
      />

      {/* ===================== NAV ===================== */}
      <header className="vx-nav">
        <div className="vx-nav-inner">
          <a className="vx-brand" href="#top" aria-label="Empire Group">
            <span className="vx-brand-mark">
              <Triangle size={14} />
            </span>
            <span className="vx-brand-name">Empire</span>
          </a>

          <nav className="vx-nav-links" aria-label="Asosiy menyu">
            {NAV_LINKS.map(([label, href]) => (
              <a key={label} href={href} className="vx-navlink">
                {label}
              </a>
            ))}
          </nav>

          <div className="vx-nav-actions">
            <a className="vx-btn vx-btn-ghost vx-hide-sm" href="tel:+998991164658">
              +998 99 116 46 58
            </a>
            <a className="vx-btn vx-btn-pill" href="#cta">
              Bepul konsultatsiya
            </a>
          </div>
        </div>
      </header>

      <main id="top">
        {/* ===================== HERO ===================== */}
        <section className="vx-section vx-hero" aria-labelledby="vx-hero-h">
          <div className="vx-grid-bg" aria-hidden="true" />
          <div className="vx-container vx-hero-grid">
            <div className="vx-hero-copy">
              <p className="vx-eyebrow vx-rise" style={d(0)}>
                <span className="vx-tri-eyebrow">
                  <Triangle size={9} />
                </span>
                AI &amp; CUSTOM SOFTWARE DEVELOPMENT
              </p>

              <h1 id="vx-hero-h" className="vx-display vx-rise" style={d(1)}>
                Biznesni{" "}
                <span className="vx-grad-word">
                  raqamlashtiramiz
                  <span className="vx-grad-underline" aria-hidden="true" />
                </span>{" "}
                — g'oyadan ishga tushgan mahsulotgacha.
              </h1>

              <p className="vx-lede vx-rise" style={d(2)}>
                Murakkab ichki jarayonlarni ERP, AI, Web va App yechimlari orqali
                raqamlashtiramiz. G'oyadan tayyor tizim/mahsulotgacha — atigi 2–3
                oyda.
              </p>

              <div className="vx-hero-btns vx-rise" style={d(3)}>
                <a className="vx-btn vx-btn-filled" href="#cta">
                  Loyihani boshlash
                </a>
                <a className="vx-btn vx-btn-ghost" href="#partners">
                  Ishlarni ko'rish <Arrow size={14} />
                </a>
              </div>
            </div>

            {/* CLI + dashboard mock */}
            <div className="vx-hero-mock vx-rise" style={d(2)}>
              <div className="vx-cli">
                <div className="vx-cli-bar" aria-hidden="true">
                  <span className="vx-dot" />
                  <span className="vx-dot" />
                  <span className="vx-dot" />
                  <span className="vx-cli-title">empire — deploy</span>
                </div>
                <div className="vx-cli-body">
                  <p className="vx-cli-cmd">
                    <span className="vx-cli-tri">
                      <Triangle size={10} />
                    </span>
                    empire deploy --project motor-lux
                  </p>
                  <p className="vx-cli-ok">
                    <span className="vx-check">✓</span> Build tayyor · 2–3 oy
                  </p>
                  <p className="vx-cli-ok">
                    <span className="vx-check">✓</span> ERP · AI · Web · App
                  </p>
                  <p className="vx-cli-ok">
                    <span className="vx-check">✓</span> Ishga tushirildi
                  </p>
                  <p className="vx-cli-cmd vx-cli-caret">
                    <span className="vx-cli-tri">
                      <Triangle size={10} />
                    </span>
                    <span className="vx-caret" />
                  </p>
                </div>
              </div>

              <div className="vx-mockcard" aria-hidden="true">
                <div className="vx-mockcard-head">
                  <span className="vx-mono-xs">motor-lux · dashboard</span>
                  <span className="vx-mono-xs vx-live">
                    <span className="vx-live-dot" /> LIVE
                  </span>
                </div>
                <div className="vx-mock-stats">
                  <div>
                    <span className="vx-mono-xs">SAVDO</span>
                    <strong>+38%</strong>
                  </div>
                  <div>
                    <span className="vx-mono-xs">BUYURTMA</span>
                    <strong>1,204</strong>
                  </div>
                  <div>
                    <span className="vx-mono-xs">UPTIME</span>
                    <strong>99.9%</strong>
                  </div>
                </div>
                <div className="vx-mock-bars">
                  {[38, 52, 46, 68, 60, 82, 74].map((h, i) => (
                    <span key={i} style={{ height: `${h}%` } as CSSProperties} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================== STAT BAND ===================== */}
        <section className="vx-section-tight">
          <div className="vx-container">
            <div className="vx-statband vx-rise">
              {STATS.map(([num, label], i) => (
                <div className="vx-stat" key={label} style={d(i)}>
                  <div className="vx-stat-num">{num}</div>
                  <div className="vx-mono-label">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===================== LOGO STRIP ===================== */}
        <section className="vx-section-tight">
          <div className="vx-container">
            <p className="vx-eyebrow vx-center vx-rise">ISHONCH BILAN QURAMIZ</p>
            <div className="vx-logostrip vx-rise">
              {LOGOS.map((name, i) => (
                <span className="vx-logo" key={name} style={d(i % 5)}>
                  {name}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ===================== SERVICES ===================== */}
        <section className="vx-section" id="services">
          <div className="vx-container">
            <div className="vx-sec-head">
              <p className="vx-eyebrow vx-rise">XIZMATLAR</p>
              <h2 className="vx-heading vx-rise" style={d(1)}>
                Ikki yo'nalish, bitta standart.
              </h2>
            </div>
            <div className="vx-services-grid">
              {SERVICES.map((s, i) => (
                <article className="vx-card vx-service vx-rise" key={s.title} style={d(i)}>
                  <div className="vx-service-top">
                    <span className="vx-mono-tag">{s.n}</span>
                    <span className="vx-service-tri">
                      <Triangle size={12} />
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
                  <a className="vx-mono-link" href="#pricing">
                    batafsil <Arrow size={13} />
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ===================== STACK ===================== */}
        <section className="vx-section" id="stack">
          <div className="vx-container">
            <div className="vx-sec-head">
              <p className="vx-eyebrow vx-rise">BIZNING STACK</p>
              <h2 className="vx-heading vx-rise" style={d(1)}>
                Ishonchli, sanoat standarti texnologiyalar.
              </h2>
            </div>
            <div className="vx-tilegrid">
              {STACK.map(([mono, name], i) => (
                <div className="vx-card vx-tile vx-rise" key={name} style={d(i % 5)}>
                  <span className="vx-monogram">{mono}</span>
                  <span className="vx-tile-name">{name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===================== PARTNERS ===================== */}
        <section className="vx-section" id="partners">
          <div className="vx-container">
            <div className="vx-sec-head">
              <p className="vx-eyebrow vx-rise">GLOBAL STANDART</p>
              <h2 className="vx-heading vx-rise" style={d(1)}>
                Dunyo yetakchilari darajasida ishlaymiz.
              </h2>
            </div>
            <div className="vx-tilegrid">
              {PARTNERS.map(([mono, name], i) => (
                <div className="vx-card vx-tile vx-rise" key={name} style={d(i % 5)}>
                  <span className="vx-monogram">{mono}</span>
                  <span className="vx-tile-name">{name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===================== PROCESS ===================== */}
        <section className="vx-section" id="process">
          <div className="vx-container">
            <div className="vx-sec-head">
              <p className="vx-eyebrow vx-rise">QANDAY ISHLAYMIZ</p>
              <h2 className="vx-heading vx-rise" style={d(1)}>
                G'oyadan mahsulotgacha — 4 bosqich.
              </h2>
            </div>
            <div className="vx-process-grid">
              {PROCESS.map((p, i) => (
                <article className="vx-card vx-proc vx-rise" key={p.n} style={d(i)}>
                  <div className="vx-proc-top">
                    <span className="vx-proc-tri">
                      <Triangle size={11} />
                    </span>
                    <span className="vx-mono-tag">{p.n}</span>
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
              <p className="vx-eyebrow vx-rise">BIZ KIMMIZ</p>
              <h2 className="vx-heading vx-rise" style={d(1)}>
                Ortida — real jamoa.
              </h2>
            </div>
            <div className="vx-team-grid">
              {TEAM.map((m, i) => (
                <article className="vx-card vx-member vx-rise" key={m.name} style={d(i % 4)}>
                  <div className="vx-avatar">{m.mono}</div>
                  <h3 className="vx-member-name">{m.name}</h3>
                  <p className="vx-member-role">{m.role}</p>
                  <p className="vx-member-bio">{m.bio}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ===================== TESTIMONIALS ===================== */}
        <section className="vx-section" id="testimonials">
          <div className="vx-container">
            <div className="vx-sec-head">
              <p className="vx-eyebrow vx-rise">MIJOZLAR FIKRI</p>
              <h2 className="vx-heading vx-rise" style={d(1)}>
                Mijozlarimiz nima deydi.
              </h2>
            </div>
            <div className="vx-quote-grid">
              {TESTIMONIALS.map((t, i) => (
                <figure className="vx-card vx-quote vx-rise" key={t.name} style={d(i % 2)}>
                  <span className="vx-quote-mark" aria-hidden="true">
                    <Triangle size={12} />
                  </span>
                  <blockquote className="vx-quote-text">{t.quote}</blockquote>
                  <figcaption className="vx-quote-cap">
                    <span className="vx-quote-name">{t.name}</span>
                    <span className="vx-mono-label">{t.role}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* ===================== PRICING ===================== */}
        <section className="vx-section" id="pricing">
          <div className="vx-container">
            <div className="vx-sec-head">
              <p className="vx-eyebrow vx-rise">NARXLAR</p>
              <h2 className="vx-heading vx-rise" style={d(1)}>
                Shaffof narxlar.
              </h2>
            </div>
            <div className="vx-pricing-grid">
              {PRICING.map((p, i) => (
                <article
                  className={`vx-card vx-price vx-rise${p.featured ? " vx-price-feat" : ""}`}
                  key={p.tier}
                  style={d(i)}
                >
                  {p.featured && <span className="vx-price-badge">KO'P TANLANADI</span>}
                  <span className="vx-mono-tag">{p.tier}</span>
                  <div className="vx-price-amt">{p.price}</div>
                  <div className="vx-mono-label vx-price-period">{p.period}</div>
                  <ul className="vx-price-list">
                    {p.items.map((it) => (
                      <li key={it}>
                        <span className="vx-li-check">✓</span>
                        {it}
                      </li>
                    ))}
                  </ul>
                  <a
                    className={`vx-btn ${
                      p.ctaFilled
                        ? p.featured
                          ? "vx-btn-invert"
                          : "vx-btn-filled"
                        : "vx-btn-ghost"
                    } vx-btn-block`}
                    href="#cta"
                  >
                    {p.cta}
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ===================== CREDENTIALS ===================== */}
        <section className="vx-section" id="credentials">
          <div className="vx-container">
            <div className="vx-sec-head">
              <p className="vx-eyebrow vx-rise">ISHONCH VA TASDIQ</p>
              <h2 className="vx-heading vx-rise" style={d(1)}>
                Rasmiy maqom va sertifikatlar.
              </h2>
            </div>
            <div className="vx-cred-grid">
              {CREDENTIALS.map((c, i) => (
                <article className="vx-card vx-cred vx-rise" key={c.title} style={d(i % 4)}>
                  <span
                    className={`vx-cred-status ${c.ok ? "vx-cred-ok" : "vx-cred-wait"}`}
                  >
                    {c.ok ? "✓" : "●"} {c.status}
                  </span>
                  <h3 className="vx-cred-title">{c.title}</h3>
                  <p className="vx-mono-label">{c.org}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ===================== FAQ ===================== */}
        <section className="vx-section" id="faq">
          <div className="vx-container vx-faq-wrap">
            <div className="vx-sec-head">
              <p className="vx-eyebrow vx-rise">SAVOL-JAVOB</p>
              <h2 className="vx-heading vx-rise" style={d(1)}>
                Ko'p so'raladigan savollar.
              </h2>
            </div>
            <div className="vx-faq">
              {FAQ.map((f, i) => {
                const isOpen = openFaq === i;
                return (
                  <div
                    className={`vx-card vx-faq-row vx-rise${isOpen ? " open" : ""}`}
                    key={f.q}
                    style={d(i)}
                  >
                    <button
                      className="vx-faq-q"
                      aria-expanded={isOpen}
                      onClick={() => setOpenFaq(isOpen ? null : i)}
                    >
                      <span>{f.q}</span>
                      <span className="vx-faq-tri" aria-hidden="true">
                        <Triangle size={11} />
                      </span>
                    </button>
                    <div className="vx-faq-a" role="region">
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
              <p className="vx-eyebrow vx-center">TAYYORMISIZ?</p>
              <h2 className="vx-heading vx-cta-h">Loyihangizni bugun boshlaymiz.</h2>
              <div className="vx-cta-btns">
                <a className="vx-btn vx-btn-filled vx-btn-lg" href="tel:+998991164658">
                  Bepul konsultatsiya
                </a>
              </div>
              <p className="vx-mono-label vx-cta-meta">
                +998 99 116 46 58 · t.me/muslimansoriy · Toshkent
              </p>
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
                <Triangle size={14} />
              </span>
              <span className="vx-brand-name">Empire</span>
            </a>
            <p className="vx-footer-desc">
              Toshkentda AI, ERP va maxsus dasturiy ta'minot — g'oyadan ishga
              tushgan mahsulotgacha.
            </p>
          </div>

          <div className="vx-footer-col">
            <p className="vx-mono-label vx-footer-h">Xizmatlar</p>
            <a href="#services">Maxsus dasturiy ta'minot</a>
            <a href="#services">Odoo ERP &amp; AI</a>
            <a href="#pricing">Narxlar</a>
          </div>

          <div className="vx-footer-col">
            <p className="vx-mono-label vx-footer-h">Kompaniya</p>
            <a href="#partners">Loyihalar</a>
            <a href="#process">Jarayon</a>
            <a href="#testimonials">Sharhlar</a>
            <a href="#footer">Blog</a>
          </div>

          <div className="vx-footer-col">
            <p className="vx-mono-label vx-footer-h">Aloqa</p>
            <a href="https://t.me/muslimansoriy">Telegram</a>
            <a href="#footer">Instagram</a>
            <a href="mailto:info@empiregroup.uz">Email</a>
            <a href="tel:+998991164658">Telefon</a>
          </div>
        </div>
        <div className="vx-container vx-footer-bottom">
          <span className="vx-mono-label">
            © 2026 Empire Group. Barcha huquqlar himoyalangan.
          </span>
          <span className="vx-mono-label">Toshkent · O'zbekiston</span>
        </div>
      </footer>
    </div>
  );
}

/* ============================== CSS ============================== */

const CSS = `
.vx{
  --paper:#fafafa; --white:#ffffff; --hair:#ebebeb; --ash:#c9c9c9;
  --smoke:#a8a8a8; --graphite:#8f8f8f; --slate:#7d7d7d; --stone:#666666;
  --charcoal:#4d4d4d; --obsidian:#171717; --carbon:#000000;
  --green:#297a3a;
  --spectrum:linear-gradient(90deg,rgb(0,255,149) 0%,rgb(255,208,0) 25%,rgb(255,23,68) 50%,rgb(149,0,255) 75%,rgb(0,229,255) 100%);
  --sans:var(--font-geist-sans),ui-sans-serif,system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;
  --mono:var(--font-geist-mono),ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;
  --ring:0 0 0 1px rgba(0,0,0,.08),0 0 0 2px var(--paper);
  --ring-hover:0 0 0 1px var(--obsidian),0 0 0 2px var(--paper);
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

/* ---------- reveal ---------- */
.vx .vx-rise{
  opacity:1;
  transform:translateY(18px);
  transition:opacity .6s cubic-bezier(0.16,1,0.3,1),transform .6s cubic-bezier(0.16,1,0.3,1);
  will-change:transform,opacity;
}
.vx .vx-rise.in{transform:none;}

/* ---------- container / section ---------- */
.vx-container{max-width:1280px;margin:0 auto;padding:0 24px;width:100%;}
.vx-section{padding:104px 0;}
.vx-section-tight{padding:40px 0;}

/* ---------- eyebrow / mono labels ---------- */
.vx-eyebrow{
  font-family:var(--mono);
  font-size:11px;line-height:1.5;font-weight:400;
  letter-spacing:.071em;text-transform:uppercase;color:var(--obsidian);
  margin:0 0 16px;display:inline-flex;align-items:center;gap:8px;
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
  background:var(--obsidian);transition:width .3s cubic-bezier(0.16,1,0.3,1);
}
.vx-mono-link:hover::after{width:calc(100% - 22px);}
.vx-mono-link:hover svg{transform:translateX(3px);}

/* ---------- headings ---------- */
.vx-heading{
  font-family:var(--sans);font-size:30px;line-height:1.1;letter-spacing:-1.5px;
  font-weight:450;color:var(--obsidian);margin:0;
}
.vx-sec-head{margin-bottom:44px;max-width:640px;}

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
.vx-brand{display:inline-flex;align-items:center;gap:8px;}
.vx-brand-mark{color:var(--carbon);display:inline-flex;}
.vx-brand-name{
  font-family:var(--sans);font-size:15px;font-weight:500;
  letter-spacing:-.02em;color:var(--obsidian);
}
.vx-nav-links{display:flex;align-items:center;gap:26px;}
.vx-navlink{
  font-family:var(--sans);font-size:14px;font-weight:400;color:var(--charcoal);
  position:relative;padding:4px 0;transition:color .2s ease;
}
.vx-navlink::after{
  content:"";position:absolute;left:0;bottom:0;height:1px;width:0;
  background:var(--obsidian);transition:width .28s cubic-bezier(0.16,1,0.3,1);
}
.vx-navlink:hover{color:var(--obsidian);}
.vx-navlink:hover::after{width:100%;}
.vx-nav-actions{display:flex;align-items:center;gap:10px;}

/* ---------- buttons ---------- */
.vx-btn{
  font-family:var(--sans);font-size:14px;font-weight:400;line-height:1;
  display:inline-flex;align-items:center;justify-content:center;gap:8px;
  border-radius:6px;padding:10px 16px;cursor:pointer;border:0;
  transition:transform .2s cubic-bezier(0.16,1,0.3,1),background .2s ease,box-shadow .2s ease,color .2s ease;
  white-space:nowrap;text-decoration:none;
}
.vx .vx-btn-filled{background:var(--obsidian);color:#fff;box-shadow:0 0 0 1px var(--obsidian);}
.vx .vx-btn-filled:hover{background:#000;transform:translateY(-2px);}
.vx .vx-btn-ghost{background:transparent;color:var(--charcoal);box-shadow:0 0 0 1px var(--hair);}
.vx .vx-btn-ghost:hover{color:var(--obsidian);box-shadow:0 0 0 1px var(--obsidian);transform:translateY(-2px);}
.vx .vx-btn-pill{
  background:var(--obsidian);color:#fff;border-radius:9999px;padding:8px 16px;
  box-shadow:0 0 0 1px var(--obsidian);
}
.vx .vx-btn-pill:hover{background:#000;transform:translateY(-1px);}
.vx .vx-btn-invert{background:var(--white);color:var(--obsidian);box-shadow:0 0 0 1px rgba(255,255,255,.2);}
.vx .vx-btn-invert:hover{background:var(--paper);transform:translateY(-2px);}
.vx-btn-block{width:100%;margin-top:auto;}
.vx-btn-lg{padding:13px 26px;font-size:15px;}

/* ---------- cards ---------- */
.vx-card{
  background:var(--white);border-radius:6px;box-shadow:var(--ring);
  padding:20px;transition:transform .28s cubic-bezier(0.16,1,0.3,1),box-shadow .28s ease;
}
.vx-card:hover{transform:translateY(-3px);box-shadow:var(--ring-hover);}

/* ---------- hero ---------- */
.vx-hero{position:relative;padding:72px 0 96px;overflow:hidden;}
.vx-grid-bg{
  position:absolute;inset:0;pointer-events:none;z-index:0;
  background-image:linear-gradient(var(--hair) 1px,transparent 1px),linear-gradient(90deg,var(--hair) 1px,transparent 1px);
  background-size:64px 64px;
  -webkit-mask-image:radial-gradient(120% 90% at 30% 0%,#000 0%,transparent 70%);
  mask-image:radial-gradient(120% 90% at 30% 0%,#000 0%,transparent 70%);
  opacity:.6;
}
.vx-hero-grid{
  position:relative;z-index:1;display:grid;
  grid-template-columns:minmax(0,1.05fr) minmax(0,.95fr);
  gap:56px;align-items:center;
}
.vx-hero-copy{max-width:640px;}
.vx-display{
  font-family:var(--sans);font-size:60px;line-height:1;letter-spacing:-.06em;
  font-weight:450;color:var(--obsidian);margin:0 0 24px;
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
  margin:0 0 28px;max-width:520px;font-weight:400;
}
.vx-hero-btns{display:flex;gap:12px;flex-wrap:wrap;}

/* ---------- hero mock ---------- */
.vx-hero-mock{display:flex;flex-direction:column;gap:16px;min-width:0;}
.vx-cli{
  background:var(--white);border-radius:6px;box-shadow:var(--ring);overflow:hidden;
}
.vx-cli-bar{
  display:flex;align-items:center;gap:6px;padding:10px 14px;
  border-bottom:1px solid var(--hair);
}
.vx-dot{width:9px;height:9px;border-radius:50%;background:var(--hair);box-shadow:0 0 0 1px rgba(0,0,0,.05);}
.vx-cli-title{
  font-family:var(--mono);font-size:11px;letter-spacing:.06em;color:var(--smoke);
  margin-left:8px;text-transform:lowercase;
}
.vx-cli-body{padding:16px;display:flex;flex-direction:column;gap:9px;font-family:var(--mono);font-size:13px;line-height:1.4;}
.vx-cli-cmd{margin:0;color:var(--obsidian);display:flex;align-items:center;gap:9px;}
.vx-cli-tri{color:var(--carbon);display:inline-flex;}
.vx-cli-ok{margin:0;color:var(--charcoal);display:flex;align-items:center;gap:9px;}
.vx-check{color:var(--green);font-weight:600;}
.vx-caret{display:inline-block;width:8px;height:16px;background:var(--obsidian);animation:vx-blink 1.1s step-end infinite;}
@keyframes vx-blink{0%,50%{opacity:1;}51%,100%{opacity:0;}}

.vx-mockcard{background:var(--white);border-radius:6px;box-shadow:var(--ring);padding:16px;}
.vx-mockcard-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;}
.vx-live{display:inline-flex;align-items:center;gap:6px;color:var(--green);}
.vx-live-dot{width:6px;height:6px;border-radius:50%;background:var(--green);animation:vx-pulse 1.6s ease-in-out infinite;}
@keyframes vx-pulse{0%,100%{opacity:1;}50%{opacity:.35;}}
.vx-mock-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:16px;}
.vx-mock-stats div{display:flex;flex-direction:column;gap:4px;}
.vx-mock-stats strong{font-family:var(--sans);font-size:20px;font-weight:450;letter-spacing:-.03em;color:var(--obsidian);}
.vx-mock-bars{display:flex;align-items:flex-end;gap:6px;height:64px;padding-top:6px;border-top:1px solid var(--hair);}
.vx-mock-bars span{flex:1;background:var(--obsidian);border-radius:2px 2px 0 0;min-height:6px;opacity:.85;transition:height .5s ease;}
.vx-mock-bars span:last-child{background:var(--green);}

/* ---------- stat band ---------- */
.vx-statband{
  display:grid;grid-template-columns:repeat(4,1fr);
  background:var(--white);border-radius:6px;box-shadow:var(--ring);overflow:hidden;
}
.vx-stat{padding:28px 24px;border-right:1px solid var(--hair);}
.vx-stat:last-child{border-right:0;}
.vx-stat-num{font-family:var(--sans);font-size:34px;font-weight:450;letter-spacing:-.05em;color:var(--obsidian);margin-bottom:6px;line-height:1;}

/* ---------- logo strip ---------- */
.vx-logostrip{
  display:flex;flex-wrap:wrap;align-items:center;justify-content:center;
  gap:16px 40px;margin-top:8px;
}
.vx-logo{
  font-family:var(--sans);font-size:20px;font-weight:450;letter-spacing:-.03em;
  color:var(--smoke);transition:color .25s ease,transform .25s ease;cursor:default;
}
.vx-logo:hover{color:var(--obsidian);transform:translateY(-1px);}

/* ---------- services ---------- */
.vx-services-grid{display:grid;grid-template-columns:1fr 1fr;gap:20px;}
.vx-service{display:flex;flex-direction:column;padding:28px;min-height:100%;}
.vx-service-top{display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;}
.vx-service-tri{color:var(--carbon);opacity:.9;display:inline-flex;}
.vx-card-title{font-family:var(--sans);font-size:22px;font-weight:450;letter-spacing:-.03em;color:var(--obsidian);margin:0 0 10px;}
.vx-card-desc{font-family:var(--sans);font-size:15px;line-height:1.5;color:var(--charcoal);margin:0 0 18px;}
.vx-chips{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:18px;}
.vx-chip{
  font-family:var(--mono);font-size:11px;letter-spacing:.04em;color:var(--stone);
  padding:5px 10px;border-radius:6px;box-shadow:0 0 0 1px var(--hair);background:var(--paper);
}

/* ---------- tiles (stack / partners) ---------- */
.vx-tilegrid{display:grid;grid-template-columns:repeat(5,1fr);gap:14px;}
.vx-tile{display:flex;flex-direction:column;align-items:center;gap:12px;padding:22px 14px;text-align:center;}
.vx-monogram{
  width:44px;height:44px;border-radius:6px;box-shadow:0 0 0 1px var(--hair);
  display:flex;align-items:center;justify-content:center;background:var(--paper);
  font-family:var(--mono);font-size:15px;font-weight:500;color:var(--obsidian);
  transition:background .25s ease,color .25s ease,box-shadow .25s ease;
}
.vx-tile:hover .vx-monogram{background:var(--obsidian);color:#fff;box-shadow:0 0 0 1px var(--obsidian);}
.vx-tile-name{font-family:var(--mono);font-size:11px;letter-spacing:.05em;color:var(--stone);text-transform:uppercase;}

/* ---------- process ---------- */
.vx-process-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;}
.vx-proc{display:flex;flex-direction:column;padding:24px;}
.vx-proc-top{display:flex;align-items:center;gap:10px;margin-bottom:18px;}
.vx-proc-tri{color:var(--carbon);display:inline-flex;}
.vx-proc-title{font-family:var(--sans);font-size:19px;font-weight:450;letter-spacing:-.02em;color:var(--obsidian);margin:0 0 8px;}

/* ---------- team ---------- */
.vx-team-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;}
.vx-member{display:flex;flex-direction:column;padding:22px;}
.vx-avatar{
  width:46px;height:46px;border-radius:6px;background:var(--obsidian);color:#fff;
  display:flex;align-items:center;justify-content:center;margin-bottom:16px;
  font-family:var(--mono);font-size:15px;font-weight:500;letter-spacing:.02em;
}
.vx-member-name{font-family:var(--sans);font-size:16px;font-weight:500;letter-spacing:-.02em;color:var(--obsidian);margin:0 0 6px;}
.vx-member-role{font-family:var(--mono);font-size:10px;letter-spacing:.06em;text-transform:uppercase;color:var(--slate);margin:0 0 12px;line-height:1.5;}
.vx-member-bio{font-family:var(--sans);font-size:13px;line-height:1.5;color:var(--charcoal);margin:0;}

/* ---------- testimonials ---------- */
.vx-quote-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px;}
.vx-quote{display:flex;flex-direction:column;padding:26px;}
.vx-quote-mark{color:var(--carbon);margin-bottom:16px;display:inline-flex;}
.vx-quote-text{font-family:var(--sans);font-size:18px;line-height:1.45;letter-spacing:-.02em;color:var(--obsidian);margin:0 0 20px;font-weight:400;}
.vx-quote-cap{display:flex;flex-direction:column;gap:4px;margin-top:auto;}
.vx-quote-name{font-family:var(--sans);font-size:14px;font-weight:500;color:var(--obsidian);}

/* ---------- pricing ---------- */
.vx-pricing-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;align-items:stretch;}
.vx-price{display:flex;flex-direction:column;padding:28px;position:relative;}
.vx-price-amt{font-family:var(--sans);font-size:30px;font-weight:450;letter-spacing:-.04em;color:var(--obsidian);margin:14px 0 4px;line-height:1;}
.vx-price-period{margin-bottom:20px;}
.vx-price-list{list-style:none;margin:0 0 24px;padding:0;display:flex;flex-direction:column;gap:11px;}
.vx-price-list li{font-family:var(--sans);font-size:14px;color:var(--charcoal);display:flex;align-items:flex-start;gap:9px;line-height:1.4;}
.vx-li-check{color:var(--green);font-weight:600;flex-shrink:0;}
.vx-price-feat{background:var(--obsidian);color:#fff;box-shadow:0 0 0 1px var(--obsidian),0 0 0 2px var(--paper);}
.vx-price-feat:hover{transform:translateY(-3px);box-shadow:0 0 0 1px #000,0 0 0 2px var(--paper);}
.vx-price-feat .vx-price-amt{color:#fff;}
.vx-price-feat .vx-mono-tag{color:var(--smoke);}
.vx-price-feat .vx-price-list li{color:#d4d4d4;}
.vx-price-feat .vx-mono-label{color:var(--smoke);}
.vx-price-badge{
  position:absolute;top:-1px;right:-1px;
  font-family:var(--mono);font-size:9px;letter-spacing:.09em;text-transform:uppercase;
  background:var(--white);color:var(--obsidian);padding:6px 10px;border-radius:0 6px 0 6px;
  box-shadow:0 0 0 1px rgba(255,255,255,.15);
}

/* ---------- credentials ---------- */
.vx-cred-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;}
.vx-cred{display:flex;flex-direction:column;padding:22px;min-height:150px;}
.vx-cred-status{font-family:var(--mono);font-size:10px;letter-spacing:.07em;text-transform:uppercase;margin-bottom:16px;display:inline-flex;align-items:center;gap:6px;width:max-content;}
.vx-cred-ok{color:var(--green);}
.vx-cred-wait{color:var(--smoke);}
.vx-cred-title{font-family:var(--sans);font-size:15px;font-weight:500;letter-spacing:-.01em;color:var(--obsidian);margin:0 0 8px;line-height:1.35;}

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
.vx-faq-tri{color:var(--carbon);display:inline-flex;transition:transform .3s cubic-bezier(0.16,1,0.3,1);flex-shrink:0;}
.vx-faq-row.open .vx-faq-tri{transform:rotate(180deg);}
.vx-faq-a{max-height:0;opacity:0;transition:max-height .34s cubic-bezier(0.16,1,0.3,1),opacity .3s ease;}
.vx-faq-row.open .vx-faq-a{max-height:200px;opacity:1;}
.vx-faq-a p{margin:0;padding:0 22px 22px;font-family:var(--sans);font-size:15px;line-height:1.55;color:var(--charcoal);max-width:660px;}

/* ---------- final cta ---------- */
.vx-ctaband{
  background:var(--white);border-radius:6px;box-shadow:var(--ring);
  padding:72px 40px;text-align:center;display:flex;flex-direction:column;align-items:center;
  position:relative;overflow:hidden;
}
.vx-ctaband::before{
  content:"";position:absolute;left:0;right:0;top:0;height:3px;
  background:var(--spectrum);background-size:200% 100%;animation:vx-sweep 5s linear infinite;
}
.vx-cta-h{font-size:40px;letter-spacing:-.045em;margin:14px 0 28px;line-height:1.02;max-width:640px;}
.vx-cta-btns{margin-bottom:24px;}
.vx-cta-meta{color:var(--stone);}

/* ---------- footer ---------- */
.vx-footer{padding:64px 0 40px;}
.vx-footer-grid{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:32px;padding-bottom:40px;}
.vx-footer-desc{font-family:var(--sans);font-size:14px;line-height:1.55;color:var(--stone);margin:16px 0 0;max-width:320px;}
.vx-footer-col{display:flex;flex-direction:column;gap:12px;}
.vx-footer-h{margin-bottom:4px;color:var(--obsidian);}
.vx-footer-col a{font-family:var(--sans);font-size:14px;color:var(--charcoal);width:max-content;position:relative;transition:color .2s ease;}
.vx-footer-col a::after{content:"";position:absolute;left:0;bottom:-2px;height:1px;width:0;background:var(--obsidian);transition:width .28s cubic-bezier(0.16,1,0.3,1);}
.vx-footer-col a:hover{color:var(--obsidian);}
.vx-footer-col a:hover::after{width:100%;}
.vx-footer-bottom{display:flex;align-items:center;justify-content:space-between;gap:16px;padding-top:28px;border-top:1px solid var(--hair);flex-wrap:wrap;}

/* ---------- focus ---------- */
.vx a:focus-visible,.vx button:focus-visible{
  outline:2px solid var(--obsidian);outline-offset:3px;border-radius:4px;
}

/* ---------- responsive ---------- */
@media (max-width:1000px){
  .vx-tilegrid{grid-template-columns:repeat(3,1fr);}
  .vx-process-grid{grid-template-columns:repeat(2,1fr);}
  .vx-team-grid{grid-template-columns:repeat(2,1fr);}
  .vx-cred-grid{grid-template-columns:repeat(2,1fr);}
}
@media (max-width:880px){
  .vx-nav-links{display:none;}
  .vx-hero-grid{grid-template-columns:1fr;gap:40px;}
  .vx-display{font-size:44px;}
  .vx-services-grid{grid-template-columns:1fr;}
  .vx-quote-grid{grid-template-columns:1fr;}
  .vx-pricing-grid{grid-template-columns:1fr;}
  .vx-footer-grid{grid-template-columns:1fr 1fr;}
  .vx-section{padding:80px 0;}
}
@media (max-width:640px){
  .vx-hide-sm{display:none;}
  .vx-statband{grid-template-columns:1fr 1fr;}
  .vx-stat:nth-child(2){border-right:0;}
  .vx-stat:nth-child(1),.vx-stat:nth-child(2){border-bottom:1px solid var(--hair);}
  .vx-tilegrid{grid-template-columns:repeat(2,1fr);}
  .vx-process-grid,.vx-team-grid,.vx-cred-grid{grid-template-columns:1fr;}
  .vx-display{font-size:38px;}
  .vx-heading{font-size:26px;}
  .vx-cta-h{font-size:30px;}
  .vx-footer-grid{grid-template-columns:1fr;}
  .vx-ctaband{padding:48px 22px;}
  .vx-container{padding:0 18px;}
}

/* ---------- reduced motion ---------- */
@media (prefers-reduced-motion:reduce){
  .vx .vx-rise{transform:none;transition:none;}
  .vx .vx-rise.in{transform:none;}
  .vx *{animation:none!important;}
  .vx-grad-underline{background:var(--spectrum);}
  .vx-btn:hover,.vx-card:hover,.vx-logo:hover{transform:none;}
}
`;
