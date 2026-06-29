import RotatingWord from './RotatingWord';

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="wrap">
        <div className="hero-inner">
          <div>
            <span className="eyebrow">AI &amp; Custom App Development for Businesses</span>
            <h1>
              Biznes uchun <RotatingWord /> tejaydigan IT-yechimlar joriy qilamiz.
            </h1>
            <p className="lead">
              Murakkab ichki jarayonlarni ERP, AI, Web va App yechimlari orqali
              raqamlashtiramiz. G&apos;oyadan tayyor tizim/mahsulotgacha — atigi 2–3 oyda.
            </p>
            <div className="hero-cta">
              <a href="#contact" className="btn btn-gold">
                Loyihani boshlash <span className="arr">↗</span>
              </a>
              <a href="#services" className="btn btn-line on-dark">
                Tariflarni ko&apos;rish
              </a>
            </div>
            <div className="spec-strip">
              <div className="cell">
                <div className="v">07</div>
                <div className="l">Ishga tushgan loyiha</div>
              </div>
              <div className="cell">
                <div className="v">04</div>
                <div className="l">Asosiy yo&apos;nalish</div>
              </div>
              <div className="cell">
                <div className="v">15+</div>
                <div className="l">Texnologiya</div>
              </div>
              <div className="cell">
                <div className="v">2–3 oy</div>
                <div className="l">MVP muddati</div>
              </div>
            </div>
          </div>

          <div className="spec-card">
            <div className="topline">
              <span>// Xizmat speki</span>
              <span><span className="dot" />Qabul qilinmoqda</span>
            </div>
            <div className="spec-row">
              <span className="k">Yo&apos;nalish</span>
              <span className="val">Mobile / Advanced</span>
            </div>
            <div className="spec-row">
              <span className="k">Qiymati</span>
              <span className="val gold">$35,000 – $50,000</span>
            </div>
            <div className="spec-row">
              <span className="k">Muddati</span>
              <span className="val">4 – 6 oy</span>
            </div>
            <div className="spec-row">
              <span className="k">Stek</span>
              <span className="spec-tags">
                <span>Flutter</span><span>Firebase</span><span>API</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
