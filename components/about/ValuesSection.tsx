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
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-emerald-700 backdrop-blur-xl dark:text-emerald-300">
            <Award className="h-3.5 w-3.5" />
            Our Core Values
          </div>
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
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="group relative rounded-2xl border border-gray-200/80 bg-white/70 p-6 backdrop-blur-xl transition-all dark:border-white/8 dark:bg-white/4">
              <div
                className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br ${v.color} shadow-md`}>
                <v.icon className="h-5 w-5 text-white" />
              </div>
              <h3 className="mb-2 text-base font-bold text-gray-900 dark:text-white">
                {v.title}
              </h3>
              <p className="text-sm leading-6 text-gray-700 dark:text-white/50">
                {v.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
