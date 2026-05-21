import Link from "next/link";
import type { ReactNode } from "react";

type AuthFormShellProps = {
  eyebrow: string;
  title: string;
  intro: string;
  children: ReactNode;
  switchPrompt: ReactNode;
};

export function AuthFormShell({
  eyebrow,
  title,
  intro,
  children,
  switchPrompt,
}: AuthFormShellProps) {
  return (
    <section className="mx-auto max-w-content px-6 pt-12 pb-20 lg:pt-16">
      <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[minmax(0,1fr)_440px]">
        <aside className="rounded-xl bg-navy-800 p-8 text-paper-100 shadow-md">
          <p className="font-brand text-xs uppercase tracking-brand text-navy-200">
            {eyebrow}
          </p>
          <h1 className="mt-4 font-display text-d5 font-normal text-balance">{title}</h1>
          <p className="mt-5 font-sans text-sm leading-relaxed text-navy-200">{intro}</p>

          <ul className="mt-8 space-y-3 font-sans text-sm text-navy-200" role="list">
            <li className="flex gap-3">
              <span aria-hidden="true">•</span>
              <span>Ihre Sitzung bleibt bis zur aktiven Abmeldung erhalten.</span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden="true">•</span>
              <span>Passwörter werden nur gehasht gespeichert, nie im Klartext.</span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden="true">•</span>
              <span>
                Rechtsgrundlagen und Datenverarbeitung: <Link href="/datenschutz" className="underline">Datenschutz</Link>.
              </span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden="true">•</span>
              <span>
                Datenschutzrechte wie Export- und Löschanfragen können nach Login direkt im Kundenportal gestellt werden.
              </span>
            </li>
          </ul>
        </aside>

        <div className="rounded-xl bg-paper-50 p-6 shadow-md md:p-8">
          {children}
          <div className="mt-6 border-t border-ink-200/70 pt-5 font-sans text-sm text-navy-700">
            {switchPrompt}
          </div>
        </div>
      </div>
    </section>
  );
}
