"use client";

import * as React from "react";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

import { Container } from "@/components/landing/container";
import { business } from "@/data/business";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { t } from "@/lib/i18n";

const LINKS = [
  { key: "navHome", href: "/" },
  { key: "navPlans", href: "/plans" },
  { key: "navCoverage", href: "/coverage" },
  { key: "navAbout", href: "/about" },
  { key: "navContact", href: "/contact" },
  { key: "navFaq", href: "/faq" },
] as const;

export function Footer() {
  const { lang } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-[rgb(var(--primary))]/15 bg-[rgb(var(--footer-bg))] text-[rgb(var(--text))]">
      <Container className="py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="text-lg font-bold tracking-tight text-[rgb(var(--text))]">
              {business.company.name}
            </div>
            <p className="mt-3 text-sm leading-6 text-[rgb(var(--text-muted))]">
              {business.company.primaryServiceArea}
            </p>
            <div className="mt-6 inline-flex items-center rounded-full border border-[rgb(var(--primary))]/15 bg-white/5 px-3 py-1 text-xs text-[rgb(var(--text-muted))]">
              {business.company.shortName}
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold tracking-wide text-[rgb(var(--text))]">
              {t(lang, "footerQuickLinks")}
            </div>
            <ul className="mt-4 space-y-3 text-sm">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-[rgb(var(--text-muted))] transition hover:text-[rgb(var(--text))]">
                    {t(lang, l.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-sm font-semibold tracking-wide text-[rgb(var(--text))]">
              {t(lang, "sectionFeatures")}
            </div>
            <ul className="mt-4 space-y-3 text-sm text-[rgb(var(--text-muted))]">
              {business.features.slice(0, 4).map((f) => (
                <li key={f.id}>{f.title[lang]}</li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-sm font-semibold tracking-wide text-[rgb(var(--text))]">
              {t(lang, "footerContact")}
            </div>
            <div className="mt-4 space-y-3 text-sm">
              <div className="flex items-start gap-2 text-[rgb(var(--text-muted))]">
                <Phone className="mt-0.5 h-4 w-4 text-[rgb(var(--primary))]" />
                <a
                  className="hover:text-[rgb(var(--text))]"
                  href={`tel:${business.contact.phone.replace(/\s/g, "")}`}>
                  {business.contact.phone}
                </a>
              </div>
              <div className="flex items-start gap-2 text-[rgb(var(--text-muted))]">
                <Mail className="mt-0.5 h-4 w-4 text-[rgb(var(--primary))]" />
                <a
                  className="hover:text-[rgb(var(--text))]"
                  href={`mailto:${business.contact.email}`}>
                  {business.contact.email}
                </a>
              </div>
              <div className="flex items-start gap-2 text-[rgb(var(--text-muted))]">
                <MapPin className="mt-0.5 h-4 w-4 text-[rgb(var(--primary))]" />
                <span>{business.contact.address}</span>
              </div>
              {business.contact.googleMapsUrl ? (
                <a
                  href={business.contact.googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex text-sm font-semibold text-[rgb(var(--primary))] hover:text-[rgb(var(--primary-2))]">
                  Open in Google Maps
                </a>
              ) : null}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-[rgb(var(--primary))]/12 pt-8 text-sm text-[rgb(var(--text-muted))] sm:flex-row sm:items-center sm:justify-between">
          <div>
            © {year} {business.company.name}
          </div>
          <div className="text-[rgb(var(--text-soft))]">
            {business.company.primaryServiceArea}
          </div>
        </div>
      </Container>
    </footer>
  );
}
