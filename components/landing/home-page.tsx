"use client";

import { Hero } from "@/components/landing/hero";
import { Features } from "./features";
import { Pricing } from "./pricing";
import { Stats } from "./stats";
import { Testimonials } from "./testimonials";
import { HowItWorks } from "./how-it-works";

import { Coverage } from "./coverage";

import { FAQ } from "./faq";
import { FinalCTA } from "./final-cta";

/**
 * Root page shell.
 * Uses the global theme tokens for background/text,
 * while individual sections add decorative gradients.
 */
export function HomePage() {
  return (
    <div className="flex flex-col">
      <Hero />
      <Features />
      <Pricing />
      <Stats />
      <Testimonials />
      <HowItWorks />
      <Coverage />
      <FAQ />
      <FinalCTA />
    </div>
  );
}
