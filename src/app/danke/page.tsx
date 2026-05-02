import type { Metadata } from "next";
import { PageShell } from "@/components/sections/PageShell";
import { LinkButton } from "@/components/ui/Button";
import { Pill } from "@/components/ui/Pill";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Danke",
  description:
    "Bestätigung nach dem Absenden einer Dekorfabrik-Anfrage mit direkten Wegen zu Services, FAQ und Freebies.",
  path: "/danke",
  index: false,
  follow: false,
});

export default function ThankYouPage() {
  return (
    <PageShell>
      <section
        className="mx-auto max-w-content px-6 py-16"
        aria-labelledby="thanks-title"
      >
        <div className="mx-auto max-w-3xl rounded-xl bg-paper-50 p-8 shadow-md md:p-10">
          <Pill tone="sky" dot>
            Anfrage erhalten
          </Pill>
          <h1
            id="thanks-title"
            className="mt-6 font-display text-d4 font-normal text-balance text-navy-900"
          >
            Danke. Ihre Anfrage ist bei uns eingegangen.
          </h1>
          <p className="mt-6 font-sans text-md text-navy-700">
            Wir prüfen Datei, Einsatzkontext und Umfang manuell und melden uns
            über den passenden Rückkanal. Bis dahin können Sie sich direkt
            weiter orientieren oder einen der nächsten hilfreichen Bereiche
            öffnen.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <LinkButton href="/freebies" variant="brand">
              Freebies ansehen
            </LinkButton>
            <LinkButton href="/dienste" variant="secondary">
              Leistungen prüfen
            </LinkButton>
            <LinkButton href="/faq" variant="secondary">
              FAQ öffnen
            </LinkButton>
            <LinkButton href="/" variant="ghost">
              Zur Startseite
            </LinkButton>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
