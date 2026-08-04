import { getCompanies } from '@/lib/data'
import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export const dynamic = 'force-dynamic'

const STATUS_UZ = { prospect: 'Prospect', contacted: 'Aloqa qilingan', negotiation: 'Muzokara', client: 'Klient', lost: 'Yo\'qotilgan' }
const STATUS_CLR = { prospect: '#6b7280', contacted: '#2563eb', negotiation: '#d97706', client: '#16a34a', lost: '#dc2626' }

async function saveCompany(formData) {
  'use server'
  const sb = await createClient()
  const payload = {
    name: formData.get('name'),
    industry: formData.get('industry') || null,
    size: formData.get('size') || null,
    website: formData.get('website') || null,
    phone: formData.get('phone') || null,
    email: formData.get('email') || null,
    address: formData.get('address') || null,
    notes: formData.get('notes') || null,
    status: formData.get('status') || 'prospect',
  }
  const id = formData.get('id')
  if (id) {
    await sb.from('companies').update({ ...payload, updated_at: new Date().toISOString() }).eq('id', id)
  } else {
    await sb.from('companies').insert(payload)
  }
  revalidatePath('/admin/companies')
}

async function deleteCompanyAction(formData) {
  'use server'
  const sb = await createClient()
  const id = formData.get('id')
  await sb.from('companies').delete().eq('id', id)
  revalidatePath('/admin/companies')
}

async function changeStatus(formData) {
  'use server'
  const sb = await createClient()
  const id = formData.get('id')
  const status = formData.get('status')
  await sb.from('companies').update({ status, updated_at: new Date().toISOString() }).eq('id', id)
  revalidatePath('/admin/companies')
}

const inputStyle = { width: '100%', padding: '7px 10px', borderRadius: 7, border: '1px solid var(--color-hairline)', background: 'var(--color-hairline-soft)', fontSize: 14, color: 'var(--color-ink)', boxSizing: 'border-box' }
const selectStyle = { padding: '7px 10px', borderRadius: 7, border: '1px solid var(--color-hairline)', background: 'var(--color-hairline-soft)', fontSize: 14, color: 'var(--color-ink)' }

export default async function CompaniesPage() {
  const companies = await getCompanies({})

  const counts = companies.reduce((acc, c) => { acc[c.status] = (acc[c.status] || 0) + 1; return acc }, {})

  return (
    <div>
      <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 6, color: 'var(--color-ink)' }}>🏢 Kompaniyalar (ABM)</h1>
      <p style={{ fontSize: 14, color: 'var(--color-mute)', marginBottom: 20 }}>B2B maqsadli kompaniyalar va klientlar</p>

      {/* Stats */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
        {Object.entries(STATUS_UZ).map(([k, v]) => (
          <span key={k} style={{
            fontSize: 13, padding: '4px 14px', borderRadius: 16, fontWeight: 600,
            background: `${STATUS_CLR[k]}15`, color: STATUS_CLR[k]
          }}>{v}: {counts[k] || 0}</span>
        ))}
      </div>

      {/* Add new */}
      <div style={{ background: 'var(--color-hairline-soft)', border: '1px solid var(--color-hairline)', borderRadius: 12, padding: 22, marginBottom: 24 }}>
        <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 14, color: 'var(--color-ink)' }}>+ Yangi kompaniya</h3>
        <form action={saveCompany}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 12 }}>
            {[
              ['name', 'Nomi *', 'TechVenture LLC', true],
              ['industry', 'Soha', 'Fintech'],
              ['size', 'Hajmi', '10-50 xodim'],
              ['phone', 'Telefon', '+998 90 123 45 67'],
              ['email', 'Email', 'info@company.uz'],
              ['website', 'Veb-sayt', 'company.uz'],
            ].map(([n, l, p, req]) => (
              <div key={n}>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 4, color: 'var(--color-mute)' }}>{l}</label>
                <input name={n} placeholder={p} required={req || false} style={inputStyle} />
              </div>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 4, color: 'var(--color-mute)' }}>Manzil</label>
              <input name="address" placeholder="Toshkent, Amir Temur 42" style={inputStyle} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 4, color: 'var(--color-mute)' }}>Eslatma</label>
              <input name="notes" placeholder="Qisqacha izoh..." style={inputStyle} />
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <select name="status" style={selectStyle}>
              {Object.entries(STATUS_UZ).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
            </select>
            <button type="submit" style={{ background: 'var(--color-link)', color: 'var(--color-ink)', padding: '9px 22px', borderRadius: 8, border: 'none', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
              Qo'shish
            </button>
          </div>
        </form>
      </div>

      {/* List */}
      {companies.length === 0 ? (
        <p style={{ color: 'var(--color-mute)', textAlign: 'center', padding: 30 }}>Kompaniya yo'q. Yuqorida formadan qo'shing.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {companies.map(c => (
            <div key={c.id} style={{
              background: 'var(--color-hairline-soft)', border: '1px solid var(--color-hairline)', borderRadius: 10, padding: '16px 18px',
              display: 'grid', gridTemplateColumns: '1fr auto', gap: 14, alignItems: 'center'
            }}>
              <div>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 4 }}>
                  <strong style={{ fontSize: 15, color: 'var(--color-ink)' }}>{c.name}</strong>
                  <span style={{
                    fontSize: 11, padding: '2px 10px', borderRadius: 12, fontWeight: 600,
                    background: `${STATUS_CLR[c.status] || '#6b7280'}15`,
                    color: STATUS_CLR[c.status] || '#6b7280'
                  }}>{STATUS_UZ[c.status] || c.status}</span>
                  {c.industry && <span style={{ fontSize: 12, color: 'var(--color-mute)' }}>{c.industry}</span>}
                  {c.size && <span style={{ fontSize: 12, color: 'var(--color-mute)' }}>({c.size})</span>}
                </div>
                <div style={{ display: 'flex', gap: 14, fontSize: 13, color: 'var(--color-mute)', flexWrap: 'wrap' }}>
                  {c.phone && <span>📞 {c.phone}</span>}
                  {c.email && <span>📧 {c.email}</span>}
                  {c.website && <span>🌐 {c.website}</span>}
                  {c.address && <span>📍 {c.address}</span>}
                </div>
                {c.notes && <p style={{ fontSize: 13, color: 'var(--color-mute)', marginTop: 4 }}>{c.notes}</p>}
              </div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {Object.entries(STATUS_UZ).filter(([k]) => k !== c.status).slice(0, 2).map(([k, v]) => (
                  <form key={k} action={changeStatus}>
                    <input type="hidden" name="id" value={c.id} />
                    <input type="hidden" name="status" value={k} />
                    <button type="submit" style={{
                      padding: '5px 10px', borderRadius: 6, border: '1px solid var(--color-hairline)',
                      background: 'var(--color-hairline-soft)', fontSize: 11, cursor: 'pointer', whiteSpace: 'nowrap', color: 'var(--color-ink)'
                    }}>→ {v}</button>
                  </form>
                ))}
                <form action={deleteCompanyAction}>
                  <input type="hidden" name="id" value={c.id} />
                  <button type="submit" style={{ padding: '5px 10px', borderRadius: 6, border: '1px solid rgba(220,38,38,.3)', background: 'rgba(220,38,38,.08)', color: '#ef6b5a', fontSize: 11, cursor: 'pointer' }}>
                    🗑
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
