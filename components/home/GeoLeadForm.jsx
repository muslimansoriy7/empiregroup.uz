'use client';
import { useState } from 'react';

export default function GeoLeadForm({ geoCity, serviceName }) {
  const [form, setForm] = useState({ name: '', phone: '', message: '' });
  const [status, setStatus] = useState('idle');

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.phone) return;
    setStatus('loading');
    try {
      const params = new URLSearchParams(window.location.search);
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          service: serviceName,
          message: form.message || undefined,
          source_page: window.location.href,
          geo_city: geoCity,
          company_website: form._hp || '',
          utm_source: params.get('utm_source') || undefined,
          utm_medium: params.get('utm_medium') || undefined,
          utm_campaign: params.get('utm_campaign') || undefined,
        }),
      });
      if (res.ok) {
        setStatus('success');
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 3000);
      }
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  if (status === 'success') {
    return (
      <div className="geo-form-ok">
        <div className="geo-form-ok-icon">✓</div>
        <p>Arizangiz qabul qilindi! Tez orada bog&apos;lanamiz.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="geo-form">
      <div className="field">
        <input type="text" name="name" value={form.name} onChange={handleChange}
          placeholder="Ismingiz *" required minLength={2} />
      </div>
      <div className="field">
        <input type="tel" name="phone" value={form.phone} onChange={handleChange}
          placeholder="+998 __ ___ __ __ *" required />
      </div>
      <div className="field">
        <textarea name="message" value={form.message} onChange={handleChange}
          placeholder="Loyihangiz haqida qisqacha (ixtiyoriy)" rows={3} />
      </div>
      <input type="text" name="company_website" tabIndex={-1} autoComplete="off"
        aria-hidden="true" style={{ position: 'absolute', left: '-9999px', opacity: 0 }}
        value={form._hp || ''} onChange={(e) => setForm(f => ({ ...f, _hp: e.target.value }))} />
      <button type="submit" className="btn btn-gold" disabled={status === 'loading'}>
        {status === 'loading' ? 'Yuborilmoqda…' : status === 'error' ? 'Xatolik. Qayta urinib ko\'ring' : 'Bepul Konsultatsiya →'}
      </button>
    </form>
  );
}
