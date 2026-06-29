import Link from 'next/link'
import { getLeadStats, getLeads, getCompanies } from '@/lib/data'
import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

async function getPostStats() {
  const sb = await createClient()
  const { data, count } = await sb.from('posts').select('id,status', { count: 'exact' })
  return { total: count || 0, pub: (data || []).filter(p => p.status === 'published').length }
}

function fmt(d) {
  if (!d) return ''
  try { return new Date(d).toLocaleDateString('uz-UZ', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) } catch { return '' }
}

function money(v) {
  if (!v) return '—'
  const n = Number(v)
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M'
  if (n >= 1_000) return (n / 1_000).toFixed(0) + 'K'
  return n.toLocaleString()
}

const STATUS_UZ = { new: 'Yangi', in_progress: 'Jarayonda', done: 'Yopilgan', spam: 'Spam' }
const STATUS_CLR = { new: '#2563eb', in_progress: '#d97706', done: '#16a34a', spam: '#6b7280' }

export default async function AdminPage() {
  let stats = { total: 0, new: 0, in_progress: 0, done: 0, spam: 0, totalValue: 0 }
  let allLeads = []
  let companies = []
  let postStats = { total: 0, pub: 0 }

  try {
    ;[stats, allLeads, companies, postStats] = await Promise.all([
      getLeadStats(),
      getLeads({ limit: 20 }),
      getCompanies({}),
      getPostStats(),
    ])
  } catch (e) {}

  const now = new Date()
  const todayStr = now.toISOString().slice(0, 10)
  const twoDaysLater = new Date(now.getTime() + 86400000 * 2)

  const overdueFollowUps = allLeads.filter(l => l.next_follow_up && new Date(l.next_follow_up) < now && l.status !== 'done' && l.status !== 'spam')
  const upcomingFollowUps = allLeads.filter(l => l.next_follow_up && new Date(l.next_follow_up) >= now && new Date(l.next_follow_up) <= twoDaysLater)
  const recentLeads = allLeads.slice(0, 8)

  const todayLeads = allLeads.filter(l => l.created_at && l.created_at.slice(0, 10) === todayStr).length
  const weekLeads = allLeads.filter(l => l.created_at && new Date(l.created_at) >= new Date(now.getTime() - 86400000 * 7)).length

  const sources = allLeads.reduce((acc, l) => {
    const src = l.utm_source || l.contact_source || 'direct'
    acc[src] = (acc[src] || 0) + 1
    return acc
  }, {})
  const topSources = Object.entries(sources).sort((a, b) => b[1] - a[1]).slice(0, 5)

  const pipelineTotal = stats.new + stats.in_progress + stats.done
  const conversionRate = pipelineTotal > 0 ? Math.round((stats.done / pipelineTotal) * 100) : 0

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 4, color: '#E8ECF1' }}>CRM Dashboard</h1>
        <p style={{ color: '#7B8FA6', fontSize: 14 }}>Pipeline, leadlar va biznes analitika</p>
      </div>

      {/* Pipeline stats */}
      <div className="crm-stats">
        <Link href="/admin/leads?status=new" style={{ textDecoration: 'none' }}>
          <div className="crm-stat">
            <div className="crm-stat-label">Yangi leadlar</div>
            <div className="crm-stat-value" style={{ color: stats.new > 0 ? '#ef6b5a' : '#E8ECF1' }}>{stats.new}</div>
            <div className="crm-stat-sub">Bugun: +{todayLeads} · Hafta: +{weekLeads}</div>
          </div>
        </Link>
        <Link href="/admin/leads?status=in_progress" style={{ textDecoration: 'none' }}>
          <div className="crm-stat">
            <div className="crm-stat-label">Jarayonda</div>
            <div className="crm-stat-value" style={{ color: '#d97706' }}>{stats.in_progress}</div>
            <div className="crm-stat-sub">Muzokara bosqichida</div>
          </div>
        </Link>
        <Link href="/admin/leads?status=done" style={{ textDecoration: 'none' }}>
          <div className="crm-stat">
            <div className="crm-stat-label">Yopilgan deallar</div>
            <div className="crm-stat-value" style={{ color: '#16a34a' }}>{stats.done}</div>
            <div className="crm-stat-sub">Konversiya: {conversionRate}%</div>
          </div>
        </Link>
        <div className="crm-stat">
          <div className="crm-stat-label">Pipeline qiymati</div>
          <div className="crm-stat-value" style={{ color: '#C8A24A' }}>{money(stats.totalValue)}</div>
          <div className="crm-stat-sub">Jami: {stats.total} ta lead</div>
        </div>
        <Link href="/admin/companies" style={{ textDecoration: 'none' }}>
          <div className="crm-stat">
            <div className="crm-stat-label">Kompaniyalar</div>
            <div className="crm-stat-value">{companies.length}</div>
            <div className="crm-stat-sub">{companies.filter(c => c.status === 'client').length} klient · {companies.filter(c => c.status === 'negotiation').length} muzokara</div>
          </div>
        </Link>
        <Link href="/admin/posts" style={{ textDecoration: 'none' }}>
          <div className="crm-stat">
            <div className="crm-stat-label">Blog kontent</div>
            <div className="crm-stat-value">{postStats.pub}</div>
            <div className="crm-stat-sub">{postStats.total - postStats.pub} draft · {postStats.total} jami</div>
          </div>
        </Link>
      </div>

      {/* Conversion funnel */}
      {pipelineTotal > 0 && (
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 12, color: '#7B8FA6', marginBottom: 6, fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase' }}>PIPELINE FUNNEL</div>
          <div className="crm-funnel">
            <span style={{ width: `${(stats.new / pipelineTotal) * 100}%`, background: '#2563eb' }} />
            <span style={{ width: `${(stats.in_progress / pipelineTotal) * 100}%`, background: '#d97706' }} />
            <span style={{ width: `${(stats.done / pipelineTotal) * 100}%`, background: '#16a34a' }} />
          </div>
          <div style={{ display: 'flex', gap: 16, marginTop: 6, fontSize: 12, color: '#7B8FA6' }}>
            <span><span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: 4, background: '#2563eb', marginRight: 4 }} />Yangi {stats.new}</span>
            <span><span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: 4, background: '#d97706', marginRight: 4 }} />Jarayonda {stats.in_progress}</span>
            <span><span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: 4, background: '#16a34a', marginRight: 4 }} />Yopilgan {stats.done}</span>
          </div>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16 }}>
        <div>
          {/* Overdue follow-ups */}
          {overdueFollowUps.length > 0 && (
            <div className="crm-section" style={{ borderColor: 'rgba(220,38,38,.3)', background: 'rgba(220,38,38,.08)' }}>
              <h3 style={{ color: '#ef6b5a' }}>🚨 O'tkazib yuborilgan follow-up ({overdueFollowUps.length})</h3>
              <div className="crm-list">
                {overdueFollowUps.slice(0, 5).map(l => (
                  <Link key={l.id} href={`/admin/leads/${l.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div style={{ padding: '8px 12px', background: 'rgba(220,38,38,.06)', borderRadius: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid rgba(220,38,38,.15)' }}>
                      <div>
                        <strong style={{ fontSize: 14, color: '#E8ECF1' }}>{l.name}</strong>
                        {l.company && <span style={{ fontSize: 12, color: '#7B8FA6', marginLeft: 8 }}>{l.company}</span>}
                      </div>
                      <span style={{ fontSize: 12, color: '#ef6b5a', fontWeight: 600 }}>{fmt(l.next_follow_up)}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Upcoming follow-ups */}
          {upcomingFollowUps.length > 0 && (
            <div className="crm-section" style={{ borderColor: 'rgba(200,162,74,.2)', background: 'rgba(200,162,74,.06)' }}>
              <h3 style={{ color: '#C8A24A' }}>⏰ Yaqin follow-up ({upcomingFollowUps.length})</h3>
              <div className="crm-list">
                {upcomingFollowUps.slice(0, 5).map(l => (
                  <Link key={l.id} href={`/admin/leads/${l.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div style={{ padding: '8px 12px', background: 'rgba(200,162,74,.06)', borderRadius: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid rgba(200,162,74,.12)' }}>
                      <div>
                        <strong style={{ fontSize: 14, color: '#E8ECF1' }}>{l.name}</strong>
                        {l.service && <span style={{ fontSize: 12, color: '#7B8FA6', marginLeft: 8 }}>{l.service}</span>}
                      </div>
                      <span style={{ fontSize: 12, color: '#C8A24A', fontWeight: 600 }}>{fmt(l.next_follow_up)}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Recent leads */}
          <div className="crm-section">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <h3 style={{ margin: 0, color: '#E8ECF1' }}>So'nggi leadlar</h3>
              <Link href="/admin/leads" style={{ fontSize: 13, color: '#C8A24A', textDecoration: 'none', fontWeight: 600 }}>Hammasi →</Link>
            </div>
            {recentLeads.length === 0 ? (
              <p style={{ fontSize: 14, color: '#7B8FA6', textAlign: 'center', padding: 20 }}>Saytdan lead kutilmoqda...</p>
            ) : (
              <div className="crm-list">
                {recentLeads.map(lead => (
                  <Link key={lead.id} href={`/admin/leads/${lead.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div className="crm-lead-row" style={{ gridTemplateColumns: '1fr auto', border: '1px solid rgba(255,255,255,.06)' }}>
                      <div>
                        <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 3 }}>
                          <span style={{ fontSize: 14, fontWeight: 600, color: '#E8ECF1' }}>{lead.name || '—'}</span>
                          {lead.company && <span style={{ fontSize: 12, color: '#7B8FA6' }}>({lead.company})</span>}
                        </div>
                        <div style={{ fontSize: 12, color: '#7B8FA6', display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                          {lead.phone && <span>{lead.phone}</span>}
                          {lead.service && <span>· {lead.service}</span>}
                          {lead.deal_value && <span>· 💰 {money(lead.deal_value)}</span>}
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                        <span className="crm-badge" style={{ background: `${STATUS_CLR[lead.status]}15`, color: STATUS_CLR[lead.status] }}>
                          {STATUS_UZ[lead.status] || lead.status}
                        </span>
                        <span style={{ fontSize: 11, color: 'rgba(123,143,166,.6)' }}>{fmt(lead.created_at)}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right sidebar */}
        <div>
          {/* Source analytics */}
          {topSources.length > 0 && (
            <div className="crm-section">
              <h3 style={{ color: '#E8ECF1' }}>📊 Lead manbalari</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {topSources.map(([src, count]) => (
                  <div key={src} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0' }}>
                    <span style={{ fontSize: 14, fontWeight: 500, textTransform: 'capitalize', color: '#E8ECF1' }}>{src}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 60, height: 6, borderRadius: 3, background: 'rgba(255,255,255,.06)', overflow: 'hidden' }}>
                        <div style={{ width: `${(count / (topSources[0]?.[1] || 1)) * 100}%`, height: '100%', background: '#C8A24A', borderRadius: 3 }} />
                      </div>
                      <span style={{ fontSize: 13, fontWeight: 700, minWidth: 20, textAlign: 'right', color: '#E8ECF1' }}>{count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quick actions */}
          <div className="crm-section">
            <h3 style={{ color: '#E8ECF1' }}>⚡ Tezkor harakatlar</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
              {[
                ['/admin/posts/new', '✏️ Yangi blog post'],
                ['/admin/companies', '🏢 Kompaniya qo\'shish'],
                ['/admin/leads', '📩 Leadlar pipeline'],
                ['/admin/cases/new', '💼 Case study'],
                ['/admin/testimonials', '⭐ Testimonial'],
                ['/admin/faqs', '❓ FAQ qo\'shish'],
              ].map(([href, label]) => (
                <Link key={href} href={href} style={{ display: 'block', padding: '8px 12px', background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.08)', borderRadius: 8, fontSize: 13, textDecoration: 'none', color: '#E8ECF1', fontWeight: 500 }}>
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
