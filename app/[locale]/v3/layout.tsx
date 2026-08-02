import type { Metadata } from "next";
import { dictionaries, isLocale } from "@/content";

/**
 * `/v3` is a design study that carries the same copy as the homepage, so it is
 * kept out of the index — two indexed pages saying the same thing in Uzbek is
 * duplicate content, and Google would have to pick a winner on its own.
 * Delete `robots` here the day this route becomes the live homepage.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = isLocale(locale) ? dictionaries[locale] : dictionaries.uz;

  return {
    title: { absolute: t.meta.title },
    description: t.meta.description,
    robots: { index: false, follow: false },
    alternates: { canonical: "/" },
  };
}

export default function V3Layout({ children }: { children: React.ReactNode }) {
  return children;
}
