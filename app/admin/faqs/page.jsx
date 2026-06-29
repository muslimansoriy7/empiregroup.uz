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

const inputStyle = { width: '100%', padding: '8px 10px', borderRadius: 7, border: '1px solid rgba(255,255,255,.12)', background: 'rgba(255,255,255,.04)', fontSize: 14, color: '#E8ECF1', boxSizing: 'border-box' }
const selectStyle = { padding: '8px 10px', borderRadius: 7, border: '1px solid rgba(255,255,255,.12)', background: 'rgba(255,255,255,.04)', fontSize: 14, color: '#E8ECF1' }

export default async function FaqsPage() {
  const faqs = await getFaqs({ status: undefined })

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: '#E8ECF1' }}>❓ FAQ — Savol-Javoblar</h1>
        <p style={{ fontSize: 13, color: '#7B8FA6', alignSelf: 'center' }}>
          Bu FAQ'lar Schema.org orqali Google va AI-qidiruv uchun ishlatiladi
        </p>
      </div>

      <div style={{ background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.08)', borderRadius: 12, padding: 24, marginBottom: 28 }}>
        <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16, color: '#E8ECF1' }}>+ Yangi FAQ</h3>
        <form action={saveFaq}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 5, color: '#7B8FA6' }}>Savol (O'zbekcha) *</label>
              <input name="question_uz" required style={inputStyle} placeholder="ERP joriy etish qancha vaqt ketadi?" />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 5, color: '#7B8FA6' }}>Savol (Ruscha)</label>
              <input name="question_ru" style={inputStyle} placeholder="Сколько занимает внедрение ERP?" />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 5, color: '#7B8FA6' }}>Javob (O'zbekcha) *</label>
              <textarea name="answer_uz" rows={3} required style={inputStyle} placeholder="Kichik-o'rta biznes uchun 2–4 oy..." />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 5, color: '#7B8FA6' }}>Javob (Ruscha)</label>
              <textarea name="answer_ru" rows={3} style={inputStyle} placeholder="Для МСБ 2–4 месяца..." />
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 4, color: '#7B8FA6' }}>Kategoriya</label>
              <select name="category" style={selectStyle}>
                {CATS.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 4, color: '#7B8FA6' }}>Holat</label>
              <select name="status" style={selectStyle}>
                <option value="published">Joylash</option>
                <option value="draft">Draft</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 4, color: '#7B8FA6' }}>Tartib</label>
              <input name="sort_order" type="number" defaultValue="0" style={{ width: 70, padding: '8px 10px', borderRadius: 7, border: '1px solid rgba(255,255,255,.12)', background: 'rgba(255,255,255,.04)', fontSize: 14, color: '#E8ECF1' }} />
            </div>
            <button type="submit" style={{ background: '#C8A24A', color: '#0E1A2B', padding: '9px 24px', borderRadius: 8, border: 'none', fontSize: 14, fontWeight: 600, cursor: 'pointer', alignSelf: 'flex-end', marginBottom: 0 }}>
              Saqlash
            </button>
          </div>
        </form>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {faqs.map(faq => (
          <div key={faq.id} style={{ background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.08)', borderRadius: 10, padding: 16, display: 'grid', gridTemplateColumns: '1fr auto', gap: 12 }}>
            <div>
              <div style={{ display: 'flex', gap: 8, marginBottom: 4 }}>
                <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 20, background: 'rgba(255,255,255,.06)', color: '#E8ECF1', fontFamily: "var(--mono, 'JetBrains Mono',monospace)" }}>{faq.category}</span>
                <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 20, background: faq.status === 'published' ? 'rgba(22,163,106,.15)' : 'rgba(255,255,255,.06)', color: faq.status === 'published' ? '#4ade80' : '#7B8FA6' }}>
                  {faq.status === 'published' ? 'Joylangan' : 'Draft'}
                </span>
              </div>
              <p style={{ fontWeight: 600, fontSize: 14, marginBottom: 4, color: '#E8ECF1' }}>{faq.question_uz}</p>
              <p style={{ fontSize: 13, color: '#7B8FA6' }}>{faq.answer_uz}</p>
            </div>
            <form action={deleteFaq.bind(null, faq.id)}>
              <button type="submit" style={{ padding: '5px 10px', borderRadius: 6, border: '1px solid rgba(220,38,38,.3)', background: 'rgba(220,38,38,.08)', color: '#ef6b5a', fontSize: 12, cursor: 'pointer' }}>🗑</button>
            </form>
          </div>
        ))}
        {faqs.length === 0 && <p style={{ textAlign: 'center', color: '#7B8FA6', padding: 30 }}>Hozircha FAQ yo'q.</p>}
      </div>
    </div>
  )
}
