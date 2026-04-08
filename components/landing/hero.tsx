"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowRight, Zap, Shield, Users } from "lucide-react";
import { Container } from "./container";


/* ─────────────────────────────────────────
   Animated floating fiber particles
   ───────────────────────────────────────── */
type FiberParticle = {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
};

function seededUnit(seed: number) {
  const x = Math.sin(seed) * 10_000;
  return x - Math.floor(x);
}

const FIBER_PARTICLES: FiberParticle[] = Array.from({ length: 20 }, (_, i) => {
  const s = i + 1;
  return {
    id: i,
    x: seededUnit(s * 12.9898) * 100,
    y: seededUnit(s * 78.233) * 100,
    size: seededUnit(s * 39.3467) * 3 + 1,
    duration: seededUnit(s * 11.1351) * 8 + 6,
    delay: seededUnit(s * 91.8732) * 4,
    opacity: seededUnit(s * 54.345) * 0.5 + 0.1,
  };
});

function FiberParticles() {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {FIBER_PARTICLES.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-cyan-400"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
          }}
          animate={{
            y: [0, -40, 0],
            opacity: [p.opacity, p.opacity * 2.5, p.opacity],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────
   Network visualization SVG (enhanced)
   ───────────────────────────────────────── */
function NetworkVisualization() {
  const nodes = [
    { cx: 320, cy: 200, r: 18, label: "Core" },
    { cx: 160, cy: 120, r: 12 },
    { cx: 480, cy: 100, r: 12 },
    { cx: 100, cy: 280, r: 10 },
    { cx: 540, cy: 280, r: 10 },
    { cx: 220, cy: 320, r: 10 },
    { cx: 420, cy: 330, r: 10 },
    { cx: 280, cy: 80, r: 8 },
  ];

  const edges = [
    [320, 200, 160, 120],
    [320, 200, 480, 100],
    [320, 200, 100, 280],
    [320, 200, 540, 280],
    [320, 200, 220, 320],
    [320, 200, 420, 330],
    [160, 120, 280, 80],
    [160, 120, 100, 280],
    [480, 100, 280, 80],
    [480, 100, 540, 280],
    [220, 320, 100, 280],
    [420, 330, 540, 280],
  ];

  return (
    <div className="relative w-full">
      {/* Glassmorphism card */}
      <div className="relative overflow-hidden rounded-3xl border border-(--border-card) bg-(--bg-card) p-6 shadow-sm backdrop-blur-2xl">
        {/* Inner glow */}
        <div className="pointer-events-none absolute inset-0 rounded-3xl bg-linear-to-br from-cyan-500/5 via-transparent to-violet-500/5" />

        <svg
          viewBox="0 0 640 420"
          className="w-full"
          xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <linearGradient id="edgeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00e5ff" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.6" />
            </linearGradient>
          </defs>

          {/* Animated data-flow dots on edges */}
          {edges.map(([x1, y1, x2, y2], i) => (
            <g key={i}>
              <line
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="url(#edgeGrad)"
                strokeWidth="1.5"
                opacity="0.35"
              />
              <motion.circle
                r="3"
                fill="#00e5ff"
                filter="url(#glow)"
                opacity="0.8"
                initial={{ offsetDistance: "0%" }}
                animate={{ offsetDistance: ["0%", "100%"] }}
                transition={{
                  duration: 2 + (i % 3),
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "linear",
                }}
                style={{
                  offsetPath: `path("M${x1},${y1} L${x2},${y2}")`,
                }}
              />
            </g>
          ))}

          {/* Nodes */}
          {nodes.map((n, i) => (
            <motion.g
              key={i}
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.4 }}
              style={{ transformOrigin: `${n.cx}px ${n.cy}px` }}>
              <circle
                cx={n.cx}
                cy={n.cy}
                r={n.r + 8}
                fill="rgba(0,229,255,0.05)"
              />
              <circle
                cx={n.cx}
                cy={n.cy}
                r={n.r}
                fill="rgba(0,229,255,0.12)"
                stroke="#00e5ff"
                strokeWidth="1.5"
                opacity="0.8"
                filter="url(#glow)"
              />
              <circle
                cx={n.cx}
                cy={n.cy}
                r={Math.max(3, n.r - 8)}
                fill="#00e5ff"
                opacity="0.6"
              />
            </motion.g>
          ))}
        </svg>

        {/* Live stats bar */}
        <div className="mt-4 grid grid-cols-3 gap-3">
          {[
            { label: "Latency", value: "< 5ms", color: "text-cyan-400" },
            { label: "Uptime", value: "99.9%", color: "text-emerald-400" },
            { label: "Speed", value: "200 Mbps", color: "text-violet-400" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-(--border-card) bg-(--bg-card) p-3 text-center backdrop-blur">
              <div className={`text-sm font-bold ${stat.color}`}>
                {stat.value}
              </div>
              <div className="mt-0.5 text-xs text-(--text-muted)">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   HeroText — staggered reveal
   ───────────────────────────────────────── */
function HeroText() {
  const words = ["Lightning-fast", "fiber internet"];
  return (
    <div>
      {/* Eyebrow */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="inline-flex items-center gap-2.5 rounded-full border border-cyan-500/25 bg-cyan-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-cyan-400">
        <motion.span
          className="h-1.5 w-1.5 rounded-full bg-cyan-400"
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        Raghunathpur Cable Network — Est. 2010
      </motion.div>

      {/* Headline */}
      <div className="mt-7">
        <motion.h1
          className="text-5xl font-black leading-[1.05] tracking-tight text-gray-900 dark:text-white sm:text-6xl lg:text-7xl xl:text-8xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}>
          {words.map((word, wi) => (
            <span key={wi} className="block">
              {word.split("").map((char, ci) => (
                <motion.span
                  key={ci}
                  className={
                    wi === 1
                      ? "bg-linear-to-r from-cyan-400 via-sky-300 to-violet-400 bg-clip-text text-transparent"
                      : ""
                  }
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.2 + wi * 0.1 + ci * 0.025,
                    ease: [0.215, 0.61, 0.355, 1],
                  }}>
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </span>
          ))}
        </motion.h1>
      </div>

      {/* Subheading */}
      <motion.p
        className="mt-7 max-w-xl text-lg leading-8 text-gray-600 dark:text-white/55"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.45 }}>
        Blazing-fast fiber connectivity with transparent pricing, zero
        throttling, and local support that actually picks up. Built for
        Raghunathpur.
      </motion.p>
    </div>
  );
}

/* ─────────────────────────────────────────
   CTAButtons — magnetic hover micro-interaction
   ───────────────────────────────────────── */
function CTAButtons() {
  return (
    <motion.div
      className="mt-9 flex flex-wrap items-center gap-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}>
      {/* Primary CTA */}
      <motion.div
        whileHover={{ scale: 1.04, boxShadow: "0 0 60px rgba(0,229,255,0.5)" }}
        whileTap={{ scale: 0.97 }}>
        <Link
          href="/contact"
          className="group relative inline-flex h-13 items-center gap-2.5 overflow-hidden rounded-2xl bg-linear-to-r from-cyan-500 to-violet-600 px-7 font-semibold text-white shadow-[0_0_40px_rgba(0,229,255,0.3)]">
          {/* Shimmer */}
          <motion.div
            className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/20 to-transparent"
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1.5 }}
          />
          Get Connected
          <motion.span
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}>
            <ArrowRight className="h-5 w-5" />
          </motion.span>
        </Link>
      </motion.div>

      {/* Secondary CTA */}
      <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
        <Link
          href="/plans"
          className={[
            "inline-flex h-13 items-center gap-2 rounded-2xl border px-7 font-semibold backdrop-blur-sm transition-colors",
            "border-(--border-card) bg-(--bg-card) text-(--text-primary) hover:border-indigo-300 hover:bg-(--bg-card-hover)",
          ].join(" ")}>
          Explore Plans
        </Link>
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   Trust badges
   ───────────────────────────────────────── */
const TRUST = [
  {
    icon: Zap,
    value: "200 Mbps",
    label: "Peak Speed",
    color: "text-cyan-400",
    bg: "bg-cyan-400/10",
  },
  {
    icon: Shield,
    value: "99.9%",
    label: "Uptime SLA",
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
  },
  {
    icon: Users,
    value: "10K+",
    label: "Happy Customers",
    color: "text-violet-400",
    bg: "bg-violet-400/10",
  },
];

function TrustBadges() {
  return (
    <motion.div
      className="mt-12 flex flex-wrap gap-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.75 }}>
      {TRUST.map((t, i) => (
        <motion.div
          key={t.label}
          className="flex items-center gap-3 rounded-2xl border border-(--border-card) bg-(--bg-card) px-4 py-3 shadow-sm backdrop-blur-md"
          whileHover={{ scale: 1.04, borderColor: "rgba(255,255,255,0.15)" }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.8 + i * 0.1 }}>
          <div className={`rounded-xl ${t.bg} p-2.5`}>
            <t.icon className={`h-4 w-4 ${t.color}`} />
          </div>
          <div>
            <div className={`text-sm font-bold ${t.color}`}>{t.value}</div>
            <div className="text-xs text-(--text-muted)">{t.label}</div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   Hero — main export
   ───────────────────────────────────────── */
export function Hero() {
  const { scrollY } = useScroll();
  // Parallax: right column floats up as user scrolls
  const y = useTransform(scrollY, [0, 500], [0, -60]);
  const smoothY = useSpring(y, { stiffness: 80, damping: 20 });

  return (
    <section id="home" className="relative min-h-screen overflow-hidden">


      <Container className="relative flex min-h-screen items-center py-28 lg:py-32">
        <div className="grid w-full items-center gap-14 lg:grid-cols-[1fr_1fr] xl:gap-20">
          {/* LEFT: Copy */}
          <div>
            <HeroText />
            <CTAButtons />
            <TrustBadges />
          </div>

          {/* RIGHT: Visual */}
          <motion.div
            style={{ y: smoothY }}
            className="relative hidden lg:block">
            {/* Floating glow behind illustration */}
            <div className="absolute inset-0 -z-10 scale-110 rounded-3xl bg-[radial-gradient(ellipse_at_center,rgba(0,229,255,0.12)_0%,transparent_70%)]" />

            <NetworkVisualization />

            {/* Floating badge — top right */}
            <motion.div
              className="absolute -right-4 -top-4 flex items-center gap-2.5 rounded-2xl border border-(--border-card) bg-(--bg-card) px-4 py-3 backdrop-blur-xl"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
              <motion.div
                className="h-2.5 w-2.5 rounded-full bg-emerald-400"
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <span className="text-xs font-semibold text-gray-900 dark:text-white/80">
                Network Live — All Systems Operational
              </span>
            </motion.div>

            {/* Floating badge — bottom left */}
            <motion.div
              className="absolute -bottom-4 -left-4 flex items-center gap-2.5 rounded-2xl border border-(--border-card) bg-(--bg-card) px-4 py-3 backdrop-blur-xl"
              animate={{ y: [0, 8, 0] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}>
              <Zap className="h-4 w-4 text-cyan-400" />
              <span className="text-xs font-semibold text-gray-900 dark:text-white/80">
                Fiber optic backbone
              </span>
            </motion.div>
          </motion.div>
        </div>
      </Container>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}>
        <div className="flex h-9 w-5 items-start justify-center rounded-full border border-gray-400/40 p-1.5 dark:border-white/20">
          <motion.div
            className="h-2 w-0.5 rounded-full bg-gray-800/50 dark:bg-white/60"
            animate={{ scaleY: [1, 0.3, 1], y: [0, 4, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}
