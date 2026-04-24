import type { ReactNode } from "react";
import { Button, LinkButton } from "../ui/Button";

export type CtaStepStatus = "done" | "open" | "upcoming";

export type CtaStep = {
  /** Two-digit step number ("01", "02"…) rendered in Geist Mono. */
  n: string;
  /** Step title. */
  title: string;
  /** Lifecycle state — controls tint + trailing glyph. */
  status: CtaStepStatus;
};

export type CtaAction = {
  label: ReactNode;
  /** If provided the affordance renders as an <a>; otherwise a <button>. */
  href?: string;
};

type CtaPanelProps = {
  /** Pill-shaped eyebrow, eg. "April-Kurs · offen" — rendered with a sky dot. */
  eyebrow: string;
  /** Headline — pass JSX so the italic pivot can be wrapped in <em>. */
  title: ReactNode;
  /** Supporting body copy. `<strong>` is honoured. */
  body: ReactNode;
  /** Exactly four ordered steps. */
  steps: CtaStep[];
  /**
   * The conversion affordance for this panel. The accent (clay) button is
   * the one warm moment per view, per AGENTS.md — it lives inside the panel.
   */
  action: CtaAction;
  /** Aria label for the CTA section landmark. */
  ariaLabel?: string;
};

const stepBase =
  "grid items-center rounded-pill font-sans text-sm transition-colors duration-base ease-standard";

const stepTone: Record<CtaStepStatus, string> = {
  done: "bg-navy-900 text-paper-100",
  open: "bg-clay-700 text-paper-100",
  upcoming: "bg-navy-900 text-paper-100",
};

const stepGlyph: Record<CtaStepStatus, ReactNode> = {
  done: <span className="text-sky-400">✓</span>,
  open: <span aria-hidden="true" />,
  upcoming: <span aria-hidden="true">↓</span>,
};

export function CtaPanel({
  eyebrow,
  title,
  body,
  steps,
  action,
  ariaLabel = "Einstiegsablauf",
}: CtaPanelProps) {
  return (
    <section
      aria-label={ariaLabel}
      className="relative grid overflow-hidden rounded-xl bg-clay-500 text-paper-100 md:grid-cols-2"
      style={{ padding: "48px 44px", gap: 48 }}
    >
      {/* Soft clay-400 radial glow, bottom-right — the one allowed gradient */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute rounded-full bg-clay-400"
        style={{
          right: -80,
          bottom: -80,
          width: 280,
          height: 280,
          opacity: 0.6,
        }}
      />

      <div className="relative z-10">
        <span
          className="inline-flex items-center gap-1.5 rounded-pill bg-navy-900 font-sans text-xs font-medium text-paper-100"
          style={{ height: 26, padding: "0 12px" }}
        >
          <span
            aria-hidden="true"
            className="inline-block rounded-full bg-sky-400"
            style={{ height: 7, width: 7 }}
          />
          {eyebrow}
        </span>

        <h2
          className="mt-5 mb-4 font-display font-normal text-balance text-paper-100"
          style={{ fontSize: 58, lineHeight: 1.02, letterSpacing: "-0.025em" }}
        >
          {title}
        </h2>

        <p
          className="font-sans text-base text-clay-100"
          style={{ maxWidth: 420 }}
        >
          {body}
        </p>
      </div>

      <div className="relative z-10 flex flex-col gap-6">
        <ol className="flex flex-col gap-2" role="list">
          {steps.map((step) => (
            <li
              key={step.n}
              className={[stepBase, stepTone[step.status]].join(" ")}
              style={{
                padding: "16px 20px",
                gridTemplateColumns: "56px 1fr 28px",
              }}
              aria-current={step.status === "open" ? "step" : undefined}
            >
              <span className="font-mono opacity-60" style={{ fontSize: 13 }}>
                {step.n}
              </span>
              <span className="font-medium">{step.title}</span>
              <span className="text-right opacity-80">
                {stepGlyph[step.status]}
              </span>
            </li>
          ))}
        </ol>

        <div className="flex">
          {action.href ? (
            <LinkButton variant="accent" href={action.href}>
              {action.label}
            </LinkButton>
          ) : (
            <Button variant="accent">{action.label}</Button>
          )}
        </div>
      </div>
    </section>
  );
}
