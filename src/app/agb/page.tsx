import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "AGB",
  description:
    "Arbeitsstand für allgemeine Geschäftsbedingungen von Dekorfabrik zu Leistungsumfang, Revisionen, Preisorientierung und Freigabeprozess.",
  path: "/agb",
});

export default function TermsPage() {
  return (
    <LegalPage
      title="Allgemeine Geschäftsbedingungen (Entwurf)"
      intro="Die folgenden AGB bilden einen rechtlich zu prüfenden Arbeitsstand für Angebote und Leistungen rund um Vektorisierung, Stickdatei-Digitalisierung, Druckdaten-Check und Datei-Aufbereitung."
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
        Stickdatei-Digitalisierung, Druckdaten-Check, Datei-Aufbereitung und
        sonstige dateibezogene Produktionsvorstufen.
      </p>
      <p>
        Sie richten sich primär an Unternehmen, Agenturen und
        Produktionspartner. Gegenüber Verbraucherinnen und Verbrauchern gelten
        diese Bedingungen nur, soweit ihnen keine zwingenden gesetzlichen
        Schutzvorschriften entgegenstehen.
      </p>

      <h2>2. Leistungsgegenstand und Serviceumfang</h2>
      <p>
        Dekorfabrik erstellt, prüft oder überarbeitet digitale Vorlagen,
        Produktionsdateien und Ausgabeformate auf Basis der vom Kunden
        bereitgestellten Angaben und Ausgangsdaten. Der konkrete Leistungsumfang
        ergibt sich aus dem jeweiligen Angebot, der Freigabegrundlage oder der
        schriftlich bestätigten Abstimmung.
      </p>
      <p>
        Die Leistungen können insbesondere die manuelle Nachzeichnung von Logos
        oder Motiven als Vektordatei, die Digitalisierung von Motiven für
        Stickproduktion, die Prüfung und Korrektur von Druckdaten sowie die
        Aufbereitung vorhandener Dateien für Übergaben an Druck, Stick,
        Beschriftung oder Produktionspartner umfassen.
      </p>
      <p>
        Maßgeblich sind der mitgeteilte Einsatzzweck, das vereinbarte
        Zielformat, der erkennbare Zustand der Ausgangsdaten und die
        Produktionsvorgaben, die der Kunde vor Beginn der Bearbeitung mitteilt.
        Ein bestimmter wirtschaftlicher Erfolg oder eine Verwendungseignung für
        nicht mitgeteilte Produktionsprozesse wird nur geschuldet, wenn dies
        ausdrücklich vereinbart wurde.
      </p>

      <h2>3. Leistungsgrenzen und neue Briefings</h2>
      <p>
        Nicht zum vereinbarten Leistungsumfang gehören ohne ausdrückliche
        Vereinbarung insbesondere neue Motive, inhaltlich veränderte
        Gestaltungen, zusätzliche Formatfamilien, geänderte Produktionsverfahren
        oder Anforderungen, die erst nach Freigabe oder nach Beginn der
        Bearbeitung mitgeteilt werden.
      </p>
      <p>
        Eine Änderung gilt regelmäßig als neues oder erweitertes Briefing, wenn
        nicht nur ein vereinbarter Fehler korrigiert wird, sondern der
        Einsatzzweck, die Vorlage, das Motiv, das Zielmedium, die gewünschte
        Ausgabe oder die Produktionsanforderung wesentlich verändert wird.
      </p>
      <p>
        Dekorfabrik kann solche Erweiterungen gesondert prüfen, zeitlich neu
        einordnen und separat anbieten.
      </p>

      <h2>4. Anfrage, Angebot und Vertragsschluss</h2>
      <p>
        Darstellungen auf der Website sind keine verbindlichen Angebote. Eine
        Anfrage über Kontaktformular oder E-Mail dient zunächst der
        Projektaufnahme.
      </p>
      <p>
        Preisbeispiele, Preisorientierungen, Website-Texte,
        Kalkulator-/Estimator-Ausgaben oder informelle Einschätzungen sind
        unverbindliche Orientierung, solange Dekorfabrik kein konkretes Angebot
        oder keine konkrete Freigabegrundlage bestätigt hat.
      </p>
      <p>
        Ein Vertrag kommt erst zustande, wenn Dekorfabrik ein Angebot oder eine
        Freigabegrundlage übermittelt und dieses Angebot vom Kunden bestätigt
        oder die Leistung nach ausdrücklicher Abstimmung begonnen wird.
      </p>

      <h2>5. Mitwirkungspflichten des Kunden</h2>
      <p>
        Der Kunde ist dafür verantwortlich, dass die bereitgestellten Dateien,
        Informationen, Briefings und Nutzungsrechte für die angefragte
        Bearbeitung verwendet werden dürfen.
      </p>
      <p>Der Kunde stellt insbesondere sicher, dass:</p>
      <ul>
        <li>Ausgangsdaten und Briefing vollständig und zutreffend sind,</li>
        <li>etwaige Rechte Dritter nicht verletzt werden,</li>
        <li>
          Zielmedium, Zielformate, Produktionsvorgaben, Materialhinweise,
          Größen, Farben, Stick-/Druckvorgaben oder Fristen rechtzeitig
          mitgeteilt werden,
        </li>
        <li>
          gelieferte Dateien für die Bearbeitung technisch verwendbar sind oder
          erkennbare Einschränkungen vorab benannt werden,
        </li>
        <li>
          Freigaben, Rückfragen und Korrekturhinweise rechtzeitig erfolgen.
        </li>
      </ul>
      <p>
        Verzögerungen, Mehraufwand oder ungeeignete Ergebnisse, die auf
        unvollständigen, fehlerhaften oder verspäteten Angaben beruhen, können
        eine neue Aufwandseinordnung oder ein ergänzendes Angebot erforderlich
        machen.
      </p>

      <h2>6. Preise, Abrechnung und Zahlung</h2>
      <p>
        Preise richten sich nach Komplexität, Dateizustand, Zielformat,
        Produktionskontext, Bearbeitungsumfang und erforderlichen
        Revisionsschleifen.
      </p>
      <p>
        Jede Preisorientierung vor Prüfung der konkreten Ausgangsdaten ist
        unverbindlich. Verbindlich ist nur der Preis, der im individuellen
        Angebot, in der Freigabekommunikation oder in einer ausdrücklich
        bestätigten Vereinbarung genannt wird.
      </p>
      <p>
        Soweit nichts anderes vereinbart wurde, gelten die im Angebot oder in
        der Freigabekommunikation genannten Preise. Rechnungen sind ohne Abzug
        innerhalb der vereinbarten Frist zahlbar.
      </p>

      <h2>7. Termine, Lieferung und Revisionen</h2>
      <p>
        Liefertermine gelten nur dann als verbindlich, wenn sie ausdrücklich
        schriftlich bestätigt wurden. Bearbeitungszeiten setzen voraus, dass der
        Kunde erforderliche Mitwirkungen, Freigaben und Rückmeldungen rechtzeitig
        erbringt.
      </p>
      <p>
        Korrektur- oder Revisionsschleifen beziehen sich auf den vereinbarten
        Leistungsgegenstand und dienen dazu, Abweichungen vom abgestimmten
        Briefing, technische Umsetzungsfehler oder angemessene Feinabstimmungen
        innerhalb des bestätigten Ziels zu korrigieren.
      </p>
      <p>
        Neue Motive, geänderte Inhalte, zusätzliche Formate, andere
        Produktionsverfahren, geänderte Materialvorgaben, neue Farb- oder
        Größenanforderungen sowie Änderungen nach finaler Freigabe sind keine
        bloßen Revisionen, sondern können als neuer oder zusätzlicher Auftrag
        angeboten und berechnet werden.
      </p>
      <p>
        Eine feste Anzahl eingeschlossener Revisionsschleifen gilt nur, wenn sie
        im Angebot oder in der Freigabegrundlage ausdrücklich genannt wurde.
      </p>

      <h2>8. Lieferung, Nutzungsrechte und Arbeitsergebnisse</h2>
      <p>
        Nutzungsrechte an Arbeitsergebnissen gehen, soweit nicht anders
        vereinbart, erst nach vollständiger Zahlung in dem Umfang auf den Kunden
        über, der für den vereinbarten Einsatzzweck erforderlich ist.
      </p>
      <p>
        Dekorfabrik liefert die vereinbarten digitalen Ausgabeformate. Offene
        oder editierbare Arbeitsdateien, Zwischenstände, native
        Produktions-Setups, maschinen- oder herstellerspezifische Garantien,
        physische Produktion, Druck, Stick, Bemusterung oder Versand sind nur
        geschuldet, wenn dies ausdrücklich vereinbart wurde.
      </p>
      <p>
        Sofern eine Datei für ein bestimmtes Produktionsverfahren erstellt wird,
        beruht die Bearbeitung auf den mitgeteilten Spezifikationen. Eine
        Garantie für die Verarbeitung durch bestimmte Maschinen, Materialien,
        Lieferanten oder Produktionsumgebungen besteht nur bei ausdrücklicher
        Vereinbarung.
      </p>

      <h2>9. Gewährleistung und Haftung</h2>
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

      <h2>10. Verbraucherhinweise und Widerruf</h2>
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

      <h2>11. Schlussbestimmungen</h2>
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
