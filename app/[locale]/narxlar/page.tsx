import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { MobileDock } from "@/components/MobileDock";
import { TelegramFab } from "@/components/TelegramFab";
import { Container } from "@/components/Container";
import { ArticleCta } from "@/components/ArticleCta";
import { PriceTables } from "@/components/PriceTables";
import { dictionaries, isLocale, defaultLocale } from "@/content";
import { localePath, localeAlternates } from "@/lib/locale-path";
import type { Metadata } from "next";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://empiregroup.uz";
const PATH = "/narxlar";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const lang = isLocale(locale) ? locale : defaultLocale;
  const p = dictionaries[lang].pricing;

  return {
    title: { absolute: p.metaTitle },
    description: p.metaDescription,
    alternates: {
      canonical: localePath(lang, PATH),
      languages: { ...localeAlternates(PATH), "x-default": PATH },
    },
    openGraph: {
      type: "website",
      title: p.metaTitle,
      description: p.metaDescription,
      url: `${SITE}${localePath(lang, PATH)}`,
      images: [{ url: "/og.png", width: 1200, height: 630 }],
    },
  };
}

export default async function PricingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const lang = isLocale(locale) ? locale : defaultLocale;
  const t = dictionaries[lang];
  const p = t.pricing;

  // The question this page exists to answer is asked verbatim in search and by
  // answer engines, so the whole Q&A block is marked up as such.
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: p.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Empire Group",
        item: `${SITE}${localePath(lang, "/")}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: p.title,
        item: `${SITE}${localePath(lang, PATH)}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <Nav />
      <main>
        <section className="relative overflow-hidden border-b border-hairline">
          <div
            className="pointer-events-none absolute inset-0 grid-lines opacity-60"
            aria-hidden
          />
          <Container className="relative py-16 md:py-24">
            <div className="eyebrow">{p.eyebrow}</div>
            <h1 className="mt-3 max-w-3xl text-h2 font-semibold">{p.title}</h1>
            <p className="mt-4 max-w-2xl text-lead-lg text-body">{p.intro}</p>
          </Container>
        </section>

        <Container className="py-14 md:py-20">
          <PriceTables />

          {/* how the price is set */}
          <section className="mt-16 rounded-[var(--radius-card-lg)] border border-hairline bg-elevated p-6 sm:p-8">
            <h2 className="text-h3 font-semibold text-ink">{p.howLabel}</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {p.how.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-[14.5px] text-body">
                  <span
                    aria-hidden
                    className="mt-[7px] size-1.5 shrink-0 rounded-full bg-ink"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* the questions people actually type */}
          <section className="mt-16">
            <h2 className="text-h2 font-semibold text-ink">{p.faqTitle}</h2>
            <div className="mt-8 divide-y divide-hairline border-y border-hairline">
              {p.faq.map((f) => (
                <details key={f.q} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-[17px] font-medium text-ink [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <span
                      aria-hidden
                      className="mt-1.5 shrink-0 font-mono text-mute transition-transform duration-300 group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-body">
                    {f.a}
                  </p>
                </details>
              ))}
            </div>
          </section>

          <ArticleCta />
        </Container>
      </main>
      <Footer />
      <MobileDock />
      <TelegramFab />
    </>
  );
}
