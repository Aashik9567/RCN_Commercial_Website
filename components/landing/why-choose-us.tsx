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
};

const STATS: Stat[] = [
  {
    label: "Customers",
    description: "Homes & businesses connected",
    value: 10000,
    suffix: "+",
    icon: <MapPin className="h-5 w-5" />,
  },
  {
    label: "Uptime target",
    description: "Reliability you can count on",
    value: 99.9,
    decimals: 1,
    suffix: "%",
    icon: <ShieldCheck className="h-5 w-5" />,
  },
  {
    label: "Avg. install",
    description: "Quick setup & activation",
    value: 24,
    suffix: "h",
    icon: <Timer className="h-5 w-5" />,
  },
  {
    label: "Peak speed",
    description: "Plans up to",
    value: 200,
    suffix: " Mbps",
    icon: <Gauge className="h-5 w-5" />,
  },
];

function StatCard({ stat }: { stat: Stat }) {
  return (
    <Card size="md" className="group">
      <div className="flex items-center gap-4">
        <div
          className={cn(
            "mb-5 inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl",
            "border border-[rgb(var(--primary))]/25 bg-[rgb(var(--primary))]/12",
            "text-[rgb(var(--primary))] transition-transform duration-300 group-hover:scale-110",
          )}>
          {stat.icon}
        </div>
        <div className="flex-1">
          <div className="mb-3 text-xs font-semibold uppercase tracking-widest text-[rgb(var(--text-soft))]">
            {stat.label}
          </div>
          <AnimatedNumber
            value={stat.value}
            decimals={stat.decimals}
            prefix={stat.prefix}
            suffix={stat.suffix}
            className="rcn-mono block text-3xl font-semibold tracking-tight text-[rgb(var(--text))]"
          />
        </div>
      </div>
      <p className="text-sm leading-6 text-[rgb(var(--text-muted))]">
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
              <span className="h-1.5 w-1.5 rounded-full bg-[rgb(var(--primary))]" />
              <span className="text-xs font-semibold uppercase tracking-widest text-[rgb(var(--primary))]">
                Why choose us
              </span>
            </GhostCard>
            <h2 className="mt-5 text-[clamp(1.9rem,4.2vw,3rem)] font-bold tracking-tight text-[rgb(var(--text))]">
              Built for performance
            </h2>
            <p className="mt-5 text-[1.05rem] leading-8 text-[rgb(var(--text-muted))]">
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
