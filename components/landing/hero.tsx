"use client";

import Link from "next/link";
import { ArrowRight, MapPin, Zap, Shield, Wifi, Activity } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

import { Container } from "@/components/landing/container";
import { Reveal } from "@/components/landing/reveal";
import { CountUp } from "@/components/ui/CountUp";
import { business } from "@/data/business";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { t } from "@/lib/i18n";

// ─── Solar System CSS ─────────────────────────────────────────────────────────

const SOLAR_CSS = `
  .ss-root {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* Starfield */
  .ss-star {
    position: absolute;
    border-radius: 50%;
    background: #ffffff;
    animation: ss-twinkle var(--tw-dur, 3s) ease-in-out infinite;
    animation-delay: var(--tw-delay, 0s);
  }
  @keyframes ss-twinkle {
    0%, 100% { opacity: 0.15; transform: scale(1); }
    50%       { opacity: 0.9;  transform: scale(1.4); }
  }

  /* Sun */
  .ss-sun-wrap {
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    z-index: 10;
  }
  .ss-sun {
    width: 56px; height: 56px;
    border-radius: 50%;
    background: radial-gradient(circle at 38% 35%, #6ee7b7, #10b981 45%, #059669 80%);
    box-shadow:
      0 0 0 6px rgba(16,185,129,0.12),
      0 0 24px 8px rgba(16,185,129,0.35),
      0 0 56px 16px rgba(16,185,129,0.18);
    animation: ss-sun-pulse 3s ease-in-out infinite;
    cursor: pointer;
    z-index: 10;
  }
  @keyframes ss-sun-pulse {
    0%,100% { box-shadow: 0 0 0 6px rgba(16,185,129,0.12), 0 0 24px 8px rgba(16,185,129,0.35), 0 0 56px 16px rgba(16,185,129,0.18); }
    50%      { box-shadow: 0 0 0 10px rgba(16,185,129,0.18), 0 0 36px 14px rgba(16,185,129,0.5),  0 0 72px 24px rgba(16,185,129,0.22); }
  }
  .ss-corona {
    position: absolute;
    top: 50%; left: 50%;
    border-radius: 50%;
    border: 1px solid rgba(16,185,129,0.25);
    transform: translate(-50%,-50%);
    animation: ss-corona-expand 3s ease-out infinite;
  }
  .ss-corona-1 { width: 70px; height: 70px; animation-delay: 0s; }
  .ss-corona-2 { width: 70px; height: 70px; animation-delay: 1s; }
  .ss-corona-3 { width: 70px; height: 70px; animation-delay: 2s; }
  @keyframes ss-corona-expand {
    0%   { width: 64px; height: 64px; opacity: 0.7; }
    100% { width: 110px; height: 110px; opacity: 0; }
  }

  /* Orbits */
  .ss-orbit-ring {
    position: absolute;
    top: 50%; left: 50%;
    border-radius: 50%;
    border: 1px solid rgba(255,255,255,0.07);
    transform: translate(-50%,-50%);
    pointer-events: none;
  }

  /* Orbit tracks that rotate */
  .ss-orbit-track {
    position: absolute;
    top: 50%; left: 50%;
    border-radius: 50%;
    transform: translate(-50%,-50%);
  }
  .ss-orbit-track-1 { animation: ss-orbit linear infinite 8s; }
  .ss-orbit-track-2 { animation: ss-orbit linear infinite 15s; }
  .ss-orbit-track-3 { animation: ss-orbit linear infinite 25s; }
  @keyframes ss-orbit { from { transform: translate(-50%,-50%) rotate(0deg); } to { transform: translate(-50%,-50%) rotate(360deg); } }

  .ss-root:hover .ss-orbit-track-1,
  .ss-root:hover .ss-orbit-track-2,
  .ss-root:hover .ss-orbit-track-3 {
    animation-play-state: paused;
  }

  /* Planet wrapper — counter-rotates so label stays upright */
  .ss-planet-wrap {
    position: absolute;
    top: 0; left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    cursor: pointer;
  }
  .ss-orbit-track-1 .ss-planet-wrap { animation: ss-counter linear infinite 8s; }
  .ss-orbit-track-2 .ss-planet-wrap { animation: ss-counter linear infinite 15s; }
  .ss-orbit-track-3 .ss-planet-wrap { animation: ss-counter linear infinite 25s; }
  @keyframes ss-counter { from { transform: translateX(-50%) rotate(0deg); } to { transform: translateX(-50%) rotate(-360deg); } }

  /* Planet orb */
  .ss-planet {
    border-radius: 50%;
    transition: transform 0.25s ease, box-shadow 0.25s ease;
    position: relative;
  }
  .ss-planet-wrap:hover .ss-planet {
    transform: scale(1.35);
  }

  /* Tooltip */
  .ss-tooltip {
    position: absolute;
    bottom: calc(100% + 10px);
    left: 50%;
    transform: translateX(-50%) translateY(4px);
    background: rgba(10,14,26,0.92);
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: 8px;
    padding: 6px 10px;
    white-space: nowrap;
    font-size: 11px;
    font-weight: 600;
    color: #ffffff;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.2s ease, transform 0.2s ease;
    backdrop-filter: blur(8px);
  }
  .ss-planet-wrap:hover .ss-tooltip {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }

  /* Planet label */
  .ss-planet-label {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.05em;
    opacity: 0.8;
    white-space: nowrap;
  }

  /* Data packet dots */
  .ss-packet {
    position: absolute;
    width: 5px; height: 5px;
    border-radius: 50%;
    top: 0; left: 50%;
    margin-left: -2.5px;
  }
  .ss-orbit-track-1 .ss-packet { animation: ss-counter linear infinite 8s; animation-delay: -4s; }
  .ss-orbit-track-2 .ss-packet { animation: ss-counter linear infinite 15s; animation-delay: -7s; }
  .ss-orbit-track-3 .ss-packet { animation: ss-counter linear infinite 25s; animation-delay: -12s; }

  /* RCN label on sun */
  .ss-sun-label {
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    font-size: 10px;
    font-weight: 800;
    color: #fff;
    letter-spacing: 0.08em;
    pointer-events: none;
    z-index: 11;
    text-shadow: 0 1px 4px rgba(0,0,0,0.5);
  }
`;

