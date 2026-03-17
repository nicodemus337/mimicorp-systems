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
    fill: "rgba(245,245,245,0.96)",
    border: "rgba(245,245,245,0.96)",
    text: "#f5f5f5",
    backgroundOpacity: "rgba(245,245,245,0.12)"
  },
  branch: {
    fill: "rgba(245,245,245,0.08)",
    border: "rgba(245,245,245,0.86)",
    text: "#f5f5f5",
    backgroundOpacity: "rgba(245,245,245,0.08)"
  },
  stem: {
    fill: "rgba(245,245,245,0.08)",
    border: "rgba(245,245,245,0.34)",
    text: "#f5f5f5",
    backgroundOpacity: "rgba(245,245,245,0.05)"
  },
  fruit: {
    fill: "rgba(28,42,30,1)",
    border: "rgba(28,42,30,1)",
    text: "#f5f5f5",
    backgroundOpacity: "rgba(28,42,30,0.24)"
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
            ? "0 0 0 1px rgba(245,245,245,0.16), 0 0 42px rgba(245,245,245,0.16)"
            : "0 0 0 1px rgba(245,245,245,0.04), 0 0 22px rgba(245,245,245,0.04)"
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
