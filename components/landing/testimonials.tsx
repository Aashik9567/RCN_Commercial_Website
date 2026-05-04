"use client";

import * as React from "react";
import { MessageCircle } from "lucide-react";
import { Container } from "./container";
import { Reveal } from "./reveal";
import { Card } from "@/components/ui/card";
import { business } from "@/data/business";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { t } from "@/lib/i18n";

function initials(name: string) {
  const parts = name.replace(/\./g, "").split(" ").filter(Boolean);
  return parts
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");
}

function TestimonialCard({
  name,
  quote,
  source,
}: {
  name: string;
  quote: string;
  source?: string;
}) {
  return (
    <Card className="p-6 sm:p-8">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[color:rgb(var(--border))] bg-[color:rgb(var(--surface-2))] text-sm font-bold text-[color:rgb(var(--text))]">
          {initials(name)}
        </div>
        <div>
          <div className="text-sm font-semibold text-[color:rgb(var(--text))]">
            {name}
          </div>
          {source ? (
            <div className="text-xs text-[color:rgb(var(--text-soft))]">
              {source}
            </div>
          ) : null}
        </div>
      </div>

      <p className="mt-5 text-sm leading-6 text-[color:rgb(var(--text-muted))]">
        <span className="text-lg text-[color:rgb(var(--text-soft))]">
          &ldquo;
        </span>
        {quote}
        <span className="text-lg text-[color:rgb(var(--text-soft))]">
          &rdquo;
        </span>
      </p>
    </Card>
  );
}

export function Testimonials() {
  const { lang } = useLanguage();

  if (business.testimonials.length === 0) {
    // TODO: add real data to business.testimonials
    return null;
  }

  return (
    <section id="testimonials" className="container-section">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <div className="rcn-badge mx-auto">
              <MessageCircle className="h-4 w-4 text-[color:rgb(var(--primary))]" />
              <span className="uppercase tracking-widest">
                {t(lang, "sectionTestimonials")}
              </span>
            </div>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[color:rgb(var(--text))] sm:text-4xl">
              {t(lang, "sectionTestimonials")}
            </h2>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {business.testimonials.map((item, idx) => (
            <Reveal key={`${item.name}-${idx}`} delay={idx * 0.04}>
              <TestimonialCard
                name={item.name}
                quote={item.quote}
                source={item.source}
              />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
