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
    <div className="inline-flex rounded-2xl border border-[color:rgb(var(--border))] bg-[color:rgb(var(--surface))] p-1">
      {(["monthly", "yearly"] as const).map((opt) => {
        const active = billing === opt;
        return (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className={
              "h-10 rounded-xl px-4 text-sm font-semibold transition " +
              (active
                ? "bg-[color:rgb(var(--primary))] text-white"
                : "text-[color:rgb(var(--text-muted))] hover:text-[color:rgb(var(--text))]")
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
                <span className="h-1.5 w-1.5 rounded-full bg-[color:rgb(var(--primary))]" />
                <span className="uppercase tracking-widest">
                  {t(lang, "sectionPricing")}
                </span>
              </div>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[color:rgb(var(--text))] sm:text-4xl">
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

            return (
              <Reveal key={plan.id} delay={idx * 0.04}>
                <Card
                  className={
                    "flex h-full flex-col p-7 " +
                    (featured
                      ? "ring-1 ring-[color:rgb(var(--primary))]/20"
                      : "")
                  }>
                  {featured ? (
                    <div className="mb-4 inline-flex w-fit items-center rounded-full bg-[color:rgb(var(--green-50))] px-3 py-1 text-xs font-semibold text-[color:rgb(var(--green-900))]">
                      {t(lang, "pricingMostPopular")}
                    </div>
                  ) : null}

                  <div className="text-sm font-semibold text-[color:rgb(var(--text))]">
                    {plan.name[lang]}
                  </div>
                  <div className="mt-1 text-sm text-[color:rgb(var(--text-muted))]">
                    {plan.speedMbps} Mbps
                  </div>

                  <div className="mt-6 flex items-baseline gap-2">
                    <div className="text-4xl font-extrabold tracking-tight text-[color:rgb(var(--text))]">
                      {formatNpr(price)}
                    </div>
                    <div className="text-sm text-[color:rgb(var(--text-soft))]">
                      {billing === "monthly" ? "/mo" : "/yr"}
                    </div>
                  </div>

                  {plan.features[lang].length ? (
                    <ul className="mt-6 space-y-3">
                      {plan.features[lang].map((f) => (
                        <li
                          key={f}
                          className="flex items-start gap-3 text-sm text-[color:rgb(var(--text-muted))]">
                          <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[color:rgb(var(--green-50))] text-[color:rgb(var(--green-800))]">
                            <Check className="h-3 w-3" />
                          </span>
                          <span className="leading-6">{f}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="mt-6 text-sm text-[color:rgb(var(--text-soft))]">
                      {/* TODO: add real data to plan.features */}
                    </div>
                  )}

                  <div className="mt-7" />
                  <Link
                    href="/contact"
                    className={
                      featured ? "rcn-btn-primary" : "rcn-btn-secondary"
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
