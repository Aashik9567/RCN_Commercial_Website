"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

const LIFT = {
  rest: {
    y: 0,
    transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] as const },
  },
  hover: {
    y: -6,
    transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] as const },
  },
};

interface CardProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: ReactNode;
  accentColor?: string;
  noHover?: boolean;
  className?: string;
}

export function Card({
  children,
  accentColor = "rgb(var(--primary) / 0.18)",
  noHover = false,
  className,
  ...props
}: CardProps) {
  return (
    <motion.div
      variants={noHover ? undefined : LIFT}
      initial={noHover ? undefined : "rest"}
      whileHover={noHover ? undefined : "hover"}
      className={cn(
        "relative overflow-hidden rounded-2xl",
        "border border-gray-300 bg-white",
        "shadow-md",
        noHover
          ? ""
          : "transition-shadow duration-300 ease-out hover:shadow-lg",
        "dark:border-gray-700 dark:bg-gray-900/40",
        className,
      )}
      {...props}>
      {!noHover && (
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-2xl"
          variants={{
            rest: { opacity: 0 },
            hover: { opacity: 1 },
          }}
          style={{
            background: `radial-gradient(500px circle at 50% -20%, ${accentColor}, transparent 70%)`,
          }}
        />
      )}

      <div className="relative">{children}</div>
    </motion.div>
  );
}

interface FeaturedCardProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: ReactNode;
  from?: string;
  to?: string;
  noHover?: boolean;
  className?: string;
}

export function FeaturedCard({
  children,
  from = "rgb(var(--primary) / 0.14)",
  to = "rgb(var(--green-400) / 0.10)",
  noHover = false,
  className,
  ...props
}: FeaturedCardProps) {
  return (
    <motion.div
      variants={noHover ? undefined : LIFT}
      initial={noHover ? undefined : "rest"}
      whileHover={noHover ? undefined : "hover"}
      className={cn(
        "relative overflow-hidden rounded-3xl",
        "border border-gray-300 bg-white shadow-md",
        noHover
          ? ""
          : "transition-shadow duration-300 ease-out hover:shadow-lg",
        "dark:border-gray-700 dark:bg-gray-900/40",
        className,
      )}
      {...props}>
      <div
        className="pointer-events-none absolute inset-0 rounded-3xl"
        style={{
          background: `linear-gradient(135deg, ${from}, transparent 50%, ${to})`,
        }}
      />

      <motion.div
        className="pointer-events-none absolute inset-0 rounded-3xl"
        variants={{
          rest: { opacity: 0.4 },
          hover: { opacity: noHover ? 0.4 : 1 },
        }}
        style={{
          background: `radial-gradient(600px circle at 50% 0%, ${from}, transparent 65%)`,
        }}
      />

      <div className="relative">{children}</div>
    </motion.div>
  );
}

interface GhostCardProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: ReactNode;
  pill?: boolean;
  noHover?: boolean;
  className?: string;
}

export function GhostCard({
  children,
  pill = false,
  noHover = false,
  className,
  ...props
}: GhostCardProps) {
  return (
    <motion.div
      whileHover={noHover ? undefined : { scale: 1.03 }}
      transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
      className={cn(
        pill ? "rounded-full" : "rounded-xl",
        "overflow-hidden border",
        "border-gray-300 bg-white shadow-md",
        "transition-shadow duration-200",
        noHover ? "" : "hover:shadow-lg hover:border-green-300",
        "dark:border-gray-700 dark:bg-gray-900/40 dark:hover:border-green-400/60",
        className,
      )}
      {...props}>
      {children}
    </motion.div>
  );
}
