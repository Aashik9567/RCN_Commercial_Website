"use client";

import { Navbar } from "@/components/layout/navbar";
import { Hero } from "@/components/home/hero";
import { Features } from "@/components/home/features";
import { Pricing } from "@/components/home/pricing";
import { WhyChooseUs } from "@/components/home/why-choose-us";
import { Testimonials } from "@/components/home/testimonials";
import { HowItWorks } from "@/components/home/how-it-works";
import { Coverage } from "@/components/home/coverage";
import { FAQ } from "@/components/home/faq";
import { FinalCTA } from "@/components/home/final-cta";
import { Footer } from "@/components/layout/footer";
import { ScrollProgress } from "@/components/ui/scroll-progress";

/**
 * Home page root.
 *
 * No background set here — the global CSS var --bg-page handles it.
 * The Orb lives inside <Hero /> on the right column only.
 * All other sections render on the clean page background.
 */
export function HomePage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <ScrollProgress />
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Features />
        <Pricing />
        <WhyChooseUs />
        <Testimonials />
        <HowItWorks />
        <Coverage />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
