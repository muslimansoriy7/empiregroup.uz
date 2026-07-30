import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import { defaultLocale } from "@/content";
import "./globals.css";

// The real Geist from Google Fonts (self-hosted by next/font at build time),
// not the geist npm package — this is the exact face vercel.com/font ships.
const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://empiregroup.uz";
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const GADS_ID = process.env.NEXT_PUBLIC_GADS_ID;

/**
 * Root shell. Deliberately free of `cookies()` and `headers()` — reading
 * either here marks every route in the app dynamic and costs the CDN cache.
 * The language now comes from the URL, so per-locale metadata lives in
 * app/[locale]/layout.tsx and this file stays static.
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: { default: "Empire Group", template: "%s | Empire Group" },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
};

export const viewport: Viewport = {
  // browser chrome follows the active theme (approximated via the device
  // scheme for the very first paint; the toggle takes over after that)
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
  ],
  width: "device-width",
  initialScale: 1,
};

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Empire Group",
  legalName: '"EMPIRE GROUP CORP" MCHJ',
  alternateName: "Empire IT Solutions",
  url: SITE,
  logo: `${SITE}/logos/empire-white.png`,
  image: `${SITE}/og.png`,
  description:
    "Biznes uchun mobil ilova, veb-sayt, AI avtomatlashtirish va Odoo ERP joriy etish. O'zbekistonda yetakchi IT kompaniyasi.",
  telephone: "+998991164658",
  email: "muslimansoriy7@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Toshkent",
    addressCountry: "UZ",
  },
  areaServed: "UZ",
  foundingDate: "2023",
  numberOfEmployees: { "@type": "QuantitativeValue", value: 10 },
  sameAs: ["https://t.me/muslimansoriy", "https://instagram.com/empiregroup.uz"],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+998991164658",
    contactType: "customer service",
    availableLanguage: ["Uzbek", "Russian", "English"],
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "IT Xizmatlar",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Maxsus dasturiy ta'minot" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Odoo ERP & AI Joriy qilish" } },
    ],
  },
};

// No SearchAction: it told Google the site answers /blog?q=, which it does
// not — the parameter is ignored. Claiming a sitelinks searchbox that leads
// nowhere is worse than not having one.
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Empire Group",
  url: SITE,
  inLanguage: ["uz", "ru", "en"],
  publisher: { "@type": "Organization", name: "Empire Group", url: SITE },
};

// Runs before paint: restores the saved theme and arms the scroll-reveal
// `.js` flag. First visit defaults to dark (the brand's established look);
// once the header toggle is used the choice is persisted to localStorage and
// wins here. Setting data-theme synchronously avoids a flash of the wrong theme.
const BOOT_SCRIPT = `(function(){try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark')t='light';document.documentElement.setAttribute('data-theme',t);}catch(e){}document.documentElement.classList.add('js');})()`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang={defaultLocale}
      data-theme="light"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: BOOT_SCRIPT }} />
        <link
          rel="alternate"
          type="application/rss+xml"
          href="/feed.xml"
          title="Empire Group Blog"
        />
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
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="gtag-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');${
                GADS_ID ? `gtag('config','${GADS_ID}');` : ""
              }`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
