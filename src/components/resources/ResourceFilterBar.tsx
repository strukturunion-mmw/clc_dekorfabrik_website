import Link from "next/link";
import { resourceCategories, type ResourceCategorySlug } from "@/lib/resources/types";
import { ResourceCategoryPill } from "@/components/resources/ResourceCategoryPill";

type ResourceFilterBarProps = {
  activeCategory?: ResourceCategorySlug;
  countsByCategory: Partial<Record<ResourceCategorySlug, number>>;
  keyword?: string;
};

function buildCategoryHref(category: ResourceCategorySlug, activeKeyword?: string) {
  const query = new URLSearchParams();

  if (activeKeyword?.trim()) {
    query.set("q", activeKeyword.trim());
  }

  const queryString = query.toString();
  return queryString
    ? `/wissen/kategorie/${category}?${queryString}`
    : `/wissen/kategorie/${category}`;
}

function buildAllHref(activeKeyword?: string) {
  const query = new URLSearchParams();

  if (activeKeyword?.trim()) {
    query.set("q", activeKeyword.trim());
  }

  const queryString = query.toString();
  return queryString ? `/wissen?${queryString}` : "/wissen";
}

export function ResourceFilterBar({
  activeCategory,
  countsByCategory,
  keyword,
}: ResourceFilterBarProps) {
  const allCount = Object.values(countsByCategory).reduce(
    (sum, value) => sum + (value ?? 0),
    0,
  );

  const allClassName = [
    "inline-flex items-center gap-2 rounded-pill border px-3 py-1.5 font-sans text-xs font-medium transition-colors",
    !activeCategory
      ? "border-navy-900 bg-navy-900 text-paper-100"
      : "border-navy-900/20 bg-paper-50 text-navy-800 hover:bg-navy-900/5",
  ].join(" ");

  return (
    <nav aria-label="Ressourcen nach Kategorie filtern" className="flex flex-wrap gap-2">
      <Link href={buildAllHref(keyword)} className={allClassName} aria-current={!activeCategory ? "page" : undefined}>
        <span>Alle</span>
        <span
          className={[
            "inline-flex min-w-[1.5rem] justify-center rounded-pill px-1.5 py-0.5 font-mono text-[11px]",
            !activeCategory ? "bg-paper-100/20 text-paper-100" : "bg-navy-900/10 text-navy-700",
          ].join(" ")}
        >
          {allCount}
        </span>
      </Link>

      {resourceCategories.map((category) => (
        <ResourceCategoryPill
          key={category.slug}
          category={category.slug}
          active={activeCategory === category.slug}
          href={buildCategoryHref(category.slug, keyword)}
          count={countsByCategory[category.slug] ?? 0}
        />
      ))}
    </nav>
  );
}
