"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Eye, Heart, Target } from "lucide-react";

import { Container } from "@/components/landing/container";

type CardDef = {
  icon: typeof Target;
  title: string;
  color: string;
  glow: string;
  border: string;
  text: string;
  tags: string[];
};

const CARDS: CardDef[] = [
  {
    icon: Target,
    title: "Our Mission",
    color: "from-cyan-400 to-sky-500",
    glow: "rgba(0,229,255,0.2)",
    border: "border-cyan-500/20 hover:border-cyan-500/40",
    text: "To deliver world-class fiber internet to every household and business in Raghunathpur — reliably, affordably, and with uncompromising support. We exist to close the digital divide, one connection at a time.",
    tags: ["Affordable", "Reliable", "Community-first"],
  },
  {
    icon: Eye,
    title: "Our Vision",
    color: "from-violet-400 to-purple-600",
    glow: "rgba(167,139,250,0.2)",
    border: "border-violet-500/20 hover:border-violet-500/40",
    text: "To become West Bengal's most trusted connectivity provider — a brand synonymous with speed, transparency, and genuine care. We envision a fully connected Raghunathpur district by 2028.",
    tags: ["Digital India", "2028 Goal", "State-wide"],
  },
  {
    icon: Heart,
    title: "Our Promise",
    color: "from-rose-400 to-pink-500",
    glow: "rgba(251,113,133,0.2)",
    border: "border-rose-500/20 hover:border-rose-500/40",
    text: "No throttling. No hidden fees. No excuses. When something breaks, we fix it — fast. Our team treats every customer like a neighbor, because in Raghunathpur, we are.",
    tags: ["No Throttling", "24/7 Support", "Transparent"],
  },
];

export function MissionVision() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} id="mission" className="relative py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 bg-linear-to-r from-transparent via-violet-500/30 to-transparent" />
      </div>

      <Container>
        <motion.div
          className="mx-auto mb-16 max-w-2xl text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}>
          <div className="inline-flex items-center gap-2 rounded-full border border-rose-500/25 bg-rose-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-rose-700 backdrop-blur dark:text-rose-300">
            <Heart className="h-3.5 w-3.5" />
            What Drives Us
          </div>
          <h2 className="mt-5 text-4xl font-black tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            Purpose-built for{" "}
            <span className="bg-linear-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
              our community
            </span>
          </h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {CARDS.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.6 }}
              whileHover={{
                y: -8,
                rotateX: 2,
                rotateY: i === 0 ? 3 : i === 2 ? -3 : 0,
              }}
              style={{ transformStyle: "preserve-3d", perspective: 1000 }}
              className={`group relative overflow-hidden rounded-3xl border bg-white/70 p-8 backdrop-blur-xl transition-all duration-300 dark:bg-white/4 ${card.border}`}>
              <div
                className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(400px circle at 50% 0%, ${card.glow}, transparent 70%)`,
                }}
              />

              <div
                className={`mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br ${card.color} shadow-lg`}>
                <card.icon className="h-7 w-7 text-white" />
              </div>

              <h3 className="mb-4 text-xl font-black text-gray-900 dark:text-white">
                {card.title}
              </h3>

              <p className="text-sm leading-7 text-gray-700 dark:text-white/55">
                {card.text}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {card.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`rounded-full border border-white/10 bg-linear-to-r ${card.color} px-3 py-1 text-xs font-semibold text-white opacity-90`}>
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
