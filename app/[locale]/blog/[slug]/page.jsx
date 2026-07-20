import Link from 'next/link';
import { notFound } from 'next/navigation';
import { marked } from 'marked';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { MobileDock } from '@/components/MobileDock';
import { TelegramFab } from '@/components/TelegramFab';
import { Container } from '@/components/Container';
import { getPostBySlug, getAdjacentPosts, L } from '@/lib/posts';
import { localePath, localeAlternates, canonicalFor, postLocales } from '@/lib/locale-path';
import { isLocale, defaultLocale } from '@/content';

// The language now comes from the URL rather than a query string, so the page
// can be cached and revalidated instead of rendered on every request.
export const revalidate = 60;

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://empiregroup.uz';

export async function generateMetadata({ params }) {
  const { slug, locale } = await params;
  const lang = isLocale(locale) ? locale : defaultLocale;
  const post = await getPostBySlug(slug);
  if (!post) return { title: 'Topilmadi' };
  const title = L(post, 'seo_title', lang) || L(post, 'title', lang);
  const desc = L(post, 'seo_desc', lang) || L(post, 'excerpt', lang);
  const path = `/blog/${post.slug}`;
  const url = `${SITE}${localePath(lang, path)}`;
  return {
    title,
    description: desc,
    alternates: {
      // English has no translation of the posts, so /en/blog/... defers to the
      // Uzbek URL instead of presenting itself as a separate document.
      canonical: canonicalFor(lang, path, postLocales),
      languages: { ...localeAlternates(path, postLocales), 'x-default': path },
    },
    openGraph: {
      type: 'article',
      title,
      description: desc,
      url,
      images: [post.cover_url || `${SITE}/og.png`],
      publishedTime: post.published_at,
      modifiedTime: post.updated_at,
    },
    twitter: { card: 'summary_large_image', title, description: desc },
  };
}

function fmt(d, lang) {
  if (!d) return '';
  try {
    return new Date(d).toLocaleDateString(lang === 'ru' ? 'ru-RU' : 'uz-UZ', {
      year: 'numeric', month: 'long', day: 'numeric',
    });
  } catch { return ''; }
}

export default async function PostPage({ params }) {
  const { slug, locale } = await params;
  const lang = isLocale(locale) ? locale : defaultLocale;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const title = L(post, 'title', lang);
  const body = L(post, 'body', lang);
  const html = marked.parse(body || '');

  const { prev, next, related } = await getAdjacentPosts(slug);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: L(post, 'excerpt', lang),
    image: post.cover_url ? [post.cover_url] : undefined,
    datePublished: post.published_at,
    dateModified: post.updated_at,
    author: { '@type': 'Organization', name: post.author || 'Empire Group' },
    publisher: { '@type': 'Organization', name: 'Empire Group' },
    mainEntityOfPage: `${SITE}${localePath(lang, `/blog/${post.slug}`)}`,
    inLanguage: lang,
  };

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Bosh sahifa', item: `${SITE}${localePath(lang, '/')}` },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE}${localePath(lang, '/blog')}` },
      { '@type': 'ListItem', position: 3, name: title, item: `${SITE}${localePath(lang, `/blog/${post.slug}`)}` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <Nav />
      <main>
        {/* Post hero */}
        <section className="relative overflow-hidden border-b border-hairline">
          <div className="pointer-events-none absolute inset-0 grid-lines opacity-60" aria-hidden />
          <Container className="relative py-12 md:py-16">
            <div className="mx-auto max-w-3xl">
              <Link
                href={localePath(lang, "/blog")}
                className="inline-flex items-center gap-1.5 text-sm text-mute transition-colors hover:text-ink"
              >
                ← Blog
              </Link>
              <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2">
                {post.category && <span className="eyebrow">{post.category}</span>}
                <span className="font-mono text-xs text-faint">
                  {fmt(post.published_at, lang)}
                </span>
                <span className="ml-auto inline-flex overflow-hidden rounded-[var(--radius-btn)] border border-hairline">
                  {['uz', 'ru'].map((l) => (
                    <Link
                      key={l}
                      href={localePath(l, `/blog/${post.slug}`)}
                      hrefLang={l}
                      className={`px-2.5 py-1 font-mono text-xs uppercase transition-colors ${
                        lang === l ? 'bg-ink text-elevated' : 'text-mute hover:text-ink'
                      }`}
                    >
                      {l}
                    </Link>
                  ))}
                </span>
              </div>
              <h1 className="mt-4 text-h2 font-semibold">{title}</h1>
              {L(post, 'excerpt', lang) && (
                <p className="mt-4 text-lead-lg text-body">{L(post, 'excerpt', lang)}</p>
              )}
            </div>
          </Container>
        </section>

        {/* Article body */}
        <Container className="py-12 md:py-16">
          <article className="mx-auto max-w-3xl">
            {post.cover_url && (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={post.cover_url}
                alt={title}
                className="mb-10 w-full rounded-[var(--radius-card-lg)] border border-hairline object-cover"
              />
            )}

            <div className="prose-eg" dangerouslySetInnerHTML={{ __html: html }} />

            {/* Prev / Next */}
            {(prev || next) && (
              <nav className="mt-14 grid gap-3 border-t border-hairline pt-8 sm:grid-cols-2">
                {prev ? (
                  <Link
                    href={localePath(lang, `/blog/${prev.slug}`)}
                    className="group flex flex-col gap-1.5 rounded-[var(--radius-card)] border border-hairline bg-elevated p-4 transition-colors hover:border-ink"
                  >
                    <span className="eyebrow">← Oldingi</span>
                    <span className="text-sm font-medium text-ink">{L(prev, 'title', lang)}</span>
                  </Link>
                ) : <span />}
                {next ? (
                  <Link
                    href={localePath(lang, `/blog/${next.slug}`)}
                    className="group flex flex-col gap-1.5 rounded-[var(--radius-card)] border border-hairline bg-elevated p-4 text-right transition-colors hover:border-ink sm:items-end"
                  >
                    <span className="eyebrow">Keyingi →</span>
                    <span className="text-sm font-medium text-ink">{L(next, 'title', lang)}</span>
                  </Link>
                ) : <span />}
              </nav>
            )}

            {/* Related */}
            {related.length > 0 && (
              <div className="mt-12">
                <h2 className="text-h3 font-semibold text-ink">Shu mavzuda</h2>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {related.map((r) => (
                    <Link
                      key={r.slug}
                      href={localePath(lang, `/blog/${r.slug}`)}
                      className="flex flex-col gap-1.5 rounded-[var(--radius-card)] border border-hairline bg-elevated p-4 transition-colors hover:border-ink"
                    >
                      {r.category && <span className="eyebrow">{r.category}</span>}
                      <span className="text-sm font-medium text-ink">{L(r, 'title', lang)}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-12 border-t border-hairline pt-8">
              <Link
                href={localePath(lang, "/blog")}
                className="inline-flex h-10 items-center rounded-[var(--radius-btn)] border border-hairline bg-elevated px-4 text-sm font-medium text-ink transition-colors hover:border-ink"
              >
                ← Blogga qaytish
              </Link>
            </div>
          </article>
        </Container>
      </main>
      <Footer />
      <MobileDock />
      <TelegramFab />
    </>
  );
}
