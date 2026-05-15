import {
  type ResourceCategorySlug,
  type ResourceDocument,
  type ServiceSlug,
  serviceLabels,
} from "@/lib/resources/types";

export const maxResourceServiceLinks = 3;
export const maxServiceRelatedResources = 3;

export type ResourceServiceLink = {
  serviceSlug: ServiceSlug;
  href: string;
  anchorLabel: string;
  ctaLabel: string;
  reason: "service-tag" | "category";
};

const categoryToServiceMap: Record<ResourceCategorySlug, ServiceSlug[]> = {
  dateivorbereitung: ["datei-aufbereitung", "druckdaten-check"],
  vektorisierung: ["vektorisierung"],
  stickdateien: ["stickdatei-digitalisierung"],
  druckdaten: ["druckdaten-check", "datei-aufbereitung"],
};

const serviceToCategoryMap: Record<ServiceSlug, ResourceCategorySlug[]> = {
  vektorisierung: ["vektorisierung", "dateivorbereitung"],
  "stickdatei-digitalisierung": ["stickdateien", "dateivorbereitung"],
  "druckdaten-check": ["druckdaten", "dateivorbereitung"],
  "datei-aufbereitung": ["dateivorbereitung", "druckdaten"],
};

const serviceCtaLabelMap: Record<ServiceSlug, string> = {
  vektorisierung: "Vektorisierung anfragen",
  "stickdatei-digitalisierung": "Stickdatei-Digitalisierung anfragen",
  "druckdaten-check": "Druckdaten-Check anfragen",
  "datei-aufbereitung": "Datei-Aufbereitung anfragen",
};

const knownServiceSlugs = new Set(Object.keys(serviceLabels) as ServiceSlug[]);

function isServiceSlug(value: string): value is ServiceSlug {
  return knownServiceSlugs.has(value as ServiceSlug);
}

function uniqueServiceSlugs(values: ServiceSlug[]) {
  const unique: ServiceSlug[] = [];
  const seen = new Set<ServiceSlug>();

  for (const value of values) {
    if (!isServiceSlug(value) || seen.has(value)) {
      continue;
    }

    seen.add(value);
    unique.push(value);
  }

  return unique;
}

function getServiceHref(serviceSlug: ServiceSlug) {
  return `/dienste/${serviceSlug}`;
}

export function getServiceLinksForResource(
  resource: Pick<ResourceDocument, "category" | "serviceTags">,
  maxLinks: number = maxResourceServiceLinks,
): ResourceServiceLink[] {
  if (maxLinks < 1) {
    return [];
  }

  const serviceTagSlugs = uniqueServiceSlugs(resource.serviceTags ?? []);
  const categorySlugs = uniqueServiceSlugs(categoryToServiceMap[resource.category] ?? []);

  const serviceTagSet = new Set(serviceTagSlugs);
  const orderedLinks = uniqueServiceSlugs([...serviceTagSlugs, ...categorySlugs]).slice(0, maxLinks);

  return orderedLinks.map((serviceSlug) => ({
    serviceSlug,
    href: getServiceHref(serviceSlug),
    anchorLabel: `Zur Leistung ${serviceLabels[serviceSlug]}`,
    ctaLabel: serviceCtaLabelMap[serviceSlug],
    reason: serviceTagSet.has(serviceSlug) ? "service-tag" : "category",
  }));
}

export function getRelatedResourcesForService(
  resources: ResourceDocument[],
  serviceSlug: ServiceSlug,
  maxItems: number = maxServiceRelatedResources,
): ResourceDocument[] {
  if (maxItems < 1 || resources.length === 0) {
    return [];
  }

  const directMatches = resources.filter((resource) => resource.serviceTags.includes(serviceSlug));

  if (directMatches.length >= maxItems) {
    return directMatches.slice(0, maxItems);
  }

  const seenSlugs = new Set(directMatches.map((resource) => resource.slug));
  const fallbackCategories = new Set(serviceToCategoryMap[serviceSlug] ?? []);

  const fallbackMatches = resources.filter((resource) => {
    if (seenSlugs.has(resource.slug)) {
      return false;
    }

    return fallbackCategories.has(resource.category);
  });

  return [...directMatches, ...fallbackMatches].slice(0, maxItems);
}
