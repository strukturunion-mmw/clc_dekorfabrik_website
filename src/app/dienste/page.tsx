import type { Metadata } from "next";
import { PageShell } from "@/components/sections/PageShell";
import { LinkButton } from "@/components/ui/Button";
import { Pill } from "@/components/ui/Pill";
import { inquiryMailto } from "@/components/siteContent";

const services = [
  {
    id: "vektorisierung",
    eyebrow: "Kernleistung 01",
    title: "Vektorisierung von Logos, Grafiken und Vorlagen",
    body:
      "Wir bauen unsaubere Pixelgrafiken sauber als skalierbare Vektordatei neu auf. Geeignet für Druck, Beschriftung, Textilproduktion und Agentur-Weitergabe.",
    bullets: [
      "Saubere Pfade statt Autotrace-Artefakte",
      "Geeignet für Druck, Plot, Stickvorstufe und Weiterverarbeitung",
      "Ausgabe z. B. als SVG, PDF oder EPS nach Einsatzkontext",
    ],
  },
  {
    id: "stickdateien",
    eyebrow: "Kernleistung 02",
    title: "Stickdatei-Digitalisierung für maschinenlesbare Produktion",
    body:
      "Wir übersetzen Ihr Motiv in eine nachvollziehbare Stickdatei mit sinnvoller Stichrichtung, Unterlage und Reduktion von Problemstellen.",
    bullets: [
      "Abstimmung auf Motiv, Material und Produktionsziel",
      "Revisionen vor finaler Freigabe eingeplant",
      "Geeignet für wiederholbare Produktion statt Zufallsergebnis",
    ],
  },
  {
    id: "druckdaten",
    eyebrow: "Kernleistung 03",
    title: "Druckdaten-Check und druckfertige Aufbereitung",
    body:
      "Wir prüfen Beschnitt, Farbmodus, Auflösung und Formatlogik und bringen bestehende Dateien in einen Zustand, den Produktionsteams sauber weiterverarbeiten können.",
    bullets: [
      "Prüfung von CMYK-/Sonderfarb-Anlage und Format",
      "Klare Hinweise, wenn Ausgangsdaten ungeeignet sind",
      "Aufbereitung für Freigabe, Druck oder Weitergabe an Partner",
    ],
  },
  {
    id: "dateiservice",
    eyebrow: "Kernleistung 04",
    title: "Datei-Aufbereitung für Übergaben an Druck und Produktion",
    body:
      "Wenn bereits Entwürfe oder Zwischenstände vorhanden sind, helfen wir bei Formatbereinigung, Exportlogik und sauberer Übergabe an die nächste Produktionsstufe.",
    bullets: [
      "Unterstützung bei angelieferten Fremd- oder AI-Dateien",
      "Klare Einordnung, welche Leistung tatsächlich gebraucht wird",
      "DACH-kompatible Abstimmung auf Deutsch statt Tool-Rätselraten",
    ],
  },
];

const processSteps = [
  {
    n: "01",
    title: "Datei oder Anfrage senden",
    body:
      "Sie schicken Ihr Motiv, Ihren Anwendungsfall und, wenn vorhanden, vorhandene Vorlagen oder Zielvorgaben.",
  },
  {
    n: "02",
    title: "Machbarkeit und Aufwand klären",
    body:
      "Wir prüfen Dateiqualität, Zielmedium, Formatbedarf und den realen Bearbeitungsaufwand statt pauschaler Schablonenpreise.",
  },
  {
    n: "03",
    title: "Angebot und Produktionsfreigabe",
    body:
      "Sie erhalten eine Preisorientierung bzw. ein konkretes Angebot. Nach Freigabe beginnt die manuelle Ausarbeitung.",
  },
  {
    n: "04",
    title: "Revision und finale Auslieferung",
    body:
      "Vor der finalen Übergabe werden nötige Korrekturen abgestimmt, danach liefern wir die passenden Zielformate aus.",
  },
];

const priceFactors = [
  "Komplexität des Motivs, Zahl der Details und notwendige Nachzeichnung",
  "Gewünschtes Zielformat und Produktionskontext, z. B. Druck oder Stick",
  "Qualität der gelieferten Ausgangsdatei und nötige Vorarbeit",
  "Zeitkritik, Schleifen für Freigabe und notwendige Revisionen",
];

export const metadata: Metadata = {
  title: "Dienste",
  description:
    "Überblick über Vektorisierung, Stickdatei-Digitalisierung, Druckdaten-Check und den Dekorfabrik-Ablauf von Anfrage bis Auslieferung.",
};

