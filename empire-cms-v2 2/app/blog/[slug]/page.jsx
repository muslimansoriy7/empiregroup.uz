import Link from 'next/link';
import { notFound } from 'next/navigation';
import { marked } from 'marked';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import { getPostBySlug, getAllSlugs, L } from '@/lib/posts';

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
      images: post.cover_url ? [post.cover_url] : [],
      publishedTime: post.published_at,
      modifiedTime: post.updated_at,
    },
    twitter: { card: 'summary_large_image', title, description: desc },
  };
}

function fmt(d, lang) {
  if (!d) return '';
  try { return new Date(d).toLocaleDateString(lang === 'ru' ? 'ru-RU' : 'uz-UZ', { year: 'numeric', month: 'long', day: 'numeric' }); }
  catch { return ''; }
}

export default async function PostPage({ params, searchParams }) {
  const post = await getPostBySlug(params.slug);
  if (!post) notFound();
  const lang = searchParams?.lang === 'ru' ? 'ru' : 'uz';
  const title = L(post, 'title', lang);
  const body = L(post, 'body', lang);
  const html = marked.parse(body || '');

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
    <>
      <SiteNav />
      <article className="article">
        <Link href="/blog" className="eyebrow" style={{ display: 'inline-block', marginBottom: 18 }}>← Blog</Link>
        <div className="meta">
          {post.category} · {fmt(post.published_at, lang)}
          <span className="lang-toggle" style={{ marginLeft: 14 }}>
            <Link href={`/blog/${post.slug}`} className={lang === 'uz' ? 'on' : ''}>UZ</Link>
            <Link href={`/blog/${post.slug}?lang=ru`} className={lang === 'ru' ? 'on' : ''}>RU</Link>
          </span>
        </div>
        <h1>{title}</h1>
        {post.cover_url ? (
          <img src={post.cover_url} alt={title} style={{ borderRadius: 16, margin: '20px 0 28px' }} />
        ) : null}
        <div className="prose" dangerouslySetInnerHTML={{ __html: html }} />
      </article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SiteFooter />
    </>
  );
}
