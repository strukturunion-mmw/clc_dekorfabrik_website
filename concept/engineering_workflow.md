# Codex & Github **repo-centered engineering workflow**

Yes. With your Codex subscription, I would run this as a **repo-centered engineering workflow**, not as one giant autonomous agent session.

The core idea:

```
You write durable specs in the repo.
Codex works on bounded tasks in branches/worktrees/cloud tasks.
Codex opens PRs or produces local diffs.
CI/tests/preview deployments verify the result.
You approve merges and production deploys.
```

Codex can work in three useful places: **Codex Cloud**, **Codex CLI/local app**, and **GitHub PR comments/reviews**. Codex Cloud can read, edit, and run code in a cloud environment, work in the background and in parallel, connect to GitHub repos, and create PRs from its work.   The local CLI/app can work directly in your checked-out project folder, read files, run commands, and write changes.  

## **1\. Start with the right operating model**

For a website project, I would use this split:

```
Codex Cloud:
  - implementation tasks
  - background tasks
  - parallel tasks
  - PR creation
  - CI-failure fixes

Codex CLI / Codex app locally:
  - architecture exploration
  - local debugging
  - interactive pair-programming
  - reviewing generated diffs before pushing

GitHub:
  - issues
  - branches
  - PRs
  - code review
  - CI status
  - deployment previews

You:
  - approve architecture
  - approve merges
  - approve production deployments
  - intervene on ambiguous product decisions
```

Do **not** ask Codex to “build the whole website.” Ask it to handle scoped units of work with a clear definition of done.

## **2\. Prepare the repo before giving Codex real work**

Add a few durable files to the repository. This matters because Codex should not depend on chat memory for project rules.

Suggested repo files:

```
/specs/PRODUCT_SPEC.md
/specs/WEBSITE_REQUIREMENTS.md
/specs/DESIGN_SYSTEM.md
/specs/ACCEPTANCE_CRITERIA.md
ARCHITECTURE.md
AGENTS.md
README.md
.env.example
```

The most important one is `AGENTS.md`. Codex explicitly supports repository-level `AGENTS.md` files for project instructions, and nested overrides can be placed closer to specialized areas of the repo. OpenAI’s docs recommend using `AGENTS.md` for durable guidance, including setup, lint/test commands, conventions, and review guidelines.  

A good first `AGENTS.md` could look like this:

```
# AGENTS.md

## Project goal

This repository contains the production website for <project/company>.
The source of truth for product requirements is:

- specs/PRODUCT_SPEC.md
- specs/WEBSITE_REQUIREMENTS.md
- specs/ACCEPTANCE_CRITERIA.md
- ARCHITECTURE.md

Do not invent product behavior. If a requirement is ambiguous, leave a question in the PR description.

## Development setup

Use:

- pnpm install
- pnpm dev
- pnpm lint
- pnpm typecheck
- pnpm test
- pnpm test:e2e

Before proposing a PR, run:

1. pnpm lint
2. pnpm typecheck
3. pnpm test
4. pnpm test:e2e, if the change affects user-visible behavior

## Coding rules

- Keep changes minimal and scoped to the task.
- Do not rewrite unrelated files.
- Do not introduce new dependencies without explaining why.
- Prefer small components over large monolithic components.
- Keep public behavior covered by tests.
- Update docs when behavior changes.
- Do not modify deployment, auth, billing, analytics, or database migrations unless the task explicitly asks for it.

## Website-specific rules

- Preserve responsive behavior.
- Preserve accessibility semantics.
- Use existing design tokens and components before creating new ones.
- Do not hard-code copy that belongs in CMS/config unless the spec says so.
- Run visual or browser checks for user-facing UI changes when possible.

## Review guidelines

When reviewing PRs, focus on:

- missed acceptance criteria
- broken responsive behavior
- accessibility regressions
- security or privacy issues
- unnecessary dependencies
- untested business logic
- risky deployment changes
```

If you have a monorepo, add nested instruction files, for example:

```
apps/web/AGENTS.md
packages/ui/AGENTS.md
packages/db/AGENTS.md
packages/api/AGENTS.md
```

Codex applies the closest relevant instructions, so this is how you get specialized behavior without relying on fragile “role prompting.”  

## **3\. Configure Codex Cloud for the repo**

For direct background work, use **Codex Cloud**.

The setup path is:

