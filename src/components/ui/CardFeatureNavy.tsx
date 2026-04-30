import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
import { ArrowUpRight } from "../icons/ArrowUpRight";

export type PaperCard = {
  /** Uppercase label above the italic quote (eg. "ORIGINAL · 300 DPI"). */
  label: string;
  /** The italic Instrument Serif pull quote. */
  quote: string;
  /** Tone of the paper — "cream" rotates left, "sky" rotates right. */
  tone: "cream" | "sky";
};

type CardFeatureNavyProps = {
  eyebrow: string;
  /** Big serif metric — "24h", "412", etc. */
  metric: string;
  /** Small label next to the metric (two short lines max). */
  metricLabel: ReactNode;
  /** Two paper sub-cards — exactly two for the signature stack. */
  papers: [PaperCard, PaperCard];
  image?: {
    src: string;
    alt: string;
  };
  href: string;
  ariaLabel?: string;
};

const paperStyleBase: React.CSSProperties = {
  position: "absolute",
  width: "min(300px, calc(100% - 48px))",
  boxShadow: "var(--shadow-paper)",
};

const paperStyles: Record<PaperCard["tone"], React.CSSProperties> = {
  cream: {
    ...paperStyleBase,
    top: 316,
    left: 24,
    transform: "rotate(-4deg)",
    background: "var(--paper-50)",
    color: "var(--navy-900)",
  },
  sky: {
    ...paperStyleBase,
    top: 386,
    left: "clamp(42px, 24%, 140px)",
    transform: "rotate(3deg)",
    background: "var(--sky-500)",
    color: "var(--navy-900)",
  },
};

export function CardFeatureNavy({
  eyebrow,
  metric,
  metricLabel,
  papers,
  image,
  href,
  ariaLabel,
}: CardFeatureNavyProps) {
  return (
    <Link
      href={href}
      aria-label={ariaLabel ?? eyebrow}
      className={[
        "group relative block overflow-hidden rounded-xl bg-navy-800 p-6",
        "text-paper-100 no-underline shadow-md transition-[transform,box-shadow] duration-base ease-out-soft",
        "hover:-translate-y-0.5 hover:shadow-lg",
        "focus:outline-none focus-visible:outline-2 focus-visible:outline-paper-100 focus-visible:outline-offset-2",
      ].join(" ")}
      style={{ minHeight: 560 }}
    >
      <div className="font-brand text-xs uppercase tracking-brand text-navy-200">
        {eyebrow}
      </div>

      <span
        aria-hidden="true"
        className="absolute inline-flex items-center justify-center rounded-full text-paper-100 transition-transform duration-base group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        style={{
          top: 22,
          right: 22,
          width: 36,
          height: 36,
          background: "rgba(247, 243, 234, 0.08)",
          borderWidth: 1,
          borderStyle: "solid",
          borderColor: "rgba(247, 243, 234, 0.22)",
        }}
      >
        <ArrowUpRight />
      </span>

      {image ? (
        <div
          className="absolute overflow-hidden rounded-lg"
          style={{
            top: 66,
            left: 24,
            right: 24,
            height: 224,
            borderWidth: 1,
            borderStyle: "solid",
            borderColor: "rgba(247, 243, 234, 0.18)",
          }}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 1024px) 512px, calc(100vw - 48px)"
            className="object-cover transition-transform duration-base ease-out-soft group-hover:scale-[1.015]"
            priority
          />
          <span
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(13, 30, 67, 0) 45%, rgba(13, 30, 67, 0.28) 100%)",
            }}
          />
        </div>
      ) : null}

      {papers.map((paper, i) => (
        <div
          key={i}
          className="rounded-md font-serif italic"
          style={{
            ...paperStyles[paper.tone],
            padding: "14px 18px",
            fontSize: 15,
            lineHeight: 1.4,
          }}
        >
          <div
            className="font-brand not-italic uppercase tracking-brand text-ink-500"
            style={{ fontSize: 10, marginBottom: 6 }}
          >
            {paper.label}
          </div>
          {paper.quote}
        </div>
      ))}

      <div
        className="absolute font-display text-paper-100"
        style={{
          left: 26,
          bottom: 26,
          fontSize: 56,
          lineHeight: 1,
          letterSpacing: "-0.03em",
        }}
      >
        {metric}
      </div>
      <div
        className="absolute font-brand uppercase text-navy-200"
        style={{
          right: 26,
          bottom: 26,
          fontSize: 11,
          letterSpacing: "0.12em",
          textAlign: "right",
        }}
      >
        {metricLabel}
      </div>
    </Link>
  );
}
