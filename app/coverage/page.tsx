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
            <span className="text-gray-900 dark:text-gray-100">
              availability
            </span>
          </>
        }
        description="Share your ward/landmark and we’ll confirm coverage and the fastest install slot."
      />

      <section className="container-section">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {COVERAGE_BLOCKS.map((b, idx) => (
              <Reveal key={b.title} delay={idx * 0.06}>
                <div className="card-interactive group h-full hover:border-gray-300 dark:hover:border-gray-600">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 text-gray-700 transition-transform duration-300 group-hover:scale-110 dark:bg-gray-800 dark:text-gray-200">
                    <b.icon className="h-6 w-6" />
                  </div>
                  <div className="mt-4 text-lg font-bold text-gray-900 dark:text-white">
                    {b.title}
                  </div>
                  <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-400">
                    {b.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.25}>
            <div className="card mt-10 rounded-3xl">
              <div className="text-lg font-bold text-gray-900 dark:text-white">
                Want us to check your address?
              </div>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Send your ward/tole/landmark and preferred timing — we’ll
                confirm availability and share the best plan.
              </p>
              <div className="mt-5">
                <a
                  href="/contact"
                  className="btn-primary h-11 rounded-2xl px-6 active:scale-95">
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
