'use client';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`hpg-hdr${scrolled ? ' scrolled' : ''}`}>
      <div className="hpg-nav-island">
        <a href="/" className="brand" onClick={closeMenu}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logos/empire-white.png" alt="Empire Group — IT Solutions kompaniyasi logotipi" className="brand-logo" />
          <span className="brand-tag">IT SOLUTIONS</span>
        </a>

        <nav className="hpg-nav-links">
          <a href="#services">Xizmatlar</a>
          <a href="#process">Jarayon</a>
          <a href="#projects">Loyihalar</a>
          <a href="#faq">Savollar</a>
          <a href="/blog">Blog</a>
        </nav>

        <div className="hpg-nav-cta">
          <a href="#contact" className="btn btn-gold nav-cta-btn">
            Bepul konsultatsiya <span className="arr">↗</span>
          </a>
          <button
            className={`burger${menuOpen ? ' open' : ''}`}
            aria-label="Menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span /><span /><span />
          </button>
        </div>
      </div>

      <div className={`hpg-mobile-menu${menuOpen ? ' open' : ''}`}>
        <a href="#services" onClick={closeMenu}>Xizmatlar</a>
        <a href="#process" onClick={closeMenu}>Jarayon</a>
        <a href="#projects" onClick={closeMenu}>Loyihalar</a>
        <a href="#faq" onClick={closeMenu}>Savollar</a>
        <a href="/blog" onClick={closeMenu}>Blog</a>
        <a href="#contact" className="btn btn-gold" onClick={closeMenu}>
          Bepul konsultatsiya ↗
        </a>
      </div>
    </header>
  );
}
