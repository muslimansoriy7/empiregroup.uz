"use client";

import { useEffect, useState } from "react";

type CSS = React.CSSProperties;

const NAV = ["Xizmatlar", "Jarayon", "Loyihalar", "Sharhlar", "Narxlar", "Blog"];

const CLIENTS = ["Motor Lux", "MedFlow", "Grand Osiyo", "Texnika Ijara", "GadgetSpace", "X Wear"];

const SUITE = [
  { id: "soft", tab: "Maxsus DT", t: "Web, mobil va ichki tizimlar", b: "Ilova, admin panel, ichki tizim — biznesingizga aniq mos, noldan quriladi." },
  { id: "odoo", tab: "Odoo ERP & AI", t: "Yagona tizim, AI avtomatlashtirish", b: "Sotuv, ombor, moliya, HR — barchasi bitta tizimda, AI bilan kuchaytiriladi." },
  { id: "mobile", tab: "Mobil ilova", t: "iOS va Android bitta koddan", b: "Flutter — push, to'lov, oflayn rejim; mijoz cho'ntagida biznes." },
  { id: "ai", tab: "AI & Integratsiya", b: "Chat-bot, tahlil, va tashqi servislar (Telegram, 1C, to'lov) — barchasi ulanadi.", t: "AI agentlar va integratsiya" },
];

const STATS = [
  { n: "50+", l: "Yakunlangan loyiha" },
  { n: "30+", l: "Mamnun mijoz" },
  { n: "15+", l: "Texnologiya" },
  { n: "3+ yil", l: "Tajriba" },
];

const CASES = [
  { seg: "Avtomobil · CRM", title: "Motor Lux — CRM va savdo boshqaruvi", res: "Savdo va mijozlar bitta tizimda", img: "/cases/case-autoservice-desktop.webp", url: "motorlux.uz" },
  { seg: "Tibbiyot · CRM (PWA)", title: "MedFlow — klinika CRM va bemor qabuli", res: "Qabul boshqaruvi 3× tezlashdi", img: "/cases/case-medflow-desktop.webp", url: "medflow.uz" },
  { seg: "To'qimachilik · ERP", title: "Grand Osiyo Textile — ERP va ombor tizimi", res: "Ombor real vaqtda boshqariladi", img: "/cases/case-textile-desktop.webp", url: "grandosiyo.uz" },
  { seg: "Elektronika · E-commerce", title: "GadgetSpace — onlayn elektronika do'koni", res: "Konversiya 2.1× oshdi", img: "/cases/case-gadgetspace-desktop.webp", url: "gadgetspace.uz" },
];

const PROCESS = [
  { n: "01", t: "Explore", b: "G'oya va muammoni chuqur o'rganamiz." },
  { n: "02", t: "Plan", b: "PRD, TZ, arxitektura va dizayn; muddat aniq." },
  { n: "03", t: "Build", b: "Kod, test, integratsiya; sprintlar, demo." },
  { n: "04", t: "Commit", b: "Ishga tushirish va qo'llab-quvvatlash." },
];

const TEAM = [
  { n: "Muslim Ansoriy", r: "Ta'sischi va CEO", b: "7+ yil IT; Odoo ERP Partner Manager; 20+ ERP loyiha.", photo: "/founder.webp" },
  { n: "Abbos Jo'rayev", r: "Hammuassis va COO", b: "6+ yil IT loyiha boshqaruvi." },
  { n: "Sardor Rahmatullayev", r: "Senior Odoo Developer", b: "5 yil Python/Odoo; 30+ modul." },
  { n: "Dilnoza Yusupova", r: "Biznes-analitik", b: "4 yil biznes-tahlil; AS-IS/TO-BE." },
  { n: "Jasurbek Toshmatov", r: "Full-stack Developer", b: "5 yil web/mobil; React, Next.js." },
  { n: "Nilufar Karimova", r: "Digital Marketing Lead", b: "6 yil marketing; SEO, lead gen." },
  { n: "Bekzod Ergashev", r: "DevOps · SysAdmin", b: "4 yil infratuzilma; Docker, CI/CD." },
  { n: "Malika Sobirova", r: "UI/UX Designer", b: "4 yil interfeys dizayni; Figma." },
];

const TESTI = [
  { q: "Empire Group eski qog'ozdagi ishimizni to'liq tizimga o'tkazdi — vaqt ancha tejaldi.", n: "Aliya M.", r: "Motor Lux · CRM" },
  { q: "Empire bilan ishlash oson bo'ldi, muddat va byudjet aniq edi.", n: "Jasur T.", r: "GadgetSpace · E-commerce" },
  { q: "Klinika ishini AI qo'shib avtomatlashtirdi. Qabul ancha tartibli.", n: "Doniyor R.", r: "MedFlow · klinika" },
];

