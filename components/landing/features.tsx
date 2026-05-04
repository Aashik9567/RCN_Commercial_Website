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
              <span className="h-1.5 w-1.5 rounded-full bg-[color:rgb(var(--primary))]" />
              <span className="uppercase tracking-widest">
                {t(lang, "sectionFeatures")}
              </span>
            </div>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[color:rgb(var(--text))] sm:text-4xl">
              {t(lang, "sectionFeatures")}
            </h2>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {business.features.slice(0, 6).map((feature, idx) => (
            <Reveal key={feature.id} delay={idx * 0.04}>
              <Card className="p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[color:rgb(var(--surface-2))] text-[color:rgb(var(--primary))]">
                    {iconForFeature(feature.id)}
                  </div>
                  <div className="text-sm font-semibold text-[color:rgb(var(--text))]">
                    {feature.title[lang]}
                  </div>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
