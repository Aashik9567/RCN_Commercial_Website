"use client";

import * as React from "react";
import { Navbar } from "./navbar";
import { Hero } from "./hero";
import { Features } from "./features";
import { Pricing } from "./pricing";
import { WhyChooseUs } from "./why-choose-us";
import { Testimonials } from "./testimonials";
import { HowItWorks } from "./how-it-works";

import { FAQ } from "./faq";
import { FinalCTA } from "./final-cta";
import { Footer } from "./footer";
import { ScrollProgress } from "./scroll-progress";

/**
 * Root page shell.
 * bg-[#040714] ensures the dark luxury base colour bleeds
 * across all sections — individual sections add their own
 * decorative gradients on top.
 */
export function HomePage() {
  return (
    <div className="flex min-h-dvh flex-col bg-[#040714]">
      {/* Slim scroll-progress bar — style it cyan to match palette */}
      <ScrollProgress />

      {/* Fixed navigation */}
      <Navbar />

      <main className="flex-1">
        <Hero />
        <Features />
        <Pricing />
        <WhyChooseUs />
        <Testimonials />
        <HowItWorks />
        <FAQ />
        <FinalCTA />
      </main>

      <Footer />
    </div>
  );
}