```
1. Open Codex in ChatGPT.
2. Connect your GitHub account.
3. Select the repository.
4. Configure the environment.
5. Add setup commands.
6. Add environment variables/secrets if needed.
7. Run a small test task.
```

Codex Cloud tasks create a container, check out your selected branch or commit, run your setup script, apply internet-access settings, then the agent edits code, runs commands, validates its work, and finally shows an answer plus a diff; from there you can open a PR or continue iterating.  

For a modern JS/TS website, your Codex Cloud setup script might be:

```shell
corepack enable
pnpm install --frozen-lockfile
pnpm build
```

Or for npm:

```shell
npm ci
npm run build
```

Then define the commands Codex should normally run:

```shell
pnpm lint
pnpm typecheck
pnpm test
pnpm test:e2e
```

One security detail: Codex Cloud environment variables are available through the task, but secrets are decrypted only for task execution and removed before the agent phase. Setup scripts can use secrets, but the agent should not directly see them.  

## **4\. Configure local Codex for interactive work**

Install the CLI locally so you can work directly inside the checked-out repo:

```shell
npm install -g @openai/codex
```

or:

```shell
brew install codex
```

Then:

```shell
cd /path/to/your/repo
codex
```

The Codex quickstart says the CLI is supported on macOS, Windows, and Linux, and that after authentication you can ask Codex to work in your current directory.   In interactive mode, Codex can read your repository, make edits, run commands, show plans, and let you approve or reject steps inline.  

I would avoid running Codex with unconstrained full access. Keep it inside the repo sandbox. The CLI supports approval and sandbox settings, including `workspace-write`; the docs warn that bypassing approvals and sandboxing should only be used inside an externally hardened environment.  

For local work, use Git checkpoints:

```shell
git status
git checkout -b codex/bootstrap-audit
codex
```

Codex’s own quickstart recommends creating Git checkpoints before and after tasks because Codex can modify the codebase.  

## **5\. First Codex task: repo audit, not implementation**

Do **not** start by asking Codex to build features. Start by asking it to understand the repo and produce a plan.

Prompt:

```
You are working in this repository as a senior website engineer.

First, do not edit files.

Read:
- README.md
- ARCHITECTURE.md
- AGENTS.md
- specs/PRODUCT_SPEC.md
- specs/WEBSITE_REQUIREMENTS.md
- package.json
- the main app entry points

Then produce:
1. A short architecture summary.
2. The main frontend/backend/deployment/test stack.
3. The commands required to install, run, lint, typecheck, test, and build.
4. Any missing information that would block reliable implementation.
5. A proposed implementation plan broken into small PR-sized tasks.

Do not change code yet.
```

Then have Codex update the repo docs:

```
Update ARCHITECTURE.md and AGENTS.md with any missing setup, test, and repo-structure information you discovered.

Keep changes factual and minimal.
Do not change application code.
```

This “onboarding pass” is worth doing because Codex works better when the repo contains durable project context. OpenAI’s best-practices docs recommend giving Codex clear task context and a structure with goal, context, constraints, and “done when” criteria.  

## **6\. Break the website into PR-sized Codex tasks**

For a website implementation, create issues like this:

```
Issue 1: Establish base layout and routing
Issue 2: Implement homepage hero section
Issue 3: Implement pricing page
Issue 4: Implement authentication UI
Issue 5: Implement dashboard shell
Issue 6: Add CMS/content source integration
Issue 7: Add responsive navigation
Issue 8: Add analytics events
Issue 9: Add Playwright coverage for critical paths
Issue 10: Add deployment preview checks
```

Each issue should contain:

```
## Goal

What should change?

## Context

Relevant files, docs, screenshots, URLs, Figma notes, or existing components.

## Acceptance criteria

- [ ] User can ...
- [ ] Page renders correctly on desktop and mobile.
- [ ] Existing tests still pass.
- [ ] New behavior is covered by tests.
- [ ] No unrelated files changed.

## Commands to run

- pnpm lint
- pnpm typecheck
- pnpm test
- pnpm test:e2e

## Non-goals

- Do not change auth.
- Do not change deployment config.
- Do not add a new UI library.
```

This is the format Codex tends to handle reliably.

## **7\. Use Codex Cloud to implement one issue at a time**

In Codex Cloud, use prompts like:

