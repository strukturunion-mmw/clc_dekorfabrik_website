# AGENTS.md

## Project goal
Build and iteratively evolve the Dekorfabrik website redesign described in:
- `specs/PRODUCT_SPEC.md`
- `specs/WEBSITE_REQUIREMENTS.md`
- `specs/DESIGN_SYSTEM.md`
- `specs/ACCEPTANCE_CRITERIA.md`
- `ARCHITECTURE.md`

Do not invent product behavior beyond these docs. If a requirement is ambiguous, leave a clear assumption note in your PR.

## Source of truth
Notion is the live source of truth for planning, task state, delivery status, and implementation documentation.

- Project page: https://www.notion.so/272d3057f900478eb75b971d9242c153
- Epics database: https://www.notion.so/801b85a5d27b46409244de5b5b53d32e
- Tickets database: https://www.notion.so/539a6ca790c54270a5adcabee4c63035

Treat `planning/` markdown files as archival context only unless the user explicitly asks to migrate, reconcile, or update them.

## Development setup
Use:
- `npm ci`
- `npm run dev`
- `npm run lint`
- `npm run build`

Before proposing a PR, run:
1. `npm run lint`
2. `npm run build`

## Coding rules
- Keep changes minimal and task-scoped.
- Do not rewrite unrelated files.
- Do not introduce dependencies unless required by an approved task.
- Preserve accessibility semantics and responsive behavior.
- Use existing design tokens/components before creating new UI primitives.
- Update docs/specs and the relevant Notion ticket when requirements or workflow changes.

## Workflow rules
- Start every implementation task from exactly one primary Notion Ticket ID.
- Validate the implementation baseline before claiming work: fetch `origin`, create or reuse a fresh clean worktree from current `origin/main`, and run `direnv exec . npm run automation:preflight` there.
- Fetch the relevant Notion ticket before changing code.
- Every implementation task must include acceptance criteria reference(s) in Notion before moving to `in_progress`.
- Do not move a ticket to `in_progress` until the clean-`origin/main` baseline check passes; if fetch/preflight fails, leave or return the ticket to `refined` or `blocked` with the environment failure recorded.
- Record branch, PR link, blockers, decisions, and verification outcome on the Notion ticket.
- Move tickets to `done` only after PR merge and verification.
- Do not use `/planning/epics.md` or `tasks_[epic].md` as active tracking sources.

## Review checklist
Focus on:
- acceptance criteria coverage
- accessibility/regression risk
- responsive behavior
- SEO/meta/schema regressions
- legal/compliance impact
