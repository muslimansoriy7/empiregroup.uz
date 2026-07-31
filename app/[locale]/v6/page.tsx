"use client";

import { useEffect, useRef, useState } from "react";
import { toolLogos, brandLogos } from "@/content/logos";

/* ============================================================
   Empire Group — Monad edition (v6)
   "Editorial tech journal on warm parchment."
   Newsreader-serif-400 + JetBrains-Mono pairing, parchment
   canvas (#f6f3f1), a single Lake-Blue accent (#2b59d1),
   periwinkle-mist elevated card, pill buttons / 40px cards /
   1px ash hairlines, no shadows, signature pipeline diagram.
   ============================================================ */

type Logo = { title: string; path?: string; custom?: string };

const STACK_TITLES = [
  "React", "Next.js", "TypeScript", "JavaScript", "Node.js", "Python",
  "Flutter", "Tailwind CSS", "PostgreSQL", "Docker", "Supabase", "Git",
];
const BRAND_TITLES = [
  "Google", "Meta", "Stripe", "Figma", "Cloudflare",
  "GitHub", "Notion", "Vercel", "Apple", "Telegram",
];

const pick = (arr: Logo[], titles: string[]) =>
  titles
    .map((t) => arr.find((x) => x.title === t))
    .filter((x): x is Logo => !!x && !x.custom && !!x.path);

const stack = pick(toolLogos as Logo[], STACK_TITLES);
const brands = pick(brandLogos as Logo[], BRAND_TITLES);

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
  {
    cat: "AVTOMOBIL · CRM",
    title: "Motor Lux — CRM va savdo boshqaruvi",
    sub: "Savdo va mijozlar bitta tizimda",
    result: "Savdo va mijozlar bitta tizimda",
    tags: ["CRM", "WEB"],
    img: "/cases/case-autoservice-desktop.webp",
    url: "motorlux.uz",
  },
  {
    cat: "TIBBIYOT · CRM (PWA)",
    title: "MedFlow — klinika CRM va bemor qabuli",
    sub: "Qabul boshqaruvi 3× tezlashdi",
    result: "Qabul boshqaruvi 3× tezlashdi",
    tags: ["PWA", "CRM"],
    img: "/cases/case-medflow-desktop.webp",
    url: "medflow.uz",
  },
  {
    cat: "TO'QIMACHILIK · ERP",
    title: "Grand Osiyo Textile — ERP va ombor tizimi",
    sub: "Ombor real vaqtda boshqariladi",
    result: "Ombor real vaqtda boshqariladi",
    tags: ["ERP", "OMBOR"],
    img: "/cases/case-textile-desktop.webp",
    url: "grandosiyo.uz",
  },
  {
    cat: "IJARA · KATALOG",
    title: "Texnika Ijara — ijara va katalog sayti",
    sub: "Onlayn bronlar 3× oshdi",
    result: "Onlayn bronlar 3× oshdi",
    tags: ["WEB", "KATALOG"],
    img: "/cases/case-texnika-desktop.webp",
    url: "texnika-ijara.uz",
  },
  {
    cat: "ELEKTRONIKA · E-COMMERCE",
    title: "GadgetSpace — onlayn elektronika do'koni",
    sub: "Konversiya 2.1× oshdi",
    result: "Konversiya 2.1× oshdi",
    tags: ["E-COMMERCE"],
    img: "/cases/case-gadgetspace-desktop.webp",
    url: "gadgetspace.uz",
  },
  {
    cat: "MODA · E-COMMERCE",
    title: "X Wear — kiyim brendi uchun do'kon",
    sub: "O'rtacha chek 28% oshdi",
    result: "O'rtacha chek 28% oshdi",
    tags: ["E-COMMERCE", "WEB"],
    img: "/cases/case-xwear-desktop.webp",
    url: "xwear.uz",
  },
  {
    cat: "SAVDO · POS",
    title: "Hilol Market — savdo avtomatlashtirish",
    sub: "Hisob-kitob 2× tezlashdi",
    result: "Hisob-kitob 2× tezlashdi",
    tags: ["RETAIL", "POS"],
    img: "/cases/case-kassa-desktop.webp",
    url: "hilolmarket.uz",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Explore",
    heading: "G'oya va muammoni chuqur o'rganamiz.",
    tags: ["TAHLIL", "AUDIT"],
  },
  {
    step: "02",
    title: "Plan",
    heading: "PRD, TZ, arxitektura, dizayn; muddat va byudjet aniq.",
    tags: ["PRD", "TZ", "DIZAYN"],
  },
  {
    step: "03",
    title: "Build",
    heading: "Kod, test, integratsiya; sprintlar, demo.",
    tags: ["DEV", "TEST", "DEMO"],
  },
  {
    step: "04",
    title: "Commit",
    heading: "Ishga tushirish va uzoq muddatli qo'llab-quvvatlash.",
    tags: ["DEPLOY", "SUPPORT"],
  },
];

const team = [
  {
    name: "Muslim Ansoriy",
    role: "Ta'sischi va CEO · Technical Product Manager",
    bio: "7+ yil IT va biznes-avtomatlashtirish; Odoo ERP Partner Manager (Markaziy Osiyo/Kavkaz); 20+ ERP loyiha.",
    img: "/founder.webp",
    initials: "MA",
  },
  {
    name: "Abbos Jo'rayev",
    role: "Hammuassis va COO",
    bio: "6+ yil IT loyiha boshqaruvi.",
    initials: "AJ",
  },
  {
    name: "Sardor Rahmatullayev",
    role: "Senior Odoo Developer",
    bio: "5 yil Python/Odoo; 30+ modul; REST/XML-RPC.",
    initials: "SR",
  },
  {
    name: "Dilnoza Yusupova",
    role: "Biznes-analitik · ERP Consultant",
    bio: "4 yil biznes-tahlil; AS-IS/TO-BE.",
    initials: "DY",
  },
  {
    name: "Jasurbek Toshmatov",
    role: "Full-stack Developer",
    bio: "5 yil web/mobil; React, Next.js, Node.js.",
    initials: "JT",
  },
  {
    name: "Nilufar Karimova",
    role: "Digital Marketing Lead",
    bio: "6 yil marketing; SEO, lead gen.",
    initials: "NK",
  },
  {
    name: "Bekzod Ergashev",
    role: "DevOps · SysAdmin",
    bio: "4 yil infratuzilma; Linux, Docker, CI/CD.",
    initials: "BE",
  },
  {
    name: "Malika Sobirova",
    role: "UI/UX Designer",
    bio: "4 yil interfeys dizayni; Figma.",
    initials: "MS",
  },
];

const testimonials = [
  {
    quote: "Empire Group eski qog'ozdagi ishimizni to'liq tizimga o'tkazdi — vaqt ancha tejaldi.",
    name: "Aliya M.",
    role: "MOTOR LUX · CRM",
    initials: "AM",
  },
  {
    quote: "Empire bilan ishlash oson bo'ldi, muddat va byudjet aniq edi.",
    name: "Jasur T.",
    role: "GADGETSPACE · E-COMMERCE",
    initials: "JT",
  },
  {
    quote: "Klinika ishini AI qo'shib avtomatlashtirdi. Qabul ancha tartibli.",
    name: "Doniyor R.",
    role: "MEDFLOW · KLINIKA",
    initials: "DR",
  },
  {
    quote: "Zamonaviy dizayn, savdo hajmi ko'tarildi.",
    name: "Laziza K.",
    role: "X WEAR · E-COMMERCE",
    initials: "LK",
  },
];

const pricing: Record<
  "software" | "odoo",
  { name: string; price: string; term: string; desc: string; featured?: boolean }[]
