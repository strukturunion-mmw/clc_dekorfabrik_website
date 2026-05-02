import type { ReactNode } from "react";
import { PageShell } from "@/components/sections/PageShell";
import { Pill } from "@/components/ui/Pill";

type LegalPageProps = {
  title: string;
  intro: string;
  note: ReactNode;
  children: ReactNode;
};

export function LegalPage({ title, intro, note, children }: LegalPageProps) {
  return (
    <PageShell>
      <section
        className="mx-auto max-w-content px-6 pt-12 pb-12 lg:pt-16"
        aria-labelledby="legal-page-title"
      >
        <Pill tone="sky" dot>
          Rechtliches · MVP
        </Pill>
        <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_360px]">
          <div>
            <h1
              id="legal-page-title"
              className="font-display text-d4 font-normal text-balance text-navy-900 md:text-d3"
            >
              {title}
            </h1>
            <p className="mt-6 max-w-2xl font-sans text-md text-navy-700">
              {intro}
            </p>
          </div>

          <aside className="rounded-xl bg-navy-800 p-6 text-paper-100 shadow-md">
            <div className="font-brand text-xs uppercase tracking-brand text-navy-200">
              Wichtiger Hinweis
            </div>
            <div className="mt-3 font-sans text-sm leading-6 text-navy-200">
              {note}
            </div>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-content px-6 pb-24">
        <article className="rounded-xl bg-paper-50 p-6 shadow-md md:p-8">
          <div className="legal-copy">{children}</div>
        </article>
      </section>
    </PageShell>
  );
}
