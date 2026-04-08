import * as React from "react";
import { Globe, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Container } from "./container";

const LINKS = [
  { label: "Features", href: "#features" },
  { label: "Plans", href: "#pricing" },
  { label: "Why Us", href: "#why-us" },
  { label: "FAQ", href: "#faq" },
];

export function Footer() {
  return (
    <footer
      id="contact"
      className="border-t border-gray-200/60 bg-linear-to-b from-white/50 to-gray-50/30 dark:border-gray-800/60 dark:from-gray-900/50 dark:to-gray-950/30">
      <Container className="py-12 sm:py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-xl font-bold text-transparent">
              Raghunathpur Cable Network
            </div>
            <p className="mt-4 text-sm leading-6 text-gray-600 dark:text-gray-400">
              Modern fiber internet with local support—built for speed,
              reliability, and exceptional service.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href="#"
                aria-label="Website"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200/60 bg-white/80 text-gray-700 transition-all hover:border-indigo-300 hover:bg-indigo-50 dark:border-gray-700/60 dark:bg-gray-800/60 dark:text-gray-300 dark:hover:border-indigo-500 dark:hover:bg-indigo-950/30">
                <Globe className="h-5 w-5" />
              </a>
              <a
                href="#"
                aria-label="Message"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200/60 bg-white/80 text-gray-700 transition-all hover:border-indigo-300 hover:bg-indigo-50 dark:border-gray-700/60 dark:bg-gray-800/60 dark:text-gray-300 dark:hover:border-indigo-500 dark:hover:bg-indigo-950/30">
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-white">
              Quick links
            </div>
            <ul className="mt-5 space-y-3 text-sm">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-gray-600 transition-colors hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-white">
              Support
            </div>
            <ul className="mt-5 space-y-3 text-sm text-gray-600 dark:text-gray-400">
              <li>24/7 assistance</li>
              <li>Plan upgrades</li>
              <li>Installation scheduling</li>
              <li>Business solutions</li>
            </ul>
          </div>

          <div>
            <div className="text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-white">
              Contact
            </div>
            <div className="mt-5 space-y-3 text-sm text-gray-600 dark:text-gray-400">
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
                  href="mailto:support@example.com">
                  support@example.com
                </a>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-indigo-500" />
                <span>Sabaila-12, Raghunathpur, Nepal</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-gray-200/60 pt-8 text-sm text-gray-600 dark:border-gray-800/60 dark:text-gray-400 sm:flex-row sm:items-center sm:justify-between">
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
