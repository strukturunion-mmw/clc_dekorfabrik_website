# Notion-Based Delivery Workflow

This document explains the Notion-centered planning and implementation workflow used for the Dekorfabrik website project. It is written as both project documentation and a reusable playbook for future projects.

## Concept

The workflow separates four responsibilities:

- **Notion** is the live source of truth for planning, ticket state, approvals, branch links, PR links, blockers, decisions, and delivery notes.
- **The repository** is the source of truth for implementation, requirements docs, architecture docs, and verification commands.
- **Local Codex** is the primary implementation agent. It reads the Notion ticket, works in the local repo, verifies the change, and updates Notion.
- **Codex automation / cloud Codex** can process approved tickets on an interval and feed work back into reviewable PRs.

The core design is intentionally semi-automated. Humans decide priority and approve refined tickets. Codex handles the mechanical loop of reading context, implementing, verifying, opening a PR, and writing back status.

## Why This Workflow

Markdown planning files are easy to version but poor at live delivery management. They do not naturally show ownership, status, blockers, due dates, PR links, or review queues. Notion is better for those live operational states.

The repo still keeps stable technical truth:

- product requirements
- acceptance gates
- architecture
- prompting guidance
- implementation code

This avoids two bad extremes:

- **Repo-only planning:** visible in diffs, but clumsy for status and approvals.
- **Notion-only everything:** good project management, but weak technical traceability.

The chosen workflow uses Notion for live state and the repo for durable technical context.

## Required Notion Structure

Create one project page and two databases.

### Project Page

Name example:

```text
Dekorfabrik Website
```

Recommended content:

```md
## Project Overview
This workspace tracks all website redesign planning and delivery status.

> Source of truth is Notion; repo markdown planning files are archival only.

## Operating Rules
1. Every code PR must link exactly one primary Ticket ID.
2. Ticket must include acceptance criteria reference before moving to in_progress.
3. Ticket moves to done only after PR merge and verification.
4. Blocked tickets must include Blocked Reason.
5. Epic status is derived from ticket progress and manually reviewed weekly.

## Migration Checklist
- [ ] Epics imported
- [ ] Tickets imported
- [ ] Relations verified
- [ ] Views verified
- [ ] Team roles assigned
- [ ] PR template updated with Ticket ID
- [ ] Legacy markdown planning files marked archive/read-only
```

### Epics Database

Recommended properties:

| Property | Type | Purpose |
| --- | --- | --- |
| Epic ID | Title | Stable ID, for example `E1` |
| Epic Name | Text | Human-readable epic title |
| Status | Status | `todo`, `in_progress`, `blocked`, `done` |
| Goal | Text | Outcome the epic should achieve |
| Output | Text | Deliverable or business result |
| Tickets | Relation | Related tickets |
| Owner | Person | Optional owner |
| Priority | Select | Optional priority |
| Start Date | Date | Optional schedule field |
| Target Date | Date | Optional schedule field |
| Progress % | Number | Optional progress field |

### Tickets Database

Recommended properties:

| Property | Type | Purpose |
| --- | --- | --- |
| Ticket ID | Title | Stable ID, for example `E2-US1` |
| Story Title | Text | Short summary |
| Description | Text | 1-2 sentence implementation summary |
| Epic | Relation | Exactly one related epic |
| Status | Status | Workflow state |
| Acceptance Criteria Ref | Text | Spec refs and/or ticket criteria reference |
| Priority | Select | `High`, `Medium`, `Low` |
| Estimate | Select | `XS`, `S`, `M`, `L`, `XL` |
| Assignee | Person | Optional |
| Due Date | Date | Optional |
| Branch | Text | Implementation branch |
| PR Link | URL | GitHub PR |
| Blocked Reason | Text | Required when blocked |
| Last Updated | Last edited time | Audit/sorting |

### Required Ticket Statuses

Use these statuses:

```text
todo
refined
in_progress
blocked
done
```

Meaning:

