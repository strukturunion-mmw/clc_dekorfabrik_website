import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ResourceCard } from "@/components/resources/ResourceCard";
import { PageShell } from "@/components/sections/PageShell";
import { serviceDetails, getServiceDetail } from "@/components/serviceDetails";
import { inquiryPath } from "@/components/siteContent";
import { LinkButton } from "@/components/ui/Button";
import { Pill } from "@/components/ui/Pill";
import { ServicePricingEstimator } from "@/components/pricing/ServicePricingEstimator";
import { createPageMetadata } from "@/lib/metadata";
import { getAllResources } from "@/lib/resources/catalog";
import { getRelatedResourcesForService } from "@/lib/resources/internalLinks";

type ServicePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return serviceDetails.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceDetail(slug);

  if (!service) {
    return {};
  }

  return createPageMetadata({
    title: service.shortTitle,
    description: service.description,
    path: `/dienste/${service.slug}`,
  });
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceDetail(slug);

  if (!service) {
    notFound();
  }

  const resources = await getAllResources();
  const relatedResources = getRelatedResourcesForService(resources, service.slug);

  return (
    <PageShell>
      <section
        className="mx-auto max-w-content px-6 pt-12 pb-14 lg:pt-16"
        aria-labelledby="service-title"
      >
        <Pill tone="sky" dot>
          {service.eyebrow}
        </Pill>
        <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(320px,0.92fr)] lg:items-start">
          <div>
            <Link
              href="/dienste"
              className="font-sans text-sm text-azure-700 underline underline-offset-4"
            >
              Zur Dienste-Übersicht
            </Link>
            <h1
              id="service-title"
              className="mt-5 font-display text-d4 font-normal text-balance text-navy-900 md:text-d3"
            >
              {service.title}
            </h1>
            <p className="mt-6 max-w-2xl font-sans text-md leading-8 text-navy-700">
              {service.heroCopy}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <LinkButton href={inquiryPath} variant="brand">
                Datei oder Briefing senden <span aria-hidden="true">→</span>
              </LinkButton>
              <LinkButton href="/dienste#beispiele" variant="secondary">
                Beispiele ansehen
              </LinkButton>
            </div>
          </div>

          <aside className="rounded-xl bg-navy-800 p-6 text-paper-100 shadow-md">
            <div className="font-brand text-xs uppercase tracking-brand text-navy-200">
              Geeignet für
            </div>
            <ul className="mt-5 space-y-3 font-sans text-sm leading-6 text-navy-100" role="list">
              {service.fit.map((item) => (
                <li key={item} className="flex gap-3">
                  <span aria-hidden="true" className="text-sky-400">
                    ●
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <section
        className="mx-auto max-w-content px-6 pb-14"
        aria-labelledby="examples-title"
      >
        <div className="grid gap-8 lg:grid-cols-[minmax(260px,0.68fr)_minmax(0,1.32fr)]">
          <div>
            <div className="font-brand text-xs uppercase tracking-brand text-ink-500">
              Praxisbeispiele
            </div>
            <h2
              id="examples-title"
              className="mt-3 font-display text-d5 font-normal text-balance text-navy-900"
            >
              Typische Anfragen für diese Leistung.
            </h2>
            <p className="mt-4 font-sans text-base leading-7 text-navy-700">
              Die Beispiele sind bewusst praktisch gehalten: Sie zeigen, mit
              welchen Ausgangslagen Käufer häufig kommen und welche Entscheidung
              vor der Freigabe klar werden muss.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {service.examples.map((example) => (
              <article key={example} className="rounded-xl bg-paper-50 p-5 shadow-md">
                <h3 className="font-display text-lg font-normal text-navy-900">
                  {example}
                </h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        className="mx-auto max-w-content px-6 pb-14"
        aria-labelledby="service-estimator-title"
      >
        <ServicePricingEstimator
          serviceSlug={service.slug}
          serviceTitle={service.shortTitle}
        />
      </section>

      {relatedResources.length ? (
        <section
          className="mx-auto max-w-content px-6 pb-14"
          aria-labelledby="related-resource-title"
        >
          <div className="grid gap-8 lg:grid-cols-[minmax(260px,0.68fr)_minmax(0,1.32fr)]">
            <div>
              <div className="font-brand text-xs uppercase tracking-brand text-ink-500">
                Weiterführende Inhalte
              </div>
              <h2
                id="related-resource-title"
                className="mt-3 font-display text-d5 font-normal text-balance text-navy-900"
              >
                Passende Wissensbeiträge zu dieser Leistung.
              </h2>
              <p className="mt-4 font-sans text-base leading-7 text-navy-700">
                Diese Beiträge vertiefen typische Entscheidungen und helfen bei
                der Vorbereitung von Anfrage und Freigabe.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {relatedResources.map((resource) => (
                <ResourceCard key={resource.slug} resource={resource} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section
        className="mx-auto max-w-content px-6 pb-14"
        aria-labelledby="handoff-title"
      >
        <div className="grid gap-5 md:grid-cols-2">
          <article className="rounded-xl bg-sky-500 p-6 text-navy-900 shadow-md">
            <div className="font-brand text-xs uppercase tracking-brand text-azure-700">
              Benötigt
            </div>
            <h2
              id="handoff-title"
              className="mt-3 font-display text-xl font-normal text-balance"
            >
              Was Sie mitschicken sollten
            </h2>
            <ul className="mt-5 space-y-3 font-sans text-sm leading-6" role="list">
              {service.inputs.map((input) => (
                <li key={input} className="flex gap-3">
                  <span aria-hidden="true">•</span>
                  <span>{input}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-xl bg-paper-50 p-6 text-navy-900 shadow-md">
            <div className="font-brand text-xs uppercase tracking-brand text-ink-500">
              Ergebnis
            </div>
            <h2 className="mt-3 font-display text-xl font-normal text-balance">
              Was Sie zurückbekommen
            </h2>
            <ul className="mt-5 space-y-3 font-sans text-sm leading-6 text-navy-700" role="list">
              {service.outputs.map((output) => (
                <li key={output} className="flex gap-3">
                  <span aria-hidden="true" className="text-azure-600">
                    ●
                  </span>
                  <span>{output}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section
        className="mx-auto max-w-content px-6 pb-24"
        aria-labelledby="process-note-title"
      >
        <div className="rounded-xl bg-clay-500 p-6 text-paper-100 shadow-md md:p-8">
          <div className="font-brand text-xs uppercase tracking-brand text-clay-100">
            Ablauf & Erwartung
          </div>
          <h2
            id="process-note-title"
            className="mt-3 font-display text-d5 font-normal text-balance"
          >
            Klare Einschätzung vor der Freigabe.
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {service.processNotes.map((note) => (
              <article key={note} className="rounded-lg bg-navy-900/90 p-5">
                <p className="font-sans text-sm leading-6 text-clay-100">
                  {note}
                </p>
              </article>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <LinkButton href={inquiryPath} variant="brand">
              Anfrage starten
            </LinkButton>
            <LinkButton href="/faq#anfrage" variant="ghost" className="text-paper-100 hover:bg-paper-100/10">
              Anfrage-FAQ lesen
            </LinkButton>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
