import Link from 'next/link';
import Navbar from '@/components/home/Navbar';
import HomeFooter from '@/components/home/HomeFooter';
import { getPublishedPosts, L } from '@/lib/posts';

export const revalidate = 60;
const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://empiregroup.uz';

export const metadata = {
  title: 'Blog — IT, SEO, AI va Biznes | Empire Group',
  description: "IT, SEO/GEO, AI avtomatlashtirish, mobil ilova va veb-sayt yaratish bo'yicha maqolalar. O'zbekiston IT sohasida bilim bazasi.",
  alternates: { canonical: `${SITE}/blog` },
  openGraph: {
    title: 'Blog — Empire Group',
    description: "IT, SEO/GEO, AI va biznesni avtomatlashtirish bo'yicha foydali maqolalar.",
    url: `${SITE}/blog`,
    type: 'website',
    images: [{ url: `${SITE}/og.png`, width: 1200, height: 630 }],
  },
};

function fmt(d) {
  if (!d) return '';
  try {
    return new Date(d).toLocaleDateString('uz-UZ', {
      year: 'numeric', month: 'short', day: 'numeric',
    });
  } catch { return ''; }
}

export default async function BlogPage() {
  const posts = await getPublishedPosts();

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: posts.slice(0, 20).map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${SITE}/blog/${p.slug}`,
      name: L(p, 'title', 'uz'),
    })),
  };

  return (
    <div className="hpg">
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      {/* Hero */}
      <section className="blog-hero">
        <div className="wrap">
          <span className="eyebrow">Blog</span>
          <h1>Bilim — <span className="hl">o&apos;sish uchun</span></h1>
          <p className="lead">SEO, GEO, AI va biznesni avtomatlashtirish bo&apos;yicha maqolalar.</p>
        </div>
      </section>

      {/* Posts */}
      <section className="sec">
        <div className="wrap">
          {posts.length === 0 ? (
            <div className="blog-empty">
              <div className="mono-mark">B</div>
              <p>Hozircha maqola yo&apos;q.<br />Admin paneldan birinchi maqolani qo&apos;shing.</p>
            </div>
          ) : (
            <div className="blog-grid">
              {posts.map((p) => (
                <Link key={p.id} href={`/blog/${p.slug}`} className="blog-card">
                  <div className={`blog-card-thumb${!p.cover_url ? ' blog-card-thumb--empty' : ''}`}>
                    {p.cover_url && (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img src={p.cover_url} alt={L(p, 'title', 'uz')} />
                    )}
                  </div>
                  <div className="blog-card-body">
                    {p.category && <span className="blog-card-cat">{p.category}</span>}
                    <h3>{L(p, 'title', 'uz')}</h3>
                    <p>{L(p, 'excerpt', 'uz')}</p>
                    <div className="blog-card-foot">
                      <span className="blog-card-date">{fmt(p.published_at)}</span>
                      <span className="blog-card-arr">O&apos;qish →</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <HomeFooter />
    </div>
  );
}
