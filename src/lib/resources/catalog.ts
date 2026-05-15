import { cache } from "react";
import { promises as fs } from "node:fs";
import path from "node:path";
import { parseResourceContent } from "@/lib/resources/parse";
import {
  getResourceCategory,
  isResourceCategorySlug,
  type ResourceCategorySlug,
  type ResourceDocument,
} from "@/lib/resources/types";

const contentDirectory = path.join(process.cwd(), "src/content/resources");
const resourceExtensions = new Set([".md", ".mdx"]);

async function readResourceFile(fileName: string): Promise<ResourceDocument> {
  const filePath = path.join(contentDirectory, fileName);
  const source = await fs.readFile(filePath, "utf8");

  const { frontmatter, body } = parseResourceContent(fileName, source);

  return {
    slug: frontmatter.slug,
    title: frontmatter.title,
    excerpt: frontmatter.excerpt,
    category: frontmatter.category,
    contentType: frontmatter.contentType,
    serviceTags: frontmatter.serviceTags,
    publishDate: frontmatter.publishDate,
    updatedDate: frontmatter.updatedDate,
    readingMinutes: frontmatter.readingMinutes,
    author: frontmatter.author,
    seo: {
      title: frontmatter.seoTitle,
      description: frontmatter.seoDescription,
    },
    body,
  };
}

export const getAllResources = cache(async (): Promise<ResourceDocument[]> => {
  const directoryEntries = await fs.readdir(contentDirectory, { withFileTypes: true });

  const files = directoryEntries
    .filter((entry) => entry.isFile() && resourceExtensions.has(path.extname(entry.name)))
    .map((entry) => entry.name)
    .sort((left, right) => left.localeCompare(right, "de-DE"));

  const resources = await Promise.all(files.map((fileName) => readResourceFile(fileName)));

  const seenSlugs = new Set<string>();
  for (const resource of resources) {
    if (seenSlugs.has(resource.slug)) {
      throw new Error(`Duplicate resource slug detected: "${resource.slug}".`);
    }

    seenSlugs.add(resource.slug);
  }

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
      resource.excerpt,
      resource.body,
      resource.author,
      resource.serviceTags.join(" "),
      getResourceCategory(resource.category).label,
    ]
      .join(" ")
      .toLocaleLowerCase("de-DE");

    return haystack.includes(normalizedKeyword);
  });
}

export function normalizeResourceCategory(input: string) {
  const normalized = input.trim().toLocaleLowerCase("de-DE");

  if (!isResourceCategorySlug(normalized)) {
    return null;
  }

  return normalized;
}
