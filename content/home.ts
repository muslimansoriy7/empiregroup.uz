import type { Locale } from "./index";

/**
 * The /v3 design study runs a deliberately tighter copy deck than the main
 * dictionary: card-length bios, one-line project results, terminal rows that
 * have to fit a fixed-width mock. Reusing `dictionaries` would drop the site's
 * long-form paragraphs into layouts that were measured for short ones, so v3
 * carries its own deck. Names, roles and terminology are kept identical to the
 * main dictionary so the two never contradict each other.
 */

type Pair = [string, string];

export type V3Project = {
  seg: string;
  title: string;
  result: string;
  /** Who stated the result. Absent when no client has gone on record yet. */
  source?: string;
  tags: string[];
};

export type V3Service = {
  tag: string;
  title: string;
  desc: string;
  chips: string[];
};

export type V3Step = { title: string; desc: string; tags: string[] };
export type V3Tier = {
  tier: string;
  price: string;
  period: string;
  featured: boolean;
  desc: string;
  items: string[];
};
export type V3Guarantee = { title: string; body: string };
/** A metric we can stand behind, or one still waiting on the client's numbers. */
export type V3Metric = { value: string; label: string; pending?: boolean };
export type V3Member = { role: string; bio: string };
export type V3Quote = { quote: string; name: string; role: string; company: string };
/** Only credentials actually held. A badge you have not earned discounts the
 *  ones you have, so `note` says what the document lets a buyer rely on. */
export type V3Credential = { title: string; org: string; note: string };
export type V3Faq = { q: string; a: string };

export type HomeCopy = {
  nav: { links: Pair[]; cta: string; openMenu: string; closeMenu: string; menuLabel: string };
  hero: {
    eyebrow: string;
    titleBefore: string;
    titleAccent: string;
    titleAfter: string;
    lede: string;
    primary: string;
    secondary: string;
  };
  stats: Pair[];
  proofEyebrow: string;
  services: { eyebrow: string; title: string; sub: string; more: string; items: V3Service[] };
  portfolio: {
    eyebrow: string;
    title: string;
    sub: string;
    resultLabel: string;
    showMore: (n: number) => string;
    ctaTitle: string;
    ctaDesc: string;
    ctaLink: string;
    /** Shown on the open portfolio row — that row links to the live site. */
    viewLink: string;
    items: V3Project[];
  };
  caseStudy: {
    eyebrow: string;
    client: string;
    place: string;
    title: string;
    lede: string;
    challengeLabel: string;
    challenge: string[];
    solutionLabel: string;
    solution: string[];
    metricsLabel: string;
    metrics: V3Metric[];
    stackLabel: string;
    stack: string[];
    pendingNote: string;
    cta: string;
  };
  pricing: {
    eyebrow: string;
    title: string;
    sub: string;
    tracks: [string, string];
    popular: string;
    cta: string;
    note: string;
    software: V3Tier[];
    odoo: V3Tier[];
  };
  guarantee: {
    eyebrow: string;
    title: string;
    sub: string;
    items: V3Guarantee[];
  };
  office: { eyebrow: string; title: string; sub: string };
  stack: { eyebrow: string; title: string };
  journal: {
    eyebrow: string;
    title: string;
    sub: string;
    readLabel: string;
    allLabel: string;
    empty: string;
  };
  process: { eyebrow: string; title: string; steps: V3Step[] };
  team: { eyebrow: string; title: string; members: V3Member[] };
  testimonials: {
    eyebrow: string;
    title: string;
    /* Controls for the stacked carousel the quotes are read in. */
    prev: string;
    next: string;
    goTo: (n: number) => string;
    items: V3Quote[];
  };
  credentials: { eyebrow: string; title: string; items: V3Credential[] };
  faq: { eyebrow: string; title: string; items: V3Faq[] };
  cta: { eyebrow: string; title: string; call: string; telegram: string; meta: string };
  footer: {
    desc: string;
    servicesHead: string;
    companyHead: string;
    contactHead: string;
    services: Pair[];
    /** Local landing pages — the GEO half of the SEO work. */
    regionsHead: string;
    regions: Pair[];
    company: Pair[];
    contact: Pair[];
    /** Legal identity a UZ buyer checks before signing. */
    legalHead: string;
    legal: Pair[];
    rights: string;
    place: string;
  };
  themeLabel: string;
  langLabel: string;
};

/* Contact points, shared by every locale. */
export const CONTACT = {
  phonePrimary: { label: "+998 99 116 46 58", href: "tel:+998991164658" },
  phoneSecondary: { label: "+998 20 009 25 88", href: "tel:+998200092588" },
  email: { label: "mirabbosjurayev17@gmail.com", href: "mailto:mirabbosjurayev17@gmail.com" },
  telegram: { label: "t.me/muslimansoriy", href: "https://t.me/muslimansoriy" },
};

/* Placeholders until the real registration data arrives — marked so they
   can never be mistaken for verified figures. */
const LEGAL_PLACEHOLDER = "XXX XXX XXX";

