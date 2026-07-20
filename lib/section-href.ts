"use client";

import { usePathname } from "next/navigation";
import { useI18n } from "@/lib/i18n";
import { localePath } from "@/lib/locale-path";

/**
 * Resolves the hrefs held in the content dictionaries against the current URL.
 *
 * Two things have to happen. Section links are written as bare fragments
 * (`#xizmatlar`) because the sections live on the homepage, so off the
 * homepage they need to point back at it. And every internal path needs the
 * locale prefix, since Russian and English are served under `/ru` and `/en`
 * while Uzbek stays bare.
 */
export function useSectionHref() {
  const pathname = usePathname();
  const { locale } = useI18n();

  const home = localePath(locale, "/"); // "/" for uz, "/ru", "/en"
  const onHome = pathname === home;

  return (href: string) => {
    if (href.startsWith("#")) {
      if (onHome) return href;
      return home === "/" ? `/${href}` : `${home}${href}`;
    }
    if (href.startsWith("/")) return localePath(locale, href);
    return href;
  };
}
