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
    <div className="group rounded-2xl border border-gray-200/60 bg-linear-to-br from-white/80 to-gray-50/50 p-6 shadow-md backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-indigo-300 hover:shadow-lg dark:border-gray-800/60 dark:from-gray-900/50 dark:to-gray-900/30 dark:hover:border-indigo-600">
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-indigo-100 to-purple-100 text-indigo-600 dark:from-indigo-950/50 dark:to-purple-950/50 dark:text-indigo-300 transition-transform duration-300 group-hover:scale-110">
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
    <section id="why-us" className="py-16 sm:py-20">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <div className="inline-block rounded-full bg-indigo-50 px-4 py-1 text-sm font-semibold text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300">
              Why choose us
            </div>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
              <span className="bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
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
