"use client";

import { useEffect, useState } from "react";
import { toolLogos, brandLogos } from "@/content/logos";

type CSS = React.CSSProperties;

const CLIENTS = [
  { src: "/logos/motorlux.png", name: "Motor Lux" },
  { src: "/logos/medflow.png", name: "MedFlow" },
  { src: "/logos/grandosiyo.png", name: "Grand Osiyo" },
  { src: "/logos/texnika.png", name: "Texnika Ijara" },
  { src: "/logos/gadgetspace.png", name: "GadgetSpace" },
  { src: "/logos/xwear.png", name: "X Wear" },
  { src: "/logos/hilol.png", name: "Hilol Market" },
];

const CASES = [
  { seg: "Avtomobil · CRM", title: "Motor Lux — CRM va savdo boshqaruvi", res: "Savdo va mijozlar bitta tizimda", img: "/cases/case-autoservice-desktop.webp", url: "motorlux.uz" },
  { seg: "Tibbiyot · CRM (PWA)", title: "MedFlow — klinika CRM va bemor qabuli", res: "Qabul boshqaruvi 3× tezlashdi", img: "/cases/case-medflow-desktop.webp", url: "medflow.uz" },
  { seg: "To'qimachilik · ERP", title: "Grand Osiyo Textile — ERP va ombor tizimi", res: "Ombor real vaqtda boshqariladi", img: "/cases/case-textile-desktop.webp", url: "grandosiyo.uz" },
  { seg: "Ijara · Katalog", title: "Texnika Ijara — ijara va katalog sayti", res: "Onlayn bronlar 3× oshdi", img: "/cases/case-texnika-desktop.webp", url: "texnika-ijara.uz" },
  { seg: "Elektronika · E-commerce", title: "GadgetSpace — onlayn elektronika do'koni", res: "Konversiya 2.1× oshdi", img: "/cases/case-gadgetspace-desktop.webp", url: "gadgetspace.uz" },
  { seg: "Moda · E-commerce", title: "X Wear — kiyim brendi uchun do'kon", res: "O'rtacha chek 28% oshdi", img: "/cases/case-xwear-desktop.webp", url: "xwear.uz" },
  { seg: "Savdo · POS", title: "Hilol Market — savdo avtomatlashtirish", res: "Hisob-kitob 2× tezlashdi", img: "/cases/case-kassa-desktop.webp", url: "hilolmarket.uz" },
];

const CAPS = [
  { l: "Mobil ilova", t: "iOS + Android", b: "Flutter — bitta koddan ikki platforma." },
  { l: "Integratsiya & API", t: "Ulangan tizimlar", b: "To'lov, SMS, 1C, marketpleyslar." },
  { l: "Biznes-tahlil", t: "Aniq talablar", b: "AS-IS / TO-BE, dashboard va hisobot." },
  { l: "DevOps & Cloud", t: "Barqaror infra", b: "CI/CD, Docker, monitoring." },
];

const STATS = [
  { n: "50+", l: "Yakunlangan loyiha" },
  { n: "30+", l: "Mamnun mijoz" },
  { n: "15+", l: "Texnologiya" },
  { n: "3+ yil", l: "Tajriba" },
];

const PROCESS = [
  { n: "01", t: "Explore", b: "G'oya va muammoni chuqur o'rganamiz.", tags: ["Tahlil", "Audit"] },
  { n: "02", t: "Plan", b: "PRD, TZ, arxitektura, dizayn; muddat va byudjet aniq.", tags: ["PRD", "TZ", "Dizayn"] },
  { n: "03", t: "Build", b: "Kod, test, integratsiya; sprintlar, demo.", tags: ["Dev", "Test", "Demo"] },
  { n: "04", t: "Commit", b: "Ishga tushirish va uzoq muddatli qo'llab-quvvatlash.", tags: ["Deploy", "Support"] },
];

const TEAM = [
  { n: "Muslim Ansoriy", r: "Ta'sischi va CEO · Technical Product Manager", b: "7+ yil IT va biznes-avtomatlashtirish; Odoo ERP Partner Manager (Markaziy Osiyo/Kavkaz); 20+ ERP loyiha.", photo: "/founder.webp" },
  { n: "Abbos Jo'rayev", r: "Hammuassis va COO", b: "6+ yil IT loyiha boshqaruvi." },
  { n: "Sardor Rahmatullayev", r: "Senior Odoo Developer", b: "5 yil Python/Odoo; 30+ modul; REST/XML-RPC." },
  { n: "Dilnoza Yusupova", r: "Biznes-analitik · ERP Consultant", b: "4 yil biznes-tahlil; AS-IS/TO-BE." },
  { n: "Jasurbek Toshmatov", r: "Full-stack Developer", b: "5 yil web/mobil; React, Next.js, Node.js." },
  { n: "Nilufar Karimova", r: "Digital Marketing Lead", b: "6 yil marketing; SEO, lead gen." },
  { n: "Bekzod Ergashev", r: "DevOps · SysAdmin", b: "4 yil infratuzilma; Linux, Docker, CI/CD." },
  { n: "Malika Sobirova", r: "UI/UX Designer", b: "4 yil interfeys dizayni; Figma." },
];

