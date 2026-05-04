"use client";

import * as React from "react";

import { Container } from "@/components/landing/container";
import { Reveal } from "@/components/landing/reveal";
import { useLanguage } from "@/components/i18n/LanguageProvider";

export function PageHeader({
  badge,
  title,
  description,
}: {
  badge: string;
  title: React.ReactNode;
  description: string;
}) {
  const { lang } = useLanguage();

  return (
    <section className="relative pb-12 pt-10 sm:pb-16 sm:pt-14">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <div className="rcn-badge mx-auto w-fit">
              <span className="h-1.5 w-1.5 rounded-full bg-[color:rgb(var(--primary))]" />
              <span className="uppercase tracking-widest">{badge}</span>
            </div>
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-[color:rgb(var(--text))] sm:text-5xl">
              {title}
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-[color:rgb(var(--text-muted))]">
              {description}
            </p>
            {lang === "np" ? (
              <p className="mx-auto mt-3 max-w-2xl text-sm text-[color:rgb(var(--text-soft))]">
                {/* TODO: add real Nepali copy in /lib/i18n */}
              </p>
            ) : null}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
