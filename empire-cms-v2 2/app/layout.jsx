import './globals.css';

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://empiregroup.uz';

export const metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: 'Empire Group — Biznes uchun IT-yechimlar',
    template: '%s — Empire Group',
  },
  description:
    'Biznes uchun vaqt, pul va asab tejaydigan IT-yechimlar: web, mobil ilova, AI-mahsulot, ERP va avtomatlashtirish.',
  openGraph: { type: 'website', siteName: 'Empire Group', locale: 'uz_UZ' },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }) {
  return (
    <html lang="uz">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,900;1,9..144,400&family=Outfit:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
