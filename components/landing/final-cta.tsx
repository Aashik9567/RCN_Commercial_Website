"use client";

import Link from "next/link";
import { ArrowRight, Mail, PhoneCall } from "lucide-react";

import { Container } from "@/components/landing/container";
import { Reveal } from "@/components/landing/reveal";
import { FeaturedCard } from "@/components/ui/card";
import { business } from "@/data/business";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { t } from "@/lib/i18n";

export function FinalCTA() {
  const { lang } = useLanguage();

  return (
    <section id="get-started" className="container-section">
      <Container>
        <Reveal>
          <FeaturedCard
            from="rgb(var(--primary) / 0.10)"
            to="rgb(var(--green-400) / 0.08)"
            noHover
            className="p-10 sm:p-14">
            <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
              <div>
                <div className="rcn-badge w-fit">
                  <span className="h-1.5 w-1.5 rounded-full bg-[color:rgb(var(--primary))]" />
                  <span className="uppercase tracking-widest">
                    {t(lang, "ctaGetConnected")}
                  </span>
                </div>
                <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-[color:rgb(var(--text))] sm:text-4xl">
                  {business.company.name}
                </h2>
                <div className="mt-4 space-y-2 text-sm text-[color:rgb(var(--text-muted))]">
                  <div className="flex items-center gap-2">
                    <PhoneCall className="h-4 w-4 text-[color:rgb(var(--primary))]" />
                    <a
                      href={`tel:${business.contact.phone.replace(/\s/g, "")}`}
                      className="hover:underline">
                      {business.contact.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-[color:rgb(var(--primary))]" />
                    <a
                      href={`mailto:${business.contact.email}`}
                      className="hover:underline">
                      {business.contact.email}
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <Link href="/plans" className="rcn-btn-primary">
                  {t(lang, "ctaViewPlans")} <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/contact" className="rcn-btn-secondary">
                  {t(lang, "ctaContact")}
                </Link>
              </div>
            </div>
          </FeaturedCard>
        </Reveal>
      </Container>
    </section>
  );
}
