import type { Metadata } from "next";
import { SiteShell } from "@/components/site/site-shell";

import { HeroSection } from "@/components/about/HeroSection";
import { StatsCounter } from "@/components/about/StatsCounter";
import { ChairpersonMessage } from "@/components/about/ChairpersonMessage";
import { MissionVision } from "@/components/about/MissionVision";
import { ValuesSection } from "@/components/about/ValuesSection";
import { Timeline } from "@/components/about/Timeline";
import { TeamSection } from "@/components/about/TeamSection";

export const metadata: Metadata = {
  title: "About | Raghunathpur Cable Network",
  description:
    "Learn about Raghunathpur Cable Network, our mission, values, and the people building West Bengal's most reliable fiber network.",
};

export default function AboutPage() {
  return (
    <SiteShell>
      <main className="relative overflow-x-hidden">
        <HeroSection />
        <StatsCounter />
        <ChairpersonMessage />
        <MissionVision />
        <ValuesSection />
        <Timeline />
        <TeamSection />
      </main>
    </SiteShell>
  );
}
