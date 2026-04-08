import type { Metadata } from "next";

import { MapPin, Router, ShieldCheck, Wifi } from "lucide-react";

import { Container } from "@/components/landing/container";
import { Reveal } from "@/components/landing/reveal";
import { SiteShell } from "@/components/site/site-shell";
import { PageHeader } from "@/components/site/page-header";

export const metadata: Metadata = {
  title: "Coverage | Raghunathpur Cable Network",
  description:
    "Check service availability and learn how coverage works for Raghunathpur Cable Network fiber internet.",
};

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

export default function CoveragePage() {
  return (
    <SiteShell>
      <PageHeader
        badge="Coverage"
        title={
          <>
            Service areas &{" "}
            <span className="bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              availability
            </span>
          </>
        }
        description="Share your ward/landmark and we’ll confirm coverage and the fastest install slot."
      />

      <section className="pb-16 sm:pb-20">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {COVERAGE_BLOCKS.map((b, idx) => (
              <Reveal key={b.title} delay={idx * 0.06}>
                <div className="group h-full rounded-2xl border border-(--border-card) bg-(--bg-card) p-6 shadow-md backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-indigo-300 hover:bg-(--bg-card-hover) hover:shadow-lg dark:hover:border-indigo-600">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-indigo-100 to-purple-100 text-indigo-700 transition-transform duration-300 group-hover:scale-110 dark:from-indigo-950 dark:to-purple-950 dark:text-indigo-300">
                    <b.icon className="h-6 w-6" />
                  </div>
                  <div className="mt-4 text-lg font-bold text-gray-900 dark:text-white">
                    {b.title}
                  </div>
                  <p className="mt-2 text-sm leading-6 text-(--text-muted)">
                    {b.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.25}>
            <div className="mt-10 rounded-3xl border border-(--border-card) bg-(--bg-card) bg-linear-to-r from-indigo-500/5 to-purple-500/5 p-8 backdrop-blur-xl">
              <div className="text-lg font-bold text-gray-900 dark:text-white">
                Want us to check your address?
              </div>
              <p className="mt-2 text-sm text-(--text-muted)">
                Send your ward/tole/landmark and preferred timing — we’ll
                confirm availability and share the best plan.
              </p>
              <div className="mt-5">
                <a
                  href="/contact"
                  className="inline-flex h-11 items-center justify-center rounded-2xl bg-linear-to-r from-indigo-600 to-purple-600 px-6 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all hover:shadow-indigo-500/30 active:scale-95">
                  Check availability
                </a>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </SiteShell>
  );
}
