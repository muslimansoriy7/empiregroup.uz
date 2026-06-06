'use server'
import { createClient } from '../../../lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createCase(formData) {
  const sb = await createClient()
  const slug = formData.get('slug') || formData.get('client').toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
  const payload = {
    slug, client: formData.get('client'), industry: formData.get('industry'),
    service: formData.get('service'), duration: formData.get('duration'),
    status: formData.get('status') || 'draft',
    title_uz: formData.get('title_uz'), title_ru: formData.get('title_ru'),
    problem_uz: formData.get('problem_uz'), problem_ru: formData.get('problem_ru'),
    solution_uz: formData.get('solution_uz'), solution_ru: formData.get('solution_ru'),
    result_uz: formData.get('result_uz'), result_ru: formData.get('result_ru'),
    technologies: formData.get('technologies') ? formData.get('technologies').split(',').map(t => t.trim()) : [],
    published_at: formData.get('status') === 'published' ? new Date().toISOString() : null,
  }
  const { error } = await sb.from('cases').insert(payload)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/cases')
  redirect('/admin/cases')
}

export async function updateCase(id, formData) {
  const sb = await createClient()
  const payload = {
    client: formData.get('client'), industry: formData.get('industry'),
    service: formData.get('service'), duration: formData.get('duration'),
    status: formData.get('status') || 'draft',
    title_uz: formData.get('title_uz'), title_ru: formData.get('title_ru'),
    problem_uz: formData.get('problem_uz'), problem_ru: formData.get('problem_ru'),
    solution_uz: formData.get('solution_uz'), solution_ru: formData.get('solution_ru'),
    result_uz: formData.get('result_uz'), result_ru: formData.get('result_ru'),
    technologies: formData.get('technologies') ? formData.get('technologies').split(',').map(t => t.trim()) : [],
    updated_at: new Date().toISOString(),
    published_at: formData.get('status') === 'published' ? new Date().toISOString() : null,
  }
  await sb.from('cases').update(payload).eq('id', id)
  revalidatePath('/admin/cases')
  redirect('/admin/cases')
}
