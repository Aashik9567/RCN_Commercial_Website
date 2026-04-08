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
            <span className="bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              clear
            </span>{" "}
            decisions
          </>
        }
        description="Everything you need to know before getting connected. If you still have questions, contact us anytime."
      />

      <FAQ withHeader={false} />
    </SiteShell>
  );
}