> = {
  software: [
    {
      name: "STANDARD",
      price: "$5,000 dan",
      term: "2–3 oy",
      desc: "MVP: landing + forma yoki kichik ilova.",
    },
    {
      name: "ADVANCED",
      price: "$15K–$40K",
      term: "4–6 oy",
      desc: "To'liq ilova, CRM integratsiya, admin panel, API.",
      featured: true,
    },
    {
      name: "MEGA",
      price: "$50,000+",
      term: "6–12 oy",
      desc: "Yirik ekotizim, mikroxizmatlar.",
    },
  ],
  odoo: [
    {
      name: "STANDARD",
      price: "$8,800 dan",
      term: "2–3 oy",
      desc: "Bazaviy Odoo joriy qilish: 2–3 modul.",
    },
    {
      name: "ADVANCED",
      price: "$25K–$35K",
      term: "4–6 oy",
      desc: "To'liq ERP: sotuv, ombor, moliya, HR + AI.",
      featured: true,
    },
    {
      name: "MEGA",
      price: "$85,000+",
      term: "~1 yil",
      desc: "Ko'p filialli korporativ ekotizim.",
    },
  ],
};

const pricingFeatures: Record<"software" | "odoo", string[][]> = {
  software: [
    ["1 platforma", "Asosiy funksiyalar", "Responsive dizayn", "Bazaviy SEO"],
    ["Ko'p sahifa/rol", "CRM integratsiya", "Admin panel + API", "Analitika"],
    ["Mikroxizmatlar", "Yuqori yuklama", "Maxsus integratsiyalar", "SLA + monitoring"],
  ],
  odoo: [
    ["2–3 modul", "Ma'lumot ko'chirish", "Xodim o'qitish", "Bazaviy sozlash"],
    ["To'liq ERP oqim", "AI avtomatlashtirish", "Maxsus modullar", "Hisobotlar"],
    ["Ko'p filial", "Maxsus modullar to'plami", "Chuqur integratsiya", "Doimiy support"],
  ],
};

const credentials = [
  {
    title: "Odoo Learning Partner",
    org: "Odoo S.A.",
    img: "/sertifikat/odoo-learning-partner.svg",
    status: "TASDIQLANGAN",
    active: true,
  },
  {
    title: "Davlat ro'yxatidan o'tganlik guvohnomasi",
    org: "\"EMPIRE GROUP CORP\" MCHJ",
    img: "/sertifikat/davlat-royxat-guvohnomasi.png",
    status: "TASDIQLANGAN",
    active: true,
  },
  {
    title: "IT Park rezidenti",
    org: "IT Park O'zbekiston",
    img: "/sertifikat/it-park.svg",
    status: "KUTILMOQDA",
    active: false,
  },
  {
    title: "ISO/IEC 27001",
    org: "Axborot xavfsizligi standarti",
    img: "/sertifikat/iso-27001.svg",
    status: "KUTILMOQDA",
    active: false,
  },
];

const faq = [
  { q: "Loyiha qancha vaqt oladi?", a: "Kichik MVP 3–4 hafta, o'rtacha 2–3 oy, yirik 4–6 oy. Aniq muddat Explore bosqichida." },
  { q: "Narx qanday hisoblanadi?", a: "Fixed-scope: loyiha hajmi aniqlangach aniq narx. Yashirin xarajat yo'q. Paketlar $5,000 dan." },
  { q: "Narxlar nega farq qiladi?", a: "Murakkablik, integratsiyalar va muddatga bog'liq." },
  { q: "Ishlab bo'lgach yordam beramizmi?", a: "Ha, qo'llab-quvvatlash, tuzatish va rivojlantirish davom etadi." },
  { q: "To'lov qanday?", a: "Bosqichma-bosqich: oldindan qism, keyin sprint natijalariga qarab." },
  { q: "Kod kimga tegishli?", a: "Barchasi sizga. Vendor lock-in yo'q." },
  { q: "Mavjud tizimni davom ettira olasizmi?", a: "Ha, ko'rib chiqib davom ettiramiz yoki qayta quramiz." },
  { q: "Konsultatsiya bepulmi?", a: "Ha. Explore bosqichida barcha savolga javob beramiz — majburiyatsiz." },
];

/* ---- inline mono icons (24x24, stroke currentColor) ---- */
const I = {
  telegram: <path d="M21 4 3 11l5 2 2 6 3-4 5 4 3-15Z M8 13l9-6" />,
  table: <path d="M4 5h16v14H4zM4 10h16M4 15h16M10 5v14" />,
  box: <path d="m12 3 8 4v10l-8 4-8-4V7zM4 7l8 4 8-4M12 11v10" />,
  cart: <path d="M4 5h2l2 10h9l2-7H7M9 20h.01M17 20h.01" />,
  spark: <path d="M12 3v6M12 15v6M3 12h6M15 12h6M6 6l3 3M15 15l3 3M18 6l-3 3M9 15l-3 3" />,
  users: <path d="M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3 20a5 5 0 0 1 10 0M16 11a3 3 0 1 0 0-6M15 20a5 5 0 0 1 6-4.5" />,
  report: <path d="M4 20V10M10 20V4M16 20v-7M4 20h16" />,
  mobile: <path d="M7 3h10v18H7zM7 17h10M11 20h2" />,
  gear: <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12 2v3M12 19v3M4 12H1M23 12h-3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2" />,
  code: <path d="m8 8-4 4 4 4M16 8l4 4-4 4M13 5l-2 14" />,
  layers: <path d="m12 3 9 5-9 5-9-5zM3 13l9 5 9-5M3 17l9 5 9-5" />,
  ai: <path d="M9 3h6l1 4h3v6l-3 1-1 4H8l-1-4-3-1V7h3zM12 10v4M10 12h4" />,
  plug: <path d="M9 3v6M15 3v6M7 9h10v3a5 5 0 0 1-10 0zM12 17v4" />,
  chart: <path d="M4 4v16h16M8 16l3-4 3 2 4-6" />,
  cloud: <path d="M7 18a4 4 0 0 1 0-8 5 5 0 0 1 9.6-1.5A3.5 3.5 0 0 1 17 18z" />,
};

