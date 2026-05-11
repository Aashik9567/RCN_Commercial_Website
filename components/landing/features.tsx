"use client";

import * as React from "react";
import { Cable, Headset, ShieldCheck, Wallet, Wifi, Zap } from "lucide-react";
import { Container } from "./container";
import { Reveal } from "./reveal";
import { Card } from "@/components/ui/card";
import { business } from "@/data/business";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { t } from "@/lib/i18n";

function iconForFeature(id: (typeof business.features)[number]["id"]) {
  switch (id) {
    case "high-speed-internet":
      return <Wifi className="h-5 w-5" />;
    case "24-7-support":
      return <Headset className="h-5 w-5" />;
    case "transparent-pricing":
      return <Wallet className="h-5 w-5" />;
    case "fiber-reliability":
      return <Cable className="h-5 w-5" />;
    case "business-plans":
      return <ShieldCheck className="h-5 w-5" />;
    case "fast-installation":
      return <Zap className="h-5 w-5" />;
  }
}

export function Features() {
  const { lang } = useLanguage();

  if (business.features.length < 6) {
    // TODO: add real data to business.features (must contain 6 items)
    return null;
  }

  return (
    <section id="features" className="container-section">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <div className="rcn-badge mx-auto">
              <span className="h-1.5 w-1.5 rounded-full bg-[rgb(var(--primary))]" />
              <span className="uppercase tracking-widest">
                {t(lang, "sectionFeatures")}
              </span>
            </div>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[rgb(var(--text))] sm:text-4xl">
              {t(lang, "sectionFeatures")}
            </h2>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {business.features.slice(0, 6).map((feature, idx) => (
            <Reveal key={feature.id} delay={idx * 0.04}>
              <Card
                size="md"
                accentColor="rgb(var(--primary) / 0.22)"
                className={
                  feature.id === "business-plans"
                    ? "border-dashed border-[rgb(var(--primary))]/35"
                    : ""
                }>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-[10px] border border-[rgb(var(--primary))]/18 bg-[rgb(var(--primary))]/12 text-[rgb(var(--primary))]">
                    {iconForFeature(feature.id)}
                  </div>
                  <h3 className="text-[1.2rem] font-semibold leading-snug text-[rgb(var(--text))]">
                    {feature.title[lang]}
                  </h3>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