```
Implement GitHub issue #12 in this repository.

Before editing:
1. Read AGENTS.md.
2. Read specs/WEBSITE_REQUIREMENTS.md.
3. Read the issue description and acceptance criteria.
4. Identify the relevant files.

Implementation rules:
- Keep the change scoped to this issue.
- Prefer existing components and styles.
- Do not introduce new dependencies unless necessary.
- Add or update tests for changed behavior.
- Run pnpm lint, pnpm typecheck, and pnpm test.
- If an E2E test is relevant, run pnpm test:e2e.

When finished:
- Summarize what changed.
- List the commands you ran and their results.
- List any remaining risks or follow-up questions.
- Open a PR.
```

For a frontend task:

```
Implement the pricing page from specs/PRICING_PAGE.md.

Focus only on:
- /pricing route
- pricing card components
- responsive layout
- accessibility labels
- tests for rendering and plan selection behavior

Do not modify:
- auth
- billing provider integration
- deployment config
- unrelated pages

Done when:
- pnpm lint passes
- pnpm typecheck passes
- pnpm test passes
- pricing page renders on mobile and desktop
- PR description includes screenshots or a preview URL if available
```

## **8\. Use GitHub comments to make Codex fix or review PRs**

After Codex opens a PR, use GitHub comments to keep the loop inside the repo.

Codex can review PRs when you comment:

```
@codex review
```

OpenAI’s GitHub integration docs say Codex can post a standard GitHub code review when requested this way, and automatic reviews can also be enabled in Codex settings.  

You can focus the review:

```
@codex review for accessibility regressions and missed acceptance criteria
```

You can also give Codex follow-up implementation work from the PR context. OpenAI’s docs say that mentioning `@codex` in a PR comment with something other than `review` starts a cloud task using the PR as context.  

Examples:

```
@codex fix the CI failures. Keep the scope limited to this PR.
```

```
@codex address the reviewer comments about mobile layout and add a regression test.
```

```
@codex update the PR description with the commands run, test results, and remaining risks.
```

## **9\. Add CI so Codex cannot self-certify success**

Your CI should be the gatekeeper.

Minimum for a website:

```
lint
typecheck
unit tests
build
Playwright / E2E tests
dependency audit
format check
```

For a Next.js/React-style project, this could be:

```shell
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm test:e2e
```

Branch protection should require CI passing before merge.

Use Codex to fix failures, but not to decide whether failure is acceptable:

```
@codex CI failed on this PR. Inspect the failing jobs and fix the minimal cause.
Do not change unrelated files.
After the fix, explain which failures you addressed.
```

For more automation, OpenAI provides a Codex GitHub Action that can run Codex from GitHub Events, apply patches, or post reviews from a workflow; OpenAI suggests it for automated PR/release feedback, quality gates, and repeatable tasks like code review or migrations.  

I would add the GitHub Action later, not on day one. Start manually until you know which prompts work.

## **10\. Use specialized Codex “roles” through task prompts and repo docs**

Since you are putting aside Langdock, your “specialized agents” should initially be **separate Codex tasks**, not one mega-agent.

Example task types:

```
Planner Codex task:
  Reads specs and creates implementation plan. No code edits.

Frontend Codex task:
  Implements UI routes/components. Runs responsive/browser checks.

Test Codex task:
  Adds or improves unit/E2E tests. Does not change product logic unless required.

Reviewer Codex task:
  Reviews a PR for correctness, security, accessibility, and missed requirements.

CI-fixer Codex task:
  Reads failed logs and applies minimal fixes.

Docs Codex task:
  Updates README, ARCHITECTURE.md, AGENTS.md, and user-facing docs.
```

For specialized areas, add nested `AGENTS.md` files:

```
apps/web/AGENTS.md
packages/ui/AGENTS.md
packages/api/AGENTS.md
tests/e2e/AGENTS.md
```

For example:

```
# tests/e2e/AGENTS.md

## E2E test rules

- Prefer user-visible selectors and accessible roles.
- Do not rely on brittle CSS selectors.
- Keep tests deterministic.
- Use test fixtures rather than production credentials.
- If a test requires network mocking, document it in the test file.
```

This is better than asking Codex to remember “you are the testing agent” across a long session.

## **11\. Use a repeatable task template**

Here is the template I would use for almost every Codex implementation task:

