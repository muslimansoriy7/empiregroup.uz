import { Suspense } from 'react';
import Link from 'next/link';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { MobileDock } from '@/components/MobileDock';
import { Container } from '@/components/Container';
import ConversionTracker from '@/components/ConversionTracker';
import { localePath } from '@/lib/locale-path';
import { isLocale, defaultLocale } from '@/content';

export const metadata = {
  title: { absolute: "So'rovingiz qabul qilindi — Empire Group" },
  robots: { index: false, follow: false },
};

export default async function RahmatPage({ params }) {
  const { locale } = await params;
  const lang = isLocale(locale) ? locale : defaultLocale;
  return (
    <>
      <Nav />
      <Suspense fallback={null}><ConversionTracker /></Suspense>
      <main>
        <Container className="flex min-h-[70vh] flex-col items-center justify-center py-20 text-center">
          <div
            className="grid size-16 place-items-center rounded-full text-2xl text-white"
            style={{ background: 'linear-gradient(135deg,#007cf0,#00dfd8)' }}
          >
            ✓
          </div>
          <h1 className="mt-7 text-h2 font-semibold">Arizangiz qabul qilindi!</h1>
          <p className="mt-4 max-w-md text-lead text-body">
            Mutaxassisimiz 1 ish kuni ichida siz bilan bog&apos;lanadi.
            <br />Qo&apos;shimcha savollar bo&apos;lsa — bizga yozing.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href={localePath(lang, "/")}
              className="inline-flex h-11 items-center rounded-[var(--radius-pill)] bg-ink px-6 text-sm font-medium text-elevated transition-colors hover:bg-ink-hover"
            >
              Bosh sahifaga →
            </Link>
            <Link
              href={localePath(lang, "/blog")}
              className="inline-flex h-11 items-center rounded-[var(--radius-pill)] border border-hairline bg-elevated px-6 text-sm font-medium text-ink transition-colors hover:border-ink"
            >
              Blog o&apos;qish
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 text-sm text-mute">
            <a href="tel:+998991164658" className="transition-colors hover:text-ink">
              +998 99 116 46 58
            </a>
            <span>·</span>
            <a href="mailto:muslimansoriy7@gmail.com" className="transition-colors hover:text-ink">
              muslimansoriy7@gmail.com
            </a>
          </div>
        </Container>
      </main>
      <Footer />
      <MobileDock />
    </>
  );
}
