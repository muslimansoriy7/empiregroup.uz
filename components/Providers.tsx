"use client";

import { I18nProvider } from "@/lib/i18n";
import { ConsultProvider } from "@/components/ConsultModal";
import { SmoothScroll } from "@/components/SmoothScroll";
import type { Locale } from "@/content";

export function Providers({
  initialLocale,
  children,
}: {
  initialLocale: Locale;
  children: React.ReactNode;
}) {
  return (
    <I18nProvider initialLocale={initialLocale}>
      <ConsultProvider>
        <SmoothScroll />
        {children}
      </ConsultProvider>
    </I18nProvider>
  );
}
