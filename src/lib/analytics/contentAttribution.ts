type SearchParamsLike = {
  get(name: string): string | null;
};

export type ContentJourneyAttribution = {
  articleSlug: string;
  articleCategory: string;
  ctaVariant: string | null;
  targetServiceSlug: string | null;
};

function normalizeParam(value: string | null) {
  const next = value?.trim();
  return next ? next : null;
}

export function getContentJourneyAttribution(
  searchParams: SearchParamsLike,
): ContentJourneyAttribution | null {
  const articleSlug = normalizeParam(searchParams.get("article"));
  const articleCategory = normalizeParam(searchParams.get("category"));

  if (!articleSlug || !articleCategory) {
    return null;
  }

  return {
    articleSlug,
    articleCategory,
    ctaVariant: normalizeParam(searchParams.get("cta")),
    targetServiceSlug: normalizeParam(searchParams.get("service")),
  };
}