const uz: HomeCopy = {
  nav: {
    links: [
      ["Xizmatlar", "#xizmatlar"],
      ["Loyihalar", "#loyihalar"],
      ["Jarayon", "#jarayon"],
      ["Sharhlar", "#sharhlar"],
      ["Maqolalar", "#jurnal"],
    ],
    cta: "Bepul konsultatsiya",
    openMenu: "Menyuni ochish",
    closeMenu: "Menyuni yopish",
    menuLabel: "Asosiy menyu",
  },
  hero: {
    eyebrow: "AI, ERP VA MAXSUS DASTURIY TA'MINOT",
    titleBefore: "Kompaniyangiz boshqaruvini to'liq ",
    titleAccent: "raqamlashtiramiz",
    titleAfter: ".",
    lede: "Savdo, ombor, moliya, ishlab chiqarish, logistika, xarid va HR bo'limlarini yagona ERP tizimiga birlashtiramiz. Odoo ERP yoki maxsus dasturiy yechimlar orqali biznes jarayonlaringizni raqamlashtirib, real vaqt rejimida kompaniyangizni istalgan joydan boshqaring.",
    primary: "Loyihani boshlash",
    secondary: "Ishlarni ko'rish",
  },
  /* Every figure here is either checkable on the page itself (the team is
     shown, the projects are listed) or on a document we display. Round
     unverifiable counts were doing the opposite of building trust. */
  stats: [
    ["2023", "MCHJ ro'yxatdan o'tgan"],
    ["8", "Doimiy jamoa a'zosi"],
    ["20+", "Odoo ERP joriy qilish"],
    ["2–3 oy", "O'rtacha ishga tushirish"],
  ],
  proofEyebrow: "BIZGA ISHONISHADI",
  services: {
    eyebrow: "XIZMATLAR",
    title: "Ikki yo'nalish, bitta standart.",
    sub: "Maxsus dasturiy ta'minot yoki Odoo ERP — har biri bir xil sifat va shaffof jarayon bilan quriladi.",
    more: "batafsil",
    items: [
      {
        tag: "NOLDAN QURILADI",
        title: "Maxsus dasturiy ta'minot",
        desc: "Web va mobil ilovalar, ichki tizimlar va boshqaruv panellari — biznesingizga aniq mos, noldan quriladi.",
        chips: ["React", "Node.js", "Flutter", "Docker"],
      },
      {
        tag: "TAYYOR PLATFORMA",
        title: "Odoo ERP & AI joriy qilish",
        desc: "Barcha jarayonlar yagona tizimda: sotuv, ombor, moliya, HR — AI avtomatlashtirish va bashoratli tahlil bilan.",
        chips: ["Odoo ERP", "AI Automation", "Predictive Analytics"],
      },
    ],
  },
  portfolio: {
    eyebrow: "PORTFOLIO",
    title: "So'nggi ishlarimiz.",
    sub: "Real, ishga tushirilgan loyihalar — har biri yechilgan muammo.",
    resultLabel: "Natija",
    showMore: (n) => `Yana ${n} ta loyiha`,
    ctaTitle: "Keyingisi — sizniki",
    ctaDesc: "Loyihangizni birga rejalashtiramiz va ishga tushiramiz.",
    ctaLink: "Loyihani boshlash",
    viewLink: "Loyihani ko'rish",
    /* Where a client has gone on record, the number carries their name — an
       attributed figure is worth more than a bigger unattributed one. */
    items: [
      { seg: "AVTOMOBIL · CRM", title: "Motor Lux — CRM va savdo boshqaruvi", result: "Lidlar yo'qolishi to'xtadi, har bir sotuvchining bosqichi shaffof", source: "Malika Umarova, marketing direktori", tags: ["CRM", "Web"] },
      { seg: "TIBBIYOT · CRM (PWA)", title: "MedFlow — klinika CRM va bemor qabuli", result: "Qabul samaradorligi 40% oshdi, kutish vaqti 2 barobar qisqardi", source: "Dr. Sardor Zokirov, tarmoq rahbari", tags: ["PWA", "CRM"] },
      { seg: "TO'QIMACHILIK · ERP", title: "Grand Osiyo Textile — 15 ombor uchun Odoo ERP", result: "Inventarizatsiya haftadan 1 kunga tushdi, omboriy yo'qotishlar 90% kamaydi", source: "Alisher Raximov, asoschi", tags: ["Odoo ERP", "Ombor"] },
      { seg: "IJARA · PLATFORMA", title: "Texnika Ijara — og'ir texnika ijarasi platformasi", result: "Kuniga 100+ buyurtma avtomatik qayta ishlanadi", source: "Javohir Qodirov, loyiha rahbari", tags: ["Web", "Katalog"] },
      { seg: "ELEKTRONIKA · E-COMMERCE", title: "GadgetSpace — onlayn elektronika do'koni", result: "Katalog, savat va to'lov bitta oqimda", tags: ["E-commerce"] },
      { seg: "MODA · E-COMMERCE", title: "X Wear — kiyim brendi uchun do'kon", result: "Brend uslubidagi do'kon va ombor bilan bog'langan katalog", tags: ["E-commerce", "Web"] },
      { seg: "SAVDO · POS", title: "Hilol Market — savdo avtomatlashtirish", result: "Kassa, ombor va hisobot bitta panelda", tags: ["Retail", "POS"] },
    ],
  },
  /* The one project deep enough to answer "do you understand a business like
     mine". Figures marked `pending` wait on the client's own reporting —
     an invented percentage would undo everything the page is trying to do. */
  caseStudy: {
    eyebrow: "ASOSIY KEYS",
    client: "Shodlik Textile",
    place: "Qashqadaryo · vertikal to'qimachilik klasteri",
    title: "Paxtadan tayyor kiyimgacha — bitta tizimda.",
    lede: "Paxta xomashyosidan ip, xom mato va tayyor kiyimgacha — to'rt bosqichli ishlab chiqarish, 337 xodim, uch smena. Hammasi Excel va qog'ozda edi. Biz butun klasterni Odoo 19 Enterprise'ga ko'chirdik va zavod uskunalarini to'g'ridan-to'g'ri ERP'ga uladik.",
    challengeLabel: "MUAMMO",
    challenge: [
      "Har bosqich alohida hisob yuritardi — paxta sexi ipni, ip sexi matoni ko'rmasdi.",
      "Ombor qoldig'i qo'lda sanalardi; hisobot bir necha kun kechikardi.",
      "Davomat qog'ozda — 337 xodimning smenasi va kechikishi qo'lda hisoblanardi.",
      "Tarozi va stanok ko'rsatkichlari daftarga yozilib, keyin Excel'ga kiritilardi.",
      "Bank ko'chirmasi 1C'dan qo'lda ko'chirilardi, valyuta kursi qo'lda yangilanardi.",
    ],
    solutionLabel: "YECHIM",
    solution: [
      "Odoo 19 Enterprise, Odoo.sh'da (Git CI/CD) — 28 ta maxsus modul, hammasi shu klaster uchun yozilgan.",
      "Face-ID turniket ERP'ga ulandi: xodim o'tishi bilan davomat yoziladi, smena va kechikish avtomatik hisoblanadi.",
      "Sanoat tarozilari ishlab chiqarish buyurtmasiga ulandi — vazn qo'lda kiritilmaydi, MO avtomatik yopiladi.",
      "Stanoklar telemetriyasi: xato signali kelsa, texnik xizmat arizasi o'zi ochiladi.",
      "Markaziy bank kursi kuniga avtomatik, 1C bank vipiskasi bir tugma bilan import qilinadi.",
      "Partiyalarga GS1-128 QR yorliq — mato rulonini paxta partiyasigacha kuzatish mumkin.",
      "B2B eksport sayti: so'rov to'g'ridan-to'g'ri CRM'ga tushadi.",
    ],
    metricsLabel: "NATIJA",
    metrics: [
      { value: "337", label: "xodim tizimda" },
      { value: "28", label: "maxsus modul" },
      { value: "4", label: "apparat integratsiyasi" },
      { value: "—", label: "Inventarizatsiya vaqti", pending: true },
    ],
    stackLabel: "TEXNOLOGIYA",
    stack: ["Odoo 19 Enterprise", "Odoo.sh", "PostgreSQL", "Python", "ISAPI", "GS1-128"],
    pendingNote: "Belgilangan ko'rsatkichlar mijozning yakuniy hisoboti bilan yangilanadi.",
    cta: "Shunga o'xshash loyihani muhokama qilish",
  },
  pricing: {
    eyebrow: "NARXLAR",
    title: "Qancha turadi — yashirmaymiz.",
    sub: "Fixed-scope: soatbay emas. Loyiha ko'lami aniqlangach, summa shartnomada qotiriladi va o'zgarmaydi.",
    tracks: ["Maxsus dasturiy ta'minot", "Odoo ERP & AI"],
    popular: "KO'P TANLANADI",
    cta: "Muhokama qilish",
    note: "Fixed-scope · yashirin to'lov yo'q · har paketda 4 hafta bepul qo'llab-quvvatlash · kod va intellektual mulk sizga o'tadi.",
    software: [
      { tier: "STANDARD", price: "$5,000 dan", period: "2–3 oy", featured: false, desc: "Bitta aniq vazifani hal qiluvchi MVP.", items: ["Landing yoki MVP", "Forma va integratsiya", "Asosiy admin panel", "Responsive dizayn"] },
      { tier: "ADVANCED", price: "$15K – $40K", period: "4–6 oy", featured: true, desc: "Murakkab biznes mantig'iga ega to'liq ilova.", items: ["To'liq web yoki mobil ilova", "CRM integratsiya", "Admin panel va rollar", "API va avtomatlashtirish"] },
      { tier: "MEGA", price: "$50,000+", period: "6–12 oy", featured: false, desc: "Bir nechta ilovadan iborat ekotizim.", items: ["Yirik ekotizim", "Mikroxizmatlar", "Yuqori yuklama", "Uzoq muddatli SLA"] },
    ],
    odoo: [
      { tier: "STANDARD", price: "$8,800 dan", period: "2–3 oy", featured: false, desc: "Odoo standart modullarini joriy qilish.", items: ["Asosiy modullar", "Ma'lumot migratsiyasi", "Xodimlarni o'qitish", "Standart hisobotlar"] },
      { tier: "ADVANCED", price: "$25K – $35K", period: "4–6 oy", featured: true, desc: "Biznesga moslashtirilgan modullar va AI.", items: ["To'liq ERP joriy qilish", "Custom modullar", "AI avtomatlashtirish", "Tashqi integratsiya"] },
      { tier: "MEGA", price: "$85,000+", period: "~1 yil", featured: false, desc: "Korxonaning to'liq raqamli transformatsiyasi.", items: ["Korporativ ekotizim", "Ko'p filial / kompaniya", "Apparat integratsiyalari", "24/7 SLA"] },
    ],
  },
  guarantee: {
    eyebrow: "XATO KETSA-CHI?",
    title: "Eng ko'p beriladigan savol — mana javobi.",
    sub: "Zavodni boshqaradigan tizimni topshirayotgan odam nimadan qo'rqishini bilamiz. Shuning uchun bularni oldindan yozib qo'yamiz.",
    items: [
      { title: "Kod va ma'lumot sizniki", body: "Loyiha yakunida barcha kod, dizayn va intellektual mulk sizga o'tadi. Vendor lock-in yo'q — xohlasangiz o'z jamoangiz davom ettiradi." },
      { title: "4 hafta bepul qo'llab-quvvatlash", body: "Ishga tushgandan keyin to'rt hafta — xatolarni tuzatish va sozlash bepul. Undan keyingi texnik xizmat alohida kelishiladi va majburiy emas." },
      { title: "Bosqichma-bosqich to'lov", body: "Boshlang'ich avans, so'ngra har bosqich yakunida. Natijani ko'rasiz, keyin to'laysiz — butun summani oldindan bermaysiz." },
      { title: "Shartnoma va NDA", body: "\"EMPIRE GROUP CORP\" MCHJ sifatida rasmiy shartnoma tuzamiz. Biznes ma'lumotlaringiz uchun maxfiylik kelishuvi standart amaliyot." },
      { title: "Ma'lumot xavfsizligi", body: "Ma'lumot sizning serveringizda yoki siz tanlagan bulutda saqlanadi. Kirish rollar bo'yicha cheklanadi, harakatlar jurnalga yoziladi." },
      { title: "Zaxira nusxa va tiklash", body: "Avtomatik kunlik zaxira nusxa sozlanadi. Nosozlik yuz bersa, tizim oxirgi ishonchli holatga qaytariladi." },
    ],
  },
  office: {
    eyebrow: "OFISDA",
    title: "Toshkentdagi jamoamiz, ish paytida.",
    sub: "Studiya emas — haqiqiy ish kunlari.",
  },
  stack: { eyebrow: "BIZNING STACK", title: "Ishonchli, sanoat standarti texnologiyalar." },
  journal: {
    eyebrow: "MAQOLALAR",
    title: "Nimani bilamiz — ochiq yozamiz.",
    sub: "ERP joriy qilish, AI avtomatlashtirish va raqamlashtirish bo'yicha amaliy maqolalar.",
    readLabel: "O'qish",
    allLabel: "Barcha maqolalar",
    empty: "Maqolalar tez orada.",
  },
  process: {
    eyebrow: "QANDAY ISHLAYMIZ",
    title: "G'oyadan mahsulotgacha — 4 bosqich.",
    /* Named after what actually happens on an Empire project, not the
       Explore/Plan/Build/Commit any agency could have written. */
    steps: [
      { title: "Sexga chiqamiz", desc: "Ofisda emas — ish joyingizda. Jarayonni o'z ko'zimiz bilan ko'ramiz, kim nima qilishini yozib olamiz.", tags: ["Tahlil", "Audit"] },
      { title: "Summani qotiramiz", desc: "TZ, arxitektura va dizayn tayyor bo'lgach, narx va muddat shartnomada belgilanadi — keyin o'zgarmaydi.", tags: ["TZ", "Shartnoma", "Dizayn"] },
      { title: "Har 2 haftada ko'rsatamiz", desc: "Sprintlar bilan quramiz. Har ikki haftada ishlaydigan versiyani ko'rasiz — oxirida emas.", tags: ["Sprint", "Demo", "Test"] },
      { title: "Ishga tushiramiz va qolamiz", desc: "Xodimlarni o'qitamiz, ma'lumotni ko'chiramiz. 4 hafta bepul kuzatib turamiz.", tags: ["Migratsiya", "O'qitish", "Support"] },
    ],
  },
  team: {
    eyebrow: "BIZ KIMMIZ",
    title: "Ortida — real jamoa.",
    members: [
      { role: "Empire Group Direktori", bio: "Technical Product Manager & IT Konsultant — 7+ yil tajribaga ega." },
      { role: "Hammuassis va COO", bio: "6+ yil IT loyiha boshqaruvi; mijozlar, byudjet, jamoa koordinatsiyasi." },
      { role: "Senior Odoo Developer", bio: "5 yil Python/Odoo; 30+ custom modul; REST/XML-RPC integratsiya." },
      { role: "Biznes-analitik · ERP Consultant", bio: "4 yil biznes-tahlil; AS-IS/TO-BE; foydalanuvchi o'qitish." },
      { role: "Full-stack Developer", bio: "5 yil web/mobil; React, Next.js, Node.js, PostgreSQL." },
      { role: "Digital Marketing Lead", bio: "6 yil marketing; SEO, kontekst, lead generation." },
      { role: "DevOps · System Administrator", bio: "4 yil server infratuzilma; Linux, Docker, CI/CD." },
      { role: "UI/UX Designer", bio: "4 yil interfeys dizayni; Figma, dizayn tizimlari." },
    ],
  },
  testimonials: {
    eyebrow: "MIJOZLAR FIKRI",
    title: "Mijozlarimiz nima deydi.",
    prev: "Oldingi sharh",
    next: "Keyingi sharh",
    goTo: (n) => `${n}-sharhga o'tish`,
    items: [
      { quote: "Empire jamoasi 15 ta omborimiz va sotuv nuqtalarimizni yagona Odoo ERP tizimiga o'tkazib berdi. Avvallari haftalab qilinadigan inventarizatsiya hozir 1 kunda tugaydi. Omboriy yo'qotishlar 90% ga kamaydi.", name: "Alisher Raximov", role: "Asoschi", company: "Grand Osiyo Textile" },
      { quote: "Bemorlarni ro'yxatga olish va shifokorlar jadvalini avtomatlashtirish bo'yicha murojaat qilgandik. 3 oyda mukammal CRM topshirishdi. Qabul samaradorligi 40% ga oshdi, mijozlar kutish vaqti 2 barobar qisqardi.", name: "Dr. Sardor Zokirov", role: "Klinika tarmog'i rahbari", company: "MedFlow" },
      { quote: "Bizga og'ir texnikalar ijarasi uchun murakkab platforma kerak edi. Loyiha o'z vaqtida, belgilangan byudjetdan chiqmagan holda topshirildi. Hozirda tizim kuniga 100+ buyurtmalarni avtomatik qayta ishlamoqda.", name: "Javohir Qodirov", role: "Loyiha rahbari", company: "Texnika-Ijara" },
      { quote: "Sayt va CRM integratsiyasi orqali lidlar yo'qolishi to'xtadi. Har bir sotuvchi qaysi bosqichda ishlayotgani shaffof ko'rinib turadi. Professional yondashuv va texnik ko'mak uchun rahmat!", name: "Malika Umarova", role: "Marketing direktori", company: "Motor Lux" },
    ],
  },
  credentials: {
    eyebrow: "RASMIY MAQOM",
    title: "Hujjat bilan tasdiqlangan.",
    items: [
      { title: "Odoo Learning Partner", org: "Odoo S.A.", note: "Odoo vendorining rasmiy hamkori — mahsulot yangilanishlari, joriy qilish metodologiyasi va vendor ko'magiga to'g'ridan-to'g'ri kirish." },
      { title: "Davlat ro'yxatidan o'tganlik guvohnomasi", org: '"EMPIRE GROUP CORP" MCHJ', note: "Rasmiy yuridik shaxs — shartnoma tuzish, hisob-faktura berish va soliq majburiyatlarini bajarish huquqi hujjat bilan tasdiqlangan." },
      { title: "IT Park rezidenti", org: "IT Park O'zbekiston", note: "O'zbekiston IT sohasi rezidentlari reyestrida — texnopark kuratorligi, soliq imtiyozlari va davlat qo'llab-quvvatlash dasturlariga kirish." },
      { title: "ISO/IEC 27001", org: "Axborot xavfsizligi standarti", note: "Axborot xavfsizligini boshqarishning xalqaro standarti — mijoz bazasi, moliya va intellektual mulkni himoya qilish tartibi hujjatlashtirilgan." },
    ],
  },
  faq: {
    eyebrow: "SAVOL-JAVOB",
    title: "Ko'p so'raladigan savollar.",
    items: [
      { q: "Loyiha qancha vaqt oladi?", a: "Kichik MVP 3–4 hafta, o'rtacha loyiha 2–3 oy, yirik korporativ tizim 4–6 oy. Aniq muddat Explore bosqichida belgilanadi." },
      { q: "Narx qanday hisoblanadi?", a: "Fixed-scope: loyiha hajmi aniqlangach, aniq narx beriladi. Yashirin xarajatlar yo'q. Paketlar $5,000 dan boshlanadi." },
      { q: "Narxlar nega farq qiladi?", a: "Narx murakkablik, integratsiyalar va muddatga bog'liq. Har loyiha uchun alohida hisoblab beramiz." },
      { q: "Ishlab bo'lingandan keyin yordam beramizmi?", a: "Ha, ishga tushirgandan keyin qo'llab-quvvatlash, xatolarni tuzatish va rivojlantirish davom etadi." },
      { q: "To'lov qanday amalga oshiriladi?", a: "Bosqichma-bosqich: oldindan qism, keyin sprint natijalariga qarab. To'lov usullari kelishiladi." },
      { q: "Kod va ma'lumot kimga tegishli bo'ladi?", a: "Barchasi sizga tegishli. To'liq egalik sizda — hech qanday vendor lock-in yo'q." },
      { q: "Mavjud tizimimni davom ettira olasizmi?", a: "Ha, mavjud loyiha yoki tizimni ko'rib chiqib, davom ettirish yoki qayta qurish bo'yicha yechim beramiz." },
      { q: "Konsultatsiya bepulmi?", a: "Ha. Explore bosqichida barcha savollarga javob beramiz va aniq reja tuzamiz — hech qanday majburiyat yo'q." },
    ],
  },
  cta: {
    eyebrow: "TAYYORMISIZ?",
    title: "Loyihangizni bugun boshlaymiz.",
    call: "Qo'ng'iroq qilish",
    telegram: "Telegram orqali yozish",
    meta: "+998 99 116 46 58 · Toshkent · Konsultatsiya bepul",
  },
  footer: {
    desc: "Toshkentda AI, ERP va maxsus dasturiy ta'minot — g'oyadan ishga tushgan mahsulotgacha.",
    servicesHead: "Xizmatlar",
    companyHead: "Kompaniya",
    contactHead: "Aloqa",
    /* Routes, not just anchors — the service landing pages and the pricing
       page carry their own SEO and would otherwise be unreachable from here. */
    services: [
      ["Odoo ERP joriy qilish", "/xizmatlar/odoo-erp-joriy-qilish"],
      ["Maxsus dasturiy ta'minot", "/xizmatlar/maxsus-dasturiy-taminot"],
      ["Mobil ilova yaratish", "/xizmatlar/mobil-ilova-yaratish"],
      ["AI avtomatlashtirish", "/xizmatlar/ai-avtomatlashtirish"],
      ["Biznes avtomatlashtirish", "/tizimlashtirish"],
      ["Narxlar", "/narxlar"],
    ],
    regionsHead: "Hududlar",
    regions: [
      ["Toshkentda veb-sayt yaratish", "/xizmatlar/veb-sayt-yaratish-toshkent"],
      ["Toshkentda mobil ilova", "/xizmatlar/mobil-ilova-yaratish-toshkent"],
      ["Samarqandda veb-sayt", "/xizmatlar/veb-sayt-yaratish-samarqand"],
      ["Buxoroda IT xizmatlar", "/xizmatlar/it-xizmatlar-buxoro"],
    ],
    company: [
      ["Loyihalar", "#ishlar"],
      ["Shodlik Textile keysi", "#keys"],
      ["Jarayon", "#jarayon"],
      ["Jamoa", "#jamoa"],
      ["Sharhlar", "#sharhlar"],
      ["Maqolalar", "/blog"],
    ],
    contact: [
      [CONTACT.phonePrimary.label, CONTACT.phonePrimary.href],
      [CONTACT.phoneSecondary.label, CONTACT.phoneSecondary.href],
      ["Telegram", CONTACT.telegram.href],
      [CONTACT.email.label, CONTACT.email.href],
    ],
    legalHead: "Rekvizitlar",
    legal: [
      ['"EMPIRE GROUP CORP" MCHJ', ""],
      [`STIR: ${LEGAL_PLACEHOLDER}`, ""],
      ["Toshkent sh., —— tumani, —— ko'chasi", ""],
      [`H/r: ${LEGAL_PLACEHOLDER} · —— bank`, ""],
    ],
    rights: "© 2026 Empire Group. Barcha huquqlar himoyalangan.",
    place: "Toshkent · O'zbekiston",
  },
  themeLabel: "Mavzu",
  langLabel: "Til",
};

