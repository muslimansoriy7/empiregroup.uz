const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://empiregroup.uz';
export default function robots() {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: '/admin' }],
    sitemap: `${SITE}/sitemap.xml`,
  };
}
