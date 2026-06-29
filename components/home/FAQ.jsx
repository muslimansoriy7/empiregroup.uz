'use client';
import { useState } from 'react';

const FAQS = [
  { q: 'Loyiha qancha vaqt oladi?', a: "Ko'lamiga qarab odatda 2–12 oy. MVP (boshlang'ich versiya) 2–3 oyda tayyor bo'ladi. Aniq muddat tahlil bosqichidan keyin beriladi." },
  { q: 'Narx qanday hisoblanadi?', a: "Biz fixed-scope tizimida ishlaymiz — soatbay emas. Loyiha boshida aniq narx belgilanadi va siz nimaga qancha to'lashingizni oldindan bilasiz. Yashirin to'lovlar yo'q." },
  { q: 'Narxga nima kiradi?', a: "Har bir paket strategiya, UI/UX dizayn, ishlab chiqish, test (QA), joylashtirish va 4 hafta ishga tushgandan keyingi qo'llab-quvvatlashni o'z ichiga oladi." },
  { q: 'Minimal byudjet qancha?', a: "Standart paketlar $5,000 dan boshlanadi. G'oyani arzon yo'l bilan tekshirish uchun avval kichik Discovery bosqichini ham taklif qila olamiz." },
  { q: "To'lov qanday amalga oshiriladi?", a: "To'lov bosqichma-bosqich: boshlang'ich avans, so'ngra har bosqich yakunida belgilangan ulushlar. Shartlar shartnomada aniq ko'rsatiladi." },
  { q: 'Kod va mahsulot kimga tegishli bo\'ladi?', a: "Loyiha yakunida barcha kod, dizayn va intellektual mulk to'liq sizga o'tadi." },
  { q: 'Mavjud loyihamni davom ettira olasizmi?', a: "Ha. Avval kod auditi o'tkazamiz va mavjud tizimni rivojlantirish yoki qaytadan qurish bo'yicha tavsiya beramiz." },
  { q: 'Ishga tushgandan keyin yordam beriladimi?', a: "Ha. Har paketda 4 hafta bepul qo'llab-quvvatlash bor, undan keyin esa alohida qo'llab-quvvatlash paketlari mavjud." },
];

export default function FAQ() {
  const [open, setOpen] = useState(null);

  const toggle = (i) => setOpen(open === i ? null : i);

  return (
    <section className="sec" id="faq" style={{ background: '#fff' }}>
      <div className="wrap">
        <div className="reveal" style={{ textAlign: 'center' }}>
          <span className="eyebrow center">Savol-javob</span>
          <h2 className="sec-title">Ko&apos;p so&apos;raladigan savollar.</h2>
        </div>
        <div className="faq reveal">
          {FAQS.map((item, i) => (
            <div key={i} className={`qa${open === i ? ' open' : ''}`}>
              <button onClick={() => toggle(i)}>
                {item.q}
                <span className="ico">+</span>
              </button>
              <div
                className="ans"
                style={{ maxHeight: open === i ? '400px' : '0' }}
              >
                <p>{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
