import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "AGB",
  description:
    "Arbeitsstand für allgemeine Geschäftsbedingungen von Dekorfabrik zu Leistungsumfang, Angebotsprozess, Rechten und Haftung.",
  path: "/agb",
});

export default function TermsPage() {
  return (
    <LegalPage
      title="Allgemeine Geschäftsbedingungen (Entwurf)"
      intro="Die folgenden AGB bilden einen MVP-Arbeitsstand für Angebote und Leistungen rund um Vektorisierung, Stickdatei-Digitalisierung und druckfertige Datenaufbereitung."
      note={
        <>
          <p>
            Dieser Text ist ein initialer Implementierungsentwurf und muss vor
            einem verbindlichen Produktiveinsatz rechtlich geprüft werden.
          </p>
          <p className="mt-3">
            Für Verbraucherinnen und Verbraucher sowie für zwingende gesetzliche
            Rechte gilt stets das anwendbare Recht vorrangig vor diesem Entwurf.
          </p>
        </>
      }
    >
      <h2>1. Geltungsbereich</h2>
      <p>
        Diese AGB gelten für Leistungen der strukturunion GmbH im Zusammenhang
        mit dekorfabrik.de, insbesondere für Vektorisierung,
        Stickdatei-Digitalisierung, Druckdaten-Prüfung und sonstige
        dateibezogene Produktionsvorstufen.
      </p>
      <p>
        Sie richten sich primär an Unternehmen, Agenturen und
        Produktionspartner. Gegenüber Verbraucherinnen und Verbrauchern gelten
        diese Bedingungen nur, soweit ihnen keine zwingenden gesetzlichen
        Schutzvorschriften entgegenstehen.
      </p>

      <h2>2. Leistungsgegenstand</h2>
      <p>
        Dekorfabrik erstellt, prüft oder überarbeitet digitale Vorlagen und
        Produktionsdateien auf Basis der vom Kunden bereitgestellten Angaben und
        Ausgangsdaten.
      </p>
      <p>
        Ein bestimmter wirtschaftlicher Erfolg oder eine Verwendungseignung für
        nicht mitgeteilte Produktionsprozesse wird nur geschuldet, wenn dies
        ausdrücklich vereinbart wurde.
      </p>

      <h2>3. Anfrage, Angebot und Vertragsschluss</h2>
      <p>
        Darstellungen auf der Website sind keine verbindlichen Angebote. Eine
        Anfrage über Kontaktformular oder E-Mail dient zunächst der
        Projektaufnahme.
      </p>
      <p>
        Ein Vertrag kommt erst zustande, wenn Dekorfabrik ein Angebot oder eine
        Freigabegrundlage übermittelt und dieses Angebot vom Kunden bestätigt
        oder die Leistung nach ausdrücklicher Abstimmung begonnen wird.
      </p>

      <h2>4. Mitwirkungspflichten des Kunden</h2>
      <p>Der Kunde ist dafür verantwortlich, dass die bereitgestellten Dateien, Informationen und Nutzungsrechte für die angefragte Bearbeitung verwendet werden dürfen.</p>
      <p>Der Kunde stellt insbesondere sicher, dass:</p>
      <ul>
        <li>Ausgangsdaten und Briefing vollständig und zutreffend sind,</li>
        <li>etwaige Rechte Dritter nicht verletzt werden,</li>
        <li>und Produktionsvorgaben, Formate oder Fristen rechtzeitig mitgeteilt werden.</li>
      </ul>

      <h2>5. Preise, Abrechnung und Zahlung</h2>
      <p>
        Preise richten sich nach Komplexität, Dateizustand, Zielformat,
        Produktionskontext, Bearbeitungsumfang und erforderlichen
        Revisionsschleifen.
      </p>
      <p>
        Soweit nichts anderes vereinbart wurde, gelten die im Angebot oder in
        der Freigabekommunikation genannten Preise. Rechnungen sind ohne Abzug
        innerhalb der vereinbarten Frist zahlbar.
      </p>

      <h2>6. Termine, Lieferung und Revisionen</h2>
      <p>
        Liefertermine gelten nur dann als verbindlich, wenn sie ausdrücklich
        schriftlich bestätigt wurden. Bearbeitungszeiten setzen voraus, dass der
        Kunde erforderliche Mitwirkungen, Freigaben und Rückmeldungen rechtzeitig
        erbringt.
      </p>
      <p>
        Korrektur- oder Revisionsschleifen umfassen nur den vereinbarten
        Leistungsgegenstand. Erweiterungen des Briefings oder zusätzliche
        Leistungswünsche können gesondert berechnet werden.
      </p>

      <h2>7. Nutzungsrechte und Arbeitsergebnisse</h2>
      <p>
        Nutzungsrechte an Arbeitsergebnissen gehen, soweit nicht anders
        vereinbart, erst nach vollständiger Zahlung in dem Umfang auf den Kunden
        über, der für den vereinbarten Einsatzzweck erforderlich ist.
      </p>
      <p>
        Offene Arbeitsdateien, editierbare Zwischenstände oder produktionstechnische
        Setups sind nur geschuldet, wenn dies ausdrücklich vereinbart wurde.
      </p>

      <h2>8. Gewährleistung und Haftung</h2>
      <p>
        Offensichtliche Mängel sind nach Erhalt der Leistung zeitnah mitzuteilen,
        damit eine Prüfung und angemessene Nachbesserung möglich ist.
      </p>
      <p>
        Dekorfabrik haftet unbeschränkt bei Vorsatz, grober Fahrlässigkeit sowie
        bei Schäden aus der Verletzung von Leben, Körper oder Gesundheit. Im
        Übrigen ist die Haftung bei leichter Fahrlässigkeit auf die Verletzung
        wesentlicher Vertragspflichten und auf den vertragstypisch vorhersehbaren
        Schaden begrenzt.
      </p>

      <h2>9. Verbraucherhinweise und Widerruf</h2>
      <p>
        Soweit Verträge mit Verbraucherinnen oder Verbrauchern geschlossen
        werden, gelten die gesetzlichen Informations- und Widerrufsrechte.
      </p>
      <p>
        Bei individuell angefertigten oder eindeutig auf Kundenvorgaben
        zugeschnittenen Leistungen kann ein Widerrufsrecht ganz oder teilweise
        ausgeschlossen sein oder vorzeitig erlöschen, soweit die gesetzlichen
        Voraussetzungen dafür vorliegen. Die konkrete Verbraucherinformation
        sollte vor Livegang gesondert geprüft und gegebenenfalls ergänzt werden.
      </p>

      <h2>10. Schlussbestimmungen</h2>
      <p>
        Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des
        UN-Kaufrechts, soweit dem keine zwingenden Verbraucherschutzvorschriften
        entgegenstehen.
      </p>
      <p>
        Ist der Kunde Kaufmann, juristische Person des öffentlichen Rechts oder
        öffentlich-rechtliches Sondervermögen, ist Frankfurt am Main der
        Gerichtsstand für alle Streitigkeiten aus der Geschäftsbeziehung, soweit
        gesetzlich zulässig.
      </p>
    </LegalPage>
  );
}
