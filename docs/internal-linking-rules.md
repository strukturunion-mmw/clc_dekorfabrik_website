# Internal Linking Rules

Diese Regeln definieren, wie interne Verlinkung zwischen Wissensbeiträgen und Service-Seiten im Dekorfabrik-Frontend umgesetzt wird.

## Ziel

Interne Links sollen Orientierung und Conversion-Fokus unterstützen, ohne den Hauptinhalt zu überladen.

## Platzierung

- **Artikelseiten (`/wissen/[slug]`)**: ein eigener Block **„Passende Leistungen“** unterhalb des Fließtexts, vor dem Haupt-CTA.
- **Service-Seiten (`/dienste/[slug]`)**: ein eigener Block **„Weiterführende Inhalte“** vor dem Bereich „Was Sie mitschicken sollten“.

## Maximaldichte (Link Density)

- Pro Artikel maximal **3 Service-Links**.
- Pro Service-Seite maximal **3 verlinkte Wissensbeiträge**.
- Keine zusätzliche automatische Inline-Link-Injektion im Markdown-Body.

## Relevanzprüfung (Required)

Jeder Link muss mindestens eine der folgenden Bedingungen erfüllen:

1. **Direkte Zuordnung über `serviceTags`** (höchste Priorität), oder
2. **Kategorie-Fallback** über die definierte Mapping-Tabelle in `src/lib/resources/internalLinks.ts`.

Wenn keine passende Zuordnung vorliegt, wird **kein Linkblock** gerendert (graceful fallback statt irrelevanter Links).

## Anchor-Text-Regeln

- Keine generischen Texte wie „hier klicken“.
- Service-Links verwenden beschreibende Labels im Format **„Zur Leistung <Service>“** plus konkrete CTA-Beschriftung.
- Links müssen als normale Next.js-`Link`-Elemente keyboard- und screenreader-nutzbar bleiben.

## Governance

- Mapping-Änderungen erfolgen ausschließlich zentral in `src/lib/resources/internalLinks.ts`.
- Bei neuen Services oder Kategorien muss die Mapping-Tabelle explizit ergänzt werden.
- Jede Mapping-Änderung ist über `npm run automation:verify` zu validieren und manuell im Pfad Artikel → Service → Wissen zu prüfen.
