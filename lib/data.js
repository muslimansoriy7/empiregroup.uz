import { createClient } from './supabase/server'

// ── LEADS ────────────────────────────────────────────────
export async function getLeads({ status, search, limit } = {}) {
  const sb = await createClient()
  let q = sb.from('leads').select('*').order('created_at', { ascending: false })
  if (status) q = q.eq('status', status)
  if (search) q = q.or(`name.ilike.%${search}%,phone.ilike.%${search}%,company.ilike.%${search}%`)
  if (limit) q = q.limit(limit)
  const { data } = await q
  return data || []
}

export async function getLeadById(id) {
  const sb = await createClient()
  const { data } = await sb.from('leads').select('*').eq('id', id).single()
  return data
}

export async function updateLead(id, updates) {
  const sb = await createClient()
  await sb.from('leads').update(updates).eq('id', id)
}

export async function updateLeadStatus(id, status) {
  const sb = await createClient()
  await sb.from('leads').update({ status }).eq('id', id)
}

export async function getLeadStats() {
  const sb = await createClient()
  const { data } = await sb.from('leads').select('status, deal_value')
  if (!data) return { total: 0, new: 0, in_progress: 0, done: 0, spam: 0, totalValue: 0 }
  return {
    total: data.length,
    new: data.filter(l => l.status === 'new').length,
    in_progress: data.filter(l => l.status === 'in_progress').length,
    done: data.filter(l => l.status === 'done').length,
    spam: data.filter(l => l.status === 'spam').length,
    totalValue: data.reduce((sum, l) => sum + (Number(l.deal_value) || 0), 0),
  }
}

// ── COMPANIES (ABM) ──────────────────────────────────────
export async function getCompanies({ status, search } = {}) {
  const sb = await createClient()
  let q = sb.from('companies').select('*').order('created_at', { ascending: false })
  if (status) q = q.eq('status', status)
  if (search) q = q.or(`name.ilike.%${search}%,industry.ilike.%${search}%`)
  const { data } = await q
  return data || []
}

export async function getCompanyById(id) {
  const sb = await createClient()
  const { data } = await sb.from('companies').select('*').eq('id', id).single()
  return data
}

export async function createCompany(payload) {
  const sb = await createClient()
  const { data, error } = await sb.from('companies').insert(payload).select().single()
  if (error) throw error
  return data
}

export async function updateCompany(id, updates) {
  const sb = await createClient()
  await sb.from('companies').update({ ...updates, updated_at: new Date().toISOString() }).eq('id', id)
}

export async function deleteCompany(id) {
  const sb = await createClient()
  await sb.from('companies').delete().eq('id', id)
}

// ── ACTIVITIES ───────────────────────────────────────────
export async function getActivities({ lead_id, company_id, limit = 50 } = {}) {
  const sb = await createClient()
  let q = sb.from('activities').select('*').order('created_at', { ascending: false }).limit(limit)
  if (lead_id) q = q.eq('lead_id', lead_id)
  if (company_id) q = q.eq('company_id', company_id)
  const { data } = await q
  return data || []
}

export async function addActivity({ lead_id, company_id, type = 'note', description }) {
  const sb = await createClient()
  const { data, error } = await sb.from('activities').insert({ lead_id, company_id, type, description }).select().single()
  if (error) throw error
  return data
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
