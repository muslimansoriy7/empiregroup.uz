"use client";

import React, { useState } from "react";

/* =========================================================================
   Empire Group — "Frame.io / Midnight cinema projection room" demo landing
   Self-contained. All styles in one scoped <style> block under .fio.
   FrameGothic -> Inter (spec substitute). NeueMachinaInktrap -> Space Mono.
   ========================================================================= */

type CSSVars = React.CSSProperties & Record<string, string | number>;

/* ---- tiny inline icons (thin-stroke, single color, 24px, outlined) ---- */
const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function IconCode() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
      <path {...stroke} d="M8 8l-4 4 4 4M16 8l4 4-4 4M13.5 5l-3 14" />
    </svg>
  );
}
function IconGrid() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
      <rect {...stroke} x="4" y="4" width="6.5" height="6.5" rx="1" />
      <rect {...stroke} x="13.5" y="4" width="6.5" height="6.5" rx="1" />
      <rect {...stroke} x="4" y="13.5" width="6.5" height="6.5" rx="1" />
      <rect {...stroke} x="13.5" y="13.5" width="6.5" height="6.5" rx="1" />
    </svg>
  );
}
function IconSpark() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
      <path {...stroke} d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M18 6l-2.5 2.5M8.5 15.5L6 18" />
      <circle {...stroke} cx="12" cy="12" r="2.5" />
    </svg>
  );
}
function IconSearch() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
      <circle {...stroke} cx="11" cy="11" r="6" />
      <path {...stroke} d="M20 20l-4.5-4.5" />
    </svg>
  );
}
function IconMap() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
      <path {...stroke} d="M9 4L4 6v14l5-2 6 2 5-2V4l-5 2-6-2z" />
      <path {...stroke} d="M9 4v14M15 6v14" />
    </svg>
  );
}
function IconLayers() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
      <path {...stroke} d="M12 3l9 5-9 5-9-5 9-5z" />
      <path {...stroke} d="M3 12l9 5 9-5M3 16l9 5 9-5" />
    </svg>
  );
}
function IconCheck() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
      <circle {...stroke} cx="12" cy="12" r="9" />
      <path {...stroke} d="M8 12.5l2.5 2.5L16 9.5" />
    </svg>
  );
}
function IconArrow() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <path {...stroke} d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}
function IconPlus() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path {...stroke} d="M12 5v14M5 12h14" />
    </svg>
  );
}
function IconStar() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
      <path fill="currentColor" d="M12 2.5l2.9 5.9 6.6.9-4.8 4.6 1.1 6.5L12 17.9 6.1 21l1.1-6.5L2.4 9.9l6.6-.9L12 2.5z" />
    </svg>
  );
}
function IconMenu() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
      <path {...stroke} d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}
function IconClose() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
      <path {...stroke} d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}
function IconPlay() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
      <path fill="currentColor" d="M8 5.5v13l11-6.5-11-6.5z" />
    </svg>
  );
}

/* ---------------------------- content data ----------------------------- */
const NAV = [
  { label: "Xizmatlar", href: "#services" },
  { label: "Jarayon", href: "#process" },
  { label: "Loyihalar", href: "#cases" },
  { label: "Sharhlar", href: "#reviews" },
  { label: "Narxlar", href: "#pricing" },
];

const PROOF = ["Google", "Meta", "Stripe", "Telegram", "GitHub", "Cloudflare", "Vercel", "Figma", "Notion"];

const STATS = [
  { n: "50+", l: "Loyiha" },
  { n: "30+", l: "Mijoz" },
  { n: "15+", l: "Texnologiya" },
  { n: "3+", l: "Yil" },
];

const TIERS = [
  { name: "STANDARD", price: "$5,000 dan", term: "2–3 oy", popular: false },
  { name: "ADVANCED", price: "$15K–$40K", term: "4–6 oy", popular: true },
  { name: "MEGA", price: "$50,000+", term: "6–12 oy", popular: false },
];

const PROCESS = [
  { no: "01", title: "Explore", body: "G'oya va muammoni chuqur o'rganamiz.", tags: ["Tahlil", "Audit"], icon: <IconSearch /> },
  { no: "02", title: "Plan", body: "PRD, arxitektura, dizayn; muddat/byudjet aniq.", tags: ["PRD", "TZ", "Dizayn"], icon: <IconMap /> },
  { no: "03", title: "Build", body: "Kod, test, integratsiya; sprintlar, demo.", tags: ["Dev", "Test", "Demo"], icon: <IconLayers /> },
  { no: "04", title: "Commit", body: "Ishga tushirish va qo'llab-quvvatlash.", tags: ["Deploy", "Support"], icon: <IconCheck /> },
];

const CASES = [
  { title: "Motor Lux", desc: "CRM va savdo tizimi", tag: "Avtomobil", metric: "CRM" },
  { title: "GadgetSpace", desc: "Onlayn elektronika do'koni", tag: "E-commerce", metric: "2.1× konversiya" },
  { title: "Hilol Market", desc: "Savdo avtomatlashtirish", tag: "POS", metric: "2× tez" },
  { title: "MedFlow", desc: "Klinika boshqaruvi", tag: "Healthcare", metric: "AI" },
];

const REVIEWS = [
  { name: "Aliya M.", role: "Motor Lux", text: "Empire Group eski qog'ozdagi ishimizni to'liq tizimga o'tkazdi — vaqt ancha tejaldi." },
  { name: "Jasur T.", role: "GadgetSpace", text: "Empire bilan ishlash oson bo'ldi, muddat va byudjet aniq edi." },
  { name: "Doniyor R.", role: "MedFlow", text: "Klinika ishini AI qo'shib avtomatlashtirdi. Qabul ancha tartibli." },
  { name: "Laziza K.", role: "X Wear", text: "Zamonaviy dizayn, savdo hajmi ko'tarildi." },
];

