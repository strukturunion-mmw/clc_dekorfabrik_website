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
- `CODEX_HOME` resolves to a writable directory
- the repo starts from a clean checkout
- `npm ci` has already populated `node_modules`
- network access to GitHub and Notion is available

GitHub reachability stays a hard requirement because ticket automation is
expected to branch from the current `origin/main`, not from a stale local
checkout.

Bootstrap a fresh automation worktree before a ticket-implementation
automation claims work:

```bash
npm run automation:bootstrap
```

This script:

- runs `git fetch origin --prune`
- fails early with a clearer GitHub/DNS message when `origin` is unreachable
- creates a fresh detached worktree from current `origin/main`
- runs `npm ci` there when `node_modules` is missing
- runs `direnv exec . npm run automation:preflight` in that clean worktree

Run this inside an already-prepared worktree when you only need the strict
repo-contract check:

```bash
npm run automation:preflight
```

If you use `direnv`, the checked-in [`.envrc`](.envrc) will automatically:

- keep an existing `CODEX_HOME`, otherwise resolve one in this order:
  `~/.codex`, `~/.codex/automations`, then repo-local `.codex/`
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
automation preflight. `~/.codex` remains the preferred default for normal local
runs:

```bash
export CODEX_HOME="$HOME/.codex"
```

If that location is not writable in an automation sandbox, the preflight will
automatically fall back to `~/.codex/automations` and finally to repo-local
`.codex/` while keeping the rest of the local Mac contract unchanged.

Automation workflow rule:

- do not move a Notion ticket to `in_progress` until `npm run automation:bootstrap`
  or the equivalent fetch + fresh-worktree + preflight sequence has passed

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
