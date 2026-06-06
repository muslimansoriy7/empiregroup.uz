'use server';

import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

export async function signIn(formData) {
  const email = (formData.get('email') || '').toString().trim();
  const password = (formData.get('password') || '').toString();
  const supabase = createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    redirect('/admin/login?error=' + encodeURIComponent('Login yoki parol noto‘g‘ri'));
  }
  redirect('/admin');
}
