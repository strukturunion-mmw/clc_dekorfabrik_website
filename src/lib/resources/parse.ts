import path from "node:path";
import {
  allowedResourceCategories,
  allowedServiceSlugs,
  requiredFrontmatterFields,
  type ResourceFrontmatter,
} from "@/lib/resources/schema";

const isoDatePattern = /^\d{4}-\d{2}-\d{2}$/u;
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/u;
const supportedContentTypes = new Set(["guide", "tutorial", "case-study"]);

export type ParsedResourceFile = {
  frontmatter: ResourceFrontmatter;
  body: string;
};

type RawFrontmatter = Record<string, string>;

function normalizeLineEndings(source: string) {
  return source.replace(/\r\n/g, "\n");
}

function stripWrappingQuotes(value: string) {
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1);
  }

  return value;
}

function parseFrontmatterBlock(frontmatterSource: string, sourceSlug: string) {
  const frontmatter: RawFrontmatter = {};

  for (const line of frontmatterSource.split("\n")) {
    const trimmedLine = line.trim();

    if (!trimmedLine) {
      continue;
    }

    const separatorIndex = trimmedLine.indexOf(":");
    if (separatorIndex === -1) {
      throw new Error(
        `Resource "${sourceSlug}" has invalid frontmatter line "${trimmedLine}" (missing ":").`,
      );
    }

    const key = trimmedLine.slice(0, separatorIndex).trim();
    const rawValue = trimmedLine.slice(separatorIndex + 1).trim();
    const value = stripWrappingQuotes(rawValue);

    frontmatter[key] = value;
  }

  return frontmatter;
}

function parseResourceDates(rawValue: string, field: "publishDate" | "updatedDate", sourceSlug: string) {
  if (!isoDatePattern.test(rawValue)) {
    throw new Error(
      `Resource "${sourceSlug}" has invalid ${field} "${rawValue}". Expected YYYY-MM-DD format.`,
    );
  }

  const parsed = new Date(`${rawValue}T00:00:00Z`);
  if (Number.isNaN(parsed.getTime())) {
    throw new Error(`Resource "${sourceSlug}" has invalid ${field} "${rawValue}".`);
  }

  return rawValue;
}

function normalizeCategory(rawCategory: string, sourceSlug: string) {
  const normalizedCategory = rawCategory.trim().toLocaleLowerCase("de-DE");

  if (!allowedResourceCategories.includes(normalizedCategory as ResourceFrontmatter["category"])) {
    throw new Error(
      `Resource "${sourceSlug}" has unknown category "${rawCategory}". Allowed values: ${allowedResourceCategories.join(", ")}.`,
    );
  }

  return normalizedCategory as ResourceFrontmatter["category"];
}

function normalizeServiceTags(rawServiceTags: string, sourceSlug: string) {
  const tags = rawServiceTags
    .split(",")
    .map((tag) => tag.trim().toLocaleLowerCase("de-DE"))
    .filter(Boolean);

  if (!tags.length) {
    throw new Error(`Resource "${sourceSlug}" must define at least one service tag.`);
  }

  const invalidTag = tags.find((tag) => !allowedServiceSlugs.includes(tag as ResourceFrontmatter["serviceTags"][number]));
  if (invalidTag) {
    throw new Error(
      `Resource "${sourceSlug}" has unknown service tag "${invalidTag}". Allowed values: ${allowedServiceSlugs.join(", ")}.`,
    );
  }

  return Array.from(new Set(tags)) as ResourceFrontmatter["serviceTags"];
}

function normalizeContentType(rawContentType: string, sourceSlug: string): ResourceFrontmatter["contentType"] {
  const normalizedContentType = rawContentType.trim().toLocaleLowerCase("de-DE");

  if (!supportedContentTypes.has(normalizedContentType)) {
    throw new Error(
      `Resource "${sourceSlug}" has unsupported contentType "${rawContentType}". Allowed values: guide, tutorial, case-study.`,
    );
  }

  return normalizedContentType as ResourceFrontmatter["contentType"];
}

