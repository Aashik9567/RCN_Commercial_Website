"use client";

import Link from "next/link";
import { MapPin, Router, ShieldCheck, Wifi } from "lucide-react";

import { Container } from "./container";
import { Reveal } from "./reveal";

const COVERAGE_BLOCKS = [
  {
    title: "Primary Service Area",
    description:
      "We focus on reliable last-mile connectivity in and around Raghunathpur. Availability can vary by lane/ward.",
    icon: MapPin,
  },
  {
    title: "Fast Installation",
    description:
      "Once confirmed, our team schedules installation quickly and completes setup with clean cabling and router configuration.",
    icon: Router,
  },
  {
    title: "Stable Network",
    description:
      "Fiber-grade reliability for streaming, gaming, and work. Proactive monitoring helps keep your connection smooth.",
    icon: ShieldCheck,
  },
  {
    title: "Speed Options",
    description:
      "Multiple tiers for every household. Upgrade anytime if your usage grows.",
    icon: Wifi,
  },
] as const;

export function Coverage() {
  return (
    <section id="coverage" className="container-section">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-gray-200/80 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-gray-700 backdrop-blur-xl dark:border-white/10 dark:bg-white/4 dark:text-white/70">
              <span className="h-1.5 w-1.5 rounded-full bg-gray-500 dark:bg-white/40" />
              Coverage
            </div>
            <h2 className="heading-primary mt-5">
              Service areas & availability
            </h2>
            <p className="mt-5 text-lg text-muted">
              Share your ward/landmark and we’ll confirm coverage and the
              fastest install slot.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {COVERAGE_BLOCKS.map((b, idx) => (
            <Reveal key={b.title} delay={idx * 0.06}>
              <div className="card-interactive group h-full hover:border-gray-300 dark:hover:border-white/20">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/70 text-gray-700 transition-transform duration-300 group-hover:scale-110 dark:bg-white/6 dark:text-white/80">
                  <b.icon className="h-6 w-6" />
                </div>
                <div className="mt-4 text-lg font-bold text-gray-900 dark:text-white">
                  {b.title}
                </div>
                <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-white/55">
                  {b.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.25}>
          <div className="card mt-10 p-8 sm:p-10">
            <div className="text-lg font-bold text-gray-900 dark:text-white">
              Want us to check your address?
            </div>
            <p className="mt-2 text-sm text-gray-600 dark:text-white/55">
              Visit the coverage page or send your ward/tole/landmark and
              preferred timing — we’ll confirm availability and share the best
              plan.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <Link href="/coverage" className="btn-secondary h-11 rounded-2xl">
                View coverage
              </Link>
              <Link href="/contact" className="btn-primary h-11 rounded-2xl">
                Check availability
              </Link>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
