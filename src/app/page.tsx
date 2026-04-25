import { Pill } from "@/components/ui/Pill";
import { Nav, type NavLink } from "@/components/ui/Nav";
import { LinkButton } from "@/components/ui/Button";
import { CardCream } from "@/components/ui/CardCream";
import { CardFeatureNavy } from "@/components/ui/CardFeatureNavy";
import { CtaPanel, type CtaStep } from "@/components/sections/CtaPanel";
import { Marquee } from "@/components/sections/Marquee";
import { Footer } from "@/components/sections/Footer";
import { SiteHeader } from "@/components/sections/SiteHeader";

const navLinks: NavLink[] = [
  { href: "/journal", label: "Journal", active: true },
  { href: "/dienste", label: "Dienste" },
  { href: "/freebies", label: "Freebies" },
  { href: "/faq", label: "FAQ" },
];

const marqueeItems = [
  "Ausgabe 042 · 15. Apr 2026",
  "Handgezogene Vektorisierung",
  "Stickdatei-Digitalisierung",
  "Druckfertige Dateien in 24h",
  "Studio Leipzig · DACH-weit",
  "April-Kurs offen",
];

const ctaSteps: CtaStep[] = [
  { n: "01", title: "Grundlagen abklären", status: "done" },
  { n: "02", title: "Datei hochladen", status: "open" },
  { n: "03", title: "Format & Farbraum wählen", status: "upcoming" },
  { n: "04", title: "Freigabe & Versand", status: "upcoming" },
];

const footerGroups = [
  {
    heading: "Dienste",
    links: [
      { href: "/dienste/vektorisierung", label: "Vektorisierung" },
      { href: "/dienste/stickdatei", label: "Stickdatei" },
      { href: "/dienste/upscaling", label: "AI-Upscaling" },
      { href: "/dienste/druckdaten", label: "Druckdaten-Check" },
    ],
  },
  {
    heading: "Studio",
    links: [
      { href: "/journal", label: "Journal" },
      { href: "/freebies", label: "Freebies" },
      { href: "/referenzen", label: "Referenzen" },
      { href: "/kontakt", label: "Kontakt" },
    ],
  },
  {
    heading: "Rechtliches",
    links: [
      { href: "/impressum", label: "Impressum" },
      { href: "/datenschutz", label: "Datenschutz" },
      { href: "/agb", label: "AGB" },
    ],
  },
];

