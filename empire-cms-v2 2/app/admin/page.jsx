import Link from 'next/link'
import { createClient } from '../../lib/supabase/server'

async function getStats() {
  const sb = await createClient()
  const [leads, posts, cases, testimonials] = await Promise.all([
    sb.from('leads').select('id,status', { count: 'exact' }),
    sb.from('posts').select('id,status', { count: 'exact' }),
    sb.from('cases').select('id,status', { count: 'exact' }).catch(() => ({ data: [], count: 0 })),
    sb.from('testimonials').select('id,status', { count: 'exact' }).catch(() => ({ data: [], count: 0 })),
  ])
  return {
    leads: { total: leads.count || 0, new: (leads.data || []).filter(l => l.status === 'new').length },
    posts: { total: posts.count || 0, pub: (posts.data || []).filter(p => p.status === 'published').length },
    cases: { total: cases.count || 0, pub: (cases.data || []).filter(c => c.status === 'published').length },
    testimonials: { total: testimonials.count || 0, pub: (testimonials.data || []).filter(t => t.status === 'published').length },
  }
}

const Card = ({ href, icon, label, value, sub, color = '#304E4D' }) => (
  <Link href={href} style={{ textDecoration: 'none' }}>
    <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: '20px 24px', cursor: 'pointer', transition: 'border-color .15s' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
        <div>
          <div style={{ fontSize: 28, marginBottom: 6 }}>{icon}</div>
          <div style={{ fontSize: 13, color: '#6b7280', marginBottom: 4 }}>{label}</div>
          <div style={{ fontSize: 30, fontWeight: 800, color }}>{value}</div>
          {sub && <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 4 }}>{sub}</div>}
        </div>
      </div>
    </div>
  </Link>
)

export default async function AdminPage() {
  let stats = { leads: {total:0,new:0}, posts:{total:0,pub:0}, cases:{total:0,pub:0}, testimonials:{total:0,pub:0} }
  try { stats = await getStats() } catch(e) {}

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 4 }}>Xush kelibsiz, Admin 👋</h1>
        <p style={{ color: '#6b7280', fontSize: 14 }}>Empire Group boshqaruv paneli</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 32 }}>
        <Card href="/admin/leads" icon="📩" label="Yangi arizalar" value={stats.leads.new}
          sub={`Jami: ${stats.leads.total}`} color={stats.leads.new > 0 ? '#dc2626' : '#304E4D'} />
        <Card href="/admin/posts" icon="📝" label="Blog postlar" value={stats.posts.pub}
          sub={`Jami: ${stats.posts.total} (${stats.posts.total - stats.posts.pub} draft)`} />
        <Card href="/admin/cases" icon="💼" label="Case Studies" value={stats.cases.pub}
          sub={`Jami: ${stats.cases.total}`} />
        <Card href="/admin/testimonials" icon="⭐" label="Testimoniallar" value={stats.testimonials.pub}
          sub={`Jami: ${stats.testimonials.total}`} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: 22 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 14 }}>⚡ Tezkor harakatlar</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
            {[
              ['/admin/posts/new','✏️ Yangi blog post yozish'],
              ['/admin/cases/new','💼 Case study qo\'shish'],
              ['/admin/testimonials','⭐ Testimonial qo\'shish'],
              ['/admin/faqs','❓ FAQ qo\'shish'],
            ].map(([href, label]) => (
              <Link key={href} href={href} style={{ display: 'block', padding: '9px 14px', background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: 8, fontSize: 14, textDecoration: 'none', color: '#374151' }}>
                {label}
              </Link>
            ))}
          </div>
        </div>

        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: 22 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 14 }}>📋 To'ldirish kerak</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              ['GA4 o\'rnatish','GA_MEASUREMENT_ID → empiregroup.uz head_index.html ga joylashtiring','ga'],
              ['Meta Pixel','META_PIXEL_ID → head_index.html ga joylashtiring','fb'],
              ['Telegram Bot','@BotFather → Token olish → foot_spa.html ga joylashtirish','tg'],
              ['Supabase deploy','SQL migration 0002 ishga tushirish','db'],
            ].map(([t,d]) => (
              <div key={t} style={{ display: 'flex', gap: 10, padding: '8px 12px', background: '#fef9ee', border: '1px solid #fde68a', borderRadius: 8 }}>
                <span style={{ fontSize: 13 }}>⚠️</span>
                <div><div style={{ fontSize: 13, fontWeight: 600 }}>{t}</div><div style={{ fontSize: 12, color: '#6b7280' }}>{d}</div></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
