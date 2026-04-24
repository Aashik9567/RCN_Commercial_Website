"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import {
  ArrowRight,
  Zap,
  ShieldCheck,
  Users,
  Globe2,
  Wifi,
} from "lucide-react";
import { Container } from "@/components/layout/container";
import { OrbWrapper } from "@/components/ui/orb/OrbWrapper";

/* ─── Trust badge strip ─────────────────────────────── */
const TRUST = [
  {
    icon: Zap,
    value: "200 Mbps",
    label: "Peak Speed",
    color: "text-cyan-600 dark:text-cyan-400",
    bg: "bg-cyan-500/10",
  },
  {
    icon: ShieldCheck,
    value: "99.9%",
    label: "Uptime SLA",
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-500/10",
  },
  {
    icon: Users,
    value: "10K+",
    label: "Happy Customers",
    color: "text-violet-600 dark:text-violet-400",
    bg: "bg-violet-500/10",
  },
];

const HEADLINE = ["Lightning-fast", "fiber internet"];

/* ─── Hero ──────────────────────────────────────────── */
export function Hero() {
  const { scrollY } = useScroll();
  // Parallax the right column upward on scroll
  const rawY = useTransform(scrollY, [0, 600], [0, -70]);
  const smoothY = useSpring(rawY, { stiffness: 70, damping: 18 });

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden py-28 lg:py-32">
      {/* ── Subtle page-level background decoration ──────── */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        {/* Faint grid */}
        <div
          className="absolute inset-0 opacity-[0.025] dark:opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(99,102,241,1) 1px, transparent 1px)," +
              "linear-gradient(90deg, rgba(99,102,241,1) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
        {/* Top hairline */}
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-cyan-500/30 to-transparent" />
        {/* Radial spots */}
        <div className="absolute right-0 top-1/4 h-150 w-150 -translate-y-1/4 rounded-full bg-violet-500/6 blur-3xl" />
        <div className="absolute left-0 bottom-1/4 h-100 w-100 translate-y-1/4 rounded-full bg-cyan-500/6 blur-3xl" />
      </div>

      <Container className="relative grid w-full items-center gap-14 lg:grid-cols-2 xl:gap-20">
        {/* ── LEFT: Copy ───────────────────────────────────── */}
        <div>
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="inline-flex items-center gap-2.5 rounded-full border border-cyan-500/25 bg-cyan-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">
            <motion.span
              className="h-1.5 w-1.5 rounded-full bg-cyan-500"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            Raghunathpur Cable Network
          </motion.div>

          {/* Headline — word-by-word clip reveal */}
          <div className="mt-7 space-y-1">
            {HEADLINE.map((line, li) => (
              <div key={li} className="overflow-hidden">
                <motion.h1
                  className={
                    li === 0
                      ? "text-5xl font-black leading-[1.05] tracking-tight text-gray-900 dark:text-white sm:text-6xl lg:text-7xl"
                      : "text-5xl font-black leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl bg-linear-to-r from-cyan-500 via-sky-400 to-violet-500 bg-clip-text text-transparent"
                  }
                  initial={{ y: "105%" }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.15 + li * 0.13,
                    ease: [0.215, 0.61, 0.355, 1],
                  }}>
                  {line}
                </motion.h1>
              </div>
            ))}
          </div>

          {/* Subheading */}
          <motion.p
            className="mt-7 max-w-xl text-lg leading-8 text-gray-600 dark:text-white/55"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}>
            Blazing-fast fiber connectivity with transparent pricing, zero
            throttling, and local support that actually picks up — built for the
            people of Raghunathpur.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            className="mt-9 flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.62, duration: 0.6 }}>
            {/* Primary */}
            <motion.a
              href="#get-started"
              className="group relative inline-flex h-13 items-center gap-2.5 overflow-hidden rounded-2xl bg-linear-to-r from-cyan-500 to-violet-600 px-7 font-semibold text-white"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}>
              {/* Shimmer sweep */}
              <motion.div
                className="pointer-events-none absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/25 to-transparent"
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 2 }}
              />
              <Zap className="h-4 w-4" />
              Get Connected
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}>
                <ArrowRight className="h-4 w-4" />
              </motion.span>
            </motion.a>

            {/* Secondary */}
            <motion.a
              href="#pricing"
              className="inline-flex h-13 items-center gap-2 rounded-2xl border border-gray-300/80 bg-white/70 px-7 font-semibold text-gray-800 backdrop-blur-xl transition-colors hover:border-cyan-400/50 hover:bg-white/90 hover:text-cyan-700 dark:border-white/15 dark:bg-white/6 dark:text-white/80 dark:hover:border-cyan-500/40 dark:hover:text-white"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}>
              Explore Plans
            </motion.a>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            className="mt-12 flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.78, duration: 0.6 }}>
            {TRUST.map((t, i) => (
              <motion.div
                key={t.label}
                className="flex items-center gap-3 rounded-2xl border border-gray-200/80 bg-white/70 px-4 py-3 backdrop-blur-xl dark:border-white/8 dark:bg-white/4"
                whileHover={{ scale: 1.04 }}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.85 + i * 0.08 }}>
                <div className={`rounded-xl ${t.bg} p-2.5`}>
                  <t.icon className={`h-4 w-4 ${t.color}`} />
                </div>
                <div>
                  <div className={`text-sm font-black ${t.color}`}>
                    {t.value}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-white/40">
                    {t.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ── RIGHT: Orb visual ────────────────────────────── */}
        <motion.div
          style={{ y: smoothY }}
          className="relative hidden lg:flex lg:items-center lg:justify-center"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.9,
            delay: 0.2,
            ease: [0.215, 0.61, 0.355, 1],
          }}>
          <div className="relative h-130 w-130">
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.08)_0%,transparent_70%)]" />

            <OrbWrapper
              hue={220}
              hoverIntensity={0.5}
              rotateOnHover={true}
              forceHoverState={false}
            />

            {/* Floating badge — top right */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-6 top-10 flex items-center gap-2.5 rounded-2xl border border-gray-200/80 bg-white/90 px-4 py-3 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-black/50">
              <motion.span
                className="h-2 w-2 rounded-full bg-emerald-400"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <span className="text-xs font-semibold text-gray-800 dark:text-white/80">
                Network Live — All Operational
              </span>
            </motion.div>

            {/* Floating badge — bottom left */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.2,
              }}
              className="absolute -left-6 bottom-16 flex items-center gap-2.5 rounded-2xl border border-gray-200/80 bg-white/90 px-4 py-3 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-black/50">
              <Wifi className="h-4 w-4 text-cyan-500" />
              <span className="text-xs font-semibold text-gray-800 dark:text-white/80">
                Fiber-optic backbone
              </span>
            </motion.div>

            {/* Floating badge — bottom right */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2,
              }}
              className="absolute -right-3 bottom-10 flex items-center gap-2 rounded-2xl border border-gray-200/80 bg-white/90 px-3 py-2.5 shadow-lg backdrop-blur-xl dark:border-white/10 dark:bg-black/50">
              <Globe2 className="h-3.5 w-3.5 text-violet-500" />
              <span className="text-xs font-semibold text-gray-800 dark:text-white/80">
                25+ Areas
              </span>
            </motion.div>
          </div>
        </motion.div>
      </Container>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0], opacity: [0.4, 0.9, 0.4] }}
        transition={{ duration: 2.2, repeat: Infinity }}>
        <div className="flex h-9 w-5 items-start justify-center rounded-full border border-gray-400/30 p-1.5 dark:border-white/20">
          <motion.div
            className="h-2 w-0.5 rounded-full bg-gray-500 dark:bg-white/60"
            animate={{ scaleY: [1, 0.3, 1], y: [0, 4, 0] }}
            transition={{ duration: 2.2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}
