'use client';
import { useState } from 'react';

const SERVICES = ['Mobil ilova', 'Veb-ilova / sayt', "Maxsus dasturiy ta'minot", 'Odoo ERP & AI', 'Hali aniq emas'];
const BUDGETS = ['$7,500 – $15,000', '$15,000 – $50,000', '$50,000 – $90,000', '$90,000+', 'Hali aniq emas'];

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [btnText, setBtnText] = useState("So'rov yuborish ↗");
  const [form, setForm] = useState({
    name: '', phone: '', email: '',
    service: SERVICES[0], budget: BUDGETS[0], message: '',
  });

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.phone) {
      setBtnText("Ism, email va telefonni to'ldiring");
      setTimeout(() => setBtnText("So'rov yuborish ↗"), 2200);
      return;
    }
    setBtnText('Yuborilmoqda…');
    try {
      const params = new URLSearchParams(window.location.search);
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          email: form.email,
          service: form.service,
          budget: form.budget,
          message: form.message,
          source_page: window.location.href,
          company_website: form._hp || '',
          utm_source: params.get('utm_source') || undefined,
          utm_medium: params.get('utm_medium') || undefined,
          utm_campaign: params.get('utm_campaign') || undefined,
        }),
      });
      if (res.ok) {
        const { leadId } = await res.json().catch(() => ({}));
        if (typeof window.gtag === 'function') {
          window.gtag('event', 'generate_lead', { event_category: 'engagement', value: 1 });
          const convId = process.env.NEXT_PUBLIC_GADS_CONVERSION_ID;
          if (convId) window.gtag('event', 'conversion', { send_to: convId, transaction_id: leadId });
        }
        setSubmitted(true);
      } else {
        setBtnText('Xatolik yuz berdi. Qayta urinib ko\'ring');
        setTimeout(() => setBtnText("So'rov yuborish ↗"), 3000);
      }
    } catch {
      setBtnText('Internet aloqasi yo\'q');
      setTimeout(() => setBtnText("So'rov yuborish ↗"), 3000);
    }
  };

  return (
    <section className="sec contact" id="contact">
      <div className="wrap">
        <div className="contact-grid">
          <div className="reveal">
            <span className="eyebrow">Bepul konsultatsiya</span>
            <h2>Bepul konsultatsiya oling — keyin qaror qilasiz.</h2>
            <p className="lead">
              Formani to&apos;ldiring. 1–2 ish kunida biznesingizni o&apos;rganib, sizga
              aniq yechim, narx va muddat bilan bog&apos;lanamiz. Hech qanday majburiyat
              yo&apos;q — faqat foydali maslahat.
            </p>
            <div className="cinfo">
              <a className="item" href="mailto:muslimansoriy7@gmail.com">
                <div className="ic">@</div>
                <div>
                  <div className="k">Email</div>
                  <div className="v">muslimansoriy7@gmail.com</div>
                </div>
              </a>
              <a className="item" href="tel:+998991164658">
                <div className="ic">☎</div>
                <div>
                  <div className="k">Telefon</div>
                  <div className="v">+998 99 116 46 58</div>
                </div>
              </a>
              <div className="item">
                <div className="ic">⌖</div>
                <div>
                  <div className="k">Manzil</div>
                  <div className="v">Mustaqillik shoh ko&apos;chasi 6, 100050, Toshkent</div>
                </div>
              </div>
            </div>
            <div className="socials">
              <a href="#" aria-label="Telegram">TG</a>
              <a href="#" aria-label="Instagram">IG</a>
              <a href="#" aria-label="LinkedIn">IN</a>
              <a href="#" aria-label="YouTube">YT</a>
            </div>
          </div>

          <div className="reveal">
            {submitted ? (
              <div className="form form-ok">
                <div className="ic">✓</div>
                <h3>So&apos;rovingiz qabul qilindi!</h3>
                <p>Tez orada siz bilan bog&apos;lanamiz.</p>
              </div>
            ) : (
              <div className="form">
                <div className="grid2">
                  <div className="field">
                    <label>Ism *</label>
                    <input
                      type="text" name="name" value={form.name}
                      onChange={handleChange} placeholder="Ismingiz"
                    />
                  </div>
                  <div className="field">
                    <label>Telefon *</label>
                    <input
                      type="tel" name="phone" value={form.phone}
                      onChange={handleChange} placeholder="+998 __ ___ __ __"
                    />
                  </div>
                </div>
                <div className="field">
                  <label>Email *</label>
                  <input
                    type="email" name="email" value={form.email}
                    onChange={handleChange} placeholder="email@example.com"
                  />
                </div>
                <div className="grid2">
                  <div className="field">
                    <label>Qiziqtirgan xizmat</label>
                    <select name="service" value={form.service} onChange={handleChange}>
                      {SERVICES.map((s) => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                  <div className="field">
                    <label>Byudjet (USD)</label>
                    <select name="budget" value={form.budget} onChange={handleChange}>
                      {BUDGETS.map((b) => <option key={b}>{b}</option>)}
                    </select>
                  </div>
                </div>
                <div className="field">
                  <label>Loyiha haqida</label>
                  <textarea
                    name="message" value={form.message}
                    onChange={handleChange} placeholder="Loyihangizni qisqacha ta'riflang"
                  />
                </div>
                <input
                  type="text" name="company_website" tabIndex={-1} autoComplete="off"
                  aria-hidden="true" style={{ position: 'absolute', left: '-9999px', opacity: 0 }}
                  value={form._hp || ''} onChange={(e) => setForm(f => ({ ...f, _hp: e.target.value }))}
                />
                <button className="btn btn-gold" onClick={handleSubmit}>
                  {btnText}
                </button>
                <div className="form-note">// Yuborilgan ma&apos;lumot maxfiy saqlanadi</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
