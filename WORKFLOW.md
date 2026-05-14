# WORKFLOW.md — Autonomous ticket execution

## Operating model
One cron run processes **at most one** actionable ticket from Notion. Ticket status is the source of truth.

## 1) Actionable-ticket priority
1. `reviewed`
2. `merged`
3. `refined`

Additionally, inspect `pull request` tickets for auto-merge detection (`gh pr view <PRUrl> --json state -q .state`).

## 2) Claim flow (atomic intent)
For chosen ticket:
1. Set `Status = claimed`
2. Set `ClaimedBy = Dekorfabrik Website`
3. Set `ClaimedAt = <ISO now>`

If claim race is lost, move to next candidate (bounded retries only).

## 3) Refined implementation flow
1. Move to `in-progress` and append run-start WorkLog entry with one-line plan.
2. Sync repo (`main` + pull), then create/check out `agent/<ticket-id>-<slug>`.
3. Read full `ReviewNotes`; apply each untagged note.
4. Implement only in current ticket scope.
5. Commit locally with descriptive messages.
6. Run verification gate: `npm run automation:verify`.
7. Run local redeploy:
   - `cd /Users/manuelweisbender/containers/clc_dekorfabrik_website/mac-mini-dev && docker compose up -d --build && docker compose ps`
8. If successful, set `Status = for review` with completion WorkLog entry.

### Rework discriminator
If ticket is `refined` and `PRUrl` is populated:
- treat as rework on existing branch,
- add commits on top,
- run verify + redeploy,
- force-push with lease,
- finish at `pull request` (same PR updated).

## 4) Reviewed flow (PR creation)
1. `Status = creating-pr`
2. `git push -u origin <branch>`
3. Create PR to `main` via `gh pr create`
4. Set `Status = pull request` and update `PRUrl`
5. Append PR-opened WorkLog entry

## 5) Merged flow (closeout)
1. `Status = closing`
2. Verify merge landed on `origin/main`
3. Write Closing Summary + create backlog follow-ups if needed
4. Clean local branch
5. `Status = closed`

## 6) WorkLog/ReviewNotes append rule
- Notion rich_text updates replace arrays.
- Safe append sequence each time:
  1. retrieve page,
  2. read existing array,
  3. append timestamped newline segment,
  4. patch full concatenated array.
- Keep newest entries if near Notion length cap.

## 7) Required quality gates before handoff
- Scope matches ticket
- `npm run automation:verify` passes
- Local redeploy succeeds with container in `Up` state
- WorkLog updated through all key transitions

## 8) Escalation policy
Escalate (blocked/for-review note + report) when:
- scope is ambiguous,
- required branch/history is missing for rework,
- verification or redeploy fails,
- request crosses hard red lines (workflow files/external infra/out-of-scope paths).

## 9) End-of-run reporting
Send exactly one structured report to Clawdia via:
- `sessions_send({ sessionKey: "agent:main:main", message: ... })`

Then terminate with `NO_REPLY`.