const TESTI = [
  { q: "Empire bilan ishlash oson bo'ldi, muddat va byudjet aniq edi.", n: "Jasur T.", r: "GadgetSpace · E-commerce" },
  { q: "Klinika ishini AI qo'shib avtomatlashtirdi. Qabul ancha tartibli.", n: "Doniyor R.", r: "MedFlow · klinika" },
  { q: "Zamonaviy dizayn, savdo hajmi ko'tarildi.", n: "Laziza K.", r: "X Wear · e-commerce" },
];

const PRICING: Record<string, { badge: string; price: string; term: string; feats: string[]; feat?: boolean }[]> = {
  soft: [
    { badge: "Standard", price: "$5,000 dan", term: "2–3 oy", feats: ["Landing yoki MVP", "Forma va integratsiya", "Asosiy admin panel", "Responsive dizayn"] },
    { badge: "Advanced", price: "$15K–$40K", term: "4–6 oy", feats: ["To'liq web/mobil ilova", "CRM integratsiya", "Admin panel", "API va avtomatlashtirish"], feat: true },
    { badge: "Mega", price: "$50,000+", term: "6–12 oy", feats: ["Yirik ekotizim", "Mikroxizmatlar", "Yuqori yuklama", "Maxsus SLA"] },
  ],
  odoo: [
    { badge: "Standard", price: "$8,800 dan", term: "2–3 oy", feats: ["Standart modullar", "Ma'lumot migratsiyasi", "Xodimlarni o'qitish", "Bazaviy sozlash"] },
    { badge: "Advanced", price: "$25K–$35K", term: "4–6 oy", feats: ["Maxsus modullar", "AI chat-bot", "Hujjat aylanishi", "Jarayon avtomatlashtirish"], feat: true },
    { badge: "Mega", price: "$85,000+", term: "~1 yil", feats: ["To'liq transformatsiya", "Predictive analytics", "Chuqur AI", "Barcha bo'limlar"] },
  ],
};

const CREDS = [
  { name: "Odoo Learning Partner", img: "/sertifikat/odoo-learning-partner.svg", iss: "Odoo S.A.", st: "Tasdiqlangan" },
  { name: "Davlat ro'yxatidan o'tganlik guvohnomasi", img: "/sertifikat/davlat-royxat-guvohnomasi.png", iss: "“EMPIRE GROUP CORP” MCHJ", st: "Tasdiqlangan" },
  { name: "IT Park rezidenti", img: "/sertifikat/it-park.svg", iss: "IT Park O'zbekiston", st: "Kutilmoqda" },
  { name: "ISO/IEC 27001", img: "/sertifikat/iso-27001.svg", iss: "Axborot xavfsizligi standarti", st: "Kutilmoqda" },
];

const FAQ = [
  { q: "Loyiha qancha vaqt oladi?", a: "Kichik MVP 3–4 hafta, o'rtacha 2–3 oy, yirik 4–6 oy. Aniq muddat Explore bosqichida." },
  { q: "Narx qanday hisoblanadi?", a: "Fixed-scope: loyiha hajmi aniqlangach aniq narx. Yashirin xarajat yo'q. Paketlar $5,000 dan." },
  { q: "Narxlar nega farq qiladi?", a: "Murakkablik, integratsiyalar va muddatga bog'liq." },
  { q: "Ishlab bo'lgach yordam beramizmi?", a: "Ha, qo'llab-quvvatlash, tuzatish va rivojlantirish davom etadi." },
  { q: "To'lov qanday?", a: "Bosqichma-bosqich: oldindan qism, keyin sprint natijalariga qarab." },
  { q: "Kod kimga tegishli?", a: "Barchasi sizga. Vendor lock-in yo'q." },
  { q: "Mavjud tizimni davom ettira olasizmi?", a: "Ha, ko'rib chiqib davom ettiramiz yoki qayta quramiz." },
  { q: "Konsultatsiya bepulmi?", a: "Ha. Explore bosqichida barcha savolga javob beramiz — majburiyatsiz." },
];

const NAV = ["Xizmatlar", "Jarayon", "Loyihalar", "Sharhlar", "Narxlar", "Blog"];

