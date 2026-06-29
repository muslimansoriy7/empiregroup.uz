import Script from 'next/script';
import './globals.css';

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const GADS_ID = process.env.NEXT_PUBLIC_GADS_ID;

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://empiregroup.uz';

export const metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: 'Empire Group — Mobil ilova, Veb, AI va ERP yechimlar | Toshkent',
    template: '%s | Empire Group',
  },
  description:
    "Biznes uchun mobil ilova, veb-sayt, AI avtomatlashtirish va Odoo ERP joriy etish. O'zbekistonda #1 IT kompaniyasi. Bepul konsultatsiya: +998 99 116 46 58.",
  keywords: ['mobil ilova', 'veb sayt', 'ERP', 'AI', 'IT kompaniya', 'Toshkent', 'empire group'],
  openGraph: {
    type: 'website',
    siteName: 'Empire Group',
    locale: 'uz_UZ',
    url: SITE,
    title: 'Empire Group — Mobil ilova, Veb, AI va ERP | Toshkent',
    description: "O'zbekistonda biznes uchun IT-yechimlar: mobil ilova, veb-sayt, AI va Odoo ERP.",
  },
  twitter: { card: 'summary_large_image', site: '@empiregroup_uz' },
  alternates: { canonical: SITE },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
};

const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Empire Group',
  alternateName: 'Empire IT Solutions',
  url: SITE,
  logo: `${SITE}/logos/empire-white.png`,
  image: `${SITE}/logos/empire-white.png`,
  description: "Biznes uchun mobil ilova, veb-sayt, AI avtomatlashtirish va Odoo ERP joriy etish. O'zbekistonda yetakchi IT kompaniyasi.",
  telephone: '+998991164658',
  email: 'muslimansoriy7@gmail.com',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Toshkent',
    addressCountry: 'UZ',
  },
  areaServed: 'UZ',
  foundingDate: '2023',
  numberOfEmployees: { '@type': 'QuantitativeValue', value: 10 },
  sameAs: [
    'https://t.me/empiregroup_uz',
    'https://instagram.com/empiregroup.uz',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+998991164658',
    contactType: 'customer service',
    availableLanguage: ['Uzbek', 'Russian'],
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'IT Xizmatlar',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Mobil ilova yaratish' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Veb-sayt yaratish' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Odoo ERP joriy etish' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'AI avtomatlashtirish' } },
    ],
  },
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Empire Group',
  url: SITE,
  potentialAction: {
    '@type': 'SearchAction',
    target: { '@type': 'EntryPoint', urlTemplate: `${SITE}/blog?q={search_term_string}` },
    'query-input': 'required name=search_term_string',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="uz">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&display=swap"
          as="style"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,900;1,9..144,400&family=JetBrains+Mono:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        <link rel="alternate" type="application/rss+xml" href="/feed.xml" title="Empire Group Blog" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body>
        {children}
        {GA_ID && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
            <Script id="gtag-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');${GADS_ID ? `gtag('config','${GADS_ID}');` : ''}`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
