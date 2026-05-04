"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  ExternalLink,
  Link,
  Mail,
  ShieldCheck,
  Wrench,
  Zap,
} from "lucide-react";

import { Container } from "@/components/landing/container";
import { Card, GhostCard } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type TeamMember = {
  name: string;
  title: string;
  bio: string;
  icon: "ops" | "field" | "security";
  links: { type: "linkedin" | "github" | "email"; href: string }[];
};

const TEAM: TeamMember[] = [
  {
    name: "Ananya Sen",
    title: "Operations Lead",
    bio: "Keeps the backbone running 24/7 — routing, monitoring, and uptime discipline.",
    icon: "ops",
    links: [
      { type: "linkedin", href: "#" },
      { type: "email", href: "mailto:hello@raghunathpurcable.com" },
    ],
  },
  {
    name: "Sourav Das",
    title: "Field Engineer",
    bio: "On-ground installations and rapid fixes — because trust is built in the last mile.",
    icon: "field",
    links: [
      { type: "linkedin", href: "#" },
      { type: "github", href: "#" },
    ],
  },
  {
    name: "Priya Mukherjee",
    title: "Network Security",
    bio: "Security and reliability — safeguarding customers and network integrity.",
    icon: "security",
    links: [
      { type: "linkedin", href: "#" },
      { type: "email", href: "mailto:hello@raghunathpurcable.com" },
    ],
  },
];

function MemberIcon({ kind }: { kind: TeamMember["icon"] }) {
  const common = "h-5 w-5 text-white";
  if (kind === "ops") return <Zap className={common} />;
  if (kind === "field") return <Wrench className={common} />;
  return <ShieldCheck className={common} />;
}

function LinkIcon({ type }: { type: TeamMember["links"][number]["type"] }) {
  const common = "h-4 w-4";
  if (type === "linkedin") return <Link className={common} />;
  if (type === "github") return <ExternalLink className={common} />;
  return <Mail className={common} />;
}

export function TeamSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });

  return (
    <section ref={ref} id="team" className="relative py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 bg-linear-to-r from-transparent via-cyan-500/30 to-transparent" />
        <div className="absolute left-10 top-24 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute right-10 bottom-20 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl" />
      </div>

      <Container className="relative">
        <motion.div
          className="mx-auto mb-14 max-w-2xl text-center"
          initial={{ opacity: 0, y: 22 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}>
          <GhostCard
            pill
            className="inline-flex items-center gap-2 px-4 py-2"
            noHover>
            <Zap className="h-3.5 w-3.5" />
            <span className="text-xs font-semibold uppercase tracking-widest text-cyan-700 dark:text-cyan-300">
              Our Team
            </span>
          </GhostCard>
          <h2 className="mt-5 text-4xl font-black tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            People behind the
            <span className="bg-linear-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
              {" "}
              network
            </span>
          </h2>
          <p className="mt-5 text-lg leading-8 text-gray-700 dark:text-white/55">
            A small, dedicated team that treats every connection like it matters
            — because it does.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {TEAM.map((m, i) => (
            <Card
              key={m.name}
              accentColor="rgba(0,229,255,0.12)"
              className="group flex flex-col items-center p-6 text-center"
              initial={{ opacity: 0, y: 35 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.6 }}>
              <div className="relative">
                <div className="mb-6 flex items-center gap-3">
                  <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-cyan-500 to-violet-600 shadow-md transition-transform duration-300 group-hover:scale-110">
                    <MemberIcon kind={m.icon} />
                  </div>
                  <div>
                    <div className="mb-3 text-lg font-bold text-gray-900 dark:text-white">
                      {m.name}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-white/55">
                      {m.title}
                    </div>
                  </div>
                </div>

                <p className="text-sm leading-6 text-gray-600 dark:text-white/55">
                  {m.bio}
                </p>

                <div className="mt-7 flex items-center gap-2">
                  {m.links.map((l) => (
                    <motion.a
                      key={l.type}
                      href={l.href}
                      aria-label={`${m.name} ${l.type}`}
                      className={cn(
                        "inline-flex h-10 w-10 items-center justify-center rounded-xl",
                        "border border-gray-200/70 bg-white/70 text-gray-700",
                        "backdrop-blur-md transition-colors hover:border-cyan-500/30 hover:text-cyan-700",
                        "dark:border-white/10 dark:bg-white/5 dark:text-white/70 dark:hover:text-cyan-300",
                      )}
                      whileHover={{ scale: 1.06 }}
                      whileTap={{ scale: 0.96 }}>
                      <LinkIcon type={l.type} />
                    </motion.a>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
