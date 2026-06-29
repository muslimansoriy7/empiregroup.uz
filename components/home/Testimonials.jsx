const QUOTES = [
  {
    text: "«Empire Group bizning xom g'oyamizni atigi 9 haftada to'liq ishlaydigan ilovaga aylantirdi. Sifat barcha kutganlarimizdan oshib tushdi.»",
    avatar: 'A',
    name: 'Aliya M.',
    role: 'CEO · FinNova (Fintech)',
  },
  {
    text: "«Empire bilan ishlash xuddi kuchli ichki jamoaga ega bo'lgandek edi — tezkor, shaffof va mahsulotimizga chinakam g'amxo'r.»",
    avatar: 'J',
    name: 'James R.',
    role: 'CTO · CloudHive (SaaS)',
  },
  {
    text: "«12 ta agentlikni ko'rib chiqdik. Empire — 48 soatda aniq taklif bergan va bozorimizni chin tushungan yagonasi edi.»",
    avatar: 'O',
    name: 'Omar F.',
    role: "Asoschisi · Sooqi (E-commerce)",
  },
  {
    text: "«Ularning AI tajribasi haqiqiy — faqat marketing emas. Qurgan tavsiya tizimi foydalanuvchi faolligini 2 barobar oshirdi.»",
    avatar: 'L',
    name: 'Lena K.',
    role: 'Mahsulot rahbari · DataPulse (HealthTech)',
  },
];

export default function Testimonials() {
  return (
    <section className="sec" id="reviews">
      <div className="wrap">
        <div className="reveal">
          <span className="eyebrow">
            Mijozlar fikri{' '}
            <span className="ph-note">namuna — almashtiring</span>
          </span>
          <h2 className="sec-title">Mijozlarimiz nima deydi.</h2>
          <p className="sec-intro">Natija — eng yaxshi tavsiya.</p>
        </div>
        <div className="quote-grid reveal">
          {QUOTES.map((q) => (
            <div key={q.name} className="quote">
              <div className="stars">★★★★★</div>
              <p>{q.text}</p>
              <div className="who-row">
                <div className="avatar">{q.avatar}</div>
                <div>
                  <div className="wname">{q.name}</div>
                  <div className="wrole">{q.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
