const PROJECTS = [
  {
    href: 'https://autoservis-crm.vercel.app/uz/dashboard',
    logo: '/logos/motorlux.png',
    url: 'autoservis-crm.vercel.app',
    cat: 'CRM / Avtomobil servisi',
    name: 'Motor Lux',
    desc: "Avtoservis uchun to'liq boshqaruv: mijozlar, mashinalar, buyurtma-naryadlar, ombor va tushum hisoboti — bitta panelda.",
  },
  {
    href: 'https://medflow-crm-eta.vercel.app/ru/dashboard',
    logo: '/logos/medflow.png',
    url: 'medflow-crm-eta.vercel.app',
    cat: 'CRM / Tibbiyot',
    name: 'MedFlow',
    desc: "Xususiy klinika uchun bemor boshqaruvi: qabullar, shifokorlar jadvali, kabinet bandligi va tahlil paneli.",
  },
  {
    href: 'https://textileerp.vercel.app/en/dashboard',
    logo: '/logos/grandosiyo.png',
    url: 'textileerp.vercel.app',
    cat: 'ERP / To\'qimachilik',
    name: 'Grand Osiyo Textile',
    desc: "To'qimachilik fabrikasi ERP'i: mato → bo'yoq → tikuv → paketlash → eksport, 5 bosqichli ishlab chiqarish nazorati.",
  },
  {
    href: 'https://texnika-ijara.vercel.app/uz-Cyrl',
    logo: '/logos/texnika.png',
    url: 'texnika-ijara.vercel.app',
    cat: 'Marketplace / Ijara',
    name: 'Texnika Ijara',
    desc: "Maxsus va qishloq xo'jaligi texnikasi ijarasi: 2 400+ texnika, viloyat va narx bo'yicha qidiruv hamda bron.",
  },
  {
    href: 'https://gadgetspace.vercel.app/en',
    logo: '/logos/gadgetspace.png',
    url: 'gadgetspace.vercel.app',
    cat: 'E-commerce / Elektronika',
    name: 'GadgetSpace',
    desc: "Premium elektronika va gadjetlar onlayn do'koni: katalog, savat, istak ro'yxati va xavfsiz to'lov.",
  },
  {
    href: 'https://x-wear-ivory.vercel.app/',
    logo: '/logos/xwear.png',
    url: 'x-wear-ivory.vercel.app',
    cat: 'E-commerce / Kiyim',
    name: 'X Wear',
    desc: "Toshkent streetwear brendi uchun onlayn do'kon: kolleksiyalar, kategoriyalar, chegirma va savat tizimi.",
  },
  {
    href: 'https://kassa-pwa.vercel.app/',
    logo: '/logos/hilol.png',
    url: 'kassa-pwa.vercel.app',
    cat: 'PWA / Kassa tizimi',
    name: 'Hilol Market',
    desc: "Do'kon va kafe uchun kunlik kassa (POS) PWA ilovasi: savdo, xarajat va kunlik hisobot bir joyda.",
  },
];

export default function Projects() {
  return (
    <section className="sec" id="projects">
      <div className="wrap">
        <div className="reveal">
          <span className="eyebrow">Loyihalar</span>
          <h2 className="sec-title">So&apos;nggi ishlarimiz.</h2>
          <p className="sec-intro">
            Real, ishga tushirilgan loyihalar — har birini jonli ko&apos;rishingiz mumkin.
          </p>
        </div>
        <div className="proj-grid reveal">
          {PROJECTS.map((p) => (
            <a
              key={p.name}
              className="proj"
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="thumb">
                <div className="bbar">
                  <span className="d" /><span className="d" /><span className="d" />
                  <span className="url">{p.url}</span>
                </div>
                <div className="logo-wrap">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.logo} alt={`${p.name} — ${p.cat} loyihasi logotipi`} />
                </div>
              </div>
              <div className="body">
                <div className="cat">{p.cat}</div>
                <h3>{p.name}</h3>
                <p>{p.desc}</p>
                <span className="view">Jonli ko&apos;rish ↗</span>
              </div>
            </a>
          ))}

          <a className="proj proj-cta" href="#contact">
            <div className="cta-inner">
              <div className="plus">+</div>
              <h3>Keyingisi — sizniki</h3>
              <p>Loyihangizni ro&apos;yxatga qo&apos;shamiz.</p>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
