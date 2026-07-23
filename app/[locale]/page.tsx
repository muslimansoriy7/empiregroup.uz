import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { MobileDock } from "@/components/MobileDock";
import { TelegramFab } from "@/components/TelegramFab";
import { Hero } from "@/components/sections/Hero";
import { Showcase } from "@/components/sections/Showcase";
import { ProofBar } from "@/components/sections/ProofBar";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { Stack } from "@/components/sections/Stack";
import { Portfolio } from "@/components/sections/Portfolio";
import { Credentials } from "@/components/sections/Credentials";
import { WhyUs } from "@/components/sections/WhyUs";
import { Testimonials } from "@/components/sections/Testimonials";
import { Brands } from "@/components/sections/Brands";
import { Faq } from "@/components/sections/Faq";
import { CtaBand } from "@/components/sections/CtaBand";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://empiregroup.uz";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Loyiha qancha vaqt oladi?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ko'lamiga qarab odatda 2–12 oy. MVP (boshlang'ich versiya) 2–3 oyda tayyor bo'ladi.",
      },
    },
    {
      "@type": "Question",
      name: "Narx qanday hisoblanadi?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Biz fixed-scope tizimida ishlaymiz — soatbay emas. Loyiha boshida aniq narx belgilanadi. Yashirin to'lovlar yo'q.",
      },
    },
    {
      "@type": "Question",
      name: "Minimal byudjet qancha?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Standart paketlar $7,500 dan boshlanadi.",
      },
    },
    {
      "@type": "Question",
      name: "To'lov qanday amalga oshiriladi?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "To'lov bosqichma-bosqich: boshlang'ich avans, so'ngra har bosqich yakunida belgilangan ulushlar.",
      },
    },
    {
      "@type": "Question",
      name: "Kod va mahsulot kimga tegishli bo'ladi?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Loyiha yakunida barcha kod, dizayn va intellektual mulk to'liq sizga o'tadi.",
      },
    },
    {
      "@type": "Question",
      name: "Ishga tushgandan keyin yordam beriladimi?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ha. Har paketda 4 hafta bepul qo'llab-quvvatlash bor.",
      },
    },
  ],
};

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
  sameAs: ["https://t.me/empiregroup_uz", "https://instagram.com/empiregroup.uz"],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBizSchema) }}
      />
      <Nav />
      <main>
        <Hero />
        <Showcase />
        <ProofBar />
        <Services />
        <Process />
        <Stack />
        <Portfolio />
        <WhyUs />
        <Testimonials />
        <Brands />
        <Credentials />
        <Faq />
        <CtaBand />
      </main>
      <Footer />
      <MobileDock />
      <TelegramFab />
    </>
  );
}
