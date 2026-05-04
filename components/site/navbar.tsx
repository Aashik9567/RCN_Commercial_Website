"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { Menu, X } from "lucide-react";

import { Container } from "@/components/landing/container";
import { LanguageToggle } from "@/components/i18n/LanguageToggle";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { business } from "@/data/business";
import { t } from "@/lib/i18n";

const NAV_ITEMS = [
  { key: "navHome", href: "/" },
  { key: "navPlans", href: "/plans" },
  { key: "navCoverage", href: "/coverage" },
  { key: "navAbout", href: "/about" },
  { key: "navContact", href: "/contact" },
  { key: "navFaq", href: "/faq" },
] as const;

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function Navbar() {
  const pathname = usePathname();
  const { lang } = useLanguage();

  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 8));

  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50">
      <div
        className={
          "border-b backdrop-blur " +
          (scrolled
            ? "bg-[color:rgb(var(--surface))]/90 shadow-sm"
            : "bg-[color:rgb(var(--surface))]/70")
        }
        style={{ borderColor: "rgb(var(--border))" }}>
        <Container className="flex h-16 items-center justify-between gap-3">
          <Link
            href="/"
            className="flex items-center gap-3"
            aria-label={business.company.name}>
            <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-[color:rgb(var(--border))] bg-[color:rgb(var(--surface))]">
              <Image
                src="/favicon.ico"
                alt={`${business.company.name} Logo`}
                width={32}
                height={32}
                className="h-8 w-8 rounded-lg"
                priority
              />
            </span>
            <div className="leading-tight">
              <div className="text-sm font-extrabold text-[color:rgb(var(--text))]">
                {business.company.shortName}
              </div>
              <div className="hidden text-xs text-[color:rgb(var(--text-muted))] sm:block">
                {business.company.name}
              </div>
            </div>
          </Link>

          <nav
            className="hidden items-center gap-1 lg:flex"
            aria-label="Primary">
            {NAV_ITEMS.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={
                    "rounded-xl px-3 py-2 text-sm font-semibold transition " +
                    (active
                      ? "bg-[color:rgb(var(--surface-2))] text-[color:rgb(var(--text))]"
                      : "text-[color:rgb(var(--text-muted))] hover:text-[color:rgb(var(--text))]")
                  }>
                  {t(lang, item.key)}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <div className="hidden sm:block">
              <LanguageToggle />
            </div>

            <div className="hidden items-center gap-2 md:flex">
              <Link href="/plans" className="rcn-btn-secondary">
                {t(lang, "ctaViewPlans")}
              </Link>
              <Link href="/contact" className="rcn-btn-primary">
                {t(lang, "ctaGetConnected")}
              </Link>
            </div>

            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[color:rgb(var(--border))] bg-[color:rgb(var(--surface))] text-[color:rgb(var(--text))] lg:hidden"
              onClick={() => setOpen((v) => !v)}>
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </Container>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="border-b bg-[color:rgb(var(--surface))] lg:hidden"
            style={{ borderColor: "rgb(var(--border))" }}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}>
            <Container className="py-3">
              <div className="flex items-center justify-between gap-3 pb-3">
                <ThemeToggle />
                <LanguageToggle />
              </div>

              <div className="grid gap-2">
                {NAV_ITEMS.map((item, i) => {
                  const active = isActive(pathname, item.href);
                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.03 }}>
                      <Link
                        href={item.href}
                        className={
                          "block rounded-xl px-4 py-3 text-sm font-semibold transition " +
                          (active
                            ? "bg-[color:rgb(var(--surface-2))] text-[color:rgb(var(--text))]"
                            : "text-[color:rgb(var(--text))] hover:bg-[color:rgb(var(--surface-2))]")
                        }>
                        {t(lang, item.key)}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              <div className="mt-3 grid gap-2">
                <Link href="/plans" className="rcn-btn-secondary">
                  {t(lang, "ctaViewPlans")}
                </Link>
                <Link href="/contact" className="rcn-btn-primary">
                  {t(lang, "ctaGetConnected")}
                </Link>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