export default function HomePage() {
  return (
    <>
      <a
        href="#hauptinhalt"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-pill focus:bg-navy-900 focus:px-4 focus:py-2 focus:text-paper-100"
      >
        Zum Inhalt springen
      </a>

      <SiteHeader>
        <Nav links={navLinks} />
        <Marquee items={marqueeItems} />
      </SiteHeader>

      <main id="hauptinhalt">
        {/* Hero — shares max-w-content (1120px) with every other section so
            nav / marquee / hero / grid / footer all align on the same column. */}
        <section
          className="mx-auto grid max-w-content items-start gap-10 px-6 pt-16 pb-24 lg:grid-cols-2"
          aria-labelledby="hero-title"
        >
          <div>
            <Pill tone="sky" dot>
              Ausgabe 042 · April 2026
            </Pill>

            <h1
              id="hero-title"
              className="mt-6 font-display text-d4 font-normal text-balance text-navy-900 md:text-d3 lg:text-d2"
            >
              Aus einer Skizze wird eine saubere{" "}
              <em className="italic">Vektordatei.</em>
            </h1>

            <p className="mt-6 max-w-xl font-sans text-md text-navy-700">
              Wir vektorisieren, digitalisieren und druckfertigen Ihre Dateien
              von Hand — in der Regel innerhalb von 24 Stunden. Studio in
              Leipzig, Kunden in ganz DACH.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <LinkButton variant="brand" href="/upload">
                Datei hochladen <span aria-hidden="true">→</span>
              </LinkButton>
              <LinkButton variant="secondary" href="/referenzen">
                Beispiele ansehen
              </LinkButton>
            </div>

            <dl className="mt-12 grid max-w-lg grid-cols-3 gap-6 font-sans">
              <div>
                <dt className="font-brand text-xs uppercase tracking-brand text-ink-500">
                  Lieferzeit
                </dt>
                <dd className="mt-1 font-display text-xl text-navy-900">24 h</dd>
              </div>
              <div>
                <dt className="font-brand text-xs uppercase tracking-brand text-ink-500">
                  Kunden 2026
                </dt>
                <dd className="mt-1 font-display text-xl text-navy-900">412</dd>
              </div>
              <div>
                <dt className="font-brand text-xs uppercase tracking-brand text-ink-500">
                  Ab
                </dt>
                <dd className="mt-1 font-display text-xl text-navy-900">
                  29,00 €
                </dd>
              </div>
            </dl>
          </div>

          <CardFeatureNavy
            eyebrow="Featured · No. 042 / Story craft"
            href="/journal/vektorisierung-statt-autotrace"
            metric="24h"
            metricLabel={
              <>
                Lieferzeit
                <br />
                Standard-Auftrag
              </>
            }
            papers={[
              {
                tone: "cream",
                label: "Original · 300 dpi",
                quote:
                  "„Raster-PNG, unsauber skaliert — nicht druckfähig.“",
              },
              {
                tone: "sky",
                label: "Vektor · SVG",
                quote:
                  "„Handgezogene Kurven. Skaliert auf jede Plakatgröße.“",
              },
            ]}
            ariaLabel="Zum Feature-Artikel: handgezogene Vektorisierung statt Auto-Trace"
          />
        </section>

        {/* Cards grid — alternating cream / navy / sky / clay rhythm */}
        <section
          className="mx-auto max-w-content px-6 pb-24"
          aria-labelledby="journal-title"
        >
          <div className="flex items-end justify-between gap-6">
            <div>
              <div className="font-brand text-xs uppercase tracking-brand text-ink-500">
                Journal · Ausgabe 042
              </div>
              <h2
                id="journal-title"
                className="mt-2 font-display text-d4 font-normal text-balance text-navy-900"
              >
                Was wir für Sie <em className="italic">machen.</em>
              </h2>
            </div>
            <LinkButton
              href="/journal"
              variant="ghost"
              size="sm"
              className="hidden md:inline-flex"
            >
              Alle Beiträge →
            </LinkButton>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <CardCream
              eyebrow="AI für Designer · 12. Apr 2026"
              title={
                <>
                  Warum Ihre AI-Logos selten{" "}
                  <em className="italic">druckfertig</em> sind.
                </>
              }
              body="Raster-Export, falsche Farben, fehlende Pfade. Ein Überblick, was AI-Generatoren (noch) nicht können — und wie wir Ihre Datei trotzdem rettungsfähig machen."
              meta="5 min · Leitfaden"
              href="/journal/ai-logos-druckfertig"
            />

            <article
              className="relative flex h-full flex-col rounded-lg bg-navy-800 p-6 text-paper-100 shadow-md"
              style={{ minHeight: 280 }}
            >
              <div className="font-brand text-xs uppercase tracking-brand text-navy-200">
                Stickdatei · 08. Apr 2026
              </div>
              <h3 className="mt-3 mb-2 font-display text-xl font-normal tracking-tight text-balance text-paper-100">
                Logo zur maschinenlesbaren{" "}
                <em className="italic">Stickdatei.</em>
              </h3>
              <p className="mb-5 font-sans text-sm text-navy-200">
                Pfad-Reduktion, Stichrichtung, Unterleggrad — wir digitalisieren
                Ihr Zeichen direkt für Tajima, Wilcom und Barudan.
              </p>
              <div className="mt-auto flex items-center justify-between pt-4 font-sans text-xs text-navy-200">
                <span>8 min · Tutorial</span>
                <a
                  href="/journal/stickdatei-digitalisieren"
                  aria-label="Artikel lesen: Logo zur maschinenlesbaren Stickdatei"
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
              eyebrow="Druckdaten · 01. Apr 2026"
              title={
                <>
                  CMYK, Beschnitt und{" "}
                  <em className="italic">Überdrucken.</em>
                </>
              }
              body="Die drei Details, die aus einer sauberen Datei eine wirklich druckfähige Datei machen. Checkliste inklusive."
              meta="6 min · Leitfaden"
              href="/journal/druckdaten-checkliste"
            />

            <article
              className="relative flex h-full flex-col rounded-lg bg-sky-500 p-6 text-navy-900 shadow-md"
              style={{ minHeight: 280 }}
            >
              <div className="font-brand text-xs uppercase tracking-brand text-navy-900/70">
                Figma · 29. Mär 2026
              </div>
              <h3 className="mt-3 mb-2 font-display text-xl font-normal tracking-tight text-balance text-navy-900">
                Was sind Figma <em className="italic">Slots?</em>
              </h3>
              <p className="mb-5 font-sans text-sm text-navy-900/80">
                Wiederverwendbare Komponenten-Platzhalter. Klingt banal, spart
                im Alltag ganze Stunden — ein kompakter Einstieg.
              </p>
              <div className="mt-auto flex items-center justify-between pt-4 font-sans text-xs text-navy-900/70">
                <span>4 min · Tutorial</span>
                <a
                  href="/journal/figma-slots"
                  aria-label="Artikel lesen: Was sind Figma Slots"
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
              eyebrow="Freebie · 20. Mär 2026"
              title={
                <>
                  Kostenlose Vorlagen für Ihr{" "}
                  <em className="italic">nächstes</em> Projekt.
                </>
              }
              body="Raster, Gitter, Papierformate — kuratierte Starter-Dateien für InDesign, Affinity und Figma."
              meta="3 min · Freebie"
              href="/freebies"
            />

            <article
              className="relative flex h-full flex-col rounded-lg bg-lilac-200 p-6 text-navy-900 shadow-md"
              style={{ minHeight: 280 }}
            >
              <div className="font-brand text-xs uppercase tracking-brand text-ink-500">
                System · 15. Mär 2026
              </div>
              <h3 className="mt-3 mb-2 font-display text-xl font-normal tracking-tight text-balance text-navy-900">
                Die Dekorfabrik-<em className="italic">Spezifikation.</em>
              </h3>
              <p className="mb-5 font-sans text-sm text-navy-700">
                Wie wir Dateien entgegennehmen, prüfen und zurückliefern —
                Protokoll, Formate, Prüfsummen.
              </p>
              <div className="mt-auto flex items-center justify-between pt-4 font-mono text-xs text-ink-500">
                <span>df-spec · v1.0</span>
                <a
                  href="/system/spezifikation"
                  aria-label="Artikel lesen: Die Dekorfabrik-Spezifikation"
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
            <LinkButton href="/journal" variant="ghost" size="sm">
              Alle Beiträge →
            </LinkButton>
          </div>
        </section>

        {/* Clay CTA panel — the one warm moment */}
        <section className="mx-auto max-w-content px-6 pb-24">
          <CtaPanel
            eyebrow="April-Kurs · offen"
            title={
              <>
                Werden Sie <em className="italic">Kunde.</em> Von der ersten
                Datei bis zur fertigen Lieferung.
              </>
            }
            body={
              <>
                Strukturierter Ablauf, echte Handarbeit, klare Preise. Kein
                Abonnement, keine Wartezeit.{" "}
                <strong className="font-medium text-paper-100">
                  412 Kunden
                </strong>{" "}
                haben 2026 bereits geliefert.
              </>
            }
            steps={ctaSteps}
            action={{ label: "Auftrag freigeben", href: "/auftrag" }}
          />
        </section>
      </main>

      <Footer
        tagline="Designstudio aus Leipzig. Vektorisierung, Stickdateien und druckfertige Dateien — handgezogen, nicht auto-traced."
        groups={footerGroups}
      />
    </>
  );
}
