# Resource Publishing Checklist

Diese Checkliste stellt sicher, dass neue Wissensartikel im gleichen, validierten Format veröffentlicht werden.

## 1) Datei anlegen

1. Kopiere `docs/content-template.mdx`.
2. Lege die neue Datei unter `src/content/resources/<slug>.md` oder `.mdx` an.
3. Ersetze den Slug in Dateinamen **und** Frontmatter (`slug`). Beide müssen identisch sein.

## 2) Pflicht-Frontmatter vollständig ausfüllen

Folgende Felder sind verpflichtend. Der Build bricht bei fehlenden/invaliden Feldern sofort ab:

- `title`
- `slug`
- `excerpt`
- `category` (`dateivorbereitung | vektorisierung | stickdateien | druckdaten`)
- `serviceTags` (kommagetrennt, erlaubt: `vektorisierung`, `stickdatei-digitalisierung`, `druckdaten-check`, `datei-aufbereitung`)
- `publishDate` (`YYYY-MM-DD`)
- `updatedDate` (`YYYY-MM-DD`)
- `readingMinutes` (ganze Zahl > 0)
- `author`
- `seoTitle`
- `seoDescription`
- `contentType` (`guide | tutorial | case-study`)

## 3) Inhaltsregeln

- German-first schreiben.
- Eine klare H2-Struktur nutzen (`## ...`).
- Optional Listen mit `-` oder nummeriertem Format verwenden.
- Nur Inhalte veröffentlichen, die einen Produktions- oder Entscheidungsnutzen haben.

## 4) Linking-Regeln

- Mindestens ein Bezug zu passenden Services herstellen (automatisch über `serviceTags` + CTA, optional zusätzlich im Fließtext).
- Kategorie muss zur inhaltlichen Intention passen (Filter-/Archiv-Seiten nutzen diese Taxonomie direkt).

## 5) Bilder (falls ergänzt)

- Dateinamen sprechend und slug-nah benennen.
- Alt-Text präzise und fachlich beschreibend halten.
- Keine irrelevanten Deko-Grafiken ohne Informationswert.

## 6) Verifikation vor Review

```bash
npm run lint
npm run build
```

Zusätzlich für Spot-Checks:

1. Artikel-URL öffnen (`/wissen/<slug>`).
2. `title`, `description`, `canonical` auf der Seite prüfen.
3. JSON-LD Script (`@type: Article`) im Page Source kontrollieren.
4. Kategorie- und Wissensübersicht prüfen (Karte, Filter, Suchtreffer).

## 7) Qualitäts-Gate

Ein Artikel gilt erst als publish-ready, wenn:

- Frontmatter komplett und valide ist.
- Build ohne Warn-/Fehler zu Ressourcenmetadaten durchläuft.
- Metadaten + JSON-LD auf der Artikelseite sichtbar und eindeutig sind.
- Kategorie-/Service-Zuordnung nachvollziehbar ist.
