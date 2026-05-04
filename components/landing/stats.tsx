"use client";

import * as React from "react";

import { Container } from "@/components/landing/container";
import { Reveal } from "@/components/landing/reveal";
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
      <div className="rounded-3xl bg-[color:rgb(var(--slate-950))] py-14 text-white">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <div className="rcn-badge mx-auto bg-white/5 text-white/80 ring-1 ring-white/10">
                <span className="h-1.5 w-1.5 rounded-full bg-[color:rgb(var(--green-400))]" />
                <span className="uppercase tracking-widest">
                  {t(lang, "sectionStats")}
                </span>
              </div>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                {t(lang, "sectionStats")}
              </h2>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {business.stats.map((stat, idx) => (
              <Reveal key={stat.id} delay={idx * 0.04}>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <div className="text-3xl font-extrabold">
                    <CountUp
                      value={stat.value}
                      decimals={decimalsFor(stat.value)}
                    />
                    <span className="text-base font-bold text-white/60">
                      {stat.suffix}
                    </span>
                  </div>
                  <div className="mt-2 text-sm text-white/70">
                    {stat.label[lang]}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </div>
    </section>
  );
}
