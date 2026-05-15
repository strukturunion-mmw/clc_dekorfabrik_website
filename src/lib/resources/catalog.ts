import { cache } from "react";
import { promises as fs } from "node:fs";
import path from "node:path";
import {
  getResourceCategory,
  isResourceCategorySlug,
  type ResourceCategorySlug,
  type ResourceContentType,
  type ResourceDocument,
  type ServiceSlug,
} from "@/lib/resources/types";

const contentDirectory = path.join(process.cwd(), "src/content/resources");

const resourceExtensions = new Set([".md", ".mdx"]);

const allowedContentTypes = new Set<ResourceContentType>([
  "guide",
  "tutorial",
  "case-study",
]);

const allowedServiceSlugs = new Set<ServiceSlug>([
  "vektorisierung",
  "stickdatei-digitalisierung",
  "druckdaten-check",
  "datei-aufbereitung",
]);

type Frontmatter = Record<string, string>;

function parseFrontmatter(source: string) {
  const normalizedSource = source.replace(/\r\n/g, "\n");

  if (!normalizedSource.startsWith("---\n")) {
    throw new Error("Resource file is missing frontmatter opening delimiter.");
  }

  const closingIndex = normalizedSource.indexOf("\n---\n", 4);
  if (closingIndex === -1) {
    throw new Error("Resource file is missing frontmatter closing delimiter.");
  }

  const frontmatterSource = normalizedSource.slice(4, closingIndex).trim();
  const body = normalizedSource.slice(closingIndex + "\n---\n".length).trim();

  const frontmatter: Frontmatter = {};

  for (const line of frontmatterSource.split("\n")) {
    const trimmedLine = line.trim();
    if (!trimmedLine) {
      continue;
    }

    const separatorIndex = trimmedLine.indexOf(":");
    if (separatorIndex === -1) {
      throw new Error(`Invalid frontmatter line: ${trimmedLine}`);
    }

    const key = trimmedLine.slice(0, separatorIndex).trim();
    const rawValue = trimmedLine.slice(separatorIndex + 1).trim();
    const value = stripWrappingQuotes(rawValue);

    frontmatter[key] = value;
  }

  return { frontmatter, body };
}

function stripWrappingQuotes(value: string) {
  if (
    (value.startsWith("\"") && value.endsWith("\"")) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1);
  }

  return value;
}

function requireFrontmatterField(frontmatter: Frontmatter, key: string, slug: string) {
  const value = frontmatter[key]?.trim();
  if (!value) {
    throw new Error(`Resource "${slug}" is missing required frontmatter field "${key}".`);
  }

  return value;
}

function parseServiceTags(rawValue: string, slug: string): ServiceSlug[] {
  const tags = rawValue
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);

  if (!tags.length) {
    throw new Error(`Resource "${slug}" must define at least one service tag.`);
  }

  const invalidTag = tags.find((tag) => !allowedServiceSlugs.has(tag as ServiceSlug));
  if (invalidTag) {
    throw new Error(
      `Resource "${slug}" has unknown service tag "${invalidTag}". Allowed values: ${Array.from(
        allowedServiceSlugs,
      ).join(", ")}.`,
    );
  }

  return tags as ServiceSlug[];
}

function parsePublishDate(rawValue: string, slug: string) {
  const parsed = new Date(rawValue);

  if (Number.isNaN(parsed.getTime())) {
    throw new Error(`Resource "${slug}" has invalid publishDate "${rawValue}".`);
  }

  return rawValue;
}

function parseReadingTime(rawValue: string, slug: string) {
  const parsed = Number(rawValue);

  if (!Number.isFinite(parsed) || parsed <= 0) {
    throw new Error(`Resource "${slug}" has invalid readingTime "${rawValue}".`);
  }

  return Math.round(parsed);
}

