"use client";

import { useEffect, useState } from "react";
import { toolLogos, brandLogos } from "@/content/logos";

type CSS = React.CSSProperties;

const NAV = ["Xizmatlar", "Jarayon", "Loyihalar", "Sharhlar", "Narxlar", "Blog"];

const CLIENTS = ["Motor Lux", "MedFlow", "Grand Osiyo", "Texnika Ijara", "GadgetSpace", "X Wear", "Hilol Market"];

const FEATURES = [
  { id: "EMP-101", tag: "PRODUCT", tagc: "iris", t: "Maxsus dasturiy ta'minot", b: "Web/mobil ilova, ichki tizim va admin panel — biznesingizga aniq mos, noldan quriladi. Tayyor shablon emas, o'ziga xos jarayonga aniq yechim.", img: "/cases/case-autoservice-desktop.webp", chips: ["React", "Node.js", "Flutter", "Docker"] },
  { id: "EMP-102", tag: "PLATFORM", tagc: "lav", t: "Odoo ERP & AI joriy qilish", b: "Sotuv, ombor, moliya va HR — barchasi bitta tizimda. Ustiga AI avtomatlashtirish qo'shib, takrorlanuvchi mexanik ishlardan jamoangizni xalos qilamiz.", img: "/cases/case-textile-desktop.webp", chips: ["Odoo ERP", "AI", "Analytics"] },
];

const STATS = [
  { n: "50+", l: "Yakunlangan loyiha" },
  { n: "30+", l: "Mamnun mijoz" },
  { n: "15+", l: "Texnologiya" },
  { n: "3+ yil", l: "Tajriba" },
];

const CASES = [
  { seg: "Avtomobil · CRM", title: "Motor Lux — CRM", res: "Savdo bitta tizimda", img: "/cases/case-autoservice-desktop.webp", url: "motorlux.uz", id: "EMP-2703" },
  { seg: "Tibbiyot · CRM", title: "MedFlow — klinika CRM", res: "Qabul 3× tezlashdi", img: "/cases/case-medflow-desktop.webp", url: "medflow.uz", id: "EMP-2701" },
  { seg: "To'qimachilik · ERP", title: "Grand Osiyo — ERP", res: "Ombor real vaqtda", img: "/cases/case-textile-desktop.webp", url: "grandosiyo.uz", id: "EMP-2698" },
  { seg: "Elektronika · E-com", title: "GadgetSpace — do'kon", res: "Konversiya 2.1× oshdi", img: "/cases/case-gadgetspace-desktop.webp", url: "gadgetspace.uz", id: "EMP-2690" },
  { seg: "Moda · E-com", title: "X Wear — do'kon", res: "O'rtacha chek +28%", img: "/cases/case-xwear-desktop.webp", url: "xwear.uz", id: "EMP-2685" },
  { seg: "Savdo · POS", title: "Hilol Market — POS", res: "Hisob-kitob 2× tez", img: "/cases/case-kassa-desktop.webp", url: "hilolmarket.uz", id: "EMP-2680" },
];

const PROCESS = [
  { n: "01", t: "Explore", b: "G'oya va muammoni chuqur o'rganamiz.", k: "⌘E" },
  { n: "02", t: "Plan", b: "PRD, TZ, arxitektura va dizayn; muddat aniq.", k: "⌘P" },
  { n: "03", t: "Build", b: "Kod, test, integratsiya; sprintlar, demo.", k: "⌘B" },
  { n: "04", t: "Commit", b: "Ishga tushirish va qo'llab-quvvatlash.", k: "⌘C" },
];

const TEAM = [
  { n: "Muslim Ansoriy", r: "Ta'sischi va CEO", photo: "/founder.webp" },
  { n: "Abbos Jo'rayev", r: "Hammuassis · COO" },
  { n: "Sardor Rahmatullayev", r: "Senior Odoo Dev" },
  { n: "Dilnoza Yusupova", r: "Biznes-analitik" },
  { n: "Jasurbek Toshmatov", r: "Full-stack Dev" },
  { n: "Nilufar Karimova", r: "Marketing Lead" },
  { n: "Bekzod Ergashev", r: "DevOps · SysAdmin" },
  { n: "Malika Sobirova", r: "UI/UX Designer" },
];

