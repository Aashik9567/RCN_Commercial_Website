"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, PhoneCall } from "lucide-react";
import { Container } from "./container";
import { Reveal } from "./reveal";

export function FinalCTA() {
  return (
    <section id="get-started" className="container-section">
      <Container>
        <Reveal>
          <div className="card relative overflow-hidden rounded-3xl p-8 sm:p-12">
            <div className="relative z-10 grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-center">
              <div>
                <div className="inline-block rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-sm font-semibold text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
                  Ready to switch?
                </div>
                <h2 className="mt-5 text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
                  Get{" "}
                  <span className="text-gray-900 dark:text-gray-100">
                    connected today
                  </span>
                </h2>
                <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
                  Choose a plan, confirm coverage, and we&apos;ll schedule your
                  installation. Fast, reliable fiber internet is one step away.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:gap-4">
                <Link
                  href="/plans"
                  className="btn-primary group h-12 rounded-full px-8 active:scale-95">
                  View Plans{" "}
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/contact"
                  className="btn-secondary h-12 rounded-full px-8">
                  Contact Us <PhoneCall className="h-5 w-5" />
                </Link>
                <div className="pt-2 text-xs text-gray-600 dark:text-gray-400">
                  Tip: Update contact details in the footer with your real info.
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
