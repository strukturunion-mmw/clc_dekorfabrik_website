import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/metadata";

const indexableRoutes = ["/", "/dienste", "/faq", "/kontakt"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return indexableRoutes.map((route) => ({
    url: absoluteUrl(route),
    lastModified,
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : 0.7,
  }));
}
