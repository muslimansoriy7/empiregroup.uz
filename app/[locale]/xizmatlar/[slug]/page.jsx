import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { MobileDock } from '@/components/MobileDock';
import { TelegramFab } from '@/components/TelegramFab';
import { Container } from '@/components/Container';
import { ConsultForm } from '@/components/ConsultForm';
import { getGeoEntry, geoSlugs } from '@/lib/geo';
import { getServiceEntry, serviceSlugs } from '@/lib/services';
import { ServiceLanding } from '@/components/ServiceLanding';
import { localePath, localeAlternates, canonicalFor } from '@/lib/locale-path';

// These pages carry Uzbek copy for every locale (neither getGeoEntry nor
// getServiceEntry is translated), so they must NOT advertise distinct ru/en
// versions — that is duplicate content with false hreflang. Treat them as
// uz-only: ru/en requests canonicalize to uz.
const GEO_LOCALES = ['uz'];
import { isLocale, defaultLocale } from '@/content';

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://empiregroup.uz';

/**
 * /xizmatlar/ holds two kinds of page that share a URL shape and an audience:
 * the city pages ("veb-sayt yaratish Toshkentda") and the service pages
 * ("Odoo ERP joriy qilish"). They answer different questions and so are
 * written and laid out differently; the slug decides which one renders.
 */
export function generateStaticParams() {
  return [...geoSlugs, ...serviceSlugs].map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug, locale } = await params;
  const lang = isLocale(locale) ? locale : defaultLocale;

  const service = getServiceEntry(slug);
  if (service) {
    return {
      title: { absolute: service.title },
      description: service.description,
      alternates: {
        canonical: canonicalFor(lang, `/xizmatlar/${slug}`, GEO_LOCALES),
        languages: {
          ...localeAlternates(`/xizmatlar/${slug}`, GEO_LOCALES),
          'x-default': `/xizmatlar/${slug}`,
        },
      },
      openGraph: {
        type: 'website',
        title: service.title,
        description: service.description,
        url: `${SITE}${canonicalFor(lang, `/xizmatlar/${slug}`, GEO_LOCALES)}`,
        images: [{ url: `${SITE}/og.png`, width: 1200, height: 630 }],
      },
      twitter: {
        card: 'summary_large_image',
        title: service.title,
        description: service.description,
      },
    };
  }

  const entry = getGeoEntry(slug);
  if (!entry) return { title: { absolute: 'IT Xizmatlar — Empire Group' } };
  return {
    title: { absolute: entry.title },
    description: entry.description,
    alternates: {
      canonical: canonicalFor(lang, `/xizmatlar/${slug}`, GEO_LOCALES),
      languages: { ...localeAlternates(`/xizmatlar/${slug}`, GEO_LOCALES), 'x-default': `/xizmatlar/${slug}` },
    },
    openGraph: {
      type: 'website',
      title: entry.title,
      description: entry.description,
      url: `${SITE}${canonicalFor(lang, `/xizmatlar/${slug}`, GEO_LOCALES)}`,
      images: [{ url: `${SITE}/og.png`, width: 1200, height: 630 }],
    },
    twitter: { card: 'summary_large_image', title: entry.title, description: entry.description },
  };
}

/* The service pages describe a service with a price range rather than a
   service in a city, so the offer — not the area — is what carries meaning. */
function serviceSchemaFor(service, lang) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.h1,
    description: service.description,
    serviceType: service.h1,
    areaServed: { '@type': 'Country', name: "O'zbekiston" },
    provider: { '@id': `${SITE}#organisation` },
    url: `${SITE}${canonicalFor(lang, `/xizmatlar/${service.slug}`, GEO_LOCALES)}`,
    offers: service.tiers.map((t) => ({
      '@type': 'Offer',
      name: t.tier,
      description: t.desc,
      priceSpecification: {
        '@type': 'PriceSpecification',
        priceCurrency: 'USD',
        // The published range, verbatim — a made-up single number here would
        // contradict both the page and /narxlar.
        description: `${t.price} · ${t.period}`,
      },
    })),
  };
}

/* Answers the question a buyer types, which is also the form an AI assistant
   can quote when it is asked about ERP work in Uzbekistan. */
function faqSchemaFor(service) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: service.faq.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };
}