const ru: HomeCopy = {
  nav: {
    links: [
      ["Услуги", "#xizmatlar"],
      ["Проекты", "#loyihalar"],
      ["Процесс", "#jarayon"],
      ["Отзывы", "#sharhlar"],
      ["Журнал", "#jurnal"],
    ],
    cta: "Бесплатная консультация",
    openMenu: "Открыть меню",
    closeMenu: "Закрыть меню",
    menuLabel: "Главное меню",
  },
  hero: {
    eyebrow: "AI, ERP И ЗАКАЗНАЯ РАЗРАБОТКА",
    titleBefore: "Полностью ",
    titleAccent: "оцифровываем",
    titleAfter: " управление вашей компанией.",
    lede: "Объединяем продажи, склад, финансы, производство, логистику, закупки и HR в единую ERP-систему. С Odoo ERP или индивидуальными решениями вы переводите бизнес-процессы в цифру и управляете компанией в реальном времени из любой точки.",
    primary: "Начать проект",
    secondary: "Посмотреть работы",
  },
  stats: [
    ["2023", "ООО зарегистрировано"],
    ["8", "Человек в штате"],
    ["20+", "Внедрений Odoo ERP"],
    ["2–3 мес.", "Средний срок запуска"],
  ],
  proofEyebrow: "НАМ ДОВЕРЯЮТ",
  services: {
    eyebrow: "УСЛУГИ",
    title: "Два направления, один стандарт.",
    sub: "Заказная разработка или Odoo ERP — каждое строится с одинаковым качеством и прозрачным процессом.",
    more: "подробнее",
    items: [
      {
        tag: "СТРОИМ С НУЛЯ",
        title: "Заказная разработка",
        desc: "Веб- и мобильные приложения, внутренние системы и панели управления — точно под ваш бизнес, с нуля.",
        chips: ["React", "Node.js", "Flutter", "Docker"],
      },
      {
        tag: "ГОТОВАЯ ПЛАТФОРМА",
        title: "Внедрение Odoo ERP & AI",
        desc: "Все процессы в единой системе: продажи, склад, финансы, HR — с AI-автоматизацией и предиктивной аналитикой.",
        chips: ["Odoo ERP", "AI Automation", "Predictive Analytics"],
      },
    ],
  },
  portfolio: {
    eyebrow: "ПОРТФОЛИО",
    title: "Наши последние работы.",
    sub: "Реальные, запущенные проекты — за каждым решённая задача.",
    resultLabel: "Результат",
    showMore: (n) => `Ещё ${n} проекта`,
    ctaTitle: "Следующий — ваш",
    ctaDesc: "Спланируем и запустим ваш проект вместе.",
    ctaLink: "Начать проект",
    viewLink: "Посмотреть проект",
    items: [
      { seg: "АВТО · CRM", title: "Motor Lux — CRM и управление продажами", result: "Потери лидов прекратились, этап каждого продавца виден прозрачно", source: "Малика Умарова, директор по маркетингу", tags: ["CRM", "Web"] },
      { seg: "МЕДИЦИНА · CRM (PWA)", title: "MedFlow — CRM клиники и приём пациентов", result: "Эффективность приёма выросла на 40%, время ожидания сократилось вдвое", source: "Д-р Сардор Зокиров, руководитель сети", tags: ["PWA", "CRM"] },
      { seg: "ТЕКСТИЛЬ · ERP", title: "Grand Osiyo Textile — Odoo ERP для 15 складов", result: "Инвентаризация с недели сократилась до 1 дня, складские потери — на 90%", source: "Алишер Рахимов, основатель", tags: ["Odoo ERP", "Склад"] },
      { seg: "АРЕНДА · ПЛАТФОРМА", title: "Texnika Ijara — платформа аренды спецтехники", result: "Более 100 заказов в день обрабатываются автоматически", source: "Жавохир Кодиров, руководитель проекта", tags: ["Web", "Каталог"] },
      { seg: "ЭЛЕКТРОНИКА · E-COMMERCE", title: "GadgetSpace — онлайн-магазин электроники", result: "Каталог, корзина и оплата в одном потоке", tags: ["E-commerce"] },
      { seg: "МОДА · E-COMMERCE", title: "X Wear — магазин для бренда одежды", result: "Магазин в стиле бренда и каталог, связанный со складом", tags: ["E-commerce", "Web"] },
      { seg: "ТОРГОВЛЯ · POS", title: "Hilol Market — автоматизация торговли", result: "Касса, склад и отчётность в одной панели", tags: ["Retail", "POS"] },
    ],
  },
  caseStudy: {
    eyebrow: "ГЛАВНЫЙ КЕЙС",
    client: "Shodlik Textile",
    place: "Кашкадарья · вертикальный текстильный кластер",
    title: "От хлопка до готовой одежды — в одной системе.",
    lede: "От хлопкового сырья до пряжи, суровой ткани и готовой одежды — четыре передела, 337 сотрудников, три смены. Всё держалось на Excel и бумаге. Мы перевели весь кластер на Odoo 19 Enterprise и подключили заводское оборудование напрямую к ERP.",
    challengeLabel: "ЗАДАЧА",
    challenge: [
      "Каждый передел вёл свой учёт — хлопковый цех не видел пряжу, прядильный не видел ткань.",
      "Складские остатки считались вручную, отчёт опаздывал на несколько дней.",
      "Табель на бумаге — смены и опоздания 337 человек считались руками.",
      "Показания весов и станков записывались в тетрадь, потом переносились в Excel.",
      "Банковская выписка переносилась из 1С вручную, курс валют обновлялся вручную.",
    ],
    solutionLabel: "РЕШЕНИЕ",
    solution: [
      "Odoo 19 Enterprise на Odoo.sh (Git CI/CD) — 28 собственных модулей, написанных под этот кластер.",
      "Турникет Face-ID подключён к ERP: сотрудник проходит — табель пишется, смена и опоздание считаются автоматически.",
      "Промышленные весы связаны с производственным заказом — вес не вводится руками, MO закрывается автоматически.",
      "Телеметрия станков: приходит сигнал об ошибке — заявка на техобслуживание открывается сама.",
      "Курс ЦБ обновляется ежедневно автоматически, выписка 1С импортируется одной кнопкой.",
      "GS1-128 QR на партиях — рулон ткани прослеживается до партии хлопка.",
      "B2B экспортный сайт: заявка попадает прямо в CRM.",
    ],
    metricsLabel: "РЕЗУЛЬТАТ",
    metrics: [
      { value: "337", label: "сотрудников в системе" },
      { value: "28", label: "собственных модулей" },
      { value: "4", label: "аппаратные интеграции" },
      { value: "—", label: "Время инвентаризации", pending: true },
    ],
    stackLabel: "ТЕХНОЛОГИИ",
    stack: ["Odoo 19 Enterprise", "Odoo.sh", "PostgreSQL", "Python", "ISAPI", "GS1-128"],
    pendingNote: "Отмеченные показатели будут обновлены по итоговому отчёту клиента.",
    cta: "Обсудить похожий проект",
  },
  pricing: {
    eyebrow: "ЦЕНЫ",
    title: "Сколько стоит — не скрываем.",
    sub: "Fixed-scope: не почасово. После определения объёма сумма фиксируется в договоре и не меняется.",
    tracks: ["Заказная разработка", "Odoo ERP & AI"],
    popular: "ЧАЩЕ ВЫБИРАЮТ",
    cta: "Обсудить",
    note: "Fixed-scope · без скрытых платежей · 4 недели бесплатной поддержки в каждом пакете · код и права переходят вам.",
    software: [
      { tier: "STANDARD", price: "от $5,000", period: "2–3 мес.", featured: false, desc: "MVP, решающий одну конкретную задачу.", items: ["Лендинг или MVP", "Форма и интеграция", "Базовая админ-панель", "Адаптивный дизайн"] },
      { tier: "ADVANCED", price: "$15K – $40K", period: "4–6 мес.", featured: true, desc: "Полноценное приложение со сложной логикой.", items: ["Полное веб или мобильное приложение", "Интеграция с CRM", "Админ-панель и роли", "API и автоматизация"] },
      { tier: "MEGA", price: "$50,000+", period: "6–12 мес.", featured: false, desc: "Экосистема из нескольких приложений.", items: ["Крупная экосистема", "Микросервисы", "Высокая нагрузка", "Долгосрочный SLA"] },
    ],
    odoo: [
      { tier: "STANDARD", price: "от $8,800", period: "2–3 мес.", featured: false, desc: "Внедрение стандартных модулей Odoo.", items: ["Базовые модули", "Миграция данных", "Обучение сотрудников", "Стандартные отчёты"] },
      { tier: "ADVANCED", price: "$25K – $35K", period: "4–6 мес.", featured: true, desc: "Модули под бизнес и AI-автоматизация.", items: ["Полное внедрение ERP", "Кастомные модули", "AI-автоматизация", "Внешние интеграции"] },
      { tier: "MEGA", price: "$85,000+", period: "~1 год", featured: false, desc: "Полная цифровая трансформация предприятия.", items: ["Корпоративная экосистема", "Несколько филиалов / компаний", "Аппаратные интеграции", "SLA 24/7"] },
    ],
  },
  guarantee: {
    eyebrow: "А ЕСЛИ ЧТО-ТО ПОЙДЁТ НЕ ТАК?",
    title: "Самый частый вопрос — вот ответ.",
    sub: "Мы понимаем, чего опасается человек, доверяющий нам систему, на которой держится завод. Поэтому пишем это заранее.",
    items: [
      { title: "Код и данные — ваши", body: "По завершении проекта весь код, дизайн и права переходят вам. Никакого vendor lock-in — при желании ваша команда продолжит сама." },
      { title: "4 недели бесплатной поддержки", body: "Четыре недели после запуска исправление ошибок и донастройка — бесплатно. Дальнейшее обслуживание обсуждается отдельно и не обязательно." },
      { title: "Поэтапная оплата", body: "Аванс, затем оплата по завершении каждого этапа. Вы видите результат и только потом платите — вся сумма вперёд не нужна." },
      { title: "Договор и NDA", body: "Работаем по официальному договору как ООО «EMPIRE GROUP CORP». Соглашение о неразглашении для ваших бизнес-данных — стандартная практика." },
      { title: "Безопасность данных", body: "Данные хранятся на вашем сервере или в выбранном вами облаке. Доступ разграничен по ролям, действия пишутся в журнал." },
      { title: "Резервные копии и восстановление", body: "Настраивается автоматическое ежедневное резервное копирование. При сбое система возвращается к последнему надёжному состоянию." },
    ],
  },
  office: {
    eyebrow: "В ОФИСЕ",
    title: "Наша команда в Ташкенте, в работе.",
    sub: "Не студия — обычные рабочие дни.",
  },
  stack: { eyebrow: "НАШ СТЕК", title: "Надёжные технологии индустриального стандарта." },
  journal: {
    eyebrow: "ЖУРНАЛ",
    title: "Что знаем — пишем открыто.",
    sub: "Практические статьи о внедрении ERP, AI-автоматизации и цифровизации.",
    readLabel: "Читать",
    allLabel: "Все статьи",
    empty: "Статьи скоро появятся.",
  },
  process: {
    eyebrow: "КАК МЫ РАБОТАЕМ",
    title: "От идеи до продукта — 4 этапа.",
    steps: [
      { title: "Выезжаем в цех", desc: "Не в офисе — на вашем производстве. Смотрим процесс своими глазами и записываем, кто что делает.", tags: ["Анализ", "Аудит"] },
      { title: "Фиксируем сумму", desc: "После ТЗ, архитектуры и дизайна цена и срок закрепляются в договоре — дальше не меняются.", tags: ["ТЗ", "Договор", "Дизайн"] },
      { title: "Показываем раз в 2 недели", desc: "Строим спринтами. Каждые две недели вы видите работающую версию — а не только в конце.", tags: ["Спринт", "Демо", "Тест"] },
      { title: "Запускаем и остаёмся", desc: "Обучаем сотрудников, переносим данные. Четыре недели сопровождаем бесплатно.", tags: ["Миграция", "Обучение", "Support"] },
    ],
  },
  team: {
    eyebrow: "О НАС",
    title: "За этим — реальная команда.",
    members: [
      { role: "Директор Empire Group", bio: "Technical Product Manager и IT-консультант — 7+ лет опыта." },
      { role: "Сооснователь и COO", bio: "6+ лет управления IT-проектами; клиенты, бюджет, координация команды." },
      { role: "Senior Odoo Developer", bio: "5 лет Python/Odoo; 30+ кастомных модулей; интеграции REST/XML-RPC." },
      { role: "Бизнес-аналитик · ERP Consultant", bio: "4 года бизнес-анализа; AS-IS/TO-BE; обучение пользователей." },
      { role: "Full-stack Developer", bio: "5 лет web/mobile; React, Next.js, Node.js, PostgreSQL." },
      { role: "Digital Marketing Lead", bio: "6 лет маркетинга; SEO, контекст, лидогенерация." },
      { role: "DevOps · System Administrator", bio: "4 года серверной инфраструктуры; Linux, Docker, CI/CD." },
      { role: "UI/UX Designer", bio: "4 года дизайна интерфейсов; Figma, дизайн-системы." },
    ],
  },
  testimonials: {
    eyebrow: "ОТЗЫВЫ КЛИЕНТОВ",
    title: "Что говорят наши клиенты.",
    prev: "Предыдущий отзыв",
    next: "Следующий отзыв",
    goTo: (n) => `Перейти к отзыву ${n}`,
    items: [
      { quote: "Команда Empire перевела наши 15 складов и точек продаж в единую систему Odoo ERP. Инвентаризация, которая раньше занимала недели, теперь завершается за 1 день. Складские потери сократились на 90%.", name: "Алишер Рахимов", role: "Основатель", company: "Grand Osiyo Textile" },
      { quote: "Мы обратились по автоматизации регистрации пациентов и расписания врачей. За 3 месяца сдали отличную CRM. Эффективность приёма выросла на 40%, время ожидания клиентов сократилось вдвое.", name: "Д-р Сардор Зокиров", role: "Руководитель сети клиник", company: "MedFlow" },
      { quote: "Нам была нужна сложная платформа для аренды спецтехники. Проект сдали в срок и без выхода за рамки бюджета. Сейчас система автоматически обрабатывает более 100 заказов в день.", name: "Жавохир Кодиров", role: "Руководитель проекта", company: "Texnika-Ijara" },
      { quote: "Благодаря интеграции сайта и CRM потери лидов прекратились. Прозрачно видно, на каком этапе работает каждый продавец. Спасибо за профессиональный подход и техническую поддержку!", name: "Малика Умарова", role: "Директор по маркетингу", company: "Motor Lux" },
    ],
  },
  credentials: {
    eyebrow: "ОФИЦИАЛЬНЫЙ СТАТУС",
    title: "Подтверждено документом.",
    items: [
      { title: "Odoo Learning Partner", org: "Odoo S.A.", note: "Официальный партнёр вендора Odoo — прямой доступ к обновлениям продукта, методологии внедрения и поддержке вендора." },
      { title: "Свидетельство о государственной регистрации", org: "«EMPIRE GROUP CORP» ООО", note: "Официальное юридическое лицо — право заключать договоры, выставлять счета-фактуры и исполнять налоговые обязательства подтверждено документом." },
      { title: "Резидент IT Park", org: "IT Park Узбекистан", note: "В реестре резидентов IT-отрасли Узбекистана — кураторство технопарка, налоговые льготы и доступ к государственным программам поддержки." },
      { title: "ISO/IEC 27001", org: "Стандарт информационной безопасности", note: "Международный стандарт управления информационной безопасностью — порядок защиты клиентской базы, финансов и интеллектуальной собственности задокументирован." },
    ],
  },
  faq: {
    eyebrow: "ВОПРОСЫ И ОТВЕТЫ",
    title: "Часто задаваемые вопросы.",
    items: [
      { q: "Сколько времени занимает проект?", a: "Небольшой MVP — 3–4 недели, средний проект — 2–3 месяца, крупная корпоративная система — 4–6 месяцев. Точный срок определяется на этапе Explore." },
      { q: "Как рассчитывается цена?", a: "Fixed-scope: после определения объёма проекта даётся точная цена. Скрытых расходов нет. Пакеты начинаются от $5,000." },
      { q: "Почему цены различаются?", a: "Цена зависит от сложности, интеграций и сроков. Для каждого проекта считаем отдельно." },
      { q: "Оказываете ли поддержку после разработки?", a: "Да, после запуска продолжается поддержка, исправление ошибок и развитие." },
      { q: "Как осуществляется оплата?", a: "Поэтапно: часть предоплатой, затем по результатам спринтов. Способы оплаты обсуждаются." },
      { q: "Кому принадлежат код и данные?", a: "Всё принадлежит вам. Полное владение у вас — никакого vendor lock-in." },
      { q: "Можете ли продолжить мою существующую систему?", a: "Да, рассмотрим существующий проект или систему и предложим решение по продолжению или переработке." },
      { q: "Консультация бесплатная?", a: "Да. На этапе Explore ответим на все вопросы и составим чёткий план — без каких-либо обязательств." },
    ],
  },
  cta: {
    eyebrow: "ГОТОВЫ?",
    title: "Начнём ваш проект сегодня.",
    call: "Позвонить",
    telegram: "Написать в Telegram",
    meta: "+998 99 116 46 58 · Ташкент · Консультация бесплатна",
  },
  footer: {
    desc: "AI, ERP и заказная разработка в Ташкенте — от идеи до работающего продукта.",
    servicesHead: "Услуги",
    companyHead: "Компания",
    contactHead: "Контакты",
    services: [
      ["Внедрение Odoo ERP", "/xizmatlar/odoo-erp-joriy-qilish"],
      ["Заказная разработка", "/xizmatlar/maxsus-dasturiy-taminot"],
      ["Мобильные приложения", "/xizmatlar/mobil-ilova-yaratish"],
      ["AI-автоматизация", "/xizmatlar/ai-avtomatlashtirish"],
      ["Автоматизация бизнеса", "/tizimlashtirish"],
      ["Цены", "/narxlar"],
    ],
    regionsHead: "Регионы",
    regions: [
      ["Создание сайта в Ташкенте", "/xizmatlar/veb-sayt-yaratish-toshkent"],
      ["Мобильные приложения в Ташкенте", "/xizmatlar/mobil-ilova-yaratish-toshkent"],
      ["Создание сайта в Самарканде", "/xizmatlar/veb-sayt-yaratish-samarqand"],
      ["IT-услуги в Бухаре", "/xizmatlar/it-xizmatlar-buxoro"],
    ],
    company: [
      ["Проекты", "#ishlar"],
      ["Кейс Shodlik Textile", "#keys"],
      ["Процесс", "#jarayon"],
      ["Команда", "#jamoa"],
      ["Отзывы", "#sharhlar"],
      ["Блог", "/blog"],
    ],
    contact: [
      [CONTACT.phonePrimary.label, CONTACT.phonePrimary.href],
      [CONTACT.phoneSecondary.label, CONTACT.phoneSecondary.href],
      ["Telegram", CONTACT.telegram.href],
      [CONTACT.email.label, CONTACT.email.href],
    ],
    legalHead: "Реквизиты",
    legal: [
      ["ООО «EMPIRE GROUP CORP»", ""],
      [`ИНН: ${LEGAL_PLACEHOLDER}`, ""],
      ["г. Ташкент, —— район, ул. ——", ""],
      [`Р/с: ${LEGAL_PLACEHOLDER} · банк ——`, ""],
    ],
    rights: "© 2026 Empire Group. Все права защищены.",
    place: "Ташкент · Узбекистан",
  },
  themeLabel: "Тема",
  langLabel: "Язык",
};

