import type { NavLink } from "./ui/Nav";

export const inquiryEmail = "inquiries@dekorfabrik.de";
export const inquiryPath = "/kontakt";
export const inquiryMailto =
  `mailto:${inquiryEmail}?subject=Anfrage%20an%20Dekorfabrik`;

export const siteNavLinks: NavLink[] = [
  { href: "/", label: "Start" },
  { href: "/dienste", label: "Dienste" },
  { href: "/faq", label: "FAQ" },
  { href: inquiryPath, label: "Kontakt" },
];

export const siteMarqueeItems = [
  "Handgezogene Vektorisierung",
  "Stickdatei-Digitalisierung",
  "Druckdaten-Check",
  "DACH-weit in deutscher Abstimmung",
  "Klare Angebotslogik statt Abo",
  "Antworten zu Formaten, Preisen und Ablauf",
];

export const siteFooterGroups = [
  {
    heading: "Dienste",
    links: [
      { href: "/dienste#vektorisierung", label: "Vektorisierung" },
      { href: "/dienste#stickdateien", label: "Stickdateien" },
      { href: "/dienste#druckdaten", label: "Druckdaten-Check" },
      { href: "/dienste#dateiservice", label: "Datei-Aufbereitung" },
      { href: "/dienste#beispiele", label: "Vorher / Nachher" },
    ],
  },
  {
    heading: "Ablauf",
    links: [
      { href: inquiryPath, label: "Kontakt & Upload" },
      { href: "/dienste#ablauf", label: "So arbeiten wir" },
      { href: "/dienste#preise", label: "Preislogik" },
      { href: "/faq#dateiformate", label: "Dateiformate" },
      { href: "/faq#anfrage", label: "Anfrage & Freigabe" },
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

export const siteTagline =
  "Dekorfabrik macht Vektorisierung, Stickdateien und druckfertige Daten für Unternehmen, Agenturen und Produktionspartner im DACH-Raum.";
