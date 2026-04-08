"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun, Monitor } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const MODES = ["system", "light", "dark"] as const;

type Mode = (typeof MODES)[number];

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="h-9 w-9" />;

  const current = ((theme ?? "system") as Mode) || "system";

  const cycle = () => {
    const idx = MODES.indexOf(current);
    setTheme(MODES[(idx + 1) % MODES.length]);
  };

  const Icon = current === "dark" ? Moon : current === "light" ? Sun : Monitor;
  const label =
    current === "dark"
      ? "Dark mode"
      : current === "light"
        ? "Light mode"
        : "System mode";

  return (
    <motion.button
      onClick={cycle}
      aria-label={`Switch theme (currently ${label})`}
      title={label}
      className={
        "relative flex h-9 w-9 items-center justify-center rounded-xl " +
        "border border-(--border-card) bg-(--bg-card) text-(--text-secondary) " +
        "backdrop-blur-sm transition-colors " +
        "hover:bg-(--bg-card-hover) hover:text-(--text-primary)"
      }
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.94 }}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={current}
          initial={{ rotate: -30, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: 30, opacity: 0 }}
          transition={{ duration: 0.2 }}>
          <Icon className="h-4 w-4" />
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}
