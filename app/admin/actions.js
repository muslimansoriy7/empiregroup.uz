'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

function slugify(s) {
  return (s || '')
    .toString()
    .toLowerCase()
    .replace(/['‘’"]/g, '')
    .replace(/[^a-z0-9\u0400-\u04ff]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

function parse(formData) {
  const get = (k) => (formData.get(k) || '').toString().trim();
  let slug = get('slug');
  if (!slug) slug = slugify(get('title_uz') || get('title_ru'));
  return {
    slug,
    category: get('category') || 'GEO',
    cover_url: get('cover_url') || null,
    status: get('status') === 'published' ? 'published' : 'draft',
    title_uz: get('title_uz'),
    title_ru: get('title_ru'),
    excerpt_uz: get('excerpt_uz'),
    excerpt_ru: get('excerpt_ru'),
    body_uz: get('body_uz'),
    body_ru: get('body_ru'),
    seo_title_uz: get('seo_title_uz'),
    seo_title_ru: get('seo_title_ru'),
    seo_desc_uz: get('seo_desc_uz'),
    seo_desc_ru: get('seo_desc_ru'),
  };
}

export async function createPost(formData) {
  const supabase = createClient();
  const row = parse(formData);
  const { error } = await supabase.from('posts').insert(row);
  if (error) return redirect('/admin/posts/new?error=' + encodeURIComponent(error.message));
  revalidatePath('/blog');
  revalidatePath('/');
  redirect('/admin');
}

export async function updatePost(id, formData) {
  const supabase = createClient();
  const row = parse(formData);
  const { error } = await supabase.from('posts').update(row).eq('id', id);
  if (error) return redirect(`/admin/posts/${id}/edit?error=` + encodeURIComponent(error.message));
  revalidatePath('/blog');
  revalidatePath(`/blog/${row.slug}`);
  revalidatePath('/');
  redirect('/admin');
}

export async function deletePost(formData) {
  const id = (formData.get('id') || '').toString();
  const supabase = createClient();
  await supabase.from('posts').delete().eq('id', id);
  revalidatePath('/blog');
  revalidatePath('/admin');
  redirect('/admin');
}

export async function signOut() {
  const supabase = createClient();
  await supabase.auth.signOut();
  redirect('/admin/login');
}
