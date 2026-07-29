import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { MobileDock } from "@/components/MobileDock";
import { TelegramFab } from "@/components/TelegramFab";
import { Hero } from "@/components/sections/Hero";
import { StatBand } from "@/components/sections/StatBand";
import { ProofBar } from "@/components/sections/ProofBar";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { Portfolio } from "@/components/sections/Portfolio";
import { Stack } from "@/components/sections/Stack";
import { Brands } from "@/components/sections/Brands";
import { WhyUs } from "@/components/sections/WhyUs";
import { Team } from "@/components/sections/Team";
import { Testimonials } from "@/components/sections/Testimonials";
import { Credentials } from "@/components/sections/Credentials";
import { Pricing } from "@/components/sections/Pricing";
import { Faq } from "@/components/sections/Faq";
import { CtaBand } from "@/components/sections/CtaBand";
import { dictionaries, isLocale, defaultLocale } from "@/content";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://empiregroup.uz";

const localBizSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": SITE,
  name: "Empire Group",
  description:
    "Biznes uchun mobil ilova, veb-sayt, AI avtomatlashtirish va Odoo ERP joriy etish.",
  url: SITE,
  telephone: "+998991164658",
  email: "muslimansoriy7@gmail.com",
  image: `${SITE}/og.png`,
  priceRange: "$$$",
  currenciesAccepted: "USD, UZS",
  paymentAccepted: "Cash, Bank Transfer",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Toshkent",
    addressCountry: "UZ",
  },
  geo: { "@type": "GeoCoordinates", latitude: 41.2995, longitude: 69.2401 },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
  ],
  sameAs: ["https://t.me/muslimansoriy", "https://instagram.com/empiregroup.uz"],
};

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const lang = isLocale(locale) ? locale : defaultLocale;
  const t = dictionaries[lang];

  // Built from the same dictionary the visible <Faq> renders, so the rich
  // result always matches on-page content (Google requires this) and stays in
  // the visitor's language — no hardcoded, drifting copy.
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: t.faq.items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c") }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBizSchema).replace(/</g, "\\u003c") }}
      />
      <Nav />
      <main>
        <Hero />
        <StatBand />
        <ProofBar />
        <Portfolio />
        <Services />
        <Stack />
        <Brands />
        <Process />
        <WhyUs />
        <Team />
        <Testimonials />
        <Credentials />
        <Pricing />
        <Faq />
        <CtaBand />
      </main>
      <Footer />
      <MobileDock />
      <TelegramFab />
    </>
  );
}