const en: HomeCopy = {
  nav: {
    links: [
      ["Services", "#xizmatlar"],
      ["Work", "#loyihalar"],
      ["Process", "#jarayon"],
      ["Reviews", "#sharhlar"],
      ["Journal", "#jurnal"],
    ],
    cta: "Free consultation",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    menuLabel: "Main menu",
  },
  hero: {
    eyebrow: "AI, ERP AND CUSTOM SOFTWARE",
    titleBefore: "We fully ",
    titleAccent: "digitise",
    titleAfter: " how your company is run.",
    lede: "We bring sales, inventory, finance, manufacturing, logistics, procurement and HR together in one ERP system. With Odoo ERP or custom-built software, your processes go digital and you run the company in real time from anywhere.",
    primary: "Start a project",
    secondary: "See our work",
  },
  stats: [
    ["2023", "LLC registered"],
    ["8", "People on staff"],
    ["20+", "Odoo ERP rollouts"],
    ["2–3 mo", "Typical time to launch"],
  ],
  proofEyebrow: "TRUSTED BY",
  services: {
    eyebrow: "SERVICES",
    title: "Two tracks, one standard.",
    sub: "Custom software or Odoo ERP — both are built to the same quality bar and the same transparent process.",
    more: "learn more",
    items: [
      {
        tag: "BUILT FROM SCRATCH",
        title: "Custom software",
        desc: "Web and mobile apps, internal systems and admin panels — built from scratch to fit exactly how your business works.",
        chips: ["React", "Node.js", "Flutter", "Docker"],
      },
      {
        tag: "READY PLATFORM",
        title: "Odoo ERP & AI rollout",
        desc: "Every process in one system: sales, inventory, finance, HR — with AI automation and predictive analytics.",
        chips: ["Odoo ERP", "AI Automation", "Predictive Analytics"],
      },
    ],
  },
  portfolio: {
    eyebrow: "PORTFOLIO",
    title: "Our recent work.",
    sub: "Real, shipped projects — each one a problem solved.",
    resultLabel: "Result",
    showMore: (n) => `${n} more projects`,
    ctaTitle: "The next one is yours",
    ctaDesc: "We will plan and ship your project together.",
    ctaLink: "Start a project",
    viewLink: "View project",
    items: [
      { seg: "AUTOMOTIVE · CRM", title: "Motor Lux — CRM and sales management", result: "Leads stopped falling through; every rep's stage is visible", source: "Malika Umarova, Marketing Director", tags: ["CRM", "Web"] },
      { seg: "HEALTHCARE · CRM (PWA)", title: "MedFlow — clinic CRM and patient intake", result: "Intake efficiency up 40%, patient wait time halved", source: "Dr. Sardor Zokirov, Head of clinic network", tags: ["PWA", "CRM"] },
      { seg: "TEXTILE · ERP", title: "Grand Osiyo Textile — Odoo ERP across 15 warehouses", result: "Stocktake went from weeks to one day; warehouse losses down 90%", source: "Alisher Rakhimov, Founder", tags: ["Odoo ERP", "Warehouse"] },
      { seg: "RENTAL · PLATFORM", title: "Texnika Ijara — heavy equipment rental platform", result: "100+ orders a day processed automatically", source: "Javokhir Kodirov, Project Lead", tags: ["Web", "Catalogue"] },
      { seg: "ELECTRONICS · E-COMMERCE", title: "GadgetSpace — online electronics store", result: "Catalogue, cart and payment in a single flow", tags: ["E-commerce"] },
      { seg: "FASHION · E-COMMERCE", title: "X Wear — store for a clothing brand", result: "A store in the brand's own voice, catalogue tied to stock", tags: ["E-commerce", "Web"] },
      { seg: "RETAIL · POS", title: "Hilol Market — retail automation", result: "Till, stock and reporting in one panel", tags: ["Retail", "POS"] },
    ],
  },
  caseStudy: {
    eyebrow: "FLAGSHIP CASE",
    client: "Shodlik Textile",
    place: "Qashqadaryo · vertically integrated textile cluster",
    title: "Cotton to finished garment — in one system.",
    lede: "From raw cotton through yarn, greige fabric and finished garments — four production stages, 337 staff, three shifts. All of it ran on Excel and paper. We moved the whole cluster onto Odoo 19 Enterprise and wired the factory hardware straight into the ERP.",
    challengeLabel: "THE PROBLEM",
    challenge: [
      "Each stage kept its own books — the cotton floor could not see yarn, spinning could not see fabric.",
      "Stock was counted by hand and the report arrived days late.",
      "Attendance was on paper — shifts and lateness for 337 people were worked out manually.",
      "Scale and machine readings went into a notebook, then into Excel.",
      "Bank statements were retyped out of 1C; exchange rates were updated by hand.",
    ],
    solutionLabel: "WHAT WE BUILT",
    solution: [
      "Odoo 19 Enterprise on Odoo.sh (Git CI/CD) — 28 custom modules written for this cluster.",
      "The Face-ID turnstile feeds the ERP: an employee walks through, attendance is written, shift and lateness are computed automatically.",
      "Industrial scales are tied to the manufacturing order — weight is never keyed in and the MO closes itself.",
      "Machine telemetry: an error signal opens a maintenance request on its own.",
      "Central bank rates update daily; the 1C bank statement imports in one click.",
      "GS1-128 QR on lots — a roll of fabric traces back to its cotton batch.",
      "A B2B export site that drops enquiries straight into CRM.",
    ],
    metricsLabel: "RESULT",
    metrics: [
      { value: "337", label: "staff on the system" },
      { value: "28", label: "custom modules" },
      { value: "4", label: "hardware integrations" },
      { value: "—", label: "Stocktake time", pending: true },
    ],
    stackLabel: "TECHNOLOGY",
    stack: ["Odoo 19 Enterprise", "Odoo.sh", "PostgreSQL", "Python", "ISAPI", "GS1-128"],
    pendingNote: "Marked figures will be updated from the client's final reporting.",
    cta: "Discuss a project like this",
  },
  pricing: {
    eyebrow: "PRICING",
    title: "What it costs — no hiding it.",
    sub: "Fixed scope, not hourly. Once the scope is agreed the figure is written into the contract and does not move.",
    tracks: ["Custom software", "Odoo ERP & AI"],
    popular: "MOST CHOSEN",
    cta: "Talk it through",
    note: "Fixed scope · no hidden charges · four weeks of support included · code and IP transfer to you.",
    software: [
      { tier: "STANDARD", price: "from $5,000", period: "2–3 months", featured: false, desc: "An MVP that solves one clear problem.", items: ["Landing page or MVP", "Forms and integration", "Basic admin panel", "Responsive design"] },
      { tier: "ADVANCED", price: "$15K – $40K", period: "4–6 months", featured: true, desc: "A full application with real business logic.", items: ["Full web or mobile app", "CRM integration", "Admin panel and roles", "API and automation"] },
      { tier: "MEGA", price: "$50,000+", period: "6–12 months", featured: false, desc: "An ecosystem of several applications.", items: ["Large ecosystem", "Microservices", "High load", "Long-term SLA"] },
    ],
    odoo: [
      { tier: "STANDARD", price: "from $8,800", period: "2–3 months", featured: false, desc: "Rolling out standard Odoo modules.", items: ["Core modules", "Data migration", "Staff training", "Standard reports"] },
      { tier: "ADVANCED", price: "$25K – $35K", period: "4–6 months", featured: true, desc: "Modules built around your business, plus AI.", items: ["Full ERP rollout", "Custom modules", "AI automation", "External integrations"] },
      { tier: "MEGA", price: "$85,000+", period: "~1 year", featured: false, desc: "Full digital transformation of an enterprise.", items: ["Enterprise ecosystem", "Multi-site / multi-company", "Hardware integrations", "24/7 SLA"] },
    ],
  },
  guarantee: {
    eyebrow: "WHAT IF IT GOES WRONG?",
    title: "The question we get most — here is the answer.",
    sub: "We know what worries someone handing over the system their factory runs on. So we put it in writing up front.",
    items: [
      { title: "The code and data are yours", body: "All code, design and IP transfer to you when the project closes. No vendor lock-in — your own team can carry it on if you want." },
      { title: "Four weeks of support included", body: "For four weeks after launch, fixes and adjustments are free. Ongoing maintenance after that is agreed separately and is not compulsory." },
      { title: "Paid in stages", body: "A deposit, then payment at the end of each stage. You see the result before you pay for it — no paying the whole sum up front." },
      { title: "Contract and NDA", body: 'We work under a formal contract as "EMPIRE GROUP CORP" LLC. A non-disclosure agreement covering your business data is standard practice.' },
      { title: "Data security", body: "Data lives on your server or a cloud you choose. Access is limited by role and actions are written to an audit log." },
      { title: "Backups and recovery", body: "Automatic daily backups are configured. If something fails, the system is restored to its last known good state." },
    ],
  },
  office: {
    eyebrow: "AT THE OFFICE",
    title: "Our Tashkent team, mid-work.",
    sub: "Not a studio — ordinary working days.",
  },
  stack: { eyebrow: "OUR STACK", title: "Dependable, industry-standard technology." },
  journal: {
    eyebrow: "JOURNAL",
    title: "What we know, we write down.",
    sub: "Practical writing on ERP rollouts, AI automation and going digital.",
    readLabel: "Read",
    allLabel: "All articles",
    empty: "Articles coming soon.",
  },
  process: {
    eyebrow: "HOW WE WORK",
    title: "Idea to product — four stages.",
    steps: [
      { title: "We come to the floor", desc: "Not to a meeting room — to your site. We watch the process ourselves and write down who does what.", tags: ["Analysis", "Audit"] },
      { title: "We fix the number", desc: "Once the spec, architecture and design are agreed, price and timeline go into the contract and stop moving.", tags: ["Spec", "Contract", "Design"] },
      { title: "You see it every two weeks", desc: "We build in sprints. Every fortnight you get a working version — not just at the end.", tags: ["Sprint", "Demo", "Test"] },
      { title: "We launch and stay", desc: "We train your staff and migrate the data, then watch over it free for four weeks.", tags: ["Migration", "Training", "Support"] },
    ],
  },
  team: {
    eyebrow: "WHO WE ARE",
    title: "A real team behind it.",
    members: [
      { role: "Director, Empire Group", bio: "Technical Product Manager & IT consultant — 7+ years of experience." },
      { role: "Co-founder & COO", bio: "6+ years running IT projects; clients, budgets, team coordination." },
      { role: "Senior Odoo Developer", bio: "5 years of Python/Odoo; 30+ custom modules; REST/XML-RPC integrations." },
      { role: "Business Analyst · ERP Consultant", bio: "4 years of business analysis; AS-IS/TO-BE; user training." },
      { role: "Full-stack Developer", bio: "5 years of web/mobile; React, Next.js, Node.js, PostgreSQL." },
      { role: "Digital Marketing Lead", bio: "6 years in marketing; SEO, paid search, lead generation." },
      { role: "DevOps · System Administrator", bio: "4 years of server infrastructure; Linux, Docker, CI/CD." },
      { role: "UI/UX Designer", bio: "4 years of interface design; Figma, design systems." },
    ],
  },
  testimonials: {
    eyebrow: "CLIENT FEEDBACK",
    title: "What our clients say.",
    prev: "Previous review",
    next: "Next review",
    goTo: (n) => `Go to review ${n}`,
    items: [
      { quote: "The Empire team moved our 15 warehouses and retail points onto a single Odoo ERP. A stocktake that used to take weeks now finishes in one day. Warehouse losses fell by 90%.", name: "Alisher Rakhimov", role: "Founder", company: "Grand Osiyo Textile" },
      { quote: "We came to them to automate patient registration and doctor scheduling. They delivered an excellent CRM in three months. Intake efficiency rose 40% and patient wait time halved.", name: "Dr. Sardor Zokirov", role: "Head of clinic network", company: "MedFlow" },
      { quote: "We needed a complex platform for heavy equipment rental. The project was delivered on time and within the agreed budget. The system now processes 100+ orders a day automatically.", name: "Javokhir Kodirov", role: "Project Lead", company: "Texnika-Ijara" },
      { quote: "Integrating the site with the CRM stopped us losing leads. You can see exactly which stage each salesperson is at. Thank you for the professional approach and the technical support!", name: "Malika Umarova", role: "Marketing Director", company: "Motor Lux" },
    ],
  },
  credentials: {
    eyebrow: "OFFICIAL STATUS",
    title: "Backed by documents.",
    items: [
      { title: "Odoo Learning Partner", org: "Odoo S.A.", note: "Official Odoo vendor partner — direct access to product updates, rollout methodology and vendor support." },
      { title: "Certificate of state registration", org: '"EMPIRE GROUP CORP" LLC', note: "A registered legal entity — the right to sign contracts, issue invoices and meet tax obligations is documented." },
      { title: "IT Park resident", org: "IT Park Uzbekistan", note: "On the register of Uzbekistan's IT industry residents — technopark oversight, tax relief and access to state support programmes." },
      { title: "ISO/IEC 27001", org: "Information security standard", note: "The international standard for managing information security — how client data, finances and IP are protected is documented." },
    ],
  },
  faq: {
    eyebrow: "Q&A",
    title: "Frequently asked questions.",
    items: [
      { q: "How long does a project take?", a: "A small MVP takes 3–4 weeks, a mid-size project 2–3 months, a large enterprise system 4–6 months. The exact timeline is set during Explore." },
      { q: "How is the price calculated?", a: "Fixed scope: once the scope is defined you get an exact price. No hidden costs. Packages start at $5,000." },
      { q: "Why do prices differ?", a: "Price depends on complexity, integrations and timeline. We quote every project individually." },
      { q: "Do you support the product after launch?", a: "Yes — support, bug fixes and further development continue after go-live." },
      { q: "How does payment work?", a: "In stages: a share up front, then against sprint results. Payment methods are agreed together." },
      { q: "Who owns the code and the data?", a: "You do. Full ownership stays with you — no vendor lock-in." },
      { q: "Can you take over my existing system?", a: "Yes. We review the existing project or system and propose either continuing it or rebuilding it." },
      { q: "Is the consultation free?", a: "Yes. During Explore we answer every question and put together a clear plan — with no obligation." },
    ],
  },
  cta: {
    eyebrow: "READY?",
    title: "Let's start your project today.",
    call: "Call us",
    telegram: "Message on Telegram",
    meta: "+998 99 116 46 58 · Tashkent · Consultation is free",
  },
  footer: {
    desc: "AI, ERP and custom software in Tashkent — from idea to a product in production.",
    servicesHead: "Services",
    companyHead: "Company",
    contactHead: "Contact",
    services: [
      ["Odoo ERP rollout", "/xizmatlar/odoo-erp-joriy-qilish"],
      ["Custom software", "/xizmatlar/maxsus-dasturiy-taminot"],
      ["Mobile app development", "/xizmatlar/mobil-ilova-yaratish"],
      ["AI automation", "/xizmatlar/ai-avtomatlashtirish"],
      ["Business automation", "/tizimlashtirish"],
      ["Pricing", "/narxlar"],
    ],
    regionsHead: "Regions",
    regions: [
      ["Website development in Tashkent", "/xizmatlar/veb-sayt-yaratish-toshkent"],
      ["Mobile apps in Tashkent", "/xizmatlar/mobil-ilova-yaratish-toshkent"],
      ["Website development in Samarkand", "/xizmatlar/veb-sayt-yaratish-samarqand"],
      ["IT services in Bukhara", "/xizmatlar/it-xizmatlar-buxoro"],
    ],
    company: [
      ["Work", "#ishlar"],
      ["Shodlik Textile case", "#keys"],
      ["Process", "#jarayon"],
      ["Team", "#jamoa"],
      ["Reviews", "#sharhlar"],
      ["Blog", "/blog"],
    ],
    contact: [
      [CONTACT.phonePrimary.label, CONTACT.phonePrimary.href],
      [CONTACT.phoneSecondary.label, CONTACT.phoneSecondary.href],
      ["Telegram", CONTACT.telegram.href],
      [CONTACT.email.label, CONTACT.email.href],
    ],
    legalHead: "Company details",
    legal: [
      ['"EMPIRE GROUP CORP" LLC', ""],
      [`Tax ID: ${LEGAL_PLACEHOLDER}`, ""],
      ["Tashkent, —— district, —— street", ""],
      [`Account: ${LEGAL_PLACEHOLDER} · —— bank`, ""],
    ],
    rights: "© 2026 Empire Group. All rights reserved.",
    place: "Tashkent · Uzbekistan",
  },
  themeLabel: "Theme",
  langLabel: "Language",
};

