-- ============================================================
-- Empire Group CMS — initial schema
-- Run this in Supabase: SQL Editor → paste → Run
-- (or via CLI / MCP apply_migration)
-- ============================================================

create extension if not exists "pgcrypto";

create table if not exists public.posts (
  id            uuid primary key default gen_random_uuid(),
  slug          text unique not null,
  category      text default 'GEO',
  cover_url     text,
  status        text not null default 'draft' check (status in ('draft','published')),

  title_uz      text not null default '',
  title_ru      text not null default '',
  excerpt_uz    text default '',
  excerpt_ru    text default '',
  body_uz       text default '',   -- markdown
  body_ru       text default '',   -- markdown

  seo_title_uz  text default '',
  seo_title_ru  text default '',
  seo_desc_uz   text default '',
  seo_desc_ru   text default '',

  author        text default 'Empire Group',
  published_at  timestamptz,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index if not exists posts_status_pub_idx on public.posts (status, published_at desc);
create index if not exists posts_category_idx on public.posts (category);

-- keep updated_at fresh
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  if new.status = 'published' and new.published_at is null then
    new.published_at = now();
  end if;
  return new;
end $$;

drop trigger if exists posts_updated_at on public.posts;
create trigger posts_updated_at
  before update on public.posts
  for each row execute function public.set_updated_at();

drop trigger if exists posts_set_pub on public.posts;
create trigger posts_set_pub
  before insert on public.posts
  for each row execute function public.set_updated_at();

-- ============================================================
-- Row Level Security
-- ============================================================
alter table public.posts enable row level security;

-- Anyone (anon) can read ONLY published posts
drop policy if exists "public read published" on public.posts;
create policy "public read published"
  on public.posts for select
  to anon, authenticated
  using (status = 'published' or auth.role() = 'authenticated');

-- Authenticated (admin) users can do everything
drop policy if exists "auth full insert" on public.posts;
create policy "auth full insert" on public.posts for insert to authenticated with check (true);
drop policy if exists "auth full update" on public.posts;
create policy "auth full update" on public.posts for update to authenticated using (true) with check (true);
drop policy if exists "auth full delete" on public.posts;
create policy "auth full delete" on public.posts for delete to authenticated using (true);

-- ============================================================
-- Seed: 2 sample published posts (SEO/GEO themed)
-- ============================================================
insert into public.posts (slug, category, status, title_uz, title_ru, excerpt_uz, excerpt_ru, body_uz, body_ru, seo_desc_uz, seo_desc_ru, published_at)
values
('geo-nima-uchun-muhim', 'GEO', 'published',
 'GEO nima va nega 2026-yilda muhim?',
 'Что такое GEO и почему это важно в 2026?',
 'AI-qidiruv (ChatGPT, Gemini, Perplexity) davrida brendingiz qanday ko''rinadi — GEO optimizatsiyasi haqida.',
 'Как ваш бренд выглядит в эпоху AI-поиска (ChatGPT, Gemini, Perplexity) — про GEO-оптимизацию.',
 '## GEO nima?

Generative Engine Optimization — bu kontentingizni AI-qidiruv tizimlari javoblarida ko''rinadigan qilish.

- An''anaviy SEO Google''ning **10 ta havolasi** uchun kurashadi.
- GEO esa AI **bitta javob** berishida brendingiz tilga olinishini ta''minlaydi.

### Nega muhim?
Foydalanuvchilar tobora ko''proq ChatGPT va Perplexity''dan so''rayapti. Agar javobda siz yo''q bo''lsangiz — mijoz sizni umuman ko''rmaydi.',
 '## Что такое GEO?

Generative Engine Optimization — это подготовка вашего контента так, чтобы он попадал в ответы AI-поисковиков.

- Классическое SEO борется за **10 ссылок** Google.
- GEO обеспечивает упоминание бренда в **едином ответе** AI.

### Почему это важно?
Пользователи всё чаще спрашивают ChatGPT и Perplexity. Если вас нет в ответе — клиент вас не увидит.',
 'GEO (Generative Engine Optimization) — brendni AI-qidiruv javoblarida ko''rsatish usuli.',
 'GEO — способ показать бренд в ответах AI-поисковиков.',
 now()),
('biznes-avtomatlashtirish-erp', 'ERP', 'published',
 'Biznesni avtomatlashtirish: ERP qachon kerak?',
 'Автоматизация бизнеса: когда нужен ERP?',
 'Qo''lda ishlar ko''payganda va xatolar qimmatga tushganda — ERP haqida o''ylash vaqti keldi.',
 'Когда ручной работы становится много, а ошибки дорого обходятся — пора подумать об ERP.',
 '## Belgilar

1. Ma''lumot bir nechta Excel faylida tarqoq.
2. Ombor qoldig''i real vaqtda noma''lum.
3. Buyurtmalar qo''lda kiritiladi va yo''qoladi.

Agar shulardan 2 tasi tanish bo''lsa — ERP **xarajatni qaytaradi**.',
 '## Признаки

1. Данные разбросаны по нескольким Excel-файлам.
2. Остаток на складе неизвестен в реальном времени.
3. Заказы вводятся вручную и теряются.

Если узнали 2 из них — ERP **окупается**.',
 'ERP qachon kerakligini aniqlovchi 3 ta belgi.',
 '3 признака того, что бизнесу пора внедрять ERP.',
 now())
on conflict (slug) do nothing;