const PRICING: Record<string, { badge: string; price: string; term: string; feats: string[]; feat?: boolean }[]> = {
  soft: [
    { badge: "Standard", price: "$5,000 dan", term: "2–3 oy", feats: ["Landing yoki MVP", "Forma va integratsiya", "Asosiy admin panel"] },
    { badge: "Advanced", price: "$15K–$40K", term: "4–6 oy", feats: ["To'liq ilova", "CRM integratsiya", "Admin panel, API"], feat: true },
    { badge: "Mega", price: "$50,000+", term: "6–12 oy", feats: ["Yirik ekotizim", "Mikroxizmatlar", "Maxsus SLA"] },
  ],
  odoo: [
    { badge: "Standard", price: "$8,800 dan", term: "2–3 oy", feats: ["Standart modullar", "Migratsiya", "O'qitish"] },
    { badge: "Advanced", price: "$25K–$35K", term: "4–6 oy", feats: ["Maxsus modullar", "AI chat-bot", "Avtomatlashtirish"], feat: true },
    { badge: "Mega", price: "$85,000+", term: "~1 yil", feats: ["To'liq transformatsiya", "Predictive analytics", "Chuqur AI"] },
  ],
};

const CREDS = [
  { name: "Odoo Learning Partner", iss: "Odoo S.A.", img: "/sertifikat/odoo-learning-partner.svg", ok: true },
  { name: "Davlat guvohnomasi", iss: "“EMPIRE GROUP CORP” MCHJ", img: "/sertifikat/davlat-royxat-guvohnomasi.png", ok: true },
  { name: "IT Park rezidenti", iss: "IT Park O'zbekiston", img: "/sertifikat/it-park.svg", ok: false },
  { name: "ISO/IEC 27001", iss: "Axborot xavfsizligi", img: "/sertifikat/iso-27001.svg", ok: false },
];

const FAQ = [
  { q: "Loyiha qancha vaqt oladi?", a: "Kichik MVP 3–4 hafta, o'rtacha 2–3 oy, yirik 4–6 oy. Aniq muddat Explore bosqichida." },
  { q: "Narx qanday hisoblanadi?", a: "Fixed-scope: loyiha hajmi aniqlangach aniq narx. Yashirin xarajat yo'q. Paketlar $5,000 dan." },
  { q: "Ishlab bo'lgach yordam beramizmi?", a: "Ha, qo'llab-quvvatlash, tuzatish va rivojlantirish davom etadi." },
  { q: "To'lov qanday?", a: "Bosqichma-bosqich: oldindan qism, keyin sprint natijalariga qarab." },
  { q: "Kod kimga tegishli?", a: "Barchasi sizga. Vendor lock-in yo'q." },
  { q: "Konsultatsiya bepulmi?", a: "Ha. Explore bosqichida barcha savolga javob beramiz — majburiyatsiz." },
];

