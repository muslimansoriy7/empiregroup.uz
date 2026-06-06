import Link from 'next/link';
import Logo from './Logo';

export default function SiteFooter() {
  return (
    <footer>
      <div className="wrap">
        <Link href="/" className="brand"><Logo />Empire<span style={{ fontWeight: 400, fontStyle: 'italic' }}>Group</span></Link>
        <p style={{ marginTop: 16, maxWidth: 460, color: 'var(--muted-dark)' }}>
          Biznes uchun vaqt, pul va asab tejaydigan IT-yechimlar: web, mobil ilova, AI-mahsulot, ERP va avtomatlashtirish.
        </p>
        <div className="foot-bottom">
          <span>© {new Date().getFullYear()} Empire Group</span>
          <span style={{ fontFamily: 'var(--mono)' }}>Brifing → Tadqiqot → Yechim → Ijro</span>
        </div>
      </div>
    </footer>
  );
}
