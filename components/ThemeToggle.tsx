"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { Sun, Moon } from "./Icons";

type Theme = "light" | "dark";

/**
 * Header light/dark switch. The active theme lives on <html data-theme> — set
 * before paint by the boot script in layout.tsx — so this button only reads
 * that attribute on mount, then flips it and persists the choice. It shows the
 * icon of the theme you'd switch TO (sun in dark mode, moon in light mode).
 */
export function ThemeToggle({ className }: { className?: string }) {
  // null until mounted so SSR and the first client render agree (the real
  // value comes from the DOM attribute the boot script already applied).
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const current = document.documentElement.getAttribute("data-theme");
    setTheme(current === "light" ? "light" : "dark");
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* private mode / storage disabled — the toggle still works this session */
    }
    setTheme(next);
  };

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Yorug' rejimga o'tish" : "Qorong'i rejimga o'tish"}
      title={isDark ? "Yorug' rejim" : "Qorong'i rejim"}
      className={cn(
        "grid size-9 place-items-center rounded-[var(--radius-btn)] border border-hairline bg-elevated text-body transition-colors hover:text-ink",
        className
      )}
    >
      {/* Before mount `theme` is null — render nothing so no wrong icon flashes;
          the box keeps its size so the header doesn't shift. */}
      {theme === null ? null : isDark ? (
        <Sun className="size-[18px]" />
      ) : (
        <Moon className="size-[18px]" />
      )}
    </button>
  );
}
