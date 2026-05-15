import { absoluteUrl, brandName, siteName } from "@/lib/metadata";
import { getResourceCategory, getServiceLabel, type ResourceDocument } from "@/lib/resources/types";

export type ResourceArticleSchema = {
  "@context": "https://schema.org";
  "@type": "Article";
  headline: string;
  description: string;
  inLanguage: "de-DE";
  author: {
    "@type": "Organization";
    name: string;
  };
  publisher: {
    "@type": "Organization";
    name: string;
  };
  mainEntityOfPage: string;
  datePublished: string;
  dateModified: string;
  articleSection: string;
  keywords: string[];
};

export function getResourceArticleSchema(resource: ResourceDocument): ResourceArticleSchema {
  const category = getResourceCategory(resource.category);

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: resource.title,
    description: resource.excerpt,
    inLanguage: "de-DE",
    author: {
      "@type": "Organization",
      name: resource.author,
    },
    publisher: {
      "@type": "Organization",
      name: brandName,
    },
    mainEntityOfPage: absoluteUrl(`/wissen/${resource.slug}`),
    datePublished: resource.publishDate,
    dateModified: resource.updatedDate,
    articleSection: category.label,
    keywords: [category.label, siteName, ...resource.serviceTags.map(getServiceLabel)],
  };
}
