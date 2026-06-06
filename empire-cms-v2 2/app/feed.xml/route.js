import { getPublishedPosts, L } from '@/lib/posts';

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://empiregroup.uz';

export const revalidate = 300;

export async function GET() {
  const posts = await getPublishedPosts();
  const items = posts.map((p) => `
    <item>
      <title>${escapeXml(L(p, 'title', 'uz'))}</title>
      <link>${SITE}/blog/${p.slug}</link>
      <guid>${SITE}/blog/${p.slug}</guid>
      <pubDate>${p.published_at ? new Date(p.published_at).toUTCString() : ''}</pubDate>
      <description>${escapeXml(L(p, 'excerpt', 'uz'))}</description>
    </item>`).join('');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"><channel>
  <title>Empire Group — Blog</title>
  <link>${SITE}/blog</link>
  <description>IT, SEO, GEO va biznesni avtomatlashtirish</description>
  ${items}
</channel></rss>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
}

function escapeXml(s = '') {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