export default function V6() {
  const [annOpen, setAnnOpen] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [track, setTrack] = useState<"software" | "odoo">("software");
  const [navOpen, setNavOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const els = Array.from(root.querySelectorAll<HTMLElement>(".mo-rise"));
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

  const rise = (delay = 0): React.CSSProperties => ({ transitionDelay: `${delay}ms` });

  return (
    <div className="mo" ref={rootRef}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Newsreader:opsz,wght@6..72,400;6..72,500&family=JetBrains+Mono:wght@400;500&display=swap"
      />

      <style
        dangerouslySetInnerHTML={{
          __html: `
.mo{
  --parchment:#f6f3f1; --lake:#2b59d1; --peri:#cfdaf5;
  --sky:#a0b5eb; --mint:#a7fccd; --coral:#ff9473; --gold:#ecda98; --crimson:#f37a0a;
  --off:#242424; --ink:#000000; --graphite:#4e4d4d; --smoke:#797776; --ash:#cecac8;
  --serif:'Newsreader', Georgia, 'Times New Roman', serif;
  --mono:'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace;
  --mx:1432px;
  background:var(--parchment); color:var(--off);
  font-family:var(--mono); -webkit-font-smoothing:antialiased;
  overflow-x:clip;
}
.mo *{box-sizing:border-box;}
.mo a{color:inherit; text-decoration:none;}
.mo img{max-width:100%; display:block;}
.mo ::selection{background:var(--peri); color:var(--off);}

/* type helpers */
.mo .serif{font-family:var(--serif); font-weight:400; letter-spacing:-0.02em; line-height:1.15;}
.mo .mono{font-family:var(--mono); font-weight:400;}
.mo .d80{font-size:clamp(44px,7.2vw,80px); letter-spacing:-1.6px; line-height:1.08;}
.mo .h48{font-size:clamp(32px,4.6vw,48px); letter-spacing:-0.96px;}
.mo .h40{font-size:clamp(28px,3.6vw,40px); letter-spacing:-0.8px;}
.mo .h32{font-size:clamp(24px,2.8vw,32px); letter-spacing:-0.64px;}
.mo .h24{font-size:24px; letter-spacing:-0.48px;}
.mo .kicker{font-family:var(--mono); font-size:12px; text-transform:uppercase; letter-spacing:0.06em; color:var(--smoke);}
.mo .lead{font-family:var(--mono); font-size:clamp(16px,1.8vw,20px); line-height:1.5; color:var(--graphite); letter-spacing:-0.01em;}
.mo .body{font-family:var(--mono); font-size:16px; line-height:1.5; color:var(--graphite); letter-spacing:-0.01em;}

/* layout */
.mo .wrap{max-width:var(--mx); margin:0 auto; padding:0 32px;}
.mo section{padding:64px 0;}
.mo .sec-head{max-width:820px; margin-bottom:40px;}
.mo .sec-head .h48{color:var(--off); margin:0 0 16px;}

/* reveal */
.mo .mo-rise{opacity:1; transform:translateY(16px);
  transition:opacity .6s cubic-bezier(.16,1,.3,1), transform .6s cubic-bezier(.16,1,.3,1);}
.mo .mo-rise.in{opacity:1; transform:none;}
@media (prefers-reduced-motion: reduce){
  .mo .mo-rise{transition:none; transform:none;}
}

/* buttons */
.mo .btn{display:inline-flex; align-items:center; gap:10px; font-family:var(--mono);
  font-size:14px; font-weight:500; text-transform:uppercase; letter-spacing:0.02em;
  padding:15px 30px; border-radius:100px; border:1px solid transparent; cursor:pointer;
  transition:transform .15s ease, background .2s ease, opacity .2s ease; white-space:nowrap;}
.mo .btn:active{transform:translateY(1px);}
.mo .btn-blue{background:var(--lake); color:#fff;}
.mo .btn-blue:hover{background:#2249b0;}
.mo .btn-dark{background:var(--off); color:#fff;}
.mo .btn-dark:hover{background:#000;}
.mo .btn-ghost{background:transparent; color:var(--off); border-color:var(--off);}
.mo .btn-ghost:hover{background:var(--off); color:#fff;}
.mo .btn .arw{font-size:12px; line-height:1;}
.mo .tlink{display:inline-flex; align-items:center; gap:8px; font-family:var(--mono);
  font-size:13px; text-transform:uppercase; letter-spacing:0.04em; color:var(--off);}
.mo .tlink:hover{gap:12px;}
.mo :focus-visible{outline:2px solid var(--lake); outline-offset:3px; border-radius:6px;}

/* pills / tags */
.mo .tag{display:inline-flex; align-items:center; font-family:var(--mono); font-size:12px;
  text-transform:uppercase; letter-spacing:0.03em; color:var(--graphite);
  border:1px solid var(--ash); border-radius:9999px; padding:6px 14px; background:transparent;}

/* card */
.mo .card{background:var(--parchment); border:1px solid var(--ash); border-radius:40px; padding:40px;}
.mo .ic{width:26px; height:26px; display:block;}
.mo .ic svg{width:26px; height:26px; fill:none; stroke:var(--off); stroke-width:1.6; stroke-linecap:round; stroke-linejoin:round;}

/* ===== announcement ===== */
.mo .ann{background:var(--ink); color:#fff;}
.mo .ann .in{max-width:var(--mx); margin:0 auto; padding:11px 32px; display:flex; align-items:center; gap:16px; justify-content:center; flex-wrap:wrap;}
.mo .ann p{font-family:var(--mono); font-size:14px; letter-spacing:0.01em; margin:0; text-transform:uppercase;}
.mo .ann .apill{font-family:var(--mono); font-size:12px; text-transform:uppercase; letter-spacing:0.04em;
  border:1px solid rgba(255,255,255,.55); color:#fff; border-radius:9999px; padding:5px 14px; background:transparent; cursor:pointer;}
.mo .ann .apill:hover{background:#fff; color:#000;}
.mo .ann .ax{margin-left:8px; background:transparent; border:0; color:#fff; font-size:18px; line-height:1; cursor:pointer; padding:2px 6px;}
.mo .ann .ax:hover{opacity:.7;}

/* ===== nav ===== */
.mo .nav{position:sticky; top:0; z-index:40; background:rgba(246,243,241,.86); backdrop-filter:saturate(1.1) blur(10px);}
.mo .nav .in{max-width:var(--mx); margin:0 auto; padding:18px 32px; display:flex; align-items:center; gap:28px;}
.mo .brand{display:inline-flex; align-items:center; gap:10px; font-family:var(--serif); font-size:24px; letter-spacing:-0.02em; color:var(--off);}
.mo .dot{width:12px; height:12px; border-radius:9999px; background:var(--lake); display:inline-block;}
.mo .nav-links{display:flex; gap:26px; margin:0 auto;}
.mo .nav-links a{font-family:var(--mono); font-size:14px; text-transform:uppercase; letter-spacing:0.04em; color:var(--graphite);}
.mo .nav-links a:hover{color:var(--off);}
.mo .nav-cta{display:flex; align-items:center; gap:12px;}
.mo .nav-cta .btn{padding:11px 22px; font-size:13px;}
.mo .burger{display:none; background:transparent; border:1px solid var(--ash); border-radius:9999px; padding:9px 14px; font-family:var(--mono); font-size:12px; text-transform:uppercase; cursor:pointer;}
.mo .mnav{display:none;}

/* ===== hero ===== */
.mo .hero{position:relative; overflow:clip; text-align:center; padding:88px 0 72px;}
.mo .wash{position:absolute; inset:-10% -10% auto -10%; height:640px; z-index:0; pointer-events:none; filter:blur(70px); opacity:.8;}
.mo .blob{position:absolute; border-radius:9999px;}
.mo .blob.b1{width:560px; height:420px; left:6%; top:-40px; background:radial-gradient(circle at 40% 40%, var(--coral), transparent 62%);}
.mo .blob.b2{width:620px; height:460px; right:4%; top:-10px; background:radial-gradient(circle at 60% 40%, var(--sky), transparent 62%);}
.mo .blob.b3{width:520px; height:400px; left:38%; top:120px; background:radial-gradient(circle at 50% 50%, var(--mint), transparent 60%);}
.mo .hero .inner{position:relative; z-index:1; max-width:940px; margin:0 auto;}
.mo .hero .d80{color:var(--off); margin:0 0 24px;}
.mo .hero .lead{max-width:720px; margin:0 auto 32px;}
.mo .hero .cta{display:flex; gap:16px; justify-content:center; flex-wrap:wrap; margin-bottom:44px;}
.mo .stat-row{display:flex; gap:12px 28px; justify-content:center; flex-wrap:wrap; font-family:var(--mono); font-size:13px; text-transform:uppercase; letter-spacing:0.04em; color:var(--smoke);}
.mo .stat-row b{color:var(--off); font-weight:500;}

/* ===== logo strip ===== */
.mo .strip .cap{margin-bottom:24px;}
.mo .strip .row{display:flex; align-items:center; gap:40px; flex-wrap:wrap;}
.mo .strip img{height:30px; width:auto; object-fit:contain; filter:grayscale(1); opacity:.55; transition:filter .3s, opacity .3s;}
.mo .strip img:hover{filter:grayscale(0); opacity:1;}

/* ===== pipeline ===== */
.mo .pipe-title{text-align:center; margin-bottom:8px;}
.mo .pipe-sub{text-align:center; margin:0 auto 44px; max-width:560px;}
.mo .pipe{position:relative; max-width:1120px; margin:0 auto; aspect-ratio:1200/440;}
.mo .pipe svg.wires{position:absolute; inset:0; width:100%; height:100%; z-index:1;}
.mo .pipe .glow{position:absolute; left:50%; top:50%; width:340px; height:300px; transform:translate(-50%,-50%);
  background:radial-gradient(circle, rgba(167,252,205,.85), rgba(167,252,205,0) 66%); filter:blur(26px); z-index:0; border-radius:9999px;}
.mo .pnode{position:absolute; transform:translate(-50%,-50%); z-index:2; display:inline-flex; align-items:center; gap:9px;
  background:var(--parchment); border:1px solid var(--ash); border-radius:9999px; padding:11px 18px; white-space:nowrap;}
.mo .pnode .plabel{font-family:var(--mono); font-size:13px; text-transform:uppercase; letter-spacing:0.03em; color:var(--off);}
.mo .pnode .pic{width:15px; height:15px; flex:none;}
.mo .pnode .pic svg{width:15px; height:15px; fill:none; stroke:var(--off); stroke-width:1.6; stroke-linecap:round; stroke-linejoin:round;}
.mo .pnode.hub{background:var(--off); border-color:var(--off); padding:16px 26px;}
.mo .pnode.hub .plabel{color:#fff; font-size:15px; font-weight:500; letter-spacing:0.04em;}
.mo .pnode.hub .pic svg{stroke:#fff;}
.mo .s1{left:11.7%; top:13.6%;} .mo .s2{left:11.7%; top:39.8%;}
.mo .s3{left:11.7%; top:60.2%;} .mo .s4{left:11.7%; top:86.4%;}
.mo .o1{left:88.3%; top:13.6%;} .mo .o2{left:88.3%; top:39.8%;}
.mo .o3{left:88.3%; top:60.2%;} .mo .o4{left:88.3%; top:86.4%;}
.mo .hubn{left:50%; top:50%;}

/* ===== services ===== */
.mo .feat-grid{display:grid; grid-template-columns:1fr 1fr; gap:24px;}
.mo .feat{display:flex; flex-direction:column; gap:16px;}
.mo .feat .h24{color:var(--off); margin:0;}
.mo .feat .body{margin:0;}
.mo .tagrow{display:flex; gap:8px; flex-wrap:wrap; margin-top:4px;}

.mo .peri{position:relative; overflow:clip; background:var(--peri); border:0; border-radius:40px; padding:40px; margin-top:24px;}
.mo .peri .pcontent{position:relative; z-index:2; max-width:560px;}
.mo .peri .h24{color:var(--off); margin:0 0 14px;}
.mo .peri .body{color:#33427a;}
.mo .peri .pblob{position:absolute; right:-60px; top:-40px; width:440px; height:380px; z-index:1; filter:blur(46px); opacity:.85;
  background:radial-gradient(circle at 30% 40%, var(--coral), transparent 55%), radial-gradient(circle at 70% 45%, var(--sky), transparent 55%), radial-gradient(circle at 55% 80%, var(--mint), transparent 55%);}

.mo .cap4{display:grid; grid-template-columns:repeat(4,1fr); gap:24px; margin-top:24px;}
.mo .capcard{background:var(--parchment); border:1px solid var(--ash); border-radius:40px; padding:28px; display:flex; flex-direction:column; gap:12px;}
.mo .capcard .h24{font-size:20px; letter-spacing:-0.4px; color:var(--off); margin:0;}
.mo .capcard .body{font-size:14px; margin:0;}

/* ===== stat band ===== */
.mo .stats{display:grid; grid-template-columns:repeat(4,1fr); gap:24px;}
.mo .statcard{border:1px solid var(--ash); border-radius:40px; padding:36px 32px;}
.mo .statcard .num{font-family:var(--serif); font-weight:400; font-size:56px; letter-spacing:-1.1px; line-height:1; color:var(--off);}
.mo .statcard .lbl{font-family:var(--mono); font-size:14px; text-transform:uppercase; letter-spacing:0.03em; color:var(--graphite); margin-top:12px;}

/* ===== portfolio ===== */
.mo .cases{display:grid; grid-template-columns:1fr 1fr; gap:24px;}
.mo .casecard{display:flex; flex-direction:column; gap:16px;}
.mo .shot{border:1px solid var(--ash); border-radius:24px; overflow:hidden; background:#fff; aspect-ratio:16/10;}
.mo .shot img{width:100%; height:100%; object-fit:cover; object-position:top;}
.mo .casecard .cat{font-family:var(--mono); font-size:12px; text-transform:uppercase; letter-spacing:0.05em; color:var(--smoke);}
.mo .casecard .h24{color:var(--off); margin:0;}
.mo .casecard .res{font-family:var(--mono); font-size:14px; letter-spacing:0.01em; color:var(--off);}
.mo .casecard .res b{color:var(--lake); font-weight:500;}
.mo .casecard .foot{display:flex; align-items:center; justify-content:space-between; gap:12px; flex-wrap:wrap; margin-top:4px;}

/* ===== process ===== */
.mo .steps{display:grid; grid-template-columns:repeat(4,1fr); gap:24px;}
.mo .stepcard{border:1px solid var(--ash); border-radius:40px; padding:32px; display:flex; flex-direction:column; gap:14px;}
.mo .stepcard .snum{font-family:var(--mono); font-size:13px; letter-spacing:0.08em; color:var(--smoke);}
.mo .stepcard .h24{color:var(--off); margin:0;}
.mo .stepcard .body{font-size:15px; margin:0;}

/* ===== stack ===== */
.mo .nodes{display:flex; flex-wrap:wrap; gap:14px;}
.mo .snode{display:inline-flex; align-items:center; gap:9px; border:1px solid var(--ash); border-radius:9999px; padding:11px 18px; background:var(--parchment);}
.mo .snode svg{width:18px; height:18px; fill:var(--off);}
.mo .snode span{font-family:var(--mono); font-size:13px; text-transform:uppercase; letter-spacing:0.03em; color:var(--off);}

/* ===== partners ===== */
.mo .partners .cap{margin-bottom:24px;}
.mo .brandrow{display:flex; flex-wrap:wrap; gap:16px;}
.mo .bnode{display:inline-flex; align-items:center; gap:10px; border:1px solid var(--ash); border-radius:9999px; padding:11px 18px;}
.mo .bnode svg{width:18px; height:18px; fill:var(--smoke); transition:fill .25s;}
.mo .bnode:hover svg{fill:var(--off);}
.mo .bnode span{font-family:var(--mono); font-size:13px; text-transform:uppercase; letter-spacing:0.03em; color:var(--graphite);}

/* ===== team ===== */
.mo .teamg{display:grid; grid-template-columns:repeat(4,1fr); gap:24px;}
.mo .tmember{border:1px solid var(--ash); border-radius:40px; padding:24px; display:flex; flex-direction:column; gap:14px;}
.mo .portrait{aspect-ratio:1/1; border-radius:24px; overflow:hidden; border:1px solid var(--ash);}
.mo .portrait img{width:100%; height:100%; object-fit:cover;}
.mo .mono-block{aspect-ratio:1/1; border-radius:24px; border:1px solid var(--ash); background:var(--peri);
  display:flex; align-items:center; justify-content:center; font-family:var(--serif); font-weight:400; font-size:44px; letter-spacing:-0.02em; color:#33427a;}
.mo .tmember .tn{font-family:var(--serif); font-weight:400; font-size:22px; letter-spacing:-0.02em; color:var(--off);}
.mo .tmember .tr{font-family:var(--mono); font-size:12px; text-transform:uppercase; letter-spacing:0.02em; color:var(--smoke);}
.mo .tmember .tb{font-family:var(--mono); font-size:13px; line-height:1.45; color:var(--graphite);}

/* ===== testimonials ===== */
.mo .tests{display:grid; grid-template-columns:1fr 1fr; gap:24px;}
.mo .tcard{border:1px solid var(--ash); border-radius:40px; padding:40px; display:flex; flex-direction:column; gap:24px; justify-content:space-between;}
.mo .tquote{font-family:var(--serif); font-weight:400; font-size:24px; letter-spacing:-0.48px; line-height:1.35; color:var(--off);}
.mo .tby{display:flex; align-items:center; gap:14px;}
.mo .mono-av{width:46px; height:46px; border-radius:9999px; border:1px solid var(--ash); background:var(--peri);
  display:flex; align-items:center; justify-content:center; font-family:var(--mono); font-size:14px; font-weight:500; color:#33427a; flex:none;}
.mo .tby .nm{font-family:var(--mono); font-size:14px; font-weight:500; color:var(--off);}
.mo .tby .rl{font-family:var(--mono); font-size:12px; text-transform:uppercase; letter-spacing:0.03em; color:var(--smoke);}

/* ===== pricing ===== */
.mo .toggle{display:inline-flex; gap:6px; border:1px solid var(--ash); border-radius:9999px; padding:5px; margin-bottom:36px;}
.mo .toggle button{font-family:var(--mono); font-size:13px; text-transform:uppercase; letter-spacing:0.03em; color:var(--graphite);
  background:transparent; border:0; border-radius:9999px; padding:10px 22px; cursor:pointer;}
.mo .toggle button[aria-pressed="true"]{background:var(--off); color:#fff;}
.mo .tiers{display:grid; grid-template-columns:repeat(3,1fr); gap:24px; align-items:stretch;}
.mo .tier{border:1px solid var(--ash); border-radius:40px; padding:36px 32px; display:flex; flex-direction:column; gap:20px; background:var(--parchment);}
.mo .tier.feat{background:var(--peri); border-color:transparent;}
.mo .tier .tname{font-family:var(--mono); font-size:13px; text-transform:uppercase; letter-spacing:0.05em; color:var(--smoke);}
.mo .tier.feat .tname{color:#33427a;}
.mo .tier .tprice{font-family:var(--serif); font-weight:400; font-size:40px; letter-spacing:-0.8px; line-height:1; color:var(--off);}
.mo .tier .tterm{font-family:var(--mono); font-size:13px; text-transform:uppercase; letter-spacing:0.03em; color:var(--graphite);}
.mo .tier .tdesc{font-family:var(--mono); font-size:14px; line-height:1.45; color:var(--graphite); margin:0;}
.mo .tier ul{list-style:none; margin:0; padding:0; display:flex; flex-direction:column; gap:10px;}
.mo .tier li{font-family:var(--mono); font-size:13px; color:var(--graphite); display:flex; gap:10px; align-items:flex-start;}
.mo .tier li::before{content:"+"; color:var(--smoke);}
.mo .tier.feat li{color:#33427a;} .mo .tier.feat li::before{color:#33427a;}
.mo .tier .btn{margin-top:auto; justify-content:center;}
.mo .pricenote{font-family:var(--mono); font-size:12px; text-transform:uppercase; letter-spacing:0.03em; color:var(--smoke); margin-top:28px; text-align:center;}

/* ===== credentials ===== */
.mo .creds{display:grid; grid-template-columns:repeat(4,1fr); gap:24px;}
.mo .cred{border:1px solid var(--ash); border-radius:40px; padding:28px; display:flex; flex-direction:column; gap:16px;}
.mo .credimg{border:1px solid var(--ash); border-radius:24px; background:#fff; height:130px; display:flex; align-items:center; justify-content:center; padding:20px;}
.mo .credimg img{max-height:90px; width:auto; object-fit:contain;}
.mo .cred .ct{font-family:var(--serif); font-weight:400; font-size:19px; letter-spacing:-0.3px; line-height:1.2; color:var(--off);}
.mo .cred .co{font-family:var(--mono); font-size:12px; color:var(--smoke); line-height:1.4;}
.mo .cred .cs{font-family:var(--mono); font-size:12px; text-transform:uppercase; letter-spacing:0.04em; display:inline-flex; align-items:center; gap:8px; color:var(--smoke);}
.mo .cred .cs.on{color:var(--off);}
.mo .cred .cs .cdot{width:7px; height:7px; border-radius:9999px; background:currentColor; display:inline-block;}

/* ===== faq ===== */
.mo .faqwrap{max-width:900px; margin:0 auto;}
.mo .faqrow{border-bottom:1px solid var(--ash);}
.mo .faqq{width:100%; background:transparent; border:0; cursor:pointer; text-align:left;
  display:flex; align-items:center; justify-content:space-between; gap:24px; padding:34px 0;
  font-family:var(--serif); font-weight:400; font-size:clamp(20px,2.4vw,24px); letter-spacing:-0.48px; color:var(--off);}
.mo .faqq .chev{font-size:20px; color:var(--off); transition:transform .3s ease; flex:none;}
.mo .faqq[aria-expanded="true"] .chev{transform:rotate(180deg);}
.mo .faqa{overflow:hidden; max-height:0; transition:max-height .35s ease, opacity .3s ease; opacity:0;}
.mo .faqa.open{max-height:280px; opacity:1;}
.mo .faqa .inner{padding:0 0 34px; font-family:var(--mono); font-size:16px; line-height:1.55; color:var(--graphite); max-width:720px;}

/* ===== final cta ===== */
.mo .final{position:relative; overflow:clip;}
.mo .finalcard{position:relative; overflow:clip; background:var(--peri); border-radius:40px; padding:72px 40px; text-align:center;}
.mo .finalcard .fblob{position:absolute; inset:-30% -10% auto -10%; height:420px; z-index:0; filter:blur(64px); opacity:.7;
  background:radial-gradient(circle at 25% 40%, var(--coral), transparent 55%), radial-gradient(circle at 75% 45%, var(--sky), transparent 55%);}
.mo .finalcard .fc{position:relative; z-index:1; max-width:720px; margin:0 auto;}
.mo .finalcard .h48{color:var(--off); margin:0 0 20px;}
.mo .finalcard .lead{color:#33427a; margin:0 auto 32px;}
.mo .finalcard .fmeta{font-family:var(--mono); font-size:13px; text-transform:uppercase; letter-spacing:0.04em; color:#33427a; margin-top:26px;}

/* ===== footer ===== */
.mo .foot{border-top:1px solid var(--ash); padding:64px 0 40px;}
.mo .footgrid{display:grid; grid-template-columns:1.6fr 1fr 1fr 1fr; gap:40px;}
.mo .foot .ftag{font-family:var(--mono); font-size:14px; line-height:1.5; color:var(--graphite); margin-top:16px; max-width:280px;}
.mo .foot h4{font-family:var(--serif); font-weight:400; font-size:18px; letter-spacing:-0.02em; color:var(--off); margin:0 0 18px;}
.mo .foot ul{list-style:none; margin:0; padding:0; display:flex; flex-direction:column; gap:12px;}
.mo .foot ul a{font-family:var(--mono); font-size:14px; color:var(--graphite);}
.mo .foot ul a:hover{color:var(--off);}
.mo .footbar{border-top:1px solid var(--ash); margin-top:48px; padding-top:24px; display:flex; justify-content:space-between; gap:16px; flex-wrap:wrap;
  font-family:var(--mono); font-size:12px; text-transform:uppercase; letter-spacing:0.03em; color:var(--smoke);}

/* ===== responsive ===== */
@media (max-width:1024px){
  .mo .cap4,.mo .stats,.mo .steps,.mo .teamg,.mo .creds{grid-template-columns:repeat(2,1fr);}
  .mo .tiers{grid-template-columns:1fr;}
  .mo .nav-links{display:none;}
  .mo .footgrid{grid-template-columns:1fr 1fr;}
}
@media (max-width:760px){
  .mo section{padding:52px 0;}
  .mo .wrap{padding:0 20px;}
  .mo .nav-cta{display:none;}
  .mo .burger{display:inline-block; margin-left:auto;}
  .mo .mnav.show{display:block; border-top:1px solid var(--ash); background:var(--parchment);}
  .mo .mnav .mlist{display:flex; flex-direction:column; padding:16px 32px;}
  .mo .mnav a{padding:12px 0; font-family:var(--mono); font-size:15px; text-transform:uppercase; letter-spacing:0.04em; color:var(--graphite); border-bottom:1px solid var(--ash);}
  .mo .mnav .mcta{display:flex; gap:12px; padding:18px 32px;}
  .mo .feat-grid,.mo .cases,.mo .tests{grid-template-columns:1fr;}
  .mo .cap4,.mo .stats,.mo .steps,.mo .teamg,.mo .creds,.mo .footgrid{grid-template-columns:1fr;}
  /* pipeline stacks vertically */
  .mo .pipe{position:static; aspect-ratio:auto; display:flex; flex-direction:column; align-items:center; gap:14px;}
  .mo .pipe svg.wires,.mo .pipe .glow{display:none;}
  .mo .pnode{position:static; transform:none;}
  .mo .pipe .stackarrow{color:var(--smoke); font-size:18px;}
}
`,
        }}
      />

      {/* announcement */}
      {annOpen && (
        <div className="ann" role="region" aria-label="E'lon">
          <div className="in">
            <p>Yangi — Odoo ERP + AI joriy qilish · 2–3 oyda</p>
            <a className="apill" href="#narxlar">Batafsil</a>
            <button className="ax" aria-label="E'lonni yopish" onClick={() => setAnnOpen(false)}>×</button>
          </div>
        </div>
      )}

      {/* nav */}
      <header className="nav">
        <div className="in">
          <a className="brand" href="#top" aria-label="Empire Group bosh sahifa">
            <span className="dot" aria-hidden="true" />Empire
          </a>
          <nav className="nav-links" aria-label="Asosiy navigatsiya">
            <a href="#xizmatlar">Xizmatlar</a>
            <a href="#jarayon">Jarayon</a>
            <a href="#loyihalar">Loyihalar</a>
            <a href="#sharhlar">Sharhlar</a>
            <a href="#narxlar">Narxlar</a>
            <a href="/blog">Blog</a>
          </nav>
          <div className="nav-cta">
            <a className="btn btn-ghost" href="#top">Kirish</a>
            <a className="btn btn-blue" href="#cta">Bepul konsultatsiya <span className="arw">▸</span></a>
          </div>
          <button
            className="burger"
            aria-expanded={navOpen}
            aria-label="Menyu"
            onClick={() => setNavOpen((v) => !v)}
          >
            Menyu
          </button>
        </div>
        <div className={`mnav${navOpen ? " show" : ""}`}>
          <div className="mlist">
            <a href="#xizmatlar" onClick={() => setNavOpen(false)}>Xizmatlar</a>
            <a href="#jarayon" onClick={() => setNavOpen(false)}>Jarayon</a>
            <a href="#loyihalar" onClick={() => setNavOpen(false)}>Loyihalar</a>
            <a href="#sharhlar" onClick={() => setNavOpen(false)}>Sharhlar</a>
            <a href="#narxlar" onClick={() => setNavOpen(false)}>Narxlar</a>
            <a href="/blog" onClick={() => setNavOpen(false)}>Blog</a>
          </div>
          <div className="mcta">
            <a className="btn btn-blue" href="#cta" onClick={() => setNavOpen(false)}>Bepul konsultatsiya <span className="arw">▸</span></a>
          </div>
        </div>
      </header>

      <main id="top">
        {/* hero */}
        <section className="hero">
          <div className="wash" aria-hidden="true">
            <span className="blob b1" /><span className="blob b2" /><span className="blob b3" />
          </div>
          <div className="wrap">
            <div className="inner">
              <h1 className="serif d80 mo-rise">Biznesni raqamlashtiramiz.</h1>
              <p className="lead mo-rise" style={rise(60)}>
                Murakkab ichki jarayonlarni ERP, AI, Web va App yechimlari orqali raqamlashtiramiz.
                G'oyadan tayyor tizim/mahsulotgacha — atigi 2–3 oyda.
              </p>
              <div className="cta mo-rise" style={rise(120)}>
                <a className="btn btn-blue" href="#cta">Loyihani boshlash <span className="arw">▸</span></a>
                <a className="btn btn-ghost" href="#loyihalar">Ishlarni ko'rish</a>
              </div>
              <div className="stat-row mo-rise" style={rise(180)}>
                <span><b>50+</b> LOYIHA</span><span>·</span>
                <span><b>30+</b> MIJOZ</span><span>·</span>
                <span><b>15+</b> TEXNOLOGIYA</span><span>·</span>
                <span><b>3+</b> YIL</span>
              </div>
            </div>
          </div>
        </section>

        {/* logo strip */}
        <section className="strip">
          <div className="wrap">
            <p className="kicker cap mo-rise">80+ hamkor ishonadi</p>
            <div className="row mo-rise" style={rise(60)}>
              {clientLogos.map((l) => (
                <img key={l.src} src={l.src} alt={l.alt} loading="lazy" />
              ))}
            </div>
          </div>
        </section>

        {/* pipeline */}
        <section id="xizmatlar">
          <div className="wrap">
            <h2 className="serif h48 pipe-title mo-rise" style={{ color: "var(--off)" }}>
              Tarqoq jarayonlar — yagona tizimda.
            </h2>
            <p className="lead pipe-sub mo-rise" style={rise(50)}>
              Telegram, Excel, ombor va savdo — barchasi Empire ERP + AI markazida birlashadi.
            </p>

            <div className="pipe mo-rise" style={rise(100)}>
              <svg className="wires" viewBox="0 0 1200 440" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
                <g fill="none" stroke="#cecac8" strokeWidth="1.4">
                  <path d="M235,60 C400,60 440,220 500,218" />
                  <path d="M235,175 C400,175 445,220 500,219" />
                  <path d="M235,265 C400,265 445,220 500,221" />
                  <path d="M235,380 C400,380 440,220 500,222" />
                  <path d="M700,220 C800,220 830,60 965,60" />
                  <path d="M700,220 C800,220 830,175 965,175" />
                  <path d="M700,220 C800,220 830,265 965,265" />
                  <path d="M700,220 C800,220 830,380 965,380" />
                </g>
              </svg>
              <span className="glow" aria-hidden="true" />

              <div className="pnode s1"><span className="pic"><svg viewBox="0 0 24 24">{I.telegram}</svg></span><span className="plabel">Telegram</span></div>
              <span className="stackarrow" aria-hidden="true">↓</span>
              <div className="pnode s2"><span className="pic"><svg viewBox="0 0 24 24">{I.table}</svg></span><span className="plabel">Excel / 1C</span></div>
              <span className="stackarrow" aria-hidden="true">↓</span>
              <div className="pnode s3"><span className="pic"><svg viewBox="0 0 24 24">{I.box}</svg></span><span className="plabel">Ombor</span></div>
              <span className="stackarrow" aria-hidden="true">↓</span>
              <div className="pnode s4"><span className="pic"><svg viewBox="0 0 24 24">{I.cart}</svg></span><span className="plabel">Savdo</span></div>
              <span className="stackarrow" aria-hidden="true">↓</span>

              <div className="pnode hub hubn"><span className="pic"><svg viewBox="0 0 24 24">{I.spark}</svg></span><span className="plabel">Empire ERP + AI</span></div>
              <span className="stackarrow" aria-hidden="true">↓</span>

              <div className="pnode o1"><span className="pic"><svg viewBox="0 0 24 24">{I.users}</svg></span><span className="plabel">CRM</span></div>
              <span className="stackarrow" aria-hidden="true">↓</span>
              <div className="pnode o2"><span className="pic"><svg viewBox="0 0 24 24">{I.report}</svg></span><span className="plabel">Real-vaqt hisobot</span></div>
              <span className="stackarrow" aria-hidden="true">↓</span>
              <div className="pnode o3"><span className="pic"><svg viewBox="0 0 24 24">{I.mobile}</svg></span><span className="plabel">Mobil ilova</span></div>
              <span className="stackarrow" aria-hidden="true">↓</span>
              <div className="pnode o4"><span className="pic"><svg viewBox="0 0 24 24">{I.gear}</svg></span><span className="plabel">Avtomatlashtirish</span></div>
            </div>
          </div>
        </section>

        {/* services */}
        <section>
          <div className="wrap">
            <div className="sec-head mo-rise">
              <h2 className="serif h48">Ikki yo'nalish, bitta standart.</h2>
              <p className="lead">Maxsus dasturiy ta'minot yoki Odoo ERP & AI — har ikkalasi ham bir xil sifat va aniqlik bilan quriladi.</p>
            </div>

            <div className="feat-grid">
              <div className="card feat mo-rise">
                <span className="ic"><svg viewBox="0 0 24 24">{I.code}</svg></span>
                <h3 className="serif h24">Maxsus dasturiy ta'minot</h3>
                <p className="body">Web/mobil ilova, ichki tizim, admin panel — biznesingizga aniq mos, noldan quriladi.</p>
                <div className="tagrow">
                  {["React", "Node.js", "Flutter", "Docker"].map((t) => <span key={t} className="tag">{t}</span>)}
                </div>
                <a className="tlink" href="#loyihalar">Batafsil →</a>
              </div>

              <div className="card feat mo-rise" style={rise(80)}>
                <span className="ic"><svg viewBox="0 0 24 24">{I.layers}</svg></span>
                <h3 className="serif h24">Odoo ERP &amp; AI joriy qilish</h3>
                <p className="body">Barcha jarayon bitta tizimda: sotuv, ombor, moliya, HR — AI avtomatlashtirish bilan.</p>
                <div className="tagrow">
                  {["Odoo ERP", "AI", "Predictive Analytics"].map((t) => <span key={t} className="tag">{t}</span>)}
                </div>
                <a className="tlink" href="#narxlar">Batafsil →</a>
              </div>
            </div>

            <div className="peri mo-rise" style={rise(60)}>
              <span className="pblob" aria-hidden="true" />
              <div className="pcontent">
                <span className="ic"><svg viewBox="0 0 24 24" style={{ stroke: "#33427a" } as React.CSSProperties}>{I.ai}</svg></span>
                <h3 className="serif h24" style={{ marginTop: 14 }}>AI avtomatlashtirish</h3>
                <p className="body">Takrorlanuvchi mexanik ishlarni AI'ga topshiring — jamoangiz muhim ishga fokuslanadi.</p>
              </div>
            </div>

            <div className="cap4">
              {[
                { k: "mobile", t: "Mobil ilova", b: "iOS/Android, Flutter — bitta koddan ikki platforma." },
                { k: "plug", t: "Integratsiya & API", b: "To'lov, SMS, 1C, marketpleyslar — ulanadi." },
                { k: "chart", t: "Biznes-tahlil", b: "Dashboard va real-vaqt hisobotlar." },
                { k: "cloud", t: "DevOps & Cloud", b: "CI/CD, Docker, monitoring va barqarorlik." },
              ].map((c, i) => (
                <div key={c.t} className="capcard mo-rise" style={rise(i * 60)}>
                  <span className="ic"><svg viewBox="0 0 24 24">{(I as Record<string, React.ReactNode>)[c.k]}</svg></span>
                  <h4 className="serif h24">{c.t}</h4>
                  <p className="body">{c.b}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* stat band */}
        <section>
          <div className="wrap">
            <div className="stats">
              {[
                { n: "50+", l: "Yakunlangan loyiha" },
                { n: "30+", l: "Mamnun mijoz" },
                { n: "15+", l: "Texnologiya" },
                { n: "3+", l: "Yil tajriba" },
              ].map((s, i) => (
                <div key={s.l} className="statcard mo-rise" style={rise(i * 60)}>
                  <div className="num serif">{s.n}</div>
                  <div className="lbl">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* portfolio */}
        <section id="loyihalar">
          <div className="wrap">
            <div className="sec-head mo-rise">
              <h2 className="serif h48">So'nggi ishlarimiz.</h2>
              <p className="lead">Real, ishga tushirilgan loyihalar — har biri yechilgan muammo.</p>
            </div>
            <div className="cases">
              {cases.map((c, i) => (
                <article key={c.title} className="card casecard mo-rise" style={rise((i % 2) * 80)}>
                  <div className="shot"><img src={c.img} alt={`${c.title} — ekran ko'rinishi`} loading="lazy" /></div>
                  <span className="cat">{c.cat}</span>
                  <h3 className="serif h24">{c.title}</h3>
                  <p className="body" style={{ margin: 0 }}>{c.sub}</p>
                  <p className="res">NATIJA: <b>{c.result}</b></p>
                  <div className="foot">
                    <div className="tagrow">{c.tags.map((t) => <span key={t} className="tag">{t}</span>)}</div>
                    <a className="tlink" href={`https://${c.url}`} target="_blank" rel="noopener noreferrer">↗ {c.url}</a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* process */}
        <section id="jarayon">
          <div className="wrap">
            <div className="sec-head mo-rise">
              <h2 className="serif h48">G'oyadan mahsulotgacha — 4 bosqich.</h2>
              <p className="lead">Aniq, takrorlanadigan jarayon — muddat va byudjet doim nazorat ostida.</p>
            </div>
            <div className="steps">
              {processSteps.map((s, i) => (
                <div key={s.step} className="stepcard mo-rise" style={rise(i * 60)}>
                  <span className="snum">{s.step}</span>
                  <h3 className="serif h24">{s.title}</h3>
                  <p className="body">{s.heading}</p>
                  <div className="tagrow">{s.tags.map((t) => <span key={t} className="tag">{t}</span>)}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* stack */}
        <section>
          <div className="wrap">
            <div className="sec-head mo-rise">
              <h2 className="serif h48">Ishonchli, sanoat standarti texnologiyalar.</h2>
            </div>
            <div className="nodes mo-rise" style={rise(40)}>
              {stack.map((s) => (
                <span key={s.title} className="snode">
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d={s.path} /></svg>
                  <span>{s.title}</span>
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* partners */}
        <section className="partners">
          <div className="wrap">
            <p className="kicker cap mo-rise">Dunyo yetakchilari darajasida ishlaymiz</p>
            <div className="brandrow mo-rise" style={rise(40)}>
              {brands.map((b) => (
                <span key={b.title} className="bnode">
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d={b.path} /></svg>
                  <span>{b.title}</span>
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* team */}
        <section>
          <div className="wrap">
            <div className="sec-head mo-rise">
              <h2 className="serif h48">Ortida — real jamoa.</h2>
              <p className="lead">Odoo, dasturlash, dizayn va marketing bo'yicha 8 kishilik jamoa.</p>
            </div>
            <div className="teamg">
              {team.map((m, i) => (
                <article key={m.name} className="tmember mo-rise" style={rise((i % 4) * 50)}>
                  {m.img ? (
                    <div className="portrait"><img src={m.img} alt={m.name} loading="lazy" /></div>
                  ) : (
                    <div className="mono-block" aria-hidden="true">{m.initials}</div>
                  )}
                  <div className="tn">{m.name}</div>
                  <div className="tr">{m.role}</div>
                  <div className="tb">{m.bio}</div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* testimonials */}
        <section id="sharhlar">
          <div className="wrap">
            <div className="sec-head mo-rise">
              <h2 className="serif h48">Mijozlarimiz nima deydi.</h2>
            </div>
            <div className="tests">
              {testimonials.map((t, i) => (
                <figure key={t.name} className="tcard mo-rise" style={rise((i % 2) * 80)}>
                  <blockquote className="tquote" style={{ margin: 0 }}>“{t.quote}”</blockquote>
                  <figcaption className="tby">
                    <span className="mono-av" aria-hidden="true">{t.initials}</span>
                    <span>
                      <span className="nm">{t.name}</span><br />
                      <span className="rl">{t.role}</span>
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* pricing */}
        <section id="narxlar">
          <div className="wrap">
            <div className="sec-head mo-rise">
              <h2 className="serif h48">Shaffof narxlar.</h2>
              <p className="lead">Fixed-scope paketlar — yashirin to'lovsiz. Yo'nalishni tanlang.</p>
            </div>
            <div className="mo-rise">
              <div className="toggle" role="group" aria-label="Narx yo'nalishi">
                <button aria-pressed={track === "software"} onClick={() => setTrack("software")}>Dasturiy ta'minot</button>
                <button aria-pressed={track === "odoo"} onClick={() => setTrack("odoo")}>Odoo ERP</button>
              </div>
            </div>
            <div className="tiers">
              {pricing[track].map((tier, i) => (
                <div key={tier.name} className={`tier${tier.featured ? " feat" : ""} mo-rise`} style={rise(i * 60)}>
                  <span className="tname">{tier.name}</span>
                  <div>
                    <div className="tprice serif">{tier.price}</div>
                    <div className="tterm" style={{ marginTop: 8 }}>{tier.term}</div>
                  </div>
                  <p className="tdesc">{tier.desc}</p>
                  <ul>{pricingFeatures[track][i].map((f) => <li key={f}>{f}</li>)}</ul>
                  {tier.featured ? (
                    <a className="btn btn-blue" href="#cta">Boshlash <span className="arw">▸</span></a>
                  ) : (
                    <a className="btn btn-ghost" href="#cta">So'rov yuborish</a>
                  )}
                </div>
              ))}
            </div>
            <p className="pricenote">Fixed-scope · Yashirin to'lov yo'q · 4 hafta qo'llab-quvvatlash</p>
          </div>
        </section>

        {/* credentials */}
        <section>
          <div className="wrap">
            <div className="sec-head mo-rise">
              <h2 className="serif h48">Rasmiy maqom va sertifikatlar.</h2>
            </div>
            <div className="creds">
              {credentials.map((c, i) => (
                <div key={c.title} className="cred mo-rise" style={rise((i % 4) * 50)}>
                  <div className="credimg"><img src={c.img} alt={c.title} loading="lazy" /></div>
                  <div className="ct">{c.title}</div>
                  <div className="co">{c.org}</div>
                  <span className={`cs${c.active ? " on" : ""}`}>
                    {c.active && <span className="cdot" aria-hidden="true" />}{c.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* faq */}
        <section>
          <div className="wrap">
            <div className="sec-head mo-rise" style={{ textAlign: "center", margin: "0 auto 40px" }}>
              <h2 className="serif h48">Ko'p so'raladigan savollar.</h2>
            </div>
            <div className="faqwrap">
              {faq.map((f, i) => {
                const open = openFaq === i;
                return (
                  <div key={f.q} className="faqrow mo-rise">
                    <button
                      className="faqq"
                      aria-expanded={open}
                      onClick={() => setOpenFaq(open ? null : i)}
                    >
                      <span>{f.q}</span>
                      <span className="chev" aria-hidden="true">↓</span>
                    </button>
                    <div className={`faqa${open ? " open" : ""}`}>
                      <div className="inner">{f.a}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* final cta */}
        <section id="cta" className="final">
          <div className="wrap">
            <div className="finalcard mo-rise">
              <span className="fblob" aria-hidden="true" />
              <div className="fc">
                <h2 className="serif h48">Loyihangizni bugun boshlaymiz.</h2>
                <p className="lead">Bepul konsultatsiyada muammoingizni o'rganamiz va aniq yechim taklif qilamiz — majburiyatsiz.</p>
                <a className="btn btn-blue" href="https://t.me/muslimansoriy" target="_blank" rel="noopener noreferrer">
                  Bepul konsultatsiya <span className="arw">▸</span>
                </a>
                <p className="fmeta">+998 99 116 46 58 · T.ME/MUSLIMANSORIY · TOSHKENT</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* footer */}
      <footer className="foot">
        <div className="wrap">
          <div className="footgrid">
            <div>
              <a className="brand" href="#top"><span className="dot" aria-hidden="true" />Empire</a>
              <p className="ftag">Biznesni raqamlashtiramiz — ERP, AI, Web va App yechimlari. Toshkent, O'zbekiston.</p>
            </div>
            <div>
              <h4 className="serif">Xizmatlar</h4>
              <ul>
                <li><a href="#xizmatlar">Maxsus dasturiy ta'minot</a></li>
                <li><a href="#xizmatlar">Odoo ERP &amp; AI</a></li>
                <li><a href="#narxlar">Narxlar</a></li>
              </ul>
            </div>
            <div>
              <h4 className="serif">Kompaniya</h4>
              <ul>
                <li><a href="#loyihalar">Loyihalar</a></li>
                <li><a href="#jarayon">Jarayon</a></li>
                <li><a href="#sharhlar">Sharhlar</a></li>
                <li><a href="/blog">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="serif">Aloqa</h4>
              <ul>
                <li><a href="mailto:muslimansoriy7@gmail.com">muslimansoriy7@gmail.com</a></li>
                <li><a href="tel:+998991164658">+998 99 116 46 58</a></li>
                <li><a href="https://t.me/muslimansoriy" target="_blank" rel="noopener noreferrer">Telegram</a></li>
                <li><a href="https://instagram.com/empiregroup.uz" target="_blank" rel="noopener noreferrer">Instagram</a></li>
              </ul>
            </div>
          </div>
          <div className="footbar">
            <span>© 2026 Empire Group · Barcha huquqlar himoyalangan</span>
            <span>Toshkent · O'zbekiston</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
