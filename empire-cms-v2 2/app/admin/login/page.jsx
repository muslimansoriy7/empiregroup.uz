import { signIn } from './actions';

export const metadata = { title: 'Admin — kirish', robots: { index: false } };

export default function LoginPage({ searchParams }) {
  return (
    <div className="admin-wrap" style={{ maxWidth: 420, paddingTop: 70 }}>
      <h1 style={{ fontFamily: 'var(--display)', fontSize: '1.8rem', marginBottom: 6 }}>Admin panel</h1>
      <p style={{ color: 'var(--muted)', marginBottom: 22 }}>Empire Group CMS — tizimga kiring.</p>
      {searchParams?.error ? <div className="note" style={{ borderColor: '#b5654a', color: '#b5654a' }}>{searchParams.error}</div> : null}
      <form action={signIn} className="card">
        <div className="field">
          <label>Email</label>
          <input type="email" name="email" required autoComplete="email" />
        </div>
        <div className="field">
          <label>Parol</label>
          <input type="password" name="password" required autoComplete="current-password" />
        </div>
        <button className="btn btn-fill" type="submit" style={{ width: '100%', justifyContent: 'center' }}>Kirish →</button>
      </form>
      <p style={{ color: 'var(--muted-dark)', fontSize: '.82rem', marginTop: 16 }}>
        Foydalanuvchi Supabase → Authentication → Users bo‘limida yaratiladi.
      </p>
    </div>
  );
}
