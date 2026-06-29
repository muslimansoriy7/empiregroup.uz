import { createClient } from '@/lib/supabase/server';

async function safe(fn, fallback) {
  try { return await fn(); } catch { return fallback; }
}

export async function getPublishedPosts({ category } = {}) {
  return safe(async () => {
    const supabase = await createClient();
    let q = supabase.from('posts').select('*').eq('status', 'published').order('published_at', { ascending: false });
    if (category && category !== 'all') q = q.eq('category', category);
    const { data, error } = await q;
    if (error) return [];
    return data || [];
  }, []);
}

export async function getPostBySlug(slug) {
  return safe(async () => {
    const supabase = await createClient();
    const { data } = await supabase.from('posts').select('*').eq('slug', slug).eq('status', 'published').maybeSingle();
    return data || null;
  }, null);
}

export async function getAllSlugs() {
  return safe(async () => {
    const supabase = await createClient();
    const { data } = await supabase.from('posts').select('slug, updated_at').eq('status', 'published');
    return data || [];
  }, []);
}

export async function getAllPosts() {
  return safe(async () => {
    const supabase = await createClient();
    const { data } = await supabase.from('posts').select('*').order('updated_at', { ascending: false });
    return data || [];
  }, []);
}

export async function getPostById(id) {
  return safe(async () => {
    const supabase = await createClient();
    const { data } = await supabase.from('posts').select('*').eq('id', id).maybeSingle();
    return data || null;
  }, null);
}

export async function getAdjacentPosts(slug) {
  return safe(async () => {
    const supabase = await createClient();
    const { data: all } = await supabase
      .from('posts')
      .select('slug, title_uz, title_ru, category, published_at')
      .eq('status', 'published')
      .order('published_at', { ascending: false });
    if (!all) return { prev: null, next: null, related: [] };
    const idx = all.findIndex((p) => p.slug === slug);
    const current = all[idx];
    const prev = idx > 0 ? all[idx - 1] : null;
    const next = idx < all.length - 1 ? all[idx + 1] : null;
    const related = current
      ? all.filter((p) => p.slug !== slug && p.category === current.category).slice(0, 3)
      : [];
    return { prev, next, related };
  }, { prev: null, next: null, related: [] });
}

export function L(post, base, lang) {
  if (!post) return '';
  const ru = post[`${base}_ru`]; const uz = post[`${base}_uz`];
  if (lang === 'ru') return ru || uz || '';
  return uz || ru || '';
}
