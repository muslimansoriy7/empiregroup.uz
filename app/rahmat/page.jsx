import { Suspense } from 'react';
import Link from 'next/link';
import Navbar from '@/components/home/Navbar';
import HomeFooter from '@/components/home/HomeFooter';
import ConversionTracker from '@/components/home/ConversionTracker';

export const metadata = {
  title: "So'rovingiz qabul qilindi — Empire Group",
  robots: { index: false, follow: false },
};

export default function RahmatPage() {
  return (
    <div className="hpg">
      <Navbar />
      <Suspense fallback={null}><ConversionTracker /></Suspense>
      <section className="rahmat-sec">
        <div className="wrap rahmat-wrap">
          <div className="rahmat-icon">✓</div>
          <h1>Arizangiz qabul qilindi!</h1>
          <p className="lead">
            Mutaxassisimiz 1 ish kuni ichida siz bilan bog&apos;lanadi.
            <br />Qo&apos;shimcha savollar bo&apos;lsa — bizga yozing.
          </p>
          <div className="rahmat-actions">
            <Link href="/" className="btn btn-gold">Bosh sahifaga →</Link>
            <Link href="/blog" className="btn btn-line on-dark">Blog o&apos;qish</Link>
          </div>
          <div className="rahmat-contact">
            <a href="tel:+998991164658">+998 99 116 46 58</a>
            <span>·</span>
            <a href="mailto:muslimansoriy7@gmail.com">muslimansoriy7@gmail.com</a>
          </div>
        </div>
      </section>
      <HomeFooter />
    </div>
  );
}
