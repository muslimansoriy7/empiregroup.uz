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
  tags: string[];
};

export type V3Service = {
  tag: string;
  title: string;
  desc: string;
  chips: string[];
};

export type V3Step = { title: string; desc: string; tags: string[] };
export type V3Member = { role: string; bio: string };
export type V3Quote = { quote: string; name: string; role: string };
export type V3Credential = { title: string; org: string; status: string };
export type V3Faq = { q: string; a: string };

export type V3Copy = {
  nav: { links: Pair[]; cta: string; openMenu: string; closeMenu: string; menuLabel: string };
  hero: {
    eyebrow: string;
    titleBefore: string;
    titleAccent: string;
    titleAfter: string;
    lede: string;
    primary: string;
    secondary: string;
    cliTitle: string;
    cliCmd: string;
    cliRows: string[];
    mockLabel: string;
    mockStats: Pair[];
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
    items: V3Project[];
  };
  stack: { eyebrow: string; title: string };
  brands: { eyebrow: string; title: string };
  process: { eyebrow: string; title: string; steps: V3Step[] };
  team: { eyebrow: string; title: string; members: V3Member[] };
  testimonials: { eyebrow: string; title: string; items: V3Quote[] };
  credentials: { eyebrow: string; title: string; items: V3Credential[] };
  faq: { eyebrow: string; title: string; items: V3Faq[] };
  cta: { eyebrow: string; title: string; call: string; telegram: string; meta: string };
  footer: {
    desc: string;
    servicesHead: string;
    companyHead: string;
    contactHead: string;
    services: Pair[];
    company: Pair[];
    contact: Pair[];
    rights: string;
    place: string;
  };
  langLabel: string;
};

