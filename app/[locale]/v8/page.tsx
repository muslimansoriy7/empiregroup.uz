"use client";

import { useEffect, useState } from "react";
import { toolLogos, brandLogos } from "@/content/logos";

type CSS = React.CSSProperties;

const NAV = ["Xizmatlar", "Jarayon", "Loyihalar", "Sharhlar", "Narxlar", "Blog"];

const CLIENTS = [
  { src: "/logos/motorlux.png", name: "Motor Lux" },
  { src: "/logos/medflow.png", name: "MedFlow" },
  { src: "/logos/grandosiyo.png", name: "Grand Osiyo" },
  { src: "/logos/texnika.png", name: "Texnika Ijara" },
  { src: "/logos/gadgetspace.png", name: "GadgetSpace" },
  { src: "/logos/xwear.png", name: "X Wear" },
  { src: "/logos/hilol.png", name: "Hilol Market" },
];

const SERVICES = [
  { grad: "develop", eyebrow: "PRODUCT", t: "Maxsus dasturiy ta'minot", b: "Web/mobil ilova, ichki tizim, admin panel — biznesingizga aniq mos, noldan quriladi.", tags: ["React", "Node.js", "Flutter", "Docker"] },
  { grad: "preview", eyebrow: "PLATFORM", t: "Odoo ERP & AI joriy qilish", b: "Barcha jarayon bitta tizimda: sotuv, ombor, moliya, HR — AI bilan kuchaytiriladi.", tags: ["Odoo ERP", "AI", "Analytics"] },
  { grad: "ship", eyebrow: "MOBILE", t: "Mobil ilova", b: "iOS + Android, Flutter — bitta koddan ikki platforma; push, to'lov, oflayn.", tags: ["Flutter", "iOS", "Android"] },
  { grad: "develop", eyebrow: "INTEGRATION", t: "Integratsiya & API", b: "To'lov, SMS, 1C, marketpleyslar va tashqi servislar — barchasi ulanadi.", tags: ["API", "Telegram", "CRM"] },
];

const STATS = [
  { n: "50+", l: "Yakunlangan loyiha" },
  { n: "30+", l: "Mamnun mijoz" },
  { n: "15+", l: "Texnologiya" },
  { n: "3+ yil", l: "Tajriba" },
];

const CASES = [
  { seg: "AVTOMOBIL · CRM", title: "Motor Lux — CRM va savdo boshqaruvi", res: "Savdo va mijozlar bitta tizimda", img: "/cases/case-autoservice-desktop.webp", url: "motorlux.uz" },
  { seg: "TIBBIYOT · CRM (PWA)", title: "MedFlow — klinika CRM va bemor qabuli", res: "Qabul boshqaruvi 3× tezlashdi", img: "/cases/case-medflow-desktop.webp", url: "medflow.uz" },
  { seg: "TO'QIMACHILIK · ERP", title: "Grand Osiyo Textile — ERP va ombor tizimi", res: "Ombor real vaqtda boshqariladi", img: "/cases/case-textile-desktop.webp", url: "grandosiyo.uz" },
  { seg: "IJARA · KATALOG", title: "Texnika Ijara — ijara va katalog sayti", res: "Onlayn bronlar 3× oshdi", img: "/cases/case-texnika-desktop.webp", url: "texnika-ijara.uz" },
  { seg: "ELEKTRONIKA · E-COMMERCE", title: "GadgetSpace — onlayn elektronika do'koni", res: "Konversiya 2.1× oshdi", img: "/cases/case-gadgetspace-desktop.webp", url: "gadgetspace.uz" },
  { seg: "MODA · E-COMMERCE", title: "X Wear — kiyim brendi uchun do'kon", res: "O'rtacha chek 28% oshdi", img: "/cases/case-xwear-desktop.webp", url: "xwear.uz" },
  { seg: "SAVDO · POS", title: "Hilol Market — savdo avtomatlashtirish", res: "Hisob-kitob 2× tezlashdi", img: "/cases/case-kassa-desktop.webp", url: "hilolmarket.uz" },
];

const PROCESS = [
  { n: "01", t: "Explore", b: "G'oya va muammoni chuqur o'rganamiz." },
  { n: "02", t: "Plan", b: "PRD, TZ, arxitektura va dizayn; muddat aniq." },
  { n: "03", t: "Build", b: "Kod, test, integratsiya; sprintlar, demo." },
  { n: "04", t: "Commit", b: "Ishga tushirish va qo'llab-quvvatlash." },
];

