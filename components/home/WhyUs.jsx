const ITEMS = [
  { ic: '$', title: 'Fixed-scope narx', desc: "Soatbay emas — loyiha boshida aniq narx belgilanadi. Yashirin to'lovlar yo'q." },
  { ic: '★', title: 'Senior muhandislar', desc: "Tajribali jamoa sizning loyihangizda ishlaydi, sizning hisobingizdan o'rganmaydi." },
  { ic: '◷', title: 'Shaffof muddat', desc: "Har sprint natijasi ko'rinadi, jarayon nazorat ostida bo'ladi." },
  { ic: '⤓', title: "To'liq egalik", desc: "Kod, dizayn va mahsulot — barchasi to'liq sizga tegishli bo'ladi." },
  { ic: '↺', title: 'Keyingi yordam', desc: "Ishga tushgandan so'ng qo'llab-quvvatlash va rivojlantirish xizmati." },
  { ic: '⚙', title: 'Zamonaviy stek', desc: "Flutter, Swift, React, Odoo, AI — vazifaga mos eng yaxshi texnologiya." },
];

export default function WhyUs() {
  return (
    <section className="sec" id="why" style={{ background: '#fff' }}>
      <div className="wrap">
        <div className="reveal">
          <span className="eyebrow">Nima uchun biz</span>
          <h2 className="sec-title">
            Ishonchli hamkor — boshidan oxirigacha.
          </h2>
        </div>
        <div className="why-grid reveal">
          {ITEMS.map((item) => (
            <div key={item.title} className="why">
              <div className="ic">{item.ic}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
