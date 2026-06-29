export default function HomeFooter() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot-grid">
          <div>
            <div className="brand">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logos/empire-white.png" alt="Empire Group — O'zbekiston IT kompaniyasi" className="brand-logo" />
              <span className="brand-tag">IT SOLUTIONS</span>
            </div>
            <p className="foot-about">
              Biznes uchun AI va custom ilova ishlab chiqish — mobil, veb, maxsus dasturiy ta&apos;minot
              va Odoo ERP &amp; AI joriy etish. G&apos;oyadan ishga tushgunga qadar.
            </p>
          </div>
          <div className="foot-col">
            <h4>Xizmatlar</h4>
            <a href="#services">Mobil ilovalar</a>
            <a href="#services">Veb-ilovalar</a>
            <a href="#services">Maxsus dasturiy ta&apos;minot</a>
            <a href="#services">Odoo ERP &amp; AI</a>
          </div>
          <div className="foot-col">
            <h4>Kompaniya</h4>
            <a href="#projects">Loyihalar</a>
            <a href="#process">Jarayon</a>
            <a href="#reviews">Mijozlar fikri</a>
            <a href="#faq">Savollar</a>
          </div>
          <div className="foot-col">
            <h4>Aloqa</h4>
            <a href="mailto:muslimansoriy7@gmail.com">muslimansoriy7@gmail.com</a>
            <a href="tel:+998991164658">+998 99 116 46 58</a>
            <a href="#">Telegram</a>
            <a href="#">Instagram</a>
          </div>
        </div>
        <div className="foot-bottom">
          <span>© 2026 Empire Group. Barcha huquqlar himoyalangan.</span>
          <span>Maxfiylik siyosati · Foydalanish shartlari</span>
        </div>
      </div>
    </footer>
  );
}
