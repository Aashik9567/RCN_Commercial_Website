import type { Metadata } from "next";

import { FAQ } from "@/components/landing/faq";
import { SiteShell } from "@/components/site/site-shell";
import { PageHeader } from "@/components/site/page-header";

export const metadata: Metadata = {
  title: "FAQ | Raghunathpur Cable Network",
  description:
    "Frequently asked questions about installation, plans, upgrades, and support.",
};

export default function FAQPage() {
  return (
    <SiteShell>
      <PageHeader
        badge="FAQ"
        title={
          <>
            Quick answers,{" "}
            <span className="text-gray-900 dark:text-gray-100">clear</span>{" "}
            decisions
          </>
        }
        description="Everything you need to know before getting connected. If you still have questions, contact us anytime."
      />

      <FAQ withHeader={false} />
    </SiteShell>
  );
}
