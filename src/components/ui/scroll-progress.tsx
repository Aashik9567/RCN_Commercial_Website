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
      className="fixed left-0 right-0 top-0 z-[100] h-0.5 bg-gray-200/50 dark:bg-white/10">
      <motion.div
        className="h-full origin-left bg-linear-to-r from-cyan-500 to-violet-600"
        style={{ scaleX }}
      />
    </div>
  );
}
