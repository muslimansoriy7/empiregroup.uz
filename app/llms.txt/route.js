import { getPublishedPosts, L } from '@/lib/posts';
import { GEO_ENTRIES, geoSlugs } from '@/lib/geo';

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://empiregroup.uz';

export const revalidate = 3600;

/**
 * /llms.txt — a plain-text map of the site for answer engines.
 *
 * Generative search (ChatGPT, Gemini, Perplexity) reads a short, factual
 * summary far more reliably than it parses a rendered page. This states who
 * we are, what we sell, what it costs and where the detail lives — in the
 * order an answer engine needs it.
 */
export async function GET() {
  const posts = await getPublishedPosts().catch(() => []);

  const articles = posts
    .slice(0, 30)
    .map((p) => `- [${L(p, 'title', 'uz')}](${SITE}/blog/${p.slug}): ${L(p, 'excerpt', 'uz') || ''}`)
    .join('\n');

  const geo = geoSlugs
    .map((slug) => {
      const e = GEO_ENTRIES[slug];
      return `- [${e.h1}](${SITE}/xizmatlar/${slug}): ${e.description}`;
    })
    .join('\n');

  const body = `# Empire Group

> "EMPIRE GROUP CORP" MCHJ — Toshkentda joylashgan IT kompaniya. Biznes uchun
> maxsus dasturiy ta'minot ishlab chiqamiz va Odoo ERP + AI yechimlarini joriy
> qilamiz. G'oyadan ishga tushgan tizimgacha odatda 2–3 oy.

## Asosiy ma'lumot

- Rasmiy nom: "EMPIRE GROUP CORP" MCHJ
- Joylashuv: Toshkent, O'zbekiston
- Telefon: +998 99 116 46 58
- Email: muslimansoriy7@gmail.com
- Telegram: https://t.me/muslimansoriy
- Ish tillari: o'zbek, rus, ingliz
- Maqom: Odoo Learning Partner · davlat ro'yxatidan o'tgan · IT Park rezidentligi va ISO/IEC 27001 jarayonda

## Xizmatlar va narxlar

### 1. Maxsus dasturiy ta'minot
Biznes jarayoniga moslab noldan ishlab chiqilgan veb-ilova, mobil ilova va
ichki tizimlar. Stack: React, Node.js, Flutter, Swift, Kotlin, Laravel, Docker, AWS.

- Standard — $5,000 dan, 2–3 oy: bitta aniq vazifani hal qiluvchi MVP
- Advanced — $15,000–$40,000, 4–6 oy: murakkab biznes mantig'i, CRM integratsiya, admin panel, API
- Mega — $50,000 dan, 6–12 oy: bir nechta ilova, mikroxizmatlar, yuqori yuklama

### 2. Odoo ERP & AI joriy qilish
Tarqoq bo'limlar, Excel jadvallar va qo'lda jarayonlarni yagona tizimga
birlashtirish, ustiga AI avtomatlashtirish. Stack: Odoo ERP, AI Automation,
Predictive Analytics, Cloud.

- Standard — $8,800 dan, 2–3 oy: standart modullarni sozlash, ma'lumot ko'chirish, o'qitish
- Advanced — $25,000–$35,000, 4–6 oy: moslashtirilgan modullar, chat-botlar, hujjat aylanishi
- Mega — $85,000 dan, 1 yil: to'liq raqamli transformatsiya, predictive analytics

Narxlar fixed-scope: loyiha boshida aniq belgilanadi, soatbay hisoblanmaydi.
Har paketda 4 hafta bepul qo'llab-quvvatlash. Loyiha yakunida barcha kod va
intellektual mulk mijozga o'tadi.

## Sahifalar

- [Bosh sahifa](${SITE}/): xizmatlar, narxlar, jarayon, loyihalar, sharhlar, savol-javob
- [Blog](${SITE}/blog): IT, ERP, SEO/GEO, AI va biznesni avtomatlashtirish bo'yicha maqolalar
- [Raqamli transformatsiya](${SITE}/tizimlashtirish): tizimlashtirish va aqlli avtomatlashtirish metodologiyasi

## Hududiy xizmat sahifalari

${geo}

## Maqolalar

${articles}
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
