import Link from "next/link";
import type { ReactNode } from "react";
import { Button } from "./Button";

export type NavLink = {
  href: string;
  label: string;
  active?: boolean;
};

type NavProps = {
  links: NavLink[];
  /** Aria label for the primary nav landmark. */
  ariaLabel?: string;
  /** Optional custom action slot (defaults to Anmelden + Datei hochladen). */
  actions?: ReactNode;
};

const defaultActions = (
  <>
    <Button variant="secondary" size="sm">
      Anmelden
    </Button>
    <Button variant="brand" size="sm">
      Datei hochladen <span aria-hidden="true">→</span>
    </Button>
  </>
);

export function Nav({
  links,
  ariaLabel = "Hauptnavigation",
  actions = defaultActions,
}: NavProps) {
  return (
    <nav
      aria-label={ariaLabel}
      className="mx-auto flex max-w-content items-center justify-between rounded-pill backdrop-blur-md shadow-sm"
      style={{
        padding: "10px 14px 10px 18px",
        background: "rgba(252, 250, 245, 0.92)",
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "var(--border-subtle)",
      }}
    >
      <Link
        href="/"
        className="flex items-center gap-3 font-brand tracking-tight text-navy-800 no-underline"
        style={{ fontSize: 20, letterSpacing: "-0.01em" }}
        aria-label="dekorfabrik.de — Startseite"
      >
        <span
          aria-hidden="true"
          className="flex items-center justify-center rounded-sm bg-sky-500 font-brand text-base text-azure-600"
          style={{ width: 34, height: 34 }}
        >
          df
        </span>
        <span>dekorfabrik.de</span>
      </Link>

      <ul className="hidden items-center gap-1 lg:flex" role="list">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              aria-current={link.active ? "page" : undefined}
              className={[
                "inline-flex items-center rounded-pill px-4 py-2 font-sans text-sm font-medium no-underline transition-colors duration-base ease-standard",
                link.active
                  ? "bg-navy-900 text-paper-100"
                  : "text-navy-700 hover:bg-navy-900/5",
              ].join(" ")}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-2">{actions}</div>
    </nav>
  );
}
