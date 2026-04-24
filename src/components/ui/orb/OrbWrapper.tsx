"use client";

import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import * as React from "react";

// Dynamic import prevents OGL / WebGL from running on the server
const Orb = dynamic(() => import("./Orb"), { ssr: false });

interface OrbWrapperProps {
  /** Override hue (0–360). Defaults auto-select based on theme. */
  hue?: number;
  hoverIntensity?: number;
  rotateOnHover?: boolean;
  forceHoverState?: boolean;
  className?: string;
}

/**
 * OrbWrapper
 *
 * Renders the react-bits WebGL Orb canvas.
 * Automatically passes the correct backgroundColor based on
 * the current resolved theme so the orb blends seamlessly.
 *
 * Dark mode  → deep navy background (#040714), cyan/violet hue
 * Light mode → white/soft background (#f8faff), same hue but
 *              background luminance shifts the shader to pastel tones
 */
export function OrbWrapper({
  hue = 220,
  hoverIntensity = 0.5,
  rotateOnHover = true,
  forceHoverState = false,
  className = "",
}: OrbWrapperProps) {
  const { resolvedTheme } = useTheme();
  // `resolvedTheme` can be undefined on the very first client render.
  // Defaulting to dark avoids a light-flash on dark-first designs.
  const isDark = resolvedTheme !== "light";

  return (
    <div className={`h-full w-full ${className}`}>
      <Orb
        hue={hue}
        hoverIntensity={hoverIntensity}
        rotateOnHover={rotateOnHover}
        forceHoverState={forceHoverState}
        backgroundColor={isDark ? "#040714" : "#f0f4ff"}
      />
    </div>
  );
}
