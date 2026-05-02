import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Datenschutz",
  description:
    "Datenschutzhinweise für dekorfabrik.de zu Websiteaufruf, Kontaktanfragen, Dateiuploads, Mailjet und Hosting.",
  path: "/datenschutz",
});

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Datenschutzerklärung"
      intro="Diese Hinweise beschreiben, welche personenbezogenen Daten bei der Nutzung von dekorfabrik.de im aktuellen MVP-Stand verarbeitet werden, zu welchen Zwecken das geschieht und welche Rechte Ihnen zustehen."
      note={
        <>
          <p>
            Diese Datenschutzhinweise sind ein recherchierter
            Implementierungsstand für das MVP und ersetzen keine individuelle
            Rechtsberatung.
          </p>
          <p className="mt-3">
            Vor dem produktiven Einsatz sollten insbesondere Hosting-Region,
            Auftragsverarbeitungsverträge, Drittlandtransfers und die externe
            Schrift-Einbindung noch einmal juristisch geprüft werden.
          </p>
        </>
      }
    >
      <h2>1. Verantwortlicher</h2>
      <p>
        Verantwortlich für die Verarbeitung personenbezogener Daten auf dieser
        Website ist die <strong>strukturunion GmbH</strong>, Schweizer Str. 13,
        60594 Frankfurt am Main, Deutschland.
      </p>
      <p>
        Kontakt für Datenschutz- und Projektanfragen:{" "}
        <a href="mailto:inquiries@dekorfabrik.de">inquiries@dekorfabrik.de</a>
      </p>

      <h2>2. Zwecke und Umfang dieser Hinweise</h2>
      <p>
        Diese Datenschutzerklärung gilt für den Aufruf von dekorfabrik.de sowie
        für die Verarbeitung von Daten, die Sie uns über das Kontakt- und
        Uploadformular oder auf anderem elektronischem Weg übermitteln.
      </p>
      <p>
        Eine gesetzliche oder vertragliche Pflicht zur Bereitstellung Ihrer
        Daten besteht grundsätzlich nicht. Ohne die als erforderlich
        gekennzeichneten Angaben können wir Ihre Anfrage jedoch unter Umständen
        nicht sinnvoll prüfen oder beantworten.
      </p>

      <h2>3. Aufruf der Website und technische Bereitstellung</h2>
      <p>
        Beim Aufruf der Website werden technisch erforderliche Verbindungsdaten
        verarbeitet, damit die Seiten ausgeliefert und die Sicherheit sowie
        Stabilität des Angebots gewährleistet werden können. Dazu können je nach
        Abruf insbesondere IP-Adresse, Datum und Uhrzeit, angeforderte URL,
        Statuscode, Browser- und Geräteinformationen sowie Referrer-Daten
        gehören.
      </p>
      <p>
        Die Website wird laut aktuellem Projektstand mit <strong>Google Cloud
        Run</strong> bereitgestellt. Die Verarbeitung erfolgt auf Grundlage von
        Art. 6 Abs. 1 lit. f DSGVO. Unser berechtigtes Interesse liegt in der
        sicheren und zuverlässigen Bereitstellung des Online-Angebots.
      </p>

      <h2>4. Kontaktformular und Dateiuploads</h2>
      <p>
        Wenn Sie uns über das Formular kontaktieren, verarbeiten wir die von
        Ihnen eingegebenen Angaben zu Name, E-Mail-Adresse, optionaler
        Telefonnummer, Projektbeschreibung, hochgeladenen Dateien sowie den
        dokumentierten Einwilligungs- bzw. Absendezeitpunkt.
      </p>
      <p>Wir verwenden diese Daten, um:</p>
      <ul>
        <li>Ihre Anfrage fachlich zu prüfen und zu beantworten,</li>
        <li>den Projekt- und Angebotsbedarf einzuschätzen,</li>
        <li>Rückfragen zu Dateien, Formaten oder Freigaben zu stellen,</li>
        <li>und im Anschluss eine Zusammenarbeit vorzubereiten oder durchzuführen.</li>
      </ul>
      <p>
        Rechtsgrundlage ist in der Regel Art. 6 Abs. 1 lit. b DSGVO, soweit die
        Verarbeitung für vorvertragliche Maßnahmen oder die Durchführung eines
        Vertrags erforderlich ist. Soweit Sie uns freiwillig zusätzliche Angaben
        oder Dateien übermitteln, die über das Erforderliche hinausgehen, kann
        die Verarbeitung ergänzend auf Art. 6 Abs. 1 lit. a DSGVO beruhen.
      </p>

      <h2>5. Versanddienstleister Mailjet</h2>
      <p>
        Formularanfragen werden serverseitig per API über <strong>Mailjet</strong>
        {" "}an <a href="mailto:inquiries@dekorfabrik.de">inquiries@dekorfabrik.de</a>{" "}
        übermittelt. Dabei können Ihre Kontaktangaben, die Projektbeschreibung
        und die hochgeladenen Dateien an Mailjet weitergegeben werden, damit die
        Nachricht technisch zugestellt werden kann.
      </p>
      <p>
        Nach den aktuell öffentlich verfügbaren Anbieterinformationen betreibt
        Mailjet Rechenzentren innerhalb der EU. Gleichwohl sollten die konkret
        vereinbarten Datenschutz- und Transfermechanismen vor dem Livegang im
        finalen Rechtscheck geprüft werden, insbesondere mit Blick auf
        Konzernstrukturen, Supportzugriffe und mögliche Drittlandbezüge.
      </p>
      <p>
        Rechtsgrundlage für den Versand der Anfrage ist Art. 6 Abs. 1 lit. b
        DSGVO; für die sichere technische Abwicklung und Zustellbarkeit stützen
        wir uns zusätzlich auf Art. 6 Abs. 1 lit. f DSGVO.
      </p>

      <h2>6. Externe Schriftarten</h2>
      <p>
        Im aktuellen MVP-Stand lädt die Website Schriftarten von{" "}
        <strong>Google Fonts</strong> über externe Google-Server. Dabei wird
        bereits beim Seitenaufruf eine Verbindung zu Google aufgebaut. In diesem
        Zusammenhang können insbesondere Ihre IP-Adresse sowie technische
        Browser- und Gerätedaten verarbeitet werden.
      </p>
      <p>
        Wir stützen diese Einbindung derzeit auf Art. 6 Abs. 1 lit. f DSGVO
        wegen unseres Interesses an einer konsistenten typografischen
        Darstellung. Da externe Schriften datenschutzrechtlich sensibel sind,
        ist diese Einbindung vor Produktivbetrieb ausdrücklich noch einmal zu
        prüfen.
      </p>

      <h2>7. Cookies, Local Storage und Tracking</h2>
      <p>
        Nach aktuellem Implementierungsstand setzt dekorfabrik.de keine
        Analyse-, Marketing- oder Retargeting-Tools ein und speichert keine
        nicht erforderlichen Informationen im Browser über eigene Skripte.
      </p>
      <p>
        Einwilligungspflichtige Technologien im Sinne des TDDDG sollen nur dann
        ergänzt werden, wenn dafür vorab eine passende Rechts- und
        Einwilligungslösung eingeführt wurde.
      </p>

      <h2>8. Empfänger und Kategorien von Empfängern</h2>
      <p>Empfänger Ihrer Daten können insbesondere sein:</p>
      <ul>
        <li>die intern mit der Anfragebearbeitung befassten Personen,</li>
        <li>Hosting- und Runtime-Dienstleister für den Websitebetrieb,</li>
        <li>Mailjet als technischer Versanddienstleister für Formularanfragen,</li>
        <li>und gegebenenfalls eingebundene Drittanbieter wie Google Fonts.</li>
      </ul>

      <h2>9. Speicherdauer</h2>
      <p>
        Wir speichern personenbezogene Daten nur so lange, wie sie für die
        genannten Zwecke erforderlich sind. Projekt- und Anfragedaten werden
        regelmäßig daraufhin geprüft, ob sie noch für Kommunikation,
        Angebotsbearbeitung oder die Vertragsabwicklung benötigt werden.
      </p>
      <p>
        Soweit handels- oder steuerrechtliche Aufbewahrungspflichten bestehen,
        kann eine längere Speicherung erforderlich sein. Danach werden die Daten
        gelöscht oder datenschutzgerecht eingeschränkt verarbeitet.
      </p>

      <h2>10. Ihre Rechte</h2>
      <p>Sie haben nach Maßgabe der gesetzlichen Voraussetzungen insbesondere das Recht auf:</p>
      <ul>
        <li>Auskunft über Ihre bei uns gespeicherten Daten,</li>
        <li>Berichtigung unrichtiger Daten,</li>
        <li>Löschung oder Einschränkung der Verarbeitung,</li>
        <li>Widerspruch gegen Verarbeitungen auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO,</li>
        <li>Datenübertragbarkeit, soweit anwendbar,</li>
        <li>und Widerruf einer erteilten Einwilligung mit Wirkung für die Zukunft.</li>
      </ul>

      <h2>11. Beschwerderecht bei der Aufsichtsbehörde</h2>
      <p>
        Sie können sich bei einer Datenschutzaufsichtsbehörde beschweren. Für
        nicht öffentliche Stellen in Hessen ist nach aktuellem Stand zuständig:
      </p>
      <p>
        Der Hessische Beauftragte für Datenschutz und Informationsfreiheit
        <br />
        Wilhelmstraße 7
        <br />
        65185 Wiesbaden
        <br />
        <a href="mailto:poststelle@datenschutz.hessen.de">
          poststelle@datenschutz.hessen.de
        </a>
      </p>

      <h2>12. Keine automatisierte Entscheidungsfindung</h2>
      <p>
        Eine automatisierte Entscheidungsfindung einschließlich Profiling im
        Sinne von Art. 22 DSGVO findet nach aktuellem Implementierungsstand
        nicht statt.
      </p>
    </LegalPage>
  );
}