export default function V9() {
  const [tab, setTab] = useState("soft");
  const [track, setTrack] = useState<"soft" | "odoo">("soft");
  const [open, setOpen] = useState(0);
  const [banner, setBanner] = useState(true);

  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".sh .sh-rise"));
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: 0, rootMargin: "0px 0px -6% 0px" });
    els.forEach((el) => io.observe(el));
    const raf = requestAnimationFrame(() => els.forEach((el) => { if (el.getBoundingClientRect().top < window.innerHeight * 0.92) el.classList.add("in"); }));
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, []);

  const suite = SUITE.find((s) => s.id === tab)!;

  return (
    <div className="sh">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400..700&display=swap" />
      <style dangerouslySetInnerHTML={{ __html: CSS_STR }} />

      {banner && (
        <div className="sh-banner">
          <span>✦ Yangi — Odoo ERP + AI joriy qilish · 2–3 oyda</span>
          <a href="#cta" className="sh-banner-link">Batafsil →</a>
          <button className="sh-banner-x" onClick={() => setBanner(false)} aria-label="Yopish">×</button>
        </div>
      )}

      {/* NAV */}
      <header className="sh-nav">
        <div className="sh-wrap sh-nav-in">
          <a href="#" className="sh-logo">Empire</a>
          <nav className="sh-nav-links">{NAV.map((n) => <a key={n} href="#">{n}</a>)}</nav>
          <div className="sh-nav-cta">
            <a href="#" className="sh-ghost">Kirish</a>
            <a href="#cta" className="sh-lilac">Bepul konsultatsiya</a>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="sh-hero">
        <div className="sh-hero-bg" aria-hidden="true" />
        <div className="sh-float sh-float-l sh-rise" aria-hidden="true">
          <div className="sh-fl-row"><span className="sh-dot" /> <b>Motor Lux</b> · CRM</div>
          <div className="sh-fl-mut">Savdo va mijozlar bitta tizimda</div>
          <div className="sh-fl-bar"><i style={{ width: "78%" } as CSS} /></div>
        </div>
        <div className="sh-float sh-float-r sh-rise" aria-hidden="true">
          <div className="sh-fl-av"><span>MA</span><span>AJ</span><span>SR</span></div>
          <div className="sh-fl-mut">8 kishilik jamoa · Toshkent</div>
          <div className="sh-fl-tag">Deploy · 2–3 oy</div>
        </div>
        <div className="sh-wrap sh-hero-in">
          <div className="sh-eyebrow sh-rise">AI &amp; Custom Software Development</div>
          <h1 className="sh-display sh-rise">Biznesni raqamlashtiramiz —<br />g'oyadan tayyor mahsulotgacha.</h1>
          <p className="sh-lead sh-rise">Murakkab ichki jarayonlarni ERP, AI, Web va App yechimlari orqali raqamlashtiramiz. Atigi 2–3 oyda.</p>
          <div className="sh-rise"><a href="#cta" className="sh-wine">Loyihani boshlash →</a></div>
        </div>
      </section>

      {/* LOGO STRIP */}
      <section className="sh-strip">
        <div className="sh-wrap">
          <div className="sh-strip-cap sh-rise">Bizga ishonishadi</div>
          <div className="sh-strip-row sh-rise">{CLIENTS.map((c) => <div className="sh-lcell" key={c}>{c}</div>)}</div>
        </div>
      </section>

      {/* SUITE */}
      <section className="sh-sec" id="xizmatlar">
        <div className="sh-wrap">
          <h2 className="sh-h2 sh-rise">Sizning Empire suite'ingiz.</h2>
          <p className="sh-sub sh-rise">Har bir yo'nalish — bir xil sifat va shaffof jarayon bilan quriladi.</p>
          <div className="sh-tabs sh-rise">
            {SUITE.map((s) => <button key={s.id} className={`sh-tab ${tab === s.id ? "on" : ""}`} onClick={() => setTab(s.id)}>{s.tab}</button>)}
          </div>
          <div className="sh-suite-card sh-rise">
            <div className="sh-suite-ic">◆</div>
            <div>
              <h3 className="sh-h3">{suite.t}</h3>
              <p className="sh-body">{suite.b}</p>
              <a href="#cta" className="sh-vlink">Batafsil →</a>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="sh-sec sh-tight">
        <div className="sh-wrap sh-grid4">
          {STATS.map((s) => (
            <div className="sh-card sh-stat sh-rise" key={s.l}><div className="sh-stat-n">{s.n}</div><div className="sh-mut">{s.l}</div></div>
          ))}
        </div>
      </section>

      {/* PORTFOLIO */}
      <section className="sh-sec" id="loyihalar">
        <div className="sh-wrap">
          <h2 className="sh-h2 sh-rise">So'nggi ishlarimiz.</h2>
          <p className="sh-sub sh-rise">Real, ishga tushirilgan loyihalar — har biri yechilgan muammo.</p>
          <div className="sh-grid2">
            {CASES.map((c, i) => (
              <div className="sh-card sh-case sh-rise" key={c.title} style={{ transitionDelay: `${(i % 2) * 60}ms` } as CSS}>
                <div className="sh-case-img"><img src={c.img} alt={c.title} loading="lazy" /></div>
                <div className="sh-seg">{c.seg}</div>
                <h3 className="sh-h3">{c.title}</h3>
                <p className="sh-body">{c.res}</p>
                <a href={`https://${c.url}`} target="_blank" rel="noopener noreferrer" className="sh-vlink">{c.url} →</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DARK TEAL BAND */}
      <section className="sh-dark" id="jarayon">
        <div className="sh-wrap sh-dark-in">
          <div className="sh-dark-art" aria-hidden="true">
            <span className="sh-geo g1" /><span className="sh-geo g2" /><span className="sh-geo g3" />
            <span className="sh-script">g'oyadan mahsulotgacha</span>
          </div>
          <div className="sh-dark-txt">
            <h2 className="sh-display sh-display-w sh-rise">G'oyadan mahsulotgacha — 4 bosqich.</h2>
            <div className="sh-steps sh-rise">
              {PROCESS.map((p) => (
                <div className="sh-step" key={p.n}><span className="sh-step-n">{p.n}</span><div><b>{p.t}</b><p>{p.b}</p></div></div>
              ))}
            </div>
            <a href="#cta" className="sh-wout sh-rise">Loyihani boshlash →</a>
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="sh-sec">
        <div className="sh-wrap">
          <h2 className="sh-h2 sh-rise">Ortida — real jamoa.</h2>
          <div className="sh-grid4">
            {TEAM.map((m, i) => (
              <div className="sh-card sh-member sh-rise" key={m.n} style={{ transitionDelay: `${(i % 4) * 50}ms` } as CSS}>
                {m.photo ? <img src={m.photo} alt={m.n} loading="lazy" className="sh-mphoto" /> : <span className="sh-mono">{m.n.split(" ").map((w) => w[0]).join("").slice(0, 2)}</span>}
                <h3 className="sh-h3 sh-h3-sm">{m.n}</h3>
                <div className="sh-seg">{m.r}</div>
                <p className="sh-body">{m.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="sh-sec sh-tight" id="sharhlar">
        <div className="sh-wrap">
          <h2 className="sh-h2 sh-rise">Mijozlarimiz nima deydi.</h2>
          <div className="sh-grid3">
            {TESTI.map((t, i) => (
              <div className="sh-card sh-rise" key={t.n} style={{ transitionDelay: `${i * 60}ms` } as CSS}>
                <p className="sh-quote">“{t.q}”</p>
                <div className="sh-qat"><span className="sh-mono sh-mono-sm">{t.n.split(" ").map((w) => w[0]).join("").slice(0, 2)}</span><div><div className="sh-qn">{t.n}</div><div className="sh-seg">{t.r}</div></div></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="sh-sec" id="narxlar">
        <div className="sh-wrap">
          <h2 className="sh-h2 sh-rise">Shaffof narxlar.</h2>
          <div className="sh-tabs sh-rise">
            <button className={`sh-tab ${track === "soft" ? "on" : ""}`} onClick={() => setTrack("soft")}>Maxsus dasturiy ta'minot</button>
            <button className={`sh-tab ${track === "odoo" ? "on" : ""}`} onClick={() => setTrack("odoo")}>Odoo ERP &amp; AI</button>
          </div>
          <div className="sh-grid3">
            {PRICING[track].map((p, i) => (
              <div className={`sh-card sh-price sh-rise ${p.feat ? "sh-price-feat" : ""}`} key={p.badge} style={{ transitionDelay: `${i * 60}ms` } as CSS}>
                <div className="sh-seg">{p.badge}</div>
                <div className="sh-price-n">{p.price}</div>
                <div className="sh-mut sh-mut-sm">{p.term}</div>
                <ul className="sh-price-list">{p.feats.map((f) => <li key={f}>{f}</li>)}</ul>
                <a href="#cta" className={p.feat ? "sh-wine sh-block" : "sh-lilac sh-block"}>Konsultatsiya</a>
              </div>
            ))}
          </div>
          <p className="sh-mut sh-mut-sm sh-note">Fixed-scope · yashirin to'lov yo'q · 4 hafta qo'llab-quvvatlash</p>
        </div>
      </section>

      {/* CREDENTIALS */}
      <section className="sh-sec sh-tight">
        <div className="sh-wrap">
          <h2 className="sh-h2 sh-rise">Rasmiy maqom va sertifikatlar.</h2>
          <div className="sh-grid4">
            {CREDS.map((c, i) => (
              <div className="sh-card sh-cred sh-rise" key={c.name} style={{ transitionDelay: `${i * 50}ms` } as CSS}>
                <div className="sh-cred-img"><img src={c.img} alt={c.name} loading="lazy" /></div>
                <h3 className="sh-h3 sh-h3-sm">{c.name}</h3>
                <div className="sh-seg">{c.iss}</div>
                <div className={`sh-status ${c.ok ? "ok" : ""}`}>{c.ok ? "Tasdiqlangan" : "Kutilmoqda"}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="sh-sec">
        <div className="sh-wrap sh-faq-wrap">
          <h2 className="sh-h2 sh-rise">Ko'p so'raladigan savollar.</h2>
          <div className="sh-faq sh-rise">
            {FAQ.map((f, i) => (
              <div className={`sh-faq-row ${open === i ? "open" : ""}`} key={f.q}>
                <button className="sh-faq-q" aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)}><span>{f.q}</span><span className="sh-faq-ic">+</span></button>
                <div className="sh-faq-a"><p>{f.a}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GRADIENT CTA BAND */}
      <section className="sh-grad" id="cta">
        <div className="sh-grad-bg" aria-hidden="true" />
        <div className="sh-wrap sh-grad-in">
          <h2 className="sh-heading-lg sh-rise">Loyihangizni bugun boshlaymiz.</h2>
          <div className="sh-rise"><a href="https://t.me/muslimansoriy" className="sh-wine">Bepul konsultatsiya →</a></div>
        </div>
        <p className="sh-wrap sh-grad-note sh-rise">+998 99 116 46 58 · t.me/muslimansoriy · Toshkent</p>
      </section>

      {/* FOOTER */}
      <footer className="sh-footer">
        <div className="sh-wrap sh-foot-in">
          <div className="sh-foot-brand"><div className="sh-logo sh-logo-w">Empire</div><p>AI, custom software va Odoo ERP — g'oyadan tayyor mahsulotgacha.</p></div>
          <div className="sh-foot-cols">
            <div><h4>Xizmatlar</h4><a href="#xizmatlar">Maxsus dasturiy ta'minot</a><a href="#xizmatlar">Odoo ERP &amp; AI</a><a href="#narxlar">Narxlar</a></div>
            <div><h4>Kompaniya</h4><a href="#loyihalar">Loyihalar</a><a href="#jarayon">Jarayon</a><a href="#sharhlar">Sharhlar</a></div>
            <div><h4>Aloqa</h4><a href="mailto:muslimansoriy7@gmail.com">muslimansoriy7@gmail.com</a><a href="tel:+998991164658">+998 99 116 46 58</a><a href="https://t.me/muslimansoriy">Telegram</a></div>
          </div>
        </div>
        <div className="sh-wrap sh-foot-bot"><span>© 2026 Empire Group. Barcha huquqlar himoyalangan.</span><span>Toshkent · O'zbekiston</span></div>
      </footer>
    </div>
  );
}

const CSS_STR = `
.sh{--wine:#421d24;--violet:#714cb6;--lilac:#d4c7ff;--lagoon:#0c4243;--parch:#f2f0eb;--mist:#e3e3e2;--ink:#292827;--stone:#666;--white:#fff;
  --sans:'Inter',ui-sans-serif,system-ui,sans-serif;
  background:var(--parch);color:var(--ink);font-family:var(--sans);-webkit-font-smoothing:antialiased;overflow-x:clip;}
.sh *{box-sizing:border-box;}
.sh img{display:block;max-width:100%;}
.sh a{color:inherit;text-decoration:none;}
.sh-wrap{max-width:1200px;margin:0 auto;padding:0 24px;}

/* type */
.sh-display{font-family:var(--sans);font-weight:460;font-size:clamp(36px,5.6vw,64px);line-height:1.02;letter-spacing:-0.028em;margin:0;}
.sh-display-w{color:var(--white);}
.sh-heading-lg{font-weight:460;font-size:clamp(30px,4.4vw,49px);line-height:1.1;letter-spacing:-0.027em;margin:0;}
.sh-h2{font-weight:460;font-size:clamp(28px,3.6vw,40px);line-height:1.05;letter-spacing:-0.02em;margin:0 0 12px;}
.sh-h3{font-weight:540;font-size:19px;line-height:1.25;margin:0 0 8px;}
.sh-h3-sm{font-size:17px;}
.sh-lead{font-size:19px;line-height:1.5;color:var(--ink);max-width:560px;margin:22px 0 30px;}
.sh-sub{font-size:16px;line-height:1.5;color:var(--stone);max-width:600px;margin:0 0 32px;}
.sh-body{font-size:15px;line-height:1.5;color:var(--stone);margin:0;}
.sh-mut{font-size:14px;color:var(--stone);}
.sh-mut-sm{font-size:13px;}
.sh-seg{font-size:13px;color:var(--stone);margin:2px 0 6px;}
.sh-note{margin-top:24px;text-align:center;}
.sh-vlink{color:var(--violet);font-size:15px;font-weight:500;display:inline-block;margin-top:12px;}
.sh-vlink:hover{text-decoration:underline;}

/* banner */
.sh-banner{background:var(--wine);color:var(--white);display:flex;align-items:center;justify-content:center;gap:14px;padding:11px 16px;font-size:14px;flex-wrap:wrap;position:relative;}
.sh-banner-link{border:1px solid rgba(255,255,255,.35);border-radius:999px;padding:2px 12px;font-size:13px;}
.sh-banner-x{position:absolute;right:14px;background:none;border:0;color:var(--white);font-size:18px;cursor:pointer;line-height:1;}

/* nav */
.sh-nav{position:sticky;top:0;z-index:40;background:rgba(242,240,235,.7);backdrop-filter:blur(12px);border-bottom:1px solid transparent;transition:border-color .3s ease;}
.sh-nav-in{display:flex;align-items:center;justify-content:space-between;height:64px;}
.sh-logo{font-weight:600;font-size:20px;letter-spacing:-0.02em;}
.sh-nav-links{display:flex;gap:28px;}
.sh-nav-links a{font-size:16px;font-weight:460;color:var(--ink);}
.sh-nav-links a:hover{text-decoration:underline;}
.sh-nav-cta{display:flex;align-items:center;gap:14px;}
.sh-ghost{font-size:16px;font-weight:460;color:var(--ink);}
.sh .sh-lilac{display:inline-flex;align-items:center;height:38px;padding:0 16px;background:var(--lilac);color:var(--ink);border:1px solid var(--ink);border-radius:8px;font-size:15px;font-weight:500;transition:opacity .2s ease;}
.sh .sh-lilac:hover{opacity:.86;}
.sh .sh-wine{display:inline-flex;align-items:center;height:48px;padding:0 22px;background:var(--wine);color:var(--white);border-radius:16px;font-size:16px;font-weight:460;transition:transform .2s ease,opacity .2s ease;}
.sh .sh-wine:hover{transform:translateY(-1px);opacity:.92;}
.sh .sh-block{width:100%;justify-content:center;margin-top:20px;}

/* hero */
.sh-hero{position:relative;padding:96px 0 120px;overflow:hidden;text-align:center;}
.sh-hero-bg{position:absolute;inset:0;z-index:0;
  background:
    radial-gradient(60% 60% at 50% 8%,rgba(245,201,138,.55),transparent 70%),
    radial-gradient(50% 50% at 18% 60%,rgba(232,160,122,.4),transparent 70%),
    radial-gradient(50% 50% at 84% 50%,rgba(212,199,255,.5),transparent 72%),
    linear-gradient(180deg,#f7ecdd,var(--parch));}
.sh-hero-in{position:relative;z-index:5;}
.sh-eyebrow{font-size:14px;font-weight:540;color:var(--violet);margin-bottom:18px;}
.sh-display,.sh-lead{margin-left:auto;margin-right:auto;}
.sh-lead{color:var(--stone);}
.sh-float{position:absolute;z-index:4;background:rgba(255,255,255,.82);border:1px solid rgba(255,255,255,.5);border-radius:16px;padding:16px;width:230px;backdrop-filter:blur(6px);text-align:left;font-size:13px;}
.sh-float-l{top:150px;left:calc(50% - 560px);}
.sh-float-r{top:250px;right:calc(50% - 560px);}
.sh-fl-row{font-size:14px;}.sh-fl-row b{font-weight:600;}
.sh-dot{display:inline-block;width:8px;height:8px;border-radius:9999px;background:var(--wine);}
.sh-fl-mut{color:var(--stone);margin:6px 0 10px;}
.sh-fl-bar{height:6px;border-radius:999px;background:var(--mist);overflow:hidden;}
.sh-fl-bar i{display:block;height:100%;background:var(--wine);}
.sh-fl-av{display:flex;margin-bottom:8px;}
.sh-fl-av span{width:28px;height:28px;border-radius:9999px;background:var(--lilac);border:2px solid #fff;display:inline-flex;align-items:center;justify-content:center;font-size:10px;font-weight:600;margin-left:-6px;}
.sh-fl-av span:first-child{margin-left:0;}
.sh-fl-tag{margin-top:8px;display:inline-block;background:var(--parch);border-radius:999px;padding:3px 10px;font-size:12px;}

/* logo strip */
.sh-strip{background:var(--white);border-top:1px solid var(--mist);border-bottom:1px solid var(--mist);}
.sh-strip-cap{text-align:center;font-size:13px;color:var(--stone);padding-top:28px;}
.sh-strip-row{display:grid;grid-template-columns:repeat(6,1fr);}
.sh-lcell{text-align:center;padding:24px 8px;color:var(--ink);font-weight:540;font-size:15px;border-right:1px solid var(--mist);}
.sh-lcell:last-child{border-right:0;}

/* sections */
.sh-sec{padding:80px 0;}
.sh-tight{padding:48px 0;}

/* tabs */
.sh-tabs{display:inline-flex;gap:4px;background:var(--white);border:1px solid var(--mist);border-radius:8px;padding:4px;margin:20px 0 24px;flex-wrap:wrap;}
.sh-tab{border:0;background:transparent;font-family:var(--sans);font-size:15px;font-weight:500;color:var(--ink);padding:9px 16px;border-radius:8px;cursor:pointer;transition:background .2s ease;}
.sh-tab.on{background:var(--lilac);}
.sh-suite-card{background:var(--white);border:1px solid var(--mist);border-radius:16px;padding:32px;display:flex;gap:20px;align-items:flex-start;}
.sh-suite-ic{width:44px;height:44px;border-radius:12px;background:var(--lilac);color:var(--wine);display:flex;align-items:center;justify-content:center;font-size:20px;flex:0 0 auto;}

/* cards */
.sh-card{background:var(--white);border:1px solid var(--mist);border-radius:16px;padding:20px;transition:transform .2s ease;}
.sh-card:hover{transform:translateY(-2px);}
.sh-grid2{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-top:32px;}
.sh-grid3{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:24px;}
.sh-grid4{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;}

.sh-stat{text-align:left;}
.sh-stat-n{font-weight:460;font-size:40px;letter-spacing:-0.02em;line-height:1;margin-bottom:6px;}

.sh-case-img{border:1px solid var(--mist);border-radius:12px;overflow:hidden;background:#fff;aspect-ratio:16/10;margin-bottom:14px;}
.sh-case-img img{width:100%;height:100%;object-fit:cover;object-position:top;transition:transform .5s ease;}
.sh-case:hover .sh-case-img img{transform:scale(1.03);}

.sh-mphoto{width:52px;height:52px;border-radius:12px;object-fit:cover;margin-bottom:10px;}
.sh-mono{display:inline-flex;align-items:center;justify-content:center;width:44px;height:44px;border-radius:12px;background:var(--lilac);color:var(--wine);font-weight:600;font-size:15px;margin-bottom:10px;}
.sh-mono-sm{width:40px;height:40px;font-size:13px;margin:0;}
.sh-quote{font-size:17px;line-height:1.5;color:var(--ink);margin:0 0 18px;}
.sh-qat{display:flex;align-items:center;gap:12px;}
.sh-qn{font-weight:600;font-size:14px;}

/* dark band */
.sh-dark{background:var(--lagoon);color:var(--white);padding:80px 0;}
.sh-dark-in{display:grid;grid-template-columns:0.9fr 1.1fr;gap:56px;align-items:center;}
.sh-dark-art{position:relative;height:280px;}
.sh-geo{position:absolute;border-radius:12px;opacity:.5;}
.sh-geo.g1{width:150px;height:110px;background:var(--lilac);top:20px;left:10px;transform:rotate(-8deg);}
.sh-geo.g2{width:130px;height:130px;background:#6ea8c4;top:80px;left:110px;transform:rotate(6deg);opacity:.42;}
.sh-geo.g3{width:120px;height:90px;background:#e88fb0;top:150px;left:30px;transform:rotate(-4deg);opacity:.4;}
.sh-script{position:absolute;bottom:6px;right:10px;font-style:italic;font-size:22px;color:rgba(255,255,255,.85);}
.sh-steps{margin:26px 0 30px;display:flex;flex-direction:column;gap:16px;}
.sh-step{display:flex;gap:14px;}
.sh-step-n{font-size:13px;color:rgba(255,255,255,.55);padding-top:3px;flex:0 0 auto;}
.sh-step b{font-weight:540;font-size:17px;}
.sh-step p{font-size:14px;color:rgba(255,255,255,.7);margin:2px 0 0;}
.sh .sh-wout{display:inline-flex;align-items:center;height:44px;padding:0 20px;border:1px solid rgba(255,255,255,.6);border-radius:8px;color:var(--white);font-size:15px;font-weight:460;transition:background .2s ease;}
.sh .sh-wout:hover{background:rgba(255,255,255,.1);}

/* pricing */
.sh-price{display:flex;flex-direction:column;}
.sh-price-feat{border-color:var(--wine);box-shadow:inset 0 0 0 1px var(--wine);}
.sh-price-n{font-weight:460;font-size:34px;letter-spacing:-0.02em;margin:8px 0 2px;}
.sh-price-list{list-style:none;padding:0;margin:18px 0 0;flex:1;}
.sh-price-list li{font-size:14px;color:var(--ink);padding:7px 0;border-top:1px solid var(--mist);padding-left:20px;position:relative;}
.sh-price-list li::before{content:"✓";position:absolute;left:0;color:var(--violet);}

/* cred */
.sh-cred-img{background:var(--parch);border:1px solid var(--mist);border-radius:12px;height:82px;display:flex;align-items:center;justify-content:center;padding:14px;margin-bottom:12px;}
.sh-cred-img img{max-height:52px;width:auto;object-fit:contain;}
.sh-status{font-size:12px;color:var(--stone);margin-top:8px;}
.sh-status.ok{color:var(--violet);font-weight:500;}
.sh-status.ok::before{content:"● ";}

/* faq */
.sh-faq-wrap{max-width:800px;}
.sh-faq{margin-top:24px;border-top:1px solid var(--mist);}
.sh-faq-row{border-bottom:1px solid var(--mist);}
.sh-faq-q{width:100%;display:flex;align-items:center;justify-content:space-between;gap:16px;background:transparent;border:0;cursor:pointer;padding:22px 0;font-family:var(--sans);font-size:19px;font-weight:540;color:var(--ink);text-align:left;}
.sh-faq-ic{font-size:22px;color:var(--stone);transition:transform .3s ease;}
.sh-faq-row.open .sh-faq-ic{transform:rotate(45deg);}
.sh-faq-a{max-height:0;overflow:hidden;transition:max-height .35s ease;}
.sh-faq-row.open .sh-faq-a{max-height:200px;}
.sh-faq-a p{font-size:15px;line-height:1.6;color:var(--stone);margin:0 0 22px;}

/* gradient band */
.sh-grad{position:relative;padding:96px 0 60px;overflow:hidden;}
.sh-grad-bg{position:absolute;inset:0;z-index:0;filter:blur(10px);opacity:.6;
  background:
    radial-gradient(30% 50% at 68% 50%,var(--lilac),transparent 70%),
    radial-gradient(30% 50% at 93% 50%,#a7c4f0,transparent 70%),
    radial-gradient(40% 40% at 50% 98%,#f3b0cd,transparent 70%),
    radial-gradient(40% 40% at 50% 75%,#a9e6de,transparent 70%);}
.sh-grad-in{position:relative;z-index:5;display:flex;align-items:center;justify-content:space-between;gap:32px;flex-wrap:wrap;}
.sh-grad-note{position:relative;z-index:5;margin-top:36px;color:var(--stone);font-size:14px;}

/* footer */
.sh-footer{background:var(--wine);color:var(--white);padding:64px 0 40px;}
.sh-foot-in{display:flex;justify-content:space-between;gap:48px;flex-wrap:wrap;}
.sh-foot-brand{max-width:300px;}
.sh-logo-w{color:var(--white);}
.sh-foot-brand p{color:rgba(255,255,255,.7);font-size:15px;margin-top:12px;line-height:1.5;}
.sh-foot-cols{display:flex;gap:56px;flex-wrap:wrap;}
.sh-foot-cols h4{font-size:14px;font-weight:700;margin:0 0 14px;}
.sh-foot-cols a{display:block;font-size:14px;color:rgba(255,255,255,.7);padding:6px 0;}
.sh-foot-cols a:hover{color:#fff;}
.sh-foot-bot{display:flex;justify-content:space-between;gap:16px;flex-wrap:wrap;margin-top:48px;padding-top:24px;border-top:1px solid rgba(255,255,255,.15);font-size:13px;color:rgba(255,255,255,.6);}

/* reveal */
.sh .sh-rise{opacity:1;transform:translateY(16px);transition:opacity .6s cubic-bezier(.16,1,.3,1),transform .6s cubic-bezier(.16,1,.3,1);}
.sh .sh-rise.in{transform:none;}

/* responsive */
@media(max-width:1180px){.sh-float{display:none;}}
@media(max-width:1000px){.sh-grid4{grid-template-columns:repeat(2,1fr);}.sh-grid3{grid-template-columns:1fr;}.sh-nav-links{display:none;}.sh-dark-in{grid-template-columns:1fr;}.sh-dark-art{height:200px;}}
@media(max-width:820px){.sh-grid2{grid-template-columns:1fr;}.sh-strip-row{grid-template-columns:repeat(3,1fr);}.sh-lcell:nth-child(3n){border-right:0;}.sh-foot-in{flex-direction:column;}}
@media(max-width:560px){.sh-grid4{grid-template-columns:1fr;}}
@media(prefers-reduced-motion:reduce){.sh .sh-rise{transition:none;transform:none;}.sh-case:hover .sh-case-img img{transform:none;}}
`;
