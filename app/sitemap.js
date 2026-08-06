import { getAllSlugs } from '@/lib/posts';
import { geoSlugs } from '@/lib/geo';
import { serviceSlugs, serviceLocales } from '@/lib/services';
import { localePath, localeAlternates, postLocales } from '@/lib/locale-path';
import { defaultLocale } from '@/content';

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://empiregroup.uz';

/**
 * Articles that live as their own route rather than as a row in `posts`,
 * so `getAllSlugs()` cannot see them. Keep in step with app/[locale]/blog/*.
 */
const STATIC_POSTS = [
  { slug: 'odoo-joriy-qilish-bosqichlari', lastModified: '2025-07-18' },
  { slug: 'transformatsiya-zanjiri', lastModified: '2025-07-15' },
];

/**
 * One entry per page, listing every language of it. Google reads the
 * `alternates.languages` map as hreflang, which is what tells it the Russian
 * page is a translation rather than a duplicate.
 */
function abs(p) {
  // "/" would give "https://site/" while the canonical tag says "https://site"
  return p === '/' ? SITE : `${SITE}${p}`;
}

/**
 * `only` is the list of languages the page is actually written in. Declaring
 * an alternate that shows a different language is a false hreflang: Google
 * follows it, finds Uzbek where English was promised, and discounts the whole
 * cluster. The city pages exist in Uzbek alone; the blog and the service pages
 * in Uzbek and Russian; the rest in all three.
 */
function entry(path, { lastModified, changeFrequency, priority, only }) {
  const languages = Object.fromEntries(
    Object.entries(localeAlternates(path, only)).map(([l, p]) => [l, abs(p)])
  );
  return {
    url: abs(localePath(defaultLocale, path)),
    lastModified,
    changeFrequency,
    priority,
    alternates: { languages },
  };
}

export default async function sitemap() {
  const slugs = await getAllSlugs();
  const dbSlugs = new Set(slugs.map((s) => s.slug));
  const now = new Date();

  const posts = slugs.map((s) =>
    entry(`/blog/${s.slug}`, {
      lastModified: s.updated_at ? new Date(s.updated_at) : now,
      changeFrequency: 'weekly',
      priority: 0.7,
      only: postLocales,
    })
  );

  const staticPosts = STATIC_POSTS.filter((p) => !dbSlugs.has(p.slug)).map((p) =>
    entry(`/blog/${p.slug}`, {
      lastModified: new Date(p.lastModified),
      changeFrequency: 'monthly',
      priority: 0.7,
      only: postLocales,
    })
  );

  const geoPages = geoSlugs.map((slug) =>
    entry(`/xizmatlar/${slug}`, {
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
      only: ['uz'],
    })
  );

  // The service pages answer the query someone types once they know the work
  // they need, so they rank above the city pages in importance, not below.
  const servicePages = serviceSlugs.map((slug) =>
    entry(`/xizmatlar/${slug}`, {
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.95,
      only: serviceLocales,
    })
  );

  // Anchors are deliberately absent: a fragment is not a separate document,
  // and the previous entries pointed at section ids the redesign renamed.
  return [
    entry('/', { lastModified: now, changeFrequency: 'weekly', priority: 1.0 }),
    entry('/blog', { lastModified: now, changeFrequency: 'daily', priority: 0.9 }),
    entry('/narxlar', { lastModified: now, changeFrequency: 'monthly', priority: 0.9 }),
    entry('/tizimlashtirish', { lastModified: now, changeFrequency: 'monthly', priority: 0.8 }),
    ...servicePages,
    ...geoPages,
    ...posts,
    ...staticPosts,
  ];
}
