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

type Stat = {
  icon: React.ComponentType<{ className?: string }>;
  value: number;
  suffix: string;
  label: string;
};

const STATS: Stat[] = [
  {
    icon: Users,
    value: 10_000,
    suffix: "+",
    label: "Happy Customers",
  },
  {
    icon: Globe2,
    value: 25,
    suffix: "+",
    label: "Areas Covered",
  },
  {
    icon: Clock,
    value: 14,
    suffix: " yrs",
    label: "Years of Service",
  },
  {
    icon: ShieldCheck,
    value: 99.9,
    suffix: "%",
    label: "Network Uptime",
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
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-[rgb(var(--primary))]/30 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-[rgb(var(--primary))]/22 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-linear-to-r from-[rgb(var(--primary))]/3 via-[rgb(var(--cyan))]/4 to-[rgb(var(--primary))]/3" />

      <Container>
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <Card
              key={stat.label}
              size="md"
              className="flex flex-col items-center gap-3 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}>
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-[rgb(var(--primary))]/25 bg-[rgb(var(--primary))]/12 text-[rgb(var(--primary))]">
                <stat.icon className="h-5 w-5" />
              </div>
              <div className="rcn-mono text-4xl font-semibold text-[rgb(var(--text))]">
                <Counter target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-xs text-[rgb(var(--text-soft))]">
                {stat.label}
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
