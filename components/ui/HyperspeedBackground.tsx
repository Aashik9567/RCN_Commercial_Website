"use client";

import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import * as React from "react";

// Dynamically import to avoid SSR issues with Three.js
const Hyperspeed = dynamic(
  () => import("./hyperspeed/Hyperspeed").then((m) => m.Hyperspeed),
  { ssr: false },
);

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
    () => ({
      onSpeedUp: () => {},
      onSlowDown: () => {},
      distortion: "turbulentDistortion",
      length: 400,
      roadWidth: 9,
      islandWidth: 2,
      lanesPerRoad: 4,
      fov: 90,
      fovSpeedUp: 150,
      speedUp: 2,
      carLightsFade: 0.4,
      totalSideLightSticks: 20,
      lightPairsPerRoadWay: 40,
      shoulderLinesWidthPercentage: 0.05,
      brokenLinesWidthPercentage: 0.1,
      brokenLinesLengthPercentage: 0.5,
      lightStickWidth: [0.12, 0.5] as [number, number],
      lightStickHeight: [1.3, 1.7] as [number, number],
      movingAwaySpeed: [60, 80] as [number, number],
      movingCloserSpeed: [-120, -160] as [number, number],
      carLightsLength: [400 * 0.03, 400 * 0.2] as [number, number],
      carLightsRadius: [0.05, 0.14] as [number, number],
      carWidthPercentage: [0.3, 0.5] as [number, number],
      carShiftX: [-0.8, 0.8] as [number, number],
      carFloorSeparation: [0, 5] as [number, number],
      carArray: [
        {
          mesh: "THREE.CylinderGeometry(0.2, 0.2, 1, 12)",
          material: isDark
            ? "THREE.MeshLambertMaterial({color: 0x00e5ff})"
            : "THREE.MeshLambertMaterial({color: 0x3b82f6})",
        },
      ],
      colors: {
        roadColor: isDark ? 0x080808 : 0xf0f4ff,
        islandColor: isDark ? 0x0a0a0a : 0xe8eeff,
        background: isDark ? 0x040714 : 0xf8faff,
        shoulderLines: isDark ? 0x131318 : 0xc7d2fe,
        brokenLines: isDark ? 0x131318 : 0xc7d2fe,
        leftCars: [
          isDark ? 0x00e5ff : 0x3b82f6,
          isDark ? 0xcc00ff : 0x6366f1,
          isDark ? 0x4400ff : 0x8b5cf6,
        ],
        rightCars: [
          isDark ? 0xff4444 : 0xf43f5e,
          isDark ? 0xff7700 : 0xf97316,
          isDark ? 0xffaa00 : 0xfbbf24,
        ],
        sticks: isDark ? 0x00e5ff : 0x6366f1,
      },
    }),
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
