import Link from 'next/link';

const CATEGORIES = ['GEO', 'SEO', 'ERP', 'AI', 'Performance', 'Web', 'Mobile', 'Case'];

export default function PostForm({ post = {}, action, error }) {
  const v = (k) => post?.[k] ?? '';
  return (
    <div className="admin-wrap">
      <div className="admin-bar">
        <h1>{post?.id ? 'Maqolani tahrirlash' : 'Yangi maqola'}</h1>
        <Link href="/admin" className="btn btn-line">← Orqaga</Link>
      </div>
      {error ? <div className="note" style={{ borderColor: '#b5654a', color: '#b5654a' }}>{error}</div> : null}
      <div className="note">Matn <b>Markdown</b> formatida: <code>## Sarlavha</code>, <code>- ro‘yxat</code>, <code>**qalin**</code>, <code>[havola](url)</code>.</div>

      <form action={action} className="card">
        <div className="grid2">
          <div className="field"><label>Kategoriya</label>
            <select name="category" defaultValue={v('category') || 'GEO'}>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="field"><label>Holat</label>
            <select name="status" defaultValue={v('status') || 'draft'}>
              <option value="draft">Qoralama</option>
              <option value="published">Chop etish</option>
            </select>
          </div>
        </div>

        <div className="field"><label>Slug (URL) — bo‘sh qoldirsangiz avto</label>
          <input name="slug" defaultValue={v('slug')} placeholder="masalan: geo-nima-uchun-muhim" /></div>
        <div className="field"><label>Muqova rasm URL (ixtiyoriy)</label>
          <input name="cover_url" defaultValue={v('cover_url')} placeholder="https://..." /></div>

        <h3 style={{ fontFamily: 'var(--display)', margin: '20px 0 10px' }}>🇺🇿 O‘zbekcha</h3>
        <div className="field"><label>Sarlavha (UZ)</label><input name="title_uz" defaultValue={v('title_uz')} required /></div>
        <div className="field"><label>Qisqa tavsif (UZ)</label><textarea name="excerpt_uz" defaultValue={v('excerpt_uz')} style={{ minHeight: 70 }} /></div>
        <div className="field"><label>Matn — Markdown (UZ)</label><textarea name="body_uz" defaultValue={v('body_uz')} /></div>
        <div className="grid2">
          <div className="field"><label>SEO title (UZ)</label><input name="seo_title_uz" defaultValue={v('seo_title_uz')} /></div>
          <div className="field"><label>SEO description (UZ)</label><input name="seo_desc_uz" defaultValue={v('seo_desc_uz')} /></div>
        </div>

        <h3 style={{ fontFamily: 'var(--display)', margin: '20px 0 10px' }}>🇷🇺 Ruscha</h3>
        <div className="field"><label>Sarlavha (RU)</label><input name="title_ru" defaultValue={v('title_ru')} /></div>
        <div className="field"><label>Qisqa tavsif (RU)</label><textarea name="excerpt_ru" defaultValue={v('excerpt_ru')} style={{ minHeight: 70 }} /></div>
        <div className="field"><label>Matn — Markdown (RU)</label><textarea name="body_ru" defaultValue={v('body_ru')} /></div>
        <div className="grid2">
          <div className="field"><label>SEO title (RU)</label><input name="seo_title_ru" defaultValue={v('seo_title_ru')} /></div>
          <div className="field"><label>SEO description (RU)</label><input name="seo_desc_ru" defaultValue={v('seo_desc_ru')} /></div>
        </div>

        <div className="row" style={{ marginTop: 10 }}>
          <button type="submit" className="btn btn-fill">{post?.id ? 'Saqlash' : 'Yaratish'}</button>
          <Link href="/admin" className="btn btn-line">Bekor qilish</Link>
        </div>
      </form>
    </div>
  );
}
