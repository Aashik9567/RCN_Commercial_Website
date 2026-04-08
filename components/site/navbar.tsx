"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { Cable, Menu, Rocket, X } from "lucide-react";

import { Container } from "@/components/landing/container";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Plans", href: "/plans" },
  { label: "Coverage", href: "/coverage" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "FAQ", href: "/faq" },
] as const;

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <motion.header
      className="fixed top-0 z-50 w-full"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1] }}>
      <motion.div
        className={[
          "absolute inset-0 border-b backdrop-blur-2xl",
          "border-(--border-card) bg-(--bg-card-hover)",
        ].join(" ")}
        initial={{ opacity: 0 }}
        animate={{ opacity: scrolled ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      />

      <Container className="relative flex h-16 items-center justify-between gap-4">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 font-bold tracking-tight"
          aria-label="Raghunathpur Cable Network">
          <motion.span
            className={[
              "flex h-9 w-9 items-center justify-center rounded-xl border",
              "border-indigo-500/20 bg-linear-to-br from-indigo-500/10 to-purple-500/10",
              "text-indigo-600 dark:text-indigo-300",
            ].join(" ")}
            whileHover={{ scale: 1.07, rotate: 4 }}
            whileTap={{ scale: 0.96 }}>
            <Cable className="h-5 w-5" />
          </motion.span>
          <span className="hidden text-sm text-gray-900 dark:text-white sm:block">
            Raghunathpur{" "}
            <span className="text-gray-500 dark:text-white/50">
              Cable Network
            </span>
          </span>
          <span className="text-sm text-gray-900 dark:text-white sm:hidden">
            RCN
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {NAV_ITEMS.map((item) => {
            const active = isActive(pathname, item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={[
                  "relative rounded-xl px-3.5 py-2 text-sm font-medium transition-colors",
                  active
                    ? "text-gray-900 dark:text-white"
                    : "text-gray-600 hover:text-gray-900 dark:text-white/55 dark:hover:text-white",
                ].join(" ")}>
                {active && (
                  <motion.span
                    layoutId="nav-active"
                    className={[
                      "absolute inset-0 rounded-xl",
                      "bg-indigo-500/10 dark:bg-white/10",
                    ].join(" ")}
                    transition={{
                      type: "spring",
                      bounce: 0.25,
                      duration: 0.35,
                    }}
                  />
                )}
                <span className="relative">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          <ThemeToggle />

          <div className="hidden sm:block">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/contact"
                className={[
                  "inline-flex h-10 items-center justify-center rounded-xl px-4 text-sm font-semibold",
                  "bg-linear-to-r from-indigo-600 to-purple-600 text-white",
                  "shadow-lg shadow-indigo-500/20",
                  "transition-shadow hover:shadow-indigo-500/30",
                ].join(" ")}>
                <Rocket className="h-4 w-4" />
                Get Connection
              </Link>
            </motion.div>
          </div>

          {/* Mobile hamburger */}
          <motion.button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className={[
              "inline-flex h-9 w-9 items-center justify-center rounded-xl border",
              "border-(--border-card) bg-(--bg-card) text-(--text-primary) backdrop-blur-xl",
              "transition-colors hover:bg-(--bg-card-hover)",
              "lg:hidden",
            ].join(" ")}
            onClick={() => setOpen((v) => !v)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}>
            <AnimatePresence mode="wait" initial={false}>
              {open ? (
                <motion.span
                  key="x"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}>
                  <X className="h-4 w-4" />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.15 }}>
                  <Menu className="h-4 w-4" />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </Container>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            className={[
              "overflow-hidden border-t backdrop-blur-2xl lg:hidden",
              "border-(--border-card) bg-(--bg-card-hover)",
            ].join(" ")}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}>
            <Container className="py-5">
              <div className="flex flex-col gap-1">
                {NAV_ITEMS.map((item, i) => {
                  const active = isActive(pathname, item.href);

                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}>
                      <Link
                        href={item.href}
                        className={[
                          "block rounded-xl px-4 py-3 text-sm font-medium transition-colors",
                          active
                            ? "bg-indigo-500/10 text-gray-900 dark:bg-white/10 dark:text-white"
                            : "text-gray-700 hover:bg-black/5 hover:text-gray-900 dark:text-white/70 dark:hover:bg-white/8 dark:hover:text-white",
                        ].join(" ")}>
                        {item.label}
                      </Link>
                    </motion.div>
                  );
                })}

                <div className="mt-3">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}>
                    <Link
                      href="/contact"
                      className={[
                        "inline-flex h-12 w-full items-center justify-center rounded-2xl px-4 text-sm font-semibold",
                        "bg-linear-to-r from-indigo-600 to-purple-600 text-white",
                      ].join(" ")}>
                      <Rocket className="h-4 w-4" />
                      Get Connection
                    </Link>
                  </motion.div>
                </div>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
