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
    y: -4,
    transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] as const },
  },
};

type CardSize = "sm" | "md" | "lg";

interface CardProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: ReactNode;
  accentColor?: string;
  noHover?: boolean;
  size?: CardSize;
  className?: string;
}

export function Card({
  children,
  accentColor = "rgb(var(--primary) / 0.18)",
  noHover = false,
  size = "md",
  className,
  ...props
}: CardProps) {
  return (
    <motion.div
      variants={noHover ? undefined : LIFT}
      initial={noHover ? undefined : "rest"}
      whileHover={noHover ? undefined : "hover"}
      className={cn(
        "rcn-card",
        size === "sm"
          ? "rcn-card-sm"
          : size === "lg"
            ? "rcn-card-lg"
            : "rcn-card-md",
        noHover ? "" : "rcn-card--hoverable",
        "relative overflow-hidden",
        className,
      )}
      {...props}>
      {!noHover && (
        <motion.div
          className="pointer-events-none absolute inset-0"
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
  size?: CardSize;
  className?: string;
}

export function FeaturedCard({
  children,
  from = "rgb(var(--primary) / 0.14)",
  to = "rgb(var(--green-400) / 0.10)",
  noHover = false,
  size = "lg",
  className,
  ...props
}: FeaturedCardProps) {
  return (
    <motion.div
      variants={noHover ? undefined : LIFT}
      initial={noHover ? undefined : "rest"}
      whileHover={noHover ? undefined : "hover"}
      className={cn(
        "rcn-card",
        size === "sm"
          ? "rcn-card-sm"
          : size === "lg"
            ? "rcn-card-lg"
            : "rcn-card-md",
        noHover ? "" : "rcn-card--hoverable",
        "relative overflow-hidden",
        className,
      )}
      {...props}>
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `linear-gradient(135deg, ${from}, transparent 50%, ${to})`,
        }}
      />

      <motion.div
        className="pointer-events-none absolute inset-0"
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
  size?: CardSize;
  className?: string;
}

export function GhostCard({
  children,
  pill = false,
  noHover = false,
  size = "sm",
  className,
  ...props
}: GhostCardProps) {
  return (
    <motion.div
      whileHover={noHover ? undefined : { scale: 1.03 }}
      transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
      className={cn(
        "rcn-card",
        size === "sm"
          ? "rcn-card-sm"
          : size === "lg"
            ? "rcn-card-lg"
            : "rcn-card-md",
        noHover ? "" : "rcn-card--hoverable",
        pill ? "rounded-full" : "",
        "overflow-hidden",
        className,
      )}
      {...props}>
      {children}
    </motion.div>
  );
}
