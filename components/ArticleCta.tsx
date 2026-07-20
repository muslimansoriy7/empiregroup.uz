"use client";

import { useI18n } from "@/lib/i18n";
import { useConsult } from "./ConsultModal";
import { Button } from "./Button";
import { ArrowRight } from "./Icons";

/**
 * Closes an article with the obvious next step.
 *
 * Someone who has just read a whole piece on ERP or SEO is the warmest
 * traffic the site gets, and until now the only thing waiting at the bottom
 * was a link back to the blog index.
 */
export function ArticleCta() {
  const { t } = useI18n();
  const { open } = useConsult();
  const c = t.blogCta;

  return (
    <aside className="relative mt-14 overflow-hidden rounded-[var(--radius-card-lg)] border border-hairline bg-elevated p-6 sm:p-8">
      <span
        aria-hidden
        className="pointer-events-none absolute -right-20 -top-20 size-64 rounded-full opacity-[0.13] blur-3xl"
        style={{ background: "linear-gradient(135deg,#007cf0,#00dfd8)" }}
      />
      <div className="relative">
        <h2 className="text-h3 font-semibold text-ink">{c.title}</h2>
        <p className="mt-2.5 max-w-xl text-[14.5px] leading-relaxed text-body">
          {c.body}
        </p>
        <Button onClick={open} variant="primary" size="lg" className="mt-6">
          {c.cta}
          <ArrowRight className="size-4" />
        </Button>
      </div>
    </aside>
  );
}
