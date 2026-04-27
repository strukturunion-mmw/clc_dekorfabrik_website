# clc_dekorfabrik_website

Website for CLC Dekorfabrik, built with Next.js 15 and deployed to Google Cloud Run.

## Stack

- Next.js 15 (App Router) + React 19 + TypeScript (strict)
- Tailwind CSS v3
- Node 20 (see `.nvmrc`)

## Local development

```bash
nvm use          # or: fnm use
npm install
npm run dev
```

The dev server runs on <http://localhost:3000>.

## Project tracking

Notion is the live source of truth for epics, tickets, delivery status, branch/PR links, blockers, and verification notes.

- Project page: <https://www.notion.so/272d3057f900478eb75b971d9242c153>
- Epics database: <https://www.notion.so/801b85a5d27b46409244de5b5b53d32e>
- Tickets database: <https://www.notion.so/539a6ca790c54270a5adcabee4c63035>

The `planning/` markdown files are retained as migration history only.

Other scripts:

```bash
npm run build    # production build (emits .next/standalone/)
npm run start    # run the production build locally
npm run lint     # ESLint
```

## Deployment

Every merge to `main` auto-deploys to Google Cloud Run via
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml). The workflow
authenticates with Google Cloud through Workload Identity Federation (no
static service-account keys), builds a minimal Docker image from the repo
root `Dockerfile`, pushes it to Artifact Registry tagged with the commit
SHA, and rolls out the new revision.

Pull requests trigger [`.github/workflows/ci.yml`](.github/workflows/ci.yml)
to run lint and build.

Production URL: _add once the Cloud Run service is provisioned_.

## Configuration

Runtime secrets live in Google Secret Manager and are injected into the
Cloud Run service — they are **not** committed to this repo. See
[`.env.example`](.env.example) for the expected shape.

See [`CLAUDE.md`](CLAUDE.md) for branching conventions and the list of
deployment files that must not be modified without explicit intent.
