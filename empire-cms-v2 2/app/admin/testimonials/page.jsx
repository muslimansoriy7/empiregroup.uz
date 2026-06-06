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

export default async function TestimonialsPage() {
  const items = await getTestimonials()

  return (
    <div>
      <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 24 }}>⭐ Testimoniallar (Izohlar)</h1>

      {/* ADD NEW FORM */}
      <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: 24, marginBottom: 28 }}>
        <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>+ Yangi testimonial</h3>
        <form action={saveTestimonial}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
            {[['client_name','Ism *','Aliya M.'],['client_role','Lavozim','CEO'],
              ['company','Kompaniya','FinNova'],['industry','Soha','Fintech']].map(([n,l,p]) => (
              <div key={n}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 5 }}>{l}</label>
                <input name={n} placeholder={p} style={{ width: '100%', padding: '8px 10px', borderRadius: 7, border: '1px solid #d1d5db', fontSize: 14, boxSizing: 'border-box' }} />
              </div>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 5 }}>Izoh (O'zbekcha) *</label>
              <textarea name="quote_uz" rows={3} style={{ width: '100%', padding: '8px 10px', borderRadius: 7, border: '1px solid #d1d5db', fontSize: 14, boxSizing: 'border-box' }} placeholder="Empire Group bizning g'oyamizni..." />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 5 }}>Izoh (Ruscha)</label>
              <textarea name="quote_ru" rows={3} style={{ width: '100%', padding: '8px 10px', borderRadius: 7, border: '1px solid #d1d5db', fontSize: 14, boxSizing: 'border-box' }} placeholder="Empire Group превратила нашу идею..." />
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <select name="rating" style={{ padding: '8px 10px', borderRadius: 7, border: '1px solid #d1d5db', fontSize: 14 }}>
              {[5,4,3].map(r => <option key={r} value={r}>{'⭐'.repeat(r)} ({r})</option>)}
            </select>
            <select name="status" style={{ padding: '8px 10px', borderRadius: 7, border: '1px solid #d1d5db', fontSize: 14 }}>
              <option value="published">Joylash</option>
              <option value="draft">Draft</option>
            </select>
            <input name="sort_order" type="number" placeholder="Tartib (0)" defaultValue="0"
              style={{ width: 100, padding: '8px 10px', borderRadius: 7, border: '1px solid #d1d5db', fontSize: 14 }} />
            <button type="submit" style={{ background: '#304E4D', color: '#fff', padding: '9px 24px', borderRadius: 8, border: 'none', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
              Saqlash
            </button>
          </div>
        </form>
      </div>

      {/* LIST */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {items.map(item => (
          <div key={item.id} style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, padding: 18 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
              <div>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 6 }}>
                  <strong>{item.client_name}</strong>
                  {item.client_role && <span style={{ color: '#6b7280', fontSize: 13 }}>{item.client_role}, {item.company}</span>}
                  <span style={{ fontSize: 12 }}>{'⭐'.repeat(item.rating || 5)}</span>
                  <span style={{ fontSize: 12, padding: '2px 8px', borderRadius: 20, background: item.status === 'published' ? '#dcfce7' : '#f3f4f6', color: item.status === 'published' ? '#15803d' : '#6b7280' }}>
                    {item.status === 'published' ? 'Joylangan' : 'Draft'}
                  </span>
                </div>
                <p style={{ fontSize: 14, color: '#374151', fontStyle: 'italic' }}>"{item.quote_uz || item.quote_ru}"</p>
              </div>
              <form action={deleteTestimonial.bind(null, item.id)}>
                <button type="submit" onClick={(e) => !confirm('O\'chirish?') && e.preventDefault()}
                  style={{ padding: '5px 10px', borderRadius: 6, border: '1px solid #fca5a5', background: '#fff', color: '#ef4444', fontSize: 12, cursor: 'pointer' }}>
                  🗑
                </button>
              </form>
            </div>
          </div>
        ))}
        {items.length === 0 && <p style={{ color: '#6b7280', textAlign: 'center', padding: 30 }}>Hozircha testimonial yo'q.</p>}
      </div>
    </div>
  )
}
