import Link from 'next/link';

const SERVICES = [
  {
    tag: 'Custom Software Development',
    name: 'Maxsus dasturiy ta\'minot',
    geoSlug: 'crm-erp-toshkent',
    uz: "Biznesingiz ichki jarayonlariga moslashtirilgan yechimlar",
    stack: ['React', 'Node.js', 'Flutter', 'Swift', 'Kotlin', 'Laravel', 'Docker', 'AWS'],
    desc: "Real ishlayotgan biznesning operatsion ehtiyojlaridan kelib chiqqan holda maxsus veb-ilovalar, mobil ilovalar va ichki tizimlar ishlab chiqamiz — tayyor shablonlarga moslash emas, biznesingizning o'ziga xos jarayoniga aniq yechim.",
    incl: [
      'Biznes-tahlil va jarayon xaritasi', 'UI/UX dizayn',
      'Veb-ilova yoki mobil ilova (iOS + Android)', 'Backend, API va admin panel',
      'Integratsiyalar (Telegram, CRM, to\'lov)', "4 hafta qo'llab-quvvatlash",
    ],
    tiers: [
      { name: 'Standard', price: '$5,000 dan', time: '2 – 3 oy', scope: "Bitta aniq vazifani hal qiluvchi MVP: landing + forma, kichik mobil ilova yoki ichki veb-panel. Tezkor bozorga chiqish uchun." },
      { name: 'Advanced', price: '$15K – $40K', time: '4 – 6 oy', feat: true, scope: "Murakkab biznes mantig'iga ega to'liq veb yoki mobil ilova — CRM integratsiya, push-bildirishnomalar, admin panel va API." },
      { name: 'Mega', price: '$50,000+', time: '6 – 12 oy', scope: "Yirik ekotizimlar: bir nechta ilova (veb + mobil + admin), mikroxizmatlar arxitekturasi, yuqori yuklama va bulutli infratuzilma." },
    ],
  },
  {
    tag: 'Odoo ERP & AI Implementation',
    name: 'Odoo ERP & AI Joriy qilish',
    geoSlug: 'crm-erp-toshkent',
    uz: "Tarqoq jarayonlarni yagona tizimga birlashtirish va AI bilan kuchaytirish",
    stack: ['Odoo ERP', 'AI Automation', 'Predictive Analytics', 'Cloud'],
    desc: "Korxonadagi alohida ishlayotgan bo'limlar, Excel jadvallar va qo'lda bajariladigan jarayonlarni yagona markazlashgan raqamli tizimga birlashtiramiz. Ustiga AI avtomatlashtirish qo'shib, takrorlanuvchi mexanik ishlardan jamoangizni butunlay xalos qilamiz.",
    incl: [
      'Biznes-jarayon tahlili va xarita', 'Odoo modullarini sozlash yoki custom ERP',
      "Ma'lumotlar migratsiyasi", 'AI / chatbot integratsiya',
      "Xodimlarni o'qitish", "Qo'llab-quvvatlash va kuzatish",
    ],
    tiers: [
      { name: 'Standard', price: '$8,800 dan', time: '2 – 3 oy', scope: "Odoo standart modullarini bazaviy sozlash, ma'lumotlar ko'chirish va xodimlarni o'qitish. Kichik va o'rta biznes uchun dastlabki qadam." },
      { name: 'Advanced', price: '$25K – $35K', time: '4 – 6 oy', feat: true, scope: "Biznes talablariga moslashtirilgan Odoo modullari, aqlli chat-botlar, hujjat aylanishi va jarayonlarni avtomatlashtirish." },
      { name: 'Mega', price: '$85,000+', time: '1 yil', scope: "Yirik korxona uchun to'liq raqamli transformatsiya: Odoo ERP barcha bo'limlarga, predictive analytics va chuqur AI integratsiyasi." },
    ],
  },
];

export default function Services() {
  return (
    <section className="sec" id="services">
      <div className="wrap">
        <div className="reveal">
          <span className="eyebrow">Xizmatlar</span>
          <h2 className="sec-title">Ikki yo&apos;nalish, bitta standart.</h2>
          <p className="sec-intro">
            Har bir loyiha uchun uchta paket — tezkor MVP&apos;dan tortib yirik korporativ tizimgacha.
            Narxlar fixed-scope: loyiha boshida aniq belgilanadi.
          </p>
        </div>

        {SERVICES.map((svc) => (
          <div key={svc.tag} className="svc reveal">
            <div className="svc-head">
              <div>
                <div className="svc-tag">{svc.tag}</div>
                <h3 className="svc-name">{svc.name}</h3>
                <div className="svc-uz">{svc.uz}</div>
                <div className="stack">
                  {svc.stack.map((s) => <span key={s}>{s}</span>)}
                </div>
              </div>
              <div>
                <p className="svc-desc" style={{ marginBottom: '22px' }}>{svc.desc}</p>
                <div className="svc-incl-t">Paketga kiradi</div>
                <ul className="incl">
                  {svc.incl.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
            </div>
            <div className="tiers">
              {svc.tiers.map((tier) => (
                <div key={tier.name} className={`tier${tier.feat ? ' feat' : ''}`}>
                  {tier.feat && <span className="badge">Ko&apos;p tanlanadi</span>}
                  <div className="t-name">{tier.name}</div>
                  <div className="t-price">{tier.price}</div>
                  <div className="t-time">{tier.time}</div>
                  <div className="t-scope">{tier.scope}</div>
                </div>
              ))}
            </div>
            {svc.geoSlug && (
              <div className="svc-geo-link">
                <Link href={`/xizmatlar/${svc.geoSlug}`}>
                  {svc.name} haqida batafsil →
                </Link>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
