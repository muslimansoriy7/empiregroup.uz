import { getAllSlugs } from '@/lib/posts';

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://empiregroup.uz';

export default async function sitemap() {
  const slugs = await getAllSlugs();
  const posts = slugs.map((s) => ({
    url: `${SITE}/blog/${s.slug}`,
    lastModified: s.updated_at ? new Date(s.updated_at) : new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));
  return [
    { url: SITE, lastModified: new Date(), priority: 1 },
    { url: `${SITE}/blog`, lastModified: new Date(), priority: 0.8 },
    ...posts,
  ];
}
