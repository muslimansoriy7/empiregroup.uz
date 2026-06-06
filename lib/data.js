import { createClient } from './supabase/server'

// ── LEADS ────────────────────────────────────────────────
export async function getLeads({ status } = {}) {
  const sb = await createClient()
  let q = sb.from('leads').select('*').order('created_at', { ascending: false })
  if (status) q = q.eq('status', status)
  const { data } = await q
  return data || []
}

export async function updateLeadStatus(id, status) {
  const sb = await createClient()
  await sb.from('leads').update({ status }).eq('id', id)
}

// ── CASES ────────────────────────────────────────────────
export async function getCases({ status } = {}) {
  const sb = await createClient()
  let q = sb.from('cases').select('*').order('created_at', { ascending: false })
  if (status) q = q.eq('status', status)
  const { data } = await q
  return data || []
}

export async function getCaseById(id) {
  const sb = await createClient()
  const { data } = await sb.from('cases').select('*').eq('id', id).single()
  return data
}

export async function getCaseBySlug(slug) {
  const sb = await createClient()
  const { data } = await sb.from('cases').select('*').eq('slug', slug).eq('status','published').single()
  return data
}

// ── TESTIMONIALS ─────────────────────────────────────────
export async function getTestimonials({ status } = {}) {
  const sb = await createClient()
  let q = sb.from('testimonials').select('*').order('sort_order').order('created_at', { ascending: false })
  if (status) q = q.eq('status', status)
  const { data } = await q
  return data || []
}

// ── FAQS ─────────────────────────────────────────────────
export async function getFaqs({ category, status = 'published' } = {}) {
  const sb = await createClient()
  let q = sb.from('faqs').select('*').order('sort_order').order('created_at')
  if (status) q = q.eq('status', status)
  if (category) q = q.eq('category', category)
  const { data } = await q
  return data || []
}

// ── GLOSSARY ─────────────────────────────────────────────
export async function getGlossary() {
  const sb = await createClient()
  const { data } = await sb.from('glossary').select('*')
    .eq('status','published').order('sort_order')
  return data || []
}