- `todo`: ticket exists but is not implementation-ready.
- `refined`: human-approved, implementation-ready, eligible for automation pickup.
- `in_progress`: claimed by Codex or a developer.
- `blocked`: cannot proceed without a decision, connector, or failed readiness check.
- `done`: PR merged and post-merge verification complete.

Important: `refined` is the approval gate for automation. Do not use `refined` for tickets that still have open product questions.

## Recommended Views

Create these views on the Tickets database:

- **All Tickets:** table sorted by Ticket ID.
- **Ticket Board:** board grouped by Status.
- **Ticket Review:** table showing non-done tickets with Ticket ID, Story Title, Status, Epic, Priority, Estimate, Blocked Reason, PR Link, Branch, Last Updated, Acceptance Criteria Ref, Description.
- **Recently Updated:** table sorted by Last Updated descending.
- **Blocked:** table filtered to Status = `blocked`.
- **By Epic:** board grouped by Epic.
- **Automation Queue:** table filtered to Status = `refined`, sorted by Priority, Due Date, Last Updated, Ticket ID.

## Repo Wiring

Every project using this workflow should add or update these files.

### `AGENTS.md`

Add:

```md
## Source of truth
Notion is the live source of truth for planning, task state, delivery status, and implementation documentation.

- Project page: [project URL]
- Epics database: [epics database URL]
- Tickets database: [tickets database URL]

Treat `planning/` markdown files as archival context only unless the user explicitly asks to migrate, reconcile, or update them.

## Workflow rules
- Start every implementation task from exactly one primary Notion Ticket ID.
- Fetch the relevant Notion ticket before changing code.
- Every implementation task must include acceptance criteria reference(s) in Notion before moving to `in_progress`.
- Record branch, PR link, blockers, decisions, and verification outcome on the Notion ticket.
- Move tickets to `done` only after PR merge and verification.
- Do not use `/planning/epics.md` or `tasks_[epic].md` as active tracking sources.
```

### `ARCHITECTURE.md`

Add a delivery model section:

```md
## Delivery model
- Work is tracked by epics and tickets in Notion.
- Notion is the source of truth for ticket status, branch/PR links, blockers, delivery notes, and implementation decisions.
- Requirements and baseline acceptance gates are maintained in `/specs`.
- Legacy planning markdown files are archival migration sources only.
- Implementation proceeds in small PR-sized tasks mapped to exactly one primary Notion Ticket ID at a time.
```

### PR Template

Create `.github/PULL_REQUEST_TEMPLATE.md`:

```md
## Notion Tracking

- Primary Ticket ID:
- Notion Ticket URL:
- Acceptance Criteria Ref:
- Branch recorded on ticket: yes/no

## Summary

-

## Verification

- [ ] `npm run lint`
- [ ] `npm run build`
- [ ] Notion ticket updated with verification outcome

## Delivery Notes

- Blockers:
- Follow-ups:
```

### Planning Archive

If the project previously used markdown planning files, add `planning/README.md`:

```md
# Planning Archive

Planning moved to Notion on [date].

Notion is now the live source of truth for epics, tickets, status, branch links, PR links, blockers, and delivery notes.

The markdown files in this directory are retained only as migration history and should not be used for active tracking.
```

## Ticket Refinement Workflow

Raw imported tickets are usually too short for implementation. They should be refined before implementation.

Refinement means turning a short ticket into an implementation-ready ticket with:

- goal
- user story
- implementation scope
- acceptance criteria
- context files
- constraints
- non-goals
- verification plan
- assumptions
- open questions
- ready-to-implement prompt

### Refinement Skill

Local skill:

```text
~/.codex/skills/refine-notion-ticket
```

Use it when a ticket needs to be prepared for implementation.

Prompt:

```text
Use $refine-notion-ticket to refine Notion ticket E2-US1 for implementation.
```

More explicit prompt:

```text
Use $refine-notion-ticket to refine Notion ticket E2-US1. Ask me whatever you need, then update the ticket in Notion so it is ready for Codex implementation.
```

The skill must:

1. Fetch the ticket and related Epic.
2. Read repo workflow docs and specs.
3. Ask concise clarification questions if details are missing.
4. Update the Notion ticket body and properties.
5. Leave the ticket out of `in_progress`.
6. Report whether the ticket is ready.

