import type { Metadata } from "next";

import { Pricing } from "@/components/landing/pricing";
import { SiteShell } from "@/components/site/site-shell";
import { PageHeader } from "@/components/site/page-header";

export const metadata: Metadata = {
  title: "Plans | Raghunathpur Cable Network",
  description:
    "Explore transparent fiber internet pricing plans from Raghunathpur Cable Network.",
};

export default function PlansPage() {
  return (
    <SiteShell>
      <PageHeader
        badge="Plans"
        title={
          <>
            Pricing that’s{" "}
            <span className="bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              simple
            </span>
          </>
        }
        description="Choose a plan that fits your home or business. Upgrade anytime with clear, transparent pricing."
      />

      <Pricing withHeader={false} />
    </SiteShell>
  );
}