function parseContentType(rawValue: string, slug: string): ResourceContentType {
  if (!allowedContentTypes.has(rawValue as ResourceContentType)) {
    throw new Error(
      `Resource "${slug}" has unsupported contentType "${rawValue}". Allowed values: ${Array.from(
        allowedContentTypes,
      ).join(", ")}.`,
    );
  }

  return rawValue as ResourceContentType;
}

async function readResourceFile(fileName: string): Promise<ResourceDocument> {
  const filePath = path.join(contentDirectory, fileName);
  const source = await fs.readFile(filePath, "utf8");
  const slug = fileName.replace(/\.(md|mdx)$/u, "");

  const { frontmatter, body } = parseFrontmatter(source);

  const title = requireFrontmatterField(frontmatter, "title", slug);
  const summary = requireFrontmatterField(frontmatter, "summary", slug);
  const categoryRaw = requireFrontmatterField(frontmatter, "category", slug);
  const publishDateRaw = requireFrontmatterField(frontmatter, "publishDate", slug);
  const readingTimeRaw = requireFrontmatterField(frontmatter, "readingTime", slug);
  const contentTypeRaw = requireFrontmatterField(frontmatter, "contentType", slug);
  const serviceTagsRaw = requireFrontmatterField(frontmatter, "serviceTags", slug);

  if (!isResourceCategorySlug(categoryRaw)) {
    throw new Error(`Resource "${slug}" has unknown category "${categoryRaw}".`);
  }

  const category = categoryRaw;
  const publishDate = parsePublishDate(publishDateRaw, slug);
  const readingTime = parseReadingTime(readingTimeRaw, slug);
  const contentType = parseContentType(contentTypeRaw, slug);
  const serviceTags = parseServiceTags(serviceTagsRaw, slug);

  const seoTitle = frontmatter.seoTitle?.trim() || `${title} | Wissen`;
  const seoDescription = frontmatter.seoDescription?.trim() || summary;

  if (!body.length) {
    throw new Error(`Resource "${slug}" has no markdown body content.`);
  }

  return {
    slug,
    title,
    summary,
    category,
    contentType,
    serviceTags,
    publishDate,
    readingTime,
    seo: {
      title: seoTitle,
      description: seoDescription,
    },
    body,
  };
}

export const getAllResources = cache(async (): Promise<ResourceDocument[]> => {
  const directoryEntries = await fs.readdir(contentDirectory, { withFileTypes: true });

  const files = directoryEntries
    .filter((entry) => entry.isFile() && resourceExtensions.has(path.extname(entry.name)))
    .map((entry) => entry.name)
    .sort((left, right) => left.localeCompare(right));

  const resources = await Promise.all(files.map((fileName) => readResourceFile(fileName)));

  return resources.sort(
    (left, right) =>
      new Date(right.publishDate).getTime() - new Date(left.publishDate).getTime(),
  );
});

export async function getResourceBySlug(slug: string) {
  const resources = await getAllResources();
  return resources.find((resource) => resource.slug === slug);
}

export async function getResourcesByCategory(category: ResourceCategorySlug) {
  const resources = await getAllResources();
  return resources.filter((resource) => resource.category === category);
}

export async function getResourceCategorySummaries() {
  const resources = await getAllResources();

  return Array.from(
    new Set(resources.map((resource) => resource.category)),
  ).map((categorySlug) => {
    const category = getResourceCategory(categorySlug);

    return {
      ...category,
      count: resources.filter((resource) => resource.category === categorySlug).length,
    };
  });
}

export function filterResourcesByKeyword(resources: ResourceDocument[], keyword: string) {
  const normalizedKeyword = keyword.trim().toLocaleLowerCase("de-DE");

  if (!normalizedKeyword) {
    return resources;
  }

  return resources.filter((resource) => {
    const haystack = [
      resource.title,
      resource.summary,
      resource.body,
      getResourceCategory(resource.category).label,
    ]
      .join(" ")
      .toLocaleLowerCase("de-DE");

    return haystack.includes(normalizedKeyword);
  });
}
