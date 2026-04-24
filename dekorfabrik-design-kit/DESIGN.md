# DESIGN.md — Dekorfabrik

The design reference for dekorfabrik.de. If you're designing or coding a surface for this brand, this is the single document that tells you how it should feel, look, and read.

> **TL;DR** — Editorial designer's studio, warm-ivory paper canvas, **blue-forward palette derived from the Dekorfabrik logo** (navy, azure, sky), with Clay as the single warm conversion accent. Display type is DM Serif Display with italicized emotional pivots. Brand/UI small-caps are set in Share. German-first, DACH audience, Sie-formal on marketing.

---

## Product & audience

**Dekorfabrik** is a B2B design services studio: manual vectorization, embroidery digitizing, AI upscaling, and print-ready file conversion. Studio in **Leipzig**; customers across **DACH** (Germany, Austria, Switzerland).

**Audience:** working designers, print shops, embroidery studios, and SMB owners who need reliable craft-level production support. They know what a Bézier curve is; they don't want hand-holding.

**Tone:** calm, craft-confident, professional. A senior designer talking to another designer — precise, lightly opinionated, never salesy.

---

## The look in one paragraph

A warm-ivory cream canvas hosts an editorial layout of flat-color cards — deep **navy** for dark feature tiles, **sky blue** for cool accent tiles, cream for default, a single warm **clay** panel for the primary conversion moment, and rare lilac for code/system callouts. Display headlines are set in a serif with one or two italicized words carrying the emotional weight (*"Aus einer Skizze wird eine saubere Vektordatei."*). Small-caps eyebrows and the **df · dekorfabrik.de** wordmark are set in **Share**, wide-tracked, lowercase. The nav is a floating pill. A 1-line marquee ticker sits directly under it. Cards never touch — they float on a single soft shadow with a 34-px circular `↗` affordance in the bottom-right.

---

## Color

### The palette is derived from the Dekorfabrik logo

The logo is a 2-tone mark: a **sky-blue square** containing the azure **df** letters, followed by a **navy wordmark**. Those three blues anchor the system.

| Token | Hex | Role |
|---|---|---|
| `--paper-100` | `#F7F3EA` | **Canvas.** Every page background. The default body color. |
| `--paper-50` | `#FCFAF5` | Raised surfaces (cards on cream). |
| `--navy-900` | `#0A1430` | **Primary text color.** Also the primary button fill. |
| `--navy-800` | `#0D1B3D` | **Dark surface.** Hero feature tile, dark cards. Matches the wordmark. |
| `--azure-600` | `#1F5F9E` | **Brand blue.** Links, brand CTAs (upload, convert), the `df` letters in the mark. |
| `--sky-500` | `#6BAED6` | **Cool accent.** Editorial tiles, the logo square fill, the sky sub-cards. |
| `--clay-500` | `#D86A3D` | **The single warm accent.** Reserved for the primary CTA panel and conversion buttons. Use sparingly — overuse breaks the cool editorial mood. |
| `--lilac-200` | `#D7D4EC` | **Rare.** Code/system/tech callouts only. |

### Card color rhythm

Tiles in a grid **alternate** between cream, navy, sky, clay, and occasionally lilac. **Never place two same-color cards adjacent.** The color rhythm is load-bearing — it's what makes the grid feel composed rather than monotonous.

Example journal row: `[sky-lg]` · `[navy]` / `[cream]` · `[lilac]` · `[navy]`.

### Buttons, semantically

| Button | Background | Foreground | When |
|---|---|---|---|
| **Primary** | `--navy-900` | `--paper-100` | Main nav actions, "Anmelden", general links to action |
| **Brand** | `--azure-600` | `--paper-50` | Upload, convert, "Datei hochladen" — anything that starts a service flow |
| **Accent** | `--clay-500` | `--paper-50` | The one-time conversion moment (the big CTA). Don't use it more than once per view. |
| **Secondary** | `transparent` + border | `--navy-900` | Counterpart to primary ("Beispiele ansehen") |
| **Ghost** | `transparent` | `--navy-900` | Tertiary nav items |

