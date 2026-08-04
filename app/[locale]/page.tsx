import { isLocale, defaultLocale } from "@/content";
import { localePath } from "@/lib/locale-path";
import { getPublishedPosts, L } from "@/lib/posts";
import { homeCopy, journalEn } from "@/content/home";
import { HomePage, type JournalPost } from "@/components/home/HomePage";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://empiregroup.uz";

/* Latest three articles on the homepage. The blog is written in uz and ru;
   an English visitor gets the gloss from content/home. */
const JOURNAL_COUNT = 3;

/**
 * Structured data for the homepage. The root layout already describes the
 * company, so this adds only what lives here — opening hours, the credential,
 * the services and the FAQ — hung off the organisation's @id rather than
 * declaring a second, competing entity for the same business.
 */
function buildSchema(locale: string) {
  const lang = isLocale(locale) ? locale : defaultLocale;
  const t = homeCopy[lang];
  const url = `${SITE}${localePath(lang, "/")}`;

  const profile = {
    "@type": ["Organization", "LocalBusiness"],
    "@id": `${SITE}#organisation`,
    priceRange: "$$$",
    currenciesAccepted: "USD, UZS",
    paymentAccepted: "Cash, Bank Transfer",
    geo: { "@type": "GeoCoordinates", latitude: 41.2995, longitude: 69.2401 },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
    ],
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

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const lang = isLocale(locale) ? locale : defaultLocale;

  // Uzbek and Russian are the languages the posts table actually carries; for
  // English the card headline comes from the gloss map in content/home.
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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildSchema(lang)).replace(/</g, "\\u003c"),
        }}
      />
      <HomePage journal={journal} blogHref={localePath(lang, "/blog")} />
    </>
  );
}
