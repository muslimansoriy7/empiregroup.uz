import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { MobileDock } from '@/components/MobileDock';
import { TelegramFab } from '@/components/TelegramFab';
import { Container } from '@/components/Container';
import { Reveal } from '@/components/Reveal';
import { BlogGrid } from '@/components/BlogGrid';
import { getPublishedPosts, L } from '@/lib/posts';
import { localePath, localeAlternates, canonicalFor, postLocales } from '@/lib/locale-path';
import { isLocale, dictionaries, defaultLocale } from '@/content';

export const revalidate = 60;
const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://empiregroup.uz';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const lang = isLocale(locale) ? locale : defaultLocale;
  return {
    title: { absolute: 'Blog — IT, SEO, AI va Biznes | Empire Group' },
    description: "IT, SEO/GEO, AI avtomatlashtirish, mobil ilova va veb-sayt yaratish bo'yicha maqolalar. O'zbekiston IT sohasida bilim bazasi.",
    alternates: {
      canonical: canonicalFor(lang, '/blog', postLocales),
      languages: { ...localeAlternates('/blog', postLocales), 'x-default': '/blog' },
    },
    openGraph: {
      title: 'Blog — Empire Group',
      description: "IT, SEO/GEO, AI va biznesni avtomatlashtirish bo'yicha foydali maqolalar.",
      url: `${SITE}${localePath(lang, '/blog')}`,
      type: 'website',
      images: [{ url: `${SITE}/og.png`, width: 1200, height: 630 }],
    },
    // Prevent inheriting the root layout's (home page) twitter card.
    twitter: {
      card: 'summary_large_image',
      title: 'Blog — Empire Group',
      description: "IT, SEO/GEO, AI va biznesni avtomatlashtirish bo'yicha foydali maqolalar.",
      images: [`${SITE}/og.png`],
    },
  };
}

function fmt(d) {
  if (!d) return '';
  try {
    return new Date(d).toLocaleDateString('uz-UZ', {
      year: 'numeric', month: 'short', day: 'numeric',
    });
  } catch { return ''; }
}

const STATIC_POSTS = [
  {
    id: 'static-odoo',
    slug: 'odoo-joriy-qilish-bosqichlari',
    title_uz: "Odoo ERP joriy qilishning 5 fazasi",
    excerpt_uz: "Discovery, Design, Build, Deploy va Support — Odoo ERP joriy qilishning beshta fazasi. Har biri uchun maqsad, faoliyat, natija va xavflar.",
    category: 'Odoo ERP',
    published_at: '2025-07-18',
    cover_url: null,
  },
  {
    id: 'static-tz',
    slug: 'transformatsiya-zanjiri',
    title_uz: "Biznes transformatsiyasining 5 bosqichli zanjiri",
    excerpt_uz: "Raqamlashtirish — bu faqat dastur o'rnatish emas. Besh bosqichli zanjir orqali biznesingizni tizimli transformatsiya qiling.",
    category: 'Transformatsiya',
    published_at: '2025-07-15',
    cover_url: null,
  },
];

export default async function BlogPage({ params }) {
  const { locale } = await params;
  const lang = isLocale(locale) ? locale : defaultLocale;
  const dbPosts = await getPublishedPosts();
  const dbSlugs = new Set(dbPosts.map(p => p.slug));
  const posts = [
    ...dbPosts,
    ...STATIC_POSTS.filter(s => !dbSlugs.has(s.slug)),
  ];

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: posts.slice(0, 20).map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${SITE}${localePath(lang, `/blog/${p.slug}`)}`,
      name: L(p, 'title', lang),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema).replace(/</g, "\\u003c") }}
      />
      <Nav />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-hairline">
          <div className="pointer-events-none absolute inset-0 grid-lines opacity-60" aria-hidden />
          <Container className="relative py-16 md:py-24">
            <Reveal>
              <div className="eyebrow">Blog</div>
              <h1 className="mt-3 max-w-3xl text-h2 font-semibold">
                Bilim — o&apos;sish uchun
              </h1>
              <p className="mt-4 max-w-xl text-lead text-body">
                SEO, GEO, AI va biznesni avtomatlashtirish bo&apos;yicha maqolalar.
              </p>
            </Reveal>
          </Container>
        </section>

        {/* Posts */}
        <Container className="py-14 md:py-20">
          {posts.length === 0 ? (
            <div className="rounded-[var(--radius-card-lg)] border border-hairline bg-elevated px-6 py-16 text-center">
              <div className="mx-auto grid size-12 place-items-center rounded-[var(--radius-btn)] border border-hairline font-mono text-lg text-ink">
                B
              </div>
              <p className="mt-4 text-sm text-mute">
                Hozircha maqola yo&apos;q.<br />Admin paneldan birinchi maqolani qo&apos;shing.
              </p>
            </div>
          ) : (
            <BlogGrid
              posts={posts.map((p) => ({
                id: String(p.id),
                slug: p.slug,
                href: localePath(lang, `/blog/${p.slug}`),
                title: L(p, 'title', lang),
                excerpt: L(p, 'excerpt', lang),
                category: p.category || null,
                date: fmt(p.published_at),
                cover: p.cover_url || null,
              }))}
            />
          )}
        </Container>
      </main>
      <Footer />
      <MobileDock />
      <TelegramFab />
    </>
  );
}
