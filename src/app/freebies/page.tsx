import type { Metadata } from "next";
import { ContentEngagementTracker } from "@/components/analytics/ContentEngagementTracker";
import { ContentTrackedLinkButton } from "@/components/analytics/ContentTrackedLinkButton";
import { PageShell } from "@/components/sections/PageShell";
import { Pill } from "@/components/ui/Pill";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Freebies",
  description:
    "Kompakte Orientierungshilfen, Checklisten und nächste Schritte für Dateien vor Druck, Stick und Vektorisierung.",
  path: "/freebies",
});

const articleSlug = "freebies";
const articleCategory = "resource-center";

const freebieCards = [
  {
    title: "Datei-Checkliste vor der Anfrage",
    body:
      "Welche Ausgangsdaten, Zielmedien und Hinweise die Einordnung beschleunigen.",
    serviceSlug: "datei-aufbereitung",
  },
  {
    title: "Format-Merkhilfe für Druck und Stick",
    body:
      "Ein schneller Überblick, wann Vektor, PDF oder Stickdatei wirklich gebraucht wird.",
    serviceSlug: "vektorisierung",
  },
  {
    title: "Freigabe-Fragen für Produktionspartner",
    body:
      "Welche Punkte vor finaler Auslieferung sauber abgestimmt sein sollten.",
    serviceSlug: "druckdaten-check",
  },
] as const;

export default function FreebiesPage() {
  return (
    <PageShell>
      <section
        className="mx-auto max-w-content px-6 pt-12 pb-24 lg:pt-16"
        aria-labelledby="freebies-title"
      >
        <ContentEngagementTracker
          articleSlug={articleSlug}
          articleCategory={articleCategory}
          articleTitle="Freebies"
        />

        <Pill tone="sky" dot>
          Orientierung · Freebies
        </Pill>
        <h1
          id="freebies-title"
          className="mt-6 max-w-3xl font-display text-d4 font-normal text-balance text-navy-900 md:text-d3"
        >
          Kleine Hilfen für die erste Einordnung Ihrer Produktionsdaten.
        </h1>
        <p className="mt-6 max-w-2xl font-sans text-md text-navy-700">
          Dieser Bereich sammelt kompakte Einstiegshilfen für Anfragen, Dateivorbereitung
          und Freigaben. Für den MVP ist er bewusst schlank gehalten und dient
          vor allem als nützlicher nächster Schritt nach einer Anfrage.
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {freebieCards.map((card, index) => {
            const destinationPath = `/dienste/${card.serviceSlug}`;
            const href = `${destinationPath}?article=${articleSlug}&category=${articleCategory}&cta=freebies-service-link&service=${card.serviceSlug}`;

            return (
              <article
                key={card.title}
                className={[
                  "rounded-xl p-6 shadow-md",
                  index === 1 ? "bg-sky-500 text-navy-900" : "bg-paper-50 text-navy-900",
                ].join(" ")}
              >
                <h2 className="font-display text-xl font-normal text-balance">
                  {card.title}
                </h2>
                <p className="mt-4 font-sans text-sm leading-6 text-current/80">
                  {card.body}
                </p>
                <div className="mt-5">
                  <ContentTrackedLinkButton
                    href={href}
                    destinationPath={destinationPath}
                    variant="ghost"
                    size="sm"
                    eventName="service_link_click"
                    articleSlug={articleSlug}
                    articleCategory={articleCategory}
                    ctaVariant="freebies-service-link"
                    targetServiceSlug={card.serviceSlug}
                  >
                    Passenden Service öffnen →
                  </ContentTrackedLinkButton>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <ContentTrackedLinkButton
            href={`/kontakt?article=${articleSlug}&category=${articleCategory}&cta=freebies-primary-contact`}
            destinationPath="/kontakt"
            variant="brand"
            eventName="article_cta_click"
            articleSlug={articleSlug}
            articleCategory={articleCategory}
            ctaVariant="freebies-primary-contact"
          >
            Neue Anfrage starten
          </ContentTrackedLinkButton>
          <ContentTrackedLinkButton
            href={`/faq?article=${articleSlug}&category=${articleCategory}&cta=freebies-secondary-faq`}
            destinationPath="/faq"
            variant="secondary"
            eventName="article_cta_click"
            articleSlug={articleSlug}
            articleCategory={articleCategory}
            ctaVariant="freebies-secondary-faq"
          >
            FAQ lesen
          </ContentTrackedLinkButton>
        </div>
      </section>
    </PageShell>
  );
}
