import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '@/components/home/Navbar';
import HomeFooter from '@/components/home/HomeFooter';
import { getGeoEntry, geoSlugs } from '@/lib/geo';
import GeoLeadForm from '@/components/home/GeoLeadForm';

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://empiregroup.uz';

export function generateStaticParams() {
  return geoSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const entry = getGeoEntry(slug);
  if (!entry) return { title: 'IT Xizmatlar — Empire Group' };
  return {
    title: entry.title,
    description: entry.description,
    alternates: { canonical: `${SITE}/xizmatlar/${slug}` },
    openGraph: {
      type: 'website',
      title: entry.title,
      description: entry.description,
      url: `${SITE}/xizmatlar/${slug}`,
      images: [{ url: `${SITE}/og.png`, width: 1200, height: 630 }],
    },
    twitter: { card: 'summary_large_image', title: entry.title, description: entry.description },
  };
}

export default async function GeoServicePage({ params }) {
  const { slug } = await params;
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

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Bosh sahifa', item: SITE },
      { '@type': 'ListItem', position: 2, name: 'Xizmatlar', item: `${SITE}/#services` },
      { '@type': 'ListItem', position: 3, name: entry.h1, item: `${SITE}/xizmatlar/${slug}` },
    ],
  };

  return (
    <div className="hpg">
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema).replace(/</g, '\\u003c') }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb).replace(/</g, '\\u003c') }}
      />

      <section className="geo-hero">
        <div className="wrap">
          <Link href="/" className="geo-back">← Bosh sahifa</Link>
          <div className="geo-badge">{entry.city.toUpperCase()} · {entry.serviceType.toUpperCase()}</div>
          <h1>{entry.h1}</h1>
          <p className="lead">{entry.intro}</p>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="geo-grid">
            <div className="geo-content">
              <div className="geo-stat-box">
                <div className="geo-stat-icon">📊</div>
                <div>
                  <strong>Mahalliy tajriba</strong>
                  <p>{entry.localStats}</p>
                </div>
              </div>

              <div className="geo-case">
                <h2>Real natija</h2>
                <p>{entry.caseStudy}</p>
              </div>

              <div className="geo-services">
                <h3>Xizmatlar</h3>
                <ul>
                  {entry.services.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>

              <div className="geo-price">
                <span className="geo-price-tag">{entry.price}</span>
                <span className="geo-price-note">Aniq narx loyiha ko&apos;lamiga qarab belgilanadi</span>
              </div>
            </div>

            <div className="geo-form-col">
              <div className="geo-form-sticky">
                <h3>Bepul konsultatsiya</h3>
                <p>Loyihangiz haqida ayting — 1 ish kunida javob beramiz.</p>
                <GeoLeadForm geoCity={entry.city} serviceName={entry.services[0]} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <HomeFooter />
    </div>
  );
}
