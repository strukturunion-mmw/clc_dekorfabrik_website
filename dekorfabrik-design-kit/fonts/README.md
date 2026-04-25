# Fonts

## Current setup

The kit expects five font families to be loaded by the **consuming project**. Their CSS-variable hooks are declared in `tokens/tokens.css`:

| Variable | Family | Role |
|---|---|---|
| `--font-display` | **DM Serif Display** | Headlines, card titles |
| `--font-serif` | **Instrument Serif** | Italic pull-quotes inside paper sub-cards |
| `--font-brand` | **Share** | Wordmark, eyebrows, tiny uppercase UI labels |
| `--font-sans` | **Geist** | Body text, UI, buttons, metadata |
| `--font-mono` | **Geist Mono** | Code, specs, file names |

### Why the kit no longer ships a Google Fonts `@import`

From **v1.0.1** the kit does **not** embed a `@import url(fonts.googleapis.com/...)` in `tokens.css`. Modern host frameworks load fonts better than a CSS `@import` can (self-hosted delivery, `preconnect`, `font-display: swap`, FOIT avoidance), and double-loading them produces a duplicate request for every page view. The kit is now framework-agnostic about font delivery — it declares the CSS variables and expects the host to provide the families.

### How to load the fonts, per stack

**Next.js (App Router) — preferred:**
```ts
// src/app/layout.tsx
import { DM_Serif_Display, Geist, Geist_Mono, Instrument_Serif, Share } from "next/font/google";

const share = Share({ subsets: ["latin"], weight: ["400", "700"], style: ["normal", "italic"], display: "swap", variable: "--font-share" });
// …repeat for the other four; apply the .variable strings to <html>
```
Then in your global stylesheet, override the kit's font tokens to lead with the next/font variables:
```css
:root {
  --font-brand: var(--font-share), "Geist", ui-sans-serif, sans-serif;
  --font-display: var(--font-dm-serif-display), "Instrument Serif", Georgia, serif;
  /* …and so on for --font-serif, --font-sans, --font-mono */
}
```

**Astro / Nuxt / Vite / plain HTML:**
Load a Google Fonts `<link>` in `<head>` yourself, OR install the `@fontsource/{dm-serif-display,instrument-serif,share,geist,geist-mono}` packages and import them at your app's entry point. Either way, leave `tokens.css` alone.

**Vanilla CSS (no framework):**
Put this line at the very top of **your own** stylesheet (not `tokens.css`):
```css
@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Instrument+Serif:ital@0;1&family=Share:ital,wght@0,400;0,700;1,400;1,700&family=Geist:wght@300;400;500;600;700&family=Geist+Mono:wght@400;500&display=swap');
```

## ⚠ These are stand-ins

The Dekorfabrik brand may use licensed typefaces. **Share** in particular was chosen because it matches the silhouette of the `df · dekorfabrik.de` wordmark in the logo — it is a reasonable stand-in, not a pixel-perfect match.

## Swapping in the real fonts

When the licensed font files (woff2) are available:

1. **Drop the woff2 files into this folder** (e.g. `fonts/dekorfabrik-brand.woff2`).
2. **Replace the Google `@import`** in `tokens/tokens.css` with a set of `@font-face` rules pointing at the local files.
3. **Update the five `--font-*` CSS variables** in `tokens.css` to name the new families first in the stack. Keep the existing families as fallbacks.

Example:
```css
@font-face {
  font-family: 'Dekorfabrik Brand';
  src: url('../fonts/dekorfabrik-brand.woff2') format('woff2');
  font-weight: 400 700;
  font-style: normal;
  font-display: swap;
}

:root {
  --font-brand: "Dekorfabrik Brand", "Share", ui-sans-serif, sans-serif;
}
```

**That's the only change required** — every component in the kit references `var(--font-brand)`, so the swap propagates automatically.

## Licensing

- **Google Fonts families** (DM Serif Display, Instrument Serif, Share, Geist, Geist Mono) are open-source and free to use in production.
- **Licensed typefaces** must have a web-embed license covering dekorfabrik.de's expected traffic. Verify before deploying.
