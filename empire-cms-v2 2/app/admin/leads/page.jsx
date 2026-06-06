import { getLeads, updateLeadStatus } from '../../../lib/data'
import { revalidatePath } from 'next/cache'

async function changeStatus(id, status) {
  'use server'
  await updateLeadStatus(id, status)
  revalidatePath('/admin/leads')
}

const STATUS_COLORS = {
  new: 'bg-blue-100 text-blue-800',
  in_progress: 'bg-yellow-100 text-yellow-800',
  done: 'bg-green-100 text-green-800',
  spam: 'bg-gray-100 text-gray-500',
}
const STATUS_UZ = { new: 'Yangi', in_progress: 'Jarayonda', done: 'Tugagan', spam: 'Spam' }

export default async function LeadsPage() {
  const leads = await getLeads()
  const counts = leads.reduce((acc, l) => { acc[l.status] = (acc[l.status] || 0) + 1; return acc }, {})

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700 }}>📩 Arizalar (Leads)</h1>
        <div style={{ display: 'flex', gap: 10 }}>
          {Object.entries(STATUS_UZ).map(([k, v]) => (
            <span key={k} style={{ fontSize: 13, padding: '4px 12px', borderRadius: 20, background: '#f3f4f6' }}>
              {v}: <strong>{counts[k] || 0}</strong>
            </span>
          ))}
        </div>
      </div>

      {leads.length === 0 ? (
        <p style={{ color: '#6b7280', textAlign: 'center', padding: 40 }}>
          Hozircha ariza yo'q. Forma yuborilganda bu yerda ko'rinadi.
        </p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {leads.map(lead => (
            <div key={lead.id} style={{
              background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, padding: 18,
              display: 'grid', gridTemplateColumns: '1fr auto', gap: 12, alignItems: 'start'
            }}>
              <div>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 8 }}>
                  <strong style={{ fontSize: 16 }}>{lead.name || '—'}</strong>
                  <span style={{
                    fontSize: 12, padding: '2px 10px', borderRadius: 20,
                    background: lead.status === 'new' ? '#dbeafe' : lead.status === 'done' ? '#dcfce7' : '#f3f4f6',
                    color: lead.status === 'new' ? '#1d4ed8' : lead.status === 'done' ? '#15803d' : '#6b7280'
                  }}>
                    {STATUS_UZ[lead.status]}
                  </span>
                  <span style={{ fontSize: 12, color: '#9ca3af' }}>
                    {new Date(lead.created_at).toLocaleString('uz-UZ')}
                  </span>
                </div>
                <div style={{ display: 'flex', gap: 20, fontSize: 14, color: '#374151', flexWrap: 'wrap' }}>
                  {lead.phone && <span>📞 {lead.phone}</span>}
                  {lead.service && <span>🎯 {lead.service}</span>}
                  {lead.source_page && <span>🌐 {lead.source_page}</span>}
                </div>
                {lead.message && (
                  <p style={{ marginTop: 8, fontSize: 14, color: '#6b7280', fontStyle: 'italic' }}>
                    "{lead.message}"
                  </p>
                )}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {Object.entries(STATUS_UZ).filter(([k]) => k !== lead.status).map(([k, v]) => (
                  <form key={k} action={changeStatus.bind(null, lead.id, k)}>
                    <button type="submit" style={{
                      width: '100%', padding: '5px 12px', borderRadius: 6, border: '1px solid #d1d5db',
                      background: '#fff', fontSize: 13, cursor: 'pointer', whiteSpace: 'nowrap'
                    }}>
                      → {v}
                    </button>
                  </form>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
