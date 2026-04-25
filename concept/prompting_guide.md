# Prompting Guide for Task Execution Workflow

This guide defines how to start **individual implementation tasks** in the redesigned repo-centered workflow.

## 1) Always start from a tracked story
Every prompt must reference:
- `planning/epics.md` (epic context)
- one story ID in `planning/tasks_[n].md`
- relevant acceptance criteria from `specs/ACCEPTANCE_CRITERIA.md`

**Required preface in prompt:**
- Epic number and title
- Story ID
- Definition of done (copied as checklist)
- Constraints/non-goals

## 2) Use this standard task prompt template

```md
You are implementing Epic [N], Story [ID] for the Dekorfabrik website.

Context files:
- planning/epics.md
- planning/tasks_[N].md
- specs/PRODUCT_SPEC.md
- specs/WEBSITE_REQUIREMENTS.md
- specs/DESIGN_SYSTEM.md
- specs/ACCEPTANCE_CRITERIA.md
- ARCHITECTURE.md
- AGENTS.md

Task:
[clear scope in 3-7 bullets]

Definition of done:
- [ ] ...
- [ ] ...

Non-goals:
- ...

Execution requirements:
1. Keep changes minimal and task-scoped.
2. Update docs/planning files when needed.
3. Run lint/build checks.
4. Summarize assumptions and open questions.
```

## 3) Preferred prompt style
- Ask for **one story at a time**.
- Keep scope bounded to a PR-sized change.
- Require explicit file targets when possible.
- Require checks (`npm run lint`, `npm run build`) before completion.

## 4) Example kickoff prompt

```md
Implement Epic 2, Story E2-US3 (contact/upload form).

Focus:
- Add/complete the required form fields and consent behavior.
- Ensure validation and submission handling are present.
- Keep UI consistent with existing components.

Done when:
- Form matches requirements in specs/WEBSITE_REQUIREMENTS.md.
- Acceptance criteria #2, #6, #7, #8 from specs/ACCEPTANCE_CRITERIA.md are met.
- Lint/build pass.

Non-goals:
- CRM deep integration beyond existing submission path.
- New design system primitives.
```

## 5) Completion response format (for each task)
Implementation responses should include:
1. Summary of changes by file.
2. Commands run and outcomes.
3. Acceptance criteria checklist with pass/fail notes.
4. Assumptions and follow-up tasks.

## 6) Escalation rules
If a task is ambiguous:
- state assumptions explicitly,
- proceed with the safest minimal implementation,
- add a short “Questions for product owner” section.