export const homeCopy: Record<Locale, HomeCopy> = { uz, ru, en };

/**
 * English glosses for the journal cards.
 *
 * The `posts` table carries Uzbek and Russian columns only, so an English
 * reader was being shown Uzbek headlines on the homepage. Until the table
 * grows `title_en` / `excerpt_en` (an admin-panel change, not a copy one),
 * this map supplies the headline. Where no excerpt is glossed the card simply
 * renders without one rather than showing a language the reader did not pick.
 */
export const journalEn: Record<string, { title: string; excerpt?: string }> = {
  "seo-xizmatlari-ozbekistonda-2026": {
    title: "SEO services in Uzbekistan: what matters in 2026",
    excerpt:
      "A current SEO strategy for reaching page one on Google.uz — technical SEO, content and local optimisation.",
  },
  "online-dokon-yaratish-ecommerce-uzbekiston": {
    title: "Building an online store: e-commerce in Uzbekistan, 2026",
    excerpt:
      "A full guide to opening an online store in Uzbekistan — platforms, costs, payment systems and logistics.",
  },
  "it-outsourcing-uzbekistan-kompaniyalar-uchun": {
    title: "IT outsourcing in Uzbekistan: a guide for foreign companies",
    excerpt:
      "The Uzbek IT outsourcing market — rates, quality, English proficiency and time-zone advantages.",
  },
  "mvp-nima-goyadan-mahsulotga-60-kunda": { title: "What an MVP is: idea to product in 60 days" },
  "it-loyiha-muvaffaqiyatining-5-omili": { title: "Five things that decide whether an IT project succeeds" },
  "nextjs-zamonaviy-veb-sayt-texnologiyasi": { title: "Next.js: the technology behind a modern website" },
  "crm-tizimi-mijozlarni-yoqotmaslik": { title: "A CRM system: how to stop losing customers" },
  "veb-sayt-yoki-mobil-ilova-qaysi-biri-kerak": { title: "Website or mobile app — which do you actually need?" },
  "ai-biznesda-qanday-ishlatish": { title: "How to put AI to work in your business" },
  "mobil-ilova-yaratish-narxi-va-muddati": { title: "What a mobile app costs and how long it takes" },
  "odoo-erp-biznesni-avtomatlashtirish": { title: "Odoo ERP: automating the business" },
  "performance-marketing-haqiqiy-samaradorlik-yoki-shunchaki-reklama": {
    title: "Performance marketing: real results or just advertising?",
  },
  "geo-nima-uchun-muhim": { title: "Why GEO matters" },
  "biznes-avtomatlashtirish-erp": { title: "Business automation with ERP" },
  "geo-generative-engine-optimization": { title: "GEO: generative engine optimisation" },
  "seo-nima-va-biznesga-foydasi": { title: "What SEO is and what it does for a business" },
};