### Rules

- **No pure white.** `#ffffff` should not appear in rendered output.
- **No pure black.** Primary text is `--navy-900`, not `#000`.
- **No gradients** except the soft `--clay-400` glow that lives inside the Clay CTA panel (see snippet).
- **No color outside this palette.** If you need a new signal color (e.g. a warning), add it to `tokens.css` with a semantic name first.

---

## Typography

### Font stack

| Variable | Family | Role |
|---|---|---|
| `--font-display` | **DM Serif Display** | Headlines, card titles, hero |
| `--font-serif` | **Instrument Serif** | Italic pull-quotes inside paper sub-cards |
| `--font-brand` | **Share** | Wordmark, eyebrows, tiny uppercase UI labels |
| `--font-sans` | **Geist** | Body text, UI, buttons, metadata |
| `--font-mono` | **Geist Mono** | Code blocks, spec chips, file names |

> **Font substitution flag.** Share, DM Serif Display, Instrument Serif, Geist, and Geist Mono are loaded from Google Fonts as stand-ins. When Dekorfabrik's real licensed fonts arrive, swap them in `tokens/tokens.css` — change the `@font-face` imports and update the five `--font-*` variables. Nothing else needs to change.

### The italic-pivot headline

**Every major headline contains one or two italicized words** — the emotional pivot of the sentence. This is the defining move. Examples:

- Aus einer Skizze wird eine saubere ***Vektordatei.***
- Warum Ihre AI-Logos selten ***druckfertig*** sind.
- Was sind Figma ***Slots?***
- Was wir für Sie ***machen.***

Don't italicize more than two words. Don't italicize the whole headline. Don't omit the italic — a flat serif headline looks broken in this system.

### Scale

Display scale runs from `--fs-d5` (32px) to `--fs-d1` (88px). Body is 16px. Eyebrows are 11-12px, uppercase, `0.14em` tracking.

---

## Layout

### The page template

1. **Nav** — floating pill, `max-width: 1120px`, centered, 8px below the viewport top. Sticky on scroll.
2. **Marquee ticker** — 1-line, full-bleed, infinite scroll ~40s, items separated by a blue dot.
3. **Main content** — alternating sections at `max-width: 1120px` (or `max-width: 1200px` for hero tiles).
4. **CTA panel** — Clay-500, full-width within the 1120-px inner, toward the bottom.
5. **Footer** — cream, same `max-width: 1120px` inner. Lines up with the nav edge.

### The 1120-px rule

**Nav and footer share `max-width: 1120px` + `margin: 0 auto`.** If you build a new section, match this inner width so edges line up at every viewport. The hero can extend wider (up to 1200px) for breathing room, but everything else respects the 1120-px column.

### Spacing

- **Section gap:** 96px (`--space-24`) between major sections.
- **Card gap:** 16px within a grid.
- **Card inner padding:** 22-28px.
- **Hero tile inner padding:** 26px.
- **Button height:** 44px (or 32-36px small).

### Grid

- ≥1280 px: 12-column, 1120-px max content.
- 768-1280 px: 8-column, fluid.
- Mobile: 4-column, 16-px gutters.

---

## Components

### Nav pill

Floating cream-tinted pill with `backdrop-filter: blur(12px)` and 88% opacity. Holds: brand lockup (sky mark + "dekorfabrik.de" in Share), link group (active state = navy-900 pill), and two CTAs (secondary "Anmelden" + brand "Datei hochladen →"). Sticky on scroll at `top: 18px`.

### Marquee ticker

Runs directly under the nav. Thin hairline borders top and bottom. Items separated by a middle-dot `·` in `--azure-600`. Infinite horizontal scroll animation. Items include: brand pillars, current issue number, date, tagline fragments.

### Feature tile (paper-stack)

