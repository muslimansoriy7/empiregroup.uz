import Link from 'next/link';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { MobileDock } from '@/components/MobileDock';
import { TelegramFab } from '@/components/TelegramFab';
import { Container } from '@/components/Container';
import { Reveal } from '@/components/Reveal';
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
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
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((p, i) => (
                <Reveal key={p.id} delay={Math.min(i, 5) * 0.05} className="h-full">
                  <Link
                    href={localePath(lang, `/blog/${p.slug}`)}
                    className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-card-lg)] border border-hairline bg-elevated transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-float)]"
                  >
                    <div className="relative aspect-[16/9] overflow-hidden border-b border-hairline bg-hairline-soft">
                      {p.cover_url ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                          src={p.cover_url}
                          alt={L(p, 'title', lang)}
                          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="grid size-full place-items-center grid-lines">
                          <span className="font-mono text-2xl text-faint">EG</span>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col gap-2.5 p-5">
                      {p.category && (
                        <span className="eyebrow">{p.category}</span>
                      )}
                      <h2 className="text-h3 font-semibold text-ink">
                        {L(p, 'title', lang)}
                      </h2>
                      <p className="flex-1 text-sm text-body">
                        {L(p, 'excerpt', lang)}
                      </p>
                      <div className="mt-2 flex items-center justify-between border-t border-hairline pt-3 text-xs">
                        <span className="font-mono text-faint">{fmt(p.published_at)}</span>
                        <span className="font-medium text-ink transition-transform duration-300 group-hover:translate-x-0.5">
                          O&apos;qish →
                        </span>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          )}
        </Container>
      </main>
      <Footer />
      <MobileDock />
      <TelegramFab />
    </>
  );
}
