import { defaultLocale, locales, type Locale } from "@/content";

/**
 * Uzbek is served unprefixed — the URLs Google already indexed (`/blog/...`,
 * `/xizmatlar/...`) must keep working exactly as they are. Russian and English
 * live under `/ru` and `/en`.
 */
export function localePath(locale: Locale, path: string): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (locale === defaultLocale) return clean;
  return clean === "/" ? `/${locale}` : `/${locale}${clean}`;
}

/**
 * Every public URL for one page, keyed by locale — feeds hreflang.
 *
 * `only` narrows the list to the languages a page actually exists in. Blog
 * posts carry Uzbek and Russian columns and nothing else, so claiming an
 * English alternate would point Google at a page showing Uzbek text.
 */
export function localeAlternates(
  path: string,
  only: readonly Locale[] = locales
): Record<string, string> {
  return Object.fromEntries(
    only.map((l) => [l, localePath(l, path)])
  ) as Record<string, string>;
}

/** Languages the blog is actually written in — the `posts` table has uz + ru. */
export const postLocales: readonly Locale[] = ["uz", "ru"];

/**
 * Where a page should point its canonical. A locale with no translation of
 * its own must defer to the default one rather than claim to be a separate
 * document.
 */
export function canonicalFor(
  locale: Locale,
  path: string,
  available: readonly Locale[] = locales
): string {
  return localePath(available.includes(locale) ? locale : defaultLocale, path);
}

/** Strips a leading `/ru` or `/en` back off, giving the canonical uz path. */
export function stripLocale(pathname: string): string {
  for (const l of locales) {
    if (l === defaultLocale) continue;
    if (pathname === `/${l}`) return "/";
    if (pathname.startsWith(`/${l}/`)) return pathname.slice(l.length + 1);
  }
  return pathname;
}
