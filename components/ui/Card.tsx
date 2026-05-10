import type { HTMLAttributes } from "react";

export function Card({ className = "", ...props }: HTMLAttributes<HTMLElement>) {
  return (
    <article
      {...props}
      className={`contrast-surface rounded-[2rem] border border-ink/10 bg-white/68 p-6 shadow-soft backdrop-blur-xl ${className}`}
    />
  );
}
