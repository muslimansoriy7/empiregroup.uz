import Link from 'next/link'
import { getCases } from '../../../lib/data'
import { createClient } from '../../../lib/supabase/server'
import { revalidatePath } from 'next/cache'

async function deleteCase(id) {
  'use server'
  const sb = await createClient()
  await sb.from('cases').delete().eq('id', id)
  revalidatePath('/admin/cases')
}

async function toggleStatus(id, current) {
  'use server'
  const sb = await createClient()
  await sb.from('cases').update({ status: current === 'published' ? 'draft' : 'published' }).eq('id', id)
  revalidatePath('/admin/cases')
}

export default async function CasesPage() {
  const cases = await getCases()
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: '#E8ECF1' }}>💼 Case Studies (Portfolio)</h1>
        <Link href="/admin/cases/new" style={{
          background: '#C8A24A', color: '#0E1A2B', padding: '9px 20px',
          borderRadius: 8, textDecoration: 'none', fontSize: 14, fontWeight: 600
        }}>+ Yangi case</Link>
      </div>

      {cases.length === 0 ? (
        <p style={{ color: '#7B8FA6', textAlign: 'center', padding: 40 }}>
          Hozircha case study yo'q. <Link href="/admin/cases/new" style={{ color: '#C8A24A' }}>Birinchi case'ni qo'shing →</Link>
        </p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {cases.map(c => (
            <div key={c.id} style={{
              background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.08)', borderRadius: 10, padding: 18,
              display: 'grid', gridTemplateColumns: '1fr auto', gap: 16, alignItems: 'center'
            }}>
              <div>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 6 }}>
                  <strong style={{ fontSize: 15, color: '#E8ECF1' }}>{c.client}</strong>
                  <span style={{ fontSize: 12, padding: '2px 10px', borderRadius: 20,
                    background: c.status === 'published' ? 'rgba(22,163,106,.15)' : 'rgba(255,255,255,.06)',
                    color: c.status === 'published' ? '#4ade80' : '#7B8FA6' }}>
                    {c.status === 'published' ? '✓ Joylangan' : 'Draft'}
                  </span>
                  {c.industry && <span style={{ fontSize: 12, color: '#7B8FA6' }}>{c.industry}</span>}
                </div>
                <div style={{ fontSize: 14, color: '#7B8FA6' }}>
                  {c.service && <span>🎯 {c.service}</span>}
                  {c.duration && <span style={{ marginLeft: 16 }}>⏱ {c.duration}</span>}
                  {c.slug && <span style={{ marginLeft: 16, fontFamily: "var(--mono, 'JetBrains Mono',monospace)", fontSize: 12 }}>/{c.slug}</span>}
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <form action={toggleStatus.bind(null, c.id, c.status)}>
                  <button type="submit" style={{ padding: '6px 14px', borderRadius: 6, border: '1px solid rgba(255,255,255,.12)', background: 'rgba(255,255,255,.04)', fontSize: 13, cursor: 'pointer', color: '#E8ECF1' }}>
                    {c.status === 'published' ? 'Draft' : 'Nashr'}
                  </button>
                </form>
                <Link href={`/admin/cases/${c.id}`} style={{ padding: '6px 14px', borderRadius: 6, border: '1px solid rgba(200,162,74,.3)', color: '#C8A24A', fontSize: 13, textDecoration: 'none' }}>
                  ✏️ Tahrir
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
