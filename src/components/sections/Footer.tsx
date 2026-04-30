import Link from "next/link";

type FooterGroup = {
  heading: string;
  links: { href: string; label: string }[];
};

type FooterProps = {
  tagline: string;
  groups: FooterGroup[];
};

export function Footer({ tagline, groups }: FooterProps) {
  return (
    <footer className="bg-paper-100 text-navy-900">
      <div className="mx-auto grid max-w-content gap-12 px-6 py-16 md:grid-cols-4">
        <div>
          <Link
            href="/"
            className="flex items-center gap-3 font-brand tracking-tight text-navy-800 no-underline"
            style={{ fontSize: 20, letterSpacing: "-0.01em" }}
          >
            <span
              aria-hidden="true"
              className="flex items-center justify-center rounded-sm bg-sky-500 font-brand text-sm text-azure-600"
              style={{ width: 30, height: 30 }}
            >
              df
            </span>
            dekorfabrik.de
          </Link>
          <p className="mt-4 max-w-xs font-sans text-sm text-navy-700">
            {tagline}
          </p>
        </div>

        {groups.map((group) => (
          <div key={group.heading}>
            <div className="font-brand text-xs uppercase tracking-brand text-ink-500">
              {group.heading}
            </div>
            <ul className="mt-4 flex flex-col gap-2 font-sans text-sm" role="list">
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-navy-900 no-underline transition-colors duration-base hover:text-azure-600"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div
        className="mx-auto max-w-content px-6"
        style={{
          borderTopWidth: 1,
          borderTopStyle: "solid",
          borderTopColor: "var(--border-subtle)",
        }}
      >
        <p className="py-6 font-sans text-xs text-ink-500">
          © 2026 Dekorfabrik GmbH · Frankfurt · Alle Rechte vorbehalten.
        </p>
      </div>
    </footer>
  );
}
