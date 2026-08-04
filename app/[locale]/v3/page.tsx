import { isLocale, defaultLocale } from "@/content";
import { localePath } from "@/lib/locale-path";
import { getPublishedPosts, L } from "@/lib/posts";
import { v3Copy } from "@/content/v3";
import { V3Page, type JournalPost } from "./V3Page";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://empiregroup.uz";

/* Latest three articles on the homepage. The blog is written in uz and ru;
   an English visitor gets the Uzbek title rather than an empty card. */
const JOURNAL_COUNT = 3;

/**
 * Structured data for this page. The root layout already describes the
 * company, so this adds only what lives here — the credential, the services
 * and the FAQ — hung off the organisation's @id rather than declaring a
 * second, competing entity for the same business.
 */
function buildSchema(locale: string) {
  const lang = isLocale(locale) ? locale : defaultLocale;
  const t = v3Copy[lang];
  const url = `${SITE}${localePath(lang, "/")}`;

  const profile = {
    "@type": "Organization",
    "@id": `${SITE}#organisation`,
    knowsAbout: [
      "Odoo ERP",
      "Business process automation",
      "AI automation",
      "Custom software development",
      "CRM",
    ],
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      name: "Odoo Learning Partner",
      credentialCategory: "Partnership",
      recognizedBy: { "@type": "Organization", name: "Odoo S.A." },
    },
    makesOffer: t.services.items.map((s) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: s.title, description: s.desc },
    })),
  };

  const faq = {
    "@type": "FAQPage",
    "@id": `${url}#faq`,
    inLanguage: lang,
    mainEntity: t.faq.items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return { "@context": "https://schema.org", "@graph": [profile, faq] };
}

export default async function V3Route({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const lang = isLocale(locale) ? locale : defaultLocale;

  // Uzbek and Russian are the languages the posts table actually carries.
  const postLang = lang === "en" ? "uz" : lang;
  const posts = await getPublishedPosts();
  const journal: JournalPost[] = posts.slice(0, JOURNAL_COUNT).map((p) => ({
    slug: p.slug,
    href: localePath(lang, `/blog/${p.slug}`),
    title: L(p, "title", postLang),
    excerpt: L(p, "excerpt", postLang),
    category: p.category || null,
    date: p.published_at
      ? new Intl.DateTimeFormat(lang === "uz" ? "uz-UZ" : lang, {
          day: "numeric",
          month: "short",
          year: "numeric",
        }).format(new Date(p.published_at))
      : null,
    cover: p.cover_url || null,
  }));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildSchema(lang)) }}
      />
      <V3Page journal={journal} blogHref={localePath(lang, "/blog")} />
    </>
  );
}
