"use client";

import * as React from "react";
import Link from "next/link";
import { MapPin } from "lucide-react";

import { Container } from "@/components/landing/container";
import { Reveal } from "@/components/landing/reveal";
import { Card } from "@/components/ui/card";
import { business } from "@/data/business";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { t } from "@/lib/i18n";

function buildCoverageUrl(area: string) {
  const trimmed = area.trim();
  const message = [business.company.name, trimmed].filter(Boolean).join(" - ");

  if (business.contact.whatsappPhoneE164) {
    return `https://wa.me/${business.contact.whatsappPhoneE164}?text=${encodeURIComponent(message)}`;
  }

  return `mailto:${encodeURIComponent(business.contact.email)}?subject=${encodeURIComponent(business.company.name)}&body=${encodeURIComponent(message)}`;
}

export function Coverage() {
  const { lang } = useLanguage();
  const [area, setArea] = React.useState("");

  if (!business.coverage?.shortNote?.[lang]) {
    // TODO: add real data to business.coverage
    return null;
  }

  return (
    <section id="coverage" className="container-section">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <div className="rcn-badge mx-auto">
              <MapPin className="h-4 w-4 text-[rgb(var(--primary))]" />
              <span className="uppercase tracking-widest">
                {t(lang, "sectionCoverage")}
              </span>
            </div>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[rgb(var(--text))] sm:text-4xl">
              {t(lang, "sectionCoverage")}
            </h2>
            <p className="mt-4 text-[rgb(var(--text-muted))]">
              {business.coverage.shortNote[lang]}
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <Card noHover size="md" className="mx-auto mt-10 max-w-2xl">
            <form
              className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end"
              onSubmit={(e) => {
                e.preventDefault();
                window.location.href = buildCoverageUrl(area);
              }}>
              <label className="block">
                <div className="text-sm font-semibold text-[rgb(var(--text))]">
                  {t(lang, "coverageInputLabel")}
                </div>
                <input
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  placeholder={t(lang, "coverageInputPlaceholder")}
                  className="mt-2 h-12 w-full rounded-2xl border border-[rgb(var(--primary))]/20 bg-[rgb(var(--surface))]/55 px-4 text-[rgb(var(--text))] placeholder:text-[rgb(var(--text-soft))] outline-none backdrop-blur focus:border-[rgb(var(--primary))]/45 focus:ring-2 focus:ring-[rgb(var(--primary))]/20"
                />
              </label>
              <button
                type="submit"
                className="rcn-btn-primary h-12 rounded-2xl">
                {t(lang, "coverageSubmit")}
              </button>
            </form>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-3 text-sm">
              <Link href="/coverage" className="rcn-btn-secondary">
                {t(lang, "ctaCheckAvailability")}
              </Link>
              <Link href="/contact" className="rcn-btn-secondary">
                {t(lang, "ctaContact")}
              </Link>
            </div>
          </Card>
        </Reveal>
      </Container>
    </section>
  );
}
