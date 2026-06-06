import Link from 'next/link';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import { getPublishedPosts, L } from '@/lib/posts';

export const revalidate = 60;

export const metadata = {
  title: 'Blog — maqolalar, SEO, GEO va AI',
  description: 'IT, marketing, SEO/GEO va biznesni avtomatlashtirish bo‘yicha maqolalar.',
  alternates: { canonical: '/blog' },
};

function fmt(d) {
  if (!d) return '';
  try { return new Date(d).toLocaleDateString('uz-UZ', { year: 'numeric', month: 'short', day: 'numeric' }); }
  catch { return ''; }
}

export default async function BlogPage() {
  const posts = await getPublishedPosts();
  return (
    <>
      <SiteNav />
      <section className="sec">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">Blog</span>
            <h1 className="sec-title">Bilim — <span className="ital">o‘sish uchun</span></h1>
            <p className="lede">SEO, GEO, AI va biznesni avtomatlashtirish bo‘yicha maqolalar.</p>
          </div>
          {posts.length === 0 ? (
            <p className="lede">Hozircha maqola yo‘q. Admin paneldan birinchi maqolani qo‘shing.</p>
          ) : (
            <div className="blog-grid">
              {posts.map((p) => (
                <Link key={p.id} href={`/blog/${p.slug}`} className="post-card">
                  <div className="post-cover">
                    {p.cover_url ? <img src={p.cover_url} alt={L(p, 'title', 'uz')} /> : null}
                  </div>
                  <div className="pc-body">
                    <span className="pc-cat">{p.category}</span>
                    <h3>{L(p, 'title', 'uz')}</h3>
                    <p>{L(p, 'excerpt', 'uz')}</p>
                    <span className="pc-date">{fmt(p.published_at)}</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
      <SiteFooter />
    </>
  );
}
