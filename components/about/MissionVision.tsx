"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Eye, Heart, Target } from "lucide-react";

import { Container } from "@/components/landing/container";
import { Card, GhostCard } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type CardDef = {
  icon: typeof Target;
  title: string;
  color: string;
  accent: string;
  text: string;
  tags: string[];
};

const CARDS: CardDef[] = [
  {
    icon: Target,
    title: "Our Mission",
    color: "from-cyan-400 to-sky-500",
    accent: "rgba(0,229,255,0.18)",
    text: "To deliver world-class fiber internet to every household and business in Raghunathpur — reliably, affordably, and with uncompromising support. We exist to close the digital divide, one connection at a time.",
    tags: ["Affordable", "Reliable", "Community-first"],
  },
  {
    icon: Eye,
    title: "Our Vision",
    color: "from-violet-400 to-purple-600",
    accent: "rgba(139,92,246,0.18)",
    text: "To become West Bengal's most trusted connectivity provider — a brand synonymous with speed, transparency, and genuine care. We envision a fully connected Raghunathpur district by 2028.",
    tags: ["Digital India", "2028 Goal", "State-wide"],
  },
  {
    icon: Heart,
    title: "Our Promise",
    color: "from-rose-400 to-pink-500",
    accent: "rgba(244,63,94,0.18)",
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
          <GhostCard
            pill
            className="inline-flex items-center gap-2 px-4 py-2"
            noHover>
            <Heart className="h-3.5 w-3.5" />
            <span className="text-xs font-semibold uppercase tracking-widest text-rose-700 dark:text-rose-300">
              What Drives Us
            </span>
          </GhostCard>
          <h2 className="mt-5 text-4xl font-black tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            Purpose-built for{" "}
            <span className="bg-linear-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
              our community
            </span>
          </h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {CARDS.map((card, i) => (
            <Card
              key={card.title}
              accentColor={card.accent}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.6 }}
              className="group h-full p-8">
              <div
                className={cn(
                  "mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br shadow-md transition-transform duration-300 group-hover:scale-110",
                  card.color,
                )}>
                <card.icon className="h-5 w-5 text-white" />
              </div>

              <h3 className="mb-3 text-lg font-bold text-gray-900 dark:text-white">
                {card.title}
              </h3>

              <p className="text-sm leading-6 text-gray-600 dark:text-white/55">
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
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
