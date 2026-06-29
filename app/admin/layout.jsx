import Link from 'next/link'
import { signOut } from './actions'

export const metadata = { robots: { index: false, follow: false } };

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: '◆' },
  { href: '/admin/leads', label: 'Leadlar (CRM)', icon: '◈' },
  { href: '/admin/companies', label: 'Kompaniyalar', icon: '▣' },
  { href: '/admin/posts', label: 'Blog Postlar', icon: '◇' },
  { href: '/admin/cases', label: 'Case Studies', icon: '▸' },
  { href: '/admin/testimonials', label: 'Testimoniallar', icon: '★' },
  { href: '/admin/faqs', label: 'FAQ', icon: '?' },
]

export default function AdminLayout({ children }) {
  return (
    <div className="adm" style={{ display: 'flex', minHeight: '100vh', background: '#0E1A2B', fontFamily: "var(--body, 'Outfit',system-ui,sans-serif)", color: '#E8ECF1' }}>
      <aside style={{
        width: 240, flexShrink: 0, display: 'flex', flexDirection: 'column',
        background: 'rgba(10,15,28,.6)', borderRight: '1px solid rgba(200,162,74,.1)',
        backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)'
      }}>
        <div style={{ padding: '28px 22px 22px', borderBottom: '1px solid rgba(200,162,74,.12)' }}>
          <div style={{ fontFamily: "var(--display, 'Fraunces',Georgia,serif)", color: '#C8A24A', fontWeight: 700, fontSize: 18, letterSpacing: '-.01em' }}>Empire Group</div>
          <div style={{ fontFamily: "var(--mono, 'JetBrains Mono',monospace)", fontSize: 10, letterSpacing: '.14em', color: 'rgba(200,162,74,.5)', marginTop: 4, textTransform: 'uppercase' }}>CRM + Admin Panel</div>
        </div>
        <nav style={{ padding: '18px 12px', flex: 1 }}>
          {navItems.map(item => (
            <Link key={item.href} href={item.href} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '10px 14px', borderRadius: 10, color: 'rgba(232,236,241,.6)',
              textDecoration: 'none', fontSize: 13.5, fontWeight: 500, marginBottom: 2,
              transition: 'all .15s', letterSpacing: '.01em'
            }}>
              <span style={{ fontSize: 11, color: '#C8A24A', opacity: .5, fontWeight: 700 }}>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
        <div style={{ padding: '16px 14px', borderTop: '1px solid rgba(200,162,74,.1)' }}>
          <form action={signOut}>
            <button type="submit" style={{
              background: 'rgba(200,162,74,.08)', color: 'rgba(200,162,74,.6)',
              border: '1px solid rgba(200,162,74,.12)', padding: '9px 14px', borderRadius: 8,
              fontSize: 12, cursor: 'pointer', width: '100%', fontFamily: "var(--mono, 'JetBrains Mono',monospace)",
              letterSpacing: '.06em', textTransform: 'uppercase', transition: 'all .15s'
            }}>
              Chiqish →
            </button>
          </form>
        </div>
      </aside>
      <main style={{ flex: 1, padding: 32, maxWidth: '100%', overflowX: 'auto' }}>
        {children}
      </main>
    </div>
  )
}
