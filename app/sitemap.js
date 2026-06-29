import { getAllSlugs } from '@/lib/posts';
import { geoSlugs } from '@/lib/geo';

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://empiregroup.uz';

export default async function sitemap() {
  const slugs = await getAllSlugs();
  const posts = slugs.map((s) => ({
    url: `${SITE}/blog/${s.slug}`,
    lastModified: s.updated_at ? new Date(s.updated_at) : new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));
  const geoPages = geoSlugs.map((slug) => ({
    url: `${SITE}/xizmatlar/${slug}`,
    changeFrequency: 'monthly',
    priority: 0.9,
  }));
  return [
    { url: SITE,                              lastModified: new Date(), changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${SITE}/blog`,                    lastModified: new Date(), changeFrequency: 'daily',   priority: 0.9 },
    ...geoPages,
    { url: `${SITE}/#services`,               lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE}/#projects`,               lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE}/#process`,                lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE}/#contact`,                lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    ...posts,
  ];
}
