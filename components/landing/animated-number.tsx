"use client";

import * as React from "react";
import { animate, useInView } from "framer-motion";

type AnimatedNumberProps = {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
};

export function AnimatedNumber({
  value,
  decimals = 0,
  prefix,
  suffix,
  className,
}: AnimatedNumberProps) {
  const ref = React.useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [display, setDisplay] = React.useState(0);

  React.useEffect(() => {
    if (!inView) return;

    const controls = animate(0, value, {
      duration: 1.2,
      ease: "easeOut",
      onUpdate: (latest) => setDisplay(latest),
    });
    return () => controls.stop();
  }, [inView, value]);

  const formatted = display.toFixed(decimals);

  return (
    <span ref={ref} className={className} suppressHydrationWarning>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
