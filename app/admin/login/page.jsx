import { signIn } from './actions';

export const metadata = { title: 'Admin — kirish', robots: { index: false } };

export default function LoginPage({ searchParams }) {
  return (
    <div className="admin-wrap" style={{ maxWidth: 400, paddingTop: 80, textAlign: 'center' }}>
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontFamily: "var(--display, 'Fraunces',Georgia,serif)", color: '#C8A24A', fontSize: 28, fontWeight: 700, marginBottom: 6, letterSpacing: '-.02em' }}>Empire Group</div>
        <div style={{ fontFamily: "var(--mono, 'JetBrains Mono',monospace)", fontSize: 10, letterSpacing: '.2em', color: 'rgba(200,162,74,.4)', textTransform: 'uppercase' }}>CRM + Admin Panel</div>
      </div>
      {searchParams?.error ? <div className="note" style={{ borderColor: 'rgba(239,107,90,.3)', color: '#ef6b5a', textAlign: 'left' }}>{searchParams.error}</div> : null}
      <form action={signIn} className="card" style={{ textAlign: 'left' }}>
        <div className="field">
          <label>Email</label>
          <input type="email" name="email" required autoComplete="email" placeholder="admin@empiregroup.uz" />
        </div>
        <div className="field">
          <label>Parol</label>
          <input type="password" name="password" required autoComplete="current-password" placeholder="••••••••" />
        </div>
        <button className="btn btn-fill" type="submit" style={{ width: '100%', justifyContent: 'center', padding: '12px 20px', borderRadius: 10, fontSize: 14, fontFamily: "var(--mono, 'JetBrains Mono',monospace)", letterSpacing: '.06em', textTransform: 'uppercase', cursor: 'pointer' }}>
          Kirish →
        </button>
      </form>
      <p style={{ color: 'rgba(123,143,166,.6)', fontSize: '.78rem', marginTop: 18, fontFamily: "var(--mono, 'JetBrains Mono',monospace)" }}>
        Supabase → Authentication → Users
      </p>
    </div>
  );
}
