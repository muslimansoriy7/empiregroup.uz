import { getFaqs } from '../../../lib/data'
import { createClient } from '../../../lib/supabase/server'
import { revalidatePath } from 'next/cache'

async function saveFaq(formData) {
  'use server'
  const sb = await createClient()
  const payload = {
    category: formData.get('category') || 'general',
    question_uz: formData.get('question_uz'),
    question_ru: formData.get('question_ru'),
    answer_uz: formData.get('answer_uz'),
    answer_ru: formData.get('answer_ru'),
    status: formData.get('status') || 'published',
    sort_order: parseInt(formData.get('sort_order')) || 0,
  }
  const id = formData.get('id')
  if (id) { await sb.from('faqs').update(payload).eq('id', id) }
  else { await sb.from('faqs').insert(payload) }
  revalidatePath('/admin/faqs')
}

async function deleteFaq(id) {
  'use server'
  const sb = await createClient()
  await sb.from('faqs').delete().eq('id', id)
  revalidatePath('/admin/faqs')
}

const CATS = ['general','erp','geo','seo','sayt','ai','marketing']

const inputStyle = { width: '100%', padding: '8px 10px', borderRadius: 7, border: '1px solid var(--color-hairline)', background: 'var(--color-hairline-soft)', fontSize: 14, color: 'var(--color-ink)', boxSizing: 'border-box' }
const selectStyle = { padding: '8px 10px', borderRadius: 7, border: '1px solid var(--color-hairline)', background: 'var(--color-hairline-soft)', fontSize: 14, color: 'var(--color-ink)' }

export default async function FaqsPage() {
  const faqs = await getFaqs({ status: undefined })

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: 'var(--color-ink)' }}>❓ FAQ — Savol-Javoblar</h1>
        <p style={{ fontSize: 13, color: 'var(--color-mute)', alignSelf: 'center' }}>
          Bu FAQ'lar Schema.org orqali Google va AI-qidiruv uchun ishlatiladi
        </p>
      </div>

      <div style={{ background: 'var(--color-hairline-soft)', border: '1px solid var(--color-hairline)', borderRadius: 12, padding: 24, marginBottom: 28 }}>
        <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16, color: 'var(--color-ink)' }}>+ Yangi FAQ</h3>
        <form action={saveFaq}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 5, color: 'var(--color-mute)' }}>Savol (O'zbekcha) *</label>
              <input name="question_uz" required style={inputStyle} placeholder="ERP joriy etish qancha vaqt ketadi?" />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 5, color: 'var(--color-mute)' }}>Savol (Ruscha)</label>
              <input name="question_ru" style={inputStyle} placeholder="Сколько занимает внедрение ERP?" />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 5, color: 'var(--color-mute)' }}>Javob (O'zbekcha) *</label>
              <textarea name="answer_uz" rows={3} required style={inputStyle} placeholder="Kichik-o'rta biznes uchun 2–4 oy..." />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 5, color: 'var(--color-mute)' }}>Javob (Ruscha)</label>
              <textarea name="answer_ru" rows={3} style={inputStyle} placeholder="Для МСБ 2–4 месяца..." />
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 4, color: 'var(--color-mute)' }}>Kategoriya</label>
              <select name="category" style={selectStyle}>
                {CATS.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 4, color: 'var(--color-mute)' }}>Holat</label>
              <select name="status" style={selectStyle}>
                <option value="published">Joylash</option>
                <option value="draft">Draft</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 4, color: 'var(--color-mute)' }}>Tartib</label>
              <input name="sort_order" type="number" defaultValue="0" style={{ width: 70, padding: '8px 10px', borderRadius: 7, border: '1px solid var(--color-hairline)', background: 'var(--color-hairline-soft)', fontSize: 14, color: 'var(--color-ink)' }} />
            </div>
            <button type="submit" style={{ background: 'var(--color-link)', color: 'var(--color-ink)', padding: '9px 24px', borderRadius: 8, border: 'none', fontSize: 14, fontWeight: 600, cursor: 'pointer', alignSelf: 'flex-end', marginBottom: 0 }}>
              Saqlash
            </button>
          </div>
        </form>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {faqs.map(faq => (
          <div key={faq.id} style={{ background: 'var(--color-hairline-soft)', border: '1px solid var(--color-hairline)', borderRadius: 10, padding: 16, display: 'grid', gridTemplateColumns: '1fr auto', gap: 12 }}>
            <div>
              <div style={{ display: 'flex', gap: 8, marginBottom: 4 }}>
                <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 20, background: 'var(--color-hairline-soft)', color: 'var(--color-ink)', fontFamily: "var(--mono, var(--font-geist-mono),monospace)" }}>{faq.category}</span>
                <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 20, background: faq.status === 'published' ? 'rgba(22,163,106,.15)' : 'var(--color-hairline-soft)', color: faq.status === 'published' ? '#15803d' : 'var(--color-mute)' }}>
                  {faq.status === 'published' ? 'Joylangan' : 'Draft'}
                </span>
              </div>
              <p style={{ fontWeight: 600, fontSize: 14, marginBottom: 4, color: 'var(--color-ink)' }}>{faq.question_uz}</p>
              <p style={{ fontSize: 13, color: 'var(--color-mute)' }}>{faq.answer_uz}</p>
            </div>
            <form action={deleteFaq.bind(null, faq.id)}>
              <button type="submit" style={{ padding: '5px 10px', borderRadius: 6, border: '1px solid rgba(220,38,38,.3)', background: 'rgba(220,38,38,.08)', color: '#ef6b5a', fontSize: 12, cursor: 'pointer' }}>🗑</button>
            </form>
          </div>
        ))}
        {faqs.length === 0 && <p style={{ textAlign: 'center', color: 'var(--color-mute)', padding: 30 }}>Hozircha FAQ yo'q.</p>}
      </div>
    </div>
  )
}
