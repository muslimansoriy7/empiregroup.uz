import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';
import { locales, defaultLocale } from '@/content';

/** Paths that are not part of the localised site tree. */
const RESERVED = ['/admin', '/api', '/_next', '/sitemap.xml', '/robots.txt', '/feed.xml', '/llms.txt', '/icon.svg'];

const isReserved = (path) =>
  RESERVED.some((p) => path === p || path.startsWith(`${p}/`));

/**
 * Locale routing.
 *
 * Uzbek is the default and stays unprefixed, so every URL Google has already
 * indexed keeps resolving unchanged — `/blog/geo-nima-uchun-muhim` is still
 * `/blog/geo-nima-uchun-muhim`. Internally it is rewritten to `/uz/...` so the
 * [locale] segment always has a value.
 *
 * `/ru/...` and `/en/...` pass straight through. `/uz/...` is redirected back
 * to the bare path so no page is ever reachable at two URLs.
 */
function localeRouting(request) {
  const { pathname } = request.nextUrl;

  // Articles used to switch language with `?lang=ru`. Anything already linking
  // that way lands on the real Russian URL instead of silently getting Uzbek.
  const legacyLang = request.nextUrl.searchParams.get('lang');
  if (legacyLang && locales.includes(legacyLang) && !pathname.startsWith(`/${legacyLang}`)) {
    const url = request.nextUrl.clone();
    url.searchParams.delete('lang');
    url.pathname =
      legacyLang === defaultLocale ? pathname : `/${legacyLang}${pathname}`;
    return NextResponse.redirect(url, 308);
  }

  // `/uz` and `/uz/...` are not public — collapse them onto the bare path.
  if (pathname === `/${defaultLocale}` || pathname.startsWith(`/${defaultLocale}/`)) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(defaultLocale.length + 1) || '/';
    return NextResponse.redirect(url, 308);
  }

  // Already carries a non-default locale — nothing to do.
  const prefixed = locales.some(
    (l) => l !== defaultLocale && (pathname === `/${l}` || pathname.startsWith(`/${l}/`))
  );
  if (prefixed) return null;

  // Bare path — serve it from the default locale tree without changing the URL.
  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname === '/' ? '' : pathname}`;
  return NextResponse.rewrite(url, { request });
}

export async function middleware(request) {
  const path = request.nextUrl.pathname;

  // Admin sits outside the localised tree and needs a Supabase session check.
  if (path.startsWith('/admin')) {
    let response = NextResponse.next({ request });

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
            response = NextResponse.next({ request });
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options)
            );
          },
        },
      }
    );

    const { data: { user } } = await supabase.auth.getUser();

    // Protect every /admin route except the login page
    if (!path.startsWith('/admin/login') && !user) {
      const url = request.nextUrl.clone();
      url.pathname = '/admin/login';
      return NextResponse.redirect(url);
    }
    // If logged in, keep them out of the login page
    if (path.startsWith('/admin/login') && user) {
      const url = request.nextUrl.clone();
      url.pathname = '/admin';
      return NextResponse.redirect(url);
    }

    return response;
  }

  if (isReserved(path)) return NextResponse.next();

  return localeRouting(request) ?? NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|txt|xml|webmanifest|vcf)$).*)',
  ],
};
