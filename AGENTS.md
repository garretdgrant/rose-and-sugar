# Repository Guidelines

## Project Structure & Module Organization
Application routes and layouts live in `src/app`, following the Next.js App Router conventions (`page.tsx`, `layout.tsx`, and route segment folders for `about`, `classes`, `contact`, etc.). Shared UI and form elements are in `src/components`, while reusable hooks reside in `src/hooks`. Sanity, email, and validation helpers are grouped under `src/lib`. Static assets such as hero imagery and favicons belong in `public`. Global Tailwind layers and custom tokens are defined in `src/app/globals.css`; update them before adding component-level overrides.

## Build, Test, and Development Commands
- `pnpm install` — sync dependencies after cloning or pulling.
- `pnpm dev` — launch the Turbopack dev server on port 3000.
- `pnpm build` — create an optimized production bundle; required before deploys.
- `pnpm start` — serve the production build locally for smoke testing.
- `pnpm lint` — run the Next.js ESLint suite; treat warnings as blockers.
- `pnpm prettier` — format consistently across TSX, TS, and CSS.
- `pnpm preprod` — convenience script: format, stage, build, then show pending changes.

## Coding Style & Naming Conventions
Write new code in TypeScript with strict props typing. React components and files exporting JSX use PascalCase (`Hero.tsx`); hooks stay in camelCase (`useClasses`). Keep utility modules in kebab-case or snake case only if matching external APIs. Prettier and ESLint enforce 2-space indentation, semicolons, and import ordering—let the auto-formatters run before committing. Tailwind utility classes should remain inline; add custom classes to `globals.css` only when reuse is evident.

## Testing Guidelines
Automated tests are not yet configured. When introducing features with business logic (forms, Sanity queries, API handlers), add lightweight unit or integration tests alongside the source (e.g., `src/lib/__tests__/validations.test.ts`) using Jest and React Testing Library. At minimum, exercise validations and API error paths manually via the dev server before requesting review, and document any gaps in the PR.

## Commit & Pull Request Guidelines
Follow the existing conventional prefixes (`feat:`, `chore:`, `fix:`, etc.) with concise, imperative summaries (`feat: add waitlist to classes`). Group related changes into single commits so reviewers can bisect easily. Pull requests should include: a clear summary of intent, linked Linear/GitHub issue, screenshots or screen recordings for visual updates, notes on testing performed, and any environment variable changes. Ensure the branch is rebased on `main` and all scripts above pass prior to requesting approval.

## Environment & Integration Notes
Third-party integrations require secrets stored in `.env.local`. Current services include Sanity (`SANITY_READ_TOKEN`), Resend email delivery (`RESEND_API_KEY`, `RECEIVER_EMAIL`), and Google Apps Script syncing (`GOOGLE_WEB_APP`). Never hard-code secrets; document required keys in the PR description when new variables are introduced, and provide fallbacks or mocks for local development when feasible.
