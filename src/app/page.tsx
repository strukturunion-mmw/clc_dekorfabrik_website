import { Pill } from "@/components/ui/Pill";
import { LinkButton } from "@/components/ui/Button";
import { CardCream } from "@/components/ui/CardCream";
import { CardFeatureNavy } from "@/components/ui/CardFeatureNavy";
import { CtaPanel, type CtaStep } from "@/components/sections/CtaPanel";
import { PageShell } from "@/components/sections/PageShell";
import { inquiryPath } from "@/components/siteContent";

const marqueeItems = [
  "Handgezogene Vektorisierung",
  "Stickdateien für Tajima, Wilcom und Barudan",
  "Druckfertige PDF, SVG, EPS und AI",
  "From Frankfurt with ♥︎",
  "Freigabe vor Lieferung",
  "Datei-Check für Unternehmen und Agenturen",
];

const ctaSteps: CtaStep[] = [
  { n: "01", title: "Grundlagen abklären", status: "done" },
  { n: "02", title: "Datei hochladen", status: "open" },
  { n: "03", title: "Format & Farbraum wählen", status: "upcoming" },
  { n: "04", title: "Freigabe & Versand", status: "upcoming" },
];

export default function HomePage() {
  return (
    <PageShell marqueeItems={marqueeItems}>
      {/* Hero — shares max-w-content (1120px) with every other section so
          nav / marquee / hero / grid / footer all align on the same column. */}
      <section
        className="mx-auto grid max-w-content items-start gap-10 px-6 pt-10 pb-20 lg:grid-cols-2 lg:pt-12 lg:pb-24"
        aria-labelledby="hero-title"
      >
        <div>
          <Pill tone="sky" dot>
            From Frankfurt with ♥︎
          </Pill>

          <h1
            id="hero-title"
            className="mt-6 font-display text-d4 font-normal text-balance text-navy-900 md:text-d3 lg:text-d2"
          >
            Vektordateien, Stickdateien und Druckdaten{" "}
            <em className="italic">sauber vorbereitet.</em>
          </h1>

          <p className="mt-6 max-w-xl font-sans text-md text-navy-700">
            Dekorfabrik bereitet Logos, Skizzen und Layouts manuell für Druck,
            Stick und Weiterverarbeitung auf. Für Unternehmen, Agenturen und
            Produktionspartner in Deutschland, Österreich und der Schweiz.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <LinkButton variant="brand" href={inquiryPath}>
              Datei senden & Angebot anfragen <span aria-hidden="true">→</span>
            </LinkButton>
            <LinkButton variant="secondary" href="#leistungen">
              Services & Ablauf ansehen
            </LinkButton>
          </div>

          <dl className="mt-12 grid max-w-lg grid-cols-1 gap-5 font-sans sm:grid-cols-3 sm:gap-6">
            <div>
              <dt className="font-brand text-xs uppercase tracking-brand text-ink-500">
                Qualität
              </dt>
              <dd className="mt-1 font-display text-xl text-navy-900">
                Handarbeit
              </dd>
            </div>
            <div>
              <dt className="font-brand text-xs uppercase tracking-brand text-ink-500">
                Formate
              </dt>
              <dd className="mt-1 font-display text-xl text-navy-900">
                SVG · PDF · DST
              </dd>
            </div>
            <div>
              <dt className="font-brand text-xs uppercase tracking-brand text-ink-500">
                Ablauf
              </dt>
              <dd className="mt-1 font-display text-xl text-navy-900">
                Prüfung & Freigabe
              </dd>
            </div>
          </dl>
        </div>

        <CardFeatureNavy
          eyebrow="Datei-Check · Manuell statt Auto-Trace"
          href="#leistungen"
          metric="FFM"
          metricLabel={
            <>
              From
              <br />
              Frankfurt
              <br />
              with ♥︎
            </>
          }
          image={{
            src: "/home-production-studio.png",
            alt: "Arbeitsplatz mit Vektorkurven, Druckmustern und Stickgarnen fuer die Dateivorbereitung",
          }}
          papers={[
            {
              tone: "cream",
              label: "Ausgangsdatei · PNG/JPG/PDF",
              quote:
                "„Pixelig, unsauber skaliert oder nicht stick- und druckfähig.“",
            },
            {
              tone: "sky",
              label: "Lieferdatei · SVG/PDF/DST",
              quote:
                "„Saubere Pfade, passende Formate und klare Freigabe vor Versand.“",
            },
          ]}
          ariaLabel="Zu Leistungen und Ablauf für handgeprüfte Produktionsdateien"
        />
      </section>

      {/* Service cards — alternating cream / navy / sky / clay rhythm */}
      <section
        className="mx-auto max-w-content px-6 pb-24"
        aria-labelledby="leistungen-title"
        id="leistungen"
      >
        <div className="flex items-end justify-between gap-6">
          <div>
            <div className="font-brand text-xs uppercase tracking-brand text-ink-500">
              Leistungen & Ablauf
            </div>
            <h2
              id="leistungen-title"
              className="mt-2 font-display text-d4 font-normal text-balance text-navy-900"
            >
              Aus Rohdaten werden belastbare{" "}
              <em className="italic">Produktionsdateien.</em>
            </h2>
          </div>
          <LinkButton
            href={inquiryPath}
            variant="ghost"
            size="sm"
            className="hidden md:inline-flex"
          >
            Anfrage starten →
          </LinkButton>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <CardCream
            eyebrow="Vektorisierung"
            title={
              <>
                Logos und Skizzen als saubere{" "}
                <em className="italic">Vektordatei.</em>
              </>
            }
            body="Wir zeichnen Konturen, Kurven und Flächen nachvollziehbar nach, damit Ihr Motiv skalierbar bleibt und in Produktion, Plot oder Druck sauber funktioniert."
            meta="SVG · EPS · AI · PDF"
            href="/dienste#vektorisierung"
          />

          <article
            className="relative flex h-full flex-col rounded-lg bg-navy-800 p-6 text-paper-100 shadow-md"
            style={{ minHeight: 280 }}
          >
            <div className="font-brand text-xs uppercase tracking-brand text-navy-200">
              Stickdatei-Digitalisierung
            </div>
            <h3 className="mt-3 mb-2 font-display text-xl font-normal tracking-tight text-balance text-paper-100">
              Vom Logo zur maschinenlesbaren{" "}
              <em className="italic">Stickdatei.</em>
            </h3>
            <p className="mb-5 font-sans text-sm text-navy-200">
              Stichrichtung, Unterlage, Dichte und Format werden auf Maschine,
              Garn und Motiv abgestimmt, statt nur automatisch konvertiert.
            </p>
            <div className="mt-auto flex items-center justify-between pt-4 font-sans text-xs text-navy-200">
              <span>DST · PES · EXP · Produktionsklar</span>
              <a
                href="/dienste#stickdateien"
                aria-label="Mehr zur Stickdatei-Digitalisierung"
                className="inline-flex items-center justify-center rounded-full text-paper-100 no-underline focus:outline-none focus-visible:outline-2 focus-visible:outline-paper-100 focus-visible:outline-offset-2"
                style={{
                  width: 34,
                  height: 34,
                  background: "rgba(247, 243, 234, 0.1)",
                  borderWidth: 1,
                  borderStyle: "solid",
                  borderColor: "rgba(247, 243, 234, 0.22)",
                }}
              >
                <svg
                  width={14}
                  height={14}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.8}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path d="M7 17L17 7" />
                  <path d="M8 7h9v9" />
                </svg>
              </a>
            </div>
          </article>

          <CardCream
            eyebrow="Druckdaten"
            title={
              <>
                Dateien für Druckereien und Partner{" "}
                <em className="italic">vorbereiten.</em>
              </>
            }
            body="Wir prüfen Auflösung, Beschnitt, Farbraum und Exportformat, damit Ihre Datei nicht erst in der Produktion auffällt."
            meta="CMYK · Beschnitt · PDF"
            href="/dienste#druckdaten"
          />

          <article
            className="relative flex h-full flex-col rounded-lg bg-sky-500 p-6 text-navy-900 shadow-md"
            style={{ minHeight: 280 }}
          >
            <div className="font-brand text-xs uppercase tracking-brand text-navy-900/70">
              Ablauf
            </div>
            <h3 className="mt-3 mb-2 font-display text-xl font-normal tracking-tight text-balance text-navy-900">
              Erst prüfen, dann umsetzen und{" "}
              <em className="italic">freigeben.</em>
            </h3>
            <p className="mb-5 font-sans text-sm text-navy-900/80">
              Sie senden Datei und Zielmedium. Wir klären Machbarkeit, Format
              und Aufwand, setzen manuell um und liefern erst nach sauberer
              Abstimmung.
            </p>
            <div className="mt-auto flex items-center justify-between pt-4 font-sans text-xs text-navy-900/70">
              <span>Upload · Check · Freigabe · Lieferung</span>
              <a
                href="/dienste#ablauf"
                aria-label="Mehr zum Ablauf von Prüfung und Freigabe"
                className="inline-flex items-center justify-center rounded-full text-navy-900 no-underline focus:outline-none focus-visible:outline-2 focus-visible:outline-clay-500 focus-visible:outline-offset-2"
                style={{
                  width: 34,
                  height: 34,
                  borderWidth: 1,
                  borderStyle: "solid",
                  borderColor: "var(--border-strong)",
                }}
              >
                <svg
                  width={14}
                  height={14}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.8}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path d="M7 17L17 7" />
                  <path d="M8 7h9v9" />
                </svg>
              </a>
            </div>
          </article>

          <CardCream
            eyebrow="Für wen"
            title={
              <>
                Für Betriebe, Agenturen und{" "}
                <em className="italic">Produktionspartner.</em>
              </>
            }
            body="Ob einmaliger Logo-Rettungsauftrag oder wiederkehrende Reinzeichnung: Dekorfabrik arbeitet — From Frankfurt with ♥︎ — für Teams, die verlässliche Dateien brauchen."
            meta="B2B · From Frankfurt with ♥︎"
            href="/faq#anfrage"
          />

          <article
            className="relative flex h-full flex-col rounded-lg bg-lilac-200 p-6 text-navy-900 shadow-md"
            style={{ minHeight: 280 }}
          >
            <div className="font-brand text-xs uppercase tracking-brand text-ink-500">
              Qualitätssicherung
            </div>
            <h3 className="mt-3 mb-2 font-display text-xl font-normal tracking-tight text-balance text-navy-900">
              Formate, Pfade und Details werden{" "}
              <em className="italic">geprüft.</em>
            </h3>
            <p className="mb-5 font-sans text-sm text-navy-700">
              Jede Rückgabe enthält die passenden Produktionsformate und eine
              klare Einordnung, wofür die Dateien freigegeben sind.
            </p>
            <div className="mt-auto flex items-center justify-between pt-4 font-mono text-xs text-ink-500">
              <span>svg · pdf · eps · dst</span>
              <a
                href={inquiryPath}
                aria-label="Datei-Check bei Dekorfabrik anfragen"
                className="inline-flex items-center justify-center rounded-full text-navy-900 no-underline focus:outline-none focus-visible:outline-2 focus-visible:outline-clay-500 focus-visible:outline-offset-2"
                style={{
                  width: 34,
                  height: 34,
                  borderWidth: 1,
                  borderStyle: "solid",
                  borderColor: "var(--border-strong)",
                }}
              >
                <svg
                  width={14}
                  height={14}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.8}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path d="M7 17L17 7" />
                  <path d="M8 7h9v9" />
                </svg>
              </a>
            </div>
          </article>
        </div>

        <div className="mt-8 flex md:hidden">
          <LinkButton href={inquiryPath} variant="ghost" size="sm">
            Anfrage starten →
          </LinkButton>
        </div>
      </section>

      {/* Clay CTA panel — the one warm moment */}
      <section className="mx-auto max-w-content px-6 pb-24">
        <CtaPanel
          eyebrow="Anfrage · Datei-Check"
          title={
            <>
              Senden Sie Ihre <em className="italic">Datei.</em> Wir klären
              Format, Aufwand und nächsten Schritt.
            </>
          }
          body={
            <>
              Strukturierter Ablauf, echte Handarbeit und klare Freigabe.
              Beschreiben Sie kurz Zielmedium, Formatwunsch und Termin; wir
              melden uns mit der passenden Umsetzung.
            </>
          }
          steps={ctaSteps}
          action={{ label: "Datei senden & Angebot anfragen", href: inquiryPath }}
        />
      </section>
    </PageShell>
  );
}
