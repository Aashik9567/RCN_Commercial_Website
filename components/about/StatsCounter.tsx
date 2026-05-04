"use client";

import * as React from "react";
import {
  animate,
  useInView,
  useMotionValue,
  useMotionValueEvent,
} from "framer-motion";
import { Clock, Globe2, ShieldCheck, Users } from "lucide-react";

import { Container } from "@/components/landing/container";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type Stat = {
  icon: React.ComponentType<{ className?: string }>;
  value: number;
  suffix: string;
  label: string;
  color: string;
  colorFrom: string;
  colorTo: string;
  glowColor: string;
};

const STATS: Stat[] = [
  {
    icon: Users,
    value: 10_000,
    suffix: "+",
    label: "Happy Customers",
    color: "text-cyan-600 dark:text-cyan-300",
    colorFrom: "from-cyan-500",
    colorTo: "to-sky-500",
    glowColor: "rgba(0,229,255,0.15)",
  },
  {
    icon: Globe2,
    value: 25,
    suffix: "+",
    label: "Areas Covered",
    color: "text-violet-600 dark:text-violet-300",
    colorFrom: "from-violet-500",
    colorTo: "to-fuchsia-500",
    glowColor: "rgba(139,92,246,0.15)",
  },
  {
    icon: Clock,
    value: 14,
    suffix: " yrs",
    label: "Years of Service",
    color: "text-emerald-600 dark:text-emerald-300",
    colorFrom: "from-emerald-500",
    colorTo: "to-teal-500",
    glowColor: "rgba(16,185,129,0.15)",
  },
  {
    icon: ShieldCheck,
    value: 99.9,
    suffix: "%",
    label: "Network Uptime",
    color: "text-amber-600 dark:text-amber-300",
    colorFrom: "from-amber-500",
    colorTo: "to-orange-500",
    glowColor: "rgba(245,158,11,0.15)",
  },
];

function formatCount(value: number, target: number) {
  if (target >= 1000) {
    return value >= 1000
      ? `${Math.round(value / 1000)}k`
      : `${Math.round(value)}`;
  }
  if (target % 1 !== 0) return value.toFixed(1);
  return value.toFixed(0);
}

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const spanRef = React.useRef<HTMLSpanElement | null>(null);
  const inView = useInView(spanRef, { once: true, margin: "-80px" });

  const mv = useMotionValue(0);

  React.useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, target, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
    });
    return () => controls.stop();
  }, [inView, mv, target]);

  useMotionValueEvent(mv, "change", (latest) => {
    if (!spanRef.current) return;
    spanRef.current.textContent = `${formatCount(latest, target)}${suffix}`;
  });

  return <span ref={spanRef} aria-label={`${target}${suffix}`} />;
}

export function StatsCounter() {
  return (
    <section className="relative py-16">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-cyan-500/30 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-violet-500/30 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-linear-to-r from-cyan-500/3 via-violet-500/5 to-cyan-500/3" />

      <Container>
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <Card
              key={stat.label}
              accentColor={stat.glowColor}
              className="flex flex-col items-center gap-3 p-6 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}>
              <div
                className={cn(
                  "mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl shadow-md",
                  `bg-linear-to-br ${stat.colorFrom} ${stat.colorTo}`,
                )}>
                <stat.icon className="h-5 w-5 text-white" />
              </div>
              <div className={`text-4xl font-black ${stat.color}`}>
                <Counter target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-xs text-gray-600 dark:text-white/55">
                {stat.label}
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
