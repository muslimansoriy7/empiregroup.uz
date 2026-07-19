/**
 * Dict — the full translatable content shape for one locale.
 * Structural fields (icon, accent, frame, image paths, hrefs) are identical
 * across locales; only the human-readable strings differ.
 */
export type Accent = "develop" | "preview" | "ship";

export type Dict = {
  meta: {
    title: string;
    description: string;
  };
  nav: {
    links: { label: string; href: string }[];
    cta: { label: string; href: string };
    langLabel: string;
    themeLabel: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    /** substring of `title` rendered in the accent gradient */
    titleAccent: string;
    /** words cycled in place of the `{word}` token inside `title` */
    rotatingWords: string[];
    subtitle: string;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
    microline: string;
    stats: { value: string; label: string }[];
    spec: {
      label: string;
      status: string;
      rows: { k: string; v: string }[];
    };
    /** animated "problem → solution" infographic beside the hero pitch */
    flow: {
      problemLabel: string;
      solutionLabel: string;
      problemTitle: string;
      problemItems: string[];
      solutionTitle: string;
      solutionItems: string[];
      metricValue: string;
      metricLabel: string;
    };
  };
  showcase: {
    caption: string;
    tabs: { id: string; label: string; title: string; subtitle: string }[];
  };
  consult: {
    title: string;
    subtitle: string;
    nameLabel: string;
    namePlaceholder: string;
    fieldLabel: string;
    fieldPlaceholder: string;
    fieldOptions: string[];
    phoneLabel: string;
    phonePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    budgetLabel: string;
    budgetPlaceholder: string;
    budgetOptions: string[];
    messageLabel: string;
    messagePlaceholder: string;
    submit: string;
    sending: string;
    successTitle: string;
    successBody: string;
    errorRequired: string;
    errorPhone: string;
    errorSubmit: string;
    privacy: string;
    close: string;
    responseBadge: string;
    urgency: string;
    orLabel: string;
    telegramCta: string;
    telegramPrefill: string;
  };
  proof: {
    eyebrow: string;
    title: string;
    stats: { value: string; label: string; sub: string }[];
    clientsLabel: string;
  };
  services: {
    eyebrow: string;
    title: string;
    subtitle: string;
    popularLabel: string;
    ctaLabel: string;
    ctaHref: string;
    priceFromLabel: string;
    /** heading above the "what the package includes" checklist */
    inclLabel: string;
    items: {
      no: string;
      icon: string;
      /** English discipline label printed above the service name */
      tag: string;
      title: string;
      /** one-line positioning under the service name */
      subtitle: string;
      /** slug of the /xizmatlar landing page this service links to */
      geoSlug: string;
      /** label of the "read more" link, `{name}` is replaced by the title */
      detailsLabel: string;
      body: string;
      /** capability chips */
      points: string[];
      /** technology stack chips */
      stack: string[];
      accent: Accent;
      packages: {
        name: string;
        price: string;
        term: string;
        desc: string;
        popular?: boolean;
      }[];
    }[];
  };
  portfolio: {
    eyebrow: string;
    title: string;
    subtitle: string;
    desktopLabel: string;
    mobileLabel: string;
    resultLabel: string;
    liveLabel: string;
    ctaTitle: string;
    ctaBody: string;
    ctaButton: string;
    cases: {
      segment: string;
      title: string;
      result: string;
      tags: string[];
      desktopImg: string;
      mobileImg: string;
      url: string;
      accent: Accent;
    }[];
  };
  features: {
    eyebrow: string;
    resultLabel: string;
    blocks: {
      kicker: string;
      title: string;
      body: string;
      result: string;
      frame: "browser" | "phone";
      accent: Accent;
    }[];
  };
  founder: {
    eyebrow: string;
    title: string;
    name: string;
    role: string;
    bio: string[];
    photo: string;
    quote: string;
    socials: { label: string; value: string; href: string }[];
  };
  process: {
    eyebrow: string;
    title: string;
    ctaLabel: string;
    ctaHref: string;
    steps: { no: string; title: string; body: string; tags: string[] }[];
  };
  whyUs: {
    eyebrow: string;
    title: string;
    items: { title: string; body: string }[];
  };
  testimonials: {
    eyebrow: string;
    title: string;
    items: { quote: string; name: string; role: string }[];
    /** Telegram chat-screenshot proof strip */
    proofTitle: string;
    proofNote: string;
  };
  brands: {
    eyebrow: string;
    title: string;
    subtitle: string;
  };
  stack: {
    eyebrow: string;
    title: string;
    subtitle: string;
  };
  faq: {
    eyebrow: string;
    title: string;
    items: { q: string; a: string }[];
  };
  cta: {
    eyebrow: string;
    title: string;
    subtitle: string;
    button: { label: string; href: string };
    formTitle: string;
    formSubtitle: string;
  };
  footer: {
    tagline: string;
    columns: { title: string; links: { label: string; href: string }[] }[];
    copyright: string;
    /** right-hand side of the bottom bar */
    legal: string;
  };
};
