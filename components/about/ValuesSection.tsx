"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Award,
  Headphones,
  Heart,
  Lock,
  ShieldCheck,
  TrendingUp,
  Zap,
} from "lucide-react";

import { Container } from "@/components/landing/container";
import { Card, GhostCard } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type ValueDef = {
  icon: typeof Zap;
  title: string;
  desc: string;
  color: string;
};

const VALUES: ValueDef[] = [
  {
    icon: Zap,
    title: "Speed First",
    desc: "We engineer for performance, not promises. Every upgrade we make starts with asking: how can we go faster?",
    color: "from-cyan-400 to-sky-500",
  },
  {
    icon: ShieldCheck,
    title: "Unwavering Reliability",
    desc: "99.9% uptime isn't a marketing claim — it's our engineering standard and our personal commitment.",
    color: "from-emerald-400 to-green-500",
  },
  {
    icon: Headphones,
    title: "Human Support",
    desc: "Real people pick up the phone. Every support call is answered by someone who knows Raghunathpur.",
    color: "from-violet-400 to-purple-500",
  },
  {
    icon: Heart,
    title: "Community Roots",
    desc: "We live here too. Every decision we make considers the impact on our neighbors, not just our bottom line.",
    color: "from-rose-400 to-pink-500",
  },
  {
    icon: Lock,
    title: "Transparency",
    desc: "Your bill is exactly what we quoted. No hidden fees, no surprise charges, no fine print trickery.",
    color: "from-amber-400 to-orange-500",
  },
  {
    icon: TrendingUp,
    title: "Constant Growth",
    desc: "We reinvest in infrastructure every year. The network you join today will be faster next year.",
    color: "from-indigo-400 to-blue-500",
  },
];

const valueAccentMap: Record<string, string> = {
  "Speed First": "rgba(0,229,255,0.18)",
  "Unwavering Reliability": "rgba(16,185,129,0.18)",
  "Human Support": "rgba(139,92,246,0.18)",
  "Community Roots": "rgba(244,63,94,0.18)",
  Transparency: "rgba(245,158,11,0.18)",
  "Constant Growth": "rgba(99,102,241,0.18)",
};

export function ValuesSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} id="values" className="relative py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-0 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-indigo-500/5 blur-3xl" />
      </div>

      <Container>
        <motion.div
          className="mx-auto mb-16 max-w-2xl text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}>
          <GhostCard
            pill
            className="inline-flex items-center gap-2 px-4 py-2"
            noHover>
            <Award className="h-3.5 w-3.5" />
            <span className="text-xs font-semibold uppercase tracking-widest text-emerald-700 dark:text-emerald-300">
              Our Core Values
            </span>
          </GhostCard>
          <h2 className="mt-5 text-4xl font-black tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            Built on{" "}
            <span className="bg-linear-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              principles that last
            </span>
          </h2>
          <p className="mt-5 text-lg text-gray-700 dark:text-white/45">
            Six values that guide every decision — from network upgrades to
            customer support calls.
          </p>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {VALUES.map((v, i) => (
            <Card
              key={v.title}
              accentColor={valueAccentMap[v.title] ?? "rgba(99,102,241,0.18)"}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="group p-6">
              <div
                className={cn(
                  "mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br shadow-md transition-transform duration-300 group-hover:scale-110",
                  v.color,
                )}>
                <v.icon className="h-5 w-5 text-white" />
              </div>
              <h3 className="mb-3 text-lg font-bold text-gray-900 dark:text-white">
                {v.title}
              </h3>
              <p className="text-sm leading-6 text-gray-600 dark:text-white/55">
                {v.desc}
              </p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
