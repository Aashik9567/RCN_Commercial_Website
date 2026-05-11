"use client";

import * as React from "react";
import Link from "next/link";
import { Check } from "lucide-react";

import { Container } from "@/components/landing/container";
import { Reveal } from "@/components/landing/reveal";
import { Card } from "@/components/ui/card";
import { business } from "@/data/business";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { t } from "@/lib/i18n";

type BillingCycle = "monthly" | "yearly";

function formatNpr(amount: number) {
  return new Intl.NumberFormat("en-NP", {
    style: "currency",
    currency: business.pricing.currencyCode,
    maximumFractionDigits: 0,
  }).format(amount);
}

function priceFor(planMonthly: number, billing: BillingCycle) {
  if (billing === "monthly") return planMonthly;
  const discounted =
    planMonthly * 12 * (1 - business.pricing.yearlyDiscountPercent / 100);
  return Math.round(discounted);
}

function BillingToggle({
  lang,
  billing,
  onChange,
}: {
  lang: Parameters<typeof t>[0];
  billing: BillingCycle;
  onChange: (v: BillingCycle) => void;
}) {
  return (
    <div className="inline-flex rounded-full border border-[rgb(var(--primary))]/25 bg-[rgb(var(--surface))]/80 p-1 backdrop-blur">
      {(["monthly", "yearly"] as const).map((opt) => {
        const active = billing === opt;
        return (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className={
              "h-10 rounded-full px-4 text-sm font-semibold transition " +
              (active
                ? "bg-[rgb(var(--primary))] text-[rgb(var(--bg))]"
                : "text-[rgb(var(--text-muted))] hover:text-[rgb(var(--text))]")
            }>
            {opt === "monthly"
              ? t(lang, "pricingMonthly")
              : t(lang, "pricingYearlyDiscount")}
          </button>
        );
      })}
    </div>
  );
}

export function Pricing({ withHeader = true }: { withHeader?: boolean } = {}) {
  const { lang } = useLanguage();
  const [billing, setBilling] = React.useState<BillingCycle>("monthly");

  if (business.plans.length === 0) {
    // TODO: add real data to business.plans
    return null;
  }

  return (
    <section id="pricing" className="container-section">
      <Container>
        {withHeader ? (
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <div className="rcn-badge mx-auto">
                <span className="h-1.5 w-1.5 rounded-full bg-[rgb(var(--primary))]" />
                <span className="uppercase tracking-widest">
                  {t(lang, "sectionPricing")}
                </span>
              </div>
              <h2 className="mt-5 text-[clamp(1.7rem,3.5vw,2.6rem)] font-bold tracking-tight text-[rgb(var(--text))]">
                {t(lang, "sectionPricing")}
              </h2>
            </div>
          </Reveal>
        ) : null}

        <Reveal delay={0.08}>
          <div
            className={
              withHeader ? "mt-10 flex justify-center" : "flex justify-center"
            }>
            <BillingToggle
              lang={lang}
              billing={billing}
              onChange={setBilling}
            />
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {business.plans.map((plan, idx) => {
            const featured = Boolean(plan.highlight);
            const price = priceFor(plan.monthlyPrice, billing);

            const accent =
              plan.id === "premium"
                ? "rgb(var(--cyan) / 0.22)"
                : featured
                  ? "rgb(var(--gold) / 0.28)"
                  : "rgb(var(--primary) / 0.22)";

            return (
              <Reveal key={plan.id} delay={idx * 0.04}>
                <Card
                  size="lg"
                  accentColor={accent}
                  className={
                    "flex h-full flex-col " +
                    (featured ? "rcn-plan-featured" : "")
                  }>
                  {featured ? (
                    <div className="mb-5 inline-flex w-fit items-center rounded-full border border-[rgb(var(--gold))] bg-[rgb(var(--gold))]/15 px-3 py-1 text-xs font-semibold text-[rgb(var(--gold))]">
                      {t(lang, "pricingMostPopular")}
                    </div>
                  ) : null}

                  <div className="text-xl font-semibold text-[rgb(var(--text))]">
                    {plan.name[lang]}
                  </div>

                  <div className="mt-4">
                    <span className="rcn-card rcn-card-sm inline-flex border-[rgb(var(--primary))]/12 bg-[rgb(var(--surface))]/50">
                      <span className="rcn-mono font-medium text-[rgb(var(--primary))]">
                        {plan.speedMbps} Mbps
                      </span>
                    </span>
                  </div>

                  <div className="mt-6 flex items-baseline gap-2">
                    <div className="rcn-mono text-4xl font-semibold tracking-tight text-[rgb(var(--text))]">
                      {formatNpr(price)}
                    </div>
                    <div className="text-sm text-[rgb(var(--text-soft))]">
                      {billing === "monthly" ? "/mo" : "/yr"}
                    </div>
                  </div>

                  {plan.features[lang].length ? (
                    <ul className="mt-6 space-y-3">
                      {plan.features[lang].map((f) => (
                        <li
                          key={f}
                          className="flex items-start gap-3 text-sm text-[rgb(var(--text-muted))]">
                          <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full border border-[rgb(var(--primary))]/25 bg-[rgb(var(--primary))]/12 text-[rgb(var(--primary))]">
                            <Check className="h-3 w-3" />
                          </span>
                          <span className="leading-6">{f}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="mt-6 text-sm text-[rgb(var(--text-soft))]">
                      {/* TODO: add real data to plan.features */}
                    </div>
                  )}

                  <div className="mt-7" />
                  <Link
                    href="/contact"
                    className={
                      plan.id === "premium"
                        ? "rcn-btn-cyan"
                        : featured
                          ? "rcn-btn-primary"
                          : "rcn-btn-secondary"
                    }>
                    {t(lang, "ctaGetConnected")}
                  </Link>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
