# PROJECT_ASSESSMENT.md — Dekorfabrik Website

## Assessment snapshot
- **Date:** 2026-05-14
- **Assessed repo:** `/Users/manuelweisbender/containers/clc_dekorfabrik_website`
- **Assessed board:** Notion data source `095d9e29-f9d2-411e-ad1b-9a5519517241`
- **Scope:** Bootstrap readiness (baseline architecture + workflow readiness)

## 1) Codebase summary

### Stack
- Next.js **16.2.4** (App Router) + React **19.2.5**
- TypeScript strict mode (`tsconfig.json`) with alias `@/* -> src/*`
- Tailwind v4 + design-token mapping from `dekorfabrik-design-kit/tokens/tokens.css`
- ESLint 9 + `eslint-config-next`
- Node 24 / npm 11 pinned via Volta

### Architecture patterns
- App routes in `src/app/**`
- Reusable UI and page sections in `src/components/**`
- SEO helpers centralized in `src/lib/metadata.ts`
- Service-detail content modeled in `src/components/serviceDetails.ts`
- Contact flow split into:
  - client form/validation (`src/app/kontakt/ContactForm.tsx`, `contactValidation.ts`)
  - server route for Mailjet send (`src/app/api/contact/route.ts`)

### Styling and design-system usage
- Token bridge in `src/app/globals.css`
- Tailwind utility classes aligned to design-kit CSS variables
- Reusable primitives and section shells used across pages (`PageShell`, `Button`, `Pill`, cards)

### Delivery and operations
- CI: `.github/workflows/ci.yml` (`automation:preflight:ci`, lint, build)
- Deploy: `.github/workflows/deploy.yml` (Cloud Run via WIF on `main`)
- Production image: root `Dockerfile` (multi-stage standalone build)
- Local dev/test image: `mac-mini-dev/Dockerfile.dev` with compose stack in `mac-mini-dev/`

## 2) What is already implemented

### Board-level progress
- **Closed:** E1, E2
- **In progress:** E3 epic + E0 bootstrap ticket
- **Backlog:** E4–E9 user stories and epics

### Delivered capabilities in code
- Marketing home page with conversion-focused CTAs
- Service overview and service detail pages
- FAQ page and legal pages (Impressum, Datenschutz, AGB)
- Contact/upload flow with consent and Mailjet integration
- Thank-you and freebies pages
- Baseline SEO metadata + robots + sitemap + organization schema

## 3) Planned capabilities (high-level)
- **E3 remaining:** service pricing estimators (E3-US2)
- **E4:** resource center and content pipeline
- **E5:** account/order self-service
- **E6:** lead magnets, segmentation, nurture, retargeting
- **E7:** SEO/GEO expansion and AI-citation readiness
- **E8:** compliance expansion and accessibility hardening
- **E9:** KPI-driven optimization loop

## 4) Current vs target state

| Area | Current state | Planned state |
|---|---|---|
| Core website | MVP complete and deployed | Ongoing conversion iterations |
| Service journey | Detail pages + examples shipped | Estimators + deeper conversion paths |
| Lead capture | Contact/upload baseline live | Segmentation + nurture flows |
| Content system | Static baseline pages | Repeatable content publishing engine |
| SEO/GEO | Baseline metadata/schema | Broader structured data and GEO targeting |
| Compliance | Core legal pages implemented | Cookie controls + expanded WCAG/legal controls |

## 5) Technical debt / known constraints
1. **No test runner configured yet** (quality gate is lint + build + manual checks).
2. **Pricing estimator feature (E3-US2) not shipped yet**.
3. **Design-kit is load-bearing**; changes require explicit scoped tickets.
4. **Mail env naming mismatch** exists across local/prod examples (`MJ_*` vs `MAILJET_*`), documented but intentionally unresolved in bootstrap.
5. **Local mac-mini infra folder should remain ignored** (`/mac-mini-dev/` in `.gitignore`) to avoid accidental commits of machine-local files.

## 6) Bootstrap readiness verification
- ✅ `npm run automation:verify` passes (lint + build)
- ✅ Notion read/write flow works via `mcporter call notion.API-*`
- ✅ Ticket claim / status progression workflow works
- ✅ Branch workflow validated with `agent/<ticket-id>-<slug>` naming
- ✅ Local redeploy path available via `mac-mini-dev/docker compose up -d --build && docker compose ps`

## 7) Conclusion
The codebase and runtime process are ready for autonomous single-ticket execution from `refined` status onward. The next product implementation priority remains **E3-US2 (pricing estimators)** once explicitly queued/refined.
