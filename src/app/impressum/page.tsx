import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Impressum",
  description:
    "Anbieterkennzeichnung von dekorfabrik.de mit Betreiber-, Register- und Kontaktangaben.",
  path: "/impressum",
});

export default function ImpressumPage() {
  return (
    <LegalPage
      title="Impressum"
      intro="Hier finden Sie die Anbieterkennzeichnung für dekorfabrik.de nach dem aktuell vorgesehenen MVP-Stand."
      note={
        <p>
          Dieses Impressum wurde aus den aktuell vorliegenden Betreiberdaten
          aufgebaut. Nicht gelieferte Pflichtangaben sollten vor dem
          Produktivbetrieb im Rechtscheck ausdrücklich bestätigt oder ergänzt
          werden.
        </p>
      }
    >
      <h2>Anbieter</h2>
      <p>
        dekorfabrik.de wird betrieben von der <strong>strukturunion GmbH</strong>.
      </p>
      <address className="not-italic font-sans text-sm leading-6 text-navy-700">
        Schweizer Str. 13
        <br />
        60594 Frankfurt am Main
        <br />
        Deutschland
      </address>

      <h2>Vertretungsberechtigte Person</h2>
      <p>Geschäftsführer: Manuel Weisbender</p>

      <h2>Registereintrag</h2>
      <p>
        Handelsregister: Amtsgericht Frankfurt am Main
        <br />
        Registernummer: HRB 100158
      </p>

      <h2>Kontakt</h2>
      <p>
        E-Mail: <a href="mailto:inquiries@dekorfabrik.de">inquiries@dekorfabrik.de</a>
      </p>

      <h2>Hinweis zu weiteren Pflichtangaben</h2>
      <p>
        Angaben wie eine Umsatzsteuer-Identifikationsnummer, besondere
        berufsrechtliche Aufsichtsangaben oder weitere regulatorische Hinweise
        werden hier nur ergänzt, wenn sie für den tatsächlichen Betrieb von
        dekorfabrik.de einschlägig sind und verifiziert vorliegen.
      </p>
    </LegalPage>
  );
}
