import { ru } from "./ru";
import { uz } from "./uz";
import { en } from "./en";
import type { Dict } from "./types";

export const locales = ["ru", "uz", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "uz";

export const dictionaries: Record<Locale, Dict> = { ru, uz, en };

export const localeNames: Record<Locale, string> = {
  ru: "Русский",
  uz: "O'zbekcha",
  en: "English",
};

export const localeShort: Record<Locale, string> = {
  ru: "RU",
  uz: "UZ",
  en: "EN",
};

export function isLocale(value: string | undefined): value is Locale {
  return !!value && (locales as readonly string[]).includes(value);
}

export type { Dict };
