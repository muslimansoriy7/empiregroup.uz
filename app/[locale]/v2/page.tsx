"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

/* ------------------------------------------------------------------ *
 *  Empire Group — v2 flagship homepage
 *  "Cosmic command deck" design system (GitHub reference)
 *  Self-contained: no project imports. Dark-only. Inline SVG icons.
 *  All CSS lives in the single <style> block below, scoped under .ghd
 * ------------------------------------------------------------------ */

/* ---------- inline icon set (stroke 1.5–2px) ---------- */
type IconProps = { size?: number; className?: string };

const IconCode = ({ size = 22, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <path d="M8 6 3 12l5 6M16 6l5 6-5 6M13.5 4l-3 16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const IconErp = ({ size = 22, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <path d="M12 3 3 7.5v9L12 21l9-4.5v-9L12 3Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    <path d="M3 7.5 12 12l9-4.5M12 12v9" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
  </svg>
);
const IconAi = ({ size = 22, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <rect x="5" y="7" width="14" height="12" rx="3" stroke="currentColor" strokeWidth="1.6" />
    <path d="M12 4v3M9 12v2M15 12v2M3 11v4M21 11v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    <circle cx="12" cy="4" r="1.4" fill="currentColor" />
  </svg>
);
const IconMobile = ({ size = 22, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <rect x="7" y="3" width="10" height="18" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
    <path d="M11 18h2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);
const IconArrow = ({ size = 16, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const IconStar = ({ size = 16, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12 2.5l2.9 5.9 6.5.95-4.7 4.58 1.11 6.47L12 17.4l-5.81 3.05 1.11-6.47-4.7-4.58 6.5-.95L12 2.5Z" />
  </svg>
);
const IconPlus = ({ size = 18, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);
const IconCheck = ({ size = 16, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const IconPhone = ({ size = 16, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <path d="M4 5c0 8.28 6.72 15 15 15a1.5 1.5 0 0 0 1.5-1.5v-2.2a1.5 1.5 0 0 0-1.16-1.46l-3.1-.72a1.5 1.5 0 0 0-1.6.72l-.5.86a11.3 11.3 0 0 1-4.94-4.94l.86-.5a1.5 1.5 0 0 0 .72-1.6l-.72-3.1A1.5 1.5 0 0 0 8.7 4H6.5A1.5 1.5 0 0 0 5 5.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const IconSpark = ({ size = 22, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6.3 6.3l2.5 2.5M15.2 15.2l2.5 2.5M17.7 6.3l-2.5 2.5M8.8 15.2l-2.5 2.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

/* ---------- data ---------- */
const NAV = ["Xizmatlar", "Jarayon", "Loyihalar", "Sharhlar", "Narxlar", "Blog"];

const PROOF = ["Google", "Meta", "Stripe", "Telegram", "GitHub", "Cloudflare", "Vercel", "Figma", "Notion"];

const CAPS = [
  {
    icon: <IconCode />,
    title: "Maxsus dasturiy ta'minot",
    body: "Web va mobil ilovalar, ichki tizimlar — jarayoningizga aniq moslashtirilgan arxitektura.",
  },
  {
    icon: <IconErp />,
    title: "Odoo ERP & AI joriy qilish",
    body: "Savdo, ombor, buxgalteriya — yagona tizimda. Avtomatlashtirilgan hisobotlar va oqimlar.",
  },
  {
    icon: <IconAi />,
    title: "AI avtomatlashtirish",
    body: "Chatbotlar, predictive analitika, hujjat oqimi — takrorlanuvchi ishlarni AI bajaradi.",
  },
  {
    icon: <IconMobile />,
    title: "Web & Mobil ilovalar",
    body: "React, Next.js, Flutter — tez, barqaror va kengaytiriladigan mahsulotlar.",
  },
];

const TABS = [
  {
    key: "Web",
    heading: "Zamonaviy web platformalar",
    points: [
      "Next.js va React asosidagi tezkor frontend",
      "SEO, tezlik va konversiyaga optimallashtirilgan",
      "Admin panel va API integratsiyalari",
    ],
  },
  {
    key: "Mobil",
    heading: "iOS va Android ilovalar",
    points: [
      "Flutter bilan yagona koddan ikkala platforma",
      "Push, to'lov va xarita integratsiyalari",
      "App Store va Play Market'ga chiqarish",
    ],
  },
  {
    key: "Odoo ERP",
    heading: "Yagona boshqaruv tizimi",
    points: [
      "Savdo, ombor, HR va buxgalteriya bir joyda",
      "Mavjud jarayonlarga moslashtirilgan modullar",
      "Real vaqtli hisobot va tahlil paneli",
    ],
  },
  {
    key: "AI",
    heading: "Intellektual avtomatlashtirish",
    points: [
      "Mijozlar bilan ishlaydigan AI chatbot",
      "Hujjat va so'rovlarni avtomatik qayta ishlash",
      "Bashoratli tahlil va tavsiyalar",
    ],
  },
];

const STATS = [
  { n: "50+", l: "yakunlangan loyiha" },
  { n: "30+", l: "mamnun mijoz" },
  { n: "15+", l: "texnologiya" },
  { n: "3+", l: "yil tajriba" },
];

const PROCESS = [
  { n: "01", k: "Explore", t: "G'oya va muammoni chuqur o'rganamiz.", tags: ["Tahlil", "Audit"] },
  { n: "02", k: "Plan", t: "PRD, arxitektura, dizayn; muddat va byudjet aniq.", tags: ["PRD", "TZ", "Dizayn"] },
  { n: "03", k: "Build", t: "Kod, test, integratsiya; sprintlar, demo.", tags: ["Dev", "Test", "Demo"] },
  { n: "04", k: "Commit", t: "Ishga tushirish va uzoq muddatli qo'llab-quvvatlash.", tags: ["Deploy", "Support"] },
];

const CASES = [
  { title: "Motor Lux — CRM va savdo boshqaruvi", tag: "Avtomobil", metric: "Savdo oqimi 100% raqamli", accent: "#8dd6ff" },
  { title: "GadgetSpace — onlayn elektronika do'koni", tag: "E-commerce", metric: "Konversiya 2.1×", accent: "#5fed83" },
  { title: "Hilol Market — savdo avtomatlashtirish", tag: "POS", metric: "2× tez xizmat", accent: "#8c93fb" },
  { title: "MedFlow — klinika boshqaruvi", tag: "Healthcare", metric: "AI qabul tartibi", accent: "#8dd6ff" },
];

const TESTIMONIALS = [
  { name: "Aliya M.", role: "Motor Lux", quote: "Empire Group eski qog'ozdagi ishimizni to'liq tizimga o'tkazdi — vaqt ancha tejaldi." },
  { name: "Jasur T.", role: "GadgetSpace", quote: "Empire bilan ishlash oson bo'ldi, muddat va byudjet aniq edi." },
  { name: "Doniyor R.", role: "MedFlow", quote: "Klinika ishini AI qo'shib avtomatlashtirdi. Qabul ancha tartibli." },
];

const PRICING = [
  {
    name: "STANDARD",
    price: "$5,000 dan",
    term: "2–3 oy",
    featured: false,
    feats: ["MVP mahsulot", "Landing + forma", "Kichik ilova", "Asosiy integratsiya"],
  },
  {
    name: "ADVANCED",
    price: "$15K–$40K",
    term: "4–6 oy",
    featured: true,
    feats: ["To'liq ilova", "CRM integratsiya", "Admin panel", "API va avtomatlashtirish"],
  },
  {
    name: "MEGA",
    price: "$50,000+",
    term: "6–12 oy",
    featured: false,
    feats: ["Yirik ekotizim", "Mikroxizmatlar", "AI modullar", "Dedicated jamoa"],
  },
];

const FAQ = [
  { q: "Loyiha qancha vaqt oladi?", a: "MVP 3–4 hafta, o'rta 2–3 oy, yirik 4–6 oy. Aniq muddat Explore bosqichida belgilanadi." },
  { q: "Narxlar qanday belgilanadi?", a: "Fixed-scope: loyiha boshida hajm va narx aniq belgilanadi — kutilmagan xarajatlarsiz." },
  { q: "Mavjud tizimni davom ettira olasizmi?", a: "Ha, audit qilib ustiga quramiz yoki kerak bo'lsa qayta yozamiz." },
  { q: "Konsultatsiya bepulmi?", a: "Ha. Explore bosqichida barcha savollarga javob beramiz — majburiyatsiz." },
];

/* ---------- coded mock: Motor Lux CRM dashboard ---------- */
function CrmMock() {
  return (
    <div className="ide-frame" aria-hidden="true">
      <div className="ide-bar">
        <span className="dot dot-r" />
        <span className="dot dot-y" />
        <span className="dot dot-g" />
        <span className="ide-tab">motor-lux · dashboard</span>
      </div>
      <div className="crm">
        <aside className="crm-side">
          <div className="crm-brand">
            <span className="crm-logo" />
            Motor Lux
          </div>
          <span className="crm-nav crm-nav-on">Boshqaruv</span>
          <span className="crm-nav">Buyurtmalar</span>
          <span className="crm-nav">Mijozlar</span>
          <span className="crm-nav">Ombor</span>
          <span className="crm-nav">Hisobot</span>
        </aside>
        <div className="crm-main">
          <div className="crm-row">
            <div className="crm-kpi">
              <span className="crm-kpi-l">Oylik tushum</span>
              <span className="crm-kpi-v">$284,738</span>
              <span className="crm-kpi-d">+18.4% oldingi oyga</span>
            </div>
            <div className="crm-kpi">
              <span className="crm-kpi-l">Yangi buyurtma</span>
              <span className="crm-kpi-v">1,204</span>
              <span className="crm-kpi-d crm-sky">+312 shu hafta</span>
            </div>
          </div>
          <div className="crm-chart">
            <svg viewBox="0 0 320 96" preserveAspectRatio="none" className="crm-svg">
              <defs>
                <linearGradient id="egArea" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#5fed83" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#5fed83" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0 78 L40 62 L80 68 L120 44 L160 52 L200 30 L240 38 L280 18 L320 26 L320 96 L0 96 Z" fill="url(#egArea)" />
              <path d="M0 78 L40 62 L80 68 L120 44 L160 52 L200 30 L240 38 L280 18 L320 26" fill="none" stroke="#5fed83" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="crm-table">
            <div className="crm-tr crm-th">
              <span>Buyurtma</span><span>Mijoz</span><span>Holat</span><span className="crm-right">Summa</span>
            </div>
            <div className="crm-tr">
              <span>#4821</span><span>A. Karimov</span><span className="crm-badge crm-b-g">Yakun</span><span className="crm-right">$4,200</span>
            </div>
            <div className="crm-tr">
              <span>#4822</span><span>S. Yusupova</span><span className="crm-badge crm-b-b">Jarayon</span><span className="crm-right">$1,860</span>
            </div>
            <div className="crm-tr">
              <span>#4823</span><span>N. Rasulov</span><span className="crm-badge crm-b-v">Yangi</span><span className="crm-right">$7,540</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- small coded mock per tab ---------- */
function TabMock({ tab }: { tab: string }) {
  if (tab === "AI") {
    return (
      <div className="mini-frame" aria-hidden="true">
        <div className="ide-bar">
          <span className="dot dot-r" /><span className="dot dot-y" /><span className="dot dot-g" />
          <span className="ide-tab">assistant.ai</span>
        </div>
        <div className="chat">
          <div className="chat-msg chat-in">Buyurtma #4823 holati?</div>
          <div className="chat-msg chat-bot">Buyurtma tayyorlanmoqda — bugun 17:00 gacha yetkaziladi.</div>
          <div className="chat-msg chat-in">Rahmat!</div>
          <div className="chat-typing"><span /><span /><span /></div>
        </div>
      </div>
    );
  }
  if (tab === "Mobil") {
    return (
      <div className="mini-frame mini-center" aria-hidden="true">
        <div className="phone">
          <div className="phone-notch" />
          <div className="phone-hd">Empire App</div>
          <div className="phone-card"><span className="phone-k">Balans</span><span className="phone-v">$12,480</span></div>
          <div className="phone-list"><span /><span /><span /></div>
          <div className="phone-cta">To'lov qilish</div>
        </div>
      </div>
    );
  }
  if (tab === "Odoo ERP") {
    return (
      <div className="mini-frame" aria-hidden="true">
        <div className="ide-bar">
          <span className="dot dot-r" /><span className="dot dot-y" /><span className="dot dot-g" />
          <span className="ide-tab">odoo · inventory</span>
        </div>
        <div className="erp">
          <div className="erp-cards">
            <div className="erp-c"><span className="erp-l">Ombor</span><span className="erp-v">8,412</span></div>
            <div className="erp-c"><span className="erp-l">Sotuv</span><span className="erp-v">$92K</span></div>
            <div className="erp-c"><span className="erp-l">Yetkazish</span><span className="erp-v">126</span></div>
          </div>
          <div className="erp-bars">
            <span style={{ height: "40%" }} /><span style={{ height: "70%" }} /><span style={{ height: "52%" }} />
            <span style={{ height: "88%" }} /><span style={{ height: "64%" }} /><span style={{ height: "96%" }} />
          </div>
        </div>
      </div>
    );
  }
  // Web (default) — code editor
  return (
    <div className="mini-frame" aria-hidden="true">
      <div className="ide-bar">
        <span className="dot dot-r" /><span className="dot dot-y" /><span className="dot dot-g" />
        <span className="ide-tab">page.tsx</span>
      </div>
      <pre className="code">
        <span className="cl"><span className="c-key">export default function</span> <span className="c-fn">Page</span>() {'{'}</span>
        <span className="cl">  <span className="c-key">return</span> (</span>
        <span className="cl">    &lt;<span className="c-tag">Hero</span></span>
        <span className="cl">      <span className="c-attr">title</span>=<span className="c-str">"Empire"</span></span>
        <span className="cl">      <span className="c-attr">cta</span>=<span className="c-str">"Boshlash"</span> /&gt;</span>
        <span className="cl">  );</span>
        <span className="cl">{'}'}</span>
      </pre>
    </div>
  );
}

/* ================================================================== */
export default function V2Page() {
  const [tab, setTab] = useState(0);
  const [faqOpen, setFaqOpen] = useState<number | null>(0);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const els = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]"));

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      els.forEach((el) => el.classList.add("in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0, rootMargin: "0px 0px -5% 0px" }
    );
    els.forEach((el) => io.observe(el));

    // Reveal anything already in view on mount — the observer's first callback
    // can lag a paint, which would otherwise leave the hero invisible on load.
    const raf = requestAnimationFrame(() => {
      const vh = window.innerHeight || 800;
      els.forEach((el) => {
        if (el.getBoundingClientRect().top < vh * 0.92) {
          el.classList.add("in");
          io.unobserve(el);
        }
      });
    });

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, []);

  return (
    <div className="ghd" ref={rootRef}>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* ---------------- NAV ---------------- */}
      <header className="nav">
        <div className="wrap nav-inner">
          <a href="#top" className="brand" aria-label="Empire Group bosh sahifa">
            <span className="brand-mark" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M12 2 3 6.5v11L12 22l9-4.5v-11L12 2Z" stroke="#5fed83" strokeWidth="1.7" strokeLinejoin="round" />
                <path d="M12 7v10M8 9.2v5.6M16 9.2v5.6" stroke="#8dd6ff" strokeWidth="1.7" strokeLinecap="round" />
              </svg>
            </span>
            empire
          </a>
          <nav className="nav-links" aria-label="Asosiy navigatsiya">
            {NAV.map((n) => (
              <a key={n} href="#top" className="nav-link">{n}</a>
            ))}
          </nav>
          <div className="nav-actions">
            <a href="tel:+998991164658" className="ghost-pill">+998 99 116 46 58</a>
            <a href="#cta" className="btn-green">Bepul konsultatsiya</a>
          </div>
        </div>
      </header>

      <main id="top">
        {/* ---------------- HERO ---------------- */}
        <section className="hero">
          <span className="halo halo-hero" aria-hidden="true" />
          <span className="halo halo-hero2" aria-hidden="true" />
          <div className="wrap hero-inner">
            <p className="mono-label reveal-up" data-reveal>AI &amp; CUSTOM SOFTWARE DEVELOPMENT</p>
            <h1 className="display reveal-up" data-reveal style={{ transitionDelay: "60ms" } as CSSProperties}>
              Biznesni raqamlashtiramiz —<br />
              <span className="display-soft">g'oyadan ishga tushgan mahsulotgacha.</span>
            </h1>
            <p className="hero-sub reveal-up" data-reveal style={{ transitionDelay: "120ms" } as CSSProperties}>
              Murakkab ichki jarayonlarni ERP, AI, Web va App yechimlari orqali raqamlashtiramiz.
              G'oyadan tayyor tizim/mahsulotgacha — atigi 2–3 oyda.
            </p>
            <div className="hero-cta reveal-up" data-reveal style={{ transitionDelay: "180ms" } as CSSProperties}>
              <a href="#cta" className="btn-green btn-lg">Loyihani boshlash</a>
              <a href="#cases" className="btn-outline btn-lg">Ishlarni ko'rish</a>
            </div>
            <div className="hero-mock reveal-up" data-reveal style={{ transitionDelay: "240ms" } as CSSProperties}>
              <CrmMock />
            </div>
          </div>
        </section>

        {/* ---------------- PROOF ---------------- */}
        <section className="section proof-sec">
          <div className="wrap">
            <p className="mono-label center reveal-up" data-reveal>ISHONCH BILAN QURAMIZ</p>
            <div className="proof-row reveal-up" data-reveal style={{ transitionDelay: "80ms" } as CSSProperties}>
              {PROOF.map((p) => (
                <span key={p} className="proof-logo">{p}</span>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- CAPABILITIES ---------------- */}
        <section className="section" id="services">
          <span className="halo halo-soft halo-left" aria-hidden="true" />
          <div className="wrap">
            <div className="sec-head">
              <p className="mono-label reveal-up" data-reveal>IMKONIYATLAR</p>
              <h2 className="heading reveal-up" data-reveal style={{ transitionDelay: "60ms" } as CSSProperties}>
                Bir platforma — to'liq raqamlashtirish.
              </h2>
              <p className="sec-sub reveal-up" data-reveal style={{ transitionDelay: "120ms" } as CSSProperties}>
                Web, mobil, ERP va AI — bitta jamoa, bitta arxitektura. Har bir yechim biznes jarayoningizga moslashtiriladi.
              </p>
            </div>
            <div className="grid grid-4">
              {CAPS.map((c, i) => (
                <article
                  key={c.title}
                  className="card cap-card reveal-up"
                  data-reveal
                  style={{ transitionDelay: `${i * 70}ms` } as CSSProperties}
                >
                  <span className="cap-icon">{c.icon}</span>
                  <h3 className="card-title">{c.title}</h3>
                  <p className="card-body">{c.body}</p>
                  <a href="#services" className="sky-link">batafsil <IconArrow size={14} /></a>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- TABBED SHOWCASE ---------------- */}
        <section className="section">
          <div className="wrap">
            <div className="sec-head">
              <p className="mono-label reveal-up" data-reveal>YECHIMLAR</p>
              <h2 className="heading reveal-up" data-reveal style={{ transitionDelay: "60ms" } as CSSProperties}>
                Har bir yo'nalish uchun tayyor.
              </h2>
            </div>
            <div className="tab-row reveal-up" data-reveal role="tablist" aria-label="Yechimlar">
              {TABS.map((t, i) => (
                <button
                  key={t.key}
                  role="tab"
                  aria-selected={tab === i}
                  className={`pill ${tab === i ? "pill-on" : ""}`}
                  onClick={() => setTab(i)}
                >
                  {t.key}
                </button>
              ))}
            </div>
            <div className="card show-card reveal-up" data-reveal style={{ transitionDelay: "80ms" } as CSSProperties}>
              <div className="show-copy">
                <h3 className="show-title">{TABS[tab].heading}</h3>
                <ul className="show-list">
                  {TABS[tab].points.map((p) => (
                    <li key={p}><span className="tick"><IconCheck size={13} /></span>{p}</li>
                  ))}
                </ul>
                <a href="#cta" className="sky-link">loyihani muhokama qilish <IconArrow size={14} /></a>
              </div>
              <div className="show-visual">
                <TabMock tab={TABS[tab].key} />
              </div>
            </div>
          </div>
        </section>

        {/* ---------------- STATS ---------------- */}
        <section className="section">
          <div className="wrap">
            <div className="stats card reveal-up" data-reveal>
              {STATS.map((s, i) => (
                <div key={s.l} className="stat" style={{ transitionDelay: `${i * 60}ms` } as CSSProperties}>
                  <span className="stat-n">{s.n}</span>
                  <span className="stat-l">{s.l}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- PROCESS ---------------- */}
        <section className="section" id="process">
          <span className="halo halo-soft halo-right" aria-hidden="true" />
          <div className="wrap">
            <div className="sec-head">
              <p className="mono-label reveal-up" data-reveal>JARAYON</p>
              <h2 className="heading reveal-up" data-reveal style={{ transitionDelay: "60ms" } as CSSProperties}>
                G'oyadan mahsulotgacha — 4 bosqich.
              </h2>
            </div>
            <div className="grid grid-4">
              {PROCESS.map((p, i) => (
                <article
                  key={p.n}
                  className="card proc-card reveal-up"
                  data-reveal
                  style={{ transitionDelay: `${i * 70}ms` } as CSSProperties}
                >
                  <span className="proc-n">{p.n}</span>
                  <h3 className="proc-k">{p.k}</h3>
                  <p className="card-body">{p.t}</p>
                  <div className="tag-row">
                    {p.tags.map((tg) => (
                      <span key={tg} className="mono-tag">{tg}</span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- CASES ---------------- */}
        <section className="section" id="cases">
          <div className="wrap">
            <div className="sec-head">
              <p className="mono-label reveal-up" data-reveal>PORTFOLIO</p>
              <h2 className="heading reveal-up" data-reveal style={{ transitionDelay: "60ms" } as CSSProperties}>
                Ishlarimiz.
              </h2>
            </div>
            <div className="grid grid-2">
              {CASES.map((c, i) => (
                <article
                  key={c.title}
                  className="card case-card reveal-up"
                  data-reveal
                  style={{ transitionDelay: `${(i % 2) * 80}ms` } as CSSProperties}
                >
                  <div className="case-thumb" aria-hidden="true">
                    <div className="ide-bar">
                      <span className="dot dot-r" /><span className="dot dot-y" /><span className="dot dot-g" />
                      <span className="ide-tab">{c.tag.toLowerCase()}</span>
                    </div>
                    <div className="case-body" style={{ "--acc": c.accent } as CSSProperties}>
                      <span className="case-metric">{c.metric}</span>
                      <div className="case-bars">
                        <span style={{ height: "48%" }} /><span style={{ height: "72%" }} />
                        <span style={{ height: "58%" }} /><span style={{ height: "90%" }} />
                        <span style={{ height: "66%" }} />
                      </div>
                    </div>
                  </div>
                  <div className="case-foot">
                    <h3 className="case-title">{c.title}</h3>
                    <span className="mono-tag">{c.tag}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- TESTIMONIALS ---------------- */}
        <section className="section" id="reviews">
          <span className="halo halo-soft halo-left" aria-hidden="true" />
          <div className="wrap">
            <div className="sec-head">
              <p className="mono-label reveal-up" data-reveal>SHARHLAR</p>
              <h2 className="heading reveal-up" data-reveal style={{ transitionDelay: "60ms" } as CSSProperties}>
                Mijozlar nima deydi.
              </h2>
            </div>
            <div className="grid grid-3">
              {TESTIMONIALS.map((t, i) => (
                <figure
                  key={t.name}
                  className="card quote-card reveal-up"
                  data-reveal
                  style={{ transitionDelay: `${i * 70}ms` } as CSSProperties}
                >
                  <div className="stars" aria-label="5 yulduz">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <IconStar key={s} className="star" />
                    ))}
                  </div>
                  <blockquote className="quote">"{t.quote}"</blockquote>
                  <figcaption className="quote-by">
                    <span className="q-avatar" aria-hidden="true">{t.name.charAt(0)}</span>
                    <span>
                      <span className="q-name">{t.name}</span>
                      <span className="q-role">{t.role}</span>
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- PRICING ---------------- */}
        <section className="section" id="pricing">
          <div className="wrap">
            <div className="sec-head">
              <p className="mono-label reveal-up" data-reveal>NARXLAR</p>
              <h2 className="heading reveal-up" data-reveal style={{ transitionDelay: "60ms" } as CSSProperties}>
                Shaffof narxlar.
              </h2>
              <p className="sec-sub reveal-up" data-reveal style={{ transitionDelay: "120ms" } as CSSProperties}>
                Fixed-scope yondashuv: narx va hajm loyiha boshida aniq belgilanadi.
              </p>
            </div>
            <div className="grid grid-3 price-grid">
              {PRICING.map((p, i) => (
                <article
                  key={p.name}
                  className={`card price-card ${p.featured ? "price-featured" : ""} reveal-up`}
                  data-reveal
                  style={{ transitionDelay: `${i * 70}ms` } as CSSProperties}
                >
                  {p.featured && <span className="mono-tag tag-violet">KO'P TANLANADI</span>}
                  <span className="price-name">{p.name}</span>
                  <div className="price-value">
                    <span className="price-num">{p.price}</span>
                    <span className="price-term">· {p.term}</span>
                  </div>
                  <ul className="price-list">
                    {p.feats.map((f) => (
                      <li key={f}><span className="tick"><IconCheck size={13} /></span>{f}</li>
                    ))}
                  </ul>
                  {p.featured ? (
                    <a href="#cta" className="btn-green btn-block">Boshlash</a>
                  ) : (
                    <a href="#cta" className="btn-outline btn-block">Boshlash</a>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- FAQ ---------------- */}
        <section className="section" id="faq">
          <div className="wrap wrap-narrow">
            <div className="sec-head">
              <p className="mono-label reveal-up" data-reveal>SAVOL-JAVOB</p>
              <h2 className="heading reveal-up" data-reveal style={{ transitionDelay: "60ms" } as CSSProperties}>
                Ko'p so'raladigan savollar.
              </h2>
            </div>
            <div className="faq-list reveal-up" data-reveal>
              {FAQ.map((f, i) => {
                const open = faqOpen === i;
                return (
                  <div key={f.q} className={`faq-item ${open ? "faq-open" : ""}`}>
                    <button
                      className="faq-q"
                      aria-expanded={open}
                      onClick={() => setFaqOpen(open ? null : i)}
                    >
                      <span>{f.q}</span>
                      <span className="faq-ic"><IconPlus /></span>
                    </button>
                    <div className="faq-a-wrap">
                      <div className="faq-a-inner">
                        <p className="faq-a">{f.a}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ---------------- FINAL CTA ---------------- */}
        <section className="section cta-sec" id="cta">
          <span className="halo halo-hero halo-cta" aria-hidden="true" />
          <div className="wrap cta-inner">
            <p className="mono-label center reveal-up" data-reveal>TAYYORMISIZ?</p>
            <h2 className="display cta-head reveal-up" data-reveal style={{ transitionDelay: "60ms" } as CSSProperties}>
              Loyihangizni bugun boshlaymiz.
            </h2>
            <div className="hero-cta cta-center reveal-up" data-reveal style={{ transitionDelay: "120ms" } as CSSProperties}>
              <a href="tel:+998991164658" className="btn-green btn-lg">
                <IconSpark size={17} /> Bepul konsultatsiya
              </a>
            </div>
            <p className="cta-line reveal-up" data-reveal style={{ transitionDelay: "180ms" } as CSSProperties}>
              +998 99 116 46 58 · t.me/muslimansoriy · Toshkent
            </p>
          </div>
        </section>
      </main>

      {/* ---------------- FOOTER ---------------- */}
      <footer className="footer">
        <div className="wrap footer-grid">
          <div className="foot-brand">
            <a href="#top" className="brand">
              <span className="brand-mark" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2 3 6.5v11L12 22l9-4.5v-11L12 2Z" stroke="#5fed83" strokeWidth="1.7" strokeLinejoin="round" />
                  <path d="M12 7v10M8 9.2v5.6M16 9.2v5.6" stroke="#8dd6ff" strokeWidth="1.7" strokeLinecap="round" />
                </svg>
              </span>
              empire
            </a>
            <p className="foot-desc">
              Toshkentda joylashgan IT kompaniya. AI, maxsus dasturiy ta'minot, Odoo ERP va avtomatlashtirish yechimlari.
            </p>
          </div>
          <div className="foot-col">
            <h4 className="foot-h">Xizmatlar</h4>
            <a href="#services" className="foot-link">Maxsus dasturiy ta'minot</a>
            <a href="#services" className="foot-link">Odoo ERP &amp; AI</a>
            <a href="#pricing" className="foot-link">Narxlar</a>
          </div>
          <div className="foot-col">
            <h4 className="foot-h">Kompaniya</h4>
            <a href="#cases" className="foot-link">Loyihalar</a>
            <a href="#process" className="foot-link">Jarayon</a>
            <a href="#reviews" className="foot-link">Sharhlar</a>
            <a href="#top" className="foot-link">Blog</a>
          </div>
          <div className="foot-col">
            <h4 className="foot-h">Aloqa</h4>
            <a href="https://t.me/muslimansoriy" className="foot-link">Telegram</a>
            <a href="https://instagram.com/empiregroup.uz" className="foot-link">Instagram</a>
            <a href="mailto:muslimansoriy7@gmail.com" className="foot-link">Email</a>
            <a href="tel:+998991164658" className="foot-link">+998 99 116 46 58</a>
          </div>
        </div>
        <div className="wrap foot-bottom">
          <span>© 2026 Empire Group. Barcha huquqlar himoyalangan.</span>
          <span className="foot-made">Toshkent · O'zbekiston</span>
        </div>
      </footer>
    </div>
  );
}

/* ================================================================== *
 *  STYLES — all scoped under .ghd
 * ================================================================== */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;425;460;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');

.ghd{
  --void:#0d1117; --abyss:#000000; --carbon:#090d0a; --obsidian:#151a22;
  --slate:#21262d; --iron:#3d4145; --fog:#484f58; --mercury:#818b98;
  --ash:#9ea0a2; --pearl:#a4aea6; --moss:#7c8980; --snow:#ffffff;
  --green:#08872b; --phosphor:#5fed83; --canopy:#0d3024;
  --violet:#8c93fb; --sky:#8dd6ff; --cobalt:#1f6feb;
  --mono:'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  --ui:'Inter', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;

  min-height:100vh;
  background:var(--void);
  color:var(--pearl);
  font-family:var(--ui);
  font-size:16px;
  line-height:1.5;
  -webkit-font-smoothing:antialiased;
  text-rendering:optimizeLegibility;
  position:relative;
  overflow-x:clip;
}
.ghd *{box-sizing:border-box;}
.ghd a{color:inherit;text-decoration:none;}
.ghd h1,.ghd h2,.ghd h3,.ghd h4,.ghd p{margin:0;}
.ghd ul{margin:0;padding:0;list-style:none;}
.ghd button{font-family:inherit;cursor:pointer;border:0;background:none;color:inherit;}
.ghd ::selection{background:rgba(95,237,131,0.28);color:#fff;}
.ghd :focus-visible{outline:2px solid var(--sky);outline-offset:3px;border-radius:6px;}

.ghd .wrap{max-width:1200px;margin:0 auto;padding:0 24px;position:relative;z-index:1;}
.ghd .wrap-narrow{max-width:820px;}
.ghd .section{padding:80px 0;position:relative;}
.ghd .center{text-align:center;}

/* ---------- typography ---------- */
.ghd .mono-label{
  font-family:var(--mono);font-size:12px;font-weight:500;
  text-transform:uppercase;letter-spacing:0.16em;color:var(--sky);
  margin-bottom:18px;
}
.ghd .mono-label.center{display:block;}
.ghd .display{
  font-family:var(--ui);font-weight:460;font-size:clamp(38px,6vw,64px);
  line-height:1.06;letter-spacing:-0.035em;color:var(--snow);
}
.ghd .display-soft{color:var(--pearl);}
.ghd .heading{
  font-weight:460;font-size:clamp(28px,4vw,40px);line-height:1.2;
  letter-spacing:-0.02em;color:var(--snow);
}
.ghd .sec-head{max-width:680px;margin-bottom:44px;}
.ghd .sec-sub{font-size:18px;line-height:1.5;color:var(--pearl);margin-top:16px;letter-spacing:0.01em;}

/* ---------- nav ---------- */
.ghd .nav{
  position:sticky;top:0;z-index:50;
  background:rgba(13,17,23,0.72);
  backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);
  border-bottom:1px solid var(--slate);
}
.ghd .nav-inner{display:flex;align-items:center;gap:24px;height:64px;}
.ghd .brand{
  display:inline-flex;align-items:center;gap:9px;
  font-weight:600;font-size:19px;color:var(--snow);letter-spacing:-0.02em;
}
.ghd .brand-mark{display:inline-flex;align-items:center;justify-content:center;}
.ghd .nav-links{display:flex;gap:26px;margin-left:12px;}
.ghd .nav-link{font-size:15px;color:var(--pearl);transition:opacity .2s ease;}
.ghd .nav-link:hover{opacity:1;color:var(--snow);}
.ghd .nav-actions{display:flex;align-items:center;gap:14px;margin-left:auto;}
.ghd .ghost-pill{
  font-family:var(--mono);font-size:12.5px;color:var(--pearl);
  border:1px solid var(--slate);border-radius:60px;padding:8px 16px;
  transition:opacity .2s ease,transform .2s ease;white-space:nowrap;
}
.ghd .ghost-pill:hover{color:var(--snow);transform:translateY(-1px);}

/* ---------- buttons ---------- */
.ghd .btn-green{
  display:inline-flex;align-items:center;justify-content:center;gap:8px;
  background:var(--green);color:#fff;font-weight:500;font-size:15px;
  border-radius:6px;padding:9px 20px;
  transition:transform .2s ease,opacity .2s ease;white-space:nowrap;
}
.ghd .btn-green:hover{transform:translateY(-2px);opacity:.94;}
.ghd .btn-outline{
  display:inline-flex;align-items:center;justify-content:center;gap:8px;
  background:rgba(31,35,40,0.4);color:var(--sky);font-weight:500;font-size:15px;
  border:1px solid rgba(255,255,255,0.22);border-radius:6px;padding:9px 20px;
  transition:transform .2s ease,opacity .2s ease;white-space:nowrap;
}
.ghd .btn-outline:hover{transform:translateY(-2px);border-color:rgba(255,255,255,0.4);}
.ghd .btn-lg{padding:13px 26px;font-size:16px;}
.ghd .btn-block{width:100%;margin-top:22px;padding:11px 20px;}

/* ---------- glass card ---------- */
.ghd .card{
  background:rgba(255,255,255,0.055);
  border:1px solid rgba(255,255,255,0.1);
  border-radius:24px;
  backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);
  padding:24px;
}
.ghd .grid{display:grid;gap:20px;}
.ghd .grid-4{grid-template-columns:repeat(4,1fr);}
.ghd .grid-3{grid-template-columns:repeat(3,1fr);}
.ghd .grid-2{grid-template-columns:repeat(2,1fr);}

/* ---------- halos ---------- */
.ghd .halo{position:absolute;pointer-events:none;border-radius:50%;z-index:0;}
.ghd .halo-hero{
  top:-120px;left:50%;transform:translateX(-50%);
  width:900px;height:620px;
  background:radial-gradient(circle at center, rgba(167,162,255,0.5), rgba(140,147,251,0.14) 42%, transparent 70%);
  filter:blur(60px);opacity:.55;
}
.ghd .halo-hero2{
  top:120px;left:22%;
  width:520px;height:420px;
  background:radial-gradient(circle at center, rgba(95,237,131,0.22), transparent 68%);
  filter:blur(60px);opacity:.4;
}
.ghd .halo-soft{
  width:640px;height:520px;top:-60px;
  background:radial-gradient(circle at center, rgba(140,147,251,0.4), transparent 68%);
  filter:blur(60px);opacity:.3;
}
.ghd .halo-left{left:-160px;}
.ghd .halo-right{right:-160px;}
.ghd .halo-cta{opacity:.5;top:-80px;}

/* ---------- hero ---------- */
.ghd .hero{
  position:relative;padding:72px 0 90px;
  background:linear-gradient(180deg, #000 0%, #05070b 40%, var(--void) 100%);
  border-bottom:1px solid var(--slate);
  overflow:hidden;
}
.ghd .hero-inner{display:flex;flex-direction:column;align-items:center;text-align:center;}
.ghd .display{max-width:900px;}
.ghd .hero-sub{max-width:640px;font-size:18px;color:var(--pearl);margin-top:24px;letter-spacing:0.01em;}
.ghd .hero-cta{display:flex;gap:14px;margin-top:32px;flex-wrap:wrap;justify-content:center;}
.ghd .hero-mock{width:100%;max-width:980px;margin-top:56px;position:relative;}

/* ---------- IDE / device frame ---------- */
.ghd .ide-frame,.ghd .mini-frame{
  background:#010409;
  border:1px solid var(--slate);
  border-radius:12px;
  overflow:hidden;
  box-shadow:0 0 0 1px rgba(255,255,255,0.02);
}
.ghd .ide-bar{
  display:flex;align-items:center;gap:7px;
  padding:11px 14px;
  background:#0b0e14;border-bottom:1px solid var(--slate);
}
.ghd .dot{width:11px;height:11px;border-radius:50%;display:inline-block;}
.ghd .dot-r{background:#ff5f57;}.ghd .dot-y{background:#febc2e;}.ghd .dot-g{background:#28c840;}
.ghd .ide-tab{
  font-family:var(--mono);font-size:12px;color:var(--mercury);
  margin-left:10px;padding:3px 12px;background:#010409;border-radius:6px;
  border:1px solid var(--slate);
}

/* ---------- CRM mock ---------- */
.ghd .crm{display:grid;grid-template-columns:180px 1fr;min-height:340px;}
.ghd .crm-side{
  background:#080b10;border-right:1px solid var(--slate);
  padding:18px 14px;display:flex;flex-direction:column;gap:5px;
}
.ghd .crm-brand{
  display:flex;align-items:center;gap:8px;color:var(--snow);
  font-weight:600;font-size:14px;margin-bottom:14px;
}
.ghd .crm-logo{width:18px;height:18px;border-radius:6px;background:linear-gradient(135deg,var(--phosphor),var(--sky));display:inline-block;}
.ghd .crm-nav{
  font-size:13px;color:var(--pearl);padding:8px 10px;border-radius:8px;
}
.ghd .crm-nav-on{background:rgba(141,214,255,0.1);color:var(--snow);border:1px solid rgba(141,214,255,0.18);}
.ghd .crm-main{padding:18px;display:flex;flex-direction:column;gap:14px;background:#010409;}
.ghd .crm-row{display:grid;grid-template-columns:1fr 1fr;gap:12px;}
.ghd .crm-kpi{
  background:rgba(255,255,255,0.03);border:1px solid var(--slate);
  border-radius:12px;padding:14px;display:flex;flex-direction:column;gap:4px;
}
.ghd .crm-kpi-l{font-size:12px;color:var(--pearl);}
.ghd .crm-kpi-v{font-size:24px;font-weight:600;color:var(--snow);letter-spacing:-0.02em;}
.ghd .crm-kpi-d{font-family:var(--mono);font-size:11px;color:var(--phosphor);}
.ghd .crm-kpi-d.crm-sky{color:var(--sky);}
.ghd .crm-chart{
  background:rgba(255,255,255,0.03);border:1px solid var(--slate);
  border-radius:12px;padding:12px;height:96px;
}
.ghd .crm-svg{width:100%;height:72px;display:block;}
.ghd .crm-table{
  background:rgba(255,255,255,0.03);border:1px solid var(--slate);
  border-radius:12px;overflow:hidden;
}
.ghd .crm-tr{
  display:grid;grid-template-columns:1fr 1.2fr 1fr 1fr;gap:8px;
  padding:10px 14px;font-size:12.5px;color:var(--pearl);
  border-bottom:1px solid rgba(33,38,45,0.7);align-items:center;
}
.ghd .crm-tr:last-child{border-bottom:0;}
.ghd .crm-th{color:var(--mercury);font-family:var(--mono);font-size:11px;text-transform:uppercase;letter-spacing:0.08em;}
.ghd .crm-right{text-align:right;color:var(--snow);}
.ghd .crm-badge{font-size:11px;padding:2px 8px;border-radius:60px;width:fit-content;font-weight:500;}
.ghd .crm-b-g{background:rgba(95,237,131,0.14);color:var(--phosphor);}
.ghd .crm-b-b{background:rgba(141,214,255,0.14);color:var(--sky);}
.ghd .crm-b-v{background:rgba(140,147,251,0.16);color:var(--violet);}

/* ---------- proof ---------- */
.ghd .proof-sec{padding:48px 0;}
.ghd .proof-row{
  display:flex;flex-wrap:wrap;justify-content:center;align-items:center;
  gap:16px 40px;margin-top:12px;
}
.ghd .proof-logo{
  font-weight:600;font-size:19px;color:var(--moss);letter-spacing:-0.01em;
  opacity:.7;transition:opacity .2s ease,color .2s ease;
}
.ghd .proof-logo:hover{opacity:1;color:var(--pearl);}

/* ---------- capabilities ---------- */
.ghd .cap-card{display:flex;flex-direction:column;gap:14px;}
.ghd .cap-icon{
  display:inline-flex;align-items:center;justify-content:center;
  width:44px;height:44px;border-radius:12px;
  background:rgba(141,214,255,0.08);border:1px solid rgba(141,214,255,0.16);
  color:var(--sky);
}
.ghd .card-title{font-size:18px;font-weight:600;color:var(--snow);letter-spacing:-0.01em;}
.ghd .card-body{font-size:15px;color:var(--pearl);line-height:1.5;}
.ghd .sky-link{
  display:inline-flex;align-items:center;gap:6px;
  color:var(--sky);font-size:14px;font-weight:500;margin-top:auto;
  transition:gap .2s ease,opacity .2s ease;
}
.ghd .sky-link:hover{gap:10px;}

/* ---------- tabbed showcase ---------- */
.ghd .tab-row{display:flex;flex-wrap:wrap;gap:10px;margin-bottom:32px;}
.ghd .pill{
  font-size:14px;color:var(--pearl);
  border:1px solid rgba(255,255,255,0.16);border-radius:60px;
  padding:8px 18px;transition:transform .2s ease,opacity .2s ease,border-color .2s ease;
}
.ghd .pill:hover{transform:translateY(-1px);border-color:rgba(255,255,255,0.32);}
.ghd .pill-on{background:#fff;color:#0d1117;border-color:#fff;font-weight:600;}
.ghd .show-card{
  display:grid;grid-template-columns:1fr 1fr;gap:32px;align-items:center;padding:32px;
}
.ghd .show-title{font-size:24px;font-weight:600;color:var(--snow);letter-spacing:-0.02em;margin-bottom:18px;}
.ghd .show-list{display:flex;flex-direction:column;gap:12px;margin-bottom:22px;}
.ghd .show-list li,.ghd .price-list li{
  display:flex;gap:11px;align-items:flex-start;font-size:15px;color:var(--pearl);line-height:1.45;
}
.ghd .tick{
  display:inline-flex;align-items:center;justify-content:center;flex-shrink:0;
  width:20px;height:20px;border-radius:50%;margin-top:1px;
  background:rgba(95,237,131,0.14);color:var(--phosphor);
}

/* ---------- mini frames ---------- */
.ghd .mini-frame{min-height:270px;}
.ghd .mini-center{display:flex;align-items:center;justify-content:center;background:radial-gradient(circle at 50% 30%, rgba(140,147,251,0.12), #010409 70%);padding:24px;}
.ghd .code{
  margin:0;padding:18px;font-family:var(--mono);font-size:13px;line-height:1.7;
  color:var(--pearl);display:flex;flex-direction:column;white-space:pre;overflow-x:auto;
}
.ghd .code .cl{display:block;}
.ghd .c-key{color:var(--violet);}
.ghd .c-fn{color:var(--sky);}
.ghd .c-tag{color:var(--phosphor);}
.ghd .c-attr{color:#e3b341;}
.ghd .c-str{color:var(--sky);}

.ghd .chat{padding:18px;display:flex;flex-direction:column;gap:10px;background:radial-gradient(circle at 50% 0%, rgba(140,147,251,0.08), #010409 70%);min-height:224px;}
.ghd .chat-msg{max-width:80%;font-size:13px;padding:9px 13px;border-radius:14px;line-height:1.4;}
.ghd .chat-in{align-self:flex-end;background:rgba(141,214,255,0.14);color:var(--snow);border-bottom-right-radius:4px;}
.ghd .chat-bot{align-self:flex-start;background:rgba(255,255,255,0.05);border:1px solid var(--slate);color:var(--pearl);border-bottom-left-radius:4px;}
.ghd .chat-typing{align-self:flex-start;display:flex;gap:4px;padding:10px 13px;background:rgba(255,255,255,0.05);border:1px solid var(--slate);border-radius:14px;}
.ghd .chat-typing span{width:6px;height:6px;border-radius:50%;background:var(--mercury);animation:egBlink 1.4s infinite;}
.ghd .chat-typing span:nth-child(2){animation-delay:.2s;}
.ghd .chat-typing span:nth-child(3){animation-delay:.4s;}
@keyframes egBlink{0%,60%,100%{opacity:.3;}30%{opacity:1;}}

.ghd .phone{
  width:190px;background:#0b0e14;border:1px solid var(--slate);border-radius:26px;
  padding:22px 16px 18px;position:relative;display:flex;flex-direction:column;gap:12px;
}
.ghd .phone-notch{position:absolute;top:10px;left:50%;transform:translateX(-50%);width:52px;height:5px;border-radius:5px;background:var(--slate);}
.ghd .phone-hd{color:var(--snow);font-weight:600;font-size:14px;margin-top:6px;}
.ghd .phone-card{background:linear-gradient(135deg,rgba(140,147,251,0.2),rgba(141,214,255,0.08));border:1px solid rgba(140,147,251,0.25);border-radius:14px;padding:14px;display:flex;flex-direction:column;gap:4px;}
.ghd .phone-k{font-size:11px;color:var(--pearl);}
.ghd .phone-v{font-size:22px;font-weight:600;color:var(--snow);letter-spacing:-0.02em;}
.ghd .phone-list{display:flex;flex-direction:column;gap:8px;}
.ghd .phone-list span{height:10px;border-radius:6px;background:rgba(255,255,255,0.06);}
.ghd .phone-list span:nth-child(2){width:80%;}
.ghd .phone-list span:nth-child(3){width:60%;}
.ghd .phone-cta{margin-top:2px;text-align:center;background:var(--green);color:#fff;font-size:13px;font-weight:500;padding:9px;border-radius:8px;}

.ghd .erp{padding:18px;display:flex;flex-direction:column;gap:14px;background:#010409;min-height:224px;}
.ghd .erp-cards{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;}
.ghd .erp-c{background:rgba(255,255,255,0.03);border:1px solid var(--slate);border-radius:10px;padding:12px;display:flex;flex-direction:column;gap:3px;}
.ghd .erp-l{font-size:11px;color:var(--pearl);}
.ghd .erp-v{font-size:19px;font-weight:600;color:var(--snow);letter-spacing:-0.02em;}
.ghd .erp-bars{display:flex;align-items:flex-end;gap:12px;height:96px;padding:12px;background:rgba(255,255,255,0.03);border:1px solid var(--slate);border-radius:12px;}
.ghd .erp-bars span{flex:1;border-radius:5px 5px 0 0;background:linear-gradient(180deg,var(--sky),rgba(141,214,255,0.2));}

/* ---------- stats ---------- */
.ghd .stats{
  display:grid;grid-template-columns:repeat(4,1fr);gap:20px;
  padding:36px 32px;text-align:center;
}
.ghd .stat{display:flex;flex-direction:column;gap:6px;position:relative;}
.ghd .stat:not(:last-child)::after{content:"";position:absolute;right:-10px;top:12%;height:76%;width:1px;background:var(--slate);}
.ghd .stat-n{font-size:clamp(30px,4vw,42px);font-weight:600;color:var(--snow);letter-spacing:-0.03em;}
.ghd .stat-l{font-size:13px;color:var(--pearl);font-family:var(--mono);letter-spacing:0.02em;}

/* ---------- process ---------- */
.ghd .proc-card{display:flex;flex-direction:column;gap:12px;}
.ghd .proc-n{font-family:var(--mono);font-size:13px;color:var(--sky);font-weight:500;}
.ghd .proc-k{font-size:19px;font-weight:600;color:var(--snow);letter-spacing:-0.01em;}
.ghd .tag-row{display:flex;flex-wrap:wrap;gap:7px;margin-top:auto;}
.ghd .mono-tag{
  font-family:var(--mono);font-size:11px;text-transform:uppercase;letter-spacing:0.06em;
  color:var(--pearl);border:1px solid var(--slate);border-radius:60px;padding:4px 11px;
}
.ghd .tag-violet{color:var(--violet);border-color:rgba(140,147,251,0.4);background:rgba(140,147,251,0.08);align-self:flex-start;margin-bottom:6px;}

/* ---------- cases ---------- */
.ghd .case-card{padding:16px;display:flex;flex-direction:column;gap:16px;transition:transform .3s cubic-bezier(0.16,1,0.3,1);}
.ghd .case-card:hover{transform:translateY(-4px);}
.ghd .case-thumb{border:1px solid var(--slate);border-radius:14px;overflow:hidden;background:#010409;}
.ghd .case-body{padding:22px;display:flex;flex-direction:column;gap:16px;background:radial-gradient(circle at 80% 0%, rgba(140,147,251,0.1), #010409 70%);}
.ghd .case-metric{font-size:15px;font-weight:600;color:var(--acc);letter-spacing:-0.01em;}
.ghd .case-bars{display:flex;align-items:flex-end;gap:10px;height:70px;}
.ghd .case-bars span{flex:1;border-radius:5px 5px 0 0;background:linear-gradient(180deg,var(--acc),transparent);opacity:.85;}
.ghd .case-foot{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:0 8px 6px;}
.ghd .case-title{font-size:16px;font-weight:600;color:var(--snow);letter-spacing:-0.01em;line-height:1.3;}

/* ---------- testimonials ---------- */
.ghd .quote-card{display:flex;flex-direction:column;gap:16px;}
.ghd .stars{display:flex;gap:3px;color:var(--sky);}
.ghd .star{color:var(--sky);}
.ghd .quote{font-size:16px;line-height:1.55;color:var(--snow);letter-spacing:-0.005em;}
.ghd .quote-by{display:flex;align-items:center;gap:12px;margin-top:auto;}
.ghd .q-avatar{
  width:40px;height:40px;border-radius:50%;flex-shrink:0;
  display:inline-flex;align-items:center;justify-content:center;
  background:linear-gradient(135deg,rgba(140,147,251,0.35),rgba(141,214,255,0.2));
  color:var(--snow);font-weight:600;font-size:16px;border:1px solid rgba(255,255,255,0.12);
}
.ghd .q-name{display:block;color:var(--snow);font-weight:600;font-size:14px;}
.ghd .q-role{display:block;color:var(--pearl);font-size:13px;font-family:var(--mono);}

/* ---------- pricing ---------- */
.ghd .price-grid{align-items:stretch;}
.ghd .price-card{display:flex;flex-direction:column;gap:6px;padding:28px;}
.ghd .price-featured{border-color:var(--violet);background:rgba(140,147,251,0.06);}
.ghd .price-name{font-family:var(--mono);font-size:12px;letter-spacing:0.12em;color:var(--pearl);text-transform:uppercase;}
.ghd .price-value{display:flex;align-items:baseline;gap:8px;flex-wrap:wrap;margin:8px 0 6px;}
.ghd .price-num{font-size:30px;font-weight:600;color:var(--snow);letter-spacing:-0.03em;}
.ghd .price-term{font-size:14px;color:var(--pearl);}
.ghd .price-list{display:flex;flex-direction:column;gap:11px;margin-top:14px;}

/* ---------- faq ---------- */
.ghd .faq-list{display:flex;flex-direction:column;gap:12px;}
.ghd .faq-item{
  border:1px solid var(--slate);border-radius:16px;
  background:rgba(255,255,255,0.02);overflow:hidden;transition:border-color .2s ease;
}
.ghd .faq-item.faq-open{border-color:rgba(140,147,251,0.35);background:rgba(140,147,251,0.04);}
.ghd .faq-q{
  width:100%;display:flex;align-items:center;justify-content:space-between;gap:16px;
  padding:20px 22px;text-align:left;font-size:16px;font-weight:500;color:var(--snow);
}
.ghd .faq-ic{
  display:inline-flex;align-items:center;justify-content:center;flex-shrink:0;
  width:28px;height:28px;border-radius:8px;border:1px solid var(--slate);color:var(--sky);
  transition:transform .3s cubic-bezier(0.16,1,0.3,1);
}
.ghd .faq-open .faq-ic{transform:rotate(45deg);}
.ghd .faq-a-wrap{display:grid;grid-template-rows:0fr;transition:grid-template-rows .35s cubic-bezier(0.16,1,0.3,1);}
.ghd .faq-open .faq-a-wrap{grid-template-rows:1fr;}
.ghd .faq-a-inner{overflow:hidden;}
.ghd .faq-a{padding:0 22px 20px;color:var(--pearl);font-size:15px;line-height:1.55;max-width:640px;}

/* ---------- final cta ---------- */
.ghd .cta-sec{text-align:center;overflow:hidden;padding:100px 0;}
.ghd .cta-inner{display:flex;flex-direction:column;align-items:center;}
.ghd .cta-head{max-width:680px;margin-top:4px;}
.ghd .cta-center{justify-content:center;margin-top:36px;}
.ghd .cta-line{margin-top:24px;font-family:var(--mono);font-size:13px;color:var(--pearl);letter-spacing:0.02em;}

/* ---------- footer ---------- */
.ghd .footer{background:var(--void);border-top:1px solid var(--slate);padding:64px 0 32px;}
.ghd .footer-grid{display:grid;grid-template-columns:1.6fr 1fr 1fr 1fr;gap:40px;}
.ghd .foot-desc{margin-top:16px;font-size:14px;color:var(--pearl);line-height:1.55;max-width:300px;}
.ghd .foot-col{display:flex;flex-direction:column;gap:12px;}
.ghd .foot-h{font-size:15px;font-weight:600;color:var(--snow);margin-bottom:4px;}
.ghd .foot-link{font-size:14px;color:var(--pearl);transition:color .2s ease,opacity .2s ease;}
.ghd .foot-link:hover{color:var(--snow);}
.ghd .foot-bottom{
  display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;
  margin-top:48px;padding-top:24px;border-top:1px solid var(--slate);
  font-size:13px;color:var(--moss);
}
.ghd .foot-made{font-family:var(--mono);font-size:12px;}

/* ---------- scroll reveal ---------- */
.ghd .reveal-up{opacity:0;transform:translateY(24px);transition:opacity .6s cubic-bezier(0.16,1,0.3,1),transform .6s cubic-bezier(0.16,1,0.3,1);}
.ghd .reveal-up.in{opacity:1 !important;transform:none !important;}

/* ---------- responsive ---------- */
@media (max-width:960px){
  .ghd .grid-4{grid-template-columns:repeat(2,1fr);}
  .ghd .nav-links{display:none;}
  .ghd .show-card{grid-template-columns:1fr;}
  .ghd .footer-grid{grid-template-columns:1fr 1fr;}
  .ghd .foot-brand{grid-column:1/-1;}
}
@media (max-width:720px){
  .ghd .section{padding:60px 0;}
  .ghd .grid-3,.ghd .grid-2{grid-template-columns:1fr;}
  .ghd .stats{grid-template-columns:repeat(2,1fr);gap:28px 16px;}
  .ghd .stat:nth-child(2)::after{display:none;}
  .ghd .crm{grid-template-columns:1fr;}
  .ghd .crm-side{flex-direction:row;flex-wrap:wrap;border-right:0;border-bottom:1px solid var(--slate);gap:8px;}
  .ghd .crm-brand{width:100%;margin-bottom:6px;}
  .ghd .ghost-pill{display:none;}
  .ghd .nav-actions .btn-green{padding:8px 14px;font-size:13px;}
}
@media (max-width:520px){
  .ghd .grid-4{grid-template-columns:1fr;}
  .ghd .crm-row{grid-template-columns:1fr;}
  .ghd .proof-row{gap:14px 24px;}
  .ghd .proof-logo{font-size:16px;}
}

@media (prefers-reduced-motion: reduce){
  .ghd .reveal-up{opacity:1;transform:none;transition:none;}
  .ghd *{animation:none !important;transition:none !important;}
  .ghd .faq-a-wrap{transition:none;}
}
`;
