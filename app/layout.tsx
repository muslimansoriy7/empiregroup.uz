import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { cookies } from "next/headers";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Providers } from "@/components/Providers";
import { dictionaries, defaultLocale, isLocale, type Locale } from "@/content";
import "./globals.css";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://empiregroup.uz";
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const GADS_ID = process.env.NEXT_PUBLIC_GADS_ID;

async function getLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const value = cookieStore.get("locale")?.value;
  return isLocale(value) ? value : defaultLocale;
}

export async function generateMetadata(): Promise<Metadata> {
  const t = dictionaries[await getLocale()];
  return {
    metadataBase: new URL(SITE),
    title: { default: t.meta.title, template: "%s | Empire Group" },
    description: t.meta.description,
    keywords: [
      "mobil ilova",
      "veb sayt",
      "ERP",
      "Odoo",
      "AI",
      "IT kompaniya",
      "Toshkent",
      "empire group",
    ],
    alternates: { canonical: SITE },
    openGraph: {
      type: "website",
      siteName: "Empire Group",
      locale: "uz_UZ",
      url: SITE,
      title: t.meta.title,
      description: t.meta.description,
      images: [
        { url: "/og.png", width: 1200, height: 630, alt: "Empire Group" },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@empiregroup_uz",
      title: t.meta.title,
      description: t.meta.description,
      images: ["/og.png"],
    },
    icons: {
      icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
      shortcut: "/icon.svg",
      apple: "/icon.svg",
    },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  width: "device-width",
  initialScale: 1,
};

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Empire Group",
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
  sameAs: ["https://t.me/empiregroup_uz", "https://instagram.com/empiregroup.uz"],
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
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Mobil ilova yaratish" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Veb-sayt yaratish" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Maxsus dasturiy ta'minot" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Odoo ERP joriy etish" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI avtomatlashtirish" } },
    ],
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Empire Group",
  url: SITE,
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE}/blog?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

// Arms the scroll-reveal `.js` flag before paint. Dark mode is handled
// entirely by CSS (prefers-color-scheme) — no theme JS needed.
const BOOT_SCRIPT = `document.documentElement.classList.add('js')`;

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const locale = await getLocale();

  return (
    <html
      lang={locale}
      className={`${GeistSans.variable} ${GeistMono.variable}`}
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
        <Providers initialLocale={locale}>{children}</Providers>
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
