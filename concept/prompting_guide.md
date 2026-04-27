# Prompting Guide for Task Execution Workflow

This guide defines how to start **individual implementation tasks** in the Notion-centered delivery workflow.

## 1) Always start from a tracked story
Every prompt must reference:
- one primary Notion Ticket ID
- the related Notion Epic
- relevant acceptance criteria from `specs/ACCEPTANCE_CRITERIA.md`

**Required preface in prompt:**
- Epic ID/title and Notion URL
- Ticket ID and Notion URL
- Definition of done (copied as checklist)
- Constraints/non-goals

## 2) Use this standard task prompt template

```md
You are implementing Ticket [ID] for the Dekorfabrik website.

Context files:
- Notion Ticket: [Ticket ID + URL]
- Notion Epic: [Epic ID + URL]
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
2. Record branch, PR link, blockers, decisions, and verification outcome on the Notion ticket.
3. Update docs/specs when behavior changes.
4. Run lint/build checks.
5. Summarize assumptions and open questions.
```

## 3) Preferred prompt style
- Ask for **one Notion ticket at a time**.
- Keep scope bounded to a PR-sized change.
- Require explicit file targets when possible.
- Require checks (`npm run lint`, `npm run build`) before completion.

## 4) Example kickoff prompt

```md
Implement Ticket E2-US3 (contact/upload form) from Notion.

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
4. Notion ticket update summary.
5. Assumptions and follow-up tasks.

## 6) Escalation rules
If a task is ambiguous:
- state assumptions explicitly,
- proceed with the safest minimal implementation,
- add a short “Questions for product owner” section.
