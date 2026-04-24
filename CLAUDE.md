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

## Known limitations

- **Duplicate Google Fonts request from the design kit.** The kit's
  `dekorfabrik-design-kit/tokens/tokens.css` triggers a Google Fonts
  `@import url(…)` that duplicates `next/font/google` loaded in
  `src/app/layout.tsx`. Fix in design-kit v1.1 by removing the `@import`
  from `tokens.css`. Until then, accept the duplicate request — the kit is
  vendored immutable, so we don't edit it in this repo.
