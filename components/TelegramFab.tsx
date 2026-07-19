"use client";

import { Telegram } from "./Icons";
import { useI18n } from "@/lib/i18n";

/**
 * Floating Telegram button — desktop only (mobile already has the bottom dock).
 * Gently floats with a soft sonar pulse; opens the founder's Telegram.
 */
export function TelegramFab() {
  const { t } = useI18n();

  return (
    <a
      href="https://t.me/muslimansoriy"
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.consult.telegramCta}
      className="tg-fab group fixed bottom-6 right-6 z-40 hidden size-14 place-items-center rounded-full bg-ink text-elevated shadow-[var(--shadow-float)] transition-transform duration-300 hover:scale-105 md:grid"
    >
      {/* sonar pulse */}
      <span
        aria-hidden
        className="tg-fab-ring pointer-events-none absolute inset-0 rounded-full border-2 border-ink"
      />
      <Telegram className="relative size-6 translate-x-[-1px]" />

      {/* hover label */}
      <span className="pointer-events-none absolute right-[calc(100%+14px)] whitespace-nowrap rounded-full bg-ink px-3.5 py-2 text-[13px] font-medium text-elevated opacity-0 shadow-[var(--shadow-whisper)] transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100 translate-x-1">
        {t.consult.telegramCta}
      </span>
    </a>
  );
}
