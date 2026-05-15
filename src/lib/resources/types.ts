export type ServiceSlug =
  | "vektorisierung"
  | "stickdatei-digitalisierung"
  | "druckdaten-check"
  | "datei-aufbereitung";

export const resourceCategories = [
  {
    slug: "dateivorbereitung",
    label: "Dateivorbereitung",
    description: "Checklisten und Grundlagen für saubere Ausgangsdaten.",
  },
  {
    slug: "vektorisierung",
    label: "Vektorisierung",
    description: "Praxiswissen rund um skalierbare Logo- und Grafikdaten.",
  },
  {
    slug: "stickdateien",
    label: "Stickdateien",
    description: "Hinweise zu Lesbarkeit, Größe und Stichlogik.",
  },
  {
    slug: "druckdaten",
    label: "Druckdaten",
    description: "Freigabe- und Qualitätswissen für den Druckprozess.",
  },
] as const;

export type ResourceCategorySlug = (typeof resourceCategories)[number]["slug"];

export type ResourceContentType = "guide" | "tutorial" | "case-study";

export type ResourceSeoMetadata = {
  title: string;
  description: string;
};

export type ResourceDocument = {
  slug: string;
  title: string;
  summary: string;
  category: ResourceCategorySlug;
  contentType: ResourceContentType;
  serviceTags: ServiceSlug[];
  publishDate: string;
  readingTime: number;
  seo: ResourceSeoMetadata;
  body: string;
};

const categoryMap = new Map(resourceCategories.map((category) => [category.slug, category]));

const contentTypeLabels: Record<ResourceContentType, string> = {
  guide: "Guide",
  tutorial: "Tutorial",
  "case-study": "Case Study",
};

export function isResourceCategorySlug(value: string): value is ResourceCategorySlug {
  return categoryMap.has(value as ResourceCategorySlug);
}

export function getResourceCategory(slug: ResourceCategorySlug) {
  return categoryMap.get(slug)!;
}

export function getResourceContentTypeLabel(contentType: ResourceContentType) {
  return contentTypeLabels[contentType];
}