const uz: V3Copy = {
  nav: {
    links: [
      ["Xizmatlar", "#xizmatlar"],
      ["Loyihalar", "#loyihalar"],
      ["Jarayon", "#jarayon"],
      ["Sharhlar", "#sharhlar"],
    ],
    cta: "Bepul konsultatsiya",
    openMenu: "Menyuni ochish",
    closeMenu: "Menyuni yopish",
    menuLabel: "Asosiy menyu",
  },
  hero: {
    eyebrow: "AI & CUSTOM SOFTWARE DEVELOPMENT",
    titleBefore: "Biznesni ",
    titleAccent: "raqamlashtiramiz",
    titleAfter: " — g'oyadan ishga tushgan mahsulotgacha.",
    lede: "Murakkab ichki jarayonlarni ERP, AI, Web va App yechimlari orqali raqamlashtiramiz. G'oyadan tayyor tizim/mahsulotgacha — atigi 2–3 oyda.",
    primary: "Loyihani boshlash",
    secondary: "Ishlarni ko'rish",
    cliTitle: "empire — deploy",
    cliCmd: "empire deploy --project motor-lux",
    cliRows: ["Build tayyor · 2–3 oy", "ERP · AI · Web · App", "Ishga tushirildi"],
    mockLabel: "motor-lux · dashboard",
    mockStats: [
      ["SAVDO", "+38%"],
      ["BUYURTMA", "1,204"],
      ["UPTIME", "99.9%"],
    ],
  },
  stats: [
    ["50+", "Yakunlangan loyiha"],
    ["30+", "Mamnun mijoz"],
    ["15+", "Texnologiya"],
    ["3+ yil", "Tajriba"],
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
    items: [
      { seg: "AVTOMOBIL · CRM", title: "Motor Lux — CRM va savdo boshqaruvi", result: "Savdo va mijozlar bitta tizimda", tags: ["CRM", "Web"] },
      { seg: "TIBBIYOT · CRM (PWA)", title: "MedFlow — klinika CRM va bemor qabuli", result: "Qabul boshqaruvi 3× tezlashdi", tags: ["PWA", "CRM"] },
      { seg: "TO'QIMACHILIK · ERP", title: "Grand Osiyo Textile — ERP va ombor tizimi", result: "Ombor real vaqtda boshqariladi", tags: ["ERP", "Ombor"] },
      { seg: "IJARA · KATALOG", title: "Texnika Ijara — ijara va katalog sayti", result: "Onlayn bronlar 3× oshdi", tags: ["Web", "Katalog"] },
      { seg: "ELEKTRONIKA · E-COMMERCE", title: "GadgetSpace — onlayn elektronika do'koni", result: "Konversiya 2.1× oshdi", tags: ["E-commerce"] },
      { seg: "MODA · E-COMMERCE", title: "X Wear — kiyim brendi uchun do'kon", result: "O'rtacha chek 28% oshdi", tags: ["E-commerce", "Web"] },
      { seg: "SAVDO · POS", title: "Hilol Market — savdo avtomatlashtirish", result: "Hisob-kitob 2× tezlashdi", tags: ["Retail", "POS"] },
    ],
  },
  stack: { eyebrow: "BIZNING STACK", title: "Ishonchli, sanoat standarti texnologiyalar." },
  brands: { eyebrow: "GLOBAL STANDART", title: "Dunyo yetakchilari darajasida ishlaymiz." },
  process: {
    eyebrow: "QANDAY ISHLAYMIZ",
    title: "G'oyadan mahsulotgacha — 4 bosqich.",
    steps: [
      { title: "Explore", desc: "G'oya va muammoni chuqur o'rganamiz.", tags: ["Tahlil", "Audit"] },
      { title: "Plan", desc: "PRD, arxitektura, dizayn; muddat va byudjet aniq.", tags: ["PRD", "TZ", "Dizayn"] },
      { title: "Build", desc: "Kod, test, integratsiya; sprintlar, demo.", tags: ["Dev", "Test", "Demo"] },
      { title: "Commit", desc: "Ishga tushirish va uzoq muddatli qo'llab-quvvatlash.", tags: ["Deploy", "Support"] },
    ],
  },
  team: {
    eyebrow: "BIZ KIMMIZ",
    title: "Ortida — real jamoa.",
    members: [
      { role: "Ta'sischi va CEO · Technical Product Manager", bio: "7+ yil IT va biznes-avtomatlashtirish; Odoo ERP Partner Manager (Markaziy Osiyo/Kavkaz); 20+ ERP loyiha." },
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
    items: [
      { quote: "Empire Group eski qog'ozdagi ishimizni to'liq tizimga o'tkazdi — vaqt ancha tejaldi.", name: "Aliya M.", role: "Motor Lux · CRM" },
      { quote: "Empire bilan ishlash oson bo'ldi, muddat va byudjet aniq edi.", name: "Jasur T.", role: "GadgetSpace · E-commerce" },
      { quote: "Klinika ishini AI qo'shib avtomatlashtirdi. Qabul ancha tartibli.", name: "Doniyor R.", role: "MedFlow · Klinika" },
      { quote: "Zamonaviy dizayn, savdo hajmi ko'tarildi.", name: "Laziza K.", role: "X Wear · E-commerce" },
    ],
  },
  credentials: {
    eyebrow: "ISHONCH VA TASDIQ",
    title: "Rasmiy maqom va sertifikatlar.",
    items: [
      { title: "Odoo Learning Partner", org: "Odoo S.A.", status: "TASDIQLANGAN" },
      { title: "Davlat ro'yxatidan o'tganlik guvohnomasi", org: '"EMPIRE GROUP CORP" MCHJ', status: "TASDIQLANGAN" },
      { title: "IT Park rezidenti", org: "IT Park O'zbekiston", status: "KUTILMOQDA" },
      { title: "ISO/IEC 27001", org: "Axborot xavfsizligi standarti", status: "KUTILMOQDA" },
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
    services: [
      ["Maxsus dasturiy ta'minot", "#xizmatlar"],
      ["Odoo ERP & AI", "#xizmatlar"],
      ["Texnologiyalar", "#stack"],
    ],
    company: [
      ["Loyihalar", "#loyihalar"],
      ["Jarayon", "#jarayon"],
      ["Sharhlar", "#sharhlar"],
      ["Sertifikatlar", "#credentials"],
    ],
    contact: [
      ["Telegram", "https://t.me/muslimansoriy"],
      ["Email", "mailto:info@empiregroup.uz"],
      ["Telefon", "tel:+998991164658"],
    ],
    rights: "© 2026 Empire Group. Barcha huquqlar himoyalangan.",
    place: "Toshkent · O'zbekiston",
  },
  langLabel: "Til",
};

const ru: V3Copy = {
  nav: {
    links: [
      ["Услуги", "#xizmatlar"],
      ["Проекты", "#loyihalar"],
      ["Процесс", "#jarayon"],
      ["Отзывы", "#sharhlar"],
    ],
    cta: "Бесплатная консультация",
    openMenu: "Открыть меню",
    closeMenu: "Закрыть меню",
    menuLabel: "Главное меню",
  },
  hero: {
    eyebrow: "AI & CUSTOM SOFTWARE DEVELOPMENT",
    titleBefore: "",
    titleAccent: "Оцифровываем",
    titleAfter: " бизнес — от идеи до работающего продукта.",
    lede: "Переводим сложные внутренние процессы в цифру через ERP, AI, Web и App решения. От идеи до готовой системы — всего за 2–3 месяца.",
    primary: "Начать проект",
    secondary: "Посмотреть работы",
    cliTitle: "empire — deploy",
    cliCmd: "empire deploy --project motor-lux",
    cliRows: ["Сборка готова · 2–3 месяца", "ERP · AI · Web · App", "Запущено"],
    mockLabel: "motor-lux · dashboard",
    mockStats: [
      ["ПРОДАЖИ", "+38%"],
      ["ЗАКАЗЫ", "1,204"],
      ["UPTIME", "99.9%"],
    ],
  },
  stats: [
    ["50+", "Завершённых проектов"],
    ["30+", "Довольных клиентов"],
    ["15+", "Технологий"],
    ["3+ года", "Опыта"],
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
    items: [
      { seg: "АВТО · CRM", title: "Motor Lux — CRM и управление продажами", result: "Продажи и клиенты в одной системе", tags: ["CRM", "Web"] },
      { seg: "МЕДИЦИНА · CRM (PWA)", title: "MedFlow — CRM клиники и приём пациентов", result: "Управление приёмом ускорилось в 3×", tags: ["PWA", "CRM"] },
      { seg: "ТЕКСТИЛЬ · ERP", title: "Grand Osiyo Textile — ERP и складская система", result: "Склад управляется в реальном времени", tags: ["ERP", "Склад"] },
      { seg: "АРЕНДА · КАТАЛОГ", title: "Texnika Ijara — сайт аренды и каталог", result: "Онлайн-брони выросли в 3×", tags: ["Web", "Каталог"] },
      { seg: "ЭЛЕКТРОНИКА · E-COMMERCE", title: "GadgetSpace — онлайн-магазин электроники", result: "Конверсия выросла в 2.1×", tags: ["E-commerce"] },
      { seg: "МОДА · E-COMMERCE", title: "X Wear — магазин для бренда одежды", result: "Средний чек вырос на 28%", tags: ["E-commerce", "Web"] },
      { seg: "ТОРГОВЛЯ · POS", title: "Hilol Market — автоматизация торговли", result: "Расчёт на кассе ускорился в 2×", tags: ["Retail", "POS"] },
    ],
  },
  stack: { eyebrow: "НАШ СТЕК", title: "Надёжные технологии индустриального стандарта." },
  brands: { eyebrow: "ГЛОБАЛЬНЫЙ СТАНДАРТ", title: "Работаем на уровне мировых лидеров." },
  process: {
    eyebrow: "КАК МЫ РАБОТАЕМ",
    title: "От идеи до продукта — 4 этапа.",
    steps: [
      { title: "Explore", desc: "Глубоко разбираемся в идее и задаче.", tags: ["Анализ", "Аудит"] },
      { title: "Plan", desc: "PRD, архитектура, дизайн; сроки и бюджет точны.", tags: ["PRD", "ТЗ", "Дизайн"] },
      { title: "Build", desc: "Код, тесты, интеграции; спринты и демо.", tags: ["Dev", "Test", "Demo"] },
      { title: "Commit", desc: "Запуск и долгосрочная поддержка.", tags: ["Deploy", "Support"] },
    ],
  },
  team: {
    eyebrow: "О НАС",
    title: "За этим — реальная команда.",
    members: [
      { role: "Основатель и CEO · Technical Product Manager", bio: "7+ лет в IT и бизнес-автоматизации; Partner Manager по Odoo ERP (Центральная Азия/Кавказ); 20+ ERP-проектов." },
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
    items: [
      { quote: "Empire Group полностью перевели нашу бумажную работу в систему — сэкономили массу времени.", name: "Алия М.", role: "Motor Lux · CRM" },
      { quote: "С Empire работать было легко, сроки и бюджет были ясны.", name: "Жасур Т.", role: "GadgetSpace · E-commerce" },
      { quote: "Автоматизировали работу клиники с AI. Приём стал гораздо упорядоченнее.", name: "Дониёр Р.", role: "MedFlow · Клиника" },
      { quote: "Современный дизайн, объём продаж вырос.", name: "Лазиза К.", role: "X Wear · E-commerce" },
    ],
  },
  credentials: {
    eyebrow: "ДОВЕРИЕ И ПОДТВЕРЖДЕНИЕ",
    title: "Официальный статус и сертификаты.",
    items: [
      { title: "Odoo Learning Partner", org: "Odoo S.A.", status: "ПОДТВЕРЖДЕНО" },
      { title: "Свидетельство о государственной регистрации", org: '«EMPIRE GROUP CORP» ООО', status: "ПОДТВЕРЖДЕНО" },
      { title: "Резидент IT Park", org: "IT Park Узбекистан", status: "В ПРОЦЕССЕ" },
      { title: "ISO/IEC 27001", org: "Стандарт информационной безопасности", status: "В ПРОЦЕССЕ" },
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
      ["Заказная разработка", "#xizmatlar"],
      ["Odoo ERP & AI", "#xizmatlar"],
      ["Технологии", "#stack"],
    ],
    company: [
      ["Проекты", "#loyihalar"],
      ["Процесс", "#jarayon"],
      ["Отзывы", "#sharhlar"],
      ["Сертификаты", "#credentials"],
    ],
    contact: [
      ["Telegram", "https://t.me/muslimansoriy"],
      ["Email", "mailto:info@empiregroup.uz"],
      ["Телефон", "tel:+998991164658"],
    ],
    rights: "© 2026 Empire Group. Все права защищены.",
    place: "Ташкент · Узбекистан",
  },
  langLabel: "Язык",
};

const en: V3Copy = {
  nav: {
    links: [
      ["Services", "#xizmatlar"],
      ["Work", "#loyihalar"],
      ["Process", "#jarayon"],
      ["Reviews", "#sharhlar"],
    ],
    cta: "Free consultation",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    menuLabel: "Main menu",
  },
  hero: {
    eyebrow: "AI & CUSTOM SOFTWARE DEVELOPMENT",
    titleBefore: "We ",
    titleAccent: "digitise",
    titleAfter: " your business — from idea to a product in production.",
    lede: "We turn tangled internal processes into working software with ERP, AI, Web and App solutions. From idea to a running system in just 2–3 months.",
    primary: "Start a project",
    secondary: "See our work",
    cliTitle: "empire — deploy",
    cliCmd: "empire deploy --project motor-lux",
    cliRows: ["Build ready · 2–3 months", "ERP · AI · Web · App", "Shipped to production"],
    mockLabel: "motor-lux · dashboard",
    mockStats: [
      ["SALES", "+38%"],
      ["ORDERS", "1,204"],
      ["UPTIME", "99.9%"],
    ],
  },
  stats: [
    ["50+", "Projects delivered"],
    ["30+", "Happy clients"],
    ["15+", "Technologies"],
    ["3+ years", "Experience"],
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
    items: [
      { seg: "AUTOMOTIVE · CRM", title: "Motor Lux — CRM and sales management", result: "Sales and customers in one system", tags: ["CRM", "Web"] },
      { seg: "HEALTHCARE · CRM (PWA)", title: "MedFlow — clinic CRM and patient intake", result: "Intake handling got 3× faster", tags: ["PWA", "CRM"] },
      { seg: "TEXTILE · ERP", title: "Grand Osiyo Textile — ERP and warehouse system", result: "Warehouse runs in real time", tags: ["ERP", "Warehouse"] },
      { seg: "RENTAL · CATALOGUE", title: "Texnika Ijara — rental site and catalogue", result: "Online bookings up 3×", tags: ["Web", "Catalogue"] },
      { seg: "ELECTRONICS · E-COMMERCE", title: "GadgetSpace — online electronics store", result: "Conversion up 2.1×", tags: ["E-commerce"] },
      { seg: "FASHION · E-COMMERCE", title: "X Wear — store for a clothing brand", result: "Average order value up 28%", tags: ["E-commerce", "Web"] },
      { seg: "RETAIL · POS", title: "Hilol Market — retail automation", result: "Checkout got 2× faster", tags: ["Retail", "POS"] },
    ],
  },
  stack: { eyebrow: "OUR STACK", title: "Dependable, industry-standard technology." },
  brands: { eyebrow: "GLOBAL STANDARD", title: "We work at the level of the world's leaders." },
  process: {
    eyebrow: "HOW WE WORK",
    title: "Idea to product — four stages.",
    steps: [
      { title: "Explore", desc: "We dig into the idea and the real problem.", tags: ["Analysis", "Audit"] },
      { title: "Plan", desc: "PRD, architecture, design; timeline and budget are fixed.", tags: ["PRD", "Spec", "Design"] },
      { title: "Build", desc: "Code, tests, integrations; sprints and demos.", tags: ["Dev", "Test", "Demo"] },
      { title: "Commit", desc: "Launch and long-term support.", tags: ["Deploy", "Support"] },
    ],
  },
  team: {
    eyebrow: "WHO WE ARE",
    title: "A real team behind it.",
    members: [
      { role: "Founder & CEO · Technical Product Manager", bio: "7+ years in IT and business automation; Odoo ERP Partner Manager (Central Asia/Caucasus); 20+ ERP projects." },
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
    items: [
      { quote: "Empire Group moved our whole paper process into a system — it saved us a great deal of time.", name: "Aliya M.", role: "Motor Lux · CRM" },
      { quote: "Working with Empire was easy; the timeline and budget were clear from the start.", name: "Jasur T.", role: "GadgetSpace · E-commerce" },
      { quote: "They automated the clinic with AI. Patient intake is far more orderly now.", name: "Doniyor R.", role: "MedFlow · Clinic" },
      { quote: "Modern design, and our sales volume went up.", name: "Laziza K.", role: "X Wear · E-commerce" },
    ],
  },
  credentials: {
    eyebrow: "TRUST AND PROOF",
    title: "Official status and certificates.",
    items: [
      { title: "Odoo Learning Partner", org: "Odoo S.A.", status: "CONFIRMED" },
      { title: "Certificate of state registration", org: '"EMPIRE GROUP CORP" LLC', status: "CONFIRMED" },
      { title: "IT Park resident", org: "IT Park Uzbekistan", status: "IN PROGRESS" },
      { title: "ISO/IEC 27001", org: "Information security standard", status: "IN PROGRESS" },
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
      ["Custom software", "#xizmatlar"],
      ["Odoo ERP & AI", "#xizmatlar"],
      ["Technology", "#stack"],
    ],
    company: [
      ["Work", "#loyihalar"],
      ["Process", "#jarayon"],
      ["Reviews", "#sharhlar"],
      ["Certificates", "#credentials"],
    ],
    contact: [
      ["Telegram", "https://t.me/muslimansoriy"],
      ["Email", "mailto:info@empiregroup.uz"],
      ["Phone", "tel:+998991164658"],
    ],
    rights: "© 2026 Empire Group. All rights reserved.",
    place: "Tashkent · Uzbekistan",
  },
  langLabel: "Language",
};

export const v3Copy: Record<Locale, V3Copy> = { uz, ru, en };
