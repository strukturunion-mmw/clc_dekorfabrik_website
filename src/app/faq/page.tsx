import type { Metadata } from "next";
import { PageShell } from "@/components/sections/PageShell";
import { LinkButton } from "@/components/ui/Button";
import { Pill } from "@/components/ui/Pill";
import { inquiryPath } from "@/components/siteContent";

const faqGroups = [
  {
    id: "dateiformate",
    title: "Dateiformate & Ausgangsdaten",
    items: [
      {
        question: "Welche Dateien kann ich für eine Anfrage schicken?",
        answer:
          "Am hilfreichsten sind vorhandene PDFs, PNGs, JPGs, offene Layout-Dateien oder bereits exportierte Vektoren. Wenn nur ein Screenshot oder Foto existiert, prüfen wir trotzdem, welche manuelle Nachzeichnung sinnvoll ist.",
      },
      {
        question: "Muss ich schon wissen, ob ich Vektorisierung oder Stickdatei brauche?",
        answer:
          "Nein. Beschreiben Sie kurz den Einsatzzweck. Wir ordnen ein, ob eine Vektordatei, eine Stickdatei oder eine druckfertige Aufbereitung die richtige Leistung ist.",
      },
      {
        question: "Bekomme ich die Ausgabe in mehreren Formaten?",
        answer:
          "Wenn der Einsatzkontext es verlangt, planen wir passende Zielformate ein. Welche Formate sinnvoll sind, hängt von Druck, Beschriftung, Stick oder Weitergabe an Partner ab.",
      },
    ],
  },
  {
    id: "preise",
    title: "Preise & Angebotslogik",
    items: [
      {
        question: "Warum gibt es keinen festen Universalpreis?",
        answer:
          "Der Aufwand unterscheidet sich stark nach Motiv, Detailgrad, Dateiquelle und Produktionsziel. Eine faire Preisorientierung funktioniert deshalb besser nach Prüfung der Datei als über pauschale Fantasieversprechen.",
      },
      {
        question: "Wie erhalte ich ein Angebot?",
        answer:
          "Sie schicken Datei, Einsatzkontext und Deadline. Danach klären wir Aufwand, sinnvolle Leistung und gegebenenfalls Revisionen, bevor Sie eine Freigabe erteilen.",
      },
      {
        question: "Sind Revisionen möglich?",
        answer:
          "Ja, sinnvolle Korrekturschleifen sind im Ablauf eingeplant. Wir stimmen aber vorher ab, ob es um Feinschliff oder um eine inhaltlich neue Aufgabenstellung geht.",
      },
    ],
  },
  {
    id: "anfrage",
    title: "Ablauf, Timing & Anfrage",
    items: [
      {
        question: "Wie schnell bekomme ich eine Rückmeldung?",
        answer:
          "Für den MVP kommunizieren wir eine schnelle manuelle Prüfung statt automatischer Sofortpreise. Bei Standardfällen ist eine erste Einordnung in der Regel zeitnah möglich; bei knappen Deadlines sollten Sie diese direkt dazuschreiben.",
      },
      {
        question: "Wie läuft die Zusammenarbeit nach der Anfrage ab?",
        answer:
          "Nach Ihrer Nachricht prüfen wir Datei und Zielmedium, klären Aufwand und Preisorientierung und starten erst nach Freigabe mit der Ausarbeitung. Danach folgen bei Bedarf Revisionen und die finale Auslieferung.",
      },
      {
        question: "Wie frage ich am besten mit Datei und kurzer Beschreibung an?",
        answer:
          "Am saubersten ist jetzt das Kontakt- und Upload-Formular. Dort können Sie Datei, Zielmedium, kurze Beschreibung und DSGVO-Einwilligung direkt in einem Schritt übermitteln.",
      },
    ],
  },
];

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Antworten zu Dateiformaten, Preislogik, Ablauf, Revisionen und Anfragewegen für die Dekorfabrik-MVP-Leistungen.",
};

export default function FaqPage() {
  return (
    <PageShell>
      <section
        className="mx-auto max-w-content px-6 pt-12 pb-16 lg:pt-16"
        aria-labelledby="faq-title"
      >
        <Pill tone="sky" dot>
          MVP · FAQ
        </Pill>
        <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div>
            <h1
              id="faq-title"
              className="font-display text-d4 font-normal text-balance text-navy-900 md:text-d3"
            >
              Antworten auf typische Fragen vor der ersten Anfrage.
            </h1>
            <p className="mt-6 max-w-2xl font-sans text-md text-navy-700">
              Dieses FAQ beantwortet die häufigsten Punkte zu Formaten,
              Preislogik, Bearbeitung, Revisionen und dem aktuellen
              Anfrageweg. So können Sie schneller einordnen, was Sie von
              Dekorfabrik für Ihr Projekt brauchen.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <LinkButton href="/dienste" variant="secondary">
                Leistungen ansehen
              </LinkButton>
              <LinkButton href={inquiryPath} variant="brand">
                Anfrage senden <span aria-hidden="true">→</span>
              </LinkButton>
            </div>
          </div>

          <aside className="rounded-xl bg-paper-50 p-6 shadow-md">
            <div className="font-brand text-xs uppercase tracking-brand text-ink-500">
              Kurz gesagt
            </div>
            <ul className="mt-4 space-y-3 font-sans text-sm text-navy-700" role="list">
              <li>Sie müssen die richtige Leistung nicht vorab perfekt benennen.</li>
              <li>Preis und Timing richten sich nach Datei, Ziel und Aufwand.</li>
              <li>Revisionen und Freigaben werden im Ablauf berücksichtigt.</li>
              <li>Das Kontaktformular bündelt Datei, Anfrage und DSGVO-Einwilligung.</li>
            </ul>
          </aside>
        </div>
      </section>

      <section
        className="mx-auto max-w-content px-6 pb-24"
        aria-labelledby="faq-groups"
      >
        <h2
          id="faq-groups"
          className="sr-only"
        >
          FAQ-Bereiche
        </h2>
        <div className="grid gap-6">
          {faqGroups.map((group) => (
            <section
              key={group.id}
              id={group.id}
              className="rounded-xl bg-paper-50 p-6 shadow-md"
              aria-labelledby={`${group.id}-title`}
            >
              <div className="font-brand text-xs uppercase tracking-brand text-ink-500">
                FAQ-Bereich
              </div>
              <h3
                id={`${group.id}-title`}
                className="mt-3 font-display text-xl font-normal text-balance text-navy-900"
              >
                {group.title}
              </h3>
              <div className="mt-6 grid gap-3">
                {group.items.map((item, index) => (
                  <details
                    key={item.question}
                    className="rounded-lg border border-ink-200/70 bg-paper-100 px-5 py-4"
                    open={index === 0}
                  >
                    <summary className="cursor-pointer list-none pr-8 font-sans text-sm font-medium text-navy-900 marker:content-none">
                      {item.question}
                    </summary>
                    <p className="mt-3 font-sans text-sm leading-6 text-navy-700">
                      {item.answer}
                    </p>
                  </details>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
