import type { RcnLang } from "@/data/business";

export type RcnI18nKey = keyof typeof STRINGS.en;

// NOTE: Nepali copy is not currently available in-repo.
// Per project rules, we do not auto-translate.
// TODO: add real Nepali strings for all keys.

export const STRINGS = {
  en: {
    navHome: "Home",
    navPlans: "Plans",
    navCoverage: "Coverage",
    navAbout: "About",
    navContact: "Contact",
    navFaq: "FAQ",

    ctaViewPlans: "View Plans",
    ctaGetConnected: "Get Connected",
    ctaCheckAvailability: "Check availability",
    ctaContact: "Contact",

    pricingMonthly: "Monthly",
    pricingYearlyDiscount: "Yearly (−15%)",
    pricingMostPopular: "Most Popular",

    heroEyebrow: "Raghunathpur Cable Network",
    heroHeadlineA: "Fiber internet",
    heroHeadlineB: "you can trust",
    heroSubhead:
      "Nepal-based fiber internet and cable TV provider established in 2010.",

    sectionFeatures: "Features",
    sectionPricing: "Plans",
    sectionStats: "Network at a glance",
    sectionHowItWorks: "How it works",
    sectionCoverage: "Coverage",
    sectionFaq: "FAQ",
    sectionTestimonials: "Testimonials",

    faqFallbackTitle: "Questions?",
    faqFallbackBody:
      "If you still have questions, contact us and we’ll help you out.",

    coverageInputLabel: "Area / Landmark",
    coverageInputPlaceholder: "Ward, tole, landmark…",
    coverageSubmit: "Send",

    footerCompany: "Raghunathpur Cable Network",
    footerQuickLinks: "Quick links",
    footerContact: "Contact",
    footerSupport: "Support",
  },
  np: {
    navHome: "Home",
    navPlans: "Plans",
    navCoverage: "Coverage",
    navAbout: "About",
    navContact: "Contact",
    navFaq: "FAQ",

    ctaViewPlans: "View Plans",
    ctaGetConnected: "Get Connected",
    ctaCheckAvailability: "Check availability",
    ctaContact: "Contact",

    pricingMonthly: "Monthly",
    pricingYearlyDiscount: "Yearly (−15%)",
    pricingMostPopular: "Most Popular",

    heroEyebrow: "Raghunathpur Cable Network",
    heroHeadlineA: "Fiber internet",
    heroHeadlineB: "you can trust",
    heroSubhead:
      "Nepal-based fiber internet and cable TV provider established in 2010.",

    sectionFeatures: "Features",
    sectionPricing: "Plans",
    sectionStats: "Network at a glance",
    sectionHowItWorks: "How it works",
    sectionCoverage: "Coverage",
    sectionFaq: "FAQ",
    sectionTestimonials: "Testimonials",

    faqFallbackTitle: "Questions?",
    faqFallbackBody:
      "If you still have questions, contact us and we’ll help you out.",

    coverageInputLabel: "Area / Landmark",
    coverageInputPlaceholder: "Ward, tole, landmark…",
    coverageSubmit: "Send",

    footerCompany: "Raghunathpur Cable Network",
    footerQuickLinks: "Quick links",
    footerContact: "Contact",
    footerSupport: "Support",
  },
} as const;

export function t(lang: RcnLang, key: RcnI18nKey): string {
  return STRINGS[lang][key];
}
