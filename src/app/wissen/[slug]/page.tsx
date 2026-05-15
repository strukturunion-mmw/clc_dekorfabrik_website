import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ResourceServiceLinks } from "@/components/resources/ResourceServiceLinks";
import { PageShell } from "@/components/sections/PageShell";
import { LinkButton } from "@/components/ui/Button";
import { createPageMetadata } from "@/lib/metadata";
import { getAllResources, getResourceBySlug } from "@/lib/resources/catalog";
import { getResourceArticleSchema } from "@/lib/resources/schemaOrg";
import {
  getResourceCategory,
  getResourceContentTypeLabel,
  type ResourceDocument,
} from "@/lib/resources/types";

const paragraphSeparator = /\n\s*\n/g;

function formatPublishDate(value: string) {
  return new Intl.DateTimeFormat("de-DE", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}

function parseMarkdown(resource: ResourceDocument) {
  return resource.body
    .split(paragraphSeparator)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block) => {
      if (block.startsWith("## ")) {
        return {
          type: "heading" as const,
          content: block.replace(/^##\s+/u, "").trim(),
        };
      }

      if (block.startsWith("- ")) {
        const items = block
          .split("\n")
          .map((line) => line.trim())
          .filter(Boolean)
          .map((line) => line.replace(/^-\s+/u, "").trim());

        return {
          type: "list" as const,
          items,
        };
      }

      if (/^\d+\.\s+/u.test(block)) {
        const items = block
          .split("\n")
          .map((line) => line.trim())
          .filter(Boolean)
          .map((line) => line.replace(/^\d+\.\s+/u, "").trim());

        return {
          type: "ordered-list" as const,
          items,
        };
      }

      return {
        type: "paragraph" as const,
        content: block,
      };
    });
}

function renderInlineMarkup(text: string) {
  const boldPattern = /(\*\*[^*]+\*\*)/g;

  return text.split(boldPattern).map((fragment, index) => {
    if (fragment.startsWith("**") && fragment.endsWith("**")) {
      return <strong key={`${fragment}-${index}`}>{fragment.slice(2, -2)}</strong>;
    }

    return fragment;
  });
}

type ResourcePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const resources = await getAllResources();
  return resources.map((resource) => ({ slug: resource.slug }));
}

export async function generateMetadata({ params }: ResourcePageProps): Promise<Metadata> {
  const { slug } = await params;
  const resource = await getResourceBySlug(slug);

  if (!resource) {
    return {};
  }

  return createPageMetadata({
    title: resource.seo.title,
    description: resource.seo.description,
    path: `/wissen/${resource.slug}`,
  });
}

export default async function ResourceDetailPage({ params }: ResourcePageProps) {
  const { slug } = await params;
  const resource = await getResourceBySlug(slug);

  if (!resource) {
    notFound();
  }

  const category = getResourceCategory(resource.category);
  const contentBlocks = parseMarkdown(resource);
  const articleSchema = getResourceArticleSchema(resource);

  return (
    <PageShell>
      <section className="mx-auto max-w-content px-6 pt-12 pb-24 lg:pt-16" aria-labelledby="resource-title">
        <nav aria-label="Breadcrumb" className="font-sans text-sm text-navy-700">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/wissen" className="underline-offset-4 hover:underline">
                Wissen
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link
                href={`/wissen/kategorie/${resource.category}`}
                className="underline-offset-4 hover:underline"
              >
                {category.label}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-navy-900">{resource.title}</li>
          </ol>
        </nav>

        <header className="mt-5 max-w-3xl">
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <span className="rounded-pill bg-sky-300 px-2.5 py-1 font-sans font-medium text-navy-900">
              {category.label}
            </span>
            <span className="font-brand uppercase tracking-brand text-ink-500">
              {getResourceContentTypeLabel(resource.contentType)}
            </span>
            <span className="font-mono uppercase text-ink-500">{resource.readingMinutes} Min</span>
          </div>

          <h1
            id="resource-title"
            className="mt-4 font-display text-d4 font-normal text-balance text-navy-900 md:text-d3"
          >
            {resource.title}
          </h1>

          <p className="mt-4 font-sans text-md text-navy-700">{resource.excerpt}</p>

          <p className="mt-4 font-mono text-xs uppercase tracking-wide text-ink-500">
            Veröffentlicht am {formatPublishDate(resource.publishDate)}
            <span className="mx-2" aria-hidden="true">
              •
            </span>
            Aktualisiert am {formatPublishDate(resource.updatedDate)}
          </p>
          <p className="mt-2 font-mono text-xs uppercase tracking-wide text-ink-500">
            Autor: {resource.author}
          </p>
        </header>

        <article className="prose prose-p:font-sans prose-p:text-navy-800 prose-headings:font-display prose-headings:text-navy-900 mt-10 max-w-3xl">
          {contentBlocks.map((block, index) => {
            if (block.type === "heading") {
              return (
                <h2 key={`heading-${index}`} className="mt-8 text-2xl font-normal text-navy-900">
                  {block.content}
                </h2>
              );
            }

            if (block.type === "list") {
              return (
                <ul key={`list-${index}`} className="mt-4 list-disc space-y-2 pl-5 font-sans text-navy-800">
                  {block.items.map((item) => (
                    <li key={item}>{renderInlineMarkup(item)}</li>
                  ))}
                </ul>
              );
            }

            if (block.type === "ordered-list") {
              return (
                <ol key={`ordered-${index}`} className="mt-4 list-decimal space-y-2 pl-5 font-sans text-navy-800">
                  {block.items.map((item) => (
                    <li key={item}>{renderInlineMarkup(item)}</li>
                  ))}
                </ol>
              );
            }

            return (
              <p key={`paragraph-${index}`} className="mt-4 font-sans text-base leading-7 text-navy-800">
                {renderInlineMarkup(block.content)}
              </p>
            );
          })}
        </article>

        <ResourceServiceLinks resource={resource} />

        <section className="mt-12 max-w-3xl rounded-xl bg-paper-50 p-6 shadow-md" aria-labelledby="resource-cta-title">
          <h2 id="resource-cta-title" className="font-display text-2xl font-normal text-navy-900">
            Nächster Schritt
          </h2>
          <p className="mt-3 font-sans text-sm leading-6 text-navy-700">
            Wenn du Unterstützung bei der praktischen Umsetzung brauchst, kannst
            du direkt eine Anfrage mit Datei und Zielmedium starten.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <LinkButton
              href={`/kontakt?article=${resource.slug}&category=${resource.category}&cta=resource-detail-primary`}
              variant="brand"
            >
              Anfrage starten
            </LinkButton>
            <LinkButton
              href={`/dienste?article=${resource.slug}&category=${resource.category}&cta=resource-detail-services`}
              variant="secondary"
            >
              Services ansehen
            </LinkButton>
          </div>
        </section>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
      </section>
    </PageShell>
  );
}
