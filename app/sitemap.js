import { getAllSlugs } from '@/lib/posts';
import { geoSlugs } from '@/lib/geo';

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://empiregroup.uz';

/**
 * Articles that live as their own route rather than as a row in `posts`,
 * so `getAllSlugs()` cannot see them. Keep in step with app/blog/*.
 */
const STATIC_POSTS = [
  { slug: 'odoo-joriy-qilish-bosqichlari', lastModified: '2025-07-18' },
  { slug: 'transformatsiya-zanjiri', lastModified: '2025-07-15' },
];

export default async function sitemap() {
  const slugs = await getAllSlugs();
  const dbSlugs = new Set(slugs.map((s) => s.slug));

  const posts = slugs.map((s) => ({
    url: `${SITE}/blog/${s.slug}`,
    lastModified: s.updated_at ? new Date(s.updated_at) : new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  const staticPosts = STATIC_POSTS.filter((p) => !dbSlugs.has(p.slug)).map((p) => ({
    url: `${SITE}/blog/${p.slug}`,
    lastModified: new Date(p.lastModified),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const geoPages = geoSlugs.map((slug) => ({
    url: `${SITE}/xizmatlar/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.9,
  }));

  // Anchors are deliberately absent: a fragment is not a separate document,
  // and the previous entries pointed at section ids the redesign renamed.
  return [
    { url: SITE, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${SITE}/blog`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${SITE}/tizimlashtirish`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    ...geoPages,
    ...posts,
    ...staticPosts,
  ];
}
