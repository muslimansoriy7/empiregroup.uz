import Link from 'next/link'
import { getLeads, updateLeadStatus } from '@/lib/data'
import { revalidatePath } from 'next/cache'

export const dynamic = 'force-dynamic'

async function changeStatus(id, status) {
  'use server'
  await updateLeadStatus(id, status)
  revalidatePath('/admin/leads')
  revalidatePath('/admin')
}

const PIPELINE = [
  { key: 'new', label: 'Yangi', color: '#2563eb', bg: 'rgba(37,99,235,.1)' },
  { key: 'in_progress', label: 'Jarayonda', color: '#d97706', bg: 'rgba(217,119,6,.1)' },
  { key: 'done', label: 'Yopilgan', color: '#16a34a', bg: 'rgba(22,163,106,.1)' },
  { key: 'spam', label: 'Spam', color: '#6b7280', bg: 'rgba(107,114,128,.1)' },
]

function fmt(d) {
  if (!d) return ''
  try { return new Date(d).toLocaleDateString('uz-UZ', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) } catch { return '' }
}

function money(v) {
  if (!v) return ''
  const n = Number(v)
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M'
  if (n >= 1_000) return Math.round(n / 1_000) + 'K'
  return n.toLocaleString()
}

function KanbanCard({ lead }) {
  const isOverdue = lead.next_follow_up && new Date(lead.next_follow_up) < new Date() && lead.status !== 'done' && lead.status !== 'spam'
  return (
    <Link href={`/admin/leads/${lead.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div className="crm-card" style={isOverdue ? { borderColor: 'rgba(220,38,38,.4)' } : {}}>
        <div className="crm-card-name">{lead.name || '—'}</div>
        <div className="crm-card-meta">
          {lead.phone && <span>{lead.phone}</span>}
          {lead.service && <span>{lead.service}</span>}
        </div>
        {lead.company && (
          <div style={{ fontSize: 12, color: 'var(--color-ink)', marginTop: 4, fontWeight: 500 }}>🏢 {lead.company}</div>
        )}
        {lead.deal_value && (
          <div className="crm-card-value">💰 {money(lead.deal_value)} so'm</div>
        )}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 6 }}>
          <span style={{ fontSize: 11, color: 'rgba(123,143,166,.6)' }}>{fmt(lead.created_at)}</span>
          {isOverdue && <span style={{ fontSize: 10, padding: '1px 6px', borderRadius: 8, background: 'rgba(220,38,38,.15)', color: '#ef6b5a', fontWeight: 600 }}>OVERDUE</span>}
          {lead.utm_source && <span style={{ fontSize: 10, padding: '1px 6px', borderRadius: 8, background: 'rgba(37,99,235,.15)', color: '#60a5fa' }}>{lead.utm_source}</span>}
        </div>
      </div>
    </Link>
  )
}

export default async function LeadsPage({ searchParams }) {
  const sp = await searchParams
  const view = sp?.view || 'kanban'
  const filterStatus = sp?.status || ''
  const search = sp?.q || ''

  const allLeads = await getLeads({ search: search || undefined })

  const grouped = {}
  for (const p of PIPELINE) grouped[p.key] = []
  for (const l of allLeads) {
    if (grouped[l.status]) grouped[l.status].push(l)
    else grouped.new.push(l)
  }

  const filteredLeads = filterStatus ? allLeads.filter(l => l.status === filterStatus) : allLeads
  const totalValue = allLeads.reduce((s, l) => s + (Number(l.deal_value) || 0), 0)

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 2, color: 'var(--color-ink)' }}>📩 Lead Pipeline</h1>
          <p style={{ fontSize: 13, color: 'var(--color-mute)' }}>{allLeads.length} ta lead · Pipeline: {money(totalValue)} so'm</p>
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          <Link href="/admin/leads?view=kanban" className="crm-pill" style={{ background: view === 'kanban' ? 'var(--color-link)' : 'var(--color-hairline-soft)', color: view === 'kanban' ? 'var(--color-ink)' : 'var(--color-mute)' }}>
            ◻ Kanban
          </Link>
          <Link href="/admin/leads?view=list" className="crm-pill" style={{ background: view === 'list' ? 'var(--color-link)' : 'var(--color-hairline-soft)', color: view === 'list' ? 'var(--color-ink)' : 'var(--color-mute)' }}>
            ☰ Ro'yxat
          </Link>
        </div>
      </div>

      {/* Search */}
      <div className="crm-filters">
        <form style={{ flex: 1, maxWidth: 320 }}>
          <input type="hidden" name="view" value={view} />
          <input name="q" defaultValue={search} placeholder="Qidirish (ism, tel, kompaniya)..."
            style={{ width: '100%', padding: '8px 14px', borderRadius: 8, border: '1px solid var(--color-hairline)', background: 'var(--color-hairline-soft)', fontSize: 14, color: 'var(--color-ink)' }} />
        </form>
        {search && <Link href={`/admin/leads?view=${view}`} style={{ fontSize: 13, color: '#ef6b5a', textDecoration: 'none' }}>✕ Tozalash</Link>}
      </div>

      {allLeads.length === 0 && !search ? (
        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>📩</div>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 6, color: 'var(--color-ink)' }}>Leadlar kutilmoqda</h2>
          <p style={{ fontSize: 14, color: 'var(--color-mute)' }}>Saytdagi forma to'ldirilganda leadlar bu yerda ko'rinadi</p>
        </div>
      ) : search && allLeads.length === 0 ? (
        <p style={{ color: 'var(--color-mute)', textAlign: 'center', padding: 40 }}>"{search}" bo'yicha natija topilmadi</p>
      ) : view === 'kanban' ? (
        /* KANBAN VIEW */
        <div className="crm-kanban">
          {PIPELINE.map(stage => (
            <div key={stage.key} className="crm-col" style={{ background: stage.bg }}>
              <div className="crm-col-head" style={{ background: `${stage.color}20` }}>
                <h3 style={{ color: stage.color }}>{stage.label}</h3>
                <span className="count" style={{ color: stage.color }}>{grouped[stage.key].length}</span>
              </div>
              {grouped[stage.key].length === 0 ? (
                <p style={{ fontSize: 12, color: 'var(--color-mute)', textAlign: 'center', padding: '20px 0' }}>Bo'sh</p>
              ) : (
                grouped[stage.key].map(lead => (
                  <KanbanCard key={lead.id} lead={lead} />
                ))
              )}
            </div>
          ))}
        </div>
      ) : (
        /* LIST VIEW */
        <>
          <div className="crm-filters" style={{ marginBottom: 14 }}>
            <Link href={`/admin/leads?view=list`} className="crm-pill" style={{ background: !filterStatus ? 'var(--color-link)' : 'var(--color-hairline-soft)', color: !filterStatus ? 'var(--color-ink)' : 'var(--color-mute)' }}>
              Hammasi ({allLeads.length})
            </Link>
            {PIPELINE.map(s => (
              <Link key={s.key} href={`/admin/leads?view=list&status=${s.key}`} className="crm-pill"
                style={{ background: filterStatus === s.key ? s.color : 'var(--color-hairline-soft)', color: filterStatus === s.key ? '#fff' : 'var(--color-mute)' }}>
                {s.label} ({grouped[s.key].length})
              </Link>
            ))}
          </div>
          <div className="crm-list">
            {(filterStatus ? grouped[filterStatus] || [] : allLeads).map(lead => (
              <div key={lead.id} className="crm-lead-row">
                <Link href={`/admin/leads/${lead.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 4 }}>
                    <strong style={{ fontSize: 14, color: 'var(--color-ink)' }}>{lead.name || '—'}</strong>
                    {lead.company && <span style={{ fontSize: 12, color: 'var(--color-mute)' }}>({lead.company})</span>}
                    <span className="crm-badge" style={{ background: `${PIPELINE.find(p => p.key === lead.status)?.color || '#6b7280'}15`, color: PIPELINE.find(p => p.key === lead.status)?.color || '#6b7280' }}>
                      {PIPELINE.find(p => p.key === lead.status)?.label || lead.status}
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: 14, fontSize: 13, color: 'var(--color-mute)', flexWrap: 'wrap' }}>
                    {lead.phone && <span>📞 {lead.phone}</span>}
                    {lead.service && <span>🎯 {lead.service}</span>}
                    {lead.deal_value && <span>💰 {money(lead.deal_value)}</span>}
                    {lead.geo_city && <span>📍 {lead.geo_city}</span>}
                    {lead.utm_source && <span>🔗 {lead.utm_source}</span>}
                    <span>📅 {fmt(lead.created_at)}</span>
                  </div>
                  {lead.message && (
                    <p style={{ marginTop: 4, fontSize: 12, color: 'rgba(123,143,166,.6)', fontStyle: 'italic' }}>
                      &ldquo;{lead.message.slice(0, 100)}{lead.message.length > 100 ? '...' : ''}&rdquo;
                    </p>
                  )}
                </Link>
                <div className="crm-actions" style={{ flexDirection: 'column' }}>
                  {PIPELINE.filter(s => s.key !== lead.status && s.key !== 'spam').map(s => (
                    <form key={s.key} action={changeStatus.bind(null, lead.id, s.key)}>
                      <button type="submit">→ {s.label}</button>
                    </form>
                  ))}
                  {lead.status !== 'spam' && (
                    <form action={changeStatus.bind(null, lead.id, 'spam')}>
                      <button type="submit" style={{ color: '#ef6b5a', borderColor: 'rgba(220,38,38,.3)' }}>🗑 Spam</button>
                    </form>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
