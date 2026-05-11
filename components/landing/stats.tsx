"use client";

import * as React from "react";

import { Container } from "@/components/landing/container";
import { Reveal } from "@/components/landing/reveal";
import { Card } from "@/components/ui/card";
import { CountUp } from "@/components/ui/CountUp";
import { business } from "@/data/business";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { t } from "@/lib/i18n";

function decimalsFor(value: number) {
  return Number.isInteger(value) ? 0 : 1;
}

export function Stats() {
  const { lang } = useLanguage();

  if (business.stats.length === 0) {
    // TODO: add real data to business.stats
    return null;
  }

  return (
    <section id="stats" className="container-section">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <div className="rcn-badge mx-auto">
              <span className="h-1.5 w-1.5 rounded-full bg-[rgb(var(--primary))]" />
              <span className="uppercase tracking-widest">
                {t(lang, "sectionStats")}
              </span>
            </div>
            <h2 className="mt-5 text-[clamp(1.7rem,3.5vw,2.6rem)] font-bold tracking-tight text-[rgb(var(--text))]">
              {t(lang, "sectionStats")}
            </h2>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {business.stats.map((stat, idx) => (
            <Reveal key={stat.id} delay={idx * 0.04}>
              <Card size="md" className="h-full">
                <div className="rcn-mono text-[clamp(2.2rem,4vw,3.5rem)] font-semibold text-[rgb(var(--primary))]">
                  <CountUp
                    value={stat.value}
                    decimals={decimalsFor(stat.value)}
                  />
                  <span className="ml-1 text-base font-medium text-[rgb(var(--text-soft))]">
                    {stat.suffix}
                  </span>
                </div>
                <div className="my-4 h-px w-12 bg-[rgb(var(--primary))]/20" />
                <div className="text-sm font-medium text-[rgb(var(--text-muted))]">
                  {stat.label[lang]}
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
