import { NextResponse } from 'next/server';
import { z } from 'zod/v4';
import { createAdminClient } from '@/lib/supabase/admin';
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
  // Honeypot. Deliberately permissive: rejecting a filled value here would
  // hand the bot a 400 and an invitation to retry. It is accepted, then
  // dropped below with a success response, so the bot believes it is done.
  company_website: z.string().max(300).optional(),
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

  // Only a bot fills the honeypot — a real visitor never sees the field.
  // Answer as if it worked and write nothing.
  if (data.company_website) {
    return NextResponse.json({ success: true });
  }

  // Visitors are anonymous, and `leads` is RLS-protected — the anon key cannot
  // insert. This route is the only writer, and it validates + rate-limits its
  // input above, so it writes with the service role instead.
  const supabase = createAdminClient();
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
