"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useI18n } from "@/lib/i18n";
import { locales, localeNames, localeShort } from "@/content";
import { localePath, stripLocale } from "@/lib/locale-path";
import { Globe, ChevronDown, Check } from "./Icons";
import { cn } from "@/lib/cn";

export function LangSwitcher({
  className,
  align = "right",
  up = false,
}: {
  className?: string;
  /** which edge the dropdown aligns to (default "right" for the header) */
  align?: "left" | "right";
  /** open upward instead of downward (used in the mobile menu) */
  up?: boolean;
}) {
  const { locale } = useI18n();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Each language is a real URL, so switching is a navigation, not a state
  // flip — the same page in the chosen language, indexable and shareable.
  const bare = stripLocale(pathname || "/");

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Til / Language"
        className="flex h-9 items-center gap-1.5 rounded-[var(--radius-btn)] border border-hairline bg-elevated px-2.5 text-sm font-medium text-ink transition-colors hover:border-ink/30"
      >
        <Globe className="size-[18px] text-mute" />
        <span className="tabular-nums">{localeShort[locale]}</span>
        <ChevronDown
          className={cn(
            "size-3.5 text-faint transition-transform",
            open && "rotate-180"
          )}
        />
      </button>

      {open && (
        <div
          role="menu"
          className={cn(
            "absolute z-50 w-44 overflow-hidden rounded-[var(--radius-card)] border border-hairline bg-elevated p-1 shadow-[var(--shadow-float)]",
            align === "right" ? "right-0" : "left-0",
            up ? "bottom-[calc(100%+8px)]" : "top-[calc(100%+8px)]"
          )}
        >
          {locales.map((l) => (
            <Link
              key={l}
              href={localePath(l, bare)}
              hrefLang={l}
              role="menuitemradio"
              aria-checked={l === locale}
              onClick={() => setOpen(false)}
              className={cn(
                "flex w-full items-center justify-between rounded-[var(--radius-btn)] px-2.5 py-2 text-sm transition-colors",
                l === locale
                  ? "bg-canvas font-medium text-ink"
                  : "text-body hover:bg-canvas hover:text-ink"
              )}
            >
              <span className="flex items-center gap-2">
                <span className="font-mono text-[11px] text-faint">
                  {localeShort[l]}
                </span>
                {localeNames[l]}
              </span>
              {l === locale && <Check className="size-4 text-ink" />}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
