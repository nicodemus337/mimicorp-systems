export const motionTiming = {
  fast: 0.12,
  base: 0.22,
  primary: 0.32,
  structural: 0.48
} as const;

export const easing = {
  primary: [0.4, 0, 0.2, 1],
  expressive: [0.2, 0.8, 0.2, 1]
} as const;

export const staggerStep = 0.04;
export const staggerMax = 0.24;
