"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 30,
    mass: 0.2,
  });

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed left-0 right-0 top-0 z-60 h-1 bg-(--border-card)">
      <motion.div
        className="h-full origin-left bg-linear-to-r from-(--accent-cyan) via-(--accent-primary) to-(--accent-violet)"
        style={{ scaleX }}
      />
    </div>
  );
}
