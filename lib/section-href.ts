"use client";

import { usePathname } from "next/navigation";

/**
 * The nav/footer link tables use bare hash anchors (`#xizmatlar`) because the
 * sections they point at live on the homepage. On any other route (blog,
 * service landing pages, thank-you) a bare hash goes nowhere — so prefix it
 * with `/` to bounce back to the homepage section.
 */
export function useSectionHref() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  return (href: string) => (href.startsWith("#") && !onHome ? `/${href}` : href);
}
