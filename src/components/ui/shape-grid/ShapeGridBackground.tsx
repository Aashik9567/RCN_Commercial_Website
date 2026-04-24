"use client";

import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import * as React from "react";

/**
 * Dynamically import ShapeGrid so it only runs on the client.
 * Canvas API is not available during Next.js SSR.
 */
const ShapeGrid = dynamic(() => import("./ShapeGrid"), { ssr: false });

function subscribeToReducedMotion(onStoreChange: () => void) {
  if (typeof window === "undefined") return () => {};
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", onStoreChange);
  return () => mq.removeEventListener("change", onStoreChange);
}

function getReducedMotionSnapshot() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * ShapeGridBackground
 *
 * Renders the react-bits ShapeGrid canvas as a fixed full-viewport background
 * that sits behind ALL page content at z-index 0.
 *
 * Theme behaviour:
 *   Dark mode  → near-invisible dark grid lines (#1a1f35) on deep navy (#040714)
 *               hover fill: electric cyan-tinted (#0a2a3a)
 *   Light mode → soft indigo grid lines (#c7d2fe) on white (#f8faff)
 *               hover fill: soft lavender (#e0e7ff)
 */
export function ShapeGridBackground() {
  const { resolvedTheme } = useTheme();
  const reducedMotion = React.useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    () => false,
  );

  // `resolvedTheme` can be undefined on the very first client render.
  // Defaulting to dark avoids a light-flash on dark-first designs.
  const isDark = resolvedTheme !== "light";

  const borderColor = isDark ? "#1e2a4a" : "#c7d2fe";
  const hoverFillColor = isDark ? "#0d1f3c" : "#dde8ff";
  const opacity = isDark ? 0.9 : 0.55;

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        opacity,
        transition: "opacity 0.4s ease",
      }}>
      <ShapeGrid
        direction="diagonal"
        speed={reducedMotion ? 0 : 0.4}
        squareSize={44}
        shape="square"
        borderColor={borderColor}
        hoverFillColor={hoverFillColor}
        hoverTrailAmount={6}
      />
    </div>
  );
}
