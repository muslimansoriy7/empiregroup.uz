import Link from 'next/link';
import { notFound } from 'next/navigation';
import { marked } from 'marked';
import Navbar from '@/components/home/Navbar';
import HomeFooter from '@/components/home/HomeFooter';
import { getPostBySlug, getAllSlugs, getAdjacentPosts, L } from '@/lib/posts';

export const revalidate = 60;
const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://empiregroup.uz';

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params, searchParams }) {
  const post = await getPostBySlug(params.slug);
  if (!post) return { title: 'Topilmadi' };
  const lang = searchParams?.lang === 'ru' ? 'ru' : 'uz';
  const title = L(post, 'seo_title', lang) || L(post, 'title', lang);
  const desc = L(post, 'seo_desc', lang) || L(post, 'excerpt', lang);
  const url = `${SITE}/blog/${post.slug}`;
  return {
    title,
    description: desc,
    alternates: {
      canonical: `/blog/${post.slug}`,
      languages: { uz: `/blog/${post.slug}`, ru: `/blog/${post.slug}?lang=ru` },
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

export default async function PostPage({ params, searchParams }) {
  const post = await getPostBySlug(params.slug);
  if (!post) notFound();

  const lang = searchParams?.lang === 'ru' ? 'ru' : 'uz';
  const title = L(post, 'title', lang);
  const body = L(post, 'body', lang);
  const html = marked.parse(body || '');

  const { prev, next, related } = await getAdjacentPosts(params.slug);

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
    mainEntityOfPage: `${SITE}/blog/${post.slug}`,
    inLanguage: lang,
  };

  return (
    <div className="hpg">
      <Navbar />

      {/* Post hero */}
      <section className="blog-hero blog-hero--post">
        <div className="wrap">
          <Link href="/blog" className="blog-back">← Blog</Link>
          <div className="blog-post-meta">
            {post.category && <span className="blog-card-cat">{post.category}</span>}
            <span className="blog-post-date">{fmt(post.published_at, lang)}</span>
            <span className="blog-lang">
              <Link href={`/blog/${post.slug}`} className={lang === 'uz' ? 'on' : ''}>UZ</Link>
              <Link href={`/blog/${post.slug}?lang=ru`} className={lang === 'ru' ? 'on' : ''}>RU</Link>
            </span>
          </div>
          <h1>{title}</h1>
          {post.excerpt_uz && <p className="lead">{L(post, 'excerpt', lang)}</p>}
        </div>
      </section>

      {/* Article body */}
      <section className="sec blog-post-sec">
        <div className="wrap">
          <div className="blog-post-inner">
            {post.cover_url && (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img src={post.cover_url} alt={title} className="blog-post-cover" />
            )}
            <div className="blog-prose" dangerouslySetInnerHTML={{ __html: html }} />
            {/* Next / Prev */}
            <nav className="blog-nav-adj">
              {prev ? (
                <Link href={`/blog/${prev.slug}`} className="blog-nav-link blog-nav-prev">
                  <span className="blog-nav-dir">← Oldingi</span>
                  <span className="blog-nav-title">{L(prev, 'title', lang)}</span>
                </Link>
              ) : <span />}
              {next ? (
                <Link href={`/blog/${next.slug}`} className="blog-nav-link blog-nav-next">
                  <span className="blog-nav-dir">Keyingi →</span>
                  <span className="blog-nav-title">{L(next, 'title', lang)}</span>
                </Link>
              ) : <span />}
            </nav>

            {/* Related posts */}
            {related.length > 0 && (
              <div className="blog-related">
                <h3>Shu mavzuda</h3>
                <div className="blog-related-grid">
                  {related.map((r) => (
                    <Link key={r.slug} href={`/blog/${r.slug}`} className="blog-related-card">
                      <span className="blog-card-cat">{r.category}</span>
                      <span className="blog-related-title">{L(r, 'title', lang)}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <div className="blog-post-back">
              <Link href="/blog" className="btn btn-line on-dark">← Blogga qaytish</Link>
            </div>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomeFooter />
    </div>
  );
}
