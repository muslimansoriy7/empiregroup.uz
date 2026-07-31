"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { toolLogos, brandLogos } from "@/content/logos";

/* ------------------------------------------------------------------ *
 *  Empire Group — v4 flagship homepage
 *  "Patent vault opening into white atelier" — Ankar AI design system.
 *  Editorial-monochrome: strict black/white/grays, zero chromatic
 *  accents ANYWHERE except the single signature hero light-burst.
 *  Cormorant Garamond 300 serif display · Inter body · Space Mono labels.
 *  4px corners · no shadows · dark surfaces (not shadow) carry hierarchy.
 *  All CSS lives in one <style> block scoped under `.ak`.
 * ------------------------------------------------------------------ */

/* ============================== DATA ============================== */

const NAV_LINKS: [string, string][] = [
  ["Xizmatlar", "#xizmatlar"],
  ["Jarayon", "#jarayon"],
  ["Loyihalar", "#loyihalar"],
  ["Sharhlar", "#sharhlar"],
  ["Narxlar", "#narxlar"],
  ["Blog", "/blog"],
];

const HERO_STATS: [string, string][] = [
  ["50+", "Loyiha"],
  ["30+", "Mijoz"],
  ["15+", "Texnologiya"],
  ["3+ yil", "Tajriba"],
];

const CLIENT_LOGOS: [string, string][] = [
  ["/logos/motorlux.png", "Motor Lux"],
  ["/logos/medflow.png", "MedFlow"],
  ["/logos/grandosiyo.png", "Grand Osiyo"],
  ["/logos/texnika.png", "Texnika Ijara"],
  ["/logos/gadgetspace.png", "GadgetSpace"],
  ["/logos/xwear.png", "X Wear"],
  ["/logos/hilol.png", "Hilol Market"],
];

type IconName =
  | "code"
  | "layers"
  | "phone"
  | "api"
  | "chart"
  | "pen"
  | "cloud"
  | "life";

const SERVICES: { icon: IconName; title: string; desc: string }[] = [
  { icon: "code", title: "Maxsus dasturiy ta'minot", desc: "Web/mobil ilova, ichki tizim, admin panel." },
  { icon: "layers", title: "Odoo ERP & AI", desc: "Barcha jarayon bitta tizimda, AI avtomatlashtirish." },
  { icon: "phone", title: "Mobil ilova", desc: "iOS + Android, push, to'lov, oflayn rejim." },
  { icon: "api", title: "Integratsiya & API", desc: "Telegram, CRM, to'lov, tashqi servislar." },
  { icon: "chart", title: "Biznes-tahlil", desc: "AS-IS/TO-BE, jarayon auditi va optimizatsiya." },
  { icon: "pen", title: "UI/UX dizayn", desc: "Foydalanuvchiga qulay, zamonaviy interfeys." },
  { icon: "cloud", title: "DevOps & Cloud", desc: "Server, CI/CD, monitoring va masshtablash." },
  { icon: "life", title: "Qo'llab-quvvatlash", desc: "Uzoq muddatli texnik yordam va rivojlantirish." },
];

const CASES: {
  seg: string;
  title: string;
  result: string;
  tags: string[];
  img: string;
  url: string;
}[] = [
  { seg: "AVTOMOBIL · CRM", title: "Motor Lux — CRM va savdo boshqaruvi", result: "Savdo va mijozlar bitta tizimda", tags: ["CRM", "Web"], img: "/cases/case-autoservice-desktop.webp", url: "motorlux.uz" },
  { seg: "TIBBIYOT · CRM (PWA)", title: "MedFlow — klinika CRM va bemor qabuli", result: "Qabul boshqaruvi 3× tezlashdi", tags: ["PWA", "CRM"], img: "/cases/case-medflow-desktop.webp", url: "medflow.uz" },
  { seg: "TO'QIMACHILIK · ERP", title: "Grand Osiyo Textile — ERP va ombor tizimi", result: "Ombor real vaqtda boshqariladi", tags: ["ERP", "Ombor"], img: "/cases/case-textile-desktop.webp", url: "grandosiyo.uz" },
  { seg: "IJARA · KATALOG", title: "Texnika Ijara — ijara va katalog sayti", result: "Onlayn bronlar 3× oshdi", tags: ["Web", "Katalog"], img: "/cases/case-texnika-desktop.webp", url: "texnika-ijara.uz" },
  { seg: "ELEKTRONIKA · E-COMMERCE", title: "GadgetSpace — onlayn elektronika do'koni", result: "Konversiya 2.1× oshdi", tags: ["E-commerce"], img: "/cases/case-gadgetspace-desktop.webp", url: "gadgetspace.uz" },
  { seg: "MODA · E-COMMERCE", title: "X Wear — kiyim brendi uchun do'kon", result: "O'rtacha chek 28% oshdi", tags: ["E-commerce", "Web"], img: "/cases/case-xwear-desktop.webp", url: "xwear.uz" },
  { seg: "SAVDO · POS", title: "Hilol Market — savdo avtomatlashtirish", result: "Hisob-kitob 2× tezlashdi", tags: ["Retail", "POS"], img: "/cases/case-kassa-desktop.webp", url: "hilolmarket.uz" },
];

const PROCESS: { n: string; title: string; desc: string; tags: string[] }[] = [
  { n: "01", title: "Explore", desc: "G'oya va muammoni chuqur o'rganamiz.", tags: ["Tahlil", "Audit"] },
  { n: "02", title: "Plan", desc: "PRD, TZ, arxitektura, dizayn; muddat va byudjet aniq.", tags: ["PRD", "TZ", "Dizayn"] },
  { n: "03", title: "Build", desc: "Kod, test, integratsiya; sprintlar, demo.", tags: ["Dev", "Test", "Demo"] },
  { n: "04", title: "Commit", desc: "Ishga tushirish va uzoq muddatli qo'llab-quvvatlash.", tags: ["Deploy", "Support"] },
];

const STACK_NAMES = ["React", "Next.js", "TypeScript", "JavaScript", "Node.js", "Python", "Flutter", "Tailwind CSS", "PostgreSQL", "Docker", "Supabase", "Git"];
const PARTNER_NAMES = ["Google", "Meta", "Stripe", "Figma", "Cloudflare", "GitHub", "Notion", "Vercel", "Apple", "Telegram"];

