import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "brand" | "accent" | "secondary" | "ghost";
type Size = "md" | "sm";

type CommonProps = {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
};

const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-pill font-sans font-medium " +
  "transition-colors duration-base ease-standard " +
  "active:translate-y-px " +
  "focus:outline-none focus-visible:outline-2 focus-visible:outline-clay-500 focus-visible:outline-offset-2 " +
  "disabled:opacity-60 disabled:cursor-not-allowed";

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-sm",
  sm: "h-9 px-4 text-sm",
};

const variants: Record<Variant, string> = {
  primary:
    "bg-navy-900 text-paper-100 hover:bg-navy-700",
  brand:
    "bg-azure-600 text-paper-50 hover:bg-azure-700",
  accent:
    "bg-clay-500 text-paper-50 hover:bg-clay-600",
  secondary:
    "bg-transparent text-navy-900 border border-navy-900/25 hover:bg-navy-900/5",
  ghost:
    "bg-transparent text-navy-900 hover:bg-navy-900/5",
};

function classes(variant: Variant, size: Size, extra?: string) {
  return [base, sizes[size], variants[variant], extra].filter(Boolean).join(" ");
}

type ButtonProps = CommonProps & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button type={type} className={classes(variant, size, className)} {...props}>
      {children}
    </button>
  );
}

type LinkButtonProps = CommonProps & AnchorHTMLAttributes<HTMLAnchorElement>;

export function LinkButton({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: LinkButtonProps) {
  return (
    <a className={classes(variant, size, className)} {...props}>
      {children}
    </a>
  );
}
