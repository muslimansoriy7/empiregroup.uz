"use client";

import { useEffect, useRef, useState } from "react";
import { toolLogos, brandLogos } from "@/content/logos";

/* ============================================================
   Empire Group — Ventriloc editorial-data homepage (v5)
   Editorial data observatory on warm paper. 95% achromatic,
   one rationed ember accent. PolySans-400 whisper headings,
   coded data dashboard cards, asymmetric 6px 0 0 0 cards,
   three-radius system, warm white/ash/ivory bands, no shadows.
   ============================================================ */

type Item = { title: string; path?: string; custom?: string };

const STACK_TITLES = [
  "React", "Next.js", "TypeScript", "JavaScript", "Node.js", "Python",
  "Flutter", "Tailwind CSS", "PostgreSQL", "Docker", "Supabase", "Git",
];
const BRAND_TITLES = [
  "Google", "Meta", "Stripe", "Figma", "Cloudflare",
  "GitHub", "Notion", "Vercel", "Apple", "Telegram",
];

const pick = (arr: Item[], titles: string[]) =>
  titles
    .map((t) => arr.find((x) => x.title === t))
    .filter((x): x is Item => !!x && !x.custom && !!x.path);

const stack = pick(toolLogos as Item[], STACK_TITLES);
const brands = pick(brandLogos as Item[], BRAND_TITLES);

const clientLogos = [
  { src: "/logos/motorlux.png", alt: "Motor Lux" },
  { src: "/logos/medflow.png", alt: "MedFlow" },
  { src: "/logos/grandosiyo.png", alt: "Grand Osiyo Textile" },
  { src: "/logos/texnika.png", alt: "Texnika Ijara" },
  { src: "/logos/gadgetspace.png", alt: "GadgetSpace" },
  { src: "/logos/xwear.png", alt: "X Wear" },
  { src: "/logos/hilol.png", alt: "Hilol Market" },
];

const cases = [
  { seg: "Avtomobil · CRM", title: "Motor Lux — CRM va savdo boshqaruvi", desc: "Servis va savdo jarayonlari yagona panelda birlashtirildi.", result: "Savdo va mijozlar bitta tizimda", tags: ["CRM", "Web"], img: "/cases/case-autoservice-desktop.webp", url: "motorlux.uz" },
  { seg: "Tibbiyot · CRM (PWA)", title: "MedFlow — klinika CRM va bemor qabuli", desc: "Bemor qabuli va navbat elektron tarzda boshqariladi.", result: "Qabul boshqaruvi 3× tezlashdi", tags: ["PWA", "CRM"], img: "/cases/case-medflow-desktop.webp", url: "medflow.uz" },
  { seg: "To'qimachilik · ERP", title: "Grand Osiyo Textile — ERP va ombor tizimi", desc: "Ishlab chiqarish va ombor real vaqtda kuzatiladi.", result: "Ombor real vaqtda boshqariladi", tags: ["ERP", "Ombor"], img: "/cases/case-textile-desktop.webp", url: "grandosiyo.uz" },
  { seg: "Ijara · Katalog", title: "Texnika Ijara — ijara va katalog sayti", desc: "Onlayn katalog va bron qilish tizimi qurildi.", result: "Onlayn bronlar 3× oshdi", tags: ["Web", "Katalog"], img: "/cases/case-texnika-desktop.webp", url: "texnika-ijara.uz" },
  { seg: "Elektronika · E-commerce", title: "GadgetSpace — onlayn elektronika do'koni", desc: "To'liq elektron tijorat platformasi ishga tushirildi.", result: "Konversiya 2.1× oshdi", tags: ["E-commerce"], img: "/cases/case-gadgetspace-desktop.webp", url: "gadgetspace.uz" },
  { seg: "Moda · E-commerce", title: "X Wear — kiyim brendi uchun do'kon", desc: "Brend uchun zamonaviy onlayn do'kon yaratildi.", result: "O'rtacha chek 28% oshdi", tags: ["E-commerce", "Web"], img: "/cases/case-xwear-desktop.webp", url: "xwear.uz" },
  { seg: "Savdo · POS", title: "Hilol Market — savdo avtomatlashtirish", desc: "Kassa va hisob-kitob to'liq avtomatlashtirildi.", result: "Hisob-kitob 2× tezlashdi", tags: ["Retail", "POS"], img: "/cases/case-kassa-desktop.webp", url: "hilolmarket.uz" },
];

const steps = [
  { n: "01", t: "Explore", d: "G'oya va muammoni chuqur o'rganamiz.", tags: ["Tahlil", "Audit"] },
  { n: "02", t: "Plan", d: "PRD, TZ, arxitektura, dizayn; muddat va byudjet aniq.", tags: ["PRD", "TZ", "Dizayn"] },
  { n: "03", t: "Build", d: "Kod, test, integratsiya; sprintlar, demo.", tags: ["Dev", "Test", "Demo"] },
  { n: "04", t: "Commit", d: "Ishga tushirish va uzoq muddatli qo'llab-quvvatlash.", tags: ["Deploy", "Support"] },
];

const team = [
  { name: "Muslim Ansoriy", role: "Ta'sischi va CEO · Technical Product Manager", bio: "7+ yil IT va biznes-avtomatlashtirish; Odoo ERP Partner Manager (Markaziy Osiyo/Kavkaz); 20+ ERP loyiha.", img: "/founder.webp" },
  { name: "Abbos Jo'rayev", role: "Hammuassis va COO", bio: "6+ yil IT loyiha boshqaruvi." },
  { name: "Sardor Rahmatullayev", role: "Senior Odoo Developer", bio: "5 yil Python/Odoo; 30+ modul; REST/XML-RPC." },
  { name: "Dilnoza Yusupova", role: "Biznes-analitik · ERP Consultant", bio: "4 yil biznes-tahlil; AS-IS/TO-BE." },
  { name: "Jasurbek Toshmatov", role: "Full-stack Developer", bio: "5 yil web/mobil; React, Next.js, Node.js." },
  { name: "Nilufar Karimova", role: "Digital Marketing Lead", bio: "6 yil marketing; SEO, lead gen." },
  { name: "Bekzod Ergashev", role: "DevOps · SysAdmin", bio: "4 yil infratuzilma; Linux, Docker, CI/CD." },
  { name: "Malika Sobirova", role: "UI/UX Designer", bio: "4 yil interfeys dizayni; Figma." },
];

