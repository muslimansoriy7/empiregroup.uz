"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Reveal } from "./Reveal";
import { useI18n } from "@/lib/i18n";

export type BlogCard = {
  id: string;
  slug: string;
  href: string;
  title: string;
  excerpt: string;
  category?: string | null;
  date: string;
  cover?: string | null;
};

/**
 * The article grid with a category filter.
 *
 * Filtering happens in the browser over the list the server already sent, so
 * the index stays a prerendered page — a `?category=` query string would have
 * forced it to render per request for no benefit at this catalogue size.
 */
export function BlogGrid({ posts }: { posts: BlogCard[] }) {
  const { t } = useI18n();
  const labels = t.blogIndex;
  const [active, setActive] = useState<string>("__all");

  const categories = useMemo(() => {
    const seen = new Map<string, number>();
    for (const p of posts) {
      if (!p.category) continue;
      seen.set(p.category, (seen.get(p.category) ?? 0) + 1);
    }
    return [...seen.entries()].sort((a, b) => b[1] - a[1]).map(([c]) => c);
  }, [posts]);

  const shown = active === "__all" ? posts : posts.filter((p) => p.category === active);

  return (
    <>
      {categories.length > 1 && (
        <div className="mb-8 flex flex-wrap gap-2">
          {[{ key: "__all", label: labels.allLabel }, ...categories.map((c) => ({ key: c, label: c }))].map(
            (c) => (
              <button
                key={c.key}
                type="button"
                onClick={() => setActive(c.key)}
                aria-pressed={active === c.key}
                className={`rounded-[var(--radius-pill)] border px-3.5 py-1.5 text-[13px] font-medium transition-colors ${
                  active === c.key
                    ? "border-ink bg-ink text-elevated"
                    : "border-hairline bg-elevated text-body hover:border-mute hover:text-ink"
                }`}
              >
                {c.label}
              </button>
            )
          )}
        </div>
      )}

      {shown.length === 0 ? (
        <p className="rounded-[var(--radius-card-lg)] border border-hairline bg-elevated px-6 py-12 text-center text-sm text-mute">
          {labels.emptyFiltered}
        </p>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((p, i) => (
            <Reveal key={p.id} delay={Math.min(i, 5) * 0.05} className="h-full">
              <Link
                href={p.href}
                className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-card-lg)] border border-hairline bg-elevated transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-float)]"
              >
                <div className="relative aspect-[16/9] overflow-hidden border-b border-hairline bg-hairline-soft">
                  {p.cover ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={p.cover}
                      alt={p.title}
                      className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="grid size-full place-items-center grid-lines">
                      <span className="font-mono text-2xl text-faint">EG</span>
                    </div>
                  )}
                </div>
                <div className="flex flex-1 flex-col gap-2.5 p-5">
                  {p.category && <span className="eyebrow">{p.category}</span>}
                  <h2 className="text-h3 font-semibold text-ink">{p.title}</h2>
                  <p className="flex-1 text-sm text-body">{p.excerpt}</p>
                  <div className="mt-2 flex items-center justify-between border-t border-hairline pt-3 text-xs">
                    <span className="font-mono text-faint">{p.date}</span>
                    <span className="font-medium text-ink transition-transform duration-300 group-hover:translate-x-0.5">
                      →
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      )}
    </>
  );
}
