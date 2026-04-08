"use client";

import * as React from "react";
import { ArrowRight, PhoneCall } from "lucide-react";
import { Container } from "./container";
import { Reveal } from "./reveal";

export function FinalCTA() {
  return (
    <section id="get-started" className="py-16 sm:py-20">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-gray-200/60 bg-linear-to-br from-white/80 via-indigo-50/40 to-white/60 p-8 shadow-lg shadow-indigo-500/10 backdrop-blur dark:border-gray-800/60 dark:from-gray-900/50 dark:via-indigo-950/20 dark:to-gray-900/30 sm:p-12">
            <div className="pointer-events-none absolute inset-0 -z-10">
              <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-linear-to-tr from-indigo-500/20 to-purple-500/20 blur-3xl" />
              <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-linear-to-tr from-purple-500/20 to-pink-500/20 blur-3xl" />
            </div>

            <div className="relative z-10 grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-center">
              <div>
                <div className="inline-block rounded-full bg-indigo-100 px-3 py-1 text-sm font-semibold text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-300">
                  Ready to switch?
                </div>
                <h2 className="mt-5 text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
                  Get{" "}
                  <span className="bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    connected today
                  </span>
                </h2>
                <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
                  Choose a plan, confirm coverage, and we'll schedule your
                  installation. Fast, reliable fiber internet is one step away.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:gap-4">
                <button
                  onClick={() => (window.location.hash = "#pricing")}
                  className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-linear-to-r from-indigo-600 to-purple-600 px-8 font-semibold text-white shadow-lg shadow-indigo-500/30 transition-all hover:shadow-xl hover:shadow-indigo-500/40 active:scale-95">
                  View Plans{" "}
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </button>
                <button
                  onClick={() => (window.location.hash = "#contact")}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-gray-300 bg-white/80 px-8 font-semibold text-gray-900 transition-all hover:bg-white hover:border-indigo-300 dark:border-gray-700 dark:bg-gray-800/60 dark:text-white dark:hover:border-indigo-500 dark:hover:bg-gray-700">
                  Contact Us <PhoneCall className="h-5 w-5" />
                </button>
                <div className="pt-2 text-xs text-gray-600 dark:text-gray-500">
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