const TEAM: { name: string; role: string; bio: string; photo?: string }[] = [
  { name: "Muslim Ansoriy", role: "Ta'sischi va CEO · Technical Product Manager", bio: "7+ yil IT va biznes-avtomatlashtirish; Odoo ERP Partner Manager (Markaziy Osiyo/Kavkaz); 20+ ERP loyiha.", photo: "/founder.webp" },
  { name: "Abbos Jo'rayev", role: "Hammuassis va COO", bio: "6+ yil IT loyiha boshqaruvi; mijoz, byudjet, jamoa koordinatsiyasi." },
  { name: "Sardor Rahmatullayev", role: "Senior Odoo Developer", bio: "5 yil Python/Odoo; 30+ custom modul; REST/XML-RPC." },
  { name: "Dilnoza Yusupova", role: "Biznes-analitik · ERP Consultant", bio: "4 yil biznes-tahlil; AS-IS/TO-BE; o'qitish." },
  { name: "Jasurbek Toshmatov", role: "Full-stack Developer", bio: "5 yil web/mobil; React, Next.js, Node.js, PostgreSQL." },
  { name: "Nilufar Karimova", role: "Digital Marketing Lead", bio: "6 yil marketing; SEO, lead generation." },
  { name: "Bekzod Ergashev", role: "DevOps · SysAdmin", bio: "4 yil infratuzilma; Linux, Docker, CI/CD." },
  { name: "Malika Sobirova", role: "UI/UX Designer", bio: "4 yil interfeys dizayni; Figma, dizayn tizimlari." },
];

const TESTIMONIALS: { name: string; role: string; quote: string }[] = [
  { name: "Aliya M.", role: "MOTOR LUX · CRM", quote: "Empire Group eski qog'ozdagi ishimizni to'liq tizimga o'tkazdi — vaqt ancha tejaldi." },
  { name: "Jasur T.", role: "GADGETSPACE · E-COMMERCE", quote: "Empire bilan ishlash oson bo'ldi, muddat va byudjet aniq edi." },
  { name: "Doniyor R.", role: "MEDFLOW · KLINIKA", quote: "Klinika ishini AI qo'shib avtomatlashtirdi. Qabul ancha tartibli." },
  { name: "Laziza K.", role: "X WEAR · E-COMMERCE", quote: "Zamonaviy dizayn, savdo hajmi ko'tarildi." },
];

type Tier = { badge: string; price: string; term: string; featured?: boolean; features: string[] };
const PRICING: Record<"soft" | "odoo", Tier[]> = {
  soft: [
    { badge: "STANDARD", price: "$5,000 dan", term: "2–3 oy", features: ["MVP: landing+forma yoki kichik ilova", "Asosiy funksiyalar", "Responsive dizayn", "Ishga tushirish"] },
    { badge: "ADVANCED", price: "$15K–$40K", term: "4–6 oy", featured: true, features: ["To'liq ilova", "CRM integratsiya", "Admin panel", "API integratsiyalar", "Test va QA"] },
    { badge: "MEGA", price: "$50,000+", term: "6–12 oy", features: ["Yirik ekotizim", "Mikroxizmatlar arxitekturasi", "Yuqori yuklama", "Maxsus SLA"] },
  ],
  odoo: [
    { badge: "STANDARD", price: "$8,800 dan", term: "2–3 oy", features: ["Asosiy Odoo modullari", "Sozlash va migratsiya", "Xodimlarni o'qitish", "Ishga tushirish"] },
    { badge: "ADVANCED", price: "$25K–$35K", term: "4–6 oy", featured: true, features: ["Custom modullar", "AI avtomatlashtirish", "Tashqi integratsiya", "Ombor va CRM", "Hisobotlar"] },
    { badge: "MEGA", price: "$85,000+", term: "~1 yil", features: ["To'liq ERP ekotizim", "Ko'p filial boshqaruvi", "Maxsus AI yechimlar", "Uzoq muddatli support"] },
  ],
};

const CREDS: { img: string; title: string; org: string; status: string; active: boolean }[] = [
  { img: "/sertifikat/odoo-learning-partner.svg", title: "Odoo Learning Partner", org: "Odoo S.A.", status: "TASDIQLANGAN", active: true },
  { img: "/sertifikat/davlat-royxat-guvohnomasi.png", title: "Davlat ro'yxatidan o'tganlik guvohnomasi", org: "\"EMPIRE GROUP CORP\" MCHJ", status: "TASDIQLANGAN", active: true },
  { img: "/sertifikat/it-park.svg", title: "IT Park rezidenti", org: "IT Park O'zbekiston", status: "KUTILMOQDA", active: false },
  { img: "/sertifikat/iso-27001.svg", title: "ISO/IEC 27001", org: "Axborot xavfsizligi standarti", status: "KUTILMOQDA", active: false },
];

const FAQ: [string, string][] = [
  ["Loyiha qancha vaqt oladi?", "Kichik MVP 3–4 hafta, o'rtacha 2–3 oy, yirik 4–6 oy. Aniq muddat Explore bosqichida."],
  ["Narx qanday hisoblanadi?", "Fixed-scope: loyiha hajmi aniqlangach aniq narx. Yashirin xarajat yo'q. Paketlar $5,000 dan."],
  ["Narxlar nega farq qiladi?", "Murakkablik, integratsiyalar va muddatga bog'liq. Har loyiha alohida hisoblanadi."],
  ["Ishlab bo'lgach yordam beramizmi?", "Ha, qo'llab-quvvatlash, xatolarni tuzatish va rivojlantirish davom etadi."],
  ["To'lov qanday?", "Bosqichma-bosqich: oldindan qism, keyin sprint natijalariga qarab."],
  ["Kod kimga tegishli?", "Barchasi sizga. To'liq egalik sizda — vendor lock-in yo'q."],
  ["Mavjud tizimni davom ettira olasizmi?", "Ha, ko'rib chiqib davom ettiramiz yoki qayta quramiz."],
  ["Konsultatsiya bepulmi?", "Ha. Explore bosqichida barcha savolga javob beramiz — majburiyatsiz."],
];

/* ============================== ICONS ============================== */

