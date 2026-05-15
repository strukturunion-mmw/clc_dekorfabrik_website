import type { MetadataRoute } from "next";
import { serviceDetails } from "@/components/serviceDetails";
import { absoluteUrl } from "@/lib/metadata";
import { getAllResources } from "@/lib/resources/catalog";
import { resourceCategories } from "@/lib/resources/types";

const staticRoutes = ["/", "/dienste", "/wissen", "/faq", "/kontakt"] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [resources] = await Promise.all([getAllResources()]);
  const lastModified = new Date();

  const serviceRoutes = serviceDetails.map((service) => `/dienste/${service.slug}` as const);
  const categoryRoutes = resourceCategories.map(
    (category) => `/wissen/kategorie/${category.slug}` as const,
  );
  const resourceRoutes = resources.map((resource) => `/wissen/${resource.slug}` as const);

  const routes = [
    ...staticRoutes,
    ...serviceRoutes,
    ...categoryRoutes,
    ...resourceRoutes,
  ];

  return routes.map((route) => ({
    url: absoluteUrl(route),
    lastModified,
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : 0.7,
  }));
}
