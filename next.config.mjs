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
    return gone.flatMap((slug) => [
      { source: `/blog/${slug}`, destination: "/blog", permanent: true },
      { source: `/:locale(ru|en)/blog/${slug}`, destination: "/:locale/blog", permanent: true },
    ]);
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