```
Task: <short task name>

Goal:
<one paragraph>

Context:
- Read AGENTS.md.
- Read <specific spec file>.
- Relevant files likely include:
  - <path>
  - <path>
- Related issue/PR:
  - <issue number>

Constraints:
- Keep the change scoped.
- Do not modify unrelated files.
- Do not add dependencies without explanation.
- Preserve existing public APIs unless explicitly required.
- Follow existing code style and design system.
- Ask/leave a question if a requirement is ambiguous.

Implementation:
- Make the smallest complete change.
- Add or update tests.
- Update docs only if behavior changes.

Done when:
- <specific user-visible behavior works>
- pnpm lint passes
- pnpm typecheck passes
- pnpm test passes
- pnpm build passes
- pnpm test:e2e passes if relevant

Final response:
- Summarize files changed.
- Summarize tests run and results.
- Note risks, assumptions, and follow-up work.
- Open a PR if using Codex Cloud.
```

Codex’s own workflow guidance says it works best when treated like a teammate with explicit context and a clear definition of done.  

## **12\. Recommended first week rollout**

### **Day 1: Repo readiness**

Do this locally with Codex CLI/app:

```
- Add AGENTS.md.
- Add or improve ARCHITECTURE.md.
- Add specs/ folder.
- Confirm install/test/build commands.
- Add .env.example.
- Make sure CI exists.
```

Give Codex only documentation/setup tasks at first.

### **Day 2: Codex Cloud setup**

```
- Connect GitHub.
- Configure Codex Cloud environment.
- Add setup script.
- Test with a no-risk task:
  “Read the repo and summarize the architecture. Do not edit files.”
- Then test a small docs PR.
```

### **Day 3: First real implementation PR**

Pick a small isolated task:

```
- One component
- One route
- One bugfix
- One test improvement
```

Avoid auth, payment, deployment, database migrations, or large refactors.

### **Day 4: PR review loop**

Use:

```
@codex review for missed acceptance criteria, accessibility, and regression risk
```

Then:

```
@codex fix the issues you found, keeping the scope minimal
```

### **Day 5: Larger website slice**

Move to a full page or workflow:

```
- homepage section
- pricing page
- contact form
- dashboard shell
- onboarding flow
```

Require preview deployment and Playwright coverage before merge.

## **13\. When to use local vs cloud**

Use **local Codex** when:

```
- you want to watch every command
- the task needs local services or credentials
- you are debugging interactively
- you want to inspect the app visually
- you are not ready to let Codex open PRs
```

Use **Codex Cloud** when:

```
- the task is well specified
- the repo setup is reproducible
- CI can verify the result
- the task can run in the background
- you want parallel PR-sized implementation tasks
```

Use **GitHub @codex** when:

```
- a PR needs review
- CI failed
- reviewer comments need addressing
- the PR context is enough to complete the next step
```

## **14\. Guardrails I would put in place**

I would use these rules from the start:

```
Codex may:
- create branches
- edit code in feature branches
- add tests
- open PRs
- respond to PR comments
- fix CI failures

Codex may not, without explicit approval:
- merge PRs
- deploy to production
- rotate secrets
- change auth/session logic
- change payment/billing code
- change database migrations
- add major dependencies
- change CI/deployment config
- delete data
```

Put these rules in `AGENTS.md`, branch protection, and CODEOWNERS.

## **15\. Optional later: programmatic orchestration**

Once the manual workflow works, you can automate more.

OpenAI provides a Codex SDK for programmatically controlling local Codex agents from server-side applications, CI/CD pipelines, internal tools, or custom workflows.   Codex CLI can also be exposed as an MCP server and orchestrated with the OpenAI Agents SDK for deterministic, reviewable multi-agent workflows with handoffs, guardrails, and traces.  

I would not start there. Start with:

```
GitHub issues
→ Codex Cloud tasks
→ PRs
→ CI
→ @codex review/fix comments
→ human merge
```

Only build custom orchestration after you see the repeated patterns.

## **My recommended starting setup**

For you, I would do this:

```
1. Use GitHub as the source of truth.
2. Add AGENTS.md, ARCHITECTURE.md, and specs/.
3. Configure Codex Cloud for the repo.
4. Install Codex CLI locally.
5. Ask Codex to audit the repo and improve AGENTS.md.
6. Create 5–10 small GitHub issues from the website spec.
7. Assign one Codex Cloud task per issue.
8. Let Codex open PRs.
9. Use @codex review on each PR.
10. Use CI + preview deploys + your approval as the merge gate.
```

The guiding principle: **Codex can do the work, but GitHub and CI should hold the truth.**

