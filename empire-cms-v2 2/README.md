# Empire Group CMS — To'liq O'rnatish Qo'llanmasi

## Tezkor boshlash

### 1. Supabase loyiha yarating
1. **supabase.com** → New Project
2. **SQL Editor** → Yangi query:
   ```sql
   -- Avval 0001_init.sql ni joylashtiring
   -- Keyin 0002_extend.sql ni joylashtiring
   ```
3. **Authentication → Users → Add User** (admin email + parol)

### 2. .env.local faylini to'ldiring
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
NEXT_PUBLIC_SITE_URL=https://empiregroup.uz
```

### 3. Lokal ishga tushirish
```bash
npm install
npm run dev
# → http://localhost:3000/admin
```

### 4. Vercel deploy
```bash
# GitHub'ga yuklang yoki zip'dan import qiling
# Vercel dashboard → Environment Variables → 4 ta kalit kiriting
# Deploy
```

---

## Analytics o'rnatish (empiregroup.uz/empire-group-site.html)

### GA4
1. analytics.google.com → Yangi property → Web → URL: empiregroup.uz
2. Measurement ID ni oling (G-XXXXXXXXXX)
3. `head_index.html` faylida `GA_MEASUREMENT_ID` ni almashtiring

### Meta Pixel
1. business.facebook.com → Events Manager → Yangi pixel
2. Pixel ID ni oling
3. `head_index.html` faylida `META_PIXEL_ID` ni almashtiring

### Telegram Bot (forma)
1. Telegram → @BotFather → /newbot → Token oling
2. @userinfobot → Chat ID oling
3. `foot_spa.html` faylida:
   ```javascript
   var TG_TOKEN='your_bot_token_here';
   var TG_CHAT='your_chat_id_here';
   ```

---

## Admin paneli sahifalari

| Sahifa | URL | Maqsad |
|--------|-----|--------|
| Dashboard | /admin | Umumiy ko'rinish, statistika |
| Blog | /admin/posts | Maqolalar yozish/tahrirlash |
| **Leads** | /admin/leads | Forma arizalarini ko'rish va boshqarish |
| **Cases** | /admin/cases | Portfolio case study'larni qo'shish |
| **Testimonials** | /admin/testimonials | Mijoz izohlarini boshqarish |
| **FAQs** | /admin/faqs | Savol-javoblar (Schema.org uchun) |

---

## SQL Migratsiyalar (ketma-ketlik muhim!)

1. `supabase/migrations/0001_init.sql` — Blog posts, RLS
2. `supabase/migrations/0002_extend.sql` — Leads, Cases, Testimonials, FAQs, Glossary

---

## SEO va GEO tekshiruv ro'yxati

- [ ] GA4 o'rnatildi
- [ ] Meta Pixel o'rnatildi
- [ ] Telegram bot ulandi
- [ ] Google Search Console → sayt tasdiqlandi
- [ ] Sitemap.xml yuborildi (GSC → Sitemaps → /sitemap.xml)
- [ ] Schema.org tekshirildi (search.google.com/test/rich-results)
- [ ] Blog'da birinchi 3 maqola joylandi
- [ ] Case studies qo'shildi
- [ ] Testimoniallar qo'shildi
- [ ] FAQlar Schema.org bilan qo'shildi
