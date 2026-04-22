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
            <span className="text-gray-900 dark:text-gray-100">simple</span>
          </>
        }
        description="Choose a plan that fits your home or business. Upgrade anytime with clear, transparent pricing."
      />

      <Pricing withHeader={false} />
    </SiteShell>
  );
}
