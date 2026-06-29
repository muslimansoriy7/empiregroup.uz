import Link from 'next/link'
import { notFound } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { getLeadById, updateLead, getActivities, addActivity } from '@/lib/data'

export const dynamic = 'force-dynamic'

const STATUS_UZ = { new: 'Yangi', in_progress: 'Jarayonda', done: 'Yopilgan', spam: 'Spam' }
const STATUS_CLR = { new: '#2563eb', in_progress: '#d97706', done: '#16a34a', spam: '#6b7280' }
const ACTIVITY_TYPES = { note: '📝', call: '📞', email: '📧', meeting: '🤝', task: '✅' }

function fmt(d) {
  if (!d) return '—'
  try { return new Date(d).toLocaleDateString('uz-UZ', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) } catch { return '—' }
}

export default async function LeadDetailPage({ params }) {
  const { id } = await params
  const lead = await getLeadById(id)
  if (!lead) notFound()

  const activities = await getActivities({ lead_id: id })

  async function updateLeadAction(formData) {
    'use server'
    const updates = {}
    for (const [key, val] of formData.entries()) {
      if (key === 'action_type') continue
      if (val !== '') updates[key] = val
    }
    if (Object.keys(updates).length > 0) {
      await updateLead(id, updates)
    }
    revalidatePath(`/admin/leads/${id}`)
  }

  async function addNoteAction(formData) {
    'use server'
    const type = formData.get('type') || 'note'
    const description = formData.get('description')
    if (!description) return
    await addActivity({ lead_id: id, type, description })
    revalidatePath(`/admin/leads/${id}`)
  }

  async function changeStatusAction(formData) {
    'use server'
    const status = formData.get('status')
    await updateLead(id, { status })
    revalidatePath(`/admin/leads/${id}`)
    revalidatePath('/admin/leads')
  }

  const cardStyle = { background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.08)', borderRadius: 12, padding: 20, marginBottom: 16 }
  const inputStyle = { width: '100%', padding: '7px 10px', borderRadius: 7, border: '1px solid rgba(255,255,255,.12)', background: 'rgba(255,255,255,.04)', fontSize: 13, color: '#E8ECF1', boxSizing: 'border-box' }

  return (
    <div>
      <Link href="/admin/leads" style={{ fontSize: 14, color: '#C8A24A', textDecoration: 'none', marginBottom: 16, display: 'inline-block' }}>
        ← Barcha leadlar
      </Link>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 20 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4, color: '#E8ECF1' }}>{lead.name || 'Nomsiz lead'}</h1>
          <div style={{ display: 'flex', gap: 12, fontSize: 14, color: '#7B8FA6' }}>
            {lead.phone && <span>📞 {lead.phone}</span>}
            {lead.email && <span>📧 {lead.email}</span>}
            {lead.company && <span>🏢 {lead.company}</span>}
          </div>
        </div>
        <span style={{
          fontSize: 13, padding: '4px 14px', borderRadius: 16, fontWeight: 700,
          background: `${STATUS_CLR[lead.status]}15`, color: STATUS_CLR[lead.status]
        }}>{STATUS_UZ[lead.status] || lead.status}</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 20 }}>
        {/* Left — details + activities */}
        <div>
          {/* Info card */}
          <div style={cardStyle}>
            <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12, color: '#E8ECF1' }}>Lead ma'lumotlari</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px 20px', fontSize: 14 }}>
              {[
                ['Xizmat', lead.service],
                ['Shahri', lead.geo_city],
                ['Manba', lead.contact_source || lead.source_page],
                ['Deal qiymati', lead.deal_value ? Number(lead.deal_value).toLocaleString() + ' so\'m' : '—'],
                ['UTM Source', lead.utm_source],
                ['UTM Medium', lead.utm_medium],
                ['UTM Campaign', lead.utm_campaign],
                ['Kelgan vaqt', fmt(lead.created_at)],
                ['Keyingi follow-up', fmt(lead.next_follow_up)],
              ].map(([label, val]) => (
                <div key={label}>
                  <span style={{ color: '#7B8FA6', fontSize: 12 }}>{label}</span>
                  <div style={{ fontWeight: 500, color: '#E8ECF1' }}>{val || '—'}</div>
                </div>
              ))}
            </div>
            {lead.message && (
              <div style={{ marginTop: 14, paddingTop: 14, borderTop: '1px solid rgba(255,255,255,.06)' }}>
                <span style={{ color: '#7B8FA6', fontSize: 12 }}>Xabar</span>
                <p style={{ fontSize: 14, marginTop: 4, fontStyle: 'italic', color: 'rgba(232,236,241,.8)' }}>&ldquo;{lead.message}&rdquo;</p>
              </div>
            )}
            {lead.tags && lead.tags.length > 0 && (
              <div style={{ marginTop: 12, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {lead.tags.map(tag => (
                  <span key={tag} style={{ fontSize: 12, padding: '2px 8px', borderRadius: 10, background: 'rgba(37,99,235,.15)', color: '#60a5fa' }}>{tag}</span>
                ))}
              </div>
            )}
          </div>

          {/* Add activity */}
          <div style={cardStyle}>
            <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 10, color: '#E8ECF1' }}>+ Eslatma / Faoliyat</h3>
            <form action={addNoteAction}>
              <div style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
                <select name="type" style={{ padding: '7px 12px', borderRadius: 7, border: '1px solid rgba(255,255,255,.12)', background: 'rgba(255,255,255,.04)', fontSize: 13, color: '#E8ECF1' }}>
                  <option value="note">📝 Eslatma</option>
                  <option value="call">📞 Qo'ng'iroq</option>
                  <option value="email">📧 Email</option>
                  <option value="meeting">🤝 Uchrashuv</option>
                  <option value="task">✅ Vazifa</option>
                </select>
              </div>
              <textarea name="description" rows={3} required placeholder="Yozing..."
                style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1px solid rgba(255,255,255,.12)', background: 'rgba(255,255,255,.04)', fontSize: 14, color: '#E8ECF1', boxSizing: 'border-box', marginBottom: 10 }} />
              <button type="submit" style={{ background: '#C8A24A', color: '#0E1A2B', padding: '8px 20px', borderRadius: 7, border: 'none', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
                Saqlash
              </button>
            </form>
          </div>

          {/* Activity log */}
          <div style={cardStyle}>
            <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12, color: '#E8ECF1' }}>Faoliyat tarixi</h3>
            {activities.length === 0 ? (
              <p style={{ fontSize: 13, color: '#7B8FA6', textAlign: 'center', padding: 16 }}>Hali faoliyat yo'q</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {activities.map(a => (
                  <div key={a.id} style={{ display: 'flex', gap: 10, padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,.04)' }}>
                    <span style={{ fontSize: 18 }}>{ACTIVITY_TYPES[a.type] || '📝'}</span>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: 14, margin: 0, color: '#E8ECF1' }}>{a.description}</p>
                      <span style={{ fontSize: 12, color: 'rgba(123,143,166,.6)' }}>{fmt(a.created_at)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right sidebar — actions */}
        <div>
          {/* Change status */}
          <div style={cardStyle}>
            <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 10, color: '#E8ECF1' }}>Statusni o'zgartirish</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {Object.entries(STATUS_UZ).filter(([k]) => k !== lead.status).map(([k, v]) => (
                <form key={k} action={changeStatusAction}>
                  <input type="hidden" name="status" value={k} />
                  <button type="submit" style={{
                    width: '100%', padding: '8px 14px', borderRadius: 7, border: `1px solid ${STATUS_CLR[k]}40`,
                    background: `${STATUS_CLR[k]}10`, color: STATUS_CLR[k], fontSize: 13, fontWeight: 600, cursor: 'pointer'
                  }}>→ {v}</button>
                </form>
              ))}
            </div>
          </div>

          {/* Quick edit */}
          <div style={cardStyle}>
            <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 10, color: '#E8ECF1' }}>Tez tahrir</h3>
            <form action={updateLeadAction}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div>
                  <label style={{ fontSize: 12, color: '#7B8FA6', display: 'block', marginBottom: 3 }}>Kompaniya</label>
                  <input name="company" defaultValue={lead.company || ''} style={inputStyle} />
                </div>
                <div>
                  <label style={{ fontSize: 12, color: '#7B8FA6', display: 'block', marginBottom: 3 }}>Deal qiymati (so'm)</label>
                  <input name="deal_value" type="number" defaultValue={lead.deal_value || ''} style={inputStyle} />
                </div>
                <div>
                  <label style={{ fontSize: 12, color: '#7B8FA6', display: 'block', marginBottom: 3 }}>Keyingi follow-up</label>
                  <input name="next_follow_up" type="datetime-local" defaultValue={lead.next_follow_up ? lead.next_follow_up.slice(0, 16) : ''} style={inputStyle} />
                </div>
                <div>
                  <label style={{ fontSize: 12, color: '#7B8FA6', display: 'block', marginBottom: 3 }}>Eslatmalar</label>
                  <textarea name="notes" rows={3} defaultValue={lead.notes || ''} style={inputStyle} />
                </div>
                <button type="submit" style={{ background: '#C8A24A', color: '#0E1A2B', padding: '8px 16px', borderRadius: 7, border: 'none', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
                  Saqlash
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
