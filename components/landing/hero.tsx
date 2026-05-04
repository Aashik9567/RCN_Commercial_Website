"use client";

import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";

import { Container } from "@/components/landing/container";
import { Reveal } from "@/components/landing/reveal";
import { Card } from "@/components/ui/card";
import { CountUp } from "@/components/ui/CountUp";
import { business } from "@/data/business";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { t } from "@/lib/i18n";

export function Hero() {
  const { lang } = useLanguage();

  const speed = business.stats.find((s) => s.id === "speed");
  const uptime = business.stats.find((s) => s.id === "uptime");
  const areas = business.stats.find((s) => s.id === "areas");

  return (
    <section className="container-section pt-10">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <div>
              <div className="rcn-badge">
                <span className="h-1.5 w-1.5 rounded-full bg-[color:rgb(var(--primary))]" />
                <span className="uppercase tracking-widest">
                  {t(lang, "heroEyebrow")}
                </span>
              </div>

              <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-[color:rgb(var(--text))] sm:text-5xl">
                {t(lang, "heroHeadlineA")}{" "}
                <span className="text-[color:rgb(var(--primary))]">
                  {t(lang, "heroHeadlineB")}
                </span>
              </h1>

              <p className="mt-5 max-w-xl text-lg leading-8 text-[color:rgb(var(--text-muted))]">
                {t(lang, "heroSubhead")}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link href="/contact" className="rcn-btn-primary">
                  {t(lang, "ctaGetConnected")}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/plans" className="rcn-btn-secondary">
                  {t(lang, "ctaViewPlans")}
                </Link>
                <Link href="/coverage" className="rcn-btn-secondary">
                  {t(lang, "ctaCheckAvailability")}
                </Link>
              </div>

              <div className="mt-8 flex items-center gap-2 text-sm text-[color:rgb(var(--text-soft))]">
                <MapPin className="h-4 w-4" />
                <span>{business.company.primaryServiceArea}</span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <Card noHover className="p-6 sm:p-8">
              <div className="text-sm font-semibold text-[color:rgb(var(--text))]">
                {t(lang, "sectionStats")}
              </div>
              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                {speed ? (
                  <div>
                    <div className="text-2xl font-extrabold text-[color:rgb(var(--text))]">
                      <CountUp value={speed.value} decimals={0} />
                      <span className="text-base font-bold text-[color:rgb(var(--text-soft))]">
                        {speed.suffix}
                      </span>
                    </div>
                    <div className="mt-1 text-sm text-[color:rgb(var(--text-muted))]">
                      {speed.label[lang]}
                    </div>
                  </div>
                ) : null}

                {uptime ? (
                  <div>
                    <div className="text-2xl font-extrabold text-[color:rgb(var(--text))]">
                      <CountUp value={uptime.value} decimals={1} />
                      <span className="text-base font-bold text-[color:rgb(var(--text-soft))]">
                        {uptime.suffix}
                      </span>
                    </div>
                    <div className="mt-1 text-sm text-[color:rgb(var(--text-muted))]">
                      {uptime.label[lang]}
                    </div>
                  </div>
                ) : null}

                {areas ? (
                  <div>
                    <div className="text-2xl font-extrabold text-[color:rgb(var(--text))]">
                      <CountUp value={areas.value} decimals={0} />
                      <span className="text-base font-bold text-[color:rgb(var(--text-soft))]">
                        {areas.suffix}
                      </span>
                    </div>
                    <div className="mt-1 text-sm text-[color:rgb(var(--text-muted))]">
                      {areas.label[lang]}
                    </div>
                  </div>
                ) : null}
              </div>
            </Card>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
