"use client";

import * as React from "react";
import { Gauge, MapPin, ShieldCheck, Timer } from "lucide-react";
import { Container } from "./container";
import { Reveal } from "./reveal";
import { AnimatedNumber } from "./animated-number";

type Stat = {
  label: string;
  description: string;
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  icon: React.ReactNode;
};

const STATS: Stat[] = [
  {
    label: "Customers",
    description: "Homes & businesses connected",
    value: 10000,
    suffix: "+",
    icon: <MapPin className="h-6 w-6" />,
  },
  {
    label: "Uptime target",
    description: "Reliability you can count on",
    value: 99.9,
    decimals: 1,
    suffix: "%",
    icon: <ShieldCheck className="h-6 w-6" />,
  },
  {
    label: "Avg. install",
    description: "Quick setup & activation",
    value: 24,
    suffix: "h",
    icon: <Timer className="h-6 w-6" />,
  },
  {
    label: "Peak speed",
    description: "Plans up to",
    value: 200,
    suffix: " Mbps",
    icon: <Gauge className="h-6 w-6" />,
  },
];

function StatCard({ stat }: { stat: Stat }) {
  return (
    <div className="card-interactive group hover:border-gray-300 dark:hover:border-gray-600">
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gray-100 text-gray-700 transition-transform duration-300 group-hover:scale-110 dark:bg-gray-800 dark:text-gray-200">
          {stat.icon}
        </div>
        <div className="flex-1">
          <div className="text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400">
            {stat.label}
          </div>
          <AnimatedNumber
            value={stat.value}
            decimals={stat.decimals}
            prefix={stat.prefix}
            suffix={stat.suffix}
            className="mt-1 block text-3xl font-bold tracking-tight text-gray-900 dark:text-white"
          />
        </div>
      </div>
      <p className="mt-5 text-sm leading-6 text-gray-600 dark:text-gray-400">
        {stat.description}
      </p>
    </div>
  );
}

export function WhyChooseUs() {
  return (
    <section id="why-us" className="container-section">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <div className="inline-block rounded-full border border-gray-200 bg-gray-50 px-4 py-1 text-sm font-semibold text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
              Why choose us
            </div>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
              <span className="text-gray-900 dark:text-gray-100">
                Built for performance
              </span>
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
              From installation to daily usage, we prioritize reliability,
              consistency, and exceptional support for every customer.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat, idx) => (
            <Reveal key={stat.label} delay={idx * 0.05}>
              <StatCard stat={stat} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