// ─── Stars ────────────────────────────────────────────────────────────────────

const STARS = Array.from({ length: 52 }, (_, i) => ({
  id: i,
  top:  `${Math.random() * 100}%`,
  left: `${Math.random() * 100}%`,
  size: Math.random() * 2 + 1,
  dur:  `${2 + Math.random() * 3}s`,
  delay: `${Math.random() * 4}s`,
}));

// ─── Solar System ─────────────────────────────────────────────────────────────

function SolarSystem() {
  const W = 420;

  const ORBITS = [
    {
      r: 90,
      planet: {
        size: 18,
        bg: "radial-gradient(circle at 35% 30%, #67e8f9, #06b6d4 60%, #0891b2)",
        glow: "0 0 12px 4px rgba(6,182,212,0.6), 0 0 24px 8px rgba(6,182,212,0.25)",
        label: "1 Gbps",
        color: "#06b6d4",
        tooltip: "⚡ Fiber Speed — up to 200 Mbps",
        packet: "rgba(6,182,212,0.9)",
      },
      cls: "ss-orbit-track-1",
    },
    {
      r: 148,
      planet: {
        size: 22,
        bg: "radial-gradient(circle at 35% 30%, #86efac, #22c55e 60%, #15803d)",
        glow: "0 0 14px 5px rgba(34,197,94,0.55), 0 0 28px 10px rgba(34,197,94,0.2)",
        label: "99.9%",
        color: "#22c55e",
        tooltip: "🛡 Uptime SLA — 99.9%",
        packet: "rgba(34,197,94,0.9)",
      },
      cls: "ss-orbit-track-2",
    },
    {
      r: 195,
      planet: {
        size: 16,
        bg: "radial-gradient(circle at 35% 30%, #fde68a, #d4a853 60%, #92400e)",
        glow: "0 0 12px 4px rgba(212,168,83,0.55), 0 0 24px 8px rgba(212,168,83,0.2)",
        label: "25+ Areas",
        color: "#d4a853",
        tooltip: "📡 Coverage — 25+ areas",
        packet: "rgba(212,168,83,0.9)",
      },
      cls: "ss-orbit-track-3",
    },
  ];

  return (
    <>
      <style>{SOLAR_CSS}</style>
      <div
        className="ss-root select-none"
        style={{
          width: "100%",
          height: "100%",
          background:
            "radial-gradient(ellipse 80% 70% at 50% 50%, rgba(16,185,129,0.06) 0%, rgba(6,182,212,0.04) 40%, transparent 70%)",
        }}
      >
        {/* Starfield */}
        {STARS.map((s) => (
          <div
            key={s.id}
            className="ss-star"
            style={{
              top: s.top,
              left: s.left,
              width: s.size,
              height: s.size,
              ["--tw-dur" as string]: s.dur,
              ["--tw-delay" as string]: s.delay,
            }}
          />
        ))}

        {/* Orbit rings (visual only) */}
        {ORBITS.map((o) => (
          <div
            key={o.r}
            className="ss-orbit-ring"
            style={{ width: o.r * 2, height: o.r * 2 }}
          />
        ))}

        {/* Rotating tracks + planets */}
        {ORBITS.map((o) => (
          <div
            key={o.cls}
            className={`ss-orbit-track ${o.cls}`}
            style={{ width: o.r * 2, height: o.r * 2 }}
          >
            {/* Data packet */}
            <div
              className="ss-packet"
              style={{
                background: o.planet.packet,
                boxShadow: `0 0 6px 2px ${o.planet.packet}`,
              }}
            />

            {/* Planet */}
            <div className="ss-planet-wrap" style={{ marginTop: `-${o.planet.size / 2}px` }}>
              <div className="ss-tooltip" style={{ borderColor: `${o.planet.color}40` }}>
                {o.planet.tooltip}
              </div>
              <div
                className="ss-planet"
                style={{
                  width: o.planet.size,
                  height: o.planet.size,
                  background: o.planet.bg,
                  boxShadow: o.planet.glow,
                }}
              />
              <span
                className="ss-planet-label"
                style={{ color: o.planet.color }}
              >
                {o.planet.label}
              </span>
            </div>
          </div>
        ))}

        {/* Sun */}
        <div className="ss-sun-wrap">
          <div className="ss-corona ss-corona-1" />
          <div className="ss-corona ss-corona-2" />
          <div className="ss-corona ss-corona-3" />
          <div className="ss-sun" />
          <span className="ss-sun-label">RCN</span>
        </div>
      </div>
    </>
  );
}

