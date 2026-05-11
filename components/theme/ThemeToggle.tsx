"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "next-themes";
import * as React from "react";

const MODES = ["system", "light", "dark"] as const;
type Mode = (typeof MODES)[number];

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="h-9 w-9" />;

  const cycle = () => {
    const idx = MODES.indexOf(((theme as Mode) ?? "system") as Mode);
    setTheme(MODES[(idx + 1) % MODES.length]);
  };

  const Icon = theme === "dark" ? Moon : theme === "light" ? Sun : Monitor;
  const label = `Theme: ${theme ?? "system"}`;

  return (
    <motion.button
      onClick={cycle}
      aria-label={label}
      title={label}
      className="flex h-9 w-9 items-center justify-center rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] text-[rgb(var(--text-muted))] shadow-sm transition-colors hover:bg-[rgb(var(--surface-2))] hover:text-[rgb(var(--text))]"
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.94 }}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ rotate: -40, opacity: 0, scale: 0.7 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 40, opacity: 0, scale: 0.7 }}
          transition={{ duration: 0.18 }}>
          <Icon className="h-4 w-4" />
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}
