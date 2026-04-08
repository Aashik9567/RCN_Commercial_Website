import type { Metadata } from "next";

import { HeartHandshake, ShieldCheck, Sparkles, Zap } from "lucide-react";

import { Container } from "@/components/landing/container";
import { Reveal } from "@/components/landing/reveal";
import { SiteShell } from "@/components/site/site-shell";
import { PageHeader } from "@/components/site/page-header";

export const metadata: Metadata = {
  title: "About | Raghunathpur Cable Network",
  description:
    "Learn about Raghunathpur Cable Network — our mission, values, and commitment to reliable fiber internet.",
};

const VALUES = [
  {
    title: "Local-first support",
    description:
      "Fast responses from a team that understands your area, your setup, and your day-to-day needs.",
    icon: HeartHandshake,
  },
  {
    title: "Reliability by design",
    description:
      "We focus on stable routing, clean installs, and proactive monitoring so your connection stays consistent.",
    icon: ShieldCheck,
  },
  {
    title: "Performance that scales",
    description:
      "From browsing to 4K streaming and work-from-home, our plans are built for real usage patterns.",
    icon: Zap,
  },
  {
    title: "Transparent pricing",
    description:
      "No surprises. Clear plan tiers, straightforward billing, and easy upgrades when you’re ready.",
    icon: Sparkles,
  },
] as const;

export default function AboutPage() {
  return (
    <SiteShell>
      <PageHeader
        badge="About"
        title={
          <>
            Built with{" "}
            <span className="bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              trust
            </span>
          </>
        }
        description="RCN delivers fiber internet with a simple promise: reliable speeds, clean installation, and support that shows up."
      />

      <section className="pb-16 sm:pb-20">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-lg leading-8 text-(--text-secondary)">
                We’re a local ISP focused on high-quality last-mile
                connectivity. Our goal is to keep your internet fast and stable
                — whether you’re on a video call, streaming with family, or
                running a small business.
              </p>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v, idx) => (
              <Reveal key={v.title} delay={idx * 0.06}>
                <div className="group h-full rounded-2xl border border-(--border-card) bg-(--bg-card) p-6 shadow-md backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-indigo-300 hover:bg-(--bg-card-hover) hover:shadow-lg dark:hover:border-indigo-600">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-indigo-100 to-purple-100 text-indigo-700 transition-transform duration-300 group-hover:scale-110 dark:from-indigo-950 dark:to-purple-950 dark:text-indigo-300">
                    <v.icon className="h-6 w-6" />
                  </div>
                  <div className="mt-4 text-lg font-bold text-gray-900 dark:text-white">
                    {v.title}
                  </div>
                  <p className="mt-2 text-sm leading-6 text-(--text-muted)">
                    {v.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.25}>
            <div className="mt-10 rounded-3xl border border-(--border-card) bg-(--bg-card) bg-linear-to-r from-indigo-500/5 to-purple-500/5 p-8 backdrop-blur-xl">
              <div className="text-lg font-bold text-gray-900 dark:text-white">
                Our promise
              </div>
              <p className="mt-2 text-sm text-(--text-muted)">
                Clear communication, clean installation, and dependable support
                — with plan options that match your real usage.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>
    </SiteShell>
  );
}
