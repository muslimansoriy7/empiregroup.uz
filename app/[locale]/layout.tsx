import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Providers } from "@/components/Providers";
import { dictionaries, locales, isLocale, type Locale } from "@/content";
import { localeAlternates, localePath } from "@/lib/locale-path";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://empiregroup.uz";

const OG_LOCALE: Record<Locale, string> = {
  uz: "uz_UZ",
  ru: "ru_RU",
  en: "en_US",
};

/** Only these three exist; anything else 404s rather than rendering uz. */
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = dictionaries[locale];

  return {
    title: { absolute: t.meta.title },
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
    alternates: {
      canonical: localePath(locale, "/"),
      languages: { ...localeAlternates("/"), "x-default": "/" },
    },
    openGraph: {
      type: "website",
      siteName: "Empire Group",
      locale: OG_LOCALE[locale],
      url: `${SITE}${localePath(locale, "/")}`,
      title: t.meta.title,
      description: t.meta.description,
      images: [{ url: "/og.png", width: 1200, height: 630, alt: "Empire Group" }],
    },
    twitter: {
      card: "summary_large_image",
      site: "@empiregroup_uz",
      title: t.meta.title,
      description: t.meta.description,
      images: ["/og.png"],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <>
      {/* The single <html> tag lives in the root layout, which renders before
          the locale segment is known, so it ships lang="uz" for every route.
          This per-locale script is baked into each locale's STATIC HTML (via
          generateStaticParams) and corrects <html lang> before paint — so
          screen readers and JS-rendering crawlers get the right language on
          /ru/* and /en/* immediately, without opting any route into dynamic
          rendering. (A fully static raw-HTML lang would need a route-group
          multi-root-layout refactor.) */}
      <script
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.lang=${JSON.stringify(locale)}`,
        }}
      />
      <Providers initialLocale={locale}>{children}</Providers>
    </>
  );
}
