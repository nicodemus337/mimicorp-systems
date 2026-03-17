"use client";

import { motion } from "framer-motion";

import { easing, motionTiming } from "@/lib/motion";

type ConnectionLineProps = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  active: boolean;
  dimmed: boolean;
};

export function ConnectionLine({
  x1,
  y1,
  x2,
  y2,
  active,
  dimmed
}: ConnectionLineProps) {
  return (
    <motion.line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke="rgba(245,245,245,1)"
      strokeWidth="1"
      initial={{ opacity: 0 }}
      animate={{
        opacity: active ? 0.3 : dimmed ? 0.05 : 0.14
      }}
      transition={{ duration: motionTiming.primary, ease: easing.primary }}
    />
  );
}