The signature hero element. A navy-800 panel with `--radius-xl`, containing **two floating paper sub-cards** — one cream, one sky — each rotated ±3°, with an italic Instrument Serif quote inside. The stacked-paper effect uses `--shadow-paper` (stronger than the default). A large `24h` or key-metric serif display sits at the bottom-left; a wide-tracked label at bottom-right.

### Card grid

Cards alternate between **cream** (default), **navy** (dark feature), **sky** (cool accent), **clay** (warm), **lilac** (system/code callout). Each has:
- Eyebrow (category · date, Share uppercase)
- Headline (DM Serif Display with italic pivot)
- Optional body (Geist, max 3 lines)
- Bottom row: meta + circular `↗` arrow chip

Hover: `translateY(-2px)` + shadow upgrades to `--shadow-lg` + arrow chip shifts `translate(2px, -2px)`.

### Clay CTA panel

The one warm moment per page. A Clay-500 rounded panel with a soft `--clay-400` radial glow in the bottom-right corner. Left column: big italic-pivot headline + supporting body. Right column: a numbered step list styled as stacked pills (navy-900 background, the active/open step tinted `--clay-700`). This is where the conversion happens.

### Footer

Cream, same `max-width: 1120px` as nav. Two zones: brand column (sky mark + wordmark + a short tag line) and three link columns (Dienste / Studio / Rechtliches). A hairline rule, then a slim `© 2026 Dekorfabrik GmbH · Leipzig` bottom row.

---

## Motion

- **Hover cards:** 220ms `cubic-bezier(0.2, 0, 0, 1)`, `translateY(-2px)` + shadow step.
- **Hover buttons:** instant background shade step, no transform on the label.
- **Active/press:** `translateY(1px)`, shadow minimized.
- **Marquee:** 40s linear infinite.
- **Paper-stack sub-cards:** optional ±2px idle float over 6s `ease-in-out` for depth.

No bouncy easing. No spring motion. No large translates (>16px). No opacity-only fades that look like loading states.

---

## Iconography

**Lucide**, 1.5px stroke, currentColor. 12px inline with meta; 16px with buttons; 20px default; 24px standalone; 32px+ only on feature tiles.

**The signature glyph:** `arrow-up-right` (↗) in a 34-px circular chip, bottom-right of every navigable card. Outlined on light surfaces; translucent cream fill on dark.

No emoji. No unicode-as-icon. No colored flat icons. If you need an icon Lucide doesn't have, ask.

---

## Voice & copy

- **German-first.** English only where intentional (international pages).
- **Sie** on marketing, order flow, support. **Du** only on first-person editorial pieces. Never mix within a screen.
- **German number formatting:** `1.299,00 €`, `15. April 2026`, `5 MB`, `300 dpi`.
- **No emoji. No `!!`. One em-dash per sentence, max.** Sentence case (German noun capitalization preserved).
- **Metadata format:** `KATEGORIE · 15. APR 2026` — uppercase, Share, wide-tracked. Read time: `6 min · Leitfaden`.
- **Headlines: one or two italicized words.** Non-negotiable.

### Examples

| ✅ | ❌ |
|---|---|
| "Aus einer Skizze wird eine saubere *Vektordatei* — handgezogen, nicht auto-traced." | "Turn your sketch into a pro vector file — fast! 🚀" |
| "Wir digitalisieren Ihr Logo in eine maschinenlesbare Stickdatei." | "Get amazing embroidery files with our AI tool!" |
| "Kostenlose Vorlagen für Ihr nächstes Projekt." | "Free downloads — don't miss out!!" |

---

## What this system is not

- **Not startup SaaS.** No hero screenshot of a dashboard, no "Trusted by" bar.
- **Not vector-tool cliché.** No Bézier curves in the hero, no stylized pen-nib illustration.
- **Not print pastiche.** We don't fake ink bleeds or halftones.
- **Not flashy.** No scroll-jacked animations, no parallax, no glassmorphism.

If a design starts heading toward any of the above, pull back.

---

*For token values, see `tokens/tokens.css`. For copy-paste scaffolds, see `snippets/`. For agent-specific rules, see `AGENTS.md`.*
