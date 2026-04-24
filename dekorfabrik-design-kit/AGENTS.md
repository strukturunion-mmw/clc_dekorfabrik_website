# AGENTS.md — Dekorfabrik Design Kit

**Read this first.** This file tells you (a coding agent — Claude Code, Cursor, Copilot, etc.) how to work with the Dekorfabrik codebase so it stays on-brand.

---

## Your job

You are helping build and maintain **dekorfabrik.de** — a marketing + order website for a German B2B design services studio. The audience is **designers and small businesses in DACH** (Germany, Austria, Switzerland). German is the primary language; English is secondary.

Your output needs to look and feel like Dekorfabrik — not like a generic SaaS landing page. The visual system is editorial, blue-forward, warm-ivory canvas, with a single confident warm-accent (clay).

---

## Before you code — always do this

1. **Read `DESIGN.md`** in this kit. It defines the tokens, the color rhythm, the italic-pivot headline pattern, and the rules that make the system coherent. If you skip it, your output will drift.
2. **Check `tokens/tokens.css`** for the actual color/type/spacing values. Never hard-code a hex or px value that has a token for it.
3. **Look in `snippets/`** before building a button, card, pill, or nav. Start from the snippet and adapt.
4. **Check the existing codebase** for an existing primitive before creating a new one. Reuse, don't reinvent.

---

## Non-negotiables

These rules are not style preferences — they are the brand. Violating them makes the work feel off even if nothing is obviously wrong.

### Color

- **Canvas is `--paper-100` (#F7F3EA), never pure white.** `#ffffff` should not appear in rendered output except as a raw image asset.
- **Dark surfaces are `--navy-800` (#0D1B3D)**, the wordmark color. Not black, not gray.
- **There is exactly ONE warm accent: `--clay-500` (#D86A3D).** Use it for the primary CTA panel and the conversion button. Everything else is in the blue family or paper/ink neutrals.
- **No two adjacent cards share the same background color.** This is load-bearing; the grid's rhythm depends on alternating cream / navy / sky / clay / lilac.
- **No gradients** except the soft radial glow inside the Clay CTA panel.
- **No pure black text.** Primary text is `--navy-900`.

### Type

- **Display = `--font-display` (DM Serif Display)**. Every major headline has **one or two italicized words** — the emotional pivot of the sentence. This is the signature move. Example: *"Aus einer Skizze wird eine saubere* **Vektordatei.** *"*
- **Brand/UI small-caps = `--font-brand` (Share)**. The wordmark, eyebrows (`AUSGABE 042 · 15. APR 2026`), and tiny uppercase labels use Share with `0.14em` tracking.
- **Body = `--font-sans` (Geist).** Never use Geist for headlines.
- **Code/specs = `--font-mono` (Geist Mono).**
- **Never use Inter, Roboto, or system-ui** as a visible font. They are in the fallback chain only.

### Copy

- **German is primary.** If you write English first, translate it back to natural German before committing. Don't leave "Sign up!" in German flows.
- **Marketing + order flow uses Sie** (formal). Editorial/journal pieces can use du. Never mix within one screen.
- **German number format:** `1.299,00 €`, `15. April 2026`, 24h clock. File sizes `5 MB`, DPI `300 dpi` lowercase.
- **No emoji.** No stacked `!!`. One em-dash per sentence, max.
- **Eyebrows are UPPERCASE + wide tracking.** Headlines and body are sentence-case (with German noun capitalization).

### Layout

- **The nav is a floating pill**, centered at top, `max-width: 1120px`. It is never a full-width bar.
- **The nav pill and the footer share the same `max-width: 1120px`** and center via `margin: 0 auto`. If you build a new section, match this inner width so edges line up.
- **Cards use `--radius-lg` (18px).** Hero/feature panels use `--radius-xl` (28px). Pills use `--radius-pill`. Inputs use `--radius-md` (12px). Don't invent new radii.
- **Section gap is `--space-24` (96px).** Between cards inside a grid, use 16px.

### Arrows & icons

- **The card affordance is a 34px circular chip with a `↗` arrow** (Lucide `arrow-up-right`) in the bottom-right corner of every navigable card. On light cards the chip is outlined; on dark cards it's on a translucent cream fill.
- **Icons are Lucide, 1.5px stroke, currentColor.** No emoji, no colored flat icons.

### Motion

- Default duration `--dur-base` (220ms) with `--ease-standard`.
- Hover on cards: `translateY(-2px)` + shadow step (`--shadow-md` → `--shadow-lg`).
- Buttons step one shade darker on hover — never change foreground color.

---

## Adding a new component

1. **Name it.** Use the existing BEM-ish convention: `.card`, `.card-feature`, `.card-feature-navy`. Don't switch to Tailwind utility soup mid-file if the project is using semantic classes.
2. **Reach for tokens.** Never `background: #0D1B3D` — always `background: var(--navy-800)`.
3. **Respect the card color rhythm.** Before adding a card, check what's adjacent. Pick a tone that contrasts.
4. **Add the hover state.** Every interactive surface gets one. If you don't know what, default to `translateY(-2px) + shadow-lg`.
5. **Check keyboard focus.** 2px `--clay-500` outline with 2px offset on light; 2px `--paper-100` outline on dark. Never `outline: none`.
6. **Add German copy first.** If the component needs text, draft it in German, not English-with-a-translation-note.

---

## Adding a new page

A new page scaffold should have, in order:
1. Floating **Nav** (pill, `max-width: 1120px`)
2. **Marquee ticker** — 1-line, sliding items separated by a blue dot, infinite loop ~40s
3. **Hero** — display serif with italic pivot + short lede + two CTAs, paired with a **feature tile** (navy with floating paper sub-cards) on the right
4. Content (grid of cards with alternating tones)
5. **CTA panel** (clay-500) near the bottom — always has a left-side headline + right-side step list
6. **Footer** — cream with brand + three columns, same `max-width: 1120px` inner as nav

If a page doesn't have a hero tile, replace with a large editorial headline + meta line.

---

## Things to flag, not silently do

If you encounter any of these, **stop and ask**:

- A request to use a color outside the token palette (e.g. "can we add purple?")
- A request to add `display: none` on a screen size (layout should adapt, not disappear)
- A headline without an italic pivot — draft it, then flag it for review
- A CTA that isn't clay or azure (primary CTAs = navy-900 or azure-600; accent/conversion = clay-500)
- Any request to use Inter, Roboto, or system-ui as a visible font
- Missing German copy (if the project ships English only for a page, confirm that's intentional)

---

## When finishing work

- **Run the project locally** before declaring done. Tokens can cache; check the visual state in a fresh browser session.
- **Check the card color rhythm** in the rendered output. If two same-tone cards ended up adjacent, swap one.
- **Re-read your headlines.** If none have italic pivots, add them.
- **Check German formatting.** Dates, currency, measurements — all DE-formatted.

---

## Escalate to a human when

- The task requires a new font weight or subset the existing Google imports don't cover.
- A design needs a color that genuinely doesn't exist in the system (new tag category, new signal state).
- You're building something the snippets don't cover (e.g. a data table, a checkout flow, an admin panel) and the patterns in this kit don't obviously extend.

---

## Reference files, in reading order

1. `DESIGN.md` — the design rulebook (tokens, patterns, rules)
2. `tokens/tokens.css` — the token source of truth
3. `snippets/` — copy-paste component scaffolds
4. `README.md` — how to install the kit

Read those four and you can ship on-brand work without asking.
