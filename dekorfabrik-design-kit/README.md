# Dekorfabrik Design Kit

**Version 1.0 · blue-palette · April 2026**

This package is the portable design kit for **dekorfabrik.de**. Drop it into a new website project (Next.js, Astro, Nuxt, plain HTML — it doesn't care) and you get the full Dekorfabrik visual system: tokens, fonts, logos, and ready-to-paste component snippets.

---

## What's in here

```
dekorfabrik-design-kit/
├── README.md               ← you are here
├── AGENTS.md               ← instructions for coding agents (Claude Code, Cursor, etc)
├── DESIGN.md               ← the design reference — read this before designing anything
├── CHANGELOG.md
├── tokens/
│   ├── tokens.css          ← CSS custom properties — the source of truth
│   ├── tokens.scss         ← SCSS variable mirror
│   └── tailwind.preset.js  ← Tailwind v3 preset (colors + fonts + radii + shadows)
├── fonts/
│   └── README.md           ← font strategy + licensing note
├── assets/
│   ├── logos/              ← wordmark + mark SVGs
│   └── favicon/            ← favicon + apple-touch set
└── snippets/               ← copy-paste HTML/JSX component scaffolds
    ├── button.html
    ├── nav.html
    ├── pill.html
    ├── card-cream.html
    ├── card-feature-navy.html
    └── cta-panel.html
```

---

## Quickstart

### 1. Install tokens

**Plain HTML / vanilla CSS:**
```html
<link rel="stylesheet" href="/design-kit/tokens/tokens.css"/>
```

**Tailwind v3:**
```js
// tailwind.config.js
module.exports = {
  presets: [require('./design-kit/tokens/tailwind.preset.js')],
  content: ['./src/**/*.{html,js,jsx,ts,tsx,vue}'],
};
```

**SCSS:**
```scss
@use 'design-kit/tokens/tokens' as *;
```

### 2. Load the fonts

`tokens.css` auto-imports the Google Font substitutes (Share, DM Serif Display, Instrument Serif, Geist, Geist Mono) at the top of the file. If you have licensed fonts, see `fonts/README.md` for how to swap them in one place.

### 3. Drop in the logo

```html
<img src="/design-kit/assets/logos/dekorfabrik-wordmark.svg" alt="dekorfabrik.de" height="40"/>
```

### 4. Read `DESIGN.md`

Before you write a single component, read `DESIGN.md`. It defines the palette rhythm, italic-pivot headlines, paper-stack feature tiles, and the rules that make designs feel like Dekorfabrik and not a generic editorial template.

---

## What this kit is not

- **Not a component library.** It's tokens + rules + reference snippets. You build your components against these. This avoids locking you to a framework.
- **Not immutable.** When Dekorfabrik evolves, update `tokens.css` and the rest of the project follows.
- **Not a substitute for the real fonts and logo.** The current logo SVGs are serviceable recreations; the Share font is a Google Fonts stand-in. Replace both when the real assets arrive.

---

## License

Internal to Dekorfabrik GmbH. Do not redistribute.
