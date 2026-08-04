import { signIn } from './actions';

export const metadata = { title: 'Admin — kirish', robots: { index: false } };

export default function LoginPage({ searchParams }) {
  return (
    <div className="admin-wrap" style={{ maxWidth: 400, paddingTop: 72, textAlign: 'center' }}>
      <div style={{ marginBottom: 26 }}>
        <div style={{ fontFamily: 'var(--font-sans)', color: 'var(--color-ink)', fontSize: 26, fontWeight: 600, marginBottom: 6, letterSpacing: '-.02em' }}>Empire Group</div>
        <div style={{ fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 600, letterSpacing: '.16em', color: 'var(--color-mute)', textTransform: 'uppercase' }}>CRM · Admin Panel</div>
      </div>
      {searchParams?.error ? <div className="note" style={{ borderColor: 'rgba(220,38,38,.3)', color: '#dc2626', textAlign: 'left' }}>{searchParams.error}</div> : null}
      <form action={signIn} className="card" style={{ textAlign: 'left' }}>
        <div className="field">
          <label>Email</label>
          <input type="email" name="email" required autoComplete="email" placeholder="admin@empiregroup.uz" />
        </div>
        <div className="field">
          <label>Parol</label>
          <input type="password" name="password" required autoComplete="current-password" placeholder="••••••••" />
        </div>
        <button className="btn btn-fill" type="submit" style={{ width: '100%', justifyContent: 'center', padding: '12px 20px', borderRadius: 50, fontSize: 14, fontFamily: 'var(--font-sans)', fontWeight: 600, cursor: 'pointer' }}>
          Kirish →
        </button>
      </form>
      <p style={{ color: 'var(--color-faint)', fontSize: '.8rem', marginTop: 18, fontFamily: 'var(--font-sans)' }}>
        Supabase → Authentication → Users
      </p>
    </div>
  );
}
