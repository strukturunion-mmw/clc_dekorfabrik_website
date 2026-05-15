import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/sections/PageShell";
import { ResourceCard } from "@/components/resources/ResourceCard";
import { ResourceFilterBar } from "@/components/resources/ResourceFilterBar";
import { createPageMetadata } from "@/lib/metadata";
import {
  filterResourcesByKeyword,
  getResourceCategorySummaries,
  getResourcesByCategory,
} from "@/lib/resources/catalog";
import {
  getResourceCategory,
  isResourceCategorySlug,
  resourceCategories,
  type ResourceCategorySlug,
} from "@/lib/resources/types";

type CategoryPageProps = {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ q?: string }>;
};

export function generateStaticParams() {
  return resourceCategories.map((category) => ({ category: category.slug }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;

  if (!isResourceCategorySlug(category)) {
    return {};
  }

  const categoryMeta = getResourceCategory(category);

  return createPageMetadata({
    title: `Wissen: ${categoryMeta.label}`,
    description: categoryMeta.description,
    path: `/wissen/kategorie/${category}`,
  });
}

export default async function ResourceCategoryPage({
  params,
  searchParams,
}: CategoryPageProps) {
  const { category } = await params;
  const { q } = await searchParams;

  if (!isResourceCategorySlug(category)) {
    notFound();
  }

  const typedCategory: ResourceCategorySlug = category;
  const categoryMeta = getResourceCategory(typedCategory);

  const [resourcesInCategory, categorySummaries] = await Promise.all([
    getResourcesByCategory(typedCategory),
    getResourceCategorySummaries(),
  ]);

  const filteredResources = filterResourcesByKeyword(resourcesInCategory, q ?? "");
  const countsByCategory = Object.fromEntries(
    categorySummaries.map((categorySummary) => [categorySummary.slug, categorySummary.count]),
  );

  return (
    <PageShell>
      <section className="mx-auto max-w-content px-6 pt-12 pb-24 lg:pt-16" aria-labelledby="wissen-category-title">
        <div className="max-w-3xl">
          <p className="font-brand text-xs uppercase tracking-brand text-ink-500">Kategorie-Archiv</p>
          <h1
            id="wissen-category-title"
            className="mt-3 font-display text-d4 font-normal text-balance text-navy-900 md:text-d3"
          >
            {categoryMeta.label}
          </h1>
          <p className="mt-5 font-sans text-md text-navy-700">{categoryMeta.description}</p>
        </div>

        <form action={`/wissen/kategorie/${typedCategory}`} className="mt-8">
          <label
            htmlFor="wissen-category-search"
            className="font-sans text-sm font-medium text-navy-800"
          >
            Suche innerhalb dieser Kategorie
          </label>
          <div className="mt-2 flex max-w-xl flex-wrap gap-2">
            <input
              id="wissen-category-search"
              name="q"
              defaultValue={q ?? ""}
              className="h-11 min-w-[240px] flex-1 rounded-pill border border-navy-900/20 bg-paper-50 px-4 font-sans text-sm text-navy-900 outline-none transition-colors focus:border-clay-500"
              placeholder="z. B. Dateiformat, Freigabe, Lesbarkeit"
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
          <ResourceFilterBar
            activeCategory={typedCategory}
            countsByCategory={countsByCategory}
            keyword={q}
          />
        </div>

        {filteredResources.length ? (
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {filteredResources.map((resource) => (
              <ResourceCard key={resource.slug} resource={resource} />
            ))}
          </div>
        ) : (
          <article className="mt-8 rounded-xl border border-navy-900/15 bg-paper-50 p-6">
            <h2 className="font-display text-xl font-normal text-navy-900">Keine Artikel in dieser Kategorie gefunden</h2>
            <p className="mt-3 font-sans text-sm leading-6 text-navy-700">
              Für den Suchbegriff „{q}“ gibt es in {categoryMeta.label} aktuell
              keinen passenden Beitrag. Du kannst über „Alle“ zurück zur
              Gesamtübersicht wechseln.
            </p>
          </article>
        )}
      </section>
    </PageShell>
  );
}
