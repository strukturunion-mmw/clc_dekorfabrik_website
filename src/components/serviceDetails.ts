export type ServiceDetail = {
  slug: string;
  anchorId: string;
  eyebrow: string;
  title: string;
  shortTitle: string;
  description: string;
  heroCopy: string;
  fit: string[];
  examples: string[];
  inputs: string[];
  outputs: string[];
  processNotes: string[];
};

export const serviceDetails = [
  {
    slug: "vektorisierung",
    anchorId: "vektorisierung",
    eyebrow: "Kernleistung 01",
    title: "Vektorisierung von Logos, Grafiken und Vorlagen",
    shortTitle: "Vektorisierung",
    description:
      "Manuelle Vektorisierung für Logos, Grafiken und Vorlagen, die sauber skaliert und produktionstauglich weitergegeben werden sollen.",
    heroCopy:
      "Wenn ein Logo nur noch als verpixeltes Bild, Screenshot oder unsaubere PDF vorliegt, bauen wir es als klare Vektordatei neu auf. Ziel ist keine automatische Spurensuche, sondern eine Datei, die Druck, Beschriftung, Stickvorstufe oder Agentur-Weitergabe verlässlich unterstützt.",
    fit: [
      "bestehende Logos ohne offene Originaldatei",
      "Pixelgrafiken, Screenshots oder alte Vorlagen",
      "Motive für Druck, Plot, Folie, Textil oder Weiterverarbeitung",
    ],
    examples: [
      "Firmenlogo aus niedrig aufgelöster PNG-Datei nachzeichnen",
      "Vereinsgrafik für Druck und Beschriftung skalierbar machen",
      "Konturen und Kurven für saubere Plot- oder Produktionsdaten aufbauen",
    ],
    inputs: [
      "beste verfügbare Ausgangsdatei, auch wenn sie unscharf ist",
      "kurzer Hinweis zum späteren Einsatz",
      "gewünschte Zielformate, falls bereits bekannt",
    ],
    outputs: [
      "saubere Vektordateien, z. B. SVG, PDF oder EPS",
      "nachvollziehbar aufgebaute Formen statt Autotrace-Artefakten",
      "Hinweis, wenn eine Vorlage fachlich nicht sinnvoll rekonstruierbar ist",
    ],
    processNotes: [
      "Wir prüfen Motivdetails, Kanten und Zielmedium vor der Freigabe.",
      "Der Aufwand steigt mit Detailgrad, schlechter Vorlage und nötiger manueller Rekonstruktion.",
      "Revisionen beziehen sich auf vereinbarte Korrekturen am bestätigten Motiv, nicht auf ein komplett neues Briefing.",
    ],
  },
  {
    slug: "stickdatei-digitalisierung",
    anchorId: "stickdateien",
    eyebrow: "Kernleistung 02",
    title: "Stickdatei-Digitalisierung für maschinenlesbare Produktion",
    shortTitle: "Stickdatei-Digitalisierung",
    description:
      "Stickdatei-Erstellung mit Blick auf Motiv, Material, Platzierung und lesbare Produktionsergebnisse.",
    heroCopy:
      "Eine gute Stickdatei ist mehr als eine Grafik in ein Maschinenformat zu speichern. Wir übersetzen Motive in Stichlogik, reduzieren problematische Details und achten darauf, dass Platzierung, Garnwirkung und Lesbarkeit zusammenpassen.",
    fit: [
      "Logos und Motive für Brust, Rücken, Kragen oder ähnliche Platzierungen",
      "Vorlagen, die für Stick erst vereinfacht werden müssen",
      "wiederholbare Produktion statt Zufallsergebnis aus automatischer Konvertierung",
    ],
    examples: [
      "Firmenlogo für klassische Brustplatzierung digitalisieren",
      "kleines Kragenmotiv mit reduzierter Detailtiefe anlegen",
      "größeres Rückenmotiv mit sinnvoller Stichrichtung vorbereiten",
    ],
    inputs: [
      "Motivdatei in bestmöglicher Qualität",
      "geplante Platzierung und ungefähre Größe",
      "Material- oder Produktionshinweise, wenn vorhanden",
    ],
    outputs: [
      "maschinenlesbare Stickdatei nach abgestimmtem Zielkontext",
      "reduzierte Motivlogik für bessere Lesbarkeit im Garn",
      "Hinweise zu Grenzen, wenn Details zu fein oder ungeeignet sind",
    ],
    processNotes: [
      "Wir bewerten, welche Details im Stick sinnvoll erhalten bleiben.",
      "Die Datei wird auf die geplante Platzierung und Motivgröße ausgerichtet.",
      "Korrekturen werden vor finaler Übergabe abgestimmt; neue Platzierungen oder stark veränderte Motive sind neuer Umfang.",
    ],
  },
  {
    slug: "druckdaten-check",
    anchorId: "druckdaten",
    eyebrow: "Kernleistung 03",
    title: "Druckdaten-Check und druckfertige Aufbereitung",
    shortTitle: "Druckdaten-Check",
    description:
      "Prüfung und Aufbereitung vorhandener Druckdaten für verlässlichere Übergaben an Produktionsteams.",
    heroCopy:
      "Vor dem Druck entscheidet oft die Dateiqualität: Beschnitt, Farbmodus, Auflösung, Ränder und Exportlogik müssen zum Produktionsziel passen. Wir prüfen vorhandene Daten und bringen sie dort in Ordnung, wo es fachlich sinnvoll möglich ist.",
    fit: [
      "PDFs, Layouts oder Bilddateien vor Druckfreigabe",
      "Dateien mit unsicherer Auflösung, falschem Format oder fehlendem Beschnitt",
      "Übergaben an Druckereien, Produktionspartner oder interne Freigaben",
    ],
    examples: [
      "PDF mit fehlendem Beschnitt für die Übergabe vorbereiten",
      "Bildauflösung und Formatlogik vor dem Druckeinsatz einschätzen",
      "Farbflächen, Ränder und Exportvarianten für Produktion sortieren",
    ],
    inputs: [
      "aktuelle Druckdatei oder Layout-Export",
      "Angaben zu Endformat, Beschnitt und Produktionsart",
      "Druckerei- oder Lieferantenvorgaben, falls vorhanden",
    ],
    outputs: [
      "korrigierte oder kommentierte Übergabedatei",
      "klare Rückmeldung zu nicht lösbaren Dateiqualitätsproblemen",
      "zielführende Hinweise für Freigabe oder erneuten Export",
    ],
    processNotes: [
      "Wir prüfen die Datei gegen den konkreten Einsatz, nicht gegen abstrakte Musterwerte.",
      "Wenn Ausgangsdaten fachlich nicht tragfähig sind, sagen wir das klar statt scheinbar druckfertige Dateien zu liefern.",
      "Die Bearbeitung ersetzt keine Produktionsgarantie des jeweiligen Lieferanten.",
    ],
  },
  {
    slug: "datei-aufbereitung",
    anchorId: "dateiservice",
    eyebrow: "Kernleistung 04",
    title: "Datei-Aufbereitung für Übergaben an Druck und Produktion",
    shortTitle: "Datei-Aufbereitung",
    description:
      "Bereinigung, Strukturierung und Exportlogik für vorhandene Entwürfe, Fremddateien und Produktionsübergaben.",
    heroCopy:
      "Viele Produktionsprobleme entstehen nicht aus dem Motiv selbst, sondern aus Dateichaos: Zwischenstände, unklare Exporte, fehlende Benennung oder ungeeignete Formate. Wir ordnen vorhandene Daten und bereiten sie so auf, dass die nächste Station weiß, welche Datei wofür gedacht ist.",
    fit: [
      "Entwürfe aus Fremdprogrammen, KI-Tools oder alten Projektständen",
      "unsortierte Dateipakete vor der Weitergabe",
      "Produktionsübergaben, bei denen Format, Benennung oder Exportlogik fehlen",
    ],
    examples: [
      "KI-generierte Logoidee für druckfähige Weitergabe bereinigen",
      "mehrere Entwurfsstände in klare Übergabedateien sortieren",
      "Exportvarianten für Druck, Web oder Produktion nachvollziehbar benennen",
    ],
    inputs: [
      "alle vorhandenen Projektdateien oder Exporte",
      "kurzer Einsatzkontext und gewünschtes Ziel",
      "Vorgaben der empfangenden Produktion, falls vorhanden",
    ],
    outputs: [
      "sortierte und benannte Übergabedateien",
      "bereinigte Exporte für den vereinbarten Zweck",
      "Einordnung, ob zusätzlich Vektorisierung, Druckdaten-Check oder Stickdatei-Erstellung nötig ist",
    ],
    processNotes: [
      "Wir trennen brauchbare Ausgangsdaten von unsicheren Zwischenständen.",
      "Der Umfang hängt stark davon ab, wie vollständig und konsistent die angelieferten Daten sind.",
      "Offene Arbeitsdateien oder herstellerspezifische Garantien sind nur Teil der Leistung, wenn sie ausdrücklich vereinbart wurden.",
    ],
  },
] satisfies ServiceDetail[];

export function getServiceDetail(slug: string) {
  return serviceDetails.find((service) => service.slug === slug);
}
