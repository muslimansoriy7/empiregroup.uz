import Link from 'next/link';

const SERVICES = [
  {
    tag: 'SVC · 01 — Mobile Development',
    name: 'Mobil ilovalar',
    geoSlug: 'mobil-ilova-yaratish-toshkent',
    uz: 'Kross-platformali va native mobil ilovalar',
    stack: ['Swift', 'Kotlin', 'Flutter', 'Flutterflow', 'Firebase'],
    desc: "Bozorga tezkor chiqish uchun MVP'dan tortib, yuqori yuklamali native ilovalar majmuasigacha — App Store va Google Play'ga to'liq tayyor holatda.",
    incl: [
      'UI/UX dizayn', 'iOS & Android ilova',
      'API integratsiya', 'Push-bildirishnomalar',
      "Store'larga joylash", "4 hafta qo'llab-quvvatlash",
    ],
    tiers: [
      { name: 'Standard', price: '$5,000 dan', time: '2 – 3 oy', scope: "Flutterflow / Flutter yordamida tezkor bozorga chiqish (MVP) uchun tayyor andozali kross-platforma ilovalari." },
      { name: 'Advanced', price: '$10K – $35K', time: '4 – 6 oy', feat: true, scope: "Murakkab biznes mantiqqa ega, API hamda Firebase integratsiyali mukammal kross-platforma yoki native ilovalar." },
      { name: 'Mega', price: '$50,000+', time: '1 yil', scope: "Yirik ekotizimlar, yuqori yuklama va unumdorlikka ega, Swift va Kotlin'da noldan yozilgan native ilovalar majmuasi." },
    ],
  },
  {
    tag: 'SVC · 02 — Web Development',
    name: 'Veb-ilovalar',
    geoSlug: 'veb-sayt-yaratish-toshkent',
    uz: 'Korporativ platformalar va veb-tizimlar',
    stack: ['React', 'Node.js', 'Laravel', 'Yii2', 'NGINX', 'Apache'],
    desc: "Landing'dan tortib yuqori yuklamali e-commerce va B2B portallargacha — xavfsiz, barqaror backend va zamonaviy frontend arxitekturasi bilan.",
    incl: [
      'UI/UX dizayn', 'Responsiv frontend',
      'Backend & API', 'Admin panel',
      'SEO asoslari', 'Hosting sozlash',
    ],
    tiers: [
      { name: 'Standard', price: '$5,000 dan', time: '2 – 3 oy', scope: "Tayyor komponentlar (Ant / Material Design) asosidagi korporativ saytlar, Landing Page va kichik veb-tizimlar." },
      { name: 'Advanced', price: '$20K – $40K', time: '4 – 6 oy', feat: true, scope: "Laravel/Yii2 yoki Node.js arxitekturasidagi murakkab biznes platformalari, CRM va ERP tizimlari." },
      { name: 'Mega', price: '$50,000+', time: '1 yil', scope: "High-load, NGINX optimizatsiyali yirik xalqaro veb-platformalar, e-commerce ekotizimlari va B2B portallar." },
    ],
  },
  {
    tag: 'SVC · 03 — Custom Software',
    name: 'Maxsus dasturiy ta\'minot',
    geoSlug: 'crm-erp-toshkent',
    uz: "Biznesingizga to'liq moslashtirilgan tizimlar",
    stack: ['Docker', 'AWS', 'Azure', 'Google Cloud'],
    desc: "Nostandart ichki jarayonlarni avtomatlashtiruvchi, oson kengayuvchan va xavfsiz individual yechimlar — kichik utilitdan mikroxizmatlar arxitekturasigacha.",
    incl: [
      'Biznes-tahlil', 'Arxitektura dizayni',
      'Backend tizim', 'Integratsiyalar',
      'Docker konteynerlash', 'Texnik hujjatlar',
    ],
    tiers: [
      { name: 'Standard', price: '$10,000', time: '2 – 3 oy', scope: "Muayyan biznes jarayonni avtomatlashtirishga qaratilgan kichik hajmli maxsus skript, modul va utilitlar." },
      { name: 'Advanced', price: '$30K – $45K', time: '4 – 6 oy', feat: true, scope: "Docker bilan ta'minlangan, bulutli infratuzilmalarga (AWS / Azure) integratsiyalashgan to'liq dasturiy majmua." },
      { name: 'Mega', price: '$90,000+', time: '1 yil', scope: "Gibrid bulutda ishlovchi, mikroxizmatlar arxitekturasiga ega yirik korporativ tizimlar va backend infratuzilmalari." },
    ],
  },
  {
    tag: 'SVC · 04 — Odoo ERP & AI Implementation',
    name: 'Odoo ERP & AI Implementation',
    geoSlug: 'crm-erp-toshkent',
    uz: 'Biznes tizimlarini joriy etish va AI integratsiyasi',
    stack: ['Odoo ERP', 'AI Automation', 'Predictive Analytics', 'Cloud'],
    desc: "Barcha operatsiyalarni yagona Odoo ekotizimiga birlashtirish va AI agentlari yordamida qo'l mehnatini minimallashtirish — bazaviy sozlashdan to'liq transformatsiyagacha.",
    incl: [
      'Biznes-jarayon tahlili', 'Odoo modullarini sozlash',
      "Ma'lumotlar migratsiyasi", 'AI / chatbot integratsiya',
      "Xodimlarni o'qitish", "Qo'llab-quvvatlash",
    ],
    tiers: [
      { name: 'Standard', price: '$8,800', time: '2 – 3 oy', scope: "Odoo standart modullarini bazaviy sozlash, ma'lumotlar migratsiyasi va xodimlarni o'qitish (kichik biznes uchun)." },
      { name: 'Advanced', price: '$25K – $30K', time: '4 – 6 oy', feat: true, scope: "Biznes talablariga moslashtirilgan Odoo modullari, aqlli chat-botlar va hujjatlarning intellektual aylanishi." },
      { name: 'Mega', price: '$85,000+', time: '1 yil', scope: "Yirik korxonalar uchun to'liq Odoo transformatsiyasi, predictive analytics va chuqur AI tizimlari integratsiyasi." },
    ],
  },
];

export default function Services() {
  return (
    <section className="sec" id="services">
      <div className="wrap">
        <div className="reveal">
          <span className="eyebrow">Xizmatlar</span>
          <h2 className="sec-title">To&apos;rt yo&apos;nalish, bitta standart.</h2>
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
