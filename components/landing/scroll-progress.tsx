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
      className="pointer-events-none fixed left-0 right-0 top-0 z-60 h-1 bg-gray-200 dark:bg-gray-800">
      <motion.div
        className="h-full origin-left bg-gray-900 dark:bg-gray-100"
        style={{ scaleX }}
      />
    </div>
  );
}