const testimonials = [
  { quote: ["Empire Group eski qog'ozdagi ishimizni to'liq tizimga o'tkazdi — ", "vaqt ancha tejaldi", "."], name: "Aliya M.", role: "Motor Lux · CRM" },
  { quote: ["Empire bilan ishlash oson bo'ldi, ", "muddat va byudjet aniq", " edi."], name: "Jasur T.", role: "GadgetSpace · E-commerce" },
  { quote: ["Klinika ishini ", "AI qo'shib avtomatlashtirdi", ". Qabul ancha tartibli."], name: "Doniyor R.", role: "MedFlow · klinika" },
  { quote: ["Zamonaviy dizayn, ", "savdo hajmi ko'tarildi", "."], name: "Laziza K.", role: "X Wear · e-commerce" },
];

type Tier = { badge: string; price: string; term: string; note: string; feats: string[]; featured?: boolean };
const pricing: Record<"soft" | "odoo", Tier[]> = {
  soft: [
    { badge: "STANDARD", price: "$5,000 dan", term: "2–3 oy", note: "MVP: landing + forma yoki kichik ilova.", feats: ["1 platforma", "Asosiy funksiyalar", "Responsive dizayn", "Ishga tushirish"] },
    { badge: "ADVANCED", price: "$15K–$40K", term: "4–6 oy", note: "To'liq ilova, CRM integratsiya, admin, API.", feats: ["To'liq ilova", "CRM integratsiya", "Admin panel", "API va integratsiyalar", "Kengaytirilgan qo'llab-quvvatlash"], featured: true },
    { badge: "MEGA", price: "$50,000+", term: "6–12 oy", note: "Yirik ekotizim, mikroxizmatlar.", feats: ["Mikroxizmat arxitektura", "Yuqori yuklama", "Maxsus integratsiyalar", "Doimiy hamkorlik"] },
  ],
  odoo: [
    { badge: "STANDARD", price: "$8,800 dan", term: "2–3 oy", note: "Asosiy modullar va joriy qilish.", feats: ["Asosiy Odoo modullar", "Sozlash va migratsiya", "O'qitish", "Ishga tushirish"] },
    { badge: "ADVANCED", price: "$25K–$35K", term: "4–6 oy", note: "To'liq ERP, AI avtomatlashtirish.", feats: ["To'liq ERP qamrovi", "AI avtomatlashtirish", "Maxsus modullar", "Integratsiyalar", "Kengaytirilgan qo'llab-quvvatlash"], featured: true },
    { badge: "MEGA", price: "$85,000+", term: "~1 yil", note: "Korporativ miqyos, ko'p filial.", feats: ["Ko'p filial / kompaniya", "Predictive Analytics", "Maxsus arxitektura", "Doimiy hamkorlik"] },
  ],
};

const creds = [
  { title: "Odoo Learning Partner", org: "Odoo S.A.", img: "/sertifikat/odoo-learning-partner.svg", status: "Tasdiqlangan", active: true },
  { title: "Davlat ro'yxatidan o'tganlik guvohnomasi", org: "\"EMPIRE GROUP CORP\" MCHJ", img: "/sertifikat/davlat-royxat-guvohnomasi.png", status: "Tasdiqlangan", active: true },
  { title: "IT Park rezidenti", org: "IT Park O'zbekiston", img: "/sertifikat/it-park.svg", status: "Kutilmoqda", active: false },
  { title: "ISO/IEC 27001", org: "Axborot xavfsizligi standarti", img: "/sertifikat/iso-27001.svg", status: "Kutilmoqda", active: false },
];

const faqs = [
  { q: "Loyiha qancha vaqt oladi?", a: "Kichik MVP 3–4 hafta, o'rtacha 2–3 oy, yirik 4–6 oy. Aniq muddat Explore bosqichida belgilanadi." },
  { q: "Narx qanday hisoblanadi?", a: "Fixed-scope: loyiha hajmi aniqlangach aniq narx beriladi. Yashirin xarajat yo'q. Paketlar $5,000 dan boshlanadi." },
  { q: "Narxlar nega farq qiladi?", a: "Murakkablik, integratsiyalar va muddatga bog'liq." },
  { q: "Ishlab bo'lgach yordam beramizmi?", a: "Ha, qo'llab-quvvatlash, tuzatish va rivojlantirish davom etadi." },
  { q: "To'lov qanday?", a: "Bosqichma-bosqich: oldindan qism, keyin sprint natijalariga qarab." },
  { q: "Kod kimga tegishli?", a: "Barchasi sizga. Vendor lock-in yo'q." },
  { q: "Mavjud tizimni davom ettira olasizmi?", a: "Ha, ko'rib chiqib davom ettiramiz yoki qayta quramiz." },
  { q: "Konsultatsiya bepulmi?", a: "Ha. Explore bosqichida barcha savolga javob beramiz — majburiyatsiz." },
];

const nav = [
  { label: "Xizmatlar", href: "#xizmatlar" },
  { label: "Jarayon", href: "#jarayon" },
  { label: "Loyihalar", href: "#loyihalar" },
  { label: "Sharhlar", href: "#sharhlar" },
  { label: "Narxlar", href: "#narxlar" },
  { label: "Blog", href: "#blog" },
];

function monogram(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("");
}

/* Thin-stroke monoline icons (graphite, currentColor) */
const icons: Record<string, React.ReactNode> = {
  mobile: <><rect x="7" y="2.5" width="10" height="19" rx="2" /><line x1="10.5" y1="18.5" x2="13.5" y2="18.5" /></>,
  api: <><path d="M8 7 3 12l5 5" /><path d="m16 7 5 5-5 5" /><line x1="13.5" y1="5" x2="10.5" y2="19" /></>,
  chart: <><path d="M4 20V4" /><path d="M4 20h16" /><path d="m7 15 3-4 3 2 4-6" /></>,
  cloud: <><path d="M7 18a4 4 0 0 1-.5-7.97A5.5 5.5 0 0 1 17 9.5a3.5 3.5 0 0 1 .5 6.98" /><path d="M12 12v6" /><path d="m9.5 14.5 2.5-2.5 2.5 2.5" /></>,
};

