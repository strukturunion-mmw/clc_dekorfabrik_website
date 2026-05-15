import Link from "next/link";
import { getResourceCategory, getResourceContentTypeLabel, type ResourceDocument } from "@/lib/resources/types";

type ResourceCardProps = {
  resource: ResourceDocument;
};

function formatPublishDate(value: string) {
  return new Intl.DateTimeFormat("de-DE", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

export function ResourceCard({ resource }: ResourceCardProps) {
  const category = getResourceCategory(resource.category);

  return (
    <article className="rounded-xl border border-navy-900/10 bg-paper-50 p-6 shadow-md">
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="rounded-pill bg-sky-300 px-2.5 py-1 font-sans font-medium text-navy-900">
          {category.label}
        </span>
        <span className="font-brand uppercase tracking-brand text-ink-500">
          {getResourceContentTypeLabel(resource.contentType)}
        </span>
      </div>

      <h2 className="mt-4 font-display text-2xl font-normal text-balance text-navy-900">
        <Link
          href={`/wissen/${resource.slug}`}
          className="underline-offset-4 hover:underline focus:outline-none focus-visible:underline"
        >
          {resource.title}
        </Link>
      </h2>

      <p className="mt-3 font-sans text-sm leading-6 text-navy-700">{resource.excerpt}</p>

      <div className="mt-5 flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase text-ink-500">
        <span>{formatPublishDate(resource.publishDate)}</span>
        <span aria-hidden="true">•</span>
        <span>{resource.readingMinutes} Min Lesezeit</span>
      </div>
    </article>
  );
}
