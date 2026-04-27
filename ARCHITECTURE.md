# ARCHITECTURE

## Purpose
This repository contains the production website for Dekorfabrik. The architecture supports a phased rollout:
1. MVP replacement of the current one-page site.
2. Expansion into service-specific pages and tools.
3. Ongoing content and conversion optimization.

## System overview
- **Framework**: Next.js (App Router, TypeScript).
- **UI architecture**: reusable components in `src/components`, page composition in `src/app`.
- **Styling**: global styles + design tokens from the Dekorfabrik design kit.
- **Assets**: static assets in `public/`.

## Core domains
- **Marketing pages**: home, services, pricing/process, FAQ, contact.
- **Lead capture**: upload/quote form and CTA flows.
- **Content hub** (phase 2+): resources, guides, case studies.
- **Legal/compliance**: Impressum, Datenschutz, AGB, cookie preferences.

## Planned integration points
- **Form handling**: email/CRM submission endpoint.
- **Analytics**: GA4 or Matomo/Piwik, event tracking for CTA clicks/upload submits.
- **SEO/GEO**: `robots.txt`, `sitemap.xml`, structured data, `llms.txt`.
- **CMS (future phase)**: headless CMS for resource center and dynamic content.

## Quality attributes
- **Accessibility**: WCAG 2.2 baseline (semantic HTML, keyboard navigation, contrast).
- **Performance**: Core Web Vitals target in “good” range.
- **Security/privacy**: HTTPS, consent-aware tracking, GDPR-compliant flows.
- **Scalability**: incremental extension of pages/components without redesigning the base system.

## Delivery model
- Work is tracked by **epics** and **tickets** in Notion.
- Notion is the source of truth for ticket status, branch/PR links, blockers, delivery notes, and implementation decisions.
- Requirements and baseline acceptance gates are maintained in `/specs`.
- The legacy `/planning` markdown files are archival migration sources only.
- Implementation proceeds in small PR-sized tasks mapped to exactly one primary Notion Ticket ID at a time.
