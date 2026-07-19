"use client";

import { createContext, useCallback, useContext, useState } from "react";
import {
  dictionaries,
  defaultLocale,
  type Dict,
  type Locale,
} from "@/content";

type I18nValue = {
  locale: Locale;
  t: Dict;
  setLocale: (l: Locale) => void;
};

const I18nContext = createContext<I18nValue | null>(null);

export function I18nProvider({
  initialLocale = defaultLocale,
  children,
}: {
  initialLocale?: Locale;
  children: React.ReactNode;
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    document.cookie = `locale=${l}; path=/; max-age=31536000; samesite=lax`;
    document.documentElement.lang = l;
  }, []);

  return (
    <I18nContext.Provider value={{ locale, t: dictionaries[locale], setLocale }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within <I18nProvider>");
  return ctx;
}
