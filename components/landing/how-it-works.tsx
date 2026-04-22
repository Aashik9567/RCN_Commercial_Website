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
  number: string;
};

const STEPS: Step[] = [
  {
    title: "Choose your plan",
    description:
      "Pick a speed tier that fits your household or business. Compare plans side-by-side with no hidden catches.",
    icon: CheckCircle2,
    number: "01",
  },
  {
    title: "We install & activate",
    description:
      "Our certified technicians arrive on schedule, run the fiber, and have you online — typically within 24 hours.",
    icon: Wrench,
    number: "02",
  },
  {
    title: "Enjoy blazing speeds",
    description:
      "Stream, game, and work with consistent speeds. Our network team monitors 24/7 so you never have to worry.",
    icon: Rocket,
    number: "03",
  },
];

/* Connector line between steps (desktop) */
function ConnectorLine() {
  return (
    <div className="hidden items-center md:flex md:flex-1">
      <div className="relative mx-2 h-px flex-1">
        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700" />
        {/* Animated dot travelling along line */}
        <motion.div
          className="absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-gray-500 dark:bg-gray-400"
          initial={{ left: "0%" }}
          animate={{ left: ["0%", "100%", "0%"] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        />
      </div>
      <ArrowRight className="h-4 w-4 shrink-0 text-gray-600 dark:text-gray-400" />
    </div>
  );
}

function StepCard({ step, index }: { step: Step; index: number }) {
  return (
    <Reveal delay={index * 0.1}>
      <motion.div
        className="group relative flex-1 overflow-hidden rounded-3xl border border-gray-200 bg-white p-7 shadow-sm transition-colors hover:border-gray-300 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:hover:border-gray-600 dark:hover:bg-gray-800"
        whileHover={{ y: -6 }}
        transition={{ duration: 0.3 }}
        style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)" }}>
        {/* Step number — ghost text */}
        <div className="absolute right-5 top-4 select-none font-black text-[80px] leading-none text-gray-200 dark:text-white/3">
          {step.number}
        </div>

        {/* Icon */}
        <motion.div
          className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200"
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 300 }}>
          <step.icon className="h-6 w-6" />
        </motion.div>

        {/* Step label */}
        <div className="mt-5 text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
          Step {step.number}
        </div>

        {/* Title */}
        <h3 className="mt-2 text-lg font-bold text-gray-900 dark:text-white">
          {step.title}
        </h3>

        {/* Description */}
        <p className="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-400">
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
      className="container-section relative overflow-hidden">
      <Container className="relative">
        {/* Header */}
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
              <span className="h-1.5 w-1.5 rounded-full bg-gray-500" />
              How It Works
            </div>
            <h2 className="mt-5 text-4xl font-black tracking-tight text-gray-900 dark:text-white sm:text-5xl">
              Online in{" "}
              <span className="text-gray-900 dark:text-gray-100">
                three steps
              </span>
            </h2>
            <p className="mt-5 text-lg text-gray-600 dark:text-gray-400">
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
              {idx < STEPS.length - 1 && <ConnectorLine />}
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
                className="group inline-flex h-12 items-center gap-2.5 rounded-2xl bg-gray-900 px-8 font-semibold text-white transition-colors hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200">
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