function breadcrumbFor(name, path, lang) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Bosh sahifa', item: `${SITE}${localePath(lang, '/')}` },
      { '@type': 'ListItem', position: 2, name: 'Xizmatlar', item: `${SITE}/#xizmatlar` },
      { '@type': 'ListItem', position: 3, name, item: `${SITE}${path}` },
    ],
  };
}

export default async function GeoServicePage({ params }) {
  const { slug, locale } = await params;
  const lang = isLocale(locale) ? locale : defaultLocale;

  const service = getServiceEntry(slug);
  if (service) {
    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(serviceSchemaFor(service, lang)).replace(/</g, '\\u003c'),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchemaFor(service)).replace(/</g, '\\u003c'),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              breadcrumbFor(service.h1, `/xizmatlar/${slug}`, lang)
            ).replace(/</g, '\\u003c'),
          }}
        />
        <ServiceLanding entry={service} lang={lang} />
      </>
    );
  }

  const entry = getGeoEntry(slug);
  if (!entry) notFound();

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: entry.title,
    description: entry.description,
    areaServed: { '@type': 'City', name: entry.city.charAt(0).toUpperCase() + entry.city.slice(1) },
    provider: {
      '@type': 'Organization',
      name: 'Empire Group',
      url: SITE,
      telephone: '+998991164658',
    },
    url: `${SITE}/xizmatlar/${slug}`,
  };

  const breadcrumb = breadcrumbFor(entry.h1, `/xizmatlar/${slug}`, lang);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema).replace(/</g, '\\u003c') }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb).replace(/</g, '\\u003c') }}
      />
      <Nav />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-hairline">
          <div className="pointer-events-none absolute inset-0 grid-lines opacity-60" aria-hidden />
          <Container className="relative py-14 md:py-20">
            <Link
              href={localePath(lang, "/")}
              className="inline-flex items-center gap-1.5 text-sm text-mute transition-colors hover:text-ink"
            >
              ← Bosh sahifa
            </Link>
            <div className="eyebrow mt-6">
              {entry.city.toUpperCase()} · {entry.serviceType.toUpperCase()}
            </div>
            <h1 className="mt-3 max-w-3xl text-h2 font-semibold">{entry.h1}</h1>
            <p className="mt-4 max-w-2xl text-lead-lg text-body">{entry.intro}</p>
          </Container>
        </section>

        <Container className="py-14 md:py-20">
          <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-start">
            {/* Content */}
            <div className="flex flex-col gap-5">
              <div className="flex gap-4 rounded-[var(--radius-card-lg)] border border-hairline bg-elevated p-5">
                <div className="grid size-10 shrink-0 place-items-center rounded-[var(--radius-btn)] border border-hairline font-mono text-sm text-ink">
                  ↗
                </div>
                <div>
                  <strong className="text-sm font-semibold text-ink">Mahalliy tajriba</strong>
                  <p className="mt-1 text-sm text-body">{entry.localStats}</p>
                </div>
              </div>

              <div className="rounded-[var(--radius-card-lg)] border border-hairline bg-elevated p-6">
                <h2 className="text-h3 font-semibold text-ink">Real natija</h2>
                <p className="mt-2.5 text-sm leading-relaxed text-body">{entry.caseStudy}</p>
              </div>

              <div className="rounded-[var(--radius-card-lg)] border border-hairline bg-elevated p-6">
                <h2 className="text-h3 font-semibold text-ink">Xizmatlar</h2>
                <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                  {entry.services.map((s) => (
                    <li key={s} className="flex items-start gap-2 text-sm text-body">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-ink" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 rounded-[var(--radius-card-lg)] border border-hairline bg-hairline-soft p-6">
                <span className="text-h3 font-semibold text-ink">{entry.price}</span>
                <span className="text-sm text-mute">
                  Aniq narx loyiha ko&apos;lamiga qarab belgilanadi
                </span>
              </div>
            </div>

            {/* Form */}
            <div className="lg:sticky lg:top-24">
              <div className="rounded-[var(--radius-card-lg)] border border-hairline bg-elevated p-6 shadow-[var(--shadow-whisper)]">
                <ConsultForm
                  geoCity={entry.city}
                  header={
                    <div className="mb-5">
                      <h2 className="text-h3 font-semibold text-ink">Bepul konsultatsiya</h2>
                      <p className="mt-1.5 text-sm text-body">
                        Loyihangiz haqida ayting — 1 ish kunida javob beramiz.
                      </p>
                    </div>
                  }
                />
              </div>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
      <MobileDock />
      <TelegramFab />
    </>
  );
}