const FAQ = [
  { q: "Loyiha qancha vaqt oladi?", a: "MVP 3–4 hafta, o'rta 2–3 oy, yirik 4–6 oy. Aniq muddat Explore bosqichida belgilanadi." },
  { q: "Narxlar qanday?", a: "Fixed-scope: loyiha boshida aniq belgilanadi." },
  { q: "Mavjud tizimni davom ettira olasizmi?", a: "Ha, audit qilib ustiga quramiz." },
  { q: "Konsultatsiya bepulmi?", a: "Ha, majburiyatsiz." },
];

/* ------------------------------- page ---------------------------------- */
export default function FrameioDemoPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="fio">
      <style
        dangerouslySetInnerHTML={{
          __html: CSS,
        }}
      />

      {/* cosmic background layers (CSS only) */}
      <div className="fio-cosmos" aria-hidden="true">
        <div className="fio-cosmos__radial" />
        <div className="fio-cosmos__glow" />
        <div className="fio-cosmos__grain" />
      </div>

      {/* ============================ NAV ============================ */}
      <header className="fio-nav">
        <div className="fio-nav__inner">
          <a className="fio-brand" href="#top" aria-label="Empire Group">
            <span className="fio-brand__mark" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="20" height="20">
                <path {...stroke} d="M4 5h16M4 12h11M4 19h16" />
              </svg>
            </span>
            Empire<span className="fio-brand__thin"> Group</span>
          </a>

          <nav className="fio-nav__links" aria-label="Asosiy">
            {NAV.map((n) => (
              <a key={n.label} className="fio-navlink" href={n.href}>
                {n.label}
              </a>
            ))}
          </nav>

          <div className="fio-nav__actions">
            <a className="fio-pill fio-pill--solid" href="#contact">
              Bepul konsultatsiya
            </a>
            <button
              className="fio-burger"
              aria-label={menuOpen ? "Menyuni yopish" : "Menyuni ochish"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
            >
              {menuOpen ? <IconClose /> : <IconMenu />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="fio-mobile">
            {NAV.map((n) => (
              <a key={n.label} href={n.href} onClick={() => setMenuOpen(false)}>
                {n.label}
              </a>
            ))}
            <a className="fio-pill fio-pill--solid fio-mobile__cta" href="#contact" onClick={() => setMenuOpen(false)}>
              Bepul konsultatsiya
            </a>
          </div>
        )}
      </header>

      <main id="top">
        {/* ============================ HERO ============================ */}
        <section className="fio-hero">
          <div className="fio-wrap fio-hero__grid">
            <div className="fio-hero__copy fio-rise">
              <p className="fio-eyebrow">AI &amp; CUSTOM APP DEVELOPMENT</p>
              <h1 className="fio-display">
                G'oyadan ishlaydigan
                <br />
                mahsulotgacha.
              </h1>
              <p className="fio-sub">
                Murakkab ichki jarayonlarni ERP, AI, Web va App yechimlari orqali raqamlashtiramiz — g'oyadan tayyor
                mahsulotgacha 2–3 oyda.
              </p>
              <div className="fio-hero__cta">
                <a className="fio-pill fio-pill--solid fio-pill--lg" href="#contact">
                  Loyihani boshlash <IconArrow />
                </a>
                <a className="fio-pill fio-pill--ghost fio-pill--lg" href="#cases">
                  Ishlarni ko'rish
                </a>
              </div>

              <div className="fio-hero__stats">
                {STATS.map((s) => (
                  <div key={s.l} className="fio-hstat">
                    <span className="fio-hstat__n">{s.n}</span>
                    <span className="fio-hstat__l">{s.l}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* framed product surface with blue spotlight */}
            <div className="fio-hero__visual fio-rise fio-rise--slow">
              <div className="fio-reel">
                <div className="fio-reel__bar">
                  <span className="fio-dot" />
                  <span className="fio-dot" />
                  <span className="fio-dot" />
                  <span className="fio-reel__label">empire · dashboard</span>
                </div>
                <div className="fio-reel__body">
                  <div className="fio-reel__side">
                    <span className="fio-reel__nav is-on">
                      <IconGrid /> Umumiy
                    </span>
                    <span className="fio-reel__nav">
                      <IconLayers /> Loyihalar
                    </span>
                    <span className="fio-reel__nav">
                      <IconSpark /> AI oqim
                    </span>
                    <span className="fio-reel__nav">
                      <IconCode /> Integratsiya
                    </span>
                  </div>
                  <div className="fio-reel__main">
                    <div className="fio-reel__kpis">
                      <div className="fio-kpi">
                        <span className="fio-kpi__l">Konversiya</span>
                        <span className="fio-kpi__n">2.1×</span>
                      </div>
                      <div className="fio-kpi">
                        <span className="fio-kpi__l">Tejalgan vaqt</span>
                        <span className="fio-kpi__n">38%</span>
                      </div>
                    </div>
                    <div className="fio-reel__chart" aria-hidden="true">
                      {[38, 52, 44, 66, 58, 78, 70, 92].map((h, i) => (
                        <span key={i} style={{ height: `${h}%` } as CSSVars} />
                      ))}
                    </div>
                    <div className="fio-reel__rows">
                      <div className="fio-reel__row">
                        <span className="fio-reel__pill">Explore</span> Talab tahlili tayyor
                      </div>
                      <div className="fio-reel__row">
                        <span className="fio-reel__pill">Build</span> Sprint 4 demo · o'tdi
                      </div>
                    </div>
                  </div>
                </div>
                <span className="fio-reel__spot" aria-hidden="true" />
              </div>
            </div>
          </div>
        </section>

        {/* ========================= PROOF STRIP ======================= */}
        <section className="fio-proof" aria-label="Ishonch">
          <div className="fio-wrap">
            <p className="fio-proof__cap">TEXNOLOGIYA VA HAMKORLAR</p>
            <div className="fio-proof__row">
              {PROOF.map((p) => (
                <span key={p} className="fio-proof__logo">
                  {p}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ========================== SERVICES ========================= */}
        <section id="services" className="fio-section">
          <div className="fio-wrap">
            <header className="fio-shead">
              <p className="fio-eyebrow">XIZMATLAR</p>
              <h2 className="fio-h2">Ikki yo'nalish, bitta jamoa.</h2>
              <p className="fio-sub fio-sub--wide">
                Mahsulotni noldan quramiz yoki mavjud jarayonlarni yagona tizimga bog'laymiz.
              </p>
            </header>

            <div className="fio-svc">
              {/* service 1 */}
              <article className="fio-card fio-svc__card">
                <span className="fio-card__icon">
                  <IconCode />
                </span>
                <h3 className="fio-card__title">Maxsus dasturiy ta'minot</h3>
                <p className="fio-card__desc">Web/mobil ilovalar va ichki tizimlar — g'oyaga moslab quriladi.</p>
                <div className="fio-tags">
                  {["React", "Node.js", "Flutter", "Swift", "Kotlin", "Docker"].map((t) => (
                    <span key={t} className="fio-tag">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="fio-tiers">
                  {TIERS.map((t) => (
                    <div key={t.name} className={`fio-tier${t.popular ? " is-popular" : ""}`}>
                      {t.popular && <span className="fio-tier__badge">Ommabop</span>}
                      <span className="fio-tier__name">{t.name}</span>
                      <span className="fio-tier__price">{t.price}</span>
                      <span className="fio-tier__term">{t.term}</span>
                    </div>
                  ))}
                </div>
              </article>

              {/* service 2 */}
              <article className="fio-card fio-svc__card">
                <span className="fio-card__icon">
                  <IconSpark />
                </span>
                <h3 className="fio-card__title">Odoo ERP &amp; AI Joriy qilish</h3>
                <p className="fio-card__desc">
                  Yagona tizim va AI avtomatlashtirish — savdo, ombor, moliya va mijozlar bir joyda.
                </p>
                <div className="fio-tags">
                  {["Odoo ERP", "AI Automation", "Predictive Analytics", "Cloud"].map((t) => (
                    <span key={t} className="fio-tag">
                      {t}
                    </span>
                  ))}
                </div>
                <ul className="fio-flist">
                  <li>
                    <span className="fio-flist__ic"><IconCheck /></span> Bir tizimda barcha bo'limlar
                  </li>
                  <li>
                    <span className="fio-flist__ic"><IconCheck /></span> AI bilan bashorat va hisobot
                  </li>
                  <li>
                    <span className="fio-flist__ic"><IconCheck /></span> Bulutli, xavfsiz infratuzilma
                  </li>
                  <li>
                    <span className="fio-flist__ic"><IconCheck /></span> Mavjud tizimlarga integratsiya
                  </li>
                </ul>
              </article>
            </div>
          </div>
        </section>

        {/* =========================== PROCESS ========================= */}
        <section id="process" className="fio-section">
          <div className="fio-wrap">
            <header className="fio-shead">
              <p className="fio-eyebrow">JARAYON</p>
              <h2 className="fio-h2">G'oyadan relizga to'rt kadr.</h2>
            </header>

            <div className="fio-proc">
              {PROCESS.map((p) => (
                <article key={p.no} className="fio-proc__col">
                  <span className="fio-proc__no">{p.no}</span>
                  <span className="fio-card__icon">{p.icon}</span>
                  <h3 className="fio-proc__title">{p.title}</h3>
                  <p className="fio-card__desc">{p.body}</p>
                  <div className="fio-tags">
                    {p.tags.map((t) => (
                      <span key={t} className="fio-tag">
                        {t}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ============================ CASES ========================== */}
        <section id="cases" className="fio-section">
          <div className="fio-wrap">
            <header className="fio-shead">
              <p className="fio-eyebrow">LOYIHALAR</p>
              <h2 className="fio-h2">Ishlab turgan mahsulotlar.</h2>
            </header>

            <div className="fio-cases">
              {CASES.map((c) => (
                <article key={c.title} className="fio-card fio-case">
                  <div className="fio-case__frame" aria-hidden="true">
                    <span className="fio-case__play">
                      <IconPlay />
                    </span>
                    <span className="fio-case__metric">{c.metric}</span>
                  </div>
                  <div className="fio-case__meta">
                    <div>
                      <h3 className="fio-case__title">{c.title}</h3>
                      <p className="fio-card__desc">{c.desc}</p>
                    </div>
                    <span className="fio-tag fio-tag--edge">{c.tag}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ========================= TESTIMONIALS ====================== */}
        <section id="reviews" className="fio-section">
          <div className="fio-wrap">
            <header className="fio-shead">
              <p className="fio-eyebrow">SHARHLAR</p>
              <h2 className="fio-h2">Mijozlar nima deydi.</h2>
            </header>

            <div className="fio-revs">
              {REVIEWS.map((r) => (
                <figure key={r.name} className="fio-card fio-rev">
                  <div className="fio-stars" aria-label="5 yulduz">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <IconStar key={i} />
                    ))}
                  </div>
                  <blockquote className="fio-rev__text">"{r.text}"</blockquote>
                  <figcaption className="fio-rev__who">
                    <span className="fio-rev__avatar" aria-hidden="true">
                      {r.name.charAt(0)}
                    </span>
                    <span>
                      <span className="fio-rev__name">{r.name}</span>
                      <span className="fio-rev__role">{r.role}</span>
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* ========================== STATS BAND ======================= */}
        <section id="pricing" className="fio-section">
          <div className="fio-wrap">
            <div className="fio-band">
              <span className="fio-band__spot" aria-hidden="true" />
              <div className="fio-band__grid">
                {STATS.map((s) => (
                  <div key={s.l} className="fio-band__stat">
                    <span className="fio-band__n">{s.n}</span>
                    <span className="fio-band__l">{s.l}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============================= FAQ =========================== */}
        <section className="fio-section">
          <div className="fio-wrap fio-faq">
            <header className="fio-shead fio-shead--left">
              <p className="fio-eyebrow">SAVOL-JAVOB</p>
              <h2 className="fio-h2">Ko'p so'raladigan savollar.</h2>
              <p className="fio-sub">Boshqa savol bo'lsa, bepul konsultatsiyada javob beramiz.</p>
            </header>

            <div className="fio-faq__list">
              {FAQ.map((f, i) => {
                const open = openFaq === i;
                return (
                  <div key={f.q} className={`fio-faq__item${open ? " is-open" : ""}`}>
                    <button
                      className="fio-faq__q"
                      aria-expanded={open}
                      onClick={() => setOpenFaq(open ? null : i)}
                    >
                      <span>{f.q}</span>
                      <span className={`fio-faq__ic${open ? " is-open" : ""}`}>
                        <IconPlus />
                      </span>
                    </button>
                    <div className="fio-faq__a" style={{ maxHeight: open ? 200 : 0 } as CSSVars}>
                      <p>{f.a}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ========================= FINAL CTA ========================= */}
        <section id="contact" className="fio-section">
          <div className="fio-wrap">
            <div className="fio-final">
              <span className="fio-final__spot" aria-hidden="true" />
              <p className="fio-eyebrow">ALOQA</p>
              <h2 className="fio-final__title">Loyihangizni bugun boshlaymiz.</h2>
              <p className="fio-sub fio-sub--center">
                Bepul, majburiyatsiz konsultatsiya. G'oyangizni aniq reja va muddatga aylantiramiz.
              </p>
              <div className="fio-final__cta">
                <a className="fio-pill fio-pill--solid fio-pill--lg" href="tel:+998991164658">
                  +998 99 116 46 58
                </a>
                <a className="fio-pill fio-pill--ghost fio-pill--lg" href="https://t.me/muslimansoriy">
                  t.me/muslimansoriy
                </a>
              </div>
              <div className="fio-final__meta">
                <span>empiregroup.uz</span>
                <span className="fio-final__dot" aria-hidden="true">
                  •
                </span>
                <span>Toshkent</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ============================ FOOTER ========================== */}
      <footer className="fio-footer">
        <div className="fio-wrap fio-footer__grid">
          <div className="fio-footer__brand">
            <a className="fio-brand" href="#top">
              Empire<span className="fio-brand__thin"> Group</span>
            </a>
            <p className="fio-footer__tag">
              G'oyadan ishlaydigan mahsulotgacha. AI, ERP, Web va App yechimlari.
            </p>
          </div>
          <nav className="fio-footer__col" aria-label="Xizmatlar">
            <p className="fio-footer__h">Xizmatlar</p>
            <a href="#services">Maxsus dasturlar</a>
            <a href="#services">Odoo ERP &amp; AI</a>
            <a href="#process">Jarayon</a>
          </nav>
          <nav className="fio-footer__col" aria-label="Kompaniya">
            <p className="fio-footer__h">Kompaniya</p>
            <a href="#cases">Loyihalar</a>
            <a href="#reviews">Sharhlar</a>
            <a href="#pricing">Natijalar</a>
          </nav>
          <nav className="fio-footer__col" aria-label="Aloqa">
            <p className="fio-footer__h">Aloqa</p>
            <a href="tel:+998991164658">+998 99 116 46 58</a>
            <a href="https://t.me/muslimansoriy">t.me/muslimansoriy</a>
            <a href="#top">empiregroup.uz</a>
          </nav>
        </div>
        <div className="fio-wrap fio-footer__base">
          <span>© 2026 Empire Group</span>
          <span>Toshkent, O'zbekiston</span>
        </div>
      </footer>
    </div>
  );
}

/* ============================== STYLES ================================= */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Mono:wght@400;700&display=swap');

.fio{
  --cv:#fcfcfc; --obsidian:#0a0a13; --pitch:#000000; --void:#040407;
  --graphite:#08080c; --smoke:#757580; --ash:#a3a3b3; --charcoal:#2a2a32;
  --iris:#6199f6; --twilight:#4f4f80; --lilac:#dedfee; --halo:#181826;
  --sans:'Inter',ui-sans-serif,system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;
  --stamp:'Space Mono',ui-monospace,monospace;
  --max:1280px;

  position:relative;
  min-height:100vh;
  background:var(--obsidian);
  color:var(--cv);
  font-family:var(--sans);
  font-size:16px;
  line-height:1.45;
  letter-spacing:0.16px;
  -webkit-font-smoothing:antialiased;
  overflow-x:hidden;
}
.fio *{box-sizing:border-box;}
.fio a{color:inherit;text-decoration:none;}
/* generic anchor reset (class+element) outranks single-class pill rules —
   re-assert pill-anchor text colours at higher specificity so they show. */
.fio a.fio-pill--solid{color:var(--obsidian);}
.fio a.fio-pill--ghost{color:var(--cv);}
.fio h1,.fio h2,.fio h3,.fio p{margin:0;}
.fio ul{margin:0;padding:0;list-style:none;}
.fio button{font-family:inherit;cursor:pointer;}

.fio :focus-visible{outline:2px solid var(--iris);outline-offset:3px;border-radius:6px;}

/* ---------------- cosmic background ---------------- */
.fio-cosmos{position:fixed;inset:0;z-index:0;pointer-events:none;
  background:
    radial-gradient(120% 90% at 50% -10%, #0c1d32 0%, rgba(12,29,50,0) 55%),
    linear-gradient(195deg, #0a0010 0%, #02000a 45%, #0c1d32 130%);
}
.fio-cosmos__radial{position:absolute;inset:0;
  background:radial-gradient(70% 60% at 50% 118%, #000b35 0%, rgba(0,11,53,0) 60%);
}
.fio-cosmos__glow{position:absolute;inset:0;
  background:
    radial-gradient(40% 40% at 12% 8%, rgba(79,79,128,0.20) 0%, rgba(79,79,128,0) 60%),
    radial-gradient(45% 45% at 88% 22%, rgba(97,153,246,0.14) 0%, rgba(97,153,246,0) 60%);
}
.fio-cosmos__grain{position:absolute;inset:0;opacity:0.5;
  background-image:radial-gradient(rgba(255,255,255,0.035) 1px, transparent 1px);
  background-size:3px 3px;
}
.fio > *:not(.fio-cosmos){position:relative;z-index:1;}

.fio-wrap{width:100%;max-width:var(--max);margin:0 auto;padding:0 24px;}

/* ---------------- pills / buttons ---------------- */
.fio-pill{display:inline-flex;align-items:center;gap:8px;border-radius:100px;
  font-family:var(--sans);font-size:14px;font-weight:500;
  padding:12px 20px;border:1px solid transparent;transition:background .18s ease,color .18s ease,border-color .18s ease;white-space:nowrap;letter-spacing:0;}
.fio-pill--lg{padding:14px 28px;}
.fio-pill--solid{background:var(--cv);color:var(--obsidian);}
.fio-pill--solid:hover{background:var(--lilac);}
.fio-pill--ghost{background:transparent;color:var(--cv);border-color:var(--cv);font-weight:400;}
.fio-pill--ghost:hover{background:var(--cv);color:var(--obsidian);}

/* ---------------- nav ---------------- */
.fio-nav{position:sticky;top:0;z-index:40;background:rgba(4,4,7,0.72);
  backdrop-filter:blur(14px);border-bottom:1px solid rgba(42,42,50,0.6);}
.fio-nav__inner{max-width:var(--max);margin:0 auto;padding:14px 24px;
  display:flex;align-items:center;gap:24px;}
.fio-brand{display:inline-flex;align-items:center;gap:10px;font-size:18px;font-weight:600;
  letter-spacing:-0.4px;color:var(--cv);}
.fio-brand__mark{display:inline-flex;color:var(--iris);}
.fio-brand__thin{font-weight:400;color:var(--ash);}
.fio-nav__links{display:none;align-items:center;gap:6px;margin-left:8px;}
.fio-navlink{font-size:14px;font-weight:400;color:var(--ash);padding:8px 12px;border-radius:100px;
  transition:color .16s ease,background .16s ease;}
.fio-navlink:hover{color:var(--cv);text-decoration:underline;text-underline-offset:4px;}
.fio-nav__actions{margin-left:auto;display:flex;align-items:center;gap:12px;}
.fio-nav__actions .fio-pill--solid{display:none;}
.fio-burger{display:inline-flex;background:transparent;border:1px solid var(--charcoal);color:var(--cv);
  border-radius:100px;padding:8px;line-height:0;}

.fio-mobile{display:flex;flex-direction:column;gap:4px;padding:8px 24px 20px;
  border-bottom:1px solid rgba(42,42,50,0.6);background:rgba(4,4,7,0.96);}
.fio-mobile a{padding:12px 8px;font-size:15px;color:var(--ash);border-bottom:1px solid rgba(42,42,50,0.4);}
.fio-mobile a:last-child{border:none;}
.fio-mobile__cta{justify-content:center;margin-top:10px;color:var(--obsidian);}

/* ---------------- typography helpers ---------------- */
.fio-eyebrow{font-family:var(--stamp);font-size:12px;font-weight:400;line-height:0.9;
  letter-spacing:0.72px;text-transform:uppercase;color:var(--iris);margin-bottom:16px;}
.fio-display{font-family:var(--sans);font-weight:400;color:var(--cv);
  font-size:clamp(44px,8.5vw,80px);line-height:0.96;letter-spacing:-0.045em;}
.fio-h2{font-family:var(--sans);font-weight:400;color:var(--cv);
  font-size:clamp(32px,5vw,48px);line-height:1.02;letter-spacing:-1.92px;}
.fio-sub{font-family:var(--sans);font-weight:400;font-size:18px;line-height:1.35;color:var(--smoke);
  max-width:560px;letter-spacing:0;}
.fio-sub--wide{max-width:620px;}
.fio-sub--center{margin-left:auto;margin-right:auto;}

.fio-shead{margin-bottom:48px;max-width:720px;}
.fio-shead .fio-h2{margin-bottom:16px;}
.fio-shead--left{margin-bottom:0;}

/* ---------------- section rhythm ---------------- */
.fio-section{padding:80px 0;}

/* ---------------- hero ---------------- */
.fio-hero{padding:72px 0 40px;}
.fio-hero__grid{display:grid;grid-template-columns:1fr;gap:48px;align-items:center;}
.fio-hero__copy .fio-display{margin-bottom:24px;}
.fio-hero__copy .fio-sub{margin-bottom:32px;}
.fio-hero__cta{display:flex;flex-wrap:wrap;gap:12px;margin-bottom:48px;}
.fio-hero__stats{display:grid;grid-template-columns:repeat(4,auto);gap:32px;
  padding-top:32px;border-top:1px solid var(--charcoal);width:fit-content;}
.fio-hstat{display:flex;flex-direction:column;gap:4px;}
.fio-hstat__n{font-size:30px;font-weight:500;letter-spacing:-0.9px;color:var(--cv);}
.fio-hstat__l{font-size:12px;letter-spacing:0.72px;text-transform:uppercase;color:var(--smoke);font-family:var(--stamp);}

/* framed product reel */
.fio-hero__visual{position:relative;}
.fio-reel{position:relative;border-radius:10px;border:1px solid var(--twilight);
  background:var(--graphite);
  box-shadow:inset 0 0 0 1px rgba(79,79,128,0.35), 0 0 60px rgba(79,79,128,0.18), 0 30px 80px rgba(0,0,0,0.55);
  overflow:hidden;}
.fio-reel__spot{position:absolute;top:-40%;right:-10%;width:70%;height:80%;pointer-events:none;
  background:radial-gradient(circle, rgba(97,153,246,0.28) 0%, rgba(97,153,246,0) 70%);filter:blur(6px);}
.fio-reel__bar{display:flex;align-items:center;gap:8px;padding:12px 16px;border-bottom:1px solid rgba(42,42,50,0.7);}
.fio-dot{width:9px;height:9px;border-radius:100px;background:var(--charcoal);}
.fio-reel__label{margin-left:auto;font-family:var(--stamp);font-size:11px;color:var(--smoke);letter-spacing:0.5px;}
.fio-reel__body{display:grid;grid-template-columns:150px 1fr;min-height:300px;}
.fio-reel__side{display:flex;flex-direction:column;gap:6px;padding:16px;border-right:1px solid rgba(42,42,50,0.7);}
.fio-reel__nav{display:flex;align-items:center;gap:8px;font-size:13px;color:var(--smoke);
  padding:8px 10px;border-radius:8px;}
.fio-reel__nav svg{width:16px;height:16px;color:var(--twilight);}
.fio-reel__nav.is-on{background:rgba(97,153,246,0.10);color:var(--cv);}
.fio-reel__nav.is-on svg{color:var(--iris);}
.fio-reel__main{padding:16px;display:flex;flex-direction:column;gap:16px;}
.fio-reel__kpis{display:grid;grid-template-columns:1fr 1fr;gap:12px;}
.fio-kpi{border:1px solid rgba(79,79,128,0.35);border-radius:10px;padding:12px;background:rgba(24,24,38,0.5);}
.fio-kpi__l{display:block;font-size:11px;color:var(--smoke);text-transform:uppercase;letter-spacing:0.5px;font-family:var(--stamp);}
.fio-kpi__n{display:block;font-size:26px;font-weight:500;letter-spacing:-0.8px;margin-top:6px;color:var(--cv);}
.fio-reel__chart{display:flex;align-items:flex-end;gap:8px;height:88px;padding:12px;border:1px solid rgba(42,42,50,0.7);border-radius:10px;}
.fio-reel__chart span{flex:1;border-radius:4px 4px 0 0;
  background:linear-gradient(180deg,var(--iris),rgba(97,153,246,0.25));min-width:6px;}
.fio-reel__rows{display:flex;flex-direction:column;gap:8px;}
.fio-reel__row{display:flex;align-items:center;gap:10px;font-size:13px;color:var(--ash);}
.fio-reel__pill{font-size:11px;color:var(--iris);border:1px solid rgba(97,153,246,0.4);border-radius:100px;padding:3px 10px;font-family:var(--stamp);}

/* ---------------- proof strip ---------------- */
.fio-proof{padding:8px 0 24px;}
.fio-proof__cap{font-family:var(--stamp);font-size:12px;letter-spacing:0.72px;text-transform:uppercase;
  color:var(--smoke);text-align:center;margin-bottom:24px;}
.fio-proof__row{display:flex;flex-wrap:wrap;justify-content:center;gap:16px 40px;
  padding:24px 0;border-top:1px solid var(--charcoal);border-bottom:1px solid var(--charcoal);}
.fio-proof__logo{font-size:18px;font-weight:500;color:var(--ash);letter-spacing:-0.3px;opacity:0.75;transition:opacity .16s ease,color .16s ease;}
.fio-proof__logo:hover{opacity:1;color:var(--cv);}

/* ---------------- cards base ---------------- */
.fio-card{background:var(--graphite);border:1px solid rgba(79,79,128,0.4);border-radius:10px;
  padding:24px;box-shadow:inset 0 0 0 1px rgba(24,24,38,0.6);}
.fio-card__icon{display:inline-flex;color:var(--iris);margin-bottom:20px;}
.fio-card__title{font-size:24px;font-weight:500;letter-spacing:-0.72px;color:var(--cv);margin-bottom:10px;}
.fio-card__desc{font-size:14px;line-height:1.5;color:var(--ash);}

.fio-tags{display:flex;flex-wrap:wrap;gap:8px;margin-top:20px;}
.fio-tag{font-size:12px;color:var(--ash);border:1px solid var(--charcoal);border-radius:100px;padding:5px 12px;letter-spacing:0.2px;}
.fio-tag--edge{border-color:rgba(79,79,128,0.5);color:var(--lilac);white-space:nowrap;}

/* ---------------- services ---------------- */
.fio-svc{display:grid;grid-template-columns:1fr;gap:24px;}
.fio-svc__card{display:flex;flex-direction:column;}
.fio-tiers{display:grid;grid-template-columns:1fr;gap:12px;margin-top:24px;}
.fio-tier{position:relative;border:1px solid var(--charcoal);border-radius:10px;padding:16px;
  display:flex;flex-direction:column;gap:4px;}
.fio-tier.is-popular{border-color:var(--iris);background:rgba(97,153,246,0.06);}
.fio-tier__badge{position:absolute;top:-10px;right:12px;font-family:var(--stamp);font-size:10px;letter-spacing:0.5px;
  text-transform:uppercase;color:var(--obsidian);background:var(--iris);border-radius:100px;padding:3px 10px;}
.fio-tier__name{font-family:var(--stamp);font-size:12px;letter-spacing:0.72px;color:var(--smoke);}
.fio-tier__price{font-size:20px;font-weight:500;letter-spacing:-0.5px;color:var(--cv);}
.fio-tier__term{font-size:13px;color:var(--ash);}

.fio-flist{display:flex;flex-direction:column;gap:12px;margin-top:24px;}
.fio-flist li{display:flex;align-items:center;gap:12px;font-size:14px;color:var(--ash);}
.fio-flist__ic{display:inline-flex;color:var(--iris);flex:0 0 auto;}
.fio-flist__ic svg{width:20px;height:20px;}

/* ---------------- process ---------------- */
.fio-proc{display:grid;grid-template-columns:1fr;gap:32px 24px;}
.fio-proc__col{position:relative;}
.fio-proc__no{font-family:var(--stamp);font-size:13px;letter-spacing:1px;color:var(--twilight);display:block;margin-bottom:20px;}
.fio-proc__title{font-size:24px;font-weight:500;letter-spacing:-0.72px;color:var(--cv);margin:0 0 10px;}

/* ---------------- cases ---------------- */
.fio-cases{display:grid;grid-template-columns:1fr;gap:24px;}
.fio-case{padding:0;overflow:hidden;}
.fio-case__frame{position:relative;aspect-ratio:16/10;
  background:
    radial-gradient(60% 80% at 30% 20%, rgba(97,153,246,0.22), rgba(97,153,246,0) 60%),
    linear-gradient(160deg,#12122a 0%,#0a0a16 60%,#08080c 100%);
  border-bottom:1px solid rgba(79,79,128,0.4);display:flex;align-items:center;justify-content:center;}
.fio-case__play{display:inline-flex;align-items:center;justify-content:center;width:52px;height:52px;
  border-radius:100px;background:rgba(252,252,252,0.10);border:1px solid rgba(252,252,252,0.25);color:var(--cv);
  backdrop-filter:blur(4px);}
.fio-case__metric{position:absolute;top:14px;left:14px;font-family:var(--stamp);font-size:11px;letter-spacing:0.5px;
  color:var(--iris);border:1px solid rgba(97,153,246,0.4);border-radius:100px;padding:4px 10px;background:rgba(10,10,19,0.5);}
.fio-case__meta{display:flex;align-items:flex-start;justify-content:space-between;gap:16px;padding:20px 24px;}
.fio-case__title{font-size:20px;font-weight:500;letter-spacing:-0.5px;color:var(--cv);margin-bottom:6px;}

/* ---------------- reviews ---------------- */
.fio-revs{display:grid;grid-template-columns:1fr;gap:24px;}
.fio-rev{display:flex;flex-direction:column;gap:16px;}
.fio-stars{display:flex;gap:3px;color:var(--iris);}
.fio-rev__text{font-size:18px;line-height:1.4;letter-spacing:-0.2px;color:var(--cv);}
.fio-rev__who{display:flex;align-items:center;gap:12px;margin-top:auto;}
.fio-rev__avatar{display:inline-flex;align-items:center;justify-content:center;width:40px;height:40px;border-radius:100px;
  background:rgba(97,153,246,0.12);border:1px solid rgba(79,79,128,0.5);color:var(--iris);font-weight:600;font-size:16px;}
.fio-rev__name{display:block;font-size:14px;font-weight:500;color:var(--cv);}
.fio-rev__role{display:block;font-size:12px;color:var(--smoke);}

/* ---------------- stats band ---------------- */
.fio-band{position:relative;border:1px solid rgba(79,79,128,0.4);border-radius:24px;overflow:hidden;
  background:linear-gradient(160deg,#0c0c1c 0%,#08080c 100%);padding:56px 24px;}
.fio-band__spot{position:absolute;inset:0;pointer-events:none;
  background:radial-gradient(50% 120% at 50% 0%, rgba(97,153,246,0.16), rgba(97,153,246,0) 60%);}
.fio-band__grid{position:relative;display:grid;grid-template-columns:repeat(2,1fr);gap:40px 24px;text-align:center;}
.fio-band__stat{display:flex;flex-direction:column;gap:8px;}
.fio-band__n{font-size:clamp(40px,7vw,64px);font-weight:400;letter-spacing:-2px;color:var(--cv);line-height:1;}
.fio-band__l{font-family:var(--stamp);font-size:12px;letter-spacing:0.72px;text-transform:uppercase;color:var(--smoke);}

/* ---------------- faq ---------------- */
.fio-faq{display:grid;grid-template-columns:1fr;gap:40px;align-items:start;}
.fio-faq__list{display:flex;flex-direction:column;gap:0;border-top:1px solid var(--charcoal);}
.fio-faq__item{border-bottom:1px solid var(--charcoal);}
.fio-faq__q{width:100%;display:flex;align-items:center;justify-content:space-between;gap:16px;
  background:transparent;border:none;color:var(--cv);text-align:left;padding:22px 4px;
  font-size:18px;font-weight:500;letter-spacing:-0.3px;}
.fio-faq__ic{display:inline-flex;color:var(--iris);transition:transform .22s ease;flex:0 0 auto;}
.fio-faq__ic.is-open{transform:rotate(45deg);}
.fio-faq__a{overflow:hidden;transition:max-height .28s ease;}
.fio-faq__a p{padding:0 4px 22px;font-size:15px;line-height:1.5;color:var(--ash);max-width:560px;}

/* ---------------- final cta ---------------- */
.fio-final{position:relative;text-align:center;border:1px solid rgba(79,79,128,0.45);border-radius:24px;
  padding:72px 24px;overflow:hidden;
  background:
    radial-gradient(60% 100% at 50% 0%, rgba(12,29,50,0.9), rgba(10,10,19,0) 70%),
    linear-gradient(180deg,#0b0b1a 0%,#08080c 100%);}
.fio-final .fio-eyebrow{text-align:center;}
.fio-final__spot{position:absolute;top:-30%;left:50%;transform:translateX(-50%);width:520px;height:520px;pointer-events:none;
  background:radial-gradient(circle, rgba(97,153,246,0.20) 0%, rgba(97,153,246,0) 62%);}
.fio-final__title{position:relative;font-family:var(--sans);font-weight:400;
  font-size:clamp(34px,6vw,56px);line-height:1;letter-spacing:-2px;color:var(--cv);margin-bottom:20px;}
.fio-final__cta{position:relative;display:flex;flex-wrap:wrap;justify-content:center;gap:12px;margin:32px 0 20px;}
.fio-final__meta{position:relative;display:flex;align-items:center;justify-content:center;gap:12px;
  font-size:14px;color:var(--smoke);}
.fio-final__dot{color:var(--twilight);}

/* ---------------- footer ---------------- */
.fio-footer{border-top:1px solid var(--charcoal);padding:64px 0 32px;background:rgba(4,4,7,0.6);}
.fio-footer__grid{display:grid;grid-template-columns:1fr;gap:40px;padding-bottom:48px;}
.fio-footer__brand .fio-brand{font-size:20px;margin-bottom:14px;}
.fio-footer__tag{font-size:14px;line-height:1.5;color:var(--smoke);max-width:320px;}
.fio-footer__col{display:flex;flex-direction:column;gap:12px;}
.fio-footer__h{font-family:var(--stamp);font-size:12px;letter-spacing:0.72px;text-transform:uppercase;color:var(--iris);margin-bottom:4px;}
.fio-footer__col a{font-size:14px;color:var(--ash);transition:color .16s ease;}
.fio-footer__col a:hover{color:var(--cv);}
.fio-footer__base{display:flex;flex-direction:column;gap:8px;padding-top:24px;border-top:1px solid rgba(42,42,50,0.6);
  font-size:13px;color:var(--smoke);}

/* ---------------- entrance animation ---------------- */
.fio-rise{opacity:0;transform:translateY(18px);animation:fioRise .7s cubic-bezier(.2,.7,.2,1) forwards;}
.fio-rise--slow{animation-delay:.15s;}
@keyframes fioRise{to{opacity:1;transform:translateY(0);}}

/* ---------------- responsive ---------------- */
@media (min-width:640px){
  .fio-svc{grid-template-columns:1fr 1fr;}
  .fio-tiers{grid-template-columns:repeat(3,1fr);}
  .fio-proc{grid-template-columns:repeat(2,1fr);}
  .fio-cases{grid-template-columns:1fr 1fr;}
  .fio-revs{grid-template-columns:1fr 1fr;}
  .fio-band__grid{grid-template-columns:repeat(4,1fr);}
  .fio-footer__grid{grid-template-columns:2fr 1fr 1fr 1fr;}
  .fio-footer__base{flex-direction:row;justify-content:space-between;}
}
@media (min-width:960px){
  .fio-nav__links{display:flex;}
  .fio-nav__actions .fio-pill--solid{display:inline-flex;}
  .fio-burger{display:none;}
  .fio-hero{padding:96px 0 64px;}
  .fio-hero__grid{grid-template-columns:1.05fr 0.95fr;gap:64px;}
  .fio-proc{grid-template-columns:repeat(4,1fr);}
  .fio-faq{grid-template-columns:0.9fr 1.1fr;gap:64px;}
  .fio-section{padding:80px 0;}
}

@media (prefers-reduced-motion:reduce){
  .fio-rise{animation:none;opacity:1;transform:none;}
  .fio-faq__a,.fio-faq__ic,.fio-pill,.fio-navlink{transition:none;}
}
`;
