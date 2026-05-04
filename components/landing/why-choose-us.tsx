"use client";

import * as React from "react";
import { Gauge, MapPin, ShieldCheck, Timer } from "lucide-react";
import { Container } from "./container";
import { Reveal } from "./reveal";
import { AnimatedNumber } from "./animated-number";
import { Card, GhostCard } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type Stat = {
  label: string;
  description: string;
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  icon: React.ReactNode;
  accent: string;
  colorFrom: string;
  colorTo: string;
};

const STATS: Stat[] = [
  {
    label: "Customers",
    description: "Homes & businesses connected",
    value: 10000,
    suffix: "+",
    icon: <MapPin className="h-5 w-5" />,
    accent: "rgba(99,102,241,0.15)",
    colorFrom: "from-cyan-500",
    colorTo: "to-sky-500",
  },
  {
    label: "Uptime target",
    description: "Reliability you can count on",
    value: 99.9,
    decimals: 1,
    suffix: "%",
    icon: <ShieldCheck className="h-5 w-5" />,
    accent: "rgba(99,102,241,0.15)",
    colorFrom: "from-emerald-500",
    colorTo: "to-teal-500",
  },
  {
    label: "Avg. install",
    description: "Quick setup & activation",
    value: 24,
    suffix: "h",
    icon: <Timer className="h-5 w-5" />,
    accent: "rgba(99,102,241,0.15)",
    colorFrom: "from-violet-500",
    colorTo: "to-fuchsia-500",
  },
  {
    label: "Peak speed",
    description: "Plans up to",
    value: 200,
    suffix: " Mbps",
    icon: <Gauge className="h-5 w-5" />,
    accent: "rgba(99,102,241,0.15)",
    colorFrom: "from-amber-500",
    colorTo: "to-orange-500",
  },
];

function StatCard({ stat }: { stat: Stat }) {
  return (
    <Card accentColor={stat.accent} className="group p-6">
      <div className="flex items-center gap-4">
        <div
          className={cn(
            "mb-5 inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl shadow-md",
            `bg-linear-to-br ${stat.colorFrom} ${stat.colorTo}`,
            "text-white transition-transform duration-300 group-hover:scale-110",
          )}>
          {stat.icon}
        </div>
        <div className="flex-1">
          <div className="mb-3 text-xs font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
            {stat.label}
          </div>
          <AnimatedNumber
            value={stat.value}
            decimals={stat.decimals}
            prefix={stat.prefix}
            suffix={stat.suffix}
            className="block text-3xl font-bold tracking-tight text-gray-900 dark:text-white"
          />
        </div>
      </div>
      <p className="text-sm leading-6 text-gray-600 dark:text-white/55">
        {stat.description}
      </p>
    </Card>
  );
}

export function WhyChooseUs() {
  return (
    <section id="why-us" className="container-section">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <GhostCard
              pill
              className="mx-auto inline-flex items-center gap-2 px-4 py-2">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-500 dark:bg-cyan-400" />
              <span className="text-xs font-semibold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">
                Why choose us
              </span>
            </GhostCard>
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
