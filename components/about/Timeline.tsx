"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  Award,
  Cable,
  Globe2,
  Rocket,
  TrendingUp,
  Users,
  Wifi,
  Zap,
} from "lucide-react";

import { Container } from "@/components/landing/container";
import { Card, GhostCard } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const EVENTS = [
  {
    year: "2010",
    icon: Cable,
    title: "Founded",
    desc: "Raghunathpur Cable Network is born from a dream to bring reliable internet to underserved communities.",
    color: "from-cyan-400 to-sky-500",
  },
  {
    year: "2012",
    icon: Users,
    title: "500 Customers",
    desc: "Within two years, we crossed our first major milestone — 500 connected households.",
    color: "from-emerald-400 to-green-500",
  },
  {
    year: "2015",
    icon: Zap,
    title: "Fiber Infrastructure",
    desc: "Began transitioning from cable to full fiber-optic backbone, dramatically increasing speeds.",
    color: "from-violet-400 to-purple-500",
  },
  {
    year: "2017",
    icon: Globe2,
    title: "25 Areas Covered",
    desc: "Expanded coverage across 25 towns and villages in the Raghunathpur district.",
    color: "from-amber-400 to-orange-500",
  },
  {
    year: "2019",
    icon: Award,
    title: "Recognized",
    desc: "Known locally for stable installs, responsive support, and straightforward billing.",
    color: "from-rose-400 to-pink-500",
  },
  {
    year: "2021",
    icon: TrendingUp,
    title: "Rapid Growth",
    desc: "Work-from-home accelerated demand and pushed us to upgrade capacity and support coverage.",
    color: "from-indigo-400 to-blue-500",
  },
  {
    year: "2023",
    icon: Wifi,
    title: "200 Mbps Plans",
    desc: "Launched our flagship 200 Mbps plan — built for modern streaming and remote work.",
    color: "from-cyan-400 to-violet-500",
  },
  {
    year: "2024",
    icon: Rocket,
    title: "10,000+ Customers",
    desc: "We proudly serve thousands of families and continue expanding every month.",
    color: "from-emerald-400 to-cyan-500",
  },
] as const;

type EventDef = (typeof EVENTS)[number];

function TimelineItem({ event, index }: { event: EventDef; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      className={`relative flex items-start gap-8 ${
        isLeft ? "flex-row" : "flex-row-reverse"
      } md:gap-12`}
      initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}>
      <div className={`flex-1 ${isLeft ? "text-right" : "text-left"}`}>
        <Card
          accentColor="rgba(99,102,241,0.15)"
          className="inline-block p-6 text-left"
          whileHover={{ y: -6 }}>
          <div
            className={cn(
              "mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br shadow-md",
              event.color,
            )}>
            <event.icon className="h-5 w-5 text-white" />
          </div>
          <div
            className={`mb-3 text-xs font-semibold uppercase tracking-widest bg-linear-to-r ${event.color} bg-clip-text text-transparent`}>
            {event.year}
          </div>
          <h3 className="mb-3 text-lg font-bold text-gray-900 dark:text-white">
            {event.title}
          </h3>
          <p className="text-sm leading-6 text-gray-600 dark:text-white/55">
            {event.desc}
          </p>
        </Card>
      </div>

      <div className="relative flex flex-col items-center">
        <motion.div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-linear-to-br ${event.color} shadow-lg`}
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ delay: 0.2, type: "spring", stiffness: 300 }}>
          <event.icon className="h-5 w-5 text-white" />
        </motion.div>
      </div>

      <div className="flex-1" />
    </motion.div>
  );
}

export function Timeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 80%", "end 20%"],
  });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section ref={sectionRef} id="history" className="relative py-24 sm:py-32">
      <Container>
        <motion.div
          className="mx-auto mb-16 max-w-2xl text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}>
          <GhostCard
            pill
            className="inline-flex items-center gap-2 px-4 py-2"
            noHover>
            <TrendingUp className="h-3.5 w-3.5" />
            <span className="text-xs font-semibold uppercase tracking-widest text-amber-700 dark:text-amber-300">
              Our Journey
            </span>
          </GhostCard>
          <h2 className="mt-5 text-4xl font-black tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            14 years of{" "}
            <span className="bg-linear-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
              connecting lives
            </span>
          </h2>
        </motion.div>

        <div className="relative">
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 overflow-hidden md:block">
            <div className="h-full w-full bg-gray-200/60 dark:bg-white/8" />
            <motion.div
              className="absolute inset-0 bg-linear-to-b from-cyan-500 via-violet-500 to-emerald-500"
              style={{ scaleY, transformOrigin: "top" }}
            />
          </div>

          <div className="flex flex-col gap-12 md:gap-16">
            {EVENTS.map((event, i) => (
              <TimelineItem key={event.year} event={event} index={i} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
