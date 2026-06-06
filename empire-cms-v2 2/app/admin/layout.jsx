import Link from 'next/link'

export const metadata = { robots: { index: false, follow: false } };

const navItems = [
  { href: '/admin', label: '🏠 Dashboard', exact: true },
  { href: '/admin/posts', label: '📝 Blog Postlar' },
  { href: '/admin/leads', label: '📩 Leads (Arizalar)' },
  { href: '/admin/cases', label: '💼 Case Studies' },
  { href: '/admin/testimonials', label: '⭐ Testimoniallar' },
  { href: '/admin/faqs', label: '❓ FAQ' },
]

export default function AdminLayout({ children }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f9fafb', fontFamily: 'system-ui,sans-serif' }}>
      {/* Sidebar */}
      <aside style={{ width: 230, background: '#1a2e2d', flexShrink: 0, display: 'flex', flexDirection: 'column', padding: '24px 0' }}>
        <div style={{ padding: '0 18px 24px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ color: '#fff', fontWeight: 800, fontSize: 17 }}>Empire Group</div>
          <div style={{ color: '#6b9e9c', fontSize: 12, marginTop: 2 }}>Admin Panel</div>
        </div>
        <nav style={{ padding: '16px 10px', flex: 1 }}>
          {navItems.map(item => (
            <Link key={item.href} href={item.href} style={{
              display: 'block', padding: '9px 12px', borderRadius: 8, color: '#c4dedd',
              textDecoration: 'none', fontSize: 13.5, fontWeight: 500, marginBottom: 3,
              transition: 'background .15s'
            }}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div style={{ padding: '16px 18px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <form action="/api/auth/signout" method="post">
            <button type="submit" style={{ background: 'rgba(255,255,255,0.08)', color: '#9ca3af', border: 'none', padding: '8px 14px', borderRadius: 7, fontSize: 13, cursor: 'pointer', width: '100%' }}>
              Chiqish →
            </button>
          </form>
        </div>
      </aside>
      {/* Main */}
      <main style={{ flex: 1, padding: 32, maxWidth: '100%', overflowX: 'auto' }}>
        {children}
      </main>
    </div>
  )
}
