"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Cable, Globe2, Users, Zap } from "lucide-react";

import { Container } from "@/components/landing/container";
import { Card, GhostCard } from "@/components/ui/card";

const FiberRing3D = dynamic(
  () => import("./FiberRing3D").then((m) => m.FiberRing3D),
  { ssr: false, loading: () => <div className="h-125 w-full" /> },
);

const HEADLINE_WORDS = [
  "We connect",
  "communities,",
  "one fiber",
  "at a time.",
];

export function HeroSection() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, -80]);

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden py-28">
      {/* Background canvases */}

      {/* Radial spotlight + grid */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 bg-linear-to-r from-transparent via-[rgb(var(--primary))]/30 to-transparent" />
        <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-[rgb(var(--primary))]/10 blur-3xl" />
        <div className="absolute right-1/4 top-1/3 h-96 w-96 rounded-full bg-[rgb(var(--cyan))]/10 blur-3xl" />

        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgb(var(--primary) / 0.25) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--primary) / 0.25) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <Container className="relative z-10 grid items-center gap-12 lg:grid-cols-2">
        {/* Left */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}>
            <GhostCard
              pill
              className="inline-flex items-center gap-2.5 px-4 py-2"
              noHover>
              <Cable className="h-3.5 w-3.5 text-[rgb(var(--primary))]" />
              <span className="text-xs font-semibold uppercase tracking-widest text-[rgb(var(--primary))]">
                About Raghunathpur Cable Network
              </span>
            </GhostCard>
          </motion.div>

          <div className="mt-4">
            <GhostCard
              pill
              className="inline-flex items-center gap-2 px-4 py-2"
              noHover>
              <span className="h-2 w-2 rounded-full bg-[rgb(var(--primary))]" />
              <span className="text-xs font-semibold text-[rgb(var(--text-muted))]">
                Serving Sabaila Muncipality Since 2010
              </span>
            </GhostCard>
          </div>

          {/* Headline */}
          <div className="mt-7">
            {HEADLINE_WORDS.map((word, wi) => (
              <div key={wi} className="overflow-hidden">
                <motion.div
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.2 + wi * 0.12,
                    ease: [0.215, 0.61, 0.355, 1],
                  }}>
                  <span
                    className={
                      wi === 0 || wi === 2
                        ? "text-5xl font-black tracking-tight text-[rgb(var(--text))] sm:text-6xl lg:text-7xl"
                        : "bg-linear-to-r from-[rgb(var(--primary))] to-[rgb(var(--cyan))] bg-clip-text text-5xl font-black tracking-tight text-transparent sm:text-6xl lg:text-7xl"
                    }>
                    {word}{" "}
                  </span>
                </motion.div>
              </div>
            ))}
          </div>

          <motion.p
            className="mt-7 max-w-xl text-lg leading-8 text-[rgb(var(--text-muted))]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}>
            Since 2010, Raghunathpur Cable Network has been the backbone of
            digital connectivity across Raghunathpur and surrounding areas —
            delivering blazing-fast fiber internet with a community-first heart.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-wrap gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.6 }}>
            {[
              { icon: Users, label: "Customers", value: "10,000+" },
              { icon: Globe2, label: "Areas covered", value: "25+" },
              { icon: Zap, label: "Peak speed", value: "200 Mbps" },
            ].map((s) => (
              <GhostCard
                key={s.label}
                className="flex items-center gap-3 px-4 py-3"
                noHover>
                <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-[rgb(var(--primary))]/25 bg-[rgb(var(--primary))]/12">
                  <s.icon className="h-4 w-4 text-[rgb(var(--primary))]" />
                </div>
                <div>
                  <div className="rcn-mono text-sm font-semibold text-[rgb(var(--text))]">
                    {s.value}
                  </div>
                  <div className="text-xs text-[rgb(var(--text-soft))]">
                    {s.label}
                  </div>
                </div>
              </GhostCard>
            ))}
          </motion.div>

          <motion.div
            className="mt-10 flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.95, duration: 0.6 }}>
            <Link href="/plans" className="rcn-btn-secondary">
              Explore Plans
            </Link>
            <Link href="/contact" className="rcn-btn-primary">
              Get Connected
            </Link>
          </motion.div>
        </div>

        {/* Right */}
        <motion.div
          style={{ y }}
          className="relative hidden h-130 lg:block"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}>
          <Card className="absolute inset-0 rounded-3xl" noHover>
            <div />
          </Card>
          <div className="relative h-full w-full overflow-hidden rounded-3xl">
            <FiberRing3D />
          </div>

          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -right-4 top-12">
            <GhostCard className="flex items-center gap-2 px-4 py-3" noHover>
              <motion.span
                className="h-2 w-2 rounded-full bg-[rgb(var(--primary))]"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <span className="text-xs font-semibold text-[rgb(var(--text-muted))]">
                Network: All Systems Operational
              </span>
            </GhostCard>
          </motion.div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.5,
            }}
            className="absolute -left-4 bottom-20">
            <GhostCard className="flex items-center gap-2 px-4 py-3" noHover>
              <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-[rgb(var(--primary))]/25 bg-[rgb(var(--primary))]/12">
                <Zap className="h-4 w-4 text-[rgb(var(--primary))]" />
              </div>
              <span className="text-xs font-semibold text-[rgb(var(--text-muted))]">
                Fiber-grade backbone
              </span>
            </GhostCard>
          </motion.div>
        </motion.div>
      </Container>

      {/* Scroll indicator (mouse + arrow) */}
      <motion.div
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        animate={{ y: [0, 8, 0], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
        aria-hidden="true">
        <div className="flex flex-col items-center gap-2">
          <div className="relative h-10 w-6 rounded-full border border-[rgb(var(--primary))]/25 bg-[rgb(var(--surface))]/35 backdrop-blur-xl">
            <motion.div
              className="absolute left-1/2 top-2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[rgb(var(--text-soft))]"
              animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.6, repeat: Infinity }}
            />
          </div>
          <ArrowDown className="h-5 w-5 text-[rgb(var(--text-soft))]" />
        </div>
      </motion.div>
    </section>
  );
}
