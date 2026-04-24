"use client";

import { useTheme } from "next-themes";
import * as React from "react";
import { Moon, Sun, Monitor } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
      className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-300/70 bg-white/75 text-gray-600 backdrop-blur-sm transition-colors hover:bg-white hover:text-gray-900 dark:border-white/15 dark:bg-white/[0.06] dark:text-gray-300 dark:hover:text-white"
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
