import Link from "next/link";
import { getServiceLinksForResource, maxResourceServiceLinks } from "@/lib/resources/internalLinks";
import type { ResourceDocument } from "@/lib/resources/types";
import { getServiceLabel } from "@/lib/resources/types";

type ResourceServiceLinksProps = {
  resource: Pick<ResourceDocument, "category" | "serviceTags" | "slug" | "title">;
  maxLinks?: number;
};

export function ResourceServiceLinks({
  resource,
  maxLinks = maxResourceServiceLinks,
}: ResourceServiceLinksProps) {
  const links = getServiceLinksForResource(resource, maxLinks);

  if (!links.length) {
    return null;
  }

  return (
    <section className="mt-12 max-w-3xl rounded-xl border border-navy-900/15 bg-paper-50 p-6 shadow-sm" aria-labelledby="resource-service-links-title">
      <h2 id="resource-service-links-title" className="font-display text-xl font-normal text-navy-900">
        Passende Leistungen
      </h2>
      <p className="mt-3 font-sans text-sm leading-6 text-navy-700">
        Diese Leistungen passen fachlich zu diesem Beitrag und führen direkt zur passenden Service-Seite.
      </p>

      <ul className="mt-5 space-y-3" role="list">
        {links.map((link) => (
          <li key={link.serviceSlug}>
            <Link
              href={`${link.href}?article=${resource.slug}&category=${resource.category}&cta=resource-service-links`}
              className="group flex items-center justify-between gap-4 rounded-lg border border-navy-900/15 bg-paper-100 px-4 py-3 text-left transition-colors hover:bg-sky-200/35 focus:outline-none focus-visible:ring-2 focus-visible:ring-clay-500"
            >
              <span className="font-sans text-sm text-navy-900">
                {link.anchorLabel} <span className="text-navy-700">({getServiceLabel(link.serviceSlug)})</span>
              </span>
              <span className="font-sans text-sm font-medium text-azure-700 underline-offset-4 group-hover:underline">
                {link.ctaLabel}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
