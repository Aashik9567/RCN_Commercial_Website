"use client";

import * as React from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowRight, Wifi, Zap, Shield, Users } from "lucide-react";
import { Container } from "./container";

/* ─────────────────────────────────────────
   BackgroundGradient — layered aurora mesh
   ───────────────────────────────────────── */
function BackgroundGradient() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-[#040714]">
      {/* Grain overlay for premium texture */}
      <div
        className="absolute inset-0 opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Primary aurora — electric cyan */}
      <motion.div
        className="absolute left-[-20%] top-[-10%] h-[600px] w-[600px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(0,230,255,0.12) 0%, rgba(0,180,255,0.06) 40%, transparent 70%)",
        }}
        animate={{ x: [0, 60, 0], y: [0, 40, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Secondary aurora — violet */}
      <motion.div
        className="absolute right-[-15%] top-[5%] h-[700px] w-[700px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(120,40,255,0.14) 0%, rgba(80,20,200,0.07) 40%, transparent 70%)",
        }}
        animate={{ x: [0, -50, 0], y: [0, 60, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Tertiary aurora — deep teal */}
      <motion.div
        className="absolute bottom-[-10%] left-[30%] h-125 w-125 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(0,255,180,0.08) 0%, rgba(0,200,150,0.04) 40%, transparent 70%)",
        }}
        animate={{ x: [0, -30, 0], y: [0, -40, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Subtle grid lines — premium depth */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,230,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,230,255,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,transparent_40%,#040714_100%)]" />

      {/* Bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-[#040714] to-transparent" />
    </div>
  );
}

/* ─────────────────────────────────────────
   Animated floating fiber particles
   ───────────────────────────────────────── */
function FiberParticles() {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 8 + 6,
    delay: Math.random() * 4,
    opacity: Math.random() * 0.5 + 0.1,
  }));

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p) => (
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
   Animated 3D-ish signal rings
   ───────────────────────────────────────── */
function SignalRings() {
  return (
    <div className="relative flex items-center justify-center">
      {/* Center WiFi icon */}
      <motion.div
        className="relative z-10 flex h-20 w-20 items-center justify-center rounded-2xl border border-cyan-500/30 bg-linear-to-br from-cyan-500/20 to-violet-600/20 backdrop-blur-xl"
        animate={{ rotate: [0, 5, -5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>
        <Wifi className="h-10 w-10 text-cyan-400" />
        <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-cyan-400/10 to-violet-500/10" />
      </motion.div>

      {/* Pulsing rings */}
      {[1, 2, 3].map((ring) => (
        <motion.div
          key={ring}
          className="absolute rounded-full border border-cyan-400/20"
          style={{ width: 80 + ring * 60, height: 80 + ring * 60 }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.1, 0.3] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: ring * 0.6,
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
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/3 p-6 backdrop-blur-2xl">
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
              className="rounded-xl border border-white/[0.07] bg-white/[0.04] p-3 text-center backdrop-blur">
              <div className={`text-sm font-bold ${stat.color}`}>
                {stat.value}
              </div>
              <div className="mt-0.5 text-xs text-white/40">{stat.label}</div>
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
          className="text-5xl font-black leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl xl:text-8xl"
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
        className="mt-7 max-w-xl text-lg leading-8 text-white/55"
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
      <motion.a
        href="#get-started"
        className="group relative inline-flex h-13 items-center gap-2.5 overflow-hidden rounded-2xl bg-linear-to-r from-cyan-500 to-violet-600 px-7 font-semibold text-white shadow-[0_0_40px_rgba(0,229,255,0.3)]"
        whileHover={{ scale: 1.04, boxShadow: "0 0 60px rgba(0,229,255,0.5)" }}
        whileTap={{ scale: 0.97 }}>
        {/* Shimmer */}
        <motion.div
          className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/20 to-transparent"
          animate={{ x: ["−100%", "200%"] }}
          transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1.5 }}
        />
        Get Connected
        <motion.span
          animate={{ x: [0, 4, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}>
          <ArrowRight className="h-5 w-5" />
        </motion.span>
      </motion.a>

      {/* Secondary CTA */}
      <motion.a
        href="#pricing"
        className="inline-flex h-13 items-center gap-2 rounded-2xl border border-white/15 bg-white/6 px-7 font-semibold text-white/80 backdrop-blur-sm transition-colors hover:border-cyan-500/40 hover:bg-white/10 hover:text-white"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}>
        Explore Plans
      </motion.a>
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
          className="flex items-center gap-3 rounded-2xl border border-white/8 bg-white/[0.04] px-4 py-3 backdrop-blur-md"
          whileHover={{ scale: 1.04, borderColor: "rgba(255,255,255,0.15)" }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.8 + i * 0.1 }}>
          <div className={`rounded-xl ${t.bg} p-2.5`}>
            <t.icon className={`h-4 w-4 ${t.color}`} />
          </div>
          <div>
            <div className={`text-sm font-bold ${t.color}`}>{t.value}</div>
            <div className="text-xs text-white/40">{t.label}</div>
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
    <section
      id="home"
      className="relative min-h-screen overflow-hidden"
      style={{ fontFamily: "'DM Sans', 'Geist', sans-serif" }}>
      <BackgroundGradient />
      <FiberParticles />

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
              className="absolute -right-4 -top-4 flex items-center gap-2.5 rounded-2xl border border-white/10 bg-[#040714]/80 px-4 py-3 backdrop-blur-xl"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
              <motion.div
                className="h-2.5 w-2.5 rounded-full bg-emerald-400"
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <span className="text-xs font-semibold text-white/80">
                Network Live — All Systems Operational
              </span>
            </motion.div>

            {/* Floating badge — bottom left */}
            <motion.div
              className="absolute -bottom-4 -left-4 flex items-center gap-2.5 rounded-2xl border border-white/10 bg-[#040714]/80 px-4 py-3 backdrop-blur-xl"
              animate={{ y: [0, 8, 0] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}>
              <Zap className="h-4 w-4 text-cyan-400" />
              <span className="text-xs font-semibold text-white/80">
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
        <div className="flex h-9 w-5 items-start justify-center rounded-full border border-white/20 p-1.5">
          <motion.div
            className="h-2 w-0.5 rounded-full bg-white/60"
            animate={{ scaleY: [1, 0.3, 1], y: [0, 4, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}
