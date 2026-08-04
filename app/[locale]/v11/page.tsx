import { isLocale, defaultLocale } from "@/content";
import { localePath } from "@/lib/locale-path";
import { getPublishedPosts, L } from "@/lib/posts";
import { journalEn } from "@/content/home";
import { HomeNext } from "@/components/home/HomeNext";
import type { JournalPost } from "@/components/home/HomePage";

const JOURNAL_COUNT = 3;

/**
 * Second-pass homepage, kept on its own route while it is reviewed. Same copy
 * and same data as `/` — only the composition differs, so the two can be
 * compared side by side without touching the live page.
 */
export default async function NextHome({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const lang = isLocale(locale) ? locale : defaultLocale;

  const postLang = lang === "en" ? "uz" : lang;
  const posts = await getPublishedPosts();
  const journal: JournalPost[] = posts.slice(0, JOURNAL_COUNT).map((p) => {
    const gloss = lang === "en" ? journalEn[p.slug] : undefined;
    return {
      slug: p.slug,
      href: localePath(lang, `/blog/${p.slug}`),
      title: gloss?.title ?? L(p, "title", postLang),
      excerpt: lang === "en" ? gloss?.excerpt ?? "" : L(p, "excerpt", postLang),
      category: p.category || null,
      date: p.published_at
        ? new Intl.DateTimeFormat(lang === "uz" ? "uz-UZ" : lang, {
            day: "numeric",
            month: "short",
            year: "numeric",
          }).format(new Date(p.published_at))
        : null,
      cover: p.cover_url || null,
    };
  });

  return <HomeNext journal={journal} blogHref={localePath(lang, "/blog")} />;
}
