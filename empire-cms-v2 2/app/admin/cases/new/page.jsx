import { createCase } from '../actions.js'

const Field = ({ label, name, required, textarea, rows = 4, placeholder }) => (
  <div style={{ marginBottom: 16 }}>
    <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6, color: '#374151' }}>
      {label} {required && <span style={{ color: '#ef4444' }}>*</span>}
    </label>
    {textarea ? (
      <textarea name={name} rows={rows} required={required} placeholder={placeholder}
        style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1px solid #d1d5db', fontSize: 14, resize: 'vertical', boxSizing: 'border-box' }} />
    ) : (
      <input type="text" name={name} required={required} placeholder={placeholder}
        style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1px solid #d1d5db', fontSize: 14, boxSizing: 'border-box' }} />
    )}
  </div>
)

export default function NewCasePage() {
  return (
    <div style={{ maxWidth: 800 }}>
      <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 24 }}>💼 Yangi Case Study</h1>
      <form action={createCase}>
        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: 28, marginBottom: 20 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16, color: '#6b7280' }}>ASOSIY MA'LUMOT</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <Field label="Mijoz nomi" name="client" required placeholder="FinNova, MarketBox..." />
            <Field label="Soha" name="industry" placeholder="Fintech, E-commerce, Logistika..." />
            <Field label="Xizmat" name="service" placeholder="ERP, Web, AI Automation..." />
            <Field label="Muddat" name="duration" placeholder="8 hafta, 3 oy..." />
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6, color: '#374151' }}>Holat</label>
              <select name="status" style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1px solid #d1d5db', fontSize: 14 }}>
                <option value="draft">Draft</option>
                <option value="published">Joylash</option>
              </select>
            </div>
            <Field label="Texnologiyalar (vergul bilan)" name="technologies" placeholder="Odoo, Python, PostgreSQL, React" />
          </div>
        </div>

        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: 28, marginBottom: 20 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16, color: '#6b7280' }}>SARLAVHA</h3>
          <Field label="Sarlavha (O'zbekcha)" name="title_uz" required placeholder="FinNova uchun Odoo ERP joriy etish — 8 haftada" />
          <Field label="Sarlavha (Ruscha)" name="title_ru" placeholder="Внедрение Odoo ERP для FinNova — за 8 недель" />
        </div>

        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: 28, marginBottom: 20 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16, color: '#6b7280' }}>MUAMMO</h3>
          <Field label="Muammo (O'zbekcha)" name="problem_uz" textarea rows={3} placeholder="Manual hisobot tuzish 3 kun ketardi..." />
          <Field label="Muammo (Ruscha)" name="problem_ru" textarea rows={3} placeholder="Составление отчётов вручную занимало 3 дня..." />
        </div>

        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: 28, marginBottom: 20 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16, color: '#6b7280' }}>YECHIM</h3>
          <Field label="Yechim (O'zbekcha)" name="solution_uz" textarea rows={3} placeholder="Odoo ERP 3 modul: Hisobot, Ombor, Sotuv..." />
          <Field label="Yechim (Ruscha)" name="solution_ru" textarea rows={3} placeholder="Odoo ERP 3 модуля: Отчёты, Склад, Продажи..." />
        </div>

        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: 28, marginBottom: 24 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16, color: '#6b7280' }}>NATIJA ⭐</h3>
          <Field label="Natija (O'zbekcha)" name="result_uz" textarea rows={3} required placeholder="Hisobot 5 daqiqaga tushdi. Xarajat 30% kamaydi. ROI — 4 oyda." />
          <Field label="Natija (Ruscha)" name="result_ru" textarea rows={3} placeholder="Отчёт за 5 минут. Затраты снизились на 30%. ROI — за 4 месяца." />
        </div>

        <div style={{ display: 'flex', gap: 12 }}>
          <button type="submit" style={{ background: '#304E4D', color: '#fff', padding: '11px 28px', borderRadius: 8, border: 'none', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>
            Saqlash
          </button>
          <a href="/admin/cases" style={{ padding: '11px 20px', borderRadius: 8, border: '1px solid #d1d5db', fontSize: 14, textDecoration: 'none', color: '#374151' }}>
            Bekor qilish
          </a>
        </div>
      </form>
    </div>
  )
}
