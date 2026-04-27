# ACCEPTANCE CRITERIA

## Epic 2 (MVP launch)
A story is done only when all relevant criteria are met:

1. **Page completion**
   - Required MVP pages exist and are reachable via navigation or footer.
2. **Lead form**
   - Contact/upload form accepts required fields and validates missing/invalid input.
   - Consent is required before submission.
3. **Content completeness**
   - Core service messaging, process, and FAQ content is present.
4. **Legal baseline**
   - Impressum + Datenschutz are published and linked globally.
5. **SEO baseline**
   - Page-level metadata and indexability artifacts are configured.
6. **Responsive behavior**
   - No critical mobile/tablet/desktop layout breakage.
7. **Accessibility baseline**
   - Keyboard navigation and semantic landmarks remain intact.
8. **Quality gates**
   - Lint/build checks pass.

## Ongoing acceptance gates (post-MVP)
- New features map to exactly one primary Notion Ticket ID.
- The Notion ticket includes an acceptance criteria reference before work moves to `in_progress`.
- Branch, PR link, blockers, decisions, and verification outcome are recorded on the Notion ticket.
- Story-specific acceptance criteria are added to the Notion ticket before implementation starts.
- Docs/specs are updated with behavior changes.
- Legacy `/planning` markdown files remain archive-only unless an explicit migration or reconciliation task asks otherwise.
