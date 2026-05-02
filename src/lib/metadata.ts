import type { Metadata } from "next";

export const siteUrl = "https://dekorfabrik.de";
export const siteName = "dekorfabrik.de";
export const brandName = "Dekorfabrik";
export const defaultDescription =
  "Handgezogene Vektorisierung, Stickdatei-Digitalisierung und druckfertige Dateikonvertierung für Unternehmen, Agenturen und Produktionspartner im DACH-Raum.";

type PageMetadataInput = {
  title?: string;
  description: string;
  path: string;
  index?: boolean;
  follow?: boolean;
};

export function absoluteUrl(path: string) {
  return new URL(path, siteUrl).toString();
}

export function createPageMetadata({
  title,
  description,
  path,
  index = true,
  follow = true,
}: PageMetadataInput): Metadata {
  const url = absoluteUrl(path);
  const resolvedTitle = title ? `${title} · ${siteName}` : siteName;

  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: "website",
      locale: "de_DE",
      url,
      title: resolvedTitle,
      description,
      siteName,
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description,
    },
    robots: {
      index,
      follow,
    },
  };
}

export function getStructuredData() {
  return [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: siteName,
      url: siteUrl,
      description: defaultDescription,
      inLanguage: "de-DE",
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: brandName,
      url: siteUrl,
      logo: absoluteUrl("/dekorfabrik-mark.svg"),
    },
  ];
}
