# CONVENTIONS.md — Dekorfabrik Website

## 1) Code structure and implementation style
- TypeScript strict mode; functional React components.
- App Router route conventions (`src/app/<route>/page.tsx`, API handlers in `src/app/api/**`).
- Shared SEO metadata via `createPageMetadata(...)`.
- Shared shell layout via `PageShell` and section components.
- Content-heavy page sections represented as typed arrays/objects instead of inline hardcoded markup duplication.

## 2) Component layering
- `src/components/ui/*` → UI primitives (`Button`, `Pill`, cards, nav pieces).
- `src/components/sections/*` → page sections/shell (`SiteHeader`, `Marquee`, `Footer`, `PageShell`).
- `src/components/legal/*` → legal-document composition blocks.
- `src/components/serviceDetails.ts` → service-detail content model.
- `src/lib/*` → metadata and shared helpers.

## 3) Naming conventions
- Route folders: lowercase German slugs where relevant (`/dienste`, `/kontakt`, `/faq`).
- Dynamic routes: bracket syntax (`/dienste/[slug]`).
- Components: PascalCase exports.
- Constants: UPPER_SNAKE_CASE when global/static.
- Validation/schema/helper values: camelCase.

## 4) Styling and design token conventions
- `dekorfabrik-design-kit/` is the design contract.
- `src/app/globals.css` bridges design-kit tokens into Tailwind v4 `@theme inline` tokens.
- Prefer existing tokenized classes (`bg-navy-800`, `text-d4`, `rounded-pill`) over ad-hoc color values.
- Avoid introducing parallel style systems or one-off token sets.

## 5) Git and branch conventions
- Branch pattern: `agent/<ticket-id>-<slug>`.
- Never commit directly to `main`.
- Force push is only allowed as `--force-with-lease` on agent-owned feature branches.
- `PRUrl` and status progression are managed in Notion as source of truth.

## 6) Notion operation conventions
- Use only `mcporter call notion.API-* --output json`.
- `WorkLog` and `ReviewNotes` are append-only rich_text fields (retrieve + append + patch full array).
- Keep WorkLog concise, timestamped, and operational.

## 7) Accessibility conventions
- Semantic landmarks and heading hierarchy are required.
- Keyboard focus visibility must remain explicit.
- Form controls include clear labels, validation states, and error associations.
- Navigation controls expose state via `aria-*` where needed.

## 8) Content and UX conventions
- German-first copy for DACH B2B audience.
- Conversion path clarity over decorative language.
- CTA copy should be concrete and action-oriented.
- Legal and trust content must stay explicit and readable.

## 9) Verification conventions
- Required pre-review gate: `npm run automation:verify`.
- For UI-affecting work, include manual route smoke checks on key routes.
- Local redeploy is required before `for review` in refined flow.
