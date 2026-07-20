import { createClient as createSupabaseClient } from '@supabase/supabase-js';

/**
 * Read-only client for content everyone is allowed to see.
 *
 * The cookie-backed server client exists to carry a user's session, and
 * touching cookies inside a page marks that route dynamic — which is why blog
 * articles were rendered per request and could never be cached. Published
 * posts, cases and FAQs belong to no one in particular, so they are read with
 * the anon key and no session at all, leaving the pages free to prerender.
 */
let client;

export function createPublicClient() {
  client ??= createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    { auth: { persistSession: false, autoRefreshToken: false } }
  );
  return client;
}
