import * as React from "react";
import Link from "next/link";
import { Globe, Mail, MapPin, MessageCircle, Phone } from "lucide-react";

import { Container } from "@/components/landing/container";

const LINKS = [
  { label: "Home", href: "/" },
  { label: "Plans", href: "/plans" },
  { label: "Coverage", href: "/coverage" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "FAQ", href: "/faq" },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-(--border-card) bg-transparent backdrop-blur-[2px]">
      <Container className="py-12 sm:py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-xl font-bold text-transparent">
              Raghunathpur Cable Network
            </div>
            <p className="mt-4 text-sm leading-6 text-(--text-muted)">
              Modern fiber internet with local support—built for speed,
              reliability, and exceptional service.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href="#"
                aria-label="Website"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-(--border-card) bg-(--bg-card) text-(--text-secondary) transition-colors hover:bg-(--bg-card-hover) hover:text-(--text-primary)">
                <Globe className="h-5 w-5" />
              </a>
              <a
                href="#"
                aria-label="Message"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-(--border-card) bg-(--bg-card) text-(--text-secondary) transition-colors hover:bg-(--bg-card-hover) hover:text-(--text-primary)">
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold uppercase tracking-wider text-(--text-primary)">
              Quick links
            </div>
            <ul className="mt-5 space-y-3 text-sm">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-(--text-muted) transition-colors hover:text-indigo-600 dark:hover:text-indigo-400">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-sm font-semibold uppercase tracking-wider text-(--text-primary)">
              Support
            </div>
            <ul className="mt-5 space-y-3 text-sm text-(--text-muted)">
              <li>24/7 assistance</li>
              <li>Plan upgrades</li>
              <li>Installation scheduling</li>
              <li>Business solutions</li>
            </ul>
          </div>

          <div>
            <div className="text-sm font-semibold uppercase tracking-wider text-(--text-primary)">
              Contact
            </div>
            <div className="mt-5 space-y-3 text-sm text-(--text-muted)">
              <div className="flex items-start gap-2">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-indigo-500" />
                <a
                  className="hover:text-indigo-600 dark:hover:text-indigo-400"
                  href="tel:+9779801663644">
                  +977 9801663644
                </a>
              </div>
              <div className="flex items-start gap-2">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-indigo-500" />
                <a
                  className="hover:text-indigo-600 dark:hover:text-indigo-400"
                  href="mailto:raghumathpurcable2010@gmail.com">
                  raghumathpurcable2010@gmail.com
                </a>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-indigo-500" />
                <span>Sabaila-12, Raghunathpur, Nepal</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-(--border-card) pt-8 text-sm text-(--text-muted) sm:flex-row sm:items-center sm:justify-between">
          <div className="font-medium">© 2026 Raghunathpur Cable Network</div>
          <div className="flex gap-2">
            <span>Built for speed</span>
            <span className="text-indigo-600 dark:text-indigo-400">•</span>
            <span>Designed for trust</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
