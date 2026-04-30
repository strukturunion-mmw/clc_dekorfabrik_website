# clc_dekorfabrik_website

Website for CLC Dekorfabrik, built with Next.js 16 and deployed to Google Cloud Run.

## Stack

- Next.js 16 (App Router) + React 19 + TypeScript (strict)
- Tailwind CSS v4
- Node 24 (see `.nvmrc`)

## Local development

Preferred bootstrap on macOS:

```bash
brew install volta gh direnv
volta install node@24 npm@11
echo 'eval "$(direnv hook zsh)"' >> ~/.zshrc
exec zsh
```

Alternative version managers such as `nvm`, `fnm`, or `asdf` also work, as
long as the active Node major matches `.nvmrc`.

Then initialize the repo:

```bash
volta pin node@24 npm@11   # optional, if not already picked up from package.json
direnv allow     # optional, auto-loads CODEX_HOME + PATH + Node version
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
npm run automation:preflight
npm run automation:preflight:ci
npm run automation:verify
npm run automation:run
```

## Automation environment

Recurring repo automations should run in a pinned environment instead of an ad
hoc shell session. The baseline contract for this repo is:

- Node `24.x`, matching `.nvmrc`, CI, and the Docker build image
- npm `11.x`
- `git`, `gh`, `curl`, `node`, and `npm` installed
- `gh auth status` succeeds
- `CODEX_HOME` is set and writable
- the repo starts from a clean checkout
- `npm ci` has already populated `node_modules`
- network access to GitHub and Notion is available

Run this before a ticket-implementation automation claims work:

```bash
npm run automation:preflight
```

If you use `direnv`, the checked-in [`.envrc`](.envrc) will automatically:

- set `CODEX_HOME` to `~/.codex` unless already defined
- set `NEXT_TELEMETRY_DISABLED=1`
- add `node_modules/.bin` to `PATH`
- try to activate the `.nvmrc` Node version when `use_nvm` is available

Enable it once per clone:

```bash
direnv allow
```

For local or CI-style verification after changes:

```bash
npm run automation:verify
```

For one command that enforces the local automation contract and then verifies:

```bash
npm run automation:run
```

If `direnv` is not installed, export `CODEX_HOME` manually before running the
automation preflight:

```bash
export CODEX_HOME="$HOME/.codex"
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
