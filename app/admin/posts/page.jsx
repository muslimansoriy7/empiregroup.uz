import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { deletePost } from '@/app/admin/actions'

export const dynamic = 'force-dynamic'

async function getPosts() {
  const sb = await createClient()
  const { data } = await sb.from('posts').select('*').order('created_at', { ascending: false })
  return data || []
}

async function toggleStatus(formData) {
  'use server'
  const sb = await createClient()
  const id = formData.get('id')
  const current = formData.get('current')
  await sb.from('posts').update({ status: current === 'published' ? 'draft' : 'published' }).eq('id', id)
  revalidatePath('/admin/posts')
  revalidatePath('/blog')
}

function fmt(d) {
  if (!d) return ''
  try { return new Date(d).toLocaleDateString('uz-UZ', { day: 'numeric', month: 'short', year: 'numeric' }) } catch { return '' }
}

export default async function PostsPage() {
  const posts = await getPosts()
  const pub = posts.filter(p => p.status === 'published').length

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: 'var(--color-ink)' }}>📝 Blog Postlar</h1>
          <p style={{ fontSize: 13, color: 'var(--color-mute)', marginTop: 2 }}>{pub} nashr / {posts.length} jami</p>
        </div>
        <Link href="/admin/posts/new" style={{
          background: 'var(--color-link)', color: 'var(--color-ink)', padding: '9px 20px',
          borderRadius: 8, textDecoration: 'none', fontSize: 14, fontWeight: 600
        }}>+ Yangi post</Link>
      </div>

      {posts.length === 0 ? (
        <p style={{ color: 'var(--color-mute)', textAlign: 'center', padding: 40 }}>
          Hozircha post yo'q. <Link href="/admin/posts/new" style={{ color: 'var(--color-link)' }}>Birinchi maqolani yozing →</Link>
        </p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {posts.map(post => (
            <div key={post.id} style={{
              background: 'var(--color-hairline-soft)', border: '1px solid var(--color-hairline)', borderRadius: 10, padding: '14px 18px',
              display: 'grid', gridTemplateColumns: '1fr auto', gap: 14, alignItems: 'center'
            }}>
              <div>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 4 }}>
                  <strong style={{ fontSize: 15, color: 'var(--color-ink)' }}>{post.title_uz || post.title_ru || 'Nomsiz'}</strong>
                  <span style={{
                    fontSize: 11, padding: '2px 9px', borderRadius: 12, fontWeight: 600,
                    background: post.status === 'published' ? 'rgba(22,163,106,.15)' : 'var(--color-hairline-soft)',
                    color: post.status === 'published' ? '#15803d' : 'var(--color-mute)'
                  }}>{post.status === 'published' ? 'Nashr' : 'Draft'}</span>
                  {post.category && <span style={{ fontSize: 12, color: 'var(--color-mute)' }}>{post.category}</span>}
                </div>
                <div style={{ display: 'flex', gap: 14, fontSize: 13, color: 'var(--color-mute)' }}>
                  <span>/{post.slug}</span>
                  <span>{fmt(post.published_at || post.created_at)}</span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <form action={toggleStatus}>
                  <input type="hidden" name="id" value={post.id} />
                  <input type="hidden" name="current" value={post.status} />
                  <button type="submit" style={{ padding: '6px 12px', borderRadius: 6, border: '1px solid var(--color-hairline)', background: 'var(--color-hairline-soft)', fontSize: 12, cursor: 'pointer', color: 'var(--color-ink)' }}>
                    {post.status === 'published' ? 'Draft' : 'Nashr'}
                  </button>
                </form>
                <Link href={`/admin/posts/${post.id}/edit`} style={{
                  padding: '6px 12px', borderRadius: 6, border: '1px solid var(--color-link)',
                  color: 'var(--color-link)', fontSize: 12, textDecoration: 'none', display: 'flex', alignItems: 'center'
                }}>✏️ Tahrir</Link>
                <form action={deletePost}>
                  <input type="hidden" name="id" value={post.id} />
                  <button type="submit" style={{ padding: '6px 10px', borderRadius: 6, border: '1px solid rgba(220,38,38,.3)', background: 'rgba(220,38,38,.08)', color: '#ef6b5a', fontSize: 12, cursor: 'pointer' }}>
                    🗑
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