export default function V5Page() {
  const [track, setTrack] = useState<"soft" | "odoo">("soft");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [scrolled, setScrolled] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const els = Array.from(root.querySelectorAll<HTMLElement>(".vt-rise"));
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
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
    );
    els.forEach((el) => io.observe(el));
    // rAF mount pass — reveal anything already in view (above-the-fold safe)
    const raf = requestAnimationFrame(() => {
      const vh = window.innerHeight;
      els.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < vh * 0.95) el.classList.add("in");
      });
    });
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const rise = (delay = 0): React.CSSProperties => ({ transitionDelay: `${delay}ms` });

  return (
    <div className="vt" ref={rootRef}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500&family=Inter:wght@400;500;600&display=swap"
      />

      <style
        dangerouslySetInnerHTML={{
          __html: `
.vt{
  --graphite:#202020; --white:#ffffff; --ash:#efefef; --fog:#f5f5f5;
  --ivory:#ebe6dd; --steel:#4d4d4d; --slate:#828282; --mist:#e8e8e8;
  --ember:#ff682c; --brass:#816729;
  --poly:'Space Grotesk',ui-sans-serif,system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;
  --inter:'Inter',ui-sans-serif,system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;
  font-family:var(--inter);
  color:var(--graphite);
  background:var(--white);
  -webkit-font-smoothing:antialiased;
  max-width:100%;
}
.vt *{box-sizing:border-box; min-width:0;}
.vt a{color:inherit; text-decoration:none;}
.vt img{max-width:100%; display:block;}

/* Typography */
.vt .poly{font-family:var(--poly); font-weight:400; letter-spacing:-0.02em;}
.vt .display{font-family:var(--poly); font-weight:400; letter-spacing:-1.32px; font-size:66px; line-height:0.91;}
.vt .h-lg{font-family:var(--poly); font-weight:400; letter-spacing:-0.8px; font-size:40px; line-height:1.08;}
.vt .h{font-family:var(--poly); font-weight:400; letter-spacing:-0.64px; font-size:32px; line-height:1.12;}
.vt .h-sm{font-family:var(--poly); font-weight:400; letter-spacing:-0.02em; font-size:18px; line-height:1.2;}
.vt .lead{font-family:var(--inter); font-weight:400; font-size:18px; line-height:1.5; color:var(--steel);}
.vt p{margin:0;}

/* Layout */
.vt .wrap{max-width:1200px; margin:0 auto; padding:0 24px;}
.vt section{padding:96px 0;}
.vt .band-white{background:var(--white);}
.vt .band-ash{background:var(--ash);}
.vt .band-ivory{background:var(--ivory);}
.vt .sec-head{max-width:680px; margin-bottom:56px;}
.vt .sec-head .lead{margin-top:18px;}
.vt .eyebrow{font-family:var(--poly); font-weight:400; letter-spacing:0.02em; font-size:13px; color:var(--brass); text-transform:uppercase; margin-bottom:20px;}

/* Reveal */
.vt .vt-rise{opacity:1; transform:translateY(16px);
  transition:opacity .6s cubic-bezier(.16,1,.3,1), transform .6s cubic-bezier(.16,1,.3,1);}
.vt .vt-rise.in{transform:none;}
@media (prefers-reduced-motion: reduce){
  .vt .vt-rise{transform:none; transition:none;}
  .vt [data-float]{animation:none !important;}
}

/* Buttons — 0px corners, PolySans 400 */
.vt .btn{font-family:var(--poly); font-weight:400; letter-spacing:-0.02em; font-size:16px;
  line-height:1; padding:12px 22px; border-radius:0; cursor:pointer; display:inline-flex;
  align-items:center; gap:8px; border:1px solid transparent; transition:opacity .2s, background .2s;}
.vt .btn-filled{background:var(--graphite); color:var(--white); border-color:var(--graphite);}
.vt .btn-filled:hover{opacity:.86;}
.vt .btn-ghost{background:transparent; color:var(--graphite); border-color:var(--graphite);}
.vt .btn-ghost:hover{background:var(--graphite); color:var(--white);}

/* Nav */
.vt .nav{position:sticky; top:0; z-index:50; padding:18px 0; transition:padding .25s, background .25s;}
.vt .nav.scrolled{padding:10px 0; background:rgba(255,255,255,.82); backdrop-filter:blur(8px);}
.vt .nav-inner{display:flex; align-items:center; justify-content:space-between; gap:16px;}
.vt .brand{font-family:var(--poly); font-weight:400; letter-spacing:-0.03em; font-size:24px; color:var(--graphite);}
.vt .nav-pill{display:flex; align-items:center; gap:26px; background:var(--ash);
  border-radius:200px; padding:9px 22px;}
.vt .nav-pill a{font-family:var(--poly); font-weight:400; letter-spacing:-0.02em; font-size:16px;
  color:var(--graphite); transition:color .2s;}
.vt .nav-pill a:hover{color:var(--ember);}
.vt .nav-cta{white-space:nowrap;}
.vt .nav-burger{display:none;}

/* Hero */
.vt .hero{padding:56px 0 104px;}
.vt .hero-grid{display:grid; grid-template-columns:1.05fr .95fr; gap:56px; align-items:center;}
.vt .hero h1{margin:0 0 26px;}
.vt .hero-ctas{display:flex; gap:14px; margin-top:34px; flex-wrap:wrap;}
.vt .hero-stage{position:relative; min-height:460px;}
@keyframes floaty{0%,100%{transform:translateY(0)}50%{transform:translateY(-9px)}}

/* Data cards */
.vt .dcard{background:var(--white); border-radius:20px; border:1px solid var(--mist); padding:24px;}
.vt .dcard-title{font-family:var(--poly); font-weight:400; letter-spacing:-0.02em; font-size:15px; color:var(--graphite);}
.vt .card-rev{position:absolute; top:0; left:0; width:320px; max-width:100%;}
.vt .card-stat{position:absolute; top:196px; left:34px; width:230px; transform:rotate(-2.5deg);}
.vt .card-ring{position:absolute; top:150px; right:0; width:200px;}
.vt .card-rev[data-float]{animation:floaty 7s ease-in-out infinite;}
.vt .card-ring[data-float]{animation:floaty 6s ease-in-out .8s infinite;}
.vt .big-num{font-family:var(--poly); font-weight:400; letter-spacing:-0.04em; font-size:44px; line-height:1; color:var(--graphite);}
.vt .num-ember{color:var(--ember);}
.vt .cap{font-family:var(--inter); font-size:13px; color:var(--slate);}
.vt .pill-tag{font-family:var(--inter); font-size:12px; color:var(--ember); background:var(--fog);
  border-radius:20px; padding:3px 10px;}

/* Logo strip */
.vt .logo-cap{font-family:var(--poly); font-weight:400; letter-spacing:-0.02em; font-size:13px; color:var(--brass); margin-bottom:26px;}
.vt .logo-row{display:flex; flex-wrap:wrap; align-items:center; gap:36px 44px;}
.vt .logo-row img{height:30px; width:auto; filter:grayscale(1); opacity:.62; transition:opacity .25s;}
.vt .logo-row img:hover{opacity:1;}

/* Cards */
.vt .card{background:var(--white); border-radius:8px; border:1px solid var(--mist); padding:32px;}
.vt .asym{background:var(--ash); border-radius:6px 0 0 0; padding:40px; border:none;}
.vt .tag{font-family:var(--inter); font-size:12px; color:var(--brass); background:var(--white);
  border:1px solid var(--mist); border-radius:20px; padding:4px 12px; display:inline-block;}
.vt .band-ash .tag{background:var(--white);}
.vt .link-ember{font-family:var(--inter); font-weight:500; font-size:14px; color:var(--graphite);
  border-bottom:1px solid var(--ember); padding-bottom:2px; display:inline-block; transition:color .2s;}
.vt .link-ember:hover{color:var(--ember);}
.vt .em{color:var(--ember);}
.vt .icon{width:26px; height:26px; stroke:var(--graphite); stroke-width:1.4; fill:none;
  stroke-linecap:round; stroke-linejoin:round;}

.vt .grid-2{display:grid; grid-template-columns:1fr 1fr; gap:24px;}
.vt .grid-3{display:grid; grid-template-columns:repeat(3,1fr); gap:24px;}
.vt .grid-4{display:grid; grid-template-columns:repeat(4,1fr); gap:24px;}

/* Services capability cards */
.vt .cap-card{background:var(--white); border-radius:8px; border:1px solid var(--mist); padding:26px;}
.vt .cap-card .icon{margin-bottom:16px;}

/* Metrics */
.vt .stat-card{background:var(--white); border-radius:20px; border:1px solid var(--mist); padding:32px;}
.vt .stat-num{font-family:var(--poly); font-weight:400; letter-spacing:-0.04em; font-size:52px; line-height:1; color:var(--graphite);}
.vt .stat-label{font-family:var(--inter); font-size:14px; color:var(--steel); margin-top:12px;}

/* Portfolio */
.vt .case-frame{aspect-ratio:16/10; border-radius:8px; overflow:hidden; background:var(--fog); border:1px solid var(--mist); margin-bottom:20px;}
.vt .case-frame img{width:100%; height:100%; object-fit:cover; object-position:top;}
.vt .case-meta{font-family:var(--inter); font-size:13px; color:var(--slate); text-transform:uppercase; letter-spacing:0.03em; margin-bottom:12px;}
.vt .case-result{font-family:var(--inter); font-weight:500; font-size:15px; color:var(--ember); margin:14px 0 16px;}
.vt .tag-row{display:flex; flex-wrap:wrap; gap:8px; margin-bottom:18px;}

/* Process */
.vt .step{border-top:1px solid var(--mist); padding-top:22px;}
.vt .step-num{font-family:var(--poly); font-weight:400; letter-spacing:-0.02em; font-size:15px; color:var(--ember); margin-bottom:18px;}
.vt .step h3{margin:0 0 12px;}

/* Stack / partners grid */
.vt .logo-grid{display:grid; grid-template-columns:repeat(6,1fr); gap:18px;}
.vt .logo-cell{background:var(--white); border:1px solid var(--mist); border-radius:8px;
  padding:22px 14px; display:flex; flex-direction:column; align-items:center; gap:12px; color:var(--slate); transition:color .2s;}
.vt .band-ash .logo-cell{background:var(--white);}
.vt .logo-cell:hover{color:var(--graphite);}
.vt .logo-cell svg{width:30px; height:30px;}
.vt .logo-cell span{font-family:var(--inter); font-size:13px; color:var(--steel);}

/* Team */
.vt .member{background:var(--white); border-radius:8px; border:1px solid var(--mist); overflow:hidden;}
.vt .member-portrait{aspect-ratio:1/1; background:var(--graphite); display:flex; align-items:center; justify-content:center;}
.vt .member-portrait img{width:100%; height:100%; object-fit:cover; filter:grayscale(1); border-radius:8px 8px 0 0;}
.vt .member-mono{font-family:var(--poly); font-weight:400; letter-spacing:-0.02em; font-size:40px; color:var(--white);}
.vt .member-body{padding:20px;}
.vt .member-name{font-family:var(--poly); font-weight:400; letter-spacing:-0.02em; font-size:18px;}
.vt .member-role{font-family:var(--inter); font-size:13px; color:var(--slate); margin:6px 0 12px;}
.vt .member-bio{font-family:var(--inter); font-size:13px; line-height:1.5; color:var(--steel);}

/* Testimonials */
.vt .quote-card{background:var(--white); border:1px solid var(--mist); border-radius:8px; padding:32px; display:flex; flex-direction:column; gap:24px;}
.vt .quote-card.ivory{background:var(--ivory); border-color:transparent;}
.vt .quote-text{font-family:var(--inter); font-size:18px; line-height:1.5; color:var(--steel);}
.vt .quote-foot{display:flex; align-items:center; gap:14px; margin-top:auto;}
.vt .avatar{width:44px; height:44px; border-radius:50%; background:var(--graphite); color:var(--white);
  display:flex; align-items:center; justify-content:center; font-family:var(--poly); font-weight:400; font-size:15px; letter-spacing:-0.02em; flex:0 0 auto;}

/* Pricing */
.vt .toggle{display:inline-flex; background:var(--white); border:1px solid var(--mist); border-radius:200px; padding:5px; margin-bottom:44px;}
.vt .toggle button{font-family:var(--poly); font-weight:400; letter-spacing:-0.02em; font-size:15px;
  padding:9px 20px; border:none; background:transparent; border-radius:200px; cursor:pointer; color:var(--slate); transition:.2s;}
.vt .toggle button.active{background:var(--graphite); color:var(--white);}
.vt .tier{background:var(--white); border:1px solid var(--mist); border-radius:8px; padding:30px; display:flex; flex-direction:column;}
.vt .tier.featured{background:var(--ivory); border-color:transparent;}
.vt .tier-line{height:2px; width:40px; background:var(--mist); margin:0 0 20px;}
.vt .tier.featured .tier-line{background:var(--ember);}
.vt .tier-badge{font-family:var(--poly); font-weight:400; letter-spacing:0.04em; font-size:13px; color:var(--slate); text-transform:uppercase;}
.vt .tier-price{font-family:var(--poly); font-weight:400; letter-spacing:-0.03em; font-size:34px; line-height:1.05; margin:14px 0 4px;}
.vt .tier-term{font-family:var(--inter); font-size:13px; color:var(--slate);}
.vt .tier-note{font-family:var(--inter); font-size:14px; line-height:1.5; color:var(--steel); margin:16px 0 20px;}
.vt .feats{list-style:none; padding:0; margin:0 0 26px; display:flex; flex-direction:column; gap:11px;}
.vt .feats li{font-family:var(--inter); font-size:14px; color:var(--steel); display:flex; gap:10px; align-items:flex-start;}
.vt .feats li .fk{color:var(--ember); flex:0 0 auto; line-height:1.45;}
.vt .tier .btn{margin-top:auto; justify-content:center; width:100%;}
.vt .price-cap{font-family:var(--inter); font-size:14px; color:var(--slate); margin-top:32px; text-align:center;}

/* Credentials */
.vt .cred{background:var(--white); border:1px solid var(--mist); border-radius:8px; padding:24px; display:flex; flex-direction:column; gap:16px;}
.vt .cred-frame{height:88px; display:flex; align-items:center; justify-content:flex-start;}
.vt .cred-frame img{max-height:72px; width:auto; object-fit:contain;}
.vt .cred-title{font-family:var(--poly); font-weight:400; letter-spacing:-0.02em; font-size:16px; line-height:1.2;}
.vt .cred-org{font-family:var(--inter); font-size:13px; color:var(--slate); margin-top:6px;}
.vt .cred-status{font-family:var(--inter); font-size:13px; color:var(--steel); display:flex; align-items:center; gap:8px; margin-top:auto;}
.vt .dot{width:8px; height:8px; border-radius:50%; flex:0 0 auto;}
.vt .dot-active{background:var(--ember);}
.vt .dot-pending{background:var(--slate);}

/* FAQ */
.vt .faq-item{border-bottom:1px solid var(--mist);}
.vt .faq-q{width:100%; text-align:left; background:none; border:none; cursor:pointer; padding:22px 0;
  display:flex; justify-content:space-between; gap:20px; align-items:center;
  font-family:var(--poly); font-weight:400; letter-spacing:-0.02em; font-size:18px; color:var(--graphite);}
.vt .faq-sign{flex:0 0 auto; width:22px; height:22px; position:relative; transition:transform .3s;}
.vt .faq-sign::before,.vt .faq-sign::after{content:""; position:absolute; background:var(--graphite); border-radius:2px;}
.vt .faq-sign::before{top:10px; left:2px; width:18px; height:2px;}
.vt .faq-sign::after{left:10px; top:2px; width:2px; height:18px; transition:opacity .3s;}
.vt .faq-item.open .faq-sign{transform:rotate(90deg);}
.vt .faq-item.open .faq-sign::after{opacity:0;}
.vt .faq-a{overflow:hidden; max-height:0; transition:max-height .35s ease;}
.vt .faq-item.open .faq-a{max-height:260px;}
.vt .faq-a p{font-family:var(--inter); font-size:15px; line-height:1.55; color:var(--steel); padding:0 40px 24px 0;}

/* Final CTA */
.vt .cta-inner{max-width:760px;}
.vt .cta-inner .lead{margin:22px 0 30px;}
.vt .cta-contact{font-family:var(--inter); font-size:14px; color:var(--slate); margin-top:24px;}

/* Footer */
.vt .footer{background:var(--white); padding:72px 0 40px; border-top:1px solid var(--mist);}
.vt .footer-grid{display:grid; grid-template-columns:1.4fr repeat(3,1fr); gap:40px;}
.vt .footer-tag{font-family:var(--inter); font-size:14px; line-height:1.5; color:var(--steel); margin-top:16px; max-width:280px;}
.vt .footer h4{font-family:var(--poly); font-weight:400; letter-spacing:-0.02em; font-size:15px; margin:0 0 16px;}
.vt .footer ul{list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:10px;}
.vt .footer li a, .vt .footer li{font-family:var(--inter); font-size:14px; color:var(--steel); transition:color .2s;}
.vt .footer li a:hover{color:var(--ember);}
.vt .footer-bottom{display:flex; justify-content:space-between; gap:16px; flex-wrap:wrap;
  margin-top:56px; padding-top:24px; border-top:1px solid var(--mist);
  font-family:var(--poly); font-weight:400; letter-spacing:-0.02em; font-size:13px; color:var(--slate);}

.vt a:focus-visible, .vt button:focus-visible{outline:2px solid var(--ember); outline-offset:3px;}

/* Responsive */
@media (max-width:960px){
  .vt .display{font-size:52px; letter-spacing:-1px;}
  .vt .h-lg{font-size:34px;}
  .vt .hero-grid{grid-template-columns:1fr; gap:36px;}
  .vt .hero-stage{min-height:420px; margin-top:8px;}
  .vt .grid-4{grid-template-columns:1fr 1fr;}
  .vt .logo-grid{grid-template-columns:repeat(4,1fr);}
  .vt .footer-grid{grid-template-columns:1fr 1fr;}
  .vt .nav-pill{display:none;}
}
@media (max-width:640px){
  .vt section{padding:64px 0;}
  .vt .display{font-size:42px; letter-spacing:-0.5px;}
  .vt .h-lg{font-size:28px;}
  .vt .h{font-size:26px;}
  .vt .grid-2,.vt .grid-3,.vt .grid-4{grid-template-columns:1fr;}
  .vt .logo-grid{grid-template-columns:repeat(3,1fr);}
  .vt .footer-grid{grid-template-columns:1fr;}
  .vt .card-rev,.vt .card-stat,.vt .card-ring{position:static; width:100%; transform:none; margin-bottom:18px;}
  .vt .hero-stage{min-height:0;}
}
`,
        }}
      />

      {/* ================= NAV ================= */}
      <header className={`nav${scrolled ? " scrolled" : ""}`}>
        <div className="wrap nav-inner">
          <a href="#top" className="brand">Empire</a>
          <nav className="nav-pill" aria-label="Asosiy navigatsiya">
            {nav.map((n) => (
              <a key={n.label} href={n.href}>{n.label}</a>
            ))}
          </nav>
          <a href="#aloqa" className="btn btn-filled nav-cta">Bepul konsultatsiya</a>
        </div>
      </header>

      <main id="top">
        {/* ================= HERO ================= */}
        <section className="hero band-white">
          <div className="wrap hero-grid">
            <div className="hero-copy">
              <div className="eyebrow vt-rise">AI &amp; Custom Software Development</div>
              <h1 className="display vt-rise" style={rise(60)}>Biznesni raqamlashtiramiz.</h1>
              <p className="lead vt-rise" style={rise(120)}>
                Murakkab ichki jarayonlarni ERP, AI, Web va App yechimlari orqali
                raqamlashtiramiz. G'oyadan tayyor tizim/mahsulotgacha — atigi 2–3 oyda.
              </p>
              <div className="hero-ctas vt-rise" style={rise(180)}>
                <a href="#aloqa" className="btn btn-filled">Loyihani boshlash</a>
                <a href="#loyihalar" className="btn btn-ghost">Ishlarni ko'rish</a>
              </div>
            </div>

            <div className="hero-stage vt-rise" style={rise(140)} aria-hidden="true">
              {/* Revenue line chart card */}
              <div className="dcard card-rev" data-float>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 16 }}>
                  <span className="dcard-title">Savdo o'sishi</span>
                  <span className="poly em" style={{ fontSize: 15 }}>+38%</span>
                </div>
                <svg viewBox="0 0 300 130" width="100%" role="img" aria-label="Savdo o'sishi grafigi">
                  {[0, 1, 2, 3].map((i) => (
                    <line key={i} x1="0" x2="300" y1={20 + i * 30} y2={20 + i * 30} stroke="#e8e8e8" strokeWidth="1" />
                  ))}
                  <polyline points="0,100 40,92 80,96 120,70 160,74 200,48 240,40 300,18"
                    fill="none" stroke="#ff682c" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                  <polyline points="0,112 40,108 80,104 120,98 160,92 200,86 240,80 300,72"
                    fill="none" stroke="#816729" strokeWidth="1.8" strokeDasharray="4 4" strokeLinecap="round" />
                </svg>
              </div>

              {/* Stat card */}
              <div className="dcard card-stat" data-float>
                <div className="big-num num-ember">−70%</div>
                <div className="cap" style={{ marginTop: 8 }}>qo'l mehnati</div>
              </div>

              {/* Profitability ring */}
              <div className="dcard card-ring" data-float>
                <svg viewBox="0 0 120 120" width="100%" role="img" aria-label="Uptime 94 foiz">
                  <circle cx="60" cy="60" r="46" fill="none" stroke="#e8e8e8" strokeWidth="9" />
                  <circle cx="60" cy="60" r="46" fill="none" stroke="#ff682c" strokeWidth="9"
                    strokeLinecap="round" strokeDasharray="289" strokeDashoffset="17"
                    transform="rotate(-90 60 60)" />
                  <text x="60" y="58" textAnchor="middle" fontFamily="'Space Grotesk', ui-sans-serif, system-ui, sans-serif" fontSize="26" fill="#202020" letterSpacing="-0.04em">94%</text>
                  <text x="60" y="78" textAnchor="middle" fontFamily="'Inter', ui-sans-serif, system-ui, sans-serif" fontSize="11" fill="#828282">Uptime</text>
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* ================= LOGO STRIP ================= */}
        <section className="band-white" style={{ paddingTop: 0, paddingBottom: 96 }}>
          <div className="wrap">
            <div className="logo-cap vt-rise">80+ hamkor ishonadi</div>
            <div className="logo-row vt-rise" style={rise(60)}>
              {clientLogos.map((l) => (
                <img key={l.src} src={l.src} alt={l.alt} loading="lazy" />
              ))}
            </div>
          </div>
        </section>

        {/* ================= SERVICES ================= */}
        <section id="xizmatlar" className="band-ash">
          <div className="wrap">
            <div className="sec-head vt-rise">
              <h2 className="h-lg">Ikki yo'nalish, bitta standart.</h2>
              <p className="lead">
                Maxsus dasturiy ta'minot yoki Odoo ERP &amp; AI — har biri bir xil
                sifat va shaffof jarayon bilan.
              </p>
            </div>

            <div className="grid-2" style={{ marginBottom: 24 }}>
              <div className="asym vt-rise">
                <h3 className="h-sm" style={{ fontSize: 24 }}>Maxsus dasturiy ta'minot</h3>
                <p className="lead" style={{ fontSize: 16, margin: "16px 0 22px" }}>
                  Web/mobil ilova, ichki tizim, admin panel — biznesingizga aniq mos, noldan quriladi.
                </p>
                <div className="tag-row">
                  {["React", "Node.js", "Flutter", "Docker"].map((t) => (
                    <span key={t} className="pill-tag">{t}</span>
                  ))}
                </div>
                <a href="#loyihalar" className="link-ember">Batafsil</a>
              </div>

              <div className="asym vt-rise" style={rise(80)}>
                <h3 className="h-sm" style={{ fontSize: 24 }}>Odoo ERP &amp; AI joriy qilish</h3>
                <p className="lead" style={{ fontSize: 16, margin: "16px 0 22px" }}>
                  Barcha jarayon bitta tizimda: sotuv, ombor, moliya, HR — AI avtomatlashtirish bilan.
                </p>
                <div className="tag-row">
                  {["Odoo ERP", "AI Automation", "Predictive Analytics"].map((t) => (
                    <span key={t} className="pill-tag">{t}</span>
                  ))}
                </div>
                <a href="#loyihalar" className="link-ember">Batafsil</a>
              </div>
            </div>

            <div className="grid-4">
              {[
                { k: "mobile", t: "Mobil ilova", d: "iOS, Android, Flutter." },
                { k: "api", t: "Integratsiya & API", d: "Tizimlarni ulaymiz." },
                { k: "chart", t: "Biznes-tahlil", d: "Ma'lumotga asoslangan qaror." },
                { k: "cloud", t: "DevOps & Cloud", d: "Barqaror infratuzilma." },
              ].map((c, i) => (
                <div key={c.t} className="cap-card vt-rise" style={rise(i * 70)}>
                  <svg className="icon" viewBox="0 0 24 24">{icons[c.k]}</svg>
                  <h4 className="h-sm" style={{ fontSize: 17 }}>{c.t}</h4>
                  <p className="cap" style={{ color: "var(--steel)", marginTop: 8 }}>{c.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= METRICS ================= */}
        <section className="band-white">
          <div className="wrap grid-4">
            {[
              { n: "50+", l: "Yakunlangan loyiha", spark: true },
              { n: "30+", l: "Mamnun mijoz" },
              { n: "15+", l: "Texnologiya" },
              { n: "3+ yil", l: "Tajriba" },
            ].map((s, i) => (
              <div key={s.l} className="stat-card vt-rise" style={rise(i * 70)}>
                <div className="stat-num">{s.n}</div>
                {s.spark && (
                  <svg viewBox="0 0 120 28" width="90" height="22" style={{ marginTop: 12 }} aria-hidden="true">
                    <polyline points="0,24 20,20 40,22 60,12 80,14 100,6 120,2"
                      fill="none" stroke="#ff682c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
                <div className="stat-label">{s.l}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ================= PORTFOLIO ================= */}
        <section id="loyihalar" className="band-ash">
          <div className="wrap">
            <div className="sec-head vt-rise">
              <h2 className="h-lg">So'nggi ishlarimiz.</h2>
              <p className="lead">Real, ishga tushirilgan loyihalar — har biri yechilgan muammo.</p>
            </div>
            <div className="grid-2">
              {cases.map((c, i) => (
                <article key={c.title} className={`card vt-rise${i === 0 ? " asym" : ""}`} style={rise((i % 2) * 80)}>
                  <div className="case-frame">
                    <img src={c.img} alt={`${c.title} — desktop ko'rinishi`} loading="lazy" />
                  </div>
                  <div className="case-meta">{c.seg}</div>
                  <h3 className="h-sm">{c.title}</h3>
                  <p className="cap" style={{ color: "var(--slate)", margin: "10px 0" }}>{c.desc}</p>
                  <p className="case-result">{c.result}</p>
                  <div className="tag-row">
                    {c.tags.map((t) => (
                      <span key={t} className="tag">{t}</span>
                    ))}
                  </div>
                  <a href={`https://${c.url}`} target="_blank" rel="noopener noreferrer" className="link-ember">↗ {c.url}</a>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ================= PROCESS ================= */}
        <section id="jarayon" className="band-white">
          <div className="wrap">
            <div className="sec-head vt-rise">
              <h2 className="h-lg">G'oyadan mahsulotgacha — 4 bosqich.</h2>
            </div>
            <div className="grid-4">
              {steps.map((s, i) => (
                <div key={s.n} className="step vt-rise" style={rise(i * 70)}>
                  <div className="step-num">{s.n}</div>
                  <h3 className="h-sm" style={{ fontSize: 20 }}>{s.t}</h3>
                  <p className="cap" style={{ color: "var(--steel)", lineHeight: 1.5, marginBottom: 16 }}>{s.d}</p>
                  <div className="tag-row">
                    {s.tags.map((t) => (
                      <span key={t} className="tag">{t}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= STACK ================= */}
        <section className="band-ash">
          <div className="wrap">
            <div className="sec-head vt-rise">
              <h2 className="h-lg">Ishonchli, sanoat standarti texnologiyalar.</h2>
            </div>
            <div className="logo-grid">
              {stack.map((s, i) => (
                <div key={s.title} className="logo-cell vt-rise" style={rise((i % 6) * 40)} title={s.title}>
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d={s.path} fill="currentColor" /></svg>
                  <span>{s.title}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= PARTNERS ================= */}
        <section className="band-white">
          <div className="wrap">
            <div className="logo-cap vt-rise" style={{ marginBottom: 32 }}>Dunyo yetakchilari darajasida ishlaymiz.</div>
            <div className="logo-grid">
              {brands.map((b, i) => (
                <div key={b.title} className="logo-cell vt-rise" style={rise((i % 6) * 40)} title={b.title}>
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d={b.path} fill="currentColor" /></svg>
                  <span>{b.title}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= TEAM ================= */}
        <section className="band-ash">
          <div className="wrap">
            <div className="sec-head vt-rise">
              <h2 className="h-lg">Ortida — real jamoa.</h2>
            </div>
            <div className="grid-4">
              {team.map((m, i) => (
                <article key={m.name} className="member vt-rise" style={rise((i % 4) * 60)}>
                  <div className="member-portrait">
                    {m.img ? (
                      <img src={m.img} alt={m.name} loading="lazy" />
                    ) : (
                      <span className="member-mono" aria-hidden="true">{monogram(m.name)}</span>
                    )}
                  </div>
                  <div className="member-body">
                    <div className="member-name">{m.name}</div>
                    <div className="member-role">{m.role}</div>
                    <p className="member-bio">{m.bio}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ================= TESTIMONIALS ================= */}
        <section id="sharhlar" className="band-white">
          <div className="wrap">
            <div className="sec-head vt-rise">
              <h2 className="h-lg">Mijozlarimiz nima deydi.</h2>
            </div>
            <div className="grid-2">
              {testimonials.map((t, i) => (
                <div key={t.name} className={`quote-card vt-rise${i === 1 ? " ivory" : ""}`} style={rise((i % 2) * 80)}>
                  <p className="quote-text">
                    {t.quote[0]}<span className="em">{t.quote[1]}</span>{t.quote[2]}
                  </p>
                  <div className="quote-foot">
                    <span className="avatar" aria-hidden="true">{monogram(t.name)}</span>
                    <div>
                      <div className="poly" style={{ fontSize: 15 }}>{t.name}</div>
                      <div className="cap" style={{ color: "var(--slate)" }}>{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= PRICING ================= */}
        <section id="narxlar" className="band-ash">
          <div className="wrap">
            <div className="sec-head vt-rise" style={{ marginBottom: 32 }}>
              <h2 className="h-lg">Shaffof narxlar.</h2>
            </div>
            <div className="toggle vt-rise" role="tablist" aria-label="Narx yo'nalishi">
              <button role="tab" aria-selected={track === "soft"} className={track === "soft" ? "active" : ""} onClick={() => setTrack("soft")}>
                Maxsus dasturiy ta'minot
              </button>
              <button role="tab" aria-selected={track === "odoo"} className={track === "odoo" ? "active" : ""} onClick={() => setTrack("odoo")}>
                Odoo ERP &amp; AI
              </button>
            </div>

            <div className="grid-3">
              {pricing[track].map((tier, i) => (
                <div key={tier.badge} className={`tier vt-rise${tier.featured ? " featured" : ""}`} style={rise(i * 70)}>
                  <div className="tier-line" />
                  <span className="tier-badge">{tier.badge}</span>
                  <div className="tier-price poly">{tier.price}</div>
                  <div className="tier-term">{tier.term}</div>
                  <p className="tier-note">{tier.note}</p>
                  <ul className="feats">
                    {tier.feats.map((f) => (
                      <li key={f}><span className="fk">✓</span>{f}</li>
                    ))}
                  </ul>
                  <a href="#aloqa" className="btn btn-filled">Konsultatsiya olish</a>
                </div>
              ))}
            </div>
            <p className="price-cap">Fixed-scope · yashirin to'lov yo'q · 4 hafta qo'llab-quvvatlash.</p>
          </div>
        </section>

        {/* ================= CREDENTIALS ================= */}
        <section className="band-white">
          <div className="wrap">
            <div className="sec-head vt-rise">
              <h2 className="h-lg">Rasmiy maqom va sertifikatlar.</h2>
            </div>
            <div className="grid-4">
              {creds.map((c, i) => (
                <div key={c.title} className="cred vt-rise" style={rise(i * 60)}>
                  <div className="cred-frame">
                    <img src={c.img} alt={`${c.title} sertifikati`} loading="lazy" />
                  </div>
                  <div>
                    <div className="cred-title">{c.title}</div>
                    <div className="cred-org">{c.org}</div>
                  </div>
                  <div className="cred-status">
                    <span className={`dot ${c.active ? "dot-active" : "dot-pending"}`} />
                    {c.status}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= FAQ ================= */}
        <section className="band-ash">
          <div className="wrap" style={{ maxWidth: 860 }}>
            <div className="sec-head vt-rise">
              <h2 className="h-lg">Ko'p so'raladigan savollar.</h2>
            </div>
            <div>
              {faqs.map((f, i) => (
                <div key={f.q} className={`faq-item${openFaq === i ? " open" : ""}`}>
                  <button
                    className="faq-q"
                    aria-expanded={openFaq === i}
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <span>{f.q}</span>
                    <span className="faq-sign" aria-hidden="true" />
                  </button>
                  <div className="faq-a">
                    <p>{f.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= FINAL CTA ================= */}
        <section id="aloqa" className="band-ivory">
          <div className="wrap cta-inner vt-rise">
            <h2 className="h-lg">Loyihangizni bugun boshlaymiz.</h2>
            <p className="lead">
              G'oyangizni ayting — biz uni aniq muddat va byudjet bilan tayyor mahsulotga aylantiramiz.
            </p>
            <a href="https://t.me/muslimansoriy" target="_blank" rel="noopener noreferrer" className="btn btn-filled">Bepul konsultatsiya</a>
            <p className="cta-contact">+998 99 116 46 58 · t.me/muslimansoriy · Toshkent</p>
          </div>
        </section>
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="footer">
        <div className="wrap">
          <div className="footer-grid">
            <div>
              <div className="brand">Empire</div>
              <p className="footer-tag">AI, custom software va Odoo ERP — g'oyadan tayyor mahsulotgacha.</p>
            </div>
            <div>
              <h4>Xizmatlar</h4>
              <ul>
                <li><a href="#xizmatlar">Maxsus dasturiy ta'minot</a></li>
                <li><a href="#xizmatlar">Odoo ERP &amp; AI</a></li>
                <li><a href="#narxlar">Narxlar</a></li>
              </ul>
            </div>
            <div>
              <h4>Kompaniya</h4>
              <ul>
                <li><a href="#loyihalar">Loyihalar</a></li>
                <li><a href="#jarayon">Jarayon</a></li>
                <li><a href="#sharhlar">Sharhlar</a></li>
                <li><a href="#blog">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4>Aloqa</h4>
              <ul>
                <li><a href="mailto:muslimansoriy7@gmail.com">muslimansoriy7@gmail.com</a></li>
                <li><a href="tel:+998991164658">+998 99 116 46 58</a></li>
                <li><a href="https://t.me/muslimansoriy" target="_blank" rel="noopener noreferrer">Telegram</a></li>
                <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© 2026 Empire Group. Barcha huquqlar himoyalangan.</span>
            <span>Toshkent · O'zbekiston</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
