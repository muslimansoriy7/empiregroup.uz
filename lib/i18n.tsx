"use client";

import { createContext, useContext, useEffect } from "react";
import { dictionaries, defaultLocale, type Dict, type Locale } from "@/content";

type I18nValue = {
  locale: Locale;
  t: Dict;
};

const I18nContext = createContext<I18nValue | null>(null);

/**
 * The locale is decided by the URL and handed down by app/[locale]/layout.tsx,
 * so there is nothing to switch at runtime — changing language is a navigation.
 * This carries the dictionary down the tree and keeps `<html lang>` honest,
 * since the root layout renders before the locale segment is known.
 */
export function I18nProvider({
  initialLocale = defaultLocale,
  children,
}: {
  initialLocale?: Locale;
  children: React.ReactNode;
}) {
  useEffect(() => {
    document.documentElement.lang = initialLocale;
  }, [initialLocale]);

  return (
    <I18nContext.Provider
      value={{ locale: initialLocale, t: dictionaries[initialLocale] }}
    >
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within <I18nProvider>");
  return ctx;
}
