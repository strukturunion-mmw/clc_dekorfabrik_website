# Changelog

## 1.0.1 — 24 April 2026

- **Removed the Google Fonts `@import url(...)` from `tokens/tokens.css`.**
  The kit no longer embeds font delivery. The CSS variables (`--font-display`,
  `--font-serif`, `--font-brand`, `--font-sans`, `--font-mono`) remain intact;
  the **consuming project** is now responsible for loading the five families
  (`next/font/google`, `@fontsource/*`, a manual `<link>`, or a project-level
  `@import` outside `tokens.css`).
  - Rationale: framework font loaders (next/font, fontsource) self-host,
    preconnect, and use `font-display: swap` — better than a CSS `@import`
    can achieve, and double-loading the families produced a duplicate request
    on every page view.
  - Migration: see `fonts/README.md` for per-stack recipes. Vanilla-CSS users
    paste the `@import` line into their own global stylesheet.
- Updated `fonts/README.md` and `README.md` to reflect the new font
  contract.
- No token values changed. No component snippet changed. Upgrading from
  1.0.0 is font-delivery-only.

## 1.0.0 — 15 April 2026

- Initial release of the portable design kit.
- Blue-forward palette derived from the dekorfabrik.de logo (navy #0D1B3D, azure #1F5F9E, sky #6BAED6).
- Clay #D86A3D retained as the single warm CTA accent.
- Warm-ivory paper canvas (#F7F3EA).
- Share adopted as the brand/wordmark/UI small-caps font.
- DM Serif Display + Instrument Serif for editorial display.
- Geist + Geist Mono for body and code.
- Tokens published in CSS, SCSS, and Tailwind v3 preset formats.
- Logo SVGs: wordmark, mark, mark-cream, mark-on-dark.
- Six component snippets: button, nav, pill, card-cream, card-feature-navy, cta-panel.

### Known stand-ins (swap when available)
- **Fonts:** Share (brand), DM Serif Display, Instrument Serif, Geist, Geist Mono are Google Fonts stand-ins. Replace with licensed Dekorfabrik fonts when available.
- **Logo:** Current SVGs are visually accurate recreations of the 2-tone mark, not the source vector from the Dekorfabrik brand archive.