const TEAM = [
  { n: "Muslim Ansoriy", r: "Ta'sischi va CEO · Technical PM", b: "7+ yil IT; Odoo ERP Partner Manager (Markaziy Osiyo/Kavkaz); 20+ ERP loyiha.", photo: "/founder.webp" },
  { n: "Abbos Jo'rayev", r: "Hammuassis va COO", b: "6+ yil IT loyiha boshqaruvi." },
  { n: "Sardor Rahmatullayev", r: "Senior Odoo Developer", b: "5 yil Python/Odoo; 30+ modul; REST/XML-RPC." },
  { n: "Dilnoza Yusupova", r: "Biznes-analitik · ERP Consultant", b: "4 yil biznes-tahlil; AS-IS/TO-BE." },
  { n: "Jasurbek Toshmatov", r: "Full-stack Developer", b: "5 yil web/mobil; React, Next.js, Node.js." },
  { n: "Nilufar Karimova", r: "Digital Marketing Lead", b: "6 yil marketing; SEO, lead gen." },
  { n: "Bekzod Ergashev", r: "DevOps · SysAdmin", b: "4 yil infratuzilma; Linux, Docker, CI/CD." },
  { n: "Malika Sobirova", r: "UI/UX Designer", b: "4 yil interfeys dizayni; Figma." },
];

const TESTI = [
  { q: "Empire Group eski qog'ozdagi ishimizni to'liq tizimga o'tkazdi — vaqt ancha tejaldi.", n: "Aliya M.", r: "Motor Lux · CRM" },
  { q: "Empire bilan ishlash oson bo'ldi, muddat va byudjet aniq edi.", n: "Jasur T.", r: "GadgetSpace · E-commerce" },
  { q: "Klinika ishini AI qo'shib avtomatlashtirdi. Qabul ancha tartibli.", n: "Doniyor R.", r: "MedFlow · klinika" },
  { q: "Zamonaviy dizayn, savdo hajmi ko'tarildi.", n: "Laziza K.", r: "X Wear · e-commerce" },
];

const PRICING: Record<string, { badge: string; price: string; term: string; feats: string[]; feat?: boolean }[]> = {
  soft: [
    { badge: "STANDARD", price: "$5,000 dan", term: "2–3 oy", feats: ["Landing yoki MVP", "Forma va integratsiya", "Asosiy admin panel", "Responsive dizayn"] },
    { badge: "ADVANCED", price: "$15K–$40K", term: "4–6 oy", feats: ["To'liq web/mobil ilova", "CRM integratsiya", "Admin panel", "API va avtomatlashtirish"], feat: true },
    { badge: "MEGA", price: "$50,000+", term: "6–12 oy", feats: ["Yirik ekotizim", "Mikroxizmatlar", "Yuqori yuklama", "Maxsus SLA"] },
  ],
  odoo: [
    { badge: "STANDARD", price: "$8,800 dan", term: "2–3 oy", feats: ["Standart modullar", "Ma'lumot migratsiyasi", "Xodimlarni o'qitish", "Bazaviy sozlash"] },
    { badge: "ADVANCED", price: "$25K–$35K", term: "4–6 oy", feats: ["Maxsus modullar", "AI chat-bot", "Hujjat aylanishi", "Avtomatlashtirish"], feat: true },
    { badge: "MEGA", price: "$85,000+", term: "~1 yil", feats: ["To'liq transformatsiya", "Predictive analytics", "Chuqur AI", "Barcha bo'limlar"] },
  ],
};

const CREDS = [
  { name: "Odoo Learning Partner", img: "/sertifikat/odoo-learning-partner.svg", iss: "Odoo S.A.", ok: true },
  { name: "Davlat guvohnomasi", img: "/sertifikat/davlat-royxat-guvohnomasi.png", iss: "“EMPIRE GROUP CORP” MCHJ", ok: true },
  { name: "IT Park rezidenti", img: "/sertifikat/it-park.svg", iss: "IT Park O'zbekiston", ok: false },
  { name: "ISO/IEC 27001", img: "/sertifikat/iso-27001.svg", iss: "Axborot xavfsizligi", ok: false },
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

const GRADS: Record<string, string> = {
  develop: "linear-gradient(90deg,#007cf0,#00dfd8)",
  preview: "linear-gradient(90deg,#7928ca,#ff0080)",
  ship: "linear-gradient(90deg,#ff4d4d,#f9cb28)",
};

export default function V8() {
  const [track, setTrack] = useState<"soft" | "odoo">("soft");
  const [open, setOpen] = useState<number>(0);

  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".vg .vg-rise"));
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
    <div className="vg">
      <style dangerouslySetInnerHTML={{ __html: CSS_STR }} />

      {/* NAV */}
      <header className="vg-nav">
        <div className="vg-wrap vg-nav-in">
          <a href="#" className="vg-word">▲ Empire</a>
          <nav className="vg-nav-links">{NAV.map((n) => <a key={n} href="#">{n}</a>)}</nav>
          <div className="vg-nav-cta">
            <a href="#" className="vg-sq vg-sq-ghost">Kirish</a>
            <a href="#cta" className="vg-sq vg-sq-fill">Bepul konsultatsiya</a>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="vg-hero">
        <div className="vg-mesh" aria-hidden="true" />
        <div className="vg-wrap vg-hero-in">
          <div className="vg-eye vg-rise">AI &amp; CUSTOM SOFTWARE DEVELOPMENT</div>
          <h1 className="vg-h1 vg-rise">Biznesni raqamlashtiramiz —<br />g'oyadan ishlaydigan mahsulotgacha.</h1>
          <p className="vg-lead vg-rise">Murakkab ichki jarayonlarni ERP, AI, Web va App yechimlari orqali raqamlashtiramiz. G'oyadan tayyor tizim/mahsulotgacha — atigi 2–3 oyda.</p>
          <div className="vg-hero-btns vg-rise">
            <a href="#cta" className="vg-pill vg-pill-fill">Loyihani boshlash</a>
            <a href="#loyihalar" className="vg-pill vg-pill-ghost">Ishlarni ko'rish</a>
          </div>
          <div className="vg-code vg-rise" role="img" aria-label="Empire deploy log">
            <div className="vg-code-bar"><span className="d d1" /><span className="d d2" /><span className="d d3" /><em>empire — deploy</em></div>
            <pre>
