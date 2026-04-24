"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Zap } from "lucide-react";
import { Container } from "./container";
import { Reveal } from "./reveal";

type BillingCycle = "monthly" | "yearly";

type Plan = {
  name: string;
  speed: string;
  tagline: string;
  featured?: boolean;
  monthly: number;
  yearly: number;
  features: string[];
};

const PLANS: Plan[] = [
  {
    name: "Basic",
    speed: "50 Mbps",
    tagline: "Perfect for everyday browsing",
    monthly: 499,
    yearly: 4990,
    features: [
      "Unlimited data usage",
      "HD streaming support",
      "Free installation",
      "Standard router setup",
    ],
  },
  {
    name: "Standard",
    speed: "100 Mbps",
    tagline: "Best value for families",
    featured: true,
    monthly: 699,
    yearly: 6990,
    features: [
      "Unlimited data usage",
      "4K streaming support",
      "Priority 24/7 support",
      "Enhanced Wi-Fi coverage",
    ],
  },
  {
    name: "Premium",
    speed: "200 Mbps",
    tagline: "For power users & teams",
    monthly: 999,
    yearly: 9990,
    features: [
      "Unlimited data usage",
      "8K / multi-device streaming",
      "Dedicated account manager",
      "Work-from-home optimized",
    ],
  },
];

function formatINR(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

function PricingCard({
  plan,
  billing,
  index,
}: {
  plan: Plan;
  billing: BillingCycle;
  index: number;
}) {
  const price = billing === "monthly" ? plan.monthly : plan.yearly;
  const period = billing === "monthly" ? "/mo" : "/yr";

  return (
    <Reveal delay={index * 0.08}>
      <motion.div
        className="relative h-full"
        whileHover={{ y: -6 }}
        transition={{ duration: 0.3, ease: "easeOut" }}>
        <div
          className={[
            "relative flex h-full flex-col overflow-hidden rounded-3xl border p-8 shadow-sm transition-colors",
            "border-gray-200 bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:hover:bg-gray-800",
            plan.featured
              ? "ring-1 ring-gray-900/10 dark:ring-gray-100/10"
              : "",
          ].join(" ")}>
          {/* Popular badge */}
          {plan.featured && (
            <div className="mb-5 inline-flex w-fit items-center gap-1.5 rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-semibold text-gray-700 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300">
              <Zap className="h-3 w-3" />
              Most Popular
            </div>
          )}

          {/* Plan name & tagline */}
          <div>
            <div className="text-xl font-bold text-gray-900 dark:text-gray-100">
              {plan.name}
            </div>
            <div className="mt-1.5 text-sm text-gray-600 dark:text-gray-400">
              {plan.tagline}
            </div>
          </div>

          {/* Price */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${plan.name}-${billing}`}
              className="mt-7 flex items-baseline gap-1.5"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}>
              <span className="text-5xl font-black tracking-tight text-gray-900 dark:text-gray-100">
                {formatINR(price)}
              </span>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {period}
              </span>
            </motion.div>
          </AnimatePresence>

          {/* Speed pill */}
          <div className="mt-6 inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 dark:border-gray-700 dark:bg-gray-900">
            <Zap className="h-3.5 w-3.5 text-gray-700 dark:text-gray-300" />
            <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
              {plan.speed}
            </span>
          </div>

          {/* Divider */}
          <div className="my-7 h-px bg-gray-200 dark:bg-gray-700" />

          {/* Features */}
          <ul className="flex-1 space-y-3.5">
            {plan.features.map((f) => (
              <li key={f} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-gray-200/70 bg-white/70 dark:border-white/8 dark:bg-white/6">
                  <Check className="h-3 w-3 text-gray-700 dark:text-gray-300" />
                </span>
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {f}
                </span>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="/contact"
              className={[
                "mt-8 flex h-12 w-full items-center justify-center rounded-2xl text-sm font-bold transition-all",
                plan.featured
                  ? "bg-gray-900 text-white hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200"
                  : "border border-gray-200/70 bg-white/80 text-gray-900 hover:bg-white/90 dark:border-white/8 dark:bg-white/6 dark:text-gray-100 dark:hover:bg-white/[0.08]",
              ].join(" ")}>
              Choose {plan.name}
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </Reveal>
  );
}

/* ─── Billing toggle ──────────────────── */
function BillingToggle({
  billing,
  onChange,
}: {
  billing: BillingCycle;
  onChange: (v: BillingCycle) => void;
}) {
  return (
    <div className="flex items-center gap-1 rounded-2xl border border-gray-200/70 bg-white/75 p-1 backdrop-blur-xl dark:border-white/8 dark:bg-white/5">
      {(["monthly", "yearly"] as const).map((opt) => (
        <button
          key={opt}
          onClick={() => onChange(opt)}
          className="relative rounded-xl px-5 py-2.5 text-sm font-semibold transition-colors">
          {billing === opt && (
            <motion.div
              layoutId="billing-pill"
              className="absolute inset-0 rounded-xl bg-gray-900 dark:bg-gray-100"
              transition={{ type: "spring", bounce: 0.25, duration: 0.4 }}
            />
          )}
          <span
            className={`relative ${
              billing === opt
                ? "text-white dark:text-gray-900"
                : "text-gray-600 dark:text-gray-400"
            }`}>
            {opt === "monthly" ? "Monthly" : "Yearly (−15%)"}
          </span>
        </button>
      ))}
    </div>
  );
}

/* ─── Section ─────────────────────────── */
export function Pricing({ withHeader = true }: { withHeader?: boolean } = {}) {
  const [billing, setBilling] = React.useState<BillingCycle>("monthly");

  return (
    <section id="pricing" className="container-section">
      <Container>
        {/* Header */}
        {withHeader && (
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-gray-200/80 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-gray-700 backdrop-blur-xl dark:border-white/8 dark:bg-white/5 dark:text-white/70">
                <span className="h-1.5 w-1.5 rounded-full bg-gray-400 dark:bg-white/40" />
                Pricing Plans
              </div>
              <h2 className="heading-primary mt-5">
                Simple, transparent pricing
              </h2>
              <p className="mt-5 text-lg text-muted">
                No hidden fees. No throttling. Upgrade or downgrade anytime.
              </p>
            </div>
          </Reveal>
        )}

        {/* Toggle */}
        <Reveal delay={0.1}>
          <div
            className={
              withHeader ? "mt-10 flex justify-center" : "flex justify-center"
            }>
            <BillingToggle billing={billing} onChange={setBilling} />
          </div>
        </Reveal>

        {/* Cards */}
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {PLANS.map((plan, idx) => (
            <PricingCard
              key={plan.name}
              plan={plan}
              billing={billing}
              index={idx}
            />
          ))}
        </div>

        {/* Footer note */}
        <Reveal delay={0.25}>
          <p className="mt-12 text-center text-sm text-muted">
            Need a custom plan for your business or multiple locations?{" "}
            <Link
              href="/contact"
              className="text-gray-900 underline-offset-4 hover:underline dark:text-gray-100">
              Contact us for a tailored quote.
            </Link>
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