function normalizeReadingMinutes(rawReadingMinutes: string, sourceSlug: string) {
  const parsed = Number(rawReadingMinutes);

  if (!Number.isFinite(parsed) || parsed < 1) {
    throw new Error(
      `Resource "${sourceSlug}" has invalid readingMinutes "${rawReadingMinutes}". Value must be a positive number.`,
    );
  }

  return Math.round(parsed);
}

function requireRawField(rawFrontmatter: RawFrontmatter, field: keyof ResourceFrontmatter, sourceSlug: string) {
  const value = rawFrontmatter[field]?.trim();

  if (!value) {
    throw new Error(`Resource "${sourceSlug}" is missing required frontmatter field "${field}".`);
  }

  return value;
}

function normalizeSlug(rawSlug: string, sourceSlug: string) {
  const normalizedSlug = rawSlug.trim().toLocaleLowerCase("de-DE");

  if (!slugPattern.test(normalizedSlug)) {
    throw new Error(
      `Resource "${sourceSlug}" has invalid slug "${rawSlug}". Use lowercase letters, numbers, and hyphens only.`,
    );
  }

  return normalizedSlug;
}

export function parseResourceContent(fileName: string, source: string): ParsedResourceFile {
  const normalizedSource = normalizeLineEndings(source);
  const sourceSlug = path.basename(fileName, path.extname(fileName));

  if (!normalizedSource.startsWith("---\n")) {
    throw new Error(`Resource "${sourceSlug}" is missing frontmatter opening delimiter (---).`);
  }

  const closingIndex = normalizedSource.indexOf("\n---\n", 4);
  if (closingIndex === -1) {
    throw new Error(`Resource "${sourceSlug}" is missing frontmatter closing delimiter (---).`);
  }

  const rawFrontmatterSource = normalizedSource.slice(4, closingIndex).trim();
  const body = normalizedSource.slice(closingIndex + "\n---\n".length).trim();

  if (!body.length) {
    throw new Error(`Resource "${sourceSlug}" has no markdown body content.`);
  }

  const rawFrontmatter = parseFrontmatterBlock(rawFrontmatterSource, sourceSlug);

  for (const field of requiredFrontmatterFields) {
    requireRawField(rawFrontmatter, field, sourceSlug);
  }

  const title = requireRawField(rawFrontmatter, "title", sourceSlug);
  const slug = normalizeSlug(requireRawField(rawFrontmatter, "slug", sourceSlug), sourceSlug);
  const excerpt = requireRawField(rawFrontmatter, "excerpt", sourceSlug);
  const category = normalizeCategory(requireRawField(rawFrontmatter, "category", sourceSlug), sourceSlug);
  const serviceTags = normalizeServiceTags(requireRawField(rawFrontmatter, "serviceTags", sourceSlug), sourceSlug);
  const publishDate = parseResourceDates(
    requireRawField(rawFrontmatter, "publishDate", sourceSlug),
    "publishDate",
    sourceSlug,
  );
  const updatedDate = parseResourceDates(
    requireRawField(rawFrontmatter, "updatedDate", sourceSlug),
    "updatedDate",
    sourceSlug,
  );
  const readingMinutes = normalizeReadingMinutes(
    requireRawField(rawFrontmatter, "readingMinutes", sourceSlug),
    sourceSlug,
  );
  const author = requireRawField(rawFrontmatter, "author", sourceSlug);
  const seoTitle = requireRawField(rawFrontmatter, "seoTitle", sourceSlug);
  const seoDescription = requireRawField(rawFrontmatter, "seoDescription", sourceSlug);
  const contentType = normalizeContentType(
    requireRawField(rawFrontmatter, "contentType", sourceSlug),
    sourceSlug,
  );

  return {
    frontmatter: {
      title,
      slug,
      excerpt,
      category,
      serviceTags,
      publishDate,
      updatedDate,
      readingMinutes,
      author,
      seoTitle,
      seoDescription,
      contentType,
    },
    body,
  };
}