const TESTI = [
  { q: "Empire Group eski qog'ozdagi ishimizni to'liq tizimga o'tkazdi — vaqt ancha tejaldi.", n: "Aliya M.", r: "Motor Lux · CRM" },
  { q: "Empire bilan ishlash oson bo'ldi, muddat va byudjet aniq edi.", n: "Jasur T.", r: "GadgetSpace" },
  { q: "Klinika ishini AI qo'shib avtomatlashtirdi. Qabul ancha tartibli.", n: "Doniyor R.", r: "MedFlow" },
];

const PRICING: Record<string, { badge: string; price: string; term: string; feats: string[]; feat?: boolean }[]> = {
  soft: [
    { badge: "STANDARD", price: "$5,000 dan", term: "2–3 oy", feats: ["Landing yoki MVP", "Forma, integratsiya", "Asosiy admin panel"] },
    { badge: "ADVANCED", price: "$15K–$40K", term: "4–6 oy", feats: ["To'liq ilova", "CRM integratsiya", "Admin panel, API"], feat: true },
    { badge: "MEGA", price: "$50,000+", term: "6–12 oy", feats: ["Yirik ekotizim", "Mikroxizmatlar", "Maxsus SLA"] },
  ],
  odoo: [
    { badge: "STANDARD", price: "$8,800 dan", term: "2–3 oy", feats: ["Standart modullar", "Migratsiya", "O'qitish"] },
    { badge: "ADVANCED", price: "$25K–$35K", term: "4–6 oy", feats: ["Maxsus modullar", "AI chat-bot", "Avtomatlashtirish"], feat: true },
    { badge: "MEGA", price: "$85,000+", term: "~1 yil", feats: ["To'liq transformatsiya", "Predictive analytics", "Chuqur AI"] },
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

export default function V10() {
  const [track, setTrack] = useState<"soft" | "odoo">("soft");
  const [open, setOpen] = useState(0);

  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".ln .ln-rise"));
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: 0, rootMargin: "0px 0px -6% 0px" });
    els.forEach((el) => io.observe(el));
    const raf = requestAnimationFrame(() => els.forEach((el) => { if (el.getBoundingClientRect().top < window.innerHeight * 0.92) el.classList.add("in"); }));
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, []);

  return (
    <div className="ln">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300..600&family=JetBrains+Mono:wght@400&display=swap" />
      <style dangerouslySetInnerHTML={{ __html: CSS_STR }} />

      {/* NAV */}
      <header className="ln-nav">
        <div className="ln-wrap ln-nav-in">
          <a href="#" className="ln-logo"><span className="ln-glyph">◣</span> Empire</a>
          <nav className="ln-nav-links">{NAV.map((n) => <a key={n} href="#">{n}</a>)}</nav>
          <div className="ln-nav-cta">
            <a href="#" className="ln-navlink">Kirish</a>
            <a href="#cta" className="ln-wpill">Bepul konsultatsiya</a>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="ln-hero">
        <div className="ln-wrap">
          <div className="ln-hero-top">
            <div>
              <div className="ln-mono ln-rise">EMPIRE · v2026</div>
              <h1 className="ln-display ln-rise">Biznesni raqamlashtiramiz.<br />G'oyadan mahsulotgacha.</h1>
              <p className="ln-sub ln-rise">Murakkab ichki jarayonlarni ERP, AI, Web va App yechimlari orqali raqamlashtiramiz — atigi 2–3 oyda.</p>
              <div className="ln-hero-btns ln-rise">
                <a href="#cta" className="ln-lime">Loyihani boshlash</a>
                <a href="#loyihalar" className="ln-arrow">Ishlarni ko'rish →</a>
              </div>
            </div>
          </div>
          <div className="ln-floor ln-rise">
            <div className="ln-frame">
              <div className="ln-frame-bar"><span className="ln-fdot" /><span className="ln-fdot" /><span className="ln-fdot" /><span className="ln-mono ln-frame-id">EMP-2703 · motor-lux</span></div>
              <img src="/cases/case-autoservice-desktop.webp" alt="Motor Lux CRM" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* LOGO STRIP */}
      <section className="ln-strip">
        <div className="ln-wrap">
          <div className="ln-strip-cap ln-rise">Bizga ishonishadi</div>
          <div className="ln-strip-row ln-rise">{CLIENTS.map((c) => <span key={c}>{c}</span>)}</div>
        </div>
      </section>

      {/* FEATURES (2-col alternating) */}
      {FEATURES.map((f, i) => (
        <section className="ln-sec" id={i === 0 ? "xizmatlar" : undefined} key={f.id}>
          <div className={`ln-wrap ln-two ${i % 2 ? "rev" : ""}`}>
            <div className="ln-two-txt ln-rise">
              <span className={`ln-badge b-${f.tagc}`}>{f.tag}</span>
              <h2 className="ln-h ln-rise">{f.t}</h2>
              <p className="ln-body ln-rise">{f.b}</p>
              <div className="ln-chips ln-rise">{f.chips.map((c) => <span className="ln-chip" key={c}>{c}</span>)}</div>
              <a href="#cta" className="ln-arrow ln-rise">Batafsil →</a>
            </div>
            <div className="ln-frame ln-rise">
              <div className="ln-frame-bar"><span className="ln-fdot" /><span className="ln-fdot" /><span className="ln-fdot" /><span className="ln-mono ln-frame-id">{f.id}</span></div>
              <img src={f.img} alt={f.t} loading="lazy" />
            </div>
          </div>
        </section>
      ))}

      {/* STATS */}
      <section className="ln-sec ln-tight">
        <div className="ln-wrap ln-stats">
          {STATS.map((s) => <div className="ln-stat ln-rise" key={s.l}><div className="ln-stat-n">{s.n}</div><div className="ln-muted">{s.l}</div></div>)}
        </div>
      </section>

      {/* PORTFOLIO showcase */}
      <section className="ln-sec" id="loyihalar">
        <div className="ln-wrap">
          <span className="ln-badge b-iris ln-rise">PORTFOLIO</span>
          <h2 className="ln-h ln-rise">So'nggi ishlarimiz.</h2>
          <p className="ln-sub ln-sub-narrow ln-rise">Real, ishga tushirilgan loyihalar — har biri yechilgan muammo.</p>
          <div className="ln-cases">
            {CASES.map((c, i) => (
              <div className="ln-case ln-rise" key={c.id} style={{ transitionDelay: `${(i % 2) * 60}ms` } as CSS}>
                <div className="ln-frame ln-frame-sm">
                  <div className="ln-frame-bar"><span className="ln-fdot" /><span className="ln-fdot" /><span className="ln-fdot" /><span className="ln-mono ln-frame-id">{c.id}</span></div>
                  <img src={c.img} alt={c.title} loading="lazy" />
                </div>
                <div className="ln-case-meta">
                  <div className="ln-muted ln-muted-sm">{c.seg}</div>
                  <h3 className="ln-h3">{c.title}</h3>
                  <p className="ln-body ln-body-sm"><span className="ln-res">{c.res}</span></p>
                  <a href={`https://${c.url}`} target="_blank" rel="noopener noreferrer" className="ln-arrow ln-arrow-sm">{c.url} →</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS command-palette style */}
      <section className="ln-sec ln-tight" id="jarayon">
        <div className="ln-wrap">
          <span className="ln-badge b-lav ln-rise">QANDAY ISHLAYMIZ</span>
          <h2 className="ln-h ln-rise">G'oyadan mahsulotgacha — 4 bosqich.</h2>
          <div className="ln-palette ln-rise">
            {PROCESS.map((p) => (
              <div className="ln-cmd" key={p.n}>
                <span className="ln-mono ln-cmd-n">{p.n}</span>
                <div className="ln-cmd-txt"><b>{p.t}</b><span>{p.b}</span></div>
                <span className="ln-kbd">{p.k}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STACK */}
      <section className="ln-sec ln-tight">
        <div className="ln-wrap">
          <span className="ln-badge b-iris ln-rise">STACK</span>
          <h2 className="ln-h3 ln-rise ln-h3-head">Sanoat standarti texnologiyalar.</h2>
          <div className="ln-logos ln-rise">
            {toolLogos.filter((t) => t.path).slice(0, 12).map((t) => (
              <span className="ln-tlogo" key={t.title}><svg viewBox="0 0 24 24" width="18" height="18"><path d={t.path} fill="currentColor" /></svg>{t.title}</span>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNERS */}
      <section className="ln-sec ln-tight">
        <div className="ln-wrap">
          <span className="ln-badge b-lav ln-rise">GLOBAL STANDART</span>
          <h2 className="ln-h3 ln-rise ln-h3-head">Dunyo yetakchilari darajasida.</h2>
          <div className="ln-logos ln-rise">
            {brandLogos.filter((b) => b.path).slice(0, 10).map((b) => (
              <span className="ln-tlogo" key={b.title}><svg viewBox="0 0 24 24" width="18" height="18"><path d={b.path} fill="currentColor" /></svg>{b.title}</span>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="ln-sec">
        <div className="ln-wrap">
          <span className="ln-badge b-iris ln-rise">JAMOA</span>
          <h2 className="ln-h ln-rise">Ortida — real jamoa.</h2>
          <div className="ln-team ln-rise">
            {TEAM.map((m) => (
              <div className="ln-tcard" key={m.n}>
                {m.photo ? <img src={m.photo} alt={m.n} loading="lazy" className="ln-tphoto" /> : <span className="ln-tmono">{m.n.split(" ").map((w) => w[0]).join("").slice(0, 2)}</span>}
                <div><div className="ln-tn">{m.n}</div><div className="ln-muted ln-muted-sm">{m.r}</div></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="ln-sec ln-tight" id="sharhlar">
        <div className="ln-wrap">
          <span className="ln-badge b-lav ln-rise">MIJOZLAR</span>
          <h2 className="ln-h ln-rise">Mijozlarimiz nima deydi.</h2>
          <div className="ln-testis">
            {TESTI.map((t, i) => (
              <div className="ln-tcard-q ln-rise" key={t.n} style={{ transitionDelay: `${i * 60}ms` } as CSS}>
                <p className="ln-quote">“{t.q}”</p>
                <div className="ln-qat"><span className="ln-tmono ln-tmono-sm">{t.n.split(" ").map((w) => w[0]).join("").slice(0, 2)}</span><div><div className="ln-tn">{t.n}</div><div className="ln-muted ln-muted-sm">{t.r}</div></div></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="ln-sec" id="narxlar">
        <div className="ln-wrap">
          <span className="ln-badge b-iris ln-rise">NARXLAR</span>
          <h2 className="ln-h ln-rise">Shaffof narxlar.</h2>
          <div className="ln-toggle ln-rise">
            <button className={track === "soft" ? "on" : ""} onClick={() => setTrack("soft")}>Maxsus DT</button>
            <button className={track === "odoo" ? "on" : ""} onClick={() => setTrack("odoo")}>Odoo ERP &amp; AI</button>
          </div>
          <div className="ln-prices">
            {PRICING[track].map((p, i) => (
              <div className={`ln-price ln-rise ${p.feat ? "feat" : ""}`} key={p.badge} style={{ transitionDelay: `${i * 60}ms` } as CSS}>
                <div className="ln-mono ln-price-b">{p.badge}</div>
                <div className="ln-price-n">{p.price}</div>
                <div className="ln-muted ln-muted-sm">{p.term}</div>
                <ul className="ln-price-list">{p.feats.map((f) => <li key={f}>{f}</li>)}</ul>
                <a href="#cta" className={p.feat ? "ln-lime ln-block" : "ln-ghost ln-block"}>Konsultatsiya</a>
              </div>
            ))}
          </div>
          <p className="ln-muted ln-muted-sm ln-note">Fixed-scope · yashirin to'lov yo'q · 4 hafta qo'llab-quvvatlash</p>
        </div>
      </section>

      {/* CREDENTIALS */}
      <section className="ln-sec ln-tight">
        <div className="ln-wrap">
          <span className="ln-badge b-iris ln-rise">ISHONCH</span>
          <h2 className="ln-h3 ln-rise ln-h3-head">Rasmiy maqom va sertifikatlar.</h2>
          <div className="ln-creds ln-rise">
            {CREDS.map((c) => (
              <div className="ln-cred" key={c.name}>
                <div className="ln-cred-img"><img src={c.img} alt={c.name} loading="lazy" /></div>
                <div className="ln-tn ln-tn-sm">{c.name}</div>
                <div className="ln-muted ln-muted-sm">{c.iss}</div>
                <span className={`ln-badge ${c.ok ? "b-green" : "b-ash"}`}>{c.ok ? "Tasdiqlangan" : "Kutilmoqda"}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="ln-sec">
        <div className="ln-wrap ln-faq-wrap">
          <span className="ln-badge b-lav ln-rise">SAVOL-JAVOB</span>
          <h2 className="ln-h ln-rise">Ko'p so'raladigan savollar.</h2>
          <div className="ln-faq ln-rise">
            {FAQ.map((f, i) => (
              <div className={`ln-faq-row ${open === i ? "open" : ""}`} key={f.q}>
                <button className="ln-faq-q" aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)}><span>{f.q}</span><span className="ln-faq-ic">+</span></button>
                <div className="ln-faq-a"><p>{f.a}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="ln-cta" id="cta">
        <div className="ln-wrap ln-center">
          <h2 className="ln-heading ln-rise">Loyihangizni bugun boshlaymiz.</h2>
          <p className="ln-sub ln-center ln-rise">G'oyangizni ayting — aniq muddat va byudjet bilan tayyor mahsulotga aylantiramiz.</p>
          <div className="ln-hero-btns ln-center ln-rise"><a href="https://t.me/muslimansoriy" className="ln-lime">Bepul konsultatsiya</a><a href="https://t.me/muslimansoriy" className="ln-arrow">Telegram →</a></div>
          <p className="ln-mono ln-cta-note ln-rise">+998 99 116 46 58 · t.me/muslimansoriy · Toshkent</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="ln-footer">
        <div className="ln-wrap ln-foot-in">
          <div className="ln-foot-brand"><div className="ln-logo"><span className="ln-glyph">◣</span> Empire</div><p className="ln-muted">AI, custom software va Odoo ERP — g'oyadan tayyor mahsulotgacha.</p></div>
          <div className="ln-foot-cols">
            <div><h4>Xizmatlar</h4><a href="#xizmatlar">Maxsus dasturiy ta'minot</a><a href="#xizmatlar">Odoo ERP &amp; AI</a><a href="#narxlar">Narxlar</a></div>
            <div><h4>Kompaniya</h4><a href="#loyihalar">Loyihalar</a><a href="#jarayon">Jarayon</a><a href="#sharhlar">Sharhlar</a></div>
            <div><h4>Aloqa</h4><a href="mailto:muslimansoriy7@gmail.com">muslimansoriy7@gmail.com</a><a href="tel:+998991164658">+998 99 116 46 58</a><a href="https://t.me/muslimansoriy">Telegram</a></div>
          </div>
        </div>
        <div className="ln-wrap ln-foot-bot"><span>© 2026 Empire Group. Barcha huquqlar himoyalangan.</span><span>Toshkent · O'zbekiston</span></div>
      </footer>
    </div>
  );
}

const CSS_STR = `
.ln{--void:#08090a;--carbon:#0f1011;--obsidian:#161718;--graphite:#23252a;--smoke:#383b3f;--ash:#62666d;--fog:#8a8f98;--mist:#d0d6e0;--bone:#e5e5e6;--paper:#fff;
  --lime:#e4f222;--green:#27a644;--coral:#eb5757;--iris:#6366f1;--lav:#8b5cf6;
  --sans:'Inter',ui-sans-serif,system-ui,sans-serif;--mono:'JetBrains Mono',ui-monospace,monospace;
  background:var(--void);color:var(--mist);font-family:var(--sans);font-feature-settings:'cv01' on,'ss03' on,'zero' on;-webkit-font-smoothing:antialiased;overflow-x:clip;}
.ln *{box-sizing:border-box;}
.ln img{display:block;max-width:100%;}
.ln a{color:inherit;text-decoration:none;}
.ln-wrap{max-width:1200px;margin:0 auto;padding:0 24px;}
.ln-center{text-align:center;}

/* type */
.ln-display{font-family:var(--sans);font-weight:510;font-size:clamp(40px,7vw,72px);line-height:1.0;letter-spacing:-0.022em;color:var(--paper);margin:14px 0 20px;}
.ln-heading{font-weight:510;font-size:clamp(34px,5vw,48px);line-height:1.0;letter-spacing:-0.022em;color:var(--paper);margin:0 0 16px;}
.ln-h{font-weight:510;font-size:clamp(28px,3.6vw,40px);line-height:1.05;letter-spacing:-0.02em;color:var(--paper);margin:14px 0 14px;}
.ln-h3{font-weight:510;font-size:20px;letter-spacing:-0.012em;color:var(--paper);margin:0 0 6px;}
.ln-h3-head{margin:12px 0 24px;}
.ln-sub{font-size:16px;line-height:1.5;color:var(--fog);max-width:520px;margin:0 0 26px;}
.ln-sub-narrow{max-width:520px;}
.ln-body{font-size:16px;line-height:1.6;color:var(--mist);margin:0 0 20px;}
.ln-body-sm{font-size:15px;margin:0 0 12px;}
.ln-muted{font-size:15px;color:var(--fog);line-height:1.5;}
.ln-muted-sm{font-size:13px;}
.ln-mono{font-family:var(--mono);font-size:12px;letter-spacing:-0.013em;color:var(--fog);text-transform:uppercase;}
.ln-res{color:var(--mist);}

/* nav */
.ln-nav{position:sticky;top:0;z-index:40;background:rgba(8,9,10,.72);backdrop-filter:blur(12px);border-bottom:1px solid var(--graphite);}
.ln-nav-in{display:flex;align-items:center;justify-content:space-between;height:56px;}
.ln-logo{display:inline-flex;align-items:center;gap:8px;font-weight:510;font-size:16px;color:var(--paper);}
.ln-glyph{color:var(--lime);font-size:14px;}
.ln-nav-links{display:flex;gap:4px;}
.ln-nav-links a{font-size:13px;color:var(--mist);padding:8px 12px;border-radius:6px;}
.ln-nav-links a:hover{color:var(--paper);}
.ln-nav-cta{display:flex;align-items:center;gap:10px;}
.ln-navlink{font-size:13px;color:var(--mist);}
.ln .ln-wpill{background:var(--paper);color:var(--void);border-radius:9999px;padding:8px 16px;font-size:13px;font-weight:510;transition:opacity .2s ease;}
.ln .ln-wpill:hover{opacity:.9;}

/* buttons */
.ln .ln-lime{display:inline-flex;align-items:center;justify-content:center;background:var(--lime);color:var(--void);border-radius:6px;padding:11px 18px;font-size:14px;font-weight:510;letter-spacing:-0.011em;box-shadow:0 5px 2px rgba(0,0,0,.01),0 3px 2px rgba(0,0,0,.04),0 1px 1px rgba(0,0,0,.08);transition:transform .18s ease,filter .18s ease;}
.ln .ln-lime:hover{transform:translateY(-1px);filter:brightness(1.05);}
.ln .ln-ghost{display:inline-flex;align-items:center;justify-content:center;background:transparent;border:1px solid var(--graphite);color:var(--mist);border-radius:6px;padding:11px 18px;font-size:14px;font-weight:400;transition:border-color .18s ease;}
.ln .ln-ghost:hover{border-color:var(--smoke);}
.ln .ln-block{width:100%;margin-top:20px;}
.ln-arrow{font-size:14px;color:var(--mist);}
.ln-arrow:hover{color:var(--paper);text-decoration:underline;}
.ln-arrow-sm{font-size:13px;}

/* hero */
.ln-hero{padding:80px 0 0;position:relative;}
.ln-hero-btns{display:flex;gap:16px;align-items:center;flex-wrap:wrap;}
.ln-floor{margin-top:56px;padding:40px 0 0;background:linear-gradient(180deg,var(--void) 0%,rgba(208,214,224,.14) 100%);border-radius:16px;}
.ln-frame{background:var(--carbon);border-radius:12px;box-shadow:inset 0 0 0 1px var(--graphite);overflow:hidden;}
.ln-frame-bar{display:flex;align-items:center;gap:6px;padding:10px 14px;border-bottom:1px solid var(--graphite);}
.ln-fdot{width:9px;height:9px;border-radius:9999px;background:var(--graphite);}
.ln-frame-id{margin-left:8px;}
.ln-frame img{width:100%;display:block;}
.ln-floor .ln-frame{max-width:960px;margin:0 auto;box-shadow:inset 0 0 0 1px var(--graphite),0 4px 32px rgba(8,9,10,.6);}

/* strip */
.ln-strip{padding:56px 0;border-top:1px solid var(--graphite);border-bottom:1px solid var(--graphite);margin-top:80px;}
.ln-strip-cap{text-align:center;font-size:13px;color:var(--ash);margin-bottom:24px;}
.ln-strip-row{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:56px;}
.ln-strip-row span{color:var(--fog);font-weight:510;font-size:16px;}

/* sections */
.ln-sec{padding:96px 0;}
.ln-tight{padding:56px 0;}

/* two-col feature */
.ln-two{display:grid;grid-template-columns:1fr 1.1fr;gap:56px;align-items:center;}
.ln-two.rev .ln-two-txt{order:2;}
.ln-chips{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:20px;}
.ln-chip{font-size:12px;color:var(--mist);background:rgba(255,255,255,.05);border-radius:9999px;padding:4px 12px;}

/* badges */
.ln-badge{display:inline-block;font-size:12px;border-radius:4px;padding:2px 8px;letter-spacing:.02em;}
.b-iris{background:rgba(99,102,241,.15);color:#a6a8f7;}
.b-lav{background:rgba(139,92,246,.15);color:#c4b0fb;}
.b-green{background:rgba(39,166,68,.15);color:#5fd07f;}
.b-ash{background:rgba(255,255,255,.05);color:var(--fog);}

/* stats */
.ln-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;}
.ln-stat{border:1px solid var(--graphite);border-radius:12px;padding:24px;background:var(--carbon);}
.ln-stat-n{font-weight:510;font-size:36px;letter-spacing:-0.022em;color:var(--paper);line-height:1;margin-bottom:8px;}

/* cases */
.ln-cases{display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-top:40px;}
.ln-case{background:var(--carbon);border:1px solid var(--graphite);border-radius:12px;overflow:hidden;transition:border-color .2s ease;}
.ln-case:hover{border-color:var(--smoke);}
.ln-frame-sm{border-radius:0;box-shadow:none;border-bottom:1px solid var(--graphite);}
.ln-frame-sm img{aspect-ratio:16/10;object-fit:cover;object-position:top;}
.ln-case-meta{padding:20px 24px 24px;}
.ln-h3{margin-top:4px;}
.ln-arrow-sm{display:inline-block;margin-top:8px;color:var(--fog);}

/* process palette */
.ln-palette{margin-top:32px;border:1px solid var(--graphite);border-radius:12px;overflow:hidden;background:var(--carbon);}
.ln-cmd{display:flex;align-items:center;gap:16px;padding:18px 24px;border-bottom:1px solid var(--graphite);}
.ln-cmd:last-child{border-bottom:0;}
.ln-cmd-n{color:var(--lime);flex:0 0 auto;}
.ln-cmd-txt{flex:1;}
.ln-cmd-txt b{font-weight:510;color:var(--paper);font-size:16px;}
.ln-cmd-txt span{display:block;font-size:14px;color:var(--fog);margin-top:2px;}
.ln-kbd{font-family:var(--mono);font-size:12px;color:var(--mist);border:1px solid var(--graphite);border-radius:4px;padding:2px 8px;}

/* logos */
.ln-logos{display:flex;flex-wrap:wrap;gap:12px;}
.ln-tlogo{display:inline-flex;align-items:center;gap:8px;color:var(--fog);font-size:14px;font-weight:400;border:1px solid var(--graphite);border-radius:9999px;padding:8px 14px;transition:color .2s ease,border-color .2s ease;}
.ln-tlogo:hover{color:var(--mist);border-color:var(--smoke);}

/* team */
.ln-team{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-top:40px;}
.ln-tcard{display:flex;align-items:center;gap:12px;background:var(--carbon);border:1px solid var(--graphite);border-radius:12px;padding:16px;}
.ln-tphoto{width:42px;height:42px;border-radius:9999px;object-fit:cover;filter:grayscale(.4);flex:0 0 auto;}
.ln-tmono{width:42px;height:42px;border-radius:9999px;background:var(--obsidian);border:1px solid var(--graphite);color:var(--mist);display:inline-flex;align-items:center;justify-content:center;font-size:14px;font-weight:510;flex:0 0 auto;}
.ln-tmono-sm{width:38px;height:38px;font-size:13px;}
.ln-tn{font-size:15px;font-weight:510;color:var(--paper);}
.ln-tn-sm{font-size:14px;margin-top:12px;}

/* testimonials */
.ln-testis{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:40px;}
.ln-tcard-q{background:var(--carbon);border:1px solid var(--graphite);border-radius:12px;padding:24px;}
.ln-quote{font-size:16px;line-height:1.55;color:var(--mist);margin:0 0 20px;}
.ln-qat{display:flex;align-items:center;gap:12px;}

/* pricing */
.ln-toggle{display:inline-flex;gap:4px;background:var(--carbon);border:1px solid var(--graphite);border-radius:9999px;padding:4px;margin-top:24px;margin-bottom:12px;}
.ln-toggle button{border:0;background:transparent;font-family:var(--sans);font-size:14px;font-weight:400;color:var(--fog);padding:8px 18px;border-radius:9999px;cursor:pointer;transition:all .2s ease;}
.ln-toggle button.on{background:var(--obsidian);color:var(--paper);}
.ln-prices{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:24px;}
.ln-price{background:var(--carbon);border:1px solid var(--graphite);border-radius:12px;padding:28px;display:flex;flex-direction:column;}
.ln-price.feat{border-color:var(--lime);box-shadow:0 0 0 1px rgba(228,242,34,.3);}
.ln-price-b{margin-bottom:6px;}
.ln-price-n{font-weight:510;font-size:30px;letter-spacing:-0.022em;color:var(--paper);margin:8px 0 2px;}
.ln-price-list{list-style:none;padding:0;margin:20px 0 0;flex:1;}
.ln-price-list li{font-size:14px;color:var(--mist);padding:8px 0;border-top:1px solid var(--graphite);padding-left:20px;position:relative;}
.ln-price-list li::before{content:"✓";position:absolute;left:0;color:var(--green);}

/* creds */
.ln-creds{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-top:8px;}
.ln-cred{background:var(--carbon);border:1px solid var(--graphite);border-radius:12px;padding:20px;}
.ln-cred-img{background:var(--obsidian);border:1px solid var(--graphite);border-radius:8px;height:78px;display:flex;align-items:center;justify-content:center;padding:12px;margin-bottom:12px;}
.ln-cred-img img{max-height:50px;width:auto;object-fit:contain;}
.ln-cred .ln-badge{margin-top:10px;}

/* faq */
.ln-faq-wrap{max-width:800px;}
.ln-faq{margin-top:24px;border-top:1px solid var(--graphite);}
.ln-faq-row{border-bottom:1px solid var(--graphite);}
.ln-faq-q{width:100%;display:flex;align-items:center;justify-content:space-between;gap:16px;background:transparent;border:0;cursor:pointer;padding:20px 0;font-family:var(--sans);font-size:16px;font-weight:510;color:var(--paper);text-align:left;letter-spacing:-0.012em;}
.ln-faq-ic{font-size:20px;color:var(--fog);transition:transform .3s ease;}
.ln-faq-row.open .ln-faq-ic{transform:rotate(45deg);color:var(--lime);}
.ln-faq-a{max-height:0;overflow:hidden;transition:max-height .35s ease;}
.ln-faq-row.open .ln-faq-a{max-height:200px;}
.ln-faq-a p{font-size:15px;line-height:1.6;color:var(--fog);margin:0 0 20px;}

/* cta */
.ln-cta{padding:110px 0;text-align:center;border-top:1px solid var(--graphite);background:linear-gradient(180deg,var(--void),rgba(228,242,34,.03));}
.ln-cta .ln-sub{margin-left:auto;margin-right:auto;}
.ln-cta-note{margin-top:28px;}

/* footer */
.ln-footer{border-top:1px solid var(--graphite);padding:64px 0 40px;}
.ln-foot-in{display:flex;justify-content:space-between;gap:48px;flex-wrap:wrap;}
.ln-foot-brand{max-width:300px;}
.ln-foot-brand .ln-muted{margin-top:12px;}
.ln-foot-cols{display:flex;gap:56px;flex-wrap:wrap;}
.ln-foot-cols h4{font-size:13px;font-weight:510;color:var(--mist);margin:0 0 14px;}
.ln-foot-cols a{display:block;font-size:14px;color:var(--fog);padding:5px 0;}
.ln-foot-cols a:hover{color:var(--mist);}
.ln-foot-bot{display:flex;justify-content:space-between;gap:16px;flex-wrap:wrap;margin-top:48px;padding-top:24px;border-top:1px solid var(--graphite);font-size:13px;color:var(--ash);}

/* reveal */
.ln .ln-rise{opacity:1;transform:translateY(16px);transition:opacity .6s cubic-bezier(.16,1,.3,1),transform .6s cubic-bezier(.16,1,.3,1);}
.ln .ln-rise.in{transform:none;}

/* responsive */
@media(max-width:1000px){.ln-two{grid-template-columns:1fr;gap:28px;}.ln-two.rev .ln-two-txt{order:0;}.ln-cases{grid-template-columns:1fr;}.ln-testis{grid-template-columns:1fr;}.ln-prices{grid-template-columns:1fr;}.ln-team{grid-template-columns:repeat(2,1fr);}.ln-stats{grid-template-columns:repeat(2,1fr);}.ln-creds{grid-template-columns:repeat(2,1fr);}.ln-nav-links{display:none;}}
@media(max-width:560px){.ln-team{grid-template-columns:1fr;}.ln-creds{grid-template-columns:1fr;}.ln-foot-in{flex-direction:column;}}
@media(prefers-reduced-motion:reduce){.ln .ln-rise{transition:none;transform:none;}}
`;
