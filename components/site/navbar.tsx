"use client";

import * as React from "react";
import clsx from "clsx";
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
        className={clsx(
          "absolute inset-0 border-b backdrop-blur-xl",
          "border-gray-200/60 bg-white/75 dark:border-white/8 dark:bg-[#040714]/80",
        )}
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
            className={clsx(
              "flex h-9 w-9 items-center justify-center rounded-xl border",
              "border-gray-300/70 bg-white/70 text-gray-700 backdrop-blur-xl",
              "dark:border-white/8 dark:bg-white/6 dark:text-gray-200",
            )}
            whileHover={{ scale: 1.07, rotate: 4 }}
            whileTap={{ scale: 0.96 }}>
            <img
              src="/favicon.ico"
              alt="Raghunathpur Cable Network Logo"
              className="h-9 w-9 object-cover rounded-full"
            />
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
                className={clsx(
                  "relative rounded-xl px-3.5 py-2 text-sm font-medium transition-colors",
                  active
                    ? "text-gray-900 dark:text-white"
                    : "text-gray-600 hover:text-gray-900 dark:text-zinc-300 dark:hover:text-white",
                )}>
                {active && (
                  <motion.span
                    layoutId="nav-active"
                    className={clsx(
                      "absolute inset-0 rounded-xl",
                      "bg-gray-200/70 dark:bg-gray-800",
                    )}
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
          <div className="hidden items-center gap-2 sm:flex">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/plans"
                className={clsx(
                  "inline-flex h-10 items-center justify-center rounded-xl border px-4 text-sm font-semibold backdrop-blur-xl transition-colors",
                  "border-gray-300 bg-white/80 text-gray-800 hover:bg-white",
                  "dark:border-white/15 dark:bg-white/6 dark:text-white/80",
                )}>
                View Plans
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/contact"
                className={clsx(
                  "inline-flex h-10 items-center justify-center rounded-xl px-4 text-sm font-semibold text-white",
                  "bg-linear-to-r from-cyan-500 to-violet-600",
                )}>
                <Rocket className="h-4 w-4" />
                Get Started
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
              "border-gray-200 bg-white text-gray-900 backdrop-blur-xl",
              "transition-colors hover:bg-gray-50",
              "dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:hover:bg-gray-800",
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
              "border-gray-200/60 bg-white/90 dark:border-white/8 dark:bg-[#040714]/80",
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
                            ? "bg-gray-200 text-gray-900 dark:bg-gray-800 dark:text-white"
                            : "text-gray-800 hover:bg-gray-100 hover:text-gray-900 dark:text-zinc-200 dark:hover:bg-black/40 dark:hover:text-white",
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
                      className="inline-flex h-12 w-full items-center justify-center rounded-2xl bg-linear-to-r from-cyan-500 to-violet-600 px-4 text-sm font-semibold text-white">
                      <Rocket className="h-4 w-4" />
                      Get Started
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
