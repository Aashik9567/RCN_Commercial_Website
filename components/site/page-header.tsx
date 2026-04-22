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
    <section className="relative pb-12 pt-28 sm:pb-16 sm:pt-32">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
              <span className="h-1.5 w-1.5 rounded-full bg-gray-500" />
              {badge}
            </div>
            <h1 className="heading-primary mt-6">{title}</h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-600 dark:text-gray-400">
              {description}
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
