"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, Rocket, Wrench, ArrowRight } from "lucide-react";
import { Container } from "./container";
import { Reveal } from "./reveal";

type Step = {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  accent: string;
  glow: string;
  number: string;
};

const STEPS: Step[] = [
  {
    title: "Choose your plan",
    description:
      "Pick a speed tier that fits your household or business. Compare plans side-by-side with no hidden catches.",
    icon: CheckCircle2,
    accent: "from-sky-400 to-blue-500",
    glow: "rgba(56,189,248,0.2)",
    number: "01",
  },
  {
    title: "We install & activate",
    description:
      "Our certified technicians arrive on schedule, run the fiber, and have you online — typically within 24 hours.",
    icon: Wrench,
    accent: "from-cyan-400 to-violet-500",
    glow: "rgba(0,229,255,0.2)",
    number: "02",
  },
  {
    title: "Enjoy blazing speeds",
    description:
      "Stream, game, and work with consistent speeds. Our network team monitors 24/7 so you never have to worry.",
    icon: Rocket,
    accent: "from-violet-400 to-fuchsia-500",
    glow: "rgba(167,139,250,0.2)",
    number: "03",
  },
];

/* Connector line between steps (desktop) */
function ConnectorLine({ accent }: { accent: string }) {
  return (
    <div className="hidden items-center md:flex md:flex-1">
      <div className="relative mx-2 h-px flex-1">
        <div className="absolute inset-0 bg-(--border-card)" />
        <motion.div
          className={`absolute inset-0 bg-linear-to-r ${accent}`}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ transformOrigin: "left" }}
        />
        {/* Animated dot travelling along line */}
        <motion.div
          className={`absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-linear-to-r ${accent}`}
          initial={{ left: "0%" }}
          animate={{ left: ["0%", "100%", "0%"] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
          style={{ boxShadow: `0 0 8px rgba(0,229,255,0.8)` }}
        />
      </div>
      <ArrowRight className="h-4 w-4 shrink-0 text-(--text-muted)" />
    </div>
  );
}

function StepCard({ step, index }: { step: Step; index: number }) {
  return (
    <Reveal delay={index * 0.1}>
      <motion.div
        className="group relative flex-1 overflow-hidden rounded-3xl border border-(--border-card) bg-(--bg-card) p-7 shadow-sm backdrop-blur-2xl transition-colors hover:border-indigo-300 hover:bg-(--bg-card-hover) dark:hover:border-indigo-600"
        whileHover={{ y: -6 }}
        transition={{ duration: 0.3 }}
        style={{
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)",
        }}>
        {/* Hover glow */}
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: `radial-gradient(400px circle at 50% 0%, ${step.glow}, transparent 70%)`,
          }}
        />

        {/* Step number — ghost text */}
        <div className="absolute right-5 top-4 select-none font-black text-[80px] leading-none text-gray-200 dark:text-white/3">
          {step.number}
        </div>

        {/* Icon */}
        <motion.div
          className={`relative flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br ${step.accent}`}
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
          style={{ boxShadow: `0 8px 30px ${step.glow}` }}>
          <step.icon className="h-6 w-6 text-white" />
        </motion.div>

        {/* Step label */}
        <div
          className={`mt-5 text-xs font-bold uppercase tracking-widest bg-linear-to-r ${step.accent} bg-clip-text text-transparent`}>
          Step {step.number}
        </div>

        {/* Title */}
        <h3 className="mt-2 text-lg font-bold text-gray-900 dark:text-white">
          {step.title}
        </h3>

        {/* Description */}
        <p className="mt-3 text-sm leading-6 text-(--text-muted)">
          {step.description}
        </p>
      </motion.div>
    </Reveal>
  );
}

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden bg-transparent py-24 sm:py-32">
      <Container className="relative">
        {/* Header */}
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/25 bg-cyan-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-cyan-700 dark:text-cyan-400">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
              How It Works
            </div>
            <h2 className="mt-5 text-4xl font-black tracking-tight text-gray-900 dark:text-white sm:text-5xl">
              Online in{" "}
              <span className="bg-linear-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
                three steps
              </span>
            </h2>
            <p className="mt-5 text-lg text-(--text-muted)">
              From plan selection to full-speed internet — a seamless,
              hassle-free onboarding experience.
            </p>
          </div>
        </Reveal>

        {/* Steps with connectors (desktop) */}
        <div className="mt-16 flex flex-col gap-5 md:flex-row md:items-stretch md:gap-0">
          {STEPS.map((step, idx) => (
            <React.Fragment key={step.title}>
              <StepCard step={step} index={idx} />
              {idx < STEPS.length - 1 && (
                <ConnectorLine accent={STEPS[idx + 1].accent} />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* CTA */}
        <Reveal delay={0.3}>
          <div className="mt-14 flex justify-center">
            <motion.div
              whileHover={{
                scale: 1.04,
                boxShadow: "0 0 60px rgba(0,229,255,0.4)",
              }}
              whileTap={{ scale: 0.97 }}>
              <Link
                href="/contact"
                className="group inline-flex h-12 items-center gap-2.5 rounded-2xl bg-linear-to-r from-cyan-500 to-violet-600 px-8 font-semibold text-white shadow-[0_0_40px_rgba(0,229,255,0.25)]">
                Get Connected Today
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}>
                  <ArrowRight className="h-4 w-4" />
                </motion.span>
              </Link>
            </motion.div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
