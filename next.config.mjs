/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { remotePatterns: [{ protocol: 'https', hostname: '**' }] },
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
