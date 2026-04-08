"use client";

import * as React from "react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { Cable, Menu, X } from "lucide-react";
import { Container } from "./container";

const NAV_ITEMS = [
  { label: "Features", href: "#features" },
  { label: "Plans", href: "#pricing" },
  { label: "Why Us", href: "#why-us" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "FAQ", href: "#faq" },
];

export function Navbar() {
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const { scrollY } = useScroll();

  // Detect scroll for background change
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 30));

  const close = () => setOpen(false);

  return (
    <motion.header
      className="fixed top-0 z-50 w-full"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1] }}>
      {/* Backdrop — shows once scrolled */}
      <motion.div
        className="absolute inset-0 border-b border-white/6 bg-[#040714]/80 backdrop-blur-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: scrolled ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      <Container className="relative flex h-16 items-center justify-between gap-4">
        {/* Logo */}
        <a
          href="#home"
          className="flex items-center gap-3 font-bold tracking-tight text-white"
          onClick={close}>
          <motion.span
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-cyan-500/30 bg-linear-to-br from-cyan-500/20 to-violet-600/20 text-cyan-400"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}>
            <img src="/favicon.ico" alt="RCN Logo" className="h-5 w-5" />
          </motion.span>
          <span className="hidden text-sm sm:block">
            Raghunathpur <span className="text-white/50">Cable Network</span>
          </span>
          <span className="text-sm sm:hidden">RCN</span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) => (
            <motion.a
              key={item.href}
              href={item.href}
              className="relative rounded-xl px-3.5 py-2 text-sm font-medium text-white/55 transition-colors hover:text-white"
              whileHover="hover">
              {/* Hover bg pill */}
              <motion.span
                className="absolute inset-0 rounded-xl bg-white/6"
                initial={{ opacity: 0 }}
                variants={{ hover: { opacity: 1 } }}
                transition={{ duration: 0.15 }}
              />
              <span className="relative">{item.label}</span>
            </motion.a>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          {/* View Plans */}
          <motion.a
            href="#pricing"
            className="hidden rounded-xl border border-white/15 bg-white/6 px-4 py-2 text-sm font-semibold text-white/75 backdrop-blur-sm transition-colors hover:border-white/25 hover:bg-white/10 hover:text-white sm:inline-flex"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={close}>
            View Plans
          </motion.a>

          {/* Get Started */}
          <motion.a
            href="#get-started"
            className="hidden rounded-xl bg-linear-to-r from-cyan-500 to-violet-600 px-4 py-2 text-sm font-semibold text-white shadow-[0_0_20px_rgba(0,229,255,0.25)] sm:inline-flex"
            whileHover={{
              scale: 1.04,
              boxShadow: "0 0 30px rgba(0,229,255,0.4)",
            }}
            whileTap={{ scale: 0.97 }}
            onClick={close}>
            Get Started
          </motion.a>

          {/* Mobile hamburger */}
          <motion.button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/15 bg-white/6 text-white lg:hidden"
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
            className="overflow-hidden border-t border-white/6 bg-[#040714]/95 backdrop-blur-2xl lg:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}>
            <Container className="py-5">
              <div className="flex flex-col gap-1">
                {NAV_ITEMS.map((item, i) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    className="rounded-xl px-4 py-3 text-sm font-medium text-white/65 transition-colors hover:bg-white/6 hover:text-white"
                    onClick={close}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}>
                    {item.label}
                  </motion.a>
                ))}

                <div className="mt-3 grid grid-cols-2 gap-3">
                  <motion.a
                    href="#pricing"
                    className="rounded-xl border border-white/15 bg-white/6 py-3 text-center text-sm font-semibold text-white/75"
                    onClick={close}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}>
                    View Plans
                  </motion.a>
                  <motion.a
                    href="#get-started"
                    className="rounded-xl bg-linear-to-r from-cyan-500 to-violet-600 py-3 text-center text-sm font-semibold text-white"
                    onClick={close}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}>
                    Get Started
                  </motion.a>
                </div>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
