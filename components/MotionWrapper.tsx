"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

import { easing, motionTiming, staggerMax, staggerStep } from "@/lib/motion";

type MotionWrapperProps = {
  children: ReactNode;
  className?: string;
};

export function MotionWrapper({ children, className }: MotionWrapperProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerStep,
            delayChildren: 0,
            staggerDirection: 1
          }
        }
      }}
    >
      {Array.isArray(children)
        ? children.map((child, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: Math.min(
                  motionTiming.structural,
                  motionTiming.structural + index * staggerStep,
                  motionTiming.structural + staggerMax
                ),
                ease: easing.primary
              }}
            >
              {child}
            </motion.div>
          ))
        : (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: motionTiming.structural, ease: easing.primary }}
          >
            {children}
          </motion.div>
        )}
    </motion.div>
  );
}
