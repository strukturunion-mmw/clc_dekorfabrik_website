import type { HTMLAttributes, ReactNode } from "react";

type Tone = "sky" | "navy" | "azure" | "clay" | "neutral" | "outline";

type PillProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: Tone;
  /** Show a soft leading status dot (open/full/closed etc). */
  dot?: boolean;
  children: ReactNode;
};

const tones: Record<Tone, string> = {
  sky: "bg-sky-300 text-navy-900",
  navy: "bg-navy-800 text-paper-100",
  azure: "bg-azure-600 text-paper-50",
  clay: "bg-clay-500 text-paper-50",
  neutral: "bg-ink-100 text-navy-900",
  outline: "bg-transparent text-navy-900 border border-navy-900/25",
};

export function Pill({
  tone = "neutral",
  dot = false,
  children,
  className,
  ...rest
}: PillProps) {
  const cls = [
    "inline-flex items-center gap-1.5 px-3 rounded-pill font-sans text-xs font-medium",
    tones[tone],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={cls} style={{ height: 26 }} {...rest}>
      {dot ? (
        <span
          aria-hidden="true"
          className="inline-block rounded-full bg-current opacity-70"
          style={{ height: 7, width: 7 }}
        />
      ) : null}
      {children}
    </span>
  );
}
