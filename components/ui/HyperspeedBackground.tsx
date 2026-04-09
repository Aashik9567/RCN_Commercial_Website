"use client";

import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import * as React from "react";
import { hyperspeedPresets } from "./hyperspeed/HyperspeedReactBits";

// Dynamically import to avoid SSR issues with Three.js
const Hyperspeed = dynamic(() => import("./hyperspeed/HyperspeedReactBits"), {
  ssr: false,
});

/**
 * HyperspeedBackground
 *
 * Renders a Three.js hyperspeed canvas absolutely behind all page content.
 * - In dark mode: full intensity cyan/violet streaks on near-black
 * - In light mode: soft pastel blue/indigo streaks on a very light background
 *   with reduced opacity so text remains legible
 *
 * Usage: Place as the FIRST child of your layout's <body> or page root.
 * It uses position:fixed so it never pushes layout.
 */
export function HyperspeedBackground() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Avoid hydration mismatch
  React.useEffect(() => setMounted(true), []);
  const isDark = resolvedTheme === "dark";

  const effectOptions = React.useMemo(
    () => (isDark ? hyperspeedPresets.one : hyperspeedPresets.two),
    [isDark],
  );

  if (!mounted) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      style={{ opacity: isDark ? 1 : 0.32 }}>
      <Hyperspeed effectOptions={effectOptions} />
    </div>
  );
}
