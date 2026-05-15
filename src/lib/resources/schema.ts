import { resourceCategories, serviceLabels, type ResourceCategorySlug, type ServiceSlug } from "@/lib/resources/types";

export type ResourceFrontmatter = {
  title: string;
  slug: string;
  excerpt: string;
  category: ResourceCategorySlug;
  serviceTags: ServiceSlug[];
  publishDate: string;
  updatedDate: string;
  readingMinutes: number;
  author: string;
  seoTitle: string;
  seoDescription: string;
  contentType: "guide" | "tutorial" | "case-study";
};

export const allowedServiceSlugs = Object.keys(serviceLabels) as ServiceSlug[];

export const allowedResourceCategories = resourceCategories.map((category) => category.slug);

export const requiredFrontmatterFields: (keyof ResourceFrontmatter)[] = [
  "title",
  "slug",
  "excerpt",
  "category",
  "serviceTags",
  "publishDate",
  "updatedDate",
  "readingMinutes",
  "author",
  "seoTitle",
  "seoDescription",
  "contentType",
];

export const frontmatterTemplate = `---
title: Musterartikel-Titel
slug: musterartikel-slug
author: Dekorfabrik Team
category: dateivorbereitung
contentType: guide
serviceTags: datei-aufbereitung,druckdaten-check
publishDate: 2026-05-15
updatedDate: 2026-05-15
readingMinutes: 5
excerpt: Kurzer Teaser, der den Artikel in 1-2 Sätzen zusammenfasst.
seoTitle: SEO-Titel mit klarem Suchintent
seoDescription: Prägnante SEO-Beschreibung für Suchergebnis und Social Preview.
---

## Einleitung

Kontext und Ziel des Artikels.

## Hauptteil

Konkrete Handlungsempfehlungen mit Beispielen.

## Fazit

Kurze Zusammenfassung + nächster sinnvoller Schritt.`;
