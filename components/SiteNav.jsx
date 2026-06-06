import Link from 'next/link';
import Logo from './Logo';

export default function SiteNav() {
  return (
    <header className="nav">
      <div className="nav-inner">
        <Link href="/" className="brand"><Logo />Empire<span style={{ fontWeight: 400, fontStyle: 'italic' }}>Group</span></Link>
        <ul className="nav-links">
          <li><Link href="/">Bosh sahifa</Link></li>
          <li><Link href="/blog">Blog</Link></li>
          <li><Link href="/admin">Admin</Link></li>
        </ul>
      </div>
    </header>
  );
}