<span><span className="c-key">$</span> empire deploy <span className="c-str">--project</span> motor-lux</span>
<span><span className="c-ok">✓</span> Build tayyor <span className="c-mut">· 2–3 oy</span></span>
<span><span className="c-ok">✓</span> ERP · AI · Web · App</span>
<span><span className="c-ok">✓</span> Ishga tushirildi <span className="c-mut">· https://motorlux.uz</span></span>
            </pre>
          </div>
        </div>
      </section>

      {/* LOGO STRIP */}
      <section className="vg-strip">
        <div className="vg-wrap">
          <div className="vg-eye vg-center vg-rise">BIZGA ISHONISHADI</div>
          <div className="vg-logos vg-rise">{CLIENTS.map((c) => <img key={c.name} src={c.src} alt={c.name} loading="lazy" />)}</div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="vg-sec" id="xizmatlar">
        <div className="vg-wrap">
          <div className="vg-eye vg-rise">XIZMATLAR</div>
          <h2 className="vg-h2 vg-rise">Ikki yo'nalish, bitta standart.</h2>
          <p className="vg-sub vg-rise">Maxsus dasturiy ta'minot yoki Odoo ERP &amp; AI — har biri bir xil sifat va shaffof jarayon bilan.</p>
          <div className="vg-grid vg-grid2">
            {SERVICES.map((s, i) => (
              <div className="vg-card vg-rise" key={s.t} style={{ transitionDelay: `${(i % 2) * 60}ms` } as CSS}>
                <div className="vg-gbar" style={{ background: GRADS[s.grad] } as CSS} />
                <div className="vg-eye">{s.eyebrow}</div>
                <h3 className="vg-h3">{s.t}</h3>
                <p className="vg-body">{s.b}</p>
                <div className="vg-tagrow">{s.tags.map((t) => <span className="vg-tag" key={t}>{t}</span>)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="vg-sec vg-soft">
        <div className="vg-wrap vg-grid vg-grid4">
          {STATS.map((s) => (
            <div className="vg-card vg-stat vg-rise" key={s.l}>
              <div className="vg-stat-n">{s.n}</div>
              <div className="vg-mut">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PROCESS node-graph */}
      <section className="vg-sec" id="jarayon">
        <div className="vg-wrap">
          <div className="vg-eye vg-rise">QANDAY ISHLAYMIZ</div>
          <h2 className="vg-h2 vg-rise">G'oyadan mahsulotgacha — 4 bosqich.</h2>
          <div className="vg-flow vg-rise">
            {PROCESS.map((p, i) => (
              <div className="vg-node" key={p.n}>
                <div className="vg-card vg-node-card">
                  <div className="vg-node-n">{p.n}</div>
                  <h3 className="vg-h3">{p.t}</h3>
                  <p className="vg-body">{p.b}</p>
                </div>
                {i < PROCESS.length - 1 && <span className="vg-conn" aria-hidden="true">→</span>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section className="vg-sec vg-soft" id="loyihalar">
        <div className="vg-wrap">
          <div className="vg-eye vg-rise">PORTFOLIO</div>
          <h2 className="vg-h2 vg-rise">So'nggi ishlarimiz.</h2>
          <p className="vg-sub vg-rise">Real, ishga tushirilgan loyihalar — har biri yechilgan muammo.</p>
          <div className="vg-grid vg-grid2">
            {CASES.map((c, i) => (
              <div className="vg-card vg-case vg-rise" key={c.title} style={{ transitionDelay: `${(i % 2) * 60}ms` } as CSS}>
                <div className="vg-case-img"><img src={c.img} alt={c.title} loading="lazy" /></div>
                <div className="vg-eye">{c.seg}</div>
                <h3 className="vg-h3">{c.title}</h3>
                <p className="vg-body">{c.res}</p>
                <a href={`https://${c.url}`} target="_blank" rel="noopener noreferrer" className="vg-link">{c.url} ↗</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STACK */}
      <section className="vg-sec">
        <div className="vg-wrap">
          <div className="vg-eye vg-rise">BIZNING STACK</div>
          <h2 className="vg-h2 vg-rise">Ishonchli, sanoat standarti texnologiyalar.</h2>
          <div className="vg-chips vg-rise">
            {toolLogos.filter((t) => t.path).slice(0, 12).map((t) => (
              <div className="vg-chip" key={t.title}><svg viewBox="0 0 24 24" width="18" height="18"><path d={t.path} fill="currentColor" /></svg><span>{t.title}</span></div>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNERS */}
      <section className="vg-sec vg-soft">
        <div className="vg-wrap">
          <div className="vg-eye vg-rise">GLOBAL STANDART</div>
          <h2 className="vg-h2 vg-rise">Dunyo yetakchilari darajasida ishlaymiz.</h2>
          <div className="vg-chips vg-rise">
            {brandLogos.filter((b) => b.path).slice(0, 10).map((b) => (
              <div className="vg-chip vg-chip-plain" key={b.title}><svg viewBox="0 0 24 24" width="18" height="18"><path d={b.path} fill="currentColor" /></svg><span>{b.title}</span></div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="vg-sec">
        <div className="vg-wrap">
          <div className="vg-eye vg-rise">BIZ KIMMIZ</div>
          <h2 className="vg-h2 vg-rise">Ortida — real jamoa.</h2>
          <div className="vg-grid vg-grid4">
            {TEAM.map((m, i) => (
              <div className="vg-card vg-member vg-rise" key={m.n} style={{ transitionDelay: `${(i % 4) * 50}ms` } as CSS}>
                {m.photo ? <img src={m.photo} alt={m.n} loading="lazy" className="vg-mphoto" /> : <span className="vg-mono">{m.n.split(" ").map((w) => w[0]).join("").slice(0, 2)}</span>}
                <h3 className="vg-h3">{m.n}</h3>
                <div className="vg-mut vg-mut-sm">{m.r}</div>
                <p className="vg-body">{m.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="vg-sec vg-soft" id="sharhlar">
        <div className="vg-wrap">
          <div className="vg-eye vg-rise">MIJOZLAR FIKRI</div>
          <h2 className="vg-h2 vg-rise">Mijozlarimiz nima deydi.</h2>
          <div className="vg-grid vg-grid2">
            {TESTI.map((t, i) => (
              <div className="vg-card vg-rise" key={t.n} style={{ transitionDelay: `${(i % 2) * 60}ms` } as CSS}>
                <p className="vg-quote">“{t.q}”</p>
                <div className="vg-qat"><span className="vg-mono vg-mono-sm">{t.n.split(" ").map((w) => w[0]).join("").slice(0, 2)}</span><div><div className="vg-qn">{t.n}</div><div className="vg-mut vg-mut-sm">{t.r}</div></div></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="vg-sec" id="narxlar">
        <div className="vg-wrap">
          <div className="vg-eye vg-rise">NARXLAR</div>
          <h2 className="vg-h2 vg-rise">Shaffof narxlar.</h2>
          <div className="vg-cats vg-rise">
            <button className={`vg-cat ${track === "soft" ? "on" : ""}`} onClick={() => setTrack("soft")}>Maxsus dasturiy ta'minot</button>
            <button className={`vg-cat ${track === "odoo" ? "on" : ""}`} onClick={() => setTrack("odoo")}>Odoo ERP &amp; AI</button>
          </div>
          <div className="vg-grid vg-grid3">
            {PRICING[track].map((p, i) => (
              <div className={`vg-price vg-rise ${p.feat ? "vg-price-feat" : ""}`} key={p.badge} style={{ transitionDelay: `${i * 60}ms` } as CSS}>
                {p.feat && <div className="vg-price-badge">KO'P TANLANADI</div>}
                <div className="vg-eye">{p.badge}</div>
                <div className="vg-price-n">{p.price}</div>
                <div className="vg-mut vg-mut-sm">{p.term}</div>
                <ul className="vg-price-list">{p.feats.map((f) => <li key={f}>{f}</li>)}</ul>
                <a href="#cta" className={`vg-pill vg-block ${p.feat ? "vg-pill-fill" : "vg-pill-ghost"}`}>Konsultatsiya</a>
              </div>
            ))}
          </div>
          <p className="vg-mut vg-center vg-note">Fixed-scope · yashirin to'lov yo'q · 4 hafta qo'llab-quvvatlash</p>
        </div>
      </section>

      {/* CREDENTIALS */}
      <section className="vg-sec vg-soft">
        <div className="vg-wrap">
          <div className="vg-eye vg-rise">ISHONCH VA TASDIQ</div>
          <h2 className="vg-h2 vg-rise">Rasmiy maqom va sertifikatlar.</h2>
          <div className="vg-grid vg-grid4">
            {CREDS.map((c, i) => (
              <div className="vg-card vg-cred vg-rise" key={c.name} style={{ transitionDelay: `${i * 50}ms` } as CSS}>
                <div className="vg-cred-img"><img src={c.img} alt={c.name} loading="lazy" /></div>
                <h3 className="vg-h3 vg-h3-sm">{c.name}</h3>
                <div className="vg-mut vg-mut-sm">{c.iss}</div>
                <div className={`vg-status ${c.ok ? "ok" : ""}`}>{c.ok ? "Tasdiqlangan" : "Kutilmoqda"}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="vg-sec">
        <div className="vg-wrap vg-faq-wrap">
          <div className="vg-eye vg-rise">SAVOL-JAVOB</div>
          <h2 className="vg-h2 vg-rise">Ko'p so'raladigan savollar.</h2>
          <div className="vg-faq vg-rise">
            {FAQ.map((f, i) => (
              <div className={`vg-faq-row ${open === i ? "open" : ""}`} key={f.q}>
                <button className="vg-faq-q" aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)}>
                  <span>{f.q}</span><span className="vg-faq-ic">+</span>
                </button>
                <div className="vg-faq-a"><p>{f.a}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="vg-cta" id="cta">
        <div className="vg-mesh vg-mesh-cta" aria-hidden="true" />
        <div className="vg-wrap vg-center">
          <div className="vg-eye vg-center vg-rise">TAYYORMISIZ?</div>
          <h2 className="vg-h1 vg-h1-cta vg-rise">Loyihangizni bugun boshlaymiz.</h2>
          <div className="vg-hero-btns vg-center vg-rise">
            <a href="https://t.me/muslimansoriy" className="vg-pill vg-pill-fill">Bepul konsultatsiya</a>
            <a href="https://t.me/muslimansoriy" className="vg-pill vg-pill-ghost">Telegram</a>
          </div>
          <p className="vg-mut vg-center vg-note vg-rise">+998 99 116 46 58 · t.me/muslimansoriy · Toshkent</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="vg-footer">
        <div className="vg-wrap vg-foot-in">
          <div className="vg-foot-brand">
            <div className="vg-word">▲ Empire</div>
            <p className="vg-mut">AI, custom software va Odoo ERP — g'oyadan tayyor mahsulotgacha.</p>
          </div>
          <div className="vg-foot-cols">
            <div><h4>Xizmatlar</h4><a href="#xizmatlar">Maxsus dasturiy ta'minot</a><a href="#xizmatlar">Odoo ERP &amp; AI</a><a href="#narxlar">Narxlar</a></div>
            <div><h4>Kompaniya</h4><a href="#loyihalar">Loyihalar</a><a href="#jarayon">Jarayon</a><a href="#sharhlar">Sharhlar</a><a href="#">Blog</a></div>
            <div><h4>Aloqa</h4><a href="mailto:muslimansoriy7@gmail.com">muslimansoriy7@gmail.com</a><a href="tel:+998991164658">+998 99 116 46 58</a><a href="https://t.me/muslimansoriy">Telegram</a><a href="https://instagram.com/empiregroup.uz">Instagram</a></div>
          </div>
        </div>
        <div className="vg-wrap vg-foot-bot">
          <span>© 2026 Empire Group. Barcha huquqlar himoyalangan.</span>
          <span>Toshkent · O'zbekiston</span>
        </div>
      </footer>
    </div>
  );
}

const CSS_STR = `
.vg{--ink:#171717;--body:#4d4d4d;--mute:#8f8f8f;--faint:#a1a1a1;--hair:#ebebeb;--hairsoft:#f2f2f2;--canvas:#fafafa;--white:#fff;--link:#0070f3;
  --sans:var(--font-geist-sans),Arial,sans-serif;--mono:var(--font-geist-mono),ui-monospace,SFMono-Regular,Menlo,monospace;
  background:var(--canvas);color:var(--ink);font-family:var(--sans);-webkit-font-smoothing:antialiased;overflow-x:clip;}
.vg *{box-sizing:border-box;}
.vg img{display:block;max-width:100%;}
.vg a{color:inherit;text-decoration:none;}
.vg-wrap{max-width:1200px;margin:0 auto;padding:0 24px;}
.vg-center{text-align:center;}

.vg-eye{font-family:var(--mono);font-size:12px;font-weight:500;letter-spacing:.04em;text-transform:uppercase;color:var(--mute);margin-bottom:16px;}
.vg-center.vg-eye{text-align:center;}
.vg-h1{font-family:var(--sans);font-weight:600;font-size:clamp(34px,5.4vw,56px);line-height:1.02;letter-spacing:-0.045em;margin:0 0 22px;}
.vg-h2{font-family:var(--sans);font-weight:600;font-size:clamp(26px,3.4vw,32px);line-height:1.1;letter-spacing:-0.03em;margin:0 0 14px;}
.vg-h3{font-family:var(--sans);font-weight:600;font-size:20px;line-height:1.25;letter-spacing:-0.02em;margin:10px 0 8px;}
.vg-h3-sm{font-size:16px;}
.vg-lead{font-size:17px;line-height:1.55;color:var(--body);max-width:600px;margin:0 0 30px;}
.vg-sub{font-size:16px;line-height:1.55;color:var(--body);max-width:620px;margin:0 0 36px;}
.vg-body{font-size:14px;line-height:1.55;color:var(--body);margin:0;}
.vg-mut{font-size:14px;color:var(--mute);line-height:1.5;}
.vg-mut-sm{font-size:13px;}
.vg-note{margin-top:28px;}
.vg-link{color:var(--link);font-size:14px;font-weight:500;}
.vg-link:hover{text-decoration:underline;}

/* nav */
.vg-nav{position:sticky;top:0;z-index:40;background:rgba(250,250,250,.8);backdrop-filter:saturate(180%) blur(12px);border-bottom:1px solid var(--hair);}
.vg-nav-in{display:flex;align-items:center;justify-content:space-between;height:60px;}
.vg-word{font-weight:600;font-size:16px;letter-spacing:-0.02em;}
.vg-nav-links{display:flex;gap:6px;}
.vg-nav-links a{font-size:14px;color:var(--body);padding:6px 12px;border-radius:9999px;}
.vg-nav-links a:hover{color:var(--ink);background:var(--hairsoft);}
.vg-nav-cta{display:flex;align-items:center;gap:8px;}
.vg .vg-sq{display:inline-flex;align-items:center;height:32px;padding:0 12px;border-radius:6px;font-family:var(--sans);font-size:14px;font-weight:500;border:1px solid transparent;transition:opacity .18s ease,background .18s ease;}
.vg .vg-sq-fill{background:var(--ink);color:#fff;}
.vg .vg-sq-fill:hover{opacity:.85;}
.vg .vg-sq-ghost{background:var(--white);color:var(--ink);border-color:var(--hair);}
.vg .vg-sq-ghost:hover{background:var(--hairsoft);}

/* pills */
.vg .vg-pill{display:inline-flex;align-items:center;justify-content:center;height:44px;padding:0 20px;border-radius:9999px;font-family:var(--sans);font-size:15px;font-weight:500;border:1px solid transparent;transition:transform .18s ease,opacity .18s ease,background .18s ease;white-space:nowrap;}
.vg .vg-pill-fill{background:var(--ink);color:#fff;}
.vg .vg-pill-fill:hover{transform:translateY(-1px);opacity:.9;}
.vg .vg-pill-ghost{background:var(--white);color:var(--ink);border-color:var(--hair);}
.vg .vg-pill-ghost:hover{transform:translateY(-1px);border-color:var(--ink);}
.vg .vg-block{width:100%;margin-top:22px;}

/* hero */
.vg-hero{position:relative;padding:100px 0 64px;overflow:hidden;text-align:center;}
.vg-hero-in{position:relative;z-index:2;}
.vg-hero .vg-eye{text-align:center;}
.vg-h1,.vg-lead{margin-left:auto;margin-right:auto;}
.vg-hero-btns{display:flex;gap:12px;flex-wrap:wrap;margin-bottom:48px;}
.vg-hero-btns.vg-center,.vg-hero .vg-hero-btns{justify-content:center;}
.vg-mesh{position:absolute;inset:-20% -10% auto -10%;height:640px;z-index:0;pointer-events:none;filter:blur(70px);opacity:.5;
  background:
    radial-gradient(40% 50% at 22% 40%,#00dfd8 0%,transparent 70%),
    radial-gradient(38% 48% at 42% 30%,#007cf0 0%,transparent 70%),
    radial-gradient(42% 52% at 60% 42%,#7928ca 0%,transparent 72%),
    radial-gradient(40% 48% at 74% 30%,#ff0080 0%,transparent 70%),
    radial-gradient(44% 54% at 86% 46%,#f9cb28 0%,transparent 72%);}
.vg-code{max-width:560px;margin:0 auto;text-align:left;background:var(--white);border:1px solid var(--hair);border-radius:12px;overflow:hidden;box-shadow:0 1px 1px rgba(0,0,0,.04);}
.vg-code-bar{display:flex;align-items:center;gap:6px;padding:10px 14px;border-bottom:1px solid var(--hair);font-family:var(--mono);font-size:12px;color:var(--mute);}
.vg-code-bar em{margin-left:8px;font-style:normal;}
.vg-code-bar .d{width:10px;height:10px;border-radius:9999px;background:var(--hair);}
.vg-code pre{margin:0;padding:16px;font-family:var(--mono);font-size:13px;line-height:1.9;color:var(--ink);white-space:pre-wrap;}
.vg-code pre > span{display:block;}
.c-key{color:#7928ca;}.c-str{color:#0070f3;}.c-ok{color:#00b37e;}.c-mut{color:var(--mute);}

/* logo strip */
.vg-strip{padding:44px 0;border-bottom:1px solid var(--hair);}
.vg-logos{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:44px;margin-top:12px;}
.vg-logos img{max-height:28px;width:auto;filter:grayscale(1);opacity:.5;transition:opacity .3s ease;}
.vg-logos img:hover{opacity:1;}

/* sections */
.vg-sec{padding:88px 0;}
.vg-soft{background:var(--hairsoft);}

/* cards */
.vg-card{background:var(--white);border:1px solid var(--hair);border-radius:12px;padding:24px;transition:border-color .2s ease,transform .2s ease,box-shadow .2s ease;}
.vg-card:hover{border-color:#d6d6d6;transform:translateY(-2px);box-shadow:0 1px 1px rgba(0,0,0,.04);}
.vg-grid{display:grid;gap:20px;margin-top:32px;}
.vg-grid2{grid-template-columns:1fr 1fr;}
.vg-grid3{grid-template-columns:repeat(3,1fr);}
.vg-grid4{grid-template-columns:repeat(4,1fr);}
.vg-gbar{height:4px;width:44px;border-radius:9999px;margin-bottom:16px;}

/* tags */
.vg-tagrow{display:flex;flex-wrap:wrap;gap:6px;margin-top:16px;}
.vg-tag{font-size:12px;color:var(--body);background:var(--canvas);border:1px solid var(--hair);border-radius:9999px;padding:3px 10px;}

/* stat */
.vg-stat{text-align:left;}
.vg-stat-n{font-family:var(--sans);font-weight:600;font-size:40px;letter-spacing:-0.04em;line-height:1;margin-bottom:8px;}

/* process flow */
.vg-flow{display:flex;align-items:stretch;gap:0;margin-top:32px;flex-wrap:wrap;}
.vg-node{display:flex;align-items:center;flex:1;min-width:200px;}
.vg-node-card{flex:1;}
.vg-node-n{font-family:var(--mono);font-size:12px;color:var(--link);margin-bottom:6px;}
.vg-conn{color:var(--faint);font-size:20px;padding:0 12px;flex:0 0 auto;}

/* case */
.vg-case-img{border:1px solid var(--hair);border-radius:8px;overflow:hidden;background:var(--white);aspect-ratio:16/10;margin-bottom:16px;}
.vg-case-img img{width:100%;height:100%;object-fit:cover;object-position:top;transition:transform .5s ease;}
.vg-case:hover .vg-case-img img{transform:scale(1.03);}

/* chips */
.vg-chips{display:flex;flex-wrap:wrap;gap:10px;margin-top:28px;}
.vg-chip{display:inline-flex;align-items:center;gap:9px;padding:9px 15px;border:1px solid var(--hair);border-radius:9999px;background:var(--white);color:var(--mute);font-size:13px;font-weight:500;transition:color .2s ease,border-color .2s ease;}
.vg-chip:hover{color:var(--ink);border-color:#d6d6d6;}
.vg-chip-plain{background:transparent;}

/* member / testi */
.vg-mphoto{width:48px;height:48px;border-radius:9999px;object-fit:cover;filter:grayscale(1);margin-bottom:6px;}
.vg-mono{display:inline-flex;align-items:center;justify-content:center;width:48px;height:48px;border-radius:9999px;background:var(--ink);color:#fff;font-weight:600;font-size:16px;margin-bottom:6px;}
.vg-mono-sm{width:40px;height:40px;font-size:14px;margin:0;}
.vg-quote{font-size:17px;line-height:1.5;color:var(--ink);margin:0 0 20px;letter-spacing:-0.01em;}
.vg-qat{display:flex;align-items:center;gap:12px;}
.vg-qn{font-size:14px;font-weight:600;}

/* pricing */
.vg-cats{display:inline-flex;gap:6px;margin-top:24px;margin-bottom:8px;}
.vg-cat{border:1px solid var(--hair);background:var(--white);color:var(--body);font-family:var(--sans);font-size:14px;font-weight:500;padding:8px 16px;border-radius:64px;cursor:pointer;transition:all .2s ease;}
.vg-cat.on{background:var(--ink);color:#fff;border-color:var(--ink);}
.vg-price{position:relative;background:var(--white);border:1px solid var(--hair);border-radius:16px;padding:32px;display:flex;flex-direction:column;}
.vg-price-feat{border-color:var(--ink);box-shadow:0 0 0 1px var(--ink);}
.vg-price-badge{position:absolute;top:-11px;left:32px;background:var(--ink);color:#fff;font-family:var(--mono);font-size:11px;padding:3px 10px;border-radius:9999px;}
.vg-price-n{font-family:var(--sans);font-weight:600;font-size:34px;letter-spacing:-0.03em;margin:10px 0 2px;}
.vg-price-list{list-style:none;padding:0;margin:20px 0 0;flex:1;}
.vg-price-list li{font-size:14px;color:var(--body);padding:8px 0;border-top:1px solid var(--hair);padding-left:22px;position:relative;}
.vg-price-list li::before{content:"✓";position:absolute;left:0;color:var(--link);font-size:13px;}

/* cred */
.vg-cred-img{background:var(--canvas);border:1px solid var(--hair);border-radius:8px;height:86px;display:flex;align-items:center;justify-content:center;padding:14px;margin-bottom:14px;}
.vg-cred-img img{max-height:54px;width:auto;object-fit:contain;}
.vg-status{font-size:12px;font-family:var(--mono);color:var(--mute);margin-top:10px;text-transform:uppercase;}
.vg-status.ok{color:#00b37e;}
.vg-status.ok::before{content:"● ";}

/* faq */
.vg-faq-wrap{max-width:820px;}
.vg-faq{margin-top:24px;border-top:1px solid var(--hair);}
.vg-faq-row{border-bottom:1px solid var(--hair);}
.vg-faq-q{width:100%;display:flex;align-items:center;justify-content:space-between;gap:16px;background:transparent;border:0;cursor:pointer;padding:22px 0;font-family:var(--sans);font-size:16px;font-weight:500;color:var(--ink);text-align:left;letter-spacing:-0.01em;}
.vg-faq-ic{font-size:20px;color:var(--mute);transition:transform .3s ease;flex:0 0 auto;}
.vg-faq-row.open .vg-faq-ic{transform:rotate(45deg);}
.vg-faq-a{max-height:0;overflow:hidden;transition:max-height .35s ease;}
.vg-faq-row.open .vg-faq-a{max-height:220px;}
.vg-faq-a p{font-size:14px;line-height:1.6;color:var(--body);margin:0 0 22px;max-width:680px;}

/* cta */
.vg-cta{position:relative;padding:96px 0;overflow:hidden;text-align:center;border-top:1px solid var(--hair);}
.vg-mesh-cta{inset:auto -10% -30% -10%;height:520px;opacity:.4;}
.vg-h1-cta{margin-bottom:32px;}

/* footer */
.vg-footer{border-top:1px solid var(--hair);padding:64px 0 40px;background:var(--canvas);}
.vg-foot-in{display:flex;justify-content:space-between;gap:48px;flex-wrap:wrap;}
.vg-foot-brand{max-width:300px;}
.vg-foot-brand .vg-mut{margin-top:12px;}
.vg-foot-cols{display:flex;gap:64px;flex-wrap:wrap;}
.vg-foot-cols h4{font-size:13px;font-weight:600;margin:0 0 14px;}
.vg-foot-cols a{display:block;font-size:14px;color:var(--body);padding:5px 0;}
.vg-foot-cols a:hover{color:var(--ink);}
.vg-foot-bot{display:flex;justify-content:space-between;gap:16px;flex-wrap:wrap;margin-top:48px;padding-top:24px;border-top:1px solid var(--hair);font-size:13px;color:var(--mute);}

/* reveal */
.vg .vg-rise{opacity:1;transform:translateY(16px);transition:opacity .6s cubic-bezier(.16,1,.3,1),transform .6s cubic-bezier(.16,1,.3,1);}
.vg .vg-rise.in{transform:none;}

/* responsive */
@media(max-width:1000px){.vg-grid4{grid-template-columns:repeat(2,1fr);}.vg-grid3{grid-template-columns:1fr;}.vg-nav-links{display:none;}}
@media(max-width:820px){.vg-grid2{grid-template-columns:1fr;}.vg-flow{flex-direction:column;}.vg-node{width:100%;}.vg-conn{transform:rotate(90deg);padding:8px 0;}.vg-foot-in{flex-direction:column;}}
@media(max-width:560px){.vg-grid4{grid-template-columns:1fr;}}
@media(prefers-reduced-motion:reduce){.vg .vg-rise{transition:none;transform:none;}.vg-case:hover .vg-case-img img{transform:none;}}
`;