export default function V7() {
  const [track, setTrack] = useState<"soft" | "odoo">("soft");
  const [open, setOpen] = useState<number>(0);

  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".st .st-rise"));
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }),
      { threshold: 0, rootMargin: "0px 0px -6% 0px" }
    );
    els.forEach((el) => io.observe(el));
    const raf = requestAnimationFrame(() => {
      els.forEach((el) => { if (el.getBoundingClientRect().top < window.innerHeight * 0.92) el.classList.add("in"); });
    });
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, []);

  return (
    <div className="st">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,opsz,wght@0,8..60,400;1,8..60,400&family=Inter:wght@400;430;450;480;500&display=swap" />
      <style dangerouslySetInnerHTML={{ __html: CSS_STR }} />

      {/* NAV */}
      <header className="st-nav">
        <div className="st-wrap st-nav-in">
          <a href="#" className="st-logo">Empire</a>
          <nav className="st-nav-links">
            {NAV.map((n) => <a key={n} href="#">{n}</a>)}
          </nav>
          <div className="st-nav-cta">
            <a href="#" className="st-txtlink">Kirish</a>
            <a href="#cta" className="st-btn st-btn-filled">Bepul konsultatsiya</a>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="st-hero">
        <div className="st-wrap st-hero-in">
          <div className="st-art st-art-table st-rise" style={{ transitionDelay: "60ms" } as CSS} aria-hidden="true">
            <div className="st-art-h">Loyihalar</div>
            {[["Motor Lux", "CRM", "+38%"], ["MedFlow", "Klinika", "3×"], ["X Wear", "E-com", "+28%"], ["GadgetSpace", "E-com", "2.1×"]].map((r, i) => (
              <div className="st-art-row" key={i}><span>{r[0]}</span><span className="st-mut">{r[1]}</span><span className="st-pos">{r[2]}</span></div>
            ))}
          </div>

          <div className="st-art st-art-chart st-rise" style={{ transitionDelay: "120ms" } as CSS} aria-hidden="true">
            <div className="st-art-h2">Savdo o'sishi <span className="st-delta">↑ 5.5×</span></div>
            <svg viewBox="0 0 220 80" className="st-spark" preserveAspectRatio="none">
              <path d="M4 66 L40 58 L74 62 L110 40 L146 44 L182 20 L216 12" fill="none" stroke="#5d2a1a" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <div className="st-art st-art-stat st-rise" style={{ transitionDelay: "180ms" } as CSS} aria-hidden="true">
            <svg viewBox="0 0 44 44" className="st-ring"><circle cx="22" cy="22" r="18" fill="none" stroke="#ececec" strokeWidth="4" /><circle cx="22" cy="22" r="18" fill="none" stroke="#5d2a1a" strokeWidth="4" strokeLinecap="round" strokeDasharray="113" strokeDashoffset="52" transform="rotate(-90 22 22)" /></svg>
            <div><div className="st-stat-n">46.2%</div><div className="st-mut2">Konversiya · ↑ vs o'tgan oy</div></div>
          </div>

          <div className="st-art st-art-ai st-rise" style={{ transitionDelay: "240ms" } as CSS} aria-hidden="true">
            <span className="st-ai-ic">@</span>
            <span className="st-ai-ph">Loyihangizni yozing…</span>
            <span className="st-ai-send">↑</span>
          </div>

          <span className="st-av st-av-a" aria-hidden="true">JB</span>
          <span className="st-av st-av-b" aria-hidden="true">AF</span>

          <div className="st-hero-txt st-rise">
            <h1 className="st-display">Biznesni g'oyadan <em>ishlaydigan mahsulotga</em> aylantiramiz.</h1>
            <p className="st-sub">Murakkab ichki jarayonlarni ERP, AI, Web va App yechimlari orqali raqamlashtiramiz — atigi 2–3 oyda.</p>
            <div className="st-btns">
              <a href="#cta" className="st-btn st-btn-filled">Loyihani boshlash</a>
              <a href="#loyihalar" className="st-btn st-btn-ghost">Ishlarni ko'rish</a>
            </div>
          </div>
        </div>
      </section>

      {/* LOGO STRIP */}
      <section className="st-sec">
        <div className="st-wrap">
          <div className="st-tag st-center st-rise">Bizga ishonishadi</div>
          <div className="st-logos st-rise">
            {CLIENTS.map((c) => <img key={c.name} src={c.src} alt={c.name} loading="lazy" className="st-clogo" />)}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="st-sec st-fog" id="xizmatlar">
        <div className="st-wrap">
          <h2 className="st-h-lg st-rise">Ikki yo'nalish, bitta standart.</h2>
          <p className="st-sub2 st-rise">Maxsus dasturiy ta'minot yoki Odoo ERP & AI — har ikkalasi ham bir xil sifat va shaffof jarayon bilan quriladi.</p>
          <div className="st-grid2">
            {[
              { l: "Maxsus dasturiy ta'minot", t: "Web, mobil va ichki tizimlar", b: "Web/mobil ilova, ichki tizim, admin panel — biznesingizga aniq mos, noldan quriladi." },
              { l: "Odoo ERP & AI", t: "Yagona tizim, AI avtomatlashtirish", b: "Barcha jarayon bitta tizimda: sotuv, ombor, moliya, HR — AI bilan kuchaytiriladi." },
            ].map((s) => (
              <div className="st-card st-card-lg st-rise" key={s.l}>
                <div className="st-tag">{s.l}</div>
                <h3 className="st-ct">{s.t}</h3>
                <p className="st-cb">{s.b}</p>
                <a href="#loyihalar" className="st-txtlink">Batafsil →</a>
              </div>
            ))}
          </div>
          <div className="st-grid4">
            {CAPS.map((c) => (
              <div className="st-card st-card-sm st-rise" key={c.l}>
                <div className="st-tag">{c.l}</div>
                <h4 className="st-ct-sm">{c.t}</h4>
                <p className="st-cb">{c.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PEACH SPOTLIGHT (the single peach card) */}
      <section className="st-sec">
        <div className="st-wrap">
          <div className="st-peach st-rise">
            <div className="st-peach-tag">Mijoz fikri</div>
            <p className="st-peach-q">"Empire Group eski qog'ozdagi ishimizni to'liq tizimga o'tkazdi — endi hamma narsa bitta joyda, vaqt ancha tejaldi."</p>
            <div className="st-peach-at">Aliya M. · Motor Lux, CRM loyihasi</div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="st-sec">
        <div className="st-wrap st-grid4">
          {STATS.map((s) => (
            <div className="st-card st-card-sm st-stat-card st-rise" key={s.l}>
              <div className="st-stat-big">{s.n}</div>
              <div className="st-mut">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PORTFOLIO */}
      <section className="st-sec st-fog" id="loyihalar">
        <div className="st-wrap">
          <h2 className="st-h-lg st-rise">So'nggi ishlarimiz.</h2>
          <p className="st-sub2 st-rise">Real, ishga tushirilgan loyihalar — har biri yechilgan muammo.</p>
          <div className="st-grid2">
            {CASES.map((c, i) => (
              <div className="st-card st-case st-rise" key={c.title} style={{ transitionDelay: `${(i % 2) * 60}ms` } as CSS}>
                <div className="st-case-img"><img src={c.img} alt={c.title} loading="lazy" /></div>
                <div className="st-tag">{c.seg}</div>
                <h3 className="st-ct-sm">{c.title}</h3>
                <p className="st-cb">{c.res}</p>
                <a href={`https://${c.url}`} target="_blank" rel="noopener noreferrer" className="st-txtlink">↗ {c.url}</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="st-sec" id="jarayon">
        <div className="st-wrap">
          <h2 className="st-h-lg st-rise">G'oyadan mahsulotgacha — 4 bosqich.</h2>
          <div className="st-grid4">
            {PROCESS.map((p, i) => (
              <div className="st-card st-card-sm st-rise" key={p.n} style={{ transitionDelay: `${i * 50}ms` } as CSS}>
                <div className="st-tag">{p.n}</div>
                <h3 className="st-ct-sm">{p.t}</h3>
                <p className="st-cb">{p.b}</p>
                <div className="st-tagrow">{p.tags.map((t) => <span className="st-minitag" key={t}>{t}</span>)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STACK */}
      <section className="st-sec st-fog">
        <div className="st-wrap">
          <h2 className="st-h st-rise">Ishonchli, sanoat standarti texnologiyalar.</h2>
          <div className="st-logogrid st-rise">
            {toolLogos.filter((t) => t.path).slice(0, 12).map((t) => (
              <div className="st-lchip" key={t.title}>
                <svg viewBox="0 0 24 24" width="20" height="20"><path d={t.path} fill="currentColor" /></svg>
                <span>{t.title}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNERS */}
      <section className="st-sec">
        <div className="st-wrap">
          <div className="st-tag st-center st-rise">Dunyo yetakchilari darajasida ishlaymiz</div>
          <div className="st-logogrid st-rise">
            {brandLogos.filter((b) => b.path).slice(0, 10).map((b) => (
              <div className="st-lchip st-lchip-plain" key={b.title}>
                <svg viewBox="0 0 24 24" width="20" height="20"><path d={b.path} fill="currentColor" /></svg>
                <span>{b.title}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="st-sec st-fog">
        <div className="st-wrap">
          <h2 className="st-h-lg st-rise">Ortida — real jamoa.</h2>
          <div className="st-grid4">
            {TEAM.map((m, i) => (
              <div className="st-card st-card-sm st-member st-rise" key={m.n} style={{ transitionDelay: `${(i % 4) * 50}ms` } as CSS}>
                {m.photo
                  ? <img src={m.photo} alt={m.n} loading="lazy" className="st-mphoto" />
                  : <span className={`st-av st-av-inline st-av-${i % 3}`}>{m.n.split(" ").map((w) => w[0]).join("").slice(0, 2)}</span>}
                <h3 className="st-ct-sm">{m.n}</h3>
                <div className="st-tag">{m.r}</div>
                <p className="st-cb">{m.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="st-sec" id="sharhlar">
        <div className="st-wrap">
          <h2 className="st-h st-rise">Mijozlarimiz nima deydi.</h2>
          <div className="st-grid3">
            {TESTI.map((t, i) => (
              <div className="st-card st-card-sm st-testi st-rise" key={t.n} style={{ transitionDelay: `${i * 60}ms` } as CSS}>
                <p className="st-tq">"{t.q}"</p>
                <div className="st-testi-at">
                  <span className={`st-av st-av-inline st-av-${i % 3}`}>{t.n.split(" ").map((w) => w[0]).join("").slice(0, 2)}</span>
                  <div><div className="st-tn">{t.n}</div><div className="st-tag">{t.r}</div></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="st-sec st-fog" id="narxlar">
        <div className="st-wrap">
          <h2 className="st-h-lg st-rise">Shaffof narxlar.</h2>
          <div className="st-toggle st-rise" role="tablist">
            <button role="tab" aria-selected={track === "soft"} className={track === "soft" ? "on" : ""} onClick={() => setTrack("soft")}>Maxsus dasturiy ta'minot</button>
            <button role="tab" aria-selected={track === "odoo"} className={track === "odoo" ? "on" : ""} onClick={() => setTrack("odoo")}>Odoo ERP & AI</button>
          </div>
          <div className="st-grid3">
            {PRICING[track].map((p, i) => (
              <div className={`st-card st-price st-rise ${p.feat ? "st-price-feat" : ""}`} key={p.badge} style={{ transitionDelay: `${i * 60}ms` } as CSS}>
                <div className="st-tag">{p.badge}</div>
                <div className="st-price-n">{p.price}</div>
                <div className="st-mut">{p.term}</div>
                <ul className="st-price-list">{p.feats.map((f) => <li key={f}>{f}</li>)}</ul>
                <a href="#cta" className={`st-btn ${p.feat ? "st-btn-white" : "st-btn-ghost"} st-btn-block`}>Konsultatsiya olish</a>
              </div>
            ))}
          </div>
          <p className="st-note st-center">Fixed-scope · yashirin to'lov yo'q · 4 hafta qo'llab-quvvatlash</p>
        </div>
      </section>

      {/* CREDENTIALS */}
      <section className="st-sec">
        <div className="st-wrap">
          <h2 className="st-h st-rise">Rasmiy maqom va sertifikatlar.</h2>
          <div className="st-grid4">
            {CREDS.map((c, i) => (
              <div className="st-card st-card-sm st-cred st-rise" key={c.name} style={{ transitionDelay: `${i * 50}ms` } as CSS}>
                <div className="st-cred-img"><img src={c.img} alt={c.name} loading="lazy" /></div>
                <h3 className="st-ct-sm">{c.name}</h3>
                <div className="st-tag">{c.iss}</div>
                <div className={`st-cred-st ${c.st === "Tasdiqlangan" ? "ok" : ""}`}>{c.st}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="st-sec st-fog">
        <div className="st-wrap st-faq-wrap">
          <h2 className="st-h st-rise">Ko'p so'raladigan savollar.</h2>
          <div className="st-faq st-rise">
            {FAQ.map((f, i) => (
              <div className={`st-faq-row ${open === i ? "open" : ""}`} key={f.q}>
                <button className="st-faq-q" aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)}>
                  <span>{f.q}</span><span className="st-faq-ic">↓</span>
                </button>
                <div className="st-faq-a"><p>{f.a}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="st-sec st-center" id="cta">
        <div className="st-wrap st-cta">
          <h2 className="st-h-lg st-rise">Loyihangizni bugun <em>boshlaymiz</em>.</h2>
          <p className="st-sub2 st-rise st-center">G'oyangizni ayting — biz uni aniq muddat va byudjet bilan tayyor mahsulotga aylantiramiz.</p>
          <div className="st-btns st-center st-rise">
            <a href="https://t.me/muslimansoriy" className="st-btn st-btn-filled">Bepul konsultatsiya</a>
            <a href="https://t.me/muslimansoriy" className="st-btn st-btn-ghost">Telegram</a>
          </div>
          <p className="st-note st-center st-rise">+998 99 116 46 58 · t.me/muslimansoriy · Toshkent</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="st-footer">
        <div className="st-wrap st-foot-in">
          <div className="st-foot-brand">
            <div className="st-logo">Empire</div>
            <p className="st-cb">AI, custom software va Odoo ERP — g'oyadan tayyor mahsulotgacha.</p>
          </div>
          <div className="st-foot-cols">
            <div><h4>Xizmatlar</h4><a href="#xizmatlar">Maxsus dasturiy ta'minot</a><a href="#xizmatlar">Odoo ERP & AI</a><a href="#narxlar">Narxlar</a></div>
            <div><h4>Kompaniya</h4><a href="#loyihalar">Loyihalar</a><a href="#jarayon">Jarayon</a><a href="#sharhlar">Sharhlar</a><a href="#">Blog</a></div>
            <div><h4>Aloqa</h4><a href="mailto:muslimansoriy7@gmail.com">muslimansoriy7@gmail.com</a><a href="tel:+998991164658">+998 99 116 46 58</a><a href="https://t.me/muslimansoriy">Telegram</a><a href="https://instagram.com/empiregroup.uz">Instagram</a></div>
          </div>
        </div>
        <div className="st-wrap st-foot-bot">
          <span>© 2026 Empire Group. Barcha huquqlar himoyalangan.</span>
          <span>Toshkent · O'zbekiston</span>
        </div>
      </footer>
    </div>
  );
}

const CSS_STR = `
.st{--ink:#17191c;--paper:#fff;--mist:#f2f2f3;--fog:#fafafb;--slate:#777b86;--ash:#979799;--smoke:#a3a6af;--peach:#fbe1d1;--sienna:#5d2a1a;--line:#ececec;
  --serif:'Source Serif 4',Georgia,'Times New Roman',serif;--sans:'Inter',ui-sans-serif,system-ui,sans-serif;
  background:var(--paper);color:var(--ink);font-family:var(--sans);-webkit-font-smoothing:antialiased;overflow-x:clip;}
.st *{box-sizing:border-box;}
.st img{display:block;max-width:100%;}
.st a{color:inherit;text-decoration:none;}
.st-wrap{max-width:1200px;margin:0 auto;padding:0 24px;}
.st-center{text-align:center;}

/* type */
.st-display{font-family:var(--serif);font-weight:400;font-size:clamp(44px,7vw,90px);line-height:1.08;letter-spacing:-0.025em;margin:0;}
.st-display em{font-style:italic;}
.st-h-lg{font-family:var(--serif);font-weight:400;font-size:clamp(34px,5vw,64px);line-height:1.15;letter-spacing:-0.015em;margin:0 0 16px;}
.st-h-lg em{font-style:italic;}
.st-h{font-family:var(--serif);font-weight:400;font-size:clamp(30px,4vw,44px);line-height:1.2;letter-spacing:-0.015em;margin:0 0 28px;}
.st-sub{font-size:18px;line-height:1.45;color:var(--slate);font-weight:430;margin:22px 0 30px;max-width:600px;}
.st-sub2{font-size:18px;line-height:1.5;color:var(--slate);font-weight:430;margin:0 0 40px;max-width:640px;}
.st-tag{font-size:14px;font-weight:450;color:var(--ash);letter-spacing:0.01em;}
.st-ct{font-family:var(--sans);font-size:22px;font-weight:500;letter-spacing:-0.01em;margin:14px 0 10px;}
.st-ct-sm{font-family:var(--sans);font-size:20px;font-weight:500;letter-spacing:-0.01em;margin:12px 0 8px;line-height:1.25;}
.st-cb{font-size:16px;line-height:1.5;color:var(--slate);font-weight:400;margin:0 0 16px;}
.st-mut{font-size:14px;color:var(--slate);}
.st-mut2{font-size:12px;color:var(--slate);}
.st-note{font-size:14px;color:var(--ash);margin-top:26px;}

/* nav */
.st-nav{position:sticky;top:0;z-index:40;background:rgba(255,255,255,.82);backdrop-filter:saturate(180%) blur(12px);}
.st-nav-in{display:flex;align-items:center;justify-content:space-between;height:72px;}
.st-logo{font-family:var(--serif);font-size:24px;font-weight:400;letter-spacing:-0.02em;}
.st-nav-links{display:flex;gap:26px;}
.st-nav-links a{font-size:16px;color:var(--ink);opacity:.82;}
.st-nav-links a:hover{opacity:1;}
.st-nav-cta{display:flex;align-items:center;gap:16px;}
.st-txtlink{font-size:16px;color:var(--ink);}
.st-txtlink:hover{text-decoration:underline;}

/* buttons */
.st .st-btn{display:inline-flex;align-items:center;justify-content:center;height:46px;padding:0 22px;border-radius:9999px;font-family:var(--sans);font-size:16px;font-weight:450;border:1px solid transparent;transition:transform .18s ease,background .18s ease,opacity .18s ease;white-space:nowrap;}
.st .st-btn-filled{background:var(--ink);color:#fff;}
.st .st-btn-filled:hover{transform:translateY(-1px);opacity:.9;}
.st .st-btn-ghost{background:transparent;color:var(--ink);border-color:var(--ink);}
.st .st-btn-ghost:hover{transform:translateY(-1px);background:var(--ink);color:#fff;}
.st .st-btn-white{background:#fff;color:var(--ink);}
.st .st-btn-white:hover{transform:translateY(-1px);opacity:.92;}
.st .st-btn-block{width:100%;margin-top:20px;}

/* sections */
.st-sec{padding:72px 0;}
.st-fog{background:var(--fog);}

/* hero */
.st-hero{padding:56px 0 40px;position:relative;}
.st-hero-in{position:relative;min-height:560px;display:flex;align-items:center;justify-content:center;}
.st-hero-txt{text-align:center;max-width:860px;position:relative;z-index:5;}
.st-hero-txt .st-sub{margin-left:auto;margin-right:auto;}
.st-btns{display:flex;gap:12px;flex-wrap:wrap;}
.st-hero-txt .st-btns{justify-content:center;}

/* floating artifacts */
.st-art{position:absolute;background:#fff;border-radius:20px;box-shadow:0 0 0 1px rgba(4,23,43,.05),0 20px 25px -5px rgba(0,0,0,.1),0 8px 10px -6px rgba(0,0,0,.1);z-index:3;}
.st-art-table{top:8px;left:0;width:236px;padding:14px 16px;}
.st-art-h{font-size:13px;font-weight:500;margin-bottom:8px;}
.st-art-row{display:flex;justify-content:space-between;gap:8px;font-size:13px;padding:6px 0;border-top:1px solid var(--line);}
.st-pos{color:var(--sienna);font-weight:500;}
.st-art-chart{bottom:24px;left:24px;width:238px;padding:14px 16px 8px;}
.st-art-h2{font-size:13px;font-weight:500;margin-bottom:8px;display:flex;justify-content:space-between;}
.st-delta{color:var(--slate);font-weight:400;}
.st-spark{width:100%;height:64px;}
.st-art-stat{top:40px;right:0;width:210px;padding:16px;display:flex;align-items:center;gap:12px;}
.st-ring{width:44px;height:44px;flex:0 0 auto;}
.st-stat-n{font-size:22px;font-weight:500;}
.st-art-ai{bottom:12px;right:16px;width:290px;padding:14px 14px 14px 16px;border:1px solid var(--line);box-shadow:0 0 0 1px rgba(4,23,43,.04),0 12px 20px -8px rgba(0,0,0,.1);display:flex;align-items:center;gap:10px;}
.st-ai-ic{color:var(--smoke);font-size:16px;}
.st-ai-ph{color:var(--smoke);font-size:15px;flex:1;}
.st-ai-send{width:36px;height:36px;border-radius:9999px;background:var(--ink);color:#fff;display:inline-flex;align-items:center;justify-content:center;font-size:16px;}
.st-av{width:40px;height:40px;border-radius:9999px;display:inline-flex;align-items:center;justify-content:center;font-size:14px;font-weight:500;color:#17403a;}
.st-av-a{position:absolute;top:150px;left:150px;background:#cdeede;z-index:4;}
.st-av-b{position:absolute;bottom:110px;right:150px;background:#cfe0f7;color:#1a3358;z-index:4;}
.st-av-a::after,.st-av-b::after{content:"";position:absolute;bottom:-4px;right:-4px;width:0;height:0;border-left:7px solid currentColor;border-top:7px solid transparent;transform:rotate(12deg);}

/* logos */
.st-logos{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:44px;margin-top:22px;}
.st-clogo{max-height:30px;width:auto;filter:grayscale(1);opacity:.55;transition:opacity .3s ease;}
.st-clogo:hover{opacity:1;}

/* cards */
.st-card{background:var(--mist);border-radius:24px;}
.st-card-lg{padding:36px 32px;}
.st-card-sm{padding:28px 24px;border-radius:20px;}
.st-grid2{display:grid;grid-template-columns:1fr 1fr;gap:24px;}
.st-grid3{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;}
.st-grid4{display:grid;grid-template-columns:repeat(4,1fr);gap:24px;margin-top:24px;}

/* peach */
.st-peach{background:var(--peach);color:var(--sienna);border-radius:24px;padding:52px 48px;max-width:960px;margin:0 auto;text-align:center;}
.st-peach-tag{font-size:14px;font-weight:500;opacity:.7;margin-bottom:20px;}
.st-peach-q{font-family:var(--serif);font-size:clamp(24px,3.2vw,34px);line-height:1.35;font-weight:400;margin:0 0 22px;}
.st-peach-at{font-size:15px;font-weight:450;}

/* stat card */
.st-stat-card{text-align:left;}
.st-stat-big{font-family:var(--serif);font-size:44px;font-weight:400;letter-spacing:-0.02em;margin-bottom:6px;}

/* case */
.st-case-img{border-radius:12px;overflow:hidden;background:#fff;border:1px solid var(--line);margin-bottom:16px;aspect-ratio:16/10;}
.st-case-img img{width:100%;height:100%;object-fit:cover;object-position:top;transition:transform .5s ease;}
.st-case:hover .st-case-img img{transform:scale(1.03);}

/* tags */
.st-tagrow{display:flex;flex-wrap:wrap;gap:6px;}
.st-minitag{font-size:12px;color:var(--slate);background:#fff;border:1px solid var(--line);border-radius:9999px;padding:3px 10px;}

/* logo chips */
.st-logogrid{display:flex;flex-wrap:wrap;gap:12px;margin-top:12px;}
.st-lchip{display:inline-flex;align-items:center;gap:10px;padding:12px 18px;border-radius:9999px;background:var(--mist);color:var(--slate);font-size:14px;font-weight:450;transition:color .2s ease;}
.st-lchip:hover{color:var(--ink);}
.st-lchip-plain{background:transparent;}

/* member / testimonial */
.st-mphoto{width:56px;height:56px;border-radius:12px;object-fit:cover;filter:grayscale(1);}
.st-av-inline{position:static;width:48px;height:48px;border-radius:12px;}
.st-av-0{background:#cdeede;color:#17403a;}
.st-av-1{background:#cfe0f7;color:#1a3358;}
.st-av-2{background:#f2e2cf;color:#5d2a1a;}
.st-tq{font-family:var(--serif);font-size:20px;line-height:1.4;font-weight:400;margin:0 0 20px;}
.st-testi-at{display:flex;align-items:center;gap:12px;}
.st-tn{font-size:15px;font-weight:500;}

/* pricing */
.st-toggle{display:inline-flex;gap:4px;background:var(--mist);border-radius:9999px;padding:4px;margin-bottom:32px;}
.st-toggle button{border:0;background:transparent;font-family:var(--sans);font-size:15px;font-weight:450;color:var(--slate);padding:9px 20px;border-radius:9999px;cursor:pointer;transition:all .2s ease;}
.st-toggle button.on{background:#fff;color:var(--ink);box-shadow:0 1px 3px rgba(0,0,0,.08);}
.st-price{padding:32px 28px;display:flex;flex-direction:column;}
.st-price-feat{background:var(--ink);color:#fff;}
.st-price-feat .st-tag,.st-price-feat .st-mut{color:#b9bcc4;}
.st-price-n{font-family:var(--serif);font-size:38px;font-weight:400;letter-spacing:-0.02em;margin:12px 0 2px;}
.st-price-list{list-style:none;padding:0;margin:20px 0 0;flex:1;}
.st-price-list li{font-size:15px;padding:8px 0;border-top:1px solid rgba(0,0,0,.07);color:inherit;}
.st-price-feat .st-price-list li{border-top-color:rgba(255,255,255,.12);}

/* cred */
.st-cred-img{background:#fff;border:1px solid var(--line);border-radius:12px;height:96px;display:flex;align-items:center;justify-content:center;padding:16px;margin-bottom:16px;}
.st-cred-img img{max-height:60px;width:auto;object-fit:contain;}
.st-cred-st{font-size:13px;font-weight:500;color:var(--slate);margin-top:10px;}
.st-cred-st.ok{color:var(--ink);}
.st-cred-st.ok::before{content:"● ";color:var(--sienna);}

/* faq */
.st-faq-wrap{max-width:820px;}
.st-faq-row{border-bottom:1px solid var(--line);}
.st-faq-q{width:100%;display:flex;align-items:center;justify-content:space-between;gap:16px;background:transparent;border:0;cursor:pointer;padding:26px 0;font-family:var(--serif);font-size:22px;font-weight:400;color:var(--ink);text-align:left;letter-spacing:-0.01em;}
.st-faq-ic{font-size:18px;color:var(--slate);transition:transform .3s ease;flex:0 0 auto;}
.st-faq-row.open .st-faq-ic{transform:rotate(180deg);}
.st-faq-a{max-height:0;overflow:hidden;transition:max-height .35s ease;}
.st-faq-row.open .st-faq-a{max-height:220px;}
.st-faq-a p{font-size:16px;line-height:1.6;color:var(--slate);margin:0 0 24px;max-width:680px;}

/* cta */
.st-cta{max-width:760px;margin:0 auto;}
.st-cta .st-sub2{margin-left:auto;margin-right:auto;}

/* footer */
.st-footer{border-top:1px solid var(--line);padding:64px 0 40px;}
.st-foot-in{display:flex;justify-content:space-between;gap:48px;flex-wrap:wrap;}
.st-foot-brand{max-width:300px;}
.st-foot-brand .st-cb{margin-top:14px;}
.st-foot-cols{display:flex;gap:64px;flex-wrap:wrap;}
.st-foot-cols h4{font-size:14px;font-weight:500;margin:0 0 14px;}
.st-foot-cols a{display:block;font-size:15px;color:var(--slate);padding:5px 0;}
.st-foot-cols a:hover{color:var(--ink);}
.st-foot-bot{display:flex;justify-content:space-between;gap:16px;flex-wrap:wrap;margin-top:48px;padding-top:24px;border-top:1px solid var(--line);font-size:13px;color:var(--ash);}

/* reveal */
.st .st-rise{opacity:1;transform:translateY(16px);transition:opacity .6s cubic-bezier(.16,1,.3,1),transform .6s cubic-bezier(.16,1,.3,1);}
.st .st-rise.in{transform:none;}

/* responsive */
@media(max-width:1000px){
  .st-grid4{grid-template-columns:repeat(2,1fr);}
  .st-grid3{grid-template-columns:1fr;}
  .st-nav-links{display:none;}
}
@media(max-width:820px){
  .st-grid2{grid-template-columns:1fr;}
  .st-hero-in{min-height:auto;flex-direction:column;}
  .st-art,.st-av{display:none;}
  .st-foot-in{flex-direction:column;}
  .st-foot-cols{gap:32px;}
}
@media(max-width:560px){
  .st-grid4{grid-template-columns:1fr;}
}
@media(prefers-reduced-motion:reduce){
  .st .st-rise{transition:none;transform:none;}
  .st-case:hover .st-case-img img{transform:none;}
}
`;
