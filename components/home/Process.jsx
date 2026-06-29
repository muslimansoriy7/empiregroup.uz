const STEPS = [
  {
    num: '01',
    title: 'Explore',
    sub: "O'rganish va muammoni tushunish",
    desc: "Biznesingizni, maqsadingizni va muammoni chuqur o'rganamiz. Raqobat, bozor va ma'lumotlar tahlili. Yechim yo'nalishi shu bosqichda aniqlanadi.",
    tags: ['Audit', 'Tahlil', 'Maqsad'],
  },
  {
    num: '02',
    title: 'Plan',
    sub: 'Rejalashtirish va PRD yozish',
    desc: "Texnik xarita, PRD va tizim arxitekturasi tuziladi. Narx, muddat va natija shartnomada aniq belgilanadi. Ortiqcha emas — aynan keraklisi.",
    tags: ['PRD', 'Arxitektura', 'Shartnoma'],
  },
  {
    num: '03',
    title: 'Build',
    sub: "Loyihani qurish — kod, tizim va integratsiya",
    desc: "Dasturlash, ERP joriy etish, AI workflow yoki tizim integratsiyalari — qaysi xizmat bo'lsa. Haftalik demo bilan jarayonni real vaqtda kuzatasiz.",
    tags: ['Ishlab chiqish', 'Demo', 'Shaffof jarayon'],
  },
  {
    num: '04',
    title: 'Commit',
    sub: 'Testlash, joriy etish va yakunlash',
    desc: "Ishlashiga ishonch hosil qilamiz, ishga tushiramiz va topshiramiz. Qo'llab-quvvatlash shartnomada belgilangan muddatda. Natija kafolatlanadi.",
    tags: ['Testlash', 'Ishga tushirish', "Qo'llab-quvvatlash"],
  },
];

export default function Process() {
  return (
    <section className="sec process" id="process">
      <div className="wrap">
        <div className="reveal">
          <span className="eyebrow">Qanday ishlaymiz</span>
          <h2 className="sec-title" style={{ color: '#fff' }}>
            Explore <span style={{ color: 'var(--gold)' }}>→</span> Plan{' '}
            <span style={{ color: 'var(--gold)' }}>→</span> Build{' '}
            <span style={{ color: 'var(--gold)' }}>→</span> Commit
          </h2>
          <p className="sec-intro" style={{ color: 'var(--muted-d)' }}>
            G&apos;oyadan ishga tushirishgacha — har bir xizmatimiz shu 4 qadam orqali o&apos;tadi.
          </p>
        </div>
        <div className="proc-grid reveal">
          {STEPS.map((step) => (
            <div key={step.num} className="step">
              <div className="num">{step.num}</div>
              <h3>{step.title}</h3>
              <div className="psub">{step.sub}</div>
              <p>{step.desc}</p>
              <div className="ptags">
                {step.tags.map((t) => <span key={t}>{t}</span>)}
              </div>
            </div>
          ))}
        </div>
        <div className="reveal" style={{ textAlign: 'center', marginTop: '36px' }}>
          <a href="#contact" className="btn btn-gold">Loyihani boshlash ↗</a>
        </div>
      </div>
    </section>
  );
}
