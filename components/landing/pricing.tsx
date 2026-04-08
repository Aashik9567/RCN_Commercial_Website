"use client";

import * as React from "react";
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
  accentColor: string;
  glowColor: string;
};

const PLANS: Plan[] = [
  {
    name: "Basic",
    speed: "50 Mbps",
    tagline: "Perfect for everyday browsing",
    monthly: 499,
    yearly: 4990,
    accentColor: "from-sky-400 to-blue-500",
    glowColor: "rgba(56,189,248,0.15)",
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
    accentColor: "from-cyan-400 to-violet-500",
    glowColor: "rgba(0,229,255,0.2)",
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
    accentColor: "from-violet-400 to-fuchsia-500",
    glowColor: "rgba(167,139,250,0.15)",
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
        {/* Outer glow for featured */}
        {plan.featured && (
          <div
            className="absolute -inset-px rounded-3xl"
            style={{
              background: `linear-gradient(135deg, rgba(0,229,255,0.4), rgba(124,58,237,0.4))`,
              filter: "blur(1px)",
            }}
          />
        )}

        <div
          className={[
            "relative flex h-full flex-col overflow-hidden rounded-3xl border bg-[#040714] p-8",
            plan.featured ? "border-transparent" : "border-white/8",
          ].join(" ")}
          style={{
            boxShadow: plan.featured
              ? `0 0 60px ${plan.glowColor}, inset 0 1px 0 rgba(255,255,255,0.06)`
              : "inset 0 1px 0 rgba(255,255,255,0.04)",
          }}>
          {/* Inner gradient overlay */}
          <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-white/3 via-transparent to-transparent" />

          {/* Popular badge */}
          {plan.featured && (
            <motion.div
              className={`mb-5 inline-flex w-fit items-center gap-1.5 rounded-full bg-linear-to-r ${plan.accentColor} px-3 py-1.5 text-xs font-bold text-white`}
              animate={{
                boxShadow: [
                  `0 0 0px ${plan.glowColor}`,
                  `0 0 20px ${plan.glowColor}`,
                  `0 0 0px ${plan.glowColor}`,
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}>
              <Zap className="h-3 w-3" />
              Most Popular
            </motion.div>
          )}

          {/* Plan name & tagline */}
          <div>
            <div className="text-xl font-bold text-white">{plan.name}</div>
            <div className="mt-1.5 text-sm text-white/40">{plan.tagline}</div>
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
              <span className="text-5xl font-black tracking-tight text-white">
                {formatINR(price)}
              </span>
              <span className="text-sm font-medium text-white/40">
                {period}
              </span>
            </motion.div>
          </AnimatePresence>

          {/* Speed pill */}
          <div
            className={`mt-6 inline-flex items-center gap-2 rounded-xl bg-linear-to-r ${plan.accentColor} px-4 py-2.5`}>
            <Zap className="h-3.5 w-3.5 text-white" />
            <span className="text-sm font-bold text-white">{plan.speed}</span>
          </div>

          {/* Divider */}
          <div className="my-7 h-px bg-white/[0.07]" />

          {/* Features */}
          <ul className="flex-1 space-y-3.5">
            {plan.features.map((f) => (
              <li key={f} className="flex items-start gap-3">
                <span
                  className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-linear-to-br ${plan.accentColor}`}>
                  <Check className="h-3 w-3 text-white" />
                </span>
                <span className="text-sm text-white/60">{f}</span>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <motion.a
            href="#get-started"
            className={[
              "mt-8 flex h-12 w-full items-center justify-center rounded-2xl text-sm font-bold transition-all",
              plan.featured
                ? `bg-linear-to-r ${plan.accentColor} text-white shadow-lg`
                : "border border-white/10 bg-white/6 text-white/70 hover:bg-white/10 hover:text-white",
            ].join(" ")}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={
              plan.featured
                ? { boxShadow: `0 8px 30px ${plan.glowColor}` }
                : undefined
            }>
            Choose {plan.name}
          </motion.a>
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
    <div className="flex items-center gap-1 rounded-2xl border border-white/8 bg-white/4 p-1 backdrop-blur">
      {(["monthly", "yearly"] as const).map((opt) => (
        <button
          key={opt}
          onClick={() => onChange(opt)}
          className="relative rounded-xl px-5 py-2.5 text-sm font-semibold transition-colors">
          {billing === opt && (
            <motion.div
              layoutId="billing-pill"
              className="absolute inset-0 rounded-xl bg-linear-to-r from-cyan-500 to-violet-600"
              transition={{ type: "spring", bounce: 0.25, duration: 0.4 }}
            />
          )}
          <span
            className={`relative ${billing === opt ? "text-white" : "text-white/45"}`}>
            {opt === "monthly" ? "Monthly" : "Yearly (−15%)"}
          </span>
        </button>
      ))}
    </div>
  );
}

/* ─── Section ─────────────────────────── */
export function Pricing() {
  const [billing, setBilling] = React.useState<BillingCycle>("monthly");

  return (
    <section
      id="pricing"
      className="relative overflow-hidden bg-[#040714] py-24 sm:py-32">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-px w-1/2 -translate-x-1/2 bg-linear-to-r from-transparent via-cyan-500/30 to-transparent" />
        <div className="absolute left-1/4 top-20 h-80 w-80 rounded-full bg-violet-500/8 blur-3xl" />
        <div className="absolute right-1/4 top-40 h-80 w-80 rounded-full bg-cyan-500/8 blur-3xl" />
      </div>

      <Container className="relative">
        {/* Header */}
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/25 bg-violet-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-violet-400">
              <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
              Pricing Plans
            </div>
            <h2 className="mt-5 text-4xl font-black tracking-tight text-white sm:text-5xl">
              Simple,{" "}
              <span className="bg-linear-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
                transparent
              </span>{" "}
              pricing
            </h2>
            <p className="mt-5 text-lg text-white/45">
              No hidden fees. No throttling. Upgrade or downgrade anytime.
            </p>
          </div>
        </Reveal>

        {/* Toggle */}
        <Reveal delay={0.1}>
          <div className="mt-10 flex justify-center">
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
          <p className="mt-12 text-center text-sm text-white/35">
            Need a custom plan for your business or multiple locations?{" "}
            <a
              href="#contact"
              className="text-cyan-400 underline-offset-4 hover:underline">
              Contact us for a tailored quote.
            </a>
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
