# empiregroup.uz

Empire Group sayti. Next.js 15 + React 19 + Tailwind v4, kontent Supabase'da,
hosting Vercel'da. Sayt uch tilli va **doimiy qorong'i rejimda** — oq rejim yo'q.

---

## Boshlash

```bash
npm install
cp .env.local.example .env.local   # kalitlarni to'ldiring
npm run dev                        # http://localhost:3000
```

`.env.local` uchun kerak bo'ladigan kalitlar:

```env
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

> `SUPABASE_SERVICE_ROLE_KEY` **faqat serverda** kerak (ariza qabul qilish uchun).
> U RLS'ni chetlab o'tadi va barcha mijoz ma'lumotlariga kirish beradi —
> lokalda dizayn ustida ishlash uchun shart emas.

---

## Ish tartibi

`main` himoyalangan — to'g'ridan-to'g'ri push qilib bo'lmaydi.

```
branch ochasiz  →  push  →  Vercel avtomatik preview havolasi beradi
                                ↓
                        Pull Request ochasiz
                                ↓
                    tasdiqlangach main'ga qo'shiladi = deploy
```

```bash
git checkout -b dizayn/hero-yangilash
# ... ish ...
git push -u origin dizayn/hero-yangilash
```

---

## Papka tuzilmasi

```
app/
├── layout.tsx            HTML qobiq, Schema.org, analitika
├── globals.css           ⭐ BARCHA RANG VA USLUB — dizayn tokenlari shu yerda
├── [locale]/             sayt sahifalari (uz prefikssiz, /ru, /en)
│   ├── page.tsx          bosh sahifa — bloklar tartibi
│   ├── narxlar/          narxlar sahifasi
│   ├── blog/             blog ro'yxati va maqolalar
│   ├── xizmatlar/[slug]/ shahar bo'yicha GEO sahifalar
│   └── tizimlashtirish/  alohida landing (o'z uslubida)
├── admin/                CMS paneli — alohida eski uslubda, tegmang
└── api/leads/            ariza qabul qilish

components/
├── sections/             ⭐ bosh sahifa bloklari
│   ├── Hero, Showcase, ProofBar, Services, Process,
│   ├── Portfolio, WhyUs, Testimonials, Credentials, Faq, CtaBand
├── Nav.tsx  Footer.tsx  ConsultForm.tsx  ConsultModal.tsx
└── ...

content/                  ⭐ BARCHA MATN
├── uz.ts  ru.ts  en.ts   uchtasi bir xil tuzilmada
└── types.ts              tuzilma ta'rifi

lib/                      supabase, i18n, geo, posts
public/                   rasmlar, sertifikatlar, og.png
middleware.js             til yo'naltirish + admin himoyasi
```

---

## Dizayn qayerdan boshqariladi

Barcha rang, shrift, oraliq va radius **`app/globals.css`** dagi `@theme`
blokida. Bitta joyni o'zgartirsangiz — butun sayt o'zgaradi.

```css
--color-ink        matn va asosiy tugmalar
--color-body       oddiy matn
--color-mute       ikkilamchi matn
--color-hairline   chegaralar
--color-canvas     sahifa foni
--color-elevated   karta foni
--color-link       havola/aksent
--radius-card, --radius-btn, --radius-pill
--shadow-whisper, --shadow-float
```

Tailwind klasslari shu tokenlarga bog'langan: `text-ink`, `bg-canvas`,
`border-hairline`, `rounded-[var(--radius-card)]` va hokazo.
**To'g'ridan-to'g'ri hex rang yozmang** — kerak bo'lsa yangi token qo'shing.

---

## Qoidalar

**Matnga tegmang.** Barcha matn `content/uz.ts`, `ru.ts`, `en.ts` da.
Uchtasi bir xil tuzilmada bo'lishi shart — biriga maydon qo'shsangiz,
qolgan ikkisiga ham qo'shing, aks holda build yiqiladi (`types.ts` tekshiradi).

**Sayt faqat qorong'i.** `prefers-color-scheme` ishlatilmaydi, oq rejim yo'q.
Ataylab oq qolgan yagona joy — sertifikat kartalaridagi hujjat skanlari.

**Havolalarni qo'lda yozmang.** Til prefiksi avtomatik qo'shiladi:

```tsx
const sectionHref = useSectionHref();
<Link href={sectionHref("/blog")}>        // uz: /blog, ru: /ru/blog
```

**Sahifalar statik.** Komponentda `cookies()` yoki `headers()` chaqirmang —
bu butun sahifani dinamik qiladi va keshni o'chiradi.

**Animatsiya.** Scroll reveal uchun `<Reveal>`, smooth scroll — lenis,
murakkab animatsiya — framer-motion. `prefers-reduced-motion` hurmat qilinadi.

**Tegilmaydigan joylar:** `app/admin/`, `app/api/`, `middleware.js`,
`lib/supabase/`, `app/sitemap.js`, `app/robots.js`.

---

## Tekshirish

```bash
npm run build     # build yiqilmasligi shart
npm run lint
```

Build o'tmaguncha PR ochmang.

---

## Supabase jadvallari

| Jadval | Nima |
|---|---|
| `posts` | blog maqolalari (uz/ru, draft/published) |
| `leads` | saytdan kelgan arizalar |
| `testimonials`, `cases`, `faqs` | admin panelda tahrirlanadi |
| `companies` | ichki CRM |

Blog kontenti `lib/posts.js` orqali sessiyasiz mijoz bilan o'qiladi
(`lib/supabase/public.js`) — bu sahifalar keshlanishi uchun zarur.
