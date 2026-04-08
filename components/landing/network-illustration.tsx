import * as React from "react";
import { motion } from "framer-motion";

/**
 * NetworkIllustration — Enhanced animated SVG with:
 * - Gradient edges with data-flow dots travelling along paths
 * - Pulsing nodes with glow filters
 * - Staggered entrance animation
 *
 * Designed to sit inside the Hero's glassmorphism card.
 * The `className` prop controls external sizing.
 */
export function NetworkIllustration({ className }: { className?: string }) {
  const nodes = [
    { cx: 320, cy: 210, r: 18 }, // hub / largest
    { cx: 160, cy: 130, r: 11 },
    { cx: 480, cy: 100, r: 11 },
    { cx: 100, cy: 280, r: 9 },
    { cx: 540, cy: 280, r: 9 },
    { cx: 215, cy: 320, r: 9 },
    { cx: 420, cy: 330, r: 9 },
    { cx: 280, cy: 70, r: 8 },
    { cx: 370, cy: 150, r: 7 },
  ];

  const edges: [number, number, number, number][] = [
    [320, 210, 160, 130],
    [320, 210, 480, 100],
    [320, 210, 100, 280],
    [320, 210, 540, 280],
    [320, 210, 215, 320],
    [320, 210, 420, 330],
    [320, 210, 370, 150],
    [160, 130, 280, 70],
    [160, 130, 100, 280],
    [480, 100, 280, 70],
    [480, 100, 370, 150],
    [480, 100, 540, 280],
    [215, 320, 100, 280],
    [420, 330, 540, 280],
  ];

  return (
    <svg
      viewBox="0 0 640 420"
      role="img"
      aria-label="Fiber network topology illustration"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Cyan glow filter */}
        <filter id="node-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter id="dot-glow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Edge gradient: cyan → violet */}
        <linearGradient id="edgeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00e5ff" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.5" />
        </linearGradient>

        {/* Hub node gradient */}
        <radialGradient id="hubGrad" cx="50%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#00e5ff" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.7" />
        </radialGradient>

        {/* Outer node gradient */}
        <radialGradient id="nodeGrad" cx="50%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#7dd3fc" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#6d28d9" stopOpacity="0.5" />
        </radialGradient>
      </defs>

      {/* ── Edges ── */}
      {edges.map(([x1, y1, x2, y2], i) => (
        <g key={i}>
          {/* Static line */}
          <line
            x1={x1} y1={y1} x2={x2} y2={y2}
            stroke="url(#edgeGrad)"
            strokeWidth="1.5"
            opacity="0.3"
          />
          {/* Animated travel dot */}
          <motion.circle
            r="3"
            fill="#00e5ff"
            filter="url(#dot-glow)"
            opacity="0.9"
            style={{
              offsetPath: `path("M${x1},${y1} L${x2},${y2}")`,
            }}
            animate={{ offsetDistance: ["0%", "100%", "0%"] }}
            transition={{
              duration: 2.5 + (i % 4) * 0.5,
              repeat: Infinity,
              delay: i * 0.25,
              ease: "easeInOut",
            }}
          />
        </g>
      ))}

      {/* ── Nodes ── */}
      {nodes.map((n, i) => (
        <motion.g
          key={i}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            duration: 0.5,
            delay: 0.3 + i * 0.08,
            type: "spring",
            stiffness: 200,
          }}
          style={{ transformOrigin: `${n.cx}px ${n.cy}px` }}
        >
          {/* Outer pulse ring */}
          <motion.circle
            cx={n.cx} cy={n.cy} r={n.r + 10}
            fill="none"
            stroke={i === 0 ? "#00e5ff" : "#7c3aed"}
            strokeWidth="1"
            opacity="0.15"
            animate={{ r: [n.r + 10, n.r + 18, n.r + 10], opacity: [0.2, 0, 0.2] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeOut",
            }}
          />

          {/* Main node */}
          <circle
            cx={n.cx} cy={n.cy} r={n.r}
            fill={i === 0 ? "url(#hubGrad)" : "url(#nodeGrad)"}
            stroke={i === 0 ? "#00e5ff" : "#7c3aed"}
            strokeWidth={i === 0 ? 2 : 1.5}
            opacity="0.9"
            filter="url(#node-glow)"
          />

          {/* Inner bright dot */}
          <circle
            cx={n.cx} cy={n.cy} r={Math.max(2, n.r - 8)}
            fill="#ffffff"
            opacity={i === 0 ? 0.6 : 0.3}
          />
        </motion.g>
      ))}
    </svg>
  );
}