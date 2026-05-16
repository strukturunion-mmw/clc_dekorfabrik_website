import type { Metadata } from "next";
import { PageShell } from "@/components/sections/PageShell";
import { ResourceCard } from "@/components/resources/ResourceCard";
import { ResourceFilterBar } from "@/components/resources/ResourceFilterBar";
import { createPageMetadata } from "@/lib/metadata";
import {
  filterResourcesByKeyword,
  getAllResources,
  getResourceCategorySummaries,
} from "@/lib/resources/catalog";

type WissenPageProps = {
  searchParams: Promise<{ q?: string | string[] }>;
};

export const metadata: Metadata = createPageMetadata({
  title: "Wissen",
  description:
    "Guides, Tutorials und Case Studies zu Vektorisierung, Stickdateien, Druckdaten und Dateivorbereitung.",
  path: "/wissen",
});

export default async function WissenPage({ searchParams }: WissenPageProps) {
  const { q } = await searchParams;
  const normalizedQuery = Array.isArray(q) ? (q[0] ?? "") : (q ?? "");
  const resources = await getAllResources();
  const categorySummaries = await getResourceCategorySummaries();
  const filteredResources = filterResourcesByKeyword(resources, normalizedQuery);

  const countsByCategory = Object.fromEntries(
    categorySummaries.map((category) => [category.slug, category.count]),
  );

  return (
    <PageShell>
      <section className="mx-auto max-w-content px-6 pt-12 pb-24 lg:pt-16" aria-labelledby="wissen-title">
        <div className="max-w-3xl">
          <p className="font-brand text-xs uppercase tracking-brand text-ink-500">Wissen & Orientierung</p>
          <h1
            id="wissen-title"
            className="mt-3 font-display text-d4 font-normal text-balance text-navy-900 md:text-d3"
          >
            Guides, Tutorials und Case Studies für saubere Produktionsdaten.
          </h1>
          <p className="mt-5 font-sans text-md text-navy-700">
            Der Wissensbereich bündelt praxisnahe Artikel rund um Vektorisierung,
            Stickdateien, Druckdaten und Dateivorbereitung. Alle Inhalte sind für
            konkrete Produktionsentscheidungen im B2B-Alltag geschrieben.
          </p>
        </div>

        <form action="/wissen" className="mt-8">
          <label htmlFor="wissen-search" className="font-sans text-sm font-medium text-navy-800">
            Suche innerhalb der Artikel
          </label>
          <div className="mt-2 flex max-w-xl flex-wrap gap-2">
            <input
              id="wissen-search"
              name="q"
              defaultValue={normalizedQuery}
              className="h-11 min-w-[240px] flex-1 rounded-pill border border-navy-900/20 bg-paper-50 px-4 font-sans text-sm text-navy-900 outline-none transition-colors focus:border-clay-500"
              placeholder="z. B. Beschnitt, Stickgröße, Vektor"
            />
            <button
              type="submit"
              className="inline-flex h-11 items-center justify-center rounded-pill bg-navy-900 px-5 font-sans text-sm font-medium text-paper-100 transition-colors hover:bg-navy-700"
            >
              Suchen
            </button>
          </div>
        </form>

        <div className="mt-8">
          <ResourceFilterBar countsByCategory={countsByCategory} keyword={normalizedQuery} />
        </div>

        {filteredResources.length ? (
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {filteredResources.map((resource) => (
              <ResourceCard key={resource.slug} resource={resource} />
            ))}
          </div>
        ) : (
          <article className="mt-8 rounded-xl border border-navy-900/15 bg-paper-50 p-6">
            <h2 className="font-display text-xl font-normal text-navy-900">Keine Treffer gefunden</h2>
            <p className="mt-3 font-sans text-sm leading-6 text-navy-700">
              Für den Suchbegriff „{normalizedQuery}“ gibt es aktuell keinen passenden Artikel.
              Bitte versuche einen allgemeineren Begriff oder starte über die
              Kategorie-Filter.
            </p>
          </article>
        )}
      </section>
    </PageShell>
  );
}
