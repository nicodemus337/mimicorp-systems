"use client";

import { motion } from "framer-motion";

import { easing, motionTiming } from "@/lib/motion";
import type { NodeKind, SystemNode } from "@/lib/system-data";
import { nodeSizes } from "@/lib/system-data";

type NodeProps = {
  node: SystemNode;
  x: number;
  y: number;
  isFocused: boolean;
  isRelated: boolean;
  isDimmed: boolean;
  onHover: (id: string | null) => void;
  onFocus: (id: string) => void;
};

const nodeStyles: Record<
  NodeKind,
  { fill: string; border: string; text: string; backgroundOpacity: string }
> = {
  core: {
    fill: "radial-gradient(circle at 30% 30%, rgba(255,255,255,1), rgba(217,231,196,0.92))",
    border: "rgba(227,238,211,0.96)",
    text: "#f5f5f5",
    backgroundOpacity: "rgba(221,235,197,0.16)"
  },
  branch: {
    fill: "radial-gradient(circle at 35% 35%, rgba(211,228,184,0.18), rgba(255,255,255,0.06))",
    border: "rgba(223,234,206,0.88)",
    text: "#f5f5f5",
    backgroundOpacity: "rgba(213,226,188,0.1)"
  },
  stem: {
    fill: "radial-gradient(circle at 35% 35%, rgba(167,191,133,0.22), rgba(255,255,255,0.04))",
    border: "rgba(210,223,188,0.42)",
    text: "#f5f5f5",
    backgroundOpacity: "rgba(130,154,102,0.08)"
  },
  fruit: {
    fill: "radial-gradient(circle at 30% 30%, rgba(149,177,114,0.95), rgba(28,42,30,1))",
    border: "rgba(168,195,133,0.8)",
    text: "#f5f5f5",
    backgroundOpacity: "rgba(95,117,67,0.26)"
  }
};

export function Node({
  node,
  x,
  y,
  isFocused,
  isRelated,
  isDimmed,
  onHover,
  onFocus
}: NodeProps) {
  const size = nodeSizes[node.kind];
  const style = nodeStyles[node.kind];

  return (
    <motion.button
      type="button"
      className="group absolute flex flex-col items-center gap-3 bg-transparent p-0 text-center"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: `${size}px`,
        height: `${size}px`,
        marginLeft: `${-size / 2}px`,
        marginTop: `${-size / 2}px`
      }}
      initial={false}
      animate={{
        opacity: isDimmed ? 0.2 : isRelated || isFocused ? 1 : 0.85,
        scale: isFocused ? 1.8 : 1
      }}
      transition={{
        duration: isFocused ? motionTiming.primary : motionTiming.fast,
        ease: isFocused ? easing.expressive : easing.primary
      }}
      whileHover={{ scale: isFocused ? 1.8 : 1.03, opacity: 1 }}
      onHoverStart={() => onHover(node.id)}
      onHoverEnd={() => onHover(null)}
      onFocus={() => onHover(node.id)}
      onBlur={() => onHover(null)}
      onClick={() => onFocus(node.id)}
      aria-label={`${node.label}, ${node.orbitLabel}`}
    >
      <motion.span
        className="absolute inset-0 rounded-full backdrop-blur-[4px]"
        initial={false}
        animate={{
          boxShadow: isFocused
            ? "0 0 0 1px rgba(223,234,206,0.22), 0 0 48px rgba(192,216,155,0.22)"
            : "0 0 0 1px rgba(245,245,245,0.04), 0 0 24px rgba(173,199,135,0.08)"
        }}
        style={{
          background: style.backgroundOpacity,
          border: `1px solid ${style.border}`
        }}
      />

      <span
        className="absolute inset-0 rounded-full"
        style={{
          background: style.fill,
          opacity: node.kind === "stem" ? 0.32 : 1
        }}
      />

      <span
        className="pointer-events-none absolute left-1/2 top-[calc(100%+12px)] w-max max-w-[11rem] -translate-x-1/2 text-center font-body text-[12px] uppercase tracking-[0.24em] text-text/72 transition-opacity duration-fast ease-primary group-hover:text-text"
        style={{ color: isDimmed ? "rgba(245,245,245,0.32)" : style.text }}
      >
        {node.label}
      </span>
    </motion.button>
  );
}
