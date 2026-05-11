"use client";

import * as React from "react";
import Link from "next/link";
import { CheckCircle2, Rocket, Wrench } from "lucide-react";

import { Container } from "@/components/landing/container";
import { Reveal } from "@/components/landing/reveal";
import { Card } from "@/components/ui/card";
import { business } from "@/data/business";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { t } from "@/lib/i18n";

function iconForStep(id: (typeof business.howItWorks)[number]["id"]) {
  switch (id) {
    case "choose-plan":
      return <CheckCircle2 className="h-5 w-5" />;
    case "install":
      return <Wrench className="h-5 w-5" />;
    case "go-live":
      return <Rocket className="h-5 w-5" />;
  }
}

export function HowItWorks() {
  const { lang } = useLanguage();

  if (business.howItWorks.length === 0) {
    // TODO: add real data to business.howItWorks
    return null;
  }

  return (
    <section id="how-it-works" className="container-section">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <div className="rcn-badge mx-auto">
              <span className="h-1.5 w-1.5 rounded-full bg-[rgb(var(--primary))]" />
              <span className="uppercase tracking-widest">
                {t(lang, "sectionHowItWorks")}
              </span>
            </div>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[rgb(var(--text))] sm:text-4xl">
              {t(lang, "sectionHowItWorks")}
            </h2>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {business.howItWorks.map((step, idx) => (
            <Reveal key={step.id} delay={idx * 0.05}>
              <Card
                size="md"
                className="group relative h-full overflow-visible">
                {idx < 2 ? (
                  <div className="pointer-events-none absolute right-[-14px] top-1/2 hidden w-7 -translate-y-1/2 border-t-2 border-dashed border-[rgb(var(--primary))]/30 lg:block" />
                ) : null}

                <div className="rcn-mono absolute -top-5 left-6 text-[2.5rem] font-medium text-[rgb(var(--primary))]/20 transition-colors group-hover:text-[rgb(var(--primary))]">
                  {(idx + 1).toString().padStart(2, "0")}
                </div>

                <div className="flex items-center gap-4 pt-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[rgb(var(--primary))]/30 bg-[rgb(var(--primary))]/10 text-[rgb(var(--primary))]">
                    {iconForStep(step.id)}
                  </div>
                  <h3 className="text-[1.2rem] font-semibold text-[rgb(var(--text))]">
                    {step.title[lang]}
                  </h3>
                </div>

                <p className="mt-4 text-sm leading-6 text-[rgb(var(--text-muted))]">
                  {step.description[lang]}
                </p>
              </Card>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="mt-10 flex justify-center">
            <Link href="/contact" className="rcn-btn-primary">
              {t(lang, "ctaGetConnected")}
            </Link>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