After refinement, the human reviews the ticket. If approved for implementation, the human changes Status to:

```text
refined
```

This is the handoff point from planning/refinement to implementation automation.

## Implementation Workflow

Manual implementation prompt:

```text
Implement Ticket E2-US1 from Notion.
```

Better prompt:

```text
Implement Ticket E2-US1 from Notion.

Fetch the ticket and related Epic first. Follow the ready-to-implement prompt in the ticket body. Keep changes ticket-scoped, run `npm run lint` and `npm run build`, then update the Notion ticket with branch, PR link if available, blockers, decisions, and verification outcome.
```

Implementation steps:

1. Codex fetches the Notion ticket and related Epic.
2. Codex verifies acceptance criteria exist.
3. Codex validates the repo baseline by fetching `origin`, creating or reusing a fresh clean worktree from current `origin/main`, and running `direnv exec . npm run automation:preflight` there.
4. Only after baseline validation passes does Codex claim the ticket by setting Status to `in_progress`.
5. Codex records the branch in Notion.
6. Codex implements the change in the repo.
7. Codex runs verification.
8. Codex commits task-scoped changes.
9. Codex opens or prepares a PR.
10. Codex records PR link and verification outcome in Notion.
11. The ticket remains `in_progress` until the PR is merged and verified.
12. After merge and verification, the ticket can move to `done`.

## Automation Workflow

The automation workflow lets approved tickets be picked up automatically. The human still controls the queue by deciding when a ticket becomes `refined`.

### Automation Skill

Local skill:

```text
~/.codex/skills/implement-refined-notion-ticket
```

It is designed for scheduled Codex automation runs.

It must:

1. Check the Tickets database for `Status = refined`.
2. Sort deterministically.
3. Process only the first ticket.
4. Validate readiness.
5. Validate the baseline first by fetching `origin`, creating a fresh clean worktree from current `origin/main`, and running `direnv exec . npm run automation:preflight` there.
6. Move the ticket to `in_progress` only after that baseline check succeeds.
7. Implement the ticket.
8. Run verification.
9. Open or prepare a draft PR.
10. Update Notion.
11. Never mark the ticket `done`.

### Automation Prompt

Use this prompt for a Codex cron automation:

```text
Use $implement-refined-notion-ticket for the Dekorfabrik website project.

Check the Dekorfabrik Website Notion Tickets database for tickets with Status `refined`. If one or more exist, process only the first ticket according to the skill workflow: validate readiness, validate the clean `origin/main` baseline, claim it by moving it to `in_progress` only after that baseline succeeds, implement it on a task-scoped branch, run verification, open or prepare a draft PR, and update the Notion ticket with branch, PR link if available, blockers, decisions, and verification outcome.

If no refined tickets exist, make no code changes. If the Notion schema lacks the `refined` status option or required connectors are unavailable, stop and report the blocker.
```

Recommended cadence:

- Hourly during active build periods.
- Daily during quiet periods.
- Avoid intervals below 30 minutes unless CI is fast and overlapping runs are impossible.

Recommended environment:

- Codex cron automation.
- Worktree execution environment if available.
- High reasoning effort.

## Human / Codex Responsibility Split

| Step | Owner | Notes |
| --- | --- | --- |
| Define epics | Human + Codex | Codex can draft; human approves product structure |
| Create raw tickets | Human + Codex | Imported or drafted in Notion |
| Refine ticket | Local Codex + human | Codex asks questions; human supplies decisions |
| Approve implementation | Human | Change Status to `refined` |
| Pick up approved ticket | Automation Codex | Processes only one `refined` ticket per run |
| Implement | Local/automation Codex | Branch, code, verify |
| Review PR | Human | Review diff, behavior, tradeoffs |
| Fix PR feedback | Codex or human | Same ticket remains primary context |
| Merge PR | Human | Or repo owner, depending on policy |
| Mark done | Human or Codex after verification | Only after PR merge and verification |

## Safety Design

This workflow uses several safety gates:

