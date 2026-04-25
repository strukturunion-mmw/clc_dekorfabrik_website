# AGENTS.md

## Project goal
Build and iteratively evolve the Dekorfabrik website redesign described in:
- `specs/PRODUCT_SPEC.md`
- `specs/WEBSITE_REQUIREMENTS.md`
- `specs/DESIGN_SYSTEM.md`
- `specs/ACCEPTANCE_CRITERIA.md`
- `ARCHITECTURE.md`

Do not invent product behavior beyond these docs. If a requirement is ambiguous, leave a clear assumption note in your PR.

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
- Update docs/specs/planning files when requirements or workflow changes.

## Workflow rules
- Use `/planning/epics.md` as the top-level tracking source.
- Implement one user story at a time from `tasks_[epic].md` files.
- Every implementation task must include acceptance criteria reference(s).
- Mark progress in planning files in the same PR when a story is completed.

## Review checklist
Focus on:
- acceptance criteria coverage
- accessibility/regression risk
- responsive behavior
- SEO/meta/schema regressions
- legal/compliance impact
