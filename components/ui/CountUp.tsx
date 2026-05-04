"use client";

import * as React from "react";

type CountUpProps = {
  value: number;
  suffix?: string;
  decimals?: number;
  durationMs?: number;
};

export function CountUp({
  value,
  suffix = "",
  decimals,
  durationMs = 1200,
}: CountUpProps) {
  const ref = React.useRef<HTMLSpanElement | null>(null);

  React.useEffect(() => {
    if (!ref.current) return;

    const el = ref.current;
    const prefersReduced = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const fmtDecimals =
      typeof decimals === "number" ? decimals : value % 1 === 0 ? 0 : 1;

    const format = (n: number) => `${n.toFixed(fmtDecimals)}${suffix}`;

    if (prefersReduced) {
      el.textContent = format(value);
      return;
    }

    let raf = 0;
    let started = 0;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        observer.disconnect();

        const step = (ts: number) => {
          if (!started) started = ts;
          const p = Math.min(1, (ts - started) / durationMs);
          const eased = 1 - Math.pow(1 - p, 3);
          const current = value * eased;
          el.textContent = format(current);

          if (p < 1) raf = requestAnimationFrame(step);
        };

        raf = requestAnimationFrame(step);
      },
      { threshold: 0.3 },
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [decimals, durationMs, suffix, value]);

  return <span ref={ref} aria-label={`${value}${suffix}`} />;
}