export default function ServicesPage() {
  return (
    <PageShell>
      <section
        className="mx-auto max-w-content px-6 pt-12 pb-16 lg:pt-16"
        aria-labelledby="services-title"
      >
        <Pill tone="sky" dot>
          MVP · Dienste & Ablauf
        </Pill>
        <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)] lg:items-start">
          <div>
            <h1
              id="services-title"
              className="font-display text-d4 font-normal text-balance text-navy-900 md:text-d3"
            >
              Leistungen für saubere Dateien, klare Produktion und schnelle
              Freigaben.
            </h1>
            <p className="mt-6 max-w-2xl font-sans text-md text-navy-700">
              Dekorfabrik unterstützt Unternehmen, Agenturen und
              Produktionspartner im DACH-Raum bei manueller Vektorisierung,
              Stickdatei-Digitalisierung und druckfertiger Datenaufbereitung.
              Sie sehen hier, welche Leistungen es gibt, wie die Zusammenarbeit
              abläuft und wovon Preis und Bearbeitungszeit abhängen.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <LinkButton href={inquiryMailto} variant="brand">
                Anfrage senden <span aria-hidden="true">→</span>
              </LinkButton>
              <LinkButton href="/faq" variant="secondary">
                FAQ lesen
              </LinkButton>
            </div>
          </div>

          <aside className="rounded-xl bg-navy-800 p-6 text-paper-100 shadow-md">
            <div className="font-brand text-xs uppercase tracking-brand text-navy-200">
              Orientierung vor der Anfrage
            </div>
            <h2 className="mt-3 font-display text-xl font-normal text-balance">
              Was Sie vorab einschätzen können
            </h2>
            <ul className="mt-6 space-y-3 font-sans text-sm text-navy-200" role="list">
              <li>Welche Leistung zu Ihrem Ausgangsmaterial passt</li>
              <li>Wie der Ablauf von Datei bis Auslieferung aussieht</li>
              <li>Warum Preise vom realen Aufwand statt von Fantasiepauschalen abhängen</li>
              <li>Welche Fragen vor der Anfrage meist schon geklärt werden können</li>
            </ul>
          </aside>
        </div>
      </section>

      <section
        className="mx-auto max-w-content px-6 pb-16"
        aria-labelledby="services-overview"
      >
        <div className="flex items-end justify-between gap-6">
          <div>
            <div className="font-brand text-xs uppercase tracking-brand text-ink-500">
              Dienste
            </div>
            <h2
              id="services-overview"
              className="mt-2 font-display text-d5 font-normal text-balance text-navy-900"
            >
              Vier Leistungen für den MVP-Start.
            </h2>
          </div>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {services.map((service, index) => (
            <article
              key={service.id}
              id={service.id}
              className={[
                "rounded-xl p-6 shadow-md",
                index % 2 === 0
                  ? "bg-paper-50 text-navy-900"
                  : "bg-sky-500 text-navy-900",
              ].join(" ")}
            >
              <div className="font-brand text-xs uppercase tracking-brand text-ink-500">
                {service.eyebrow}
              </div>
              <h3 className="mt-3 font-display text-xl font-normal text-balance">
                {service.title}
              </h3>
              <p className="mt-4 font-sans text-sm leading-6 text-current/80">
                {service.body}
              </p>
              <ul className="mt-6 space-y-2 font-sans text-sm text-current/85" role="list">
                {service.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3">
                    <span aria-hidden="true">•</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section
        id="ablauf"
        className="mx-auto max-w-content px-6 pb-16"
        aria-labelledby="process-title"
      >
        <div className="rounded-xl bg-clay-500 p-6 text-paper-100 shadow-md md:p-8">
          <div className="font-brand text-xs uppercase tracking-brand text-clay-100">
            Ablauf
          </div>
          <h2
            id="process-title"
            className="mt-3 font-display text-d5 font-normal text-balance"
          >
            Von der Anfrage bis zur finalen Datei.
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {processSteps.map((step) => (
              <article
                key={step.n}
                className="rounded-lg bg-navy-900/90 p-5 shadow-sm"
              >
                <div className="font-mono text-xs text-clay-100">{step.n}</div>
                <h3 className="mt-2 font-display text-xl font-normal">
                  {step.title}
                </h3>
                <p className="mt-3 font-sans text-sm leading-6 text-clay-100">
                  {step.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="preise"
        className="mx-auto max-w-content px-6 pb-24"
        aria-labelledby="pricing-title"
      >
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(320px,1.1fr)]">
          <div>
            <div className="font-brand text-xs uppercase tracking-brand text-ink-500">
              Preisorientierung
            </div>
            <h2
              id="pricing-title"
              className="mt-3 font-display text-d5 font-normal text-balance text-navy-900"
            >
              Preise folgen Aufwand, nicht Wunschdenken.
            </h2>
            <p className="mt-4 font-sans text-base text-navy-700">
              Dekorfabrik bietet bewusst keine pauschale Allzweck-Tabelle und
              keinen Schein-Kalkulator. Der Preis richtet sich danach, wie
              komplex das Motiv ist, wie sauber die Ausgangsdatei vorliegt und
              welches Ergebnis Sie am Ende wirklich brauchen.
            </p>
            <p className="mt-4 font-sans text-base text-navy-700">
              Für einfache Motive ist die Einordnung schneller. Bei komplexen
              Logos, Stickvorlagen oder problematischen Vorlagen klären wir den
              realen Umfang vor der Freigabe transparent mit Ihnen.
            </p>
          </div>

          <div className="rounded-xl bg-paper-50 p-6 shadow-md">
            <h3 className="font-display text-xl font-normal text-navy-900">
              Diese Faktoren bestimmen den Aufwand
            </h3>
            <ul className="mt-5 space-y-3 font-sans text-sm text-navy-700" role="list">
              {priceFactors.map((factor) => (
                <li key={factor} className="flex gap-3">
                  <span aria-hidden="true" className="text-azure-600">
                    ●
                  </span>
                  <span>{factor}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 rounded-lg bg-sky-100 p-4">
              <p className="font-sans text-sm text-navy-800">
                Wenn Sie unsicher sind, welche Leistung passt, schicken Sie die
                Datei mit Einsatzkontext. Wir sagen Ihnen lieber ehrlich, was
                sinnvoll ist, als eine unpassende Standardleistung zu verkaufen.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <LinkButton href={inquiryMailto} variant="brand">
                Datei oder Briefing senden
              </LinkButton>
              <LinkButton href="/faq#preise" variant="ghost">
                Preisfragen im FAQ →
              </LinkButton>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
