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
    <section className="min-h-[calc(100vh-68px)] py-12 sm:py-16">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <div>
              <div className="rcn-badge">
                <span className="rcn-pulse-dot h-1.5 w-1.5 rounded-full bg-[rgb(var(--primary))]" />
                <span className="uppercase tracking-widest">
                  {t(lang, "heroEyebrow")}
                </span>
              </div>

              <h1 className="mt-6 text-[clamp(2.8rem,6.5vw,5rem)] font-bold leading-[1.05] tracking-tight text-[rgb(var(--text))]">
                {t(lang, "heroHeadlineA")}{" "}
                <span className="italic text-[rgb(var(--primary))]">
                  {t(lang, "heroHeadlineB")}
                </span>
              </h1>

              <p className="mt-5 max-w-xl text-lg leading-8 text-[rgb(var(--text-muted))]">
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

              <div className="mt-8 flex items-center gap-2 text-sm text-[rgb(var(--text-soft))]">
                <MapPin className="h-4 w-4" />
                <span>{business.company.primaryServiceArea}</span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <Card noHover size="md" className="rcn-float">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-semibold text-[rgb(var(--text))]">
                  <span className="rcn-pulse-dot h-2 w-2 rounded-full bg-[rgb(var(--primary))]" />
                  <span>Network Live — All Operational</span>
                </div>
                <div className="rcn-card rcn-card-sm border-[rgb(var(--primary))]/12 bg-[rgb(var(--surface))]/50 text-[rgb(var(--text-muted))]">
                  <span className="rcn-mono text-[rgb(var(--sage))]">25+</span>{" "}
                  Areas
                </div>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {speed ? (
                  <div className="rounded-xl border border-[rgb(var(--primary))]/12 bg-[rgb(var(--surface-2))]/35 p-3">
                    <div className="rcn-mono text-2xl font-semibold text-[rgb(var(--primary))]">
                      <CountUp value={speed.value} decimals={0} />
                      <span className="text-base font-medium text-[rgb(var(--text-soft))]">
                        {speed.suffix}
                      </span>
                    </div>
                    <div className="mt-1 text-xs tracking-wide text-[rgb(var(--text-soft))]">
                      {speed.label[lang]}
                    </div>
                  </div>
                ) : null}

                {uptime ? (
                  <div className="rounded-xl border border-[rgb(var(--primary))]/12 bg-[rgb(var(--surface-2))]/35 p-3">
                    <div className="rcn-mono text-2xl font-semibold text-[rgb(var(--primary))]">
                      <CountUp value={uptime.value} decimals={1} />
                      <span className="text-base font-medium text-[rgb(var(--text-soft))]">
                        {uptime.suffix}
                      </span>
                    </div>
                    <div className="mt-1 text-xs tracking-wide text-[rgb(var(--text-soft))]">
                      {uptime.label[lang]}
                    </div>
                  </div>
                ) : null}

                {areas ? (
                  <div className="rounded-xl border border-[rgb(var(--primary))]/12 bg-[rgb(var(--surface-2))]/35 p-3">
                    <div className="rcn-mono text-2xl font-semibold text-[rgb(var(--primary))]">
                      <CountUp value={areas.value} decimals={0} />
                      <span className="text-base font-medium text-[rgb(var(--text-soft))]">
                        {areas.suffix}
                      </span>
                    </div>
                    <div className="mt-1 text-xs tracking-wide text-[rgb(var(--text-soft))]">
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
