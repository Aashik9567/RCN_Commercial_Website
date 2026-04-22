"use client";

import * as React from "react";
import { Cable, Headset, ShieldCheck, Wallet, Wifi } from "lucide-react";
import { Container } from "./container";
import { Reveal } from "./reveal";

type Feature = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

function FeatureCard({ feature }: { feature: Feature }) {
  return (
    <div className="card-interactive group relative hover:border-gray-300 dark:hover:border-gray-600 hover:-translate-y-2">
      <div className="relative">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 text-gray-700 transition-all duration-300 group-hover:scale-110 dark:bg-gray-800 dark:text-gray-200">
          {feature.icon}
        </div>
        <div className="mt-4 text-lg font-bold text-gray-900 dark:text-white">
          {feature.title}
        </div>
        <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-400">
          {feature.description}
        </p>
      </div>
    </div>
  );
}

const FEATURES: Feature[] = [
  {
    title: "High-speed Internet",
    description:
      "Smooth streaming, lag-free gaming, and fast downloads backed by a modern network.",
    icon: <Wifi className="h-6 w-6" />,
  },
  {
    title: "24/7 Customer Support",
    description: "Friendly local assistance when you need it—day or night.",
    icon: <Headset className="h-6 w-6" />,
  },
  {
    title: "Affordable, Transparent Plans",
    description:
      "Choose a plan that fits your budget with clear pricing and no surprises.",
    icon: <Wallet className="h-6 w-6" />,
  },
  {
    title: "Fiber-grade Reliability",
    description:
      "Stable connectivity engineered for uptime and consistent performance.",
    icon: <Cable className="h-6 w-6" />,
  },
];

export function Features() {
  return (
    <section id="features" className="relative py-20 sm:py-28">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-block rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm font-semibold text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
              Why Choose Us
            </span>
            <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
              Built for modern internet needs
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
              We combine cutting-edge fiber technology with human-friendly
              support to deliver experiences that matter.
            </p>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature, idx) => (
            <Reveal key={feature.title} delay={idx * 0.05}>
              <FeatureCard feature={feature} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.25}>
          <div className="card mt-16 rounded-3xl">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-lg font-bold text-gray-900 dark:text-white">
                    Enterprise-grade reliability
                  </div>
                  <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Proactive monitoring, swift resolution, and dedicated
                    support.
                  </div>
                </div>
              </div>
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Ask us about business plans →
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
