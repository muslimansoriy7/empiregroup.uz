import Link from 'next/link';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import { getPublishedPosts, L } from '@/lib/posts';

export const revalidate = 60;

export default async function Home() {
  const posts = (await getPublishedPosts()).slice(0, 3);
  return (
    <>
      <SiteNav />
      <section className="sec">
        <div className="wrap">
          <span className="eyebrow">Web · AI · ERP · Avtomatizatsiya</span>
          <h1 className="sec-title" style={{ maxWidth: 760 }}>
            Biznes uchun <span className="ital">vaqt, pul va asab tejaydigan</span> IT-yechimlar.
          </h1>
          <p className="lede" style={{ maxWidth: 620 }}>
            Web-sayt, AI-mahsulot, CRM/ERP yoki avtomatlashtirish — sizga aynan keraklisini taklif qilamiz.
          </p>
          <div className="row" style={{ marginTop: 26 }}>
            <Link href="/blog" className="btn btn-fill">Blog →</Link>
            <Link href="/admin" className="btn btn-line">Admin panel</Link>
          </div>
        </div>
      </section>

      {posts.length > 0 && (
        <section className="sec" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <div className="sec-head"><span className="eyebrow">Blog</span><h2 className="sec-title">So'nggi maqolalar</h2></div>
            <div className="blog-grid">
              {posts.map((p) => (
                <Link key={p.id} href={`/blog/${p.slug}`} className="post-card">
                  <div className="post-cover" />
                  <div className="pc-body">
                    <span className="pc-cat">{p.category}</span>
                    <h3>{L(p, 'title', 'uz')}</h3>
                    <p>{L(p, 'excerpt', 'uz')}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
      <SiteFooter />
    </>
  );
}
