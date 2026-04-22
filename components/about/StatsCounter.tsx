"use client";

import * as React from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
} from "framer-motion";
import { Clock, Globe2, ShieldCheck, Users } from "lucide-react";

import { Container } from "@/components/landing/container";

type Stat = {
  icon: React.ComponentType<{ className?: string }>;
  value: number;
  suffix: string;
  label: string;
  color: string;
  bg: string;
};

const STATS: Stat[] = [
  {
    icon: Users,
    value: 10_000,
    suffix: "+",
    label: "Happy Customers",
    color: "text-cyan-600 dark:text-cyan-300",
    bg: "bg-cyan-500/10",
  },
  {
    icon: Globe2,
    value: 25,
    suffix: "+",
    label: "Areas Covered",
    color: "text-violet-600 dark:text-violet-300",
    bg: "bg-violet-500/10",
  },
  {
    icon: Clock,
    value: 14,
    suffix: " yrs",
    label: "Years of Service",
    color: "text-emerald-600 dark:text-emerald-300",
    bg: "bg-emerald-500/10",
  },
  {
    icon: ShieldCheck,
    value: 99.9,
    suffix: "%",
    label: "Network Uptime",
    color: "text-amber-600 dark:text-amber-300",
    bg: "bg-amber-500/10",
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
            <motion.div
              key={stat.label}
              className="flex flex-col items-center gap-3 rounded-2xl border border-gray-200/80 bg-white/70 p-6 text-center backdrop-blur dark:border-white/8 dark:bg-white/4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -4, scale: 1.02 }}>
              <div className={`rounded-2xl ${stat.bg} p-3`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div className={`text-4xl font-black ${stat.color}`}>
                <Counter target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-sm font-medium text-gray-700 dark:text-white/50">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
