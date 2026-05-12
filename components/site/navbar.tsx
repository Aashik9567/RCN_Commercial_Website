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

  const desktopLinkBase =
    "relative px-3 py-2 text-[0.9rem] font-medium transition-colors " +
    "text-[rgb(var(--text-muted))] hover:text-[rgb(var(--primary))] " +
    "after:absolute after:left-3 after:right-3 after:bottom-1 after:h-[2px] after:rounded-full " +
    "after:bg-[rgb(var(--primary))] after:origin-left after:scale-x-0 after:transition-transform after:duration-200 " +
    "hover:after:scale-x-100";

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={
          "border-b backdrop-blur-md " +
          "shadow-[0_4px_24px_rgba(0,0,0,0.4)] " +
          "light:shadow-[0_2px_8px_rgba(0,0,0,0.08)] " +
          (scrolled ? "bg-[rgb(var(--bg))]/90" : "bg-[rgb(var(--bg))]/85")
        }
        style={{ borderColor: "rgb(var(--primary) / 0.12)" }}>
        <Container className="flex h-17 items-center justify-between gap-3">
          <Link
            href="/"
            className="flex items-center gap-3"
            aria-label={business.company.name}>
            <span className="flex h-9 w-9 items-center justify-center rounded-lg border-[1.5px] border-[rgb(var(--primary))] bg-[rgb(var(--primary))]/12">
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
              <div className="rcn-mono text-sm font-semibold tracking-wide text-[rgb(var(--text))]">
                {business.company.shortName}
              </div>
              <div className="hidden text-xs sm:block w-max">
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
                    desktopLinkBase +
                    (active
                      ? " text-[rgb(var(--primary))] after:scale-x-100"
                      : "")
                  }>
                  {t(lang, item.key)}
                </Link>
              );
            })}
          </nav>
      
          <div className="flex items-center gap-2">
            <ThemeToggle />

            <div className="hidden flex-nowrap  items-center gap-2 md:flex">
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
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[rgb(var(--primary))]/20 bg-[rgb(var(--surface))]/60 text-[rgb(var(--text))] backdrop-blur lg:hidden"
              onClick={() => setOpen((v) => !v)}>
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </Container>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}>
            <button
              type="button"
              aria-label="Close menu"
              className="absolute inset-0 bg-black/50"
              onClick={() => setOpen(false)}
            />

            <motion.aside
              className="absolute right-0 top-0 h-full w-[min(360px,92vw)] border-l border-[rgb(var(--primary))]/12 bg-[rgb(var(--bg))]/97 p-5 backdrop-blur-xl"
              initial={{ x: 40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 40, opacity: 0 }}
              transition={{ duration: 0.2 }}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ThemeToggle />
                  <LanguageToggle />
                </div>
                <button
                  type="button"
                  aria-label="Close menu"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[rgb(var(--primary))]/20 bg-[rgb(var(--surface))]/60 text-[rgb(var(--text))]"
                  onClick={() => setOpen(false)}>
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-6 grid gap-2">
                {NAV_ITEMS.map((item, i) => {
                  const active = isActive(pathname, item.href);
                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.03 }}>
                      <Link
                        href={item.href}
                        className={
                          "block rounded-2xl border px-4 py-3 text-sm font-semibold transition " +
                          "border-[rgb(var(--primary))]/12 bg-[rgb(var(--surface))]/40 text-[rgb(var(--text))] " +
                          (active
                            ? "outline outline-[rgb(var(--primary))]/30"
                            : "hover:bg-[rgb(var(--surface-2))]/50")
                        }>
                        {t(lang, item.key)}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              <div className="mt-6 grid gap-2">
                <Link href="/plans" className="rcn-btn-secondary w-full">
                  {t(lang, "ctaViewPlans")}
                </Link>
                <Link href="/contact" className="rcn-btn-primary w-full">
                  {t(lang, "ctaGetConnected")}
                </Link>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
