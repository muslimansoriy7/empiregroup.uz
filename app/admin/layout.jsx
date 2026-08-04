import Link from 'next/link'
// The admin/CRM panel now shares the marketing site's design language — the
// light Questly/Vercel tokens live in styles/legacy.css under the `.adm` scope.
import '@/styles/legacy.css'
import { signOut } from './actions'

export const metadata = { robots: { index: false, follow: false } };

const navItems = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/leads', label: 'Leadlar (CRM)' },
  { href: '/admin/companies', label: 'Kompaniyalar' },
  { href: '/admin/posts', label: 'Blog Postlar' },
  { href: '/admin/cases', label: 'Case Studies' },
  { href: '/admin/testimonials', label: 'Testimoniallar' },
  { href: '/admin/faqs', label: 'FAQ' },
]

export default function AdminLayout({ children }) {
  return (
    <div
      className="adm"
      style={{
        display: 'flex',
        minHeight: '100vh',
        background: 'var(--color-canvas)',
        fontFamily: 'var(--font-sans)',
        color: 'var(--color-ink)',
      }}
    >
      <aside
        style={{
          width: 240,
          flexShrink: 0,
          display: 'flex',
          flexDirection: 'column',
          background: 'var(--color-elevated)',
          borderRight: '1px solid var(--color-hairline)',
          position: 'sticky',
          top: 0,
          height: '100vh',
        }}
      >
        <div style={{ padding: '24px 20px 20px', borderBottom: '1px solid var(--color-hairline)' }}>
          <div
            style={{
              fontFamily: 'var(--font-sans)',
              color: 'var(--color-ink)',
              fontWeight: 600,
              fontSize: 17,
              letterSpacing: '-.02em',
            }}
          >
            Empire Group
          </div>
          <div
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 11,
              letterSpacing: '.14em',
              color: 'var(--color-mute)',
              marginTop: 4,
              fontWeight: 600,
              textTransform: 'uppercase',
            }}
          >
            CRM · Admin Panel
          </div>
        </div>
        <nav style={{ padding: '16px 12px', flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="adm-nav-link"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '10px 14px',
                borderRadius: 10,
                color: 'var(--color-body)',
                textDecoration: 'none',
                fontSize: 14,
                fontWeight: 500,
                letterSpacing: '.01em',
                transition: 'background .15s, color .15s',
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div style={{ padding: '14px', borderTop: '1px solid var(--color-hairline)' }}>
          <form action={signOut}>
            <button
              type="submit"
              style={{
                background: 'var(--color-elevated)',
                color: 'var(--color-body)',
                border: '1px solid var(--color-hairline)',
                padding: '10px 14px',
                borderRadius: 50,
                fontSize: 13,
                fontWeight: 500,
                cursor: 'pointer',
                width: '100%',
                fontFamily: 'var(--font-sans)',
                transition: 'border-color .15s, background .15s',
              }}
            >
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
