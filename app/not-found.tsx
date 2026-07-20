import Link from "next/link";
import { Container } from "@/components/Container";
import { Wordmark } from "@/components/Wordmark";

// Root-level twin of app/[locale]/not-found.tsx, for URLs that never reach
// the locale segment at all (a bad path under /api, a stray asset route).

/**
 * A wrong URL used to land on Next's bare default page — no logo, no way
 * back. This keeps the visitor on the site.
 *
 * It sits outside the locale dictionaries on purpose: `notFound()` can fire
 * before a valid locale is known (that is exactly what an unknown language
 * prefix does), so the copy carries all three languages rather than picking
 * one it cannot be sure of.
 */
export default function NotFound() {
  const links = [
    { href: "/", label: "Bosh sahifa · Главная · Home" },
    { href: "/narxlar", label: "Narxlar · Цены · Pricing" },
    { href: "/blog", label: "Blog · Блог" },
  ];

  return (
    <main className="relative flex min-h-[100dvh] flex-col">
      <div
        className="pointer-events-none absolute inset-0 grid-lines opacity-50"
        aria-hidden
      />
      <Container className="relative flex flex-1 flex-col items-center justify-center py-20 text-center">
        <Link href="/" aria-label="Empire Group">
          <Wordmark height={26} />
        </Link>

        <p className="eyebrow mt-12">404</p>
        <h1 className="mt-3 max-w-xl text-h2 font-semibold">
          Bu sahifa topilmadi
        </h1>
        <p className="mt-4 max-w-md text-lead text-body">
          Страница не найдена · This page could not be found.
        </p>

        <nav className="mt-9 flex flex-wrap items-center justify-center gap-2.5">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-[var(--radius-pill)] border border-hairline bg-elevated px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:border-mute"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <a
          href="tel:+998991164658"
          className="mt-10 font-mono text-[13px] text-mute transition-colors hover:text-ink"
        >
          +998 99 116 46 58
        </a>
      </Container>
    </main>
  );
}
