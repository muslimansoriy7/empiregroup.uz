-- ============================================================
-- Empire Group CMS — Extended schema (migration 2)
-- Run in Supabase SQL Editor after 0001_init.sql
-- ============================================================

-- ── LEADS (forma yuborishlari) ─────────────────────────────
create table if not exists public.leads (
  id          uuid primary key default gen_random_uuid(),
  name        text,
  phone       text,
  service     text,
  message     text,
  source_page text,
  status      text default 'new' check (status in ('new','in_progress','done','spam')),
  notes       text default '',
  created_at  timestamptz not null default now()
);
alter table public.leads enable row level security;
drop policy if exists "auth leads full" on public.leads;
create policy "auth leads full" on public.leads for all to authenticated using (true) with check (true);

-- ── CASES (portfolio/case studies) ────────────────────────
create table if not exists public.cases (
  id            uuid primary key default gen_random_uuid(),
  slug          text unique not null,
  status        text default 'draft' check (status in ('draft','published')),
  client        text not null default '',
  industry      text default '',
  cover_url     text,
  service       text default '',
  title_uz      text default '',
  title_ru      text default '',
  problem_uz    text default '',
  problem_ru    text default '',
  solution_uz   text default '',
  solution_ru   text default '',
  result_uz     text default '',
  result_ru     text default '',
  duration      text default '',
  technologies  text[] default '{}',
  metrics       jsonb default '[]',
  published_at  timestamptz,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);
alter table public.cases enable row level security;
drop policy if exists "public read cases" on public.cases;
create policy "public read cases" on public.cases for select to anon, authenticated
  using (status = 'published' or auth.role() = 'authenticated');
drop policy if exists "auth cases full" on public.cases;
create policy "auth cases full" on public.cases for all to authenticated using (true) with check (true);

-- ── TESTIMONIALS ───────────────────────────────────────────
create table if not exists public.testimonials (
  id          uuid primary key default gen_random_uuid(),
  status      text default 'draft' check (status in ('draft','published')),
  client_name text not null default '',
  client_role text default '',
  company     text default '',
  industry    text default '',
  rating      int default 5 check (rating between 1 and 5),
  quote_uz    text default '',
  quote_ru    text default '',
  avatar_url  text,
  sort_order  int default 0,
  created_at  timestamptz not null default now()
);
alter table public.testimonials enable row level security;
drop policy if exists "public read testimonials" on public.testimonials;
create policy "public read testimonials" on public.testimonials for select to anon, authenticated
  using (status = 'published' or auth.role() = 'authenticated');
drop policy if exists "auth testi full" on public.testimonials;
create policy "auth testi full" on public.testimonials for all to authenticated using (true) with check (true);

-- ── FAQS (Schema.org uchun) ────────────────────────────────
create table if not exists public.faqs (
  id          uuid primary key default gen_random_uuid(),
  status      text default 'published' check (status in ('draft','published')),
  category    text default 'general',
  question_uz text not null default '',
  question_ru text default '',
  answer_uz   text not null default '',
  answer_ru   text default '',
  sort_order  int default 0,
  created_at  timestamptz not null default now()
);
alter table public.faqs enable row level security;
drop policy if exists "public read faqs" on public.faqs;
create policy "public read faqs" on public.faqs for select to anon, authenticated
  using (status = 'published' or auth.role() = 'authenticated');
drop policy if exists "auth faqs full" on public.faqs;
create policy "auth faqs full" on public.faqs for all to authenticated using (true) with check (true);

-- ── GLOSSARY ───────────────────────────────────────────────
create table if not exists public.glossary (
  id          uuid primary key default gen_random_uuid(),
  slug        text unique not null,
  status      text default 'published' check (status in ('draft','published')),
  term        text not null,
  term_full   text default '',
  short_uz    text default '',
  short_ru    text default '',
  desc_uz     text default '',
  desc_ru     text default '',
  empire_uz   text default '',
  empire_ru   text default '',
  sort_order  int default 0,
  created_at  timestamptz not null default now()
);
alter table public.glossary enable row level security;
drop policy if exists "public read glossary" on public.glossary;
create policy "public read glossary" on public.glossary for select to anon, authenticated
  using (status = 'published' or auth.role() = 'authenticated');
drop policy if exists "auth glossary full" on public.glossary;
create policy "auth glossary full" on public.glossary for all to authenticated using (true) with check (true);

-- ── Seed: sample testimonials ──────────────────────────────
insert into public.testimonials (client_name,client_role,company,industry,rating,quote_uz,quote_ru,status)
values
('Aliya M.','CEO','FinNova','Fintech',5,
 'Empire Group bizning xom g''oyamizni atigi 9 haftada to''liq ishlaydigan ilovaga aylantirdi.',
 'Empire Group превратила нашу сырую идею в полностью работающее приложение всего за 9 недель.',
 'published'),
('Omar F.','Asoschisi','Sooqi','E-commerce',5,
 '12 ta agentlikni ko''rib chiqdik. Empire — 48 soatda aniq taklif bergan yagonasi edi.',
 'Мы изучили 12 агентств. Empire — единственное, кто дал чёткое предложение за 48 часов.',
 'published')
on conflict do nothing;

-- ── Seed: FAQs ────────────────────────────────────────────
insert into public.faqs (category,question_uz,question_ru,answer_uz,answer_ru,sort_order,status)
values
('erp','ERP joriy etish qancha vaqt ketadi?','Сколько занимает внедрение ERP?',
 'Kichik-o''rta biznes uchun 2–4 oy. Asosiy tizim 8 haftada ishga tushiriladi.',
 'Для МСБ 2–4 месяца. Основная система запускается за 8 недель.',1,'published'),
('geo','GEO va SEO farqi nima?','В чём разница GEO и SEO?',
 'SEO Google pozitsiyasi uchun, GEO esa ChatGPT/Gemini javoblarida tilga olinish uchun.',
 'SEO — за позиции в Google, GEO — за упоминание в ответах ChatGPT/Gemini.',2,'published'),
('sayt','Sayt qilishda qancha vaqt ketadi?','Сколько времени делается сайт?',
 'Landing page — 7–14 kun, korporativ sayt — 21–35 kun, e-commerce — 30–60 kun.',
 'Лендинг — 7–14 дней, корпоративный сайт — 21–35 дней, e-commerce — 30–60 дней.',3,'published')
on conflict do nothing;
