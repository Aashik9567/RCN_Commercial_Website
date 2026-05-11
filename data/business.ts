export type RcnLang = "en" | "np";

export type RcnLocalized<T> = {
  en: T;
  np: T;
};

export type RcnPlanId = "basic" | "standard" | "premium";

export type RcnPlan = {
  id: RcnPlanId;
  name: RcnLocalized<string>;
  speedMbps: number;
  monthlyPrice: number;
  features: RcnLocalized<string[]>;
  highlight?: boolean;
};

export type RcnStat = {
  id: "speed" | "uptime" | "customers" | "areas";
  value: number;
  suffix: string;
  label: RcnLocalized<string>;
};

export type RcnBusiness = {
  company: {
    name: string;
    shortName: string;
    establishedYear: number;
    location: string;
    primaryServiceArea: string;
  };
  contact: {
    phone: string;
    email: string;
    address: string;
    googleMapsUrl?: string;
    googleMapsEmbedUrl?: string;
    whatsappPhoneE164?: string;
  };
  pricing: {
    currencyCode: "NPR";
    yearlyDiscountPercent: 15;
  };
  plans: RcnPlan[];
  stats: RcnStat[];
  features: Array<{
    id:
      | "high-speed-internet"
      | "24-7-support"
      | "transparent-pricing"
      | "fiber-reliability"
      | "business-plans"
      | "fast-installation";
    title: RcnLocalized<string>;
  }>;
  howItWorks: Array<{
    id: "choose-plan" | "install" | "go-live";
    title: RcnLocalized<string>;
    description: RcnLocalized<string>;
  }>;
  coverage: {
    shortNote: RcnLocalized<string>;
  };
  testimonials: Array<{
    name: string;
    quote: string;
    source?: string;
  }>;
  faq: Array<{
    question: RcnLocalized<string>;
    answer: RcnLocalized<string>;
  }>;
};

export const business: RcnBusiness = {
  company: {
    name: "Raghunathpur Cable Network",
    shortName: "RCN",
    establishedYear: 2010,
    location: "Nepal",
    primaryServiceArea: "Sabaila-12, Raghunathpur and 25+ surrounding areas",
  },
  contact: {
    phone: "+977 9801663644",
    email: "raghunathpurcable2010@gmail.com",
    address: "Sabaila-12, Raghunathpur, Nepal",
    googleMapsUrl:
      "https://www.google.com/maps?q=Sabaila-12%2C%20Raghunathpur%2C%20Nepal",
    googleMapsEmbedUrl:
      "https://www.google.com/maps?q=Raghunathpur%2C%20Cable%2C%20Network%2C%20Pvt.%2C%20Ltd.&output=embed",
    whatsappPhoneE164: "9779801663644",
  },
  pricing: {
    currencyCode: "NPR",
    yearlyDiscountPercent: 15,
  },
  plans: [
    {
      id: "basic",
      name: {
        en: "Basic",
        // TODO: add real data
        np: "Basic",
      },
      speedMbps: 50,
      monthlyPrice: 499,
      features: {
        en: [
          "Unlimited data usage",
          "HD streaming support",
          "Free installation",
          "Standard router setup",
        ],
        // TODO: add real data
        np: [
          "Unlimited data usage",
          "HD streaming support",
          "Free installation",
          "Standard router setup",
        ],
      },
    },
    {
      id: "standard",
      name: {
        en: "Standard",
        // TODO: add real data
        np: "Standard",
      },
      speedMbps: 100,
      monthlyPrice: 699,
      highlight: true,
      features: {
        en: [
          "Unlimited data usage",
          "4K streaming support",
          "Priority 24/7 support",
          "Enhanced Wi-Fi coverage",
        ],
        // TODO: add real data
        np: [
          "Unlimited data usage",
          "4K streaming support",
          "Priority 24/7 support",
          "Enhanced Wi-Fi coverage",
        ],
      },
    },
    {
      id: "premium",
      name: {
        en: "Premium",
        // TODO: add real data
        np: "Premium",
      },
      speedMbps: 200,
      monthlyPrice: 999,
      features: {
        en: [
          "Unlimited data usage",
          "Multi-device streaming",
          "Work-from-home optimized",
        ],
        // TODO: add real data
        np: [
          "Unlimited data usage",
          "Multi-device streaming",
          "Work-from-home optimized",
        ],
      },
    },
  ],
  stats: [
    {
      id: "speed",
      value: 200,
      suffix: " Mbps",
      label: {
        en: "Peak Speed",
        // TODO: add real data
        np: "Peak Speed",
      },
    },
    {
      id: "uptime",
      value: 99.9,
      suffix: "%",
      label: {
        en: "Network Uptime",
        // TODO: add real data
        np: "Network Uptime",
      },
    },
    {
      id: "customers",
      value: 10_000,
      suffix: "+",
      label: {
        en: "Customers",
        // TODO: add real data
        np: "Customers",
      },
    },
    {
      id: "areas",
      value: 25,
      suffix: "+",
      label: {
        en: "Areas Covered",
        // TODO: add real data
        np: "Areas Covered",
      },
    },
  ],
  features: [
    {
      id: "high-speed-internet",
      title: {
        en: "High-speed Internet",
        // TODO: add real data
        np: "High-speed Internet",
      },
    },
    {
      id: "24-7-support",
      title: {
        en: "24/7 Customer Support",
        // TODO: add real data
        np: "24/7 Customer Support",
      },
    },
    {
      id: "transparent-pricing",
      title: {
        en: "Transparent Pricing",
        // TODO: add real data
        np: "Transparent Pricing",
      },
    },
    {
      id: "fiber-reliability",
      title: {
        en: "Fiber-grade Reliability",
        // TODO: add real data
        np: "Fiber-grade Reliability",
      },
    },
    {
      id: "business-plans",
      title: {
        en: "Business Plans",
        // TODO: add real data
        np: "Business Plans",
      },
    },
    {
      id: "fast-installation",
      title: {
        en: "Fast Installation",
        // TODO: add real data
        np: "Fast Installation",
      },
    },
  ],
  howItWorks: [
    {
      id: "choose-plan",
      title: {
        en: "Choose your plan",
        // TODO: add real data
        np: "Choose your plan",
      },
      description: {
        en: "Pick a speed tier that fits your household or business.",
        // TODO: add real data
        np: "Pick a speed tier that fits your household or business.",
      },
    },
    {
      id: "install",
      title: {
        en: "We install & activate",
        // TODO: add real data
        np: "We install & activate",
      },
      description: {
        en: "Share your location details and we’ll schedule installation.",
        // TODO: add real data
        np: "Share your location details and we’ll schedule installation.",
      },
    },
    {
      id: "go-live",
      title: {
        en: "Go live",
        // TODO: add real data
        np: "Go live",
      },
      description: {
        en: "Get online and reach out anytime for support.",
        // TODO: add real data
        np: "Get online and reach out anytime for support.",
      },
    },
  ],
  coverage: {
    shortNote: {
      en: "Share your ward/landmark and we’ll confirm coverage.",
      // TODO: add real data
      np: "Share your ward/landmark and we’ll confirm coverage.",
    },
  },
  testimonials: [],
  faq: [],
};
