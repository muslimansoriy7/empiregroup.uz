import Navbar from '@/components/home/Navbar';
import Hero from '@/components/home/Hero';
import ClientLogos from '@/components/home/ClientLogos';
import Services from '@/components/home/Services';
import Process from '@/components/home/Process';
import Projects from '@/components/home/Projects';
import WhyUs from '@/components/home/WhyUs';
import Testimonials from '@/components/home/Testimonials';
import FAQ from '@/components/home/FAQ';
import ContactForm from '@/components/home/ContactForm';
import HomeFooter from '@/components/home/HomeFooter';
import ScrollReveal from '@/components/home/ScrollReveal';

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://empiregroup.uz';

export const metadata = {
  title: "Empire Group — Mobil ilova, Veb-sayt, AI va Odoo ERP | Toshkent, O'zbekiston",
  description:
    "O'zbekistonda biznes uchun IT-yechimlar: mobil ilova ($5,000 dan), veb-sayt, AI avtomatlashtirish va Odoo ERP joriy etish. Bepul konsultatsiya: +998 99 116 46 58.",
  alternates: {
    canonical: SITE,
    languages: { 'uz-UZ': SITE, 'ru-RU': SITE },
  },
  openGraph: {
    title: "Empire Group — Mobil ilova, Veb-sayt, AI va Odoo ERP | Toshkent",
    description: "O'zbekistonda biznes uchun #1 IT kompaniyasi. Mobil ilova, veb-sayt, AI va Odoo ERP. Bepul konsultatsiya.",
    url: SITE,
    type: 'website',
    images: [{ url: `${SITE}/og.png`, width: 1200, height: 630, alt: 'Empire Group — IT Solutions' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Empire Group — Mobil ilova, Veb, AI va ERP',
    description: "O'zbekistonda biznes uchun IT-yechimlar. Bepul konsultatsiya.",
    images: [`${SITE}/og.png`],
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'Loyiha qancha vaqt oladi?', acceptedAnswer: { '@type': 'Answer', text: "Ko'lamiga qarab odatda 2–12 oy. MVP (boshlang'ich versiya) 2–3 oyda tayyor bo'ladi." } },
    { '@type': 'Question', name: 'Narx qanday hisoblanadi?', acceptedAnswer: { '@type': 'Answer', text: 'Biz fixed-scope tizimida ishlaymiz — soatbay emas. Loyiha boshida aniq narx belgilanadi. Yashirin to\'lovlar yo\'q.' } },
    { '@type': 'Question', name: 'Minimal byudjet qancha?', acceptedAnswer: { '@type': 'Answer', text: 'Standart paketlar $5,000 dan boshlanadi.' } },
    { '@type': 'Question', name: "To'lov qanday amalga oshiriladi?", acceptedAnswer: { '@type': 'Answer', text: "To'lov bosqichma-bosqich: boshlang'ich avans, so'ngra har bosqich yakunida belgilangan ulushlar." } },
    { '@type': 'Question', name: "Kod va mahsulot kimga tegishli bo'ladi?", acceptedAnswer: { '@type': 'Answer', text: "Loyiha yakunida barcha kod, dizayn va intellektual mulk to'liq sizga o'tadi." } },
    { '@type': 'Question', name: 'Ishga tushgandan keyin yordam beriladimi?', acceptedAnswer: { '@type': 'Answer', text: "Ha. Har paketda 4 hafta bepul qo'llab-quvvatlash bor." } },
  ],
};

const localBizSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': SITE,
  name: 'Empire Group',
  description: "Biznes uchun mobil ilova, veb-sayt, AI avtomatlashtirish va Odoo ERP joriy etish.",
  url: SITE,
  telephone: '+998991164658',
  email: 'muslimansoriy7@gmail.com',
  image: `${SITE}/logos/empire-white.png`,
  priceRange: '$$$',
  currenciesAccepted: 'USD, UZS',
  paymentAccepted: 'Cash, Bank Transfer',
  address: { '@type': 'PostalAddress', addressLocality: 'Toshkent', addressCountry: 'UZ' },
  geo: { '@type': 'GeoCoordinates', latitude: 41.2995, longitude: 69.2401 },
  openingHoursSpecification: [{ '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday'], opens: '09:00', closes: '18:00' }],
  sameAs: ['https://t.me/empiregroup_uz', 'https://instagram.com/empiregroup.uz'],
};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBizSchema) }} />
      <Navbar />
      <div className="hpg">
        <Hero />
        <ClientLogos />
        <Services />
        <Process />
        <Projects />
        <WhyUs />
        <Testimonials />
        <FAQ />
        <ContactForm />
        <HomeFooter />
        <ScrollReveal />
      </div>
    </>
  );
}
