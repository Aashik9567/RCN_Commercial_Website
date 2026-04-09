"use client";

import * as React from "react";

import { Container } from "@/components/landing/container";
import { Reveal } from "@/components/landing/reveal";

export function PageHeader({
  badge,
  title,
  description,
}: {
  badge: string;
  title: React.ReactNode;
  description: string;
}) {
  return (
    <section className="relative overflow-hidden pb-12 pt-28 sm:pb-16 sm:pt-32">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-indigo-700 dark:border-indigo-400/15 dark:text-indigo-300">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
              {badge}
            </div>
            <h1 className="mt-6 text-4xl font-black tracking-tight text-gray-900 dark:text-white sm:text-5xl">
              {title}
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-(--text-muted)">
              {description}
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
