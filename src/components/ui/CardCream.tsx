import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight } from "../icons/ArrowUpRight";

type CardCreamProps = {
  /** Category · date — rendered as a Share uppercase eyebrow. */
  eyebrow: string;
  /** Headline with optional emphasised pivot — pass JSX to wrap the italic word in <em>. */
  title: ReactNode;
  /** Short body copy, max ~3 lines. */
  body?: ReactNode;
  /** Bottom-left meta (read time · format, etc). */
  meta?: string;
  /** Target URL — the whole card becomes a link. */
  href: string;
  /** Accessible label override if the title alone isn't descriptive enough. */
  ariaLabel?: string;
};

export function CardCream({
  eyebrow,
  title,
  body,
  meta,
  href,
  ariaLabel,
}: CardCreamProps) {
  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      className={[
        "group relative flex h-full flex-col rounded-lg bg-paper-50 p-6",
        "text-navy-900 no-underline shadow-md transition-[transform,box-shadow] duration-base ease-out-soft",
        "hover:-translate-y-0.5 hover:shadow-lg",
        "focus:outline-none focus-visible:outline-2 focus-visible:outline-clay-500 focus-visible:outline-offset-2",
      ].join(" ")}
      style={{
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "var(--border-subtle)",
        minHeight: 280,
      }}
    >
      <div className="font-brand text-xs uppercase tracking-brand text-ink-500">
        {eyebrow}
      </div>

      <h3 className="mt-3 mb-2 font-display text-xl font-normal tracking-tight text-balance text-navy-900">
        {title}
      </h3>

      {body ? (
        <p className="mb-5 font-sans text-sm text-navy-700">{body}</p>
      ) : null}

      <div className="mt-auto flex items-center justify-between pt-4 font-sans text-xs text-ink-500">
        <span>{meta}</span>
        <span
          aria-hidden="true"
          className={[
            "inline-flex items-center justify-center rounded-full text-navy-900 transition-transform duration-base",
            "group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
          ].join(" ")}
          style={{
            width: 34,
            height: 34,
            borderWidth: 1,
            borderStyle: "solid",
            borderColor: "var(--border-strong)",
          }}
        >
          <ArrowUpRight />
        </span>
      </div>
    </Link>
  );
}
