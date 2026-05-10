import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "quiet";

type SharedProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
};

type LinkButtonProps = SharedProps & {
  href: string;
};

type NativeButtonProps = SharedProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never;
  };

function buttonClass(variant: ButtonVariant, className = "") {
  const base =
    "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pond";
  const variants = {
    primary:
      "bg-ink text-shell shadow-soft hover:-translate-y-0.5 hover:bg-[#17231f]",
    secondary:
      "border border-ink/15 bg-white/70 text-ink shadow-insetCalm backdrop-blur hover:bg-white",
    quiet: "bg-transparent text-ink/78 hover:bg-white/55"
  };

  return `${base} ${variants[variant]} ${className}`;
}

export function Button(props: LinkButtonProps | NativeButtonProps) {
  const { children, variant = "primary", className } = props;

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} className={buttonClass(variant, className)}>
        {children}
      </Link>
    );
  }

  const {
    href: _href,
    children: _children,
    variant: _variant,
    className: _className,
    ...buttonProps
  } = props as NativeButtonProps;

  return (
    <button {...buttonProps} className={buttonClass(variant, className)}>
      {children}
    </button>
  );
}
