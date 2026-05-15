# Analytics Event Dictionary — Content Engagement & Conversion

This document defines the content-performance events introduced for E4-US4.

## Delivery model

- Component layer emits typed events through `trackEvent(...)` only.
- Event transport is adapter-based (`src/lib/analytics/track.ts`), currently defaulting to `window.dataLayer`.
- Components must not bind directly to vendor SDK APIs (GA4, Matomo, etc.).

## Event dictionary

### `article_view`

Emitted once when an article page mounts.

Payload:

- `articleSlug: string`
- `articleCategory: string`
- `articleTitle: string`
- `pathname: string`
- `emittedAt: string` (ISO timestamp, added by tracker)

### `article_scroll_depth`

Emitted when a user reaches each scroll milestone on an article page.

Payload:

- `articleSlug: string`
- `articleCategory: string`
- `depth: 25 | 50 | 75 | 100`
- `pathname: string`
- `emittedAt: string`

### `article_cta_click`

Emitted when a non-service CTA from article context is clicked (e.g., contact, FAQ).

Payload:

- `articleSlug: string`
- `articleCategory: string`
- `ctaVariant: string | null`
- `targetServiceSlug: string | null`
- `destinationPath: string`
- `emittedAt: string`

### `service_link_click`

Emitted when an article-context CTA links to a specific service page.

Payload:

- `articleSlug: string`
- `articleCategory: string`
- `ctaVariant: string | null`
- `targetServiceSlug: string`
- `destinationPath: string`
- `emittedAt: string`

### `contact_form_submit_from_content`

Emitted after successful contact-form submit if `/kontakt` was entered with article attribution params.

Payload:

- `articleSlug: string`
- `articleCategory: string`
- `ctaVariant: string | null`
- `targetServiceSlug: string | null`
- `destinationPath: string` (currently `/kontakt`)
- `emittedAt: string`

## Attribution model

Content attribution is propagated via URL search params:

- `article`
- `category`
- `cta`
- `service`

These are read via `getContentJourneyAttribution(...)` in `src/lib/analytics/contentAttribution.ts`.

## QA checklist

1. Open `/freebies`.
2. In DevTools Console, inspect `window.dataLayer`.
3. Verify `article_view` appears once on initial load.
4. Scroll and verify `article_scroll_depth` milestones at 25/50/75/100.
5. Click a service card CTA and verify `service_link_click` payload includes destination and service slug.
6. Return to `/freebies`, click "Neue Anfrage starten" and verify `article_cta_click`.
7. On `/kontakt` (with `article`/`category` params), submit a valid form and verify `contact_form_submit_from_content`.
8. Confirm page rendering and navigation still work if no analytics consumer is present (events should still no-op safely into local `dataLayer`).

## Privacy / consent guardrail

- No personal form values are included in analytics payloads.
- Event emission is intentionally centralized so consent gating can be added in one place (the tracker adapter) when consent tooling is active.
- Do not emit PII in future payload extensions.
