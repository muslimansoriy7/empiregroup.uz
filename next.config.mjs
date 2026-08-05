import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

// Pin the workspace root to THIS project — a stray lockfile in the parent
// directory otherwise makes Next infer the wrong root.
const projectRoot = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: projectRoot,
  images: { remotePatterns: [{ protocol: 'https', hostname: '**' }] },
  async redirects() {
    // The two hand-built bespoke articles were removed in favour of the unified
    // CMS blog template; send their old URLs to the blog index so indexed links
    // don't 404.
    const gone = ["transformatsiya-zanjiri", "odoo-joriy-qilish-bosqichlari"];
    const blogRedirects = gone.flatMap((slug) => [
      { source: `/blog/${slug}`, destination: "/blog", permanent: true },
      { source: `/:locale(ru|en)/blog/${slug}`, destination: "/:locale/blog", permanent: true },
    ]);

    // /v2…/v11 were design studies shared for review. /v11 is now the homepage
    // and the rest were dropped; the links were passed around, so they land on
    // the homepage rather than a 404 — and the review URL keeps working.
    const studies = ["v2", "v3", "v4", "v5", "v6", "v7", "v8", "v9", "v10", "v11"];
    const studyRedirects = studies.flatMap((v) => [
      { source: `/${v}`, destination: "/", permanent: false },
      { source: `/:locale(ru|en)/${v}`, destination: "/:locale", permanent: false },
    ]);

    return [...blogRedirects, ...studyRedirects];
  },
  async headers() {
    return [
      {
        source: '/card/contact.vcf',
        headers: [
          { key: 'Content-Type', value: 'text/vcard; charset=utf-8' },
          { key: 'Content-Disposition', value: 'attachment; filename="Muslim_Jorazoda_Empire_Group.vcf"' },
        ],
      },
    ];
  },
};
export default nextConfig;