// ─── Hero Stats ───────────────────────────────────────────────────────────────

const STAT_ICONS = [Zap, Shield, Wifi];
const STAT_COLORS = ["rgb(var(--primary))", "#06b6d4", "#d4a853"];

function HeroStats({
  stats,
  lang,
}: {
  stats: Array<{ value: number; decimals: number; suffix: string; label: string }>;
  lang: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} className="mt-7 flex flex-wrap gap-3">
      {stats.map((s, i) => {
        const Icon = STAT_ICONS[i];
        const color = STAT_COLORS[i];
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 * i, duration: 0.45 }}
            style={{
              background: "rgba(255,255,255,0.04)",
              border: `1px solid ${color}30`,
              borderRadius: 12,
              padding: "10px 16px",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              display: "flex",
              alignItems: "center",
              gap: 10,
              boxShadow: `0 0 16px ${color}14`,
            }}
          >
            <span
              style={{
                width: 30, height: 30,
                borderRadius: 8,
                background: `${color}18`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Icon style={{ width: 15, height: 15, color }} />
            </span>
            <div>
              <div
                style={{
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: "1.15rem",
                  fontWeight: 600,
                  color,
                  lineHeight: 1.1,
                }}
              >
                {inView ? (
                  <CountUp value={s.value} decimals={s.decimals} />
                ) : (
                  "0"
                )}
                <span style={{ fontSize: "0.8rem", marginLeft: 2 }}>{s.suffix}</span>
              </div>
              <div style={{ fontSize: "0.7rem", color: "rgb(var(--text-soft))", marginTop: 1 }}>
                {s.label}
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

export function Hero() {
  const { lang } = useLanguage();

  const speed  = business.stats.find((s) => s.id === "speed");
  const uptime = business.stats.find((s) => s.id === "uptime");
  const areas  = business.stats.find((s) => s.id === "areas");

  const statsData = [
    speed  && { value: speed.value,  decimals: 0, suffix: speed.suffix,  label: speed.label[lang]  },
    uptime && { value: uptime.value, decimals: 1, suffix: uptime.suffix, label: uptime.label[lang] },
    areas  && { value: areas.value,  decimals: 0, suffix: areas.suffix,  label: areas.label[lang]  },
  ].filter(Boolean) as Array<{ value: number; decimals: number; suffix: string; label: string }>;

  return (
    <section className="relative min-h-[calc(100vh-68px)] overflow-hidden">
      {/* Deep space background overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: `
            radial-gradient(ellipse 60% 50% at 75% 50%, rgba(16,185,129,0.09) 0%, transparent 65%),
            radial-gradient(ellipse 40% 40% at 20% 80%, rgba(6,182,212,0.05) 0%, transparent 60%)
          `,
        }}
      />

      <Container className="relative z-10 flex min-h-[calc(100vh-68px)] items-center py-16 lg:py-20">
        <div className="grid w-full items-center gap-10 lg:grid-cols-[55%_45%]">

          {/* ── Left ── */}
          <div>
            {/* Badge */}
            <Reveal>
              <div
                className="rcn-badge inline-flex"
                style={{
                  background: "rgba(16,185,129,0.1)",
                  border: "1px solid rgba(16,185,129,0.3)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <span
                  className="rcn-pulse-dot h-1.5 w-1.5 rounded-full"
                  style={{ background: "rgb(var(--primary))" }}
                />
                <span style={{ color: "rgb(var(--primary))" }}>
                  {t(lang, "heroEyebrow")}
                </span>
              </div>
            </Reveal>

            {/* H1 */}
            <Reveal delay={0.08}>
              <h1
                className="mt-5 font-bold leading-[1.05] tracking-tight"
                style={{
                  fontFamily: "var(--font-heading), ui-serif, Georgia, serif",
                  fontSize: "clamp(2.6rem, 6vw, 4.8rem)",
                  color: "rgb(var(--text))",
                }}
              >
                {t(lang, "heroHeadlineA")}{" "}
                <em
                  style={{
                    fontStyle: "italic",
                    fontFamily: "var(--font-heading), ui-serif, Georgia, serif",
                    background: "linear-gradient(120deg, #00d4ff 0%, #4f8bff 50%, #39d98a 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {t(lang, "heroHeadlineB")}
                </em>
              </h1>
            </Reveal>

            {/* Subhead */}
            <Reveal delay={0.16}>
              <p
                className="mt-5 max-w-lg text-lg leading-8"
                style={{ color: "rgb(var(--text-muted))" }}
              >
                {t(lang, "heroSubhead")}
              </p>
            </Reveal>

            {/* CTA buttons */}
            <Reveal delay={0.24}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                {/* Primary — glassmorphism green */}
                <Link
                  href="/contact"
                  className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl px-6 py-3 text-sm font-bold transition-all duration-300"
                  style={{
                    background: "rgba(16,185,129,0.15)",
                    border: "1px solid rgba(16,185,129,0.45)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    color: "rgb(var(--primary))",
                    boxShadow: "0 0 20px rgba(16,185,129,0.2)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(16,185,129,0.28)";
                    e.currentTarget.style.boxShadow  = "0 0 32px rgba(16,185,129,0.4)";
                    e.currentTarget.style.transform  = "translateY(-2px) scale(1.02)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(16,185,129,0.15)";
                    e.currentTarget.style.boxShadow  = "0 0 20px rgba(16,185,129,0.2)";
                    e.currentTarget.style.transform  = "translateY(0) scale(1)";
                  }}
                >
                  {/* Shimmer */}
                  <span
                    className="pointer-events-none absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/10 to-transparent transition-transform duration-500 group-hover:translate-x-full"
                  />
                  {t(lang, "ctaGetConnected")}
                  <ArrowRight className="h-4 w-4" />
                </Link>

                {/* Secondary — frosted */}
                <Link
                  href="/plans"
                  className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-300"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.14)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    color: "rgb(var(--text-muted))",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background   = "rgba(255,255,255,0.1)";
                    e.currentTarget.style.borderColor  = "rgba(255,255,255,0.25)";
                    e.currentTarget.style.color        = "rgb(var(--text))";
                    e.currentTarget.style.transform    = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background   = "rgba(255,255,255,0.05)";
                    e.currentTarget.style.borderColor  = "rgba(255,255,255,0.14)";
                    e.currentTarget.style.color        = "rgb(var(--text-muted))";
                    e.currentTarget.style.transform    = "translateY(0)";
                  }}
                >
                  {t(lang, "ctaViewPlans")}
                </Link>

                {/* Ghost */}
                <Link
                  href="/coverage"
                  className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors duration-200"
                  style={{ color: "rgb(var(--text-soft))" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "rgb(var(--primary))")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "rgb(var(--text-soft))")
                  }
                >
                  {t(lang, "ctaCheckAvailability")}
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </Reveal>

            {/* Location chip */}
            <Reveal delay={0.32}>
              <div
                className="mt-5 inline-flex items-center gap-2 rounded-full px-3 py-1.5"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  fontSize: "0.8rem",
                  color: "rgb(var(--text-soft))",
                }}
              >
                <MapPin
                  className="h-3.5 w-3.5"
                  style={{ color: "rgb(var(--primary))" }}
                />
                <span>{business.company.primaryServiceArea}</span>
              </div>
            </Reveal>

            {/* Stats */}
            <Reveal delay={0.4}>
              <HeroStats stats={statsData} lang={lang} />
            </Reveal>
          </div>

          {/* ── Right: Solar System ── */}
          <Reveal delay={0.15}>
            <div
              className="relative hidden lg:block"
              style={{ height: 460 }}
            >
              {/* Outer card frame */}
              <div
                className="rcn-card h-full w-full overflow-hidden"
                style={{
                  borderColor: "rgba(16,185,129,0.15)",
                  background: "rgba(8,15,10,0.55)",
                  backdropFilter: "blur(24px)",
                  WebkitBackdropFilter: "blur(24px)",
                }}
              >
                <SolarSystem />
              </div>

              {/* Network live badge */}
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.4 }}
                style={{
                  position: "absolute",
                  top: 14, left: 14,
                  background: "rgba(8,15,10,0.85)",
                  border: "1px solid rgba(16,185,129,0.3)",
                  borderRadius: 10,
                  padding: "5px 12px",
                  display: "flex",
                  alignItems: "center",
                  gap: 7,
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  zIndex: 20,
                }}
              >
                <span
                  className="rcn-pulse-dot h-2 w-2 rounded-full"
                  style={{ background: "rgb(var(--primary))", flexShrink: 0 }}
                />
                <span style={{ fontSize: "0.72rem", fontWeight: 600, color: "rgb(var(--text))" }}>
                  Network Live — All Operational
                </span>
              </motion.div>

              {/* Legend */}
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2, duration: 0.4 }}
                style={{
                  position: "absolute",
                  bottom: 14, right: 14,
                  background: "rgba(8,15,10,0.82)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: 10,
                  padding: "8px 12px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 5,
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  zIndex: 20,
                }}
              >
                {[
                  { color: "#06b6d4", label: "Fiber Speed" },
                  { color: "#22c55e", label: "Reliability" },
                  { color: "#d4a853", label: "Coverage" },
                ].map((l) => (
                  <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 7 }}>
                    <span style={{ width: 7, height: 7, borderRadius: "50%", background: l.color, flexShrink: 0, boxShadow: `0 0 5px ${l.color}` }} />
                    <span style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.55)" }}>
                      {l.label}
                    </span>
                  </div>
                ))}
              </motion.div>
            </div>
          </Reveal>

          {/* Mobile stats row */}
          <Reveal delay={0.5}>
            <div
              className="rcn-card rcn-card-md grid grid-cols-3 gap-4 lg:hidden"
              style={{ borderColor: "rgba(16,185,129,0.2)" }}
            >
              {statsData.map((s, i) => {
                const color = STAT_COLORS[i];
                return (
                  <div key={i} className="flex flex-col items-center gap-0.5 text-center">
                    <span
                      style={{
                        fontFamily: "var(--font-mono), monospace",
                        fontSize: "1.2rem",
                        fontWeight: 600,
                        color,
                      }}
                    >
                      <CountUp value={s.value} decimals={s.decimals} />
                      <span style={{ fontSize: "0.75rem" }}>{s.suffix}</span>
                    </span>
                    <span style={{ fontSize: "0.7rem", color: "rgb(var(--text-soft))" }}>
                      {s.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}