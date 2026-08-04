"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { useSectionHref } from "@/lib/section-href";
import { useI18n } from "@/lib/i18n";
import { useConsult } from "./ConsultModal";
import { Button } from "./Button";
import { Wordmark } from "./Wordmark";
import { LangSwitcher } from "./LangSwitcher";
import { ThemeToggle } from "./ThemeToggle";
import { Menu, Close, Phone } from "./Icons";

export function Nav() {
  const { t } = useI18n();
  const { open: openConsult } = useConsult();
  const sectionHref = useSectionHref();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 transition-colors duration-300",
          scrolled || open
            ? "border-b border-hairline bg-canvas/80 backdrop-blur-md"
            : "border-b border-transparent bg-canvas/0"
        )}
      >
        <div className="mx-auto flex h-16 w-full max-w-[var(--container-page)] items-center justify-between px-5 sm:px-6 lg:px-8">
        <Wordmark />

        {/* center links */}
        <nav className="hidden items-center gap-1 md:flex">
          {t.nav.links.map((l) => (
            <a
              key={l.href + l.label}
              href={sectionHref(l.href)}
              className="rounded-full px-3 py-1.5 text-sm text-body transition-colors hover:text-ink"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* desktop actions */}
        <div className="hidden items-center gap-2 md:flex">
          {/* Some visitors want to call, not fill a form — give them the number
              rather than making them hunt for it in the footer. */}
          <a
            href={t.nav.phone.href}
            className="mr-1 hidden items-center gap-1.5 text-sm font-medium text-body transition-colors hover:text-ink lg:inline-flex"
          >
            <Phone className="size-4 text-mute" />
            {t.nav.phone.label}
          </a>
          <ThemeToggle />
          <LangSwitcher />
          <Button onClick={openConsult} variant="nav" size="sm">
            {t.nav.cta.label}
          </Button>
        </div>

        {/* mobile actions */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <LangSwitcher />
          <button
            className="grid size-11 place-items-center rounded-full border border-hairline bg-elevated text-ink"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <Close /> : <Menu />}
          </button>
        </div>
        </div>
      </header>

      {/* mobile menu — rendered OUTSIDE the header so the header's
          backdrop-filter cannot trap its fixed positioning (that was the bug:
          a filtered ancestor makes `position: fixed` relative to the header,
          not the viewport). Now it reliably covers the whole screen. */}
      {open && (
        <div
          data-lenis-prevent
          className="fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto overscroll-contain bg-canvas/95 backdrop-blur-2xl md:hidden"
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
        >
          <div className="mx-auto flex w-full max-w-[var(--container-page)] flex-col gap-1 px-5 pb-8 pt-4">
            {t.nav.links.map((l) => (
              <a
                key={l.href + l.label}
                href={sectionHref(l.href)}
                onClick={() => setOpen(false)}
                className="rounded-[var(--radius-btn)] px-3 py-3 text-[17px] font-medium text-ink transition-colors hover:bg-elevated"
              >
                {l.label}
              </a>
            ))}
            <a
              href={t.nav.phone.href}
              onClick={() => setOpen(false)}
              className="mt-4 inline-flex h-12 w-full items-center justify-center gap-2 rounded-[var(--radius-btn)] border border-hairline bg-elevated text-[15px] font-medium text-ink"
            >
              <Phone className="size-4 text-mute" />
              {t.nav.phone.label}
            </a>
            <Button
              variant="primary"
              size="lg"
              className="mt-2 w-full"
              onClick={() => {
                setOpen(false);
                openConsult();
              }}
            >
              {t.nav.cta.label}
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
