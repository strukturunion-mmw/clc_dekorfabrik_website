# CLAUDE.md

Context for future Claude Code sessions working on this repository.

## Stack

- **Framework:** Next.js 16 (App Router) with React 19
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS v4
- **Linting:** ESLint 9 (flat config, `next/core-web-vitals` + `next/typescript`)
- **Runtime:** Node 24 LTS (see `.nvmrc`)
- **Directory convention:** `src/` for application code; App Router lives in `src/app/`
- **Package manager:** npm (lockfile: `package-lock.json`)

## Common commands

| Command         | Purpose                                         |
| --------------- | ----------------------------------------------- |
| `npm install`   | Install dependencies                            |
| `npm run dev`   | Start local dev server (http://localhost:3000)  |
| `npm run build` | Production build (emits `.next/standalone/`)    |
| `npm run start` | Run the production build locally                |
| `npm run lint`  | Run ESLint                                      |

## Branching and commits

- **No direct pushes to `main`** — always branch and open a PR
- Use descriptive feature branches (`feat/...`, `fix/...`, `chore/...`)
- Follow **Conventional Commits** (`feat:`, `fix:`, `chore:`, `docs:`, `ci:`, `refactor:`…)
- Prefer **squash-merge** into `main` so history stays linear
- PRs must pass the `CI` workflow (lint + build) before merging

## Deployment flow

1. PR opens → `.github/workflows/ci.yml` runs lint + build
2. PR merges into `main` → `.github/workflows/deploy.yml` runs:
   - Authenticates to Google Cloud via **Workload Identity Federation** (no static keys)
   - Builds the Docker image from the repo root `Dockerfile`
   - Pushes to Artifact Registry tagged with the commit SHA (no `latest`)
   - Deploys to Cloud Run with `--allow-unauthenticated --min-instances=0 --max-instances=5 --cpu=1 --memory=512Mi`
3. All GCP identifiers live in the `production` GitHub Environment as repository/environment **variables**:
   `GCP_PROJECT_ID`, `GCP_REGION`, `AR_REPO`, `SERVICE_NAME`, `WIF_PROVIDER`, `DEPLOYER_SA`

## Do not modify without explicit request

The following files encode deployment and supply-chain decisions. Do not edit
them unless the user explicitly asks:

- `.github/workflows/ci.yml`
- `.github/workflows/deploy.yml`
- `Dockerfile`
- Cloud Run deploy flags (`--allow-unauthenticated`, `--min-instances`, `--max-instances`, `--cpu`, `--memory`, `--region`)
- The image tagging scheme (commit SHA only — never `latest`)
- Authentication approach (Workload Identity Federation — never service-account key files or `GOOGLE_APPLICATION_CREDENTIALS`)

## Secrets

Runtime secrets belong in **Google Secret Manager** and are injected into the
Cloud Run service, not committed to the repo. `.env.example` documents the
expected variables. Use `.env.local` (gitignored) for local overrides.

## Design-kit adjustments

The kit is still vendored under `dekorfabrik-design-kit/`, but it is **no
longer strictly immutable** — we make targeted, documented edits when a
fix can only live in the kit itself. All adjustments are recorded in
`dekorfabrik-design-kit/CHANGELOG.md` (bump the kit's patch version there)
and in this section:

- **v1.0.1 — font delivery moved to the host app.** Dropped the Google
  Fonts `@import url(...)` from `tokens/tokens.css`. Our `src/app/layout.tsx`
  loads Share, DM Serif Display, Instrument Serif, Geist, and Geist Mono via
  `next/font/google` (self-hosted, preconnected, `display: swap`) and
  `src/app/globals.css` overrides the kit's `--font-*` tokens to lead with
  the `next/font` CSS variables. The CSS variables stay the single
  consumption point.
- **Hero width aligned to the 1120-px content column.** `DESIGN.md` allows
  the hero to extend to 1200 px. We align it to `max-w-content` (1120 px)
  instead so the nav pill, marquee, hero, card grid, and footer all share
  the same gutters at every breakpoint — the 80-px offset between hero and
  the rest was visually off. If DESIGN.md is revised we'll reconsider.
- **Nav + marquee share a single sticky header.** `SiteHeader` (in
  `src/components/sections/`) wraps `<Nav>` and `<Marquee>` as one sticky
  block with a paper-100 fill, so the marquee cannot bleed through the nav
  pill during scroll. The two elements still render as separate components
  and can be used independently.
- **Nav lockup is the df mark + "dekorfabrik.de" Share text**, not the
  full wordmark SVG — the wordmark contains its own df square and rendering
  both produced a duplicated mark. The wordmark SVG remains in `public/`
  and `dekorfabrik-design-kit/assets/logos/` for other surfaces
  (share cards, email signatures, print).

When the upstream kit ships a new version, reconcile these adjustments
into the incoming drop before committing the upgrade.