function FeatureIcon({ name }: { name: IconName }) {
  const common = {
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "#ffffff",
    strokeWidth: 1.4,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (name) {
    case "code":
      return (<svg {...common}><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>);
    case "layers":
      return (<svg {...common}><polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" /></svg>);
    case "phone":
      return (<svg {...common}><rect x="6" y="2" width="12" height="20" rx="2" /><line x1="10.5" y1="18" x2="13.5" y2="18" /></svg>);
    case "api":
      return (<svg {...common}><path d="M9 2v6" /><path d="M15 2v6" /><path d="M6 8h12v3a6 6 0 0 1-12 0z" /><path d="M12 17v5" /></svg>);
    case "chart":
      return (<svg {...common}><line x1="4" y1="20" x2="20" y2="20" /><rect x="6" y="11" width="3" height="7" /><rect x="11" y="7" width="3" height="11" /><rect x="16" y="4" width="3" height="14" /></svg>);
    case "pen":
      return (<svg {...common}><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" /></svg>);
    case "cloud":
      return (<svg {...common}><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10Z" /></svg>);
    case "life":
      return (<svg {...common}><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="4" /><line x1="4.93" y1="4.93" x2="9.17" y2="9.17" /><line x1="14.83" y1="14.83" x2="19.07" y2="19.07" /><line x1="14.83" y1="9.17" x2="19.07" y2="4.93" /><line x1="4.93" y1="19.07" x2="9.17" y2="14.83" /></svg>);
  }
}

function BrandMark({ light }: { light?: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="3" stroke={light ? "#fff" : "#171717"} strokeWidth="1.4" />
      <path d="M8 7h8M8 12h5M8 17h8" stroke={light ? "#fff" : "#171717"} strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function initials(name: string) {
  return name
    .replace(/["']/g, "")
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

/* ============================== PAGE ============================== */

export default function V4Page() {
  const [scrolled, setScrolled] = useState(false);
  const [track, setTrack] = useState<"soft" | "odoo">("soft");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const rootRef = useRef<HTMLDivElement | null>(null);

  // Nav: transparent over hero → white bg after scrolling past most of it.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.75);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll reveal — `.ak-rise` visible by default, `.in` refines it.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const els = Array.from(root.querySelectorAll<HTMLElement>(".ak-rise"));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      els.forEach((el) => el.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    els.forEach((el) => io.observe(el));
    // Mount pass: anything already on-screen enters immediately.
    requestAnimationFrame(() => {
      els.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight && r.bottom > 0) el.classList.add("in");
      });
    });
    return () => io.disconnect();
  }, []);

  const stack = toolLogos.filter((t) => STACK_NAMES.includes(t.title) && t.path);
  const partners = brandLogos.filter((b) => PARTNER_NAMES.includes(b.title) && b.path);

  return (
    <div className="ak" ref={rootRef}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&family=Inter:wght@400;500&family=Space+Mono:wght@400;700&display=swap"
      />

      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* ===================== NAV ===================== */}
      <header className={"ak-nav" + (scrolled ? " ak-nav--solid" : "")}>
        <div className="ak-nav-inner">
          <a className="ak-brand" href="#top" aria-label="Empire Group — bosh sahifa">
            <BrandMark light={!scrolled} />
            <span>Empire</span>
          </a>
          <nav className="ak-nav-links" aria-label="Asosiy navigatsiya">
            {NAV_LINKS.map(([label, href]) => (
              <a key={label} href={href}>{label}</a>
            ))}
          </nav>
          <a
            className={scrolled ? "ak-btn ak-btn-filled" : "ak-btn ak-btn-ghost"}
            href="#cta"
          >
            Bepul konsultatsiya
          </a>
        </div>
      </header>

      {/* ===================== HERO ===================== */}
      <section className="ak-hero" id="top">
        <div className="ak-hero-burst" aria-hidden="true" />
        <div className="ak-hero-grain" aria-hidden="true" />
        <div className="ak-hero-inner ak-rise">
          <p className="ak-eyebrow ak-eyebrow--light">AI &amp; CUSTOM SOFTWARE DEVELOPMENT</p>
          <h1 className="ak-hero-h1">
            Biznesni raqamlashtiramiz.
            <span className="ak-hero-h1-sub">G'oyadan tayyor mahsulotgacha.</span>
          </h1>
          <p className="ak-hero-sub">
            Murakkab ichki jarayonlarni ERP, AI, Web va App yechimlari orqali
            raqamlashtiramiz. G'oyadan tayyor tizim/mahsulotgacha — atigi 2–3 oyda.
          </p>
          <div className="ak-hero-cta">
            <a className="ak-btn ak-btn-invert" href="#cta">Loyihani boshlash</a>
            <a className="ak-btn ak-btn-ghost" href="#loyihalar">Ishlarni ko'rish</a>
          </div>
          <div className="ak-hero-stats">
            {HERO_STATS.map(([v, l], i) => (
              <span key={l} className="ak-stat">
                {i > 0 && <span className="ak-stat-dot">·</span>}
                <b>{v}</b> {l}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== CLIENT LOGOS ===================== */}
      <section className="ak-sec ak-sec--tight">
        <div className="ak-wrap ak-rise">
          <p className="ak-eyebrow ak-center">BIZGA ISHONISHADI</p>
          <div className="ak-logostrip">
            {CLIENT_LOGOS.map(([src, alt]) => (
              <img key={src} src={src} alt={alt} className="ak-clientlogo" loading="lazy" />
            ))}
          </div>
        </div>
      </section>

      {/* ===================== SERVICES ===================== */}
      <section className="ak-sec" id="xizmatlar">
        <div className="ak-wrap">
          <div className="ak-head ak-rise">
            <p className="ak-eyebrow">XIZMATLAR</p>
            <h2 className="ak-h2">Ikki yo'nalish, bitta standart.</h2>
            <p className="ak-lead">
              Maxsus dasturiy ta'minot yoki Odoo ERP &amp; AI — har biri bir xil
              sifat va shaffof jarayon bilan.
            </p>
          </div>
          <div className="ak-grid4">
            {SERVICES.map((s, i) => (
              <article key={s.title} className="ak-feat ak-rise" style={delay(i)}>
                <div className="ak-feat-card">
                  <span className="ak-feat-ico"><FeatureIcon name={s.icon} /></span>
                  <h3 className="ak-feat-title">{s.title}</h3>
                </div>
                <p className="ak-feat-desc">{s.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== PORTFOLIO ===================== */}
      <section className="ak-sec" id="loyihalar">
        <div className="ak-wrap">
          <div className="ak-head ak-rise">
            <p className="ak-eyebrow">PORTFOLIO</p>
            <h2 className="ak-h2">So'nggi ishlarimiz.</h2>
            <p className="ak-lead">Real, ishga tushirilgan loyihalar — har biri yechilgan muammo.</p>
          </div>
          <div className="ak-grid2">
            {CASES.map((c, i) => (
              <article key={c.title} className="ak-case ak-rise" style={delay(i % 2)}>
                <div className="ak-case-frame">
                  <img src={c.img} alt={c.title} className="ak-case-img" loading="lazy" />
                </div>
                <p className="ak-eyebrow ak-case-seg">{c.seg}</p>
                <h3 className="ak-case-title">{c.title}</h3>
                <p className="ak-case-result">{c.result}</p>
                <div className="ak-case-foot">
                  <div className="ak-tags">
                    {c.tags.map((t) => (<span key={t} className="ak-tag">{t}</span>))}
                  </div>
                  <a className="ak-case-link" href={"https://" + c.url} target="_blank" rel="noopener noreferrer">↗ {c.url}</a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== PROCESS ===================== */}
      <section className="ak-sec" id="jarayon">
        <div className="ak-wrap">
          <div className="ak-head ak-rise">
            <p className="ak-eyebrow">QANDAY ISHLAYMIZ</p>
            <h2 className="ak-h2">G'oyadan mahsulotgacha — 4 bosqich.</h2>
          </div>
          <div className="ak-grid4">
            {PROCESS.map((p, i) => (
              <article key={p.n} className="ak-step ak-rise" style={delay(i)}>
                <span className="ak-step-n">{p.n}</span>
                <h3 className="ak-step-title">{p.title}</h3>
                <p className="ak-step-desc">{p.desc}</p>
                <div className="ak-tags">
                  {p.tags.map((t) => (<span key={t} className="ak-tag">{t}</span>))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== STACK ===================== */}
      <section className="ak-sec">
        <div className="ak-wrap">
          <div className="ak-head ak-rise">
            <p className="ak-eyebrow">BIZNING STACK</p>
            <h2 className="ak-h2">Ishonchli, sanoat standarti texnologiyalar.</h2>
          </div>
          <div className="ak-marks ak-rise">
            {stack.map((t) => (
              <div key={t.title} className="ak-mark" title={t.title}>
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d={t.path} fill="currentColor" /></svg>
                <span>{t.title}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== PARTNERS ===================== */}
      <section className="ak-sec">
        <div className="ak-wrap">
          <div className="ak-head ak-rise">
            <p className="ak-eyebrow">GLOBAL STANDART</p>
            <h2 className="ak-h2">Dunyo yetakchilari darajasida ishlaymiz.</h2>
          </div>
          <div className="ak-marks ak-rise">
            {partners.map((b) => (
              <div key={b.title} className="ak-mark" title={b.title}>
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d={b.path} fill="currentColor" /></svg>
                <span>{b.title}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== TEAM ===================== */}
      <section className="ak-sec">
        <div className="ak-wrap">
          <div className="ak-head ak-rise">
            <p className="ak-eyebrow">BIZ KIMMIZ</p>
            <h2 className="ak-h2">Ortida — real jamoa.</h2>
          </div>
          <div className="ak-grid4">
            {TEAM.map((m, i) => (
              <article key={m.name} className="ak-member ak-rise" style={delay(i % 4)}>
                <div className="ak-member-vis">
                  {m.photo ? (
                    <img src={m.photo} alt={m.name} className="ak-member-photo" loading="lazy" />
                  ) : (
                    <span className="ak-member-mono">{initials(m.name)}</span>
                  )}
                </div>
                <h3 className="ak-member-name">{m.name}</h3>
                <p className="ak-eyebrow ak-member-role">{m.role}</p>
                <p className="ak-member-bio">{m.bio}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== TESTIMONIALS ===================== */}
      <section className="ak-sec" id="sharhlar">
        <div className="ak-wrap">
          <div className="ak-head ak-rise">
            <p className="ak-eyebrow">MIJOZLAR FIKRI</p>
            <h2 className="ak-h2">Mijozlarimiz nima deydi.</h2>
          </div>
          <div className="ak-grid2">
            {TESTIMONIALS.map((t, i) => (
              <figure key={t.name} className="ak-quote ak-rise" style={delay(i % 2)}>
                <blockquote className="ak-quote-text">“{t.quote}”</blockquote>
                <figcaption className="ak-quote-by">
                  <span className="ak-avatar">{initials(t.name)}</span>
                  <span className="ak-quote-meta">
                    <b>{t.name}</b>
                    <em className="ak-eyebrow">{t.role}</em>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== PRICING ===================== */}
      <section className="ak-sec" id="narxlar">
        <div className="ak-wrap">
          <div className="ak-head ak-rise">
            <p className="ak-eyebrow">NARXLAR</p>
            <h2 className="ak-h2">Shaffof narxlar.</h2>
            <p className="ak-lead">Loyiha hajmiga qarab aniq paketlar — yashirin to'lovsiz.</p>
          </div>
          <div className="ak-toggle ak-rise" role="tablist" aria-label="Narx yo'nalishi">
            <button
              role="tab"
              aria-selected={track === "soft"}
              className={"ak-toggle-btn" + (track === "soft" ? " is-on" : "")}
              onClick={() => setTrack("soft")}
            >
              Maxsus dasturiy ta'minot
            </button>
            <button
              role="tab"
              aria-selected={track === "odoo"}
              className={"ak-toggle-btn" + (track === "odoo" ? " is-on" : "")}
              onClick={() => setTrack("odoo")}
            >
              Odoo ERP &amp; AI
            </button>
          </div>
          <div className="ak-grid3">
            {PRICING[track].map((tier, i) => (
              <article
                key={tier.badge}
                className={"ak-price ak-rise" + (tier.featured ? " ak-price--dark" : "")}
                style={delay(i)}
              >
                <p className="ak-eyebrow ak-price-badge">{tier.badge}</p>
                <p className="ak-price-amt">{tier.price}</p>
                <p className="ak-price-term">{tier.term}</p>
                <ul className="ak-price-list">
                  {tier.features.map((f) => (
                    <li key={f}><span className="ak-check" aria-hidden="true">—</span>{f}</li>
                  ))}
                </ul>
                <a
                  className={"ak-btn " + (tier.featured ? "ak-btn-invert" : "ak-btn-filled")}
                  href="#cta"
                >
                  Konsultatsiya olish
                </a>
              </article>
            ))}
          </div>
          <p className="ak-eyebrow ak-price-note">
            Fixed-scope · yashirin to'lov yo'q · 4 hafta qo'llab-quvvatlash.
          </p>
        </div>
      </section>

      {/* ===================== CREDENTIALS ===================== */}
      <section className="ak-sec">
        <div className="ak-wrap">
          <div className="ak-head ak-rise">
            <p className="ak-eyebrow">ISHONCH VA TASDIQ</p>
            <h2 className="ak-h2">Rasmiy maqom va sertifikatlar.</h2>
          </div>
          <div className="ak-grid4">
            {CREDS.map((c, i) => (
              <article key={c.title} className="ak-cred ak-rise" style={delay(i)}>
                <div className="ak-cred-frame">
                  <img src={c.img} alt={c.title} className="ak-cred-img" loading="lazy" />
                </div>
                <h3 className="ak-cred-title">{c.title}</h3>
                <p className="ak-cred-org">{c.org}</p>
                <p className={"ak-cred-status" + (c.active ? " is-active" : "")}>
                  <span className="ak-cred-dot" aria-hidden="true" />
                  {c.status}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== FAQ ===================== */}
      <section className="ak-sec">
        <div className="ak-wrap ak-wrap--narrow">
          <div className="ak-head ak-rise">
            <p className="ak-eyebrow">SAVOL-JAVOB</p>
            <h2 className="ak-h2">Ko'p so'raladigan savollar.</h2>
          </div>
          <div className="ak-faq ak-rise">
            {FAQ.map(([q, a], i) => {
              const on = openFaq === i;
              return (
                <div key={q} className={"ak-faq-item" + (on ? " is-open" : "")}>
                  <button
                    className="ak-faq-q"
                    aria-expanded={on}
                    onClick={() => setOpenFaq(on ? null : i)}
                  >
                    <span>{q}</span>
                    <span className="ak-faq-mark" aria-hidden="true">{on ? "−" : "+"}</span>
                  </button>
                  <div className="ak-faq-a" hidden={!on}>
                    <p>{a}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===================== FINAL CTA ===================== */}
      <section className="ak-cta" id="cta">
        <div className="ak-cta-burst" aria-hidden="true" />
        <div className="ak-cta-inner ak-rise">
          <p className="ak-eyebrow ak-eyebrow--light ak-center">TAYYORMISIZ?</p>
          <h2 className="ak-cta-h2">Loyihangizni bugun boshlaymiz.</h2>
          <a className="ak-btn ak-btn-invert" href="https://t.me/muslimansoriy" target="_blank" rel="noopener noreferrer">
            Bepul konsultatsiya
          </a>
          <p className="ak-eyebrow ak-cta-contact">+998 99 116 46 58 · t.me/muslimansoriy · Toshkent</p>
        </div>
      </section>

      {/* ===================== FOOTER ===================== */}
      <footer className="ak-footer">
        <div className="ak-wrap">
          <div className="ak-foot-top">
            <div className="ak-foot-brand">
              <a className="ak-brand ak-brand--dark" href="#top">
                <BrandMark light />
                <span>Empire</span>
              </a>
              <p className="ak-foot-tag">
                AI, custom software va Odoo ERP — g'oyadan tayyor mahsulotgacha.
              </p>
            </div>
            <div className="ak-foot-cols">
              <div className="ak-foot-col">
                <p className="ak-eyebrow">Xizmatlar</p>
                <a href="#xizmatlar">Maxsus dasturiy ta'minot</a>
                <a href="#xizmatlar">Odoo ERP &amp; AI</a>
                <a href="#narxlar">Narxlar</a>
              </div>
              <div className="ak-foot-col">
                <p className="ak-eyebrow">Kompaniya</p>
                <a href="#loyihalar">Loyihalar</a>
                <a href="#jarayon">Jarayon</a>
                <a href="#sharhlar">Sharhlar</a>
                <a href="/blog">Blog</a>
              </div>
              <div className="ak-foot-col">
                <p className="ak-eyebrow">Aloqa</p>
                <a href="mailto:muslimansoriy7@gmail.com">muslimansoriy7@gmail.com</a>
                <a href="tel:+998991164658">+998 99 116 46 58</a>
                <a href="https://t.me/muslimansoriy" target="_blank" rel="noopener noreferrer">Telegram</a>
                <a href="https://instagram.com/empiregroup.uz" target="_blank" rel="noopener noreferrer">Instagram</a>
              </div>
            </div>
          </div>
          <div className="ak-foot-bottom">
            <span className="ak-eyebrow">© 2026 Empire Group. Barcha huquqlar himoyalangan.</span>
            <span className="ak-eyebrow">Toshkent · O'zbekiston</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

function delay(i: number): CSSProperties {
  return { transitionDelay: `${Math.min(i, 6) * 70}ms` } as CSSProperties;
}

/* ============================== CSS ============================== */

const CSS = `
.ak {
  --obsidian:#000; --paper:#fff; --ink:#171717; --charcoal:#1f1f1f;
  --graphite:#515151; --slate:#979797; --ash:#b9b9b9; --fog:#cfcfcf; --mist:#c5c5c5;
  --serif:'Cormorant Garamond', Georgia, 'Times New Roman', serif;
  --sans:'Inter', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
  --mono:'Space Mono', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  --max:1200px;
  font-family:var(--sans);
  background:var(--paper); color:var(--ink);
  -webkit-font-smoothing:antialiased; text-rendering:optimizeLegibility;
  overflow-x:clip;
}
.ak *{box-sizing:border-box;}
.ak img{display:block; max-width:100%;}

/* ---- typographic primitives ---- */
.ak .ak-eyebrow{
  font-family:var(--mono); font-weight:400; font-size:12px; letter-spacing:.08em;
  text-transform:uppercase; color:var(--slate); margin:0;
}
.ak .ak-eyebrow--light{ color:var(--fog); }
.ak .ak-center{ text-align:center; }
.ak .ak-h2{
  font-family:var(--serif); font-weight:300; font-size:40px; line-height:1.0;
  letter-spacing:-.01em; color:var(--ink); margin:12px 0 0;
}
.ak .ak-lead{
  font-family:var(--sans); font-weight:400; font-size:16px; line-height:1.5;
  color:var(--graphite); max-width:640px; margin:14px 0 0;
}

/* ---- layout ---- */
.ak-wrap{ max-width:var(--max); margin:0 auto; padding:0 24px; }
.ak-wrap--narrow{ max-width:820px; }
.ak-sec{ padding:80px 0; }
.ak-sec--tight{ padding:48px 0; }
.ak-head{ margin-bottom:44px; }

/* ---- buttons ---- */
.ak .ak-btn{
  display:inline-flex; align-items:center; justify-content:center;
  font-family:var(--sans); font-weight:500; font-size:14px; line-height:1;
  padding:11px 18px; border-radius:4px; border:1px solid transparent;
  text-decoration:none; cursor:pointer; transition:background .18s ease,color .18s ease,border-color .18s ease,opacity .18s ease;
  white-space:nowrap;
}
.ak .ak-btn-filled{ background:var(--ink); color:#fff; border-color:var(--ink); }
.ak .ak-btn-filled:hover{ background:#000; }
.ak .ak-btn-invert{ background:#fff; color:var(--ink); border-color:#fff; }
.ak .ak-btn-invert:hover{ background:var(--fog); border-color:var(--fog); }
.ak .ak-btn-ghost{ background:transparent; color:#fff; border-color:#fff; }
.ak .ak-btn-ghost:hover{ background:rgba(255,255,255,.1); }
.ak .ak-nav--solid .ak-btn-ghost{ color:var(--ink); border-color:var(--ink); }

/* ---- nav ---- */
.ak-nav{ position:fixed; top:0; left:0; right:0; z-index:50;
  transition:background .3s ease, border-color .3s ease; border-bottom:1px solid transparent; }
.ak-nav--solid{ background:rgba(255,255,255,.92); backdrop-filter:saturate(1.4) blur(8px); border-bottom-color:var(--fog); }
.ak-nav-inner{ max-width:var(--max); margin:0 auto; padding:14px 24px;
  display:flex; align-items:center; justify-content:space-between; gap:24px; }
.ak .ak-brand{ display:inline-flex; align-items:center; gap:8px; text-decoration:none;
  font-family:var(--sans); font-weight:500; font-size:16px; color:#fff; }
.ak-nav--solid .ak-brand{ color:var(--ink); }
.ak-nav-links{ display:flex; gap:24px; }
.ak .ak-nav-links a{ font-family:var(--sans); font-weight:400; font-size:14px;
  color:var(--fog); text-decoration:none; transition:color .18s ease; }
.ak .ak-nav-links a:hover{ color:#fff; }
.ak-nav--solid .ak-nav-links a{ color:var(--graphite); }
.ak-nav--solid .ak-nav-links a:hover{ color:var(--ink); }

/* ---- hero ---- */
.ak-hero{ position:relative; width:100vw; left:50%; transform:translateX(-50%);
  min-height:86vh; background:#000; display:flex; align-items:center;
  overflow:hidden; padding:120px 0 80px; }
.ak-hero-burst{ position:absolute; inset:-10% -10% -10% -10%; z-index:0;
  background:
    radial-gradient(ellipse 80% 60% at 50% 78%,
      rgba(255,240,220,.9) 0%,
      rgba(255,150,80,.5) 22%,
      rgba(220,60,60,.4) 38%,
      rgba(70,90,200,.35) 58%,
      rgba(120,60,180,.3) 72%,
      rgba(0,0,0,0) 90%);
  filter:saturate(1.05);
  animation:akDrift 18s ease-in-out infinite alternate;
}
@keyframes akDrift{ from{ transform:translateY(0) scale(1); } to{ transform:translateY(-2.5%) scale(1.05); } }
.ak-hero-grain{ position:absolute; inset:0; z-index:1; pointer-events:none;
  background:radial-gradient(ellipse 120% 100% at 50% 60%, rgba(0,0,0,0) 40%, rgba(0,0,0,.55) 100%); }
.ak-hero-inner{ position:relative; z-index:2; max-width:var(--max); margin:0 auto;
  padding:0 24px; text-align:center; width:100%; }
.ak-hero .ak-eyebrow{ margin-bottom:22px; }
.ak-hero-h1{ font-family:var(--serif); font-weight:300; color:#fff;
  font-size:64px; line-height:1.0; letter-spacing:-.01em; margin:0 auto; max-width:14ch; }
.ak-hero-h1-sub{ display:block; font-size:36px; color:var(--fog); line-height:1.05; margin-top:8px; max-width:none; }
.ak-hero-sub{ font-family:var(--sans); font-weight:400; font-size:18px; line-height:1.5;
  color:var(--fog); max-width:600px; margin:24px auto 0; }
.ak-hero-cta{ display:flex; gap:12px; justify-content:center; margin-top:32px; flex-wrap:wrap; }
.ak-hero-stats{ display:flex; gap:14px; justify-content:center; flex-wrap:wrap; margin-top:40px;
  font-family:var(--mono); font-size:13px; color:var(--fog); letter-spacing:.02em; }
.ak-stat b{ color:#fff; font-weight:700; }
.ak-stat-dot{ margin-right:14px; color:var(--slate); }

/* ---- logo strip ---- */
.ak-logostrip{ display:flex; flex-wrap:wrap; align-items:center; justify-content:center;
  gap:44px; margin-top:28px; }
.ak-clientlogo{ height:34px; width:auto; object-fit:contain; filter:grayscale(1);
  opacity:.55; transition:opacity .2s ease; }
.ak-clientlogo:hover{ opacity:1; filter:grayscale(1); }

/* ---- feature cards ---- */
.ak-grid4{ display:grid; grid-template-columns:repeat(4,1fr); gap:20px; }
.ak-grid3{ display:grid; grid-template-columns:repeat(3,1fr); gap:20px; align-items:start; }
.ak-grid2{ display:grid; grid-template-columns:repeat(2,1fr); gap:32px 24px; }

.ak-feat-card{ background:radial-gradient(120% 120% at 30% 0%, #262626 0%, #1f1f1f 45%, #171717 100%);
  border-radius:4px; padding:20px; }
.ak-feat-ico{ display:inline-flex; align-items:center; justify-content:center;
  width:52px; height:52px; border-radius:100px;
  background:radial-gradient(100% 100% at 50% 0%, #2c2c2c 0%, #171717 100%); margin-bottom:44px; }
.ak-feat-title{ font-family:var(--sans); font-weight:500; font-size:16px; color:#fff; margin:0; }
.ak-feat-desc{ font-family:var(--sans); font-weight:400; font-size:14px; line-height:1.45;
  color:var(--graphite); margin:12px 2px 0; }

/* ---- portfolio ---- */
.ak-case-frame{ border-radius:4px; overflow:hidden; background:var(--ash); aspect-ratio:16/10; }
.ak-case-img{ width:100%; height:100%; object-fit:cover; object-position:top center;
  filter:grayscale(1) contrast(1.02); transition:opacity .3s ease, transform .4s ease; opacity:.92; }
.ak-case:hover .ak-case-img{ opacity:1; transform:scale(1.02); }
.ak-case-seg{ margin-top:16px; }
.ak-case-title{ font-family:var(--serif); font-weight:300; font-size:24px; line-height:1.06;
  letter-spacing:-.01em; color:var(--ink); margin:6px 0 0; }
.ak-case-result{ font-family:var(--sans); font-weight:400; font-size:15px; color:var(--graphite); margin:8px 0 0; }
.ak-case-foot{ display:flex; align-items:center; justify-content:space-between; gap:12px;
  margin-top:14px; flex-wrap:wrap; }
.ak-tags{ display:flex; gap:6px; flex-wrap:wrap; }
.ak-tag{ font-family:var(--mono); font-size:11px; letter-spacing:.02em; color:var(--graphite);
  border:1px solid var(--fog); border-radius:4px; padding:3px 8px; }
.ak .ak-case-link{ font-family:var(--mono); font-size:12px; color:var(--ink);
  text-decoration:none; border-bottom:1px solid var(--fog); padding-bottom:1px; transition:border-color .18s ease; }
.ak .ak-case-link:hover{ border-color:var(--ink); }

/* ---- process ---- */
.ak-step-n{ font-family:var(--mono); font-size:13px; color:var(--slate); letter-spacing:.06em; }
.ak-step-title{ font-family:var(--serif); font-weight:300; font-size:28px; line-height:1.04;
  letter-spacing:-.01em; color:var(--ink); margin:8px 0 0; }
.ak-step-desc{ font-family:var(--sans); font-weight:400; font-size:14px; line-height:1.5;
  color:var(--graphite); margin:10px 0 14px; }
.ak-step{ border-top:1px solid var(--fog); padding-top:16px; }

/* ---- marks (stack + partners) ---- */
.ak-marks{ display:grid; grid-template-columns:repeat(6,1fr); gap:20px 12px; }
.ak-mark{ display:flex; flex-direction:column; align-items:center; gap:10px;
  padding:18px 8px; border-radius:4px; color:var(--slate); transition:color .2s ease; }
.ak-mark:hover{ color:var(--ink); }
.ak-mark svg{ width:30px; height:30px; }
.ak-mark span{ font-family:var(--mono); font-size:12px; letter-spacing:.01em; color:inherit; text-align:center; }

/* ---- team ---- */
.ak-member-vis{ aspect-ratio:1/1; border-radius:4px; overflow:hidden; background:var(--charcoal);
  display:flex; align-items:center; justify-content:center; }
.ak-member-photo{ width:100%; height:100%; object-fit:cover; filter:grayscale(1) contrast(1.02); }
.ak-member-mono{ font-family:var(--serif); font-weight:300; font-size:40px; color:#fff; letter-spacing:.02em; }
.ak-member-name{ font-family:var(--serif); font-weight:300; font-size:24px; line-height:1.06;
  letter-spacing:-.01em; color:var(--ink); margin:14px 0 0; }
.ak-member-role{ margin-top:6px; text-transform:none; letter-spacing:.02em; color:var(--graphite); }
.ak-member-bio{ font-family:var(--sans); font-weight:400; font-size:13px; line-height:1.5;
  color:var(--graphite); margin:10px 0 0; }

/* ---- testimonials ---- */
.ak-quote{ margin:0; padding:24px; border:1px solid var(--fog); border-radius:4px; }
.ak-quote-text{ font-family:var(--sans); font-weight:400; font-size:16px; line-height:1.58;
  color:var(--ink); margin:0; }
.ak-quote-by{ display:flex; align-items:center; gap:12px; margin-top:20px; }
.ak-avatar{ width:32px; height:32px; border-radius:100px; background:var(--charcoal); color:#fff;
  display:inline-flex; align-items:center; justify-content:center;
  font-family:var(--sans); font-weight:500; font-size:12px; flex:none; }
.ak-quote-meta{ display:flex; flex-direction:column; gap:2px; }
.ak-quote-meta b{ font-family:var(--sans); font-weight:500; font-size:14px; color:var(--ink); }
.ak-quote-meta em{ font-style:normal; color:var(--slate); }

/* ---- pricing ---- */
.ak-toggle{ display:inline-flex; gap:4px; padding:4px; border:1px solid var(--fog);
  border-radius:4px; margin-bottom:32px; }
.ak .ak-toggle-btn{ font-family:var(--sans); font-weight:500; font-size:14px; color:var(--graphite);
  background:transparent; border:none; border-radius:4px; padding:9px 16px; cursor:pointer;
  transition:background .18s ease,color .18s ease; }
.ak .ak-toggle-btn.is-on{ background:var(--ink); color:#fff; }
.ak-price{ border:1px solid var(--fog); border-radius:4px; padding:24px; display:flex; flex-direction:column; }
.ak-price--dark{ background:var(--ink); border-color:var(--ink); }
.ak-price-badge{ color:var(--slate); }
.ak-price--dark .ak-price-badge{ color:var(--fog); }
.ak-price-amt{ font-family:var(--serif); font-weight:300; font-size:32px; line-height:1.04;
  letter-spacing:-.01em; color:var(--ink); margin:12px 0 0; }
.ak-price--dark .ak-price-amt{ color:#fff; }
.ak-price-term{ font-family:var(--mono); font-size:12px; color:var(--slate); margin:6px 0 0; }
.ak-price-list{ list-style:none; padding:0; margin:18px 0 22px; display:flex; flex-direction:column; gap:9px; flex:1; }
.ak-price-list li{ font-family:var(--sans); font-weight:400; font-size:14px; line-height:1.4;
  color:var(--graphite); display:flex; gap:8px; }
.ak-price--dark .ak-price-list li{ color:var(--fog); }
.ak-check{ color:var(--slate); flex:none; }
.ak-price-note{ text-align:center; margin-top:28px; color:var(--slate); }

/* ---- credentials ---- */
.ak-cred-frame{ height:96px; border:1px solid var(--fog); border-radius:4px; background:#fff;
  display:flex; align-items:center; justify-content:center; padding:16px; }
.ak-cred-img{ max-height:100%; max-width:100%; width:auto; object-fit:contain; }
.ak-cred-title{ font-family:var(--sans); font-weight:500; font-size:15px; line-height:1.3;
  color:var(--ink); margin:14px 0 0; }
.ak-cred-org{ font-family:var(--sans); font-weight:400; font-size:13px; color:var(--graphite); margin:6px 0 0; }
.ak-cred-status{ font-family:var(--mono); font-size:11px; letter-spacing:.06em; color:var(--slate);
  margin:12px 0 0; display:flex; align-items:center; gap:8px; }
.ak-cred-dot{ width:7px; height:7px; border-radius:100px; background:var(--slate); flex:none; }
.ak-cred-status.is-active{ color:var(--ink); }
.ak-cred-status.is-active .ak-cred-dot{ background:var(--ink); }

/* ---- faq ---- */
.ak-faq{ border-top:1px solid var(--fog); }
.ak-faq-item{ border-bottom:1px solid var(--fog); }
.ak .ak-faq-q{ width:100%; display:flex; align-items:center; justify-content:space-between; gap:20px;
  background:transparent; border:none; cursor:pointer; padding:20px 2px; text-align:left;
  font-family:var(--serif); font-weight:300; font-size:20px; letter-spacing:-.005em; color:var(--ink); }
.ak-faq-mark{ font-family:var(--sans); font-weight:400; font-size:20px; color:var(--slate); flex:none;
  transition:color .18s ease; }
.ak-faq-item.is-open .ak-faq-mark{ color:var(--ink); }
.ak-faq-a{ padding:0 2px 22px; }
.ak-faq-a p{ font-family:var(--sans); font-weight:400; font-size:15px; line-height:1.58;
  color:var(--graphite); margin:0; max-width:66ch; }

/* ---- final cta ---- */
.ak-cta{ position:relative; width:100vw; left:50%; transform:translateX(-50%);
  background:#000; overflow:hidden; padding:100px 0; text-align:center; }
.ak-cta-burst{ position:absolute; inset:-20% -10% -30% -10%; z-index:0;
  background:radial-gradient(ellipse 70% 55% at 50% 80%,
    rgba(255,240,220,.55) 0%, rgba(255,150,80,.28) 28%, rgba(180,60,90,.22) 48%,
    rgba(80,90,190,.2) 66%, rgba(0,0,0,0) 86%); }
.ak-cta-inner{ position:relative; z-index:1; max-width:var(--max); margin:0 auto; padding:0 24px; }
.ak-cta-inner .ak-eyebrow{ margin-bottom:18px; }
.ak-cta-h2{ font-family:var(--serif); font-weight:300; font-size:48px; line-height:1.0;
  letter-spacing:-.01em; color:#fff; margin:0 auto 28px; max-width:16ch; }
.ak-cta-contact{ margin-top:22px; color:var(--fog); }

/* ---- footer ---- */
.ak-footer{ background:var(--ink); padding:56px 0 40px; }
.ak-foot-top{ display:grid; grid-template-columns:1.3fr 2fr; gap:40px; }
.ak-brand--dark{ color:#fff; }
.ak-foot-tag{ font-family:var(--sans); font-weight:400; font-size:14px; line-height:1.5;
  color:var(--fog); margin:14px 0 0; max-width:34ch; }
.ak-foot-cols{ display:grid; grid-template-columns:repeat(3,1fr); gap:24px; }
.ak-foot-col{ display:flex; flex-direction:column; gap:10px; }
.ak-foot-col .ak-eyebrow{ color:var(--slate); margin-bottom:4px; }
.ak .ak-foot-col a{ font-family:var(--sans); font-weight:400; font-size:14px; color:var(--fog);
  text-decoration:none; transition:color .18s ease; }
.ak .ak-foot-col a:hover{ color:#fff; }
.ak-foot-bottom{ display:flex; align-items:center; justify-content:space-between; gap:16px;
  flex-wrap:wrap; margin-top:44px; padding-top:24px; border-top:1px solid var(--charcoal); }
.ak-foot-bottom .ak-eyebrow{ color:var(--slate); }

/* ---- reveal ---- */
.ak .ak-rise{ opacity:1; transform:translateY(16px);
  transition:opacity .6s cubic-bezier(.16,1,.3,1), transform .6s cubic-bezier(.16,1,.3,1); }
.ak .ak-rise.in{ transform:none; }

/* ---- focus ---- */
.ak a:focus-visible, .ak button:focus-visible{ outline:2px solid var(--ink); outline-offset:3px; border-radius:4px; }
.ak-nav .ak-btn-ghost:focus-visible, .ak-hero a:focus-visible, .ak-cta a:focus-visible{ outline-color:#fff; }

/* ---- responsive ---- */
@media (max-width:960px){
  .ak-grid4{ grid-template-columns:repeat(2,1fr); }
  .ak-marks{ grid-template-columns:repeat(4,1fr); }
  .ak-nav-links{ display:none; }
  .ak-foot-top{ grid-template-columns:1fr; }
  .ak-hero-h1{ font-size:52px; }
  .ak-hero-h1-sub{ font-size:30px; }
}
@media (max-width:640px){
  .ak-sec{ padding:56px 0; }
  .ak-grid4,.ak-grid3,.ak-grid2{ grid-template-columns:1fr; }
  .ak-marks{ grid-template-columns:repeat(3,1fr); }
  .ak .ak-h2{ font-size:32px; }
  .ak-hero-h1{ font-size:40px; }
  .ak-hero-h1-sub{ font-size:24px; }
  .ak-hero-sub{ font-size:16px; }
  .ak-cta-h2{ font-size:34px; }
  .ak-foot-cols{ grid-template-columns:1fr 1fr; }
  .ak-toggle{ display:flex; width:100%; }
  .ak .ak-toggle-btn{ flex:1; }
}

/* ---- reduced motion ---- */
@media (prefers-reduced-motion: reduce){
  .ak .ak-rise{ opacity:1 !important; transform:none !important; transition:none !important; }
  .ak-hero-burst{ animation:none !important; }
  .ak .ak-btn, .ak-case-img, .ak-mark, .ak .ak-nav-links a{ transition:none !important; }
}
`;
