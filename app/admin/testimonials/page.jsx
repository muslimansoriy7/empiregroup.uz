import { getTestimonials } from '../../../lib/data'
import { createClient } from '../../../lib/supabase/server'
import { revalidatePath } from 'next/cache'

async function saveTestimonial(formData) {
  'use server'
  const sb = await createClient()
  const payload = {
    client_name: formData.get('client_name'),
    client_role: formData.get('client_role'),
    company: formData.get('company'),
    industry: formData.get('industry'),
    rating: parseInt(formData.get('rating')) || 5,
    quote_uz: formData.get('quote_uz'),
    quote_ru: formData.get('quote_ru'),
    status: formData.get('status') || 'draft',
    sort_order: parseInt(formData.get('sort_order')) || 0,
  }
  const id = formData.get('id')
  if (id) { await sb.from('testimonials').update(payload).eq('id', id) }
  else { await sb.from('testimonials').insert(payload) }
  revalidatePath('/admin/testimonials')
}

async function deleteTestimonial(id) {
  'use server'
  const sb = await createClient()
  await sb.from('testimonials').delete().eq('id', id)
  revalidatePath('/admin/testimonials')
}

const inputStyle = { width: '100%', padding: '8px 10px', borderRadius: 7, border: '1px solid rgba(255,255,255,.12)', background: 'rgba(255,255,255,.04)', fontSize: 14, color: '#E8ECF1', boxSizing: 'border-box' }
const selectStyle = { padding: '8px 10px', borderRadius: 7, border: '1px solid rgba(255,255,255,.12)', background: 'rgba(255,255,255,.04)', fontSize: 14, color: '#E8ECF1' }

export default async function TestimonialsPage() {
  const items = await getTestimonials()

  return (
    <div>
      <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 24, color: '#E8ECF1' }}>⭐ Testimoniallar (Izohlar)</h1>

      {/* ADD NEW FORM */}
      <div style={{ background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.08)', borderRadius: 12, padding: 24, marginBottom: 28 }}>
        <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16, color: '#E8ECF1' }}>+ Yangi testimonial</h3>
        <form action={saveTestimonial}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
            {[['client_name','Ism *','Aliya M.'],['client_role','Lavozim','CEO'],
              ['company','Kompaniya','FinNova'],['industry','Soha','Fintech']].map(([n,l,p]) => (
              <div key={n}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 5, color: '#7B8FA6' }}>{l}</label>
                <input name={n} placeholder={p} style={inputStyle} />
              </div>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 5, color: '#7B8FA6' }}>Izoh (O'zbekcha) *</label>
              <textarea name="quote_uz" rows={3} style={inputStyle} placeholder="Empire Group bizning g'oyamizni..." />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 5, color: '#7B8FA6' }}>Izoh (Ruscha)</label>
              <textarea name="quote_ru" rows={3} style={inputStyle} placeholder="Empire Group превратила нашу идею..." />
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <select name="rating" style={selectStyle}>
              {[5,4,3].map(r => <option key={r} value={r}>{'⭐'.repeat(r)} ({r})</option>)}
            </select>
            <select name="status" style={selectStyle}>
              <option value="published">Joylash</option>
              <option value="draft">Draft</option>
            </select>
            <input name="sort_order" type="number" placeholder="Tartib (0)" defaultValue="0"
              style={{ width: 100, padding: '8px 10px', borderRadius: 7, border: '1px solid rgba(255,255,255,.12)', background: 'rgba(255,255,255,.04)', fontSize: 14, color: '#E8ECF1' }} />
            <button type="submit" style={{ background: '#C8A24A', color: '#0E1A2B', padding: '9px 24px', borderRadius: 8, border: 'none', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
              Saqlash
            </button>
          </div>
        </form>
      </div>

      {/* LIST */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {items.map(item => (
          <div key={item.id} style={{ background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.08)', borderRadius: 10, padding: 18 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
              <div>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 6 }}>
                  <strong style={{ color: '#E8ECF1' }}>{item.client_name}</strong>
                  {item.client_role && <span style={{ color: '#7B8FA6', fontSize: 13 }}>{item.client_role}, {item.company}</span>}
                  <span style={{ fontSize: 12 }}>{'⭐'.repeat(item.rating || 5)}</span>
                  <span style={{ fontSize: 12, padding: '2px 8px', borderRadius: 20, background: item.status === 'published' ? 'rgba(22,163,106,.15)' : 'rgba(255,255,255,.06)', color: item.status === 'published' ? '#4ade80' : '#7B8FA6' }}>
                    {item.status === 'published' ? 'Joylangan' : 'Draft'}
                  </span>
                </div>
                <p style={{ fontSize: 14, color: 'rgba(232,236,241,.8)', fontStyle: 'italic' }}>"{item.quote_uz || item.quote_ru}"</p>
              </div>
              <form action={deleteTestimonial.bind(null, item.id)}>
                <button type="submit" onClick={(e) => !confirm('O\'chirish?') && e.preventDefault()}
                  style={{ padding: '5px 10px', borderRadius: 6, border: '1px solid rgba(220,38,38,.3)', background: 'rgba(220,38,38,.08)', color: '#ef6b5a', fontSize: 12, cursor: 'pointer' }}>
                  🗑
                </button>
              </form>
            </div>
          </div>
        ))}
        {items.length === 0 && <p style={{ color: '#7B8FA6', textAlign: 'center', padding: 30 }}>Hozircha testimonial yo'q.</p>}
      </div>
    </div>
  )
}
