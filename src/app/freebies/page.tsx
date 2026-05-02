import type { Metadata } from "next";
import { PageShell } from "@/components/sections/PageShell";
import { LinkButton } from "@/components/ui/Button";
import { Pill } from "@/components/ui/Pill";

export const metadata: Metadata = {
  title: "Freebies",
  description:
    "Kompakte Orientierungshilfen, Checklisten und nächste Schritte für Dateien vor Druck, Stick und Vektorisierung.",
};

const freebieCards = [
  {
    title: "Datei-Checkliste vor der Anfrage",
    body:
      "Welche Ausgangsdaten, Zielmedien und Hinweise die Einordnung beschleunigen.",
  },
  {
    title: "Format-Merkhilfe für Druck und Stick",
    body:
      "Ein schneller Überblick, wann Vektor, PDF oder Stickdatei wirklich gebraucht wird.",
  },
  {
    title: "Freigabe-Fragen für Produktionspartner",
    body:
      "Welche Punkte vor finaler Auslieferung sauber abgestimmt sein sollten.",
  },
];

export default function FreebiesPage() {
  return (
    <PageShell>
      <section
        className="mx-auto max-w-content px-6 pt-12 pb-24 lg:pt-16"
        aria-labelledby="freebies-title"
      >
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
          {freebieCards.map((card, index) => (
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
            </article>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <LinkButton href="/kontakt" variant="brand">
            Neue Anfrage starten
          </LinkButton>
          <LinkButton href="/faq" variant="secondary">
            FAQ lesen
          </LinkButton>
        </div>
      </section>
    </PageShell>
  );
}
