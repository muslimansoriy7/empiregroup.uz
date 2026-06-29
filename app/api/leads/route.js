import { NextResponse } from 'next/server';
import { z } from 'zod/v4';
import { createClient } from '@/lib/supabase/server';
import { ratelimit } from '@/lib/ratelimit';
import { sendTelegram } from '@/lib/telegram';

const LeadSchema = z.object({
  name: z.string().trim().min(2).max(100),
  phone: z.string().trim().min(7).max(25),
  email: z.string().email().max(200).optional().or(z.literal('')),
  service: z.string().trim().max(100).optional(),
  budget: z.string().trim().max(60).optional(),
  message: z.string().trim().max(2000).optional(),
  source_page: z.string().max(500).optional(),
  geo_city: z.string().trim().max(60).optional(),
  utm_source: z.string().trim().max(100).optional(),
  utm_medium: z.string().trim().max(100).optional(),
  utm_campaign: z.string().trim().max(150).optional(),
  company_website: z.string().max(0).optional(),
});

export async function POST(req) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  const { success: allowed } = ratelimit(ip);
  if (!allowed) {
    return NextResponse.json({ success: false, error: 'rate_limited' }, { status: 429 });
  }

  const json = await req.json().catch(() => null);
  const parsed = LeadSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ success: false, error: 'invalid_input' }, { status: 400 });
  }

  const data = parsed.data;

  if (data.company_website) {
    return NextResponse.json({ success: true });
  }

  const supabase = createClient();
  const { data: lead, error } = await supabase.from('leads').insert({
    name: data.name,
    phone: data.phone,
    email: data.email || null,
    service: data.service || null,
    budget: data.budget || null,
    message: data.message || null,
    source_page: data.source_page || null,
    geo_city: data.geo_city || null,
    utm_source: data.utm_source || null,
    utm_medium: data.utm_medium || null,
    utm_campaign: data.utm_campaign || null,
    status: 'new',
  }).select().single();

  if (error) {
    console.error('lead_insert_failed', error);
    return NextResponse.json({ success: false, error: 'server_error' }, { status: 500 });
  }

  try {
    await sendTelegram(lead);
  } catch (e) {
    console.error('telegram_dispatch_failed', e);
  }

  return NextResponse.json({ success: true, leadId: lead.id });
}
