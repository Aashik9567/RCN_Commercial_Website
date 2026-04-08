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
    <div className="group relative rounded-2xl border border-(--border-card) bg-(--bg-card) p-6 shadow-md backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-indigo-300 hover:bg-(--bg-card-hover) hover:shadow-lg dark:hover:border-indigo-600">
      <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-indigo-500/0 to-purple-500/0 opacity-0 transition-opacity duration-300 group-hover:from-indigo-500/5 group-hover:to-purple-500/5 group-hover:opacity-100" />
      <div className="relative">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-indigo-100 to-purple-100 text-indigo-700 transition-all duration-300 group-hover:scale-110 dark:from-indigo-950 dark:to-purple-950 dark:text-indigo-300">
          {feature.icon}
        </div>
        <div className="mt-4 text-lg font-bold text-gray-900 dark:text-white">
          {feature.title}
        </div>
        <p className="mt-2 text-sm leading-6 text-(--text-muted)">
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
      <div className="absolute inset-x-0 top-0 -z-10 h-96 bg-linear-to-b from-indigo-50/50 to-transparent dark:from-indigo-950/20" />
      <Container>
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-block rounded-full bg-indigo-100/60 px-4 py-2 text-sm font-semibold text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300">
              Why Choose Us
            </span>
            <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
              Built for modern internet needs
            </h2>
            <p className="mt-6 text-lg leading-8 text-(--text-muted)">
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
          <div className="mt-16 rounded-3xl border border-(--border-card) bg-(--bg-card) bg-linear-to-r from-indigo-500/5 to-purple-500/5 p-8 backdrop-blur-xl">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-green-100 to-emerald-100 text-green-700 dark:from-green-950 dark:to-emerald-950 dark:text-green-300">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-lg font-bold text-gray-900 dark:text-white">
                    Enterprise-grade reliability
                  </div>
                  <div className="mt-1 text-sm text-(--text-muted)">
                    Proactive monitoring, swift resolution, and dedicated
                    support.
                  </div>
                </div>
              </div>
              <div className="text-sm font-medium text-(--text-secondary)">
                Ask us about business plans →
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
