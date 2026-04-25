"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
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
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav aria-label={ariaLabel} className="mx-auto w-full max-w-content">
      <div
        className="flex items-center justify-between rounded-pill backdrop-blur-md shadow-sm"
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
          <span className="hidden sm:inline">dekorfabrik.de</span>
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

        <div className="hidden items-center gap-2 lg:flex">{actions}</div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-pill border border-navy-200 text-navy-800 transition-colors hover:bg-navy-900/5 focus:outline-none focus-visible:outline-2 focus-visible:outline-clay-500 focus-visible:outline-offset-2 lg:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav-panel"
          aria-label={menuOpen ? "Menü schließen" : "Menü öffnen"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span aria-hidden="true" className="relative block h-4 w-4">
            <span
              className={[
                "absolute left-0 block h-0.5 w-4 bg-current transition-transform duration-base ease-standard",
                menuOpen ? "top-2 rotate-45" : "top-0.5",
              ].join(" ")}
            />
            <span
              className={[
                "absolute left-0 top-2 block h-0.5 w-4 bg-current transition-opacity duration-base ease-standard",
                menuOpen ? "opacity-0" : "opacity-100",
              ].join(" ")}
            />
            <span
              className={[
                "absolute left-0 block h-0.5 w-4 bg-current transition-transform duration-base ease-standard",
                menuOpen ? "top-2 -rotate-45" : "top-3.5",
              ].join(" ")}
            />
          </span>
        </button>
      </div>

      <div
        id="mobile-nav-panel"
        className={[
          "mt-2 overflow-hidden rounded-lg border border-ink-200/70 bg-paper-50 shadow-sm transition-[max-height,opacity] duration-base ease-standard lg:hidden",
          menuOpen ? "max-h-[480px] opacity-100" : "max-h-0 opacity-0",
        ].join(" ")}
      >
        <ul className="flex flex-col gap-1 p-3" role="list">
          {links.map((link) => (
            <li key={`mobile-${link.href}`}>
              <Link
                href={link.href}
                aria-current={link.active ? "page" : undefined}
                onClick={() => setMenuOpen(false)}
                className={[
                  "inline-flex w-full items-center rounded-md px-3 py-2.5 font-sans text-sm font-medium no-underline transition-colors duration-base ease-standard",
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
        <div className="border-t border-ink-200/70 p-3">
          <div className="flex flex-wrap gap-2">{actions}</div>
        </div>
      </div>
    </nav>
  );
}
