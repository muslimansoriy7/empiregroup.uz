"use client";

import { Container } from "./Container";
import { Wordmark } from "./Wordmark";
import { useI18n } from "@/lib/i18n";
import { useSectionHref } from "@/lib/section-href";

export function Footer() {
  const { t } = useI18n();
  const sectionHref = useSectionHref();
  const footer = t.footer;

  return (
    <footer className="scroll-mt-10 border-t border-hairline bg-canvas pt-16 pb-28 md:pb-16">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
          {/* brand */}
          <div className="max-w-xs">
            <Wordmark height={30} />
            <p className="mt-4 text-sm text-mute">{footer.tagline}</p>
          </div>

          {/* link columns */}
          {footer.columns.map((col) => (
            <div key={col.title}>
              <div className="eyebrow mb-3">{col.title}</div>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={sectionHref(link.href)}
                      className="text-sm text-body transition-colors hover:text-ink"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-hairline pt-6 text-sm text-mute sm:flex-row sm:items-center sm:justify-between">
          <span>{footer.copyright}</span>
          <span>{footer.legal}</span>
        </div>
      </Container>
    </footer>
  );
}