- One primary ticket per implementation.
- Ticket refinement before implementation.
- Human approval via `refined`.
- Automation claims only one ticket per run.
- `refined` immediately becomes `in_progress` when claimed.
- Verification is required before PR handoff.
- `done` is reserved for post-merge verification.
- Blocked work is written back to Notion instead of silently skipped.

The purpose is not to remove human judgment. The purpose is to remove repetitive coordination work while preserving explicit approval and review points.

## Replication Prompt For Future Projects

Use this prompt to ask Codex to set up a similar workflow in another project:

```text
Set up a Notion-centered delivery workflow for this project.

Create or wire a Notion project page with two databases: Epics and Tickets. Use stable IDs, a relation from Tickets to Epics, and ticket statuses `todo`, `refined`, `in_progress`, `blocked`, and `done`.

Make Notion the source of truth for planning, ticket state, branch/PR links, blockers, decisions, and delivery notes. Keep the repository as the source of truth for implementation, specs, architecture, and verification commands.

Update the repo docs:
- AGENTS.md with Notion source-of-truth and workflow rules
- ARCHITECTURE.md with the delivery model
- specs/ACCEPTANCE_CRITERIA.md with Notion ticket gates
- concept/prompting_guide.md with Notion ticket prompts
- .github/PULL_REQUEST_TEMPLATE.md with Notion fields
- planning/README.md if legacy markdown planning exists

Create or install two local Codex skills:
- $refine-notion-ticket: refine one ticket into an implementation-ready Notion ticket by asking clarification questions and updating Notion.
- $implement-refined-notion-ticket: for scheduled automation, pick only the first ticket with Status `refined`, claim it, implement it, verify it, open or prepare a PR, and update Notion.

Do not mark tickets done until PR merge and verification. Do not process more than one ticket per automation run.
```

## Notion Setup Prompt

Use this prompt when creating the Notion databases with Codex:

```text
Create a Notion project workspace for [PROJECT NAME].

Create a project page named [PROJECT NAME]. Under it, create:

1. Epics database
Properties:
- Epic ID title
- Epic Name text
- Status status with todo, in_progress, blocked, done
- Goal text
- Output text
- Owner person
- Priority select High, Medium, Low
- Start Date date
- Target Date date
- Tickets relation to Tickets database

2. Tickets database
Properties:
- Ticket ID title
- Story Title text
- Description text
- Epic relation to Epics database, limit 1
- Status status with todo, refined, in_progress, blocked, done
- Acceptance Criteria Ref text
- Priority select High, Medium, Low
- Estimate select XS, S, M, L, XL
- Assignee person
- Due Date date
- Branch text
- PR Link URL
- Blocked Reason text
- Last Updated last edited time

Create useful views:
- All Tickets
- Ticket Board grouped by Status
- Ticket Review
- Automation Queue filtered to Status refined
- Blocked
- By Epic
- Recently Updated

Add operating rules to the project page:
1. Every code PR must link exactly one primary Ticket ID.
2. Ticket must include acceptance criteria before moving to in_progress.
3. Human approval for automation is Status refined.
4. Automation may process only one refined ticket per run.
5. Ticket moves to done only after PR merge and verification.
6. Blocked tickets must include Blocked Reason.
```

## Status Lifecycle

```text
todo -> refined -> in_progress -> done
              \           \
               \           -> blocked
                -> blocked
```

Typical examples:

- A raw imported ticket starts as `todo`.
- A refined and human-approved ticket becomes `refined`.
- Codex automation claims it and sets it to `in_progress`.
- If implementation needs a product decision, it becomes `blocked`.
- After PR merge and verification, it becomes `done`.

## Operational Notes

- Add `refined` to the Notion Status options manually if the Notion API cannot alter status options.
- Keep ticket IDs stable forever.
- Prefer updating existing tickets over creating duplicates.
- Never let automation process multiple tickets in one run.
- Use Notion comments or ticket body notes for decisions that future implementers need.
- Keep `planning/` as an archive only after migration.
- Treat a missing PR link as incomplete delivery, not `done`.
